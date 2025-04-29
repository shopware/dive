var O = Object.defineProperty;
var h = (e, s, t) => s in e ? O(e, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[s] = t;
var a = (e, s, t) => h(e, typeof s != "symbol" ? s + "" : s, t);
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
class A extends Error {
  constructor(t, o, u, c) {
    var m;
    const n = o.match(
      /(Chrome|Safari|Firefox|Edge)\/(\d+\.\d+)/
    ), d = n ? n[1] : "Unknown", _ = n ? n[2] : "Unknown", S = o.match(/\((.*?)\)/), w = S ? S[1] : "Unknown", p = ((m = w.match(/OS (\d+_\d+)/)) == null ? void 0 : m[1]) || "Unknown", l = N(w);
    let R = t;
    (l === "iOS" || l === "iPadOS") && (d !== "Safari" ? R += ` ARQuickLook is only supported in Safari browser. Current browser: ${d} ${_}` : parseFloat(p.replace("_", ".")) < 13 && (R += ` ARQuickLook requires iOS/iPadOS 13.0 or later. Current version: ${p}`));
    super(R);
    a(this, "browserInfo");
    this.name = "ARCompatibilityError", this.browserInfo = {
      userAgent: o,
      platform: u,
      vendor: c,
      browser: d,
      version: _,
      os: l,
      osVersion: p
    };
  }
}
function N(e) {
  return e.includes("iPhone") ? "iOS" : e.includes("iPad") ? "iPadOS" : e.includes("Macintosh") ? "macOS" : "Unknown";
}
var r = /* @__PURE__ */ ((e) => (e.IOS = "iOS", e.ANDROID = "Android", e.WINDOWS = "Windows", e.MACOS = "MacOS", e.LINUX = "Linux", e.UNKNOWN = "Unknown", e))(r || {}), i = /* @__PURE__ */ ((e) => (e.NO_WEBXR_API = "NO_WEBXR_API", e.NO_HTTPS = "NO_HTTPS", e.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE = "IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE", e.AR_PERMISSION_DENIED = "AR_PERMISSION_DENIED", e.UNKNOWN_ERROR = "UNKNOWN_ERROR", e))(i || {});
class f {
  /**
   * Gets the current system (iOS, Android, Windows, etc.)
   * @returns DIVESystem The current system
   */
  static getSystem() {
    if (typeof window > "u" || !window.navigator)
      return r.UNKNOWN;
    const s = window.navigator.userAgent.toLowerCase();
    return s.includes("iphone") || s.includes("ipad") ? r.IOS : s.includes("android") ? r.ANDROID : s.includes("windows") ? r.WINDOWS : s.includes("macintosh") ? r.MACOS : s.includes("linux") ? r.LINUX : r.UNKNOWN;
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
   */
  static async getSupportsWebXR() {
    if (this._supportsWebXR !== !1)
      return this._supportsWebXR;
    if (!window.isSecureContext)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = i.NO_HTTPS, this._supportsWebXR;
    if (!navigator.xr)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = i.NO_WEBXR_API, this._supportsWebXR;
    try {
      const s = await navigator.xr.isSessionSupported("immersive-ar");
      this._supportsWebXR = s, this._supportsWebXR || (this._webXRUnsupportedReason = i.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE);
    } catch {
      this._supportsWebXR = !1, this._webXRUnsupportedReason = i.AR_PERMISSION_DENIED;
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
    const t = window.navigator.userAgent, o = window.navigator.platform, u = window.navigator.vendor, c = "ARQuickLook is not supported";
    throw new A(
      c,
      t,
      o,
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
    const s = window.navigator.userAgent.toLowerCase();
    if (!s.includes("android") || !s.includes("chrome"))
      return !1;
    const t = s.match(/chrome\/(\d+)/);
    return !(!t || parseInt(t[1]) < 89);
  }
  /**
   * @returns A boolean indicating whether the user's device is a mobile device.
   */
  static get isMobile() {
    return this.getSystem() === r.ANDROID || this.getSystem() === r.IOS;
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
  A,
  r as E,
  f as S,
  i as a
};
