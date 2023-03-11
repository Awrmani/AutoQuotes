import React, { useContext, useMemo } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Field } from '@autoquotes/common/src/components/Form';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { useSelector } from 'react-redux';
import formContext from '@autoquotes/common/src/components/Form/formContext';

import { getVehicleTypeOptions } from '../../../reducers/compositeReducers';

const VehicleInfo = () => {
  const { values } = useContext(formContext);
  const { make, model, year, engine } = values;
  const vehicleOptions = useSelector(getVehicleTypeOptions);

  // Makes
  const makeOptions = useMemo(
    () => Object.keys(vehicleOptions).map(m => ({ value: m, label: m })),
    [vehicleOptions]
  );

  // Models
  const modelOptions = useMemo(() => {
    if (!vehicleOptions?.[make]) return [{ value: '', label: '' }];
    return Object.keys(vehicleOptions[make]).map(m => ({
      value: m,
      label: m,
    }));
  }, [vehicleOptions, make]);

  // Years
  const yearOptions = useMemo(() => {
    if (!vehicleOptions?.[make]?.[model]) return [{ value: '', label: '' }];
    return Object.keys(vehicleOptions[make][model]).map(m => ({
      value: m.substring(1),
      label: m.substring(1),
    }));
  }, [vehicleOptions, make, model]);

  // Engines
  const engineOptions = useMemo(() => {
    if (!vehicleOptions?.[make]?.[model]?.[`_${year}`])
      return [{ value: '', label: '' }];

    return Object.keys(vehicleOptions[make][model][`_${year}`]).map(m => ({
      value: m,
      label: m,
    }));
  }, [vehicleOptions, make, model, year]);

  const bodyOptions = useMemo(() => {
    if (!vehicleOptions?.[make]?.[model]?.[`_${year}`]?.[engine])
      return [{ value: '', label: '' }];
    return Object.keys(vehicleOptions[make][model][`_${year}`][engine]).map(
      m => ({
        value: m,
        label: m,
      })
    );
  }, [vehicleOptions, make, model, year, engine]);

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Vehicle Specifications
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ minWidth: 120 }}>
          <Field
            component={Dropdown}
            name="make"
            label="Make"
            fullWidth
            options={makeOptions}
          />
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <Field
            component={Dropdown}
            name="model"
            label="Model"
            fullWidth
            options={modelOptions}
          />
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <Field
            component={Dropdown}
            name="year"
            label="Year"
            fullWidth
            options={yearOptions}
          />
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <Field
            component={Dropdown}
            name="engine"
            label="Engine"
            fullWidth
            options={engineOptions}
          />
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <Field
            component={Dropdown}
            name="body"
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
