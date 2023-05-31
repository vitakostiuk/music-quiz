import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useLoginValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    email: Yup.string()
      .email(t('formValidation.email'))
      .required(t('formValidation.emailRequired')),
    password: Yup.string()
      .min(8, t('formValidation.password'))
      .required(t('formValidation.passwordRequired')),
  });
};

const useSignUpValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    name: Yup.string()
      .min(2, t('formValidation.name'))
      .required(t('formValidation.nameRequired')),
    email: Yup.string()
      .email(t('formValidation.email'))
      .required(t('formValidation.emailRequired')),
    password: Yup.string()
      .min(8, t('formValidation.password'))
      .required(t('formValidation.passwordRequired')),
  });
};

export { useLoginValidationSchema, useSignUpValidationSchema };
