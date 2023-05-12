import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizMode } from '../../redux/player/playerSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import { toggleLanguage } from '../../redux/player/playerSlice';
import {
  getLanguage,
  getCurrent,
  answerState,
} from '../../redux/player/playerSelectors';
import {
  getAvatarURL,
  getToken,
  getUserEmail,
} from '../../redux/auth/authSelectors';
import { logout } from '../../redux/auth/authOperations';
import { ReactComponent as Logo } from '../../images/main-logo1.svg';
import Popup from '../common/Popup';
import useOutsideClick from '../../hooks/useOutsideClick';
import s from './Header.module.css';
import './SelectList.scss';

const Header = () => {
  const [popup, setPopup] = useState(false);

  const ref = useRef();
  useOutsideClick(ref, setPopup);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const isEngLang = useSelector(getLanguage);
  const currentSong = useSelector(getCurrent);
  const answersArray = useSelector(answerState);
  const userAvatar = useSelector(getAvatarURL);
  const token = useSelector(getToken);
  const userEmail = useSelector(getUserEmail);

  const options = [
    {
      value: t('header.roboQuiz'),
      label: t('header.roboQuiz'),
    },
    {
      value: t('header.musicQuiz'),
      label: t('header.musicQuiz'),
    },
  ];

  useEffect(() => {
    if (isEngLang) {
      i18n.changeLanguage('en');
      return;
    }

    if (!isEngLang) {
      i18n.changeLanguage('uk');
      return;
    }
  }, [i18n, isEngLang]);

  // Select dropdown
  const handleChangeQuizMode = e => {
    // перехід на сторінку Music-Quiz/Robo-Quiz
    navigate('/game');

    // записуємо в редакс режим гри
    if (e.value === 'Robo-Quiz' || e.value === 'Режим робота') {
      dispatch(setQuizMode(true));
    }

    if (e.value === 'Music-Quiz' || e.value === 'Режим музики') {
      dispatch(setQuizMode(false));
    }
  };

  // Клік по home або leaderboard
  const onClickNavItem = () => {
    setTimeout(() => {
      window.location.reload(false);
    });
  };

  // Клік по логотипу
  const onClickLogo = () => {
    navigate('/');

    setTimeout(() => {
      window.location.reload(false);
    });
  };

  // Клік по перемикачу мови
  const onClickLangBtn = () => {
    dispatch(toggleLanguage());
  };

  // POPUP
  const handleClickExit = () => {
    dispatch(logout());
    setPopup(null);
  };

  const mouseEnterHandler = () => {
    setPopup(true);
  };
  const mouseLeaveHandler = () => {
    setPopup(false);
  };

  const handleClickAvatar = () => {
    if (popup) return setPopup(false);
    setPopup(true);
  };

  return (
    <div className={s.container}>
      <div onClick={onClickLogo}>
        <Logo className={s.logo} />
      </div>
      <div className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
          onClick={onClickNavItem}
        >
          {t('header.home')}
        </NavLink>
        <Select
          classNamePrefix="custom-select"
          onChange={handleChangeQuizMode}
          required
          options={options}
          placeholder={t('header.quizMode')}
          isSearchable={false}
          defaultValue="ahdghjafg"
        />
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
          onClick={onClickNavItem}
        >
          {t('header.leaderboard')}
        </NavLink>
      </div>
      {!token && (
        <button
          className={s.signin}
          type="button"
          onClick={() => navigate('/login')}
        >
          {t('header.signin')}
        </button>
      )}
      {!token && (
        <button
          className={s.signup}
          type="button"
          onClick={() => navigate('/register')}
        >
          {t('header.signup')}
        </button>
      )}
      <button className={s.language} onClick={onClickLangBtn}>
        {isEngLang ? 'ENG' : 'UA'}
      </button>
      <div className={s.avatarWrapper} ref={ref}>
        {token && (
          <div className={s.circle} onClick={handleClickAvatar}>
            <img
              src={
                userAvatar
                  ? userAvatar
                  : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
              }
              alt="avatar"
              className={s.avatar}
            />
          </div>
        )}
        {popup && (
          <Popup
            email={userEmail ?? ''}
            list={[
              {
                text: t('header.exit'),
              },
            ]}
            mouseEnterHandler={mouseEnterHandler}
            mouseLeaveHandler={mouseLeaveHandler}
            handleClickItem={handleClickExit}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
