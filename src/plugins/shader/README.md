
# Shader
DIVEShaderLib is a shared shader library. It contains all shaders from the three.js library as well as custom shaders defined in the DIVE shader plugin.

## Features:
- DIVEShaderMaterial wrapper class for correct types
- define custom shaders in the DIVE shader plugin
- access and extend from outside the DIVE package for runtime
- reuse default shaders from three.js

## Usage
```ts
import { Color } from 'three';
import { DIVEShaderMaterial, DIVEShaderLib, type GridShader } from '@shopware-ag/dive/shader';

// create DIVEShaderMaterial with custom uniforms
const gridMaterial = new DIVEShaderMaterial<GridShader>({
    ...DIVEShaderLib.grid,
    uniforms: {
        uGridSize: { value: 10 },
        uMajorLineEvery: { value: 2 },
        uMinorLineColor: { value: new Color('green') },
        uMajorLineColor: { value: new Color('red') },
        uFadeDistance: { value: 25 },
    },
});

// change uniform in runtime
window.addEventListener('keydown', (event: KeyboardEvent) => {
    if(event.key === 'ArrowUp') {
        gridMaterial.uniforms.uGridSize.value += 1;
    } else if(event.key === 'ArrowDown') {
        gridMaterial.uniforms.uGridSize.value -= 1;
    }
});
```
