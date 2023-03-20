import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Divider, Paper } from '@mui/material';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { Form } from '@autoquotes/common/src/components/Form';
import { createQuote, fetchServiceTypeList } from '../../actions';
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

const emptyQuotes = {
  id: '',
  lineItems: [
    {
      serviceTypeId: '',
      selectedParts: [],
    },
  ],
};
const EndUserQuotingPage = () => {
  const { setFieldValue, values } = useContext(formContext);
  const dispatch = useDispatch();

  // Hook responsible for loading part list from the BE

  const onSuccess = useCallback(
    ({ response }) => {
      // get the quoteId from attributes
      setFieldValue('quoteId', response?.id);
      const id = values.quoteId;

      dispatch(fetchServiceTypeList({ quoteId: id }));
    },
    [setFieldValue, dispatch, values]
  );

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
      <Form initialValues={emptyQuotes} action={null} onSuccess={null}>
        <Box sx={{ my: 2 }}>
          <SelectedServices />
          <Divider sx={{ mt: 2 }} />
        </Box>
      </Form>

      <Box sx={{ my: 2 }}>
        <ServiceOptions />
        <Divider sx={{ mt: 2 }} />
      </Box>

      <div>End-user front-end</div>
    </Container>
  );
};

export default EndUserQuotingPage;
