import React, { useEffect, useMemo } from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import EndUserQuotingPage from '../components/EndUserQuotingPage';
import {
  fetchQuoteDetails,
  fetchVehicleTypeList,
  fetchServiceTypeList,
  finalizeQuote,
} from '../actions';

import {
  getVehicleTypeListQuery,
  getQuoteDetails,
} from '../reducers/queriesReducer';

const EndUserQuotingPageScreen = () => {
  const dispatch = useDispatch();
  const { quoteId } = useParams() ?? {};

  useEffect(() => {
    if (!quoteId || quoteId === 'new') return;

    dispatch(fetchQuoteDetails({ quoteId }));
  }, [dispatch, quoteId]);

  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(fetchVehicleTypeList());
  }, [dispatch]);
  useEffect(() => {
    if (quoteId === 'new') return;

    dispatch(fetchServiceTypeList({ quoteId }));
  }, [dispatch, quoteId]);

  // Extract the list query from the redux store
  const VehicleTypeListQuery = useSelector(getVehicleTypeListQuery);
  const quoteDetails = useSelector(getQuoteDetails);

  const { isFetching, result } = VehicleTypeListQuery ?? {};

  const initialValues = useMemo(() => {
    if (quoteId === quoteDetails?.id)
      return {
        isFinalized: quoteDetails?.isFinalized ?? false,
        vehicleType: quoteDetails?.vehicleType,
        quoteId: quoteDetails?.id ?? '',
        lineItems: quoteDetails?.lineItems,
      };

    return {
      isFinalized: false,
      quoteId: '',
    };
  }, [quoteDetails, quoteId]);

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
    >
      <EndUserQuotingPage />
    </Form>
  );
};

export default EndUserQuotingPageScreen;
