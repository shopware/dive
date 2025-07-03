# Usage Guide

## Core Concepts

### Quick View

QuickView is used to quickly display your assets with as few lines of code as possible. Simply call
the static `QuickView()` method, with your data URI as a parameter, to create an instance of DIVE
with your asset to use in further code.

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = await DIVE.QuickView('your/asset/uri.glb'); // <-- call QuickView()

const myCanvasWrapper = document.createElement('div');
myCanvasWrapper.appendChild(dive.Canvas);
```

### Getting Started

#### Import

```ts
import { DIVE } from '@shopware-ag/dive'; // <-- import DIVE
```

#### Instantiate

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

## Modules

DIVE comes with several built-in modules that provide specific functionality. Served modules are
independent You can access modules like so:

Direct import from the modules directory (recommended for most use cases):

```ts
import { ARSystem } from '@shopware-ag/dive/modules/ar';

// Initialize AR with options
const arSystem = new ARSystem();
await arSystem.launch('path/to/model.glb', {
    arPlacement: 'horizontal', // or 'vertical'
    arScale: 'auto' // or 'fixed'
});
```

## Modules (List)

DIVE provides several specialized modules for different aspects of 3D content handling:

<!-- INSERT_MODULES -->

Each module is designed to be used independently, allowing you to use only the functionality you
need. This helps keep your bundle size small and your application focused.

## Actions

Actions are the primary way to communicate between your frontend application and the 3D space in
DIVE. They can be used to control various aspects of the 3D scene, such as camera movement, object
manipulation, and scene state management.

### Basic Usage

To perform an action, use the `DIVECommunication` instance:

```ts
const dive = new DIVE();
const com = dive.Communication;

// Perform an action
com.performAction('SET_CAMERA_TRANSFORM', {
    position: { x: 0, y: 2, z: 2 },
    target: { x: 0, y: 0.5, z: 0 },
});
```

### Subscribing to Actions

You can subscribe to actions to react to changes in the 3D space:

```ts
const unsubscribe = com.Subscribe('SET_CAMERA_TRANSFORM', (data) => {
    console.log('Camera position changed:', data);
});

// Don't forget to unsubscribe when done
unsubscribe();
```

### Actions List

The following table lists all available actions in DIVE:

<!-- INSERT_TABLE -->

Each action has specific parameters and return values. For detailed information about each action,
refer to the TypeScript type definitions in the source code.
