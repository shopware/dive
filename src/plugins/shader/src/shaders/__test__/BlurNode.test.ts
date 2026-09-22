import { Node, Texture, Vector2 } from 'three/webgpu';
import { texture, uniform } from 'three/tsl';
import { BlurNode, type BlurNodeUniforms } from '../BlurNode.ts';

vi.mock('three/tsl', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/tsl')>();

    return { ...actual, texture: vi.fn(actual.texture) };
});

const uniforms = (): BlurNodeUniforms => ({
    uDirection: uniform(new Vector2(0.01, 0)),
});

describe('dive/shader/BlurNode', () => {
    beforeEach(() => {
        vi.mocked(texture).mockClear();
    });

    it('should sample the centre and four taps either side', () => {
        new BlurNode(new Texture(), uniforms());

        // 1 + 2 * TAPS, the whole separable kernel in one direction
        expect(texture).toHaveBeenCalledTimes(1 + 2 * BlurNode.TAPS);
    });

    it('should say how far its widest tap reaches', () => {
        // what a caller divides a blur radius by to get a step
        expect(BlurNode.TAPS).toBe(4);
    });

    it('should return the summed node rather than itself', () => {
        /**
         * the node is the sum, not the instance holding it -- same as GridNode,
         * so it can be handed straight to a material
         */
        const node = new BlurNode(new Texture(), uniforms());

        expect(node).toBeInstanceOf(Node);
        expect(node).not.toBeInstanceOf(BlurNode);
    });

    it('should read the texture it was built with', () => {
        const map = new Texture();

        new BlurNode(map, uniforms());

        vi.mocked(texture).mock.calls.forEach(([sampled]) => {
            expect(sampled).toBe(map);
        });
    });
});
