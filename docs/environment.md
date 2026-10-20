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
| `image` | the bundled default HDR | A URL, or a `Texture` you loaded yourself. |
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
- `dive.scene.imageBasedLight` returns what is in place: `{ image, rotation, intensity, texture }`,
  or `null` while there is none. A new image appears there once it has loaded.

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
- `setBackground` resolves once the image is loaded. Until then, the previous background stays.
- Setting the same image with a new rotation only turns it. Nothing is loaded again.
- If calls overlap, the last one wins.
- `dive.scene.getBackground()` returns what is in place: `{ type: 'color', color }`,
  `{ type: 'image', image, rotation, texture }`, or `null` for transparent.

## One image for both
To light with an HDR and show it behind the product, set it on both. Give both the same rotation to
keep them aligned:

```ts
await Promise.all([
    dive.scene.setImageBasedLight({ image: 'studio.hdr', rotation: 1 }),
    dive.scene.setBackground({ image: 'studio.hdr', rotation: 1 }),
]);
```

This loads the file twice. To load it once, load the texture yourself and pass it to both:

```ts
import { EquirectangularReflectionMapping } from 'three/webgpu';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

const texture = await new HDRLoader().loadAsync('studio.hdr');
texture.mapping = EquirectangularReflectionMapping;

await dive.scene.setImageBasedLight({ image: texture });
await dive.scene.setBackground({ image: texture });
```

## Who frees the images
- An image the scene loaded from a URL belongs to the scene. It is freed when it is replaced and
  when the scene is disposed.
- A `Texture` you pass in is borrowed. DIVE never disposes it, so you can keep using it elsewhere.
  Dispose it yourself once nothing uses it any more.

## Dome
> **Experimental:** only checked on a few HDR images so far. The API and its defaults may change
> without a major release.

A background at infinity has no ground: its floor slides along under the model as the camera
moves. A dome puts the image on a sphere whose lower half is flattened into a floor, so a model at
the dome's origin stands on the floor of the photo.

The dome is `GroundProjectionComponent` on a node of your own. Give it any equirectangular texture
with `setMap()`. The floor lies at the node's origin.

```ts
import { DIVENode, GroundProjectionComponent } from '@shopware-ag/dive';

const dome = new DIVENode();
dome.addComponent(new GroundProjectionComponent())
    .setMap(texture)
    .applySettings({ height: 1.5, radius: 50 });

// turn the dome with the image based light, so light and backdrop agree
dome.rotation.y = 1;
await dive.scene.setImageBasedLight({ image: texture, rotation: 1 });

dive.scene.add(dome);
```

| Setting | Default | Meaning |
| --- | --- | --- |
| `height` | `1.5` | How far above the ground the image was taken, in meters. Larger values magnify the floor. |
| `radius` | `50` | Radius of the dome, in meters. |

`setHeight()`, `setRadius()` and `setVisibility()` change one thing at a time.

Things to know:
- The texture is borrowed. The component never disposes it.
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
