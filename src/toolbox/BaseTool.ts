import { Intersection, Object3D, Raycaster, Vector2, Vector3 } from "three";
import { PRODUCT_LAYER_MASK, UI_LAYER_MASK } from "../constant/VisibilityLayerMask";
import DIVEScene from "../scene/Scene";
import DIVEOrbitControls from "../controls/OrbitControls";
import { DIVEDraggable } from "../interface/Draggable";
import { DIVEHoverable } from "../interface/Hoverable";

export type DraggableEvent = {
    dragStart: Vector3;
    dragCurrent: Vector3;
    dragEnd: Vector3;
    dragDelta: Vector3;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export default abstract class DIVEBaseTool {
    public name: string;

    protected _canvas: HTMLElement;
    protected _scene: DIVEScene;
    protected _controller: DIVEOrbitControls;

    // general pointer members
    protected _pointer: Vector2;

    protected get _pointerAnyDown(): boolean {
        return this._pointerPrimaryDown
            || this._pointerMiddleDown
            || this._pointerSecondaryDown;

    };
    protected _pointerPrimaryDown: boolean;
    protected _pointerMiddleDown: boolean;
    protected _pointerSecondaryDown: boolean;

    // raycast members
    protected _raycaster: Raycaster;
    protected _intersects: Intersection[];

    // hovering members
    protected _hovered: (Object3D & DIVEHoverable) | null;

    // dragging members
    protected _dragging: boolean;
    protected _dragStart: Vector3;
    protected _dragCurrent: Vector3;
    protected _dragEnd: Vector3;
    protected _dragDelta: Vector3;
    protected _dragged: DIVEDraggable | null;
    protected _dragRaycastOnObjects: Object3D[] | null;

    protected constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        this.name = "BaseTool";

        this._canvas = controller.domElement;
        this._scene = scene;
        this._controller = controller;

        this._pointer = new Vector2();

        this._pointerPrimaryDown = false;
        this._pointerMiddleDown = false;
        this._pointerSecondaryDown = false;

        this._raycaster = new Raycaster();
        this._raycaster.layers.mask = PRODUCT_LAYER_MASK | UI_LAYER_MASK;
        this._intersects = [];

        this._hovered = null;

        this._dragging = false;
        this._dragStart = new Vector3();
        this._dragCurrent = new Vector3();
        this._dragEnd = new Vector3();
        this._dragDelta = new Vector3();
        this._dragged = null;
        this._dragRaycastOnObjects = null;
    }

    public Activate(): void { }

    public Deactivate(): void { }

    public onPointerDown(e: PointerEvent): void {
        switch (e.button) {
            case 0:
                this._pointerPrimaryDown = true;
                break;
            case 1:
                this._pointerMiddleDown = true;
                break;
            case 2:
                this._pointerSecondaryDown = true;
                break;
        }

        this._dragStart.copy(this._intersects[0]?.point.clone());
        this._dragCurrent.copy(this._intersects[0]?.point.clone());
        this._dragEnd.copy(this._dragStart.clone());
        this._dragDelta = new Vector3();
    }

    public onPointerDragStart(e: PointerEvent): void {
        this._dragging = true;

        this._dragged = this.findDraggableInterface(this._intersects[0]?.object) || null;
        if (this._dragged && this._dragged.onDragStart) {
            this._dragged.onDragStart({
                dragStart: this._dragStart,
                dragCurrent: this._dragCurrent,
                dragEnd: this._dragEnd,
                dragDelta: this._dragDelta,
            });
        }
    }

    public onPointerMove(e: PointerEvent): void {
        // update pointer
        this._pointer.x = (e.offsetX / this._canvas.clientWidth) * 2 - 1;
        this._pointer.y = -(e.offsetY / this._canvas.clientHeight) * 2 + 1;

        // set raycaster
        this._raycaster.setFromCamera(this._pointer, this._controller.object);

        // refresh intersects
        this._intersects = this.raycast(this._scene.children);

        // hovering
        const hoverable = this.findHoverableInterface(this._intersects[0]?.object);

        if (this._intersects[0] && hoverable) {
            if (!this._hovered) {
                if (hoverable.onPointerEnter) hoverable.onPointerEnter(this._intersects[0]);
                this._hovered = hoverable;
                return;
            }

            if (this._hovered.uuid !== hoverable.uuid) {
                if (this._hovered.onPointerLeave) this._hovered.onPointerLeave();
                if (hoverable.onPointerEnter) hoverable.onPointerEnter(this._intersects[0]);
                this._hovered = hoverable;
                return;
            }

            if (hoverable.onPointerOver) hoverable.onPointerOver(this._intersects[0]);
            this._hovered = hoverable;

        } else {
            if (this._hovered) {
                if (this._hovered.onPointerLeave) this._hovered.onPointerLeave();
            }

            this._hovered = null;
        }

        // dragging
        if (this._pointerAnyDown) {
            if (!this._dragging) {
                this.onPointerDragStart(e);
            }

            this.onPointerDrag(e);
        }
    }

    public onPointerDrag(e: PointerEvent): void {
        if (this._dragRaycastOnObjects !== null) {
            this._intersects = this.raycast(this._dragRaycastOnObjects);
        }
        const intersect = this._intersects[0];
        if (!intersect) return;

        this._dragCurrent.copy(intersect.point.clone());
        this._dragEnd.copy(intersect.point.clone());
        this._dragDelta.subVectors(this._dragCurrent.clone(), this._dragStart.clone());

        if (this._dragged && this._dragged.onDrag) {
            this._dragged.onDrag({
                dragStart: this._dragStart,
                dragCurrent: this._dragCurrent,
                dragEnd: this._dragEnd,
                dragDelta: this._dragDelta,
            });
        }
    }

    public onPointerUp(e: PointerEvent): void {
        switch (e.button) {
            case 0:
                this._pointerPrimaryDown = false;
                break;
            case 1:
                this._pointerMiddleDown = false;
                break;
            case 2:
                this._pointerSecondaryDown = false;
                break;
        }

        if (this._dragging) {
            this.onPointerDragEnd(e);
        }
    }

    public onPointerDragEnd(e: PointerEvent): void {
        const intersect = this._intersects[0];
        if (!intersect) return;

        this._dragEnd.copy(intersect.point.clone());
        this._dragCurrent.copy(intersect.point.clone());
        this._dragDelta.subVectors(this._dragCurrent.clone(), this._dragStart.clone());

        if (this._dragged && this._dragged.onDragEnd) {
            this._dragged.onDragEnd({
                dragStart: this._dragStart,
                dragCurrent: this._dragCurrent,
                dragEnd: this._dragEnd,
                dragDelta: this._dragDelta,
            });
        }

        this._dragged = null;
        this._dragging = false;
    }

    public onWheel(e: WheelEvent): void { }

    protected raycast(objects?: Object3D[]): Intersection[] {
        if (objects !== undefined) return this.raycastObjects(objects);
        return this.raycastAll();
    }

    protected raycastObjects(objects: Object3D[]): Intersection[] {
        return this._raycaster.intersectObjects(objects, true);
    }

    protected raycastAll(): Intersection[] {
        return this._raycaster.intersectObjects(this._scene.children, true);
    }

    private findDraggableInterface(child: Object3D): (Object3D & DIVEDraggable) | undefined {
        if (child === undefined) return undefined;

        if (child.parent === null) {
            // in this case it is the scene itself
            return undefined;
        }

        if ('isDraggable' in child) {
            return child as (Object3D & DIVEDraggable);
        }

        return this.findDraggableInterface(child.parent);
    }

    private findHoverableInterface(child: Object3D): (Object3D & DIVEHoverable) | undefined {
        if (child === undefined) return undefined;

        if (child.parent === null) {
            // in this case it is the scene itself
            return undefined;
        }

        if ('isHoverable' in child) {
            return child as (Object3D & DIVEHoverable);
        }

        return this.findHoverableInterface(child.parent);
    }
}