import { ROUTES } from "../constants";
import { faker } from "@faker-js/faker";
import { registerNewUser } from "../support/rest-api";

describe("User Registration and Login", () => {
  context("User registration", () => {
    it("TC1: Register with valid credentials", () => {
      const username: string = faker.person.firstName();
      const email: string = faker.internet.email();
      const password: string = faker.internet.password({ length: 8 });

      cy.visit(ROUTES.REGISTER);

      cy.register(username, email, password);
      cy.get(".navbar").contains(username);

      cy.url().should("match", /\/#\/$/);
    });
  });

  context("User registration - negative cases", () => {
    it("TC2: Register with existing email", () => {
      cy.visit(ROUTES.REGISTER);

      cy.register("foo", "foo@example.com", faker.internet.password());

      cy.contains("username has already been taken");
      cy.contains("email has already been taken");
    });

    it("TC3: Register with missing information", () => {
      cy.visit(ROUTES.REGISTER);

      //Without any information
      cy.get('[type="submit"]').contains("Sign up").should("be.disabled");

      //Without username
      cy.get('[placeholder="Email"]').type(faker.internet.email());
      cy.get('[placeholder="Password"]').type(faker.internet.password());
      cy.get('[type="submit"]').contains("Sign up").should("be.disabled");

      //Without email
      cy.get('[placeholder="Your Name"]').type(faker.person.firstName());
      cy.get('[placeholder="Email"]').clear();
      cy.get('[type="submit"]').contains("Sign up").should("be.disabled");
    });

    //Test will pass even when manually user have to put at least 8 characters password
    it.skip("TC4: Register with invalid password", () => {
      cy.visit(ROUTES.REGISTER);

      cy.register(
        faker.person.firstName(),
        faker.internet.email(),
        faker.internet.password({ length: 7 })
      );

      cy.get('[type="submit"]').contains("Sign up").click();
    });

    it("TC5: Redirection from Sign in screen", () => {
      cy.visit(ROUTES.LOGIN);

      cy.contains("Need an account?").click();
      cy.get("h1").contains("Sign up");
    });
  });

  context("User Login/Logout", () => {
    const username: string = faker.person.firstName();
    const email: string = faker.internet.email();
    const password: string = faker.internet.password();

    before("Register user", () => {
      registerNewUser(email, username, password);
    });

    beforeEach("Redirect to login page", () => {
      cy.visit(ROUTES.LOGIN);
    });

    it("TC6: Login with correct credentials", () => {
      cy.login(email, password);
      cy.get(".navbar").contains(username);
    });

    it("TC7: Login with incorrect email", () => {
      cy.login(`test${email}`, password);
      cy.contains("email or password is invalid");
    });

    it("TC8: Login with incorrect password", () => {
      cy.login(email, `test${password}`);
      cy.contains("email or password is invalid");
    });

    it("TC9: Logout User", () => {
      cy.login(email, password);
      cy.get(".navbar").contains(username);
      cy.get(`[href="${ROUTES.SETTINGS}"]`).click();

      cy.get("button").contains("Or click here to logout.").click();
      cy.url().should("match", /\/#\/$/);
    });

    it("TC11: Login/Registration screen is unavailable", () => {
      cy.login(email, password);
      cy.get(".navbar").contains(username);

      cy.visit(ROUTES.REGISTER);
      cy.url().should("match", /\/#\/$/);

      cy.visit(ROUTES.LOGIN);
      cy.url().should("match", /\/#\/$/);
    });
  });

  context("User redirection from Sign up to Sign in screen", () => {
    it("TC10: Redirection from Sign up screen", () => {
      cy.visit(ROUTES.REGISTER);
      cy.url().should("contains", ROUTES.REGISTER);

      cy.contains("Have an account?").click();
      cy.get("h1").contains("Sign in");
    });
  });
});
