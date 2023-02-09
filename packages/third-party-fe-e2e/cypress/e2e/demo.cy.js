describe('Demo', () => {
  it('should display Third party FE', () => {
    cy.visit('/');
    cy.getByText('Third party FE').should('exist');
  });
});
