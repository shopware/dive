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

const dive = new DIVE();

dive.State.subscribe('GET_STATE', () => {
  // do something
});

dive.State.performAction('GET_STATE', {});
```

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
| [SetBackgroundAction](src/actions/scene/setbackground.ts) | Set the background color of the scene. |
| [SetCameraLayerAction](src/actions/camera/setcameralayer.ts) | Sets the camera layer to a certain layer. |
| [SetCameraLockedAction](src/actions/camera/lockcamera.ts) | Set the camera locked state. |
| [SetCameraTransformAction](src/actions/camera/setcameratransform.ts) | Sets the camera position and target. |
| [SetGizmoModeAction](src/actions/toolbox/setgizmomode.ts) | Sets the gizmo's mode. |
| [SetGizmoScaleLinkedAction](src/actions/toolbox/setgizmoscalelinked.ts) | Sets the gizmo's unified scale mode. |
| [SetGizmoVisibleAction](src/actions/toolbox/setgizmovisible.ts) | Sets the gizmo's visibility. |
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