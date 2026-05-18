/**
 * Extracts the file extension from a URI
 * @param uri The URI to extract the extension from
 * @returns The file extension in lowercase, or an empty string if no extension is found
 */
export function getFileTypeFromUri(uri: string): string {
    // Extract the filename from the URI by taking everything after the last slash
    const filename = (uri.split('/').pop() || '').split(/[?#]/)[0];

    // If the filename has no dots or ends with a dot, return empty string
    if (!filename.includes('.') || filename.endsWith('.')) {
        return '';
    }

    // Get the extension (everything after the last dot)
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension || '';
}
