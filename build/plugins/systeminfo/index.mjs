var c = Object.defineProperty;
var d = (t, e, r) => e in t ? c(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var o = (t, e, r) => d(t, typeof e != "symbol" ? e + "" : e, r);
var i = /* @__PURE__ */ ((t) => (t.IOS = "iOS", t.ANDROID = "Android", t.WINDOWS = "Windows", t.MACOS = "MacOS", t.LINUX = "Linux", t.UNKNOWN = "Unknown", t))(i || {}), s = /* @__PURE__ */ ((t) => (t.NO_WEBXR_API = "NO_WEBXR_API", t.NO_HTTPS = "NO_HTTPS", t.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE = "IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE", t.AR_PERMISSION_DENIED = "AR_PERMISSION_DENIED", t.UNKNOWN_ERROR = "UNKNOWN_ERROR", t))(s || {}), p = /* @__PURE__ */ ((t) => (t.CHROMIUM = "Chromium", t.SAFARI = "Safari", t.WEBKIT = "WebKit", t.FIREFOX = "Firefox", t.EDGE_LEGACY = "EdgeLegacy", t.UNKNOWN = "Unknown", t))(p || {});
class a {
  /**
   * Gets the current system (iOS, Android, Windows, etc.)
   * @returns DIVESystem The current system
   */
  static getSystem() {
    if (typeof window > "u" || !window.navigator)
      return i.UNKNOWN;
    const e = window.navigator.userAgent.toLowerCase();
    return e.includes("iphone") || e.includes("ipad") ? i.IOS : e.includes("android") ? i.ANDROID : e.includes("windows") ? i.WINDOWS : e.includes("macintosh") ? i.MACOS : e.includes("linux") ? i.LINUX : i.UNKNOWN;
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
   */
  static async getSupportsWebXR() {
    if (this._supportsWebXR !== !1)
      return this._supportsWebXR;
    if (!window.isSecureContext)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = s.NO_HTTPS, this._supportsWebXR;
    if (!navigator.xr)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = s.NO_WEBXR_API, this._supportsWebXR;
    try {
      const e = await navigator.xr.isSessionSupported("immersive-ar");
      this._supportsWebXR = e, this._supportsWebXR || (this._webXRUnsupportedReason = s.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE);
    } catch {
      this._supportsWebXR = !1, this._webXRUnsupportedReason = s.AR_PERMISSION_DENIED;
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
    return !!document.createElement("a").relList.supports("ar");
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
    const e = window.navigator.userAgent.toLowerCase();
    if (!e.includes("android") || !e.includes("chrome"))
      return !1;
    const r = e.match(/chrome\/(\d+)/);
    return !(!r || parseInt(r[1]) < 89);
  }
  /**
   * @returns A boolean indicating whether the user's device is a mobile device.
   */
  static get isMobile() {
    return this.getSystem() === i.ANDROID || this.getSystem() === i.IOS;
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
  /**
   * Gets the current browser engine.
   * @returns EBrowser The current browser engine.
   */
  static getBrowser() {
    var n;
    if (typeof window > "u" || !window.navigator)
      return "Unknown";
    const e = window.navigator.userAgent.toLowerCase(), r = (n = window.navigator.vendor) == null ? void 0 : n.toLowerCase();
    return e.includes("fxios/") ? "Firefox" : e.includes("crios/") ? "Chromium" : e.includes("firefox/") ? "Firefox" : e.includes("safari/") && e.includes("version/") && !e.includes("chrome/") && // Excludes desktop Chrome, Edge Chromium
    !e.includes("edg/") && !e.includes("opr/") ? "Safari" : e.includes("edg/") ? "Chromium" : e.includes("edge/") ? "EdgeLegacy" : e.includes("chrome/") || r != null && r.includes("google inc.") ? "Chromium" : e.includes("applewebkit") ? "WebKit" : "Unknown";
  }
  /**
   * Gets the iOS version if the current system is iOS.
   * @returns An object with { major: number, full: string } or null if not iOS or version not parsable.
   */
  static getIOSVersion() {
    if (this.getSystem() !== i.IOS || typeof window > "u" || !window.navigator)
      return null;
    const r = window.navigator.userAgent.match(/(?:iPhone OS|iPad OS|OS) (\d+[._\d]*)/i);
    if (r && r[1]) {
      const n = r[1].replace(/_/g, "."), u = parseInt(n.split(".")[0], 10);
      if (!isNaN(u))
        return { major: u, full: n };
    }
    return null;
  }
}
o(a, "_supportsWebXR", !1), o(a, "_webXRUnsupportedReason", null);
export {
  p as EBrowser,
  i as ESystem,
  s as EWebXRUnsupportedReason,
  a as SystemInfo
};
