import { useState, useRef } from 'react';
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
import Popup from '../../common/Popup';
import s from '../Header.module.css';

const AvatarButton = () => {
  const [popup, setPopup] = useState(false);

  const ref = useRef();
  useOutsideClick(ref, setPopup);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);
  const userAvatar = useSelector(getAvatarURL);
  const userEmail = useSelector(getUserEmail);

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

  return (
    <div className={s.avatarWrapper} ref={ref}>
      {token && (
        <div className={s.circle} onClick={handleClickAvatar}>
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
  );
};

export default AvatarButton;
