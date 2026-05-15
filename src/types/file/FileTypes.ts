export const FILE_TYPES = {
    glb: {
        key: 'glb' as const,
        mimeTypes: ['model/gltf-binary'],
        extension: 'glb',
    },
    gltf: {
        key: 'gltf' as const,
        mimeTypes: ['model/gltf+json'],
        extension: 'gltf',
    },
    usdz: {
        key: 'usdz' as const,
        mimeTypes: ['model/vnd.usdz+zip'],
        extension: 'usdz',
    },
    step: {
        key: 'step' as const,
        mimeTypes: [
            'application/step',
            'model/step',
            'model/step+zip',
            'model/step+xml',
        ],
        extension: 'step',
    },
    stp: {
        key: 'stp' as const,
        mimeTypes: [
            'application/step',
            'model/step',
            'model/step+zip',
            'model/step+xml',
        ],
        extension: 'stp',
    },
    iges: {
        key: 'iges' as const,
        mimeTypes: [
            'application/iges',
            'model/iges',
            'model/iges+zip',
            'model/iges+xml',
        ],
        extension: 'iges',
    },
    igs: {
        key: 'igs' as const,
        mimeTypes: [
            'application/iges',
            'model/iges',
            'model/iges+zip',
            'model/iges+xml',
        ],
        extension: 'igs',
    },
} as const;

export type FileType = keyof typeof FILE_TYPES;

export type MimeType = (typeof FILE_TYPES)[FileType]['mimeTypes'][number];

export const SUPPORTED_FILE_TYPES = Object.values(FILE_TYPES).map(
    (type) => type.extension,
) as readonly string[];

export const SUPPORTED_MIME_TYPES = Object.values(FILE_TYPES).flatMap(
    (type) => type.mimeTypes,
);
