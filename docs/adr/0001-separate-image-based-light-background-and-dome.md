# Image based light, background and dome are separate

The environment used to bundle three things: lighting from an HDR image, showing that image as the background (`useAsBackground`), and projecting it onto a dome (`groundProjection`). Each new way of showing a background had to fit into that one unit, so it needed restructuring. We split it into three independent concepts:

- the **image based light**, a scene setting (`scene.setImageBasedLight`)
- the **background**, also a scene setting (`scene.setBackground`, which now takes a colour, an equirectangular image or `null` for transparent)
- the **dome**, which is only `GroundProjectionComponent` on a node, because it is geometry rather than a setting

A background no longer refers to the light's image. Anyone who wants both from one HDR sets it twice, or loads it once and passes the same `Texture`.

## Considered Options

- **Image based light as a light component**, next to the ambient and hemisphere lights. Rejected because a scene can have only one image based light (`scene.environment` is a single slot), and a component would allow several.
- **The background referring to the light's image** (`source: 'lighting'`). Rejected because it keeps the coupling this split removes.
- **Moving the environment from the renderer to a single shared renderer per scene**, as groundwork for multiple views. Postponed: views and renderers stay as they are. The scene holds the description and the renderer bakes from it, which still works if that changes later.

## Consequences

- The renderer bakes only when the light's image changes. Rotation and intensity use three's `environmentRotation`, `environmentIntensity` and `backgroundRotation`, so changing them costs no rebake.
- Images are set by URL only, so the state can store every setting. The same URL used for the light and the background is loaded once and shared.
- `renderer.environment` stays as a deprecated facade on the new scene setters until the next major release, and so does `backgroundColor` in the settings and the state. `groundProjection` was experimental and is removed directly.
