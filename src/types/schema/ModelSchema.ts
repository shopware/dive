import { type Vector3Like } from 'three/webgpu';
import { type DIVEMaterial } from '../material/DIVEMaterial.ts';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isModelSchema(entity: EntitySchema): entity is ModelSchema {
    return entity.entityType === 'model';
}

/**
 * A 3D asset that is fetched from a uri, the only entity type whose creation
 * involves a network round trip.
 */
export type ModelSchema = BaseEntitySchema & {
    entityType: 'model';
    /**
     * Where the asset is loaded from.
     *
     * The uri is what identifies the loaded asset, so a patch that repeats the
     * current one does not fetch anything again. Only a different uri triggers
     * a reload, and adding or updating a model settles once that finished.
     */
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    /**
     * @deprecated Never written or read. Whether an asset has arrived is
     * signalled by the `MODEL_LOADED` action instead.
     */
    loaded: boolean;
    /** Overrides on top of what the asset itself brings along. */
    material?: Partial<DIVEMaterial>;
};
