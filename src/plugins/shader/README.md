
# Shader
The shader plugin provides reusable TSL node building blocks for WebGPU materials.

## Features
- exports node classes instead of legacy shader-lib objects
- callers own `NodeMaterial` creation and uniform defaults
- runtime updates happen on caller-owned `UniformNode`s

## Usage
```ts
import { GridNode, type GridNodeUniforms } from '@shopware-ag/dive/shader';
import { Color, DoubleSide, MeshBasicNodeMaterial } from 'three/webgpu';
import { uniform } from 'three/tsl';

const uniforms: GridNodeUniforms = {
    uGridSize: uniform(10),
    uMajorLineEvery: uniform(2),
    uMinorLineColor: uniform(new Color('green')),
    uMajorLineColor: uniform(new Color('red')),
    uFadeDistance: uniform(25),
};

const material = new MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    outputNode: new GridNode(uniforms),
});
```

## BlurNode
`BlurNode` is one half of a separable Gaussian blur, meant for a full-screen
pass. Blurring horizontally and then vertically costs nine taps twice instead of
the eighty-one a two-dimensional kernel would need, and gives the same result.

It reads `uv()`, so it belongs on a `QuadMesh` rather than on scene geometry.
The texture is a constructor argument rather than a uniform: a ping-pong between
two render targets reads a different texture in each pass, so it takes two nodes.

```ts
import { BlurNode, type BlurNodeUniforms } from '@shopware-ag/dive/shader';
import { NodeMaterial, QuadMesh, RenderTarget, Vector2 } from 'three/webgpu';
import { uniform } from 'three/tsl';

const source = new RenderTarget(512, 512);
const scratch = new RenderTarget(512, 512);

// a radius in UV, divided into one step per tap
const horizontal: BlurNodeUniforms = {
    uDirection: uniform(new Vector2(0.02 / BlurNode.TAPS, 0)),
};
const vertical: BlurNodeUniforms = {
    uDirection: uniform(new Vector2(0, 0.02 / BlurNode.TAPS)),
};

const toScratch = new NodeMaterial();
toScratch.fragmentNode = new BlurNode(source.texture, horizontal);

const toSource = new NodeMaterial();
toSource.fragmentNode = new BlurNode(scratch.texture, vertical);

const quad = new QuadMesh();

quad.material = toScratch;
renderer.setRenderTarget(scratch);
quad.render(renderer);

quad.material = toSource;
renderer.setRenderTarget(source);
quad.render(renderer);
```

`SoftShadowComponent` is what this was written for.

## Runtime Updates
Update the same uniform nodes after material creation to change the shader at runtime.

```ts
uniforms.uGridSize.value = 12;
uniforms.uMajorLineEvery.value = 4;

window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
        uniforms.uGridSize.value += 1;
    } else if (event.key === 'ArrowDown') {
        uniforms.uGridSize.value -= 1;
    }
});
```
