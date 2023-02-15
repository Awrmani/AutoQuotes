describe('Authentication', () => {
  it('should allow the user to log in', () => {
    cy.visit('/');
    cy.getByText('Sign in to Mechanic shop').should('exist');

    // Fill in user creds from seed
    cy.findByLabelText('Email Address *').type('jd1@a.com');
    cy.findByLabelText('Password *').type('secret');

    cy.getByText('Sign In').click(); // submit form

    // After a successful login we are landed on the dashboard
    cy.getByText('Shop dashboard').should('exist');
  });

  it('should allow the user to log out', () => {
    cy.visit('/');

    // We don't want to test login again, so log the user in programmatically
    cy.login({ email: 'jd1@a.com', password: 'secret' });

    cy.getByText('Log out').click();

    cy.getByText('Sign in to Mechanic shop').should('exist');
  });
});
