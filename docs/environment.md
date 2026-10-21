# Image based light and background
A scene's surroundings are two separate things:

- The **image based light** lights the scene from an equirectangular image around it.
- The **background** is what shows behind the scene's content: nothing, a colour, or an image at
  infinity.

Neither depends on the other. The background can show a different image than the one the scene is
lit by.

## Image based light
A scene has at most one image based light. Without any setting, it is lit by a bundled default HDR.

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = new DIVE({
    imageBasedLight: { image: 'studio.hdr', rotation: Math.PI / 2, intensity: 1 },
});

// later
await dive.scene.setImageBasedLight({ image: 'sunset.hdr' });
dive.scene.setImageBasedLight({ rotation: Math.PI }); // radians around Y
dive.scene.setImageBasedLight({ intensity: 0.5 });

// no image based light: only the scene's light entities light it
dive.scene.setImageBasedLight(null);
```

| Setting | Default | Meaning |
| --- | --- | --- |
| `image` | `null` | The URL of the image, or `null` for the bundled default HDR. |
| `rotation` | `0` | Rotation around Y, in radians. |
| `intensity` | `1` | How strongly the image lights the scene. |

Fields you leave out keep their current value. After `null`, they start from the defaults again.

Things to know:
- `setImageBasedLight` resolves once the image is loaded. The light shows from the next frame on.
- `dive.startAsync()` does not wait for the image. If you need the light in place, await the setter.
  To wait for the default image, `await dive.scene.setImageBasedLight({})`.
- Rotation and intensity are cheap to change. You can drive them from a slider or an animation.
  Only a new image costs a new bake.
- If calls overlap, the last one wins.
- `.hdr` and `.exr` images are read as linear, `.jpg`, `.png` and `.webp` as sRGB. The loader is
  picked by file extension.
- `dive.scene.imageBasedLight` returns what you asked for: `{ image, rotation, intensity }`, or
  `null` for none. The bundled default HDR shows up as `image: null`. A new image shows up there at
  once, and the previous one lights the scene until it has loaded.

## Background
The background takes one of three forms:

```ts
// transparent: the page behind the canvas shows through
await dive.scene.setBackground(null);

// a colour
await dive.scene.setBackground('#f0f0f0');

// an equirectangular image at infinity, with its own rotation
await dive.scene.setBackground({ image: 'panorama.jpg', rotation: Math.PI / 2 });
```

The same forms work as the initial setting: `new DIVE({ background: '#f0f0f0' })`. The default is
transparent. The colour `'transparent'` means the same as `null`.

Things to know:
- An image background works with `.jpg`, `.png`, `.webp`, `.hdr` and `.exr`.
- `setBackground` resolves once the image is loaded. Until then, the previous background stays on
  screen.
- Setting the same image with a new rotation only turns it. Nothing is loaded again.
- If calls overlap, the last one wins.
- `dive.scene.getBackground()` returns what you asked for: `{ type: 'color', color }`,
  `{ type: 'image', image, rotation }`, or `null` for transparent. A new image shows up there at
  once, before it has loaded.

## One image for both
To light with an HDR and show it behind the product, set it on both. Give both the same rotation to
keep them aligned:

```ts
await Promise.all([
    dive.scene.setImageBasedLight({ image: 'studio.hdr', rotation: 1 }),
    dive.scene.setBackground({ image: 'studio.hdr', rotation: 1 }),
]);
```

The file is loaded once. The same URL used in several places, also across scenes, is loaded once
and shared.

## When images are freed
DIVE frees an image once nothing uses it any more: once the light and the background have both
moved on to something else, or their scene is disposed. Using the URL again after that loads it
again.

## Deprecated
These still work and will be removed in the next major release:

| Deprecated | Use instead |
| --- | --- |
| `renderer.environment.setImageUrl(url)` | `scene.setImageBasedLight({ image: url })` |
| `renderer.environment.setRotationY(radians)` | `scene.setImageBasedLight({ rotation })`, and `scene.setBackground({ image, rotation })` for an image background |
| `renderer.environment.setUseAsBackground(true)` | `scene.setBackground({ image, rotation })` |
| `backgroundColor` setting | `background` setting |

`setUseAsBackground(true)` shows the light's image without loading it again.
