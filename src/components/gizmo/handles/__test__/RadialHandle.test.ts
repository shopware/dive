import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DIVERadialHandle } from '../RadialHandle.ts';
import { DIVERotateGizmo } from '../../rotate/RotateGizmo.ts';
import { DraggableEvent } from '@shopware-ag/dive/toolbox';
import { Vector3, Color } from 'three';

// Mock the RotateGizmo
vi.mock('../../rotate/RotateGizmo', () => ({
    DIVERotateGizmo: vi.fn(),
}));

describe('DIVERadialHandle', () => {
    let radialHandle: DIVERadialHandle;
    let mockParent: DIVERotateGizmo;

    beforeEach(() => {
        vi.clearAllMocks();

        radialHandle = new DIVERadialHandle(
            'x',
            1,
            Math.PI / 2,
            new Vector3(1, 0, 0),
            0xff0000,
        );

        mockParent = {
            onHandleHover: vi.fn(),
            onHandleDragStart: vi.fn(),
            onHandleDrag: vi.fn(),
            onHandleDragEnd: vi.fn(),
        } as unknown as DIVERotateGizmo;

        radialHandle.parent = mockParent;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should instantiate with correct properties', () => {
            expect(radialHandle).toBeDefined();
            expect(radialHandle.name).toBe('DIVERadialHandle');
            expect(radialHandle.axis).toBe('x');
            expect(radialHandle.isHoverable).toBe(true);
            expect(radialHandle.isDraggable).toBe(true);
            expect(radialHandle.highlight).toBe(false);
        });

        it('should set up color properties', () => {
            expect(radialHandle.highlight).toBe(false);
        });

        it('should create visual elements', () => {
            expect(radialHandle.children.length).toBeGreaterThan(0);
        });
    });

    describe('debug property', () => {
        it('should set collider mesh visibility', () => {
            const colliderMesh = (radialHandle as any)._colliderMesh;
            colliderMesh.visible = false;

            radialHandle.debug = true;

            expect(colliderMesh.visible).toBe(true);
        });
    });

    describe('highlight property', () => {
        it('should update line material color when highlighted', () => {
            const lineMaterial = (radialHandle as any)._lineMaterial;
            const originalColor = lineMaterial.color.clone();

            radialHandle.highlight = true;

            expect(lineMaterial.color).not.toEqual(originalColor);
        });

        it('should update line material color when hovered', () => {
            const lineMaterial = (radialHandle as any)._lineMaterial;
            const originalColor = lineMaterial.color.clone();

            (radialHandle as any)._hovered = true;
            radialHandle.highlight = false;

            expect(lineMaterial.color).not.toEqual(originalColor);
        });

        it('should use normal color when not highlighted or hovered', () => {
            const lineMaterial = (radialHandle as any)._lineMaterial;
            const normalColor = (radialHandle as any)._color;

            (radialHandle as any)._hovered = false;
            radialHandle.highlight = false;

            expect(lineMaterial.color).toEqual(normalColor);
        });
    });

    describe('vector properties', () => {
        it('should calculate forward vector correctly', () => {
            const forwardVector = radialHandle.forwardVector;

            expect(forwardVector).toBeDefined();
            expect(forwardVector.length()).toBeCloseTo(1, 5);
        });

        it('should calculate right vector correctly', () => {
            const rightVector = radialHandle.rightVector;

            expect(rightVector).toBeDefined();
            expect(rightVector.length()).toBeCloseTo(1, 5);
        });

        it('should calculate up vector correctly', () => {
            const upVector = radialHandle.upVector;

            expect(upVector).toBeDefined();
            expect(upVector.length()).toBeCloseTo(1, 5);
        });
    });

    describe('reset', () => {
        it('should reset line material color to original color', () => {
            const lineMaterial = (radialHandle as any)._lineMaterial;
            const originalColor = (radialHandle as any)._color;

            radialHandle.highlight = true;
            radialHandle.reset();

            expect(lineMaterial.color).toEqual(originalColor);
        });
    });

    describe('onPointerEnter', () => {
        it('should set hovered state and call parent onHandleHover', () => {
            radialHandle.onPointerEnter();

            expect((radialHandle as any)._hovered).toBe(true);
            expect(mockParent.onHandleHover).toHaveBeenCalledWith(
                radialHandle,
                true,
            );
        });

        it('should not call parent when parent is null', () => {
            radialHandle.parent = null;

            expect(() => {
                radialHandle.onPointerEnter();
            }).not.toThrow();
        });
    });

    describe('onPointerLeave', () => {
        it('should clear hovered state and call parent onHandleHover', () => {
            (radialHandle as any)._hovered = true;

            radialHandle.onPointerLeave();

            expect((radialHandle as any)._hovered).toBe(false);
            expect(mockParent.onHandleHover).toHaveBeenCalledWith(
                radialHandle,
                false,
            );
        });

        it('should not call parent when parent is null', () => {
            radialHandle.parent = null;

            expect(() => {
                radialHandle.onPointerLeave();
            }).not.toThrow();
        });
    });

    describe('onDragStart', () => {
        it('should call parent onHandleDragStart', () => {
            radialHandle.onDragStart();

            expect(mockParent.onHandleDragStart).toHaveBeenCalledWith(
                radialHandle,
            );
        });

        it('should not call parent when parent is null', () => {
            radialHandle.parent = null;

            expect(() => {
                radialHandle.onDragStart();
            }).not.toThrow();
        });
    });

    describe('onDrag', () => {
        it('should call parent onHandleDrag with event', () => {
            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            radialHandle.onDrag(dragEvent);

            expect(mockParent.onHandleDrag).toHaveBeenCalledWith(
                radialHandle,
                dragEvent,
            );
        });

        it('should not call parent when parent is null', () => {
            radialHandle.parent = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            expect(() => {
                radialHandle.onDrag(dragEvent);
            }).not.toThrow();
        });
    });

    describe('onDragEnd', () => {
        it('should call parent onHandleDragEnd', () => {
            radialHandle.onDragEnd();

            expect(mockParent.onHandleDragEnd).toHaveBeenCalledWith(
                radialHandle,
            );
        });

        it('should not call parent when parent is null', () => {
            radialHandle.parent = null;

            expect(() => {
                radialHandle.onDragEnd();
            }).not.toThrow();
        });
    });

    describe('different axis configurations', () => {
        it('should handle y-axis configuration', () => {
            const yHandle = new DIVERadialHandle(
                'y',
                1,
                Math.PI / 2,
                new Vector3(0, 1, 0),
                0x00ff00,
            );

            expect(yHandle.axis).toBe('y');
        });

        it('should handle z-axis configuration', () => {
            const zHandle = new DIVERadialHandle(
                'z',
                1,
                Math.PI / 2,
                new Vector3(0, 0, 1),
                0x0000ff,
            );

            expect(zHandle.axis).toBe('z');
        });
    });
});
