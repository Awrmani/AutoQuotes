import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditPartForm from '../components/EditPartForm';

const initialValues = {
  name: '',
  price: '',
  amountInStock: '',
  compatibleVehicles: '',
};

const validator = validatorFactory({
  name: [stringValidators.required],
  price: [numberValidators.required],
  amountInStock: [numberValidators.required],
  compatibleVehicles: [stringValidators.required],
});

const EditPartScreen = () => {
  return (
    <Form initialValues={initialValues} validation={validator} action={null}>
      <EditPartForm />
    </Form>
  );
};

export default EditPartScreen;
