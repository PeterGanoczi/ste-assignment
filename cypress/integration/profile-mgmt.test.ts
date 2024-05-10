import { ROUTES } from "../constants";
import { faker } from "@faker-js/faker";
import { registerNewUser } from "../support/rest-api";

describe("User Profile Management", () => {
  context("Update user profile", () => {
    let email: string = faker.internet.email();
    let username: string = faker.person.firstName();
    let password: string = faker.internet.password();

    beforeEach("Register and login user", () => {
      registerNewUser(email, username, password);
      cy.visit(ROUTES.LOGIN);
      cy.login(email, password);
    });

    it("TC12: Update profile information", () => {
      const imageUrl = faker.image.url();
      const username = faker.person.firstName();
      const userBio = faker.person.bio();
      const email = faker.internet.email();
      const password = faker.internet.password();

      cy.get('[href="#/settings"]').click();

      //Update user info
      cy.get('[placeholder="URL of profile picture"').clear().type(imageUrl);
      cy.get('[placeholder="Your name"').clear().type(username);
      cy.get('[placeholder="Short bio about you"').type(userBio);
      cy.get('[placeholder="Email"').clear().type(email);
      cy.get('[placeholder="New Password"').type(password);

      cy.get("button").contains("Update Settings").click();
      cy.get(".navbar").contains(username).click();

      //Verify update was successfull
      cy.get('[aria-label="settings"]').contains("Settings").click();
      cy.get('[placeholder="URL of profile picture"').should(
        "have.value",
        imageUrl
      );
      cy.get('[placeholder="Your name"').should("have.value", username);
      cy.get('[placeholder="Short bio about you"').should(
        "have.value",
        userBio
      );
      cy.get('[placeholder="Email"').should("have.value", email);

      //Logout and login with new credentials
      cy.get("button").contains("Or click here to logout.").click();

      cy.visit(ROUTES.LOGIN);
      cy.login(email, password);
      cy.get(".navbar").contains(username);
    });

    //Not able check input built-in error message
    it("TC13: Update profile with invalid email", () => {
      const email = faker.string.alpha() + "@";

      cy.url().should("match", /\/#\/$/);

      cy.visit(ROUTES.SETTINGS);

      //Update with invalid email
      cy.get('[placeholder="Email"').clear().type(email);

      cy.get("button").contains("Update Settings").click();

      cy.get('[placeholder="Email"').should("have.value", email);
    });

    //BUG: User is able to update password with less than 8 characters
    it("TC14: Update profile with invalid password", () => {
      const password = faker.internet.password({ length: 7 });

      cy.url().should("match", /\/#\/$/);

      cy.visit(ROUTES.SETTINGS);

      //Update with invalid password
      cy.get('[placeholder="New Password"').type(password);

      cy.get("button").contains("Update Settings").click();

      cy.contains("Password must have at least 8 characters.");
    });
  });
});
