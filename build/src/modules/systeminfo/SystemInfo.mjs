var c = Object.defineProperty;
var d = (r, t, e) => t in r ? c(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var i = (r, t, e) => d(r, typeof t != "symbol" ? t + "" : t, e);
import { E as s, a as o, A as R } from "../../../chunks/index-C7Wx_9uY.mjs";
class n {
  /**
   * Gets the current system (iOS, Android, Windows, etc.)
   * @returns DIVESystem The current system
   */
  static getSystem() {
    if (typeof window > "u" || !window.navigator)
      return s.UNKNOWN;
    const t = window.navigator.userAgent.toLowerCase();
    return t.includes("iphone") || t.includes("ipad") ? s.IOS : t.includes("android") ? s.ANDROID : t.includes("windows") ? s.WINDOWS : t.includes("macintosh") ? s.MACOS : t.includes("linux") ? s.LINUX : s.UNKNOWN;
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
   */
  static async getSupportsWebXR() {
    if (this._supportsWebXR !== !1)
      return this._supportsWebXR;
    if (!window.isSecureContext)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = o.NO_HTTPS, this._supportsWebXR;
    if (!navigator.xr)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = o.NO_WEBXR_API, this._supportsWebXR;
    try {
      const t = await navigator.xr.isSessionSupported("immersive-ar");
      this._supportsWebXR = t, this._supportsWebXR || (this._webXRUnsupportedReason = o.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE);
    } catch {
      this._supportsWebXR = !1, this._webXRUnsupportedReason = o.AR_PERMISSION_DENIED;
    }
    return this._supportsWebXR;
  }
  /**
   * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported.
   */
  static getWebXRUnsupportedReason() {
    return this._supportsWebXR ? (console.log("WebXR is supported."), null) : this._webXRUnsupportedReason;
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
  static getSupportsARQuickLook() {
    if (document.createElement("a").relList.supports("ar"))
      return !0;
    const e = window.navigator.userAgent, u = window.navigator.platform, a = window.navigator.vendor, p = "ARQuickLook is not supported";
    throw new R(
      p,
      e,
      u,
      a
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
  static getSupportsSceneViewer() {
    if (typeof window > "u" || !window.navigator)
      return !1;
    const t = window.navigator.userAgent.toLowerCase();
    if (!t.includes("android") || !t.includes("chrome"))
      return !1;
    const e = t.match(/chrome\/(\d+)/);
    return !(!e || parseInt(e[1]) < 89);
  }
  /**
   * @returns A boolean indicating whether the user's device is a mobile device.
   */
  static get isMobile() {
    return this.getSystem() === s.ANDROID || this.getSystem() === s.IOS;
  }
  /**
   * @returns A boolean indicating whether the user's device is a desktop device.
   */
  static get isDesktop() {
    return !this.isMobile;
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device is capable of AR.
   */
  static getSupportsAR() {
    return this.getSupportsARQuickLook() || this.getSupportsSceneViewer();
  }
}
i(n, "_supportsWebXR", !1), i(n, "_webXRUnsupportedReason", null);
export {
  n as SystemInfo
};
//# sourceMappingURL=SystemInfo.mjs.map
