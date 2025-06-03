import { Object3D } from 'three';
export declare function implementsInterface<T>(object: Object3D | null | undefined, discriminator: string): object is Object3D & T;
