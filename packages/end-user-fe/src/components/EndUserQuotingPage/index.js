import React, { useContext, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { Form, SubmitButton } from '@autoquotes/common/src/components/Form';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import useQuoteUpdater from '../../hooks/useQuoteUpdater';
import { addService } from '../../actions';
import AddServiceForm from './AddServiceForm';
import SelectedServices from './SelectedServices';
import paths from '../../paths';
import AppointmentDetails from './AppointmentDetails';

const EndUserQuotingPage = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const { values } = useContext(formContext);
  const { quoteId, lineItems, isFinalized } = values;
  useQuoteUpdater();

  const initialService = useMemo(() => {
    return {
      quoteId,
      serviceTypeId: '',
    };
  }, [quoteId]);

  const handleLoginClick = useCallback(() => {
    navigate(paths.login(), {
      state: {
        quoteId,
        redirectPath: paths.quotingPage({ quoteId }),
      },
    });
  }, [navigate, quoteId]);

  const handleSignupClick = useCallback(() => {
    navigate(paths.registration(), { state: { quoteId } });
  }, [navigate, quoteId]);

  const onFinalized = () => {
    if (isFinalized) {
      navigate(paths.appointment({ quoteId }));
    }
  };
  return (
    <>
      {values.appointment && <AppointmentDetails />}
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
              <AddServiceForm />
            </Form>
          )}
        </>
      )}
      {lineItems && lineItems.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 2,
          }}
        >
          {!token && (
            <>
              <Typography>In order to continue, you need to</Typography>
              <Button onClick={handleLoginClick}>Log in</Button>
              <Typography>or</Typography>
              <Button
                variant="contained"
                sx={{ mx: 2 }}
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
            </>
          )}
          {!!token && !!values.arePartsMissingWithoutQuotesRequested && (
            <SubmitButton sx={{ m: 2 }} variant="contained" size="large">
              Request offers for missing parts
            </SubmitButton>
          )}

          {!!token &&
            !values.arePartsMissingWithoutQuotesRequested &&
            !!values.arePartsMissing && (
              <Typography>
                Please wait for our suppliers to provide some offers, or remove
                the services with missing parts from your quote
              </Typography>
            )}

          {!!token &&
            !values.arePartsMissing &&
            !values.appointment &&
            !isFinalized && (
              <SubmitButton sx={{ m: 2 }} variant="contained" size="large">
                Confirm & Book Appointment
              </SubmitButton>
            )}
          {isFinalized && !values.appointment && (
            <Button
              sx={{ m: 2 }}
              variant="contained"
              size="large"
              onClick={onFinalized}
            >
              Book Appointment
            </Button>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default EndUserQuotingPage;
