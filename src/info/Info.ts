export enum WebXRUnsupportedReason {
    "NO_HTTPS" = 0,
    "IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE" = 1,
    "AR_SESSION_NOT_ALLOWED" = 2,
}

export class DIVEInfo {
    private static _supportsWebXR: boolean | null = null;
    private static _webXRUnsupportedReason: WebXRUnsupportedReason | null = null;

    /**
     *
     * @returns The system the user is using. Possible values are "Android", "iOS", "Windows", "MacOS", "Linux" or "Unknown".
     */
    public static GetSystem(): string {
        const platform = navigator.platform;
        if (/Android/.test(navigator.userAgent)) {
            return "Android";
        } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            return "iOS";
        } else if (platform.startsWith("Win")) {
            return "Windows";
        } else if (platform.startsWith("Mac")) {
            return "MacOS";
        } else if (platform.startsWith("Linux")) {
            return "Linux";
        } else {
            return "Unknown";
        }
    }

    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
     */
    public static async GetSupportsWebXR(): Promise<boolean> {
        if (this._supportsWebXR !== null) {
            return this._supportsWebXR;
        }

        // check if XRSystem is available && if https enabled
        if (!navigator.xr && window.isSecureContext === false) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason = WebXRUnsupportedReason.NO_HTTPS;
            return this._supportsWebXR;
        }

        // Check if immersive-vr session mode is supported
        try {
            const supported = await navigator.xr!.isSessionSupported('immersive-ar');
            if (!supported) {
                this._webXRUnsupportedReason = WebXRUnsupportedReason.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE;
            }
            this._supportsWebXR = supported;
        } catch (error) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason = WebXRUnsupportedReason.AR_SESSION_NOT_ALLOWED;
        }
        return this._supportsWebXR;
    }

    /**
     * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported nor not has been checked yet.
     */
    public static GetWebXRUnsupportedReason(): WebXRUnsupportedReason | null {
        if (this._supportsWebXR === null) {
            console.log('WebXR support has not been checked yet.');
            return null;
        }
        return this._webXRUnsupportedReason;
    }

    /**
     * @returns A boolean indicating whether the user's device supports AR Quick Look.
     */
    public static GetSupportsARQuickLook(): boolean {
        const a = document.createElement("a");
        if (a.relList.supports("ar")) {
            return true;
        }

        // fallback check
        const userAgent = navigator.userAgent;

        // Check if the device is running iOS
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as unknown as Window & { MSStream?: string }).MSStream;
        if (!isIOS) {
            return false;
        }

        // Extract iOS version
        const match = userAgent.match(/OS (\d+)_/);
        if (!match || match.length < 2) {
            return false;
        }
        const iOSVersion = parseInt(match[1], 10);

        // Minimum iOS version for QuickLook support
        const minQuickLookVersion = 12;

        // Check if the iOS version is supported
        if (iOSVersion < minQuickLookVersion) {
            return false;
        }

        // Check for supported browser
        const isSupportedBrowser = /^((?!chrome|android).)*safari|CriOS|FxiOS/i.test(userAgent);
        if (isSupportedBrowser) {
            return true;
        }

        // Default to false if none of the conditions are met
        return false;
    }

    /**
     * @returns A boolean indicating whether the user's device is a mobile device.
     */
    public static get isMobile(): boolean {
        return this.GetSystem() === "Android" || this.GetSystem() === "iOS";
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