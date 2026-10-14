# Orbit Controller
Orbits the camera around a target point, driven by input devices.

## Features:
- Smooth camera orbiting with damping
- Takes any number of input devices from `@shopware-ag/dive` through `connect()`
- Configurable bindings: which input channel rotates, pans or dollies
- `inputEnabled` to keep input out while the camera keeps ticking (e.g. while a tool drags)
- Compute encompassing view for bounding spheres
- Zoom in/out programmatically

The controller never touches the DOM. Mouse and touch come from a `PointerInput`.

## Usage
```ts
import { PointerInput } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';

const controller = new OrbitController(cameraComponent, {
    enableDamping: true,
    dampingFactor: 0.05,
    bindings: {
        // a left drag pans instead of rotating
        primary: { action: 'pan', speed: 1 },
    },
});
controller.connect(new PointerInput(canvas));

controller.zoomIn();
controller.zoomOut(2);
```

Default bindings: `primary` (left drag, one finger) rotates, `secondary` (right drag, two fingers) pans,
`tertiary` (middle drag) dollies. `scale` events (wheel, pinch) zoom.
