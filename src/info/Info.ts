export class DIVEInfo {
    private static _supportsWebXR: boolean | null = null;

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

        if (!navigator.xr) {
            this._supportsWebXR = false;
            return this._supportsWebXR;
        }
        // Check if immersive-vr session mode is supported
        try {
            const supported = await navigator.xr.isSessionSupported('immersive-ar');
            this._supportsWebXR = supported;
        } catch (error) {
            this._supportsWebXR = false;
        }
        return this._supportsWebXR;
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