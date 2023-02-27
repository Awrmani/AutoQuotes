describe('Service', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb()
      .then(() => cy.visit('/'))
      // We don't want to test login again, so log the user in programmatically
      .then(() => cy.login({ email: 'jd1@a.com', password: 'secret' }));

    cy.getByTestId('drawer').within(() => {
      cy.getByText('Services').click();
    });
  });

  it('should add Service', () => {
    cy.getByTestId('addServiceButton').click();

    cy.findByLabelText('Service name *').type('Drivetrain service');
    cy.findByLabelText('Duration(minutes) *').type('60');
    cy.findByLabelText('Description *').type(
      'Change differential oil and filter'
    );

    // Add compatible vehicle
    cy.getByTestId('fieldArray-compatibleVehicles').within(() => {
      cy.getByTestId('fieldArray-addItem').click();
    });

    cy.getByTestId('fieldArray-compatibleVehicles[0]').within(() => {
      cy.findByLabelText('Make *').type('Tesla');
      cy.findByLabelText('Model *').type('Model 3');
      cy.findByLabelText('From year *').type('2016');
      cy.findByLabelText('To year *').type('2020');
    });

    // Add required parts
    cy.getByTestId('fieldArray-requiredParts').within(() => {
      cy.getByTestId('fieldArray-addItem').click();
    });

    cy.getByTestId('fieldArray-requiredParts[0]').within(() => {
      cy.findByLabelText('Part name *').type('Gear oil');
    });

    cy.getByTestId('fieldArray-requiredParts').within(() => {
      cy.getByTestId('fieldArray-addItem').click();
    });

    cy.getByTestId('fieldArray-requiredParts[1]').within(() => {
      cy.findByLabelText('Part name *').type('Crush washer');
    });

    cy.getByTestId('fieldArray-requiredParts').within(() => {
      cy.getByTestId('fieldArray-addItem').click();
    });

    cy.getByTestId('fieldArray-requiredParts[2]').within(() => {
      cy.findByLabelText('Part name *').type('Oil filter canister');
    });

    cy.getByTestId('submitButton').click();

    cy.getByText('Service type added!').should('exist');
  });

  it('should update service', () => {
    // Hex version of ID
    cy.getByTestId('service-54697265526f746174696f6e').within(() => {
      cy.getByTestId('editButton').click();
    });

    cy.findByLabelText('Description *').type(
      'Rotate tires from front to back and use antisieze'
    );

    cy.getByTestId('fieldArray-requiredParts').within(() => {
      cy.getByTestId('fieldArray-addItem').click();
    });

    cy.getByTestId('fieldArray-requiredParts[0]').within(() => {
      cy.findByLabelText('Part name *').type('Antisieze');
    });

    cy.getByTestId('submitButton').click();

    cy.getByText('Service type updated!').should('exist');
  });

  it('should delete service', () => {
    // Hex version of ID
    cy.getByTestId('service-54697265526f746174696f6e').within(() => {
      cy.getByTestId('deleteButton').click();
    });

    cy.getByText('Service type deleted!').should('exist');
    cy.getByTestId('service-54697265526f746174696f6e').should('not.exist');
  });
});
