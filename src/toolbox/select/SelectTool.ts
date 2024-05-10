import { Intersection, Object3D, Raycaster, Vector2 } from "three";
import { TransformControls } from "three/examples/jsm/Addons.js";
import DIVEBaseTool from "../BaseTool.ts";
import { DIVESelectable } from "../../interface/Selectable.ts";
import DIVEScene from "../../scene/Scene.ts";
import { HELPER_LAYER_MASK, PRODUCT_LAYER_MASK, UI_LAYER_MASK } from "../../constant/VisibilityLayerMask.ts";
import { DIVEMoveable } from "../../interface/Moveable.ts";
import DIVEOrbitControls from "../../controls/OrbitControls.ts";

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

export default class DIVESelectTool extends DIVEBaseTool {
    private canvas: HTMLElement;
    private scene: DIVEScene;
    private controller: DIVEOrbitControls;
    private raycaster: Raycaster;
    private gizmo: TransformControls;


    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        super();
        this.name = "SelectTool";

        this.canvas = controller.domElement;
        this.scene = scene;
        this.controller = controller;
        this.raycaster = new Raycaster();
        this.raycaster.layers.mask = PRODUCT_LAYER_MASK | HELPER_LAYER_MASK;

        this.gizmo = new TransformControls(this.controller.object, this.canvas);

        this.gizmo.layers.mask = UI_LAYER_MASK;
        this.gizmo.getRaycaster().layers.mask = UI_LAYER_MASK & this.controller.object.layers.mask;
        this.gizmo.traverse((child) => {
            child.layers.mask = UI_LAYER_MASK;
        });
        this.gizmo.addEventListener('objectChange', () => {
            if (!this.gizmo.object) return;
            if (!('onMove' in this.gizmo.object)) return;
            if (typeof this.gizmo.object.onMove !== 'function') return;
            this.gizmo.object.onMove();
        });

        this.controller.object.onSetCameraLayer = (mask: number) => {
            this.gizmo.getRaycaster().layers.mask = UI_LAYER_MASK & mask;
        };

        this.gizmo.addEventListener('dragging-changed', function (event) {
            controller.enabled = !event.value;
        });

        this.scene.add(this.gizmo);
    }

    public Activate() { }

    public SetGizmoMode(mode: 'translate' | 'rotate' | 'scale') {
        this.gizmo.setMode(mode);
    }

    public Select(selectable: DIVESelectable): void {
        if (selectable.onSelect) selectable.onSelect();

        if ('isMoveable' in selectable) {
            const movable = selectable as (Object3D & DIVESelectable & DIVEMoveable);
            movable.gizmo = this.gizmo;
            this.gizmo.attach(movable);
        }
    }

    public Deselect(selectable: DIVESelectable): void {
        if (selectable.onDeselect) selectable.onDeselect();
        if (('isMoveable' in selectable)) (selectable as unknown as DIVEMoveable).gizmo = null;
        this.gizmo.detach();
    }

    public onPointerUp(e: PointerEvent) {
        const pointerPos: Vector2 = new Vector2(e.offsetX / this.canvas.clientWidth * 2 - 1, e.offsetY / this.canvas.clientHeight * -2 + 1);
        this.raycaster.setFromCamera(pointerPos, this.controller.object);

        const first = this.raycastFirst();
        const selectable = this.findSelectableInterface(first?.object);
        if (!first || !selectable) {
            if (this.gizmo.object) this.Deselect(this.gizmo.object as (Object3D & DIVESelectable));
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

        if ('isSelectable' in child) {
            return child as (Object3D & DIVESelectable);
        }

        return this.findSelectableInterface(child.parent);
    }

    private raycastFirst(): Intersection {
        return this.raycastAll()[0];
    }

    private raycastAll(): Intersection[] {
        return this.raycaster.intersectObjects(this.scene.Root.children, true);
    }
}