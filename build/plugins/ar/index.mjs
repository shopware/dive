var p = Object.defineProperty;
var R = (o, e, r) => e in o ? p(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r;
var l = (o, e, r) => R(o, typeof e != "symbol" ? e + "" : e, r);
import { SystemInfo as c, EBrowser as d, ESystem as u } from "../systeminfo/index.mjs";
import { AssetConverter as h } from "../assetconverter/index.mjs";
import { A as _ } from "../../chunks/AssetLoader-DJKZltSW.mjs";
import { A as f } from "../../chunks/AssetExporter-brT7ogoM.mjs";
var S = /* @__PURE__ */ ((o) => (o.AR_DESKTOP_PLATFORM_ERROR = "ar-desktop-platform-error", o.AR_QUICK_LOOK_NOT_SAFARI_ERROR = "ar-quicklook-not-safari-error", o.AR_QUICK_LOOK_VERSION_MISMATCH_ERROR = "ar-quicklook-version-mismatch-error", o.AR_QUICK_LOOK_UNKNOWN_ERROR = "ar-quicklook-unknown-error", o))(S || {});
class a extends Error {
  constructor(r, t) {
    super(r);
    l(this, "type");
    this.name = this.constructor.name, this.type = t, Object.setPrototypeOf(this, new.target.prototype);
  }
}
class O extends a {
  constructor() {
    super(
      "AR features are not supported on desktop platforms.",
      "ar-desktop-platform-error"
      /* AR_DESKTOP_PLATFORM_ERROR */
    );
  }
}
class w extends a {
  constructor() {
    super(
      "ARQuickLook on iOS is only available in Safari.",
      "ar-quicklook-not-safari-error"
      /* AR_QUICK_LOOK_NOT_SAFARI_ERROR */
    );
  }
}
class A extends a {
  constructor(e, r) {
    super(
      `ARQuickLook requires iOS version ${r} or later. Current version: ${e}.`,
      "ar-quicklook-version-mismatch-error"
      /* AR_QUICK_LOOK_VERSION_MISMATCH_ERROR */
    ), this.currentVersion = e, this.requiredVersion = r;
  }
}
class k extends a {
  constructor() {
    super(
      "An unknown ARQuickLook compatibility error occurred.",
      "ar-quicklook-unknown-error"
      /* AR_QUICK_LOOK_UNKNOWN_ERROR */
    );
  }
}
const m = 12;
class L {
  constructor() {
    l(this, "converter", new h(
      new _(),
      new f()
    ));
  }
  /**
   * Launches AR using ARQuickLook (iOS-specific implementation)
   *
   * @param uri - The URI of the 3D model to display in AR
   * @param options - Optional configuration for the AR experience
   * @returns Promise that resolves when ARQuickLook is launched successfully
   * @throws Error if ARQuickLook is not supported on the device
   */
  async launch(e, r) {
    if (c.getBrowser() !== d.SAFARI)
      return Promise.reject(new w());
    const t = c.getIOSVersion();
    if (t && t.major < m)
      return Promise.reject(
        new A(
          t.full,
          m
        )
      );
    if (!t)
      return Promise.reject(new k());
    if (!c.getSupportsARQuickLook())
      return Promise.reject(new k());
    const n = await this.convertToUSDZ(e, r);
    return this.launchARQuickLook(n, r);
  }
  async convertToUSDZ(e, r) {
    const t = await this.converter.convert(e).to("usdz", {
      quickLookCompatible: !0,
      ar: {
        anchoring: { type: "plane" },
        planeAnchoring: {
          alignment: "horizontal"
        }
      }
    }), n = new Blob([t], { type: "model/vnd.usdz+zip" });
    return URL.createObjectURL(n);
  }
  launchARQuickLook(e, r) {
    return new Promise((t) => {
      (r == null ? void 0 : r.arScale) === "fixed" && (e = e.concat("#allowsContentScaling=0"));
      const n = document.createElement("a");
      n.innerHTML = "<picture></picture>", n.rel = "ar", n.href = e, n.download = "scene.usdz", t(), n.click();
    });
  }
}
class g {
  /**
   * Launches AR using SceneViewer (Android-specific implementation)
   * Note: SceneViewer is supported on all Android devices. If ARCore is not installed,
   * the model will be displayed in 3D view mode instead of AR mode.
   *
   * @param uri - The URI of the 3D model to display in AR
   * @param options - Optional configuration for the AR experience
   * @returns Promise that resolves when SceneViewer is launched successfully
   * @throws Error if there's an issue launching SceneViewer
   */
  launch(e, r) {
    const t = self.location.toString(), n = document.createElement("a"), s = this._createParams(t, e, r), i = this._createIntent(t, e, s);
    n.setAttribute("href", i), n.click();
  }
  /**
   * Creates the base URL parameters for SceneViewer
   * @param location Current page location URL
   * @returns URLSearchParams with base configuration
   */
  _createParams(e, r, t) {
    const n = new URL(r, e), s = new URLSearchParams(n.search);
    return s.set("mode", "ar_preferred"), this._applyScaleOption(s, t), this._applyPlacementOption(s, t), this._applySoundOption(s, e), this._applyLinkOption(s, e), s;
  }
  /**
   * Applies the scale option to the parameters
   * If scale is set to 'fixed', the model will not be resizable in AR
   * @param params URLSearchParams to modify
   */
  _applyScaleOption(e, r) {
    (r == null ? void 0 : r.arScale) === "fixed" && e.set("resizable", "false");
  }
  /**
   * Applies the placement option to the parameters
   * If placement is set to 'vertical', vertical placement will be enabled
   * @param params URLSearchParams to modify
   */
  _applyPlacementOption(e, r) {
    (r == null ? void 0 : r.arPlacement) === "vertical" && e.set("enable_vertical_placement", "true");
  }
  /**
   * Applies the sound option to the parameters if present
   * This will resolve any relative sound URLs to absolute URLs
   * @param params URLSearchParams to modify
   * @param location Current page location URL
   */
  _applySoundOption(e, r) {
    if (e.has("sound")) {
      const t = new URL(e.get("sound"), r);
      e.set("sound", t.toString());
    }
  }
  /**
   * Applies the link option to the parameters if present
   * This will resolve any relative link URLs to absolute URLs
   * @param params URLSearchParams to modify
   * @param location Current page location URL
   */
  _applyLinkOption(e, r) {
    if (e.has("link")) {
      const t = new URL(e.get("link"), r);
      e.set("link", t.toString());
    }
  }
  /**
   * Creates the Android Intent URL for SceneViewer
   * @param params URLSearchParams containing all configuration
   * @param location Current page location URL
   * @returns The complete Intent URL
   */
  _createIntent(e, r, t) {
    const n = new URL(e), s = new URL(r, e), i = "#model-viewer-no-ar-fallback";
    return n.hash = i, `intent://arvr.google.com/scene-viewer/1.2?${t.toString() + "&file=" + s.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      n.toString()
    )};end;`;
  }
}
class b {
  /**
   * Launches an AR experience using the appropriate platform-specific implementation
   *
   * @param uri - The URI of the 3D model to display in AR
   * @param options - Optional configuration for the AR experience
   * @returns Promise that resolves when AR is launched successfully
   * @throws Error if AR is not supported on the current platform
   */
  async launch(e, r) {
    const t = c.getSystem();
    return t === u.IOS ? new L().launch(e, r) : t === u.ANDROID ? new g().launch(e, r) : Promise.reject(new O());
  }
}
export {
  O as ARDesktopPlatformError,
  a as ARError,
  L as ARQuickLook,
  w as ARQuickLookNotSafariError,
  k as ARQuickLookUnknownError,
  A as ARQuickLookVersionMismatchError,
  b as ARSystem,
  S as EARErrorType,
  g as SceneViewer
};
