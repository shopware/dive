import { implementsInterface } from '../implementsInterface/implementsInterface.ts';
import { type Object3D } from 'three/webgpu';

export function findInterface<T>(
    object: Object3D | null | undefined,
    discriminator: string,
): (Object3D & T) | undefined {
    if (!object) return undefined;

    if (implementsInterface<T>(object, discriminator)) return object;

    return findInterface<T>(object.parent, discriminator);
}
