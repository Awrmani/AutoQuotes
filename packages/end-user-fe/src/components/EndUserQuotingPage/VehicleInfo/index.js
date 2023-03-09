import React from 'react';

import { Box, Container, Typography } from '@mui/material';
import { Field } from '@autoquotes/common/src/components/Form';
import Dropdown from '@autoquotes/common/src/components/Dropdown';

const specs = [
  {
    name: 'make',
    label: 'Make',
    data: [{ value: 'Tesla', label: 'Tesla' }],
  },
  {
    name: 'model',
    label: 'Model',
    data: [
      { value: 'Roadster', label: 'Roadster' },
      { value: 'Model S', label: 'Model S' },
      { value: 'Model X', label: 'Model X' },
      { value: 'Model 3', label: 'Model 3' },
      { value: 'Model Y', label: 'Model Y' },
    ],
  },
  {
    name: 'year',
    label: 'Year',
    data: [
      { value: '2008', label: '2008' },
      { value: '2012', label: '2012' },
      { value: '2016', label: '2016' },
      { value: '2017', label: '2017' },
      { value: '2020', label: '2020' },
      { value: '2022', label: '2022' },
    ],
  },
  {
    name: 'engine',
    label: 'Engine',
    data: [
      { value: 'standard', label: 'Standard' },
      { value: 'RWD', label: 'RWD' },
      { value: 'AWD', label: 'AWD' },
      { value: 'Performance', label: 'Performance' },
      { value: 'Standard range', label: 'Standard range' },
      { value: 'Long range', label: 'Long range' },
      { value: 'Plaid', label: 'Plaid' },
    ],
  },
  {
    name: 'body',
    label: 'Body',
    data: [
      { value: 'roadster', label: 'Roadster' },
      { value: 'liftback', label: 'Liftback' },
      { value: 'SUV', label: 'SUV' },
      { value: 'Sedan', label: 'Sedan' },
    ],
  },
];

const VehicleInfo = sx => {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Vehicle Specifications
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {specs.map(e => (
          <Box key={e.name} sx={{ minWidth: 120 }}>
            <Field
              component={Dropdown}
              name={e.name}
              label={e.label}
              fullWidth
              options={e.data}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default VehicleInfo;
