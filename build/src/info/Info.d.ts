export declare enum WebXRUnsupportedReason {
    'UNKNWON_ERROR' = 0,
    'NO_HTTPS' = 1,
    'IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE' = 2,
    'AR_SESSION_NOT_ALLOWED' = 3
}
export declare class DIVEInfo {
    private static _supportsWebXR;
    private static _webXRUnsupportedReason;
    /**
     *
     * @returns The system the user is using. Possible values are "Android", "iOS", "Windows", "MacOS", "Linux" or "Unknown".
     */
    static GetSystem(): string;
    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
     */
    static GetSupportsWebXR(): Promise<boolean>;
    /**
     * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported nor not has been checked yet.
     */
    static GetWebXRUnsupportedReason(): WebXRUnsupportedReason | null;
    /**
     * @returns A boolean indicating whether the user's device supports AR Quick Look.
     */
    static GetSupportsARQuickLook(): boolean;
    /**
     * @returns A boolean indicating whether the user's device is a mobile device.
     */
    static get isMobile(): boolean;
    /**
     * @returns A boolean indicating whether the user's device is a desktop device.
     */
    static get isDesktop(): boolean;
    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device is capable of AR.
     */
    static GetIsARCapable(): Promise<boolean>;
}
