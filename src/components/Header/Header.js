import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {
  setQuizMode,
  toggleLanguage,
  resetState,
} from '../../redux/player/playerSlice';
import { getLanguage, answerState } from '../../redux/player/playerSelectors';
import { getToken } from '../../redux/auth/authSelectors';
import { ReactComponent as Logo } from '../../images/main-logo1.svg';
import AvatarButton from './AvatarButton';
import Popup from '../common/Popup';
import useOutsideClick from '../../hooks/useOutsideClick';
import s from './Header.module.css';
import './SelectList.scss';

const Header = () => {
  const [logoPopup, setLogoPopup] = useState(false);
  const [homePopup, setHomePopup] = useState(false);
  const [quizModePopup, setQuizModePopup] = useState(false);
  const [leaderboardPopup, setLeaderboardPopup] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);
  const [isActiveHome, setIsActiveHome] = useState(true);
  const [isActiveLeaderboard, setIsActiveLeaderboard] = useState(false);
  const [isActiveQuizMode, setIsActiveQuizMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const refLogo = useRef();
  const refHome = useRef();
  const refQuizMode = useRef();
  const refLeaderboarde = useRef();
  const refLanguage = useRef();
  const refAvatar = useRef();
  useOutsideClick(refLogo, setLogoPopup);
  useOutsideClick(refHome, setHomePopup);
  useOutsideClick(refQuizMode, setQuizModePopup);
  useOutsideClick(refLeaderboarde, setLeaderboardPopup);
  useOutsideClick(refLanguage, setLanguagePopup);

  const isEngLang = useSelector(getLanguage);
  const token = useSelector(getToken);
  const answers = useSelector(answerState);

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

    setIsActiveQuizMode(true);
    setIsActiveHome(false);
    setIsActiveLeaderboard(false);

    // записуємо в редакс режим гри
    if (e.value === 'Robo-Quiz' || e.value === 'Режим робота') {
      dispatch(setQuizMode(true));
      dispatch(resetState());
      return;
    }

    if (e.value === 'Music-Quiz' || e.value === 'Режим музики') {
      dispatch(setQuizMode(false));
      dispatch(resetState());
      return;
    }
  };

  // Клік по guizMode
  const onClickQuizMode = () => {
    // Попап при натисканні на вибір режиму гри в режимі гри
    if (answers.length > 0) {
      if (quizModePopup) return setQuizModePopup(false);
      setQuizModePopup(true);

      setIsActiveQuizMode(true);
      setIsActiveHome(false);
      setIsActiveLeaderboard(false);
    }
  };

  // Клік по home
  const onClickHome = () => {
    if (answers.length === 0) {
      setIsActiveHome(true);
      setIsActiveLeaderboard(false);
      setIsActiveQuizMode(false);
      navigate('/');
    }

    // Попап при натисканні на головну в режмі гри
    if (answers.length > 0) {
      if (homePopup) return setHomePopup(false);
      setHomePopup(true);
    }
  };

  // Клік по leaderboard
  const onClickleaderboard = () => {
    if (answers.length === 0) {
      setIsActiveLeaderboard(true);
      setIsActiveHome(false);
      setIsActiveQuizMode(false);
      navigate('/leaderboard');
    }

    // Попап при натисканні на лідерборд в режмі гри
    if (answers.length > 0) {
      if (leaderboardPopup) return setLeaderboardPopup(false);
      setLeaderboardPopup(true);
    }
  };

  // Клік по логотипу
  const onClickLogo = () => {
    if (answers.length === 0) {
      navigate('/');
    }

    // Попап при натисканні на лого в режмі гри
    if (answers.length > 0) {
      if (logoPopup) return setLogoPopup(false);
      setLogoPopup(true);
    }

    // setTimeout(() => {
    //   window.location.reload(false);
    // });
  };

  // Клік по перемикачу мови
  const onClickLangBtn = () => {
    if (answers.length === 0) {
      dispatch(toggleLanguage());
    }

    // Попап при натисканні на мову в режмі гри
    if (answers.length > 0) {
      if (languagePopup) return setLanguagePopup(false);
      setLanguagePopup(true);
    }
  };

  // POPUP BUTTONS (попап коли в грі натискається будь-що з хедеру (крім мови))
  const onClickLeaveGameBtn = to => {
    setLogoPopup(null);
    setHomePopup(null);
    setQuizModePopup(null);
    setLeaderboardPopup(null);
    // setLanguagePopup(null);

    dispatch(resetState());

    navigate(`/${to}`);
  };
  const onClickContinueGameBtn = () => {
    setLogoPopup(null);
    setHomePopup(null);
    setQuizModePopup(null);
    setLeaderboardPopup(null);
    setLanguagePopup(null);
  };

  // POPUP BUTTONS (попап коли в грі натискається перемикач мови)
  const onClickLeaveGameBtnLang = to => {
    setLanguagePopup(null);

    dispatch(resetState());
    dispatch(toggleLanguage());
  };

  return (
    <div className={s.container}>
      <div onClick={onClickLogo} ref={refLogo}>
        <Logo className={s.logo} />
        {logoPopup && (
          <Popup
            title={t('popup.title')}
            handleClickLeaveBtn={onClickLeaveGameBtn}
            handleClickContinueBtn={onClickContinueGameBtn}
            to=""
          />
        )}
      </div>

      <div className={s.navigation}>
        <div ref={refHome}>
          <div
            className={isActiveHome ? s.activeStyle : s.navItem}
            onClick={onClickHome}
          >
            {t('header.home')}
          </div>
          {homePopup && (
            <Popup
              title={t('popup.title')}
              handleClickLeaveBtn={onClickLeaveGameBtn}
              handleClickContinueBtn={onClickContinueGameBtn}
              to=""
            />
          )}
        </div>

        {answers.length === 0 && (
          <Select
            classNamePrefix="custom-select"
            onChange={handleChangeQuizMode}
            required
            options={options}
            placeholder={t('header.quizMode')}
            isSearchable={false}
            defaultValue="ahdghjafg"
          />
        )}
        {answers.length > 0 && (
          <div
            onClick={onClickQuizMode}
            ref={refQuizMode}
            className={isActiveQuizMode ? s.activeStyle : s.navItem}
          >
            {t('header.quizMode')}
            {quizModePopup && (
              <Popup
                title={t('popup.title')}
                handleClickLeaveBtn={onClickLeaveGameBtn}
                handleClickContinueBtn={onClickContinueGameBtn}
                to=""
              />
            )}
          </div>
        )}
        <div ref={refLeaderboarde}>
          <div
            className={isActiveLeaderboard ? s.activeStyle : s.navItem}
            onClick={onClickleaderboard}
          >
            {t('header.leaderboard')}
          </div>
          {leaderboardPopup && (
            <Popup
              title={t('popup.title')}
              handleClickLeaveBtn={onClickLeaveGameBtn}
              handleClickContinueBtn={onClickContinueGameBtn}
              to="leaderboard"
            />
          )}
        </div>
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
      <div ref={refLanguage}>
        <button className={s.language} onClick={onClickLangBtn}>
          {isEngLang ? 'ENG' : 'UA'}
        </button>
        {languagePopup && (
          <Popup
            title={t('popup.title')}
            handleClickLeaveBtn={onClickLeaveGameBtnLang}
            handleClickContinueBtn={onClickContinueGameBtn}
            to=""
          />
        )}
      </div>
      <div>
        <AvatarButton />
      </div>
    </div>
  );
};

export default Header;

// setTimeout(() => {
//   window.location.reload(false);
// });
