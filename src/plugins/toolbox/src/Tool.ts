import { type PointerContext, type WheelContext } from './PointerContext.ts';

/**
 * Interface for tools that handle pointer events in the scene.
 *
 * Tools are lightweight event routers that delegate logic to scene objects.
 * Multiple tools can be active simultaneously, processed by priority order.
 *
 * @module
 */
export interface Tool {
    /** Unique identifier for the tool */
    readonly name: string;

    /** Processing priority - lower number runs first */
    readonly priority: number;

    /** Called when tool is activated */
    onActivate?(): void;

    /** Called when tool is deactivated */
    onDeactivate?(): void;

    /**
     * Called on pointer move events
     * @returns true to stop event propagation to lower-priority tools
     */
    onPointerMove?(ctx: PointerContext): void | boolean;

    /**
     * Called on pointer down events
     * @returns true to stop event propagation to lower-priority tools
     */
    onPointerDown?(ctx: PointerContext): void | boolean;

    /**
     * Called on pointer up events
     * @returns true to stop event propagation to lower-priority tools
     */
    onPointerUp?(ctx: PointerContext): void | boolean;

    /**
     * Called on click events (pointer down + up without drag)
     * @returns true to stop event propagation to lower-priority tools
     */
    onClick?(ctx: PointerContext): void | boolean;

    /**
     * Called on wheel events
     * @returns true to stop event propagation to lower-priority tools
     */
    onWheel?(ctx: WheelContext): void | boolean;
}
