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
import { AssetCache, Chunk } from '@shopware-ag/dive/assetcache';

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
        const exstingChunk = AssetCache.read(uri) as Chunk<Object3D>;
        if (exstingChunk) {
            if (exstingChunk.result) {
                return exstingChunk.result;
            }
            return exstingChunk.promise;
        }

        /**
         * parse function for the chunk
         * @param arrayBuffer - the array buffer to parse, will be provided within the chunk
         * @returns the parsed object, will be stored within the chunk
         */
        const parse = async (arrayBuffer: ArrayBuffer): Promise<Object3D> => {
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
        };

        /**
         * manual chunk creation (handle with care)
         * const chunk = new Chunk<Object3D>(uri, parse);
         * AssetCache.write(uri, chunk);
         */

        // factory chunk creation (recommended)
        const chunk = AssetCache.create<Object3D>(uri, parse);

        return chunk.fetch();
    }
}
