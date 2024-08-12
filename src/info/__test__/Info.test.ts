import { DIVEInfo } from '../Info';

const mockNavigator = (navigator: any) => {
    Object.defineProperty(global, 'navigator', {
        value: navigator,
        writable: true
    });
};

describe('dive/info/DIVEInfo', () => {
    beforeEach(() => {
        DIVEInfo['_supportsWebXR'] = null;
        jest.clearAllMocks();
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

    it('should support webXR', async () => {
        DIVEInfo['_supportsWebXR'] = null;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockResolvedValue(true),
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
                isSessionSupported: jest.fn().mockResolvedValue(false),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should not support webXR on error', async () => {
        DIVEInfo['_supportsWebXR'] = null;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockRejectedValue('error'),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should return cached value', async () => {
        DIVEInfo['_supportsWebXR'] = true;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockRejectedValue('error'),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(true);
    });

    it('should return cached value (false)', async () => {
        DIVEInfo['_supportsWebXR'] = false;
        mockNavigator({
            xr: {
                isSessionSupported: jest.fn().mockRejectedValue('error'),
            }
        });
        const supports = await DIVEInfo.GetSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should support ARQuickLook with feature detection', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => true } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 15, Safari)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Google)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/277.0.555192628 Mobile/15E148 Safari/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Chrome)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.153 Mobile/15E148 Safari/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Chrome)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 CriOS/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should support ARQuickLook (iPhone, iOS 17, Firefox)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 FxiOS/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should not support ARQuickLook (Android)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.3'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });

    it('should not support ARQuickLook (iPhone, no iOS version)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 Safari/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });

    it('should not support ARQuickLook (iPhone, iOS 17, no browser)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X)'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });

    it('should not support ARQuickLook (iPhone, iOS <12, Safari)', () => {
        mockNavigator({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1 like Mac OS X) AppleWebKit/605.1.11 (KHTML, like Gecko) Version/11.1 Mobile/11E148 Safari/604.'
        });
        jest.spyOn(document, 'createElement').mockReturnValue({ relList: { supports: () => false } } as unknown as HTMLAnchorElement);
        const supports = DIVEInfo.GetSupportsARQuickLook();
        expect(supports).toBe(false);
    });

    it('should be mobile (iOS)', () => {
        jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('iOS');
        expect(DIVEInfo.isMobile).toBe(true);
        expect(DIVEInfo.isDesktop).toBe(false);
    });

    it('should be mobile (Android)', () => {
        jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Android');
        expect(DIVEInfo.isMobile).toBe(true);
        expect(DIVEInfo.isDesktop).toBe(false);
    });

    it('should be desktop (Windows)', () => {
        jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Windows');
        expect(DIVEInfo.isMobile).toBe(false);
        expect(DIVEInfo.isDesktop).toBe(true);
    });

    it('should be desktop (MacOS)', () => {
        jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('MacOS');
        expect(DIVEInfo.isMobile).toBe(false);
        expect(DIVEInfo.isDesktop).toBe(true);
    });

    it('should be desktop (Linux)', () => {
        jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Linux');
        expect(DIVEInfo.isMobile).toBe(false);
        expect(DIVEInfo.isDesktop).toBe(true);
    });

    it('should be desktop (Unknown)', () => {
        jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Unknown');
        expect(DIVEInfo.isMobile).toBe(false);
        expect(DIVEInfo.isDesktop).toBe(true);
    });

    it('should be capable of AR (ARQuickLook)', async () => {
        jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(true);
        jest.spyOn(DIVEInfo, 'GetSupportsWebXR').mockResolvedValue(false);
        expect(await DIVEInfo.isARCapable).toBe(true);
    });

    it('should be capable of AR (WebXR)', async () => {
        jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(false);
        jest.spyOn(DIVEInfo, 'GetSupportsWebXR').mockResolvedValue(true);
        expect(await DIVEInfo.isARCapable).toBe(true);
    });

    it('should not be capable of AR', async () => {
        jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(false);
        jest.spyOn(DIVEInfo, 'GetSupportsWebXR').mockResolvedValue(false);
        expect(await DIVEInfo.isARCapable).toBe(false);
    });
});