# AutoQuotes monorepo

Capstone project - Seneca SIA CPA PRJ666 course

## Development Environment

## Usage

All of the following will have to be prefixed with `yarn run`

| Script name           | Usaged by other script  | Indended                  | Description                                                   |
| --------------------- | ----------------------- | ------------------------- | ------------------------------------------------------------- |
| production            |                         | Production system startup | Executed on the Heroku dyno, builds all FE, starts BE and CDN |
| test                  |                         | CI testing                | Executes all e2e test suites (run by CI/CD)                   |
| build:frontend:all    | `production`            |                           | Builds all FE                                                 |
| backend:cdn:start     | `production`            |                           | Starts the BE on 8080 and CDN on 80.                          |
| backend:dev           | multiple scripts        |                           | Starts the BE on 8080 and listens to changes                  |
| enduser:dev           |                         | FE development            | Starts BE and enduser FE in dev mode                          |
| enduser:dev:fe        | `enduser:dev`           |                           | Starts FE only                                                |
| enduser:build         | `build:frontend:all`    |                           | Builds FE only                                                |
| enduser:e2e           | `test`                  |                           | Starts e2e tests only in headless mode                        |
| enduser:e2e:dev       | `enduser:e2e:dev:start` |                           | Starts e2e tests only in headed mode                          |
| enduser:e2e:dev:start |                         | E2E test development      | Starts BE, FE and e2e in headed mode                          |
| enduser:e2e:start     | `test`                  |                           | Starts BE, FE and runs e2e in headless mode                   |
| shop:dev              |                         | FE development            | Starts BE and shop FE in dev mode                             |
| shop:dev:fe           | `shop:dev`              |                           | Starts FE only                                                |
| shop:build            | `build:frontend:all`    |                           | Builds FE only                                                |
| shop:e2e              | `test`                  |                           | Starts e2e tests only in headless mode                        |
| shop:e2e:dev          | `shop:e2e:dev:start`    |                           | Starts e2e tests only in headed mode                          |
| shop:e2e:dev:start    |                         | E2E test development      | Starts BE, FE and e2e in headed mode                          |
| shop:e2e:start        | `test`                  |                           | Starts BE, FE and runs e2e in headless mode                   |
| thirdp:dev            |                         | FE development            | Starts BE and third party FE in dev mode (                    |
| thirdp:dev:fe         | `thirdp:dev`            |                           | Starts FE only                                                |
| thirdp:build          | `build:frontend:all`    |                           | Builds FE only                                                |
| thirdp:e2e            | `test`                  |                           | Starts e2e tests only in headless mode                        |
| thirdp:e2e:dev        | `thirdp:e2e:dev:start`  |                           | Starts e2e tests only in headed mode                          |
| thirdp:e2e:dev:start  |                         | E2E test development      | Starts BE, FE and e2e in headed mode                          |
| thirdp:e2e:start      | `test`                  |                           | Starts BE, FE and runs e2e in headless mode                   |
| clean                 |                         | Dev util                  | Removes node_modules in all packages                          |
| format                |                         | Dev util                  | Goes through all code and formats it                          |
| lint                  |                         | CI, Dev util              | Does static code analysis on all code                         |
