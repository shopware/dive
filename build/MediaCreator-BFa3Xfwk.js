import { D as n } from "./dive-Dk0rFfvA.js";
class h {
  constructor(e, t, r) {
    this.renderer = e, this.scene = t, this.controller = r;
  }
  GenerateMedia(e, t, r, o) {
    const s = this.controller.object.position.clone(), i = this.controller.object.quaternion.clone();
    this.renderer.OnResize(r, o), this.controller.object.OnResize(r, o), this.controller.object.position.copy(e), this.controller.target.copy(t), this.controller.update();
    const c = this.DrawCanvas().toDataURL();
    return this.controller.object.position.copy(s), this.controller.object.quaternion.copy(i), c;
  }
  DrawCanvas(e) {
    const t = this.renderer.domElement;
    e && (this.renderer.domElement = e), this.controller.object.layers.mask = n.LIVE_VIEW_LAYER_MASK, this.renderer.render(this.scene, this.controller.object), this.controller.object.layers.mask = n.EDITOR_VIEW_LAYER_MASK;
    const r = this.renderer.domElement;
    return e && (this.renderer.domElement = t), r;
  }
}
export {
  h as DIVEMediaCreator
};
//# sourceMappingURL=MediaCreator-BFa3Xfwk.js.map
