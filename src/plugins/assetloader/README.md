# Asset Loader
Handles loading of 3D assets in various formats for use in DIVE scenes.

## Features:
- Load 3D models from supported formats
- Automatic file type detection
- Draco compression support
- Error handling for unsupported types and network issues
- Supported formats: GLB, GLTF, USDZ

## Usage
```ts
import { AssetLoader } from '@shopware-ag/dive/assetloader';

const assetLoader = new AssetLoader();
const model = await assetLoader.load('path/to/model.glb');
```