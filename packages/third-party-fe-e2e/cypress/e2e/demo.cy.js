describe('Demo', () => {
  it('should display Third party FE', () => {
    cy.visit('/suppliers/firstSupplie/quotes/customQuote1');
    cy.getByText('MCU 3 computer').should('exist');
  });
});
