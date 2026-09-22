import {
    Node,
    type Texture,
    type UniformNode,
    type Vector2,
} from 'three/webgpu';
import { texture, uv } from 'three/tsl';

/**
 * A nine-tap Gaussian kernel, as weights for the centre and four steps out.
 *
 * Sums to one, so a blurred texel keeps the brightness of what it came from.
 */
const WEIGHTS = [0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216];

export type BlurNodeUniforms = {
    /**
     * How far one tap steps, in UV.
     *
     * A direction and a radius in one: `(r, 0)` blurs horizontally, `(0, r)`
     * vertically. The widest tap sits four steps out, so the radius this
     * describes is four times its length.
     */
    uDirection: UniformNode<'vec2', Vector2>;
};

/**
 * One half of a separable Gaussian blur over a texture.
 *
 * Separable means the two dimensions are two passes: blurring horizontally and
 * then vertically costs nine taps twice instead of the eighty-one a single
 * two-dimensional kernel would need, and gives the same result.
 *
 * Meant for a full-screen pass -- a `QuadMesh` with a `NodeMaterial` whose
 * `fragmentNode` is one of these -- because it reads {@link uv}, which is the
 * quad's own coordinates rather than anything in the scene.
 *
 * The texture is a constructor argument rather than a uniform, unlike the
 * direction: a ping-pong between two render targets reads a different texture
 * in each pass, and two nodes with a texture each say that more plainly than
 * one node whose texture is swapped between draws.
 *
 * @module
 */
export class BlurNode extends Node {
    /**
     * How many steps out the widest tap sits.
     *
     * What turns a blur radius into a {@link BlurNodeUniforms.uDirection}: the
     * radius divided by this is one step.
     */
    public static readonly TAPS = WEIGHTS.length - 1;

    /**
     * @param map - What to blur.
     * @param uniforms - The step between taps.
     */
    constructor(map: Texture, uniforms: BlurNodeUniforms) {
        super();

        this.name = 'BlurNode';

        const coord = uv();

        let sum = texture(map, coord).mul(WEIGHTS[0]);

        for (let tap = 1; tap < WEIGHTS.length; tap++) {
            const offset = uniforms.uDirection.mul(tap);

            // symmetric: the same weight either side of the centre
            sum = sum
                .add(texture(map, coord.add(offset)).mul(WEIGHTS[tap]))
                .add(texture(map, coord.sub(offset)).mul(WEIGHTS[tap]));
        }

        return sum;
    }
}
