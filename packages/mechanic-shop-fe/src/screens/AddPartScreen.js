import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditPartForm from '../components/EditPartForm';

const initialValues = {
  name: '',
  price: 0,
  amountInStock: 0,
  compatibleVehicles: '',
};

const validator = validatorFactory({
  name: [stringValidators.required],
  price: [numberValidators.required],
  amountInStock: [numberValidators.required],
  compatibleVehicles: [stringValidators.required],
});

const ItemFormScreen = () => {
  return (
    <Form initialValues={initialValues} validation={validator} action={null}>
      <EditPartForm />
    </Form>
  );
};

export default ItemFormScreen;
