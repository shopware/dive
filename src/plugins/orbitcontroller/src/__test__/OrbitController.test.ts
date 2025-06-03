import { OrbitController } from '../OrbitController.ts';
import {
    DIVEPerspectiveCamera,
    DIVERenderPipeline,
    DIVEScene,
} from '@shopware-ag/dive';
import { Box3, Vector3 } from 'three';

// Add a real canvas for the controls domElement
const canvas = document.createElement('canvas');

vi.mock('@shopware-ag/dive', async () => {
    const actual =
        await vi.importActual<typeof import('@shopware-ag/dive')>(
            '@shopware-ag/dive',
        );
    return {
        ...actual,
        DIVERenderPipeline: vi.fn(function (this: any) {
            this.webglrenderer = {
                domElement: canvas,
            };
            this.render = vi.fn();
            this.onResize = vi.fn();
            this.getViewport = vi.fn();
            this.setViewport = vi.fn();
            return this;
        }),
    };
});

const mockCamera = {
    position: {
        clone: vi.fn(() => {
            return mockCamera.position;
        }),
        normalize: vi.fn(() => {
            return mockCamera.position;
        }),
        multiplyScalar: vi.fn(() => {
            return mockCamera.position;
        }),
        set: vi.fn(() => {
            return mockCamera.position;
        }),
    },
    lookAt: vi.fn(),
} as unknown as DIVEPerspectiveCamera;
const mockRenderer = new DIVERenderPipeline(new DIVEScene(), mockCamera);

let controller: OrbitController;

describe('modules/controller/orbit/OrbitController', () => {
    afterEach(() => {
        vi.clearAllMocks();
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
        expect(() => controller.dispose()).not.toThrow();
    });

    it('should compute encompassing view', () => {
        const box = new Box3(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
        const result = controller.computeEncompassingView(box);
        expect(result).toBeDefined();
        expect(result.position).toBeDefined();
        expect(result.target).toBeDefined();
        expect(result.position).toEqual(expect.any(Object));
        expect(result.target).toEqual(expect.any(Object));
    });

    it('should compute encompassing view with non-centered box', () => {
        const box = new Box3(new Vector3(1, 1, 1), new Vector3(3, 3, 3));
        const result = controller.computeEncompassingView(box);
        expect(result).toBeDefined();
        expect(result.position).toBeDefined();
        expect(result.target).toBeDefined();
        expect(result.position).toEqual(expect.any(Object));
        expect(result.target).toEqual(expect.any(Object));
    });

    it('should compute encompassing view with zero-size box', () => {
        const box = new Box3(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        const result = controller.computeEncompassingView(box);
        expect(result).toBeDefined();
        expect(result.position).toBeDefined();
        expect(result.target).toBeDefined();
        expect(result.position).toEqual(expect.any(Object));
        expect(result.target).toEqual(expect.any(Object));
    });

    it('should zoom in with default value', () => {
        expect(() => controller.zoomIn()).not.toThrow();
    });

    it('should zoom in with custom value', () => {
        expect(() => controller.zoomIn(10)).not.toThrow();
    });

    it('should zoom out with default value', () => {
        expect(() => controller.zoomOut()).not.toThrow();
    });

    it('should zoom out with custom value', () => {
        expect(() => controller.zoomOut(10)).not.toThrow();
    });

    it('should update on tick', () => {
        controller.enabled = true;
        const spyUpdate = vi
            .spyOn(controller, 'update')
            .mockImplementation(() => {
                return true;
            });
        controller.tick();
        expect(spyUpdate).toHaveBeenCalled();
    });

    it('should not update on tick when locked', () => {
        controller.update = vi.fn();
        controller.enabled = false;
        controller.tick();
        expect(controller.update).not.toHaveBeenCalled();
    });

    it('should set locked property', () => {
        controller.enabled = false;
        expect(controller.enabled).toBe(false);
    });

    it('should update on tick when not locked', () => {
        controller.update = vi.fn();
        controller.enabled = true;
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
