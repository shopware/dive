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

### Resources

**Resource prototype**:
The loaded data that exists once per URL; resources are drawn from it. It is freed once the last resource drawn from it is given back.
_Avoid_: Asset, source, cache entry

**Resource**:
What one DIVE object holds of a resource prototype, requested by URL: the loaded data itself where it can be shared (an image), or a copy of its own where it cannot. The same URL used in several places is loaded once; each user holds its own resource.
_Avoid_: Asset, slot, handle

"Asset" stays the word for files (`AssetLoader`, `AssetExporter`).
