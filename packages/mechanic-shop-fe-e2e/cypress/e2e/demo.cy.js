describe('Abandoned Signup Reminder', () => {
  it('should display Mechanic shop front-end', () => {
    cy.visit('/');
    cy.getByText('Mechanic shop front-end').should('exist');
  });
});
