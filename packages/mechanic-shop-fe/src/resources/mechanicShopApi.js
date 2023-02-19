import fetcherFactory from '@autoquotes/libraries/src/utils/fetcherFactory';

const apiCall = fetcherFactory({
  timeout: 30000,
  // On production, the same domain and port serves cdn and api, so no need to specify them
  baseUrl: `${
    process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : ''
  }/api/shop/v1`,
});

// ===================Data fetching============================
export const fetchCurrentUser = apiCall(() => ({
  url: '/users/current',
}));

// Parts
export const fetchPartList = apiCall(() => ({
  url: '/parts',
}));
export const fetchPartDetails = apiCall(({ id }) => ({
  url: `/parts/${id}`,
}));
// Services
export const fetchServiceList = apiCall(() => ({
  url: '/services',
}));
export const fetchServiceDetails = apiCall(({ id }) => ({
  url: `/services/${id}`,
}));

// =====Form submits & other actions altering backend state======
export const login = apiCall(({ email, password }) => ({
  url: '/login',
  method: 'POST',
  data: {
    email,
    password,
  },
}));

// Parts
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

// Services
export const addService = apiCall(({ name, time, description }) => ({
  url: '/services',
  method: 'PUT',
  data: { name, time, description },
}));
export const updateService = apiCall(({ id, name, time, description }) => ({
  url: `/services/${id}`,
  method: 'PATCH',
  data: { name, time, description },
}));
export const deleteService = apiCall(({ id }) => ({
  url: `/services/${id}`,
  method: 'DELETE',
}));
