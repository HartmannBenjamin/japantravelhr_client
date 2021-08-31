import "cypress-file-upload";
import {
  testValidConfirmPassword,
  testValidEmail,
  testValidName,
  testValidPassword,
} from "../../support/utils";

const { internet } = require("faker");
const email = internet.email();
const name = internet.userName();
const password = internet.password();

describe("Test register a new user", () => {
  it("redirect to register page", () => {
    cy.visit("");
    cy.url().should("include", "/login");

    cy.contains("Register Page").click();
    cy.url().should("include", "/register");

    cy.contains("button", "Register").should("be.disabled");
  });

  it("require a valid name", () => {
    testValidName(name);

    cy.contains("button", "Register").should("be.disabled");
  });

  it("require a valid email", () => {
    testValidEmail(email);

    cy.contains("button", "Register").should("be.disabled");
  });

  it("require a role", () => {
    cy.get("[data-cy=select-role]").parent().click();
    cy.contains("Register").click();
    cy.get(".v-messages__message").should("contain", "Role is required");

    cy.get("[data-cy=select-role]").parent().click();
    cy.get(".v-menu__content").contains("User").click();

    cy.contains("button", "Register").should("be.disabled");
  });

  it("require a valid password", () => {
    testValidPassword(password);

    cy.contains("button", "Register").should("be.disabled");
  });

  it("require same confirm password", () => {
    testValidConfirmPassword(password);
  });

  it("is valid filled register form", () => {
    cy.contains("button", "Register").should("not.be.disabled");
  });

  it("require valid image", () => {
    cy.get('input[type="file"]').attachFile("testPicture.bmp");
    cy.contains("button", "Register").should("be.disabled");

    cy.get('input[type="file"]').attachFile("testPicture.png");
    cy.contains("button", "Register").should("not.be.disabled");
  });

  it("is sign out well", () => {
    cy.contains("button", "Register").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
  });

  it("email is not available anymore", () => {
    cy.contains("Register Page").click();
    cy.url().should("include", "/register");

    cy.get("form").contains("div", "E-mail").find("input").clear().type(email);
    cy.get("form").contains("div", "Name").click();
    cy.get(".v-messages__message").should(
      "contain",
      "This E-mail is not available"
    );
  });
});
