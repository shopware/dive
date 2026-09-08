import { describe, it, expect, beforeEach } from 'vitest';
import { DIVEScaleHandle } from '../ScaleHandle.ts';
import { DIVEScaleGizmo } from '../../scale/ScaleGizmo.ts';
import { type DraggableEvent } from '../../../drag/DraggableEvent.ts';
import { Vector3 } from 'three/webgpu';
import { vi } from 'vitest';

vi.mock('../../scale/ScaleGizmo', () => ({
    DIVEScaleGizmo: vi.fn().mockImplementation(() => ({
        onHoverAxis: vi.fn(),
        onAxisDragStart: vi.fn(),
        onAxisDrag: vi.fn(),
        onAxisDragEnd: vi.fn(),
    })),
}));

describe('DIVEScaleHandle', () => {
    let scaleHandle: DIVEScaleHandle;
    let mockParent: DIVEScaleGizmo;
    let mockDirection: Vector3;
    let mockColor: number;

    beforeEach(() => {
        mockParent = new DIVEScaleGizmo({} as any);
        mockDirection = new Vector3(1, 0, 0);
        mockColor = 0xff0000;
        scaleHandle = new DIVEScaleHandle(
            'x',
            1.0,
            mockDirection,
            mockColor,
            0.05,
        );
        scaleHandle.parent = mockParent;
    });

    it('should instantiate and assign axis/parent', () => {
        expect(scaleHandle.axis).toBe('x');
        expect(scaleHandle.parent).toBe(mockParent);
    });

    it('should call parent hover methods on pointer enter/leave', () => {
        scaleHandle.onPointerEnter();
        expect(mockParent.onHoverAxis).toHaveBeenCalledWith(scaleHandle, true);
        scaleHandle.onPointerLeave();
        expect(mockParent.onHoverAxis).toHaveBeenCalledWith(scaleHandle, false);
    });

    it('should call parent drag methods', () => {
        scaleHandle.onDragStart();
        expect(mockParent.onAxisDragStart).toHaveBeenCalledWith(scaleHandle);
        const dragEvent: DraggableEvent = {
            dragStart: new Vector3(),
            dragCurrent: new Vector3(),
            dragEnd: new Vector3(),
            dragDelta: new Vector3(),
        };
        scaleHandle.onDrag(dragEvent);
        expect(mockParent.onAxisDrag).toHaveBeenCalledWith(
            scaleHandle,
            dragEvent,
        );
        scaleHandle.onDragEnd();
        expect(mockParent.onAxisDragEnd).toHaveBeenCalledWith(scaleHandle);
    });

    it('should not throw if parent is null on events', () => {
        scaleHandle.parent = null;
        expect(() => scaleHandle.onPointerEnter()).not.toThrow();
        expect(() => scaleHandle.onPointerLeave()).not.toThrow();
        expect(() => scaleHandle.onDragStart()).not.toThrow();
        expect(() =>
            scaleHandle.onDrag({
                dragStart: new Vector3(),
                dragCurrent: new Vector3(),
                dragEnd: new Vector3(),
                dragDelta: new Vector3(),
            }),
        ).not.toThrow();
        expect(() => scaleHandle.onDragEnd()).not.toThrow();
    });

    it('should set debug property (colliderMesh visibility)', () => {
        (scaleHandle as any)._colliderMesh = { visible: false };
        scaleHandle.debug = true;
        expect((scaleHandle as any)._colliderMesh.visible).toBe(true);
        scaleHandle.debug = false;
        expect((scaleHandle as any)._colliderMesh.visible).toBe(false);
    });

    it('should set highlight property', () => {
        (scaleHandle as any)._lineMaterial = { color: { set: vi.fn() } };
        scaleHandle.highlight = true;
        expect(scaleHandle.highlight).toBe(true);
        scaleHandle.highlight = false;
        expect(scaleHandle.highlight).toBe(false);
    });

    it('should call reset and update without error', () => {
        (scaleHandle as any)._lineMaterial = { color: { set: vi.fn() } };
        expect(() => scaleHandle.reset()).not.toThrow();
        (scaleHandle as any)._box = { scale: { copy: vi.fn() } };
        expect(() => scaleHandle.update(new Vector3(1, 2, 3))).not.toThrow();
    });
});

//
