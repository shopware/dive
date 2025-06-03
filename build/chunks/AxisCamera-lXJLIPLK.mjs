var x = Object.defineProperty;
var c = (s, r, e) => r in s ? x(s, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[r] = e;
var t = (s, r, e) => c(s, typeof r != "symbol" ? r + "" : r, e);
import { OrthographicCamera as m, Vector4 as _, AxesHelper as w, Color as l, Matrix4 as C } from "three";
import h from "three-spritetext";
import { C as a } from "./VisibilityLayerMask-CXgt1fJc.mjs";
import { A as g, a as u, b as A, c as H, d as b, e as k } from "./AxisHelperColors-JLBHYQDi.mjs";
class L extends m {
  constructor(e, d, p) {
    super(-1, 1, 1, -1, 0.1, 100);
    t(this, "axesHelper");
    t(this, "_renderer");
    t(this, "_scene");
    t(this, "_camera");
    t(this, "_restoreViewport", new _());
    this.layers.mask = a, this.axesHelper = new w(0.5), this.axesHelper.layers.mask = a, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new l(g),
      new l(u),
      new l(A)
    );
    const o = new h("X", 0.2, H), i = new h("Y", 0.2, b), n = new h("Z", 0.2, k);
    o.layers.mask = a, i.layers.mask = a, n.layers.mask = a, o.position.set(0.7, 0, 0), i.position.set(0, 0.7, 0), n.position.set(0, 0, 0.7), this.axesHelper.add(o), this.axesHelper.add(i), this.axesHelper.add(n), this.add(this.axesHelper), this._renderer = e, this._scene = d, this._camera = p, this._scene.add(this);
  }
  tick() {
    const e = this._scene.background;
    this._scene.background = null, this._renderer.webglrenderer.getViewport(this._restoreViewport), this._renderer.webglrenderer.setViewport(0, 0, 150, 150), this._renderer.webglrenderer.autoClear = !1, this.setFromCameraMatrix(this._camera.matrix), this._renderer.webglrenderer.render(this._scene, this), this._renderer.webglrenderer.setViewport(this._restoreViewport), this._renderer.webglrenderer.autoClear = !0, this._scene.background = e;
  }
  dispose() {
    this._scene.remove(this);
  }
  setFromCameraMatrix(e) {
    this.axesHelper.rotation.setFromRotationMatrix(
      new C().extractRotation(e).invert()
    );
  }
}
export {
  L as D
};
