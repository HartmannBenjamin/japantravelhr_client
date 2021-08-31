describe("Test log out user", () => {
  it("redirects to register page", () => {
    cy.loginAsUser();
    cy.visit("/");
    cy.get('[data-test="disconnect"]').click();
    cy.wait(1000);
    cy.url().should("include", "/login");
  });
});
