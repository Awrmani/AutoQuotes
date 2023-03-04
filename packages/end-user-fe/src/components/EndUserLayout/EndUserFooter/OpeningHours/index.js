import { DateRange, Weekend } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import FooterTitleBox from '../FooterTitleBox';

import { getShopSettings } from '../../../../reducers/queriesReducer';

const OpeningHours = () => {
  const shopDetails = useSelector(getShopSettings);

  const { openingHours } = shopDetails;

  const weekdays = useMemo(() => {
    return ` from ${openingHours.monday.openHour}.${
      openingHours.monday.openMinute === 0
        ? '00'
        : `${openingHours.monday.openMinute}`
    } to ${openingHours.monday.closeHour}.${
      openingHours.monday.openMinute === 0
        ? '00'
        : `${openingHours.monday.closeMinute}`
    } `;
  }, [openingHours]);

  const weekends = useMemo(() => {
    if ('saturday' in openingHours) {
      return ` from ${openingHours.saturday.openHour}.${
        openingHours.saturday.openMinute === 0
          ? '00'
          : `${openingHours.saturday.openMinute}`
      } to ${openingHours.saturday.closeHour}.${
        openingHours.saturday.openMinute === 0
          ? '00'
          : `${openingHours.saturday.closeMinute}`
      } `;
    }
    return 'closed';
  }, [openingHours]);

  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        spacing={0}
        sx={{
          padding: 1,
          justifyItems: 'left',
        }}
      >
        <FooterTitleBox title={'Opening Hours'} />
        <IconButton
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <DateRange sx={{ mr: 1 }} />
          <Typography noWrap color="inherit" fontSize="small">
            Weekdays: {weekdays}
          </Typography>
        </IconButton>
        <IconButton
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <Weekend sx={{ mr: 1 }} />
          <Typography noWrap color="inherit" fontSize="small">
            Weekends: {weekends}
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default OpeningHours;
