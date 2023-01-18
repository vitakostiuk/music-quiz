import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../redux/auth/authOperations';
import { getToken } from '../../redux/auth/authSelectors';
import { getQuizMode } from '../../redux/player/playerSelectors';
import AuthForm from '../AuthForm/AuthForm';
import s from './Pages.module.css';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState(null);
  // console.log('credentials', credentials);

  const isRoboQuizMode = useSelector(getQuizMode);
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
    <div
      className={
        isRoboQuizMode ? s.gamePageWrapperRobo : s.gamePageWrapperMusic
      }
    >
      <div className={s.container}>
        <div className={s.paper}>
          {' '}
          <AuthForm
            questionText="Already have an account?"
            hash="login"
            buttonText="Sign Up"
            buttonTextToNavigate="Sign In"
            handleSetCredentials={handleSetCredentials}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
