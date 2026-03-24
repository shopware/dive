import { ShaderLib } from 'three/src/renderers/shaders/ShaderLib.js';

// DIVE shaders
import { grid } from './grid/index.ts';

export const DIVEShaderLib: typeof ShaderLib & DIVEShaders = {
    ...ShaderLib,
    grid,
};
