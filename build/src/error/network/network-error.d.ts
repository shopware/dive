export declare class NetworkError extends Error {
    readonly url: string;
    readonly cause?: unknown | undefined;
    constructor(url: string, cause?: unknown | undefined);
}
