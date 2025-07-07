var a = Object.defineProperty;
var d = (t, e, r) => e in t ? a(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var n = (t, e, r) => d(t, typeof e != "symbol" ? e + "" : e, r);
import { D as i } from "../../chunks/PerspectiveCamera-PMJPzAn3.mjs";
class m {
  constructor(e, r, o) {
    n(this, "_renderer");
    n(this, "_scene");
    n(this, "_controller");
    this._renderer = e, this._scene = r, this._controller = o;
  }
  generateMedia(e, r, o, s) {
    const c = this._controller.object.position.clone(), l = this._controller.object.quaternion.clone();
    this._renderer.onResize(o, s), this._controller.object.onResize(o, s), this._controller.object.position.copy(e), this._controller.target.copy(r), this._controller.update();
    const _ = this.drawCanvas().toDataURL();
    return this._controller.object.position.copy(c), this._controller.object.quaternion.copy(l), _;
  }
  drawCanvas(e) {
    const r = this._renderer.webglrenderer.domElement;
    e && (this._renderer.webglrenderer.domElement = e), this._controller.object.layers.mask = i.LIVE_VIEW_LAYER_MASK, this._renderer.webglrenderer.render(
      this._scene,
      this._controller.object
    ), this._controller.object.layers.mask = i.EDITOR_VIEW_LAYER_MASK;
    const o = this._renderer.webglrenderer.domElement;
    return e && (this._renderer.webglrenderer.domElement = r), o;
  }
}
export {
  m as MediaCreator
};
