import { Loader } from '../loader/Loader';
import { Exporter } from '../exporter/Exporter';
import { type FileType, SUPPORTED_FILE_TYPES } from '../types';

export class ConversionError extends Error {
    constructor(
        message: string,
        public readonly cause?: unknown,
    ) {
        super(message);
        this.name = 'ConversionError';
    }
}

export class FileTypeError extends ConversionError {
    constructor(extension: string) {
        super(
            `Unsupported file type: ${extension}. Supported types are: ${SUPPORTED_FILE_TYPES.join(', ')}`,
        );
        this.name = 'FileTypeError';
    }
}

export class NetworkError extends ConversionError {
    constructor(uri: string, cause?: unknown) {
        super(`Failed to fetch file from ${uri}`, cause);
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

    public async to<T extends FileType>(type: T): Promise<ArrayBuffer> {
        try {
            const sourceType = this._getFileTypeFromUri();

            // If source and target types match, just return the file content
            if (sourceType === type) {
                return await this._loadFile();
            }

            // Otherwise, convert through Object3D
            const object3D = await this._loader.load(this._uri);
            return await this._exporter.export(object3D, type);
        } catch (error) {
            if (error instanceof ConversionError) {
                throw error;
            }
            throw new ConversionError('Failed to convert file', error);
        }
    }

    private _getFileTypeFromUri(): FileType {
        const extension = this._uri.split('.').pop()?.toLowerCase();
        if (!extension) {
            throw new FileTypeError('no extension');
        }
        if (!SUPPORTED_FILE_TYPES.includes(extension as FileType)) {
            throw new FileTypeError(extension);
        }
        return extension as FileType;
    }

    private async _loadFile(): Promise<ArrayBuffer> {
        try {
            const response = await fetch(this._uri);
            if (!response.ok) {
                throw new NetworkError(
                    this._uri,
                    `HTTP error! status: ${response.status}`,
                );
            }
            return response.arrayBuffer();
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError(this._uri, error);
        }
    }
}

// Example usage:
// Converter.convert('https://example.com/model.glb').to('gltf');
