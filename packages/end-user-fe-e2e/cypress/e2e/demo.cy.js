describe('Demo', () => {
  it('should display End-user front-end', () => {
    cy.visit('/');
    cy.getByText('Vehicle Specifications').should('exist');
  });
});
