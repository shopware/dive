import { type FileType } from '@shopware-ag/dive';
import { getFileTypeFromUri } from '../getFileTypeFromUri/getFileTypeFromUri.ts';
import { isFileExtensionSupported } from '../isFileExtensionSupported/isFileExtensionSupported.ts';

/**
 * Checks if a URI contains a supported file extension
 * @param uri The URI to check
 * @returns True if the URI contains a supported file extension, false otherwise
 */
export function isURIFileExtensionSupported(uri: string): uri is FileType {
    return isFileExtensionSupported(getFileTypeFromUri(uri));
}
