import { type Intersection, type Vector2 } from 'three';

/**
 * Context object passed to tools on pointer events.
 *
 * Contains pre-computed raycast results and pointer state,
 * shared across all active tools to avoid redundant calculations.
 *
 * @module
 */
export interface PointerContext {
    /** The original DOM pointer event */
    readonly event: PointerEvent;

    /** Normalized device coordinates (-1 to 1) */
    readonly pointer: Vector2;

    /** All raycast intersections */
    readonly intersects: Intersection[];

    /** Intersections filtered to PRODUCT_LAYER (models only) */
    readonly modelIntersects: Intersection[];

    /** Intersections filtered to UI_LAYER (gizmo, UI elements) */
    readonly uiIntersects: Intersection[];

    /** Whether primary mouse button (left) is pressed */
    readonly pointerPrimaryDown: boolean;

    /** Whether middle mouse button is pressed */
    readonly pointerMiddleDown: boolean;

    /** Whether secondary mouse button (right) is pressed */
    readonly pointerSecondaryDown: boolean;

    /** Last pointer position when a button was pressed down */
    readonly lastPointerDown: Vector2;
}

/**
 * Context object passed to tools on wheel events.
 *
 * @module
 */
export interface WheelContext {
    /** The original DOM wheel event */
    readonly event: WheelEvent;

    /** Normalized device coordinates (-1 to 1) */
    readonly pointer: Vector2;

    /** All raycast intersections at current pointer position */
    readonly intersects: Intersection[];

    /** Intersections filtered to PRODUCT_LAYER (models only) */
    readonly modelIntersects: Intersection[];

    /** Intersections filtered to UI_LAYER (gizmo, UI elements) */
    readonly uiIntersects: Intersection[];
}
