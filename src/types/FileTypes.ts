export const SUPPORTED_FILE_TYPES = [
    'glb',
    'gltf',
    'usdz',
] as const;
export type FileType = (typeof SUPPORTED_FILE_TYPES)[number];
