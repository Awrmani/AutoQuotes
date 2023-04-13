import React from 'react';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';

import TextInput from '@autoquotes/common/src/components/TextInput';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { Container, Grid } from '@mui/material';

import DateTimePicker from './DateTimePicker';

const typeOptions = [
  {
    label: 'OEM',
    value: 'OEM',
  },
  {
    label: 'OE',
    value: 'OE',
  },
  {
    label: 'Aftermarket',
    value: 'Aftermarket',
  },
];

const PartForm = () => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            component={TextInput}
            name="description"
            label="Description"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextInput}
            name="manufacturer"
            label="Manufacturer"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={Dropdown}
            name="type"
            label="Type"
            fullWidth
            options={typeOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextInput}
            name="warrantyMonths"
            label="Warranty in months"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="price"
            label="Price"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={DateTimePicker}
            name="offerExpiration"
            label="Expiration on"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormError />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 4 }}
            data-testid="submitButton"
          >
            Submit
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PartForm;
