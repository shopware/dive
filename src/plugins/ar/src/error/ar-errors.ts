export enum EARErrorType {
    AR_DESKTOP_PLATFORM_ERROR = 'ar-desktop-platform-error',
    /** @deprecated No longer thrown, see AR_QUICK_LOOK_UNSUPPORTED_BROWSER_ERROR. */
    AR_QUICK_LOOK_NOT_SAFARI_ERROR = 'ar-quicklook-not-safari-error',
    AR_QUICK_LOOK_UNSUPPORTED_BROWSER_ERROR = 'ar-quicklook-unsupported-browser-error',
    AR_QUICK_LOOK_VERSION_MISMATCH_ERROR = 'ar-quicklook-version-mismatch-error',
    AR_QUICK_LOOK_UNKNOWN_ERROR = 'ar-quicklook-unknown-error',
}

export abstract class ARError extends Error {
    public readonly type: string;

    constructor(message: string, type: string) {
        super(message);
        this.name = this.constructor.name;
        this.type = type;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ARDesktopPlatformError extends ARError {
    constructor() {
        super(
            'AR features are not supported on desktop platforms.',
            EARErrorType.AR_DESKTOP_PLATFORM_ERROR,
        );
    }
}

/**
 * @deprecated No longer thrown. AR Quick Look also works in some non-Safari iOS
 * browsers, so {@link ARQuickLookUnsupportedBrowserError} is thrown instead.
 */
export class ARQuickLookNotSafariError extends ARError {
    constructor() {
        super(
            'ARQuickLook on iOS is only available in Safari.',
            EARErrorType.AR_QUICK_LOOK_NOT_SAFARI_ERROR,
        );
    }
}

export class ARQuickLookUnsupportedBrowserError extends ARError {
    constructor() {
        super(
            'ARQuickLook is not supported in this browser.',
            EARErrorType.AR_QUICK_LOOK_UNSUPPORTED_BROWSER_ERROR,
        );
    }
}

export class ARQuickLookVersionMismatchError extends ARError {
    constructor(
        readonly currentVersion: string | number,
        readonly requiredVersion: string | number,
    ) {
        super(
            `ARQuickLook requires iOS version ${requiredVersion} or later. Current version: ${currentVersion}.`,
            EARErrorType.AR_QUICK_LOOK_VERSION_MISMATCH_ERROR,
        );
    }
}

export class ARQuickLookUnknownError extends ARError {
    constructor() {
        super(
            'An unknown ARQuickLook compatibility error occurred.',
            EARErrorType.AR_QUICK_LOOK_UNKNOWN_ERROR,
        );
    }
}
