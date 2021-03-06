# RS School REST service NestJS Migration

## Description

The following is a step-by-step guide to using the RS School REST service with Docker and Auth.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js version 16.13.0 or newer - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker version 20.10 or newer - [Download & Install Docker](https://docs.docker.com/desktop/windows/install/).

## Downloading project

```sh
git clone https://github.com/unpin/nodejs2021Q4-service.git
cd nodejs2021Q4-service     # Change directory to the project folder
git switch nestjs           # Switch to the `nestjs` branch
```

## Running application inside a Docker container

```sh
npm run docker:up           # build and run the Docker container
npm run docker:down         # stop Docker container and clean DB storage
```

> Before running the command make sure that Docker is installed and running.

After running script `npm docker:up` the application will run on port (4000 as default) or you can specify the port number in the .env file located in the root folder of the project.

## Test Docker Application

1. Run application using `npm run docker:up`
2. Go to project folder and run `npm install` to install dependencies
3. Run `npm run test:auth` to run test suites

<br>

# Running the application locally

```sh
git clone https://github.com/unpin/nodejs2021Q4-service.git
cd nodejs2021Q4-service     # Change directory to the project folder
git switch nestjs           # Switch to the `auth` branch
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start:dev              # Run application in development mode

Or run in production mode:

npm build                  # Build application for production
npm start:prod             # Run application in production mode
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Performance comparison

### Express |

|                                                      |         |
| ---------------------------------------------------- | ------- |
| errors.ECONNREFUSED                                  | 35      |
| http.codes.200                                       | 5444    |
| http.codes.201                                       | 8130    |
| http.request_rate                                    | 122/sec |
| http.requests                                        | 13708   |
| http.response_time                                   |         |
| min                                                  | 1       |
| max                                                  | 5194    |
| median                                               | 497.8   |
| p95                                                  | 4583.6  |
| p99                                                  | 4867    |
| http.responses                                       | 13574   |
| vusers.completed                                     | 5444    |
| vusers.created                                       | 5579    |
| vusers.created_by_name.Login and get users           | 2810    |
| vusers.created_by_name.Login, create and delete user | 2769    |
| vusers.failed                                        | 35      |
| vusers.session_length                                |
| min                                                  | 11.7    |
| ma                                                   | 6469.5  |
| median                                               | 4231.1  |
| p95                                                  | 5487.5  |
| p99                                                  | 5826.9  |

### Fastify

|                                                      |         |
| ---------------------------------------------------- | ------- |
| http.codes.200                                       | 6000    |
| http.codes.201                                       | 8936    |
| http.request_rate                                    | 125/sec |
| http.requests                                        | 14936   |
| http.response_time                                   |         |
| min                                                  | 0       |
| max                                                  | 1457    |
| median                                               | 4       |
| p95                                                  | 837.3   |
| p99                                                  | 1176.4  |
| http.responses                                       | 14936   |
| vusers.completed                                     | 6000    |
| vusers.created                                       | 6000    |
| vusers.created_by_name.Login and get users           | 3064    |
| vusers.created_by_name.Login, create and delete user | 2936    |
| vusers.session_length                                |         |
| min                                                  | 5.1     |
| max                                                  | 2634.9  |
| median                                               | 16      |
| p95                                                  | 1587.9  |
| p99                                                  | 1939.5  |

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
