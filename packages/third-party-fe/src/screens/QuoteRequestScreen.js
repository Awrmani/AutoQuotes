import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Stack,
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import moment from 'moment';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import { fetchRequestedParts, offerParts } from '../actions';
import { getRequestedPartsQuery } from '../reducers/queriesReducer';
import PartForm from '../components/PartForm';

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
  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(fetchRequestedParts({ supplierId, quoteId }));
  }, [supplierId, quoteId, dispatch]);
  const requestedPartsQuery = useSelector(getRequestedPartsQuery) ?? {};
  const { isFetching, result } = requestedPartsQuery ?? {};

  const initialValues = useMemo(() => {
    return {
      quoteId,
      supplierId,
      partRequestId: result?.[tab].id,

      description: '',
      manufacturer: '',
      type: '',
      warrantyMonths: '',
      price: '',
      offerExpiration: moment(),
    };
  }, [quoteId, supplierId, result, tab]);

  const handleTabChange = (event, tabIndex) => {
    setTab(tabIndex);
  };

  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return (
    <Container component={Paper}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="scrollable" value={tab} onChange={handleTabChange}>
          {result.map(({ partName }) => (
            <Tab label={partName} key={partName} />
          ))}
        </Tabs>
      </Box>
      <Form
        key={tab}
        enableReinitialize
        initialValues={initialValues}
        action={offerParts}
        validation={validator}
      >
        <PartForm />
      </Form>
    </Container>
  );
};

export default QuoteRequestScreen;
