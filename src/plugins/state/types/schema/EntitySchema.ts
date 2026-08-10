import { CameraSchema } from './CameraSchema.ts';
import { LightSchema } from './LightSchema.ts';
import { ModelSchema } from './ModelSchema.ts';
import { PrimitiveSchema } from './PrimitiveSchema.ts';
import { GroupSchema } from './GroupSchema.ts';

export type MinimalSchema<T extends EntitySchema | void = void> =
    T extends EntitySchema
        ? { id: string; entityType: T['entityType'] }
        : never;

/**
 * A patch of an entity: the id and entity type identify what to change, every
 * other field is optional.
 *
 * A missing field means "leave this as it is". There is no way to unset a field
 * through a patch, and `null` is not a delete marker: it is only valid where a
 * schema declares it and carries its own meaning there, as `parentId: null`
 * does for "sits at the root". Consumers apply exactly the fields that are not
 * `undefined` and pass everything else through untouched.
 */
export type PartialSchema<T extends EntitySchema | void = void> =
    T extends EntitySchema
        ? MinimalSchema<T> & Partial<T>
        : MinimalSchema<EntitySchema> & Partial<EntitySchema>;

export type EntitySchema =
    CameraSchema | LightSchema | ModelSchema | PrimitiveSchema | GroupSchema;
