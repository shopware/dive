export declare class ParseError extends Error {
    readonly uri: string;
    readonly cause?: unknown | undefined;
    constructor(uri: string, cause?: unknown | undefined);
}
