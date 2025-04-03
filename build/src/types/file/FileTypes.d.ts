declare const FILE_TYPES: {
    readonly glb: {
        readonly key: "glb";
        readonly extension: "glb";
    };
    readonly gltf: {
        readonly key: "gltf";
        readonly extension: "gltf";
    };
    readonly usdz: {
        readonly key: "usdz";
        readonly extension: "usdz";
    };
};
export type FileType = keyof typeof FILE_TYPES;
export declare const SUPPORTED_FILE_TYPES: readonly string[];
export {};
