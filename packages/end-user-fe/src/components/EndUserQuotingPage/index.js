import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Divider, Paper } from '@mui/material';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { Form, SubmitButton } from '@autoquotes/common/src/components/Form';
import useQuoteUpdater from '../../hooks/useQuoteUpdater';
import { addService, createQuote } from '../../actions';
import VehicleInfo from './VehicleInfo';
import AddServiceForm from './AddServiceForm';
import SelectedServices from './SelectedServices';
import paths from '../../paths';

const EndUserQuotingPage = () => {
  const navigate = useNavigate();
  const { values } = useContext(formContext);
  const { quoteId, lineItems, isFinalized } = values;

  // If we are reloading the quote, load the vehicle type as well
  // This way the outputs will be filled
  // Dropdown uses a string representation of numbers
  const vehicleTypeFormInitialValues = useMemo(
    () => ({
      isFinalized,
      make: values?.vehicleType?.make ?? '',
      model: values?.vehicleType?.model ?? '',
      modelYear: String(values?.vehicleType?.modelYear ?? ''),
      engineVariant: values?.vehicleType?.engineVariant ?? '',
      bodyType: values?.vehicleType?.bodyType ?? '',
    }),
    [values.vehicleType, isFinalized]
  );

  useQuoteUpdater();
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
      navigate(paths.quotingPage({ quoteId: response?.id }));
    },
    [navigate]
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
        <Box sx={{ my: 2 }}>
          <VehicleInfo />
          <Divider sx={{ mt: 2 }} />
        </Box>
      </Form>

      {!!quoteId && (
        <>
          {/* Display line items in a quote */}
          {lineItems && lineItems.length > 0 ? (
            <Box sx={{ my: 2 }}>
              <SelectedServices />
            </Box>
          ) : null}

          {/* Add new line item to quote form */}
          {!isFinalized && (
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
          )}
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
