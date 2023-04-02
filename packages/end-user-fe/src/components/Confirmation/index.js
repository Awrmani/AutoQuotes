import React from 'react';
import { CheckCircle } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';

const Confirmation = () => {
  return (
    <Container
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
        width: '40%',
        height: '50vh',
      }}
      component={Paper}
    >
      <CheckCircle sx={{ fontSize: 100, color: green[800] }}></CheckCircle>

      <Box sx={{ display: 'flex', color: grey[900], justifyContent: 'center' }}>
        <CircularProgress sx={{ mr: 1, color: grey[900] }} size={20} />
        <Typography> Verifying your email</Typography>
      </Box>
    </Container>
  );
};

export default Confirmation;
