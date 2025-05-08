export declare class NetworkError extends Error {
    readonly url: string;
    readonly cause?: unknown | undefined;
    constructor(url: string, message: string, cause?: unknown | undefined);
}
