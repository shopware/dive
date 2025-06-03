import { type Object3D } from 'three';
import {
    type DIVEScene,
    type DIVESelectable,
    type DIVEMovable,
    findInterface,
} from '@shopware-ag/dive';
import { DIVETransformTool } from '../transform/TransformTool.ts';
import { type OrbitController } from 'src/plugins/orbitcontroller/index.ts';
import { type DIVEBaseTool } from '../BaseTool.ts';

export const isSelectTool = (tool: DIVEBaseTool): tool is DIVESelectTool => {
    return (tool as DIVESelectTool).isSelectTool !== undefined;
};

/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMovable to be movable.
 *
 * @module
 */

export class DIVESelectTool extends DIVETransformTool {
    readonly isSelectTool: boolean = true;

    constructor(scene: DIVEScene, controller: OrbitController) {
        super(scene, controller);
        this.name = 'SelectTool';
    }

    public activate(): void {}

    public select(selectable: DIVESelectable): void {
        this.attachGizmo(selectable);

        if (selectable.onSelect) selectable.onSelect();
    }

    public deselect(selectable: DIVESelectable): void {
        this.detachGizmo();

        if (selectable.onDeselect) selectable.onDeselect();
    }

    public attachGizmo(selectable: DIVESelectable): void {
        if ('isMovable' in selectable) {
            const movable = selectable as Object3D &
                DIVESelectable &
                DIVEMovable;
            this._gizmo.attach(movable);
            this.setGizmoVisibility(movable.visible);
        }
    }

    public detachGizmo(): void {
        this._gizmo.detach();
    }

    public onClick(e: PointerEvent): void {
        super.onClick(e);

        const first = this._raycaster
            .intersectObjects(this._scene.root.children, true)
            .filter((intersect) => intersect.object.visible)[0];
        const selectable = findInterface<DIVESelectable>(
            first?.object,
            'isSelectable',
        );

        // if nothing is hit
        if (!first || !selectable) {
            if (this._gizmo.object) {
                this.deselect(this._gizmo.object as Object3D & DIVESelectable);
            }
            return;
        }

        if (this._gizmo.object) {
            // do not reselect if the same object was clicked
            if (this._gizmo.object.uuid === selectable.uuid) return;

            // deselect previous object
            this.deselect(this._gizmo.object as Object3D & DIVESelectable);
        }

        // select clicked object
        this.select(selectable);
    }
}
