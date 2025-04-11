import { ESystem, EWebXRUnsupportedReason } from '../types/info';
import { ARCompatibilityError } from '../error';
import { Modules } from '../module/Module';

declare global {
    interface ModuleClasses {
        SystemInfo: SystemInfo;
    }
}

Modules.register('SystemInfo', 'src/systemInfo/SystemInfo.ts');

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
    public static getWebXRUnsupportedReason(): EWebXRUnsupportedReason | null {
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
    public static getSupportsARQuickLook(): boolean {
        const a = document.createElement('a');
        if (a.relList.supports('ar')) {
            return true;
        }

        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const vendor = window.navigator.vendor;

        // The base error message - the ARCompatibilityError constructor will add more details
        const errorMessage = 'ARQuickLook is not supported';

        throw new ARCompatibilityError(
            errorMessage,
            userAgent,
            platform,
            vendor,
        );
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
    public static getIsARCapable(): boolean {
        return this.getSupportsARQuickLook() || this.getSupportsSceneViewer();
    }
}
