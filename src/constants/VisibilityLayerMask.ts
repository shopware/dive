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
