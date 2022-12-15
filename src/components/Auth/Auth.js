import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import s from "./Auth.module.css";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string()
    .email('Invalid password')
    .min(8, 'Password is Too short')
    .required('Password is required!'),
});

const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const onClickSignUp = () => {
    setSignIn(false);
    setSignUp(true);
  };

  const onClickSignIn = () => {
    setSignIn(true);
    setSignUp(false);
  };
  return (
    <>
      <div>Sign in to Music Quiz</div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            {signIn && (
              <div>
                <button type="submit">Sign In</button>
                <p>Need an account?</p>
                <button type="submit" onClick={onClickSignUp}>
                  Sign Up
                </button>
              </div>
            )}

            {signUp && (
              <div>
                <button type="submit">Sign Up</button>
                <p>Already have an account?</p>
                <button type="submit" onClick={onClickSignIn}>
                  Sign In
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Auth;
