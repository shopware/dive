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
        return new Promise((resolve) => {
            if (this._supportsWebXR !== null) {
                resolve(this._supportsWebXR);
                return;
            }

            if (!navigator.xr) {
                this._supportsWebXR = false;
                resolve(false);
                return;
            }
            // Check if immersive-vr session mode is supported
            navigator.xr.isSessionSupported('immersive-ar')
                .then((supported) => {
                    if (supported) {
                        this._supportsWebXR = true;
                        resolve(true);
                    } else {
                        this._supportsWebXR = false;
                        resolve(false);
                    }
                }).catch(() => {
                    this._supportsWebXR = false;
                    resolve(false);
                });
        });
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
    public static get isARCapable(): Promise<boolean> {
        return new Promise((resolve) => {
            const supportsARQL = this.GetSupportsARQuickLook();
            if (supportsARQL) {
                resolve(true);
                return;
            }

            this.GetSupportsWebXR().then((supportsWebXR) => {
                resolve(supportsWebXR);
            });
        });
    }
}