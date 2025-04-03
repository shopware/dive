import { Object3D } from 'three';
export declare class Loader {
    private _gltfLoader;
    private _usdzLoader;
    constructor();
    load(uri: string): Promise<Object3D>;
    private _getFileTypeFromUri;
    private _load;
    private _loadGltf;
    private _loadUsdz;
}
