export const DEFAULT_LAYER_MASK = 0b00000001; //  1
export const COORDINATE_LAYER_MASK = 0b00000010; //  2
export const UI_LAYER_MASK = 0b00000100; //  4
export const HELPER_LAYER_MASK = 0b00001000; //  8
export const PRODUCT_LAYER_MASK = 0b00010000; // 16

/**
 * The ground plane.
 *
 * Deliberately separate from `PRODUCT_LAYER_MASK`: the floor has to render and
 * receive shadows, but it must not count towards bounding boxes, scene exports
 * or picking. Keeping it on its own bit makes "does this geometry count?" a
 * plain `mask & PRODUCT_LAYER_MASK` test with no per-class exceptions.
 */
export const FLOOR_LAYER_MASK = 0b00100000; // 32

/**
 * Stands in for an entity that has no geometry of its own.
 *
 * A point light is nothing but a position; the little sphere you can see and
 * click in the editor represents it. Picking a proxy therefore means picking the
 * entity behind it, which is what `findInterface` resolves by walking up.
 *
 * Its own bit, because it sits between two others that both fit badly:
 * `PRODUCT_LAYER_MASK` would make it count towards bounds, snapping and exports,
 * and `UI_LAYER_MASK` is the gizmo — which must never be selectable as an
 * object. `HELPER_LAYER_MASK` is the opposite case again: decoration that is not
 * picked at all.
 */
export const PROXY_LAYER_MASK = 0b01000000; // 64
