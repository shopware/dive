
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

# Formatter

DIVE uses Prettier as a preconfigured formatter.

#### Setup in Shopware

Don't forget to include DIVE in your webpack.config.js:

```js
const path = require('path');

module.exports = () => {
    return {
        ...
        resolve: {
            extensions: ['.ts', '.cjs', '.js'],
            alias: {
                three: path.resolve(__dirname, 'path/to/node_modules/three'),
                "@shopware-ag/dive": path.resolve(__dirname, 'path/to/node_modules/@shopware-ag/dive'),
            }
        },
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.(js|ts)$/,
                    loader: 'swc-loader',
                    include: [
                        path.resolve(__dirname, 'path/to/node_modules/three'),
                        path.resolve(__dirname, 'path/to/node_modules/@shopware-ag/dive')
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
                ...
            ],
        }
    };
};
```

# Quick View

QuickView is used to quickly display your assets with as few lines of code as
possible. Simply call the static `QuickView()` method (with your data-uri as a
parameter) to create an instance of DIVE with your asset to use in further code.

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = DIVE.QuickView('your/asset/uri.glb'); // <-- call QuickView()

const myCanvasWrapper = document.createElement('div');
myCanvasWrapper.appendChild(dive.Canvas);
```

# Getting started

Import:

```ts
import { DIVE } from '@shopware-ag/dive'; // <-- import DIVE
```

Instantiate:

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = new DIVE(); // <-- instantiate DIVE
```

DIVE supplies your application with a HTMLCanvasElement that it uses as a render
target. After instantiating, you can use the supplied canvas within you frontend
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

# Actions

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

# Actions (List)

In the following you find a list of all available actions to perform on
DIVECommunication class via
[`com.PerformAction()`](https://github.com/shopware/dive/blob/2e193c58843939ce07a1d35bfbd5b3c9d26eeeca/src/com/Communication.ts#L85).


| Action                                                                           | Description                                                                                        |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| [ADD_OBJECT](./src/com/actions/object/addobject.ts)                              | Adds an object to the scene.                                                                       |
| [COMPUTE_ENCOMPASSING_VIEW](./src/com/actions/camera/computeencompassingview.ts) | Calculates the camera position and target to view the whole scene. (experimental)                  |
| [DELETE_OBJECT](./src/com/actions/object/deleteobject.ts)                        | Deletes an object from the scene.                                                                  |
| [DESELECT_OBJECT](./src/com/actions/object/deselectobject.ts)                    | Deselects an existing object.                                                                      |
| [DROP_IT](./src/com/actions/object/model/dropit.ts)                              | Places an object on top of an underlying object or the floor.                                      |
| [EXPORT_SCENE](./src/com/actions/scene/exportscene.ts)                           | Exports the current scene to a blob and returns the URL.                                           |
| [GENERATE_MEDIA](./src/com/actions/media/generatemedia.ts)                       | Generates a screenshot, stores it in a Blob and writes the URL into the payload.                   |
| [GET_ALL_OBJECTS](./src/com/actions/object/getallobjects.ts)                     | Retrieves all objects in the scene.                                                                |
| [GET_ALL_SCENE_DATA](./src/com/actions/scene/getallscenedata.ts)                 | Retrieves all current scene data.                                                                  |
| [GET_CAMERA_TRANSFORM](./src/com/actions/camera/getcameratransform.ts)           | Returns the current camera position and target.                                                    |
| [GET_OBJECTS](./src/com/actions/object/getobjects.ts)                            | Returns a list of objects of given IDs.                                                            |
| [MODEL_LOADED](./src/com/actions/object/model/modelloaded.ts)                    | Is triggered when a model is loaded.                                                               |
| [MOVE_CAMERA](./src/com/actions/camera/movecamera.ts)                            | Moves the camera to a new position and target.                                                     |
| [NEW_ACTION](./src/com/actions/object/newaction.ts)                              | Returns a list of objects of given IDs.                                                            |
| [PLACE_ON_FLOOR](./src/com/actions/object/model/placeonfloor.ts)                 | Places an object on the floor.                                                                     |
| [RESET_CAMERA](./src/com/actions/camera/resetcamera.ts)                          | Reset the camera to its initial position and rotation.                                             |
| [SELECT_OBJECT](./src/com/actions/object/selectobject.ts)                        | Selects an existing object.                                                                        |
| [SET_BACKGROUND](./src/com/actions/scene/setbackground.ts)                       | Set the background color of the scene.                                                             |
| [SET_CAMERA_LAYER](./src/com/actions/camera/setcameralayer.ts)                   | Sets the camera layer to a certain layer.                                                          |
| [SET_CAMERA_TRANSFORM](./src/com/actions/camera/setcameratransform.ts)           | Sets the camera position and target.                                                               |
| [SET_GIZMO_MODE](./src/com/actions/toolbox/select/setgizmomode.ts)               | Sets the gizmo\'s mode.                                                                            |
| [SET_GIZMO_VISIBILITY](./src/com/actions/toolbox/transform/setgizmovisible.ts)   | Sets the gizmo\'s visibility.                                                                      |
| [SET_PARENT](./src/com/actions/object/setparent.ts)                              | Attach an object to another object.                                                                |
| [UPDATE_OBJECT](./src/com/actions/object/updateobject.ts)                        | Updates an existing object.                                                                        |
| [UPDATE_SCENE](./src/com/actions/scene/updatescene.ts)                           | Updates global scene data.                                                                         |
| [USE_TOOL](./src/com/actions/toolbox/usetool.ts)                                 | Activates a specific tool from the toolbox.                                                        |
| [ZOOM_CAMERA](./src/com/actions/camera/zoomcamera.ts)                            | Zooms the camera in or out by a certain amount.                                                    |
