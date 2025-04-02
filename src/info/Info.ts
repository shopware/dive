/**
 * Enum representing reasons why WebXR AR might not be supported on a device.
 * Each reason includes a description explaining what it means.
 */
export enum WebXRUnsupportedReason {
    /**
     * The browser doesn't implement the WebXR API at all.
     * This typically means the browser is outdated or doesn't support WebXR.
     */
    NO_WEBXR_API = 'NO_WEBXR_API',

    /**
     * The page is not served over HTTPS.
     * WebXR requires a secure context (HTTPS) to work.
     */
    NO_HTTPS = 'NO_HTTPS',

    /**
     * The device doesn't support immersive AR sessions.
     * This could be because:
     * - The device doesn't have AR capabilities
     * - The browser doesn't support AR features
     * - The device's AR features are disabled
     */
    IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE = 'IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE',

    /**
     * Access to AR features has been denied by the system or browser.
     * This could be due to:
     * - Privacy settings
     * - System restrictions
     * - Browser policies
     * - Hardware limitations
     */
    AR_PERMISSION_DENIED = 'AR_PERMISSION_DENIED',

    /**
     * An unexpected error occurred while checking for WebXR support.
     * This is a fallback for any unhandled cases.
     */
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class DIVEInfo {
    private static _supportsWebXR: boolean = false;
    private static _webXRUnsupportedReason: WebXRUnsupportedReason | null =
        null;

    /**
     *
     * @returns The system the user is using. Possible values are "Android", "iOS", "Windows", "MacOS", "Linux" or "Unknown".
     */
    public static GetSystem(): string {
        const platform = navigator.platform;
        if (/Android/.test(navigator.userAgent)) {
            return 'Android';
        } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            return 'iOS';
        } else if (platform.startsWith('Win')) {
            return 'Windows';
        } else if (platform.startsWith('Mac')) {
            return 'MacOS';
        } else if (platform.startsWith('Linux')) {
            return 'Linux';
        } else {
            return 'Unknown';
        }
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
            this._webXRUnsupportedReason = WebXRUnsupportedReason.NO_HTTPS;
            return this._supportsWebXR;
        }

        // Check if XRSystem is available
        if (!navigator.xr) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason = WebXRUnsupportedReason.NO_WEBXR_API;
            return this._supportsWebXR;
        }

        try {
            // Check specifically for immersive-ar support
            const arSupported =
                await navigator.xr.isSessionSupported('immersive-ar');
            this._supportsWebXR = arSupported;

            if (!this._supportsWebXR) {
                this._webXRUnsupportedReason =
                    WebXRUnsupportedReason.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE;
            }
        } catch (error) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason =
                WebXRUnsupportedReason.AR_PERMISSION_DENIED;
        }

        return this._supportsWebXR;
    }

    /**
     * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported.
     */
    public static GetWebXRUnsupportedReason(): WebXRUnsupportedReason | null {
        if (this._supportsWebXR) {
            console.log('WebXR is supported.');
            return null;
        }
        return this._webXRUnsupportedReason;
    }

    /**
     * @returns A boolean indicating whether the user's device supports AR Quick Look.
     * This uses the modern relList.supports('ar') check which is the most reliable way
     * to detect AR Quick Look support on modern browsers and devices.
     */
    public static GetSupportsARQuickLook(): boolean {
        const a = document.createElement('a');
        return a.relList.supports('ar');
    }

    /**
     * @returns A boolean indicating whether the user's device is a mobile device.
     */
    public static get isMobile(): boolean {
        return this.GetSystem() === 'Android' || this.GetSystem() === 'iOS';
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
