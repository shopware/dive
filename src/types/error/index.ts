export class ParseError extends Error {
    constructor(
        message: string,
        public readonly cause?: unknown,
    ) {
        super(message);
        this.name = 'ParseError';
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

export class ARCompatibilityError extends Error {
    constructor(
        message: string,
        public readonly browserInfo?: {
            userAgent: string;
            platform: string;
            vendor: string;
            browser: string;
            version: string;
            os: string;
            osVersion: string;
        },
    ) {
        super(message);
        this.name = 'ARCompatibilityError';
    }
}
