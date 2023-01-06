import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/main-logo1.svg';
import s from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <Logo />
      <NavLink>Home</NavLink>
      <select>
        <option>QuizMode</option>
        <option></option>
        <option></option>
      </select>
      <NavLink>Leaderboard</NavLink>
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
