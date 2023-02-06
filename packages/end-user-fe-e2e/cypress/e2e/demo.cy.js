describe('Demo', () => {
  it('should display End-user front-end', () => {
    cy.visit('/');
    cy.getByText('End-user front-end').should('exist');
  });
});
