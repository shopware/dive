var P = Object.defineProperty;
var R = (r, i, n) => i in r ? P(r, i, { enumerable: !0, configurable: !0, writable: !0, value: n }) : r[i] = n;
var I = (r, i, n) => R(r, typeof i != "symbol" ? i + "" : i, n);
class A extends Error {
  constructor(n, a, d, E) {
    var S;
    const o = a.match(
      /(Chrome|Safari|Firefox|Edge)\/(\d+\.\d+)/
    ), O = o ? o[1] : "Unknown", s = o ? o[2] : "Unknown", _ = a.match(/\((.*?)\)/), N = _ ? _[1] : "Unknown", t = ((S = N.match(/OS (\d+_\d+)/)) == null ? void 0 : S[1]) || "Unknown", c = l(N);
    let e = n;
    (c === "iOS" || c === "iPadOS") && (O !== "Safari" ? e += ` ARQuickLook is only supported in Safari browser. Current browser: ${O} ${s}` : parseFloat(t.replace("_", ".")) < 13 && (e += ` ARQuickLook requires iOS/iPadOS 13.0 or later. Current version: ${t}`));
    super(e);
    I(this, "browserInfo");
    this.name = "ARCompatibilityError", this.browserInfo = {
      userAgent: a,
      platform: d,
      vendor: E,
      browser: O,
      version: s,
      os: c,
      osVersion: t
    };
  }
}
function l(r) {
  return r.includes("iPhone") ? "iOS" : r.includes("iPad") ? "iPadOS" : r.includes("Macintosh") ? "macOS" : "Unknown";
}
var u = /* @__PURE__ */ ((r) => (r.IOS = "iOS", r.ANDROID = "Android", r.WINDOWS = "Windows", r.MACOS = "MacOS", r.LINUX = "Linux", r.UNKNOWN = "Unknown", r))(u || {}), w = /* @__PURE__ */ ((r) => (r.NO_WEBXR_API = "NO_WEBXR_API", r.NO_HTTPS = "NO_HTTPS", r.IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE = "IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE", r.AR_PERMISSION_DENIED = "AR_PERMISSION_DENIED", r.UNKNOWN_ERROR = "UNKNOWN_ERROR", r))(w || {});
export {
  A,
  u as E,
  w as a
};
