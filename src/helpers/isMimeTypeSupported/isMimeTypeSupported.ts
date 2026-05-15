import { SUPPORTED_MIME_TYPES, type MimeType } from '../../types/file/index.ts';

/**
 * Checks if a file MIME type is supported
 * @param mimeType The file MIME type to check
 * @returns True if the MIME type is supported, false otherwise
 */
export function isMimeTypeSupported(mimeType: string): mimeType is MimeType {
    return SUPPORTED_MIME_TYPES.includes(mimeType.toLowerCase() as MimeType);
}
