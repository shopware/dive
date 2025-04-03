import { Object3D } from 'three';
export declare class Loader {
    private _gltfLoader;
    private _usdzLoader;
    constructor();
    private _loadFile;
    load(uri: string): Promise<Object3D>;
}
