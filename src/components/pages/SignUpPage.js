import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../redux/auth/authOperations';
import { getToken } from '../../redux/auth/authSelectors';
import AuthForm from '../AuthForm/AuthForm';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState(null);
  // console.log('credentials', credentials);

  const token = useSelector(getToken);
  // console.log('token', token);

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
      questionText="Already have an account?"
      hash="login"
      buttonText="Sign Up"
      buttonTextToNavigate="Sign In"
      handleSetCredentials={handleSetCredentials}
    />
  );
};

export default SignUpPage;
