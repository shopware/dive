# Asset Converter
Converts input file to a specified supported output file type.

## Features:
- Easy one-function-call conversion to desired file type
- Uses tested three.js loaders and exporters in the background
- Results are in reusable array buffer format
- Output options support Apple standards for AR anchoring

## Usage
```ts
import { AssetConverter, type GLTFExporterOptions, type USDZExporterOptions } from '@shopware-ag/dive/assetconverter';

// GLTF
const gltfOptions: GLTFExporterOptions = {
    binary: false
}
const gltfBuffer = await this.converter.convert('my-model.usdz').to('gltf', gltfOptions);

// GLB
const glbOptions: GLTFExporterOptions = {
    binary: true
}
const glbBuffer = await this.converter.convert('my-model.gltf').to('glb', glbOptions);

// USDZ
const usdzOptions: USDZExporterOptions = {
    quickLookCompatible: true,
    ar: {
        anchoring: { type: 'plane' },
        planeAnchoring: {
            alignment:
                options?.arPlacement === 'vertical'
                    ? 'vertical'
                    : 'horizontal',
        },
    },
}
const usdzBuffer = await this.converter.convert(uri).to('usdz', usdzOptions);
```
