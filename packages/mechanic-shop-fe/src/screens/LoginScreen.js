import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory, {
  stringValidators,
} from '@autoquotes/common/src/utils/validation';
import LoginForm from '../components/LoginForm';
import { login } from '../actions';

const initialValues = { email: '', password: '' };

const validator = validatorFactory({
  email: [stringValidators.required, stringValidators.email],
  password: [stringValidators.required],
});

const LoginScreen = () => {
  return (
    <Form initialValues={initialValues} validation={validator} action={login}>
      <LoginForm />
    </Form>
  );
};

export default LoginScreen;
