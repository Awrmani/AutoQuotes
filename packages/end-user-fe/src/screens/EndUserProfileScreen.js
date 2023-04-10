import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import { useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import { updateUser } from '../actions';
import paths from '../paths';
import EndUserRegistration from '../components/EndUserRegistration';
import { getCurrentUserQuery } from '../reducers/queriesReducer';

const validator = validatorFactory({
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  password: [stringValidators.isString],
  passwordConfirm: [
    stringValidators.isString,
    stringValidators.verifyInput('password'),
  ],
  address1: [stringValidators.required],
  address2: [stringValidators.isString],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
});

const EndUserProfileScreen = () => {
  const navigate = useNavigate();

  // Extract the details from the redux store
  const userDetailsQuery = useSelector(getCurrentUserQuery);
  const { isFetching, result } = userDetailsQuery ?? {};

  // Create the form initial values, prefill the current details of the entity
  const initialValues = useMemo(() => {
    const { billingInformation, ...rest } = result;
    return {
      password: '', // Have to add this, BE will never send back the PWD in any form
      passwordConfirm: '',
      ...billingInformation,
      ...rest,
    };
  }, [result]);

  const handleSuccess = useCallback(() => {
    navigate(paths.quotingPage({}));
  }, [navigate]);

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );
  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={updateUser}
      onSuccess={handleSuccess}
    >
      <EndUserRegistration edit />
    </Form>
  );
};

export default EndUserProfileScreen;
