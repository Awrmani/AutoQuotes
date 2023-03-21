import React, { useContext, useMemo, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Field } from '@autoquotes/common/src/components/Form';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { useSelector } from 'react-redux';
import formContext from '@autoquotes/common/src/components/Form/formContext';

import { getVehicleTypeOptions } from '../../../reducers/compositeReducers';
import { SELECTOR_WIDTH } from '../../../constants/comDimension';

const optionDefault = { value: '', label: '' };
const VehicleInfo = () => {
  const { values, submitForm } = useContext(formContext);
  const { make, model, modelYear, engineVariant, bodyType } = values;
  const vehicleOptions = useSelector(getVehicleTypeOptions);

  // Makes
  const makeOptions = useMemo(() => {
    return Object.keys(vehicleOptions).map(m => ({
      value: m,
      label: m,
    }));
  }, [vehicleOptions]);

  // Models
  const modelOptions = useMemo(() => {
    if (!vehicleOptions?.[make]) return [optionDefault];

    return Object.keys(vehicleOptions[make]).map(m => ({
      value: m,
      label: m,
    }));
  }, [vehicleOptions, make]);

  // Years
  const yearOptions = useMemo(() => {
    if (!vehicleOptions?.[make]?.[model]) return [optionDefault];

    return Object.keys(vehicleOptions[make][model]).map(m => ({
      value: m.substring(1),
      label: m.substring(1),
    }));
  }, [vehicleOptions, make, model]);

  // Engines
  const engineOptions = useMemo(() => {
    if (!vehicleOptions?.[make]?.[model]?.[`_${modelYear}`])
      return [optionDefault];

    return Object.keys(vehicleOptions[make][model][`_${modelYear}`]).map(m => ({
      value: m,
      label: m,
    }));
  }, [vehicleOptions, make, model, modelYear]);

  // Bodies
  const bodyOptions = useMemo(() => {
    if (!vehicleOptions?.[make]?.[model]?.[`_${modelYear}`]?.[engineVariant])
      return [optionDefault];

    return Object.keys(
      vehicleOptions[make][model][`_${modelYear}`][engineVariant]
    ).map(m => ({
      value: m,
      label: m,
    }));
  }, [vehicleOptions, make, model, modelYear, engineVariant]);

  useEffect(() => {
    if (!make || !model || !modelYear || !engineVariant || !bodyType) return;

    submitForm();
    // All of the below has to be a dependency, if any changes and all are set, we will wnat to re-post
  }, [make, model, modelYear, engineVariant, bodyType, submitForm]);

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Vehicle Specifications
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ minWidth: SELECTOR_WIDTH }}>
          <Field
            component={Dropdown}
            name="make"
            label="Make"
            fullWidth
            options={makeOptions}
          />
        </Box>
        <Box sx={{ minWidth: SELECTOR_WIDTH }}>
          <Field
            component={Dropdown}
            name="model"
            label="Model"
            fullWidth
            options={modelOptions}
          />
        </Box>
        <Box sx={{ minWidth: SELECTOR_WIDTH }}>
          <Field
            component={Dropdown}
            name="modelYear"
            label="Year"
            fullWidth
            options={yearOptions}
          />
        </Box>
        <Box sx={{ minWidth: SELECTOR_WIDTH }}>
          <Field
            component={Dropdown}
            name="engineVariant"
            label="Engine"
            fullWidth
            options={engineOptions}
          />
        </Box>
        <Box sx={{ minWidth: SELECTOR_WIDTH }}>
          <Field
            component={Dropdown}
            name="bodyType"
            label="Body"
            fullWidth
            options={bodyOptions}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default VehicleInfo;
