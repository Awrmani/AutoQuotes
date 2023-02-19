import React, { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory, {
  arrayOfValidator,
  subValidator,
} from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditPartForm from '../components/EditPartForm';
import { getPartDetailsQuery } from '../reducers/queriesReducer';
import { updatePart, fetchPartDetails } from '../actions';
import paths from '../paths';

const validator = validatorFactory({
  name: [stringValidators.required],
  price: [stringValidators.asNumber(numberValidators.required)],
  amountInStock: [stringValidators.asNumber(numberValidators.required)],
  compatibleVehicles: [
    arrayOfValidator([
      subValidator({
        make: [stringValidators.required],
        model: [stringValidators.required],
        fromYear: [stringValidators.asNumber(numberValidators.required)],
        toYear: [stringValidators.asNumber(numberValidators.required)],
      }),
    ]),
  ],
});

const EditPartScreen = () => {
  const navigate = useNavigate();
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
      action={updatePart}
      onSuccess={handleSuccess}
    >
      <EditPartForm edit />
    </Form>
  );
};

export default EditPartScreen;
