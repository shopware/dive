import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { type Object3D, type Mesh, type MeshBasicMaterial } from 'three';
import {
    AxesColorBlue,
    AxesColorGreen,
    AxesColorRed,
    type DIVEMovable,
    type DIVEScene,
    type DIVESelectable,
    implementsInterface,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type Tool } from '../Tool.ts';
import { type PointerContext } from '../PointerContext.ts';
import { type SelectionState } from '../SelectionState.ts';

/**
 * Type guard to check if a tool is a TransformTool.
 */
export const isTransformTool = (tool: Tool): tool is TransformTool => {
    return tool.name === 'transform';
};

/**
 * Tool for transforming objects with a gizmo.
 *
 * Manages TransformControls gizmo and reacts to selection changes.
 * Has highest priority to block model-hover when gizmo is being interacted with.
 *
 * @module
 */
export class TransformTool implements Tool {
    readonly name = 'transform';
    readonly priority = 5;

    private _scene: DIVEScene;
    private _controller: OrbitController;
    private _selectionState: SelectionState;
    private _gizmo: TransformControls;
    private _scaleLinked: boolean = false;
    private _gizmoVisible: boolean = true;

    private _selectionChangeHandler: (
        selected: (Object3D & DIVESelectable) | null,
    ) => void;

    constructor(
        scene: DIVEScene,
        controller: OrbitController,
        selectionState: SelectionState,
    ) {
        this._scene = scene;
        this._controller = controller;
        this._selectionState = selectionState;

        this._gizmo = this.initGizmo();
        this._scene.add(this._gizmo);

        // Bind selection change handler
        this._selectionChangeHandler = this.onSelectionChange.bind(this);
    }

    /**
     * Get the TransformControls gizmo.
     */
    get gizmo(): TransformControls {
        return this._gizmo;
    }

    onActivate(): void {
        this._selectionState.onChange(this._selectionChangeHandler);

        // Sync with current selection
        const current = this._selectionState.selected;
        if (current) {
            this.attachGizmo(current);
        }
    }

    onDeactivate(): void {
        this._selectionState.offChange(this._selectionChangeHandler);
        this._gizmo.detach();
    }

    onPointerMove(ctx: PointerContext): boolean | void {
        // Check if gizmo is being hovered - if so, block model hover
        if (this._gizmo.dragging) {
            return true; // Block other tools while dragging gizmo
        }

        // Check if pointer is over gizmo UI elements
        if (ctx.uiIntersects.length > 0) {
            const isGizmoHit = ctx.uiIntersects.some((i) =>
                this.isGizmoChild(i.object),
            );
            if (isGizmoHit) {
                return true; // Block model hover when hovering gizmo
            }
        }
    }

    /**
     * Set the gizmo transformation mode.
     */
    setGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void {
        this._gizmo.mode = mode;
    }

    /**
     * Set whether the gizmo is visible.
     */
    setGizmoVisible(visible: boolean): void {
        this._gizmoVisible = visible;

        const contains = this._scene.children.includes(this._gizmo);
        if (visible && !contains) {
            this._scene.add(this._gizmo);
            this._gizmo.getRaycaster().layers.enableAll();
        } else if (!visible && contains) {
            this._scene.remove(this._gizmo);
            this._gizmo.getRaycaster().layers.disableAll();
        }
    }

    /**
     * Set whether scale operations are linked (uniform scaling).
     */
    setGizmoScaleLinked(linked: boolean): void {
        this._scaleLinked = linked;
    }

    /**
     * Dispose of the tool and clean up resources.
     */
    dispose(): void {
        this._selectionState.offChange(this._selectionChangeHandler);
        this._gizmo.detach();
        this._scene.remove(this._gizmo);
        this._gizmo.dispose();
    }

    // ============ Private Methods ============

    private onSelectionChange(
        selected: (Object3D & DIVESelectable) | null,
    ): void {
        if (selected && implementsInterface<DIVEMovable>(selected, 'isMovable')) {
            this.attachGizmo(selected);
        } else {
            this._gizmo.detach();
        }
    }

    private attachGizmo(obj: Object3D & DIVESelectable): void {
        if (implementsInterface<DIVEMovable>(obj, 'isMovable')) {
            this._gizmo.attach(obj);
            this.setGizmoVisible(obj.visible && this._gizmoVisible);
        }
    }

    private isGizmoChild(obj: Object3D): boolean {
        let current: Object3D | null = obj;
        while (current) {
            if (current === this._gizmo) return true;
            current = current.parent;
        }
        return false;
    }

    private initGizmo(): TransformControls {
        const g = new TransformControls(
            this._controller.object,
            this._controller.domElement,
        );
        g.mode = 'translate';

        // Apply custom colors to gizmo axes
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

        // Gizmo drag start - disable orbit controls
        g.addEventListener('mouseDown', () => {
            this._controller.enabled = false;

            if (!implementsInterface<DIVEMovable>(g.object, 'isMovable'))
                return;
            g.object.onMoveStart?.();
        });

        // Gizmo dragging - notify object
        g.addEventListener('objectChange', () => {
            if (!implementsInterface<DIVEMovable>(g.object, 'isMovable'))
                return;
            g.object.onMove?.();

            // Apply linked scale if enabled
            if (this._scaleLinked && g.object) {
                const scale = g.object.scale;
                const averageScale = (scale.x + scale.y + scale.z) / 3;
                g.object.scale.set(averageScale, averageScale, averageScale);
            }
        });

        // Gizmo drag end - re-enable orbit controls
        g.addEventListener('mouseUp', () => {
            this._controller.enabled = true;

            if (!implementsInterface<DIVEMovable>(g.object, 'isMovable'))
                return;
            g.object.onMoveEnd?.();
        });

        return g;
    }
}
