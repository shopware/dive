# Axis Camera
Displays scene axes in the corner of the screen for orientation.

## Features:
- Renders X, Y, Z axes with colored labels
- Updates orientation based on main camera
- Integrates with DIVE render pipeline
- Easy disposal and setup

## Usage
```ts
import { DIVEAxisCamera } from '@shopware-ag/dive/axiscamera';

const axisCamera = new DIVEAxisCamera(renderer, scene, camera);
// Automatically added to the scene and updated each frame
```