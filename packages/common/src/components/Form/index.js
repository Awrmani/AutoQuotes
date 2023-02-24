import React from 'react';
import PropTypes from 'prop-types';
import { FormProvider } from './formContext';
import useForm from './hooks/useForm';
import Field from './Field';
import FieldArray from './FieldArray';
import SubmitButton from './SubmitButton';
import FormError from './FormError';
import styles from './index.module.scss';

const Form = ({
  children,
  action,
  validation,
  initialValues,
  onSuccess,
  enableReinitialize,
  submitInterceptors,
  onError,
}) => {
  const formikBag = useForm({
    action,
    validation,
    initialValues,
    onSuccess,
    enableReinitialize,
    submitInterceptors,
    onError,
  });

  const { handleSubmit } = formikBag;

  return (
    <form onSubmit={handleSubmit}>
      <FormProvider value={formikBag}>{children}</FormProvider>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="submit" className={styles.impliciteSubmitButton} />
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  action: PropTypes.func,
  validation: PropTypes.func,
  initialValues: PropTypes.shape({}),
  onSuccess: PropTypes.func,
  enableReinitialize: PropTypes.bool,
  submitInterceptors: PropTypes.arrayOf(PropTypes.func),
  onError: PropTypes.func,
};

Form.defaultProps = {
  action: undefined,
  validation: undefined,
  initialValues: undefined,
  onSuccess: undefined,
  enableReinitialize: undefined,
  submitInterceptors: undefined,
  onError: undefined,
};

export { Form, Field, FieldArray, SubmitButton, FormError };
