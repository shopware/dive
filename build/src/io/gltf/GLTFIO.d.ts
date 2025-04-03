import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';
export declare class DIVEGLTFIO {
    private _importer;
    private _exporter;
    constructor();
    Import(url: string, onProgress?: (progress: number) => void): Promise<GLTF>;
    Export(object: Object3D, binary: true, onlyVisible: boolean): Promise<ArrayBuffer>;
    Export(object: Object3D, binary: false, onlyVisible: boolean): Promise<{
        [key: string]: unknown;
    }>;
}
