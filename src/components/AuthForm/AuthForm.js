import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { forgotPassword, google } from '../../redux/auth/authOperations';
import Modal from '../common/Modal';
import * as Yup from 'yup';
import s from './AuthForm.module.css';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is Too short')
    .required('Password is required'),
});

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is Too short').required('Name is required'),
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
  isForgotPassword,
}) => {
  const [isShowModal, setisShowModal] = useState(false);
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(forgotPassword(email));
    }
  }, [dispatch, email]);

  const onClickShowModal = () => {
    setisShowModal(prefState => !prefState);
  };

  const setEmailforForgotPassword = data => {
    setEmail(data);
  };

  const initialValues = isForgotPassword
    ? { email: '', password: '' }
    : { name: '', email: '', password: '' };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>Sign in to Music Quiz</h1>
        <div className={s.googleLogin}>
          {' '}
          <GoogleLogin
            onSuccess={credentialResponse => {
              const userObject = jwt_decode(credentialResponse.credential);
              const { email, name, picture } = userObject;

              // Відправляємо на бекенд інформацію про юзера.
              // Якщо юзер з таким email є, то оновиться тільки avatarURL (для того, щоб потім можна було витянути avatarURL)
              // Якщо юзера зтаким email немає, то запишеться новий юзер в базу (для того, щоб потім можна було витянути avatarURL)
              const data = {
                name,
                email,
                googleToken: credentialResponse.credential,
                avatarURL: picture,
              };
              dispatch(google(data));

              if (credentialResponse?.credential) {
                navigate('/');
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <p className={s.orText}>OR</p>
        {/* <button className={s.google} type="button" onClick={() => login()}>
          <IconGoogle className={s.icon} />
          Google
        </button>
        <p className={s.orText}>OR</p> */}
        <Formik
          initialValues={initialValues}
          validationSchema={isForgotPassword ? SigninSchema : SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
            handleSetCredentials(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              {!isForgotPassword && (
                <>
                  {' '}
                  <label className={s.label} htmlFor="name">
                    Name
                  </label>
                  <Field
                    id="name"
                    className={
                      errors.name && touched.name ? s.errInput : s.input
                    }
                    name="name"
                    type="text"
                    placeholder="your name"
                  />
                  {errors.name && touched.name ? (
                    <div className={s.errName}>{errors.name}</div>
                  ) : null}
                </>
              )}
              <label className={s.label} htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                className={errors.email && touched.email ? s.errInput : s.input}
                name="email"
                type="email"
                placeholder="your@email.com"
              />
              {errors.email && touched.email ? (
                <div
                  className={isForgotPassword ? s.errEmailSignin : s.errEmail}
                >
                  {errors.email}
                </div>
              ) : null}

              <label className={s.label} htmlFor="password">
                Password
              </label>
              <Field
                id="password"
                className={
                  errors.password && touched.password ? s.errInput : s.input
                }
                name="password"
                type="password"
                placeholder="your password"
              />
              {errors.password && touched.password ? (
                <div
                  className={
                    isForgotPassword ? s.errPasswordSignin : s.errPassword
                  }
                >
                  {errors.password}
                </div>
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
                {isForgotPassword && (
                  <div className={s.questionContainr}>
                    <p className={s.questionText}>Forgot your password?</p>
                    <p
                      className={s.reset}
                      type="button"
                      onClick={() => onClickShowModal()}
                    >
                      Reset it
                    </p>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
        {isShowModal && (
          <Modal
            onClickShowModal={onClickShowModal}
            setEmailforForgotPassword={setEmailforForgotPassword}
            text="Reset Your Password"
            btnText="reset password"
            input
          />
        )}
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
  isForgotPassword: PropTypes.bool,
};

export default AuthForm;
