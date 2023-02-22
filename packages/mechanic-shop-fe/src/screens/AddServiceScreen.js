import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory, {
  arrayOfValidator,
  subValidator,
} from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditServiceForm from '../components/EditServiceForm';
import { addService } from '../actions';
import paths from '../paths';

const initialValues = {
  name: '',
  timeInMinutes: '',
  description: '',
  compatibleVehicles: [],
  requiredParts: [],
};

const validator = validatorFactory({
  name: [stringValidators.required],
  timeInMinutes: [stringValidators.asNumber(numberValidators.required)],
  description: [stringValidators.required],
  compatibleVehicles: [
    arrayOfValidator([
      subValidator({
        make: [stringValidators.required],
        model: [stringValidators.required],
        fromYear: [stringValidators.asNumber(numberValidators.required)],
        toYear: [stringValidators.asNumber(numberValidators.required)],
      }),
    ]),
  ],
  requiredParts: [
    arrayOfValidator([
      subValidator({
        name: [stringValidators.required],
      }),
    ]),
  ],
});
const AddServiceScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate(paths.serviceList());
  }, [navigate]);
  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={addService}
      onSuccess={handleSuccess}
    >
      <EditServiceForm />
    </Form>
  );
};

export default AddServiceScreen;
