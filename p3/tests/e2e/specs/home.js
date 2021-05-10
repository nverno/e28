// https://docs.cypress.io/api/introduction/api.html

describe('Home Page', () => {
  it('visits the root url', () => {
    cy.visit('/');
    cy.contains('p', 'Create task lists from other sites using xpath');
  });

  it('checks login link exists', () => {
    cy.visit('/');
    cy.get('[data-test="nav-link-account"]').should('be.visible');
  });

  it('checks logout link is not shown', () => {
    cy.visit('/');
    cy.get('[data-test="nav-link-logout"]').should('not.exist');
  });
});
