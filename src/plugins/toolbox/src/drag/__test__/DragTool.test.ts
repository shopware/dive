import { Vector2, Vector3, type Object3D } from 'three';
import { DragTool } from '../DragTool.ts';
import { type PointerContext } from '../../PointerContext.ts';
import { type DIVEDraggable } from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';

/**
 * @vitest-environment jsdom
 */

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
                    { object: mockDraggable, point: new Vector3(0, 0, 0) } as any,
                ],
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
                    { object: mockDraggable, point: new Vector3(0, 0, 0) } as any,
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
                    { object: mockDraggable, point: new Vector3(0, 0, 0) } as any,
                ],
            });

            dragTool.onPointerDown(ctx);
            expect(dragTool.draggable).toBe(mockDraggable);

            dragTool.onPointerUp(ctx);
            expect(dragTool.draggable).toBeNull();
        });
    });
});
