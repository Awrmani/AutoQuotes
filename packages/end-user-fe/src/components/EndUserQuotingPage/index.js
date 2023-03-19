import React, { useCallback, useContext } from 'react';
import { Box, Container, Divider, Paper } from '@mui/material';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { Form } from '@autoquotes/common/src/components/Form';
import VehicleInfo from './VehicleInfo';
import ServiceOptions from './ServiceOptions';
import SelectedServices from './SelectedServices';
import { createQuote } from '../../actions';

const initialValues = {
  make: '',
  model: '',
  year: '',
  engine: '',
  body: '',
};

const EndUserQuotingPage = () => {
  const { setFieldValue } = useContext(formContext);
  const onSuccess = useCallback(
    (...attributes) => {
      console.log(attributes);
      const quoteId = '';
      // get the quoteId from attributes
      setFieldValue('quoteId', quoteId);
    },
    [setFieldValue]
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
      {/* <Box sx={{ my: 2 }}>
        <SelectedServices />
      </Box> */}

      <Box sx={{ my: 2 }}>
        <ServiceOptions />
        <Divider sx={{ mt: 2 }} />
      </Box>

      <div>End-user front-end</div>
    </Container>
  );
};

export default EndUserQuotingPage;
