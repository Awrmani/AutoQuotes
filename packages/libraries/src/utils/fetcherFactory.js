import merge from 'lodash-es/merge';
import camelCase from 'lodash-es/camelCase';
import { craftSearch } from './url';

const METAS_TO_HEADER = {
  authorization: 'Authorization',
  page: 'X-Page',
  pageSize: 'X-Page-Size',
};

/**
 * This Fn takes specific pieces of meta, and
 * forwards it to the request header
 */
const createHeaderFromMeta = meta =>
  Object.keys(METAS_TO_HEADER).reduce((acc, from) => {
    if (meta[from] === undefined) {
      return acc;
    }

    return { ...acc, [METAS_TO_HEADER[from]]: meta[from] };
  }, {});

/**
 * This function parses the response headers, and
 * converts X-Custom-Header key to customHeader
 */
const parseResponseHeaders = ({ headers: raw }) => {
  let headers = {};
  raw.forEach((value, originalKey) => {
    const key = camelCase(originalKey.replace(/^X-/i, ''));
    headers = {
      ...headers,
      [key]: value,
    };
  });

  return headers;
};

/**
 * This fn creates the query param string
 */
const craftQPString = params => {
  const search = craftSearch(params);

  if (search) return `?${search}`;

  return '';
};

/**
 * This fn takes in all of the default, and pre-configuration
 * as well as the curried function data, and merges them to the
 * final fetch configuration
 *
 * We merge data in order of specificity:
 * defaults => config => meta => configurator
 * keys with undefined value will be ignored by merge
 */
const buildFetchConfig = ({ config, payload, meta, configurator }) =>
  merge(
    {
      // Default config
      baseUrl: '',
      url: '',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
    config,
    {
      headers: createHeaderFromMeta(meta),
      baseUrl: meta.baseUrl,
    },
    configurator(payload, meta)
  );

const fetcherFactory =
  // Global configuration


    config =>
    // Endpoint configuration
    configurator =>
    // Fetcher (the factory product)
    async (payload = {}, meta = {}) => {
      const { baseUrl, url, data, params, ...fetchOptions } = buildFetchConfig({
        config,
        payload,
        meta,
        configurator,
      });

      let response;
      try {
        response = await fetch(`${baseUrl}${url}${craftQPString(params)}`, {
          ...fetchOptions,
          ...(data !== undefined && {
            body: JSON.stringify(data),
          }),
        });
      } catch (e) {
        // This is a network error since it was thrown by fetch itself
        throw {
          result: 'NETWORK_ERROR',
          name: e.name,
          message: e.message,
        };
      }

      const responseHeaders = parseResponseHeaders(response);
      let responseData;

      if (
        responseHeaders?.contentType
          ?.toLowerCase()
          .split(/; ?/)
          .includes('application/json')
      ) {
        try {
          responseData = response && (await response.json());
        } catch (e) {
          // The body is probably empty
        }
      } else {
        responseData = response?.body;
      }

      if (response.ok)
        return {
          result: 'OK',
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          data: responseData,
        };

      throw {
        result: 'API_ERROR',
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      };
    };

export default fetcherFactory;
