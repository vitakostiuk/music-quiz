import { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import { ReactComponent as CloseModal } from '../../../images/close.svg';
import s from './Modal.module.css';

const Modal = ({ onClickShowModal, text, btnText, input }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClickShowModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClickShowModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClickShowModal();
    }
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button
          type="button"
          className={s.closeModalBtn}
          onClick={onClickShowModal}
        >
          <CloseModal />
        </button>
        <p className={s.title}>{text}</p>
        {input && (
          <>
            <p className={s.text}>
              Enter your email address and we'll send you a password reset link.
            </p>
            <label className={s.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={s.input}
              name="email"
              type="email"
              placeholder="your@email.com"
            />
          </>
        )}
        <button className={s.bigButton} type="button">
          {btnText}
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
  input: PropTypes.bool,
};

export default Modal;
