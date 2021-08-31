import "cypress-file-upload";
import {
  testDescriptionRequestForm,
  testSubjectRequestForm,
} from "../../../support/utils";

const faker = require("faker");
const subject = faker.lorem.words();
const description = faker.lorem.sentences();

/*
    On the request page
 */
describe("Test edit request", () => {
  beforeEach(() => {
    cy.loginAsUser();
  });

  it("redirect to requests page", () => {
    cy.visit("");
    cy.url().should("include", "/request");
  });

  it("click on specific request", () => {
    cy.get("thead").contains("Status").click();
    cy.get('[data-test="show-request"]').first().click();
    cy.url().should("include", "/request/");
  });

  it("show edit Request form", () => {
    cy.get(".mdi-pencil").first().click();
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

  it("check if log has been created", () => {
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", "Request updated by user");
  });
});
