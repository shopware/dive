# Asset Exporter
Exports 3D assets to various formats for download or sharing.

## Features:
- Export scene elements to supported formats
- Results in reusable array buffer format
- Customizable export options for each format
- Handles Three.js Object3D instances
- Error handling for unsupported types and export issues
- Supported formats: GLB, GLTF, USDZ

## Usage
```ts
import { DIVENode, ModelComponent, collectAnimations } from '@shopware-ag/dive';
import { AssetExporter } from '@shopware-ag/dive/assetexporter';

const node = new DIVENode();
await node.addComponent(new ModelComponent()).setFromURL('my-model.gltf');

const assetExporter = new AssetExporter();
const buffer = await assetExporter.export(node, 'glb');
```

## Animations
Clips are found and handed over for you, in all three formats -- including the
ones a `ModelComponent` holds, which are not part of the scene graph and which no
traversal of the exported objects would reach. Pass `options.animations` to
override what is collected.

Each clip is bound to the objects of the asset that holds it. A track names its
target, and glTF makes those names unique only within one file -- two models both
holding a `Cube`, or the same asset loaded twice, would otherwise resolve to
whichever comes first, and the wrong model gets animated.
