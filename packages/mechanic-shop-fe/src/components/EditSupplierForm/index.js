import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Container, Grid, Typography } from '@mui/material';

const EditSupplierForm = props => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        {props.edit ? 'Update Supplier' : 'Add Supplier'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="name"
            label="Name of the supplier"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="email"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="phone"
            label="Phone"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="address"
            label="Address line"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="zip"
            label="Postal code"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="city"
            label="City"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="state"
            label="State"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="country"
            label="Country"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormError />
        </Grid>
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

EditSupplierForm.propTypes = {
  edit: PropTypes.bool,
};

EditSupplierForm.defaultProps = {
  edit: false,
};

export default EditSupplierForm;
