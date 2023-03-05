describe('User Management', () => {
  beforeEach(() => {
    // Reset BE to initial state before each test
    cy.reSeedDb()
      .then(() => cy.visit('/'))
      // We don't want to test login again, so log the user in programmatically
      .then(() => cy.login({ email: 'jd1@a.com', password: 'secret' }));
  });

  it('should update current user', () => {
    cy.getByTestId('drawer').within(() => {
      cy.getByText('John Doe').click();
    });
    cy.findByLabelText('Full Name *').clear().type('Jane Black');
    cy.getByTestId('submitButton').click();
    cy.getByText('User updated!').should('exist');

    cy.getByTestId('drawer').within(() => {
      cy.getByText('Jane Black').should('exist');
    });
  });

  it('should add  user', () => {
    cy.getByTestId('drawer').within(() => {
      cy.getByText('User Management').click();
    });

    cy.getByTestId('addUserButton').click();
    cy.findByLabelText('Full Name *').clear().type('Jane Black');
    cy.findByLabelText('Email *').clear().type('jane@black.com');
    cy.findByLabelText('Phone Number *').clear().type('+1231231234');
    cy.findByLabelText('Password *').clear().type('secret');
    cy.getByTestId('submitButton').click();
    cy.getByText('User added!').should('exist');
  });

  it('should update other user', () => {
    cy.getByTestId('drawer').within(() => {
      cy.getByText('User Management').click();
    });

    // Hex version of ID
    cy.getByTestId('user-546573745355736572303032').within(() => {
      cy.getByTestId('editButton').click();
    });

    cy.findByLabelText('Full Name *').clear().type('Jane Black');
    cy.getByTestId('submitButton').click();
    cy.getByText('User updated!').should('exist');

    cy.getByTestId('user-546573745355736572303032').within(() => {
      cy.getByText('Jane Black').should('exist');
    });
  });

  it('should delete other user', () => {
    cy.getByTestId('drawer').within(() => {
      cy.getByText('User Management').click();
    });

    // Hex version of ID
    cy.getByTestId('user-546573745355736572303032').within(() => {
      cy.getByTestId('deleteButton').click();
    });

    cy.getByText('User deleted!').should('exist');
    cy.getByTestId('user-546573745355736572303032').should('not.exist');
  });
});
