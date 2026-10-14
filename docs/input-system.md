# Input system
Input devices are part of the DIVE core (`src/engine/input/`) and are exported from
`@shopware-ag/dive`. They turn raw browser events into one shared input format. They know nothing about
cameras: a controller connects to them and decides what each event means.

## Events
- `start` / `end` — a channel became active or inactive (a button went down, a gesture began)
- `move` — relative movement on a channel, in `viewport` units (fractions of the element's height) or
  `radians`
- `axis` — absolute position on a channel relative to neutral, in `radians`
- `scale` — a relative scale, above `1` meaning closer

Channels: `primary`, `secondary`, `tertiary`, `orientation`.

## Devices
### PointerInput
Mouse and touch on one element.

| Gesture | Event |
| --- | --- |
| left drag, one finger | `move` on `primary` |
| right drag, left drag with Ctrl/Meta/Shift, two fingers | `move` on `secondary` |
| middle drag | `move` on `tertiary` |
| wheel, pinch | `scale` |

### GyroInput
The way the device is held, as `axis` on `orientation`: `x > 0` turned right, `y > 0` turned up,
relative to the pose held when it was enabled. iOS grants the sensor only from inside a user
gesture, so ask for it before anything else is awaited.

Readings are smoothed before they are reported: a low-pass timed by the events (`smoothing`, per
second, default `15`, `Infinity` turns it off) and a play on top (`deadzone`, default 1°, `0` turns
it off) — the reported tilt only moves once the sensor is further than the play from it, and then
trails it by that much, which takes out the jitter of a hand without the jumps of a threshold.

## Usage
```ts
import { GyroInput, PointerInput } from '@shopware-ag/dive';

const pointer = new PointerInput(canvas);
pointer.addEventListener('move', ({ channel, delta }) => console.log(channel, delta));

button.addEventListener('click', async () => {
    if (!(await GyroInput.requestPermission())) return;

    const gyro = new GyroInput();
    await gyro.enable();
    gyro.addEventListener('axis', ({ value }) => console.log(value));
});
```
