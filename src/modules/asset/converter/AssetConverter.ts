import { AssetLoader } from '../loader/AssetLoader';
import {
    AssetExporter,
    type FileTypeToExporterOptions,
} from '../exporter/AssetExporter';
import { type FileType } from '../../../types/file';

declare global {
    interface ModuleClasses {
        AssetConverter: AssetConverter;
    }
}

/**
 * @module AssetConverter
 *
 * Converts between different 3D file formats:
 *
 * ```ts
 * import { AssetConverter } from '@shopware-ag/dive/modules/asset/converter';
 * const assetConverter = new AssetConverter();
 * const usdzBuffer = await assetConverter.convert('input.glb').to('usdz');
 * ```
 */

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
