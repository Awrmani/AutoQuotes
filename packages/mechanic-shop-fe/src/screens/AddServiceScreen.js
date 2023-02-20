import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import EditServiceForm from '../components/EditServiceForm';
import { addService } from '../actions';

const initialValues = {
  name: '',
  timeInMinutes: '',
  description: '',
};

const validator = validatorFactory({
  name: [stringValidators.required],
  timeInMinutes: [stringValidators.asNumber(numberValidators.required)],
  description: [stringValidators.required],
});
const AddServiceScreen = () => {
  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={addService}
    >
      <EditServiceForm />
    </Form>
  );
};

export default AddServiceScreen;
