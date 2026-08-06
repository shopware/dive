/**
 * The shapes a primitive can take.
 *
 * `cube` and `box` build the same geometry. An unknown value is not an error,
 * it only warns and leaves the primitive without a mesh.
 */
export type GeometryTypeSchema =
    | 'cylinder'
    | 'sphere'
    | 'pyramid'
    | 'cube'
    | 'box'
    | 'cone'
    | 'wall'
    | 'plane';
