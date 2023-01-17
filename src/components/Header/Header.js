import React, { useState } from 'react';
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
  const [selectValue, setSelectValue] = useState('QuizMode');
  const isRoboQuizMode = useSelector(getQuizMode);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeQuizMode = e => {
    if (e.value === 'Robo-Quiz') {
      dispatch(setQuizMode(true));
      setTimeout(() => {
        navigate('/game');
      }, 500);
      setSelectValue('Robo-Quiz');
      // navigate('/game');
    }

    if (e.value === 'Music-Quiz') {
      dispatch(setQuizMode(false));
      setTimeout(() => {
        navigate('/game');
      }, 500);
      setSelectValue('Music-Quiz');
      // navigate('/game');
    }

    // if (selectValue === 'Robo-Quiz' || selectValue === 'Music-Quiz') {
    //   navigate('/game');
    //   // setTimeout(() => {
    //   //   navigate('/game');
    //   // }, 500);
    // }
  };

  return (
    <div className={s.container}>
      <Logo className={s.logo} onClick={() => navigate('/')} />
      <div className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
        >
          Home
        </NavLink>
        <Select
          classNamePrefix="custom-select"
          onChange={handleChangeQuizMode}
          value={selectValue}
          required
          options={options}
          // placeholder="QuizMode"
          placeholder={selectValue}
          isSearchable={false}
          defaultValue="ahdghjafg"
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
