import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import EndUserLogin from '../components/EndUserLogin';
import { login } from '../actions';

const initialValues = { email: '', password: '' };

const validator = validatorFactory({
  email: [stringValidators.required, stringValidators.email],
  password: [stringValidators.required],
});

const EndUserLoginScreen = () => {
  return (
    <Form initialValues={initialValues} validation={validator} action={login}>
      <EndUserLogin />
    </Form>
  );
};

export default EndUserLoginScreen;
