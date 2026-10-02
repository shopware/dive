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

## Draco decoder

The Draco decoder ships inside the package: the build turns three's decoder files into plain lazy chunks (the JS sources as string modules, the `.wasm` as a data URL). A consumer needs no bundler rule, no `?raw`/`?url` support and no copied decoder files — Vite, webpack 5 and any other ESM bundler load it as ordinary code. The build fails if a published chunk still imports with a bundler query.

Only what the browser needs is downloaded, when the first Draco-compressed asset is decoded:

| Path                | Chunk                                 | Size     | gzip   |
| ------------------- | ------------------------------------- | -------- | ------ |
| WebAssembly         | `draco_wasm_wrapper` + `.wasm` inline | 315 KB   | 102 KB |
| no WebAssembly      | `draco_decoder` (JS)                  | 512 KB   | 107 KB |

The data URL costs about 27 KB gzip over the raw `.wasm`. The npm tarball grows by about 420 KB (8.59 MB → 9.01 MB, 1.65 MB unpacked, ESM and CJS together).

The inlined `.wasm` is read with `fetch()` on its data URL and decoding runs in a `blob:` worker, so a Content Security Policy has to allow `connect-src data:` and `worker-src blob:`.
