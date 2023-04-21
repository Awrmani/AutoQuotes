describe('Supplier add offer', () => {
  it('should allow to send an offer', () => {
    cy.visit('/suppliers/firstSupplie/quotes/customQuote1');
    cy.getByText('MCU 3 computer').click();
    // Fill in user creds from seed
    cy.findByLabelText('Type').parent().click();
    cy.getByTestId('select-option-OE').click();
    cy.findByLabelText('Price *').type('325');
    cy.findByLabelText('Warranty in months').type('12');
    cy.findByLabelText('Manufacturer').type('Tesla');
    cy.findByLabelText('Description').type(
      `The improved processor that power car's infotainment system and the new graphics processor`
    );
    cy.getByTestId('submitButton').click();
    cy.getByText('Offer sent!').should('exist');
  });
});
