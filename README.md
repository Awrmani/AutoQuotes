# AutoQuotes monorepo

Capstone project - Seneca SIA CPA PRJ666 course

## Usage

All of the following will have to be prefixed with `yarn run`

| Script name             | usage                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------- |
| production              | Executed on the Heroku dyno, builds all FE, starts BE and CDN                         |
| test                    | Executes all e2e test suites (run by CI/CD)                                           |
| build:frontend:all      | Builds all FE (Internal use)                                                          |
| backend:start           | Starts the BE on 8080. if REACT_APP_ENVIRONMENT=production, then starts CDN too on 80 |
| enduser:dev             | Starts BE and enduser FE in dev mode (intended for end-user development)              |
| enduser:dev:fe          | Starts FE only (Internal use)                                                         |
| enduser:build           | Builds FE only (Internal use)                                                         |
| enduser:e2e             | Starts e2e tests only in headless mode (Internal use)                                 |
| enduser:e2e:dev:fe      | Starts e2e tests only in headed mode (Internal use)                                   |
| enduser:e2e:dev:start   | Starts BE, FE and e2e in headed mode (intended for e2e test development)              |
| enduser:e2e:start       | Starts BE, FE and runs e2e in headless mode (used by `test`)                          |
| licensing:dev           | Starts BE and licensing FE in dev mode (intended for licensing development)           |
| licensing:dev:fe        | Starts FE only (Internal use)                                                         |
| licensing:build         | Builds FE only (Internal use)                                                         |
| licensing:e2e           | Starts e2e tests only in headless mode (Internal use)                                 |
| licensing:e2e:dev:fe    | Starts e2e tests only in headed mode (Internal use)                                   |
| licensing:e2e:dev:start | Starts BE, FE and e2e in headed mode (intended for e2e test development)              |
| licensing:e2e:start     | Starts BE, FE and runs e2e in headless mode (used by `test`)                          |
| shop:dev                | Starts BE and shop FE in dev mode (intended for shop development)                     |
| shop:dev:fe             | Starts FE only (Internal use)                                                         |
| shop:build              | Builds FE only (Internal use)                                                         |
| shop:e2e                | Starts e2e tests only in headless mode (Internal use)                                 |
| shop:e2e:dev:fe         | Starts e2e tests only in headed mode (Internal use)                                   |
| shop:e2e:dev:start      | Starts BE, FE and e2e in headed mode (intended for e2e test development)              |
| shop:e2e:start          | Starts BE, FE and runs e2e in headless mode (used by `test`)                          |
| thirdp:dev              | Starts BE and third party FE in dev mode (intended for third party development)       |
| thirdp:dev:fe           | Starts FE only (Internal use)                                                         |
| thirdp:build            | Builds FE only (Internal use)                                                         |
| thirdp:e2e              | Starts e2e tests only in headless mode (Internal use)                                 |
| thirdp:e2e:dev:fe       | Starts e2e tests only in headed mode (Internal use)                                   |
| thirdp:e2e:dev:start    | Starts BE, FE and e2e in headed mode (intended for e2e test development)              |
| thirdp:e2e:start        | Starts BE, FE and runs e2e in headless mode (used by `test`)                          |
| clean                   | Removes node_modules in all packages                                                  |
| format                  | Goes through all code and formats it                                                  |
| lint                    | Does static code analysis on all code                                                 |
