import { Vector3Like } from 'three';
import { BaseEntitySchema } from './BaseEntitySchema.ts';
import { EntitySchema } from './EntitySchema.ts';
export declare function isLightSchema(entity: EntitySchema): entity is LightSchema;
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
export type LightSchema = AmbientLightSchema | PointLightSchema | SceneLightSchema;
export {};
