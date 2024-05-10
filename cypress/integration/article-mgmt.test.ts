import { faker } from "@faker-js/faker";
import { ROUTES } from "../constants";
import { UserResponse } from "../support/models/user.model";
import { createArticle, registerNewUser } from "../support/rest-api";
import { getTodayInFormat } from "../support/date.helper";
import { ArticleRequest } from "../support/models/article.model";

describe("Article Management", () => {
  context("Article creation", () => {
    let email: string = faker.internet.email();
    let username: string = faker.person.firstName();
    let password: string = faker.internet.password();

    before("Register user", () => {
      registerNewUser(email, username, password);
    });

    beforeEach("Login user", () => {
      cy.visit(ROUTES.LOGIN);
      cy.login(email, password);
      cy.url().should("match", /\/#\/$/);
    });

    it("TC15: Create new article", () => {
      const title = faker.lorem.word();
      const about = faker.lorem.words();
      const text = faker.lorem.paragraph();
      const tag = faker.lorem.word();

      cy.visit(ROUTES.CREATE_ARTICLE);

      //Create article
      cy.get('[placeholder="Article Title"').type(title);
      cy.get('[placeholder="What\'s this article about?"').type(about);
      cy.get('[placeholder="Write your article (in markdown)"').type(text);
      cy.get('[placeholder="Enter tags"').type(tag);

      cy.get("button").contains("Publish Article").click();

      cy.url().should("contains", `/#/article/${title}`);

      //Verify article details and article screen
      cy.get(".author").contains(username).should("be.visible");
      cy.get(".date").contains(getTodayInFormat()).should("be.visible");
      cy.get("h1").contains(title).should("be.visible");
      cy.get("p").contains(text).should("be.visible");
      cy.get("li").contains(tag).should("be.visible");

      cy.get('[aria-label="Delete article"]')
        .should("have.have.length", 2)
        .and("be.visible");
      cy.get('[aria-label="Edit article"]')
        .should("have.have.length", 2)
        .and("be.visible");
      cy.get('[aria-label="Favorite article"]')
        .should("have.have.length", 2)
        .and("be.visible");
      cy.get('[placeholder="Write a comment..."]').should("be.visible");
      cy.get('[aria-label="Submit"]')
        .contains("Post Comment")
        .should("be.disabled");
    });

    it("TC16: Create article with missing title, about or text", () => {
      const title = faker.lorem.word();
      const about = faker.lorem.words();
      const text = faker.lorem.paragraph();
      const tag = faker.lorem.word();

      cy.visit(ROUTES.CREATE_ARTICLE);

      //User attempts to create article without title
      cy.get('[placeholder="What\'s this article about?"').type(about);
      cy.get('[placeholder="Write your article (in markdown)"').type(text);
      cy.get('[placeholder="Enter tags"').type(tag);

      cy.get("button").contains("Publish Article").should("be.disabled");

      //User attempts to create article without about
      cy.get('[placeholder="Article Title"').type(title);
      cy.get('[placeholder="What\'s this article about?"').clear();

      cy.get("button").contains("Publish Article").should("be.disabled");

      //User attempts to create article without text
      cy.get('[placeholder="What\'s this article about?"').type(about);
      cy.get('[placeholder="Write your article (in markdown)"').clear();

      cy.get("button").contains("Publish Article").should("be.disabled");
    });

    it("TC17: Create article with missing tags", () => {
      const title = faker.lorem.word();
      const about = faker.lorem.words();
      const text = faker.lorem.paragraph();
      const tag = faker.lorem.word();

      cy.visit(ROUTES.CREATE_ARTICLE);

      //User attempts to create article without title
      cy.get('[placeholder="Article Title"').type(title);
      cy.get('[placeholder="What\'s this article about?"').type(about);
      cy.get('[placeholder="Write your article (in markdown)"').type(text);

      cy.get("button").contains("Publish Article").click();

      cy.url().should("contains", `/#/article/${title}`);

      //Verify article details and article screen
      cy.get(".author").contains(username).should("be.visible");
      cy.get(".date").contains(getTodayInFormat()).should("be.visible");
      cy.get("h1").contains(title).should("be.visible");
      cy.get("p").contains(text).should("be.visible");
    });
  });

  context("Article update/delete", () => {
    let email: string = faker.internet.email();
    let username: string = faker.person.firstName();
    let password: string = faker.internet.password();
    let user: UserResponse;

    const title = faker.lorem.word();
    const about = faker.lorem.words();
    const text = faker.lorem.paragraph();
    const tag = faker.lorem.word();

    let article: ArticleRequest = {
      article: {
        body: text,
        description: about,
        tagList: [tag],
        title: title,
      },
    };

    before("Register user", () => {
      registerNewUser(email, username, password).then((response) => {
        user = response;
      });
    });

    beforeEach("Login user", () => {
      cy.visit(ROUTES.LOGIN);
      cy.login(email, password);
      cy.url().should("match", /\/#\/$/);
    });

    beforeEach("Create new article", () => {
      createArticle(article, user.user.token);
    });

    it("TC18: Update existing article", () => {
      const updateTitle = faker.lorem.word();
      const updateAbout = faker.lorem.words();
      const updateText = faker.lorem.paragraph();
      const updateTag = faker.lorem.word();

      cy.get('[aria-label="profile"]').contains(username).click();
      cy.url().should("contains", `/#/profile/${username}`);
      cy.get("h1").contains(title).click();

      cy.get('[aria-label="Edit article"]').eq(0).click();

      //Update article
      cy.wait(2000); //TODO: temporary solution
      cy.get('[placeholder="Article Title"').clear().type(updateTitle);
      cy.get('[placeholder="What\'s this article about?"')
        .clear()
        .type(updateAbout);
      cy.get('[placeholder="Write your article (in markdown)"')
        .clear()
        .type(updateText);
      cy.get('[placeholder="Enter tags"').clear().type(updateTag);

      cy.get("button").contains("Publish Article").click();

      cy.url().should("contains", `/#/article/${updateTitle}`);

      //Verify article details and article screen
      cy.get(".author").contains(username).should("be.visible");
      cy.get(".date").contains(getTodayInFormat()).should("be.visible");
      cy.get("h1").contains(updateTitle).should("be.visible");
      cy.get("p").contains(updateText).should("be.visible");
      cy.get("li").contains(updateTag).should("be.visible");
    });

    it("TC19: Delete article", () => {
      cy.get('[aria-label="profile"]').contains(username).click();
      cy.url().should("contains", `/#/profile/${username}`);
      cy.get("h1").contains(title).click();

      cy.get('[aria-label="Delete article"]').eq(0).click();
      cy.visit(`${ROUTES.PROFILE}/${username}`);
      cy.contains("No articles are here... yet.");
    });
  });
});
