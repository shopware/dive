import { Vector3Like } from 'three';
import { BaseEntitySchema } from './BaseEntitySchema.ts';
import { EntitySchema } from './EntitySchema.ts';
export declare function isGroupSchema(entity: EntitySchema): entity is GroupSchema;
export type GroupSchema = BaseEntitySchema & {
    entityType: 'group';
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    bbVisible?: boolean;
};
