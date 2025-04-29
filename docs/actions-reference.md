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

<!-- END_ACTIONS -->

Each action has specific parameters and return values. For detailed information about each action,
refer to the TypeScript type definitions in the source code.
