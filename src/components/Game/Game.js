import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent, togglePlaying } from '../../redux/player/playerSlice';
import {
  getSongsList,
  getCurrent,
  answerState,
} from '../../redux/player/playerSelectors';
import audioSingers from './audioSingers.json';
import Paper from '../common/Paper';
import Player from '../Player';
import Answers from '../Answers';
import s from './Game.module.css';

const Game = () => {
  const dispatch = useDispatch();

  const songsList = useSelector(getSongsList);
  const currentSong = useSelector(getCurrent);
  const answers = useSelector(answerState);

  console.log('answers', answers);

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

  return (
    <Paper>
      <ul className={s.list}>
        {audioSingers &&
          songsList.map(({ id }, idx) => (
            <li
              key={id}
              className={setClassnameButtons(idx)}
              onClick={() => handleClickSong(idx)}
            ></li>
          ))}
      </ul>
      <Player />
      <Answers />
    </Paper>
  );
};

export default Game;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useDispatch } from 'react-redux';
// import { setSongsArr } from '../../redux/player/playerSlice';
// // import { nanoid } from '@reduxjs/toolkit';
// import audioSingers from './audioSingers.json';
// import { shuffle } from '../../helpers/shuffle';
// // import { ReactComponent as Cross } from '../../images/cross.svg';
// // import { ReactComponent as Checkmark } from '../../images/checkmark.svg';
// import s from './Game.module.css';

// const Game = () => {
//   const dispatch = useDispatch();

//   const filteredByStage = audioSingers.find(({ stage }) => stage === 1);

//   const [quiz, setQuiz] = useState(
//     useMemo(() => shuffle(filteredByStage.quizInfo), [filteredByStage.quizInfo])
//   );
//   const [quizAnswers, setQuizAnswers] = useState(null);
//   const [targetUrl, setTargetUrl] = useState(quiz[0].url);
//   const [isMatch, setIsMatch] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [correct, setCorrect] = useState('');
//   const [isClickAnswer, setIsClickAnswer] = useState(false);
//   const [isDisable, setIsDisable] = useState(false);
//   const [currentSong, setCurrentSong] = useState(quiz[0].id);

//   useEffect(() => {
//     setIsClickAnswer(false);
//     setIsDisable(false);

//     const answers = quiz.find(({ url }) => url === targetUrl);
//     // console.log('answers', answers);

//     const randomArr = shuffle(answers.incorrectSingers).slice(0, 3);
//     randomArr.push(answers.correctSinger);

//     const result = shuffle(randomArr);
//     setQuizAnswers(result);
//     // console.log('result', result);

//     const correctAnaswer = result.find(answer => answer.isCorrect);
//     // console.log('correctAnaswer', correctAnaswer);
//     setCorrect(correctAnaswer.song);
//   }, [quiz, targetUrl]);

//   const handleClickUrl = (link, id) => {
//     setTargetUrl(link);
//     setCurrentSong(id);
//   };

//   const handleClickAnswer = (index, array) => {
//     setActiveIndex(index);
//     setIsClickAnswer(true);

//     if (array[index].song === correct) {
//       setIsMatch(true);
//       console.log('WIN');
//     } else {
//       setIsMatch(false);
//       console.log('SHIT');
//     }
//     setIsDisable(true);
//   };

//   const makeOptionClassName = (index, array) => {
//     if (!isClickAnswer) {
//       return s.answerBtn;
//     }

//     if (isMatch && index === activeIndex) {
//       // return s.trueAnswerBtn;
//       return s.trueActiveAnswerBtn;
//     }

//     if (isMatch && index !== activeIndex) {
//       return s.falseAnswerBtn;
//     }

//     if (
//       isMatch === false &&
//       index === activeIndex &&
//       array[index].song !== correct
//     ) {
//       return s.falseActiveAnswerBtn;
//     }

//     if (
//       isMatch === false &&
//       index !== activeIndex &&
//       array[index].song === correct
//     ) {
//       return s.trueAnswerBtn;
//     }

//     if (
//       isMatch === false &&
//       index !== activeIndex &&
//       array[index].song !== correct
//     ) {
//       return s.falseAnswerBtn;
//     }

//     return s.answerBtn;
//   };

//   const disabled = isDisable;

//   return (
//     <div className={s.container}>
//       {' '}
//       <ul className={s.list}>
//         {audioSingers &&
//           quiz.map(({ url, name, id }) => (
//             <li
//               key={id}
//               className={s.audioBtn}
//               onClick={() => handleClickUrl(url, id)}
//             >
//               {name}
//             </li>
//           ))}
//         <iframe
//           title="test"
//           frameBorder="0"
//           width="500"
//           height="65"
//           src={targetUrl}
//           className={s.frame}
//         ></iframe>
//       </ul>
//       {quizAnswers && (
//         <div className={s.list}>
//           {quizAnswers.map(({ song }, index, array) => (
//             <button
//               key={song}
//               type="button"
//               className={makeOptionClassName(index, array)}
//               onClick={() => handleClickAnswer(index, array)}
//               disabled={disabled}
//             >
//               {song}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Game;
