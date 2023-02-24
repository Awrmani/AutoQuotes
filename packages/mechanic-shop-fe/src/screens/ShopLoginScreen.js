import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import LoginForm from '../components/LoginForm';
import { login } from '../actions';

const initialValues = { email: '', password: '' };

const validator = validatorFactory({
  email: [stringValidators.required, stringValidators.email],
  password: [stringValidators.required],
});

const ShopLoginScreen = () => {
  return (
    <Form initialValues={initialValues} validation={validator} action={login}>
      <LoginForm />
    </Form>
  );
};

export default ShopLoginScreen;
