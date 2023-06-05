import ConfettiExplosion from 'react-confetti-explosion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getLevelCompleteInfo,
  getLevelRoboEN,
  getLevelMusicEN,
  getLevelRoboUKR,
  getLevelMusicUKR,
  getQuizMode,
  getLanguage,
  getLevelIdEN,
  getLevelIdUKR,
} from '../../redux/player/playerSelectors';
import {
  setNextLevelRoboEN,
  setNextLevelMusicEN,
  restartLevelRoboEN,
  restartLevelMusicEN,
  setNextLevelRoboUKR,
  setNextLevelMusicUKR,
  restartLevelRoboUKR,
  restartLevelMusicUKR,
  resetState,
} from '../../redux/player/playerSlice';
import {
  removeLevelByIdUKR,
  removeLevelByIdEN,
} from '../../redux/player/playerOperations';
import { ReactComponent as WrongIcon } from '../../images/cross.svg';
import { ReactComponent as TrueIcon } from '../../images/checkmark.svg';
import { ReactComponent as RestartIcon } from '../../images/restart.svg';
import { ReactComponent as NextLVLIcon } from '../../images/arrow.svg';
import { ReactComponent as LeaderboardIcon } from '../../images/leaderboardIcon.svg';
import congratulation from './congratulation.json';
import motivation from './motivation.json';
import { shuffle } from '../../helpers/shuffle';
import s from './LevelComplete.module.css';

