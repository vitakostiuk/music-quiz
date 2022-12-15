import React from 'react';
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

            <button type="submit">Sign In</button>
          </Form>
        )}
      </Formik>
      <div>
        <p>Need an account?</p>
        <button type="button">Sign Up</button>
      </div>
    </>
  );
};

export default Auth;
