import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizMode } from '../../redux/player/playerSlice';
import {
  getLanguage,
  getLeaderboardInfoEN,
  getLeaderboardInfoUKR,
  getQuizMode,
} from '../../redux/player/playerSelectors';
import { getAllEng, getAllUkr } from '../../redux/player/playerOperations';
import {
  getUserID,
  getToken,
  getGoogleToken,
} from '../../redux/auth/authSelectors';
import { getFilteredArrayByOwner } from '../../helpers/getFilteredArrayByOwner';
import { findUserById } from '../../helpers/findUserById';
import { getSortedArrayByTimeAndLevels } from '../../helpers/getSortedArrayByTimeAndLevels';
import s from './Leaderboard.module.css';

const Leaderboard = () => {
  const [roboInfo, setRoboInfo] = useState([]);
  const [musicInfo, setMusicInfo] = useState([]);
  const [roboWinners, setRoboWinners] = useState([]);
  const [musicWinners, setMusicWinners] = useState([]);
  const [userIdxRobo, setUserIdxRobo] = useState(null);
  const [userIdxMusic, setUserIdxMusic] = useState(null);
  const [userIdxWinnersRobo, setUserIdxWinnersRobo] = useState(null);
  const [userIdxWinnersMusic, setUserIdxWinnersMusic] = useState(null);
  const dispatch = useDispatch();

  // Отримуємо з бекенду ВСЮ інформацію для лідерборду
  const leaderboardInfoEN = useSelector(getLeaderboardInfoEN);
  const leaderboardInfoUKR = useSelector(getLeaderboardInfoUKR);
  const roboQuizMode = useSelector(getQuizMode);
  const isEngLang = useSelector(getLanguage);
  const userID = useSelector(getUserID);
  const token = useSelector(getToken);
  const googleToken = useSelector(getGoogleToken);

  // Діспатчимо асинхронну операцію, щоб отримати ВСЮ інформацію для лідерборду
  useEffect(() => {
    dispatch(getAllEng());
    dispatch(getAllUkr());
  }, [dispatch, isEngLang]);

  // RENDER LEADERBOARD
  useEffect(() => {
    // -- 1 -- ФІЛЬТРУЄМО ПО РЕЖИМУ
    // -- 1.1 -- РОБОТ
    const leaderboardInfoRobo = isEngLang
      ? leaderboardInfoEN?.filter(item => item.isRoboQuizMode === 'true')
      : leaderboardInfoUKR?.filter(item => item.isRoboQuizMode === 'true');
    // console.log('leaderboardInfoRobo', leaderboardInfoRobo);
    // -- 1.2 -- МУЗИКА
    const leaderboardInfoMusic = isEngLang
      ? leaderboardInfoEN?.filter(item => item.isRoboQuizMode === 'false')
      : leaderboardInfoUKR?.filter(item => item.isRoboQuizMode === 'false');
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

    // -- 6 -- Записуємо в стейт готовий масив для рендеру (без перших 3-х переможців)
    // -- 6.1 -- РОБОТ
    setRoboInfo(sortedByTimeAndLevelsRobo.slice(3));
    // Шукаємо індекс залогіненого юзера (серед загального списку)
    const findedUserRoboIdx = findUserById(roboInfo, userID);
    setUserIdxRobo(findedUserRoboIdx);
    // -- 6.2 -- МУЗИКА
    setMusicInfo(sortedByTimeAndLevelsMusic.slice(3));
    // Шукаємо індекс залогіненого юзера (серед загального списку)
    const findedUserMusicIdx = findUserById(musicInfo, userID);
    setUserIdxMusic(findedUserMusicIdx);
    // ---------------------------------------------------------------------------

    // -- 7 -- Масив для рендеру переможців (перших три з відсортованого масиву)
    // -- 7.1 -- РОБОТ
    const winnersArrRobo = sortedByTimeAndLevelsRobo.slice(0, 3);
    setRoboWinners(winnersArrRobo);
    // Шукаємо індекс залогіненого юзера (серед списку переможців)
    const findedUserWinnersRoboIdx = findUserById(roboWinners, userID);
    setUserIdxWinnersRobo(findedUserWinnersRoboIdx);
    // -- 7.2 -- МУЗИКА
    const winnersArrMusic = sortedByTimeAndLevelsMusic.slice(0, 3);
    setMusicWinners(winnersArrMusic);
    // Шукаємо індекс залогіненого юзера (серед списку переможців)
    const findedUserWinnersMusicIdx = findUserById(musicWinners, userID);
    setUserIdxWinnersMusic(findedUserWinnersMusicIdx);
    // ----------------------------------------------------------------------------
    // НЕ ДОДАВАТИ ЗАЛЕЖНОСТІ!!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEngLang, leaderboardInfoEN, leaderboardInfoUKR, userID]);

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
    <>
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

        {/* ERROR TEXT */}
        {roboQuizMode && roboInfo.length === 0 && roboWinners.length === 0 && (
          <h2 className={s.errorText}>Leaderboard is empty</h2>
        )}
        {!roboQuizMode &&
          musicInfo.length === 0 &&
          musicWinners.length === 0 && (
            <h2 className={s.errorText}>Leaderboard is empty</h2>
          )}

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
                <div
                  className={idx === 0 ? s.smallCircleWinner : s.smallCircle}
                >
                  {idx + 1}
                </div>
                <div
                  className={
                    userIdxWinnersRobo === idx
                      ? s.backgroundUserRobo
                      : s.background
                  }
                >
                  <p
                    className={
                      userIdxWinnersRobo === idx ? s.textWhite : s.text
                    }
                  >
                    {item[1].user.name}
                  </p>
                  <div className={s.scoreWrapper}>
                    <p
                      className={
                        userIdxWinnersRobo === idx ? s.textWhite : s.text
                      }
                    >
                      {item.length - 1}
                      lvls.
                    </p>
                    <p
                      className={
                        userIdxWinnersRobo === idx ? s.textWhite : s.text
                      }
                    >
                      {item[0]}
                      sec.
                    </p>
                    {/* Кнопка збереження результатів (поки що не реалізуємо) */}
                    {/* {userIdxWinnersRobo === idx && !token && !googleToken && (
                      <button type="button" className={s.saveResultBtnWinner}>
                        Save result
                      </button>
                    )} */}
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
                <div
                  className={idx === 0 ? s.smallCircleWinner : s.smallCircle}
                >
                  {idx + 1}
                </div>
                <div
                  className={
                    userIdxWinnersMusic === idx
                      ? s.backgroundUserMusic
                      : s.background
                  }
                >
                  {' '}
                  <p
                    className={
                      userIdxWinnersMusic === idx ? s.textWhite : s.text
                    }
                  >
                    {item[1].user.name}
                  </p>
                  <div className={s.scoreWrapper}>
                    <p
                      className={
                        userIdxWinnersMusic === idx ? s.textWhite : s.text
                      }
                    >
                      {item.length - 1}
                      lvls.
                    </p>
                    <p
                      className={
                        userIdxWinnersMusic === idx ? s.textWhite : s.text
                      }
                    >
                      {item[0]}
                      sec.
                    </p>
                    {/* Кнопка збереження результатів (поки що не реалізуємо) */}
                    {/* {userIdxWinnersMusic === idx && !token && !googleToken && (
                      <button type="button" className={s.saveResultBtnWinner}>
                        Save result
                      </button>
                    )} */}
                  </div>
                </div>
              </li>
            ))}
          </div>
        )}

        {/* Список гравців РОБОТ */}
        {roboQuizMode && (
          <div className={s.listWrapper}>
            {' '}
            <ol className={s.list}>
              {roboInfo.length !== 0 &&
                roboInfo.map((item, idx) => (
                  <li
                    key={item[1].user.name}
                    className={
                      userIdxRobo === idx ? s.itemWrapUserRobo : s.itemWrap
                    }
                  >
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
                      <div
                        className={userIdxRobo === idx ? s.nameWhite : s.name}
                      >
                        {item[1].user.name}
                      </div>
                      {/* Кнопка збереження результатів (поки що не реалізуємо) */}
                      {/* {userIdxRobo === idx && !token && !googleToken && (
                        <button type="button" className={s.saveResultBtnList}>
                          Save result
                        </button>
                      )} */}
                      <div className={s.innerWrapper}>
                        <div
                          className={userIdxRobo === idx ? s.textWhite : s.text}
                        >
                          {item.length - 1} lvls.
                        </div>
                        <div
                          className={userIdxRobo === idx ? s.textWhite : s.text}
                        >
                          {item[0]} sec.
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        )}

        {/* Список гравців МУЗИКА */}
        {!roboQuizMode && (
          <div className={s.listWrapper}>
            {' '}
            <ol className={s.list}>
              {musicInfo.length !== 0 &&
                musicInfo.map((item, idx) => (
                  <li
                    key={item[1].user.name}
                    className={
                      userIdxMusic === idx ? s.itemWrapUserMusic : s.itemWrap
                    }
                  >
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
                      <div
                        className={userIdxMusic === idx ? s.nameWhite : s.name}
                      >
                        {item[1].user.name}
                      </div>
                      {/* Кнопка збереження результатів (поки що не реалізуємо) */}
                      {/* {userIdxMusic === idx && !token && !googleToken && (
                        <button type="button" className={s.saveResultBtnList}>
                          Save result
                        </button>
                      )} */}
                      <div className={s.innerWrapper}>
                        <div
                          className={
                            userIdxMusic === idx ? s.textWhite : s.text
                          }
                        >
                          {item.length - 1} lvls.
                        </div>
                        <div
                          className={
                            userIdxMusic === idx ? s.textWhite : s.text
                          }
                        >
                          {item[0]} sec.
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

export default Leaderboard;
