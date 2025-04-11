<p align="center">
    <img alt="DIVE logo" src="./assets/svg/dive.svg" style="width: 100%; height: auto; max-height: 500px;">
</p>

<p align="center">
    <a href="#badge">
        <img alt="dive: npm" src="https://img.shields.io/npm/v/%40shopware-ag%2Fdive">
    </a>
    <a href="#badge">
        <img alt="dive: license" src="https://img.shields.io/npm/l/%40shopware-ag%2Fdive">
    </a>
    <a href="#badge">
        <img alt="dive: types" src="https://img.shields.io/npm/types/%40shopware-ag%2Fdive">
    </a>
    <a href="#badge">
        <img alt="dive: types" src="https://img.shields.io/codecov/c/github/shopware/dive">
    </a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Module System and Build Process](#module-system-and-build-process)
  - [Module Exports](#module-exports)
  - [Build Process](#build-process)
  - [Development Workflow](#development-workflow)
- [Using yalc for local development](#using-yalc-for-local-development)
- [Setup in Shopware](#setup-in-shopware)
- [Usage](#usage)
  - [Quick View](#quick-view)
  - [Example with Error Handling:](#example-with-error-handling)
  - [Getting started](#getting-started)
    - [Import:](#import)
    - [Instantiate:](#instantiate)
  - [Actions](#actions)
    - [Actions List](#actions-list)
- [Unit Tests](#unit-tests)
- [Formatting](#formatting)

## About

DIVE is a spatial framework made by and optimized for Shopware. It can be used
directly integrated in a Shopware frontend such as Storefront or in any other
frontend you want to use it in, it is not tied to Shopware.

DIVE supplies your frontend application with all needed tooling to set up a
basic 3D application with event-based controls called "Actions". For further
information, see [Getting started](#getting-started).

## Installation

The `@shopware-ag/dive` package can be installed via

```bash
npm install @shopware-ag/dive

or

yarn add @shopware-ag/dive
```

## Module System and Build Process

DIVE uses a modern module system with support for both ESM and CommonJS formats. The package is built using Vite and supports the following module formats:

-   ESM (`.mjs` files)
-   CommonJS (`.cjs` files)
-   TypeScript type definitions (`.d.ts` files)

### Module Exports

The package exports are configured in `package.json` to support both direct imports and module-specific imports:

```json
{
    "exports": {
        ".": {
            "types": "./build/index.d.ts",
            "import": "./build/index.mjs",
            "require": "./build/index.cjs"
        },
        "./modules/*": {
            "types": "./build/modules/*.d.ts",
            "import": "./build/modules/*.mjs",
            "require": "./build/modules/*.cjs"
        }
    }
}
```

This configuration allows you to:

-   Import the main package: `import { DIVE } from '@shopware-ag/dive'`
-   Import specific modules: `import { ModuleName } from '@shopware-ag/dive/modules/ModuleName'`

### Build Process

The build process is handled by Vite and can be triggered using:

```bash
yarn build        # One-time build
yarn dev          # Watch mode for development
```

The build process:

1. Compiles TypeScript code
2. Generates type definitions
3. Creates both ESM and CommonJS versions of the code
4. Places all output in the `build/` directory

### Development Workflow

For local development, you can use the watch mode to automatically rebuild when files change:

```bash
yarn dev
```

This is particularly useful when working with the module system as it ensures your changes are immediately reflected in the build output.

## Using yalc for local development

[Yalc](https://github.com/wclr/yalc) is the recommended way to test local changes in your project. It provides better dependency management and more reliable linking than npm link.

First, install yalc globally if you haven't already:

```bash
npm install -g yalc
```

Then, in your DIVE project directory:

```bash
# Publish the package to yalc's local store
yalc publish

# In your project that uses DIVE:
yalc add @shopware-ag/dive
```

When you make changes to DIVE, you'll need to:

```bash
# In DIVE directory:
yalc push

# Or if you want to republish:
yalc publish --force
```

To remove the local package from your project:

```bash
yalc remove @shopware-ag/dive
```

Benefits of using yalc:

-   Better dependency management
-   More reliable than npm link
-   Works well with package managers (npm, yarn, pnpm)
-   Maintains proper package.json dependencies
-   Supports multiple projects using the same local package

## Setup in Shopware

Don't forget to include DIVE in your `webpack.config.js`:

```js
const path = require('path');

module.exports = () => {
    return {
        // Other configurations...
        resolve: {
            extensions: [
                '.ts',
                '.cjs',
                '.js',
            ],
            alias: {
                three: path.resolve(__dirname, 'path/to/node_modules/three'),
                '@shopware-ag/dive': path.resolve(
                    __dirname,
                    'path/to/node_modules/@shopware-ag/dive',
                ),
            },
        },
        module: {
            rules: [
                // Other rules...
                {
                    test: /\.(js|ts)$/,
                    loader: 'swc-loader',
                    include: [
                        path.resolve(__dirname, 'path/to/node_modules/three'),
                        path.resolve(
                            __dirname,
                            'path/to/node_modules/@shopware-ag/dive',
                        ),
                    ],
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                            },
                            target: 'es2022',
                        },
                    },
                },
                // Other rules...
            ],
        },
    };
};
```

## Usage

### Quick View

QuickView is used to quickly display your assets with as few lines of code as
possible. Simply call the static `QuickView()` method, with your data URI as a
parameter, to create an instance of DIVE with your asset to use in further code.

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = DIVE.QuickView('your/asset/uri.glb'); // <-- call QuickView()

const myCanvasWrapper = document.createElement('div');
myCanvasWrapper.appendChild(dive.Canvas);
```

### Example with Error Handling:

```ts
import { DIVE } from '@shopware-ag/dive';

try {
    const dive = DIVE.QuickView('your/asset/uri.glb'); // <-- call QuickView()

    const myCanvasWrapper = document.createElement('div');
    myCanvasWrapper.appendChild(dive.Canvas);
} catch (error) {
    console.error('Failed to load asset:', error);
}
```

### Getting started

#### Import:

```ts
import { DIVE } from '@shopware-ag/dive'; // <-- import DIVE
```

#### Instantiate:

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = new DIVE(); // <-- instantiate DIVE
```

DIVE supplies your application with a HTMLCanvasElement that it uses as a render
target. After instantiating, you can use the supplied canvas within your frontend
code to attach it to your DOM.

```ts
const dive = new DIVE();

const myCanvasWrapper = document.createElement('div'); // <-- create wrapper element
myCanvasWrapper.appendChild(dive.Canvas); // <-- reference DIVE canvas
```

To interact with your newly created DIVE instance you have to perform actions
via DIVECommunication. For further information, see [Actions](#actions).

```ts
const dive = new DIVE();

const myCanvasWrapper = document.createElement('div');
myCanvasWrapper.appendChild(dive.Canvas);

const com = dive.Communication; // <-- reference DIVECommunication

com.PerformAction('SET_CAMERA_TRANSFORM', {
    // <-- perform action on DIVECommunication
    position: { x: 0, y: 2, z: 2 },
    target: { x: 0, y: 0.5, z: 0 },
});
```

### Actions

Actions symbolize the communication between frontend and 3D space. All actions
can be performed anywhere, no matter if you are in frontend or 3D.

In addition to the impact that specific actions have, every action can be
subscribed to.

```ts
const myCanvasWrapper = document.createElement('div');
const dive = new DIVE();

myCanvasWrapper.appendChild(dive.Canvas);

const com = dive.Communication;

com.Subscribe('SET_CAMERA_TRANSFORM', () => {
    // <-- add subscription
    // do something
});

com.PerformAction('SET_CAMERA_TRANSFORM', {
    position: { x: 0, y: 2, z: 2 },
    target: { x: 0, y: 0.5, z: 0 },
});
```

Subscribing to an action returns a `unsubscribe()`-callback that should be
executed when not needed anymore.

```ts
const myCanvasWrapper = document.createElement('div');
const dive = new DIVE();

myCanvasWrapper.appendChild(dive.Canvas);

const com = dive.Communication;

const unsubscribe = com.Subscribe('SET_CAMERA_TRANSFORM', () => {
    // <-- save unsubscribe callback
    // do something
});

com.PerformAction('SET_CAMERA_TRANSFORM', {
    position: { x: 0, y: 2, z: 2 },
    target: { x: 0, y: 0.5, z: 0 },
});

unsubscribe(); // <-- execute unsubscribe callback when done
```

#### Actions List

In the following you find a list of all available actions to perform on
DIVECommunication class via
[`com.PerformAction()`](https://github.com/shopware/dive/blob/2e193c58843939ce07a1d35bfbd5b3c9d26eeeca/src/com/Communication.ts#L85).

<!-- INSERT_TABLE -->

## Unit Tests

All relevant files are covered by Jest tests. If you find any file that has not been covered yet, feel free to add unit tests accordingly.

If there are any modules that have to be mocked (like `three`) you can create a given file in the `__mocks__` folder in project root. Jest manages to mock modules with a given file with the modules name as a file name (for example `three.ts`). Every export will be part of the modules mock. You don't need to mock the module in your test anymore, you only extend the module mock.

If you have any other things from a module to import, you can simply create a folder structure and place the mock file at the end of your structure. To understand better please take a look at the `__mocks__` folder for yourself.

## Formatting

DIVE uses Prettier as a preconfigured formatter.
