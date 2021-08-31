const { testValidEmail, testValidPassword } = require("../../support/utils");
const { internet } = require("faker");
const randomEmail = internet.email();
const randomPassword = internet.password();

describe("Test login page", () => {
  it("redirects to login page", () => {
    cy.visit("");
    cy.url().should("include", "/login");
    cy.contains("button", "Login").should("be.disabled");
  });

  it("require a valid email", () => {
    testValidEmail(randomEmail);

    cy.contains("button", "Login").should("be.disabled");
  });

  it("require a valid password", () => {
    testValidPassword(randomPassword);

    cy.contains("button", "Login").should("not.be.disabled");
  });

  it("try to log in with bad credentials", () => {
    cy.contains("button", "Login").click();
    cy.url().should("include", "/login");
  });

  it("fill form with correct information", () => {
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
});
