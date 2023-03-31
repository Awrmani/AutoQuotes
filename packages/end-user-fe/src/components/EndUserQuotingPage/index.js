import React, { useCallback, useContext, useMemo } from 'react';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import formContext from '@autoquotes/common/src/components/Form/formContext';
import { Form, SubmitButton } from '@autoquotes/common/src/components/Form';
import useQuoteUpdater from '../../hooks/useQuoteUpdater';
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

const EndUserQuotingPage = ({ isFinalized }) => {
  const dispatch = useDispatch();

  useQuoteUpdater();
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
      {!isFinalized ? (
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
      ) : (
        <Typography sx={{ paddingTop: 2, textAlign: 'center' }} variant={'h4'}>
          Quote Details
        </Typography>
      )}

      {!!quoteId && (
        <>
          {/* Display line items in a quote */}
          {lineItems && lineItems.length > 0 ? (
            <Box sx={{ my: 2 }}>
              <SelectedServices isFinalized={isFinalized} />
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
EndUserQuotingPage.propTypes = {
  isFinalized: PropTypes.bool,
};
EndUserQuotingPage.defaultProps = {
  isFinalized: false,
};

export default EndUserQuotingPage;
