import { type Vector3Like } from 'three';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isLightSchema(entity: EntitySchema): entity is LightSchema {
    return entity.entityType === 'light';
}

export type BaseLightSchema = BaseEntitySchema & {
    type: LightTypeSchema;
    intensity: number;
    color: string | number;
    enabled: boolean;
    position?: Vector3Like;
    rotation?: Vector3Like;
};

export type AmbientLightSchema = BaseLightSchema & {
    entityType: 'light';
    type: 'ambient';
};

export type PointLightSchema = BaseLightSchema & {
    entityType: 'light';
    type: 'point';
    position: Vector3Like;
};

export type SceneLightSchema = BaseLightSchema & {
    entityType: 'light';
    type: 'scene';
};

type LightTypeSchema = 'ambient' | 'point' | 'scene';

export type LightSchema =
    | AmbientLightSchema
    | PointLightSchema
    | SceneLightSchema;
