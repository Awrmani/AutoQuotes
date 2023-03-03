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

    // Todo implement test of altering current user when feature is done
  });

  it('should add  user', () => {
    cy.getByTestId('drawer').within(() => {
      cy.getByText('User Management').click();
    });

    // Hex version of ID
    cy.getByTestId('addUserButton').click();

    // Todo implement test of adding user when feature is done
  });

  it('should update other user', () => {
    cy.getByTestId('drawer').within(() => {
      cy.getByText('User Management').click();
    });

    // Hex version of ID
    cy.getByTestId('user-546573745355736572303032').within(() => {
      cy.getByTestId('editButton').click();
    });

    // Todo implement test of altering other user when feature is done
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
