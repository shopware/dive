import { Matrix4 } from 'three/webgpu';
import { OrientationDisplayAxes } from '../Axes.ts';

vi.mock('@shopware-ag/dive/shader', () => ({
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

vi.mock('three-spritetext', async () => {
    const actual =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');

    return {
        default: vi.fn((text: string, textHeight: number, color: unknown) =>
            Object.assign(new actual.Object3D(), {
                userData: { text, textHeight, color },
            }),
        ),
    };
});

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
