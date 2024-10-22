import { type Object3D } from "three";

export function implementsInterface<T>(object: Object3D | null | undefined, discriminator: string): object is (Object3D & T) {
    if (!object) return false;
    return discriminator in object;
}