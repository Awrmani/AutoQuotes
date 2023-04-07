import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import EditSupplierForm from '../components/EditSupplierForm';
import { addSupplier } from '../actions';
import paths from '../paths';

const initialValues = {
  name: '',
  address: '',
  zip: '',
  city: '',
  state: '',
  country: '',
  email: '',
  phone: '',
};

const validator = validatorFactory({
  name: [stringValidators.required],
  address: [stringValidators.required],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
  email: [stringValidators.required],
  phone: [stringValidators.required],
});

const AddSupplierScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate(paths.supplierList());
  }, [navigate]);

  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={addSupplier}
      onSuccess={handleSuccess}
    >
      <EditSupplierForm />
    </Form>
  );
};

export default AddSupplierScreen;
