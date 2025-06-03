import { Object3D } from 'three';
import { GLTFExporterOptions as THREEGLTFExporterOptions } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { USDZExporterOptions as THREEUSDZExporterOptions } from 'three/examples/jsm/exporters/USDZExporter.js';
import { FileType } from '../../types/file/FileTypes.ts';
declare global {
    interface ModuleClasses {
        AssetExporter: typeof AssetExporter;
    }
}
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
/**
 * @module AssetExporter
 *
 * Exports 3D assets to various formats:
 *
 * ```ts
 * import { AssetExporter } from '@shopware-ag/dive/modules/AssetExporter';
 *
 * const assetExporter = new AssetExporter();
 * const buffer = await assetExporter.export(model, 'glb');
 * ```
 */
export declare class AssetExporter {
    private _gltfExporter;
    private _usdzExporter;
    constructor();
    export<T extends FileType>(object: Object3D, type: T, options?: FileTypeToExporterOptions[T]): Promise<ArrayBuffer>;
    private _exportGlb;
    private _exportGltf;
    private _exportUsdz;
}
