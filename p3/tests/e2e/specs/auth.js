describe('Authentication', () => {
  it('visits the login page', () => {
    cy.visit('/account');
    cy.contains('h2', 'Login');
  });

  it('is denied access to authenticated route', () => {
    cy.visit('/list/new');
    cy.get('[data-test="access-denied-heading"]').should('be.visible');
  });

  it('can login', () => {
    cy.login();
    cy.visit('/');
    cy.get('[data-test="welcome-banner"]').should('exist');
  });

  it('displays logout and create links after logging in', () => {
    cy.login();
    cy.visit('/');
    cy.get('[data-test="nav-link-logout"]').should('exist');
    cy.get('[data-test="nav-link-Create List"]').should('exist');
  });
});
