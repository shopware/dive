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
