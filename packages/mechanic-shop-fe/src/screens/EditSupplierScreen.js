import React, { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import EditSupplierForm from '../components/EditSupplierForm';
import { getSupplierDetailsQuery } from '../reducers/queriesReducer';
import { updateSupplier, fetchSupplierDetails } from '../actions';
import paths from '../paths';

const validator = validatorFactory({
  name: [stringValidators.required],
  address: [stringValidators.required],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
  email: [stringValidators.required],
  phone: [stringValidators.required],
});

const EditSupplierScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Take the ID out of the browser url
  const dispatch = useDispatch();

  // Hook responsible for loading details from the BE
  useEffect(() => {
    dispatch(fetchSupplierDetails({ id }));
  }, [id, dispatch]);

  // Extract the details from the redux store
  const query = useSelector(getSupplierDetailsQuery);
  const { isFetching, result } = query ?? {};

  // Create the form initial values, prefill the current details of the entity
  const initialValues = useMemo(
    () => ({
      ...result,
    }),
    [result]
  );

  const handleSuccess = useCallback(() => {
    navigate(paths.supplierList());
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
      action={updateSupplier}
      onSuccess={handleSuccess}
    >
      <EditSupplierForm edit />
    </Form>
  );
};

export default EditSupplierScreen;
