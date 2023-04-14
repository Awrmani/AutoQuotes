import moment from 'moment';
import fetcherFactory from '@autoquotes/libraries/src/utils/fetcherFactory';

const apiCall = fetcherFactory({
  timeout: 30000,
  // On production, the same domain and port serves cdn and api, so no need to specify them
  baseUrl: `${
    process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : ''
  }/api/thirdparty/v1`,
});

// =================== Data fetching ============================
export const fetchRequestedParts = apiCall(({ supplierId, quoteId }) => ({
  url: `/suppliers/${supplierId}/quotes/${quoteId}`,
}));

// =====Form submits & other actions altering backend state======

// offers
export const offerParts = apiCall(
  ({
    supplierId,
    quoteId,
    partRequestId,
    description,
    manufacturer,
    type,
    warrantyMonths,
    price,
    offerExpiration,
  }) => ({
    url: `/suppliers/${supplierId}/quotes/${quoteId}/parts/${partRequestId}`,
    method: 'PUT',
    data: {
      description,
      manufacturer,
      type,
      warrantyMonths: Number(warrantyMonths),
      price,
      offerExpiration: moment(offerExpiration).toISOString(),
    },
  })
);
