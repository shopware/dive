import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { DIVEBaseTool } from '../BaseTool.ts';
import {
    DIVEGizmo,
    AxesColorBlue,
    AxesColorGreen,
    AxesColorRed,
    type DIVEMovable,
    type DIVEScene,
    implementsInterface,
} from '@shopware-ag/dive';
import { OrbitController } from 'src/plugins/orbitcontroller/index.ts';
import { type Mesh, type MeshBasicMaterial } from 'three';

export const isTransformTool = (
    tool: DIVEBaseTool,
): tool is DIVETransformTool => {
    return (tool as DIVETransformTool).isTransformTool !== undefined;
};

/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMovable to be movable.
 *
 * @module
 */

export class DIVETransformTool extends DIVEBaseTool {
    readonly isTransformTool: boolean = true;

    private _scaleLinked: boolean;

    protected _gizmo: TransformControls | DIVEGizmo;

    constructor(scene: DIVEScene, controller: OrbitController) {
        super(scene, controller);
        this.name = 'DIVETransformTool';

        this._scaleLinked = false;

        this._gizmo = this.initGizmo() as TransformControls;

        this._scene.add(this._gizmo);
    }

    public activate(): void {}

    public setGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void {
        this._gizmo.mode = mode;
    }

    public setGizmoVisibility(active: boolean): void {
        const contains = this._scene.children.includes(this._gizmo);
        if (active && !contains) {
            this._scene.add(this._gizmo);
            if ('isTransformControls' in this._gizmo) {
                (this._gizmo as TransformControls)
                    .getRaycaster()
                    .layers.enableAll();
            }
        } else if (!active && contains) {
            this._scene.remove(this._gizmo);
            if ('isTransformControls' in this._gizmo) {
                (this._gizmo as TransformControls)
                    .getRaycaster()
                    .layers.disableAll();
            }
        }
    }

    public setGizmoScaleLinked(linked: boolean): void {
        this._scaleLinked = linked;
    }

    // only used for optimizing pointer events with DIVEGizmo
    // public onPointerDown(e: PointerEvent): void {
    //     super.onPointerDown(e);

    //     if (this._hovered) {
    //         this._dragRaycastOnObjects = (
    //             this._gizmo as DIVEGizmo
    //         ).gizmoPlane?.children;
    //     }
    // }

    // only used for optimizing pointer events with DIVEGizmo
    // protected raycast(): Intersection[] {
    //     return super.raycast((this._gizmo as DIVEGizmo).gizmoNode.children);
    // }

    private initGizmo(): TransformControls | DIVEGizmo {
        const g = new TransformControls(
            // this._controller,
            this._controller.object,
            this._controller.domElement,
        );
        // g.debug = true;
        g.mode = 'translate';

        g.traverse((child) => {
            if (!('isMesh' in child)) return;

            const material = (child as Mesh).material as MeshBasicMaterial;

            if (child.name === 'X') {
                material.color.set(AxesColorRed);
            }
            if (child.name === 'Y') {
                material.color.set(AxesColorGreen);
            }
            if (child.name === 'Z') {
                material.color.set(AxesColorBlue);
            }
            if (child.name === 'XY') {
                material.color.set(AxesColorBlue);
            }
            if (child.name === 'YZ') {
                material.color.set(AxesColorRed);
            }
            if (child.name === 'XZ') {
                material.color.set(AxesColorGreen);
            }
        });

        // happens when pointerDown event is called on gizmo
        g.addEventListener('mouseDown', () => {
            this._controller.enabled = false;

            if (!implementsInterface<DIVEMovable>(g.object, 'isMovable'))
                return;
            if (!g.object.onMoveStart) return;
            g.object.onMoveStart();
        });

        // happens when pointerMove event is called on gizmo
        g.addEventListener('objectChange', () => {
            if (!implementsInterface<DIVEMovable>(g.object, 'isMovable'))
                return;
            if (!g.object.onMove) return;
            g.object.onMove();

            if (this._scaleLinked) {
                const scale = g.object.scale;
                const averageScale = (scale.x + scale.y + scale.z) / 3;
                g.object.scale.set(averageScale, averageScale, averageScale);
            }
        });

        // happens when pointerUp event is called on gizmo
        g.addEventListener('mouseUp', () => {
            this._controller.enabled = true;

            if (!implementsInterface<DIVEMovable>(g.object, 'isMovable'))
                return;
            if (!g.object.onMoveEnd) return;
            g.object.onMoveEnd();
        });

        return g;
    }
}
