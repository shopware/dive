import {
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    Vector2,
    Vector3,
} from 'three/webgpu';
import { type Mock } from 'vitest';
import { DragTool } from '../DragTool.ts';
import { type DraggableEvent } from '../DraggableEvent.ts';
import { type PointerContext } from '../../PointerContext.ts';
import {
    DEFAULT_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    type DIVEDraggable,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';

/**
 * @vitest-environment jsdom
 */

const RaycasterIntersectObjectMock = vi.fn((): unknown[] => []);

/** makes the drag surface report a hit at the given point */
const surfaceAt = (x: number, y: number, z: number): void => {
    RaycasterIntersectObjectMock.mockReturnValue([
        { object: new Object3D(), point: new Vector3(x, y, z), distance: 1 },
    ]);
};

/** the drag surface suite switches to the real raycaster */
const raycasterState = vi.hoisted(() => ({ real: false }));

vi.mock('three/webgpu', async () => {
    const actual =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');

    const Raycaster = vi.fn(function (this: any) {
        if (raycasterState.real) return new actual.Raycaster();

        this.layers = { mask: 0 };
        this.setFromCamera = vi.fn(() => this);
        this.intersectObjects = RaycasterIntersectObjectMock;
        this.intersectObject = RaycasterIntersectObjectMock;
        return this;
    });

    return {
        ...actual,
        Raycaster,
    };
});

// Mock PointerEvent for jsdom
class MockPointerEvent extends MouseEvent {
    constructor(type: string, props?: PointerEventInit) {
        super(type, props);
    }
}
globalThis.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;

const createMockController = () =>
    ({
        object: {
            isPerspectiveCamera: true,
            layers: { mask: 0 },
        },
        inputEnabled: true,
    }) as unknown as OrbitController;

const createMockContext = (
    options: Partial<PointerContext> = {},
): PointerContext => ({
    event: new PointerEvent('pointermove'),
    pointer: new Vector2(0, 0),
    intersects: [],
    modelIntersects: [],
    entityIntersects: [],
    uiIntersects: [],
    pointerPrimaryDown: false,
    pointerMiddleDown: false,
    pointerSecondaryDown: false,
    lastPointerDown: new Vector2(0, 0),
    ...options,
});

describe('DragTool', () => {
    let dragTool: DragTool;
    let mockController: OrbitController;

    beforeEach(() => {
        mockController = createMockController();
        dragTool = new DragTool(mockController);
    });

    afterEach(() => {
        vi.clearAllMocks();
        RaycasterIntersectObjectMock.mockReset();
    });

    describe('properties', () => {
        it('should have correct name', () => {
            expect(dragTool.name).toBe('drag');
        });

        it('should have correct priority', () => {
            expect(dragTool.priority).toBe(10);
        });

        it('should not be dragging initially', () => {
            expect(dragTool.isDragging).toBe(false);
        });

        it('should have null draggable initially', () => {
            expect(dragTool.draggable).toBeNull();
        });
    });

    describe('drag detection', () => {
        it('should detect draggable on pointer down', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
            } as unknown as Object3D & DIVEDraggable;

            const ctx = createMockContext({
                intersects: [
                    {
                        object: mockDraggable,
                        point: new Vector3(0, 0, 0),
                    } as any,
                ],
                pointerPrimaryDown: true,
            });

            dragTool.onPointerDown(ctx);

            expect(dragTool.draggable).toBe(mockDraggable);
        });

        it('should not start drag without pointer down', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragStart: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Set draggable but don't have pointer down
            const ctx = createMockContext({
                intersects: [
                    {
                        object: mockDraggable,
                        point: new Vector3(0, 0, 0),
                    } as any,
                ],
                pointerPrimaryDown: false,
            });

            dragTool.onPointerDown(ctx);
            dragTool.onPointerMove(ctx);

            expect(dragTool.isDragging).toBe(false);
        });
    });

    describe('activation', () => {
        it('should reset state on activate', () => {
            dragTool.onActivate();
            expect(dragTool.isDragging).toBe(false);
        });

        it('should end drag on deactivate if dragging', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragStart: vi.fn(),
                onDragEnd: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Setup drag state
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;

            dragTool.onDeactivate();

            expect(mockDraggable.onDragEnd).toHaveBeenCalled();
            expect(dragTool.isDragging).toBe(false);
        });
    });

    describe('drag raycast targets', () => {
        it('should set custom drag raycast targets', () => {
            const mockObjects = [{ uuid: 'floor' }] as Object3D[];
            dragTool.setDragRaycastTargets(mockObjects);
            expect((dragTool as any)._dragRaycastTargets).toBe(mockObjects);
        });

        it('should clear drag raycast targets', () => {
            dragTool.setDragRaycastTargets([{ uuid: 'floor' }] as Object3D[]);
            dragTool.setDragRaycastTargets(null);
            expect((dragTool as any)._dragRaycastTargets).toBeNull();
        });
    });

    describe('pointer up', () => {
        it('should clear draggable on pointer up', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
            } as unknown as Object3D & DIVEDraggable;

            const ctx = createMockContext({
                intersects: [
                    {
                        object: mockDraggable,
                        point: new Vector3(0, 0, 0),
                    } as any,
                ],
                pointerPrimaryDown: true,
            });

            dragTool.onPointerDown(ctx);
            expect(dragTool.draggable).toBe(mockDraggable);

            dragTool.onPointerUp(ctx);
            expect(dragTool.draggable).toBeNull();
        });

        it('should end drag and call onDragEnd on pointer up while dragging', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragStart: vi.fn(),
                onDrag: vi.fn(),
                onDragEnd: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Setup drag state manually
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;

            const ctx = createMockContext({
                pointer: new Vector2(0.5, 0.5),
            });

            dragTool.onPointerUp(ctx);

            expect(mockDraggable.onDragEnd).toHaveBeenCalled();
            expect(dragTool.isDragging).toBe(false);
            expect(mockController.inputEnabled).toBe(true);
        });
    });

    describe('drag operations', () => {
        it('should call onDrag during drag', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragStart: vi.fn(),
                onDrag: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            surfaceAt(2, 0, 0);

            // Setup drag state
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;

            const ctx = createMockContext({
                pointer: new Vector2(0.2, 0.2),
                pointerPrimaryDown: true,
            });

            const result = dragTool.onPointerMove(ctx);

            expect(mockDraggable.onDrag).toHaveBeenCalled();
            expect(result).toBe(true); // Should block other tools
        });

        it('should not start drag if no intersect found', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragStart: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Set up draggable
            (dragTool as any)._draggable = mockDraggable;

            const ctx = createMockContext({
                pointer: new Vector2(0.1, 0.1),
                intersects: [], // No intersect
                pointerPrimaryDown: true,
                lastPointerDown: new Vector2(0, 0),
            });

            dragTool.onPointerMove(ctx);

            expect(dragTool.isDragging).toBe(false);
            expect(mockDraggable.onDragStart).not.toHaveBeenCalled();
        });

        it('should not update drag if no intersect during drag', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDrag: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Setup drag state
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;

            const ctx = createMockContext({
                pointer: new Vector2(0.2, 0.2),
                intersects: [], // No intersect
                pointerPrimaryDown: true,
            });

            dragTool.onPointerMove(ctx);

            expect(mockDraggable.onDrag).not.toHaveBeenCalled();
        });

        it('should return early from onPointerMove if draggable is null', () => {
            const ctx = createMockContext({
                pointerPrimaryDown: true,
            });

            const result = dragTool.onPointerMove(ctx);

            expect(result).toBeUndefined();
        });

        it('should return early from onPointerMove if pointer not down', () => {
            const ctx = createMockContext({
                pointerPrimaryDown: false,
            });

            const result = dragTool.onPointerMove(ctx);

            expect(result).toBeUndefined();
        });

        it('should check distance threshold before starting drag', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragStart: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Set up draggable
            (dragTool as any)._draggable = mockDraggable;

            // Move with distance below threshold (0.001)
            const ctx = createMockContext({
                pointer: new Vector2(0.0001, 0.0001),
                intersects: [
                    {
                        object: mockDraggable,
                        point: new Vector3(1, 0, 0),
                    } as any,
                ],
                pointerPrimaryDown: true,
                lastPointerDown: new Vector2(0, 0), // Distance ~0.00014 < 0.001
            });

            dragTool.onPointerMove(ctx);

            // Should not start drag yet - below threshold
            expect(dragTool.isDragging).toBe(false);
        });

        it('should call startDrag internal method', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragStart: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            surfaceAt(1, 2, 3);

            // Directly call startDrag to test the method
            (dragTool as any)._draggable = mockDraggable;

            (dragTool as any).startDrag();

            expect(dragTool.isDragging).toBe(true);
            expect(mockDraggable.onDragStart).toHaveBeenCalled();
            expect(mockController.inputEnabled).toBe(false);
        });

        it('should call updateDrag internal method', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDrag: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            surfaceAt(2, 3, 4);

            // Setup drag state
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;

            (dragTool as any).updateDrag();

            expect(mockDraggable.onDrag).toHaveBeenCalled();
        });

        it('should call endDrag internal method', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDragEnd: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Setup drag state
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;
            mockController.inputEnabled = false;

            (dragTool as any).endDrag();

            expect(mockDraggable.onDragEnd).toHaveBeenCalled();
            expect(dragTool.isDragging).toBe(false);
            expect(mockController.inputEnabled).toBe(true);
        });

        it('should use custom raycast targets in getDragIntersect', () => {
            const mockFloor = {
                uuid: 'floor',
                isMesh: true,
            } as unknown as Object3D;

            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDrag: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Set custom raycast targets
            dragTool.setDragRaycastTargets([mockFloor]);

            // Setup drag state and mock raycaster
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;
            (dragTool as any)._raycaster = {
                setFromCamera: vi.fn(),
                intersectObjects: vi.fn(() => [
                    { object: mockFloor, point: new Vector3(1, 0, 0) },
                ]),
            };

            const ctx = createMockContext({
                pointer: new Vector2(0.2, 0.2),
                intersects: [], // Empty - should use custom targets instead
                pointerPrimaryDown: true,
            });

            dragTool.onPointerMove(ctx);

            expect(
                (dragTool as any)._raycaster.intersectObjects,
            ).toHaveBeenCalledWith([mockFloor], true);
            expect(mockDraggable.onDrag).toHaveBeenCalled();
        });
    });

    describe('drag surface', () => {
        let scene: Scene;
        let draggable: Object3D & DIVEDraggable;
        let dragStart: Mock<(event: DraggableEvent) => void>;

        /** a 10 m square at the given height, facing up */
        const floor = (y: number, layers = PRODUCT_LAYER_MASK): Mesh => {
            const mesh = new Mesh(
                new PlaneGeometry(10, 10),
                new MeshBasicMaterial(),
            );
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.y = y;
            mesh.layers.mask = layers;
            scene.add(mesh);
            return mesh;
        };

        /** grabs the draggable, moves past the threshold, returns the start */
        const drag = (): Vector3 => {
            scene.updateMatrixWorld(true);
            const grabbed = {
                object: draggable,
                point: new Vector3(0, 0.5, 0),
                distance: 1,
            } as any;
            dragTool.onPointerDown(
                createMockContext({
                    intersects: [grabbed],
                    pointerPrimaryDown: true,
                    lastPointerDown: new Vector2(0.1, 0),
                }),
            );
            dragTool.onPointerMove(
                createMockContext({
                    intersects: [grabbed],
                    pointerPrimaryDown: true,
                    lastPointerDown: new Vector2(0.1, 0),
                }),
            );
            return dragStart.mock.calls[0]?.[0].dragStart;
        };

        beforeEach(() => {
            raycasterState.real = true;

            const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
            camera.position.set(0, 5, 0);
            camera.lookAt(0, 0, 0);
            camera.updateMatrixWorld(true);
            dragTool = new DragTool({
                object: { camera },
                inputEnabled: true,
            } as unknown as OrbitController);

            scene = new Scene();
            dragStart = vi.fn();
            draggable = Object.assign(new Object3D(), {
                isDraggable: true as const,
                onDragStart: dragStart,
            });
            scene.add(draggable);
        });

        afterEach(() => {
            raycasterState.real = false;
        });

        it('should slide over the real geometry below, not the grabbed hit', () => {
            floor(0);

            expect(drag().y).toBeCloseTo(0);
        });

        it('should ignore hidden geometry', () => {
            floor(0);
            floor(2).visible = false;

            expect(drag().y).toBeCloseTo(0);
        });

        it('should ignore geometry off the product layer', () => {
            floor(0);
            floor(2, DEFAULT_LAYER_MASK);

            expect(drag().y).toBeCloseTo(0);
        });
    });
});
