import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DIVEAxisHandle } from '../AxisHandle.ts';
import { DIVETranslateGizmo } from '../../translate/TranslateGizmo.ts';
import { DraggableEvent } from '@shopware-ag/dive/toolbox';
import { Vector3, Color } from 'three';

// Mock the TranslateGizmo
vi.mock('../../translate/TranslateGizmo', () => ({
    DIVETranslateGizmo: vi.fn(),
}));

describe('DIVEAxisHandle', () => {
    let axisHandle: DIVEAxisHandle;
    let mockParent: DIVETranslateGizmo;

    beforeEach(() => {
        vi.clearAllMocks();

        axisHandle = new DIVEAxisHandle('x', 1, new Vector3(1, 0, 0), 0xff0000);

        mockParent = {
            onHandleHover: vi.fn(),
            onHandleDragStart: vi.fn(),
            onHandleDrag: vi.fn(),
            onHandleDragEnd: vi.fn(),
        } as unknown as DIVETranslateGizmo;

        axisHandle.parent = mockParent;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should instantiate with correct properties', () => {
            expect(axisHandle).toBeDefined();
            expect(axisHandle.name).toBe('DIVEAxisHandle');
            expect(axisHandle.axis).toBe('x');
            expect(axisHandle.isHoverable).toBe(true);
            expect(axisHandle.isDraggable).toBe(true);
            expect(axisHandle.highlight).toBe(false);
        });

        it('should set up color properties', () => {
            expect(axisHandle.highlight).toBe(false);
        });

        it('should create visual elements', () => {
            expect(axisHandle.children.length).toBeGreaterThan(0);
        });
    });

    describe('debug property', () => {
        it('should set collider mesh visibility', () => {
            const colliderMesh = (axisHandle as any)._colliderMesh;
            colliderMesh.visible = false;

            axisHandle.debug = true;

            expect(colliderMesh.visible).toBe(true);
        });
    });

    describe('highlight property', () => {
        it('should update line material color when highlighted', () => {
            const lineMaterial = (axisHandle as any)._lineMaterial;
            const originalColor = lineMaterial.color.clone();

            axisHandle.highlight = true;

            expect(lineMaterial.color).not.toEqual(originalColor);
        });

        it('should update line material color when hovered', () => {
            const lineMaterial = (axisHandle as any)._lineMaterial;
            const originalColor = lineMaterial.color.clone();

            (axisHandle as any)._hovered = true;
            axisHandle.highlight = false;

            expect(lineMaterial.color).not.toEqual(originalColor);
        });

        it('should use normal color when not highlighted or hovered', () => {
            const lineMaterial = (axisHandle as any)._lineMaterial;
            const normalColor = (axisHandle as any)._color;

            (axisHandle as any)._hovered = false;
            axisHandle.highlight = false;

            expect(lineMaterial.color).toEqual(normalColor);
        });
    });

    describe('vector properties', () => {
        it('should calculate forward vector correctly', () => {
            const forwardVector = axisHandle.forwardVector;

            expect(forwardVector.x).toBeCloseTo(1, 5);
            expect(forwardVector.y).toBeCloseTo(0, 5);
            expect(forwardVector.z).toBeCloseTo(0, 5);
        });

        it('should calculate right vector correctly', () => {
            const rightVector = axisHandle.rightVector;

            expect(rightVector).toBeDefined();
            expect(rightVector.length()).toBeCloseTo(1, 5);
        });

        it('should calculate up vector correctly', () => {
            const upVector = axisHandle.upVector;

            expect(upVector).toBeDefined();
            expect(upVector.length()).toBeCloseTo(1, 5);
        });
    });

    describe('reset', () => {
        it('should reset line material color to original color', () => {
            const lineMaterial = (axisHandle as any)._lineMaterial;
            const originalColor = (axisHandle as any)._color;

            axisHandle.highlight = true;
            axisHandle.reset();

            expect(lineMaterial.color).toEqual(originalColor);
        });
    });

    describe('onPointerEnter', () => {
        it('should set hovered state and call parent onHandleHover', () => {
            axisHandle.onPointerEnter();

            expect((axisHandle as any)._hovered).toBe(true);
            expect(mockParent.onHandleHover).toHaveBeenCalledWith(
                axisHandle,
                true,
            );
        });

        it('should not call parent when parent is null', () => {
            axisHandle.parent = null;

            expect(() => {
                axisHandle.onPointerEnter();
            }).not.toThrow();
        });
    });

    describe('onPointerLeave', () => {
        it('should clear hovered state and call parent onHandleHover', () => {
            (axisHandle as any)._hovered = true;

            axisHandle.onPointerLeave();

            expect((axisHandle as any)._hovered).toBe(false);
            expect(mockParent.onHandleHover).toHaveBeenCalledWith(
                axisHandle,
                false,
            );
        });

        it('should not call parent when parent is null', () => {
            axisHandle.parent = null;

            expect(() => {
                axisHandle.onPointerLeave();
            }).not.toThrow();
        });
    });

    describe('onDragStart', () => {
        it('should call parent onHandleDragStart', () => {
            axisHandle.onDragStart();

            expect(mockParent.onHandleDragStart).toHaveBeenCalledWith(
                axisHandle,
            );
        });

        it('should not call parent when parent is null', () => {
            axisHandle.parent = null;

            expect(() => {
                axisHandle.onDragStart();
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

            axisHandle.onDrag(dragEvent);

            expect(mockParent.onHandleDrag).toHaveBeenCalledWith(
                axisHandle,
                dragEvent,
            );
        });

        it('should not call parent when parent is null', () => {
            axisHandle.parent = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            expect(() => {
                axisHandle.onDrag(dragEvent);
            }).not.toThrow();
        });
    });

    describe('onDragEnd', () => {
        it('should call parent onHandleDragEnd', () => {
            axisHandle.onDragEnd();

            expect(mockParent.onHandleDragEnd).toHaveBeenCalledWith(axisHandle);
        });

        it('should not call parent when parent is null', () => {
            axisHandle.parent = null;

            expect(() => {
                axisHandle.onDragEnd();
            }).not.toThrow();
        });
    });

    describe('different axis configurations', () => {
        it('should handle y-axis configuration', () => {
            const yHandle = new DIVEAxisHandle(
                'y',
                1,
                new Vector3(0, 1, 0),
                0x00ff00,
            );

            expect(yHandle.axis).toBe('y');
            expect(yHandle.forwardVector.y).toBeCloseTo(1, 5);
        });

        it('should handle z-axis configuration', () => {
            const zHandle = new DIVEAxisHandle(
                'z',
                1,
                new Vector3(0, 0, 1),
                0x0000ff,
            );

            expect(zHandle.axis).toBe('z');
            expect(zHandle.forwardVector.z).toBeCloseTo(1, 5);
        });
    });
});
