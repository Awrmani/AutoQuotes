import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Field, FieldArray } from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Grid } from '@mui/material';
import { getVehicleTypeList } from '../../reducers/queriesReducer';

const empty = {
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

const CompatibleVehicleFieldArray = () => {
  const vehicleTypeList = useSelector(getVehicleTypeList);

  const makeOptions = useMemo(() => {
    const s = new Set();
    // Deduplicate
    vehicleTypeList?.forEach(({ make }) => {
      s.add(make);
    });

    return Array.from(s);
  }, [vehicleTypeList]);
  const modelOptions = useMemo(() => {
    const s = new Set();
    // Deduplicate
    vehicleTypeList?.forEach(({ model }) => {
      s.add(model);
    });

    return Array.from(s);
  }, [vehicleTypeList]);

  return (
    <FieldArray name="compatibleVehicles" emptyValue={empty}>
      <Grid container>
        <Grid item xs={6}>
          <Field
            required
            component={TextInput}
            name="make"
            label="Make"
            fullWidth
            options={makeOptions}
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            required
            component={TextInput}
            name="model"
            label="Model"
            fullWidth
            options={modelOptions}
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

export default CompatibleVehicleFieldArray;
