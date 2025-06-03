import { AssetLoader } from '../../assetloader/index.ts';
import { AssetExporter, FileTypeToExporterOptions } from '../../assetexporter/index.ts';
import { FileType } from '../../../index.ts';
export declare class AssetConverter {
    private _loader;
    private _exporter;
    private _uri;
    constructor(_loader: AssetLoader, _exporter: AssetExporter);
    convert(uri: string): {
        to: <T extends FileType>(type: T, options?: FileTypeToExporterOptions[T]) => Promise<ArrayBuffer>;
    };
    private _to;
}
