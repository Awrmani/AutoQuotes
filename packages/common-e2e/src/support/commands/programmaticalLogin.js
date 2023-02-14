Cypress.Commands.add('login', props => {
  const { email, password } = props ?? {};

  cy.window().its('AutoQuotes').its('store').invoke('dispatch', {
    type: 'LOGIN',
    payload: {
      email,
      password,
    },
  });
});
