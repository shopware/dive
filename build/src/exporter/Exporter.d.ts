import { Object3D } from 'three';
import { FileType, ExportOptions } from '../types';
export declare class Exporter {
    private _gltfExporter;
    private _usdzExporter;
    constructor();
    export<T extends FileType>(object: Object3D, type: T, options?: ExportOptions<T>): Promise<ArrayBuffer>;
    private _exportGlb;
    private _exportGltf;
    private _exportUsdz;
}
