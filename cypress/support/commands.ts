import { ROUTES } from "../constants.ts";

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): void;
      register(username: string, email: string, password: string): void;
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.get('[type="email"]').type(email);
  cy.get('[type="password"]').type(password);

  cy.get('[type="submit"]').contains("Sign in").click();
});

Cypress.Commands.add(
  "register",
  (username: string, email: string, password: string) => {
    cy.get('[placeholder="Your Name"]').type(username);
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Password"]').type(password);

    cy.get('[type="submit"]').contains("Sign up").click();
  }
);

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
