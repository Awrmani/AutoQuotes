import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditPartForm from '../components/EditPartForm';
import { addPart } from '../actions';

const initialValues = {
  name: '',
  price: '',
  amountInStock: '',
  compatibleVehicles: '', // This will have to be an array of strings
};

const validator = validatorFactory({
  name: [stringValidators.required],
  price: [numberValidators.required],
  amountInStock: [numberValidators.required],
  compatibleVehicles: [stringValidators.required],
});

const AddPartScreen = () => {
  return (
    <Form initialValues={initialValues} validation={validator} action={addPart}>
      <EditPartForm />
    </Form>
  );
};

export default AddPartScreen;
