import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditVehicleTypeForm from '../components/EditVehicleTypeForm';
import { addVehicleType } from '../actions';
import paths from '../paths';

const initialValues = {
  make: '',
  model: '',
  modelYear: '',
  engineVariant: '',
  bodyType: '',
};

const validator = validatorFactory({
  make: [stringValidators.required],
  model: [stringValidators.required],
  modelYear: [stringValidators.asNumber(numberValidators.required)],
  engineVariant: [stringValidators.required],
  bodyType: [stringValidators.required],
});

const AddVehicleTypeScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate(paths.vehicleTypeList());
  }, [navigate]);

  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={addVehicleType}
      onSuccess={handleSuccess}
    >
      <EditVehicleTypeForm />
    </Form>
  );
};

export default AddVehicleTypeScreen;
