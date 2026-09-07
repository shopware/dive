import {
    type Object3D,
    type Intersection,
    Raycaster,
    Vector3,
} from 'three/webgpu';
import { type DIVEDraggable, findInterface } from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type Tool } from '../Tool.ts';
import { type PointerContext } from '../PointerContext.ts';
import { type DraggableEvent } from './DraggableEvent.ts';

const POINTER_DRAG_THRESHOLD = 0.001;

/**
 * Tool for handling drag operations on objects.
 *
 * Detects DIVEDraggable objects and triggers their drag callbacks.
 * Blocks other tools while a drag operation is in progress.
 *
 * @module
 */
export class DragTool implements Tool {
    readonly name = 'drag';
    readonly priority = 10;

    private _controller: OrbitController;
    private _raycaster: Raycaster;

    // Drag state
    private _dragging: boolean = false;
    private _draggable: (Object3D & DIVEDraggable) | null = null;
    private _dragStart: Vector3 = new Vector3();
    private _dragCurrent: Vector3 = new Vector3();
    private _dragEnd: Vector3 = new Vector3();
    private _dragDelta: Vector3 = new Vector3();

    // Custom raycast targets for drag plane
    private _dragRaycastTargets: Object3D[] | null = null;

    constructor(controller: OrbitController) {
        this._controller = controller;
        this._raycaster = new Raycaster();
    }

    /**
     * Whether a drag operation is currently in progress.
     */
    get isDragging(): boolean {
        return this._dragging;
    }

    /**
     * The object currently being dragged, or null.
     */
    get draggable(): (Object3D & DIVEDraggable) | null {
        return this._draggable;
    }

    onActivate(): void {
        this.resetDragState();
    }

    onDeactivate(): void {
        if (this._dragging && this._draggable) {
            this.endDrag();
        }
        this.resetDragState();
    }

    onPointerDown(ctx: PointerContext): void {
        // Only start drag on primary button
        if (!ctx.pointerPrimaryDown) return;

        // Find draggable object at pointer position
        this._draggable =
            (findInterface<DIVEDraggable>(
                ctx.intersects[0]?.object,
                'isDraggable',
            ) as Object3D & DIVEDraggable) || null;
    }

    onPointerMove(ctx: PointerContext): boolean | void {
        if (!ctx.pointerPrimaryDown) return;
        if (!this._draggable) return;

        // Update raycaster from context
        this._raycaster.setFromCamera(
            ctx.pointer,
            this._controller.object.camera,
        );

        // Check if we should start dragging
        if (!this._dragging) {
            const distance = ctx.lastPointerDown.distanceTo(ctx.pointer);
            if (distance > POINTER_DRAG_THRESHOLD) {
                this.startDrag(ctx);
            }
        }

        if (this._dragging) {
            this.updateDrag(ctx);
            return true; // Block other tools during drag
        }
    }

    onPointerUp(ctx: PointerContext): void {
        if (this._dragging) {
            // Update raycaster for final position
            this._raycaster.setFromCamera(
                ctx.pointer,
                this._controller.object.camera,
            );
            this.endDrag();
        }
        this._draggable = null;
    }

    /**
     * Set custom objects to raycast against during drag.
     * Useful for constraining drag to a floor plane.
     *
     * @param targets Objects to raycast against, or null to use scene objects
     */
    setDragRaycastTargets(targets: Object3D[] | null): void {
        this._dragRaycastTargets = targets;
    }

    // ============ Private Methods ============

    private startDrag(ctx: PointerContext): void {
        const intersect = this.getDragIntersect(ctx);
        if (!intersect) return;

        this._dragStart.copy(intersect.point);
        this._dragCurrent.copy(intersect.point);
        this._dragEnd.copy(intersect.point);
        this._dragDelta.set(0, 0, 0);

        this._draggable?.onDragStart?.(this.createDragEvent());

        this._dragging = true;
        this._controller.enabled = false;
    }

    private updateDrag(ctx: PointerContext): void {
        const intersect = this.getDragIntersect(ctx);
        if (!intersect) return;

        this._dragCurrent.copy(intersect.point);
        this._dragEnd.copy(intersect.point);
        this._dragDelta.subVectors(this._dragCurrent, this._dragStart);

        this._draggable?.onDrag?.(this.createDragEvent());
    }

    private endDrag(): void {
        const finalEvent = this.createDragEvent();

        this._draggable?.onDragEnd?.(finalEvent);

        this._dragging = false;
        this._controller.enabled = true;

        this.resetDragState();
    }

    private getDragIntersect(ctx: PointerContext): Intersection | null {
        if (this._dragRaycastTargets) {
            const intersects = this._raycaster.intersectObjects(
                this._dragRaycastTargets,
                true,
            );
            return intersects[0] || null;
        }
        return ctx.intersects[0] || null;
    }

    private createDragEvent(): DraggableEvent {
        return {
            dragStart: this._dragStart.clone(),
            dragCurrent: this._dragCurrent.clone(),
            dragEnd: this._dragEnd.clone(),
            dragDelta: this._dragDelta.clone(),
        };
    }

    private resetDragState(): void {
        this._dragStart.set(0, 0, 0);
        this._dragCurrent.set(0, 0, 0);
        this._dragEnd.set(0, 0, 0);
        this._dragDelta.set(0, 0, 0);
    }
}
