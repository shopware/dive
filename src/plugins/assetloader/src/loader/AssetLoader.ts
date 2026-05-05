import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { USDLoader } from 'three/examples/jsm/loaders/USDLoader.js';
import { type Object3D } from 'three/webgpu';
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

type AssetLoaderLogDetails = Record<string, unknown>;

const getChildCount = (object: { children?: unknown } | null | undefined): number =>
    Array.isArray(object?.children) ? object.children.length : 0;

export class AssetLoader {
    private _gltfLoader: GLTFLoader;
    private _usdLoader: USDLoader;
    private _stepLoader: STEPLoader;

    private _logLoad(stage: string, details: AssetLoaderLogDetails = {}): void {
        console.info('[AssetLoader.load]', stage, details);
    }

    private _logLoadError(
        stage: string,
        error: unknown,
        details: AssetLoaderLogDetails = {},
    ): void {
        console.error('[AssetLoader.load]', stage, {
            ...details,
            error: error instanceof Error ? error.message : String(error),
        });
    }

    constructor() {
        // create draco loader
        const dracoLoader = new DracoLoader();

        // use wasm decoder if supported
        dracoLoader.setDecoderConfig({ type: 'wasm' });

        // create gltf loader
        this._gltfLoader = new GLTFLoader();
        this._gltfLoader.setDRACOLoader(dracoLoader);

        // create usdz loader
        this._usdLoader = new USDLoader();

        // create step/iges loader (CAD formats)
        this._stepLoader = new STEPLoader();
    }

    public async load(uri: string, fileType?: FileType): Promise<Object3D> {
        const startedAt = performance.now();
        let extension: string;

        this._logLoad('start', {
            uri,
            fileType: fileType ?? null,
        });

        // use provided file type
        if (fileType) {
            extension = fileType;
            this._logLoad('using-explicit-file-type', {
                uri,
                extension,
                elapsedMs: Math.round(performance.now() - startedAt),
            });
        } else {
            // extract from URI
            extension = getFileTypeFromUri(uri);
            this._logLoad('derived-file-type-from-uri', {
                uri,
                extension,
                elapsedMs: Math.round(performance.now() - startedAt),
            });

            // content-based detection
            if (extension.length === 0) {
                this._logLoad('detect-file-type-from-content-start', {
                    uri,
                    elapsedMs: Math.round(performance.now() - startedAt),
                });
                extension = await this._detectFileTypeFromContent(uri);
                this._logLoad('detect-file-type-from-content-complete', {
                    uri,
                    extension,
                    elapsedMs: Math.round(performance.now() - startedAt),
                });
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
        this._logLoad(exstingChunk ? 'cache-hit' : 'cache-miss', {
            uri,
            extension,
            hasArrayBuffer: Boolean(exstingChunk?.arrayBuffer),
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        if (exstingChunk) {
            if (exstingChunk.arrayBuffer) {
                this._logLoad('parse-start', {
                    uri,
                    extension,
                    source: 'cache-array-buffer',
                    byteLength: exstingChunk.arrayBuffer.byteLength,
                    elapsedMs: Math.round(performance.now() - startedAt),
                });
                return this._parse(exstingChunk.arrayBuffer, extension, {
                    uri,
                    source: 'cache-array-buffer',
                    startedAt,
                });
            }

            this._logLoad('await-existing-cache-promise-start', {
                uri,
                extension,
                elapsedMs: Math.round(performance.now() - startedAt),
            });
            return exstingChunk.promise.then((arrayBuffer) => {
                this._logLoad('await-existing-cache-promise-resolved', {
                    uri,
                    extension,
                    byteLength: arrayBuffer.byteLength,
                    elapsedMs: Math.round(performance.now() - startedAt),
                });
                this._logLoad('parse-start', {
                    uri,
                    extension,
                    source: 'cache-promise',
                    byteLength: arrayBuffer.byteLength,
                    elapsedMs: Math.round(performance.now() - startedAt),
                });

                return this._parse(arrayBuffer, extension, {
                    uri,
                    source: 'cache-promise',
                    startedAt,
                });
            });
        }

        /**
         * manual chunk creation (handle with care)
         * const chunk = new Chunk<Object3D>(uri, parse);
         * AssetCache.write(uri, chunk);
         */

        // factory chunk creation (recommended)
        const chunk = AssetCache.create(uri);
        this._logLoad('chunk-created', {
            uri,
            extension,
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        this._logLoad('chunk-load-start', {
            uri,
            extension,
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        const arrayBuffer = await chunk.load();
        this._logLoad('chunk-load-resolved', {
            uri,
            extension,
            byteLength: arrayBuffer.byteLength,
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        this._logLoad('parse-start', {
            uri,
            extension,
            source: 'fresh-chunk',
            byteLength: arrayBuffer.byteLength,
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        return this._parse(arrayBuffer, extension, {
            uri,
            source: 'fresh-chunk',
            startedAt,
        });
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
        context: {
            uri: string;
            source: 'cache-array-buffer' | 'cache-promise' | 'fresh-chunk';
            startedAt: number;
        },
    ): Promise<Object3D> {
        try {
            this._logLoad('parse-dispatch', {
                uri: context.uri,
                type,
                source: context.source,
                byteLength: arrayBuffer.byteLength,
                elapsedMs: Math.round(performance.now() - context.startedAt),
            });

            switch (type as FileType) {
                case 'glb':
                case 'gltf': {
                    this._logLoad('gltf-parse-start', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    const gltf = await this._gltfLoader.parseAsync(
                        arrayBuffer,
                        '',
                    );
                    gltf.scene.animations = gltf.animations;
                    this._logLoad('gltf-parse-complete', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        childCount: getChildCount(gltf.scene),
                        animationCount: Array.isArray(gltf.animations)
                            ? gltf.animations.length
                            : 0,
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    return gltf.scene;
                }
                case 'usdz': {
                    this._logLoad('usdz-parse-start', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    const usdz = this._usdLoader.parse(arrayBuffer);
                    usdz.animations = [];
                    this._logLoad('usdz-parse-complete', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        childCount: getChildCount(usdz),
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    return usdz;
                }
                case 'step':
                case 'stp': {
                    this._logLoad('step-parse-start', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    const stp = await this._stepLoader.parseAsync(
                        arrayBuffer,
                        type as 'step' | 'stp',
                    );
                    stp.animations = [];
                    this._logLoad('step-parse-complete', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        childCount: getChildCount(stp),
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    return stp;
                }
                case 'iges':
                case 'igs': {
                    this._logLoad('iges-parse-start', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    const iges = await this._stepLoader.parseAsync(
                        arrayBuffer,
                        type as 'iges' | 'igs',
                    );
                    iges.animations = [];
                    this._logLoad('iges-parse-complete', {
                        uri: context.uri,
                        type,
                        source: context.source,
                        childCount: getChildCount(iges),
                        elapsedMs: Math.round(
                            performance.now() - context.startedAt,
                        ),
                    });
                    return iges;
                }
            }
        } catch (error) {
            this._logLoadError('parse-failed', error, {
                uri: context.uri,
                type,
                source: context.source,
                elapsedMs: Math.round(performance.now() - context.startedAt),
            });
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
