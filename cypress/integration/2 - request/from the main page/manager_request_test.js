import 'cypress-file-upload';
import {redirectRequestsPage} from '../../../support/utils';

/*
    From the main page
 */
describe('Test request functionalities as Manager from the main page', () => {
  before(() => {
    cy.resetDatabase();
    cy.loginAsManager();
  });

  beforeEach(() => {
    redirectRequestsPage();
  });

  it('manager can complete a request', () => {
    // show complete request modal
    cy.get('[data-test="show-complete-request"]').first().click();

    // complete the request
    cy.get('[data-test="complete-request"]').click();

    // check if status has been changed
    cy.get('[data-test="request-row"]').first().should('contain', 'Processed');

    // check if log has been created
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
        .first()
        .should('contain', 'Request status updated to "Processed"');
  });

  it('try to create the request as manager', () => {
    // show create Request form
    cy.get('[data-test="create-request"]').should('not.exist');
  });

  it('try to change Request status as manager', () => {
    // show change status Request modal
    cy.get('[data-test="show-change-status-request"]').should('not.exist');
  });

  it('try to edit request as manager', () => {
    // show edit Request form
    cy.get('[data-test="edit-request"]').should('not.exist');
  });
});
