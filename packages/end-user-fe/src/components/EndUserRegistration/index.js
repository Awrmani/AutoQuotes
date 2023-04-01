import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import { useNavigate } from 'react-router-dom';
import TextInput from '@autoquotes/common/src/components/TextInput';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { getShopSettings } from '../../reducers/queriesReducer';
import paths from '../../paths';

const EndUserRegistration = props => {
  const navigate = useNavigate();
  const shopDetails = useSelector(getShopSettings);
  const { name: shopName, slogan } = shopDetails;
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: grey[50],
        }}
      >
        {props.edit ? (
          <Typography component="h1" variant="h4">
            Profile
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h3" color={'primary.main'}>
              {shopName}
            </Typography>
            <Typography
              component="h1"
              variant="subtitle2"
              sx={{ mb: 3, fontWeight: 320, fontStyle: 'italic' }}
            >
              {slogan}
            </Typography>
            <Typography component="h1" variant="h4">
              Registration
            </Typography>
          </Box>
        )}

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="body2"
              color="primary.dark"
              sx={{ width: '100%', textAlign: 'right', mt: 1 }}
            >
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Field
              required
              component={TextInput}
              name="name"
              label="Full Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              required
              component={TextInput}
              name="email"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              required
              component={TextInput}
              name="phone"
              label="Phone Number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              type="password"
              required={!props.edit}
              component={TextInput}
              name="password"
              label="Password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              type="password"
              required={!props.edit}
              component={TextInput}
              name="passwordConfirm"
              label="Confirm Password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ my: 1 }}>
            <Typography
              component="h1"
              variant="body2"
              color="primary.dark"
              sx={{ width: '100%', textAlign: 'right', mt: 1 }}
            >
              Billing Information
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Field
              required
              component={TextInput}
              name="address1"
              label="Address line 1"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextInput}
              name="address2"
              label="Address line 2"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              required
              component={TextInput}
              name="zip"
              label="Postal code"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              required
              component={TextInput}
              name="city"
              label="City"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              required
              component={TextInput}
              name="state"
              label="State"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              required
              component={TextInput}
              name="country"
              label="Country"
              fullWidth
            />
          </Grid>
          <FormError />
          <Grid item xs={12} sm={6}>
            <Button
              color="error"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 1 }}
              onClick={() => navigate(paths.quotingPage({}))}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SubmitButton
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 1 }}
              data-testid="submitButton"
            >
              {props.edit ? 'Update' : 'Register'}
            </SubmitButton>
          </Grid>

          {props.edit ? null : (
            <Grid item xs={12}>
              <Link
                onClick={() => {
                  navigate(paths.login());
                }}
                sx={{
                  cursor: 'pointer',
                }}
                variant="body2"
              >
                {'I have an account? Sign in'}
              </Link>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

EndUserRegistration.propTypes = {
  edit: PropTypes.bool,
};

EndUserRegistration.defaultProps = {
  edit: false,
};

export default EndUserRegistration;
