import { type Vector3Like } from 'three/webgpu';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isLightSchema(entity: EntitySchema): entity is LightSchema {
    return entity.entityType === 'light';
}

/** What all lights share, regardless of their {@link LightTypeSchema}. */
export type BaseLightSchema = BaseEntitySchema & {
    /** Discriminates the light union and picks the class to instantiate. */
    type: LightTypeSchema;
    intensity: number;
    color: string | number;
    /**
     * Turns the light itself off while the entity stays in the scene, which is
     * not the same as `visible` on the entity.
     */
    enabled: boolean;
    /** Optional here because only a point light is placed somewhere. */
    position?: Vector3Like;
    rotation?: Vector3Like;
};

/** Lights the whole scene evenly, so it has no position to speak of. */
export type AmbientLightSchema = BaseLightSchema & {
    entityType: 'light';
    type: 'ambient';
};

/** Radiates from one point, the only light type that needs a position. */
export type PointLightSchema = BaseLightSchema & {
    entityType: 'light';
    type: 'point';
    position: Vector3Like;
};

/** The preset three point setup that DIVE ships as a default lighting. */
export type SceneLightSchema = BaseLightSchema & {
    entityType: 'light';
    type: 'scene';
};

type LightTypeSchema = 'ambient' | 'point' | 'scene';

/**
 * A light in the scene.
 *
 * An unknown `type` is a hard error when the entity is added, because there is
 * no sensible light to fall back to.
 */
export type LightSchema =
    AmbientLightSchema | PointLightSchema | SceneLightSchema;
