import React from 'react';
import { Field, FieldArray } from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Grid } from '@mui/material';

const empty = {
  name: '',
};

/**
 * Form section responsible for rendering the
 * required parts cards
 *
 * Everything in the FieldArray component
 * is wrapped in a card with the appropriate controls
 * then repeated for each item in the array
 */

const RequiredPartFieldArray = () => {
  return (
    <FieldArray name="requiredParts" emptyValue={empty}>
      <Grid container>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="name"
            label="Part name"
            fullWidth
          />
        </Grid>
      </Grid>
    </FieldArray>
  );
};

export default RequiredPartFieldArray;
