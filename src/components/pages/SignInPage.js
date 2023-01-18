import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../redux/auth/authOperations';
import { getToken } from '../../redux/auth/authSelectors';
import { getQuizMode } from '../../redux/player/playerSelectors';
import AuthForm from '../AuthForm/AuthForm';
import s from './Pages.module.css';

const SignInPage = () => {
  const [credentials, setCredentials] = useState(null);
  // console.log('credentials', credentials);

  const isRoboQuizMode = useSelector(getQuizMode);
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
    <div
      className={
        isRoboQuizMode ? s.gamePageWrapperRobo : s.gamePageWrapperMusic
      }
    >
      <div className={s.container}>
        <div className={s.paper}>
          {' '}
          <AuthForm
            questionText="Need an account?"
            hash="register"
            buttonText="Sign In"
            buttonTextToNavigate="Sign Up"
            handleSetCredentials={handleSetCredentials}
            isForgotPassword
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
