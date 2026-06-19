# generator-ui5-ts-flp-plugin

[![License Status][license-image]][license-url]

[Yeoman](https://yeoman.io/) generator kickstarting the development of Fiori plugins using TypeScript. The generator incorporates the latest best-practices, is using the [UI5 CLI](https://ui5.github.io/cli/) and the UI5 CLI extensions provided by the [UI5 community](https://github.com/ui5-community/ui5-ecosystem-showcase/). It is maintained by the UI5 community and [OpenUI5](https://openui5.org)/[SAPUI5](https://ui5.sap.com) developers. This generator was build as a plug-in for the community project [Easy-UI5](https://github.com/SAP/generator-easy-ui5/) by [SAP](https://github.com/SAP/).

## Usage with Easy-UI5

```bash
$> npm i -g yo generator-easy-ui5
$> yo easy-ui5 ts-flp-plugin

     _-----_
    |       |    ╭──────────────────────────╮
    |--(o)--|    │  Welcome to the easy-ui5 │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
```

After the generation of your project you can use `npm start` (or `yarn start`) to start the local development server.

## Standalone usage

Note the different greeting when the generator starts:

```bash
$> npm i -g yo
$> yo ./generator-ui5-ts-flp-plugin

     _-----_     ╭─────────────────────────────────╮
    |       |    │      Welcome to the             │
    |--(o)--|    │   generator-ui5-ts-flp-plugin   │
   `---------´   │        generator!               │
    ( _´U`_ )    ╰─────────────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
```

## Features

### Plugin type selection

During the generation the generator asks you which kind of FLP plugin you want to scaffold. Choose one of the predefined setups:

- **Launchpad Header Button** – registers an item in the shell header (e.g. via `createHeaderItem` / `addHeaderEndItem`).
- **User Menu Action** – adds an entry to the user actions menu in the shell.
- **Background Service** – a headless plugin that does not render any UI and is meant to perform background work once the shell container is available.

The selected type is stored in the generator configuration and the generated `Component.ts` is pre-filled with a matching runnable skeleton, so you can start implementing your business logic right away.

### UI5 version aware: Extension API with Renderer fallback

The generator targets the SAPUI5 framework version that you provide and adapts the generated code to the available APIs:

- For **UI5 >= 1.120** the modern [`sap.ushell.services.Extension`](https://ui5.sap.com/#/api/sap.ushell.services.Extension) API is used (`Container.getServiceAsync("Extension")` together with `createHeaderItem` / `createUserAction`). This is the recommended way to extend the Fiori Launchpad on newer releases.
- For **older UI5 versions** the generator falls back to direct renderer access via `sap.ushell.renderers.fiori2.Renderer` (`addHeaderEndItem`, `addUserAction`, …) so the same plugin types can also be built against legacy launchpads.

You don't have to choose the API yourself – the generator picks the right one based on the framework version you entered during scaffolding.

**Note:** Fiori Launchpad plugins require SAPUI5. They are not available in OpenUI5, because sap.ushell is not part of the OpenUI5 distribution.

## Support

Please use the GitHub bug tracking system to post questions, bug reports or to create pull requests.

## Contributing

We welcome any type of contribution (code contributions, pull requests, issues) to this generator equally.

## License

This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the LICENSE file.

[license-image]: https://img.shields.io/github/license/ui5-community/generator-ui5-ts-flp-plugin.svg
[license-url]: https://github.com/ui5-community/generator-ui5-ts-flp-plugin/blob/main/LICENSE
