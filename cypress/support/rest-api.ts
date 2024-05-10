import { faker } from "@faker-js/faker";
import { UserProfileResponse, UserResponse } from "./models/user.model";
import { ArticleRequest } from "./models/article.model";

export function registerNewUser(
  email: string = faker.internet.email(),
  username: string = faker.person.firstName(),
  password: string = faker.internet.password()
): Cypress.Chainable<UserResponse> {
  return cy
    .request<UserResponse>({
      method: "POST",
      url: "https://api.realworld.io/api/users",
      body: {
        user: {
          email: email,
          password: password,
          username: username,
        },
      },
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      return response.body;
    });
}

export function getUserProfile(username: string): UserProfileResponse {
  let userProfile: UserProfileResponse = <UserProfileResponse>{};
  cy.request(
    "POST",
    `https://api.realworld.io/api/profiles/${username}`,
    {}
  ).then((response) => {
    expect(response.status).to.eq(201);
    userProfile = response.body;
  });

  return userProfile;
}

export function createArticle(article: ArticleRequest, token: string) {
  cy.request({
    method: "POST",
    url: "https://api.realworld.io/api/articles",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: article,
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
}
