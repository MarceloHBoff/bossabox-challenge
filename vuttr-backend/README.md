<div align="center">
  <img src="./.github/assets/logo.svg" />

  <div>VUTTR</div>
  Very Useful Tools to Remember
</div>

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=vuttr&uri=https%3A%2F%2Fraw.githubusercontent.com%2FMarceloHBoff%2Fvuttr-backend%2Fmaster%2Finsomnia.json)

<p align="center">
  <img alt="GitHub top languages" src="https://img.shields.io/github/languages/top/MarceloHBoff/vuttr-backend.svg">

  <img alt="GitHub count languages" src="https://img.shields.io/github/languages/count/MarceloHBoff/vuttr-backend.svg">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/MarceloHBoff/vuttr-backend.svg">

  <img alt="GitHub license" src="https://img.shields.io/github/license/MarceloHBoff/vuttr-backend.svg">
</p>

---

<h2>📔 Description</h2>

#### This application is a simple tool organizer. You can create tools and save to the database to remember. In addition to being asked to complete the challenge, there is the option to add tools in favorite and for that was created a login page and session control. The application was developed for the bossabox challenge.

---

<h2>🚀 Technologies</h2>

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org)
- [Express](https://expressjs.com/pt-br/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Typeorm](https://typeorm.io/#/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

<h2>❓ How to use</h2>

You need a postgres instance running on 5432 port

```bash
# Clone this repository
$ git clone https://github.com/MarceloHBoff/vuttr-backend

# Go into the repository
$ cd vuttr-backend

# Install dependencies for the backend
$ yarn

# Create database with name 'vuttr'
# Run database migrations
$ yarn typeorm migration:run

# Run the backend server on port 3000
$ yarn dev

# Go to http://localhost:3000/api-docs to see the api documentation
```

Made with love by [Marcelo Boff!](https://www.linkedin.com/in/marcelo-boff)
