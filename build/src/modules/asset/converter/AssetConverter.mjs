var m = Object.defineProperty;
var a = (t, s, e) => s in t ? m(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var o = (t, s, e) => a(t, typeof s != "symbol" ? s + "" : s, e);
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
class n {
  constructor(s, e) {
    o(this, "_uri", "");
    this._loader = s, this._exporter = e;
  }
  convert(s) {
    return this._uri = s, {
      to: this._to.bind(this)
    };
  }
  async _to(s, e) {
    const r = await this._loader.load(this._uri);
    return this._exporter.export(r, s, e);
  }
}
export {
  n as AssetConverter
};
