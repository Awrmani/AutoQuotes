import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory, {
  arrayOfValidator,
  subValidator,
} from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditPartForm from '../components/EditPartForm';
import { addPart } from '../actions';
import paths from '../paths';

const initialValues = {
  name: '',
  description: '',
  manufacturer: '',
  type: 'OEM',
  warrantyMonths: '12',
  price: '',
  amountInStock: '',
  compatibleVehicles: [],
};

const validator = validatorFactory({
  name: [stringValidators.required],
  description: [stringValidators.isStringOrUndefined],
  manufacturer: [stringValidators.isStringOrUndefined],
  type: [
    stringValidators.required,
    stringValidators.oneOf(['OEM', 'OE', 'Aftermarket']),
  ],
  warrantyMonths: [stringValidators.asNumber(numberValidators.required)],
  price: [stringValidators.asNumber(numberValidators.required)],
  amountInStock: [stringValidators.asNumber(numberValidators.required)],
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
});

const AddPartScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate(paths.partList());
  }, [navigate]);

  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={addPart}
      onSuccess={handleSuccess}
    >
      <EditPartForm />
    </Form>
  );
};

export default AddPartScreen;
