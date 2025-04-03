import { ARCompatibilityError } from '../ar-compatibility-error';

describe('ARCompatibilityError', () => {
    const baseMessage = 'AR is not supported';
    const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1';
    const platform = 'iPhone';
    const vendor = 'Apple Computer, Inc.';

    it('should create an ARCompatibilityError with basic information', () => {
        const error = new ARCompatibilityError(
            baseMessage,
            userAgent,
            platform,
            vendor,
        );
        expect(error.message).toContain(baseMessage);
        expect(error.name).toBe('ARCompatibilityError');
        expect(error.browserInfo).toEqual({
            userAgent,
            platform,
            vendor,
            browser: 'Safari',
            version: '604.1',
            os: 'iOS',
            osVersion: '12_0',
        });
    });

    it('should add browser compatibility message for non-Safari browsers', () => {
        const chromeUserAgent =
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/605.1.15';
        const error = new ARCompatibilityError(
            baseMessage,
            chromeUserAgent,
            platform,
            vendor,
        );
        expect(error.message).toContain(
            'ARQuickLook is only supported in Safari browser',
        );
        expect(error.browserInfo.browser).toBe('Chrome');
    });

    it('should add OS version compatibility message for older iOS versions', () => {
        const error = new ARCompatibilityError(
            baseMessage,
            userAgent,
            platform,
            vendor,
        );
        expect(error.message).toContain(
            'ARQuickLook requires iOS/iPadOS 13.0 or later',
        );
    });

    it('should handle unknown browser and OS information', () => {
        const unknownUserAgent = 'Unknown Browser';
        const error = new ARCompatibilityError(
            baseMessage,
            unknownUserAgent,
            platform,
            vendor,
        );
        expect(error.browserInfo.browser).toBe('Unknown');
        expect(error.browserInfo.version).toBe('Unknown');
        expect(error.browserInfo.os).toBe('Unknown');
        expect(error.browserInfo.osVersion).toBe('Unknown');
    });

    it('should correctly detect iPadOS', () => {
        const ipadUserAgent =
            'Mozilla/5.0 (iPad; CPU iPad OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
        const error = new ARCompatibilityError(
            baseMessage,
            ipadUserAgent,
            'iPad',
            vendor,
        );
        expect(error.browserInfo.os).toBe('iPadOS');
    });

    it('should correctly detect macOS', () => {
        const macUserAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15';
        const error = new ARCompatibilityError(
            baseMessage,
            macUserAgent,
            'MacIntel',
            vendor,
        );
        expect(error.browserInfo.os).toBe('macOS');
    });
});
