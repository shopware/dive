import { FileContentError, NetworkError } from '@shopware-ag/dive';

type ChunkLoadLogDetails = Record<string, unknown>;

export class Chunk {
    private _promise: Promise<ArrayBuffer>;
    private _resolve!: (value: ArrayBuffer) => void;

    private _arrayBuffer: ArrayBuffer | null = null;

    // metadata
    private _size: number = 0;
    private _createdAt: Date;
    private _updatedAt: Date;

    public get promise(): Promise<ArrayBuffer> {
        return this._promise;
    }

    public get size(): number {
        return this._size;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public get arrayBuffer(): ArrayBuffer | null {
        return this._arrayBuffer;
    }

    private _getHeader(
        response: Pick<Response, 'headers'>,
        headerName: string,
    ): string | null {
        return response.headers?.get?.(headerName) ?? null;
    }

    private _logLoad(stage: string, details: ChunkLoadLogDetails = {}): void {
        console.info('[Chunk.load]', stage, details);
    }

    private _logLoadError(
        stage: string,
        error: unknown,
        details: ChunkLoadLogDetails = {},
    ): void {
        console.error('[Chunk.load]', stage, {
            ...details,
            error: error instanceof Error ? error.message : String(error),
        });
    }

    constructor(private _uri: string) {
        this._promise = new Promise((resolve) => {
            this._resolve = resolve;
        });

        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    public async load(): Promise<ArrayBuffer> {
        const startedAt = performance.now();
        let response: Response;

        this._logLoad('fetch-start', {
            uri: this._uri,
        });

        try {
            response = await fetch(this._uri);
        } catch (error) {
            this._logLoadError('fetch-failed', error, {
                uri: this._uri,
                elapsedMs: Math.round(performance.now() - startedAt),
            });
            throw error;
        }

        this._logLoad('fetch-resolved', {
            uri: this._uri,
            ok: response.ok,
            status: response.status,
            contentLength: this._getHeader(response, 'content-length'),
            contentType: this._getHeader(response, 'content-type'),
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        if (!response.ok) {
            this._logLoad('fetch-not-ok', {
                uri: this._uri,
                status: response.status,
                elapsedMs: Math.round(performance.now() - startedAt),
            });
            throw new NetworkError(this._uri);
        }

        try {
            this._logLoad('array-buffer-start', {
                uri: this._uri,
                elapsedMs: Math.round(performance.now() - startedAt),
            });
            this._arrayBuffer = await response.arrayBuffer();
            this._logLoad('array-buffer-resolved', {
                uri: this._uri,
                byteLength: this._arrayBuffer.byteLength,
                elapsedMs: Math.round(performance.now() - startedAt),
            });
            this._size += this._arrayBuffer.byteLength;
            this._updatedAt = new Date();
            this._logLoad('metadata-updated', {
                uri: this._uri,
                size: this._size,
                updatedAt: this._updatedAt.toISOString(),
                elapsedMs: Math.round(performance.now() - startedAt),
            });
        } catch (error) {
            this._logLoadError('array-buffer-failed', error, {
                uri: this._uri,
                elapsedMs: Math.round(performance.now() - startedAt),
            });
            throw new FileContentError(this._uri);
        }

        this._logLoad('resolve-start', {
            uri: this._uri,
            byteLength: this._arrayBuffer.byteLength,
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        this._resolve(this._arrayBuffer);
        this._logLoad('resolve-complete', {
            uri: this._uri,
            byteLength: this._arrayBuffer.byteLength,
            elapsedMs: Math.round(performance.now() - startedAt),
        });
        return this._arrayBuffer;
    }
}
