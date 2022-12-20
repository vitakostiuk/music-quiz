import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../redux/auth/authOperations';
import { getToken } from '../../redux/auth/authSelectors';
import AuthForm from '../AuthForm/AuthForm';

const SignInPage = () => {
  const [credentials, setCredentials] = useState(null);
  // console.log('credentials', credentials);

  const token = useSelector(getToken);
  // console.log('token', token);

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
      questionText="Need an account?"
      hash="register"
      buttonText="Sign In"
      buttonTextToNavigate="Sign Up"
      handleSetCredentials={handleSetCredentials}
      isForgotPassword
    />
  );
};

export default SignInPage;
