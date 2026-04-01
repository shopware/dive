vi.mock('@shopware-ag/dive/shader', () => ({
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

vi.mock('three', async () => {
    const actual = await vi.importActual<typeof import('three')>('three');

    const Raycaster = vi.fn(function (this: any) {
        this.setFromCamera = vi.fn(() => this);
        this.intersectObjects = vi.fn(() => []);
        return this;
    });

    return {
        ...actual,
        Raycaster,
    };
});

import { Vector2, Vector3, type Object3D } from 'three';
import { DragTool } from '../DragTool.ts';
import { type PointerContext } from '../../PointerContext.ts';
import { type DIVEDraggable } from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';

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

const createMockController = () =>
    ({
        domElement: {
            clientWidth: 1000,
            clientHeight: 1000,
        },
        object: {
            isPerspectiveCamera: true,
            layers: { mask: 0 },
        },
        enabled: true,
    }) as unknown as OrbitController;

const createMockContext = (
    options: Partial<PointerContext> = {},
): PointerContext => ({
    event: new PointerEvent('pointermove'),
    pointer: new Vector2(0, 0),
    intersects: [],
    modelIntersects: [],
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
            expect(mockController.enabled).toBe(true);
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

            // Setup drag state
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;

            const ctx = createMockContext({
                pointer: new Vector2(0.2, 0.2),
                intersects: [
                    {
                        object: mockDraggable,
                        point: new Vector3(2, 0, 0),
                    } as any,
                ],
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

            // Directly call startDrag to test the method
            (dragTool as any)._draggable = mockDraggable;

            const ctx = createMockContext({
                intersects: [
                    {
                        object: mockDraggable,
                        point: new Vector3(1, 2, 3),
                    } as any,
                ],
            });

            (dragTool as any).startDrag(ctx);

            expect(dragTool.isDragging).toBe(true);
            expect(mockDraggable.onDragStart).toHaveBeenCalled();
            expect(mockController.enabled).toBe(false);
        });

        it('should call updateDrag internal method', () => {
            const mockDraggable = {
                uuid: 'test',
                isDraggable: true,
                onDrag: vi.fn(),
            } as unknown as Object3D & DIVEDraggable;

            // Setup drag state
            (dragTool as any)._dragging = true;
            (dragTool as any)._draggable = mockDraggable;

            const ctx = createMockContext({
                intersects: [
                    {
                        object: mockDraggable,
                        point: new Vector3(2, 3, 4),
                    } as any,
                ],
            });

            (dragTool as any).updateDrag(ctx);

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
            mockController.enabled = false;

            (dragTool as any).endDrag();

            expect(mockDraggable.onDragEnd).toHaveBeenCalled();
            expect(dragTool.isDragging).toBe(false);
            expect(mockController.enabled).toBe(true);
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
});
