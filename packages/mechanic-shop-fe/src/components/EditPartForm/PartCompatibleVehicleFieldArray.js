import React from 'react';
import { Field, FieldArray } from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Grid } from '@mui/material';

const emptyCompatibleVehicle = {
  make: '',
  model: '',
  fromYear: '',
  toYear: '',
};

/**
 * Form section responsible for rendering the
 * compatible vehicles cards
 *
 * Everything in the FieldArray component
 * is wrapped in a card with the appropriate controls
 * then repeated for each item in the array
 */

const PartCompatibleVehicleFieldArray = () => {
  return (
    <FieldArray name="compatibleVehicles" emptyValue={emptyCompatibleVehicle}>
      <Grid container>
        <Grid item xs={6}>
          <Field
            required
            component={TextInput}
            name="make"
            label="Make"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            required
            component={TextInput}
            name="model"
            label="Model"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            required
            component={TextInput}
            name="fromYear"
            label="From year"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            required
            component={TextInput}
            name="toYear"
            label="To year"
            fullWidth
          />
        </Grid>
      </Grid>
    </FieldArray>
  );
};

export default PartCompatibleVehicleFieldArray;
