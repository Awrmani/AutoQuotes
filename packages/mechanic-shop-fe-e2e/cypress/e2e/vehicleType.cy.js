describe('Vehicle type tests', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb()
      .then(() => cy.visit('/'))
      // We don't want to test login again, so log the user in programmatically
      .then(() => cy.login({ email: 'jd1@a.com', password: 'secret' }));

    cy.getByTestId('drawer').within(() => {
      cy.getByText('Vehicle types').click();
    });
  });

  it('should allow to add a vehicle type', () => {
    cy.getByTestId('addVehicleTypeButton').click();

    cy.getByText('Create Type').should('exist');

    // Fill in user creds from seed
    cy.findByLabelText('Make *').type('Tesla');
    cy.findByLabelText('Model *').type('Model 2');
    cy.findByLabelText('Model Year *').type('2023');
    cy.findByLabelText('Engine Variant *').type('Standard range');
    cy.findByLabelText('Body Type *').type('Sedan');

    cy.getByTestId('submitButton').click();

    cy.getByText('Vehicle type added!').should('exist');
  });

  it('should allow to edit a vehicle type', () => {
    // Hexa coded object id (we gave it in ascii in the seed, it's been converted over)
    cy.getByTestId('vehicletype-5465736c614d6f64656c5331').within(() => {
      cy.getByTestId('editButton').click();
    });

    cy.findByLabelText('Body Type *').clear().type('Sedan');

    cy.getByTestId('submitButton').click();

    cy.getByText('Vehicle type updated!').should('exist');
  });

  it('should allow to delete a vehicle type', () => {
    // Hexa coded object id (we gave it in ascii in the seed, it's been converted over)
    cy.getByTestId('vehicletype-5465736c614d6f64656c5331').within(() => {
      cy.getByTestId('deleteButton').click();
    });

    cy.getByText('Vehicle type deleted!').should('exist');
  });
});
