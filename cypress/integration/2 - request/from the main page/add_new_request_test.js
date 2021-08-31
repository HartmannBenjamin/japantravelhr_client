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
 */
describe("Test add new request", () => {
  beforeEach(() => {
    cy.loginAsUser();
  });

  it("redirect to requests page", () => {
    cy.visit("");
    cy.url().should("include", "/requests");
  });

  it("show create Request form", () => {
    cy.get('[data-test="create-request"]').click();
  });

  it("require valid subject", () => {
    testSubjectRequestForm(subject);
    cy.contains("button", "Submit").should("be.disabled");
  });

  it("require valid description", () => {
    testDescriptionRequestForm(description);
  });

  it("create the request", () => {
    cy.contains("button", "Submit").click();
  });

  it("check if the request has been added in the table", () => {
    cy.get("table").contains("td", subject);
    cy.get("table").contains("td", description);
  });

  it("check if log has been created", () => {
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", "Request created by user");
  });
});
