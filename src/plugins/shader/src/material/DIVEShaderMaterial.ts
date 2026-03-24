import { type ShaderLibShader } from 'three/src/renderers/shaders/ShaderLib.js';
import { ShaderMaterial } from 'three';

export class DIVEShaderMaterial<
    TShader extends ShaderLibShader,
> extends ShaderMaterial {
    declare uniforms: TShader['uniforms'];
}
