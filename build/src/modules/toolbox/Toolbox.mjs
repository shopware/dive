var i = Object.defineProperty;
var n = (t, e, o) => e in t ? i(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var s = (t, e, o) => n(t, typeof e != "symbol" ? e + "" : e, o);
import { D as l } from "../../../chunks/SelectTool-BqLz-UL1.mjs";
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
class r {
  constructor(e, o) {
    s(this, "_scene");
    s(this, "_controller");
    s(this, "_activeTool");
    s(this, "_selectTool");
    this._scene = e, this._controller = o, this._selectTool = null, this._activeTool = null;
  }
  get selectTool() {
    return this._selectTool || (this._selectTool = new l(
      this._scene,
      this._controller
    )), this._selectTool;
  }
  Dispose() {
    this.removeEventListeners();
  }
  GetActiveTool() {
    return this._activeTool;
  }
  UseTool(e) {
    var o;
    switch ((o = this._activeTool) == null || o.Deactivate(), e) {
      case "select": {
        this.addEventListeners(), this.selectTool.Activate(), this._activeTool = this.selectTool;
        break;
      }
      case "none": {
        this.removeEventListeners(), this._activeTool = null;
        break;
      }
      default:
        console.warn(`DIVEToolBox.UseTool: Unknown tool: ${e}`);
    }
  }
  SetGizmoMode(e) {
    this.selectTool.SetGizmoMode(e);
  }
  SetGizmoVisibility(e) {
    this.selectTool.SetGizmoVisibility(e);
  }
  SetGizmoScaleLinked(e) {
    this.selectTool.SetGizmoScaleLinked(e);
  }
  onPointerMove(e) {
    var o;
    (o = this._activeTool) == null || o.onPointerMove(e);
  }
  onPointerDown(e) {
    var o;
    (o = this._activeTool) == null || o.onPointerDown(e);
  }
  onPointerUp(e) {
    var o;
    (o = this._activeTool) == null || o.onPointerUp(e);
  }
  onWheel(e) {
    var o;
    (o = this._activeTool) == null || o.onWheel(e);
  }
  addEventListeners() {
    this._controller.domElement.addEventListener(
      "pointermove",
      (e) => this.onPointerMove(e)
    ), this._controller.domElement.addEventListener(
      "pointerdown",
      (e) => this.onPointerDown(e)
    ), this._controller.domElement.addEventListener(
      "pointerup",
      (e) => this.onPointerUp(e)
    ), this._controller.domElement.addEventListener(
      "wheel",
      (e) => this.onWheel(e)
    );
  }
  removeEventListeners() {
    this._controller.domElement.removeEventListener(
      "pointermove",
      (e) => this.onPointerMove(e)
    ), this._controller.domElement.removeEventListener(
      "pointerdown",
      (e) => this.onPointerDown(e)
    ), this._controller.domElement.removeEventListener(
      "pointerup",
      (e) => this.onPointerUp(e)
    ), this._controller.domElement.removeEventListener(
      "wheel",
      (e) => this.onWheel(e)
    );
  }
}
s(r, "DefaultTool", "select");
export {
  r as Toolbox
};
