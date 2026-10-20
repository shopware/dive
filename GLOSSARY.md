# DIVE

A 3D engine for showing and editing products in the browser.

## Language

### Surroundings

**Image based light**:
The light a scene gets from an equirectangular image around it. There is at most one per scene.
_Avoid_: Environment, environment map, HDR

**Background**:
What is shown behind the scene's content where nothing else is drawn: nothing (transparent), a colour, or an image at infinity.
_Avoid_: Environment, skybox, backdrop

**Dome**:
Geometry that carries an image and has a flat floor at its node's origin, so that a product can stand on the ground of the image.
_Avoid_: Ground projection (as a setting), grounded skybox
