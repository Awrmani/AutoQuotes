describe('FLOW Quote => register', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb().then(() => cy.visit('/'));
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

    /**
     * At this point, a line item is added
     */
    cy.getByText('Sign Up').click();

    /**
     * We get redirected to the registration screen
     */
    cy.findByLabelText('Full Name *').type('Test User');
    cy.findByLabelText('Email *').type('test@user.com');
    cy.findByLabelText('Phone Number *').type('+12345678910');
    cy.findByLabelText('Password *').type('secret');
    cy.findByLabelText('Confirm Password *').type('secret');
    cy.findByLabelText('Address line 1 *').type('Nowhere rd. 1');
    cy.findByLabelText('Postal code *').type('A0A 0A0');
    cy.findByLabelText('City *').type('Toronto');
    cy.findByLabelText('State *').type('ON');
    cy.findByLabelText('Country *').type('Canada');

    cy.intercept({
      pathname: /\/users$/,
      method: 'PUT',
    }).as('registrationRequest');

    cy.getByText('Register').click(); // submit form

    /**
     * Confirmation page
     */
    cy.getByText('Confirm your email address').should('exist');

    cy.wait('@registrationRequest').then(data => {
      const { id: userId, quoteId } = data.response.body;

      cy.request({
        url: `/technical/v1/enduser/${userId}/confirmationCode`,
      }).then(response => {
        const { verificationCode } = response.body;

        cy.visit(`/confirmEmail/${userId}/${verificationCode}/${quoteId}`);
      });
    });

    /**
     * We should get back to our quote
     */

    cy.getByText('Wiper blade replacement').should('exist');
  });
});
