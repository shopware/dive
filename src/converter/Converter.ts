import { Loader } from '../loader/Loader';
import { Exporter, type FileTypeToExporterOptions } from '../exporter/Exporter';
import { type FileType } from '../types/file';

export class Converter {
    private _loader: Loader;
    private _exporter: Exporter;

    constructor(private readonly _uri: string) {
        this._loader = new Loader();
        this._exporter = new Exporter();
    }

    public static convert(uri: string): Converter {
        return new Converter(uri);
    }

    public async to<T extends FileType>(
        type: T,
        options?: FileTypeToExporterOptions[T],
    ): Promise<ArrayBuffer> {
        const object3D = await this._loader.load(this._uri);
        return this._exporter.export(object3D, type, options);
    }
}
