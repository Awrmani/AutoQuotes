describe('Shop settings', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb()
      .then(() => cy.visit('/'))
      // We don't want to test login again, so log the user in programmatically
      .then(() => cy.login({ email: 'jd1@a.com', password: 'secret' }));

    cy.getByTestId('drawer').within(() => {
      cy.getByText('Settings').click();
    });
  });

  it('should allow to edit the shop settings', () => {
    // Let's add availability on Saturday
    cy.getByTestId('openingHours-saturday-openHour').within(() => {
      cy.findByLabelText('Saturday open hour').type('11');
    });
    cy.getByTestId('openingHours-saturday-openMinute').within(() => {
      cy.findByLabelText('Open minute').type('30');
    });
    cy.getByTestId('openingHours-saturday-closeHour').within(() => {
      cy.findByLabelText('Close hour').type('15');
    });
    cy.getByTestId('openingHours-saturday-closeMinute').within(() => {
      cy.findByLabelText('Close minute').type('45');
    });

    cy.getByTestId('submitButton').click();

    cy.getByText('Shop settings updated!').should('exist');
  });
});
