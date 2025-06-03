import { AssetLoader } from '../assetloader/AssetLoader.ts';
import { AssetExporter, FileTypeToExporterOptions } from '../assetexporter/AssetExporter.ts';
import { FileType } from '../../types/file/index.ts';
declare global {
    interface ModuleClasses {
        AssetConverter: typeof AssetConverter;
    }
}
/**
 * @module AssetConverter
 *
 * Converts between different 3D file formats:
 *
 * ```ts
 * import { AssetConverter } from '@shopware-ag/dive/modules/AssetConverter';
 *
 * const assetConverter = new AssetConverter();
 * const usdzBuffer = await assetConverter.convert('input.glb').to('usdz');
 * ```
 */
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
