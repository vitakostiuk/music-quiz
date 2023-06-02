import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
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
      {email && <div className={s.email}>{email}</div>}
      {title && <div className={s.title}>{title}</div>}
      {list && (
        <ul className={s.list}>
          {list.map(({ text, icon }, idx) => (
            <li
              key={idx}
              onClick={() => handleClickItem(text)}
              className={s.item}
            >
              <div className={s.itemWrapper}>
                {icon && <div className={s.icon}>{icon}</div>}
                <p className={s.text}>{text}</p>
              </div>
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

Popup.propTypes = {
  email: PropTypes.string,
  title: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.element,
    })
  ),
  mouseEnterHandler: PropTypes.func,
  mouseLeaveHandler: PropTypes.func,
  handleClickItem: PropTypes.func,
  handleClickLeaveBtn: PropTypes.func,
  handleClickContinueBtn: PropTypes.func,
  to: PropTypes.string,
};

export default Popup;
