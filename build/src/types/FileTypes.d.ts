import { GLTFExporterOptions, USDZExporterOptions } from './ExporterOptions';
export type FileTypeDefinition<T extends string, O> = {
    key: T;
    extension: string;
    options: O;
};
export declare const FILE_TYPES: {
    readonly glb: {
        readonly key: "glb";
        readonly extension: ".glb";
        readonly options: GLTFExporterOptions;
    };
    readonly gltf: {
        readonly key: "gltf";
        readonly extension: ".gltf";
        readonly options: GLTFExporterOptions;
    };
    readonly usdz: {
        readonly key: "usdz";
        readonly extension: ".usdz";
        readonly options: USDZExporterOptions;
    };
};
export type FileType = keyof typeof FILE_TYPES;
export type FileTypeKey = (typeof FILE_TYPES)[FileType]['key'];
export type FileTypeOptions<T extends FileType> = (typeof FILE_TYPES)[T]['options'];
export declare const SUPPORTED_FILE_TYPES: readonly string[];
