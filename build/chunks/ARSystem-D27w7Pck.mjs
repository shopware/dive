var d = Object.defineProperty;
var k = (o, e, r) => e in o ? d(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r;
var l = (o, e, r) => k(o, typeof e != "symbol" ? e + "" : e, r);
import { SystemInfo as s, EBrowser as f } from "../modules/systeminfo/index.mjs";
import { E as u } from "./index-C_uFFwT2.mjs";
import { AssetConverter as h } from "./AssetConverter-D-qOTLs1.mjs";
import { AssetLoader as S } from "./AssetLoader-BewzFwHi.mjs";
import { AssetExporter as w } from "./AssetExporter-ClYQ4gnb.mjs";
class c extends Error {
  constructor(r, t) {
    super(r);
    l(this, "type");
    this.name = this.constructor.name, this.type = t, Object.setPrototypeOf(this, new.target.prototype);
  }
}
class R extends c {
  constructor() {
    super(
      "AR features are not supported on desktop platforms.",
      "ar-desktop-platform-error"
    );
  }
}
class g extends c {
  constructor() {
    super(
      "ARQuickLook on iOS is only available in Safari.",
      "ar-not-safari-on-ios-error"
    );
  }
}
class y extends c {
  constructor(e, r) {
    super(
      `ARQuickLook requires iOS version ${r} or later. Current version: ${e}.`,
      "ar-ios-version-too-low-error"
    ), this.currentVersion = e, this.requiredVersion = r;
  }
}
class m extends c {
  constructor() {
    super(
      "An unknown ARQuickLook compatibility error occurred.",
      "ar-quicklook-unknown-error"
      // Updated type to be more specific
    );
  }
}
const p = 12;
class A {
  constructor() {
    l(this, "converter", new h(
      new S(),
      new w()
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
    if (s.getBrowser() !== f.SAFARI)
      return Promise.reject(new g());
    const t = s.getIOSVersion();
    if (t && t.major < p)
      return Promise.reject(
        new y(
          t.full,
          p
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
class _ {
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
    const t = self.location.toString(), n = document.createElement("a"), a = this._createParams(t, e, r), i = this._createIntent(t, e, a);
    n.setAttribute("href", i), n.click();
  }
  /**
   * Creates the base URL parameters for SceneViewer
   * @param location Current page location URL
   * @returns URLSearchParams with base configuration
   */
  _createParams(e, r, t) {
    const n = new URL(r, e), a = new URLSearchParams(n.search);
    return a.set("mode", "ar_preferred"), this._applyScaleOption(a, t), this._applyPlacementOption(a, t), this._applySoundOption(a, e), this._applyLinkOption(a, e), a;
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
    const n = new URL(e), a = new URL(r, e), i = "#model-viewer-no-ar-fallback";
    return n.hash = i, `intent://arvr.google.com/scene-viewer/1.2?${t.toString() + "&file=" + a.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      n.toString()
    )};end;`;
  }
}
class L {
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
    return t === u.IOS ? new A().launch(e, r) : t === u.ANDROID ? new _().launch(e, r) : Promise.reject(new R());
  }
}
const I = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ARSystem: L
}, Symbol.toStringTag, { value: "Module" }));
export {
  L as A,
  _ as S,
  A as a,
  c as b,
  R as c,
  g as d,
  y as e,
  m as f,
  I as g
};
