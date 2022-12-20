import React, { useState, useEffect, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import audioSingers from './audioSingers.json';
import { shuffle } from '../../helpers/shuffle';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { ReactComponent as Checkmark } from '../../images/checkmark.svg';
import s from './Game.module.css';

const Game = () => {
  const filteredByStage = audioSingers.find(({ stage }) => stage === 1);

  const [quiz, setQuiz] = useState(
    useMemo(() => shuffle(filteredByStage.quizInfo), [filteredByStage.quizInfo])
  );
  const [quizAnswers, setQuizAnswers] = useState(null);
  const [targetUrl, setTargetUrl] = useState(quiz[0].url);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const answers = quiz.find(({ url }) => url === targetUrl);
    // console.log('answers', answers);

    const randomArr = shuffle(answers.incorrectSingers).slice(0, 3);
    randomArr.push(answers.correctSinger);

    const result = shuffle(randomArr);
    setQuizAnswers(result);
    // console.log('result', result);
  }, [quiz, targetUrl]);

  const handleClickUrl = link => {
    setTargetUrl(link);
  };

  const handleClickAnswer = e => {
    const correctAnaswer = quizAnswers.find(answer => answer.isCorrect);

    if (e.target.innerText === correctAnaswer.song) {
      setIsMatch(true);
      console.log('WIN');
    } else {
      setIsMatch(false);
      console.log('SHIT');
    }
  };

  return (
    <div className={s.container}>
      {' '}
      <ul className={s.list}>
        {audioSingers &&
          quiz.map(({ url, name, id }) => (
            <li
              key={id}
              className={s.audioBtn}
              onClick={() => handleClickUrl(url)}
            >
              {name}
            </li>
          ))}
        <iframe
          title="test"
          frameBorder="0"
          width="500"
          height="65"
          src={targetUrl}
          className={s.frame}
        ></iframe>
      </ul>
      {quizAnswers && (
        <ul className={s.list}>
          {quizAnswers.map(({ song }) => (
            <li key={song} className={s.answerBtn} onClick={handleClickAnswer}>
              <Cross
                width="17px"
                height="17px"
                // className={!isMatch && s.hidden}
              />
              <Checkmark
                width="17px"
                height="17px"
                // className={!isMatch && s.hidden}
              />
              {song}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Game;
