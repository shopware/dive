import { AssetLoader } from '../loader/AssetLoader';
import {
    AssetExporter,
    type FileTypeToExporterOptions,
} from '../exporter/AssetExporter';
import { type FileType } from '../../../types/file';
import { ModuleRegistry } from '../../registry/ModuleRegistry';

declare global {
    interface ModuleClasses {
        AssetConverter: AssetConverter;
    }
}

ModuleRegistry.register(
    'AssetConverter',
    'src/modules/asset/converter/AssetConverter.ts',
);

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
