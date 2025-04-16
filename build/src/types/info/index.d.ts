/**
 * Enum representing supported operating systems
 */
export declare enum ESystem {
    /**
     * iOS devices (iPhone, iPad)
     */
    IOS = "iOS",
    /**
     * Android devices
     */
    ANDROID = "Android",
    /**
     * Windows operating system
     */
    WINDOWS = "Windows",
    /**
     * macOS operating system
     */
    MACOS = "MacOS",
    /**
     * Linux operating system
     */
    LINUX = "Linux",
    /**
     * Unknown or unsupported system
     */
    UNKNOWN = "Unknown"
}
/**
 * Enum representing reasons why WebXR AR might not be supported
 */
export declare enum EWebXRUnsupportedReason {
    /**
     * The browser doesn't implement the WebXR API at all.
     * This typically means the browser is outdated or doesn't support WebXR.
     */
    NO_WEBXR_API = "NO_WEBXR_API",
    /**
     * The page is not served over HTTPS.
     * WebXR requires a secure context (HTTPS) to work.
     */
    NO_HTTPS = "NO_HTTPS",
    /**
     * The device doesn't support immersive AR sessions.
     * This could be because:
     * - The device doesn't have AR capabilities
     * - The browser doesn't support AR features
     * - The device's AR features are disabled
     */
    IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE = "IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE",
    /**
     * Access to AR features has been denied by the system or browser.
     * This could be due to:
     * - Privacy settings
     * - System restrictions
     * - Browser policies
     * - Hardware limitations
     */
    AR_PERMISSION_DENIED = "AR_PERMISSION_DENIED",
    /**
     * An unexpected error occurred while checking for WebXR support.
     * This is a fallback for any unhandled cases.
     */
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
}
