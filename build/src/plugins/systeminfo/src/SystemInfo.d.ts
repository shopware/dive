import { ESystem, EWebXRUnsupportedReason } from '../types/index.ts';
export declare enum EBrowser {
    CHROMIUM = "Chromium",// Chrome, Opera, Brave, new Edge, Chrome on iOS
    SAFARI = "Safari",// Apple Safari
    WEBKIT = "WebKit",// Other WebKit-based browsers (not Safari or iOS variants if specified)
    FIREFOX = "Firefox",// Firefox, Firefox on iOS
    EDGE_LEGACY = "EdgeLegacy",// Old EdgeHTML Edge
    UNKNOWN = "Unknown"
}
export declare class SystemInfo {
    private static _supportsWebXR;
    private static _webXRUnsupportedReason;
    /**
     * Gets the current system (iOS, Android, Windows, etc.)
     * @returns DIVESystem The current system
     */
    static getSystem(): ESystem;
    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
     */
    static getSupportsWebXR(): Promise<boolean>;
    /**
     * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported.
     */
    static getWebXRUnsupportedReason(): EWebXRUnsupportedReason | null;
    /**
     * Checks if ARQuickLook is supported on the current device
     * This checks for:
     * 1. AR support via relList
     *
     * Requirements:
     * - iOS 12.0 or later
     * - Safari browser (ARQuickLook is only supported in Safari)
     * - Device with AR capabilities (iPhone/iPad with LiDAR scanner or ARKit support)
     *
     * Note: ARQuickLook is only available in Safari on iOS. Other browsers
     * (Chrome, Firefox, etc.) do not support ARQuickLook, even on iOS.
     *
     * @returns boolean indicating if ARQuickLook is supported
     * @throws ARCompatibilityError if ARQuickLook is not supported, with detailed browser information
     */
    static getSupportsARQuickLook(): boolean;
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
    static getSupportsSceneViewer(): boolean;
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
    static getSupportsAR(): boolean;
    /**
     * Gets the current browser engine.
     * @returns EBrowser The current browser engine.
     */
    static getBrowser(): EBrowser;
    /**
     * Gets the iOS version if the current system is iOS.
     * @returns An object with { major: number, full: string } or null if not iOS or version not parsable.
     */
    static getIOSVersion(): {
        major: number;
        full: string;
    } | null;
}
