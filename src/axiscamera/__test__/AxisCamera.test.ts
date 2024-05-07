import { Matrix4 } from 'three';
import DIVEAxisCamera from '../AxisCamera';

jest.mock('three-spritetext', () => {
    return jest.fn(() => {
        return {
            isObject3D: true,
            parent: null,
            dispatchEvent: jest.fn(),
            layers: {
                mask: 0,
            },
            position: {
                set: jest.fn(),
            },
            removeFromParent: jest.fn(),
        }
    },
    )
});

describe('dive/axiscamera/DIVEAxisCamera', () => {
    it('should instantiate', () => {
        const cam = new DIVEAxisCamera();
        expect(cam).toBeDefined();
    });

    it('should set rotation from Matrix4', () => {
        expect.assertions(0);
        const matrix = {
            elements: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ],
        } as Matrix4;
        const cam = new DIVEAxisCamera();
        cam.SetFromCameraMatrix(matrix);
    });
});