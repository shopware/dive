import { isFileExtensionSupported } from '../isFileExtensionSupported/isFileExtensionSupported.ts';
import { isURIFileExtensionSupported } from '../isURIFileExtensionSupported/isURIFileExtensionSupported.ts';
import { isMimeTypeSupported } from '../isMimeTypeSupported/isMimeTypeSupported.ts';

/**
 * Checks if a file, file extension, MIME type, or DataTransferItem is supported
 * @param file The file-like input to check
 * @returns True if the file-like input is supported, false otherwise
 */
export function isFileSupported(
    file: File | DataTransferItem | string,
): boolean {
    if (typeof file === 'string') {
        return (
            isFileExtensionSupported(file) ||
            isMimeTypeSupported(file) ||
            isURIFileExtensionSupported(file)
        );
    }

    if (
        typeof DataTransferItem !== 'undefined' &&
        file instanceof DataTransferItem
    ) {
        return isMimeTypeSupported(file.type);
    }

    if (typeof File !== 'undefined' && file instanceof File) {
        return (
            isMimeTypeSupported(file.type) ||
            isURIFileExtensionSupported(file.name)
        );
    }

    return false;
}
