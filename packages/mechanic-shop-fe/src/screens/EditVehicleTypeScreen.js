import React, { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditVehicleTypeForm from '../components/EditVehicleTypeForm';
import { getVehicleTypeDetailsQuery } from '../reducers/queriesReducer';
import { updateVehicleType, fetchVehicleTypeDetails } from '../actions';
import paths from '../paths';

const validator = validatorFactory({
  make: [stringValidators.required],
  model: [stringValidators.required],
  modelYear: [stringValidators.asNumber(numberValidators.required)],
  engineVariant: [stringValidators.required],
  bodyType: [stringValidators.required],
});

const EditVehicleTypeScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Take the ID out of the browser url
  const dispatch = useDispatch();

  // Hook responsible for loading details from the BE
  useEffect(() => {
    dispatch(fetchVehicleTypeDetails({ id }));
  }, [id, dispatch]);

  // Extract the details from the redux store
  const vehicletypeDetailsQuery = useSelector(getVehicleTypeDetailsQuery);
  const { isFetching, result } = vehicletypeDetailsQuery ?? {};

  // Create the form initial values, prefill the current details of the entity
  const initialValues = useMemo(
    () => ({
      ...result,
    }),
    [result]
  );

  const handleSuccess = useCallback(() => {
    navigate(paths.vehicleTypeList());
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
      action={updateVehicleType}
      onSuccess={handleSuccess}
    >
      <EditVehicleTypeForm edit />
    </Form>
  );
};

export default EditVehicleTypeScreen;
