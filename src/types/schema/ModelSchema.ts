import { type Vector3Like } from 'three/webgpu';
import { type MaterialSchema } from './MaterialSchema.ts';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isModelSchema(entity: EntitySchema): entity is ModelSchema {
    return entity.entityType === 'model';
}

export type ModelSchema = BaseEntitySchema & {
    entityType: 'model';
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
    material?: Partial<MaterialSchema>;
};
