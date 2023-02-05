import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getLevelCompleteInfo,
  getLevelRoboEN,
  getLevelMusicEN,
  getLevelRoboUKR,
  getLevelMusicUKR,
  getQuizMode,
  getLanguage,
} from '../../redux/player/playerSelectors';
import {
  setNextLevelRoboEN,
  setNextLevelMusicEN,
  restartLevelRoboEN,
  restartLevelMusicEN,
  setNextLevelRoboUKR,
  setNextLevelMusicUKR,
  restartLevelRoboUKR,
  restartLevelMusicUKR,
  setClickAnswer,
  setCurrent,
  resetAnswerStateArray,
  resetLevelCompleteInfo,
  setStartPlayingTime,
} from '../../redux/player/playerSlice';
import {
  addLVLCompleteInfoEN,
  addLVLCompleteInfoUKR,
} from '../../redux/player/playerOperations';
import { ReactComponent as WrongIcon } from '../../images/cross.svg';
import { ReactComponent as TrueIcon } from '../../images/checkmark.svg';
import { ReactComponent as RestartIcon } from '../../images/restart.svg';
import { ReactComponent as NextLVLIcon } from '../../images/arrow.svg';
import { ReactComponent as LeaderboardIcon } from '../../images/leaderboardIcon.svg';
import congratulation from './congratulation.json';
import motivation from './motivation.json';
import { shuffle } from '../../helpers/shuffle';
import s from './LevelComplete.module.css';

