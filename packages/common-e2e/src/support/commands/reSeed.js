Cypress.Commands.add('reSeedDb', () =>
  cy.request({
    method: 'POST',
    url: '/technical/v1/reseed',
  })
);
