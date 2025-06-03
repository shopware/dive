import {
    ARError,
    ARDesktopPlatformError,
    ARQuickLookUnknownError,
} from '../ar-errors.ts';

describe('ARError System (Simplified)', () => {
    describe('ARError (Base)', () => {
        it('should create an ARError with a message and type', () => {
            const message = 'Base AR error';
            const type = 'base-ar-error';
            const error = new ARError(message, type);
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ARError);
            expect(error.name).toBe('ARError');
            expect(error.message).toBe(message);
            expect(error.type).toBe(type);
        });
    });

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
