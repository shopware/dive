export declare class ParseError extends Error {
    readonly cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
