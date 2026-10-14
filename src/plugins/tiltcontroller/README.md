# Tilt Controller
Turns the camera around a home pose by how a device is tilted.

## Features:
- Absolute mapping within the limits; past a limit the limit moves along with the device, so turning
  back moves the camera at once (the front then lies that much further over)
- A sideways tilt of `maxTilt.x` turns the camera to the middle of the back, from either side
- A forward or backward tilt of `maxTilt.y` moves the polar angle by up to `maxPolarOffset`
- Eases from wherever the camera is when it is enabled

Listens to `axis` events on the `orientation` channel, as a `GyroInput` reports them.

## Usage
```ts
import { GyroInput } from '@shopware-ag/dive';
import { TiltController } from '@shopware-ag/dive/tiltcontroller';

const controller = new TiltController(cameraComponent, {
    maxTilt: { x: Math.PI / 6, y: Math.PI / 9 },
    maxPolarOffset: Math.PI / 4,
});
controller.setHome({ position: camera.position.clone(), target: new Vector3() });
dive.clock.addTicker(controller);

const gyro = new GyroInput();
controller.connect(gyro);
await gyro.enable();
```
