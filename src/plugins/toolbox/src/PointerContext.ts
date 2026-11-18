import { type Intersection, type Vector2 } from 'three/webgpu';

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

    /** Entity and gizmo intersections, merged and sorted by distance */
    readonly intersects: Intersection[];

    /** Collider hits on PRODUCT_LAYER (models and primitives), one per collider */
    readonly modelIntersects: Intersection[];

    /**
     * Collider hits that stand for an entity: PRODUCT_LAYER for real geometry,
     * PROXY_LAYER for something that has none, such as a camera or a light.
     * `object` is the entity's node. What selecting reads.
     */
    readonly entityIntersects: Intersection[];

    /** Gizmo meshes on UI_LAYER, raycast by geometry */
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

    /** Entity and gizmo intersections. See {@link PointerContext}. */
    readonly intersects: Intersection[];

    /** Collider hits on PRODUCT_LAYER. See {@link PointerContext}. */
    readonly modelIntersects: Intersection[];

    /** Intersections that stand for an entity. See {@link PointerContext}. */
    readonly entityIntersects: Intersection[];

    /** Gizmo meshes on UI_LAYER. See {@link PointerContext}. */
    readonly uiIntersects: Intersection[];
}
