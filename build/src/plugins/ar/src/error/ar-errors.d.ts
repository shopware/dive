export declare enum EARErrorType {
    AR_DESKTOP_PLATFORM_ERROR = "ar-desktop-platform-error",
    AR_QUICK_LOOK_NOT_SAFARI_ERROR = "ar-quicklook-not-safari-error",
    AR_QUICK_LOOK_VERSION_MISMATCH_ERROR = "ar-quicklook-version-mismatch-error",
    AR_QUICK_LOOK_UNKNOWN_ERROR = "ar-quicklook-unknown-error"
}
export declare abstract class ARError extends Error {
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
