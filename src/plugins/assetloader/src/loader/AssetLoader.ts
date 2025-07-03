import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader.js';
import { Object3D } from 'three';
import {
    type FileType,
    SUPPORTED_FILE_TYPES,
    FileTypeError,
    ParseError,
    getFileTypeFromUri,
    isFileTypeSupported,
} from '@shopware-ag/dive';
import { DracoLoader } from '../draco/DracoLoader.ts';
import { AssetCache } from '@shopware-ag/dive/assetcache';

export class AssetLoader {
    private _gltfLoader: GLTFLoader;
    private _usdzLoader: USDZLoader;

    constructor() {
        // create draco loader
        const dracoLoader = new DracoLoader();

        // use wasm decoder if supported
        dracoLoader.setDecoderConfig({ type: 'wasm' });

        // create gltf loader
        this._gltfLoader = new GLTFLoader();
        this._gltfLoader.setDRACOLoader(dracoLoader);

        // create usdz loader
        this._usdzLoader = new USDZLoader();
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

        // check if chunk is already registered in cache and if it is already fetched
        const exstingChunk = AssetCache.read(uri);
        if (exstingChunk) {
            if (exstingChunk.arrayBuffer) {
                return this._parse(exstingChunk.arrayBuffer, extension);
            }
            return exstingChunk.promise.then((arrayBuffer) => {
                return this._parse(arrayBuffer, extension);
            });
        }

        /**
         * manual chunk creation (handle with care)
         * const chunk = new Chunk<Object3D>(uri, parse);
         * AssetCache.write(uri, chunk);
         */

        // factory chunk creation (recommended)
        const chunk = AssetCache.create(uri);
        const arrayBuffer = await chunk.load();
        return this._parse(arrayBuffer, extension);
    }

    /**
     * parse function for the chunk
     * @param arrayBuffer - the array buffer to parse, will be provided within the chunk
     * @param type - the file type of the array buffer
     * @returns the parsed object, will be stored within the    chunk
     */
    private async _parse(
        arrayBuffer: ArrayBuffer,
        type: FileType,
    ): Promise<Object3D> {
        try {
            switch (type as FileType) {
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
                    `Failed to parse ${type} file: ${error.message}`,
                    error,
                );
            }
            throw new ParseError(`Failed to parse ${type} file`);
        }
    }
}
