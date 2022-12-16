import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth } from '../../redux/auth/authSlice';
import { getToken, getGoogleToken } from '../../redux/auth/authSelectors';
import { Formik, Form, Field } from 'formik';
import { useGoogleLogin } from '@react-oauth/google';
import { ReactComponent as IconGoogle } from '../../images/icon-google.svg';
import * as Yup from 'yup';
import s from './AuthForm.module.css';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string()
    .min(8, 'Password is Too short')
    .required('Password is required!'),
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
    <>
      <div>Sign in to Music Quiz</div>
      <button type="button" onClick={() => login()}>
        <IconGoogle className={s.icon} />
        Google
      </button>
      <div>OR</div>
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
          <Form>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <div>
              <button type="submit">{buttonText}</button>
              <div>
                <p>{questionText}</p>
                <button type="button" onClick={() => navigate(`/${hash}`)}>
                  {buttonTextToNavigate}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
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
