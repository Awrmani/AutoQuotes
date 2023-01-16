/**
 * Commands that identify a dom node
 */

Cypress.Commands.add('getByText', (...rest) => cy.contains(...rest));

Cypress.Commands.add('getByTestId', (testId, ...rest) =>
  cy.get(`[data-testid="${testId}"]`, ...rest)
);
