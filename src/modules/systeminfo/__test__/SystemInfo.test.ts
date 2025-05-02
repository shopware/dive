import { SystemInfo } from '../SystemInfo';
import { ESystem, EWebXRUnsupportedReason } from '../../../types/info';
import { ARCompatibilityError } from '../../../error';

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

    it('should not support ARQuickLook when relList does not support AR', () => {
        const userAgent =
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
        const platform = 'iPhone';
        const vendor = 'Apple Computer, Inc.';

        mockNavigator({
            userAgent,
            platform,
            vendor,
        });

        vi.spyOn(document, 'createElement').mockReturnValue({
            relList: { supports: () => false },
        } as unknown as HTMLAnchorElement);

        try {
            SystemInfo.getSupportsARQuickLook();
            fail('Expected getSupportsARQuickLook to throw');
        } catch (error) {
            expect(error).toBeInstanceOf(ARCompatibilityError);
            const arError = error as ARCompatibilityError;
            expect(arError.browserInfo.userAgent).toBe(userAgent);
            expect(arError.browserInfo.platform).toBe(platform);
            expect(arError.browserInfo.vendor).toBe(vendor);
            expect(arError.browserInfo.browser).toBe('Safari');
            expect(arError.browserInfo.os).toBe('iOS');
        }
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
});
