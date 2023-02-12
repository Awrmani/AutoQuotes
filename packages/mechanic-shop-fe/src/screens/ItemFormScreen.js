import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import ItemForm from '../components/Inventory/ItemForm';

const initialValues = { email: '', password: '' };

const validator = validatorFactory({
  name: [stringValidators.required],
  price: [stringValidators.required],
  amountInStock: [stringValidators.required],
  compatibleVehicles: [stringValidators.required],
});

const ItemFormScreen = () => {
  return (
    <Form initialValues={initialValues} validation={validator} action={null}>
      <ItemForm />
    </Form>
  );
};

export default ItemFormScreen;
