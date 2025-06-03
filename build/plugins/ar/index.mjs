var p = Object.defineProperty;
var d = (o, e, r) => e in o ? p(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r;
var l = (o, e, r) => d(o, typeof e != "symbol" ? e + "" : e, r);
import { SystemInfo as s, EBrowser as h, ESystem as u } from "../systeminfo/index.mjs";
import { AssetConverter as f } from "../assetconverter/index.mjs";
import { A as w } from "../../chunks/AssetLoader-Dqrg0Re8.mjs";
import { A as S } from "../../chunks/AssetExporter-QnOue3VT.mjs";
class a extends Error {
  constructor(r, t) {
    super(r);
    l(this, "type");
    this.name = this.constructor.name, this.type = t, Object.setPrototypeOf(this, new.target.prototype);
  }
}
class R extends a {
  constructor() {
    super(
      "AR features are not supported on desktop platforms.",
      "ar-desktop-platform-error"
    );
  }
}
class A extends a {
  constructor() {
    super(
      "ARQuickLook on iOS is only available in Safari.",
      "ar-not-safari-on-ios-error"
    );
  }
}
class g extends a {
  constructor(e, r) {
    super(
      `ARQuickLook requires iOS version ${r} or later. Current version: ${e}.`,
      "ar-ios-version-too-low-error"
    ), this.currentVersion = e, this.requiredVersion = r;
  }
}
class m extends a {
  constructor() {
    super(
      "An unknown ARQuickLook compatibility error occurred.",
      "ar-quicklook-unknown-error"
      // Updated type to be more specific
    );
  }
}
const k = 12;
class y {
  constructor() {
    l(this, "converter", new f(
      new w(),
      new S()
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
    if (s.getBrowser() !== h.SAFARI)
      return Promise.reject(new A());
    const t = s.getIOSVersion();
    if (t && t.major < k)
      return Promise.reject(
        new g(
          t.full,
          k
        )
      );
    if (!t)
      return Promise.reject(new m());
    if (!s.getSupportsARQuickLook())
      return Promise.reject(new m());
    const n = await this.convertToUSDZ(e, r);
    return this.launchARQuickLook(n, r);
  }
  async convertToUSDZ(e, r) {
    const t = await this.converter.convert(e).to("usdz", {
      quickLookCompatible: !0,
      ar: {
        anchoring: { type: "plane" },
        planeAnchoring: {
          alignment: (r == null ? void 0 : r.arPlacement) === "vertical" ? "vertical" : "horizontal"
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
class L {
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
    const t = self.location.toString(), n = document.createElement("a"), c = this._createParams(t, e, r), i = this._createIntent(t, e, c);
    n.setAttribute("href", i), n.click();
  }
  /**
   * Creates the base URL parameters for SceneViewer
   * @param location Current page location URL
   * @returns URLSearchParams with base configuration
   */
  _createParams(e, r, t) {
    const n = new URL(r, e), c = new URLSearchParams(n.search);
    return c.set("mode", "ar_preferred"), this._applyScaleOption(c, t), this._applyPlacementOption(c, t), this._applySoundOption(c, e), this._applyLinkOption(c, e), c;
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
    const n = new URL(e), c = new URL(r, e), i = "#model-viewer-no-ar-fallback";
    return n.hash = i, `intent://arvr.google.com/scene-viewer/1.2?${t.toString() + "&file=" + c.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      n.toString()
    )};end;`;
  }
}
class P {
  /**
   * Launches an AR experience using the appropriate platform-specific implementation
   *
   * @param uri - The URI of the 3D model to display in AR
   * @param options - Optional configuration for the AR experience
   * @returns Promise that resolves when AR is launched successfully
   * @throws Error if AR is not supported on the current platform
   */
  async launch(e, r) {
    const t = s.getSystem();
    return t === u.IOS ? new y().launch(e, r) : t === u.ANDROID ? new L().launch(e, r) : Promise.reject(new R());
  }
}
export {
  R as ARDesktopPlatformError,
  a as ARError,
  y as ARQuickLook,
  A as ARQuickLookNotSafariError,
  m as ARQuickLookUnknownError,
  g as ARQuickLookVersionMismatchError,
  P as ARSystem,
  L as SceneViewer
};
