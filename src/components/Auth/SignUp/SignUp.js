import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../redux/auth/authOperations';
import { getToken } from '../../../redux/auth/authSelectors';
import AuthForm from '../AuthForm';

const SignUp = () => {
  const [credentials, setCredentials] = useState(null);

  const { t } = useTranslation();

  const token = useSelector(getToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(signup(credentials));
    }
  }, [credentials, dispatch]);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  const handleSetCredentials = data => {
    setCredentials(data);
  };

  return (
    <AuthForm
      questionText={t('auth.questionForSignin')}
      hash="login"
      buttonText={t('auth.signup')}
      buttonTextToNavigate={t('auth.signin')}
      handleSetCredentials={handleSetCredentials}
    />
  );
};

export default SignUp;
