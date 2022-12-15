import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/authOperations';
import AuthForm from '../AuthForm/AuthForm';

const SignInPage = () => {
  const [credentials, setCredentials] = useState(null);
  console.log('credentials', credentials);

  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(signin(credentials));
    }
  }, [credentials, dispatch]);

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
    />
  );
};

export default SignInPage;
