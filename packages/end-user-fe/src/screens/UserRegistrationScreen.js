import React, { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import { registerUser } from '../actions';
import paths from '../paths';
import EndUserRegistration from '../components/EndUserRegistration';

const validator = validatorFactory({
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  password: [stringValidators.required],
  passwordConfirm: [
    stringValidators.required,
    stringValidators.verifyInput('password'),
  ],
  address1: [stringValidators.required],
  address2: [stringValidators.isString],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
});

const EndUserRegistrationScreen = () => {
  const navigate = useNavigate();
  const { quoteId } = useLocation()?.state ?? {};

  const initialValues = useMemo(
    () => ({
      quoteId,
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      address1: '',
      address2: '',
      zip: '',
      city: '',
      state: '',
      country: '',
    }),
    [quoteId]
  );

  const handleSuccess = useCallback(() => {
    navigate(paths.confirmingEmail());
  }, [navigate]);

  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={registerUser}
      onSuccess={handleSuccess}
    >
      <EndUserRegistration />
    </Form>
  );
};

export default EndUserRegistrationScreen;
