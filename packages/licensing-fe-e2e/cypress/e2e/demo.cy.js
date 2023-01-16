describe('Abandoned Signup Reminder', () => {
  it('should display Licensing front-end', () => {
    cy.visit('/');
    cy.getByText('Licensing front-end').should('exist');
  });
});
