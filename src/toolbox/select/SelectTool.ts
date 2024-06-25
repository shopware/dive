import { Object3D, Vector2 } from "three";
import { DIVESelectable, isSelectable } from "../../interface/Selectable.ts";
import DIVEScene from "../../scene/Scene.ts";
import { DIVEMoveable } from "../../interface/Moveable.ts";
import DIVEOrbitControls from "../../controls/OrbitControls.ts";
import DIVETransformTool from "../transform/TransformTool.ts";

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

export default class DIVESelectTool extends DIVETransformTool {

    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        super(scene, controller);
        this.name = "SelectTool";
    }

    public Activate(): void { }


    public Select(selectable: DIVESelectable): void {
        if (selectable.onSelect) selectable.onSelect();

        if ('isMoveable' in selectable) {
            const movable = selectable as (Object3D & DIVESelectable & DIVEMoveable);
            console.log(movable)
        }
    }

    public Deselect(selectable: DIVESelectable): void {
        if (selectable.onDeselect) selectable.onDeselect();
        if (('isMoveable' in selectable)) (selectable as unknown as DIVEMoveable).gizmo = null;
        // this.gizmo.detach();
    }

    public onPointerUp(e: PointerEvent): void {
        super.onPointerUp(e);

        const pointerPos: Vector2 = new Vector2(e.offsetX / this._canvas.clientWidth * 2 - 1, e.offsetY / this._canvas.clientHeight * 2 + 1);
        this._raycaster.setFromCamera(pointerPos, this._controller.object);

        const first = this._raycaster.intersectObjects(this._scene.Root.children, true)[0];
        const selectable = this.findSelectableInterface(first?.object);
        if (!first || !selectable) {
            // if (this.gizmo.object) this.Deselect(this.gizmo.object as (Object3D & DIVESelectable));
            return;
        }

        this.Select(selectable);
    }

    private findSelectableInterface(child: Object3D): (Object3D & DIVESelectable) | undefined {
        if (child === undefined) return undefined;

        if (child.parent === null) {
            // in this case it is the scene itself
            return undefined;
        }

        if (isSelectable(child)) {
            // in this case it is the Selectable
            return child;
        }

        // search recursively in parent
        return this.findSelectableInterface(child.parent);
    }
}