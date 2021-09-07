import {redirectRequestsPage} from '../../support/utils';

describe('Test log out user', () => {
  before(() => {
    cy.resetDatabase();
  });

  it('log out user', () => {
    cy.loginAsUser();
    redirectRequestsPage();

    cy.get('[data-test="disconnect"]').click();
    cy.url().should('include', '/login');
  });
});
