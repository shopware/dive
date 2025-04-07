import { AssetLoader } from '../loader/AssetLoader';
import {
    AssetExporter,
    type FileTypeToExporterOptions,
} from '../exporter/AssetExporter';
import { type FileType } from '../../types/file';

export class AssetConverter {
    private _loader: AssetLoader;
    private _exporter: AssetExporter;

    constructor(private readonly _uri: string) {
        this._loader = new AssetLoader();
        this._exporter = new AssetExporter();
    }

    public static convert(uri: string): AssetConverter {
        return new AssetConverter(uri);
    }

    public async to<T extends FileType>(
        type: T,
        options?: FileTypeToExporterOptions[T],
    ): Promise<ArrayBuffer> {
        const object3D = await this._loader.load(this._uri);
        return this._exporter.export(object3D, type, options);
    }
}
