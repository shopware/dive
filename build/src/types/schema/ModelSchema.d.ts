import { Vector3Like } from 'three';
import { MaterialSchema } from './MaterialSchema.ts';
import { BaseEntitySchema } from './BaseEntitySchema.ts';
import { EntitySchema } from './EntitySchema.ts';
export declare function isModelSchema(entity: EntitySchema): entity is ModelSchema;
export type ModelSchema = BaseEntitySchema & {
    entityType: 'model';
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
    material?: Partial<MaterialSchema>;
};
