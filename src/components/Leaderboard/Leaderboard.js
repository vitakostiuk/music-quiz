import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizMode } from '../../redux/player/playerSlice';
import {
  getLeaderboardInfo,
  getQuizMode,
} from '../../redux/player/playerSelectors';
import { getAll } from '../../redux/player/playerOperations';
import { getFilteredArrayByOwner } from '../../helpers/getFilteredArrayByOwner';
import { getSortedArrayByTimeAndLevels } from '../../helpers/getSortedArrayByTimeAndLevels';
import s from './Leaderboard.module.css';

const Leaderboard = () => {
  const [roboInfo, setRoboInfo] = useState([]);
  const [musicInfo, setMusicInfo] = useState([]);
  const [roboWinners, setRoboWinners] = useState([]);
  const [musicWinners, setMusicWinners] = useState([]);
  const dispatch = useDispatch();

  // Отримуємо з бекенду ВСЮ інформацію для лідерборду
  const leaderboardInfo = useSelector(getLeaderboardInfo);
  // console.log(leaderboardInfo);
  const roboQuizMode = useSelector(getQuizMode);

  // Діспатчимо асинхронну операцію, щоб отримати ВСЮ інформацію для лідерборду
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  // RENDER LEADERBOARD
  useEffect(() => {
    // -- 1 -- ФІЛЬТРУЄМО ПО РЕЖИМУ
    // -- 1.1 -- РОБОТ
    const leaderboardInfoRobo = leaderboardInfo?.filter(
      item => item.isRoboQuizMode === 'true'
    );
    // console.log('leaderboardInfoRobo', leaderboardInfoRobo);
    // -- 1.2 -- МУЗИКА
    const leaderboardInfoMusic = leaderboardInfo.filter(
      item => item.isRoboQuizMode === 'false'
    );
    // console.log('leaderboardInfoMusic', leaderboardInfoMusic);
    // -----------------------------------------------------------------

    // -- 2 -- ФІЛЬТРУЄМО ПО ЮЗЕРУ, викор. спец. ф-ю
    // -- 2.1 -- РОБОТ
    const filteredByOwnerRobo = getFilteredArrayByOwner(leaderboardInfoRobo);
    // console.log('filteredByOwner', filteredByOwner);
    // -- 2.2 -- МУЗИКА
    const filteredByOwnerMusic = getFilteredArrayByOwner(leaderboardInfoMusic);
    // console.log('filteredByOwner', filteredByOwner);
    // -------------------------------------------------------------------

    // -- 3 -- Створюємо масив вкладених масивів по кожному юзеру
    // -- 3.1 -- РОБОТ
    const valuesByOwnerRobo = Object.values(filteredByOwnerRobo);
    // console.log('valuesByOwnerRobo', valuesByOwnerRobo);
    // -- 3.2 -- МУЗИКА
    const valuesByOwnerMusic = Object.values(filteredByOwnerMusic);
    // console.log('valuesByOwnerMusic', valuesByOwnerMusic);
    // --------------------------------------------------------------------

    // -- 4 -- Сортуємо по кількості пройдених рівнів і по часу
    // -- 4.1 -- РОБОТ
    const sortedByTimeAndLevelsRobo =
      getSortedArrayByTimeAndLevels(valuesByOwnerRobo);
    // console.log('sortedByTimeAndLevelsRobo', sortedByTimeAndLevelsRobo);
    // -- 4.2 -- МУЗИКА
    const sortedByTimeAndLevelsMusic =
      getSortedArrayByTimeAndLevels(valuesByOwnerMusic);
    // console.log('sortedByTimeAndLevelsMusic', sortedByTimeAndLevelsMusic);
    // -------------------------------------------------------------------------

    // -- 5 -- Записуємо в стейт готовий масив для рендеру (без перших 3-х переможців)
    // -- 5.1 -- РОБОТ
    setRoboInfo(sortedByTimeAndLevelsRobo.slice(3));
    // -- 5.2 -- МУЗИКА
    setMusicInfo(sortedByTimeAndLevelsMusic.slice(3));
    // ---------------------------------------------------------------------------

    // -- 6 -- Масив для рендеру переможців (перших три з відсортованого масиву)
    // -- 6.1 -- РОБОТ
    const winnersArrRobo = sortedByTimeAndLevelsRobo.slice(0, 3);
    setRoboWinners(winnersArrRobo);
    // console.log('winnersArrRobo', winnersArrRobo);
    // -- 6.2 -- МУЗИКА
    const winnersArrMusic = sortedByTimeAndLevelsMusic.slice(0, 3);
    setMusicWinners(winnersArrMusic);
    // console.log('winnersArrMusic', winnersArrMusic);
    // ----------------------------------------------------------------------------
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
    <div className={s.paper}>
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

      {/* ROBO WINNERS */}
      {roboQuizMode && roboWinners.length !== 0 && (
        <div className={s.allWinsWrapper}>
          {roboWinners.map((item, idx) => (
            <li key={idx} className={s.winWrapper}>
              <div className={idx === 0 ? s.circleWinner : s.circle}>
                {' '}
                <img
                  src={
                    item[1]?.user?.avatarURL
                      ? item[1]?.user?.avatarURL
                      : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                  }
                  alt="avatar"
                  className={idx === 0 ? s.avatarWinner : s.avatarCircle}
                />
              </div>
              <div className={idx === 0 ? s.smallCircleWinner : s.smallCircle}>
                {idx + 1}
              </div>
              <div className={s.background}>
                <p className={s.text}>{item[1].user.name}</p>
                <div className={s.scoreWrapper}>
                  <p className={s.text}>
                    {item.length - 1}
                    lvls.
                  </p>
                  <p className={s.text}>
                    {item[0]}
                    sec.
                  </p>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}

      {/* MUSIC WINNERS */}
      {!roboQuizMode && musicWinners.length !== 0 && (
        <div className={s.allWinsWrapper}>
          {musicWinners.map((item, idx) => (
            <li key={idx} className={s.winWrapper}>
              <div className={idx === 0 ? s.circleWinner : s.circle}>
                <img
                  src={
                    item[1]?.user?.avatarURL
                      ? item[1]?.user?.avatarURL
                      : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                  }
                  alt="avatar"
                  className={idx === 0 ? s.avatarWinner : s.avatarCircle}
                />
              </div>
              <div className={idx === 0 ? s.smallCircleWinner : s.smallCircle}>
                {idx + 1}
              </div>
              <div className={s.background}>
                <p className={s.text}>{item[1].user.name}</p>
                <div className={s.scoreWrapper}>
                  <p className={s.text}>
                    {item.length - 1}
                    lvls.
                  </p>
                  <p className={s.text}>
                    {item[0]}
                    sec.
                  </p>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}

      {/* <div className={s.allWinsWrapper}>
        <div className={s.winWrapper}>
          <div className={s.circle}>
            {roboQuizMode && roboWinners.length !== 0 && (
              <img
                src={
                  roboWinners[1][1]?.user?.avatarURL
                    ? roboWinners[1][1]?.user?.avatarURL
                    : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                }
                alt="avatar"
                className={s.avatar}
              />
            )}
            {!roboQuizMode && musicWinners.length !== 0 && (
              <img
                src={
                  musicWinners[1][1]?.user?.avatarURL
                    ? musicWinners[1][1]?.user?.avatarURL
                    : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                }
                alt="avatar"
                className={s.avatar}
              />
            )}
          </div>
          <div className={s.smallCircle}>2</div>
          <div className={s.background}>
            {' '}
            <p className={s.text}>
              {roboQuizMode && roboWinners.length !== 0
                ? roboWinners[1][1].user.name
                : ''}
              {!roboQuizMode && musicWinners.length !== 0
                ? musicWinners[1][1].user.name
                : ''}
            </p>
            <div className={s.scoreWrapper}>
              {' '}
              <p className={s.text}>
                {roboQuizMode && roboWinners.length !== 0
                  ? roboWinners[1].length - 1
                  : ''}{' '}
                {!roboQuizMode && musicWinners.length !== 0
                  ? musicWinners[1].length - 1
                  : ''}{' '}
                lvls.
              </p>
              <p className={s.text}>
                {roboQuizMode && roboWinners.length !== 0
                  ? roboWinners[1][0]
                  : ''}
                {!roboQuizMode && musicWinners.length !== 0
                  ? musicWinners[1][0]
                  : ''}
                sec.
              </p>
            </div>
          </div>
        </div>
        <div className={s.winWrapper}>
          {' '}
          <div className={s.circleWinner}>
            {roboQuizMode && roboWinners.length !== 0 && (
              <img
                src={
                  roboWinners[0][1]?.user?.avatarURL
                    ? roboWinners[0][1]?.user?.avatarURL
                    : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                }
                alt="avatar"
                className={s.avatar}
              />
            )}
            {!roboQuizMode && musicWinners.length !== 0 && (
              <img
                src={
                  musicWinners[0][1]?.user?.avatarURL
                    ? musicWinners[0][1]?.user?.avatarURL
                    : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                }
                alt="avatar"
                className={s.avatar}
              />
            )}
          </div>
          <div className={s.smallCircleWinner}>1</div>
          <div className={s.background}>
            {' '}
            <p className={s.text}>
              {roboQuizMode && roboWinners.length !== 0
                ? roboWinners[0][1].user.name
                : ''}
              {!roboQuizMode && musicWinners.length !== 0
                ? musicWinners[0][1].user.name
                : ''}
            </p>
            <div className={s.scoreWrapper}>
              {' '}
              <p className={s.text}>
                {roboQuizMode && roboWinners.length !== 0
                  ? roboWinners[0].length - 1
                  : ''}{' '}
                {!roboQuizMode && musicWinners.length !== 0
                  ? musicWinners[0].length - 1
                  : ''}{' '}
                lvls.
              </p>
              <p className={s.text}>
                {roboQuizMode && roboWinners.length !== 0
                  ? roboWinners[0][0]
                  : ''}
                {!roboQuizMode && musicWinners.length !== 0
                  ? musicWinners[0][0]
                  : ''}
                sec.
              </p>
            </div>
          </div>
        </div>
        <div className={s.winWrapper}>
          {' '}
          <div className={s.circle}>
            {roboQuizMode && roboWinners.length !== 0 && (
              <img
                src={
                  roboWinners[2][1]?.user?.avatarURL
                    ? roboWinners[2][1]?.user?.avatarURL
                    : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                }
                alt="avatar"
                className={s.avatar}
              />
            )}
            {!roboQuizMode && musicWinners.length !== 0 && (
              <img
                src={
                  musicWinners[2][1]?.user?.avatarURL
                    ? musicWinners[2][1]?.user?.avatarURL
                    : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                }
                alt="avatar"
                className={s.avatar}
              />
            )}
          </div>
          <div className={s.smallCircle}>3</div>
          <div className={s.background}>
            {' '}
            <p className={s.text}>
              {roboQuizMode && roboWinners.length !== 0
                ? roboWinners[2][1].user.name
                : ''}
              {!roboQuizMode && musicWinners.length !== 0
                ? musicWinners[2][1].user.name
                : ''}
            </p>
            <div className={s.scoreWrapper}>
              {' '}
              <p className={s.text}>
                {roboQuizMode && roboWinners.length !== 0
                  ? roboWinners[2].length - 1
                  : ''}{' '}
                {!roboQuizMode && musicWinners.length !== 0
                  ? musicWinners[2].length - 1
                  : ''}{' '}
                lvls.
              </p>
              <p className={s.text}>
                {roboQuizMode && roboWinners.length !== 0
                  ? roboWinners[2][0]
                  : ''}{' '}
                {!roboQuizMode && musicWinners.length !== 0
                  ? musicWinners[2][0]
                  : ''}{' '}
                sec.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {roboQuizMode && (
        <div className={s.listWrapper}>
          {' '}
          <ol className={s.list}>
            {roboInfo.length !== 0 &&
              roboInfo.map(item => (
                <li key={item[1].user.name} className={s.itemWrap}>
                  <div className={s.outerWrapper}>
                    <div className={s.circleItem}>
                      <img
                        src={
                          item[1].user.avatarURL
                            ? item[1].user.avatarURL
                            : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                        }
                        alt="avatar"
                        className={s.avatar}
                      />
                    </div>{' '}
                    <div className={s.name}>{item[1].user.name}</div>
                    <div className={s.innerWrapper}>
                      <div className={s.lvls}>{item.length - 1} lvls.</div>
                      <div className={s.time}>{item[0]} sec.</div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      )}
      {/* Поміняти потім на musicInfio */}
      {!roboQuizMode && (
        <div className={s.listWrapper}>
          {' '}
          <ol className={s.list}>
            {musicInfo.length !== 0 &&
              musicInfo.map(item => (
                <li key={item[1].user.name} className={s.itemWrap}>
                  <div className={s.outerWrapper}>
                    <div className={s.circleItem}>
                      <img
                        src={
                          item[1].user.avatarURL
                            ? item[1].user.avatarURL
                            : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                        }
                        alt="avatar"
                        className={s.avatar}
                      />
                    </div>{' '}
                    <div className={s.name}>{item[1].user.name}</div>
                    <div className={s.innerWrapper}>
                      <div className={s.lvls}>{item.length - 1} lvls.</div>
                      <div className={s.time}>{item[0]} sec.</div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
