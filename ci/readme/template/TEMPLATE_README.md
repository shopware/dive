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
</p>

# About

DIVE is a spatial framework made by and optimized for Shopware. It can be used
directly integrated in a Shopware frontend such as Storefront or in any other
frontend you want to use it in, it is not tied to Shopware.

DIVE supplies your frontend application with all needed tooling to set up a
basic 3D application with event-based controls called "Actions". For further
information, see [Getting started](#getting-started).

# Installation

#### npm:

```
npm install @shopware-ag/dive
```

#### yarn:

```
yarn add @shopware-ag/dive
```

#### Setup in Shopware

Don't forget to include DIVE in your webpack.config.js:

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

# Usage

## Quick View

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

## Getting started

### Import:

```ts
import { DIVE } from '@shopware-ag/dive'; // <-- import DIVE
```

### Instantiate:

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

## Actions

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

### Actions List

In the following you find a list of all available actions to perform on
DIVECommunication class via
[`com.PerformAction()`](https://github.com/shopware/dive/blob/2e193c58843939ce07a1d35bfbd5b3c9d26eeeca/src/com/Communication.ts#L85).

<!-- INSERT_TABLE -->

# Unit Tests

All relevant files are covered by Jest tests. If you find any file that has not been covered yet, feel free to add unit tests accordingly.

If there are any modules that have to be mocked (like `three`) you can create a given file in the `__mocks__` folder in project root. Jest manages to mock modules with a given file with the modules name as a file name (for example `three.ts`). Every export will be part of the modules mock. You don't need to mock the module in your test anymore, you only extend the module mock.

If you have any other things from a module to import, you can simply create a folder structure and place the mock file at the end of your structure. To understand better please take a look at the `__mocks__` folder for yourself.

# Formatting

DIVE uses Prettier as a preconfigured formatter.
