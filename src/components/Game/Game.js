import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrent,
  togglePlaying,
  setSongsArr,
  resetAnswerStateArray,
} from '../../redux/player/playerSlice';
import {
  getSongsList,
  getCurrent,
  answerState,
} from '../../redux/player/playerSelectors';
import audioSingers from './audioSingers.json';
import Paper from '../common/Paper';
import Player from '../Player';
import Answers from '../Answers';
import Robot from '../common/Robot';
import { songs } from './songs';
import s from './Game.module.css';

const Game = () => {
  const dispatch = useDispatch();

  const [level, setLevel] = useState(1);

  const songsList = useSelector(getSongsList);
  const currentSong = useSelector(getCurrent);
  const answers = useSelector(answerState);

  useEffect(() => {
    if (level > 1) {
      const songsArr = songs.find(({ stage }) => stage === level).quizInfo;
      dispatch(setSongsArr(songsArr));
    }
  }, [dispatch, level]);

  const handleClickLevel = () => {
    setLevel(prevLevel => prevLevel + 1);
    dispatch(setCurrent(0));
    dispatch(resetAnswerStateArray([]));
  };

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

    if (currentSong === idx) {
      return s.current;
    }
    if (currentSong < idx) {
      return s.inactive;
    }
  };

  // Задання кольору ліній між кнопками
  const setClassnameLine = idx => {
    if (answers) {
      // Перша кнопка --- друга кнопка (якщо друга каррент)
      if ((idx === 0 || idx === 1 || idx === 2) && currentSong === idx + 1) {
        if (answers[idx] === false) {
          return s.firsWrongThenCurrentLine;
        }
        if (answers[idx] === true) {
          return s.firstTrueThenCurrentLine;
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
      if (idx === 3 && currentSong === idx + 1) {
        if (answers[idx] === false) {
          return s.firsWrongThenCurrentLine;
        }
        if (answers[idx] === true) {
          return s.firstTrueThenCurrentLine;
        }
      }
    }

    return s.line;
  };

  return (
    <>
      <Robot />
      <Paper>
        <h1 className={s.title}>Text title</h1>
        <ul className={s.list}>
          {audioSingers &&
            songsList.map(({ id, name }, idx) => (
              <li key={id} className={s.itemWrapper}>
                <div
                  className={setClassnameButtons(idx)}
                  onClick={() => handleClickSong(idx)}
                ></div>
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
        <div className={s.btnWrapper}>
          {' '}
          <button
            // className={s.nextBtn}
            type="button"
            onClick={handleClickLevel}
            disabled={answers.length < 5}
          >
            Next
          </button>
        </div>
      </Paper>
    </>
  );
};

export default Game;
