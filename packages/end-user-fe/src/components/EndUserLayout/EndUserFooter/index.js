import { Grid } from '@mui/material';
import React from 'react';
import { grey } from '@mui/material/colors';
import ContactDetails from './ContactDetails';
import Navigation from './Navigation';
import TermsServices from './TermsServices';
import PoweredBy from './PoweredBy';
import OpeningHours from './OpeningHours';

const EndUserFooter = () => {
  const GridItemSx = { borderLeft: 2, borderLeftColor: grey[200] };

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={3}>
        <ContactDetails />
      </Grid>
      <Grid item xs={2} sx={GridItemSx}>
        <Navigation />
      </Grid>
      <Grid item xs={2} sx={GridItemSx}>
        <OpeningHours />
      </Grid>
      <Grid item xs={2} sx={GridItemSx}>
        <TermsServices />
      </Grid>

      <Grid item xs={3} sx={GridItemSx}>
        <PoweredBy />
      </Grid>
    </Grid>
  );
};

export default EndUserFooter;
