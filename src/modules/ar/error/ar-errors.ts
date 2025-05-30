export class ARError extends Error {
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
            'ar-desktop-platform-error',
        );
    }
}

export class ARQuickLookNotSafariError extends ARError {
    constructor() {
        super(
            'ARQuickLook on iOS is only available in Safari.',
            'ar-not-safari-on-ios-error',
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
            'ar-ios-version-too-low-error',
        );
    }
}

export class ARQuickLookUnknownError extends ARError {
    constructor() {
        super(
            'An unknown ARQuickLook compatibility error occurred.',
            'ar-quicklook-unknown-error', // Updated type to be more specific
        );
    }
}
