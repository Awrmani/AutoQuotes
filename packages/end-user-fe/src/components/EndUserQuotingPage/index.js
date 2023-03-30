import React, { useCallback, useContext, useMemo } from 'react';
import { Box, Container, Divider, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { Form, SubmitButton } from '@autoquotes/common/src/components/Form';
import useQuoteUpdter from '../../hooks/useQuoteUpdater';
import { addService, createQuote, fetchServiceTypeList } from '../../actions';
import VehicleInfo from './VehicleInfo';
import AddServiceForm from './AddServiceForm';
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
  useQuoteUpdter();

  const { setFieldValue, values } = useContext(formContext);
  const { quoteId, lineItems } = values;
  const initialService = useMemo(() => {
    return {
      quoteId,
      serviceTypeId: '',
    };
  }, [quoteId]);
  // Hook responsible for loading part list from the BE

  const onQuoteCreateSuccess = useCallback(
    ({ response }) => {
      // get the quoteId from attributes
      setFieldValue('quoteId', response?.id);
      dispatch(fetchServiceTypeList({ quoteId: response?.id }));
    },
    [setFieldValue, dispatch]
  );

  return (
    <Container component={Paper}>
      {/* Vehicle type form */}
      <Form
        initialValues={initialValues}
        action={createQuote}
        onSuccess={onQuoteCreateSuccess}
      >
        <Box sx={{ my: 2 }}>
          <VehicleInfo />
          <Divider sx={{ mt: 2 }} />
        </Box>
      </Form>

      {!!quoteId && (
        <>
          {lineItems && lineItems.length > 0 ? (
            <Box sx={{ my: 2 }}>
              <SelectedServices />
            </Box>
          ) : null}

          {/* Add new line item to quote form */}
          <Form
            enableReinitialize
            initialValues={initialService}
            action={addService}
          >
            <Box sx={{ my: 2 }}>
              <AddServiceForm />
              <Divider sx={{ mt: 2 }} />
            </Box>
          </Form>
        </>
      )}
      {lineItems && lineItems.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <SubmitButton sx={{ m: 2 }} variant="contained" size="large">
            Book Appointment
          </SubmitButton>
        </Box>
      ) : null}
    </Container>
  );
};

export default EndUserQuotingPage;
