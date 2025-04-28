import { OrbitController } from '../OrbitController';
import { type DIVEPerspectiveCamera } from '../../../../engine/camera/PerspectiveCamera';
import { DIVERenderPipeline } from '../../../../engine/renderer/Renderer';
import { Box3, Vector3 } from 'three';
import { DIVEScene } from '../../../../engine/scene/Scene';

jest.mock('../../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderPipeline: jest.fn(function () {
            this.webglrenderer = {
                domElement: {},
            };
            this.render = jest.fn();
            this.onResize = jest.fn();
            this.getViewport = jest.fn();
            this.setViewport = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../../animation/AnimationSystem', () => {
    return {
        Animator: jest.fn(function () {
            this.uuid = 'test-uuid';
            this.tick = jest.fn();
            this.dispose = jest.fn();
            return this;
        }),
    };
});

const mockCamera = {
    position: {
        clone: jest.fn(() => {
            return mockCamera.position;
        }),
        normalize: jest.fn(() => {
            return mockCamera.position;
        }),
        multiplyScalar: jest.fn(() => {
            return mockCamera.position;
        }),
        set: jest.fn(() => {
            return mockCamera.position;
        }),
    },
    lookAt: jest.fn(),
} as unknown as DIVEPerspectiveCamera;
const mockRenderer = new DIVERenderPipeline(new DIVEScene(), mockCamera);

let controller: OrbitController;

describe('modules/controller/orbit/OrbitController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        controller = new OrbitController(
            mockCamera,
            mockRenderer.webglrenderer.domElement,
        );
    });

    it('should instantiate', () => {
        expect(controller).toBeDefined();
    });

    it('should instantiate with settings', () => {
        controller = new OrbitController(
            mockCamera,
            mockRenderer.webglrenderer.domElement,
        );
        expect(controller).toBeDefined();
    });

    it('should dispose', () => {
        expect(() => controller.Dispose()).not.toThrow();
    });

    it('should compute encompassing view', () => {
        const box = new Box3(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
        const result = controller.ComputeEncompassingView(box);
        expect(result).toBeDefined();
        expect(result.position).toBeDefined();
        expect(result.target).toBeDefined();
        expect(result.position).toEqual(expect.any(Object));
        expect(result.target).toEqual(expect.any(Object));
    });

    it('should compute encompassing view with non-centered box', () => {
        const box = new Box3(new Vector3(1, 1, 1), new Vector3(3, 3, 3));
        const result = controller.ComputeEncompassingView(box);
        expect(result).toBeDefined();
        expect(result.position).toBeDefined();
        expect(result.target).toBeDefined();
        expect(result.position).toEqual(expect.any(Object));
        expect(result.target).toEqual(expect.any(Object));
    });

    it('should compute encompassing view with zero-size box', () => {
        const box = new Box3(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        const result = controller.ComputeEncompassingView(box);
        expect(result).toBeDefined();
        expect(result.position).toBeDefined();
        expect(result.target).toBeDefined();
        expect(result.position).toEqual(expect.any(Object));
        expect(result.target).toEqual(expect.any(Object));
    });

    it('should zoom in with default value', () => {
        expect(() => controller.ZoomIn()).not.toThrow();
    });

    it('should zoom in with custom value', () => {
        expect(() => controller.ZoomIn(10)).not.toThrow();
    });

    it('should zoom out with default value', () => {
        expect(() => controller.ZoomOut()).not.toThrow();
    });

    it('should zoom out with custom value', () => {
        expect(() => controller.ZoomOut(10)).not.toThrow();
    });

    it('should update on tick', () => {
        const spyUpdate = jest.spyOn(controller, 'update').mockImplementation();
        controller.tick();
        expect(spyUpdate).toHaveBeenCalled();
    });

    it('should not update on tick when locked', () => {
        controller.update = jest.fn();
        controller['locked'] = true;
        controller.tick();
        expect(controller.update).not.toHaveBeenCalled();
    });

    it('should set locked property', () => {
        controller['locked'] = true;
        expect(controller['locked']).toBe(true);
    });

    it('should update on tick when not locked', () => {
        controller.update = jest.fn();
        controller['locked'] = false;
        controller.tick();
        expect(controller.update).toHaveBeenCalled();
    });

    it('should instantiate with default settings when no settings provided', () => {
        controller = new OrbitController(
            mockCamera,
            mockRenderer.webglrenderer.domElement,
        );
        expect(controller.enableDamping).toBe(true);
        expect(controller.dampingFactor).toBe(0.05);
    });

    it('should instantiate with custom settings', () => {
        controller = new OrbitController(
            mockCamera,
            mockRenderer.webglrenderer.domElement,
            {
                enableDamping: false,
                dampingFactor: 0.1,
            },
        );
        expect(controller.enableDamping).toBe(false);
        expect(controller.dampingFactor).toBe(0.1);
    });

    it('should instantiate with partial settings with enableDamping false', () => {
        controller = new OrbitController(
            mockCamera,
            mockRenderer.webglrenderer.domElement,
            {
                enableDamping: false,
                // dampingFactor not provided, should use default
            },
        );
        expect(controller.enableDamping).toBe(false);
        expect(controller.dampingFactor).toBe(0.05); // default value
    });

    it('should instantiate with partial settings with enableDamping true', () => {
        controller = new OrbitController(
            mockCamera,
            mockRenderer.webglrenderer.domElement,
            {
                // enableDamping not provided, should use default
                dampingFactor: 0.1,
            },
        );
        expect(controller.enableDamping).toBe(true);
        expect(controller.dampingFactor).toBe(0.1); // default value
    });
});
