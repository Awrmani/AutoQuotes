import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { Container, Grid, Typography } from '@mui/material';
import CompatibleVehicleFieldArray from '../CompatibleVehicleFieldArray';

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

const EditPartForm = props => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        {props.edit ? 'Update Part' : 'Create Part'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="name"
            label="Item name"
            fullWidth
          />
        </Grid>
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
            component={TextInput}
            name="amountInStock"
            label="Quantity"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Compatible Vehicles
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CompatibleVehicleFieldArray />
        </Grid>
        <Grid item xs={12}>
          <FormError />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={3}>
          <SubmitButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="submitButton"
          >
            {props.edit ? 'Update' : 'Create'}
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

EditPartForm.propTypes = {
  edit: PropTypes.bool,
};

EditPartForm.defaultProps = {
  edit: false,
};

export default EditPartForm;