const LevelComplete = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const navigate = useNavigate();

  // Потім левел будемо брати з бекенда
  const isEngLang = useSelector(getLanguage);

  const levelRoboEN = useSelector(getLevelRoboEN);
  const levelMusicEN = useSelector(getLevelMusicEN);

  const levelRoboUKR = useSelector(getLevelRoboUKR);
  const levelMusicUKR = useSelector(getLevelMusicUKR);

  const levelCompleteInfo = useSelector(getLevelCompleteInfo);
  const isRoboQuizMode = useSelector(getQuizMode);

  const levelIdUKR = useSelector(getLevelIdUKR);
  const levelIdEN = useSelector(getLevelIdEN);

  // Перевіряємо, чи є хоча б одна неправильна відповідь
  const filteredByWrongAnswers = levelCompleteInfo.filter(
    ({ isRightAnswer }) => isRightAnswer === false
  );

  // Ф-я перемішує масив, щоб коджного разу були рандомні вислови
  const shuffleText = array => {
    const shuffleArray = shuffle(array);
    return isEngLang ? shuffleArray[0].eng : shuffleArray[0].ukr;
  };

  const handleClickNextLevelEN = () => {
    if (!isEngLang) return;

    // Збільшуємо левел на 1 і ресетимо дані
    if (isRoboQuizMode) {
      dispatch(setNextLevelRoboEN());
    } else {
      dispatch(setNextLevelMusicEN());
    }

    dispatch(resetState());
  };

  const handleClickNextLevelUKR = () => {
    if (isEngLang) return;

    // Збільшуємо левел на 1 і ресетимо дані
    if (isRoboQuizMode) {
      dispatch(setNextLevelRoboUKR());
    } else {
      dispatch(setNextLevelMusicUKR());
    }

    dispatch(resetState());
  };

  // RESTART LEVEL
  const handleRestartLevelEN = () => {
    if (!isEngLang) return;

    // delete level on backend
    if (levelIdEN) {
      dispatch(removeLevelByIdEN(levelIdEN));
    }
    // restart level on frontend
    if (isRoboQuizMode) {
      dispatch(restartLevelRoboEN(levelRoboEN));
    } else {
      dispatch(restartLevelMusicEN(levelMusicEN));
    }

    dispatch(resetState());
  };

  const handleRestartLevelUKR = () => {
    if (isEngLang) return;

    // delete level on backend
    if (levelIdUKR) {
      dispatch(removeLevelByIdUKR(levelIdUKR));
    }
    // restart level on frontend
    if (isRoboQuizMode) {
      dispatch(restartLevelRoboUKR(levelRoboUKR));
    } else {
      dispatch(restartLevelMusicUKR(levelMusicUKR));
    }

    dispatch(resetState());
  };

  //  DISABLE NEXT LEVEL BUTTONS
  const isDisabledNextLevelEN = levelRoboEN === 5 || levelMusicEN === 5;
  const isDisabledNextLevelUKR = levelRoboUKR === 5 || levelMusicUKR === 5;

  const handleClickLeaderboard = () => {
    dispatch(resetState());
    navigate('/leaderboard');
  };

  const isExploding = filteredByWrongAnswers.length === 0;

  return (
    <>
      {isExploding && (
        <div className={s.confettiContainer}>
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
          />
        </div>
      )}

      <div className={s.wrapper}>
        {levelCompleteInfo.length !== 0 && (
          <h1
            className={
              filteredByWrongAnswers.length === 0
                ? s.congratulation
                : s.motivation
            }
          >
            {filteredByWrongAnswers.length === 0
              ? shuffleText(congratulation)
              : shuffleText(motivation)}
          </h1>
        )}
        <ul className={s.list}>
          {levelCompleteInfo &&
            levelCompleteInfo.map(
              ({ isRightAnswer, answerSong, time }, idx) => (
                <li key={idx} className={s.item}>
                  <p className={isRoboQuizMode ? s.numRobo : s.numMusic}>
                    {idx + 1}.
                  </p>
                  <p
                    className={isRightAnswer ? s.trueSongName : s.wrongSongName}
                  >
                    {answerSong}
                    .................................................................................
                  </p>
                  <div className={s.timeAndIconsWrapper}>
                    <p className={isRightAnswer ? s.trueTime : s.wrongTime}>
                      {time} {t('levelComplete.sec')}.
                    </p>
                    <div className={s.iconsWrapper}>
                      {isRightAnswer ? (
                        <TrueIcon className={s.trueIcon} />
                      ) : (
                        <WrongIcon className={s.wrongIcon} />
                      )}
                    </div>
                  </div>
                </li>
              )
            )}

          {levelCompleteInfo.length !== 0 && (
            <p className={isRoboQuizMode ? s.totalRobo : s.totalMusic}>
              {t('levelComplete.total')}:&nbsp;
              {levelCompleteInfo
                .reduce((acc, { time }) => {
                  return acc + time;
                }, 0)
                .toFixed(2)}
              &nbsp;{t('levelComplete.sec')}.
            </p>
          )}
        </ul>
      </div>
      {levelCompleteInfo.length !== 0 && (
        <div className={s.btnsContainer}>
          <div className={s.btnsWrapper}>
            <button
              className={isRoboQuizMode ? s.buttonRobo : s.buttonMusic}
              type="button"
              onClick={isEngLang ? handleRestartLevelEN : handleRestartLevelUKR}
            >
              {t('levelComplete.restart')}
              <RestartIcon className={s.icon} />
            </button>
          </div>
          <div div className={s.btnsWrapper}>
            <button
              className={
                isRoboQuizMode ? s.buttonNextLVLRobo : s.buttonNextLVLMusic
              }
              type="button"
              onClick={
                isEngLang ? handleClickNextLevelEN : handleClickNextLevelUKR
              }
              disabled={
                isEngLang ? isDisabledNextLevelEN : isDisabledNextLevelUKR
              }
            >
              {t('levelComplete.nextLevel')}
              <NextLVLIcon className={s.icon} />
            </button>
          </div>
          <div className={s.btnsWrapper}>
            <button
              className={isRoboQuizMode ? s.buttonRobo : s.buttonMusic}
              type="button"
              onClick={handleClickLeaderboard}
            >
              {t('levelComplete.leaderboard')}
              <LeaderboardIcon className={s.icon} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LevelComplete;
