import { Loader } from '../loader/Loader';
import { Exporter, type FileTypeToExporterOptions } from '../exporter/Exporter';
import { type FileType, SUPPORTED_FILE_TYPES } from '../types/file/FileTypes';

export class ConversionError extends Error {
    constructor(
        message: string,
        public readonly cause?: unknown,
    ) {
        super(message);
        this.name = 'ConversionError';
    }
}

export class FileTypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FileTypeError';
    }
}

export class NetworkError extends Error {
    constructor(
        public readonly url: string,
        message: string,
        public readonly cause?: unknown,
    ) {
        super(message);
        this.name = 'NetworkError';
    }
}

export class Converter {
    private _loader: Loader;
    private _exporter: Exporter;

    constructor(private readonly _uri: string) {
        this._loader = new Loader();
        this._exporter = new Exporter();
    }

    public static convert(uri: string): Converter {
        return new Converter(uri);
    }

    private _getFileTypeFromUri(): FileType {
        const extension = this._uri.split('.').pop()?.toLowerCase();
        if (!extension) {
            throw new FileTypeError('No file extension found in URI');
        }

        if (!SUPPORTED_FILE_TYPES.includes(extension as FileType)) {
            throw new FileTypeError(
                `Unsupported file type: ${extension}. Supported types: ${SUPPORTED_FILE_TYPES.join(
                    ', ',
                )}`,
            );
        }

        return extension as FileType;
    }

    private async _loadFile(): Promise<ArrayBuffer> {
        const response = await fetch(this._uri);
        if (!response.ok) {
            throw new NetworkError(
                this._uri,
                `Failed to fetch file from ${this._uri}`,
            );
        }

        try {
            return await response.arrayBuffer();
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError(
                this._uri,
                `Failed to fetch file from ${this._uri}`,
                error,
            );
        }
    }

    public async to<T extends FileType>(
        type: T,
        options?: FileTypeToExporterOptions[T],
    ): Promise<ArrayBuffer> {
        const sourceType = this._getFileTypeFromUri();

        // If source and target types match, just return the file content
        if (sourceType === type) {
            return await this._loadFile();
        }

        // Otherwise, convert through Object3D
        try {
            const object3D = await this._loader.load(this._uri);
            return await this._exporter.export(object3D, type, options);
        } catch (error) {
            if (error instanceof ConversionError) {
                throw error;
            }
            throw new ConversionError('Failed to convert file', error);
        }
    }
}

// Example usage:
// Converter.convert('https://example.com/model.glb').to('usdz', {
//     usdz: {
//         ar: {
//             anchoring: { type: 'plane' },
//             planeAnchoring: { alignment: 'horizontal' }
//         }
//     }
// });
//
// Converter.convert('https://example.com/model.usdz').to('gltf', {
//     gltf: {
//         onlyVisible: true,
//         maxTextureSize: 2048,
//         includeCustomExtensions: true
//     }
// });
