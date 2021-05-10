describe('List Show Page', () => {
  before(() => {
    cy.login();
    cy.visit('/list/1');
  });

  it('list show page is available after logged in', () => {
    cy.get('[data-test="list-header"]').should('exist');
  });

  it('displays todo items', () => {
    cy.get('.list-item').should('have.length.gt', 0);
  });

  it('toggles item done state when clicked', () => {
    let item = cy.get('.list-item>div>span').first(),
        wasDone = item.then($span => $span.hasClass('done'));
    cy.get('.list-item>div>span').first().click();
    cy.wait(1000);
    let res = cy.get('.list-item>div>span').first();

    if (wasDone) res.should('not.have.class', 'done');
    else res.should('have.class', 'done');
  });
});
