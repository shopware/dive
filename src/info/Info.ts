export class DIVEInfo {
    private static _supportsWebXR: boolean | null = null;

    public static GetBrowser(): string {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") > -1) {
            return "Firefox";
        } else if (userAgent.indexOf("SamsungBrowser") > -1) {
            return "Samsung Internet";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            return "Opera";
        } else if (userAgent.indexOf("Trident") > -1) {
            return "Internet Explorer";
        } else if (userAgent.indexOf("Edge") > -1) {
            return "Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
            return "Safari";
        } else {
            return "Unknown";
        }
    }

    public static GetBrowserVersion(): string {
        const userAgent = navigator.userAgent;
        const match = userAgent.match(/(firefox|msie|trident|chrome|safari|opr|edge|samsungbrowser)\/?\s*(\d+)/i) || [];
        let version = match[2];
        if (/trident/i.test(match[1])) {
            const rv = userAgent.match(/rv:(\d+)/) || [];
            version = rv[1];
        }
        if (match[1] === 'Chrome') {
            const temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
            if (temp != null) version = temp[2];
        }
        return version || "Unknown";
    }

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

    public static GetSystemVersion(): string {
        const userAgent = navigator.userAgent;
        const match = userAgent.match(/(Windows NT|Mac OS X|Android|CPU iPhone OS|CPU OS|Linux) ([\d._]+)/);
        if (match) {
            return match[2].replace(/_/g, '.');
        }
        return "Unknown";
    }

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

    public static GetSupportsARQuickLook(): boolean {
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

    public static get isMobile(): boolean {
        return this.GetSystem() === "Android" || this.GetSystem() === "iOS";
    }

    public static get isDesktop(): boolean {
        return !this.isMobile;
    }
}