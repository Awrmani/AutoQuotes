import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import PartList from '../components/PartList';
import { fetchPartList } from '../actions';
import { getPartListQuery } from '../reducers/queriesReducer';

const PartListScreen = () => {
  const dispatch = useDispatch();

  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(fetchPartList());
  }, [dispatch]);

  // Extract the list query from the redux store
  const partListQuery = useSelector(getPartListQuery);
  const { isFetching, result } = partListQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return <PartList />;
};

export default PartListScreen;
