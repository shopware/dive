import { AssetLoader } from '../loader/AssetLoader';
import { AssetExporter, FileTypeToExporterOptions } from '../exporter/AssetExporter';
import { FileType } from '../../../types/file';
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
 * import { ModuleRegistry } from '@shopware-ag/dive/modules';
 *
 * const AssetConverter = await ModuleRegistry.get('AssetConverter');
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
