import { Vector2, type Object3D } from 'three';
import { TransformTool, isTransformTool } from '../TransformTool.ts';
import { SelectionState } from '../../SelectionState.ts';
import { type PointerContext } from '../../PointerContext.ts';
import { type Tool } from '../../Tool.ts';
import { type DIVEScene, type DIVESelectable, type DIVEMovable } from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Tween } from '@tweenjs/tween.js';

/**
 * @vitest-environment jsdom
 */

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

const createMockScene = () =>
    ({
        add: vi.fn(),
        remove: vi.fn(),
        children: [],
    }) as unknown as DIVEScene;

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

const createMockContext = (
    uiIntersects: any[] = [],
): PointerContext => ({
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
            expect(() => transformTool.setGizmoMode('translate')).not.toThrow();
        });

        it('should set gizmo mode to rotate', () => {
            expect(() => transformTool.setGizmoMode('rotate')).not.toThrow();
        });

        it('should set gizmo mode to scale', () => {
            expect(() => transformTool.setGizmoMode('scale')).not.toThrow();
        });
    });

    describe('gizmo visibility', () => {
        it('should set gizmo visible', () => {
            expect(() => transformTool.setGizmoVisible(true)).not.toThrow();
        });

        it('should set gizmo invisible', () => {
            expect(() => transformTool.setGizmoVisible(false)).not.toThrow();
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
    });

    describe('dispose', () => {
        it('should dispose without error', () => {
            expect(() => transformTool.dispose()).not.toThrow();
        });
    });
});
