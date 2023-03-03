import { AssignmentReturn, Gavel, Shield } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import paths from '../../../../paths';
import { buttonSx } from '../../../../constants/layout';

const TermsServices = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        spacing={1}
        sx={{
          paddingLeft: 2,
          justifyItems: 'left',
        }}
      >
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography
            color="primary.main"
            variant="h6"
            component={'span'}
            sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
          >
            Terms and Services
          </Typography>
        </Box>

        <IconButton
          onClick={() => navigate(paths.quotingPage())}
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <Shield sx={{ mr: 1 }} />
          <Typography color="inherit" sx={buttonSx} fontSize="medium">
            Privacy Policy
          </Typography>
        </IconButton>

        <IconButton
          onClick={() => navigate(paths.quotingPage())}
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <AssignmentReturn sx={{ mr: 1 }} />
          <Typography color="inherit" sx={buttonSx} fontSize="medium">
            Return Policy
          </Typography>
        </IconButton>

        <IconButton
          onClick={() => navigate(paths.quotingPage())}
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <Gavel sx={{ mr: 1 }} />
          <Typography color="inherit" sx={buttonSx} fontSize="medium">
            Terms and Conditions
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default TermsServices;
