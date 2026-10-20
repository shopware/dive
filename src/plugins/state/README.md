# State
State management and action system for communicating with DIVE.

## Features:
- Subscribe to and perform actions inside and outside DIVE
- Action registry and dependency injection
- Supports async and sync actions
- Entity registration and lookup

## Usage
```ts
import { DIVE } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { State } from '@shopware-ag/dive/state';

const dive = new DIVE();
const orbitController = new OrbitController(dive.mainView.cameraComponent);
const state = new State(dive, orbitController);

state.subscribe('GET_STATE', () => {
  // do something
});

state.performAction('GET_STATE');
```

## Image based light and background
The state data stores both, as URLs only:

```ts
type StateData = {
  // ...
  imageBasedLight?: {
    image: string | null; // null is the bundled default HDR
    rotation: number; // radians around Y
    intensity: number;
  } | null; // null is no image based light
  background?: string | { image: string; rotation: number } | null; // null is transparent
  /** @deprecated Use `background`. */
  backgroundColor: string;
};
```

- A light or background set from a `Texture` is stored as `null`.
- `backgroundColor` mirrors the background: the colour for a colour background, `'transparent'`
  otherwise. On load, `background` wins over it.
- A state without `imageBasedLight` keeps the scene's current light. A state without `background`
  falls back to `backgroundColor`.

Set them with these actions. Each returns a promise that resolves once the images are loaded:

```ts
await state.performAction('SET_IMAGE_BASED_LIGHT', {
  imageBasedLight: { image: 'studio.hdr', rotation: Math.PI / 2 },
});
await state.performAction('SET_IMAGE_BASED_LIGHT', { imageBasedLight: null }); // off

await state.performAction('SET_BACKGROUND', { background: '#ffffff' });
await state.performAction('SET_BACKGROUND', {
  background: { image: 'panorama.jpg', rotation: 0 },
});

await state.performAction('UPDATE_SCENE', { background: null, imageBasedLight: { intensity: 0.5 } });
```

Fields left out of `imageBasedLight` keep their value. `SET_BACKGROUND` with `{ color }` still
works, but is deprecated in favour of `{ background }`.

## Available Actions

The following table lists all available actions in DIVE:

<!-- INSERT_ACTIONS -->
| Action | Description |
|--------|-------------|
| [AddObjectAction](src/actions/object/addobject.ts) | Adds an object to the scene. |
| [ComputeEncompassingViewAction](src/actions/camera/computeencompassingview.ts) | Calculates the camera position and target to view the whole scene. (experimental). |
| [DeleteObjectAction](src/actions/object/deleteobject.ts) | Deletes an object from the scene. |
| [DeselectObjectAction](src/actions/object/deselectobject.ts) | Deselects an existing object. |
| [DropItAction](src/actions/object/dropit.ts) | Places an object on top of an underlying object or the floor. |
| [ExportSceneAction](src/actions/scene/exportscene.ts) | Exports the current scene to a blob and returns the URL. |
| [GenerateMediaAction](src/actions/media/generatemedia.ts) | Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI. |
| [GetAllObjectsAction](src/actions/object/getallobjects.ts) | Retrieves all objects in the state. |
| [GetCameraTransformAction](src/actions/camera/getcameratransform.ts) | Gets the current camera position and target. |
| [GetObjectsAction](src/actions/object/getobjects.ts) | Returns a list of objects of given IDs. |
| [GetStateAction](src/actions/state/getstate.ts) | Retrieves complete state data. |
| [LaunchARAction](src/actions/ar/launchar.ts) | Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer) |
| [ModelLoadedAction](src/actions/object/modelloaded.ts) | Is triggered when a model is loaded. |
| [MoveCameraAction](src/actions/camera/movecamera.ts) | Moves the camera to a new position and target. |
| [SelectObjectAction](src/actions/object/selectobject.ts) | Selects an existing object. |
| [SetBackgroundAction](src/actions/scene/setbackground.ts) | Sets what is shown behind the scene: a colour, an image or nothing. |
| [SetCameraLayerAction](src/actions/camera/setcameralayer.ts) | Sets the camera layer to a certain layer. |
| [SetCameraLockedAction](src/actions/camera/lockcamera.ts) | Set the camera locked state. |
| [SetCameraTransformAction](src/actions/camera/setcameratransform.ts) | Sets the camera position and target. |
| [SetGizmoModeAction](src/actions/toolbox/setgizmomode.ts) | Sets the gizmo's mode. |
| [SetGizmoScaleLinkedAction](src/actions/toolbox/setgizmoscalelinked.ts) | Sets the gizmo's unified scale mode. |
| [SetGizmoVisibleAction](src/actions/toolbox/setgizmovisible.ts) | Sets the gizmo's visibility. |
| [SetImageBasedLightAction](src/actions/scene/setimagebasedlight.ts) | Sets the image, rotation and intensity of the image based light, or turns it off. |
| [SetParentAction](src/actions/object/setparent.ts) | Attach an object to another object. |
| [SetStateAction](src/actions/state/setstate.ts) | Applies complete state data to current dive instance. |
| [StartRenderAction](src/actions/renderer/startrender.ts) | Starts the render process. |
| [UpdateObjectAction](src/actions/object/updateobject.ts) | Updates an existing object. |
| [UpdateSceneAction](src/actions/scene/updatescene.ts) | Updates scene properties. |
| [UseToolAction](src/actions/toolbox/usetool.ts) | Activates a specific tool from the toolbox. |
| [ZoomCameraAction](src/actions/camera/zoomcamera.ts) | Zooms the camera in or out by a certain amount. |

<!-- END_ACTIONS -->

Each action has specific parameters and return values. For detailed information about each action,
refer to the TypeScript type definitions in the source code.