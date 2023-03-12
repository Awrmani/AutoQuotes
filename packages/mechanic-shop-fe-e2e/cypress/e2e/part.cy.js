describe('Part tests', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb()
      .then(() => cy.visit('/'))
      // We don't want to test login again, so log the user in programmatically
      .then(() => cy.login({ email: 'jd1@a.com', password: 'secret' }));

    cy.getByTestId('drawer').within(() => {
      cy.getByText('Parts').click();
    });
  });

  it('should allow to add a part', () => {
    cy.getByTestId('addPartButton').click();

    cy.getByText('Create Part').should('exist');

    // Fill in user creds from seed
    cy.findByLabelText('Item name *').type('Windshield');
    cy.findByLabelText('Description').type('Laminated glass front windshield');
    cy.findByLabelText('Manufacturer').type('Cornig');
    cy.findByLabelText('Type').parent().click();
    cy.getByTestId('select-option-OE').click();
    cy.findByLabelText('Price *').type('325');
    cy.findByLabelText('Quantity *').type('3');

    cy.getByTestId('fieldArray-compatibleVehicles').within(() => {
      cy.getByTestId('fieldArray-addItem').click();
    });

    cy.getByTestId('fieldArray-compatibleVehicles[0]').within(() => {
      cy.findByLabelText('Make *').type('Tesla');
      cy.findByLabelText('Model *').type('Model 3');
      cy.findByLabelText('From year *').type('2016');
      cy.findByLabelText('To year *').type('2020');
    });

    cy.getByTestId('submitButton').click();

    cy.getByText('Part added!').should('exist');
  });

  it('should allow to edit a part', () => {
    // Hexa coded object id (we gave it in ascii in the seed, it's been converted over)
    cy.getByTestId('part-4172616352696d4d53583136').within(() => {
      cy.getByTestId('editButton').click();
    });

    cy.findByLabelText('Description').type('They look great!');

    cy.getByTestId('submitButton').click();

    cy.getByText('Part updated!').should('exist');
  });

  it('should allow to delete a part', () => {
    // Hexa coded object id (we gave it in ascii in the seed, it's been converted over)
    cy.getByTestId('part-4172616352696d4d53583136').within(() => {
      cy.getByTestId('deleteButton').click();
    });

    cy.getByText('Part deleted!').should('exist');
  });
});
