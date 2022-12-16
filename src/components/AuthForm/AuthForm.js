import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../../redux/auth/authSlice';
import { Formik, Form, Field } from 'formik';
import { useGoogleLogin } from '@react-oauth/google';
import { ReactComponent as IconGoogle } from '../../images/icon-google.svg';
import * as Yup from 'yup';
import s from './AuthForm.module.css';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is Too short')
    .required('Password is required'),
});

const AuthForm = ({
  questionText,
  hash,
  buttonText,
  buttonTextToNavigate,
  handleSetCredentials,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      dispatch(googleAuth(tokenResponse));
      if (tokenResponse) {
        navigate('/');
      }
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>Sign in to Music Quiz</h1>
        <button className={s.google} type="button" onClick={() => login()}>
          <IconGoogle className={s.icon} />
          Google
        </button>
        <p className={s.orText}>OR</p>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
            handleSetCredentials(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              <label className={s.label} htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                className={
                  errors.password || touched.password ? s.errInput : s.input
                }
                name="email"
                type="email"
                placeholder="your@email.com"
              />
              {errors.email && touched.email ? (
                <div className={s.errEmail}>{errors.email}</div>
              ) : null}

              <label className={s.label} htmlFor="password">
                Password
              </label>
              <Field
                id="password"
                className={
                  errors.password || touched.password ? s.errInput : s.input
                }
                name="password"
                type="password"
                placeholder="your password"
              />
              {errors.password && touched.password ? (
                <div className={s.errPassword}>{errors.password}</div>
              ) : null}

              <div>
                <button className={s.bigButton} type="submit">
                  {buttonText}
                </button>
                <div className={s.questionContainr}>
                  <p className={s.questionText}>{questionText}</p>
                  <button
                    className={s.questionBtn}
                    type="button"
                    onClick={() => navigate(`/${hash}`)}
                  >
                    {buttonTextToNavigate}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  questionText: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonTextToNavigate: PropTypes.string.isRequired,
  handleSetCredentials: PropTypes.func.isRequired,
};

export default AuthForm;
