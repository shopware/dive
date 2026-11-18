import {
    ARError,
    ARDesktopPlatformError,
    ARQuickLookNotSafariError,
    ARQuickLookUnknownError,
    ARQuickLookUnsupportedBrowserError,
    ARQuickLookVersionMismatchError,
} from '../ar-errors.ts';

describe('ARError System', () => {
    describe('ARDesktopPlatformError', () => {
        it('should create an ARDesktopPlatformError with correct message and type', () => {
            const error = new ARDesktopPlatformError();
            expect(error).toBeInstanceOf(ARError);
            expect(error.name).toBe('ARDesktopPlatformError');
            expect(error.message).toBe(
                'AR features are not supported on desktop platforms.',
            );
            expect(error.type).toBe('ar-desktop-platform-error');
        });
    });

    describe('ARQuickLookNotSafariError', () => {
        it('should create an ARQuickLookNotSafariError with default message and type', () => {
            const error = new ARQuickLookNotSafariError();
            expect(error).toBeInstanceOf(ARError);
            expect(error.name).toBe('ARQuickLookNotSafariError');
            expect(error.message).toBe(
                'ARQuickLook on iOS is only available in Safari.',
            );
            expect(error.type).toBe('ar-quicklook-not-safari-error');
        });
    });

    describe('ARQuickLookUnsupportedBrowserError', () => {
        it('should create an ARQuickLookUnsupportedBrowserError with default message and type', () => {
            const error = new ARQuickLookUnsupportedBrowserError();
            expect(error).toBeInstanceOf(ARError);
            expect(error.name).toBe('ARQuickLookUnsupportedBrowserError');
            expect(error.message).toBe(
                'ARQuickLook is not supported in this browser.',
            );
            expect(error.type).toBe('ar-quicklook-unsupported-browser-error');
        });
    });

    describe('ARQuickLookVersionMismatchError', () => {
        it('should create an ARQuickLookVersionMismatchError with default message and type', () => {
            const error = new ARQuickLookVersionMismatchError('1.0.0', '1.0.1');
            expect(error).toBeInstanceOf(ARError);
            expect(error.name).toBe('ARQuickLookVersionMismatchError');
            expect(error.message).toBe(
                'ARQuickLook requires iOS version 1.0.1 or later. Current version: 1.0.0.',
            );
            expect(error.type).toBe('ar-quicklook-version-mismatch-error');
        });
    });

    describe('ARQuickLookUnknownError', () => {
        it('should create an ARQuickLookUnknownError with default message and type', () => {
            const error = new ARQuickLookUnknownError();
            expect(error).toBeInstanceOf(ARError);
            expect(error.name).toBe('ARQuickLookUnknownError');
            expect(error.message).toBe(
                'An unknown ARQuickLook compatibility error occurred.',
            );
            expect(error.type).toBe('ar-quicklook-unknown-error');
        });
    });
});
