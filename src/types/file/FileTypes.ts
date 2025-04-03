const FILE_TYPES = {
    glb: {
        key: 'glb' as const,
        extension: 'glb',
    },
    gltf: {
        key: 'gltf' as const,
        extension: 'gltf',
    },
    usdz: {
        key: 'usdz' as const,
        extension: 'usdz',
    },
} as const;

export type FileType = keyof typeof FILE_TYPES;

export const SUPPORTED_FILE_TYPES = Object.values(FILE_TYPES).map(
    (type) => type.extension,
) as readonly string[];

export function isFileTypeSupported(extension: string): extension is FileType {
    return extension in FILE_TYPES;
}

export function getFileTypeFromUri(uri: string): string {
    const extension = uri.split('.').pop()?.toLowerCase();
    return extension || '';
}
