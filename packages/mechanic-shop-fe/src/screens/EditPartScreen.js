import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditPartForm from '../components/EditPartForm';
import { updatePart, fetchPartDetails } from '../actions';
import { getPartDetailsQuery } from '../reducers/queriesReducer';

const validator = validatorFactory({
  name: [stringValidators.required],
  price: [numberValidators.required],
  amountInStock: [numberValidators.required],
  compatibleVehicles: [stringValidators.required],
});

const EditPartScreen = () => {
  const { id } = useParams(); // Take the ID out of the browser url
  const dispatch = useDispatch();

  // Hook responsible for loading part details from the BE
  useEffect(() => {
    dispatch(fetchPartDetails({ id }));
  }, [id, dispatch]);

  // Extract the details from the redux store
  const partDetailsQuery = useSelector(getPartDetailsQuery);
  const { isFetching, result } = partDetailsQuery ?? {};

  // Create the form initial values, prefill the current details of the entity
  const initialValues = useMemo(
    () => ({
      ...result,
      // Overriding for now
      compatibleVehicles: '',
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
      action={updatePart}
    >
      <EditPartForm edit />
    </Form>
  );
};

export default EditPartScreen;
