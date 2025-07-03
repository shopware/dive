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
