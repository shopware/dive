import { type Vector3Like } from 'three/webgpu';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isCameraSchema(entity: EntitySchema): entity is CameraSchema {
    return entity.entityType === 'camera';
}

/**
 * A stored point of view that a user can jump to.
 *
 * In the scene it is a node with a line icon (a `MultiLineComponent`), so it can hang in a group and move
 * with it; the target moves along. It renders nothing: moving the view there is
 * the job of the camera actions.
 */
export type CameraSchema = BaseEntitySchema & {
    entityType: 'camera';
    /** Where the camera sits. */
    position: Vector3Like;
    /** What it looks at, which is also the point it orbits around. World space. */
    target: Vector3Like;
};
