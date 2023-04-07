describe('FLOW Quote => login', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb().then(() => cy.visit('/'));
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
    // Select `Wiper blade replacement`
    cy.getByTestId('select-option-5769706572426c6164653031').click();

    cy.getByText('Add Service').click();

    /**
     * At this point, a line item is added
     */
    cy.getByText('Log in').click();

    /**
     * We get redirected to the login screen
     */
    cy.findByLabelText('Email Address *').type('end@user.com');
    cy.findByLabelText('Password *').type('secret');

    cy.getByText('Sign In').click(); // submit form

    /**
     * We should get back to our quote
     */
    cy.getByText('Wiper blade replacement').should('exist');
  });
});
