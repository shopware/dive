import { DIVETransformTool, isTransformTool } from '../TransformTool.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import {
    DIVEPerspectiveCamera,
    DIVERenderPipeline,
    DIVEScene,
} from '@shopware-ag/dive';
import { type DIVEBaseTool } from '../../BaseTool.ts';
import { Tween } from '@tweenjs/tween.js';

vi.mock('../../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderPipeline: vi.fn(function (this: any) {
            this.webglrenderer = {
                domElement: {
                    clientWidth: 0,
                    clientHeight: 0,
                },
            };
            return this;
        }),
    };
});

vi.mock('../../../../engine/camera/PerspectiveCamera', () => {
    return {
        DIVEPerspectiveCamera: vi.fn(function (this: any) {
            this.isPerspectiveCamera = true;
            this.layers = {
                mask: 0,
            };
            return this;
        }),
    };
});

vi.mock('@shopware-ag/dive/orbitcontroller', async () => {
    const actual = await vi.importActual<
        typeof import('@shopware-ag/dive/orbitcontroller')
    >('@shopware-ag/dive/orbitcontroller');
    const mockOrbitController = vi.fn(function (this: any) {
        this.enabled = true;
        this.domElement = {
            clientWIdth: 0,
            clientHeight: 0,
        };
        this.object = {
            layers: {
                mask: 0,
            },
        };
        return this;
    });
    // Copy static properties
    Object.assign(mockOrbitController, actual.OrbitController);

    return {
        ...actual,
        OrbitController: mockOrbitController,
    };
});

vi.mock('../../../../engine/scene/Scene', () => {
    return {
        DIVEScene: vi.fn(function (this: any) {
            this.add = vi.fn();
            this.remove = vi.fn();
            this.root = {
                children: [],
            };
            this.children = [];
            return this;
        }),
    };
});

