import { FileTypeToExporterOptions } from '../exporter/Exporter';
import { FileType } from '../types/file';
export declare class Converter {
    private readonly _uri;
    private _loader;
    private _exporter;
    constructor(_uri: string);
    static convert(uri: string): Converter;
    private _getFileTypeFromUri;
    private _loadFile;
    to<T extends FileType>(type: T, options?: FileTypeToExporterOptions[T]): Promise<ArrayBuffer>;
}
