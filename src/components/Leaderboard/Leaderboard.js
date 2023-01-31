import React, { useEffect, useState } from 'react';
import Paper from '../common/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizMode } from '../../redux/player/playerSlice';
import {
  getLeaderboardInfo,
  getQuizMode,
} from '../../redux/player/playerSelectors';
import { getAll } from '../../redux/player/playerOperations';
import { getFilteredArrayByOwner } from '../../helpers/getFilteredArrayByOwner';
import s from './Leaderboard.module.css';

const Leaderboard = () => {
  const [roboInfo, setRoboInfo] = useState(null);
  const [musicInfo, setMusicInfo] = useState(null);
  const [roboWinners, setRoboWinners] = useState(null);
  const [musicWinners, setMusicWinners] = useState(null);
  const dispatch = useDispatch();

  // Отримуємо з бекенду ВСЮ інформацію для лідерборду
  const leaderboardInfo = useSelector(getLeaderboardInfo);
  // console.log(leaderboardInfo);
  const roboQuizMode = useSelector(getQuizMode);

  // Діспатчимо асинхронну операцію, щоб отримати ВСЮ інформацію для лідерборду
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  // ROBO MODE
  useEffect(() => {
    // -- 1 -- Фільтруємо по режиму (робот)
    const leaderboardInfoRobo = leaderboardInfo?.filter(
      item => item.isRoboQuizMode === 'true'
    );
    // console.log('leaderboardInfoRobo', leaderboardInfoRobo);

    // -- 2 -- Фільтруємо по юзеру (режим робот), викор. спец. ф-ю
    const filteredByOwner = getFilteredArrayByOwner(leaderboardInfoRobo);
    // console.log('filteredByOwner', filteredByOwner);

    // -- 3 -- Створюємо масив вкладених масивів по кожному юзеру
    const valuesByOwnerRobo = Object.values(filteredByOwner);
    // console.log('valuesByOwnerRobo', valuesByOwnerRobo);

    // -- 4 -- Сортуємо по кількості пройдених рівнів і по часу
    const sortedByTimeAndLevels = valuesByOwnerRobo
      .sort((b, a) => a.length - b.length)
      .map(item => {
        const time = item.reduce((acc, item) => {
          return acc + item.time;
        }, 0);

        return [time, ...item];
      })
      .sort((b, a) => b[0] - a[0])
      .sort((b, a) => a.length - b.length);
    // console.log('sortedByTimeAndLevels', sortedByTimeAndLevels);

    // -- 5 -- Записуємо в стейт готовий масив для рендеру
    setRoboInfo(
      sortedByTimeAndLevels.slice(3, sortedByTimeAndLevels.length - 1)
    );

    // -- 6 -- Масив для рендеру переможців
    const winnersArr = sortedByTimeAndLevels.slice(0, 3);
    setRoboWinners(winnersArr);
    // console.log('winnersArr', winnersArr);
  }, [leaderboardInfo]);

  // MUSIC MODE
  useEffect(() => {
    // Фільтруємо по режиму (музика)
    const leaderboardInfoMusic = leaderboardInfo.filter(
      item => item.isRoboQuizMode === 'false'
    );
    // console.log('leaderboardInfoMusic', leaderboardInfoMusic);

    // Сортуємо по юзеру (музика)
    const filteredByOwner = getFilteredArrayByOwner(leaderboardInfoMusic);
    // console.log('filteredByOwner', filteredByOwner);

    const valuesByOwnerMusic = Object.values(filteredByOwner);
    setMusicInfo(valuesByOwnerMusic);
  }, [leaderboardInfo]);

  // Перемикач режимів
  const handleClickModeBtn = mode => {
    if (mode === 'robo') {
      dispatch(setQuizMode(true));
      return;
    }

    if (mode === 'music') {
      dispatch(setQuizMode(false));
      return;
    }
  };
  return (
    <Paper>
      <div className={s.container}>
        {' '}
        <div className={s.titleWrapper}>
          {' '}
          <div className={s.btnsWrapper}>
            {' '}
            <button
              className={roboQuizMode ? s.btnRoboIsRobo : s.btnRoboIsMusic}
              type="button"
              onClick={() => handleClickModeBtn('robo')}
            >
              Robo
            </button>
            <button
              className={roboQuizMode ? s.btnMusicIsRobo : s.btnMusicIsMusic}
              type="button"
              onClick={() => handleClickModeBtn('music')}
            >
              Music
            </button>
          </div>
          <h1 className={roboQuizMode ? s.titleRobo : s.titleMusic}>
            Leaderboard
          </h1>
        </div>
        <div className={s.allWinsWrapper}>
          <div className={s.winWrapper}>
            <div className={s.circle}></div>
            <div className={s.smallCircle}>2</div>
            <div className={s.background}>
              {' '}
              <p className={s.text}>{roboWinners[1][1].user.name}</p>
              <div className={s.scoreWrapper}>
                {' '}
                <p className={s.text}>{roboWinners[1].length - 1} lvls.</p>
                <p className={s.text}>{roboWinners[1][0]} sec.</p>
              </div>
            </div>
          </div>
          <div className={s.winWrapper}>
            {' '}
            <div className={s.circleWinner}></div>
            <div className={s.smallCircleWinner}>1</div>
            <div className={s.background}>
              {' '}
              <p className={s.text}>{roboWinners[0][1].user.name}</p>
              <div className={s.scoreWrapper}>
                {' '}
                <p className={s.text}>{roboWinners[0].length - 1} lvls.</p>
                <p className={s.text}>{roboWinners[0][0]} sec.</p>
              </div>
            </div>
          </div>
          <div className={s.winWrapper}>
            {' '}
            <div className={s.circle}></div>
            <div className={s.smallCircle}>3</div>
            <div className={s.background}>
              {' '}
              <p className={s.text}>{roboWinners[2][1].user.name}</p>
              <div className={s.scoreWrapper}>
                {' '}
                <p className={s.text}>{roboWinners[2].length - 1} lvls.</p>
                <p className={s.text}>{roboWinners[2][0]} sec.</p>
              </div>
            </div>
          </div>
        </div>
        {roboQuizMode && (
          <ol className={s.list}>
            {roboInfo &&
              roboInfo.map(item => (
                <li key={item[1].user.name} className={s.itemWrap}>
                  <div className={s.circleItem}></div>
                  <div className={s.outerWrapper}>
                    {' '}
                    <div className={s.name}>{item[1].user.name}</div>
                    <div className={s.innerWrapper}>
                      <div className={s.lvls}>{item.length - 1} lvls.</div>
                      <div className={s.time}>{item[0]} sec.</div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        )}
        {/* Поміняти потім на musicInfio */}
        {!roboQuizMode && (
          <ol className={s.list}>
            {roboInfo &&
              roboInfo.map(item => (
                <li key={item[1].user.name} className={s.itemWrap}>
                  <div className={s.circleItem}></div>
                  <div className={s.outerWrapper}>
                    {' '}
                    <div className={s.name}>{item[1].user.name}</div>
                    <div className={s.innerWrapper}>
                      <div className={s.lvls}>{item.length - 1} lvls.</div>
                      <div className={s.time}>{item[0]} sec.</div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        )}
      </div>
    </Paper>
  );
};

export default Leaderboard;
