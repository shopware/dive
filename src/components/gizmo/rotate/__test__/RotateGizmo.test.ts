import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DIVERotateGizmo } from '../RotateGizmo.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { DIVERadialHandle } from '../../handles/RadialHandle.ts';
import { DIVEGizmo } from '../../Gizmo.ts';
import { DraggableEvent } from '@shopware-ag/dive/toolbox';
import { Vector3, Euler } from 'three/webgpu';
import { DIVEMath } from '../../../../helpers/math/index.ts';

// Mock the OrbitController
vi.mock('@shopware-ag/dive/orbitcontroller', () => ({
    OrbitController: vi.fn().mockImplementation(() => ({
        addEventListener: vi.fn(),
        getDistance: vi.fn(() => 10),
    })),
}));

// Mock the RadialHandle
vi.mock('../../handles/RadialHandle', async () => {
    const { Object3D } = await vi.importActual<typeof import('three')>('three');

    return {
        DIVERadialHandle: vi
            .fn()
            .mockImplementation((axis, radius, arc, direction, color) =>
                Object.assign(new Object3D(), {
                    axis,
                    radius,
                    arc,
                    direction,
                    color,
                    highlight: false,
                    forwardVector: new Vector3(
                        direction.x,
                        direction.y,
                        direction.z,
                    ),
                    reset: vi.fn(),
                }),
            ),
    };
});

// Mock the main Gizmo
vi.mock('../../Gizmo', () => ({
    DIVEGizmo: vi.fn(),
}));

// Mock the math helper
vi.mock('../../../../helpers/math/index', () => ({
    DIVEMath: {
        signedAngleTo: vi.fn(() => 0.5),
    },
}));

