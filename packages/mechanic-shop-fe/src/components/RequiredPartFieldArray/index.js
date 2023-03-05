import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Field, FieldArray } from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Grid } from '@mui/material';
import { getPartList } from '../../reducers/queriesReducer';

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
  const partList = useSelector(getPartList);

  const partOptions = useMemo(() => {
    const s = new Set();
    // Deduplicate
    partList?.forEach(({ name }) => {
      s.add(name);
    });

    return Array.from(s);
  }, [partList]);

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
            options={partOptions}
          />
        </Grid>
      </Grid>
    </FieldArray>
  );
};

export default RequiredPartFieldArray;
