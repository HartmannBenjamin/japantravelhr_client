import 'cypress-file-upload';
import {redirectRequestsPage} from '../../../support/utils';

/*
    From the main page
 */
describe('Test request functionalities as HR staff from the main page', () => {
  before(() => {
    cy.resetDatabase();
    cy.loginAsHR();
  });

  beforeEach(() => {
    redirectRequestsPage();
  });

  it('hr staff can update opened Request to Hr Reviewed status', () => {
    // sort datatable
    cy.get('thead').contains('Status').click();

    // show change status Request modal
    cy.get('[data-test="show-change-status-request"]').first().click();

    // change to Hr Reviewed status
    cy.get('[data-test="Hr Reviewed"]').click();

    // sort by date to get the last updated request
    cy.get('thead').contains('Date').click().click();

    // check if status has been changed
    cy.get('td')
        .get('[data-test="show-change-status-request"]')
        .first()
        .should('contain', 'Hr Reviewed');

    // check if log has been created
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
        .first()
        .should('contain', 'Request status updated to "HR Reviewed"');
  });

  it('try to create the request as hr staff', () => {
    // show create Request form
    cy.get('[data-test="create-request"]').should('not.exist');
  });

  it('try to complete a request as hr staff', () => {
    // show complete request modal
    cy.get('[data-test="show-complete-request"]').should('not.exist');
  });

  it('try to edit request as hr staff', () => {
    // show edit Request form
    cy.get('[data-test="edit-request"]').should('not.exist');
  });
});
