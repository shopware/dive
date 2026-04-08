
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
