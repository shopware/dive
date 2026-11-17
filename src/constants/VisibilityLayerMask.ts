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
 * The collider category for stand-ins of entities without geometry of their own.
 *
 * A point light is nothing but a position and a camera nothing but a pose, so
 * what makes them pickable is a collider on their node with this mask, such as
 * the light's sphere or the camera's box. Nothing renders on it.
 *
 * Its own bit, so picking can ask for entities (`PRODUCT_LAYER_MASK | PROXY_LAYER_MASK`)
 * or for models only (`PRODUCT_LAYER_MASK`). `UI_LAYER_MASK` is the gizmo, which
 * must never be selectable as an object.
 */
export const PROXY_LAYER_MASK = 0b01000000; // 64

/**
 * A baked contact shadow under a model.
 *
 * Its own bit for the same reason the floor has one: the shadow has to be drawn
 * in both views, but it is not geometry. `PRODUCT_LAYER_MASK` would put it into
 * bounding boxes, scene exports and picking, and it is the one thing the bake
 * must never capture -- the bake camera renders `PRODUCT_LAYER_MASK`, so this
 * bit is what keeps the plane out of its own shadow. `FLOOR_LAYER_MASK` would
 * tie it to the ground plane, and hiding the floor would take the shadow with
 * it.
 */
export const SHADOW_LAYER_MASK = 0b10000000; // 128

/**
 * An environment image drawn as scenery, such as a ground-projected dome.
 *
 * Its own bit, because it is the backdrop and nothing else: drawn in both views,
 * but never content -- not in bounds, exports or picking, and not on the product
 * layer a shadow bake renders, which would otherwise capture the whole dome.
 */
export const BACKGROUND_LAYER_MASK = 0b100000000; // 256
