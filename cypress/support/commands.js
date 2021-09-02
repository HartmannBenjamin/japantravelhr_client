const { redirectRequestsPage } = require("./utils");

Cypress.Commands.add("loginAsUser", () => {
  loginAndSetToken("user");
});
Cypress.Commands.add("loginAsHR", () => {
  loginAndSetToken("hr");
});
Cypress.Commands.add("loginAsManager", () => {
  loginAndSetToken("manager");
  redirectRequestsPage();
});
// Best security
Cypress.Commands.add("resetDatabase", () => {
  cy.request({
    method: "GET",
    url: "http://127.0.0.1:8000/api/resetDatabase",
  });
});

function loginAndSetToken(role) {
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:8000/api/login",
    body: {
      email: role + "@japantravel.com",
      password: "1234",
    },
  }).then((response) => {
    window.localStorage.setItem("auth_token_default", response.body.token);
  });
}
