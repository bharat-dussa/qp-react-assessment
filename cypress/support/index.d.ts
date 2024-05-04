// cypress/support/index.d.ts
declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Find an element by data-testid and assert its existence.
       * @param testId The value of the data-testid attribute.
       * @param options Additional options for cy.get.
       */
      findByDataTestId(testId: string, options?: Partial<Loggable & Timeoutable & Withinable>): Chainable<JQuery<HTMLElement>>;
    }
  }
  