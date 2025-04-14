var h = Object.defineProperty;
var d = (t, e, r) => e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var n = (t, e, r) => d(t, typeof e != "symbol" ? e + "" : e, r);
import { a as i } from "../../../chunks/PerspectiveCamera-ACx6umAu.mjs";
class b {
  constructor(e, r, o) {
    n(this, "renderer");
    n(this, "scene");
    n(this, "controller");
    this.renderer = e, this.scene = r, this.controller = o;
  }
  GenerateMedia(e, r, o, s) {
    const c = this.controller.object.position.clone(), l = this.controller.object.quaternion.clone();
    this.renderer.OnResize(o, s), this.controller.object.OnResize(o, s), this.controller.object.position.copy(e), this.controller.target.copy(r), this.controller.update();
    const a = this.DrawCanvas().toDataURL();
    return this.controller.object.position.copy(c), this.controller.object.quaternion.copy(l), a;
  }
  DrawCanvas(e) {
    const r = this.renderer.domElement;
    e && (this.renderer.domElement = e), this.controller.object.layers.mask = i.LIVE_VIEW_LAYER_MASK, this.renderer.render(this.scene, this.controller.object), this.controller.object.layers.mask = i.EDITOR_VIEW_LAYER_MASK;
    const o = this.renderer.domElement;
    return e && (this.renderer.domElement = r), o;
  }
}
export {
  b as MediaCreator
};
//# sourceMappingURL=MediaCreator.mjs.map
