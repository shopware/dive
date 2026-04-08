import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DIVEScaleGizmo } from '../ScaleGizmo.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { DIVEScaleHandle } from '../../handles/ScaleHandle.ts';
import { DIVEGizmo } from '../../Gizmo.ts';
import { DraggableEvent } from '@shopware-ag/dive/toolbox';
import { Vector3 } from 'three/webgpu';

// Mock the OrbitController
vi.mock('@shopware-ag/dive/orbitcontroller', () => ({
    OrbitController: vi.fn().mockImplementation(() => ({
        addEventListener: vi.fn(),
        getDistance: vi.fn(() => 10),
    })),
}));

// Mock the ScaleHandle
vi.mock('../../handles/ScaleHandle', async () => {
    const { Object3D } = await vi.importActual<typeof import('three')>('three');

    return {
        DIVEScaleHandle: vi
            .fn()
            .mockImplementation((axis, length, direction, color) =>
                Object.assign(new Object3D(), {
                    axis,
                    length,
                    direction,
                    color,
                    highlight: false,
                    forwardVector: new Vector3(
                        direction.x,
                        direction.y,
                        direction.z,
                    ),
                    reset: vi.fn(),
                    update: vi.fn(),
                }),
            ),
    };
});

// Mock the main Gizmo
vi.mock('../../Gizmo', () => ({
    DIVEGizmo: vi.fn(),
}));

