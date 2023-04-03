import React, { useCallback, useEffect, useMemo } from 'react';
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
  reqestOffers,
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
    if (!quoteDetails?.id || quoteId !== quoteDetails?.id)
      return {
        isFinalized: false,
        quoteId: '',
      };

    return {
      isFinalized: quoteDetails.isFinalized ?? false,
      quoteId: quoteDetails.id ?? '',
      lineItems: quoteDetails.lineItems,
      arePartsMissing: quoteDetails.arePartsMissing,
      arePartsMissingWithoutQuotesRequested:
        quoteDetails.arePartsMissingWithoutQuotesRequested,
      appointment: quoteDetails.appointment,
    };
  }, [quoteDetails, quoteId]);

  const vehicleTypeFormInitialValues = useMemo(() => {
    if (!quoteDetails?.id || quoteId !== quoteDetails?.id)
      return {
        isFinalized: false,
        make: '',
        model: '',
        modelYear: '',
        engineVariant: '',
        bodyType: '',
      };

    return {
      isFinalized: quoteDetails.isFinalized ?? false,
      make: quoteDetails.vehicleType?.make ?? '',
      model: quoteDetails.vehicleType?.model ?? '',
      modelYear: String(quoteDetails.vehicleType?.modelYear ?? ''),
      engineVariant: quoteDetails.vehicleType?.engineVariant ?? '',
      bodyType: quoteDetails.vehicleType?.bodyType ?? '',
    };
  }, [quoteDetails, quoteId]);

  // Hook responsible for loading part list from the BE
  const onQuoteCreateSuccess = useCallback(
    ({ response }) => {
      // get the quoteId from attributes
      navigate(paths.quotingPage({ quoteId: response?.id }));
    },
    [navigate]
  );

  const onSuccess = useCallback(() => {
    navigate(paths.appointment({ quoteId: quoteDetails?.id }));
  }, [navigate, quoteDetails]);

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
        action={
          quoteDetails?.arePartsMissingWithoutQuotesRequested
            ? reqestOffers
            : finalizeQuote
        }
        onSuccess={onSuccess}
      >
        <EndUserQuotingPage />
      </Form>
    </Container>
  );
};

export default EndUserQuotingPageScreen;
