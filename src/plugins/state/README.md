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

dive.State.subscribe('GET_ALL_SCENE_DATA', () => {
  // do something
});

dive.State.performAction('GET_ALL_SCENE_DATA', {});
```

## Available Actions

The following table lists all available actions in DIVE:

<!-- INSERT_ACTIONS -->
| Action | Description | Input | Return |
|--------|-------------|-------|--------|
| [AddObjectAction](src/actions/object/addobject.ts) | Adds an object to the scene. | <code>[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)</code> | <code>void</code> |
| [ComputeEncompassingViewAction](src/actions/camera/computeencompassingview.ts) | Calculates the camera position and target to view the whole scene. (experimental). | <code>void</code> | <code>{<br/>        position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>        target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>    }</code> |
| [DeleteObjectAction](src/actions/object/deleteobject.ts) | Deletes an object from the scene. | <code>Partial&lt;[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)&gt; & { id: string }</code> | <code>void</code> |
| [DeselectObjectAction](src/actions/object/deselectobject.ts) | Deselects an existing object. | <code>Partial&lt;[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)&gt; & { id: string }</code> | <code>Promise&lt;void&gt;</code> |
| [DropItAction](src/actions/object/dropit.ts) | Places an object on top of an underlying object or the floor. | <code>{ id: string }</code> | <code>void</code> |
| [ExportSceneAction](src/actions/scene/exportscene.ts) | Exports the current scene to a blob and returns the URL. | <code>{ type: keyof [StateExportFileType](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/actions/scene/exportscene.ts) }</code> | <code>Promise&lt;ArrayBuffer \| null&gt;</code> |
| [GenerateMediaAction](src/actions/media/generatemedia.ts) | Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI. | <code>(<br/>        \| {<br/>              position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>              target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>          }<br/>        \| {<br/>              id: string;<br/>          }<br/>    ) & {<br/>        width: number;<br/>        height: number;<br/>    }</code> | <code>Promise&lt;string&gt;</code> |
| [GetAllObjectsAction](src/actions/object/getallobjects.ts) | Retrieves all objects in the state. | <code>void</code> | <code>Map&lt;string, [EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)&gt;</code> |
| [GetAllSceneDataAction](src/actions/scene/getallscenedata.ts) | Retrieves all current scene data. | <code>object</code> | <code>[StateSceneData](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/actions/scene/getallscenedata.ts)</code> |
| [GetCameraTransformAction](src/actions/camera/getcameratransform.ts) | Gets the current camera position and target. | <code>void</code> | <code>{<br/>        position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>        target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>    }</code> |
| [GetObjectsAction](src/actions/object/getobjects.ts) | Returns a list of objects of given IDs. | <code>{ ids: string[] }</code> | <code>[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)[]</code> |
| [LaunchARAction](src/actions/ar/launchar.ts) | Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer) | <code>{ uri: string; options?: [ARSystemOptions](https://github.com/shopware/dive/blob/trunk/src/plugins/ar/src/ARSystem.ts) }</code> | <code>Promise&lt;void&gt;</code> |
| [ModelLoadedAction](src/actions/object/modelloaded.ts) | Is triggered when a model is loaded. | <code>{ id: string }</code> | <code>void</code> |
| [MoveCameraAction](src/actions/camera/movecamera.ts) | Moves the camera to a new position and target. | <code>\| {<br/>          position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>          target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>          locked: boolean;<br/>          duration: number;<br/>      }<br/>    \| {<br/>          id: string;<br/>          locked: boolean;<br/>          duration: number;<br/>      }</code> | <code>Promise&lt;{ stop: () =&gt; void }&gt;</code> |
| [PlaceOnFloorAction](src/actions/object/placeonfloor.ts) | Places an object on the floor. | <code>{ id: string }</code> | <code>void</code> |
| [SelectObjectAction](src/actions/object/selectobject.ts) | Selects an existing object. | <code>Partial&lt;[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)&gt; & { id: string }</code> | <code>Promise&lt;void&gt;</code> |
| [SetBackgroundAction](src/actions/scene/setbackground.ts) | Set the background color of the scene. | <code>{ color: string \| number }</code> | <code>void</code> |
| [SetCameraLayerAction](src/actions/camera/setcameralayer.ts) | Sets the camera layer to a certain layer. | <code>{ layer: 'LIVE' \| 'EDITOR' }</code> | <code>void</code> |
| [SetCameraLockedAction](src/actions/camera/lockcamera.ts) | Set the camera locked state. | <code>boolean</code> | <code>void</code> |
| [SetCameraTransformAction](src/actions/camera/setcameratransform.ts) | Sets the camera position and target. | <code>{<br/>        position: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>        target: [Vector3Like](https://threejs.org/docs/#api/en/math/Vector3);<br/>    }</code> | <code>void</code> |
| [SetGizmoModeAction](src/actions/toolbox/setgizmomode.ts) | Sets the gizmo's mode. | <code>{ mode: 'translate' \| 'rotate' \| 'scale' }</code> | <code>Promise&lt;void&gt;</code> |
| [SetGizmoScaleLinkedAction](src/actions/toolbox/setgizmoscalelinked.ts) | Sets the gizmo's unified scale mode. | <code>boolean</code> | <code>Promise&lt;void&gt;</code> |
| [SetGizmoVisibleAction](src/actions/toolbox/setgizmovisible.ts) | Sets the gizmo's visibility. | <code>boolean</code> | <code>Promise&lt;void&gt;</code> |
| [SetParentAction](src/actions/object/setparent.ts) | Attach an object to another object. | <code>{<br/>        object: Partial&lt;[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)&gt; & { id: string };<br/>        parent: (Partial&lt;[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)&gt; & { id: string }) \| null;<br/>    }</code> | <code>void</code> |
| [StartRenderAction](src/actions/renderer/startrender.ts) | Starts the render process. | <code>void</code> | <code>void</code> |
| [UpdateObjectAction](src/actions/object/updateobject.ts) | Updates an existing object. | <code>Partial&lt;[EntitySchema](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/State.ts)&gt; & { id: string }</code> | <code>void</code> |
| [UpdateSceneAction](src/actions/scene/updatescene.ts) | Updates scene properties. | <code>Partial&lt;{<br/>        name: string;<br/>        backgroundColor: string \| number;<br/>        gridEnabled: boolean;<br/>        floorEnabled: boolean;<br/>        floorColor: string \| number;<br/>    }&gt;</code> | <code>void</code> |
| [UseToolAction](src/actions/toolbox/usetool.ts) | Activates a specific tool from the toolbox. | <code>{ tool: [ToolType](https://github.com/shopware/dive/blob/trunk/src/plugins/state/src/actions/toolbox/usetool.ts) }</code> | <code>Promise&lt;void&gt;</code> |
| [ZoomCameraAction](src/actions/camera/zoomcamera.ts) | Zooms the camera in or out by a certain amount. | <code>{ direction: 'IN' \| 'OUT'; by: number }</code> | <code>void</code> |

<!-- END_ACTIONS -->

Each action has specific parameters and return values. For detailed information about each action,
refer to the TypeScript type definitions in the source code.