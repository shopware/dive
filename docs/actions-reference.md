# Actions Reference

Actions are the primary way to communicate between your frontend application and the 3D space in
DIVE. They can be used to control various aspects of the 3D scene, such as camera movement, object
manipulation, and scene state management.

## Basic Usage

To perform an action, use the `State` instance:

```ts
import { DIVE, State } from '@shopware-ag/dive';
// or
import { State } from '@shopware-ag/dive/modules/State';

const dive = new DIVE();
const orbitConroller = dive['orbitConroller']; // TODO: currently a debug solution
const state = new State(dive.engine, orbitConroller);

// Perform an action
com.performAction('SET_CAMERA_TRANSFORM', {
    position: { x: 0, y: 2, z: 2 },
    target: { x: 0, y: 0.5, z: 0 },
});
```

## Subscribing to Actions

You can subscribe to actions to react to changes in the 3D space:

```ts
const unsubscribe = com.Subscribe('SET_CAMERA_TRANSFORM', (data) => {
    console.log('Camera position changed:', data);
});

// Don't forget to unsubscribe when done
unsubscribe();
```

## Available Actions

The following table lists all available actions in DIVE:

<!-- INSERT_ACTIONS -->
| Action | Description | Input | Return |
|--------|-------------|-------|--------|
| [AddObjectAction](src/plugins/state/src/actions/object/addobject.ts) | Adds an object to the scene. | <code>EntitySchema</code> | <code>void</code> |
| [ComputeEncompassingViewAction](src/plugins/state/src/actions/camera/computeencompassingview.ts) | Calculates the camera position and target to view the whole scene. (experimental). | <code>void</code> | <code>{<br/>        position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>        target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>    }</code> |
| [DeleteObjectAction](src/plugins/state/src/actions/object/deleteobject.ts) | Deletes an object from the scene. | <code>Partial<EntitySchema> & { id: string }</code> | <code>void</code> |
| [DeselectObjectAction](src/plugins/state/src/actions/object/deselectobject.ts) | Deselects an existing object. | <code>Partial<EntitySchema> & { id: string }</code> | <code>Promise<void></code> |
| [DropItAction](src/plugins/state/src/actions/object/dropit.ts) | Places an object on top of an underlying object or the floor. | <code>{ id: string }</code> | <code>void</code> |
| [ExportSceneAction](src/plugins/state/src/actions/scene/exportscene.ts) | Exports the current scene to a blob and returns the URL. | <code>{ type: keyof StateExportFileType }</code> | <code>Promise<ArrayBuffer \| null></code> |
| [GenerateMediaAction](src/plugins/state/src/actions/media/generatemedia.ts) | Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI. | <code>(<br/>        \| {<br/>              position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>              target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>          }<br/>        \| {<br/>              id: string;<br/>          }<br/>    ) & {<br/>        width: number;<br/>        height: number;<br/>    }</code> | <code>Promise<string></code> |
| [GetAllObjectsAction](src/plugins/state/src/actions/object/getallobjects.ts) | Retrieves all objects in the state. | <code>void</code> | <code>Map<string, EntitySchema></code> |
| [GetAllSceneDataAction](src/plugins/state/src/actions/scene/getallscenedata.ts) | Retrieves all current scene data. | <code>object</code> | <code>StateSceneData</code> |
| [GetCameraTransformAction](src/plugins/state/src/actions/camera/getcameratransform.ts) | Gets the current camera position and target. | <code>void</code> | <code>{<br/>        position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>        target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>    }</code> |
| [GetObjectsAction](src/plugins/state/src/actions/object/getobjects.ts) | Returns a list of objects of given IDs. | <code>{ ids: string[] }</code> | <code>EntitySchema[]</code> |
| [LaunchARAction](src/plugins/state/src/actions/ar/launchar.ts) | Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer) | <code>{ uri: string; options?: ARSystemOptions }</code> | <code>Promise<void></code> |
| [ModelLoadedAction](src/plugins/state/src/actions/object/modelloaded.ts) | Is triggered when a model is loaded. | <code>{ id: string }</code> | <code>void</code> |
| [MoveCameraAction](src/plugins/state/src/actions/camera/movecamera.ts) | Moves the camera to a new position and target. | <code>\| {<br/>          position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>          target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>          locked: boolean;<br/>          duration: number;<br/>      }<br/>    \| {<br/>          id: string;<br/>          locked: boolean;<br/>          duration: number;<br/>      }</code> | <code>Promise<{ stop: () => void }></code> |
| [PlaceOnFloorAction](src/plugins/state/src/actions/object/placeonfloor.ts) | Places an object on the floor. | <code>{ id: string }</code> | <code>void</code> |
| [SelectObjectAction](src/plugins/state/src/actions/object/selectobject.ts) | Selects an existing object. | <code>Partial<EntitySchema> & { id: string }</code> | <code>Promise<void></code> |
| [SetBackgroundAction](src/plugins/state/src/actions/scene/setbackground.ts) | Set the background color of the scene. | <code>{ color: string \| number }</code> | <code>void</code> |
| [SetCameraLayerAction](src/plugins/state/src/actions/camera/setcameralayer.ts) | Sets the camera layer to a certain layer. | <code>{ layer: 'LIVE' \| 'EDITOR' }</code> | <code>void</code> |
| [SetCameraLockedAction](src/plugins/state/src/actions/camera/lockcamera.ts) | Set the camera locked state. | <code>boolean</code> | <code>void</code> |
| [SetCameraTransformAction](src/plugins/state/src/actions/camera/setcameratransform.ts) | Sets the camera position and target. | <code>{<br/>        position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>        target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>    }</code> | <code>void</code> |
| [SetGizmoModeAction](src/plugins/state/src/actions/toolbox/setgizmomode.ts) | Sets the gizmo's mode. | <code>{ mode: 'translate' \| 'rotate' \| 'scale' }</code> | <code>Promise<void></code> |
| [SetGizmoScaleLinkedAction](src/plugins/state/src/actions/toolbox/setgizmoscalelinked.ts) | Sets the gizmo's unified scale mode. | <code>boolean</code> | <code>Promise<void></code> |
| [SetGizmoVisibleAction](src/plugins/state/src/actions/toolbox/setgizmovisible.ts) | Sets the gizmo's visibility. | <code>boolean</code> | <code>Promise<void></code> |
| [SetParentAction](src/plugins/state/src/actions/object/setparent.ts) | Attach an object to another object. | <code>{<br/>        object: Partial<EntitySchema> & { id: string };<br/>        parent: (Partial<EntitySchema> & { id: string }) \| null;<br/>    }</code> | <code>void</code> |
| [StartRenderAction](src/plugins/state/src/actions/renderer/startrender.ts) | Starts the render process. | <code>void</code> | <code>void</code> |
| [UpdateObjectAction](src/plugins/state/src/actions/object/updateobject.ts) | Updates an existing object. | <code>Partial<EntitySchema> & { id: string }</code> | <code>void</code> |
| [UpdateSceneAction](src/plugins/state/src/actions/scene/updatescene.ts) | Updates scene properties. | <code>Partial<{<br/>        name: string;<br/>        backgroundColor: string \| number;<br/>        gridEnabled: boolean;<br/>        floorEnabled: boolean;<br/>        floorColor: string \| number;<br/>    }></code> | <code>void</code> |
| [UseToolAction](src/plugins/state/src/actions/toolbox/usetool.ts) | Activates a specific tool from the toolbox. | <code>{ tool: ToolType }</code> | <code>Promise<void></code> |
| [ZoomCameraAction](src/plugins/state/src/actions/camera/zoomcamera.ts) | Zooms the camera in or out by a certain amount. | <code>{ direction: 'IN' \| 'OUT'; by: number }</code> | <code>void</code> |

<!-- END_ACTIONS -->

Each action has specific parameters and return values. For detailed information about each action,
refer to the TypeScript type definitions in the source code.
