import 'cypress-file-upload';
import {
  clickLastUpdatedRequest,
  clickOnSpecificRequest,
  redirectRequestsPage,
  testDescriptionRequestForm,
  testSubjectRequestForm,
} from '../../../support/utils';

const faker = require('faker');
const subject = faker.lorem.words();
const description = faker.lorem.sentences();

/*
    From the request page
 */
describe('Test request functionalities as User from the request page', () => {
  before(() => {
    cy.resetDatabase();
    cy.loginAsUser();
  });

  beforeEach(() => {
    redirectRequestsPage();
  });

  it('user can edit a request of status \'Open\'', () => {
    clickOnSpecificRequest();

    // show edit Request form
    cy.get('[data-test="edit-request"]').first().click();

    // require valid subject
    testSubjectRequestForm(subject);
    cy.contains('button', 'Submit').should('not.be.disabled');

    // require valid description
    testDescriptionRequestForm(description);

    // edit the request
    cy.contains('button', 'Submit').click();

    // check if request has been updated
    cy.get('[data-test="request-subject"]').should('contain', subject);
    cy.get('[data-test="request-description"]').should('contain', description);

    // check if log has been created
    cy.get('[data-test="request-log"]')
        .first()
        .should('contain', 'Request updated by user');
  });

  it('try to complete request as user', () => {
    clickLastUpdatedRequest();

    // show complete request modal
    cy.get('[data-test="show-complete-request"]').should('not.exist');
  });

  it('try to change request status as user', () => {
    clickOnSpecificRequest();

    // show change status Request modal
    cy.get('[data-test="change-status-request"]').should('not.exist');
  });

  it('try to recover a non existent request', () => {
    cy.visit('/request/0');
    cy.get('[data-test="div-request"]').should('not.exist');
  });
});
