import { Object3D } from "three";
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

        this.AttachGizmo(selectable);
    }

    public Deselect(selectable: DIVESelectable): void {
        if (selectable.onDeselect) selectable.onDeselect();

        this.DetachGizmo();
    }

    public DetachGizmo(): void {
        this._gizmo.detach();
    }

    public AttachGizmo(selectable: DIVESelectable): void {
        if ('isMoveable' in selectable) {
            const movable = selectable as (Object3D & DIVESelectable & DIVEMoveable);
            this._gizmo.attach(movable);
            this.SetGizmoActive(movable.visible);
        }
    }

    public onClick(e: PointerEvent): void {
        super.onClick(e);

        const first = this._raycaster.intersectObjects(this._scene.Root.children, true).filter((intersect) => intersect.object.visible )[0];
        const selectable = this.findSelectableInterface(first?.object);

        // if nothing is hit
        if (!first || !selectable) {
            if (this._gizmo.object) {
                this.Deselect(this._gizmo.object as Object3D & DIVESelectable);
            }
            return;
        }

        if (this._gizmo.object) {
            // do not reselect if the same object was clicked
            if (this._gizmo.object.uuid === selectable.uuid) return;

            // deselect previous object
            this.Deselect(this._gizmo.object as (Object3D & DIVESelectable));
        }


        // select clicked object
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