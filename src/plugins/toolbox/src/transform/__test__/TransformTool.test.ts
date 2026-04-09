import { Vector2, type Object3D } from 'three/webgpu';
import { TransformTool, isTransformTool } from '../TransformTool.ts';
import { SelectionState } from '../../SelectionState.ts';
import { type PointerContext } from '../../PointerContext.ts';
import { type Tool } from '../../Tool.ts';
import {
    type DIVEScene,
    type DIVESelectable,
    type DIVEMovable,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Tween } from '@tweenjs/tween.js';

/**
 * @vitest-environment jsdom
 */

// Mock PointerEvent for jsdom
class MockPointerEvent extends MouseEvent {
    constructor(type: string, props?: PointerEventInit) {
        super(type, props);
    }
}
globalThis.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;

vi.mock('@shopware-ag/dive', async () => {
    const actual =
        await vi.importActual<typeof import('@shopware-ag/dive')>(
            '@shopware-ag/dive',
        );
    return {
        ...actual,
        DIVEScene: vi.fn(function (this: any) {
            this.add = vi.fn();
            this.remove = vi.fn();
            this.children = [];
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
            clientWidth: 1000,
            clientHeight: 1000,
        };
        this.object = {
            isPerspectiveCamera: true,
            layers: { mask: 0 },
        };
        return this;
    });
    Object.assign(mockOrbitController, actual.OrbitController);
    return {
        ...actual,
        OrbitController: mockOrbitController,
    };
});

vi.mock('@shopware-ag/dive/animation', () => {
    return {
        DIVEAnimationSystem: vi.fn(function (this: any) {
            this.domElement = { style: {} };
            this.animate = <T extends object>(obj: T) => new Tween<T>(obj);
            return this;
        }),
    };
});

// Store event listeners for testing
let gizmoEventListeners: Record<string, Function[]> = {};

vi.mock('three/examples/jsm/controls/TransformControls.js', () => {
    const TransformControls = vi.fn(function (this: any) {
        const instance = this;

        // Reset event listeners for each new instance
        gizmoEventListeners = {};

        instance.isTransformControls = true;
        instance.mode = 'translate';
        instance.object = undefined;
        instance.enabled = true;
        instance.dragging = false;

        // Create mock mesh children with isMesh and material for traverse
        const createMockMesh = (name: string) => ({
            isMesh: true,
            name,
            material: {
                color: {
                    set: vi.fn(),
                },
            },
        });

        instance.children = [
            createMockMesh('X'),
            createMockMesh('Y'),
            createMockMesh('Z'),
            createMockMesh('XY'),
            createMockMesh('YZ'),
            createMockMesh('XZ'),
        ];

        instance.addEventListener = vi.fn(
            (event: string, callback: Function) => {
                if (!gizmoEventListeners[event]) {
                    gizmoEventListeners[event] = [];
                }
                gizmoEventListeners[event].push(callback);
            },
        );
        instance.removeEventListener = vi.fn();

        instance.attach = vi.fn().mockImplementation((obj: Object3D) => {
            instance.object = obj;
        });
        instance.detach = vi.fn().mockImplementation(() => {
            instance.object = undefined;
        });
        instance.dispose = vi.fn();
        instance.getHelper = vi.fn(() => instance);

        instance.traverse = vi.fn((callback: (obj: Object3D) => void) => {
            callback(instance);
            instance.children.forEach((child: any) => callback(child));
        });

        const raycaster = {
            layers: {
                mask: 0,
                disableAll: vi.fn(),
                enableAll: vi.fn(),
            },
        };
        instance.getRaycaster = vi.fn(() => raycaster);

        instance.layers = { mask: 0 };

        return instance;
    });

    return { TransformControls };
});

// Helper to trigger gizmo events in tests
const triggerGizmoEvent = (eventName: string) => {
    const listeners = gizmoEventListeners[eventName] || [];
    listeners.forEach((listener) => listener());
};

