import React, { useEffect } from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import EndUserQuotingPage from '../components/EndUserQuotingPage';
import { fetchVehicleTypeList } from '../actions';
import { getVehicleTypeListQuery } from '../reducers/queriesReducer';

const initialValues = {
  make: '',
  model: '',
  year: '',
  engine: '',
  body: '',
};
const EndUserQuotingPageScreen = () => {
  const dispatch = useDispatch();

  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(fetchVehicleTypeList());
  }, [dispatch]);

  // Extract the list query from the redux store
  const VehicleTypeListQuery = useSelector(getVehicleTypeListQuery);

  const { isFetching, result } = VehicleTypeListQuery ?? {};

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
      validation={null}
      action={null}
      onSuccess={null}
    >
      <EndUserQuotingPage />
    </Form>
  );
};

export default EndUserQuotingPageScreen;
