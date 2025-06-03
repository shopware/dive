# Media Creator
Provides tools for creating media content (screenshots) from the 3D scene.

## Features:
- High-quality screenshot generation
- Customizable camera position and target
- Configurable output resolution

## Usage
```ts
import { MediaCreator } from '@shopware-ag/dive/mediacreator';

const mediaCreator = new MediaCreator(renderer, scene, controller);

// Generate a screenshot
const screenshot = await mediaCreator.generateMedia(
    { x: 0, y: 0, z: 0 }, // camera position
    { x: 0, y: 0, z: 0 }, // camera target
    1920, // width
    1080  // height
);
```