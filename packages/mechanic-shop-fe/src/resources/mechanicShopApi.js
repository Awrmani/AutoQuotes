import fetcherFactory from '@autoquotes/libraries/src/utils/fetcherFactory';

const apiCall = fetcherFactory({
  timeout: 30000,
  // On production, the same domain and port serves cdn and api, so no need to specify them
  baseUrl: `${
    process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : ''
  }/api/shop/v1`,
});

// ====================== Helpers ===============================
const processCompatibleVehicles = compatibleVehicles =>
  compatibleVehicles.map(({ fromYear, toYear, ...rest }) => ({
    ...rest,
    fromYear: Number(fromYear),
    toYear: Number(toYear),
  }));

// =================== Data fetching ============================
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

// Users
export const fetchUserList = apiCall(() => ({
  url: '/users',
}));
export const fetchUserDetails = apiCall(({ id }) => ({
  url: `/users/${id}`,
}));

// Services
export const fetchServiceList = apiCall(() => ({
  url: '/services',
}));
export const fetchServiceDetails = apiCall(({ id }) => ({
  url: `/services/${id}`,
}));

// Shop settings
export const fetchShopSettings = apiCall(() => ({
  url: '/shop',
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
  ({
    name,
    description,
    manufacturer,
    type,
    warrantyMonths,
    price,
    amountInStock,
    compatibleVehicles,
  }) => ({
    url: '/parts',
    method: 'PUT',
    data: {
      name,
      description,
      manufacturer,
      type,
      warrantyMonths: Number(warrantyMonths),
      price: Number(price),
      amountInStock: Number(amountInStock),
      compatibleVehicles: processCompatibleVehicles(compatibleVehicles),
    },
  })
);
export const updatePart = apiCall(
  ({
    id,
    name,
    description,
    manufacturer,
    type,
    warrantyMonths,
    price,
    amountInStock,
    compatibleVehicles,
  }) => ({
    url: `/parts/${id}`,
    method: 'PATCH',
    data: {
      name,
      description,
      manufacturer,
      type,
      warrantyMonths: Number(warrantyMonths),
      price: Number(price),
      amountInStock: Number(amountInStock),
      compatibleVehicles: processCompatibleVehicles(compatibleVehicles),
    },
  })
);
export const deletePart = apiCall(({ id }) => ({
  url: `/parts/${id}`,
  method: 'DELETE',
}));

// Users
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

// Services
export const addService = apiCall(
  ({
    name,
    timeInMinutes,
    description,
    compatibleVehicles,
    requiredParts,
  }) => ({
    url: '/services',
    method: 'PUT',
    data: {
      name,
      timeInMinutes: Number(timeInMinutes),
      description,
      compatibleVehicles: processCompatibleVehicles(compatibleVehicles),
      requiredParts,
    },
  })
);
export const updateService = apiCall(
  ({
    id,
    name,
    timeInMinutes,
    description,
    compatibleVehicles,
    requiredParts,
  }) => ({
    url: `/services/${id}`,
    method: 'PATCH',
    data: {
      name,
      timeInMinutes: Number(timeInMinutes),
      description,
      compatibleVehicles: processCompatibleVehicles(compatibleVehicles),
      requiredParts,
    },
  })
);
export const deleteService = apiCall(({ id }) => ({
  url: `/services/${id}`,
  method: 'DELETE',
}));

export const updateShopSettings = apiCall(
  ({
    name,
    logo,
    slogan,
    email,
    phone,
    openingHours,
    numberOfStalls,
    returnPolicyUrl,
    termsAndConditionsUrl,
    privacyPolicyUrl,
    address1,
    address2,
    zip,
    city,
    state,
    country,
    ...rest
  }) => ({
    url: '/shop',
    method: 'PATCH',
    data: {
      name,
      ...(logo.isNew && { logo: logo.uri }),
      slogan,
      email,
      phone,
      openingHours: Object.keys(openingHours).reduce((acc, dayName) => {
        if (
          !String(openingHours[dayName].openHour) ||
          !String(openingHours[dayName].openMinute) ||
          !String(openingHours[dayName].closeHour) ||
          !String(openingHours[dayName].closeMinute)
        )
          return acc;

        return {
          ...acc,
          [dayName]: {
            openHour: Number(openingHours[dayName].openHour),
            openMinute: Number(openingHours[dayName].openMinute),
            closeHour: Number(openingHours[dayName].closeHour),
            closeMinute: Number(openingHours[dayName].closeMinute),
          },
        };
      }, {}),
      numberOfStalls,
      returnPolicyUrl,
      termsAndConditionsUrl,
      privacyPolicyUrl,
      address1,
      address2,
      zip,
      city,
      state,
      country,
    },
  })
);
