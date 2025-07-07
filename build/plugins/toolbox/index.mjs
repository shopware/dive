var i = Object.defineProperty;
var s = (t, e, o) => e in t ? i(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var n = (t, e, o) => s(t, typeof e != "symbol" ? e + "" : e, o);
import { D as l } from "../../chunks/SelectTool-CtH8-rgi.mjs";
import { a as m, c as T, i as d, b as _ } from "../../chunks/SelectTool-CtH8-rgi.mjs";
class r {
  constructor(e, o) {
    n(this, "_scene");
    n(this, "_controller");
    n(this, "_activeTool");
    n(this, "_selectTool");
    this._scene = e, this._controller = o, this._selectTool = null, this._activeTool = null;
  }
  get selectTool() {
    return this._selectTool || (this._selectTool = new l(
      this._scene,
      this._controller
    )), this._selectTool;
  }
  dispose() {
    this.removeEventListeners();
  }
  getActiveTool() {
    return this._activeTool;
  }
  useTool(e) {
    var o;
    switch ((o = this._activeTool) == null || o.deactivate(), e) {
      case "select": {
        this.addEventListeners(), this.selectTool.activate(), this._activeTool = this.selectTool;
        break;
      }
      case "none": {
        this.removeEventListeners(), this._activeTool = null;
        break;
      }
      default:
        console.warn(`DIVEToolBox.useTool: Unknown tool: ${e}`);
    }
  }
  setGizmoMode(e) {
    this.selectTool.setGizmoMode(e);
  }
  setGizmoVisible(e) {
    this.selectTool.setGizmoVisible(e);
  }
  setGizmoScaleLinked(e) {
    this.selectTool.setGizmoScaleLinked(e);
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
n(r, "DefaultTool", "select");
export {
  m as DIVEBaseTool,
  l as DIVESelectTool,
  T as DIVETransformTool,
  r as Toolbox,
  d as isSelectTool,
  _ as isTransformTool
};
