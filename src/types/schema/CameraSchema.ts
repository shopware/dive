import { type Vector3Like } from 'three/webgpu';
import { type BaseEntitySchema } from './BaseEntitySchema.ts';
import { type EntitySchema } from './EntitySchema.ts';

export function isCameraSchema(entity: EntitySchema): entity is CameraSchema {
    return entity.entityType === 'camera';
}

export type CameraSchema = BaseEntitySchema & {
    entityType: 'camera';
    position: Vector3Like;
    target: Vector3Like;
};
