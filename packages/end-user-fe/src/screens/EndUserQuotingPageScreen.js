import React from 'react';
import { Form } from '@autoquotes/common/src/components/Form';

import EndUserQuotingPage from '../components/EndUserQuotingPage';

const initialValues = {
  make: '',
  model: '',
  year: '',
  engine: '',
  body: '',
};
const EndUserQuotingPageScreen = () => {
  return (
    <Form
      initialValues={initialValues}
      validation={null}
      action={null}
      onSuccess={null}
    >
      <EndUserQuotingPage />
    </Form>
  );
};

export default EndUserQuotingPageScreen;
