import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import { ReactComponent as Logo } from '../../images/main-logo1.svg';
import s from './Header.module.css';
import './SelectList.scss';

const options = [
  {
    value: 'Robo-Quiz',
    label: 'Robo-Quiz',
  },
  {
    value: 'Music-Quiz',
    label: 'Music-Quiz',
  },
];

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <Logo className={s.logo} />
      <div className={s.navigation}>
        <NavLink className={s.navItem}>Home</NavLink>
        <Select
          classNamePrefix="custom-select"
          // onChange={handleChangeCategory}
          required
          options={options}
          placeholder="QuizMode"
          isSearchable={false}
        />
        <NavLink className={s.navItem}>Leaderboard</NavLink>
      </div>
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
      <button className={s.language}>EN</button>
    </div>
  );
};

export default Header;
