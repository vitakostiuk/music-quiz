import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLevelRoboEN,
  setLevelMusicEN,
  setLevelRoboUKR,
  setLevelMusicUKR,
  setSongsArrEN,
  setSongsArrUKR,
} from '../../redux/player/playerSlice';
import {
  getQuizMode,
  getLevelRoboEN,
  getLevelMusicEN,
  getLevelRoboUKR,
  getLevelMusicUKR,
  getLanguage,
  getSongsListEN,
  getSongsListUKR,
  getCurrent,
  answerState,
  getUserScoreEN,
  getUserScoreUKR,
  getIsLoading,
} from '../../redux/player/playerSelectors';
import {
  getAllEngByUser,
  getAllUkrByUser,
} from '../../redux/player/playerOperations';
import { getUserID } from '../../redux/auth/authSelectors';
import Paper from '../common/Paper';
import Player from '../Player';
import Answers from '../Answers';
import { songs } from './songs';
import { songsEn } from '../Game/songsEN';
import Loader from '../common/Loader';
import s from './Game.module.css';

const Game = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const userID = useSelector(getUserID);
  const userScoreEN = useSelector(getUserScoreEN);
  const userScoreUKR = useSelector(getUserScoreUKR);
  const isRoboQuizMode = useSelector(getQuizMode);

  const levelRoboEN = useSelector(getLevelRoboEN);
  const levelMusicEN = useSelector(getLevelMusicEN);

  const levelRoboUKR = useSelector(getLevelRoboUKR);
  const levelMusicUKR = useSelector(getLevelMusicUKR);

  const isEngLang = useSelector(getLanguage);
  const songsListEN = useSelector(getSongsListEN);
  const songsListUKR = useSelector(getSongsListUKR);
  const currentSong = useSelector(getCurrent);
  const answers = useSelector(answerState);

  const isLoading = useSelector(getIsLoading);

  // Витягуэмо з бекенду інформацію про скор юзера (ENG).
  // Це треба для того, щоб потім запускати гру з того левела, на якму юзер закінчив
  useEffect(() => {
    if (!isEngLang) return;

    if (userID) {
      dispatch(getAllEngByUser(userID));
    }
  }, [dispatch, userID, isRoboQuizMode, isEngLang]);

  // Витягуэмо з бекенду інформацію про скор юзера (UKR).
  // Це треба для того, щоб потім запускати гру з того левела, на якму юзер закінчив
  useEffect(() => {
    if (isEngLang) return;

    if (userID) {
      dispatch(getAllUkrByUser(userID));
    }
  }, [dispatch, userID, isRoboQuizMode, isEngLang]);

  // Обробка інформацїї про скор юзера (ENG)
  useEffect(() => {
    if (!isEngLang) return;

    // -- 1.1 -- ФІЛЬТРУЄМО ПО РЕЖИМУ РОБОТ (ENG)
    const userScoreInfoRoboEN = userScoreEN.filter(
      item => item.isRoboQuizMode === 'true'
    );
    // console.log('userScoreInfoRoboEN', userScoreInfoRoboEN);
    if (userScoreInfoRoboEN.length !== 0 && userScoreInfoRoboEN.length !== 5) {
      dispatch(setLevelRoboEN(userScoreInfoRoboEN));
    }
    if (isRoboQuizMode && userScoreInfoRoboEN.length === 5) {
      navigate('/leaderboard');
    }

    // -- 1.2 -- ФІЛЬТРУЄМО ПО РЕЖИМУ МУЗИКА (ENG)
    const userScoreInfoMusicEN = userScoreEN.filter(
      item => item.isRoboQuizMode === 'false'
    );
    // console.log('userScoreInfoMusicEN', userScoreInfoMusicEN);
    console.log(userScoreInfoMusicEN.length);
    if (
      userScoreInfoMusicEN.length !== 0 &&
      userScoreInfoMusicEN.length !== 5
    ) {
      dispatch(setLevelMusicEN(userScoreInfoMusicEN));
    }
    if (!isRoboQuizMode && userScoreInfoMusicEN.length === 5) {
      navigate('/leaderboard');
    }
  }, [dispatch, isEngLang, isRoboQuizMode, navigate, userScoreEN]);

  // Обробка інформацїї про скор юзера (UKR)
  useEffect(() => {
    if (isEngLang) return;

    // -- 1.1 -- ФІЛЬТРУЄМО ПО РЕЖИМУ РОБОТ (UKR)
    const userScoreInfoRoboUKR = userScoreUKR.filter(
      item => item.isRoboQuizMode === 'true'
    );
    // console.log('userScoreInfoRoboUKR', userScoreInfoRoboUKR);
    if (
      userScoreInfoRoboUKR.length !== 0 &&
      userScoreInfoRoboUKR.length !== 5
    ) {
      dispatch(setLevelRoboUKR(userScoreInfoRoboUKR));
    }
    if (userScoreInfoRoboUKR.length === 5) {
      navigate('/leaderboard');
    }

    // -- 1.2 -- ФІЛЬТРУЄМО ПО РЕЖИМУ МУЗИКА (UKR)
    const userScoreInfoMusicUKR = userScoreUKR.filter(
      item => item.isRoboQuizMode === 'false'
    );
    // console.log('userScoreInfoMusicUKR', userScoreInfoMusicUKR);
    if (
      userScoreInfoMusicUKR.length !== 0 &&
      userScoreInfoMusicUKR.length !== 5
    ) {
      dispatch(setLevelMusicUKR(userScoreInfoMusicUKR));
    }
    if (userScoreInfoMusicUKR.length === 5) {
      navigate('/leaderboard');
    }
  }, [
    dispatch,
    isEngLang,
    isRoboQuizMode,
    navigate,
    userScoreEN,
    userScoreUKR,
  ]);

  const handleClickSong = idx => {
    // console.log(songsListEN[idx].name);
    // // dispatch(togglePlaying());
    // dispatch(setCurrent(idx));
  };

  // Classname кнопок для правильної/неправильної відповіді, для актиної і неактиної пісні
  const setClassnameButtons = idx => {
    if (answers) {
      if (currentSong > idx && answers[idx] === true) {
        return s.right;
      }
      if (currentSong > idx && answers[idx] === false) {
        return s.wrong;
      }
      if (idx === 4) {
        if (answers[idx] === true) {
          return s.right;
        } else if (answers[idx] === false) {
          return s.wrong;
        }
      }
    }

    // Режим гри - ROBO-MODE або MUSIC-MODE
    if (currentSong === idx && isRoboQuizMode) {
      return s.currentRobo;
    }
    if (currentSong === idx && !isRoboQuizMode) {
      return s.currentMusic;
    }
    if (currentSong < idx) {
      return s.inactive;
    }
  };

  // Задання кольору ліній між кнопками
  const setClassnameLine = idx => {
    if (answers) {
      // Перша кнопка --- друга кнопка (якщо друга каррент)
      // ROBO-MODE
      if (isRoboQuizMode) {
        if ((idx === 0 || idx === 1 || idx === 2) && currentSong === idx + 1) {
          if (answers[idx] === false) {
            return s.firsWrongThenCurrentLineRobo;
          }
          if (answers[idx] === true) {
            return s.firstTrueThenCurrentLineRobo;
          }
        }
      }
      // MUSIC-MODE
      if (!isRoboQuizMode) {
        if ((idx === 0 || idx === 1 || idx === 2) && currentSong === idx + 1) {
          if (answers[idx] === false) {
            return s.firsWrongThenCurrentLineMusic;
          }
          if (answers[idx] === true) {
            return s.firstTrueThenCurrentLineMusic;
          }
        }
      }

      // перша --- друга, друга --- третя, третя --- четвета (якщо настпуна НЕвірна)
      if (
        (idx === 0 || idx === 1 || idx === 2 || idx === 3) &&
        answers[idx + 1] === false
      ) {
        if (answers[idx] === false) {
          return s.doubleWrongLine;
        }
        if (answers[idx] === true) {
          return s.firsWrongThenTrueLine;
        }
      }

      // перша --- друга, друга --- третя, третя --- четвета (якщо настпуна вірна)
      if (
        (idx === 0 || idx === 1 || idx === 2 || idx === 3) &&
        answers[idx + 1] === true
      ) {
        if (answers[idx] === true) {
          return s.doubleTrueLine;
        }
        if (answers[idx] === false) {
          return s.firstTrueThenWrongLine;
        }
      }

      // Четверта --- остання (якщо остання каррент)
      // ROBO-MODE
      if (isRoboQuizMode) {
        if (idx === 3 && currentSong === idx + 1) {
          if (answers[idx] === false) {
            return s.firsWrongThenCurrentLineRobo;
          }
          if (answers[idx] === true) {
            return s.firstTrueThenCurrentLineRobo;
          }
        }
      }
      // MUSIC-MODE
      if (!isRoboQuizMode) {
        if (idx === 3 && currentSong === idx + 1) {
          if (answers[idx] === false) {
            return s.firsWrongThenCurrentLineMusic;
          }
          if (answers[idx] === true) {
            return s.firstTrueThenCurrentLineMusic;
          }
        }
      }
    }

    return s.line;
  };

  // Оновлення левела (ENG)
  useEffect(() => {
    if (!isEngLang) return;

    if ((levelRoboEN > 1 || levelRoboEN === 1) && isRoboQuizMode) {
      const songsArr = songsEn.find(
        ({ stage }) => stage === levelRoboEN
      ).quizInfo;
      dispatch(setSongsArrEN(songsArr));
    }
    if ((levelMusicEN > 1 || levelMusicEN === 1) && !isRoboQuizMode) {
      const songsArr = songsEn.find(
        ({ stage }) => stage === levelMusicEN
      ).quizInfo;
      dispatch(setSongsArrEN(songsArr));
    }
  }, [dispatch, isEngLang, isRoboQuizMode, levelMusicEN, levelRoboEN]);

  // Оновлення левела (UKR)
  useEffect(() => {
    if (isEngLang) return;

    if ((levelRoboUKR > 1 || levelRoboUKR === 1) && isRoboQuizMode) {
      const songsArr = songs.find(
        ({ stage }) => stage === levelRoboUKR
      ).quizInfo;
      dispatch(setSongsArrUKR(songsArr));
    }
    if ((levelMusicUKR > 1 || levelMusicUKR === 1) && !isRoboQuizMode) {
      const songsArr = songs.find(
        ({ stage }) => stage === levelMusicUKR
      ).quizInfo;
      dispatch(setSongsArrUKR(songsArr));
    }
  }, [dispatch, isEngLang, isRoboQuizMode, levelMusicUKR, levelRoboUKR]);

  return (
    <>
      {' '}
      <Paper>
        {isLoading && <Loader />}

        {!isLoading && (
          <div>
            <div className={s.titleWrapper}>
              {isEngLang && (
                <>
                  {isRoboQuizMode && (
                    <h1 className={s.titleRobo}>
                      {t('game.levelRobo')} {`${levelRoboEN}`}
                    </h1>
                  )}
                  {!isRoboQuizMode && (
                    <h1 className={s.titleMusic}>
                      {t('game.levelMusic')} {`${levelMusicEN}`}
                    </h1>
                  )}
                </>
              )}

              {!isEngLang && (
                <>
                  {isRoboQuizMode && (
                    <h1 className={s.titleRobo}>
                      {t('game.levelRobo')} {`${levelRoboUKR}`}
                    </h1>
                  )}
                  {!isRoboQuizMode && (
                    <h1 className={s.titleMusic}>
                      {t('game.levelMusic')} {`${levelMusicUKR}`}
                    </h1>
                  )}
                </>
              )}
            </div>
            <ul className={s.list}>
              {/* ENG */}
              {isEngLang &&
                songsListEN.map(({ id, name }, idx) => (
                  <li key={id} className={s.itemWrapper}>
                    <div
                      className={setClassnameButtons(idx)}
                      onClick={() => handleClickSong(idx)}
                    >
                      {currentSong <= idx && answers.length <= 4 && idx + 1}
                    </div>
                    {idx < 4 && (
                      <div className={s.lineWrapper}>
                        <div className={setClassnameLine(idx)}></div>
                      </div>
                    )}
                  </li>
                ))}

              {/* UKR */}
              {!isEngLang &&
                songsListUKR.map(({ id, name }, idx) => (
                  <li key={id} className={s.itemWrapper}>
                    <div
                      className={setClassnameButtons(idx)}
                      onClick={() => handleClickSong(idx)}
                    >
                      {currentSong <= idx && answers.length <= 4 && idx + 1}
                    </div>
                    {idx < 4 && (
                      <div className={s.lineWrapper}>
                        <div className={setClassnameLine(idx)}></div>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
            <Player />
            <Answers />
          </div>
        )}
      </Paper>
    </>
  );
};

export default Game;
