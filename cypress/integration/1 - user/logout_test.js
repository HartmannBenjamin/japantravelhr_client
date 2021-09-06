import {redirectRequestsPage} from '../../support/utils';

describe('Test log out user', () => {
  it('redirects to register page', () => {
    cy.loginAsUser();
    redirectRequestsPage();

    cy.get('[data-test="disconnect"]').click();
    cy.url().should('include', '/login');
  });
});
