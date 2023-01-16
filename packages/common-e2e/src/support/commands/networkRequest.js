// Overwrite cy.request to include accessToken
Cypress.Commands.overwrite('request', (originalFn, originalOptions) => {
  const apiBaseUrl = Cypress.config('apiBaseUrl');
  const { userData } = originalOptions;
  let { url: alteredUrl } = originalOptions;

  // use apiBaseUrl instead of baseUrl
  if (!/^(https?:|)\/\//i.test(alteredUrl)) {
    alteredUrl = `${apiBaseUrl}${alteredUrl}`;
  }

  // Use authorization header if we have userData
  const headers = {
    ...originalOptions.headers,
    ...(userData?.accessToken && {
      authorization: `Bearer ${userData.accessToken}`,
    }),
  };

  return originalFn({ ...originalOptions, url: alteredUrl, headers });
});
