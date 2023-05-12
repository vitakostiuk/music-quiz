import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { isSentEmail } from '../../../redux/auth/authSelectors';
import { ReactComponent as CloseModal } from '../../../images/close.svg';
import s from './Modal.module.css';

const Modal = ({
  onClickShowModal,
  setEmailforForgotPassword,
  text,
  btnText,
  input,
}) => {
  const sentEmail = useSelector(isSentEmail);

  const { t } = useTranslation();

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

  useEffect(() => {
    console.log('sentEmail', sentEmail);
    if (sentEmail) {
      onClickShowModal();
    }
  }, [onClickShowModal, sentEmail]);

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
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            })}
            onSubmit={values => {
              // console.log(values);
              setEmailforForgotPassword(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className={s.form}>
                <label className={s.label} htmlFor="email">
                  {t('form.email')}
                </label>
                <Field
                  id="email"
                  className={
                    errors.password && touched.password ? s.errInput : s.input
                  }
                  name="email"
                  type="email"
                  placeholder={t('form.emailPlaceholder')}
                />
                {errors.email && touched.email ? (
                  <div className={s.errEmail}>{errors.email}</div>
                ) : null}

                <button className={s.bigButton} type="submit">
                  {btnText}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
  setEmailforForgotPassword: PropTypes.func.isRequired,
  input: PropTypes.bool,
};

export default Modal;
