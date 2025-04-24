import { DIVEOrbitController } from '../OrbitController';
import { type DIVEPerspectiveCamera } from '../../../../engine/camera/PerspectiveCamera';
import { DIVERenderer } from '../../../../engine/renderer/Renderer';
import { Box3 } from 'three';
import { DIVEAnimationSystem } from '../../../animation/AnimationSystem';
import { Tween } from '@tweenjs/tween.js';

jest.mock('../../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderer: jest.fn(function () {
            this.domElement = {
                style: {},
            };
            this.AddPreRenderCallback = (callback: () => void) => {
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

const mockAnimSystem = new DIVEAnimationSystem(mockRenderer);

describe('dive/controls/DIVEOrbitControls', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
            {},
        );
        expect(controller).toBeDefined();
    });

    it('should instantiate with settings', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
            {
                enableDamping: false,
                dampingFactor: 0.5,
            },
        );
        expect(controller).toBeDefined();
    });

    it('should dispose', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() => controller.Dispose()).not.toThrow();
    });

    it('should compute encompassing view', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() =>
            controller.ComputeEncompassingView(new Box3()),
        ).not.toThrow();
    });

    it('should zoom in with default value', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() => controller.ZoomIn()).not.toThrow();
    });

    it('should zoom in with custom value', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() => controller.ZoomIn(10)).not.toThrow();
    });

    it('should zoom out with default value', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() => controller.ZoomOut()).not.toThrow();
    });

    it('should zoom out with custom value', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() => controller.ZoomOut(10)).not.toThrow();
    });

    it('should move to', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() =>
            controller.MoveTo(moveToPos, moveToQuat, moveToDuration, false),
        ).not.toThrow();
    });

    it('should revert move to', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should revert move to without values', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        expect(() =>
            controller.MoveTo(undefined, undefined, moveToDuration, true),
        ).not.toThrow();
    });

    it('should revert move to with lock', async () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should move after revert with lock', async () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        controller.RevertLast(moveToDuration);
        expect(() =>
            controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true),
        ).not.toThrow();
    });

    it('should catch multiple move tos', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
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
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should execute preRenderCallback', () => {
        const controller = new DIVEOrbitController(
            mockCamera,
            mockRenderer,
            mockAnimSystem,
        );
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller['preRenderCallback']()).not.toThrow();
        controller['locked'] = true;
        expect(() => controller['preRenderCallback']()).not.toThrow();
    });
});
