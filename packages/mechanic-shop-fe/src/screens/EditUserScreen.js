import React, { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import EditUserForm from '../components/EditUserForm';
import { getUserDetailsQuery } from '../reducers/queriesReducer';
import { updateUser, fetchUserDetails } from '../actions';
import paths from '../paths';

const validator = validatorFactory({
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  password: [stringValidators.required],
  role: [
    stringValidators.required,
    stringValidators.oneOf(['admin', 'employee']),
  ],
});

const EditUserScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Take the ID out of the browser url
  const dispatch = useDispatch();

  // Hook responsible for loading part details from the BE
  useEffect(() => {
    dispatch(fetchUserDetails({ id }));
  }, [id, dispatch]);

  // Extract the details from the redux store
  const userDetailsQuery = useSelector(getUserDetailsQuery);
  const { isFetching, result } = userDetailsQuery ?? {};

  // Create the form initial values, prefill the current details of the entity
  const initialValues = useMemo(
    () => ({
      ...result,
    }),
    [result]
  );

  const handleSuccess = useCallback(() => {
    navigate(paths.partList());
  }, [navigate]);

  // DO not render while data is fetching from the BE
  if (isFetching || result?.id !== id)
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
      <EditUserForm edit />
    </Form>
  );
};

export default EditUserScreen;
