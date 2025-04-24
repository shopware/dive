import { Matrix4, Vector4, Color, AxesHelper, Material } from 'three';
import { DIVEAxisCamera } from '../AxisCamera';
import { DIVERenderer } from '../../../engine/renderer/Renderer';
import { DIVEScene } from '../../../engine/scene/Scene';
import { DIVEOrbitController } from '../../controller/orbit/OrbitController';
import { DIVERenderPipeline } from '../../../engine/pipeline/RenderPipeline';
import { COORDINATE_LAYER_MASK } from '../../../constants/VisibilityLayerMask';

const mockRenderer = {
    render: jest.fn(),
    webglrenderer: {
        getViewport: jest.fn().mockReturnValue(new Vector4(0, 0, 800, 600)),
        setViewport: jest.fn(),
        autoClear: true,
    },
} as unknown as DIVERenderer;

const mockScene = {
    add: jest.fn(),
    remove: jest.fn(),
    background: null,
} as unknown as DIVEScene;

const mockPipeline = {
    addPostRenderStep: jest.fn(),
    removePostRenderStep: jest.fn(),
} as unknown as DIVERenderPipeline;

const mockController = {
    object: {
        matrix: new Matrix4(),
    },
} as unknown as DIVEOrbitController;

describe('DIVEAxisCamera', () => {
    let axisCamera: DIVEAxisCamera;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRenderer.webglrenderer.autoClear = true;
        axisCamera = new DIVEAxisCamera(
            mockRenderer,
            mockPipeline,
            mockScene,
            mockController,
        );
    });

    describe('constructor', () => {
        it('should initialize with correct properties', () => {
            expect(axisCamera).toBeInstanceOf(DIVEAxisCamera);
            expect(axisCamera.layers.mask).toBe(COORDINATE_LAYER_MASK);
            expect(mockScene.add).toHaveBeenCalledWith(axisCamera);
            expect(mockPipeline.addPostRenderStep).toHaveBeenCalled();
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

    describe('Dispose', () => {
        it('should clean up resources', () => {
            axisCamera.Dispose();
            expect(mockPipeline.removePostRenderStep).toHaveBeenCalled();
            expect(mockScene.remove).toHaveBeenCalledWith(axisCamera);
        });

        it('should not throw when called multiple times', () => {
            expect(() => {
                axisCamera.Dispose();
                axisCamera.Dispose();
            }).not.toThrow();
        });
    });

    describe('SetFromCameraMatrix', () => {
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

            axisCamera.SetFromCameraMatrix(testMatrix);

            expect(
                axisCamera['axesHelper'].rotation.setFromRotationMatrix,
            ).toHaveBeenCalled();
        });

        it('should handle identity matrix', () => {
            const identityMatrix = new Matrix4();
            expect(() => {
                axisCamera.SetFromCameraMatrix(identityMatrix);
            }).not.toThrow();
        });
    });

    describe('_postRenderCallback', () => {
        it('should handle viewport and rendering correctly', () => {
            const originalBackground = new Color(0x000000);
            mockScene.background = originalBackground;
            const viewport = new Vector4();

            axisCamera['_postRenderCallback']();

            expect(mockRenderer.webglrenderer.getViewport).toHaveBeenCalledWith(
                viewport,
            );
            expect(mockRenderer.webglrenderer.setViewport).toHaveBeenCalledWith(
                0,
                0,
                150,
                150,
            );
            expect(mockRenderer.render).toHaveBeenCalledWith(
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

            axisCamera['_postRenderCallback']();

            expect(mockScene.background).toBeNull();
        });
    });
});
