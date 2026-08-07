import { type Vector3Like } from 'three/webgpu';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type DIVEGeometry } from '../geometry/DIVEGeometry.ts';
import { type DIVEMaterial } from '../material/DIVEMaterial.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isPrimitiveSchema(
    entity: EntitySchema,
): entity is PrimitiveSchema {
    return entity.entityType === 'primitive';
}

/**
 * A shape that DIVE generates itself, so unlike a model it needs no asset and
 * is there the moment it is added.
 */
export type PrimitiveSchema = BaseEntitySchema & {
    entityType: 'primitive';
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    /** Rebuilding this replaces the mesh, see {@link DIVEGeometry}. */
    geometry: DIVEGeometry;
    material?: Partial<DIVEMaterial>;
};
