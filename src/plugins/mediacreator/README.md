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
const screenshot = await mediaCreator.generateMedia({
    position: { x: 0, y: 0, z: 0 },
    target: { x: 0, y: 0, z: 0 },
    resolution: {
        width: 1920,
        height: 1080,
    },
});
```
