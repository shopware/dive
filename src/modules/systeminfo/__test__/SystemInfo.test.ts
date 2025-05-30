import { SystemInfo, EBrowser } from '../SystemInfo.ts';
import { ESystem, EWebXRUnsupportedReason } from '../../../types/info/index.ts';

// Helper for test failures
const fail = (message: string): never => {
    throw new Error(message);
};

const mockNavigator = (navigator: any) => {
    Object.defineProperty(global, 'navigator', {
        value: navigator,
        writable: true,
    });
};

describe('dive/info/DIVEInfo', () => {
    beforeEach(() => {
        SystemInfo['_supportsWebXR'] = false;
        vi.clearAllMocks();
    });

    it('should get system: Windows', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.153 Safari/537.36',
        });
        expect(SystemInfo.getSystem()).toBe(ESystem.WINDOWS);
    });

    it('should get system: MacOS', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.153 Safari/537.36',
        });
        expect(SystemInfo.getSystem()).toBe(ESystem.MACOS);
    });

    it('should get system: Linux', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.153 Safari/537.36',
        });
        expect(SystemInfo.getSystem()).toBe(ESystem.LINUX);
    });

    it('should get system: Android', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.153 Mobile Safari/537.36',
        });
        expect(SystemInfo.getSystem()).toBe(ESystem.ANDROID);
    });

    it('should get system: iOS', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        });
        expect(SystemInfo.getSystem()).toBe(ESystem.IOS);
    });

    it('should get system: Unknown', () => {
        mockNavigator({
            userAgent: 'Unknown Browser',
        });
        expect(SystemInfo.getSystem()).toBe(ESystem.UNKNOWN);
    });

    it('should get system: Unknown when window is undefined', () => {
        const originalNavigator = window.navigator;
        window.navigator = undefined as any;
        expect(SystemInfo.getSystem()).toBe(ESystem.UNKNOWN);
        window.navigator = originalNavigator;
    });

    it('should support webXR', async () => {
        mockNavigator({
            xr: {
                isSessionSupported: vi.fn().mockResolvedValue(true),
            },
        });
        const restoreSecureContext = window.isSecureContext;
        window.isSecureContext = true;

        const supports = await SystemInfo.getSupportsWebXR();
        expect(supports).toBe(true);

        window.isSecureContext = restoreSecureContext;
    });

    it('should not support webXR (xr undefined)', async () => {
        mockNavigator({
            xr: undefined,
        });
        const restoreSecureContext = window.isSecureContext;
        window.isSecureContext = true;

        const supports = await SystemInfo.getSupportsWebXR();
        expect(supports).toBe(false);

        const reason = SystemInfo.getWebXRUnsupportedReason();
        expect(reason).toBe(EWebXRUnsupportedReason.NO_WEBXR_API);

        window.isSecureContext = restoreSecureContext;
    });

    it('should not support webXR (xr undefined & isSecureContext false)', async () => {
        window.isSecureContext = false;
        mockNavigator({
            xr: undefined,
        });
        const supports = await SystemInfo.getSupportsWebXR();
        expect(supports).toBe(false);

        const reason = SystemInfo.getWebXRUnsupportedReason();
        expect(reason).toBe(EWebXRUnsupportedReason.NO_HTTPS);
    });

    it('should get empty reason (not checked)', async () => {
        mockNavigator({
            xr: {
                isSessionSupported: vi.fn().mockResolvedValue(true),
            },
        });
        const restoreSecureContext = window.isSecureContext;
        window.isSecureContext = true;

        await SystemInfo.getSupportsWebXR();
        console.log = vi.fn();
        const reason = SystemInfo.getWebXRUnsupportedReason();
        expect(reason).toBe(null);

        window.isSecureContext = restoreSecureContext;
    });

    it('should get empty reason (webXR supported)', async () => {
        mockNavigator({
            xr: {
                isSessionSupported: vi.fn().mockResolvedValue(true),
            },
        });
        const restoreSecureContext = window.isSecureContext;
        window.isSecureContext = true;

        await SystemInfo.getSupportsWebXR();
        const reason = SystemInfo.getWebXRUnsupportedReason();
        expect(reason).toBe(null);

        window.isSecureContext = restoreSecureContext;
    });

    it('should not support webXR', async () => {
        mockNavigator({
            xr: {
                isSessionSupported: vi.fn().mockResolvedValue(false),
            },
        });
        const restoreSecureContext = window.isSecureContext;
        window.isSecureContext = true;

        const supports = await SystemInfo.getSupportsWebXR();
        expect(supports).toBe(false);

        const reason = SystemInfo.getWebXRUnsupportedReason();
        expect(reason).toBe(
            EWebXRUnsupportedReason.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE,
        );

        window.isSecureContext = restoreSecureContext;
    });

    it('should not support webXR on error', async () => {
        mockNavigator({
            xr: {
                isSessionSupported: vi.fn().mockRejectedValue('error'),
            },
        });
        const restoreSecureContext = window.isSecureContext;
        window.isSecureContext = true;

        const supports = await SystemInfo.getSupportsWebXR();
        expect(supports).toBe(false);

        const reason = SystemInfo.getWebXRUnsupportedReason();
        expect(reason).toBe(EWebXRUnsupportedReason.AR_PERMISSION_DENIED);

        window.isSecureContext = restoreSecureContext;
    });

    it('should return cached value', async () => {
        SystemInfo['_supportsWebXR'] = true;
        mockNavigator({
            xr: {
                isSessionSupported: vi.fn().mockRejectedValue('error'),
            },
        });
        const supports = await SystemInfo.getSupportsWebXR();
        expect(supports).toBe(true);
    });

    it('should return cached value (false)', async () => {
        SystemInfo['_supportsWebXR'] = false;
        mockNavigator({
            xr: {
                isSessionSupported: vi.fn().mockRejectedValue('error'),
            },
        });
        const supports = await SystemInfo.getSupportsWebXR();
        expect(supports).toBe(false);
    });

    it('should support ARQuickLook when relList supports AR', () => {
        vi.spyOn(document, 'createElement').mockReturnValue({
            relList: { supports: () => true },
        } as unknown as HTMLAnchorElement);
        const supports = SystemInfo.getSupportsARQuickLook();
        expect(supports).toBe(true);
    });

    it('should return false from getSupportsARQuickLook on iOS when relList is false', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            platform: 'iPhone',
            vendor: 'Apple Computer, Inc.',
        });

        vi.spyOn(document, 'createElement').mockReturnValue({
            relList: { supports: () => false },
        } as unknown as HTMLAnchorElement);
        const getSystemSpy = vi
            .spyOn(SystemInfo, 'getSystem')
            .mockReturnValue(ESystem.IOS);

        const supports = SystemInfo.getSupportsARQuickLook();
        expect(supports).toBe(false);

        getSystemSpy.mockRestore();
    });

    it('should return false from getSupportsARQuickLook for non-iOS (e.g. desktop) when relList is false', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            platform: 'Win32',
            vendor: 'Google Inc.',
        });
        vi.spyOn(document, 'createElement').mockReturnValue({
            relList: { supports: () => false },
        } as unknown as HTMLAnchorElement);
        const getSystemSpy = vi
            .spyOn(SystemInfo, 'getSystem')
            .mockReturnValue(ESystem.WINDOWS);

        const supports = SystemInfo.getSupportsARQuickLook();
        expect(supports).toBe(false);

        getSystemSpy.mockRestore();
    });

    it('should be mobile (iOS)', () => {
        vi.spyOn(SystemInfo, 'getSystem').mockReturnValue(ESystem.IOS);
        expect(SystemInfo.isMobile).toBe(true);
        expect(SystemInfo.isDesktop).toBe(false);
    });

    it('should be mobile (Android)', () => {
        vi.spyOn(SystemInfo, 'getSystem').mockReturnValue(ESystem.ANDROID);
        expect(SystemInfo.isMobile).toBe(true);
        expect(SystemInfo.isDesktop).toBe(false);
    });

    it('should be desktop (Windows)', () => {
        vi.spyOn(SystemInfo, 'getSystem').mockReturnValue(ESystem.WINDOWS);
        expect(SystemInfo.isMobile).toBe(false);
        expect(SystemInfo.isDesktop).toBe(true);
    });

    it('should be desktop (MacOS)', () => {
        vi.spyOn(SystemInfo, 'getSystem').mockReturnValue(ESystem.MACOS);
        expect(SystemInfo.isMobile).toBe(false);
        expect(SystemInfo.isDesktop).toBe(true);
    });

    it('should be desktop (Linux)', () => {
        vi.spyOn(SystemInfo, 'getSystem').mockReturnValue(ESystem.LINUX);
        expect(SystemInfo.isMobile).toBe(false);
        expect(SystemInfo.isDesktop).toBe(true);
    });

    it('should be desktop (Unknown)', () => {
        vi.spyOn(SystemInfo, 'getSystem').mockReturnValue(ESystem.UNKNOWN);
        expect(SystemInfo.isMobile).toBe(false);
        expect(SystemInfo.isDesktop).toBe(true);
    });

    it('should be capable of AR (ARQuickLook)', async () => {
        vi.spyOn(SystemInfo, 'getSupportsARQuickLook').mockReturnValue(true);
        vi.spyOn(SystemInfo, 'getSupportsWebXR').mockResolvedValue(false);
        expect(await SystemInfo.getSupportsAR()).toBe(true);
    });

    it.skip('should be capable of AR (WebXR)', async () => {
        vi.spyOn(SystemInfo, 'getSupportsARQuickLook').mockReturnValue(false);
        vi.spyOn(SystemInfo, 'getSupportsWebXR').mockResolvedValue(true);
        expect(await SystemInfo.getSupportsAR()).toBe(true);
    });

    it('should not be capable of AR', async () => {
        vi.spyOn(SystemInfo, 'getSupportsARQuickLook').mockReturnValue(false);
        vi.spyOn(SystemInfo, 'getSupportsWebXR').mockResolvedValue(false);
        expect(await SystemInfo.getSupportsAR()).toBe(false);
    });

    it('should support SceneViewer (Android, Chrome 89+)', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36',
        });
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(true);
    });

    it('should support SceneViewer (Android, Chrome 126+)', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.153 Mobile Safari/537.36',
        });
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(true);
    });

    it('should not support SceneViewer (Android, Chrome <89)', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4389.72 Mobile Safari/537.36',
        });
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(false);
    });

    it('should not support SceneViewer (Android, no Chrome)', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
        });
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(false);
    });

    it('should not support SceneViewer (iOS)', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        });
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(false);
    });

    it('should not support SceneViewer (Windows)', () => {
        mockNavigator({
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.153 Safari/537.36',
        });
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(false);
    });

    it('should not support SceneViewer (no window)', () => {
        const originalWindow = global.window;
        global.window = undefined as any;
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(false);
        global.window = originalWindow;
    });

    it('should not support SceneViewer (no navigator)', () => {
        const originalNavigator = global.navigator;
        global.navigator = undefined as any;
        const supports = SystemInfo.getSupportsSceneViewer();
        expect(supports).toBe(false);
        global.navigator = originalNavigator;
    });

    describe('getBrowser', () => {
        const testCases = [
            // Chrome (Windows, Mac, Linux, Android)
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                vendor: 'Google Inc.',
                expected: EBrowser.CHROMIUM,
            },
            {
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
                vendor: 'Google Inc.',
                expected: EBrowser.CHROMIUM,
            },
            {
                ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
                vendor: 'Google Inc.',
                expected: EBrowser.CHROMIUM,
            },
            {
                ua: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
                vendor: 'Google Inc.',
                expected: EBrowser.CHROMIUM,
            },
            // Safari (macOS, iOS)
            {
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
                vendor: 'Apple Computer, Inc.',
                expected: EBrowser.SAFARI,
            },
            {
                ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
                vendor: 'Apple Computer, Inc.',
                expected: EBrowser.SAFARI,
            },
            // Firefox (Windows, Mac, Linux, Android, iOS)
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
                expected: EBrowser.FIREFOX,
            },
            {
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
                expected: EBrowser.FIREFOX,
            },
            {
                ua: 'Mozilla/5.0 (X11; Linux i686; rv:89.0) Gecko/20100101 Firefox/89.0',
                expected: EBrowser.FIREFOX,
            },
            {
                ua: 'Mozilla/5.0 (Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
                expected: EBrowser.FIREFOX,
            },
            {
                ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/34.0 Mobile/15E148 Safari/605.1.15',
                vendor: 'Apple Computer, Inc.',
                expected: EBrowser.FIREFOX,
            },
            // Edge Chromium (Windows, Mac, Android)
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
                expected: EBrowser.CHROMIUM,
            },
            {
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59',
                expected: EBrowser.CHROMIUM,
            },
            // Edge Legacy
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19041',
                expected: EBrowser.EDGE_LEGACY,
            },
            // Chrome on iOS (CriOS)
            {
                ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1',
                vendor: 'Google Inc.',
                expected: EBrowser.CHROMIUM,
            },
            // Opera (Chromium based)
            {
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 OPR/76.0.4017.123',
                expected: EBrowser.CHROMIUM,
            },
            // Unknown / Generic WebKit
            {
                ua: 'Mozilla/5.0 (PlayStation 4 8.52) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15',
                vendor: 'Sony Interactive Entertainment',
                expected: EBrowser.SAFARI,
            },
            {
                ua: 'YetAnotherBrowser/1.0 (SomeOS) AppleWebKit/700.0 (KHTML, like Gecko)',
                expected: EBrowser.WEBKIT,
            },
            {
                ua: 'CompletelyUnknownBrowser/3.0',
                expected: EBrowser.UNKNOWN,
            },
            {
                ua: '',
                expected: EBrowser.UNKNOWN,
            },
        ];

        testCases.forEach(({ ua, vendor, expected }) => {
            it(`should return ${expected} for UA: "${ua.substring(0, 50)}..." and vendor: "${vendor || 'N/A'}"`, () => {
                mockNavigator({ userAgent: ua, vendor: vendor });
                expect(SystemInfo.getBrowser()).toBe(expected);
            });
        });

        it('should return UNKNOWN when window or navigator is undefined', () => {
            const originalWindow = global.window;
            Object.defineProperty(global, 'window', {
                value: undefined,
                writable: true,
            });
            expect(SystemInfo.getBrowser()).toBe(EBrowser.UNKNOWN);
            Object.defineProperty(global, 'window', {
                value: originalWindow,
                writable: true,
            }); // Restore

            mockNavigator(undefined);
            expect(SystemInfo.getBrowser()).toBe(EBrowser.UNKNOWN);
        });
    });

    describe('getIOSVersion', () => {
        it('should return correct version for iPhone UA with underscores', () => {
            const getSystemSpy = vi
                .spyOn(SystemInfo, 'getSystem')
                .mockReturnValue(ESystem.IOS);
            mockNavigator({
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            });
            expect(SystemInfo.getIOSVersion()).toEqual({
                major: 14,
                full: '14.6',
            });
            getSystemSpy.mockRestore();
        });

        it('should return correct version for iPad UA with dots', () => {
            const getSystemSpy = vi
                .spyOn(SystemInfo, 'getSystem')
                .mockReturnValue(ESystem.IOS);
            mockNavigator({
                userAgent:
                    'Mozilla/5.0 (iPad; CPU OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1',
            });
            expect(SystemInfo.getIOSVersion()).toEqual({
                major: 13,
                full: '13.3.1',
            });
            getSystemSpy.mockRestore();
        });

        it('should return correct version for iPhone UA with OS token and single digit minor version', () => {
            const getSystemSpy = vi
                .spyOn(SystemInfo, 'getSystem')
                .mockReturnValue(ESystem.IOS);
            mockNavigator({
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
            });
            expect(SystemInfo.getIOSVersion()).toEqual({
                major: 12,
                full: '12.0',
            });
            getSystemSpy.mockRestore();
        });

        it('should return null for non-iOS UA (Android)', () => {
            mockNavigator({
                userAgent:
                    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
            });
            expect(SystemInfo.getIOSVersion()).toBeNull();
        });

        it('should return null for non-iOS UA (Windows)', () => {
            mockNavigator({
                userAgent:
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            });
            expect(SystemInfo.getIOSVersion()).toBeNull();
        });

        it('should return null if UA does not contain parsable iOS version', () => {
            mockNavigator({
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            });
            expect(SystemInfo.getIOSVersion()).toBeNull();
        });

        it('should return null if navigator is undefined', () => {
            const originalNavigator = global.navigator;
            Object.defineProperty(global, 'navigator', {
                value: undefined,
                writable: true,
            });
            expect(SystemInfo.getIOSVersion()).toBeNull();
            Object.defineProperty(global, 'navigator', {
                value: originalNavigator,
                writable: true,
            }); // Restore
        });
        it('should return null if not iOS system even if UA has iOS string', () => {
            // Mock getSystem to return something other than iOS
            const getSystemSpy = vi
                .spyOn(SystemInfo, 'getSystem')
                .mockReturnValue(ESystem.ANDROID);
            mockNavigator({
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            });
            expect(SystemInfo.getIOSVersion()).toBeNull();
            getSystemSpy.mockRestore();
        });
    });
});
