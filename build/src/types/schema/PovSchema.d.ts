import { Vector3Like } from 'three';
import { BaseEntitySchema } from './BaseEntitySchema.ts';
import { EntitySchema } from './EntitySchema.ts';
export declare function isPovSchema(entity: EntitySchema): entity is PovSchema;
export type PovSchema = BaseEntitySchema & {
    entityType: 'pov';
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};
