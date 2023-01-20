/**
 * This error interceptor is responsible for translating the
 * error received from the fetcher fn to something the user
 * more or less understands
 */

export const errorTranslationInterceptor = errorBag => {
  const { result, status, data } = errorBag;
  // Network error
  if (result === 'NETWORK_ERROR') return { result, error: 'Network Error' };

  // The backend gave us a string or translation object to display
  if (data?.error || data?.fieldErrors)
    return {
      ...errorBag,
      ...(data?.error && { error: data.error }),
      ...(data?.fieldErrors && { fieldErrors: data.fieldErrors }),
    };

  return {
    ...errorBag,
    error: `Received an error with the following statusCode ${status}`,
  };
};
