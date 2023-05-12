import s from './Popup.module.css';

const Popup = ({
  email,
  list,
  mouseEnterHandler,
  mouseLeaveHandler,
  handleClickItem,
}) => {
  return (
    <div
      className={s.popupWrapper}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div>{email}</div>
      <ul>
        {list.map(({ text }, idx) => (
          <li key={idx} onClick={handleClickItem} className={s.item}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
