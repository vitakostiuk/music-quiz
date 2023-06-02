import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClick } from '../../../hooks';
import { resetState, setQuizMode } from '../../../redux/player/playerSlice';
import {
  getQuizMode,
  getLanguage,
  getAnswerState,
} from '../../../redux/player/playerSelectors';
import Popup from '../../common/Popup';
import { ReactComponent as RoboIcon } from '../../../images/Robo_icon_gray.svg';
import { ReactComponent as MusicIcon } from '../../../images/Music_icon_Gray.svg';
import s from '../Header.module.css';

import React from 'react';

const QuizModeButton = ({
  className,
  onClickQuizMode,
  onClickQuizModeOnGame,
  isActiveQuizMode,
  children,
}) => {
  const { t } = useTranslation();

  const isEngLang = useSelector(getLanguage);

  const [popup, setPopup] = useState(false);
  const [popupOnGame, setPopupOnGame] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const isRoboQuizMode = useSelector(getQuizMode);
  const answers = useSelector(getAnswerState);

  const ref = useRef();
  const refOnGame = useRef();
  useOutsideClick(ref, setPopup);
  useOutsideClick(refOnGame, setPopupOnGame);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mouseEnterHandler = () => {
    setPopup(true);
  };
  const mouseLeaveHandler = () => {
    setPopup(false);
  };

  // клік по вибору режиму
  const handleClickQuizMode = () => {
    if (popup) return setPopup(false);
    setPopup(true);

    onClickQuizMode();
    setSelectedValue(t('header.quizMode'));
  };

  // клік по вибору режиму під час гри
  const handleClickQuizModeOnGame = () => {
    if (popupOnGame) return setPopupOnGame(false);
    setPopupOnGame(true);

    onClickQuizModeOnGame();
  };

  // Select dropdown
  const handleChangeQuizMode = item => {
    // перехід на сторінку Music-Quiz/Robo-Quiz
    navigate('/game');

    setSelectedValue(t('header.quizMode'));

    // записуємо в редакс режим гри
    if (item === 'Robo-Quiz' || item === 'Режим робота') {
      setSelectedValue(item);
      dispatch(setQuizMode(true));
      dispatch(resetState());
      return;
    }

    if (item === 'Music-Quiz' || item === 'Режим музики') {
      setSelectedValue(item);
      dispatch(setQuizMode(false));
      dispatch(resetState());
      return;
    }
  };

  // щоб змінювалась мова режиму при перемиканні мови
  useEffect(() => {
    if (isRoboQuizMode) {
      setSelectedValue(t('header.roboQuiz'));
      return;
    }

    if (!isRoboQuizMode) {
      setSelectedValue(t('header.musicQuiz'));
      return;
    }
  }, [isEngLang, isRoboQuizMode, t]);

  // POPUP BUTTONS (попап коли в грі натискається будь-що з хедеру)
  const onClickLeaveGameBtn = to => {
    setPopupOnGame(null);

    // щоб змінювався режим гри на дефолтне знеачення
    setSelectedValue(t('header.quizMode'));

    dispatch(resetState());

    navigate(`/${to}`);
  };

  const onClickContinueGameBtn = () => {
    setPopupOnGame(null);
  };

  return (
    <>
      <div className={s.quizModeWrapper}>
        <div
          className={className}
          onClick={
            answers.length === 0
              ? handleClickQuizMode
              : handleClickQuizModeOnGame
          }
        >
          {!isActiveQuizMode ? t('header.quizMode') : selectedValue}

          {children}
        </div>

        {popup && (
          <Popup
            list={[
              {
                text: t('header.roboQuiz'),
                icon: <RoboIcon />,
              },
              {
                text: t('header.musicQuiz'),
                icon: <MusicIcon />,
              },
            ]}
            mouseEnterHandler={mouseEnterHandler}
            mouseLeaveHandler={mouseLeaveHandler}
            handleClickItem={handleChangeQuizMode}
          />
        )}
      </div>
      <div ref={refOnGame}>
        {popupOnGame && (
          <Popup
            title={t('popup.title')}
            handleClickLeaveBtn={onClickLeaveGameBtn}
            handleClickContinueBtn={onClickContinueGameBtn}
            to=""
          />
        )}
      </div>
    </>
  );
};

QuizModeButton.propTypes = {
  className: PropTypes.string.isRequired,
  onClickQuizMode: PropTypes.func.isRequired,
  onClickQuizModeOnGame: PropTypes.func.isRequired,
  isActiveQuizMode: PropTypes.bool.isRequired,
};

export default QuizModeButton;
