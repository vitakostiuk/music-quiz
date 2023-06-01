import { useTranslation } from 'react-i18next';
import s from './Popup.module.css';

const Popup = ({
  email,
  title,
  list,
  mouseEnterHandler,
  mouseLeaveHandler,
  handleClickItem,
  handleClickLeaveBtn,
  handleClickContinueBtn,
  to,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={s.popupWrapper}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {email && <div>{email}</div>}
      {title && <div className={s.title}>{title}</div>}
      {list && (
        <ul>
          {list.map(({ text }, idx) => (
            <li
              key={idx}
              onClick={() => handleClickItem(text)}
              className={s.item}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
      <div className={s.btnsWrap}>
        {handleClickLeaveBtn && (
          <button
            className={s.btnLeave}
            type="button"
            onClick={() => handleClickLeaveBtn(to)}
          >
            {t('popup.leaveBtn')}
          </button>
        )}
        {handleClickContinueBtn && (
          <button
            className={s.btnContinue}
            type="button"
            onClick={handleClickContinueBtn}
          >
            {t('popup.continueBtn')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
