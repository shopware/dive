import { type Vector3Like } from 'three';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isPovSchema(entity: EntitySchema): entity is PovSchema {
    return entity.entityType === 'pov';
}

export type PovSchema = BaseEntitySchema & {
    entityType: 'pov';
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};
