import { type Vector3Like } from 'three';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isGroupSchema(entity: EntitySchema): entity is GroupSchema {
    return entity.entityType === 'group';
}

export type GroupSchema = BaseEntitySchema & {
    entityType: 'group';
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    bbVisible?: boolean;
};
