var m = Object.defineProperty;
var u = (s, e, t) => e in s ? m(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var c = (s, e, t) => u(s, typeof e != "symbol" ? e + "" : e, t);
import { S as l, E as i, A as d } from "../../../chunks/SystemInfo-BME6iEuf.mjs";
import { AssetConverter as S } from "../asset/converter/AssetConverter.mjs";
import { A as h } from "../../../chunks/AssetLoader-oPgCU9ZZ.mjs";
import { AssetExporter as y } from "../asset/exporter/AssetExporter.mjs";
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
class w {
  constructor() {
    c(this, "converter", new S(
      new h(),
      new y()
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
class p {
  launch(e, t) {
    const r = self.location.toString(), n = document.createElement("a"), o = this._createParams(r, e, t), a = this._createIntent(r, e, o);
    n.setAttribute("href", a), n.click();
  }
  /**
   * Creates the base URL parameters for SceneViewer
   * @param location Current page location URL
   * @returns URLSearchParams with base configuration
   */
  _createParams(e, t, r) {
    const n = new URL(t, e), o = new URLSearchParams(n.search);
    return o.set("mode", "ar_preferred"), this._applyScaleOption(o, r), this._applyPlacementOption(o, r), this._applySoundOption(o, e), this._applyLinkOption(o, e), o;
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
    const n = new URL(e), o = new URL(t, e), a = "#model-viewer-no-ar-fallback";
    return n.hash = a, `intent://arvr.google.com/scene-viewer/1.2?${r.toString() + "&file=" + o.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      n.toString()
    )};end;`;
  }
}
class _ {
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
    return r === i.IOS ? this.tryARQuickLook(e, t) : r === i.ANDROID ? this.trySceneViewer(e, t) : Promise.reject(
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
    return new w().launch(e, t);
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
      return new p().launch(e, t);
    } catch (r) {
      return Promise.reject(r);
    }
  }
}
export {
  _ as ARSystem
};
