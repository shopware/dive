# Image based light, background and dome
A scene's surroundings are three separate things:

- The **image based light** lights the scene from an equirectangular image around it.
- The **background** is what shows behind the scene's content: nothing, a colour, or an image at
  infinity.
- A **dome** is geometry that carries an image and has a flat floor, so a product can stand on the
  ground of the image.

None of them depends on another. The background can show a different image than the one the scene
is lit by, and a dome needs no background setting.

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
- `setBackground` resolves once the image is loaded and on `scene.background`; until then, the
  previous background stays on screen. A colour shows at once.
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

The file is loaded once. The same URL used in several places, also across scenes and DIVE
instances, is loaded and parsed once, and every place shares the one `Texture`, so its pixels are
uploaded once per renderer. Relative, `./`-prefixed and absolute forms of one file count as the same
URL; what you read back (`image`) is the form you passed in.

## When images are freed
The shared `Texture` is disposed once nothing uses it any more: once the light, the background and
every dome showing it have moved on or have been disposed. Coming back to a URL that is still in use
elsewhere gets the same `Texture` again without loading it; using the URL after it was freed loads it
again.

## Dome
> **Experimental:** only checked on a few HDR images so far. The API and its defaults may change
> without a major release.

A background at infinity has no ground: its floor slides along under the model as the camera
moves. A dome puts the image on a sphere whose lower half is flattened into a floor, so a model at
the dome's origin stands on the floor of the photo.

The dome is `GroundProjectionComponent` on a node of your own. Give it the URL of an
equirectangular image with `setImage()`. The floor lies at the node's origin.

```ts
import { DIVENode, GroundProjectionComponent } from '@shopware-ag/dive';

const dome = new DIVENode();
const projection = dome
    .addComponent(new GroundProjectionComponent())
    .applySettings({ height: 1.5, radius: 50 });

// turn the dome with the image based light, so light and backdrop agree
dome.rotation.y = 1;
dive.scene.add(dome);

// the same url is loaded once and shared by the light and the dome
await Promise.all([
    dive.scene.setImageBasedLight({ image: 'studio.hdr', rotation: 1 }),
    projection.setImage('studio.hdr'),
]);
```

| Setting | Default | Meaning |
| --- | --- | --- |
| `height` | `1.5` | How far above the ground the image was taken, in meters. Larger values magnify the floor. |
| `radius` | `50` | Radius of the dome, in meters. |

`setHeight()`, `setRadius()` and `setVisibility()` change one thing at a time.

Things to know:
- `setImage()` resolves once the image is loaded. It shows from the next frame on; until then, the
  previous image stays on the dome. If calls overlap, the last one wins. `setImage(null)` turns the dome white.
- `projection.image` returns the URL you asked for, at once, before it has loaded.
- The same URL as the image based light or the background is loaded once, and the dome shares its
  `Texture`. Disposing the component lets go of it; the `Texture` is disposed once nothing uses it
  any more.
- Add the node to the scene, not to `scene.root`, so it stays out of the entity tree.
- Turn `displayFloor` off. The floor sits at the same height and covers the projected one.
- The projection is only convincing close to where the image was taken, and the camera has to stay
  inside the dome. Limit the distance, e.g. `orbitController.maxDistance`, to a few meters.
- Ground a model with a contact shadow: a `SoftShadowComponent` on the model's node (or QuickView's
  `softShadow` setting) lies on the projected floor.
- The dome is on `BACKGROUND_LAYER_MASK`, so it is not part of bounding boxes, exports, picking or a
  contact-shadow bake.
- The dome draws over the background. You can leave the background transparent.

## Deprecated
These still work and will be removed in the next major release:

| Deprecated | Use instead |
| --- | --- |
| `renderer.environment.setImageUrl(url)` | `scene.setImageBasedLight({ image: url })` |
| `renderer.environment.setRotationY(radians)` | `scene.setImageBasedLight({ rotation })`, and `scene.setBackground({ image, rotation })` for an image background |
| `renderer.environment.setUseAsBackground(true)` | `scene.setBackground({ image, rotation })` |
| `backgroundColor` setting | `background` setting |

`setUseAsBackground(true)` shows the light's image without loading it again.
