import { type Color, Node, type UniformNode } from 'three/webgpu';
import {
    abs,
    cameraPosition,
    float,
    fract,
    fwidth,
    max,
    min,
    mix,
    positionWorld,
    smoothstep,
    step,
    vec4,
} from 'three/tsl';

export type GridNodeUniforms = {
    /** World-space size of each grid cell in meters. */
    uGridSize: UniformNode<'float', number>;
    /** Draw a major line every N cells. */
    uMajorLineEvery: UniformNode<'float', number>;
    /** Color of minor grid lines. */
    uMinorLineColor: UniformNode<'color', Color>;
    /** Color of major grid lines. */
    uMajorLineColor: UniformNode<'color', Color>;
    /** Distance at which the grid fades out in meters. */
    uFadeDistance: UniformNode<'float', number>;
};

export class GridNode extends Node {
    constructor(uniforms: GridNodeUniforms) {
        super();

        this.name = 'GridNode';

        const coord = positionWorld.xz;

        const minorCoord = coord.div(uniforms.uGridSize);
        const minorGrid = abs(fract(minorCoord.sub(0.5)).sub(0.5)).div(
            fwidth(minorCoord),
        );
        const lineMinor = min(minorGrid.x, minorGrid.y);

        const majorSize = uniforms.uGridSize.mul(uniforms.uMajorLineEvery);
        const majorCoord = coord.div(majorSize);
        const majorGrid = abs(fract(majorCoord.sub(0.5)).sub(0.5)).div(
            fwidth(majorCoord),
        );
        const lineMajor = min(majorGrid.x, majorGrid.y);

        const minorAlpha = float(1).sub(min(lineMinor, 1));
        const majorAlpha = float(1).sub(min(lineMajor.div(2), 1));

        const alpha = max(minorAlpha, majorAlpha).mul(
            float(1).sub(
                smoothstep(
                    uniforms.uFadeDistance.mul(0.5),
                    uniforms.uFadeDistance,
                    positionWorld.xz.sub(cameraPosition.xz).length(),
                ),
            ),
        );

        alpha.lessThan(float(0.001)).discard();

        const color = mix(
            uniforms.uMinorLineColor,
            uniforms.uMajorLineColor,
            step(minorAlpha, majorAlpha),
        );

        return vec4(color, alpha);
    }
}
