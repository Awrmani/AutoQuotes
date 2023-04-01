import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack, Container, Paper } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import VehicleInfo from '../components/EndUserQuotingPage/VehicleInfo';
import EndUserQuotingPage from '../components/EndUserQuotingPage';
import {
  fetchQuoteDetails,
  fetchVehicleTypeList,
  fetchServiceTypeList,
  finalizeQuote,
  createQuote,
} from '../actions';
import {
  getVehicleTypeListQuery,
  getQuoteDetails,
} from '../reducers/queriesReducer';
import paths from '../paths';

const EndUserQuotingPageScreen = () => {
  const navigate = useNavigate();
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
        quoteId: quoteDetails?.id ?? '',
        lineItems: quoteDetails?.lineItems,
      };

    return {
      isFinalized: false,
      quoteId: '',
    };
  }, [quoteDetails, quoteId]);

  const vehicleTypeFormInitialValues = useMemo(
    () => ({
      isFinalized: quoteDetails?.isFinalized ?? false,
      make: quoteDetails?.vehicleType?.make ?? '',
      model: quoteDetails?.vehicleType?.model ?? '',
      modelYear: String(quoteDetails?.vehicleType?.modelYear ?? ''),
      engineVariant: quoteDetails?.vehicleType?.engineVariant ?? '',
      bodyType: quoteDetails?.vehicleType?.bodyType ?? '',
    }),
    [quoteDetails]
  );

  // Hook responsible for loading part list from the BE
  const onQuoteCreateSuccess = useCallback(
    ({ response }) => {
      // get the quoteId from attributes
      navigate(paths.quotingPage({ quoteId: response?.id }));
    },
    [navigate]
  );

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return (
    <Container component={Paper}>
      {/* Vehicle type form */}

      <Form
        enableReinitialize
        initialValues={vehicleTypeFormInitialValues}
        action={createQuote}
        onSuccess={onQuoteCreateSuccess}
      >
        <VehicleInfo />
      </Form>

      <Form
        enableReinitialize
        initialValues={initialValues}
        action={finalizeQuote}
      >
        <EndUserQuotingPage />
      </Form>
    </Container>
  );
};

export default EndUserQuotingPageScreen;
