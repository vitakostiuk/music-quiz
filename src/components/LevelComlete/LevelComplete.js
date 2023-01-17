import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getLevelCompleteInfo,
  getLevel,
  answerState,
  getQuizMode,
} from '../../redux/player/playerSelectors';
import {
  setSongsArr,
  setLevel,
  restartLevel,
  setClickAnswer,
  setCurrent,
  resetAnswerStateArray,
  resetLevelCompleteInfo,
  setStartPlayingTime,
} from '../../redux/player/playerSlice';
import { ReactComponent as WrongIcon } from '../../images/cross.svg';
import { ReactComponent as TrueIcon } from '../../images/checkmark.svg';
import { ReactComponent as RestartIcon } from '../../images/restart.svg';
import { ReactComponent as NextLVLIcon } from '../../images/arrow.svg';
import { ReactComponent as LeaderboardIcon } from '../../images/leaderboardIcon.svg';
import congratulation from './congratulation.json';
import motivation from './motivation.json';
import { shuffle } from '../../helpers/shuffle';
import { songs } from '../Game/songs';
import s from './LevelComplete.module.css';

const LevelComplete = () => {
  const dispatch = useDispatch();

  // Потім левел будемо брати з бекенда
  const level = useSelector(getLevel);
  const levelCompleteInfo = useSelector(getLevelCompleteInfo);
  const answersArray = useSelector(answerState);
  const isRoboQuizMode = useSelector(getQuizMode);

  // Перевіряємобчи є хоча б одна неправильна відповідь
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

  const handleClickNextLevel = () => {
    dispatch(setLevel());
    resetState();
  };

  const handleRestartLevel = () => {
    dispatch(restartLevel(level));
    resetState();
  };

  useEffect(() => {
    if (level > 1) {
      const songsArr = songs.find(({ stage }) => stage === level).quizInfo;
      dispatch(setSongsArr(songsArr));
    }
  }, [dispatch, level]);

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
              onClick={handleRestartLevel}
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
              onClick={handleClickNextLevel}
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
