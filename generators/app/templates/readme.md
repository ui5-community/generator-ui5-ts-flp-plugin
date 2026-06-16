# Fiori Plugin <%= namespace %>

Insert the purpose of this project and some interesting info here...

## Description

This project demonstrates a TypeScript setup for developing UI5 plugin.

## Requirements

Either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for dependency management.

## Preparation

Use `npm` (or `yarn`) to install the dependencies:

```sh
npm install
```

(To use yarn, just do `yarn` instead.)

## Run the Plugin

Execute the following command to run the plugin locally for development in watch mode (the browser reloads the plugin automatically when there are changes in the source code):

```sh
npm start
```

As shown in the terminal after executing this command, the plugin is then running on http://localhost:8080/index.html. A browser window with this URL should automatically open.

(When using yarn, do `yarn start` instead. Also for all commands below, you can just replace `npm` by `yarn` in this case.)

## Debug the Plugin

In the browser, you can directly debug the original TypeScript code, which is supplied via sourcemaps (need to be enabled in the browser's developer console if it does not work straight away). If the browser doesn't automatically jump to the TypeScript code when setting breakpoints, use e.g. `Ctrl`/`Cmd` + `P` in Chrome to open the `*.ts` file you want to debug.

## Build the Plugin

### Unoptimized (but quick)

Execute the following command to build the project and get an plugin that can be deployed:

```sh
npm run build
```

### Optimized

For an optimized self-contained build (takes longer because the UI5 resources are built, too), do:

```sh
npm run build:opt
```

## Test the plugin

### Run the Tests

To run all tests, do:

```sh
npm test
```

This includes linting and running the unit and integration tests. After the tests have completed, the task ends, so this can be used for automated tests in a continuous integration scenario.

### Check the Code

Do the following to run a TypeScript check:

```sh
npm run ts-typecheck
```

This checks the pluginlication code for any type errors (but will also complain in case of fundamental syntax issues which break the parsing).

To lint the TypeScript code, do:

```sh
npm run lint
```

## License

This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
