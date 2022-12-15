import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/auth/authOperations';
import AuthForm from '../AuthForm/AuthForm';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState(null);
  console.log('credentials', credentials);

  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(signup(credentials));
    }
  }, [credentials, dispatch]);

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
