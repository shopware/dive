import { type Object3D } from 'three';
import { type DIVEHoverable, findInterface } from '@shopware-ag/dive';
import { type Tool } from '../Tool.ts';
import { type PointerContext } from '../PointerContext.ts';

/**
 * Tool for handling hover events on models.
 *
 * Only processes objects on PRODUCT_LAYER (models), ignoring UI elements like gizmos.
 * Triggers DIVEHoverable callbacks: onPointerEnter, onPointerOver, onPointerLeave.
 *
 * @module
 */
export class HoverTool implements Tool {
    readonly name = 'hover';
    readonly priority = 20;

    private _hovered: (Object3D & DIVEHoverable) | null = null;

    /**
     * Currently hovered object, or null if nothing is hovered.
     */
    public get hovered(): (Object3D & DIVEHoverable) | null {
        return this._hovered;
    }

    public onActivate(): void {
        this._hovered = null;
    }

    public onDeactivate(): void {
        // Clear hover state on deactivation
        if (this._hovered) {
            this._hovered.onPointerLeave?.();
            this._hovered = null;
        }
    }

    public onPointerMove(ctx: PointerContext): void {
        // Only use modelIntersects (PRODUCT_LAYER), ignore gizmo/UI
        const intersect = ctx.modelIntersects[0];
        const hoverable = findInterface<DIVEHoverable>(
            intersect?.object,
            'isHoverable',
        );

        // Case 1: Hovering over a new hoverable object
        if (intersect && hoverable) {
            if (!this._hovered) {
                // First hover
                hoverable.onPointerEnter?.(intersect);
                this._hovered = hoverable;
                return;
            }

            if (this._hovered.uuid !== hoverable.uuid) {
                // Hover changed to different object
                this._hovered.onPointerLeave?.();
                hoverable.onPointerEnter?.(intersect);
                this._hovered = hoverable;
                return;
            }

            // Still hovering same object
            hoverable.onPointerOver?.(intersect);
            return;
        }

        // Case 2: Not hovering anything
        if (this._hovered) {
            this._hovered.onPointerLeave?.();
            this._hovered = null;
        }
    }
}
