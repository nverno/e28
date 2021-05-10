describe('Create List', () => {
  before(() => {
    cy.login();
  });

  // it('list create page is available after logged in', () => {
  //   cy.contains('h2', 'Create List');
  // });

  it('runs an xpath query and creates list from result', () => {
    cy.visit('/list/new');
    cy.get('[data-test="name-input"]').clear().type('Test');
    cy.get('[data-test="url-input"]').clear().type('https://example.com');
    cy.get('[data-test="xpath-input"]').clear().type('//h1/text()');
    cy.get('[data-test="run-xpath-button"]').click();

    // NOTE: This could take longer if the proxy is spinning
    // better way to do this? Add a spy?
    cy.wait(1000);
    cy.get('.result-item').should('have.length', 1);

    // Create list from results
    cy.get('[data-test="create-list-button"]').click();
    cy.wait(1000);

    cy.visit('/');
    cy.contains('.list-link', 'Test');
  });
});
