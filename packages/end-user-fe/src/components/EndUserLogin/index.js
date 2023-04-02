import React from 'react';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Link, Box, Typography, Paper } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getShopSettings } from '../../reducers/queriesReducer';
import paths from '../../paths';

const EndUserLogin = () => {
  const navigate = useNavigate();
  const { quoteId } = useLocation()?.state ?? {};
  const shopDetails = useSelector(getShopSettings);
  const { name: shopName, slogan } = shopDetails;

  return (
    <Container component="main" maxWidth="xs">
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

        <Typography component="h1" variant="h5">
          Welcome back!
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Field
            component={TextInput}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Field
            component={TextInput}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormError />
          <SubmitButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </SubmitButton>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              onClick={() => {
                navigate(paths.registration(), {
                  state: {
                    quoteId,
                    redirectPath: paths.quotingPage({ quoteId }),
                  },
                });
              }}
              sx={{
                cursor: 'pointer',
              }}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EndUserLogin;
