import fetcherFactory from '@autoquotes/libraries/src/utils/fetcherFactory';

const apiCall = fetcherFactory({
  timeout: 30000,
  // On production, the same domain and port serves cdn and api, so no need to specify them
  baseUrl: `${
    process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : ''
  }/api/shop/v1`,
});

// Data fetching
export const fetchCurrentUser = apiCall(() => ({
  url: '/users/current',
}));
export const fetchPartList = apiCall(() => ({
  url: '/parts',
}));
export const fetchPartDetails = apiCall(({ id }) => ({
  url: `/parts/${id}`,
}));

export const fetchUserList = apiCall(() => ({
  url: '/users',
}));
export const fetchUserDetails = apiCall(({ id }) => ({
  url: `/users/${id}`,
}));

// Form submits & other actions altering backend state
export const login = apiCall(({ email, password }) => ({
  url: '/login',
  method: 'POST',
  data: {
    email,
    password,
  },
}));

// Part
export const addPart = apiCall(
  ({ name, price, amountInStock, compatibleVehicles }) => ({
    url: '/parts',
    method: 'PUT',
    data: { name, price, amountInStock, compatibleVehicles },
  })
);
export const updatePart = apiCall(
  ({ id, name, price, amountInStock, compatibleVehicles }) => ({
    url: `/parts/${id}`,
    method: 'PATCH',
    data: { name, price, amountInStock, compatibleVehicles },
  })
);
export const deletePart = apiCall(({ id }) => ({
  url: `/parts/${id}`,
  method: 'DELETE',
}));

// User CRUD
export const addUser = apiCall(({ name, email, phone, role }) => ({
  url: '/users',
  method: 'PUT',
  data: { name, email, phone, role },
}));
export const updateUser = apiCall(({ id, name, email, phone, role }) => ({
  url: `/users/${id}`,
  method: 'PATCH',
  data: { name, email, phone, role },
}));
export const deleteUser = apiCall(({ id }) => ({
  url: `/users/${id}`,
  method: 'DELETE',
}));
