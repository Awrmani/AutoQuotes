import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import moment from 'moment';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import { fetchRequestedParts, offerParts } from '../actions';
import { getRequestedPartsQuery } from '../reducers/queriesReducer';
import QuoteRequest from '../components/QuoteRequest';

const validator = validatorFactory({
  quoteId: [stringValidators.required],
  supplierId: [stringValidators.required],
  partRequestId: [stringValidators.required],
  price: [stringValidators.asNumber(numberValidators.required)],
  description: [stringValidators.isStringOrUndefined],
  manufacturer: [stringValidators.isStringOrUndefined],
  type: [
    stringValidators.required,
    stringValidators.oneOf(['OEM', 'OE', 'Aftermarket']),
  ],
  warrantyMonths: [stringValidators.asNumber(numberValidators.required)],
});

const QuoteRequestScreen = () => {
  const dispatch = useDispatch();
  const { supplierId, quoteId } = useParams();

  useEffect(() => {
    dispatch(fetchRequestedParts({ supplierId, quoteId }));
  }, [supplierId, quoteId, dispatch]);
  const requestedPartsQuery = useSelector(getRequestedPartsQuery) ?? {};
  const { isFetching, result } = requestedPartsQuery ?? {};

  const initialValues = useMemo(() => {
    return {
      quoteId,
      supplierId,
      partRequestId: '',
      description: '',
      manufacturer: '',
      type: '',
      warrantyMonths: '',
      price: '',
      offerExpiration: moment(),
    };
  }, [quoteId, supplierId]);

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
      action={offerParts}
      validation={validator}
    >
      <QuoteRequest />
    </Form>
  );
};

export default QuoteRequestScreen;
