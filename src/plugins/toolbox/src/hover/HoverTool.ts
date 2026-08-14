import { type Object3D } from 'three/webgpu';
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
        // While a button is held the pointer is moving the camera, not aiming at
        // anything -- and OrbitControls uses all three. Following the hover there
        // costs a raycast per event for feedback nobody asked for. The state is
        // left as it was rather than cleared, so releasing does not make it blink;
        // the next free move corrects it.
        if (
            ctx.pointerPrimaryDown ||
            ctx.pointerMiddleDown ||
            ctx.pointerSecondaryDown
        ) {
            return;
        }

        // Every hit, whatever layer: hovering is feedback, and anything the
        // pointer can reach may want to respond to it.
        const intersect = ctx.intersects[0];
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
