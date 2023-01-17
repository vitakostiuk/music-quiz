import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setQuizMode } from '../../redux/player/playerSlice';
import s from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  const handleClickRoboQuizBtn = () => {
    dispatch(setQuizMode(true));
  };

  const handleClickMusicQuizBtn = () => {
    dispatch(setQuizMode(false));
  };
  return (
    <div className={s.container}>
      <h1 className={s.title}>MUSIC ROBO QUIZ</h1>
      <p className={s.subTitle}>
        Exciting music trivia game. You'll hear familiar songs from the other
        side!
      </p>
      <div className={s.btnWrapper}>
        {' '}
        <Link
          to="/game"
          className={s.btnRobot}
          onClick={handleClickRoboQuizBtn}
        >
          <p className={s.textBtnRobot}>robo-quiz</p>
          <p className={s.subTextBtnRobot}>ROBOT SINGING — you guess</p>
        </Link>
      </div>
      <div className={s.btnWrapper} onClick={handleClickMusicQuizBtn}>
        <Link to="/game" className={s.btnMusic}>
          <p className={s.textBtnMusic}>Music-quiz</p>
          <p className={s.subTextBtnMusic}>original song sounds — you guess</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
