import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { fetchRequestedParts } from '../actions';
import { getRequestedPartsQuery } from '../reducers/queriesReducer';
import QuoteRequest from '../components/QuoteRequest';

const QuoteRequestScreen = () => {
  const dispatch = useDispatch();
  const { supplierId, quoteId } = useParams();

  useEffect(() => {
    dispatch(fetchRequestedParts({ supplierId, quoteId }));
  }, [supplierId, quoteId, dispatch]);
  const requestedPartsQuery = useSelector(getRequestedPartsQuery) ?? {};
  const { isFetching, result } = requestedPartsQuery ?? {};
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return <QuoteRequest />;
};

export default QuoteRequestScreen;
