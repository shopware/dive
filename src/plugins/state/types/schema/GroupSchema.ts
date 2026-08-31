import { type Vector3Like } from 'three/webgpu';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isGroupSchema(entity: EntitySchema): entity is GroupSchema {
    return entity.entityType === 'group';
}

/**
 * Holds other entities, which reference it through their `parentId`.
 *
 * Moving a group moves its members with it. Deleting one keeps the members
 * alive: they are re-attached to the root and keep their world position.
 */
export type GroupSchema = BaseEntitySchema & {
    entityType: 'group';
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    /** Shows the helper lines that run from the group to each of its members. */
    linksVisible?: boolean;
};
