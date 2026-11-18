import { ESystem, EWebXRUnsupportedReason } from '../types/index.ts';

export enum EBrowser {
    CHROMIUM = 'Chromium', // Chrome, Opera, Brave, new Edge, Chrome on iOS
    SAFARI = 'Safari', // Apple Safari
    WEBKIT = 'WebKit', // Other WebKit-based browsers (not Safari or iOS variants if specified)
    FIREFOX = 'Firefox', // Firefox, Firefox on iOS
    EDGE_LEGACY = 'EdgeLegacy', // Old EdgeHTML Edge
    UNKNOWN = 'Unknown',
}

/**
 * iOS browsers that run on WKWebView but still open AR Quick Look for
 * `rel="ar"` links: Chrome, Edge, Firefox, the Google app and DuckDuckGo.
 * Same list as Google's model-viewer uses.
 */
const AR_QUICK_LOOK_WEBVIEW_BROWSERS =
    /CriOS\/|EdgiOS\/|FxiOS\/|GSA\/|DuckDuckGo\//;

export class SystemInfo {
    private static _supportsWebXR: boolean = false;
    private static _webXRUnsupportedReason: EWebXRUnsupportedReason | null =
        null;

    /**
     * Gets the current system (iOS, Android, Windows, etc.)
     * @returns DIVESystem The current system
     */
    public static getSystem(): ESystem {
        if (typeof window === 'undefined' || !window.navigator) {
            return ESystem.UNKNOWN;
        }

        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            return ESystem.IOS;
        }
        if (userAgent.includes('android')) {
            return ESystem.ANDROID;
        }
        if (userAgent.includes('windows')) {
            return ESystem.WINDOWS;
        }
        if (userAgent.includes('macintosh')) {
            return ESystem.MACOS;
        }
        if (userAgent.includes('linux')) {
            return ESystem.LINUX;
        }
        return ESystem.UNKNOWN;
    }

    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
     */
    public static async getSupportsWebXR(): Promise<boolean> {
        if (this._supportsWebXR !== false) {
            return this._supportsWebXR;
        }

        // Check if we're in a secure context (HTTPS)
        if (!window.isSecureContext) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason = EWebXRUnsupportedReason.NO_HTTPS;
            return this._supportsWebXR;
        }

        // Check if XRSystem is available
        if (!navigator.xr) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason = EWebXRUnsupportedReason.NO_WEBXR_API;
            return this._supportsWebXR;
        }

        try {
            // Check specifically for immersive-ar support
            const arSupported =
                await navigator.xr.isSessionSupported('immersive-ar');
            this._supportsWebXR = arSupported;

            if (!this._supportsWebXR) {
                this._webXRUnsupportedReason =
                    EWebXRUnsupportedReason.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE;
            }
        } catch {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason =
                EWebXRUnsupportedReason.AR_PERMISSION_DENIED;
        }

        return this._supportsWebXR;
    }

    /**
     * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported.
     */
    public static getWebXRUnsupportedReason(): EWebXRUnsupportedReason | null {
        if (this._supportsWebXR) {
            console.log('WebXR is supported.');
            return null;
        }
        return this._webXRUnsupportedReason;
    }

    /**
     * Checks if ARQuickLook is supported in the current browser.
     *
     * - Safari itself (not a WKWebView app): `rel="ar"` support reported by `relList`.
     * - WKWebView apps on iOS (every other iOS browser and in-app browsers): `relList`
     *   is unreliable there (it reports `false` in Chrome, which does open AR Quick Look),
     *   so only browsers known to handle `rel="ar"` links count as supported.
     *   See {@link SystemInfo.getIsARQuickLookBrowser}.
     *
     * The device itself still needs ARKit support and iOS 12 or later.
     *
     * @returns boolean indicating if ARQuickLook is supported
     */
    public static getSupportsARQuickLook(): boolean {
        if (this.getIsIOSWebView()) {
            return this.getIsARQuickLookBrowser();
        }

        const a = document.createElement('a');
        return a.relList.supports('ar');
    }

    /**
     * Checks if the page runs inside a WKWebView on iOS, which is the case for
     * every iOS browser except Safari itself (Chrome, Brave, Firefox, ...) and
     * for in-app browsers. Detected by `window.webkit.messageHandlers`, which
     * Safari does not expose.
     *
     * @returns boolean indicating if the page runs in a WKWebView on iOS
     */
    public static getIsIOSWebView(): boolean {
        if (this.getSystem() !== ESystem.IOS) {
            return false;
        }

        const webkit = (
            window as Window & { webkit?: { messageHandlers?: unknown } }
        ).webkit;
        return Boolean(webkit?.messageHandlers);
    }

    /**
     * Checks if the current browser is one that can open AR Quick Look:
     * Safari, or one of the WKWebView browsers known to handle `rel="ar"` links
     * (Chrome, Edge, Firefox, the Google app, DuckDuckGo). Other WKWebView
     * browsers such as Brave download the USDZ file instead.
     *
     * @returns boolean indicating if the browser can open AR Quick Look
     */
    public static getIsARQuickLookBrowser(): boolean {
        if (this.getIsIOSWebView()) {
            return AR_QUICK_LOOK_WEBVIEW_BROWSERS.test(
                window.navigator.userAgent,
            );
        }

        return this.getBrowser() === EBrowser.SAFARI;
    }

    /**
     * Checks if SceneViewer is supported on the current device
     * This checks for:
     * 1. Android device
     * 2. Chrome browser (version 89 or later)
     *
     * Requirements:
     * - Android 7.0 (API level 24) or later
     * - Chrome for Android 89 or later
     *
     * Note: According to Google's documentation, if these requirements are met,
     * SceneViewer will be available. If ARCore is not installed, SceneViewer will
     * fall back to showing the model in 3D.
     *
     * @returns boolean indicating if SceneViewer is supported
     */
    public static getSupportsSceneViewer(): boolean {
        // Check if we're in a browser environment
        if (typeof window === 'undefined' || !window.navigator) {
            return false;
        }

        const userAgent = window.navigator.userAgent.toLowerCase();

        // Check if we're on Android
        if (!userAgent.includes('android')) {
            return false;
        }

        // Check if we're using Chrome
        if (!userAgent.includes('chrome')) {
            return false;
        }

        // Check Chrome version (89 or later)
        const chromeVersion = userAgent.match(/chrome\/(\d+)/);
        if (!chromeVersion || parseInt(chromeVersion[1]) < 89) {
            return false;
        }

        return true;
    }

    /**
     * @returns A boolean indicating whether the user's device is a mobile device.
     */
    public static get isMobile(): boolean {
        return (
            this.getSystem() === ESystem.ANDROID ||
            this.getSystem() === ESystem.IOS
        );
    }

    /**
     * @returns A boolean indicating whether the user's device is a desktop device.
     */
    public static get isDesktop(): boolean {
        return !this.isMobile;
    }

    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device is capable of AR.
     */
    public static getSupportsAR(): boolean {
        return this.getSupportsARQuickLook() || this.getSupportsSceneViewer();
    }

    /**
     * Gets the current browser engine.
     * @returns EBrowser The current browser engine.
     */
    public static getBrowser(): EBrowser {
        if (typeof window === 'undefined' || !window.navigator) {
            return EBrowser.UNKNOWN;
        }

        const ua = window.navigator.userAgent.toLowerCase();
        const vendor = window.navigator.vendor?.toLowerCase();

        // Order of checks is important

        // iOS specific browser brands (use WebKit engine but identify as brand)
        if (ua.includes('fxios/')) {
            // Firefox on iOS
            return EBrowser.FIREFOX;
        }
        if (ua.includes('crios/')) {
            // Chrome on iOS
            return EBrowser.CHROMIUM;
        }

        // Firefox (Desktop/Android)
        if (ua.includes('firefox/')) {
            return EBrowser.FIREFOX;
        }

        // Safari (must be checked before Chromium and general WebKit for non-iOS Chrome/Firefox)
        if (
            ua.includes('safari/') &&
            ua.includes('version/') &&
            !ua.includes('chrome/') && // Excludes desktop Chrome, Edge Chromium
            !ua.includes('edg/') &&
            !ua.includes('opr/')
        ) {
            return EBrowser.SAFARI;
        }

        // Edge (Chromium-based) - check before generic Chromium due to "Edg/" token
        if (ua.includes('edg/')) {
            return EBrowser.CHROMIUM;
        }

        // Edge (Legacy EdgeHTML) - rare now
        if (ua.includes('edge/')) {
            return EBrowser.EDGE_LEGACY;
        }

        // Chromium (Chrome, Opera, Brave etc. - non-iOS versions not already caught)
        if (ua.includes('chrome/') || vendor?.includes('google inc.')) {
            return EBrowser.CHROMIUM;
        }

        // If still unsure, but WebKit is in UA (could be other WebKit browsers or less common ones)
        // This is a fallback if no specific brand was identified above.
        if (ua.includes('applewebkit')) {
            return EBrowser.WEBKIT;
        }

        return EBrowser.UNKNOWN;
    }

    /**
     * Gets the iOS version if the current system is iOS.
     * @returns An object with { major: number, full: string } or null if not iOS or version not parsable.
     */
    public static getIOSVersion(): { major: number; full: string } | null {
        if (
            this.getSystem() !== ESystem.IOS ||
            typeof window === 'undefined' ||
            !window.navigator
        ) {
            return null;
        }

        const ua = window.navigator.userAgent;
        const osMatch = ua.match(/(?:iPhone OS|iPad OS|OS) (\d+[._\d]*)/i); // More flexible regex for version

        if (osMatch && osMatch[1]) {
            const fullVersionString = osMatch[1].replace(/_/g, '.');
            const majorVersion = parseInt(fullVersionString.split('.')[0], 10);

            if (!isNaN(majorVersion)) {
                return { major: majorVersion, full: fullVersionString };
            }
        }
        return null;
    }
}
