export declare class ConversionError extends Error {
    readonly cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
export declare class FileTypeError extends Error {
    constructor(message: string);
}
export declare class NetworkError extends Error {
    readonly url: string;
    readonly cause?: unknown | undefined;
    constructor(url: string, message: string, cause?: unknown | undefined);
}