describe('DIVEScaleGizmo', () => {
    let scaleGizmo: DIVEScaleGizmo;
    let mockController: OrbitController;
    let mockGizmo: DIVEGizmo;
    let mockHandle: DIVEScaleHandle;

    beforeEach(() => {
        vi.clearAllMocks();

        mockController = new OrbitController();
        scaleGizmo = new DIVEScaleGizmo(mockController);

        mockGizmo = {
            object: {
                scale: { clone: vi.fn(() => new Vector3(1, 1, 1)) },
            },
            onHover: vi.fn(),
            onChange: vi.fn(),
        } as unknown as DIVEGizmo;

        mockHandle = {
            axis: 'x',
            highlight: false,
            forwardVector: new Vector3(1, 0, 0),
        } as unknown as DIVEScaleHandle;

        // Set up parent hierarchy
        scaleGizmo.parent = {} as any;
        (scaleGizmo.parent as any).parent = mockGizmo;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should instantiate with correct properties', () => {
            expect(scaleGizmo).toBeDefined();
            expect(scaleGizmo.name).toBe('DIVEScaleGizmo');
            expect(scaleGizmo.children).toHaveLength(3);
            expect(scaleGizmo.isHoverable).toBe(true);
        });

        it('should create scale handles for x, y, z axes', () => {
            expect(DIVEScaleHandle).toHaveBeenCalledTimes(3);

            const calls = (DIVEScaleHandle as any).mock.calls;
            expect(calls[0][0]).toBe('x');
            expect(calls[1][0]).toBe('y');
            expect(calls[2][0]).toBe('z');
        });
    });

    describe('debug property', () => {
        it('should set debug on all children', () => {
            const children = scaleGizmo.children as DIVEScaleHandle[];
            children.forEach((child) => {
                child.debug = false;
            });

            scaleGizmo.debug = true;

            children.forEach((child) => {
                expect(child.debug).toBe(true);
            });
        });
    });

    describe('reset', () => {
        it('should reset all children', () => {
            const children = scaleGizmo.children as DIVEScaleHandle[];

            scaleGizmo.reset();

            children.forEach((child) => {
                expect(child.reset).toHaveBeenCalled();
            });
        });
    });

    describe('update', () => {
        it('should update all children with new scale', () => {
            const children = scaleGizmo.children as DIVEScaleHandle[];
            const newScale = new Vector3(2, 3, 4);

            scaleGizmo.update(newScale);

            children.forEach((child) => {
                expect(child.update).toHaveBeenCalledWith(newScale);
            });
        });
    });

    describe('handleHighlight', () => {
        it('should highlight correct handle when not dragging', () => {
            const children = scaleGizmo.children as DIVEScaleHandle[];

            (scaleGizmo as any).handleHighlight('x', true, false);

            expect(children[0].highlight).toBe(true);
            expect(children[1].highlight).toBe(false);
            expect(children[2].highlight).toBe(false);
        });

        it('should highlight correct handle when dragging', () => {
            const children = scaleGizmo.children as DIVEScaleHandle[];

            (scaleGizmo as any).handleHighlight('y', false, true);

            expect(children[0].highlight).toBe(false);
            expect(children[1].highlight).toBe(true);
            expect(children[2].highlight).toBe(false);
        });

        it('should not highlight any handle when value is false and not dragging', () => {
            const children = scaleGizmo.children as DIVEScaleHandle[];

            (scaleGizmo as any).handleHighlight('x', false, false);

            children.forEach((child) => {
                expect(child.highlight).toBe(false);
            });
        });
    });

    describe('onHoverAxis', () => {
        it('should call parent gizmo onHover and handle highlight when not dragging', () => {
            const handleHighlightSpy = vi.spyOn(
                scaleGizmo as any,
                'handleHighlight',
            );

            scaleGizmo.onHoverAxis(mockHandle, true);

            expect(mockGizmo.onHover).toHaveBeenCalledWith(
                'translate',
                'x',
                true,
            );
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', true, false);
        });

        it('should not change hover state when dragging', () => {
            (scaleGizmo as any)._startScale = new Vector3(1, 2, 3);
            const handleHighlightSpy = vi.spyOn(
                scaleGizmo as any,
                'handleHighlight',
            );

            scaleGizmo.onHoverAxis(mockHandle, true);

            expect(mockGizmo.onHover).not.toHaveBeenCalled();
            expect(handleHighlightSpy).not.toHaveBeenCalled();
        });

        it('should not call parent methods when parent is missing', () => {
            scaleGizmo.parent = null;

            expect(() => {
                scaleGizmo.onHoverAxis(mockHandle, true);
            }).not.toThrow();
        });
    });

    describe('onAxisDragStart', () => {
        it('should set start scale and highlight handle', () => {
            const handleHighlightSpy = vi.spyOn(
                scaleGizmo as any,
                'handleHighlight',
            );

            scaleGizmo.onAxisDragStart(mockHandle);

            expect((scaleGizmo as any)._startScale).not.toBeNull();
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', true, true);
        });

        it('should not set start scale when parent is missing', () => {
            scaleGizmo.parent = null;

            scaleGizmo.onAxisDragStart(mockHandle);

            expect((scaleGizmo as any)._startScale).toBeNull();
        });

        it('should not set start scale when object is missing', () => {
            (mockGizmo as any).object = null;

            scaleGizmo.onAxisDragStart(mockHandle);

            expect((scaleGizmo as any)._startScale).toBeNull();
        });
    });

    describe('onAxisDrag', () => {
        beforeEach(() => {
            (scaleGizmo as any)._startScale = new Vector3(1, 2, 3);
        });

        it('should update scale based on drag delta', () => {
            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            scaleGizmo.onAxisDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).toHaveBeenCalledWith(
                undefined,
                undefined,
                expect.objectContaining({ x: 1.5, y: 2, z: 3 }),
            );
        });

        it('should not update when start scale is null', () => {
            (scaleGizmo as any)._startScale = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            scaleGizmo.onAxisDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });

        it('should not update when parent is missing', () => {
            scaleGizmo.parent = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            scaleGizmo.onAxisDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });

        it('should not update when parent parent is missing', () => {
            (scaleGizmo.parent as any).parent = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            scaleGizmo.onAxisDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });
    });

    describe('onAxisDragEnd', () => {
        it('should clear start scale and reset highlight', () => {
            (scaleGizmo as any)._startScale = new Vector3(1, 2, 3);
            const handleHighlightSpy = vi.spyOn(
                scaleGizmo as any,
                'handleHighlight',
            );

            scaleGizmo.onAxisDragEnd(mockHandle);

            expect((scaleGizmo as any)._startScale).toBeNull();
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', false, false);
        });
    });
});
