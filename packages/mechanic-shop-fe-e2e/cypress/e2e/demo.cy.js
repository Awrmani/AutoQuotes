describe('Abandoned Signup Reminder', () => {
  it('should display Mechanic shop front-end', () => {
    cy.visit('/');
    cy.getByText('Sign in to Mechanic shop').should('exist');
  });
});
