import "cypress-file-upload";
import {
  testValidConfirmPassword,
  testValidName,
  testValidPassword,
} from "../../support/utils";

const { internet } = require("faker");
const name = internet.userName();

describe("Test Profile page", () => {
  beforeEach(() => {
    cy.loginAsUser();
  });

  it("redirect to profile page", () => {
    cy.visit("/profile");
    cy.url().should("include", "/profile");
  });

  it("require a valid name", () => {
    testValidName(name);
    cy.wait(200);
    cy.contains("button", "Update information").should("not.be.disabled");
  });

  it("update the user name", () => {
    cy.contains("button", "Update information").click();
    cy.wait(500);
    cy.get('[data-test="name"]').contains(name);
  });

  it("require a valid password", () => {
    testValidPassword("1234");

    cy.contains("button", "Update information").should("be.disabled");
  });

  it("require same confirm password", () => {
    testValidConfirmPassword("1234");
  });

  it("is valid filled form", () => {
    cy.contains("button", "Update information").should("not.be.disabled");
  });

  it("require valid image", () => {
    cy.get('input[type="file"]').attachFile("testPicture.bmp");
    cy.contains("button", "Update information").should("be.disabled");

    cy.get('input[type="file"]').attachFile("testPicture.png");
    cy.contains("button", "Update information").should("not.be.disabled");
  });

  it("information updated well", () => {
    cy.contains("button", "Update information").click();
    cy.url().should("include", "/profile");

    cy.wait(1000);

    cy.get("img")
      .first()
      .should("have.attr", "src")
      .should("include", "testPicture.png");
  });
});
