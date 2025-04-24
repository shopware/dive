import { DIVEOrbitController } from '../OrbitController';
import { type DIVEPerspectiveCamera } from '../../../../engine/camera/PerspectiveCamera';
import { DIVERenderer } from '../../../../engine/renderer/Renderer';
import { Box3 } from 'three';
import { DIVEAnimationSystem } from '../../../animation/AnimationSystem';
import { Tween } from '@tweenjs/tween.js';
import { DIVERenderPipeline } from '../../../../engine/pipeline/RenderPipeline';

jest.mock('../../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderer: jest.fn(function () {
            this.domElement = {
                style: {},
            };
            return this;
        }),
    };
});

jest.mock('../../../../engine/pipeline/RenderPipeline', () => {
    return {
        DIVERenderPipeline: jest.fn(function () {
            this.addPreRenderStep = (callback: () => void) => {
                callback();
            };
            this.removePreRenderStep = (callback: () => void) => {
                callback();
            };

            return this;
        }),
    };
});

jest.mock('../../../animation/AnimationSystem', () => {
    return {
        DIVEAnimationSystem: jest.fn(function () {
            this.domElement = {
                style: {},
            };
            this.Animate = <T extends object>(obj: T) => {
                return new Tween<T>(obj);
            };

            return this;
        }),
    };
});

const moveToPos = { x: 10, y: 0, z: 0 };
const moveToQuat = { x: 0, y: 0, z: 0 };
const moveToDuration = 1000;

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
const mockRenderer = {
    render: jest.fn(),
    OnResize: jest.fn(),
    getViewport: jest.fn(),
    setViewport: jest.fn(),
    AddPreRenderCallback: jest.fn((callback) => {
        callback();
    }),
    AddPostRenderCallback: jest.fn((callback) => {
        callback();
    }),
    RemovePreRenderCallback: jest.fn(),
    RemovePostRenderCallback: jest.fn(),
} as unknown as DIVERenderer;

const mockPipeline = {
    addPreRenderStep: jest.fn(),
    addPostRenderStep: jest.fn(),
    removePreRenderStep: jest.fn(),
    removePostRenderStep: jest.fn(),
    tick: jest.fn(),
    dispose: jest.fn(),
} as unknown as DIVERenderPipeline;

const mockAnimSystem = new DIVEAnimationSystem();

let controller: DIVEOrbitController;

describe('dive/controls/DIVEOrbitControls', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockPipeline,
            mockAnimSystem,
        );
    });

    it('should instantiate', () => {
        expect(controller).toBeDefined();
        expect(() => controller['stopMoveTo']()).not.toThrow();
        expect(() => controller['stopRevertLast']()).not.toThrow();
    });

    it('should instantiate with settings', () => {
        controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockPipeline,
            mockAnimSystem,
            {},
        );
        expect(controller).toBeDefined();
    });

    it('should dispose', () => {
        expect(() => controller.Dispose()).not.toThrow();
    });

    it('should compute encompassing view', () => {
        expect(() =>
            controller.ComputeEncompassingView(new Box3()),
        ).not.toThrow();
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

    it('should move to', () => {
        expect(() =>
            controller.MoveTo(moveToPos, moveToQuat, moveToDuration, false),
        ).not.toThrow();
    });

    it('should revert move to', () => {
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should revert move to without values', () => {
        expect(() =>
            controller.MoveTo(undefined, undefined, moveToDuration, true),
        ).not.toThrow();
    });

    it('should revert move to with lock', async () => {
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should move after revert with lock', async () => {
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        controller.RevertLast(moveToDuration);
        expect(() =>
            controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true),
        ).not.toThrow();
    });

    it('should catch multiple move tos', () => {
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        controller.RevertLast(moveToDuration);
        expect(() =>
            controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true),
        ).not.toThrow();
        controller['animating'] = true;
        expect(() =>
            controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true),
        ).not.toThrow();
        expect(() =>
            controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true),
        ).not.toThrow();
    });

    it('should catch multiple reverts', () => {
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should execute preRenderCallback', () => {
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller['preRenderCallback']()).not.toThrow();
        controller['locked'] = true;
        expect(() => controller['preRenderCallback']()).not.toThrow();
    });

    it('should handle preRenderCallback when not locked', () => {
        controller['locked'] = false;
        const updateSpy = jest.spyOn(controller, 'update');
        controller['preRenderCallback']();
        expect(updateSpy).toHaveBeenCalled();
    });

    it('should handle preRenderCallback when locked', () => {
        const updateSpy = jest.spyOn(controller, 'update');
        controller['locked'] = true;
        updateSpy.mockClear(); // Clear any previous calls
        controller['preRenderCallback']();
        expect(updateSpy).not.toHaveBeenCalled();
        controller['locked'] = false; // Reset for other tests
    });

    it('should properly set up and remove preRenderCallback', () => {
        const addSpy = jest.spyOn(mockPipeline, 'addPreRenderStep');
        const removeSpy = jest.spyOn(mockPipeline, 'removePreRenderStep');

        // Create new controller to test setup
        const newController = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockPipeline,
            mockAnimSystem,
        );

        expect(addSpy).toHaveBeenCalled();

        // Test removal
        newController.Dispose();
        expect(removeSpy).toHaveBeenCalled();
    });

    it('should handle stopMoveTo and stopRevertLast', () => {
        // Test initial state
        expect(controller['stopMoveTo']).toBeDefined();
        expect(controller['stopRevertLast']).toBeDefined();

        // Call the stop functions
        controller['stopMoveTo']();
        controller['stopRevertLast']();
    });

    it('should handle animation completion callbacks', () => {
        // Test MoveTo animation completion
        controller.MoveTo(moveToPos, moveToQuat, 0, false);
        expect(controller['animating']).toBe(false);
        expect(controller['enabled']).toBe(true);

        // Test MoveTo with lock
        controller.MoveTo(moveToPos, moveToQuat, 0, true);
        expect(controller['enabled']).toBe(false);
    });
});
