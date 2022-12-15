import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

const SignUpPage = () => {
  return (
    <AuthForm
      questionText="Already have an account?"
      hash="login"
      buttonText="Sign Up"
      buttonTextToNavigate="Sign In"
    />
  );
};

export default SignUpPage;