vi.mock('../../../animation/AnimationSystem', () => {
    return {
        DIVEAnimationSystem: vi.fn(function (this: any) {
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

// Use the global mock from __mocks__/three/examples/jsm/controls/TransformControls.ts
// The event listeners are stored globally in the mock

const mockScene: DIVEScene = new DIVEScene();
const mockCamera = new DIVEPerspectiveCamera();
const mockRenderer = new DIVERenderPipeline(mockScene, mockCamera);
const mockController: OrbitController = new OrbitController(
    mockCamera,
    mockRenderer.webglrenderer.domElement,
);

let transformTool: DIVETransformTool;
let intersectObjectsSpy;

describe('dive/toolbox/select/DIVETransformTool', () => {
    beforeEach(() => {
        // Reset event listeners by clearing the mock calls
        vi.clearAllMocks();
        transformTool = new DIVETransformTool(mockScene, mockController);
        intersectObjectsSpy = vi
            .spyOn(transformTool['_raycaster'], 'intersectObjects')
            .mockReturnValue([]);
    });

    it('should test if it is TransformTool', () => {
        const transformTool = {
            isTransformTool: true,
        } as unknown as DIVEBaseTool;
        expect(isTransformTool(transformTool)).toBe(true);
    });

    it('should test if it is not TransformTool', () => {
        const notTransformTool = {
            someOtherProperty: true,
        } as unknown as DIVEBaseTool;
        expect(isTransformTool(notTransformTool)).toBe(false);
    });

    it('should instantiate', () => {
        expect(transformTool).toBeDefined();
        expect(transformTool.isTransformTool).toBe(true);
        expect(transformTool.name).toBe('DIVETransformTool');
    });

    it('should activate', () => {
        expect(() => transformTool.activate()).not.toThrow();
    });

    it('should set gizmo mode', () => {
        expect(() => transformTool.setGizmoMode('translate')).not.toThrow();
        expect(() => transformTool.setGizmoMode('rotate')).not.toThrow();
        expect(() => transformTool.setGizmoMode('scale')).not.toThrow();
    });

    it('should set gizmo visibility when adding to scene', () => {
        // Mock that gizmo is not in scene
        vi.spyOn(mockScene.children, 'includes').mockReturnValue(false);

        expect(() => transformTool.setGizmoVisible(true)).not.toThrow();
        expect(mockScene.add).toHaveBeenCalledWith(transformTool['_gizmo']);
    });

    it('should set gizmo visibility when removing from scene', () => {
        // Mock that gizmo is in scene
        vi.spyOn(mockScene.children, 'includes').mockReturnValue(true);

        expect(() => transformTool.setGizmoVisible(false)).not.toThrow();
        expect(mockScene.remove).toHaveBeenCalledWith(transformTool['_gizmo']);
    });

    it('should not add gizmo when already in scene', () => {
        // Reset mock calls
        vi.clearAllMocks();

        // Mock that gizmo is already in scene
        vi.spyOn(mockScene.children, 'includes').mockReturnValue(true);

        transformTool.setGizmoVisible(true);

        // Should not call add again
        expect(mockScene.add).not.toHaveBeenCalled();
    });

    it('should not remove gizmo when not in scene', () => {
        // Reset mock calls
        vi.clearAllMocks();

        // Mock that gizmo is not in scene
        vi.spyOn(mockScene.children, 'includes').mockReturnValue(false);

        transformTool.setGizmoVisible(false);

        // Should not call remove
        expect(mockScene.remove).not.toHaveBeenCalled();
    });

    it('should set gizmo unified scaling', () => {
        expect(() => transformTool.setGizmoScaleLinked(true)).not.toThrow();
        expect(() => transformTool.setGizmoScaleLinked(false)).not.toThrow();
    });

    it('should initialize gizmo with proper event listeners', () => {
        const gizmo = transformTool['_gizmo'] as any;
        expect(gizmo.addEventListener).toHaveBeenCalledWith(
            'mouseDown',
            expect.any(Function),
        );
        expect(gizmo.addEventListener).toHaveBeenCalledWith(
            'objectChange',
            expect.any(Function),
        );
        expect(gizmo.addEventListener).toHaveBeenCalledWith(
            'mouseUp',
            expect.any(Function),
        );
    });

    it('should traverse gizmo and set colors for different axes', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const mockTraverse = gizmo.traverse as any;

        // Verify traverse was called
        expect(mockTraverse).toHaveBeenCalledWith(expect.any(Function));

        // Get the traverse callback
        const traverseCallback = mockTraverse.mock.calls[0][0];

        // Mock child objects with different names
        const mockChildX = {
            name: 'X',
            isMesh: true,
            material: { color: { set: vi.fn() } },
        };
        const mockChildY = {
            name: 'Y',
            isMesh: true,
            material: { color: { set: vi.fn() } },
        };
        const mockChildZ = {
            name: 'Z',
            isMesh: true,
            material: { color: { set: vi.fn() } },
        };
        const mockChildXY = {
            name: 'XY',
            isMesh: true,
            material: { color: { set: vi.fn() } },
        };
        const mockChildYZ = {
            name: 'YZ',
            isMesh: true,
            material: { color: { set: vi.fn() } },
        };
        const mockChildXZ = {
            name: 'XZ',
            isMesh: true,
            material: { color: { set: vi.fn() } },
        };
        const mockNonMesh = {
            name: 'SomeOther',
            isMesh: false,
        };

        // Call traverse callback with different children
        traverseCallback(mockChildX);
        traverseCallback(mockChildY);
        traverseCallback(mockChildZ);
        traverseCallback(mockChildXY);
        traverseCallback(mockChildYZ);
        traverseCallback(mockChildXZ);
        traverseCallback(mockNonMesh);

        // Verify colors were set for mesh objects
        expect(mockChildX.material.color.set).toHaveBeenCalled();
        expect(mockChildY.material.color.set).toHaveBeenCalled();
        expect(mockChildZ.material.color.set).toHaveBeenCalled();
        expect(mockChildXY.material.color.set).toHaveBeenCalled();
        expect(mockChildYZ.material.color.set).toHaveBeenCalled();
        expect(mockChildXZ.material.color.set).toHaveBeenCalled();
    });

    it('should call enableAll when setting gizmo visible and isTransformControls is true', () => {
        vi.spyOn(mockScene.children, 'includes').mockReturnValue(false);
        const gizmo = transformTool['_gizmo'] as any;
        gizmo.isTransformControls = true;
        const enableAllSpy = vi.fn();
        const raycaster = {
            layers: {
                enableAll: enableAllSpy,
            },
        };
        gizmo.getRaycaster = vi.fn(() => raycaster);
        transformTool.setGizmoVisible(true);
        expect(enableAllSpy).toHaveBeenCalled();
    });

    it('should call disableAll when setting gizmo invisible and isTransformControls is true', () => {
        vi.spyOn(mockScene.children, 'includes').mockReturnValue(true);
        const gizmo = transformTool['_gizmo'] as any;
        gizmo.isTransformControls = true;
        const disableAllSpy = vi.fn();
        const raycaster = {
            layers: {
                disableAll: disableAllSpy,
            },
        };
        gizmo.getRaycaster = vi.fn(() => raycaster);
        transformTool.setGizmoVisible(false);
        expect(disableAllSpy).toHaveBeenCalled();
    });

    it('should handle mouseDown event with movable object and onMoveStart', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const mouseDownListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'mouseDown',
        )[1];
        gizmo.object = { isMovable: true, onMoveStart: vi.fn() };
        mockController.enabled = true;
        mouseDownListener();
        expect(mockController.enabled).toBe(false);
        expect(gizmo.object.onMoveStart).toHaveBeenCalled();
    });

    it('should handle mouseDown event with movable object but no onMoveStart', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const mouseDownListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'mouseDown',
        )[1];
        gizmo.object = { isMovable: true };
        mockController.enabled = true;
        expect(() => mouseDownListener()).not.toThrow();
        expect(mockController.enabled).toBe(false);
    });

    it('should handle mouseDown event with non-movable object', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const mouseDownListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'mouseDown',
        )[1];
        gizmo.object = { isMovable: false };
        mockController.enabled = true;
        mouseDownListener();
        expect(mockController.enabled).toBe(false);
    });

    it('should handle objectChange event with movable object, onMove, and scale linked', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const objectChangeListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'objectChange',
        )[1];
        const scale = { x: 2, y: 4, z: 6, set: vi.fn() };
        gizmo.object = { isMovable: true, onMove: vi.fn(), scale };
        transformTool.setGizmoScaleLinked(true);
        objectChangeListener();
        expect(gizmo.object.onMove).toHaveBeenCalled();
        expect(scale.set).toHaveBeenCalledWith(4, 4, 4);
    });

    it('should handle objectChange event with movable object, onMove, and scale not linked', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const objectChangeListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'objectChange',
        )[1];
        const scale = { x: 2, y: 4, z: 6, set: vi.fn() };
        gizmo.object = { isMovable: true, onMove: vi.fn(), scale };
        transformTool.setGizmoScaleLinked(false);
        objectChangeListener();
        expect(gizmo.object.onMove).toHaveBeenCalled();
        expect(scale.set).not.toHaveBeenCalled();
    });

    it('should handle objectChange event with movable object but no onMove', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const objectChangeListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'objectChange',
        )[1];
        gizmo.object = { isMovable: true };
        expect(() => objectChangeListener()).not.toThrow();
    });

    it('should handle objectChange event with non-movable object', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const objectChangeListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'objectChange',
        )[1];
        gizmo.object = { isMovable: false };
        expect(() => objectChangeListener()).not.toThrow();
    });

    it('should handle mouseUp event with movable object and onMoveEnd', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const mouseUpListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'mouseUp',
        )[1];
        gizmo.object = { isMovable: true, onMoveEnd: vi.fn() };
        mockController.enabled = false;
        mouseUpListener();
        expect(mockController.enabled).toBe(true);
        expect(gizmo.object.onMoveEnd).toHaveBeenCalled();
    });

    it('should handle mouseUp event with movable object but no onMoveEnd', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const mouseUpListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'mouseUp',
        )[1];
        gizmo.object = { isMovable: true };
        mockController.enabled = false;
        expect(() => mouseUpListener()).not.toThrow();
        expect(mockController.enabled).toBe(true);
    });

    it('should handle mouseUp event with non-movable object', () => {
        const gizmo = transformTool['_gizmo'] as any;
        const mouseUpListener = gizmo.addEventListener.mock.calls.find(
            (call: any[]) => call[0] === 'mouseUp',
        )[1];
        gizmo.object = { isMovable: false };
        mockController.enabled = false;
        mouseUpListener();
        expect(mockController.enabled).toBe(true);
    });
});
