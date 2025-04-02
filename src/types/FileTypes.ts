import {
    type GLTFExporterOptions,
    type USDZExporterOptions,
} from './ExporterOptions';

export type FileTypeDefinition<T extends string, O> = {
    key: T;
    extension: string;
    options: O;
};

export const FILE_TYPES = {
    glb: {
        key: 'glb' as const,
        extension: '.glb',
        options: {} as GLTFExporterOptions,
    },
    gltf: {
        key: 'gltf' as const,
        extension: '.gltf',
        options: {} as GLTFExporterOptions,
    },
    usdz: {
        key: 'usdz' as const,
        extension: '.usdz',
        options: {} as USDZExporterOptions,
    },
} as const;

export type FileType = keyof typeof FILE_TYPES;
export type FileTypeKey = (typeof FILE_TYPES)[FileType]['key'];
export type FileTypeOptions<T extends FileType> =
    (typeof FILE_TYPES)[T]['options'];

export const SUPPORTED_FILE_TYPES = Object.values(FILE_TYPES).map(
    (type) => type.extension,
) as readonly string[];
