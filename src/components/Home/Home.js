import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>MUSIC ROBO QUIZ</h1>
      <p className={s.subTitle}>
        Exciting music trivia game. You'll hear familiar songs from the other
        side!
      </p>
      <button className={s.btn}>
        robo-quiz<span>ROBOT SINGING — you guess</span>
      </button>
      <button className={s.btn}>
        Music-quiz<span>original song sounds — you guess</span>
      </button>
    </div>
  );
};

export default Home;