const LevelComplete = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Потім левел будемо брати з бекенда
  const isEngLang = useSelector(getLanguage);

  const levelRoboEN = useSelector(getLevelRoboEN);
  const levelMusicEN = useSelector(getLevelMusicEN);

  const levelRoboUKR = useSelector(getLevelRoboUKR);
  const levelMusicUKR = useSelector(getLevelMusicUKR);

  const levelCompleteInfo = useSelector(getLevelCompleteInfo);
  // console.log('levelCompleteInfo', levelCompleteInfo);
  const isRoboQuizMode = useSelector(getQuizMode);

  // Перевіряємо, чи є хоча б одна неправильна відповідь
  const filteredByWrongAnswers = levelCompleteInfo.filter(
    ({ isRightAnswer }) => isRightAnswer === false
  );

  // Ф-я перемішує масив, щоб коджного разу були рандомні вислови
  const shuffleText = array => {
    const shuffleArray = shuffle(array);
    return shuffleArray[0].eng;
  };

  // Ф-я скидає всі стейти до початкового (InitialState)
  const resetState = () => {
    dispatch(setCurrent(0));
    dispatch(setClickAnswer(false));
    dispatch(resetAnswerStateArray([]));
    dispatch(resetLevelCompleteInfo([]));
    dispatch(setStartPlayingTime(''));
  };

  const handleClickNextLevelEN = () => {
    if (!isEngLang) return;

    // ВІДПРАВЛЯЄМО НА БЕКЕНД levelCompleteInfo
    // --1-- загальний час, за який пройдено рiвень
    const totalTime = levelCompleteInfo
      .reduce((acc, { time }) => {
        return acc + time;
      }, 0)
      .toFixed(2);

    // --2-- Об'єкт,який відправляємо на бекенд
    const userLevelCompleteInfo = {
      isRoboQuizMode,
      level: isRoboQuizMode ? levelRoboEN : levelMusicEN,
      time: Number(totalTime),
    };

    // --3-- Діспатчимо об'єкт
    dispatch(addLVLCompleteInfoEN(userLevelCompleteInfo));

    // Збільшуємо левел на 1 і ресетимо дані
    if (isRoboQuizMode) {
      dispatch(setNextLevelRoboEN());
    } else {
      dispatch(setNextLevelMusicEN());
    }

    resetState();
  };

  const handleClickNextLevelUKR = () => {
    if (isEngLang) return;

    // ВІДПРАВЛЯЄМО НА БЕКЕНД levelCompleteInfo
    // --1-- загальний час, за який пройдено рiвень
    const totalTime = levelCompleteInfo
      .reduce((acc, { time }) => {
        return acc + time;
      }, 0)
      .toFixed(2);

    // --2-- Об'єкт,який відправляємо на бекенд
    const userLevelCompleteInfo = {
      isRoboQuizMode,
      level: isRoboQuizMode ? levelRoboUKR : levelMusicUKR,
      time: Number(totalTime),
    };

    // --3-- Діспатчимо об'єкт
    dispatch(addLVLCompleteInfoUKR(userLevelCompleteInfo));

    // Збільшуємо левел на 1 і ресетимо дані
    if (isRoboQuizMode) {
      dispatch(setNextLevelRoboUKR());
    } else {
      dispatch(setNextLevelMusicUKR());
    }

    resetState();
  };

  const handleRestartLevelEN = () => {
    if (!isEngLang) return;

    if (isRoboQuizMode) {
      dispatch(restartLevelRoboEN(levelRoboEN));
    } else {
      dispatch(restartLevelMusicEN(levelMusicEN));
    }

    resetState();
  };

  const handleRestartLevelUKR = () => {
    if (isEngLang) return;

    if (isRoboQuizMode) {
      dispatch(restartLevelRoboUKR(levelRoboUKR));
    } else {
      dispatch(restartLevelMusicUKR(levelMusicUKR));
    }

    resetState();
  };

  return (
    <>
      {' '}
      <div className={s.wrapper}>
        {' '}
        {levelCompleteInfo.length !== 0 && (
          <h1
            className={
              filteredByWrongAnswers.length === 0
                ? s.congratulation
                : s.motivation
            }
          >
            {filteredByWrongAnswers.length === 0
              ? shuffleText(congratulation)
              : shuffleText(motivation)}
          </h1>
        )}
        <ul className={s.list}>
          {levelCompleteInfo &&
            levelCompleteInfo.map(
              ({ isRightAnswer, answerSong, time }, idx) => (
                <li key={idx} className={s.item}>
                  <p className={isRoboQuizMode ? s.numRobo : s.numMusic}>
                    {idx + 1}.
                  </p>
                  <p
                    className={isRightAnswer ? s.trueSongName : s.wrongSongName}
                  >
                    {answerSong}
                    .................................................................................
                  </p>
                  <div className={s.timeAndIconsWrapper}>
                    {' '}
                    <p className={isRightAnswer ? s.trueTime : s.wrongTime}>
                      {time} sec.
                    </p>
                    <div className={s.iconsWrapper}>
                      {' '}
                      {isRightAnswer ? (
                        <TrueIcon className={s.trueIcon} />
                      ) : (
                        <WrongIcon className={s.wrongIcon} />
                      )}
                    </div>
                  </div>
                </li>
              )
            )}

          {levelCompleteInfo.length !== 0 && (
            <p className={isRoboQuizMode ? s.totalRobo : s.totalMusic}>
              total:&nbsp;
              {levelCompleteInfo
                .reduce((acc, { time }) => {
                  return acc + time;
                }, 0)
                .toFixed(2)}
              &nbsp;sec.
            </p>
          )}
        </ul>
      </div>
      {levelCompleteInfo.length !== 0 && (
        <div className={s.btnsContainer}>
          {' '}
          <div className={s.btnsWrapper}>
            {' '}
            <button
              className={isRoboQuizMode ? s.buttonRobo : s.buttonMusic}
              type="button"
              onClick={isEngLang ? handleRestartLevelEN : handleRestartLevelUKR}
            >
              Restart
              <RestartIcon className={s.icon} />
            </button>
          </div>
          <div div className={s.btnsWrapper}>
            {' '}
            <button
              className={
                isRoboQuizMode ? s.buttonNextLVLRobo : s.buttonNextLVLMusic
              }
              type="button"
              onClick={
                isEngLang ? handleClickNextLevelEN : handleClickNextLevelUKR
              }
            >
              NEXT LEVEL
              <NextLVLIcon className={s.icon} />
            </button>
          </div>
          <div div className={s.btnsWrapper}>
            {' '}
            <button
              className={isRoboQuizMode ? s.buttonRobo : s.buttonMusic}
              type="button"
              onClick={() => navigate('/leaderboard')}
            >
              leaderboard
              <LeaderboardIcon className={s.icon} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LevelComplete;
