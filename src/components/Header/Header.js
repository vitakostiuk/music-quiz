import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLanguage, resetState } from '../../redux/player/playerSlice';
import {
  getLanguage,
  getAnswerState,
  getPathname,
} from '../../redux/player/playerSelectors';
import { getToken } from '../../redux/auth/authSelectors';
import { ReactComponent as Logo } from '../../images/main-logo1.svg';
import { ReactComponent as Arrow } from '../../images/dropdown-arrow.svg';
import AvatarButton from './AvatarButton';
import Popup from '../common/Popup';
import QuizModeButton from './QuizModeButton/QuizModeButton';
import { useOutsideClick } from '../../hooks';
import s from './Header.module.css';

const Header = () => {
  const { t, i18n } = useTranslation();

  const [logoPopup, setLogoPopup] = useState(false);
  const [homePopup, setHomePopup] = useState(false);
  const [quizModePopup, setQuizModePopup] = useState(false);
  const [leaderboardPopup, setLeaderboardPopup] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);
  const [signinPopup, setSigninPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [isActiveHome, setIsActiveHome] = useState(true);
  const [isActiveLeaderboard, setIsActiveLeaderboard] = useState(false);
  const [isActiveQuizMode, setIsActiveQuizMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const refLogo = useRef();
  const refHome = useRef();
  const refQuizMode = useRef();
  const refLeaderboarde = useRef();
  const refLanguage = useRef();
  const refSignin = useRef();
  const refSignup = useRef();
  useOutsideClick(refLogo, setLogoPopup);
  useOutsideClick(refHome, setHomePopup);
  useOutsideClick(refQuizMode, setQuizModePopup);
  useOutsideClick(refLeaderboarde, setLeaderboardPopup);
  useOutsideClick(refLanguage, setLanguagePopup);
  useOutsideClick(refSignin, setSigninPopup);
  useOutsideClick(refSignup, setSignupPopup);

  const isEngLang = useSelector(getLanguage);
  const token = useSelector(getToken);
  const answers = useSelector(getAnswerState);
  const pathname = useSelector(getPathname);

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

  // Клік по guizMode
  const onClickQuizMode = () => {
    setIsActiveQuizMode(true);
    setIsActiveHome(false);
    setIsActiveLeaderboard(false);
  };

  // Клік по guizMode під час гри
  const onClickQuizModeOnGame = () => {
    if (answers.length === 0 || pathname === '/game') {
      setIsActiveQuizMode(true);
      setIsActiveHome(false);
      setIsActiveLeaderboard(false);
      dispatch(resetState());

      return;
    }

    // Попап при натисканні на головну в режмі гри
    if (answers.length > 0 && pathname !== '/game') {
      if (quizModePopup) return setQuizModePopup(false);
      setQuizModePopup(true);

      return;
    }
  };

  // Клік по home
  const onClickHome = () => {
    if (answers.length === 0 || pathname === '/game') {
      setIsActiveHome(true);
      setIsActiveLeaderboard(false);
      setIsActiveQuizMode(false);
      dispatch(resetState());
      navigate('/');

      return;
    }

    // Попап при натисканні на головну в режмі гри
    if (answers.length > 0 && pathname !== '/game') {
      if (homePopup) return setHomePopup(false);
      setHomePopup(true);

      return;
    }
  };

  // Клік по leaderboard
  const onClickleaderboard = () => {
    if (answers.length === 0 || pathname === '/game') {
      setIsActiveLeaderboard(true);
      setIsActiveHome(false);
      setIsActiveQuizMode(false);
      dispatch(resetState());
      navigate('/leaderboard');

      return;
    }

    // Попап при натисканні на лідерборд в режмі гри
    if (answers.length > 0 && pathname !== '/game') {
      if (leaderboardPopup) return setLeaderboardPopup(false);
      setLeaderboardPopup(true);

      return;
    }
  };

  // Клік по логотипу
  const onClickLogo = () => {
    if (answers.length === 0 || pathname === '/game') {
      setIsActiveQuizMode(false);
      dispatch(resetState());
      navigate('/');

      return;
    }

    // Попап при натисканні на лого в режмі гри
    if (answers.length > 0 && pathname !== '/game') {
      if (logoPopup) return setLogoPopup(false);
      setLogoPopup(true);

      return;
    }
  };

  // Клік по перемикачу мови
  const onClickLangBtn = () => {
    if (answers.length === 0 || pathname === '/game') {
      dispatch(toggleLanguage());
      dispatch(resetState());

      return;
    }

    // Попап при натисканні на мову в режмі гри
    if (answers.length > 0 && pathname !== '/game') {
      if (languagePopup) return setLanguagePopup(false);
      setLanguagePopup(true);

      return;
    }
  };

  // Клік по signin
  const onClickSignIn = () => {
    if (answers.length === 0 || pathname === '/game') {
      setIsActiveQuizMode(false);
      dispatch(resetState());
      navigate('/login');

      return;
    }

    // Попап при натисканні на signin в режмі гри
    if (answers.length > 0 && pathname !== '/game') {
      if (signinPopup) return setSigninPopup(false);
      setSigninPopup(true);

      return;
    }
  };

  // Клік по signup
  const onClickSignUp = () => {
    if (answers.length === 0 || pathname === '/game') {
      setIsActiveQuizMode(false);
      dispatch(resetState());
      navigate('/register');

      return;
    }

    // Попап при натисканні на signin в режмі гри
    if (answers.length > 0 && pathname !== '/game') {
      if (signupPopup) return setSignupPopup(false);
      setSignupPopup(true);

      return;
    }
  };

  // POPUP BUTTONS (попап коли в грі натискається будь-що з хедеру (крім мови))
  const onClickLeaveGameBtn = to => {
    setLogoPopup(null);
    setHomePopup(null);
    setQuizModePopup(null);
    setLeaderboardPopup(null);
    setSigninPopup(null);
    setSignupPopup(null);

    dispatch(resetState());

    // щоб змінювався режим гри на дефолтне знеачення
    setIsActiveQuizMode(false);

    navigate(`/${to}`);
  };
  const onClickContinueGameBtn = () => {
    setLogoPopup(null);
    setHomePopup(null);
    setQuizModePopup(null);
    setLeaderboardPopup(null);
    setLanguagePopup(null);
    setSigninPopup(null);
    setSignupPopup(null);
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
        <div className={s.navWrapper} ref={refHome}>
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

        <div className={s.navWrapper}>
          <QuizModeButton
            className={isActiveQuizMode ? s.activeStyle : s.navItem}
            onClickQuizMode={onClickQuizMode}
            onClickQuizModeOnGame={onClickQuizModeOnGame}
            isActiveQuizMode={isActiveQuizMode}
          >
            <Arrow className={isActiveQuizMode ? s.arrowActive : s.arrow} />
          </QuizModeButton>
        </div>

        <div className={s.navWrapper} ref={refLeaderboarde}>
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
        <div ref={refSignin}>
          <button className={s.signin} type="button" onClick={onClickSignIn}>
            {t('header.signin')}
          </button>
          {signinPopup && (
            <Popup
              title={t('popup.title')}
              handleClickLeaveBtn={onClickLeaveGameBtn}
              handleClickContinueBtn={onClickContinueGameBtn}
              to="login"
            />
          )}
        </div>
      )}
      {!token && (
        <div ref={refSignup}>
          <button className={s.signup} type="button" onClick={onClickSignUp}>
            {t('header.signup')}
          </button>
          {signupPopup && (
            <Popup
              title={t('popup.title')}
              handleClickLeaveBtn={onClickLeaveGameBtn}
              handleClickContinueBtn={onClickContinueGameBtn}
              to="register"
            />
          )}
        </div>
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
