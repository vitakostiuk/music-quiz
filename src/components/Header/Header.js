import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizMode } from '../../redux/player/playerSlice';
import { getQuizMode } from '../../redux/player/playerSelectors';
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
  // const [isClickHome, setIsClickHome] = useState(false);
  // const [selectValue, setSelectValue] = useState('QuizMode');
  const isRoboQuizMode = useSelector(getQuizMode);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeQuizMode = e => {
    navigate('/game');

    if (e.value === 'Robo-Quiz') {
      dispatch(setQuizMode(true));
      // setSelectValue('Robo-Quiz');
    }
    if (e.value === 'Music-Quiz') {
      dispatch(setQuizMode(false));
      // setSelectValue('Music-Quiz');
    }
  };

  const onClickNavItem = () => {
    setTimeout(() => {
      window.location.reload(false);
    });
  };

  return (
    <div className={s.container}>
      <NavLink to="/" onClick={onClickNavItem}>
        <Logo className={s.logo} />
      </NavLink>
      <div className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
          onClick={onClickNavItem}
        >
          Home
        </NavLink>
        <Select
          classNamePrefix="custom-select"
          onChange={handleChangeQuizMode}
          required
          options={options}
          placeholder="QuizMode"
          // placeholder={selectValue}
          isSearchable={false}
          defaultValue="ahdghjafg"
        />
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
          onClick={onClickNavItem}
        >
          Leaderboard
        </NavLink>
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
