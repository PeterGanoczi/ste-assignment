# Software Test Engineer Assignment

<br /><br /><br />
<p align="center">
<img src="assets/vestberry-logo.svg" width="300" align="center" alt="Vestberry logo" />
</p>
<br /><br />

# Objectives

1. Run the app locally.
2. Prepare test coverage (simple test cases) and add it to the source code
   as `test-plan.md`.
3. Automate as many TCs from the test coverage as you can.

### [*Not required*] Bonus points 

- Automate the entire test plan.
- Add [cypress command](https://docs.cypress.io/api/cypress-api/custom-commands), e.g. for setting up the test preconditions, etc.
- Use [faker-js](https://www.npmjs.com/package/@faker-js/faker) to fake the data in your tests.
- Use any [Cypress plugin](https://docs.cypress.io/plugins/directory), e.g. [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events)

## Guidelines for submission

1. Clone this repository into your private repository on your own account.
2. Create new branch and start working on the challenge.
3. Once you are done, make a Pull Request from the new branch to the main
   branch. 
4. Do not forget to provide the access to your repository for:
    - [peterdrobec](https://github.com/peterdrobec)
    - [martinorolin](https://github.com/orolinm12)

<br />

# Getting started

## Installation

To get the frontend running locally:

```bash
npm install

# if any dependency error
npm install --force
```

## Run the server

```bash
# run local server
npm run dev

# or run build 
npm run build
```

## Run the tests

```bash
npm cy:run  # all in headless mode
```

<br /><br /><br />
<p align="center">
<img src="assets/realworld-expample-app-logo.png" width="500" align="center" alt="RealWorld example app logo" />
</p>
<br /><br />

> ### [Vue3](https://v3.vuejs.org/) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

- [Demo](https://vue3-realworld-example-app-mutoe.vercel.app)
- [RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **Vue3** including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.
