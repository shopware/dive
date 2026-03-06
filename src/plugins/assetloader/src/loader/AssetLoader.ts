import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader.js';
import {
    type FileType,
    SUPPORTED_FILE_TYPES,
    FileTypeError,
    ParseError,
    getFileTypeFromUri,
    isFileTypeSupported,
} from '@shopware-ag/dive';
import { DracoLoader } from '../draco/DracoLoader.ts';
import { STEPLoader } from '../step/STEPLoader.ts';
import { AssetCache } from '@shopware-ag/dive/assetcache';
import { Object3D } from 'three';

export class AssetLoader {
    private _gltfLoader: GLTFLoader;
    private _usdzLoader: USDZLoader;
    private _stepLoader: STEPLoader;

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

        // create step/iges loader (CAD formats)
        this._stepLoader = new STEPLoader();
    }

    public async load(uri: string, fileType?: FileType): Promise<Object3D> {
        let extension: string;

        // use provided file type
        if (fileType) {
            extension = fileType;
        } else {
            // extract from URI
            extension = getFileTypeFromUri(uri);

            // content-based detection
            if (extension.length === 0) {
                extension = await this._detectFileTypeFromContent(uri);
                if (extension.length === 0) {
                    throw new FileTypeError(
                        'No file extension found in URI',
                        '',
                    );
                }
            }
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
     * Detects file type from content (magic bytes)
     * @param uri - The URI to load and detect
     * @returns The detected file extension or empty string if detection fails
     */
    private async _detectFileTypeFromContent(uri: string): Promise<string> {
        try {
            // Check if chunk is already in cache
            const existingChunk = AssetCache.read(uri);
            let arrayBuffer: ArrayBuffer;

            if (existingChunk) {
                if (existingChunk.arrayBuffer) {
                    arrayBuffer = existingChunk.arrayBuffer;
                } else {
                    arrayBuffer = await existingChunk.promise;
                }
            } else {
                // Create a temporary chunk to load the file
                const chunk = AssetCache.create(uri);
                arrayBuffer = await chunk.load();
            }

            const view = new Uint8Array(arrayBuffer);

            // GLB files start with "glTF" (0x676C5446) at offset 0
            // GLB format indicator is at offset 12 (0 = binary GLB, 1 = JSON GLTF)
            if (view.length >= 12) {
                const magic = String.fromCharCode(
                    view[0],
                    view[1],
                    view[2],
                    view[3],
                );
                if (magic === 'glTF') {
                    const format = view[12];
                    // Format 0 = GLB (binary), Format 1 = GLTF (JSON)
                    return format === 0 ? 'glb' : 'gltf';
                }
            }

            // USDZ files are ZIP archives (start with PK\x03\x04 or PK\x05\x06)
            // USDZ is a ZIP file containing USD files
            if (view.length >= 4) {
                if (
                    view[0] === 0x50 && // 'P'
                    view[1] === 0x4b && // 'K'
                    (view[2] === 0x03 || view[2] === 0x05) &&
                    (view[3] === 0x04 || view[3] === 0x06)
                ) {
                    // Check if it's likely USDZ by looking for USD-related entries
                    // This is a simplified check - USDZ files are ZIP archives
                    // For a more robust check, we could parse the ZIP structure
                    // but for now, we'll assume ZIP files with these signatures are USDZ
                    return 'usdz';
                }
            }

            // STEP files (ISO 10303-21) are ASCII text starting with "ISO-10303-21;"
            if (view.length >= 20) {
                const stepHeader = new TextDecoder('ascii').decode(
                    view.subarray(0, 20),
                );
                if (stepHeader.startsWith('ISO-10303-21')) {
                    return 'step';
                }
            }

            // IGES files are 80-char lines with section marker at position 73
            if (view.length >= 80 && view[72] === 0x53) {
                // 'S' = Start section
                return 'iges';
            }

            return '';
        } catch (error) {
            // If detection fails, return empty string
            return '';
        }
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
                    gltf.scene.animations = gltf.animations;
                    return gltf.scene;
                }
                case 'usdz': {
                    const usdz = this._usdzLoader.parse(arrayBuffer);
                    usdz.animations = [];
                    return usdz;
                }
                case 'step':
                case 'stp': {
                    const stp = await this._stepLoader.parseAsync(
                        arrayBuffer,
                        type as 'step' | 'stp',
                    );
                    stp.animations = [];
                    return stp;
                }
                case 'iges':
                case 'igs': {
                    const iges = await this._stepLoader.parseAsync(
                        arrayBuffer,
                        type as 'iges' | 'igs',
                    );
                    iges.animations = [];
                    return iges;
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
