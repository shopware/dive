import { ESystem, EWebXRUnsupportedReason } from '../types/info';
export declare class SystemInfo {
    private static _supportsWebXR;
    private static _webXRUnsupportedReason;
    /**
     * Gets the current system (iOS, Android, Windows, etc.)
     * @returns DIVESystem The current system
     */
    static GetSystem(): ESystem;
    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
     */
    static GetSupportsWebXR(): Promise<boolean>;
    /**
     * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported.
     */
    static GetWebXRUnsupportedReason(): EWebXRUnsupportedReason | null;
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
     */
    static GetSupportsARQuickLook(): boolean;
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
    static GetSupportsSceneViewer(): boolean;
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
