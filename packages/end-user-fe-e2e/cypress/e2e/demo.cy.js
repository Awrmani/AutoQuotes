describe('Abandoned Signup Reminder', () => {
  it('should display hello world', () => {
    cy.visit('/');
    cy.getByText('Hello World!').should('exist');
  });
});
