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

export const fetchVehicleTypeList = apiCall(() => ({
  url: '/vehicleTypes',
}));

export const fetchServiceTypeList = apiCall(({ quoteId }) => ({
  url: `/quotes/${quoteId}/services`,
  method: 'GET',
}));

export const fetchQuoteList = apiCall(() => ({
  url: `/quotes`,
  method: 'GET',
}));

export const fetchQuoteDetails = apiCall(({ quoteId }) => ({
  url: `/quotes/${quoteId}`,
  method: 'GET',
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
    quoteId,
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
      quoteId,
    },
  })
);

export const confirmUser = apiCall(({ userId, key }) => ({
  url: `/users/${userId}/confirm`,
  method: 'POST',
  data: { verificationCode: key },
}));

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

export const createQuote = apiCall(
  ({ make, model, modelYear, engineVariant, bodyType }) => ({
    url: `/quotes`,
    method: 'PUT',
    data: {
      make,
      model,
      modelYear: Number(modelYear),
      engineVariant,
      bodyType,
    },
  })
);

export const updateQuote = apiCall(({ quoteId, lineItems }) => ({
  url: `/quotes/${quoteId}`,
  method: 'PATCH',
  data: { lineItems },
}));

export const finalizeQuote = apiCall(({ quoteId, lineItems }) => ({
  url: `/quotes/${quoteId}/finalize`,
  method: 'POST',
  data: { lineItems },
}));

export const addService = apiCall(({ quoteId, serviceTypeId }) => ({
  url: `/quotes/${quoteId}/services`,
  method: 'PUT',
  data: { serviceTypeId },
}));

export const removeService = apiCall(({ quoteId, serviceTypeId }) => ({
  url: `/quotes/${quoteId}/services/${serviceTypeId}`,
  method: 'DELETE',
}));

export const requestOffers = apiCall(({ quoteId }) => ({
  url: `/quotes/${quoteId}/requestOffers`,
  method: 'POST',
  data: {},
}));
