import { Color, type IUniform, type ShaderLibShader } from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';

export interface GridShader extends ShaderLibShader {
    uniforms: {
        /**
         * World-space size of each grid cell in meters
         * @default 1
         */
        uGridSize: IUniform<number>;
        /**
         * Draw a major line every N cells in meters
         * @default 10
         */
        uMajorLineEvery: IUniform<number>;
        /**
         * Color of minor grid lines
         * @default Color('#dddddd')
         */
        uMinorLineColor: IUniform<Color>;
        /**
         * Color of major grid lines
         * @default Color('#888888')
         */
        uMajorLineColor: IUniform<Color>;
        /**
         * Distance at which the grid fades out in meters
         * @default 10
         */
        uFadeDistance: IUniform<number>;
    };
}

export const grid: GridShader = {
    uniforms: {
        uGridSize: { value: 1 },
        uMajorLineEvery: { value: 10 },
        uMinorLineColor: { value: new Color('#dddddd') },
        uMajorLineColor: { value: new Color('#888888') },
        uFadeDistance: { value: 10 },
    },
    vertexShader,
    fragmentShader,
};

declare global {
    interface DIVEShaders {
        grid: GridShader;
    }

    interface DIVEShaderChunk {
        grid_vertex: string;
        grid_fragment: string;
    }
}
