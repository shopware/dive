var h = Object.defineProperty;
var N = (t, e, r) => e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var a = (t, e, r) => N(t, typeof e != "symbol" ? e + "" : e, r);
class I extends Error {
  constructor(r, i, u, c) {
    var O;
    const o = i.match(
      /(Chrome|Safari|Firefox|Edge)\/(\d+\.\d+)/
    ), p = o ? o[1] : "Unknown", w = o ? o[2] : "Unknown", S = i.match(/\((.*?)\)/), l = S ? S[1] : "Unknown", d = ((O = l.match(/OS (\d+_\d+)/)) == null ? void 0 : O[1]) || "Unknown", R = g(l);
    let _ = r;
    (R === "iOS" || R === "iPadOS") && (p !== "Safari" ? _ += ` ARQuickLook is only supported in Safari browser. Current browser: ${p} ${w}` : parseFloat(d.replace("_", ".")) < 13 && (_ += ` ARQuickLook requires iOS/iPadOS 13.0 or later. Current version: ${d}`));
    super(_);
    a(this, "browserInfo");
    this.name = "ARCompatibilityError", this.browserInfo = {
      userAgent: i,
      platform: u,
      vendor: c,
      browser: p,
      version: w,
      os: R,
      osVersion: d
    };
  }
}
function g(t) {
  return t.includes("iPhone") ? "iOS" : t.includes("iPad") ? "iPadOS" : t.includes("Macintosh") ? "macOS" : "Unknown";
}
var s = /* @__PURE__ */ ((t) => (t.IOS = "iOS", t.ANDROID = "Android", t.WINDOWS = "Windows", t.MACOS = "MacOS", t.LINUX = "Linux", t.UNKNOWN = "Unknown", t))(s || {}), n = /* @__PURE__ */ ((t) => (t.NO_WEBXR_API = "NO_WEBXR_API", t.NO_HTTPS = "NO_HTTPS", t.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE = "IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE", t.AR_PERMISSION_DENIED = "AR_PERMISSION_DENIED", t.UNKNOWN_ERROR = "UNKNOWN_ERROR", t))(n || {});
class f {
  /**
   * Gets the current system (iOS, Android, Windows, etc.)
   * @returns DIVESystem The current system
   */
  static getSystem() {
    if (typeof window > "u" || !window.navigator)
      return s.UNKNOWN;
    const e = window.navigator.userAgent.toLowerCase();
    return e.includes("iphone") || e.includes("ipad") ? s.IOS : e.includes("android") ? s.ANDROID : e.includes("windows") ? s.WINDOWS : e.includes("macintosh") ? s.MACOS : e.includes("linux") ? s.LINUX : s.UNKNOWN;
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
   */
  static async getSupportsWebXR() {
    if (this._supportsWebXR !== !1)
      return this._supportsWebXR;
    if (!window.isSecureContext)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = n.NO_HTTPS, this._supportsWebXR;
    if (!navigator.xr)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = n.NO_WEBXR_API, this._supportsWebXR;
    try {
      const e = await navigator.xr.isSessionSupported("immersive-ar");
      this._supportsWebXR = e, this._supportsWebXR || (this._webXRUnsupportedReason = n.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE);
    } catch {
      this._supportsWebXR = !1, this._webXRUnsupportedReason = n.AR_PERMISSION_DENIED;
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
    const r = window.navigator.userAgent, i = window.navigator.platform, u = window.navigator.vendor, c = "ARQuickLook is not supported";
    throw new I(
      c,
      r,
      i,
      u
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
a(f, "_supportsWebXR", !1), a(f, "_webXRUnsupportedReason", null);
export {
  I as A,
  s as E,
  f as S,
  n as a
};
//# sourceMappingURL=SystemInfo-DYq9x4Ch.mjs.map
