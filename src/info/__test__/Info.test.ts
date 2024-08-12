import { DIVEInfo } from '../Info';

const mockNavigator = (navigator: any) => {
    Object.defineProperty(global, 'navigator', {
        value: navigator,
        writable: true
    });
};

describe('dive/info/DIVEInfo', () => {
    it('should get browser: Chrome (Version 42)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Chrome');
        expect(DIVEInfo.GetBrowserVersion()).toBe('42');
    });

    it('should get browser: Firefox', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/42.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Firefox');
        expect(DIVEInfo.GetBrowserVersion()).toBe('42');
    });

    it('should get browser: Safari (Version 42)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/42.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Safari');
        expect(DIVEInfo.GetBrowserVersion()).toBe('42');
    });

    it('should get browser: Opera (Version 42)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.3029.110 Safari/537.3 OPR/42.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Opera');
        expect(DIVEInfo.GetBrowserVersion()).toBe('42');
    });

    it('should get browser: Internet Explorer (Version 42)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Trident/666.0.3029.110 rv:42.0 Safari/537.3'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Internet Explorer');
        expect(DIVEInfo.GetBrowserVersion()).toBe('42');
    });

    it('should get browser: Internet Explorer (Version 42)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Trident/666.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Internet Explorer');
        expect(DIVEInfo.GetBrowserVersion()).toBe('Unknown');
    });

    it('should get browser: Edge (Version 42)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/42.0.3029.110'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Edge');
        expect(DIVEInfo.GetBrowserVersion()).toBe('42');
    });

    it('should get browser: Samsung Internet (Version 42)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/42.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Samsung Internet');
        expect(DIVEInfo.GetBrowserVersion()).toBe('42');
    });

    it('should get browser: Unknown (Version Unknown)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) not_a_real_browser/42.0.3029.110'
        });
        expect(DIVEInfo.GetBrowser()).toBe('Unknown');
        expect(DIVEInfo.GetBrowserVersion()).toBe('Unknown');
    });

    it('should get system: Windows', () => {
        mockNavigator({
            platform: 'Win64'
        });
        expect(DIVEInfo.GetSystem()).toBe('Windows');
    });

    it('should get system: MacOS', () => {
        mockNavigator({
            platform: 'MacIntel'
        });
        expect(DIVEInfo.GetSystem()).toBe('MacOS');
    });

    it('should get system: Linux', () => {
        mockNavigator({
            platform: 'Linux'
        });
        expect(DIVEInfo.GetSystem()).toBe('Linux');
    });

    it('should get system: Android', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            platform: 'Linux'
        });
        expect(DIVEInfo.GetSystem()).toBe('Android');
    });

    it('should get system: iOS', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            platform: 'iPhone'
        });
        expect(DIVEInfo.GetSystem()).toBe('iOS');
    });

    it('should get system: Unknown', () => {
        mockNavigator({
            platform: 'Unknown'
        });
        expect(DIVEInfo.GetSystem()).toBe('Unknown');
    });

    it('should get system version: Windows 10', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetSystemVersion()).toBe('10.0');
    });

    it('should get system version: MacOS 11.2.3', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetSystemVersion()).toBe('11.2.3');
    });

    it('should get system version: Android 10', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetSystemVersion()).toBe('10');
    });

    it('should get system version: iOS 17.0.1', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetSystemVersion()).toBe('17.0.1');
    });

    it('should get system version: Linux', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetSystemVersion()).toBe('Unknown');
    });

    it('should get system version: Unknown', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Unknown) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        });
        expect(DIVEInfo.GetSystemVersion()).toBe('Unknown');
    });

    it('should support webXR', async () => {
        DIVEInfo['_supportsWebXR'] = null;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockResolvedValueOnce(true),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(true);
    });

    it('should not support webXR (xr undefined)', async () => {
        DIVEInfo['_supportsWebXR'] = null;
        mockNavigator({
            xr: undefined
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should not support webXR', async () => {
        DIVEInfo['_supportsWebXR'] = null;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockResolvedValueOnce(false),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should not support webXR on error', async () => {
        DIVEInfo['_supportsWebXR'] = null;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockRejectedValueOnce('error'),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should return cached value', async () => {
        DIVEInfo['_supportsWebXR'] = true;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockRejectedValueOnce('error'),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(true);
    });

    it('should return cached value (false)', async () => {
        DIVEInfo['_supportsWebXR'] = false;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockRejectedValueOnce('error'),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should support ARQuickLook (iPhone, iOS 15, Safari)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/604.'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Google)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/277.0.555192628 Mobile/15E148 Safari/604.'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Chrome)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.153 Mobile/15E148 Safari/604.'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Chrome)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 CriOS/604.'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Firefox)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 FxiOS/604.'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should not support ARQuickLook (Android)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.3'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });

    it('should not support ARQuickLook (iPhone, no iOS version)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 Safari/604.'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });

    it('should not support ARQuickLook (iPhone, iOS 17, no browser)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X)'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });

    it('should not support ARQuickLook (iPhone, iOS <12, Safari)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1 like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 Safari/604.'
        });
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });
});