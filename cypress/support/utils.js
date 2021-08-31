function testSubjectRequestForm(subject) {
  cy.get("form").contains("div", "Subject").find("input").clear().type("T");
  cy.get(".v-messages__message").should(
    "contain",
    "Subject must be between 4 and 60 characters"
  );
  cy.contains("button", "Submit").should("be.disabled");

  const wordTooLong = "hisIsAWordWayToLongToBeAcceptedInTheSubjectField";
  cy.get("form").contains("div", "Subject").find("input").type(wordTooLong);
  cy.get(".v-messages__message").should(
    "contain",
    "All words need to be less than 25 characters"
  );
  cy.contains("button", "Submit").should("be.disabled");

  cy.get("form").contains("div", "Subject").find("input").clear().type(subject);
}

function testDescriptionRequestForm(description) {
  cy.get("form")
    .contains("div", "Description")
    .find("textarea")
    .clear()
    .type("too short desc");
  cy.get(".v-messages__message").should(
    "contain",
    "Description must be between 20 and 500 characters"
  );
  cy.contains("button", "Submit").should("be.disabled");

  cy.get("form")
    .contains("div", "Description")
    .find("textarea")
    .clear()
    .type(description);
  cy.contains("button", "Submit").should("not.be.disabled");
}

function testValidEmail(email) {
  cy.get("form")
    .contains("div", "E-mail")
    .find("input")
    .type("testInvalidEmail");
  cy.get(".v-messages__message").should("contain", "E-mail must be valid");

  cy.get("form").contains("div", "E-mail").find("input").clear().type(email);
}

function testValidPassword(password) {
  cy.get("form").contains("div", "Password").find("input").type("123");
  cy.get(".v-messages__message").should(
    "contain",
    "Password must be between 4 and 20 characters"
  );

  cy.get("form")
    .contains("div", "Password")
    .find("input")
    .type("TooLongPasswordErrorTest");
  cy.get(".v-messages__message").should(
    "contain",
    "Password must be between 4 and 20 characters"
  );

  cy.get("form")
    .contains("div", "Password")
    .find("input")
    .clear()
    .type(password);
}

function testValidConfirmPassword(password) {
  cy.get("form")
    .contains("div", "Confirm Password")
    .find("input")
    .type("notTheSamePassword");
  cy.get(".v-messages__message").should("contain", "Password must match");

  cy.get("form")
    .contains("div", "Confirm Password")
    .find("input")
    .clear()
    .type(password);
}

function testValidName(name) {
  cy.get("form").contains("div", "Name").find("input").clear().type("s");
  cy.get(".v-messages__message").should(
    "contain",
    "Name must be between 4 and 20 characters"
  );

  cy.get("form")
    .contains("div", "Name")
    .find("input")
    .type("tooLongNameItWillCreateAnError");
  cy.get(".v-messages__message").should(
    "contain",
    "Name must be between 4 and 20 characters"
  );

  cy.get("form").contains("div", "Name").find("input").clear().type(name);
}

export {
  testSubjectRequestForm,
  testDescriptionRequestForm,
  testValidEmail,
  testValidPassword,
  testValidConfirmPassword,
  testValidName,
};
