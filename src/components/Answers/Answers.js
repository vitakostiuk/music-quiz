import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getQuizMode,
  getLanguage,
  getSongsListEN,
  getSongsListUKR,
  getCurrent,
  isPlaying,
  clickAnswer,
  getStartPlayingTime,
  getLevelCompleteInfo,
  getLevelRoboEN,
  getLevelMusicEN,
  getLevelRoboUKR,
  getLevelMusicUKR,
} from '../../redux/player/playerSelectors';
import {
  setCurrent,
  togglePlaying,
  setClickAnswer,
  setAnswerState,
  setLevelCompleteInfo,
  setStartPlayingTime,
  resetAnswerStateArray,
  resetLevelCompleteInfo,
} from '../../redux/player/playerSlice';
import {
  addLVLCompleteInfoEN,
  addLVLCompleteInfoUKR,
} from '../../redux/player/playerOperations';
import { shuffle } from '../../helpers/shuffle';
import { wrongAudio } from '../Game/wrongAudio';
import LevelComplete from '../LevelComlete';
import s from './Answers.module.css';

const Answers = () => {
  const isRoboQuizMode = useSelector(getQuizMode);
  const isEngLang = useSelector(getLanguage);
  const songsListEN = useSelector(getSongsListEN);
  const songsListUKR = useSelector(getSongsListUKR);
  const currentSong = useSelector(getCurrent);
  const playing = useSelector(isPlaying);
  const isClickAnswer = useSelector(clickAnswer);
  const startPlayingTime = useSelector(getStartPlayingTime);
  const levelCompleteInfo = useSelector(getLevelCompleteInfo);

  const levelRoboEN = useSelector(getLevelRoboEN);
  const levelMusicEN = useSelector(getLevelMusicEN);

  const levelRoboUKR = useSelector(getLevelRoboUKR);
  const levelMusicUKR = useSelector(getLevelMusicUKR);

  const dispatch = useDispatch();

  const [answersList, setAnswersList] = useState(null);
  const [correct, setCorrect] = useState('');
  const [isMatch, setIsMatch] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [countClicksOnAnswerBtn, setCountClicksOnAnswerBtn] = useState(0);
  const [isLVLComplete, setIsLVLComplete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Запис результату на бекенд
  const postResult = levelInfo => {
    const totalTime = levelInfo
      .reduce((acc, { time }) => {
        return acc + time;
      }, 0)
      .toFixed(2);

    // ENG
    if (isEngLang) {
      const userLevelCompleteInfo = {
        isRoboQuizMode,
        level: isRoboQuizMode ? levelRoboEN : levelMusicEN,
        time: Number(totalTime),
      };
      dispatch(addLVLCompleteInfoEN(userLevelCompleteInfo));
    }

    // запис результату на бекенд UKR
    if (!isEngLang) {
      const userLevelCompleteInfo = {
        isRoboQuizMode,
        level: isRoboQuizMode ? levelRoboUKR : levelMusicUKR,
        time: Number(totalTime),
      };
      dispatch(addLVLCompleteInfoUKR(userLevelCompleteInfo));
    }
  };

  // Скидання стейту при перемиканні режиму
  useEffect(() => {
    setIsMatch(null);
    setActiveIndex(null);
    setCountClicksOnAnswerBtn(0);
    setIsLVLComplete(false);
    setIsDisabled(false);
    dispatch(setClickAnswer(false));
    dispatch(setCurrent(0));
    dispatch(setStartPlayingTime(''));
    dispatch(resetAnswerStateArray([]));
    dispatch(resetLevelCompleteInfo([]));
  }, [dispatch, isRoboQuizMode]);

  useEffect(() => {
    dispatch(setClickAnswer(false));
    setCountClicksOnAnswerBtn(0);
    setIsMatch(null);
    setIsLVLComplete(false);
    setIsDisabled(false);

    // Списк відповідей,не включачи правильну
    const answers = isEngLang
      ? songsListEN.find(({ url }) => url === songsListEN[currentSong].url)
      : songsListUKR.find(({ url }) => url === songsListUKR[currentSong].url);

    // Копія відповідей,не включачи правильну. Щоб можна було рандомно перемішати масив(ф-я shuffle)
    const incorrectAnswers = [...answers.incorrectSingers];

    // Рандомно перемішуємо і беремо перших три ел-та
    const randomAnswers = shuffle(incorrectAnswers).slice(0, 3);
    // Додавляємо коректну віповідь
    randomAnswers.push(answers.correctSinger);

    // Рандомно перемішуємо з коректною відповіддю
    const result = shuffle([...randomAnswers]);
    // Записуємо в локальний стейт
    setAnswersList(result);

    // Записуємо в локальний стейт коретну відповідь
    const correctAnaswer = result.find(answer => answer.isCorrect);
    setCorrect(correctAnaswer.song);
  }, [currentSong, dispatch, isEngLang, songsListEN, songsListUKR]);

  // ОБРОБКА ВІДПОВІДІ
  const handleClickAnswer = (index, array, event) => {
    setCountClicksOnAnswerBtn(prevCount => prevCount + 1);
    setIsDisabled(true);

    let isRightAnswer = null;
    let time = null;

    // Записуємо в локальний стейт,вгадали чи ні
    setActiveIndex(index);
    dispatch(setClickAnswer(true));

    dispatch(togglePlaying());

    if (array[index].song === correct) {
      setIsMatch(true);
      isRightAnswer = true;

      // setTimeout(() => {
      //   setIsDisabled(false);
      // }, 2000);
    } else {
      setIsMatch(false);
      isRightAnswer = false;
    }

    // Записуємо в масив, правильна чи неправильна відповідь
    if (countClicksOnAnswerBtn === 0) {
      const total2 = Math.round(new Date().getTime()) - startPlayingTime;

      if (isRightAnswer === true) {
        time = Number.parseFloat((total2 / 1000).toFixed(1));
      } else {
        time = 20;
      }

      dispatch(setAnswerState(isRightAnswer));
      dispatch(
        setLevelCompleteInfo({
          isRightAnswer,
          answerSong: array[index].song,
          time,
        })
      );
    }

    const DELAY = isRightAnswer ? 8000 : 2000;

    // Автоматичнтй перехід на наступну пісню
    setTimeout(() => {
      if (currentSong === 4) return;
      if (countClicksOnAnswerBtn === 0) {
        setIsMatch(null);
        dispatch(setCurrent(currentSong + 1));
      }
    }, DELAY);

    // // Передчасне закінчення пісні-відповіді (!!!ВИМИКАЄМО поки!!!)
    // if (countClicksOnAnswerBtn > 0 && currentSong !== 4) {
    //   setIsMatch(null);
    //   dispatch(setCurrent(currentSong + 1));
    //   dispatch(togglePlaying());
    // }

    // Автоматичнтй перехід на LEVEL COMPLETE
    setTimeout(() => {
      if (currentSong !== 4) return;

      // запис результату на бекенд
      postResult(levelCompleteInfo);

      setIsLVLComplete(true);
    }, DELAY);

    // // Передчасне закінчення останньої пісні - Перехід на LEVEL COMPLETE (!!!ВИМИКАЄМО поки!!!)
    //   if (countClicksOnAnswerBtn > 0 && currentSong === 4) {
    //     // запис результату на бекенд
    //     postResult(levelCompleteInfo);
    //     // запис результату на бекенд
    //     postResult(levelCompleteInfo);

    //     setIsLVLComplete(true);
    //     dispatch(togglePlaying());
    //   }
  };

  // Classname для неактивної, правильної і неправильної відповіді
  const makeOptionClassName = (index, array) => {
    // ROBO-MODE
    if (isRoboQuizMode) {
      if (!isClickAnswer) {
        return s.answerBtnRobo;
      }

      if (isMatch && index === activeIndex && isClickAnswer) {
        return s.trueActiveAnswerBtn;
      }

      if (
        isMatch === false &&
        index === activeIndex &&
        array[index].song !== correct &&
        isClickAnswer
      ) {
        return s.falseActiveAnswerBtn;
      }

      return s.answerBtnRobo;
    }

    // MUSIC-MODE
    if (!isRoboQuizMode) {
      if (!isClickAnswer) {
        return s.answerBtnMusic;
      }

      if (isMatch && index === activeIndex && isClickAnswer) {
        return s.trueActiveAnswerBtn;
      }

      if (
        isMatch === false &&
        index === activeIndex &&
        array[index].song !== correct &&
        isClickAnswer
      ) {
        return s.falseActiveAnswerBtn;
      }

      return s.answerBtnMusic;
    }
  };

  return (
    <>
      {!isLVLComplete && (
        <div className={!playing && !isClickAnswer ? s.hidden : s.wrapper}>
          {answersList && (
            <div className={s.answers}>
              {answersList.map(({ song }, index, array) => (
                <button
                  key={song}
                  type="button"
                  className={makeOptionClassName(index, array)}
                  onClick={event => handleClickAnswer(index, array, event)}
                  disabled={isDisabled}
                >
                  {song}
                </button>
              ))}
            </div>
          )}
          {isMatch && (
            <audio
              type="audio/mpeg"
              src={
                isEngLang
                  ? songsListEN[currentSong].originalUrl
                  : songsListUKR[currentSong].originalUrl
              }
              autoPlay
            />
          )}
          {isMatch === false && (
            <audio type="audio/mpeg" src={wrongAudio.url} autoPlay />
          )}
        </div>
      )}
      {isLVLComplete && <LevelComplete />}
    </>
  );
};

export default Answers;
