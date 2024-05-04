import { appConstants } from "../../src/constants/app.constant";

const testName = "Test 1";
describe("Todo overall application", () => {
  it("on initial load, ui should render correctly", () => {
    cy.visit("http://localhost:3000/");

    cy.get(`[data-testid="app-title"]`)
      .should("exist")
      .should("contain", appConstants.label.title);

    cy.get(`[data-testid="add-todo-input"]`).should("exist");

    cy.get(`[data-testid="add-todos"]`)
      .should("exist")
      .should("contain", appConstants.label["add-task"]);

    cy.get(`[data-testid="no-todos"]`)
      .should("exist")
      .should("contain", appConstants.label["no-todos"]);
  });

  it("on add todo, todo should add to the list and able to perform all actions", () => {
    cy.visit("http://localhost:3000/");

    cy.get(`[data-testid="app-title"]`)
      .should("exist")
      .should("contain", appConstants.label.title);

    cy.get(`[data-testid="add-todo-input"]`).should("exist").type(testName);

    cy.get(`[data-testid="add-todos"]`).should("exist").click();

    cy.get(`[data-testid="no-todos"]`).should("not.exist");

    cy.get(`[data-testid="checkbox"]`).should("exist");
    cy.get(`[data-testid="todo-content"]`)
      .should("exist")
      .should("contain", testName);
    cy.get(`[data-testid="todo-content"]`).should(
      "not.have.css",
      "text-decoration",
      "line-through solid rgba(0, 0, 0, 0.88)"
    );
    cy.get(`[data-testid="checkbox"]`).should("exist").click();
    cy.get(`[data-testid="todo-content"]`).should(
      "have.css",
      "text-decoration",
      "line-through solid rgba(0, 0, 0, 0.88)"
    );
  });

  it.only("list should able to handle large data tests", () => {
    cy.visit("http://localhost:3000/");

    cy.get(`[data-testid="app-title"]`)
      .should("exist")
      .should("contain", appConstants.label.title);

    for (let i = 0; i < 30; i++) {
      const name = `Test ${i + 1}`;
      cy.get(`[data-testid="add-todo-input"]`).should("exist").type(name);

      cy.get(`[data-testid="add-todos"]`).should("exist").click();

      cy.get(`[data-testid="no-todos"]`).should("not.exist");
      cy.get(`[data-testid="checkbox"]`).should("exist");
      cy.get(`[data-testid="todo-content"]`)
        .should("exist")
        .should("contain", name);
    }
    cy.get("[data-testid='todo-skeleton']").should("not.exist");

    const scrollToBottom = () => {
      cy.get(".ReactVirtualized__Grid").should("exist").scrollTo("bottom");
    };

    cy.get("[data-testid='todo-skeleton']").should("not.exist");
    const checkForSkeleton = () => {
      cy.get("[data-testid='todo-skeleton']").should("exist");
    };

    Promise.all([scrollToBottom, checkForSkeleton]);

    cy.get("[data-testid='todo-skeleton']").should("not.exist");
  });
});
