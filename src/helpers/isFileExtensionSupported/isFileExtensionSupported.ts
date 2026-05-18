import { FILE_TYPES, type FileType } from '../../types/file/index.ts';

/**
 * Checks if a file extension is supported
 * @param extension The file extension to check
 * @returns True if the extension is supported, false otherwise
 */
export function isFileExtensionSupported(
    extension: string,
): extension is FileType {
    return extension.toLowerCase() in FILE_TYPES;
}
