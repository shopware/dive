import DIVEOrbitControls from '../OrbitControls';
import DIVEPerspectiveCamera from '../../camera/PerspectiveCamera';
import DIVERenderer, { DIVERendererDefaultSettings } from '../../renderer/Renderer';

jest.mock('three/examples/jsm/Addons.js', () => {
    return {
        OrbitControls: jest.fn(function () {
            this.enableDamping = true;
            this.dampingFactor = 0.25;
            this.enableZoom = true;
            this.enablePan = true;
            this.minPolarAngle = 0;
            this.maxPolarAngle = Math.PI;
            this.minDistance = 0;
            this.maxDistance = Infinity;
            this.rotateSpeed = 0.5;
            this.panSpeed = 0.5;
            this.zoomSpeed = 0.5;
            this.keyPanSpeed = 0.5;
            this.screenSpacePanning = true;
            this.autoRotate = false;
            this.autoRotateSpeed = 2.0;
            this.enableKeys = true;
            this.keys = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                BOTTOM: 40,
            };
            this.mouseButtons = {
                LEFT: 0,
                MIDDLE: 1,
                RIGHT: 2,
            };
            this.target = {
                set: jest.fn(),
            };
            this.update = jest.fn();
            this.dispose = jest.fn();
            this.getDistance = jest.fn();
            this.target = {
                clone: jest.fn(),
            };
            return this;
        }),
    }
});

jest.mock('../../renderer/Renderer', () => {
    return jest.fn(function () {
        this.domElement = {
            style: {},
        };
        this.AddPreRenderCallback = (callback: () => void) => {
            callback();
        };

        return this;
    });
});

jest.mock('@tweenjs/tween.js', () => {
    return {
        Easing: {
            Quadratic: {
                In: jest.fn(),
                Out: jest.fn(),
                InOut: jest.fn(),
            },
        },
        Tween: jest.fn(() => {
            const instance: object = {
                easing: () => { return instance; },
                to: () => { return instance; },
                start: () => { return instance; },
                stop: () => { return instance; },
                onComplete: (callback: () => typeof instance) => { callback(); return instance; },
                onUpdate: (callback: () => typeof instance) => { callback(); return instance; },
            }
            return instance;
        }),
    }
});

const moveToPos = { x: 10, y: 0, z: 0 };
const moveToQuat = { x: 0, y: 0, z: 0 };
const moveToDuration = 1000;

const mockCamera = {
    position: {
        clone: jest.fn(),
    },
    lookAt: jest.fn(),
} as unknown as DIVEPerspectiveCamera;
const mockRenderer: DIVERenderer = new DIVERenderer(DIVERendererDefaultSettings);

describe('dive/controls/DIVEOrbitControls', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        expect(controller).toBeDefined();
    });

    it('should zoom in with default value', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        expect(() => controller.ZoomIn()).not.toThrow();
    });

    it('should zoom in with custom value', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        expect(() => controller.ZoomIn(10)).not.toThrow();
    });

    it('should zoom out with default value', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        expect(() => controller.ZoomOut()).not.toThrow();
    });

    it('should zoom out with custom value', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        expect(() => controller.ZoomOut(10)).not.toThrow();
    });

    it('should move to', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        expect(() => controller.MoveTo(moveToPos, moveToQuat, moveToDuration, false)).not.toThrow();
    });

    it('should revert move to', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should revert move to without values', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        expect(() => controller.MoveTo(undefined, undefined, moveToDuration, true)).not.toThrow();
    });

    it('should revert move to with lock', async () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should move after revert with lock', async () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        controller.RevertLast(moveToDuration);
        expect(() => controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true)).not.toThrow();
    });

    it('should catch multiple move tos', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        controller.RevertLast(moveToDuration);
        expect(() => controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true)).not.toThrow();
        controller['animating'] = true;
        expect(() => controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true)).not.toThrow();
        expect(() => controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true)).not.toThrow();
    });

    it('should catch multiple reverts', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
        expect(() => controller.RevertLast(moveToDuration)).not.toThrow();
    });

    it('should execute preRenderCallback', () => {
        const controller = new DIVEOrbitControls(mockCamera, mockRenderer);
        controller.MoveTo(moveToPos, moveToQuat, moveToDuration, true);
        expect(() => controller['preRenderCallback']()).not.toThrow();
        controller['locked'] = true;
        expect(() => controller['preRenderCallback']()).not.toThrow();
    });
});