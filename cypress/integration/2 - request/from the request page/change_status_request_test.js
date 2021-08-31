/*
    On the request page
 */
describe("Test change status request", () => {
  beforeEach(() => {
    cy.loginAsHR();
  });

  it("redirect to requests page", () => {
    cy.visit("");
    cy.url().should("include", "/requests");
  });

  it("click on specific request", () => {
    // sort table
    cy.get("thead").contains("Status").click();

    cy.get('[data-test="show-request"]').first().click();
    cy.url().should("include", "/request/");
  });

  it("show change status Request modal", () => {
    cy.get('[data-test="change-status-request"]').first().click();
  });

  it("change to Hr Reviewed status", () => {
    cy.get('[data-test="Hr Reviewed"]').click();
  });

  it("check if status has been changed", () => {
    cy.get(".ivu-steps-status-process").should("contain", "Hr Reviewed");
  });

  it("check if log has been created", () => {
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", 'Request status updated to "HR Reviewed"');
  });
});
