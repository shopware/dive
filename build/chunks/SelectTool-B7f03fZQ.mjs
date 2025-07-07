var jt = Object.defineProperty;
var Xt = (r, i, t) => i in r ? jt(r, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[i] = t;
var c = (r, i, t) => Xt(r, typeof i != "symbol" ? i + "" : i, t);
import { A as lt, b as ht, c as ct } from "./FileTypes-C38YFZQa.mjs";
import { Object3D as st, Vector3 as a, Quaternion as E, Raycaster as bt, MeshBasicMaterial as St, LineBasicMaterial as Yt, CylinderGeometry as w, BoxGeometry as f, BufferGeometry as dt, Float32BufferAttribute as pt, Mesh as o, OctahedronGeometry as B, Line as I, TorusGeometry as C, SphereGeometry as Qt, Euler as Zt, Matrix4 as vt, PlaneGeometry as Ht, DoubleSide as Ot, Vector2 as tt } from "three";
import { f as ot, i as et } from "./findInterface-DbJ5qzbc.mjs";
import { P as Ct, U as kt } from "./VisibilityLayerMask-CXgt1fJc.mjs";
const j = new bt(), u = new a(), T = new a(), d = new E(), ut = {
  X: new a(1, 0, 0),
  Y: new a(0, 1, 0),
  Z: new a(0, 0, 1)
}, it = { type: "change" }, mt = { type: "mouseDown" }, ft = { type: "mouseUp", mode: null }, _t = { type: "objectChange" };
class Lt extends st {
  constructor(i, t) {
    super(), t === void 0 && (console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'), t = document), this.isTransformControls = !0, this.visible = !1, this.domElement = t, this.domElement.style.touchAction = "none";
    const n = new Ut();
    this._gizmo = n, this.add(n);
    const s = new Vt();
    this._plane = s, this.add(s);
    const l = this;
    function e(m, b) {
      let Q = b;
      Object.defineProperty(l, m, {
        get: function() {
          return Q !== void 0 ? Q : b;
        },
        set: function(A) {
          Q !== A && (Q = A, s[m] = A, n[m] = A, l.dispatchEvent({ type: m + "-changed", value: A }), l.dispatchEvent(it));
        }
      }), l[m] = b, s[m] = b, n[m] = b;
    }
    e("camera", i), e("object", void 0), e("enabled", !0), e("axis", null), e("mode", "translate"), e("translationSnap", null), e("rotationSnap", null), e("scaleSnap", null), e("space", "world"), e("size", 1), e("dragging", !1), e("showX", !0), e("showY", !0), e("showZ", !0);
    const p = new a(), g = new a(), z = new E(), Y = new E(), H = new a(), O = new E(), at = new a(), q = new a(), M = new a(), x = 0, v = new a();
    e("worldPosition", p), e("worldPositionStart", g), e("worldQuaternion", z), e("worldQuaternionStart", Y), e("cameraPosition", H), e("cameraQuaternion", O), e("pointStart", at), e("pointEnd", q), e("rotationAxis", M), e("rotationAngle", x), e("eye", v), this._offset = new a(), this._startNorm = new a(), this._endNorm = new a(), this._cameraScale = new a(), this._parentPosition = new a(), this._parentQuaternion = new E(), this._parentQuaternionInv = new E(), this._parentScale = new a(), this._worldScaleStart = new a(), this._worldQuaternionInv = new E(), this._worldScale = new a(), this._positionStart = new a(), this._quaternionStart = new E(), this._scaleStart = new a(), this._getPointer = Rt.bind(this), this._onPointerDown = qt.bind(this), this._onPointerHover = Gt.bind(this), this._onPointerMove = Wt.bind(this), this._onPointerUp = Ft.bind(this), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(i) {
    this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this._parentPosition, this._parentQuaternion, this._parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this._worldScale), this._parentQuaternionInv.copy(this._parentQuaternion).invert(), this._worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this._cameraScale), this.camera.isOrthographicCamera ? this.camera.getWorldDirection(this.eye).negate() : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld(i);
  }
  pointerHover(i) {
    if (this.object === void 0 || this.dragging === !0) return;
    i !== null && j.setFromCamera(i, this.camera);
    const t = nt(this._gizmo.picker[this.mode], j);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(i) {
    if (!(this.object === void 0 || this.dragging === !0 || i != null && i.button !== 0) && this.axis !== null) {
      i !== null && j.setFromCamera(i, this.camera);
      const t = nt(this._plane, j, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, mt.mode = this.mode, this.dispatchEvent(mt);
    }
  }
  pointerMove(i) {
    const t = this.axis, n = this.mode, s = this.object;
    let l = this.space;
    if (n === "scale" ? l = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (l = "world"), s === void 0 || t === null || this.dragging === !1 || i !== null && i.button !== -1) return;
    i !== null && j.setFromCamera(i, this.camera);
    const e = nt(this._plane, j, !0);
    if (e) {
      if (this.pointEnd.copy(e.point).sub(this.worldPositionStart), n === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), l === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), l === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), s.position.copy(this._offset).add(this._positionStart), this.translationSnap && (l === "local" && (s.position.applyQuaternion(d.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (s.position.x = Math.round(s.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (s.position.y = Math.round(s.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (s.position.z = Math.round(s.position.z / this.translationSnap) * this.translationSnap), s.position.applyQuaternion(this._quaternionStart)), l === "world" && (s.parent && s.position.add(u.setFromMatrixPosition(s.parent.matrixWorld)), t.search("X") !== -1 && (s.position.x = Math.round(s.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (s.position.y = Math.round(s.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (s.position.z = Math.round(s.position.z / this.translationSnap) * this.translationSnap), s.parent && s.position.sub(u.setFromMatrixPosition(s.parent.matrixWorld))));
      else if (n === "scale") {
        if (t.search("XYZ") !== -1) {
          let p = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (p *= -1), T.set(p, p, p);
        } else
          u.copy(this.pointStart), T.copy(this.pointEnd), u.applyQuaternion(this._worldQuaternionInv), T.applyQuaternion(this._worldQuaternionInv), T.divide(u), t.search("X") === -1 && (T.x = 1), t.search("Y") === -1 && (T.y = 1), t.search("Z") === -1 && (T.z = 1);
        s.scale.copy(this._scaleStart).multiply(T), this.scaleSnap && (t.search("X") !== -1 && (s.scale.x = Math.round(s.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (s.scale.y = Math.round(s.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (s.scale.z = Math.round(s.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (n === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const p = 20 / this.worldPosition.distanceTo(u.setFromMatrixPosition(this.camera.matrixWorld));
        let g = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(u.copy(this.rotationAxis).cross(this.eye)) * p) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(ut[t]), u.copy(ut[t]), l === "local" && u.applyQuaternion(this.worldQuaternion), u.cross(this.eye), u.length() === 0 ? g = !0 : this.rotationAngle = this._offset.dot(u.normalize()) * p), (t === "E" || g) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), l === "local" && t !== "E" && t !== "XYZE" ? (s.quaternion.copy(this._quaternionStart), s.quaternion.multiply(d.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), s.quaternion.copy(d.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), s.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(it), this.dispatchEvent(_t);
    }
  }
  pointerUp(i) {
    i !== null && i.button !== 0 || (this.dragging && this.axis !== null && (ft.mode = this.mode, this.dispatchEvent(ft)), this.dragging = !1, this.axis = null);
  }
  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.traverse(function(i) {
      i.geometry && i.geometry.dispose(), i.material && i.material.dispose();
    });
  }
  // Set current object
  attach(i) {
    return this.object = i, this.visible = !0, this;
  }
  // Detach from object
  detach() {
    return this.object = void 0, this.visible = !1, this.axis = null, this;
  }
  reset() {
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(it), this.dispatchEvent(_t), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return j;
  }
  // TODO: deprecate
  getMode() {
    return this.mode;
  }
  setMode(i) {
    this.mode = i;
  }
  setTranslationSnap(i) {
    this.translationSnap = i;
  }
  setRotationSnap(i) {
    this.rotationSnap = i;
  }
  setScaleSnap(i) {
    this.scaleSnap = i;
  }
  setSize(i) {
    this.size = i;
  }
  setSpace(i) {
    this.space = i;
  }
}
function Rt(r) {
  if (this.domElement.ownerDocument.pointerLockElement)
    return {
      x: 0,
      y: 0,
      button: r.button
    };
  {
    const i = this.domElement.getBoundingClientRect();
    return {
      x: (r.clientX - i.left) / i.width * 2 - 1,
      y: -(r.clientY - i.top) / i.height * 2 + 1,
      button: r.button
    };
  }
}
function Gt(r) {
  if (this.enabled)
    switch (r.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(r));
        break;
    }
}
function qt(r) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(r.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(r)), this.pointerDown(this._getPointer(r)));
}
function Wt(r) {
  this.enabled && this.pointerMove(this._getPointer(r));
}
function Ft(r) {
  this.enabled && (this.domElement.releasePointerCapture(r.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(r)));
}
function nt(r, i, t) {
  const n = i.intersectObject(r, !0);
  for (let s = 0; s < n.length; s++)
    if (n[s].object.visible || t)
      return n[s];
  return !1;
}
const N = new Zt(), h = new a(0, 1, 0), wt = new a(0, 0, 0), gt = new vt(), K = new E(), $ = new E(), P = new a(), yt = new vt(), R = new a(1, 0, 0), X = new a(0, 1, 0), G = new a(0, 0, 1), J = new a(), k = new a(), L = new a();
class Ut extends st {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const i = new St({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new Yt({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), n = i.clone();
    n.opacity = 0.15;
    const s = t.clone();
    s.opacity = 0.5;
    const l = i.clone();
    l.color.setHex(16711680);
    const e = i.clone();
    e.color.setHex(65280);
    const p = i.clone();
    p.color.setHex(255);
    const g = i.clone();
    g.color.setHex(16711680), g.opacity = 0.5;
    const z = i.clone();
    z.color.setHex(65280), z.opacity = 0.5;
    const Y = i.clone();
    Y.color.setHex(255), Y.opacity = 0.5;
    const H = i.clone();
    H.opacity = 0.25;
    const O = i.clone();
    O.color.setHex(16776960), O.opacity = 0.25, i.clone().color.setHex(16776960);
    const q = i.clone();
    q.color.setHex(7895160);
    const M = new w(0, 0.04, 0.1, 12);
    M.translate(0, 0.05, 0);
    const x = new f(0.08, 0.08, 0.08);
    x.translate(0, 0.04, 0);
    const v = new dt();
    v.setAttribute("position", new pt([0, 0, 0, 1, 0, 0], 3));
    const m = new w(75e-4, 75e-4, 0.5, 3);
    m.translate(0, 0.25, 0);
    function b(y, W) {
      const S = new C(y, 75e-4, 3, 64, W * Math.PI * 2);
      return S.rotateY(Math.PI / 2), S.rotateX(Math.PI / 2), S;
    }
    function Q() {
      const y = new dt();
      return y.setAttribute("position", new pt([0, 0, 0, 1, 1, 1], 3)), y;
    }
    const A = {
      X: [
        [new o(M, l), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new o(M, l), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new o(m, l), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new o(M, e), [0, 0.5, 0]],
        [new o(M, e), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new o(m, e)]
      ],
      Z: [
        [new o(M, p), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new o(M, p), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new o(m, p), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new o(new B(0.1, 0), H.clone()), [0, 0, 0]]
      ],
      XY: [
        [new o(new f(0.15, 0.15, 0.01), Y.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new o(new f(0.15, 0.15, 0.01), g.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new o(new f(0.15, 0.15, 0.01), z.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, Pt = {
      X: [
        [new o(new w(0.2, 0, 0.6, 4), n), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new o(new w(0.2, 0, 0.6, 4), n), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new o(new w(0.2, 0, 0.6, 4), n), [0, 0.3, 0]],
        [new o(new w(0.2, 0, 0.6, 4), n), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new o(new w(0.2, 0, 0.6, 4), n), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new o(new w(0.2, 0, 0.6, 4), n), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new o(new B(0.2, 0), n)]
      ],
      XY: [
        [new o(new f(0.2, 0.2, 0.01), n), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new o(new f(0.2, 0.2, 0.01), n), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new o(new f(0.2, 0.2, 0.01), n), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, Et = {
      START: [
        [new o(new B(0.01, 2), s), null, null, null, "helper"]
      ],
      END: [
        [new o(new B(0.01, 2), s), null, null, null, "helper"]
      ],
      DELTA: [
        [new I(Q(), s), null, null, null, "helper"]
      ],
      X: [
        [new I(v, s.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new I(v, s.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new I(v, s.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, Mt = {
      XYZE: [
        [new o(b(0.5, 1), q), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new o(b(0.5, 0.5), l)]
      ],
      Y: [
        [new o(b(0.5, 0.5), e), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new o(b(0.5, 0.5), p), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new o(b(0.75, 1), O), null, [0, Math.PI / 2, 0]]
      ]
    }, xt = {
      AXIS: [
        [new I(v, s.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, Dt = {
      XYZE: [
        [new o(new Qt(0.25, 10, 8), n)]
      ],
      X: [
        [new o(new C(0.5, 0.1, 4, 24), n), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new o(new C(0.5, 0.1, 4, 24), n), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new o(new C(0.5, 0.1, 4, 24), n), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new o(new C(0.75, 0.1, 2, 24), n)]
      ]
    }, It = {
      X: [
        [new o(x, l), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new o(m, l), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new o(x, l), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new o(x, e), [0, 0.5, 0]],
        [new o(m, e)],
        [new o(x, e), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new o(x, p), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new o(m, p), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new o(x, p), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new o(new f(0.15, 0.15, 0.01), Y), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new o(new f(0.15, 0.15, 0.01), g), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new o(new f(0.15, 0.15, 0.01), z), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new o(new f(0.1, 0.1, 0.1), H.clone())]
      ]
    }, Tt = {
      X: [
        [new o(new w(0.2, 0, 0.6, 4), n), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new o(new w(0.2, 0, 0.6, 4), n), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new o(new w(0.2, 0, 0.6, 4), n), [0, 0.3, 0]],
        [new o(new w(0.2, 0, 0.6, 4), n), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new o(new w(0.2, 0, 0.6, 4), n), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new o(new w(0.2, 0, 0.6, 4), n), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new o(new f(0.2, 0.2, 0.01), n), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new o(new f(0.2, 0.2, 0.01), n), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new o(new f(0.2, 0.2, 0.01), n), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new o(new f(0.2, 0.2, 0.2), n), [0, 0, 0]]
      ]
    }, zt = {
      X: [
        [new I(v, s.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new I(v, s.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new I(v, s.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function D(y) {
      const W = new st();
      for (const S in y)
        for (let Z = y[S].length; Z--; ) {
          const _ = y[S][Z][0].clone(), F = y[S][Z][1], U = y[S][Z][2], V = y[S][Z][3], At = y[S][Z][4];
          _.name = S, _.tag = At, F && _.position.set(F[0], F[1], F[2]), U && _.rotation.set(U[0], U[1], U[2]), V && _.scale.set(V[0], V[1], V[2]), _.updateMatrix();
          const rt = _.geometry.clone();
          rt.applyMatrix4(_.matrix), _.geometry = rt, _.renderOrder = 1 / 0, _.position.set(0, 0, 0), _.rotation.set(0, 0, 0), _.scale.set(1, 1, 1), W.add(_);
        }
      return W;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = D(A)), this.add(this.gizmo.rotate = D(Mt)), this.add(this.gizmo.scale = D(It)), this.add(this.picker.translate = D(Pt)), this.add(this.picker.rotate = D(Dt)), this.add(this.picker.scale = D(Tt)), this.add(this.helper.translate = D(Et)), this.add(this.helper.rotate = D(xt)), this.add(this.helper.scale = D(zt)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(i) {
    const n = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : $;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let s = [];
    s = s.concat(this.picker[this.mode].children), s = s.concat(this.gizmo[this.mode].children), s = s.concat(this.helper[this.mode].children);
    for (let l = 0; l < s.length; l++) {
      const e = s[l];
      e.visible = !0, e.rotation.set(0, 0, 0), e.position.copy(this.worldPosition);
      let p;
      if (this.camera.isOrthographicCamera ? p = (this.camera.top - this.camera.bottom) / this.camera.zoom : p = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), e.scale.set(1, 1, 1).multiplyScalar(p * this.size / 4), e.tag === "helper") {
        e.visible = !1, e.name === "AXIS" ? (e.visible = !!this.axis, this.axis === "X" && (d.setFromEuler(N.set(0, 0, 0)), e.quaternion.copy(n).multiply(d), Math.abs(h.copy(R).applyQuaternion(n).dot(this.eye)) > 0.9 && (e.visible = !1)), this.axis === "Y" && (d.setFromEuler(N.set(0, 0, Math.PI / 2)), e.quaternion.copy(n).multiply(d), Math.abs(h.copy(X).applyQuaternion(n).dot(this.eye)) > 0.9 && (e.visible = !1)), this.axis === "Z" && (d.setFromEuler(N.set(0, Math.PI / 2, 0)), e.quaternion.copy(n).multiply(d), Math.abs(h.copy(G).applyQuaternion(n).dot(this.eye)) > 0.9 && (e.visible = !1)), this.axis === "XYZE" && (d.setFromEuler(N.set(0, Math.PI / 2, 0)), h.copy(this.rotationAxis), e.quaternion.setFromRotationMatrix(gt.lookAt(wt, h, X)), e.quaternion.multiply(d), e.visible = this.dragging), this.axis === "E" && (e.visible = !1)) : e.name === "START" ? (e.position.copy(this.worldPositionStart), e.visible = this.dragging) : e.name === "END" ? (e.position.copy(this.worldPosition), e.visible = this.dragging) : e.name === "DELTA" ? (e.position.copy(this.worldPositionStart), e.quaternion.copy(this.worldQuaternionStart), u.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), u.applyQuaternion(this.worldQuaternionStart.clone().invert()), e.scale.copy(u), e.visible = this.dragging) : (e.quaternion.copy(n), this.dragging ? e.position.copy(this.worldPositionStart) : e.position.copy(this.worldPosition), this.axis && (e.visible = this.axis.search(e.name) !== -1));
        continue;
      }
      e.quaternion.copy(n), this.mode === "translate" || this.mode === "scale" ? (e.name === "X" && Math.abs(h.copy(R).applyQuaternion(n).dot(this.eye)) > 0.99 && (e.scale.set(1e-10, 1e-10, 1e-10), e.visible = !1), e.name === "Y" && Math.abs(h.copy(X).applyQuaternion(n).dot(this.eye)) > 0.99 && (e.scale.set(1e-10, 1e-10, 1e-10), e.visible = !1), e.name === "Z" && Math.abs(h.copy(G).applyQuaternion(n).dot(this.eye)) > 0.99 && (e.scale.set(1e-10, 1e-10, 1e-10), e.visible = !1), e.name === "XY" && Math.abs(h.copy(G).applyQuaternion(n).dot(this.eye)) < 0.2 && (e.scale.set(1e-10, 1e-10, 1e-10), e.visible = !1), e.name === "YZ" && Math.abs(h.copy(R).applyQuaternion(n).dot(this.eye)) < 0.2 && (e.scale.set(1e-10, 1e-10, 1e-10), e.visible = !1), e.name === "XZ" && Math.abs(h.copy(X).applyQuaternion(n).dot(this.eye)) < 0.2 && (e.scale.set(1e-10, 1e-10, 1e-10), e.visible = !1)) : this.mode === "rotate" && (K.copy(n), h.copy(this.eye).applyQuaternion(d.copy(n).invert()), e.name.search("E") !== -1 && e.quaternion.setFromRotationMatrix(gt.lookAt(this.eye, wt, X)), e.name === "X" && (d.setFromAxisAngle(R, Math.atan2(-h.y, h.z)), d.multiplyQuaternions(K, d), e.quaternion.copy(d)), e.name === "Y" && (d.setFromAxisAngle(X, Math.atan2(h.x, h.z)), d.multiplyQuaternions(K, d), e.quaternion.copy(d)), e.name === "Z" && (d.setFromAxisAngle(G, Math.atan2(h.y, h.x)), d.multiplyQuaternions(K, d), e.quaternion.copy(d))), e.visible = e.visible && (e.name.indexOf("X") === -1 || this.showX), e.visible = e.visible && (e.name.indexOf("Y") === -1 || this.showY), e.visible = e.visible && (e.name.indexOf("Z") === -1 || this.showZ), e.visible = e.visible && (e.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), e.material._color = e.material._color || e.material.color.clone(), e.material._opacity = e.material._opacity || e.material.opacity, e.material.color.copy(e.material._color), e.material.opacity = e.material._opacity, this.enabled && this.axis && (e.name === this.axis || this.axis.split("").some(function(g) {
        return e.name === g;
      })) && (e.material.color.setHex(16776960), e.material.opacity = 1);
    }
    super.updateMatrixWorld(i);
  }
}
class Vt extends o {
  constructor() {
    super(
      new Ht(1e5, 1e5, 2, 2),
      new St({ visible: !1, wireframe: !0, side: Ot, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(i) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), J.copy(R).applyQuaternion(t === "local" ? this.worldQuaternion : $), k.copy(X).applyQuaternion(t === "local" ? this.worldQuaternion : $), L.copy(G).applyQuaternion(t === "local" ? this.worldQuaternion : $), h.copy(k), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            h.copy(this.eye).cross(J), P.copy(J).cross(h);
            break;
          case "Y":
            h.copy(this.eye).cross(k), P.copy(k).cross(h);
            break;
          case "Z":
            h.copy(this.eye).cross(L), P.copy(L).cross(h);
            break;
          case "XY":
            P.copy(L);
            break;
          case "YZ":
            P.copy(J);
            break;
          case "XZ":
            h.copy(L), P.copy(k);
            break;
          case "XYZ":
          case "E":
            P.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        P.set(0, 0, 0);
    }
    P.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (yt.lookAt(u.set(0, 0, 0), P, h), this.quaternion.setFromRotationMatrix(yt)), super.updateMatrixWorld(i);
  }
}
class Bt {
  constructor(i, t) {
    c(this, "POINTER_DRAG_THRESHOLD", 1e-3);
    c(this, "name");
    c(this, "_canvas");
    c(this, "_scene");
    c(this, "_controller");
    // general pointer members
    c(this, "_pointer");
    c(this, "_pointerPrimaryDown");
    c(this, "_pointerMiddleDown");
    c(this, "_pointerSecondaryDown");
    c(this, "_lastPointerDown");
    c(this, "_lastPointerUp");
    // raycast members
    c(this, "_raycaster");
    c(this, "_intersects");
    // hovering members
    c(this, "_hovered");
    // dragging members
    c(this, "_dragging");
    c(this, "_dragStart");
    c(this, "_dragCurrent");
    c(this, "_dragEnd");
    c(this, "_dragDelta");
    c(this, "_draggable");
    c(this, "_dragRaycastOnObjects");
    this.name = "BaseTool", this._canvas = t.domElement, this._scene = i, this._controller = t, this._pointer = new tt(), this._pointerPrimaryDown = !1, this._pointerMiddleDown = !1, this._pointerSecondaryDown = !1, this._lastPointerDown = new tt(), this._lastPointerUp = new tt(), this._raycaster = new bt(), this._raycaster.layers.mask = Ct | kt, this._intersects = [], this._hovered = null, this._dragging = !1, this._dragStart = new a(), this._dragCurrent = new a(), this._dragEnd = new a(), this._dragDelta = new a(), this._draggable = null, this._dragRaycastOnObjects = null;
  }
  get _pointerAnyDown() {
    return this._pointerPrimaryDown || this._pointerMiddleDown || this._pointerSecondaryDown;
  }
  activate() {
  }
  deactivate() {
  }
  onPointerDown(i) {
    var t;
    switch (i.button) {
      case 0: {
        this._pointerPrimaryDown = !0;
        break;
      }
      case 1: {
        this._pointerMiddleDown = !0;
        break;
      }
      case 2: {
        this._pointerSecondaryDown = !0;
        break;
      }
      default:
        console.warn(
          "DIVEBaseTool.onPointerDown: Unknown button: " + i.button
        );
    }
    this._lastPointerDown.copy(this._pointer), this._draggable = ot(
      (t = this._intersects[0]) == null ? void 0 : t.object,
      "isDraggable"
    ) || null;
  }
  onDragStart(i) {
    this._draggable && (this._dragRaycastOnObjects !== null && (this._intersects = this._raycaster.intersectObjects(
      this._dragRaycastOnObjects,
      !0
    )), this._intersects.length !== 0 && (this._dragStart.copy(this._intersects[0].point.clone()), this._dragCurrent.copy(this._intersects[0].point.clone()), this._dragEnd.copy(this._dragStart.clone()), this._dragDelta.set(0, 0, 0), this._draggable && this._draggable.onDragStart && (this._draggable.onDragStart({
      dragStart: this._dragStart,
      dragCurrent: this._dragCurrent,
      dragEnd: this._dragEnd,
      dragDelta: this._dragDelta
    }), this._dragging = !0, this._controller.enabled = !1)));
  }
  onPointerMove(i) {
    var n;
    this._pointer.x = i.offsetX / this._canvas.clientWidth * 2 - 1, this._pointer.y = -(i.offsetY / this._canvas.clientHeight) * 2 + 1, this._raycaster.setFromCamera(this._pointer, this._controller.object), this._intersects = this.raycast(this._scene.children);
    const t = ot(
      (n = this._intersects[0]) == null ? void 0 : n.object,
      "isHoverable"
    );
    if (this._intersects[0] && t) {
      if (!this._hovered) {
        t.onPointerEnter && t.onPointerEnter(this._intersects[0]), this._hovered = t;
        return;
      }
      if (this._hovered.uuid !== t.uuid) {
        this._hovered.onPointerLeave && this._hovered.onPointerLeave(), t.onPointerEnter && t.onPointerEnter(this._intersects[0]), this._hovered = t;
        return;
      }
      t.onPointerOver && t.onPointerOver(this._intersects[0]), this._hovered = t;
    } else
      this._hovered && this._hovered.onPointerLeave && this._hovered.onPointerLeave(), this._hovered = null;
    this._pointerAnyDown && (this._dragging || this.onDragStart(i), this.onDrag(i));
  }
  onDrag(i) {
    this._dragRaycastOnObjects !== null && (this._intersects = this._raycaster.intersectObjects(
      this._dragRaycastOnObjects,
      !0
    ));
    const t = this._intersects[0];
    t && (this._dragCurrent.copy(t.point.clone()), this._dragEnd.copy(t.point.clone()), this._dragDelta.subVectors(
      this._dragCurrent.clone(),
      this._dragStart.clone()
    ), this._draggable && this._draggable.onDrag && this._draggable.onDrag({
      dragStart: this._dragStart,
      dragCurrent: this._dragCurrent,
      dragEnd: this._dragEnd,
      dragDelta: this._dragDelta
    }));
  }
  onPointerUp(i) {
    switch (this.pointerWasDragged() || this._dragging ? this._draggable && this.onDragEnd(i) : this.onClick(i), i.button) {
      case 0:
        this._pointerPrimaryDown = !1;
        break;
      case 1:
        this._pointerMiddleDown = !1;
        break;
      case 2:
        this._pointerSecondaryDown = !1;
        break;
    }
    this._lastPointerUp.copy(this._pointer);
  }
  onClick(i) {
  }
  onDragEnd(i) {
    const t = this._intersects[0];
    t && (this._dragEnd.copy(t.point.clone()), this._dragCurrent.copy(t.point.clone()), this._dragDelta.subVectors(
      this._dragCurrent.clone(),
      this._dragStart.clone()
    )), this._draggable && this._draggable.onDragEnd && this._draggable.onDragEnd({
      dragStart: this._dragStart,
      dragCurrent: this._dragCurrent,
      dragEnd: this._dragEnd,
      dragDelta: this._dragDelta
    }), this._draggable = null, this._dragging = !1, this._dragStart.set(0, 0, 0), this._dragCurrent.set(0, 0, 0), this._dragEnd.set(0, 0, 0), this._dragDelta.set(0, 0, 0), this._controller.enabled = !0;
  }
  onWheel(i) {
  }
  raycast(i) {
    return i !== void 0 ? this._raycaster.intersectObjects(i, !0).filter((t) => t.object.visible) : this._raycaster.intersectObjects(this._scene.children, !0).filter((t) => t.object.visible);
  }
  pointerWasDragged() {
    return this._lastPointerDown.distanceTo(this._pointer) > this.POINTER_DRAG_THRESHOLD;
  }
}
const ie = (r) => r.isTransformTool !== void 0;
class Nt extends Bt {
  constructor(t, n) {
    super(t, n);
    c(this, "isTransformTool", !0);
    c(this, "_scaleLinked");
    c(this, "_gizmo");
    this.name = "DIVETransformTool", this._scaleLinked = !1, this._gizmo = this.initGizmo(), this._scene.add(this._gizmo);
  }
  activate() {
  }
  setGizmoMode(t) {
    this._gizmo.mode = t;
  }
  setGizmoVisible(t) {
    const n = this._scene.children.includes(this._gizmo);
    t && !n ? (this._scene.add(this._gizmo), "isTransformControls" in this._gizmo && this._gizmo.getRaycaster().layers.enableAll()) : !t && n && (this._scene.remove(this._gizmo), "isTransformControls" in this._gizmo && this._gizmo.getRaycaster().layers.disableAll());
  }
  setGizmoScaleLinked(t) {
    this._scaleLinked = t;
  }
  // only used for optimizing pointer events with DIVEGizmo
  // public onPointerDown(e: PointerEvent): void {
  //     super.onPointerDown(e);
  //     if (this._hovered) {
  //         this._dragRaycastOnObjects = (
  //             this._gizmo as DIVEGizmo
  //         ).gizmoPlane?.children;
  //     }
  // }
  // only used for optimizing pointer events with DIVEGizmo
  // protected raycast(): Intersection[] {
  //     return super.raycast((this._gizmo as DIVEGizmo).gizmoNode.children);
  // }
  initGizmo() {
    const t = new Lt(
      // this._controller,
      this._controller.object,
      this._controller.domElement
    );
    return t.mode = "translate", t.traverse((n) => {
      if (!("isMesh" in n)) return;
      const s = n.material;
      n.name === "X" && s.color.set(lt), n.name === "Y" && s.color.set(ht), n.name === "Z" && s.color.set(ct), n.name === "XY" && s.color.set(ct), n.name === "YZ" && s.color.set(lt), n.name === "XZ" && s.color.set(ht);
    }), t.addEventListener("mouseDown", () => {
      this._controller.enabled = !1, et(t.object, "isMovable") && t.object.onMoveStart && t.object.onMoveStart();
    }), t.addEventListener("objectChange", () => {
      if (et(t.object, "isMovable") && t.object.onMove && (t.object.onMove(), this._scaleLinked)) {
        const n = t.object.scale, s = (n.x + n.y + n.z) / 3;
        t.object.scale.set(s, s, s);
      }
    }), t.addEventListener("mouseUp", () => {
      this._controller.enabled = !0, et(t.object, "isMovable") && t.object.onMoveEnd && t.object.onMoveEnd();
    }), t;
  }
}
const ne = (r) => r.isSelectTool !== void 0;
class se extends Nt {
  constructor(t, n) {
    super(t, n);
    c(this, "isSelectTool", !0);
    this.name = "SelectTool";
  }
  activate() {
  }
  select(t) {
    this.attachGizmo(t), t.onSelect && t.onSelect();
  }
  deselect(t) {
    this.detachGizmo(), t.onDeselect && t.onDeselect();
  }
  attachGizmo(t) {
    if ("isMovable" in t) {
      const n = t;
      this._gizmo.attach(n), this.setGizmoVisible(n.visible);
    }
  }
  detachGizmo() {
    this._gizmo.detach();
  }
  onClick(t) {
    super.onClick(t);
    const n = this._raycaster.intersectObjects(this._scene.root.children, !0).filter((l) => l.object.visible)[0], s = ot(
      n == null ? void 0 : n.object,
      "isSelectable"
    );
    if (!n || !s) {
      this._gizmo.object && this.deselect(this._gizmo.object);
      return;
    }
    if (this._gizmo.object) {
      if (this._gizmo.object.uuid === s.uuid) return;
      this.deselect(this._gizmo.object);
    }
    this.select(s);
  }
}
export {
  se as D,
  Bt as a,
  ie as b,
  Nt as c,
  ne as i
};
