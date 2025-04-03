import { ESystem, EWebXRUnsupportedReason } from '../types/info';
import { ARCompatibilityError } from '../types/error';

export class SystemInfo {
    private static _supportsWebXR: boolean = false;
    private static _webXRUnsupportedReason: EWebXRUnsupportedReason | null =
        null;

    /**
     * Gets the current system (iOS, Android, Windows, etc.)
     * @returns DIVESystem The current system
     */
    public static GetSystem(): ESystem {
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
    public static async GetSupportsWebXR(): Promise<boolean> {
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
        } catch (error) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason =
                EWebXRUnsupportedReason.AR_PERMISSION_DENIED;
        }

        return this._supportsWebXR;
    }

    /**
     * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported.
     */
    public static GetWebXRUnsupportedReason(): EWebXRUnsupportedReason | null {
        if (this._supportsWebXR) {
            console.log('WebXR is supported.');
            return null;
        }
        return this._webXRUnsupportedReason;
    }

    /**
     * Checks if ARQuickLook is supported on the current device
     * This checks for:
     * 1. AR support via relList
     *
     * Requirements:
     * - iOS 13.0 or later
     * - Safari browser (ARQuickLook is only supported in Safari)
     * - Device with AR capabilities (iPhone/iPad with LiDAR scanner or ARKit support)
     *
     * Note: ARQuickLook is only available in Safari on iOS. Other browsers
     * (Chrome, Firefox, etc.) do not support ARQuickLook, even on iOS.
     *
     * @returns boolean indicating if ARQuickLook is supported
     * @throws ARCompatibilityError if ARQuickLook is not supported, with detailed browser information
     */
    public static GetSupportsARQuickLook(): boolean {
        const a = document.createElement('a');
        if (a.relList.supports('ar')) {
            return true;
        }

        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const vendor = window.navigator.vendor;

        // Parse browser information
        const browserMatch = userAgent.match(
            /(Chrome|Safari|Firefox|Edge)\/(\d+\.\d+)/,
        );
        const browser = browserMatch ? browserMatch[1] : 'Unknown';
        const version = browserMatch ? browserMatch[2] : 'Unknown';

        // Parse OS information
        const osMatch = userAgent.match(/\((.*?)\)/);
        const osInfo = osMatch ? osMatch[1] : 'Unknown';
        const osVersion = osInfo.match(/OS (\d+_\d+)/)?.[1] || 'Unknown';
        const os = osInfo.includes('iPhone')
            ? 'iOS'
            : osInfo.includes('iPad')
              ? 'iPadOS'
              : osInfo.includes('Macintosh')
                ? 'macOS'
                : 'Unknown';

        let errorMessage = 'ARQuickLook is not supported on this device. ';

        if (browser !== 'Safari') {
            errorMessage += `ARQuickLook is only supported in Safari browser. Current browser: ${browser} ${version}`;
        } else if (parseFloat(osVersion.replace('_', '.')) < 13.0) {
            errorMessage += `ARQuickLook requires iOS/iPadOS 13.0 or later. Current version: ${osVersion}`;
        } else {
            errorMessage +=
                'Device may not have AR capabilities (ARKit support)';
        }

        throw new ARCompatibilityError(errorMessage, {
            userAgent,
            platform,
            vendor,
            browser,
            version,
            os,
            osVersion,
        });
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
    public static GetSupportsSceneViewer(): boolean {
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
            this.GetSystem() === ESystem.ANDROID ||
            this.GetSystem() === ESystem.IOS
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
    public static async GetIsARCapable(): Promise<boolean> {
        if (this.GetSupportsARQuickLook()) {
            return true;
        }

        return await this.GetSupportsWebXR();
    }
}
