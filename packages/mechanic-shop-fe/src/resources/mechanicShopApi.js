import fetcherFactory from '@autoquotes/libraries/src/utils/fetcherFactory';

const apiCall = fetcherFactory({
  timeout: 30000,
  // On production, the same domain and port serves cdn and api, so no need to specify them
  baseUrl: `${
    process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : ''
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
export const fetchVehicleTypes = apiCall(() => ({
  url: '/vehicleTypes',
}));
export const fetchvehicleTypeDetails = apiCall(({ id }) => ({
  url: `/vehicleTypes/${id}`,
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

// appointment
export const fetchAppointmentList = apiCall(({ from, to }) => ({
  url: '/appointments',
  params: { from, to },
}));

export const fetchAppointmentDetails = apiCall(({ id }) => ({
  url: `/appointments/${id}`,
}));

// Suppliers
export const fetchSuppliers = apiCall(() => ({
  url: '/suppliers',
}));

export const fetchSupplierDetails = apiCall(({ id }) => ({
  url: `/suppliers/${id}`,
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

// Vehicle types
export const addVehicleType = apiCall(
  ({ make, model, modelYear, engineVariant, bodyType }) => ({
    url: '/vehicleTypes',
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
export const updateVehicleType = apiCall(
  ({ id, make, model, modelYear, engineVariant, bodyType }) => ({
    url: `/vehicleTypes/${id}`,
    method: 'PATCH',
    data: {
      make,
      model,
      modelYear: Number(modelYear),
      engineVariant,
      bodyType,
    },
  })
);
export const deleteVehicleType = apiCall(({ id }) => ({
  url: `/vehicleTypes/${id}`,
  method: 'DELETE',
}));

// Users
export const addUser = apiCall(({ name, email, phone, password, role }) => ({
  url: '/users',
  method: 'PUT',
  data: { name, email, phone, password, role },
}));

export const updateUser = apiCall(
  ({ id, name, email, phone, password, role }) => ({
    url: `/users/${id}`,
    method: 'PATCH',
    data: {
      name,
      email,
      phone,
      // Only send pwd change request to BE if pwd field is not empty
      ...(password?.length && { password }),
      role,
    },
  })
);
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
    numberOfStalls,
    hourlyPriceOfLabor,
    partMarkupPercent,
    taxPercent,
    email,
    phone,
    returnPolicyUrl,
    termsAndConditionsUrl,
    privacyPolicyUrl,
    address1,
    address2,
    zip,
    city,
    state,
    country,
    openingHours,
  }) => ({
    url: '/shop',
    method: 'PATCH',
    data: {
      name,
      ...(logo.isNew && { logo: logo.uri }),
      slogan,
      hourlyPriceOfLabor: Number(hourlyPriceOfLabor),
      partMarkupPercent: Number(partMarkupPercent),
      taxPercent: Number(taxPercent),
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
      numberOfStalls: Number(numberOfStalls),
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

export const deleteAppointment = apiCall(({ id }) => ({
  url: `/appointments/${id}`,
  method: 'DELETE',
}));

// Suppliers

export const addSupplier = apiCall(
  ({ name, address, zip, city, state, country, email, phone }) => ({
    url: '/suppliers',
    method: 'PUT',
    data: { name, address, zip, city, state, country, email, phone },
  })
);

export const updateSupplier = apiCall(
  ({ id, name, address, zip, city, state, country, email, phone }) => ({
    url: `/suppliers/${id}`,
    method: 'PATCH',
    data: { name, address, zip, city, state, country, email, phone },
  })
);

export const deleteSupplier = apiCall(({ id }) => ({
  url: `/suppliers/${id}`,
  method: 'DELETE',
}));
