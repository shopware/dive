export const FILE_TYPES = {
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
    step: {
        key: 'step' as const,
        extension: 'step',
    },
    stp: {
        key: 'stp' as const,
        extension: 'stp',
    },
    iges: {
        key: 'iges' as const,
        extension: 'iges',
    },
    igs: {
        key: 'igs' as const,
        extension: 'igs',
    },
} as const;

export type FileType = keyof typeof FILE_TYPES;

export const SUPPORTED_FILE_TYPES = Object.values(FILE_TYPES).map(
    (type) => type.extension,
) as readonly string[];
