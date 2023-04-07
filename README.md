# AutoQuotes monorepo

Capstone project - Seneca SIA CPA PRJ666 course

## Demo Deployment URLs

| Interface      | Url                          |
| -------------- | ---------------------------- |
| End-user       | http://sixix.denke.hu        |
| Mechanic shop  | http://shop.sixix.denke.hu   |
| Third-party UI | http://thirdp.sixix.denke.hu |

## Seed file containing credentials for demo users

!! Users are only re-seeded on a deploy with a new seed version, so if you get locked out please reach out to us so we can re-seed the DB

- [Shop](packages/back-end/src/fixtures/shopUserSeed.json)
- [End-user](packages/back-end/src/fixtures/endUserSeed.json)

### Notes:

- Passwords are hashed in the system you can only see them in cleartext form in the seed file
- Third-party suppliers do not have users, they are authenticated by the `magic link` they get in the email
- To test that functionality:
  - You can set the supplier's email address in the `Shop UI` with an admin user
  - Get a custom quote with an end-user
  - Follow the link in the email

## Usage

All of the following will have to be prefixed with `yarn run`

| Script name           | Usaged by other script  | Indended                         | Description                                  |
| --------------------- | ----------------------- | -------------------------------- | -------------------------------------------- |
| build                 |                         | Heroku production FE build       | Builds all FE                                |
| start                 |                         | Heroku Production system startup | Starts the BE on 8080 and CDN on 80.         |
| test                  |                         | Dev util                         | Executes all e2e test suites (run by CI/CD)  |
| backend:dev           | multiple scripts        |                                  | Starts the BE on 8080 and listens to changes |
| enduser:dev           |                         | FE development                   | Starts BE and enduser FE in dev mode         |
| enduser:dev:fe        | `enduser:dev`           |                                  | Starts FE only                               |
| enduser:build         | `build`                 |                                  | Builds FE only                               |
| enduser:e2e           | `enduser:e2e:start`     |                                  | Starts e2e tests only in headless mode       |
| enduser:e2e:dev       | `enduser:e2e:dev:start` |                                  | Starts e2e tests only in headed mode         |
| enduser:e2e:dev:start |                         | E2E test development             | Starts BE, FE and e2e in headed mode         |
| enduser:e2e:start     | `test`                  | CI                               | Starts BE, FE and runs e2e in headless mode  |
| shop:dev              |                         | FE development                   | Starts BE and shop FE in dev mode            |
| shop:dev:fe           | `shop:dev`              |                                  | Starts FE only                               |
| shop:build            | `build`                 |                                  | Builds FE only                               |
| shop:e2e              | `shop:e2e:start`        |                                  | Starts e2e tests only in headless mode       |
| shop:e2e:dev          | `shop:e2e:dev:start`    |                                  | Starts e2e tests only in headed mode         |
| shop:e2e:dev:start    |                         | E2E test development             | Starts BE, FE and e2e in headed mode         |
| shop:e2e:start        | `test`                  | CI                               | Starts BE, FE and runs e2e in headless mode  |
| thirdp:dev            |                         | FE development                   | Starts BE and third party FE in dev mode (   |
| thirdp:dev:fe         | `thirdp:dev`            |                                  | Starts FE only                               |
| thirdp:build          | `build`                 |                                  | Builds FE only                               |
| thirdp:e2e            | `thirdp:e2e:start`      |                                  | Starts e2e tests only in headless mode       |
| thirdp:e2e:dev        | `thirdp:e2e:dev:start`  |                                  | Starts e2e tests only in headed mode         |
| thirdp:e2e:dev:start  |                         | E2E test development             | Starts BE, FE and e2e in headed mode         |
| thirdp:e2e:start      | `test`                  | CI                               | Starts BE, FE and runs e2e in headless mode  |
| clean                 |                         | Dev util                         | Removes node_modules in all packages         |
| format                |                         | Dev util                         | Goes through all code and formats it         |
| lint                  |                         | CI, Dev util                     | Does static code analysis on all code        |
