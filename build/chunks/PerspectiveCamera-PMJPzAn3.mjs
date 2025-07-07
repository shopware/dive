var o = Object.defineProperty;
var R = (t, s, a) => s in t ? o(t, s, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[s] = a;
var e = (t, s, a) => R(t, typeof s != "symbol" ? s + "" : s, a);
import { PerspectiveCamera as S } from "three";
import { D as i, U as I, H as M, P as A } from "./VisibilityLayerMask-CXgt1fJc.mjs";
const E = {
  fov: 70,
  near: 0.1,
  far: 1e3
}, r = class r extends S {
  constructor(a = E) {
    super(
      a.fov || E.fov,
      1,
      a.near || E.near,
      a.far || E.far
    );
    e(this, "onSetCameraLayer", () => {
    });
    this.layers.mask = r.EDITOR_VIEW_LAYER_MASK;
  }
  onResize(a, L) {
    this.aspect = a / L, this.updateProjectionMatrix();
  }
  setCameraLayer(a) {
    this.layers.mask = a === "LIVE" ? r.LIVE_VIEW_LAYER_MASK : r.EDITOR_VIEW_LAYER_MASK, this.onSetCameraLayer(this.layers.mask);
  }
};
e(r, "EDITOR_VIEW_LAYER_MASK", i | I | M | A), e(r, "LIVE_VIEW_LAYER_MASK", A);
let _ = r;
export {
  _ as D,
  E as a
};
