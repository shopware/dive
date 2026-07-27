import { PovSchema } from './PovSchema.ts';
import { LightSchema } from './LightSchema.ts';
import { ModelSchema } from './ModelSchema.ts';
import { PrimitiveSchema } from './PrimitiveSchema.ts';
import { GroupSchema } from './GroupSchema.ts';

export type MinimalSchema<T extends EntitySchema> = T extends EntitySchema
    ? { id: string; entityType: T['entityType'] }
    : never;

export type PartialSchema<T extends EntitySchema | void = void> =
    T extends EntitySchema
        ? MinimalSchema<T> & Partial<T>
        : MinimalSchema<EntitySchema> & Partial<EntitySchema>;

export type EntitySchema =
    PovSchema | LightSchema | ModelSchema | PrimitiveSchema | GroupSchema;
