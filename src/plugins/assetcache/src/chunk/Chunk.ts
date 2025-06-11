import { FileContentError, NetworkError, ParseError } from '@shopware-ag/dive';

export class Chunk<T extends object> {
    private _promise: Promise<T>;
    private _resolve!: (value: T) => void;

    private _arrayBuffer: ArrayBuffer | null = null;
    private _result: T | null = null;

    // metadata
    private _size: number = -1;
    private _createdAt: Date;
    private _updatedAt: Date;

    public get promise(): Promise<T> {
        return this._promise;
    }

    public get result(): T | null {
        return this._result;
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

    constructor(
        private _uri: string,
        private _parse: (arrayBuffer: ArrayBuffer) => Promise<T>,
    ) {
        this._promise = new Promise((resolve) => {
            this._resolve = resolve;
        });

        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    public async fetch(): Promise<T> {
        const response = await fetch(this._uri);
        if (!response.ok) {
            throw new NetworkError(this._uri);
        }

        try {
            const arrayBuffer = await response.arrayBuffer();
            this._arrayBuffer = arrayBuffer;
            this._size = arrayBuffer.byteLength;
        } catch (error) {
            throw new FileContentError(this._uri);
        }

        try {
            const resultPromise = this._parse(this._arrayBuffer);
            this._result = await resultPromise;
        } catch (error) {
            throw new ParseError(this._uri);
        }

        this._updatedAt = new Date();
        this._resolve(this._result);
        return this._result;
    }
}
