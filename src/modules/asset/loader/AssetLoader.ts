import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import { Object3D } from 'three';
import { type FileType, SUPPORTED_FILE_TYPES } from '../../../types/file';
import { FileTypeError, NetworkError, ParseError } from '../../../error';
import { getFileTypeFromUri, isFileTypeSupported } from '../../../helper';

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
 * // Direct import
 * import { AssetLoader } from '@shopware-ag/dive/modules/asset/loader';
 * const assetLoader = new AssetLoader();
 * const model = await assetLoader.load('path/to/model.glb');
 *
 * // Or through DIVE instance
 * const assetLoader = await dive.modules.get('AssetLoader');
 * const model = await assetLoader.load('path/to/model.glb');
 * ```
 *
 * Supported formats:
 * - GLB/GLTF
 * - USDZ
 */

export class AssetLoader {
    private _gltfLoader: GLTFLoader;
    private _usdzLoader: USDZLoader;

    constructor() {
        this._gltfLoader = new GLTFLoader();
        this._usdzLoader = new USDZLoader();
    }

    private async _loadFile(uri: string): Promise<ArrayBuffer> {
        const response = await fetch(uri);
        if (!response.ok) {
            throw new NetworkError(uri, `Failed to fetch file from ${uri}`);
        }

        try {
            return await response.arrayBuffer();
        } catch (error) {
            throw new NetworkError(uri, `Failed to fetch file from ${uri}`);
        }
    }

    public async load(uri: string): Promise<Object3D> {
        const extension = getFileTypeFromUri(uri);
        if (extension.length === 0) {
            throw new FileTypeError('No file extension found in URI', '');
        }
        if (!isFileTypeSupported(extension)) {
            throw new FileTypeError(
                `Unsupported file type: ${extension}. Supported types: ${SUPPORTED_FILE_TYPES.join(', ')}`,
                extension,
            );
        }

        const arrayBuffer = await this._loadFile(uri);

        try {
            switch (extension as FileType) {
                case 'glb':
                case 'gltf': {
                    const gltf = await this._gltfLoader.parseAsync(
                        arrayBuffer,
                        '',
                    );
                    return gltf.scene;
                }
                case 'usdz': {
                    return await this._usdzLoader.parse(arrayBuffer);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseError(
                    `Failed to parse ${extension} file: ${error.message}`,
                    error,
                );
            }
            throw new ParseError(`Failed to parse ${extension} file`);
        }
    }
}
