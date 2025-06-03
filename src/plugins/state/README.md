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