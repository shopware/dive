var h = Object.defineProperty;
var R = (n, t, e) => t in n ? h(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => R(n, typeof t != "symbol" ? t + "" : t, e);
import { PerspectiveCamera as L } from "three";
const d = 1, p = 2, M = 4, m = 8, i = 16, a = {
  fov: 70,
  near: 0.1,
  far: 1e3
}, s = class s extends L {
  constructor(e = a) {
    super(
      e.fov || a.fov,
      1,
      e.near || a.near,
      e.far || a.far
    );
    o(this, "onSetCameraLayer", () => {
    });
    this.layers.mask = s.EDITOR_VIEW_LAYER_MASK;
  }
  onResize(e, r) {
    this.aspect = e / r, this.updateProjectionMatrix();
  }
  setCameraLayer(e) {
    this.layers.mask = e === "LIVE" ? s.LIVE_VIEW_LAYER_MASK : s.EDITOR_VIEW_LAYER_MASK, this.onSetCameraLayer(this.layers.mask);
  }
};
o(s, "EDITOR_VIEW_LAYER_MASK", d | M | m | i), o(s, "LIVE_VIEW_LAYER_MASK", i);
let _ = s;
class y {
  constructor(t, e, r) {
    o(this, "_renderer");
    o(this, "_scene");
    o(this, "_controller");
    this._renderer = t, this._scene = e, this._controller = r;
  }
  GenerateMedia(t, e, r, c) {
    const l = this._controller.object.position.clone(), E = this._controller.object.quaternion.clone();
    this._renderer.onResize(r, c), this._controller.object.onResize(r, c), this._controller.object.position.copy(t), this._controller.target.copy(e), this._controller.update();
    const A = this.DrawCanvas().toDataURL();
    return this._controller.object.position.copy(l), this._controller.object.quaternion.copy(E), A;
  }
  DrawCanvas(t) {
    const e = this._renderer.domElement;
    t && (this._renderer.domElement = t), this._controller.object.layers.mask = _.LIVE_VIEW_LAYER_MASK, this._renderer.render(this._scene, this._controller.object), this._controller.object.layers.mask = _.EDITOR_VIEW_LAYER_MASK;
    const r = this._renderer.domElement;
    return t && (this._renderer.domElement = e), r;
  }
}
export {
  p as C,
  a as D,
  m as H,
  y as M,
  i as P,
  M as U,
  _ as a
};
//# sourceMappingURL=MediaCreator-CAXBbn15.mjs.map
