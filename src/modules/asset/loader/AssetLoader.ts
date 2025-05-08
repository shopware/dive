import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { Object3D } from 'three';
import {
    type FileType,
    SUPPORTED_FILE_TYPES,
} from '../../../types/file/index.ts';
import { FileTypeError } from '../../../error/file-type/file-type-error.ts';
import { NetworkError } from '../../../error/network/network-error.ts';
import { ParseError } from '../../../error/parse/parse-error.ts';
import {
    getFileTypeFromUri,
    isFileTypeSupported,
} from '../../../helpers/index.ts';

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

export class AssetLoader {
    private _gltfLoader: GLTFLoader;
    private _usdzLoader: USDZLoader;

    constructor() {
        // create decompression loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('../draco/');

        // create gltf loader
        this._gltfLoader = new GLTFLoader();
        this._gltfLoader.setDRACOLoader(dracoLoader);

        // create usdz loader
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
