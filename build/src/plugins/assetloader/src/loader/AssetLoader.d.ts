import { Object3D } from 'three';
export declare class AssetLoader {
    private _gltfLoader;
    private _usdzLoader;
    constructor();
    load(uri: string): Promise<Object3D>;
}
