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
