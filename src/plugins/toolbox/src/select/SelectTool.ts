import { type Object3D } from 'three/webgpu';
import { type DIVESelectable, findInterface } from '@shopware-ag/dive';
import { type Tool } from '../Tool.ts';
import { type PointerContext } from '../PointerContext.ts';
import { type SelectionState } from '../SelectionState.ts';

/**
 * Type guard to check if a tool is a SelectTool.
 */
export const isSelectTool = (tool: Tool): tool is SelectTool => {
    return tool.name === 'select';
};

/**
 * Tool for selecting objects via click.
 *
 * Only processes objects on PRODUCT_LAYER (models), ignoring UI elements like gizmos.
 * Uses SelectionState to manage selection and notify other tools (like TransformTool).
 *
 * @module
 */
export class SelectTool implements Tool {
    readonly name = 'select';
    readonly priority = 30;

    private _selectionState: SelectionState;

    constructor(selectionState: SelectionState) {
        this._selectionState = selectionState;
    }

    /**
     * Get the currently selected object.
     */
    public get selected(): (Object3D & DIVESelectable) | null {
        return this._selectionState.selected;
    }

    public onActivate(): void {}

    public onDeactivate(): void {}

    public onClick(ctx: PointerContext): void {
        // Entities only: real geometry, plus the proxies that stand in for what
        // has none. The gizmo is on the UI layer and stays unselectable.
        const intersect = ctx.entityIntersects[0];
        const selectable = findInterface<DIVESelectable>(
            intersect?.object,
            'isSelectable',
        );

        // Case 1: Nothing hit or hit object is not selectable
        if (!intersect || !selectable) {
            this._selectionState.deselect();
            return;
        }

        // Case 2: Same object clicked - do nothing
        const currentSelection = this._selectionState.selected;
        if (currentSelection && currentSelection.uuid === selectable.uuid) {
            return;
        }

        // Case 3: New object clicked - select it
        this._selectionState.select(selectable as Object3D & DIVESelectable);
    }

    /**
     * Programmatically select an object.
     */
    public select(obj: Object3D & DIVESelectable): void {
        this._selectionState.select(obj);
    }

    /**
     * Programmatically deselect the current selection.
     */
    public deselect(): void {
        this._selectionState.deselect();
    }
}
