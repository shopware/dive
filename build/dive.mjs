var G = Object.defineProperty;
var S = (r, s, t) => s in r ? G(r, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[s] = t;
var i = (r, s, t) => S(r, typeof s != "symbol" ? s + "" : s, t);
import { A as b, a as I, b as y } from "./chunks/FileTypes-Cu4s3c_0.mjs";
import { g as nt, f as ot, e as ht, d as lt, l as ct, s as dt, c as _t, x as pt, i as ut, j as gt, k as ft, o as mt, p as Et, m as Dt, q as Mt, u as wt, t as xt, v as bt, r as It, w as yt, n as Pt, E as Ht, F as Vt, G as zt, h as vt, S as Gt, y as St } from "./chunks/FileTypes-Cu4s3c_0.mjs";
import { U as d } from "./chunks/PerspectiveCamera-DUiWJJIj.mjs";
import { C as jt, b as Ot, D as Rt, a as Tt, H as Yt, P as Lt } from "./chunks/PerspectiveCamera-DUiWJJIj.mjs";
import { Object3D as u, Color as P, Vector3 as h, TorusGeometry as H, MeshBasicMaterial as f, Mesh as _, MathUtils as z, Euler as A, CylinderGeometry as m, BoxGeometry as j, PlaneGeometry as D } from "three";
import { g as Xt, i as Nt } from "./chunks/isFileTypeSupported-BSpswPHU.mjs";
import { f as Zt, i as qt } from "./chunks/findInterface-DbJ5qzbc.mjs";
import { F as Ut, N as Wt } from "./chunks/network-error-BONfHWQq.mjs";
import { F as Kt } from "./chunks/file-type-error-aWHfMumr.mjs";
import { P as Jt } from "./chunks/parse-error-IryNa_oq.mjs";
import { i as te, a as ee } from "./chunks/PovSchema-DWWvr_ED.mjs";
class M extends u {
  constructor(t, e, a, n, o) {
    super();
    i(this, "isHoverable", !0);
    i(this, "isDraggable", !0);
    i(this, "parent", null);
    i(this, "axis");
    i(this, "_color", new P(16711935));
    i(this, "_colorHover");
    i(this, "_hovered");
    i(this, "_highlight");
    i(this, "_lineMaterial");
    i(this, "_colliderMesh");
    this.name = "DIVERadialHandle", this.axis = t, this._color.set(o), this._colorHover = this._color.clone().multiplyScalar(2), this._hovered = !1, this._highlight = !1;
    const c = new H(e, 0.01, 13, 48, a);
    this._lineMaterial = new f({
      color: o,
      depthTest: !1,
      depthWrite: !1
    });
    const l = new _(c, this._lineMaterial);
    l.layers.mask = d, l.renderOrder = 1 / 0, this.add(l);
    const g = new H(e, 0.1, 3, 48, a), E = new f({
      color: 16711935,
      transparent: !0,
      opacity: 0.15,
      depthTest: !1,
      depthWrite: !1
    });
    this._colliderMesh = new _(g, E), this._colliderMesh.visible = !1, this._colliderMesh.layers.mask = d, this._colliderMesh.renderOrder = 1 / 0, this.add(this._colliderMesh), this.lookAt(n);
  }
  set debug(t) {
    this._colliderMesh.visible = t;
  }
  get highlight() {
    return this._highlight;
  }
  set highlight(t) {
    this._highlight = t, this._lineMaterial.color = this._highlight || this._hovered ? this._colorHover : this._color;
  }
  get forwardVector() {
    return new h(0, 0, 1).applyQuaternion(this.quaternion).normalize();
  }
  get rightVector() {
    return new h(1, 0, 0).applyQuaternion(this.quaternion).normalize();
  }
  get upVector() {
    return new h(0, 1, 0).applyQuaternion(this.quaternion).normalize();
  }
  reset() {
    this._lineMaterial.color = this._color;
  }
  onPointerEnter() {
    this._hovered = !0, this.parent && this.parent.onHandleHover(this, !0);
  }
  onPointerLeave() {
    this._hovered = !1, this.parent && this.parent.onHandleHover(this, !1);
  }
  onDragStart() {
    this.parent && this.parent.onHandleDragStart(this);
  }
  onDrag(t) {
    this.parent && this.parent.onHandleDrag(this, t);
  }
  onDragEnd() {
    this.parent && this.parent.onHandleDragEnd(this);
  }
}
function p(r, s) {
  const t = (r + "e").split("e");
  return +(t[0] + "e" + (+t[1] + (s || 0)));
}
function O(r, s = 0) {
  const t = p(r, +s);
  return p(Math.ceil(t), -s);
}
function R(r, s = 0) {
  const t = p(r, +s);
  return p(Math.floor(t), -s);
}
function v(r, s = 0) {
  if (r < 0) return -v(-r, s);
  const t = p(r, +s);
  return p(Math.round(t), -s);
}
function T(r, s, t) {
  return Math.atan2(
    r.clone().cross(s).dot(t),
    s.clone().dot(r)
  );
}
function Y(r, s = 0) {
  const t = p(r, +s);
  return p(Math.round(t), -s).toFixed(s);
}
function L(r, s = 0) {
  const t = p(r, +s);
  return p(Math.trunc(t), -s);
}
function C(r) {
  return (z.radToDeg(r) + 360) % 360;
}
function X(r) {
  return z.degToRad(r);
}
const N = {
  ceilExp: O,
  floorExp: R,
  roundExp: v,
  toFixedExp: Y,
  truncateExp: L,
  signedAngleTo: T,
  radToDeg: C,
  degToRad: X
};
class F extends u {
  constructor(t) {
    super();
    i(this, "children");
    i(this, "_controller");
    i(this, "_startRot");
    this.name = "DIVERotateGizmo", this.children = [], this._startRot = null, this._controller = t, this.add(
      new M(
        "x",
        1,
        Math.PI / 2,
        new h(1, 0, 0),
        b
      )
    ), this.add(
      new M(
        "y",
        1,
        -Math.PI / 2,
        new h(0, 1, 0),
        I
      )
    ), this.add(
      new M(
        "z",
        1,
        Math.PI / 2,
        new h(0, 0, 1),
        y
      )
    );
  }
  set debug(t) {
    this.children.forEach((e) => {
      e.debug = t;
    });
  }
  reset() {
    this.children.forEach((t) => {
      t.reset();
    });
  }
  handleHighlight(t, e, a) {
    this.children.forEach((n) => {
      a ? n.highlight = n.axis === t && a : n.highlight = n.axis === t && e;
    });
  }
  onHandleHover(t, e) {
    this._startRot || this.parent && this.parent.parent && (this.parent.parent.onHover("rotate", t.axis, e), this.handleHighlight(t.axis, e, !1));
  }
  onHandleDragStart(t) {
    if (!this.parent || !this.parent.parent) return;
    const e = this.parent.parent.object;
    e && (this._startRot = e.rotation.clone(), this.handleHighlight(t.axis, !0, !0));
  }
  onHandleDrag(t, e) {
    if (!this._startRot || !this.parent || !this.parent.parent || !("onChange" in this.parent.parent)) return;
    const a = e.dragCurrent.clone().sub(this.parent.parent.position).normalize(), n = e.dragStart.clone().sub(this.parent.parent.position).normalize(), o = N.signedAngleTo(
      n,
      a,
      t.forwardVector
    ), c = new A(
      this._startRot.x + t.forwardVector.x * o,
      this._startRot.y + t.forwardVector.y * o,
      this._startRot.z + t.forwardVector.z * o
    );
    this.parent.parent.onChange(void 0, c);
  }
  onHandleDragEnd(t) {
    this._startRot = null, this.handleHighlight(t.axis, !1, !1);
  }
}
class w extends u {
  constructor(t, e, a, n) {
    super();
    i(this, "isHoverable", !0);
    i(this, "isDraggable", !0);
    i(this, "parent", null);
    i(this, "axis");
    i(this, "_color", new P(16711935));
    i(this, "_colorHover");
    i(this, "_hovered");
    i(this, "_highlight");
    i(this, "_lineMaterial");
    i(this, "_colliderMesh");
    this.name = "DIVEAxisHandle", this.axis = t, this._color.set(n), this._colorHover = this._color.clone().multiplyScalar(2), this._highlight = !1, this._hovered = !1;
    const o = new m(0.01, 0.01, e, 13);
    this._lineMaterial = new f({
      color: n,
      depthTest: !1,
      depthWrite: !1
    });
    const c = new _(o, this._lineMaterial);
    c.layers.mask = d, c.renderOrder = 1 / 0, c.rotateX(Math.PI / 2), c.translateY(e / 2), this.add(c);
    const l = new m(0.1, 0.1, e, 3), g = new f({
      color: 16711935,
      transparent: !0,
      opacity: 0.15,
      depthTest: !1,
      depthWrite: !1
    });
    this._colliderMesh = new _(l, g), this._colliderMesh.visible = !1, this._colliderMesh.layers.mask = d, this._colliderMesh.renderOrder = 1 / 0, this._colliderMesh.rotateX(Math.PI / 2), this._colliderMesh.translateY(e / 2), this.add(this._colliderMesh), this.rotateX(a.y * -Math.PI / 2), this.rotateY(a.x * Math.PI / 2);
  }
  set debug(t) {
    this._colliderMesh.visible = t;
  }
  get highlight() {
    return this._highlight;
  }
  set highlight(t) {
    this._highlight = t, this._lineMaterial.color = this._highlight || this._hovered ? this._colorHover : this._color;
  }
  get forwardVector() {
    return new h(0, 0, 1).applyQuaternion(this.quaternion).normalize();
  }
  get rightVector() {
    return new h(1, 0, 0).applyQuaternion(this.quaternion).normalize();
  }
  get upVector() {
    return new h(0, 1, 0).applyQuaternion(this.quaternion).normalize();
  }
  reset() {
    this._lineMaterial.color = this._color;
  }
  onPointerEnter() {
    this._hovered = !0, this.parent && this.parent.onHandleHover(this, !0);
  }
  onPointerLeave() {
    this._hovered = !1, this.parent && this.parent.onHandleHover(this, !1);
  }
  onDragStart() {
    this.parent && this.parent.onHandleDragStart(this);
  }
  onDrag(t) {
    this.parent && this.parent.onHandleDrag(this, t);
  }
  onDragEnd() {
    this.parent && this.parent.onHandleDragEnd(this);
  }
}
class Z extends u {
  constructor(t) {
    super();
    i(this, "_controller");
    i(this, "children");
    i(this, "_startPos");
    this.name = "DIVETranslateGizmo", this.children = [], this._startPos = null, this._controller = t, this.add(
      new w("x", 1, new h(1, 0, 0), b)
    ), this.add(
      new w("y", 1, new h(0, 1, 0), I)
    ), this.add(
      new w("z", 1, new h(0, 0, 1), y)
    );
  }
  set debug(t) {
    this.children.forEach((e) => {
      e.debug = t;
    });
  }
  reset() {
    this.children.forEach((t) => {
      t.reset();
    });
  }
  handleHighlight(t, e, a) {
    this.children.forEach((n) => {
      a ? n.highlight = n.axis === t && a : n.highlight = n.axis === t && e;
    });
  }
  onHandleHover(t, e) {
    this._startPos || this.parent && this.parent.parent && (this.parent.parent.onHover(
      "translate",
      t.axis,
      e
    ), this.handleHighlight(t.axis, e, !1));
  }
  onHandleDragStart(t) {
    if (!this.parent || !this.parent.parent) return;
    const e = this.parent.parent.object;
    e && (this._startPos = e.position.clone(), this.handleHighlight(t.axis, !0, !0));
  }
  onHandleDrag(t, e) {
    if (!this._startPos || !this.parent || !this.parent.parent || !("onChange" in this.parent.parent)) return;
    const a = e.dragDelta.clone().projectOnVector(t.forwardVector);
    this.parent.parent.onChange(
      this._startPos.clone().add(a)
    );
  }
  onHandleDragEnd(t) {
    this._startPos = null, this.handleHighlight(t.axis, !1, !1);
  }
}
class x extends u {
  constructor(t, e, a, n, o = 0.05) {
    super();
    i(this, "isHoverable", !0);
    i(this, "isDraggable", !0);
    i(this, "parent", null);
    i(this, "axis");
    i(this, "_color", new P(16711935));
    i(this, "_colorHover");
    i(this, "_hovered");
    i(this, "_highlight");
    i(this, "_lineMaterial");
    i(this, "_colliderMesh");
    i(this, "_box");
    i(this, "_boxSize");
    this.name = "DIVEScaleHandle", this.axis = t, this._color.set(n), this._colorHover = this._color.clone().multiplyScalar(2), this._hovered = !1, this._highlight = !1, this._boxSize = o;
    const c = new m(
      0.01,
      0.01,
      e - o / 2,
      13
    );
    this._lineMaterial = new f({
      color: n,
      depthTest: !1,
      depthWrite: !1
    });
    const l = new _(c, this._lineMaterial);
    l.layers.mask = d, l.renderOrder = 1 / 0, l.rotateX(Math.PI / 2), l.translateY(e / 2 - o / 4), this.add(l), this._box = new _(
      new j(o, o, o),
      this._lineMaterial
    ), this._box.layers.mask = d, this._box.renderOrder = 1 / 0, this._box.rotateX(Math.PI / 2), this._box.translateY(e - o / 2), this._box.rotateZ(a.x * Math.PI / 2), this._box.rotateX(a.z * Math.PI / 2), this.add(this._box);
    const g = new m(
      0.1,
      0.1,
      e + o / 2,
      3
    ), E = new f({
      color: 16711935,
      transparent: !0,
      opacity: 0.15,
      depthTest: !1,
      depthWrite: !1
    });
    this._colliderMesh = new _(g, E), this._colliderMesh.visible = !1, this._colliderMesh.layers.mask = d, this._colliderMesh.renderOrder = 1 / 0, this._colliderMesh.rotateX(Math.PI / 2), this._colliderMesh.translateY(e / 2), this.add(this._colliderMesh), this.rotateX(a.y * -Math.PI / 2), this.rotateY(a.x * Math.PI / 2);
  }
  set debug(t) {
    this._colliderMesh.visible = t;
  }
  get highlight() {
    return this._highlight;
  }
  set highlight(t) {
    this._highlight = t, this._lineMaterial.color = this._highlight || this._hovered ? this._colorHover : this._color;
  }
  get forwardVector() {
    return new h(0, 0, 1).applyQuaternion(this.quaternion).normalize();
  }
  get rightVector() {
    return new h(1, 0, 0).applyQuaternion(this.quaternion).normalize();
  }
  get upVector() {
    return new h(0, 1, 0).applyQuaternion(this.quaternion).normalize();
  }
  reset() {
    this._lineMaterial.color = this._color;
  }
  update(t) {
    this._box.scale.copy(
      new h(1, 1, 1).sub(this.forwardVector).add(
        // to then add ...
        t.clone().multiply(this.forwardVector)
        // that is scaled by the forward vector again to get the forward vector as the only direction
      )
    );
  }
  onPointerEnter() {
    this._hovered = !0, this.parent && this.parent.onHoverAxis(this, !0);
  }
  onPointerLeave() {
    this._hovered = !1, this.parent && this.parent.onHoverAxis(this, !1);
  }
  onDragStart() {
    this.parent && this.parent.onAxisDragStart(this);
  }
  onDrag(t) {
    this.parent && this.parent.onAxisDrag(this, t);
  }
  onDragEnd() {
    this.parent && this.parent.onAxisDragEnd(this);
  }
}
class q extends u {
  constructor(t) {
    super();
    i(this, "isHoverable", !0);
    i(this, "children");
    i(this, "_controller");
    i(this, "_startScale");
    this.name = "DIVEScaleGizmo", this.children = [], this._startScale = null, this._controller = t, this.add(
      new x("x", 1, new h(1, 0, 0), b)
    ), this.add(
      new x("y", 1, new h(0, 1, 0), I)
    ), this.add(
      new x("z", 1, new h(0, 0, 1), y)
    );
  }
  set debug(t) {
    this.children.forEach((e) => {
      e.debug = t;
    });
  }
  reset() {
    this.children.forEach((t) => {
      t.reset();
    });
  }
  update(t) {
    this.children.forEach((e) => {
      e.update(t);
    });
  }
  handleHighlight(t, e, a) {
    this.children.forEach((n) => {
      a ? n.highlight = n.axis === t && a : n.highlight = n.axis === t && e;
    });
  }
  onHoverAxis(t, e) {
    this._startScale || this.parent && this.parent.parent && (this.parent.parent.onHover(
      "translate",
      t.axis,
      e
    ), this.handleHighlight(t.axis, e, !1));
  }
  onAxisDragStart(t) {
    if (!this.parent || !this.parent.parent) return;
    const e = this.parent.parent.object;
    e && (this._startScale = e.scale.clone(), this.handleHighlight(t.axis, !0, !0));
  }
  onAxisDrag(t, e) {
    if (!this._startScale || !this.parent || !this.parent.parent || !("onChange" in this.parent.parent)) return;
    const a = e.dragDelta.clone().projectOnVector(t.forwardVector);
    this.parent.parent.onChange(
      void 0,
      void 0,
      this._startScale.clone().add(a)
    );
  }
  onAxisDragEnd(t) {
    this._startScale = null, this.handleHighlight(t.axis, !1, !1);
  }
}
class Q extends u {
  constructor() {
    super();
    i(this, "_meshX");
    i(this, "_meshY");
    i(this, "_meshZ");
    this.name = "DIVEGizmoPlane";
    const t = new f({
      transparent: !0,
      opacity: 0.15,
      depthTest: !1,
      depthWrite: !1,
      side: 2
    }), e = new D(100, 100, 2, 2), a = t.clone();
    a.color.set(16711680), this._meshX = new _(e, a), this._meshX.layers.mask = d, this._meshX.rotateY(Math.PI / 2);
    const n = new D(100, 100, 2, 2), o = t.clone();
    o.color.set(65280), this._meshY = new _(n, o), this._meshY.layers.mask = d, this._meshY.rotateX(-Math.PI / 2);
    const c = new D(100, 100, 2, 2), l = t.clone();
    l.color.set(255), this._meshZ = new _(c, l), this._meshZ.layers.mask = d;
  }
  get XPlane() {
    return this._meshX;
  }
  get YPlane() {
    return this._meshY;
  }
  get ZPlane() {
    return this._meshZ;
  }
  assemble(t, e) {
    if (this.clear(), t === "translate" || t === "scale")
      switch (e) {
        case "x":
          this.add(this._meshY), this.add(this._meshZ);
          break;
        case "y":
          this.add(this._meshX), this.add(this._meshZ);
          break;
        case "z":
          this.add(this._meshX), this.add(this._meshY);
          break;
      }
    else if (t === "rotate")
      switch (e) {
        case "x":
          this.add(this._meshX);
          break;
        case "y":
          this.add(this._meshY);
          break;
        case "z":
          this.add(this._meshZ);
          break;
      }
  }
}
class B extends u {
  constructor(t) {
    super();
    i(this, "_mode");
    i(this, "_gizmoNode");
    i(this, "_translateGizmo");
    i(this, "_rotateGizmo");
    i(this, "_scaleGizmo");
    i(this, "_gizmoPlane");
    // attachment stuff
    i(this, "_object");
    this.name = "DIVEGizmo", t.addEventListener("change", () => {
      const e = t.getDistance() / 2.5;
      this.scale.set(e, e, e);
    }), this._mode = "translate", this._gizmoNode = new u(), this.add(this._gizmoNode), this._translateGizmo = new Z(t), this._rotateGizmo = new F(t), this._scaleGizmo = new q(t), this._gizmoPlane = new Q(), this._gizmoPlane.visible = !1, this._object = null;
  }
  get mode() {
    return this._mode;
  }
  set mode(t) {
    this._mode = t, this.assemble();
  }
  set debug(t) {
    this._translateGizmo.debug = t, this._rotateGizmo.debug = t, this._scaleGizmo.debug = t;
  }
  get gizmoNode() {
    return this._gizmoNode;
  }
  get gizmoPlane() {
    return this._gizmoPlane;
  }
  get object() {
    return this._object;
  }
  attach(t) {
    return this._object = t, this.assemble(), this;
  }
  detach() {
    return this._object = null, this.assemble(), this;
  }
  onHover(t, e, a) {
    a && this._gizmoPlane.assemble(t, e);
  }
  onChange(t, e, a) {
    this.object !== null && (t && (this.position.copy(t), this.object.position.copy(t)), e && this.object.rotation.copy(e), a && (this.object.scale.copy(a), this._scaleGizmo.update(a)));
  }
  assemble() {
    this._gizmoNode.clear(), this._gizmoPlane.clear(), this._translateGizmo.reset(), this._rotateGizmo.reset(), this._scaleGizmo.reset(), this.object !== null && (this._mode === "translate" && this._gizmoNode.add(this._translateGizmo), this._mode === "rotate" && this._gizmoNode.add(this._rotateGizmo), this._mode === "scale" && this._gizmoNode.add(this._scaleGizmo), this.add(this._gizmoPlane));
  }
}
class J {
  constructor() {
    i(this, "isMovable", !0);
  }
}
class $ {
  constructor() {
    i(this, "isSelectable", !0);
  }
}
const V = (r, s) => {
  if (Object.keys(r).length === 0 && Object.keys(s).length === 0)
    return {};
  if (typeof r != "object" || typeof s != "object")
    return s;
  let t = {};
  return Object.keys(s).forEach((e) => {
    if (!Object.keys(r).includes(e)) {
      t = { ...t, [e]: s[e] };
      return;
    }
    if (Array.isArray(s[e])) {
      if (!Array.isArray(r[e])) {
        t = { ...t, [e]: s[e] };
        return;
      }
      const a = r[e], n = s[e];
      if (a.length === 0 && n.length === 0) {
        t = { ...t };
        return;
      }
      if (a.length !== n.length) {
        t = { ...t, [e]: s[e] };
        return;
      }
      const o = [];
      if (n.forEach((c, l) => {
        const g = V(
          a[l],
          n[l]
        );
        Object.keys(g).length && o.push(n[l]);
      }), Object.keys(o).length) {
        t = { ...t, [e]: o };
        return;
      }
      return;
    }
    if (typeof s[e] == "object") {
      if (typeof r[e] != "object") {
        t = { ...t, [e]: s[e] };
        return;
      }
      const a = V(
        r[e],
        s[e]
      );
      if (Object.keys(a).length) {
        t = { ...t, [e]: a };
        return;
      }
    }
    r[e] !== s[e] && (t = { ...t, [e]: s[e] });
  }), t;
};
function tt(r, s) {
  return s.forEach((t) => {
    Object.getOwnPropertyNames(t.prototype).forEach((a) => {
      if (a === "constructor")
        return;
      const n = Object.getOwnPropertyDescriptor(
        t.prototype,
        a
      );
      Object.defineProperty(r.prototype, a, n);
    });
    const e = new t();
    Object.getOwnPropertyNames(e).forEach((a) => {
      const n = Object.getOwnPropertyDescriptor(
        e,
        a
      );
      Object.defineProperty(r.prototype, a, n);
    });
  }), r;
}
function et(r) {
  return r.entityType === "group";
}
function rt(r) {
  return r.entityType === "light";
}
function it(r) {
  return r.entityType === "primitive";
}
export {
  y as AxesColorBlue,
  nt as AxesColorBlueLetter,
  I as AxesColorGreen,
  ot as AxesColorGreenLetter,
  b as AxesColorRed,
  ht as AxesColorRedLetter,
  jt as COORDINATE_LAYER_MASK,
  Ot as DEFAULT_LAYER_MASK,
  lt as DIVE,
  ct as DIVEAmbientLight,
  dt as DIVEClock,
  _t as DIVEDefaultSettings,
  pt as DIVEEngine,
  ut as DIVEFloor,
  B as DIVEGizmo,
  gt as DIVEGrid,
  ft as DIVEGroup,
  N as DIVEMath,
  mt as DIVEModel,
  J as DIVEMovable,
  Et as DIVENode,
  Rt as DIVEPerspectiveCamera,
  Tt as DIVEPerspectiveCameraDefaultSettings,
  Dt as DIVEPointLight,
  Mt as DIVEPrimitive,
  wt as DIVERenderPipeline,
  xt as DIVERenderPipelineDefaultSettings,
  bt as DIVEResizeManager,
  It as DIVERoot,
  yt as DIVEScene,
  Pt as DIVESceneLight,
  $ as DIVESelectable,
  Ht as EngineDefaultSettings,
  Vt as FILE_TYPES,
  Ut as FileContentError,
  Kt as FileTypeError,
  zt as GRID_CENTER_LINE_COLOR,
  vt as GRID_SIDE_LINE_COLOR,
  Yt as HELPER_LAYER_MASK,
  Wt as NetworkError,
  Lt as PRODUCT_LAYER_MASK,
  Jt as ParseError,
  Gt as SUPPORTED_FILE_TYPES,
  d as UI_LAYER_MASK,
  tt as applyMixins,
  Zt as findInterface,
  St as findSceneRecursive,
  Xt as getFileTypeFromUri,
  V as getObjectDelta,
  qt as implementsInterface,
  Nt as isFileTypeSupported,
  et as isGroupSchema,
  rt as isLightSchema,
  te as isModelSchema,
  ee as isPovSchema,
  it as isPrimitiveSchema
};
