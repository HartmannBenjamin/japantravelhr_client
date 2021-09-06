import 'cypress-file-upload';
import {
  clickLastUpdatedRequest,
  clickOnSpecificRequest,
  redirectRequestsPage,
} from '../../../support/utils';

/*
    From the request page
 */
describe('Test request functionalities as Manager from the request page', () => {
  before(() => {
    cy.resetDatabase();
    cy.loginAsManager();
  });

  beforeEach(() => {
    redirectRequestsPage();
  });

  it('try to edit a request as manager', () => {
    clickOnSpecificRequest();

    // show edit Request form
    cy.get('[data-test="edit-request"]').should('not.exist');
  });

  it('try to change request status as manager', () => {
    clickOnSpecificRequest();

    // show change status Request modal
    cy.get('[data-test="change-status-request"]').should('not.exist');
  });

  it('manager can complete request', () => {
    clickLastUpdatedRequest();

    // show complete request modal
    cy.get('[data-test="show-complete-request"]').first().click();

    // complete the request
    cy.get('[data-test="complete-request"]').click();

    // check if status has been changed
    cy.get('.ivu-steps-status-process').should('contain', 'Processed');

    // check if log has been created
    cy.get('[data-test="request-log"]')
        .first()
        .should('contain', 'Request status updated to "Processed"');
  });
});
