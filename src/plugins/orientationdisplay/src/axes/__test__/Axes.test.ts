vi.mock('@shopware-ag/dive/shader', () => ({
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

vi.mock('three-spritetext', async () => {
    const { Object3D } = await vi.importActual<typeof import('three')>('three');

    return {
        default: vi.fn(function (this: any) {
            const sprite = new Object3D();
            sprite.layers.mask = 0;
            return sprite;
        }),
    };
});

import { Matrix4 } from 'three';
import { OrientationDisplayAxes } from '../Axes.ts';

describe('OrientationDisplayAxes', () => {
    it('should construct without errors', () => {
        const axes = new OrientationDisplayAxes();
        expect(axes).toBeInstanceOf(OrientationDisplayAxes);
    });

    it('should set rotation from camera matrix', () => {
        const axes = new OrientationDisplayAxes();
        const testMatrix = new Matrix4();
        testMatrix.elements = [
            1,
            0,
            0,
            0,
            0,
            0,
            -1,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
        ];
        expect(() => axes.setFromCameraMatrix(testMatrix)).not.toThrow();
    });
});
