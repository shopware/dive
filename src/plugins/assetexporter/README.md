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
import { DIVEModel } from '@shopware-ag/dive';
import { AssetExporter } from '@shopware-ag/dive/assetexporter';

const model = new DIVEModel()
await model.setFromURL('my-model.gltf');

const assetExporter = new AssetExporter();
const buffer = await assetExporter.export(model, 'glb');
```