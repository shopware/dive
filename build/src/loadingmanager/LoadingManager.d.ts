import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
/**
 * A basic loading manager.
 *
 * @module
 */
export declare class DIVELoadingManager {
    private gltfloader;
    private dracoloader;
    constructor();
    private progress;
    LoadGLTF(uri: string): Promise<GLTF>;
    PollProgress(): number;
}
