import "cypress-file-upload";
import {
  testDescriptionRequestForm,
  testSubjectRequestForm,
} from "../../../support/utils";

const faker = require("faker");
const subject = faker.lorem.words();
const description = faker.lorem.sentences();

/*
    On the main page
    Need at least on request with status 'Open'
 */
describe("Test edit request", () => {
  beforeEach(() => {
    cy.loginAsUser();
  });

  it("redirect to requests page", () => {
    cy.visit("");
    cy.url().should("include", "/requests");
  });

  it("show edit Request form", () => {
    // sort table
    cy.get("thead").contains("Status").click();
    cy.wait(500);
    cy.get('[data-test="edit-request"]').first().click();
  });

  it("require valid subject", () => {
    testSubjectRequestForm(subject);
    cy.contains("button", "Submit").should("not.be.disabled");
  });

  it("require valid description", () => {
    testDescriptionRequestForm(description);
  });

  it("edit the request", () => {
    cy.contains("button", "Submit").click();
  });

  it("check if the request has been updated in the table", () => {
    // sort to get the last request updated
    cy.get("thead").contains("Date").click().click();

    cy.get("table").contains("td", subject);
    cy.get("table").contains("td", description);
  });

  it("check if log has been created", () => {
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", "Request updated by user");
  });
});
