
# Quick View
Quickly create a 3D scene with a 3D model and orbit controller with just one line of code.

## Features:
- Easy to use, easy to maintain.
- Asynchronously loads the model from provided uri automatically.
- Creates an OrbitController driven by a PointerInput on the canvas to enable interaction.
- Can hand the camera to the device's gyro via `useController('gyro')`.
- Can enable HDR lighting via setting `hdr.imageUrl` in parameters.
- You can change the behaviour via the `settings` parameter or afterwards via the returned QuickView instance.
- QuickView return a DIVE instance with an `orbitController` and a `pointerInput` in it.

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
        rotateY: 0,
    }
});
quickView.orbitController.enablePan = false;
```

## Switching controllers
> **Experimental:** the `'gyro'` controller is still being tuned on devices. How it feels may
> change without a major release.

Exactly one controller moves the camera. `'gyro'` turns the camera by how the device is tilted,
around the pose the first load was framed in. iOS grants the sensor only from inside a user
gesture, so call `useController` straight from the click handler. It rejects, and the previous
controller stays, when the sensor is refused or reports nothing.

```ts
gyroButton.addEventListener('click', async () => {
    try {
        await quickView.useController('gyro');
    } catch {
        // no gyro: stay with the orbit controller
    }
});

orbitButton.addEventListener('click', () => quickView.useController('orbit'));

quickView.activeController; // 'orbit' | 'gyro'
```
