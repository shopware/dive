import { FileType, ExportOptions } from '../types';
export declare class ConversionError extends Error {
    readonly cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
export declare class FileTypeError extends ConversionError {
    constructor(extension: string);
}
export declare class NetworkError extends ConversionError {
    constructor(uri: string, cause?: unknown);
}
export declare class Converter {
    private readonly _uri;
    private _loader;
    private _exporter;
    constructor(_uri: string);
    static convert(uri: string): Converter;
    to<T extends FileType>(type: T, options?: ExportOptions<T>): Promise<ArrayBuffer>;
    private _getFileTypeFromUri;
    private _loadFile;
}
