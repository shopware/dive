var _ = Object.defineProperty;
var g = (t, e, s) => e in t ? _(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var i = (t, e, s) => g(t, typeof e != "symbol" ? e + "" : e, s);
import { E as r, a } from "./index-C_uFFwT2.mjs";
class m extends Error {
  constructor(s, o, u, p) {
    var S;
    const n = o.match(
      /(Chrome|Safari|Firefox|Edge)\/(\d+\.\d+)/
    ), c = n ? n[1] : "Unknown", l = n ? n[2] : "Unknown", f = o.match(/\((.*?)\)/), h = f ? f[1] : "Unknown", d = ((S = h.match(/OS (\d+_\d+)/)) == null ? void 0 : S[1]) || "Unknown", w = X(h);
    let R = s;
    (w === "iOS" || w === "iPadOS") && (c !== "Safari" ? R += ` ARQuickLook is only supported in Safari browser. Current browser: ${c} ${l}` : parseFloat(d.replace("_", ".")) < 13 && (R += ` ARQuickLook requires iOS/iPadOS 13.0 or later. Current version: ${d}`));
    super(R);
    i(this, "browserInfo");
    this.name = "ARCompatibilityError", this.browserInfo = {
      userAgent: o,
      platform: u,
      vendor: p,
      browser: c,
      version: l,
      os: w,
      osVersion: d
    };
  }
}
function X(t) {
  return t.includes("iPhone") ? "iOS" : t.includes("iPad") ? "iPadOS" : t.includes("Macintosh") ? "macOS" : "Unknown";
}
class b {
  /**
   * Gets the current system (iOS, Android, Windows, etc.)
   * @returns DIVESystem The current system
   */
  static getSystem() {
    if (typeof window > "u" || !window.navigator)
      return r.UNKNOWN;
    const e = window.navigator.userAgent.toLowerCase();
    return e.includes("iphone") || e.includes("ipad") ? r.IOS : e.includes("android") ? r.ANDROID : e.includes("windows") ? r.WINDOWS : e.includes("macintosh") ? r.MACOS : e.includes("linux") ? r.LINUX : r.UNKNOWN;
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
   */
  static async getSupportsWebXR() {
    if (this._supportsWebXR !== !1)
      return this._supportsWebXR;
    if (!window.isSecureContext)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = a.NO_HTTPS, this._supportsWebXR;
    if (!navigator.xr)
      return this._supportsWebXR = !1, this._webXRUnsupportedReason = a.NO_WEBXR_API, this._supportsWebXR;
    try {
      const e = await navigator.xr.isSessionSupported("immersive-ar");
      this._supportsWebXR = e, this._supportsWebXR || (this._webXRUnsupportedReason = a.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE);
    } catch {
      this._supportsWebXR = !1, this._webXRUnsupportedReason = a.AR_PERMISSION_DENIED;
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
    const s = window.navigator.userAgent, o = window.navigator.platform, u = window.navigator.vendor, p = "ARQuickLook is not supported";
    throw new m(
      p,
      s,
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
    const e = window.navigator.userAgent.toLowerCase();
    if (!e.includes("android") || !e.includes("chrome"))
      return !1;
    const s = e.match(/chrome\/(\d+)/);
    return !(!s || parseInt(s[1]) < 89);
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
i(b, "_supportsWebXR", !1), i(b, "_webXRUnsupportedReason", null);
export {
  m as A,
  b as S
};
