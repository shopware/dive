/**
 * Discriminant of {@link EntitySchema}, and what decides which scene object an
 * entity turns into.
 *
 * Everything but `camera` becomes an object in the scene graph. A camera is a
 * stored point of view, so adding one registers it without creating anything
 * to render, which is why an add can resolve without a scene object.
 */
export type EntityTypeSchema =
    'camera' | 'light' | 'model' | 'primitive' | 'group';
