import fetcherFactory from '@autoquotes/libraries/src/utils/fetcherFactory';

const apiCall = fetcherFactory({
  timeout: 30000,
  // On production, the same domain and port serves cdn and api, so no need to specify them
  baseUrl: `${
    process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : ''
  }/api/enduser/v1`,
});

export const login = apiCall(({ email, password }) => ({
  url: '/login',
  method: 'POST',
  data: {
    email,
    password,
  },
}));

// =================== Data fetching ============================
export const fetchCurrentUser = apiCall(() => ({
  url: '/users/current',
}));

// Shop settings
export const fetchShopSettings = apiCall(() => ({
  url: '/shop',
}));
