import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import EditUserForm from '../components/EditUserForm';
import { addUser } from '../actions';
import paths from '../paths';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'employee',
};

const validator = validatorFactory({
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  password: [stringValidators.required],
  role: [
    stringValidators.required,
    stringValidators.oneOf(['admin', 'employee']),
  ],
});

const AddUserScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate(paths.userList());
  }, [navigate]);

  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={addUser}
      onSuccess={handleSuccess}
    >
      <EditUserForm />
    </Form>
  );
};

export default AddUserScreen;
