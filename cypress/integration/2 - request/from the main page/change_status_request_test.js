/*
    On the main page
 */
describe("Test change request status", () => {
  beforeEach(() => {
    cy.loginAsHR();
  });

  it("redirect to requests page", () => {
    cy.visit("");
    cy.url().should("include", "/requests");
  });

  it("show change status Request modal", () => {
    // sort datatable
    cy.get("thead").contains("Status").click();

    cy.get('[data-test="show-change-status-request"]').first().click();
  });

  it("change to Hr Reviewed status", () => {
    cy.get('[data-test="Hr Reviewed"]').click();
  });

  it("check if status has been changed", () => {
    // sort to get the last request updated
    cy.get("thead").contains("Date").click().click();

    cy.get("td")
      .get('[data-test="show-change-status-request"]')
      .first()
      .should("contain", "Hr Reviewed");
  });

  it("check if log has been created", () => {
    cy.get('[data-test="show-logs"]').first().click();
    cy.get('[data-test="request-log"]')
      .first()
      .should("contain", 'Request status updated to "HR Reviewed"');
  });
});
