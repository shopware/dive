export class ParseError extends Error {
    constructor(
        public readonly uri: string,
        public readonly cause?: unknown,
    ) {
        super(`Failed to parse array buffer from ${uri}`);
        this.name = 'ParseError';
    }
}
