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
- [Setup and Maintenance](#setup-and-maintenance)
  - [Installation](#installation)
  - [Module System](#module-system)
    - [Module Exports](#module-exports)
    - [Build Process](#build-process)
    - [Development Workflow](#development-workflow)
  - [Local Development with Yalc](#local-development-with-yalc)
  - [Shopware Integration](#shopware-integration)
  - [Testing and Quality Assurance](#testing-and-quality-assurance)
    - [Unit Tests](#unit-tests)
    - [Code Formatting](#code-formatting)
- [Usage Guide](#usage-guide)
  - [Core Concepts](#core-concepts)
    - [Quick View](#quick-view)
    - [Getting Started](#getting-started)
      - [Import](#import)
      - [Instantiate](#instantiate)
  - [Modules](#modules)
  - [Available Modules](#available-modules)
    - [AssetLoader](#assetloader)
    - [AssetConverter](#assetconverter)
    - [AssetExporter](#assetexporter)
    - [ARSystem](#arsystem)
    - [MediaCreator](#mediacreator)
    - [SystemInfo](#systeminfo)
  - [Actions](#actions)
    - [Basic Usage](#basic-usage)
    - [Subscribing to Actions](#subscribing-to-actions)
    - [Actions List](#actions-list)

## About

DIVE is a spatial framework made by and optimized for Shopware. It can be used directly integrated
in a Shopware frontend such as Storefront or in any other frontend you want to use it in, it is not
tied to Shopware.

DIVE supplies your frontend application with all needed tooling to set up a basic 3D application
with event-based controls called "Actions". For further information, see
[Getting started](#getting-started).

## Setup and Maintenance

### Installation

The `@shopware-ag/dive` package can be installed via

```bash
npm install @shopware-ag/dive

or

yarn add @shopware-ag/dive
```

### Module System

DIVE uses a modern module system with support for both ESM and CommonJS formats. The package is
built using Vite and supports the following module formats:

- ESM (`.mjs` files)
- CommonJS (`.cjs` files)
- TypeScript type definitions (`.d.ts` files)

#### Module Exports

The package exports are configured in `package.json` to support both direct imports and
module-specific imports:

```json
{
    "exports": {
        ".": {
            "types": "./build/index.d.ts",
            "import": "./build/index.mjs",
            "require": "./build/index.cjs"
        },
        "./modules/*": {
            "types": "./build/src/modules/*.d.ts",
            "import": "./build/src/modules/*.mjs",
            "require": "./build/src/modules/*.cjs"
        }
    }
}
```

#### Build Process

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

#### Development Workflow

For local development, you can use the watch mode to automatically rebuild when files change:

```bash
yarn dev
```

This is particularly useful when working with the module system as it ensures your changes are
immediately reflected in the build output.

### Local Development with Yalc

[Yalc](https://github.com/wclr/yalc) is the recommended way to test local changes in your project.
It provides better dependency management and more reliable linking than npm link.

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

- Better dependency management
- More reliable than npm link
- Works well with package managers (npm, yarn, pnpm)
- Maintains proper package.json dependencies
- Supports multiple projects using the same local package

### Shopware Integration

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

### Testing and Quality Assurance

#### Unit Tests

All relevant files are covered by Jest tests. If you find any file that has not been covered yet,
feel free to add unit tests accordingly.

If there are any modules that have to be mocked (like `three`) you can create a given file in the
`__mocks__` folder in project root. Jest manages to mock modules with a given file with the modules
name as a file name (for example `three.ts`). Every export will be part of the modules mock. You
don't need to mock the module in your test anymore, you only extend the module mock.

If you have any other things from a module to import, you can simply create a folder structure and
place the mock file at the end of your structure. To understand better please take a look at the
`__mocks__` folder for yourself.

#### Code Formatting

DIVE uses Prettier as a preconfigured formatter.

## Usage Guide

### Core Concepts

#### Quick View

QuickView is used to quickly display your assets with as few lines of code as possible. Simply call
the static `QuickView()` method, with your data URI as a parameter, to create an instance of DIVE
with your asset to use in further code.

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = await DIVE.QuickView('your/asset/uri.glb'); // <-- call QuickView()

const myCanvasWrapper = document.createElement('div');
myCanvasWrapper.appendChild(dive.Canvas);
```

#### Getting Started

##### Import

```ts
import { DIVE } from '@shopware-ag/dive'; // <-- import DIVE
```

##### Instantiate

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = new DIVE(); // <-- instantiate DIVE
```

DIVE supplies your application with a HTMLCanvasElement that it uses as a render target. After
instantiating, you can use the supplied canvas within your frontend code to attach it to your DOM.

```ts
const dive = new DIVE();

const myCanvasWrapper = document.createElement('div'); // <-- create wrapper element
myCanvasWrapper.appendChild(dive.Canvas); // <-- reference DIVE canvas
```

### Modules

DIVE comes with several built-in modules that provide specific functionality. You can access modules
in two ways:

1. Direct import from the modules directory (recommended for most use cases):

```ts
import { ARSystem } from '@shopware-ag/dive/modules/ar';

// Initialize AR with options
const arSystem = new ARSystem();
await arSystem.launch('path/to/model.glb', {
    arPlacement: 'horizontal', // or 'vertical'
    arScale: 'auto' // or 'fixed'
});
```

2. Through the DIVE instance (when you need to work with a specific DIVE instance):

```ts
import { DIVE } from '@shopware-ag/dive';

// Create a DIVE instance
const dive = new DIVE();

// Get a module instance from the DIVE instance
const assetLoader = await dive.modules.get('AssetLoader');
const model = await assetLoader.load('path/to/model.glb');
```

### Available Modules

DIVE provides several specialized modules for different aspects of 3D content handling:

#### AssetLoader

Handles loading of 3D assets in various formats:

```ts
// Direct import
import { AssetLoader } from '@shopware-ag/dive/modules/asset/loader';
const assetLoader = new AssetLoader();
const model = await assetLoader.load('path/to/model.glb');

// Or through DIVE instance
const assetLoader = await dive.modules.get('AssetLoader');
const model = await assetLoader.load('path/to/model.glb');
```

Supported formats:

- GLB/GLTF
- USDZ

#### AssetConverter

Converts between different 3D file formats:

```ts
import { AssetConverter } from '@shopware-ag/dive/modules/asset/converter';
const assetConverter = new AssetConverter();
const usdzBuffer = await assetConverter.convert('input.glb').to('usdz');
```

#### AssetExporter

Exports 3D assets to various formats:

```ts
import { AssetExporter } from '@shopware-ag/dive/modules/asset/exporter';
const assetExporter = new AssetExporter();
const buffer = await assetExporter.export(model, 'glb');
```

#### ARSystem

Enables Augmented Reality features across different platforms:

```ts
import { ARSystem } from '@shopware-ag/dive/modules/ar';
const arSystem = new ARSystem();

// Launch AR with options
await arSystem.launch('path/to/model.glb', {
    arPlacement: 'horizontal', // or 'vertical'
    arScale: 'auto' // or 'fixed'
});
```

Features:

- Platform-specific AR implementations (ARQuickLook for iOS, SceneViewer for Android)
- Automatic format conversion for AR compatibility
- Configurable placement and scaling options

#### MediaCreator

Provides tools for creating media content from the 3D scene:

```ts
import { MediaCreator } from '@shopware-ag/dive/modules/mediacreator';
const mediaCreator = new MediaCreator();

// Generate a screenshot
const screenshot = await mediaCreator.GenerateMedia(
    { x: 0, y: 0, z: 0 }, // camera position
    { x: 0, y: 0, z: 0 }, // camera target
    1920, // width
    1080  // height
);
```

Features:

- High-quality screenshot generation
- Customizable camera position and target
- Configurable output resolution

#### SystemInfo

Provides information about the system's capabilities and performance:

```ts
import { SystemInfo } from '@shopware-ag/dive/modules/systeminfo';
const systemInfo = new SystemInfo();

// Get system information
const system = systemInfo.getSystem(); // Returns ESystem enum (IOS, ANDROID, etc.)

// Check AR capabilities
const supportsAR = systemInfo.getSupportsAR();

// Check device type
const isMobile = systemInfo.isMobile;
const isDesktop = systemInfo.isDesktop;
```

Features:

- System detection (iOS, Android, Windows, etc.)
- WebXR support detection
- AR capability checking
- Device type detection
- SceneViewer support detection

Each module is designed to be used independently, allowing you to use only the functionality you
need. This helps keep your bundle size small and your application focused.

### Actions

Actions are the primary way to communicate between your frontend application and the 3D space in
DIVE. They can be used to control various aspects of the 3D scene, such as camera movement, object
manipulation, and scene state management.

#### Basic Usage

To perform an action, use the `DIVECommunication` instance:

```ts
const dive = new DIVE();
const com = dive.Communication;

// Perform an action
com.PerformAction('SET_CAMERA_TRANSFORM', {
    position: { x: 0, y: 2, z: 2 },
    target: { x: 0, y: 0.5, z: 0 },
});
```

#### Subscribing to Actions

You can subscribe to actions to react to changes in the 3D space:

```ts
const unsubscribe = com.Subscribe('SET_CAMERA_TRANSFORM', (data) => {
    console.log('Camera position changed:', data);
});

// Don't forget to unsubscribe when done
unsubscribe();
```

#### Actions List

The following table lists all available actions in DIVE:

| Action | Description | Input | Return |
|--------|-------------|-------|--------|



Each action has specific parameters and return values. For detailed information about each action,
refer to the TypeScript type definitions in the source code.
