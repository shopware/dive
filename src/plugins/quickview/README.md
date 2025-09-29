
# Quick View
Quickly create a 3D scene with a 3D model and orbit controller with just one line of code.

## Features:
- Easy to use, easy to maintain.
- Asynchronously loads the model from provided uri automatically.
- Creates an OrbitController with it to enable interaction.
- Can enable HDR lighting via setting `hdr.imageUrl` in parameters.
- You can change the behaviour via the `settings` parameter or afterwards via the returned QuickView instance.
- QuickView return a DIVE instance with an `orbitController` in it.

## Usage
```ts
import { QuickView } from '@shopware-ag/dive/quickview';

const canvas = document.createElement('canvas');

// quickView: { ...dive, orbitController, hdr }
const quickView = await QuickView('my-model.glb', {
    displayFloor: true,
    lightIntensity: 0.5,
    backgroundColor: '00ff00',
    enableDamping: true,
    hdr: {
        enabled: true,
        imageUrl: 'path/to/image.hdr',
        useAsBackground: true,
        globalEnvIntensity: 1,
        exposure: 1,
        rotateY: 0,
        replaceLights: false,
    }
});
quickView.orbitController.enablePan = false;
```
