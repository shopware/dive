import { Object3D } from 'three';
import { GLTFExporterOptions as THREEGLTFExporterOptions } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporterOptions as THREEUSDZExporterOptions } from 'three/examples/jsm/exporters/USDZExporter';
import { FileType } from '../types/file/FileTypes';
export type USDZExporterOptions = THREEUSDZExporterOptions & {
    ar?: {
        anchoring: {
            type: 'plane' | 'image' | 'face' | 'none';
        };
        planeAnchoring: {
            alignment: 'horizontal' | 'vertical' | 'any';
        };
    };
};
export type GLTFExporterOptions = THREEGLTFExporterOptions;
export type FileTypeToExporterOptions = {
    glb: GLTFExporterOptions;
    gltf: GLTFExporterOptions;
    usdz: USDZExporterOptions;
};
export declare class Exporter {
    private _gltfExporter;
    private _usdzExporter;
    constructor();
    export<T extends FileType>(object: Object3D, type: T, options?: FileTypeToExporterOptions[T]): Promise<ArrayBuffer>;
    private _exportGlb;
    private _exportGltf;
    private _exportUsdz;
}
