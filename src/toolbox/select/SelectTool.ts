import { type Object3D } from "three";
import { DIVEScene } from "../../scene/Scene.ts";
import DIVETransformTool from "../transform/TransformTool.ts";
import { findInterface } from "../../helper/findInterface/findInterface.ts";
import type DIVEOrbitControls from "../../controls/OrbitControls.ts";
import { type DIVESelectable } from "../../interface/Selectable.ts";
import { type DIVEMovable } from "../../interface/Movable.ts";
import { type DIVEBaseTool } from "../BaseTool.ts";

export const isSelectTool = (tool: DIVEBaseTool): tool is DIVESelectTool => {
    return (tool as DIVESelectTool).isSelectTool !== undefined;
}

export interface DIVEObjectEventMap {
    select: object
}

/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMovable to be movable.
 *
 * @module
 */

export class DIVESelectTool extends DIVETransformTool {
    readonly isSelectTool: boolean = true;

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

    public AttachGizmo(selectable: DIVESelectable): void {
        if ('isMovable' in selectable) {
            const movable = selectable as (Object3D & DIVESelectable & DIVEMovable);
            this._gizmo.attach(movable);
            this.SetGizmoVisibility(movable.visible);
        }
    }

    public DetachGizmo(): void {
        this._gizmo.detach();
    }

    public onClick(e: PointerEvent): void {
        super.onClick(e);

        const first = this._raycaster.intersectObjects(this._scene.Root.children, true).filter((intersect) => intersect.object.visible)[0];
        const selectable = findInterface<DIVESelectable>(first?.object, 'isSelectable');

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
}