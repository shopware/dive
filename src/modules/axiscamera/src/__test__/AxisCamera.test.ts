import { Matrix4, Vector4, Color, Material } from 'three';
import { DIVEAxisCamera } from '../AxisCamera.ts';
import {
    DIVERenderPipeline,
    DIVEScene,
    COORDINATE_LAYER_MASK,
    DIVEPerspectiveCamera,
} from '@shopware-ag/dive';

const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    background: null,
} as unknown as DIVEScene;

const mockCamera = {
    matrix: new Matrix4(),
} as unknown as DIVEPerspectiveCamera;

const mockRenderer = {
    render: vi.fn(),
    webglrenderer: {
        getViewport: vi.fn().mockReturnValue(new Vector4(0, 0, 800, 600)),
        setViewport: vi.fn(),
        render: vi.fn(),
        autoClear: true,
    },
} as unknown as DIVERenderPipeline;

describe('DIVEAxisCamera', () => {
    let axisCamera: DIVEAxisCamera;

    beforeEach(() => {
        vi.clearAllMocks();
        mockRenderer.webglrenderer.autoClear = true;
        axisCamera = new DIVEAxisCamera(mockRenderer, mockScene, mockCamera);
    });

    describe('constructor', () => {
        it('should initialize with correct properties', () => {
            expect(axisCamera).toBeInstanceOf(DIVEAxisCamera);
            expect(axisCamera.layers.mask).toBe(COORDINATE_LAYER_MASK);
            expect(mockScene.add).toHaveBeenCalledWith(axisCamera);
        });

        it('should create and configure axes helper', () => {
            expect(axisCamera['axesHelper'].layers.mask).toBe(
                COORDINATE_LAYER_MASK,
            );
            expect(axisCamera['axesHelper'].position.set).toHaveBeenCalledWith(
                0,
                0,
                -1,
            );
            expect(
                (axisCamera['axesHelper'].material as Material).depthTest,
            ).toBe(false);
        });

        it('should create and configure axis labels', () => {
            expect(axisCamera['axesHelper'].children.length).toBe(3);
            expect(axisCamera['axesHelper'].children[0].position.x).toEqual(
                0.7,
            );
            expect(axisCamera['axesHelper'].children[0].position.y).toEqual(0);
            expect(axisCamera['axesHelper'].children[0].position.z).toEqual(0);
            expect(axisCamera['axesHelper'].children[1].position.x).toEqual(0);
            expect(axisCamera['axesHelper'].children[1].position.y).toEqual(
                0.7,
            );
            expect(axisCamera['axesHelper'].children[1].position.z).toEqual(0);
            expect(axisCamera['axesHelper'].children[2].position.x).toEqual(0);
            expect(axisCamera['axesHelper'].children[2].position.y).toEqual(0);
            expect(axisCamera['axesHelper'].children[2].position.z).toEqual(
                0.7,
            );
        });
    });

    describe('dispose', () => {
        it('should clean up resources', () => {
            axisCamera.dispose();
            expect(mockScene.remove).toHaveBeenCalledWith(axisCamera);
        });

        it('should not throw when called multiple times', () => {
            expect(() => {
                axisCamera.dispose();
                axisCamera.dispose();
            }).not.toThrow();
        });
    });

    describe('setFromCameraMatrix', () => {
        it('should update axes helper rotation based on camera matrix', () => {
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

            axisCamera.setFromCameraMatrix(testMatrix);

            expect(
                axisCamera['axesHelper'].rotation.setFromRotationMatrix,
            ).toHaveBeenCalled();
        });

        it('should handle identity matrix', () => {
            const identityMatrix = new Matrix4();
            expect(() => {
                axisCamera.setFromCameraMatrix(identityMatrix);
            }).not.toThrow();
        });
    });

    describe('tick', () => {
        it('should handle viewport and rendering correctly', () => {
            const originalBackground = new Color(0x000000);
            mockScene.background = originalBackground;
            const viewport = new Vector4();

            axisCamera.tick();

            expect(mockRenderer.webglrenderer.getViewport).toHaveBeenCalledWith(
                viewport,
            );
            expect(mockRenderer.webglrenderer.setViewport).toHaveBeenCalledWith(
                0,
                0,
                150,
                150,
            );
            expect(mockRenderer.webglrenderer.render).toHaveBeenCalledWith(
                mockScene,
                axisCamera,
            );
            expect(mockRenderer.webglrenderer.setViewport).toHaveBeenCalledWith(
                viewport,
            );
            expect(mockScene.background).toBe(originalBackground);
        });

        it('should handle null background', () => {
            mockScene.background = null;

            axisCamera.tick();

            expect(mockScene.background).toBeNull();
        });
    });
});
