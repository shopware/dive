import { Vector3Like } from 'three';
import { BaseEntitySchema } from './BaseEntitySchema.ts';
import { GeometrySchema } from './GeometrySchema.ts';
import { MaterialSchema } from './MaterialSchema.ts';
import { EntitySchema } from './EntitySchema.ts';
export declare function isPrimitiveSchema(entity: EntitySchema): entity is PrimitiveSchema;
export type PrimitiveSchema = BaseEntitySchema & {
    entityType: 'primitive';
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: GeometrySchema;
    material?: Partial<MaterialSchema>;
};
