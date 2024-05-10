import { ROUTES } from "../constants";

describe("Reading and interacting with articles", () => {
  context("Articles", () => {
    before("Open home page", () => {
      cy.visit(ROUTES.HOME);
    });

    it("TC20: Read articles from other users", () => {
      cy.get('[aria-label="article"]').first().click();
      cy.wait(2000); //TODO: temporary solution
      cy.get("h1").invoke("text").should("not.be.empty");
      cy.get("p").invoke("text").should("not.be.empty");
    });
  });
});
