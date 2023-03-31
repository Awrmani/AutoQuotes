import React, { useEffect, useMemo } from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import EndUserQuotingPage from '../components/EndUserQuotingPage';
import {
  fetchQuoteDetails,
  fetchVehicleTypeList,
  finalizeQuote,
} from '../actions';

import {
  getVehicleTypeListQuery,
  getQuoteDetails,
} from '../reducers/queriesReducer';

const EndUserQuotingPageScreen = () => {
  const dispatch = useDispatch();
  const { quoteId: pathQuoteId } = useParams() ?? {};

  useEffect(() => {
    dispatch(fetchQuoteDetails({ quoteId: pathQuoteId }));
  }, [dispatch, pathQuoteId]);

  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(fetchVehicleTypeList());
  }, [dispatch]);

  // Extract the list query from the redux store
  const VehicleTypeListQuery = useSelector(getVehicleTypeListQuery);
  const quoteDetails = useSelector(getQuoteDetails);

  const { isFetching, result } = VehicleTypeListQuery ?? {};

  const initialValues = useMemo(
    () => ({
      quoteId: quoteDetails?.id ?? '',
      lineItems: quoteDetails?.lineItems,
    }),
    [quoteDetails]
  );

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );
  return (
    <Form
      enableReinitialize
      initialValues={initialValues}
      action={finalizeQuote}
      onSuccess={null}
    >
      <EndUserQuotingPage />
    </Form>
  );
};

export default EndUserQuotingPageScreen;
