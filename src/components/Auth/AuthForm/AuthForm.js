import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { forgotPassword, google } from '../../../redux/auth/authOperations';
import { getIsLoading } from '../../../redux/auth/authSelectors';
import Modal from '../../common/Modal';
import Loader from '../../common/Loader';
import Paper from '../../common/Paper';
import { authValidation } from '../../../hooks';
import s from './AuthForm.module.css';

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

  const SigninSchema = authValidation.useLoginValidationSchema();
  const SignupSchema = authValidation.useSignUpValidationSchema();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);

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
    <Paper>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={s.wrapper}>
          <div className={s.container}>
            <h1 className={s.title}>{t('form.greeting')}</h1>
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
            <p className={s.orText}>{t('form.or')}</p>
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
                        {t('form.name')}
                      </label>
                      <Field
                        id="name"
                        className={
                          errors.name && touched.name ? s.errInput : s.input
                        }
                        name="name"
                        type="text"
                        placeholder={t('form.namePlaceholder')}
                      />
                      {errors.name && touched.name ? (
                        <div className={s.errName}>{errors.name}</div>
                      ) : null}
                    </>
                  )}
                  <label className={s.label} htmlFor="email">
                    {t('form.email')}
                  </label>
                  <Field
                    id="email"
                    className={
                      errors.email && touched.email ? s.errInput : s.input
                    }
                    name="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                  />
                  {errors.email && touched.email ? (
                    <div
                      className={
                        isForgotPassword ? s.errEmailSignin : s.errEmail
                      }
                    >
                      {errors.email}
                    </div>
                  ) : null}

                  <label className={s.label} htmlFor="password">
                    {t('form.password')}
                  </label>
                  <Field
                    id="password"
                    className={
                      errors.password && touched.password ? s.errInput : s.input
                    }
                    name="password"
                    type="password"
                    placeholder={t('form.passwordPlaceholder')}
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
                        <p className={s.questionText}>
                          {t('auth.resetPassword')}
                        </p>
                        <p
                          className={s.reset}
                          type="button"
                          onClick={() => onClickShowModal()}
                        >
                          {t('auth.resetIt')}
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
                text={t('form.resetYourPassword')}
                btnText={t('form.textBtn')}
                input
              />
            )}
          </div>
        </div>
      )}
    </Paper>
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
