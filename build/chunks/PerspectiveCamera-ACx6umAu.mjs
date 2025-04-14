var L = Object.defineProperty;
var R = (E, s, a) => s in E ? L(E, s, { enumerable: !0, configurable: !0, writable: !0, value: a }) : E[s] = a;
var A = (E, s, a) => R(E, typeof s != "symbol" ? s + "" : s, a);
import { PerspectiveCamera as n } from "three";
const S = 1, K = 2, c = 4, I = 8, r = 16, e = {
  fov: 70,
  near: 0.1,
  far: 1e3
}, t = class t extends n {
  constructor(a = e) {
    super(
      a.fov || e.fov,
      1,
      a.near || e.near,
      a.far || e.far
    );
    A(this, "onSetCameraLayer", () => {
    });
    this.layers.mask = t.EDITOR_VIEW_LAYER_MASK;
  }
  OnResize(a, o) {
    this.aspect = a / o, this.updateProjectionMatrix();
  }
  SetCameraLayer(a) {
    this.layers.mask = a === "LIVE" ? t.LIVE_VIEW_LAYER_MASK : t.EDITOR_VIEW_LAYER_MASK, this.onSetCameraLayer(this.layers.mask);
  }
};
A(t, "EDITOR_VIEW_LAYER_MASK", S | c | I | r), A(t, "LIVE_VIEW_LAYER_MASK", r);
let _ = t;
export {
  K as C,
  e as D,
  I as H,
  r as P,
  c as U,
  _ as a
};
//# sourceMappingURL=PerspectiveCamera-ACx6umAu.mjs.map
