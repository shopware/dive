
# Quick View
Quickly create a 3D scene with a 3D model and orbit controller with just one line of code.

## Features:
- Easy to use, easy to maintain.
- Asynchronously loads the model from provided uri automatically.
- Creates an OrbitController driven by a PointerInput on the canvas to enable interaction.
- Can hand the camera to the device's gyro via `useController('gyro')`.
- Can put a baked contact shadow under the model via the `softShadow` setting.
- Lights the model from an HDR image. Set the image based light and the background through the scene
  (see [Image based light, background and dome](../../../docs/environment.md)).
- You can change the behaviour via the `settings` parameter or afterwards via the returned QuickView instance.
- QuickView return a DIVE instance with an `orbitController` and a `pointerInput` in it.

## Usage
```ts
import { QuickView } from '@shopware-ag/dive/quickview';

const canvas = document.createElement('canvas');

// quickView: { ...dive, orbitController, hdr }
const quickView = await QuickView('my-model.glb', {
    canvas,
    background: '#00ff00',
    softShadow: true,
});

await quickView.scene.setImageBasedLight({ image: 'path/to/image.hdr' });
await quickView.scene.setBackground({ image: 'path/to/image.hdr' });

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
