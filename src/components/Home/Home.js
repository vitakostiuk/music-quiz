import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>MUSIC ROBO QUIZ</h1>
      <p className={s.subTitle}>
        Exciting music trivia game. You'll hear familiar songs from the other
        side!
      </p>
      <div className={s.btnWrapper}>
        {' '}
        <button className={s.btnRobot}>
          <p className={s.textBtnRobot}>robo-quiz</p>
          <p className={s.subTextBtnRobot}>ROBOT SINGING — you guess</p>
        </button>
      </div>
      <div className={s.btnWrapper}>
        <button className={s.btnMusic}>
          <p className={s.textBtnMusic}>Music-quiz</p>
          <p className={s.subTextBtnMusic}>original song sounds — you guess</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
