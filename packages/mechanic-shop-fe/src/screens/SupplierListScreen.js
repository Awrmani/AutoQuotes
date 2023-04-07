import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import SupplierList from '../components/SupplierList';
import { fetchSupplierList } from '../actions';
import { getSupplierListQuery } from '../reducers/queriesReducer';

const SupplierListScreen = () => {
  const dispatch = useDispatch();

  // Hook responsible for loading supplier list from the BE
  useEffect(() => {
    dispatch(fetchSupplierList());
  }, [dispatch]);

  // Extract the list query from the redux store
  const query = useSelector(getSupplierListQuery);
  const { isFetching, result } = query ?? {};

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return <SupplierList />;
};

export default SupplierListScreen;
