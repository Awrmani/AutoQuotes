describe('FLOW ImmediateQuote', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb()
      .then(() => cy.visit('/')) // We don't want to test login again, so log the user in programmatically
      .then(() => cy.login({ email: 'end@user.com', password: 'secret' }));
  });

  it.skip('Should allow a user to log in from an anonymous quote flow', () => {
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
    // Select `Wiper blade replacement`
    cy.getByTestId('select-option-5769706572426c6164653031').click();

    cy.getByText('Add Service').click();

    cy.getByText('Confirm & Book Appointment').should('be.disabled');

    cy.findByLabelText('Wiper blade').parent().click();
    cy.getByTestId('select-option-5769706572426c6164654d53').click();

    cy.getByText('Confirm & Book Appointment').click();

    const d = new Date();
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7));
    const nextMonday = d.getDate();

    // Make sure we select the upcoming date (and not one that is passed)
    cy.get('button').not('[disabled]').contains(nextMonday).click();

    cy.pause(1000).then(() => {
      cy.findByLabelText('Available appointments').parent().click();
      cy.get('[data-testid^="select-option-"]').first().click(); // select first option available

      cy.getByText('Book Appointment').click();

      /**
       * Back to the quote details
       */
      cy.getByText('Appointment Details').should('exist');
    });
  });
});
