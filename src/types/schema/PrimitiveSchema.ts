import { type Vector3Like } from 'three';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type GeometrySchema } from './GeometrySchema.ts';
import { type MaterialSchema } from './MaterialSchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isPrimitiveSchema(
    entity: EntitySchema,
): entity is PrimitiveSchema {
    return entity.entityType === 'primitive';
}

export type PrimitiveSchema = BaseEntitySchema & {
    entityType: 'primitive';
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: GeometrySchema;
    material?: Partial<MaterialSchema>;
};
