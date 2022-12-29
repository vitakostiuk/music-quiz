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
} from '../../redux/player/playerSlice';
import { shuffle } from '../../helpers/shuffle';
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

  useEffect(() => {
    dispatch(setClickAnswer(false));
    setIsDisable(false);

    const answers = songsList.find(
      ({ url }) => url === songsList[currentSong].url
    );

    const incorrectAnswers = [...answers.incorrectSingers];

    const randomAnswers = shuffle(incorrectAnswers).slice(0, 3);
    randomAnswers.push(answers.correctSinger);

    const result = shuffle([...randomAnswers]);
    setAnswersList(result);

    const correctAnaswer = result.find(answer => answer.isCorrect);
    setCorrect(correctAnaswer.song);
  }, [currentSong, dispatch, songsList]);

  const handleClickAnswer = (index, array) => {
    setActiveIndex(index);
    dispatch(setClickAnswer(true));

    dispatch(togglePlaying());

    if (array[index].song === correct) {
      setIsMatch(true);
      console.log('WIN');
    } else {
      setIsMatch(false);
      console.log('SHIT');
    }
    setIsDisable(true);

    setTimeout(() => {
      if (currentSong === 4) return;
      setIsMatch(false);
      dispatch(setCurrent(currentSong + 1));
    }, 8000);
  };

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
              onClick={() => handleClickAnswer(index, array)}
              disabled={isDisable}
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
    </div>
  );
};

export default Answers;
