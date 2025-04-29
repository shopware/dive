var A = Object.defineProperty;
var E = (n, r, e) => r in n ? A(n, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[r] = e;
var s = (n, r, e) => E(n, typeof r != "symbol" ? r + "" : r, e);
import { PerspectiveCamera as h } from "three";
import { D as L, U as R, H as S, P as c } from "./VisibilityLayerMask-BAKNt1Mg.mjs";
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
const a = {
  fov: 70,
  near: 0.1,
  far: 1e3
}, o = class o extends h {
  constructor(e = a) {
    super(
      e.fov || a.fov,
      1,
      e.near || a.near,
      e.far || a.far
    );
    s(this, "onSetCameraLayer", () => {
    });
    this.layers.mask = o.EDITOR_VIEW_LAYER_MASK;
  }
  onResize(e, t) {
    this.aspect = e / t, this.updateProjectionMatrix();
  }
  setCameraLayer(e) {
    this.layers.mask = e === "LIVE" ? o.LIVE_VIEW_LAYER_MASK : o.EDITOR_VIEW_LAYER_MASK, this.onSetCameraLayer(this.layers.mask);
  }
};
s(o, "EDITOR_VIEW_LAYER_MASK", L | R | S | c), s(o, "LIVE_VIEW_LAYER_MASK", c);
let i = o;
class M {
  constructor(r, e, t) {
    s(this, "_renderer");
    s(this, "_scene");
    s(this, "_controller");
    this._renderer = r, this._scene = e, this._controller = t;
  }
  GenerateMedia(r, e, t, l) {
    const _ = this._controller.object.position.clone(), m = this._controller.object.quaternion.clone();
    this._renderer.onResize(t, l), this._controller.object.onResize(t, l), this._controller.object.position.copy(r), this._controller.target.copy(e), this._controller.update();
    const d = this.DrawCanvas().toDataURL();
    return this._controller.object.position.copy(_), this._controller.object.quaternion.copy(m), d;
  }
  DrawCanvas(r) {
    const e = this._renderer.webglrenderer.domElement;
    r && (this._renderer.webglrenderer.domElement = r), this._controller.object.layers.mask = i.LIVE_VIEW_LAYER_MASK, this._renderer.webglrenderer.render(
      this._scene,
      this._controller.object
    ), this._controller.object.layers.mask = i.EDITOR_VIEW_LAYER_MASK;
    const t = this._renderer.webglrenderer.domElement;
    return r && (this._renderer.webglrenderer.domElement = e), t;
  }
}
export {
  a as D,
  M,
  i as a
};
