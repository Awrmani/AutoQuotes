import React, { useContext, useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import { Delete, AddCircleOutline } from '@mui/icons-material';
import formContext, { FormProvider } from './formContext';

/**
 * Field Array component. Gets a field from the form, that
 * has to be an array, and iterates over it, tieing the child
 * components to the appropriate obect to the list
 *
 * ==== Implementation ====
 * In react, there can be multiple in the same context
 * nested in one another. In this case the context consumer
 * (I.e., useContext) will connect to the closest up in the
 * react dom.
 *
 * We are using this fact to "fake" a list of "sub forms".
 * The Field components will connect to the FormProvider that
 * we are embedding here. In return this component will
 * implement the same interface Form does, only, it will update
 * the appropriate element in the array.
 *
 * The implementation is split to two separate components, becase
 * of better memoization possibilities (reduce unneccessary re-renders)
 * that could also move the cursor of controlled inputs
 */

const FieldArrayLine = ({
  children,
  index,
  values,
  setFieldArrayItemValue,
  setFieldArrayTouched,
  isSubmitting,
}) => {
  // Moving value to a ref, so onChange hook does not need it as a dependency
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const setFieldValue = useCallback(
    (name, value) => {
      // Value is the item in the fieldArray
      setFieldArrayItemValue(index, { ...valuesRef.current, [name]: value });
    },
    [index, setFieldArrayItemValue]
  );

  const bag = useMemo(
    () => ({
      values,
      errors: {},
      isSubmitting,
      setFieldTouched: setFieldArrayTouched,
      setFieldValue,
      touched: {},
    }),
    [values, isSubmitting, setFieldArrayTouched, setFieldValue]
  );

  return <FormProvider value={bag}>{children}</FormProvider>;
};

FieldArrayLine.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  values: PropTypes.shape({}).isRequired,
  setFieldArrayItemValue: PropTypes.func.isRequired,
  setFieldArrayTouched: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const FieldArray = ({ children, name, emptyValue }) => {
  const {
    values,
    errors,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    touched,
  } = useContext(formContext);

  // Moving value to a ref, so onChange hook does not need it as a dependency
  const lineValuesRef = useRef(values[name]);
  lineValuesRef.current = values[name];

  const setFieldArrayItemValue = useCallback(
    (index, newLineValue) => {
      // Create a new array with the indexth element replaced with newValue
      const mutatableArr = [...lineValuesRef.current];
      mutatableArr.splice(index, 1, newLineValue);
      setFieldValue(name, mutatableArr);
    },
    [setFieldValue, name]
  );

  const setFieldArrayTouched = useCallback(() => {
    setFieldTouched(name);
  }, [setFieldTouched, name]);

  const removeLine = useCallback(
    index => {
      // Create a new array with the indexth element dropped
      const mutatableArr = [...lineValuesRef.current];
      mutatableArr.splice(index, 1);
      setFieldValue(name, mutatableArr);
    },
    [setFieldValue, name]
  );

  const addLine = useCallback(() => {
    // Create a new array with the indexth element dropped
    const newArr = [...lineValuesRef.current, emptyValue];
    setFieldValue(name, newArr);
  }, [setFieldValue, emptyValue, name]);

  return (
    <div data-testid={`fieldArray-${name}`}>
      {values[name].map((value, index) => (
        <Card
          elevation={4}
          sx={{ marginBottom: 2 }}
          key={index}
          data-testid={`fieldArray-${name}[${index}]`}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <FieldArrayLine
                  index={index}
                  values={value}
                  setFieldArrayItemValue={setFieldArrayItemValue}
                  setFieldArrayTouched={setFieldArrayTouched}
                  isSubmitting={isSubmitting}
                >
                  {children}
                </FieldArrayLine>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  color="warning"
                  onClick={() => removeLine(index)}
                  data-testid="fieldArray-deleteItem"
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={11} />
        <Grid item xs={1}>
          <IconButton
            color="success"
            onClick={addLine}
            data-testid="fieldArray-addItem"
          >
            <AddCircleOutline fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      {/* Display errors on touched inputs only */}
      {!!touched[name] && errors[name] && (
        <Typography variant="danger" component="div">
          {errors[name]}
        </Typography>
      )}
    </div>
  );
};

FieldArray.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  emptyValue: PropTypes.shape({}).isRequired,
};

export default FieldArray;
