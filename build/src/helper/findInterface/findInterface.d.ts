import { Object3D } from 'three';
export declare function findInterface<T>(object: Object3D | null | undefined, discriminator: string): (Object3D & T) | undefined;
