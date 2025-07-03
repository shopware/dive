export enum EARErrorType {
    AR_DESKTOP_PLATFORM_ERROR = 'ar-desktop-platform-error',
    AR_QUICK_LOOK_NOT_SAFARI_ERROR = 'ar-quicklook-not-safari-error',
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

export class ARQuickLookNotSafariError extends ARError {
    constructor() {
        super(
            'ARQuickLook on iOS is only available in Safari.',
            EARErrorType.AR_QUICK_LOOK_NOT_SAFARI_ERROR,
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
