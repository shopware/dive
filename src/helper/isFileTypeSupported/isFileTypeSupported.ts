import { FileType } from '../../types/file/FileTypes';

/**
 * Checks if a file extension is supported
 * @param extension The file extension to check
 * @returns True if the extension is supported, false otherwise
 */
export function isFileTypeSupported(extension: string): extension is FileType {
    return extension.toLowerCase() in { glb: true, gltf: true, usdz: true };
}
