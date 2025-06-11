export class NetworkError extends Error {
    constructor(
        public readonly url: string,
        public readonly cause?: unknown,
    ) {
        super(`Failed to fetch file from ${url}`);
        this.name = 'NetworkError';
    }
}
