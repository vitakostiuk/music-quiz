import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrent,
  togglePlaying,
  setSongsArr,
  resetAnswerStateArray,
} from '../../redux/player/playerSlice';
import {
  getQuizMode,
  getLevel,
  getSongsList,
  getCurrent,
  answerState,
} from '../../redux/player/playerSelectors';
import audioSingers from './audioSingers.json';
import Paper from '../common/Paper';
import Player from '../Player';
import Answers from '../Answers';
import { songs } from './songs';
import s from './Game.module.css';

const Game = () => {
  const dispatch = useDispatch();

  const isRoboQuizMode = useSelector(getQuizMode);
  const level = useSelector(getLevel);
  const songsList = useSelector(getSongsList);
  const currentSong = useSelector(getCurrent);
  const answers = useSelector(answerState);

  const handleClickSong = idx => {
    console.log(songsList[idx].name);
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

  return (
    <>
      <Paper>
        <div className={s.titleWrapper}>
          {isRoboQuizMode && (
            <h1 className={s.titleRobo}>Robo Mode. Level {`${level}`}</h1>
          )}
          {!isRoboQuizMode && (
            <h1 className={s.titleMusic}>Music Mode. Level {`${level}`}</h1>
          )}
        </div>
        <ul className={s.list}>
          {audioSingers &&
            songsList.map(({ id, name }, idx) => (
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
      </Paper>
    </>
  );
};

export default Game;
