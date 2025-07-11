import { Object3D } from 'three';
export declare class AssetLoader {
    private _gltfLoader;
    private _usdzLoader;
    constructor();
    load(uri: string): Promise<Object3D>;
    /**
     * parse function for the chunk
     * @param arrayBuffer - the array buffer to parse, will be provided within the chunk
     * @param type - the file type of the array buffer
     * @returns the parsed object, will be stored within the    chunk
     */
    private _parse;
}