describe('DIVERotateGizmo', () => {
    let rotateGizmo: DIVERotateGizmo;
    let mockController: OrbitController;
    let mockGizmo: DIVEGizmo;
    let mockHandle: DIVERadialHandle;

    beforeEach(() => {
        vi.clearAllMocks();

        mockController = new OrbitController();
        rotateGizmo = new DIVERotateGizmo(mockController);

        mockGizmo = {
            object: {
                rotation: { clone: vi.fn(() => new Euler(0, 0, 0)) },
            },
            onHover: vi.fn(),
            onChange: vi.fn(),
            position: new Vector3(0, 0, 0),
        } as unknown as DIVEGizmo;

        mockHandle = {
            axis: 'x',
            highlight: false,
            forwardVector: new Vector3(1, 0, 0),
        } as unknown as DIVERadialHandle;

        // Set up parent hierarchy
        rotateGizmo.parent = {} as any;
        (rotateGizmo.parent as any).parent = mockGizmo;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should instantiate with correct properties', () => {
            expect(rotateGizmo).toBeDefined();
            expect(rotateGizmo.name).toBe('DIVERotateGizmo');
            expect(rotateGizmo.children).toHaveLength(3);
        });

        it('should create radial handles for x, y, z axes', () => {
            expect(DIVERadialHandle).toHaveBeenCalledTimes(3);

            const calls = (DIVERadialHandle as any).mock.calls;
            expect(calls[0][0]).toBe('x');
            expect(calls[1][0]).toBe('y');
            expect(calls[2][0]).toBe('z');
        });
    });

    describe('debug property', () => {
        it('should set debug on all children', () => {
            const children = rotateGizmo.children as DIVERadialHandle[];
            children.forEach((child) => {
                child.debug = false;
            });

            rotateGizmo.debug = true;

            children.forEach((child) => {
                expect(child.debug).toBe(true);
            });
        });
    });

    describe('reset', () => {
        it('should reset all children', () => {
            const children = rotateGizmo.children as DIVERadialHandle[];

            rotateGizmo.reset();

            children.forEach((child) => {
                expect(child.reset).toHaveBeenCalled();
            });
        });
    });

    describe('handleHighlight', () => {
        it('should highlight correct handle when not dragging', () => {
            const children = rotateGizmo.children as DIVERadialHandle[];

            (rotateGizmo as any).handleHighlight('x', true, false);

            expect(children[0].highlight).toBe(true);
            expect(children[1].highlight).toBe(false);
            expect(children[2].highlight).toBe(false);
        });

        it('should highlight correct handle when dragging', () => {
            const children = rotateGizmo.children as DIVERadialHandle[];

            (rotateGizmo as any).handleHighlight('y', false, true);

            expect(children[0].highlight).toBe(false);
            expect(children[1].highlight).toBe(true);
            expect(children[2].highlight).toBe(false);
        });

        it('should not highlight any handle when value is false and not dragging', () => {
            const children = rotateGizmo.children as DIVERadialHandle[];

            (rotateGizmo as any).handleHighlight('x', false, false);

            children.forEach((child) => {
                expect(child.highlight).toBe(false);
            });
        });
    });

    describe('onHandleHover', () => {
        it('should call parent gizmo onHover and handle highlight when not dragging', () => {
            const handleHighlightSpy = vi.spyOn(
                rotateGizmo as any,
                'handleHighlight',
            );

            rotateGizmo.onHandleHover(mockHandle, true);

            expect(mockGizmo.onHover).toHaveBeenCalledWith('rotate', 'x', true);
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', true, false);
        });

        it('should not change hover state when dragging', () => {
            (rotateGizmo as any)._startRot = new Euler(0.1, 0.2, 0.3);
            const handleHighlightSpy = vi.spyOn(
                rotateGizmo as any,
                'handleHighlight',
            );

            rotateGizmo.onHandleHover(mockHandle, true);

            expect(mockGizmo.onHover).not.toHaveBeenCalled();
            expect(handleHighlightSpy).not.toHaveBeenCalled();
        });

        it('should not call parent methods when parent is missing', () => {
            rotateGizmo.parent = null;

            expect(() => {
                rotateGizmo.onHandleHover(mockHandle, true);
            }).not.toThrow();
        });
    });

    describe('onHandleDragStart', () => {
        it('should set start rotation and highlight handle', () => {
            const handleHighlightSpy = vi.spyOn(
                rotateGizmo as any,
                'handleHighlight',
            );

            rotateGizmo.onHandleDragStart(mockHandle);

            expect((rotateGizmo as any)._startRot).not.toBeNull();
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', true, true);
        });

        it('should not set start rotation when parent is missing', () => {
            rotateGizmo.parent = null;

            rotateGizmo.onHandleDragStart(mockHandle);

            expect((rotateGizmo as any)._startRot).toBeNull();
        });

        it('should not set start rotation when object is missing', () => {
            (mockGizmo as any).object = null;

            rotateGizmo.onHandleDragStart(mockHandle);

            expect((rotateGizmo as any)._startRot).toBeNull();
        });
    });

    describe('onHandleDrag', () => {
        beforeEach(() => {
            (rotateGizmo as any)._startRot = new Euler(0.1, 0.2, 0.3);
        });

        it('should update rotation based on drag angle', () => {
            const dragEvent: DraggableEvent = {
                dragCurrent: new Vector3(1, 0, 0),
                dragStart: new Vector3(0, 1, 0),
                dragDelta: new Vector3(1, -1, 0),
                dragEnd: new Vector3(1, 0, 0),
            };

            rotateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(DIVEMath.signedAngleTo).toHaveBeenCalled();
            expect(mockGizmo.onChange).toHaveBeenCalledWith(
                undefined,
                expect.any(Euler),
            );
        });

        it('should not update when start rotation is null', () => {
            (rotateGizmo as any)._startRot = null;

            const dragEvent: DraggableEvent = {
                dragCurrent: new Vector3(1, 0, 0),
                dragStart: new Vector3(0, 1, 0),
                dragDelta: new Vector3(1, -1, 0),
                dragEnd: new Vector3(1, 0, 0),
            };

            rotateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });

        it('should not update when parent is missing', () => {
            rotateGizmo.parent = null;

            const dragEvent: DraggableEvent = {
                dragCurrent: new Vector3(1, 0, 0),
                dragStart: new Vector3(0, 1, 0),
                dragDelta: new Vector3(1, -1, 0),
                dragEnd: new Vector3(1, 0, 0),
            };

            rotateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });

        it('should not update when parent parent is missing', () => {
            (rotateGizmo.parent as any).parent = null;

            const dragEvent: DraggableEvent = {
                dragCurrent: new Vector3(1, 0, 0),
                dragStart: new Vector3(0, 1, 0),
                dragDelta: new Vector3(1, -1, 0),
                dragEnd: new Vector3(1, 0, 0),
            };

            rotateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });
    });

    describe('onHandleDragEnd', () => {
        it('should clear start rotation and reset highlight', () => {
            (rotateGizmo as any)._startRot = new Euler(0.1, 0.2, 0.3);
            const handleHighlightSpy = vi.spyOn(
                rotateGizmo as any,
                'handleHighlight',
            );

            rotateGizmo.onHandleDragEnd(mockHandle);

            expect((rotateGizmo as any)._startRot).toBeNull();
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', false, false);
        });
    });
});
