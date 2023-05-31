import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../../redux/auth/authOperations';
import { getToken } from '../../../redux/auth/authSelectors';
import AuthForm from '../AuthForm';

const SignIn = () => {
  const [credentials, setCredentials] = useState(null);

  const { t } = useTranslation();

  const token = useSelector(getToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(signin(credentials));
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
      questionText={t('auth.questionForSignup')}
      hash="register"
      buttonText={t('auth.signin')}
      buttonTextToNavigate={t('auth.signup')}
      handleSetCredentials={handleSetCredentials}
      isForgotPassword
    />
  );
};

export default SignIn;
