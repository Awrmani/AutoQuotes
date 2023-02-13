import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import ItemForm from '../components/Inventory/ItemForm';

const initialValues = { email: '', password: '' };

const validator = validatorFactory({
  name: [stringValidators.required],
  price: [numberValidators.required],
  amountInStock: [numberValidators.required],
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
