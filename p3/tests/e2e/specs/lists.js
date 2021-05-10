describe('Lists', () => {
  before(() => {
    cy.login();
    cy.visit('/');
  });

  it('renders lists component on main page after logged in', () => {
    cy.get('[data-test="lists-header"]').should('exist');
  });

  it('displays lists after logging in', () => {
    cy.get('.list-link').should('have.length.gt', 0);
  });

  it('displays list show page when clicked', () => {
    cy.get('.list-link').first().click();
    cy.get('[data-test="list-header"]').should('exist');
  });
});
