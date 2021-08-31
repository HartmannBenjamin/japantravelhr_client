/*
    On the main page
 */
describe("Test complete request", () => {
  beforeEach(() => {
    cy.loginAsManager();
  });

  it("redirect to requests page", () => {
    cy.visit("");
    cy.url().should("include", "/requests");
  });

  it("show complete request modal", () => {
    cy.get('[data-test="show-complete-request"]').first().click();
  });

  it("complete the request", () => {
    cy.get('[data-test="complete-request"]').click();
  });

  it("check if status has been changed", () => {
    cy.get("table").should("contain", "Processed");
  });

  it("check if log has been created", () => {
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", 'Request status updated to "Processed"');
  });
});
