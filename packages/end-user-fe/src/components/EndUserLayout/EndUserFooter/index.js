import { Grid } from '@mui/material';
import React from 'react';
import ContactDetails from './ContactDetails';
import Navigation from './Navigation';
import TermsServices from './TermsServices';
import PoweredBy from './PoweredBy';
import OpeningHours from './OpeningHours';

const EndUserFooter = () => {
  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={3}>
        <ContactDetails />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ borderLeft: 2, borderLeftColor: 'rgba(0, 0, 0, 0.12)' }}
      >
        <Navigation />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ borderLeft: 2, borderLeftColor: 'rgba(0, 0, 0, 0.12)' }}
      >
        <OpeningHours />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ borderLeft: 2, borderLeftColor: 'rgba(0, 0, 0, 0.12)' }}
      >
        <TermsServices />
      </Grid>

      <Grid
        item
        xs={3}
        sx={{ borderLeft: 2, borderLeftColor: 'rgba(0, 0, 0, 0.12)' }}
      >
        <PoweredBy />
      </Grid>
    </Grid>
  );
};

export default EndUserFooter;
