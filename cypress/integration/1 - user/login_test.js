const { testValidEmail, testValidPassword } = require("../../support/utils");
const { internet } = require("faker");
const randomEmail = internet.email();
const randomPassword = internet.password();

describe("Test login page", () => {
  beforeEach(() => {
    cy.visit("");
    cy.url().should("include", "/login");
    cy.contains("button", "Login").should("be.disabled");
  });

  it("try to log in with bad credentials", () => {
    // require a valid email
    testValidEmail(randomEmail);
    cy.contains("button", "Login").should("be.disabled");

    // require a valid password
    testValidPassword(randomPassword);
    cy.contains("button", "Login").should("not.be.disabled");

    cy.contains("button", "Login").click();
    cy.url().should("include", "/login");
  });

  it("user can login with correct information", () => {
    cy.get("form")
      .contains("div", "E-mail")
      .find("input")
      .clear()
      .type("user@japantravel.com");
    cy.get("form")
      .contains("div", "Password")
      .find("input")
      .clear()
      .type("1234");

    cy.contains("button", "Login").click();
    cy.url().should("include", "/requests");
  });

  it("should redirect unauthenticated user to login page", function () {
    cy.visit("/requests");
    cy.url().should("include", "/login");
  });
});
