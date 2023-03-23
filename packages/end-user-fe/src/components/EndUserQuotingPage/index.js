import React, { useCallback, useContext, useMemo } from 'react';
import { Box, Container, Divider, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { Form } from '@autoquotes/common/src/components/Form';
import {
  addService,
  createQuote,
  fetchQuoteDetails,
  fetchServiceTypeList,
} from '../../actions';
import VehicleInfo from './VehicleInfo';
import ServiceOptions from './ServiceOptions';
import SelectedServices from './SelectedServices';

const initialValues = {
  make: '',
  model: '',
  modelYear: '',
  engineVariant: '',
  bodyType: '',
};

const EndUserQuotingPage = () => {
  const dispatch = useDispatch();

  const { setFieldValue, values } = useContext(formContext);
  const { quoteId } = values;
  const initialService = useMemo(() => {
    return {
      quoteId,
      serviceTypeId: '',
    };
  }, [quoteId]);
  // Hook responsible for loading part list from the BE

  const onSuccess = useCallback(
    ({ response }) => {
      // get the quoteId from attributes
      setFieldValue('quoteId', response?.id);
      dispatch(fetchQuoteDetails({ quoteId: response?.id }));
      dispatch(fetchServiceTypeList({ quoteId: response?.id }));
    },
    [setFieldValue, dispatch]
  );

  const serviceOptionsOnSuccess = useCallback(() => {
    dispatch(fetchQuoteDetails({ quoteId }));
  }, [quoteId, dispatch]);

  return (
    <Container component={Paper}>
      <Form
        initialValues={initialValues}
        action={createQuote}
        onSuccess={onSuccess}
      >
        <Box sx={{ my: 2 }}>
          <VehicleInfo />
          <Divider sx={{ mt: 2 }} />
        </Box>
      </Form>

      <Box sx={{ my: 2 }}>
        <SelectedServices />
      </Box>
      <Form
        enableReinitialize
        initialValues={initialService}
        action={addService}
        onSuccess={serviceOptionsOnSuccess}
      >
        <Box sx={{ my: 2 }}>
          <ServiceOptions />
          <Divider sx={{ mt: 2 }} />
        </Box>
      </Form>

      <div>End-user front-end</div>
    </Container>
  );
};

export default EndUserQuotingPage;
