import "cypress-file-upload";
import {
  redirectRequestsPage,
  testDescriptionRequestForm,
  testSubjectRequestForm,
} from "../../../support/utils";

const faker = require("faker");
const subject = faker.lorem.words();
const description = faker.lorem.sentences();

/*
    From the main page
 */
describe("Test request functionalities as User from the main page", () => {
  before(() => {
    cy.resetDatabase();
    cy.loginAsUser();
  });

  beforeEach(() => {
    redirectRequestsPage();
  });

  it("create the request as user", () => {
    // show create Request form
    cy.get('[data-test="create-request"]').click();

    // require valid subject
    testSubjectRequestForm(subject);
    cy.contains("button", "Submit").should("be.disabled");

    // require valid description
    testDescriptionRequestForm(description);

    // create the request
    cy.contains("button", "Submit").click();

    // check if the request has been added in the table
    cy.get("table").contains("td", subject);
    cy.get("table").contains("td", description);

    // check if log has been created
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", "Request created by user");
  });

  it("user can edit his request", () => {
    // sort table to get open request firstly
    cy.get("thead").contains("Status").click();

    // show edit Request form
    cy.get('[data-test="edit-request"]').first().click();

    // require valid subject
    testSubjectRequestForm(subject);
    cy.contains("button", "Submit").should("not.be.disabled");

    // require valid description
    testDescriptionRequestForm(description);

    // edit the request
    cy.contains("button", "Submit").click();
    cy.wait(500);

    // sort by date to get the last updated request
    cy.get("thead").contains("Date").click().click();

    // check if the request has been updated in the table
    cy.get("table").contains("td", subject);
    cy.get("table").contains("td", description);

    // check if log has been created
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", "Request updated by user");
  });

  it("try to change Request status as user", () => {
    // show change status Request modal
    cy.get('[data-test="show-change-status-request"]').should("not.exist");
  });

  it("try to complete a request as user", () => {
    // show complete request modal
    cy.get('[data-test="show-complete-request"]').should("not.exist");
  });
});
