import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { setQuizMode } from '../../redux/player/playerSlice';
import s from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClickRoboQuizBtn = () => {
    dispatch(setQuizMode(true));
  };

  const handleClickMusicQuizBtn = () => {
    dispatch(setQuizMode(false));
  };
  return (
    <div className={s.container}>
      <h1 className={s.title}>{t('home.title')}</h1>
      <p className={s.subTitle}>{t('home.subtitle')}</p>
      <div className={s.btnWrapper}>
        <Link
          to="/game"
          className={s.btnRobot}
          onClick={handleClickRoboQuizBtn}
        >
          <p className={s.textBtnRobot}>{t('home.textBtnRobo')}</p>
          <p className={s.subTextBtnRobot}>{t('home.subTextBtnRobo')}</p>
        </Link>
      </div>
      <div className={s.btnWrapper} onClick={handleClickMusicQuizBtn}>
        <Link to="/game" className={s.btnMusic}>
          <p className={s.textBtnMusic}>{t('home.textBtnMusic')}</p>
          <p className={s.subTextBtnMusic}>{t('home.subTextBtnMusic')}</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
