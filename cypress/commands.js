Cypress.Commands.add("findByDataTestId", (testId, options) => {
    cy.get(`[data-testid="${testId}"]`, options).should("exist");
  });
  