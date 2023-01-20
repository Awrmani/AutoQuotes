import { getEnv } from '@autoquotes/libraries/src/utils/getEnv';
import fetcherFactory from '@autoquotes/libraries/src/utils/fetcherFactory';

const apiCall = fetcherFactory({
  timeout: 30000,
  baseUrl: getEnv('API_BASE_URL') || 'http://localhost:8080/api/enduser/v1',
});

export const login = apiCall(({ email, password }) => ({
  url: '/login',
  method: 'POST',
  data: {
    email,
    password,
  },
}));
