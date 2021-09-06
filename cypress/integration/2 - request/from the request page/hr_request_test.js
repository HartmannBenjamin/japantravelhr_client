import 'cypress-file-upload';
import {
  clickLastUpdatedRequest,
  clickOnSpecificRequest,
  redirectRequestsPage,
} from '../../../support/utils';

/*
    From the request page
 */
describe('Test request functionalities as HR staff from the request page', () => {
  before(() => {
    cy.resetDatabase();
    cy.loginAsHR();
  });

  beforeEach(() => {
    redirectRequestsPage();
  });

  it('hr staff can change request status', () => {
    clickOnSpecificRequest();

    // show change status Request modal
    cy.get('[data-test="change-status-request"]').first().click();

    // change to Hr Reviewed status
    cy.get('[data-test="Hr Reviewed"]').click();

    // check if status has been changed
    cy.get('.ivu-steps-status-process').should('contain', 'Hr Reviewed');

    // check if log has been created
    cy.get('[data-test="request-log"]')
        .first()
        .should('contain', 'Request status updated to "HR Reviewed"');
  });

  it('try to complete request as hr staff', () => {
    clickLastUpdatedRequest();

    // show complete request modal
    cy.get('[data-test="show-complete-request"]').should('not.exist');
  });

  it('try to edit a request as hr staff', () => {
    clickOnSpecificRequest();

    // show edit Request form
    cy.get('[data-test="edit-request"]').should('not.exist');
  });
});
