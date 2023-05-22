import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import { setQuizMode, toggleLanguage } from '../../redux/player/playerSlice';
import { getLanguage } from '../../redux/player/playerSelectors';
import { getToken } from '../../redux/auth/authSelectors';
import { ReactComponent as Logo } from '../../images/main-logo1.svg';
import AvatarButton from './AvatarButton';
import s from './Header.module.css';
import './SelectList.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const isEngLang = useSelector(getLanguage);
  const token = useSelector(getToken);

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
      return;
    }

    if (e.value === 'Music-Quiz' || e.value === 'Режим музики') {
      dispatch(setQuizMode(false));
      return;
    }
  };

  // Клік по home або leaderboard
  const onClickNavItem = () => {
    // setTimeout(() => {
    //   window.location.reload(false);
    // });
  };

  // Клік по логотипу
  const onClickLogo = () => {
    navigate('/');

    // setTimeout(() => {
    //   window.location.reload(false);
    // });
  };

  // Клік по перемикачу мови
  const onClickLangBtn = () => {
    dispatch(toggleLanguage());
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
        <div>
          <Select
            classNamePrefix="custom-select"
            onChange={handleChangeQuizMode}
            required
            options={options}
            placeholder={t('header.quizMode')}
            isSearchable={false}
            defaultValue="ahdghjafg"
          />
        </div>
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
      {/* <LanguageButton /> */}
      <AvatarButton />
    </div>
  );
};

export default Header;
