# RS School REST service with Docker and Auth

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
git switch auth             # Switch to the `auth` branch
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

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

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
