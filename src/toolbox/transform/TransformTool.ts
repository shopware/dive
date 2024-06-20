import { Object3D } from "three";
import DIVEBaseTool from "../BaseTool.ts";
import DIVEScene from "../../scene/Scene.ts";
import DIVEOrbitControls from "../../controls/OrbitControls.ts";
import { DIVEHoverable } from "../../interface/Hoverable.ts";
import { DIVEGizmo } from "../../gizmo/Gizmo.ts";

export interface DIVEObjectEventMap {
    select: object
}

/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMoveable to be moveable.
 *
 * @module
 */

export default class DIVETransformTool extends DIVEBaseTool {
    private _gizmo: DIVEGizmo;

    private _hovered: (Object3D & DIVEHoverable) | null = null;

    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        super(scene, controller);
        this.name = "DIVETransformTool";

        this._gizmo = new DIVEGizmo(this._controller);
        this._gizmo.mode = ['translate'];


        // this.gizmo = new TransformControls(this._controller.object, this._canvas);

        // this.gizmo.layers.mask = UI_LAYER_MASK;
        // this.gizmo.getRaycaster().layers.mask = UI_LAYER_MASK & this._controller.object.layers.mask;
        // this.gizmo.traverse((child) => {
        //     child.layers.mask = UI_LAYER_MASK;
        // });
        // this.gizmo.addEventListener('objectChange', () => {
        //     if (!this.gizmo.object) return;
        //     if (!('onMove' in this.gizmo.object)) return;
        //     if (typeof this.gizmo.object.onMove !== 'function') return;
        //     this.gizmo.object.onMove();
        // });

        // this._controller.object.onSetCameraLayer = (mask: number) => {
        //     this.gizmo.getRaycaster().layers.mask = UI_LAYER_MASK & mask;
        // };

        // this.gizmo.addEventListener('dragging-changed', function (event) {
        //     controller.enabled = !event.value;
        // });

        scene.add(this._gizmo);
    }

    public Activate(): void { }

    public SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void {
        this._gizmo.mode = [mode];
    }

    public onPointerDown(e: PointerEvent): void {
        super.onPointerDown(e);

        if (this._hovered) {
            console.log('hovered', this._hovered);
        }
    }

    public onPointerUp(e: PointerEvent): void {
        super.onPointerUp(e);

        // console.log('pointer up', this._hovered);
        // const pointerPos: Vector2 = new Vector2(e.offsetX / this._canvas.clientWidth * 2 - 1, e.offsetY / this._canvas.clientHeight * 2 + 1);
        // this._raycaster.setFromCamera(pointerPos, this._controller.object);

        // const first = this.raycastFirst();
        // const selectable = this.findSelectableInterface(first?.object);
        // if (!first || !selectable) {
        //     // if (this.gizmo.object) this.Deselect(this.gizmo.object as (Object3D & DIVESelectable));
        //     return;
        // }

        // this.Select(selectable);
    }

    public onPointerMove(e: PointerEvent): void {
        super.onPointerMove(e);

        const first = super.raycast(this._gizmo.gizmoNode.children)[0];
        const hoverable = this.findHoverableInterface(first?.object);

        if (first && hoverable) {
            if (!this._hovered) {
                // console.log('hit on', hoverable);
                if (hoverable.onPointerEnter) hoverable.onPointerEnter(first);
                this._hovered = hoverable;
                return;
            }

            if (this._hovered.uuid !== hoverable.uuid) {
                // console.log('hit changed from', this._hovered, 'to', hoverable);
                if (this._hovered.onPointerLeave) this._hovered.onPointerLeave();
                if (hoverable.onPointerEnter) hoverable.onPointerEnter(first);
                this._hovered = hoverable;
                return;
            }

            if (hoverable.onPointerOver) hoverable.onPointerOver(first);
            this._hovered = hoverable;

        } else {
            if (this._hovered) {
                // console.log('hit lost on', this._hovered)
                if (this._hovered.onPointerLeave) this._hovered.onPointerLeave();
            }

            this._hovered = null;
        }
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