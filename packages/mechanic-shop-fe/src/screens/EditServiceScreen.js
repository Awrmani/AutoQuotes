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
import EditServiceForm from '../components/EditServiceForm';
import { updateService, fetchServiceDetails } from '../actions';
import { getServiceDetailsQuery } from '../reducers/queriesReducer';
import paths from '../paths';

const validator = validatorFactory({
  name: [stringValidators.required],
  timeInMinutes: [stringValidators.asNumber(numberValidators.required)],
  description: [stringValidators.required],
  compatibleVehicles: [
    arrayOfValidator([
      subValidator({
        make: [stringValidators.required],
        model: [stringValidators.required],
        fromYear: [
          stringValidators.asNumber(numberValidators.isNumberOrUndefined),
        ],
        toYear: [
          stringValidators.asNumber(numberValidators.isNumberOrUndefined),
        ],
      }),
    ]),
  ],
  requiredParts: [
    arrayOfValidator([
      subValidator({
        name: [stringValidators.required],
      }),
    ]),
  ],
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
  const navigate = useNavigate();
  const handleSuccess = useCallback(() => {
    navigate(paths.serviceList());
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
      action={updateService}
      onSuccess={handleSuccess}
    >
      <EditServiceForm edit />
    </Form>
  );
};

export default EditServiceScreen;
