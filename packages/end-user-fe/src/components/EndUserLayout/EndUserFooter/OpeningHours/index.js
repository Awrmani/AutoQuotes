import React from 'react';
import { useSelector } from 'react-redux';
import { DateRange } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { getHumanReadableOpeningHours } from '../../../../reducers/compositeReducers';
import FooterTitleBox from '../FooterTitleBox';

const OpeningHours = () => {
  const openingHours = useSelector(getHumanReadableOpeningHours);

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

          {openingHours.map(group => (
            <Box sx={{ flex: '1' }} align="left">
              <Typography
                noWrap
                color="inherit"
                fontSize="small"
                component="span"
                sx={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  minWidth: 70,
                }}
              >
                {group.daysHuman}:
              </Typography>

              <Typography
                noWrap
                color="inherit"
                fontSize="small"
                component="span"
                sx={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                {group.timeRangeHuman}
              </Typography>
            </Box>
          ))}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default OpeningHours;
