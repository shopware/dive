export declare class ARError extends Error {
    readonly type: string;
    constructor(message: string, type: string);
}
export declare class ARDesktopPlatformError extends ARError {
    constructor();
}
export declare class ARQuickLookNotSafariError extends ARError {
    constructor();
}
export declare class ARQuickLookVersionMismatchError extends ARError {
    readonly currentVersion: string | number;
    readonly requiredVersion: string | number;
    constructor(currentVersion: string | number, requiredVersion: string | number);
}
export declare class ARQuickLookUnknownError extends ARError {
    constructor();
}
