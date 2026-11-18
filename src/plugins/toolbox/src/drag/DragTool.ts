import { type Object3D, Vector3 } from 'three/webgpu';
import {
    type ColliderIntersection,
    type DIVEDraggable,
    DIVERaycaster,
    findInterface,
    isVisibleInHierarchy,
    PRODUCT_LAYER_MASK,
} from '@shopware-ag/dive';
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

    private _scene: Object3D;
    private _controller: OrbitController;
    private _surfaceRaycaster: DIVERaycaster;

    // Drag state
    private _dragging: boolean = false;
    private _draggable: (Object3D & DIVEDraggable) | null = null;
    private _dragStart: Vector3 = new Vector3();
    private _dragCurrent: Vector3 = new Vector3();
    private _dragEnd: Vector3 = new Vector3();
    private _dragDelta: Vector3 = new Vector3();

    // Custom raycast targets for the drag surface
    private _dragRaycastTargets: Object3D[] | null = null;

    /**
     * @param scene What a drag slides over unless targets are set
     * @param controller The controller whose camera aims the pointer
     */
    constructor(scene: Object3D, controller: OrbitController) {
        this._scene = scene;
        this._controller = controller;

        // product colliders, the same picking sees; proxies are no surface
        this._surfaceRaycaster = new DIVERaycaster();
        this._surfaceRaycaster.layers.mask = PRODUCT_LAYER_MASK;
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
        this.updateRaycasters(ctx);

        // Check if we should start dragging
        if (!this._dragging) {
            const distance = ctx.lastPointerDown.distanceTo(ctx.pointer);
            if (distance > POINTER_DRAG_THRESHOLD) {
                this.startDrag();
            }
        }

        if (this._dragging) {
            this.updateDrag();
            return true; // Block other tools during drag
        }
    }

    onPointerUp(ctx: PointerContext): void {
        if (this._dragging) {
            // Update raycaster for final position
            this.updateRaycasters(ctx);
            this.endDrag();
        }
        this._draggable = null;
    }

    /**
     * Set custom objects to raycast against during drag.
     *
     * Only product colliders on or below the targets are a surface, so a
     * target needs a collider. Targets hidden in their hierarchy are skipped.
     *
     * @param targets Objects whose product colliders are searched, or null
     * for the whole scene
     */
    setDragRaycastTargets(targets: Object3D[] | null): void {
        this._dragRaycastTargets = targets;
    }

    // ============ Private Methods ============

    private updateRaycasters(ctx: PointerContext): void {
        this._surfaceRaycaster.setFromCamera(
            ctx.pointer,
            this._controller.object.camera,
        );
    }

    private startDrag(): void {
        const intersect = this.getDragIntersect();
        if (!intersect) return;

        this._dragStart.copy(intersect.point);
        this._dragCurrent.copy(intersect.point);
        this._dragEnd.copy(intersect.point);
        this._dragDelta.set(0, 0, 0);

        this._draggable?.onDragStart?.(this.createDragEvent());

        this._dragging = true;
        this._controller.inputEnabled = false;
    }

    private updateDrag(): void {
        const intersect = this.getDragIntersect();
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
        this._controller.inputEnabled = true;

        this.resetDragState();
    }

    private getDragIntersect(): ColliderIntersection | null {
        const intersects = (
            this._dragRaycastTargets
                ? this._surfaceRaycaster.intersectObjects(
                      this._dragRaycastTargets.filter(isVisibleInHierarchy),
                  )
                : this._surfaceRaycaster.intersectObject(this._scene)
        ) as ColliderIntersection[];

        // the dragged object would otherwise be its own surface
        return (
            intersects.find((intersect) => !this.isDragged(intersect.object)) ??
            null
        );
    }

    /** whether the object is the dragged one or below it */
    private isDragged(object: Object3D): boolean {
        for (let o: Object3D | null = object; o; o = o.parent) {
            if (o === this._draggable) return true;
        }
        return false;
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
