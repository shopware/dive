import { AssetLoader } from '@shopware-ag/dive/assetloader';
import {
    AssetExporter,
    type FileTypeToExporterOptions,
} from '@shopware-ag/dive/assetexporter';
import { type FileType } from '@shopware-ag/dive';

export class AssetConverter {
    private _uri: string = '';

    constructor(
        private _loader: AssetLoader,
        private _exporter: AssetExporter,
    ) {}

    public convert(uri: string): {
        to: <T extends FileType>(
            type: T,
            options?: FileTypeToExporterOptions[T],
        ) => Promise<ArrayBuffer>;
    } {
        this._uri = uri;
        return {
            to: this._to.bind(this),
        };
    }

    private async _to<T extends FileType>(
        type: T,
        options?: FileTypeToExporterOptions[T],
    ): Promise<ArrayBuffer> {
        const object3D = await this._loader.load(this._uri);
        return this._exporter.export(object3D, type, options);
    }
}
