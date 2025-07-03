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
            this._arrayBuffer = await response.arrayBuffer();
            this._size += this._arrayBuffer.byteLength;

            this._updatedAt = new Date();
        } catch (error) {
            throw new FileContentError(this._uri);
        }

        this._resolve(this._arrayBuffer);
        return this._arrayBuffer;
    }
}
