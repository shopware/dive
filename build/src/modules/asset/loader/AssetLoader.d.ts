import { Object3D } from 'three';
declare global {
    interface ModuleClasses {
        AssetLoader: typeof AssetLoader;
    }
}
/**
 * @module AssetLoader
 *
 * Handles loading of 3D assets in various formats:
 *
 * ```ts
 * import { AssetLoader } from '@shopware-ag/dive/modules/AssetLoader';
 *
 * const assetLoader = new AssetLoader();
 * const model = await assetLoader.load('path/to/model.glb');
 * ```
 *
 * Supported formats:
 * - GLB/GLTF
 * - USDZ
 */
export declare class AssetLoader {
    private _gltfLoader;
    private _usdzLoader;
    constructor();
    private _loadFile;
    load(uri: string): Promise<Object3D>;
}
