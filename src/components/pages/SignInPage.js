import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

const SignInPage = () => {
  return (
    <AuthForm
      questionText="Need an account?"
      hash="register"
      buttonText="Sign In"
      buttonTextToNavigate="Sign Up"
    />
  );
};

export default SignInPage;
