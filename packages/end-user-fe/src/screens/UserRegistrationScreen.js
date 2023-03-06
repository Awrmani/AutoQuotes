import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import { registerUser } from '../actions';
import paths from '../paths';
import EndUserRegistration from '../components/EndUserRegistration';

const initialValues = {
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
};

const validator = validatorFactory({
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  password: [stringValidators.required],
  passwordConfirm: [stringValidators.required],
  address1: [stringValidators.required],
  address2: [stringValidators.isString],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
});

const EndUserRegistrationScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate(paths.quotingPage());
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
