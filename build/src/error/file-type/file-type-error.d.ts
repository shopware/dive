export declare class FileTypeError extends Error {
    readonly requestedFileType: string;
    constructor(message: string, requestedFileType: string);
}
