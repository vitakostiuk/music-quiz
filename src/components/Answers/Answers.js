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
  getUserScoreEN,
  getUserScoreUKR,
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
  setLevelRoboUKR,
  setLevelRoboEN,
  setLevelMusicEN,
  setLevelMusicUKR,
  resetState,
} from '../../redux/player/playerSlice';
import {
  addLVLCompleteInfoEN,
  addLVLCompleteInfoUKR,
  editLevelByIdEN,
  editLevelByIdUKR,
} from '../../redux/player/playerOperations';
import { shuffle } from '../../helpers/shuffle';
import { wrongAudio } from '../Game/wrongAudio';
import LevelComplete from '../LevelComlete';
import s from './Answers.module.css';

const Answers = () => {
  const isRoboQuizMode = useSelector(getQuizMode);
  const isEngLang = useSelector(getLanguage);
  const userScoreEN = useSelector(getUserScoreEN);
  const userScoreUKR = useSelector(getUserScoreUKR);
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

  // Функція для запису результату на бекенд
  const postResult = levelInfo => {
    const totalTime = levelInfo
      .reduce((acc, { time }) => {
        return acc + time;
      }, 0)
      .toFixed(2);

    // Запис результату на бекенд ENG
    if (isEngLang) {
      // Режим РОБОТ ENG
      if (isRoboQuizMode) {
        // ---1--- Фільтруємо скор юзера по режиму РОБОТ
        const userScoreInfoRoboEN = userScoreEN.filter(
          item => item.isRoboQuizMode === 'true'
        );

        // ---2--- Ресетимо левел до 1, якщо дійшли до 5-го рівня
        if (userScoreInfoRoboEN.length === 5 && levelRoboEN) {
          dispatch(setLevelRoboEN(1));
        }

        // ---3--- Шукаємо левел, який зараз граємо, в масиві юзера
        const findLevelRoboEN = userScoreInfoRoboEN.find(
          item => item.level === levelRoboEN
        );

        // ---4--- Об'єкт, який відправлятимемо на бекенд
        const userLevelCompleteInfo = {
          isRoboQuizMode,
          level: levelRoboEN,
          time: Number(totalTime),
        };

        // ---5--- Якщо findLevelRoboEN.level === undefined, то це означає, що в базі ще такого левала немає,
        if (findLevelRoboEN === undefined) {
          // зберігаємо результат на бекенд
          dispatch(addLVLCompleteInfoEN(userLevelCompleteInfo));
          return;
        }

        // ---6--- Якщо findLevelRoboEN.level === levelRoboEN, то значить,
        // що ми переграли левел і треба його перезаписати на бекенді
        if (findLevelRoboEN.level === levelRoboEN) {
          // оновлюємо результат на бекенді
          dispatch(
            editLevelByIdEN({ id: findLevelRoboEN._id, userLevelCompleteInfo })
          );
          return;
        }
      }

      // режим МУЗИКА ENG
      if (!isRoboQuizMode) {
        // ---1--- Фільтруємо скор юзера по режиму МУЗИКА
        const userScoreInfoMusicEN = userScoreEN.filter(
          item => item.isRoboQuizMode === 'false'
        );

        // ---2--- Ресетимо левел до 1, якщо дійшли до 5-го рівня
        if (userScoreInfoMusicEN.length === 5 && levelMusicEN) {
          dispatch(setLevelMusicEN(1));
        }

        // ---3--- Шукаємо левел, який зараз граємо, в масиві юзера
        const findLevelMusicEN = userScoreInfoMusicEN.find(
          item => item.level === levelMusicEN
        );

        // ---4--- Об'єкт, який відправлятимемо на бекенд
        const userLevelCompleteInfo = {
          isRoboQuizMode,
          level: levelMusicEN,
          time: Number(totalTime),
        };

        // ---5--- Якщо findLevelMusicEN.level === undefined, то це означає, що в базі ще такого левала немає,
        if (findLevelMusicEN === undefined) {
          // зберігаємо результат на бекенд
          dispatch(addLVLCompleteInfoEN(userLevelCompleteInfo));
          return;
        }

        // ---6--- Якщо findLevelMusicEN.level === levelMusicEN, то значить,
        // що ми переграли левел і треба його перезаписати на бекенді
        if (findLevelMusicEN.level === levelMusicEN) {
          // оновлюємо результат на бекенді
          dispatch(
            editLevelByIdEN({ id: findLevelMusicEN._id, userLevelCompleteInfo })
          );
          return;
        }
      }
    }

    // запис результату на бекенд UKR
    if (!isEngLang) {
      // Режим РОБОТ UKR
      if (isRoboQuizMode) {
        // ---1--- Фільтруємо скор юзера по режиму РОБОТ
        const userScoreInfoRoboUKR = userScoreUKR.filter(
          item => item.isRoboQuizMode === 'true'
        );
        console.log('userScoreInfoRoboUKR', userScoreInfoRoboUKR);

        // ---2--- Ресетимо левел до 1, якщо дійшли до 5-го рівня
        if (userScoreInfoRoboUKR.length === 5 && levelRoboUKR) {
          dispatch(setLevelRoboUKR(1));
        }

        // ---3--- Шукаємо левел, який зараз граємо, в масиві юзера
        const findLevelRoboUKR = userScoreInfoRoboUKR.find(
          item => item.level === levelRoboUKR
        );

        // ---4--- Об'єкт, який відправлятимемо на бекенд
        const userLevelCompleteInfo = {
          isRoboQuizMode,
          level: levelRoboUKR,
          time: Number(totalTime),
        };

        // ---5--- Якщо findLevelRoboUKR.level === undefined, то це означає, що в базі ще такого левала немає,
        if (findLevelRoboUKR === undefined) {
          // зберігаємо результат на бекенд
          dispatch(addLVLCompleteInfoUKR(userLevelCompleteInfo));
          return;
        }

        // ---6--- Якщо findLevelRoboUKR.level === levelRoboEN, то значить,
        // що ми переграли левел і треба його перезаписати на бекенді
        if (findLevelRoboUKR.level === levelRoboUKR) {
          // оновлюємо результат на бекенді
          dispatch(
            editLevelByIdUKR({
              id: findLevelRoboUKR._id,
              userLevelCompleteInfo,
            })
          );
          return;
        }
      }

      // режим МУЗИКА UKR
      if (!isRoboQuizMode) {
        // ---1--- Фільтруємо скор юзера по режиму МУЗИКА
        const userScoreInfoMusicUKR = userScoreUKR.filter(
          item => item.isRoboQuizMode === 'false'
        );

        // ---2--- Ресетимо левел до 1, якщо дійшли до 5-го рівня
        if (userScoreInfoMusicUKR.length === 5 && levelMusicUKR) {
          dispatch(setLevelMusicUKR(1));
        }

        // ---3--- Шукаємо левел, який зараз граємо, в масиві юзера
        const findLevelMusicUKR = userScoreInfoMusicUKR.find(
          item => item.level === levelMusicUKR
        );

        // ---4--- Об'єкт, який відправлятимемо на бекенд
        const userLevelCompleteInfo = {
          isRoboQuizMode,
          level: levelMusicUKR,
          time: Number(totalTime),
        };

        // ---5--- Якщо findLevelMusicUKR.level === undefined, то це означає, що в базі ще такого левала немає,
        if (findLevelMusicUKR === undefined) {
          // зберігаємо результат на бекенд
          dispatch(addLVLCompleteInfoUKR(userLevelCompleteInfo));
          return;
        }

        // ---6--- Якщо findLevelMusicUKR.level === levelMusicUKR, то значить,
        // що ми переграли левел і треба його перезаписати на бекенді
        if (findLevelMusicUKR.level === levelMusicUKR) {
          // оновлюємо результат на бекенді
          dispatch(
            editLevelByIdUKR({
              id: findLevelMusicUKR._id,
              userLevelCompleteInfo,
            })
          );
          return;
        }
      }
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

  // Автоматичнтй перехід на LEVEL COMPLETE
  useEffect(() => {
    if (levelCompleteInfo.length !== 5) return;

    setTimeout(
      () => {
        // запис результату на бекенд
        postResult(levelCompleteInfo);

        setIsLVLComplete(true);
      },
      isMatch ? 8000 : 2000
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelCompleteInfo]);

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
