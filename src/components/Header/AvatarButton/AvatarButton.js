import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { logout } from '../../../redux/auth/authOperations';
import { resetState, resetLevels } from '../../../redux/player/playerSlice';
import {
  getToken,
  getAvatarURL,
  getUserEmail,
} from '../../../redux/auth/authSelectors';
import { answerState } from '../../../redux/player/playerSelectors';
import Popup from '../../common/Popup';
import s from '../Header.module.css';

const AvatarButton = () => {
  const [popup, setPopup] = useState(false);
  const [popupOnGame, setPopupOnGame] = useState(false);

  const ref = useRef();
  const refOnGame = useRef();
  useOutsideClick(ref, setPopup);
  useOutsideClick(refOnGame, setPopupOnGame);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);
  const userAvatar = useSelector(getAvatarURL);
  const userEmail = useSelector(getUserEmail);
  const answers = useSelector(answerState);

  // POPUP
  const handleClickExit = () => {
    dispatch(logout());
    setPopup(null);

    dispatch(resetLevels());
    dispatch(resetState());
  };

  const mouseEnterHandler = () => {
    setPopup(true);
  };
  const mouseLeaveHandler = () => {
    setPopup(false);
  };

  const handleClickAvatar = () => {
    if (popup) return setPopup(false);
    setPopup(true);
  };

  const handleClickAvatarOnGame = () => {
    if (popupOnGame) return setPopupOnGame(false);
    setPopupOnGame(true);
  };

  // POPUP BUTTONS (попап коли в грі натискається будь-що з хедеру)
  const onClickLeaveGameBtn = to => {
    setPopupOnGame(null);

    dispatch(resetState());

    navigate(`/${to}`);
  };
  const onClickContinueGameBtn = () => {
    setPopupOnGame(null);
  };

  return (
    <>
      <div className={s.avatarWrapper} ref={ref}>
        {token && (
          <div
            className={s.circle}
            onClick={
              answers.length === 0 ? handleClickAvatar : handleClickAvatarOnGame
            }
          >
            <img
              src={
                userAvatar
                  ? userAvatar
                  : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
              }
              alt="avatar"
              className={s.avatar}
            />
          </div>
        )}
        {popup && (
          <Popup
            email={userEmail ?? ''}
            list={[
              {
                text: t('header.exit'),
              },
            ]}
            mouseEnterHandler={mouseEnterHandler}
            mouseLeaveHandler={mouseLeaveHandler}
            handleClickItem={handleClickExit}
          />
        )}
      </div>
      <div ref={refOnGame}>
        {popupOnGame && (
          <Popup
            title={t('popup.title')}
            handleClickLeaveBtn={onClickLeaveGameBtn}
            handleClickContinueBtn={onClickContinueGameBtn}
            to=""
          />
        )}
      </div>
    </>
  );
};

export default AvatarButton;
