import { GeometryTypeSchema } from './GeometryTypeSchema.ts';

/**
 * Describes the shape of a primitive.
 *
 * The three dimensions are a common denominator across all shapes rather than
 * a bounding box, so each type reads only what it needs: a sphere derives its
 * radius from `width` alone and ignores the other two, while a box uses all
 * three.
 */
export type GeometrySchema = {
    /** Picks the shape to build, see {@link GeometryTypeSchema}. */
    name: GeometryTypeSchema;
    width: number;
    height: number;
    depth: number;
};
