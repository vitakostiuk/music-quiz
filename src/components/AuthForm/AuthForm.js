import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
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

const AuthForm = ({
  questionText,
  hash,
  buttonText,
  buttonTextToNavigate,
  handleSetCredentials,
}) => {
  let navigate = useNavigate();

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
          handleSetCredentials(values);
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

            <div>
              <button type="submit">{buttonText}</button>
              <div>
                <p>{questionText}</p>
                <button type="button" onClick={() => navigate(`/${hash}`)}>
                  {buttonTextToNavigate}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

AuthForm.propTypes = {
  questionText: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonTextToNavigate: PropTypes.string.isRequired,
  handleSetCredentials: PropTypes.func.isRequired,
};

export default AuthForm;
