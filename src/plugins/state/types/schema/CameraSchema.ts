import { type Vector3Like } from 'three/webgpu';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isCameraSchema(entity: EntitySchema): entity is CameraSchema {
    return entity.entityType === 'camera';
}

/**
 * A stored point of view that a user can jump to.
 *
 * Unlike the other entity types this creates nothing in the scene graph, it
 * only lives in the state. Moving the camera there is the job of the camera
 * actions, not of adding the entity.
 */
export type CameraSchema = BaseEntitySchema & {
    entityType: 'camera';
    /** Where the camera sits. */
    position: Vector3Like;
    /** What it looks at, which is also the point it orbits around. */
    target: Vector3Like;
};