const createMockScene = () => {
    const children: Object3D[] = [];
    return {
        add: vi.fn((obj: Object3D) => children.push(obj)),
        remove: vi.fn((obj: Object3D) => {
            const idx = children.indexOf(obj);
            if (idx >= 0) children.splice(idx, 1);
        }),
        children,
    } as unknown as DIVEScene;
};

const createMockController = () =>
    ({
        enabled: true,
        domElement: {
            clientWidth: 1000,
            clientHeight: 1000,
        },
        object: {
            isPerspectiveCamera: true,
            layers: { mask: 0 },
        },
    }) as unknown as OrbitController;

const createMockContext = (uiIntersects: any[] = []): PointerContext => ({
    event: new PointerEvent('pointermove'),
    pointer: new Vector2(0, 0),
    intersects: [],
    modelIntersects: [],
    uiIntersects,
    pointerPrimaryDown: false,
    pointerMiddleDown: false,
    pointerSecondaryDown: false,
    lastPointerDown: new Vector2(0, 0),
});

describe('TransformTool', () => {
    let transformTool: TransformTool;
    let mockScene: DIVEScene;
    let mockController: OrbitController;
    let selectionState: SelectionState;

    beforeEach(() => {
        mockScene = createMockScene();
        mockController = createMockController();
        selectionState = new SelectionState();
        transformTool = new TransformTool(
            mockScene,
            mockController,
            selectionState,
        );
    });

    afterEach(() => {
        transformTool.dispose();
        selectionState.dispose();
        vi.clearAllMocks();
    });

    describe('properties', () => {
        it('should have correct name', () => {
            expect(transformTool.name).toBe('transform');
        });

        it('should have correct priority', () => {
            expect(transformTool.priority).toBe(5);
        });

        it('should have a gizmo', () => {
            expect(transformTool.gizmo).toBeDefined();
        });

        it('should report isDragging from gizmo', () => {
            expect(transformTool.isDragging).toBe(false);

            (transformTool.gizmo as any).dragging = true;
            expect(transformTool.isDragging).toBe(true);
        });

        it('should add gizmo to scene on construction', () => {
            expect(mockScene.add).toHaveBeenCalledWith(transformTool.gizmo);
        });
    });

    describe('isTransformTool type guard', () => {
        it('should identify TransformTool', () => {
            expect(isTransformTool(transformTool)).toBe(true);
        });

        it('should not identify non-TransformTool', () => {
            const otherTool: Tool = { name: 'other', priority: 10 };
            expect(isTransformTool(otherTool)).toBe(false);
        });
    });

    describe('gizmo mode', () => {
        it('should set gizmo mode to translate', () => {
            transformTool.setGizmoMode('translate');
            expect(transformTool.gizmo.mode).toBe('translate');
        });

        it('should set gizmo mode to rotate', () => {
            transformTool.setGizmoMode('rotate');
            expect(transformTool.gizmo.mode).toBe('rotate');
        });

        it('should set gizmo mode to scale', () => {
            transformTool.setGizmoMode('scale');
            expect(transformTool.gizmo.mode).toBe('scale');
        });
    });

    describe('gizmo visibility', () => {
        it('should add gizmo to scene when setting visible and not in scene', () => {
            // Remove gizmo from scene first
            mockScene.children.length = 0;

            transformTool.setGizmoVisible(true);

            expect(mockScene.add).toHaveBeenCalledWith(transformTool.gizmo);
            expect(
                transformTool.gizmo.getRaycaster().layers.enableAll,
            ).toHaveBeenCalled();
        });

        it('should remove gizmo from scene when setting invisible', () => {
            transformTool.setGizmoVisible(false);

            expect(mockScene.remove).toHaveBeenCalledWith(transformTool.gizmo);
            expect(
                transformTool.gizmo.getRaycaster().layers.disableAll,
            ).toHaveBeenCalled();
        });

        it('should not add gizmo if already in scene', () => {
            // Gizmo is already in scene from constructor
            const addCallCount = (mockScene.add as any).mock.calls.length;

            transformTool.setGizmoVisible(true);

            // Should not have added again
            expect((mockScene.add as any).mock.calls.length).toBe(addCallCount);
        });

        it('should not remove gizmo if not in scene', () => {
            // Remove gizmo from scene first
            mockScene.children.length = 0;

            transformTool.setGizmoVisible(false);

            // remove should not have been called (beyond initial state)
            expect(mockScene.remove).not.toHaveBeenCalled();
        });
    });

    describe('scale linked', () => {
        it('should set scale linked', () => {
            expect(() => transformTool.setGizmoScaleLinked(true)).not.toThrow();
        });

        it('should set scale not linked', () => {
            expect(() =>
                transformTool.setGizmoScaleLinked(false),
            ).not.toThrow();
        });
    });

    describe('activation', () => {
        it('should activate without error', () => {
            expect(() => transformTool.onActivate()).not.toThrow();
        });

        it('should deactivate without error', () => {
            transformTool.onActivate();
            expect(() => transformTool.onDeactivate()).not.toThrow();
        });

        it('should attach gizmo to selected object on activate', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            selectionState.select(mockSelectable);
            transformTool.onActivate();

            expect(transformTool.gizmo.object).toBe(mockSelectable);
        });

        it('should not attach gizmo if no selection on activate', () => {
            transformTool.onActivate();

            expect(transformTool.gizmo.attach).not.toHaveBeenCalled();
        });

        it('should detach gizmo on deactivate', () => {
            transformTool.onActivate();
            transformTool.onDeactivate();

            expect(transformTool.gizmo.detach).toHaveBeenCalled();
        });
    });

    describe('pointer move', () => {
        it('should block other tools when gizmo is dragging', () => {
            (transformTool.gizmo as any).dragging = true;

            const ctx = createMockContext();
            const result = transformTool.onPointerMove(ctx);

            expect(result).toBe(true);
        });

        it('should not block when gizmo is not being interacted with', () => {
            (transformTool.gizmo as any).dragging = false;

            const ctx = createMockContext();
            const result = transformTool.onPointerMove(ctx);

            expect(result).toBeFalsy();
        });

        it('should block when hovering over gizmo child', () => {
            const gizmoChild = { parent: transformTool.gizmo };
            const ctx = createMockContext([{ object: gizmoChild }]);

            const result = transformTool.onPointerMove(ctx);

            expect(result).toBe(true);
        });

        it('should block when hovering over gizmo itself', () => {
            const ctx = createMockContext([{ object: transformTool.gizmo }]);

            const result = transformTool.onPointerMove(ctx);

            expect(result).toBe(true);
        });

        it('should not block when hovering over non-gizmo object', () => {
            const otherObject = { parent: null };
            const ctx = createMockContext([{ object: otherObject }]);

            const result = transformTool.onPointerMove(ctx);

            expect(result).toBeFalsy();
        });
    });

    describe('selection changes', () => {
        it('should attach gizmo when movable object is selected', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockSelectable);

            expect(transformTool.gizmo.object).toBe(mockSelectable);
        });

        it('should detach gizmo when selection is cleared', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
                onDeselect: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockSelectable);
            selectionState.deselect();

            expect(transformTool.gizmo.object).toBeUndefined();
        });

        it('should not attach gizmo to non-movable object', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                // NOT movable
                visible: true,
            } as unknown as Object3D & DIVESelectable;

            transformTool.onActivate();
            selectionState.select(mockSelectable);

            expect(transformTool.gizmo.attach).not.toHaveBeenCalled();
        });

        it('should handle selection change to different movable object', () => {
            const first = {
                uuid: 'first',
                isSelectable: true,
                isMovable: true,
                visible: true,
                onDeselect: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            const second = {
                uuid: 'second',
                isSelectable: true,
                isMovable: true,
                visible: true,
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(first);
            expect(transformTool.gizmo.object).toBe(first);

            selectionState.select(second);
            expect(transformTool.gizmo.object).toBe(second);
        });

        it('should hide gizmo when attached object is not visible', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: false, // Not visible
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockSelectable);

            // Gizmo should be removed from scene because object is not visible
            expect(mockScene.remove).toHaveBeenCalledWith(transformTool.gizmo);
        });
    });

    describe('dispose', () => {
        it('should dispose without error', () => {
            expect(() => transformTool.dispose()).not.toThrow();
        });

        it('should detach gizmo on dispose', () => {
            transformTool.dispose();

            expect(transformTool.gizmo.detach).toHaveBeenCalled();
        });

        it('should remove gizmo from scene on dispose', () => {
            transformTool.dispose();

            expect(mockScene.remove).toHaveBeenCalledWith(transformTool.gizmo);
        });

        it('should dispose gizmo on dispose', () => {
            transformTool.dispose();

            expect(transformTool.gizmo.dispose).toHaveBeenCalled();
        });

        it('should not react to selection changes after dispose', () => {
            transformTool.onActivate();
            transformTool.dispose();

            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            // Clear mock calls from dispose
            vi.clearAllMocks();

            // This should not trigger gizmo attach
            selectionState.select(mockSelectable);

            expect(transformTool.gizmo.attach).not.toHaveBeenCalled();
        });
    });

    describe('gizmo event listeners', () => {
        it('should register mouseDown event listener', () => {
            expect(transformTool.gizmo.addEventListener).toHaveBeenCalledWith(
                'mouseDown',
                expect.any(Function),
            );
        });

        it('should register objectChange event listener', () => {
            expect(transformTool.gizmo.addEventListener).toHaveBeenCalledWith(
                'objectChange',
                expect.any(Function),
            );
        });

        it('should register mouseUp event listener', () => {
            expect(transformTool.gizmo.addEventListener).toHaveBeenCalledWith(
                'mouseUp',
                expect.any(Function),
            );
        });
    });

    describe('gizmo event callbacks', () => {
        it('should disable controller on mouseDown', () => {
            triggerGizmoEvent('mouseDown');

            expect(mockController.enabled).toBe(false);
        });

        it('should call onMoveStart on attached movable object on mouseDown', () => {
            const mockMovable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
                onMoveStart: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockMovable);

            triggerGizmoEvent('mouseDown');

            expect(mockMovable.onMoveStart).toHaveBeenCalled();
        });

        it('should not call onMoveStart if object is not movable on mouseDown', () => {
            // No object attached
            triggerGizmoEvent('mouseDown');
            // Should not throw
            expect(mockController.enabled).toBe(false);
        });

        it('should enable controller on mouseUp', () => {
            mockController.enabled = false;

            triggerGizmoEvent('mouseUp');

            expect(mockController.enabled).toBe(true);
        });

        it('should call onMoveEnd on attached movable object on mouseUp', () => {
            const mockMovable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
                onMoveEnd: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockMovable);

            triggerGizmoEvent('mouseUp');

            expect(mockMovable.onMoveEnd).toHaveBeenCalled();
        });

        it('should call onMove on attached movable object on objectChange', () => {
            const mockMovable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
                scale: { x: 1, y: 1, z: 1, set: vi.fn() },
                onMove: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockMovable);

            triggerGizmoEvent('objectChange');

            expect(mockMovable.onMove).toHaveBeenCalled();
        });

        it('should apply linked scale on objectChange when scaleLinked is true', () => {
            const mockScale = { x: 2, y: 3, z: 4, set: vi.fn() };
            const mockMovable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
                scale: mockScale,
                onMove: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockMovable);
            transformTool.setGizmoScaleLinked(true);

            triggerGizmoEvent('objectChange');

            // Average of 2, 3, 4 is 3
            expect(mockScale.set).toHaveBeenCalledWith(3, 3, 3);
        });

        it('should not apply linked scale on objectChange when scaleLinked is false', () => {
            const mockScale = { x: 2, y: 3, z: 4, set: vi.fn() };
            const mockMovable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
                scale: mockScale,
                onMove: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockMovable);
            transformTool.setGizmoScaleLinked(false);

            triggerGizmoEvent('objectChange');

            expect(mockScale.set).not.toHaveBeenCalled();
        });

        it('should not call onMove if object is not movable on objectChange', () => {
            // No object attached
            triggerGizmoEvent('objectChange');
            // Should not throw - early return happens
        });

        it('should not call onMoveEnd if object is not movable on mouseUp', () => {
            // No object attached
            triggerGizmoEvent('mouseUp');
            // Should not throw - early return happens
            expect(mockController.enabled).toBe(true);
        });
    });

    describe('event dispatching', () => {
        const createMovableAndSelect = () => {
            const mockMovable = {
                uuid: 'test',
                isSelectable: true,
                isMovable: true,
                visible: true,
                scale: { x: 1, y: 1, z: 1, set: vi.fn() },
                onMove: vi.fn(),
            } as unknown as Object3D & DIVESelectable & DIVEMovable;

            transformTool.onActivate();
            selectionState.select(mockMovable);
            return mockMovable;
        };

        it('should dispatch object-change on objectChange', () => {
            const mockMovable = createMovableAndSelect();
            const listener = vi.fn();
            transformTool.addEventListener('object-change', listener);

            triggerGizmoEvent('objectChange');

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'object-change',
                    object: mockMovable,
                }),
            );
        });

        it('should dispatch object-position-change when mode is translate', () => {
            const mockMovable = createMovableAndSelect();
            transformTool.setGizmoMode('translate');
            const listener = vi.fn();
            transformTool.addEventListener('object-position-change', listener);

            triggerGizmoEvent('objectChange');

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'object-position-change',
                    object: mockMovable,
                }),
            );
        });

        it('should dispatch object-rotation-change when mode is rotate', () => {
            const mockMovable = createMovableAndSelect();
            transformTool.setGizmoMode('rotate');
            const listener = vi.fn();
            transformTool.addEventListener('object-rotation-change', listener);

            triggerGizmoEvent('objectChange');

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'object-rotation-change',
                    object: mockMovable,
                }),
            );
        });

        it('should dispatch object-scale-change when mode is scale', () => {
            const mockMovable = createMovableAndSelect();
            transformTool.setGizmoMode('scale');
            const listener = vi.fn();
            transformTool.addEventListener('object-scale-change', listener);

            triggerGizmoEvent('objectChange');

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'object-scale-change',
                    object: mockMovable,
                }),
            );
        });

        it('should not dispatch mode-specific event for other modes', () => {
            createMovableAndSelect();
            transformTool.setGizmoMode('translate');

            const rotationListener = vi.fn();
            const scaleListener = vi.fn();
            transformTool.addEventListener(
                'object-rotation-change',
                rotationListener,
            );
            transformTool.addEventListener(
                'object-scale-change',
                scaleListener,
            );

            triggerGizmoEvent('objectChange');

            expect(rotationListener).not.toHaveBeenCalled();
            expect(scaleListener).not.toHaveBeenCalled();
        });

        it('should stop receiving events after removeEventListener', () => {
            createMovableAndSelect();
            const listener = vi.fn();
            transformTool.addEventListener('object-change', listener);

            triggerGizmoEvent('objectChange');
            expect(listener).toHaveBeenCalledTimes(1);

            transformTool.removeEventListener('object-change', listener);

            triggerGizmoEvent('objectChange');
            expect(listener).toHaveBeenCalledTimes(1);
        });

        it('should not dispatch events when object is not movable', () => {
            const changeListener = vi.fn();
            transformTool.addEventListener('object-change', changeListener);

            triggerGizmoEvent('objectChange');

            expect(changeListener).not.toHaveBeenCalled();
        });
    });

    describe('gizmo initialization', () => {
        it('should call traverse on gizmo during initialization', () => {
            expect(transformTool.gizmo.traverse).toHaveBeenCalled();
        });

        it('should set colors on mesh children during traverse', () => {
            // The mock traverse was called and should have set colors on X, Y, Z, XY, YZ, XZ
            const children = (transformTool.gizmo as any).children;

            // Check that color.set was called on each child
            children.forEach((child: any) => {
                expect(child.material.color.set).toHaveBeenCalled();
            });
        });
    });
});
