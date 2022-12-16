import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <button
        className={s.signin}
        type="button"
        onClick={() => navigate('/login')}
      >
        Sign In
      </button>
      <button
        className={s.signup}
        type="button"
        onClick={() => navigate('/register')}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Header;
