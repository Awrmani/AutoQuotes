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
// Users
export const fetchUserDetails = apiCall(() => ({
  url: `/users/current`,
}));

// =====Form submits & other actions altering backend state======

// Users
export const registerUser = apiCall(
  ({
    name,
    password,
    email,
    phone,
    address1,
    address2,
    zip,
    city,
    state,
    country,
  }) => ({
    url: '/users',
    method: 'PUT',
    data: {
      password,
      name,
      email,
      phone,
      billingInformation: {
        name,
        address1,
        address2,
        zip,
        city,
        state,
        country,
      },
    },
  })
);

export const updateUser = apiCall(
  ({
    name,
    password,
    email,
    phone,
    address1,
    address2,
    zip,
    city,
    state,
    country,
  }) => ({
    url: `/users`,
    method: 'PATCH',
    data: {
      name,
      email,
      phone,
      billingInformation: {
        name,
        address1,
        address2,
        zip,
        city,
        state,
        country,
      },
      // Only send pwd change request to BE if pwd field is not empty
      ...(password?.length && { password }),
    },
  })
);
