import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSongsList,
  getCurrent,
  isPlaying,
  clickAnswer,
} from '../../redux/player/playerSelectors';
import {
  setCurrent,
  togglePlaying,
  setClickAnswer,
  setAnswerState,
} from '../../redux/player/playerSlice';
import { shuffle } from '../../helpers/shuffle';
import { wrongAudio } from '../Game/wrongAudio';
import s from './Answers.module.css';

const Answers = () => {
  const songsList = useSelector(getSongsList);
  const currentSong = useSelector(getCurrent);
  const playing = useSelector(isPlaying);
  const isClickAnswer = useSelector(clickAnswer);

  const dispatch = useDispatch();

  const [answersList, setAnswersList] = useState(null);
  const [correct, setCorrect] = useState('');
  const [isMatch, setIsMatch] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [countClicksOnAnswerBtn, setCountClicksOnAnswerBtn] = useState(0);

  useEffect(() => {
    dispatch(setClickAnswer(false));
    setIsDisable(false);
    setCountClicksOnAnswerBtn(0);

    // Списк відповідей,не включачи правильну
    const answers = songsList.find(
      ({ url }) => url === songsList[currentSong].url
    );

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
  }, [currentSong, dispatch, songsList]);

  // ОБРОБКА ВІДПОВІДІ
  const handleClickAnswer = (index, array, event) => {
    setCountClicksOnAnswerBtn(prevCount => prevCount + 1);

    let isRightAnswer = null;

    // Записуємо в локальний стейт,вгадали чи ні
    setActiveIndex(index);
    dispatch(setClickAnswer(true));

    dispatch(togglePlaying());

    if (array[index].song === correct) {
      setIsMatch(true);
      isRightAnswer = true;
    } else {
      setIsMatch(false);
      isRightAnswer = false;
    }

    // Записуємо в масив, правильна чи неправильна відповідь
    if (countClicksOnAnswerBtn === 0) {
      dispatch(setAnswerState(isRightAnswer));
    }
    // setIsDisable(true);

    const DELAY = isRightAnswer ? 8000 : 2000;

    // Автоматичнтй перехід на наступну пісню
    setTimeout(() => {
      if (currentSong === 4) return;
      if (countClicksOnAnswerBtn === 0) {
        setIsMatch(null);
        dispatch(setCurrent(currentSong + 1));
      }
    }, DELAY);

    // Передчасне закінчення пісні-відповіді
    if (countClicksOnAnswerBtn > 0) {
      setIsMatch(null);
      dispatch(setCurrent(currentSong + 1));
      dispatch(togglePlaying());
    }
  };

  // Classname для неактивної, правильної і неправильної відповіді
  const makeOptionClassName = (index, array) => {
    if (!isClickAnswer) {
      return s.answerBtn;
    }

    if (isMatch && index === activeIndex) {
      return s.trueActiveAnswerBtn;
    }

    if (
      isMatch === false &&
      index === activeIndex &&
      array[index].song !== correct
    ) {
      return s.falseActiveAnswerBtn;
    }

    return s.answerBtn;
  };
  return (
    <div className={!playing && !isClickAnswer ? s.hidden : s.wrapper}>
      {answersList && (
        <div className={s.answers}>
          {answersList.map(({ song }, index, array) => (
            <button
              key={song}
              type="button"
              className={makeOptionClassName(index, array)}
              onClick={event => handleClickAnswer(index, array, event)}
              // disabled={isDisable}
            >
              {song}
            </button>
          ))}
        </div>
      )}
      {isMatch && (
        <audio
          type="audio/mpeg"
          src={songsList[currentSong].originalUrl}
          autoPlay
        />
      )}
      {isMatch === false && (
        <audio type="audio/mpeg" src={wrongAudio.url} autoPlay />
      )}
    </div>
  );
};

export default Answers;