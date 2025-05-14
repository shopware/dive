var u = Object.defineProperty;
var m = (c, e, t) => e in c ? u(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var i = (c, e, t) => m(c, typeof e != "symbol" ? e + "" : e, t);
import { SystemInfo as l } from "../systeminfo/SystemInfo.mjs";
import { E as s, A as d } from "../../../chunks/index-C7Wx_9uY.mjs";
import { AssetConverter as h } from "../asset/converter/AssetConverter.mjs";
import { AssetLoader as w } from "../asset/loader/AssetLoader.mjs";
import { AssetExporter as p } from "../asset/exporter/AssetExporter.mjs";
class y {
  constructor() {
    i(this, "converter", new h(
      new w(),
      new p()
    ));
  }
  async launch(e, t) {
    const r = await this.convertToUSDZ(e, t);
    return this.launchARQuickLook(r, t);
  }
  async convertToUSDZ(e, t) {
    const r = await this.converter.convert(e).to("usdz", {
      quickLookCompatible: !0,
      ar: {
        anchoring: { type: "plane" },
        planeAnchoring: {
          alignment: (t == null ? void 0 : t.arPlacement) === "vertical" ? "vertical" : "horizontal"
        }
      }
    }), n = new Blob([r], { type: "model/vnd.usdz+zip" });
    return URL.createObjectURL(n);
  }
  launchARQuickLook(e, t) {
    return new Promise((r) => {
      (t == null ? void 0 : t.arScale) === "fixed" && (e = e.concat("#allowsContentScaling=0"));
      const n = document.createElement("a");
      n.innerHTML = "<picture></picture>", n.rel = "ar", n.href = e, n.download = "scene.usdz", r(), n.click();
    });
  }
}
class S {
  launch(e, t) {
    const r = self.location.toString(), n = document.createElement("a"), a = this._createParams(r, e, t), o = this._createIntent(r, e, a);
    n.setAttribute("href", o), n.click();
  }
  /**
   * Creates the base URL parameters for SceneViewer
   * @param location Current page location URL
   * @returns URLSearchParams with base configuration
   */
  _createParams(e, t, r) {
    const n = new URL(t, e), a = new URLSearchParams(n.search);
    return a.set("mode", "ar_preferred"), this._applyScaleOption(a, r), this._applyPlacementOption(a, r), this._applySoundOption(a, e), this._applyLinkOption(a, e), a;
  }
  /**
   * Applies the scale option to the parameters
   * If scale is set to 'fixed', the model will not be resizable in AR
   * @param params URLSearchParams to modify
   */
  _applyScaleOption(e, t) {
    (t == null ? void 0 : t.arScale) === "fixed" && e.set("resizable", "false");
  }
  /**
   * Applies the placement option to the parameters
   * If placement is set to 'vertical', vertical placement will be enabled
   * @param params URLSearchParams to modify
   */
  _applyPlacementOption(e, t) {
    (t == null ? void 0 : t.arPlacement) === "vertical" && e.set("enable_vertical_placement", "true");
  }
  /**
   * Applies the sound option to the parameters if present
   * This will resolve any relative sound URLs to absolute URLs
   * @param params URLSearchParams to modify
   * @param location Current page location URL
   */
  _applySoundOption(e, t) {
    if (e.has("sound")) {
      const r = new URL(e.get("sound"), t);
      e.set("sound", r.toString());
    }
  }
  /**
   * Applies the link option to the parameters if present
   * This will resolve any relative link URLs to absolute URLs
   * @param params URLSearchParams to modify
   * @param location Current page location URL
   */
  _applyLinkOption(e, t) {
    if (e.has("link")) {
      const r = new URL(e.get("link"), t);
      e.set("link", r.toString());
    }
  }
  /**
   * Creates the Android Intent URL for SceneViewer
   * @param params URLSearchParams containing all configuration
   * @param location Current page location URL
   * @returns The complete Intent URL
   */
  _createIntent(e, t, r) {
    const n = new URL(e), a = new URL(t, e), o = "#model-viewer-no-ar-fallback";
    return n.hash = o, `intent://arvr.google.com/scene-viewer/1.2?${r.toString() + "&file=" + a.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      n.toString()
    )};end;`;
  }
}
class A {
  /**
   * Launches an AR experience using the appropriate platform-specific implementation
   *
   * @param uri - The URI of the 3D model to display in AR
   * @param options - Optional configuration for the AR experience
   * @returns Promise that resolves when AR is launched successfully
   * @throws Error if AR is not supported on the current platform
   */
  async launch(e, t) {
    const r = l.getSystem();
    return r === s.IOS ? this.tryARQuickLook(e, t) : r === s.ANDROID ? this.trySceneViewer(e, t) : Promise.reject(
      new d(
        "AR not supported on non-mobile systems",
        window.navigator.userAgent,
        window.navigator.platform,
        window.navigator.vendor
      )
    );
  }
  /**
   * Attempts to launch AR using ARQuickLook (iOS-specific implementation)
   *
   * @param uri - The URI of the 3D model to display in AR
   * @param options - Optional configuration for the AR experience
   * @returns Promise that resolves when ARQuickLook is launched successfully
   * @throws Error if ARQuickLook is not supported on the device
   */
  async tryARQuickLook(e, t) {
    try {
      l.getSupportsARQuickLook();
    } catch (r) {
      return Promise.reject(r);
    }
    return new y().launch(e, t);
  }
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
  async trySceneViewer(e, t) {
    try {
      return new S().launch(e, t);
    } catch (r) {
      return Promise.reject(r);
    }
  }
}
export {
  A as ARSystem
};
