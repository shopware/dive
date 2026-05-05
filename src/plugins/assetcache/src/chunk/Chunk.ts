import { FileContentError, NetworkError } from '@shopware-ag/dive';

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

    private _concatChunks(
        chunks: Uint8Array[],
        totalByteLength: number,
    ): ArrayBuffer {
        const combined = new Uint8Array(totalByteLength);
        let offset = 0;

        for (const chunk of chunks) {
            combined.set(chunk, offset);
            offset += chunk.byteLength;
        }

        return combined.buffer;
    }

    private async _readBodyWithReader(
        response: Response,
    ): Promise<ArrayBuffer> {
        const reader = response.body!.getReader();
        const chunks: Uint8Array[] = [];
        let totalByteLength = 0;

        try {
            while (true) {
                const result = await reader.read();

                if (result.done) {
                    break;
                }

                const chunk = result.value ?? new Uint8Array(0);
                chunks.push(chunk);
                totalByteLength += chunk.byteLength;
            }
        } finally {
            reader.releaseLock();
        }

        const arrayBuffer = this._concatChunks(chunks, totalByteLength);
        return arrayBuffer;
    }

    constructor(private _uri: string) {
        this._promise = new Promise((resolve) => {
            this._resolve = resolve;
        });

        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    public async load(): Promise<ArrayBuffer> {
        const response = await fetch(this._uri);
        if (!response.ok) {
            throw new NetworkError(this._uri);
        }

        try {
            if (response.body?.getReader) {
                this._arrayBuffer = await this._readBodyWithReader(response);
            } else {
                this._arrayBuffer = await response.arrayBuffer();
            }

            this._size += this._arrayBuffer.byteLength;
            this._updatedAt = new Date();
        } catch (error) {
            throw new FileContentError(this._uri);
        }

        this._resolve(this._arrayBuffer);
        return this._arrayBuffer;
    }
}
