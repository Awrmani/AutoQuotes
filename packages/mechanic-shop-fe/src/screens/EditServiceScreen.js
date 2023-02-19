import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditServiceForm from '../components/EditServiceForm';
import { updateService, fetchServiceDetails } from '../actions';
import { getServiceDetailsQuery } from '../reducers/queriesReducer';

const validator = validatorFactory({
  name: [stringValidators.required],
  timeInMinutes: [numberValidators.required],
  description: [stringValidators.required],
});

const EditServiceScreen = () => {
  const { id } = useParams(); // Take the ID out of the browser url
  const dispatch = useDispatch();

  // Hook responsible for loading part details from the BE
  useEffect(() => {
    dispatch(fetchServiceDetails({ id }));
  }, [id, dispatch]);

  // Extract the details from the redux store
  const serviceDetailsQuery = useSelector(getServiceDetailsQuery);
  const { isFetching, result } = serviceDetailsQuery ?? {};

  // Create the form initial values, prefill the current details of the entity
  const initialValues = useMemo(
    () => ({
      ...result,
    }),
    [result]
  );

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
      action={updateService}
    >
      <EditServiceForm edit />
    </Form>
  );
};

export default EditServiceScreen;
