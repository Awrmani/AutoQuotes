describe('FLOW CustomQuote', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb()
      .then(() => cy.visit('/')) // We don't want to test login again, so log the user in programmatically
      .then(() => cy.login({ email: 'end@user.com', password: 'secret' }));
  });

  it('Should allow a user to log in from an anonymous quote flow', () => {
    /**
     * Starting out on the main quoting page
     */

    cy.getByText('Vehicle Specifications').should('exist');

    cy.findByLabelText('Make').parent().click();
    cy.getByTestId('select-option-Tesla').click();

    cy.findByLabelText('Model').parent().click();
    cy.getByTestId('select-option-Model S').click();

    cy.findByLabelText('Year').parent().click();
    cy.getByTestId('select-option-2016').click();

    cy.findByLabelText('Engine').parent().click();
    cy.getByTestId('select-option-Performance').click();

    cy.findByLabelText('Body').parent().click();
    cy.getByTestId('select-option-liftback').click();

    /**
     * Quote is created at this point
     */

    cy.findByLabelText('Service').parent().click();
    // Select MCU3 upgrade (part will not be available)
    cy.getByTestId('select-option-4d4355337570677261646531').click();

    cy.getByText('Add Service').click();

    cy.getByText('Request offers for missing parts').click();

    cy.getByText(
      'Please wait for our suppliers to provide some offers, or remove the services with missing parts from your quote'
    ).should('exist');
  });
});
