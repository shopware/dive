var G0 = Object.defineProperty;
var U0 = (x, a, n) => a in x ? G0(x, a, { enumerable: !0, configurable: !0, writable: !0, value: n }) : x[a] = n;
var w = (x, a, n) => U0(x, typeof a != "symbol" ? a + "" : a, n);
import { Ray as F0, Plane as W0, MathUtils as Zt, EventDispatcher as N0, Vector3 as D, MOUSE as $n, TOUCH as Jn, Spherical as Xl, Quaternion as pt, Vector2 as je, Raycaster as Wr, Object3D as gt, MeshBasicMaterial as uo, LineBasicMaterial as H0, CylinderGeometry as Fe, BoxGeometry as xe, BufferGeometry as Gr, Float32BufferAttribute as Zl, Mesh as R, OctahedronGeometry as Lr, Line as Yt, TorusGeometry as Ei, SphereGeometry as co, Euler as Y0, Matrix4 as ho, PlaneGeometry as fo, DoubleSide as X0, OrthographicCamera as Z0, AxesHelper as j0, Color as Xt, Vector4 as V0, NoToneMapping as q0, PCFSoftShadowMap as Q0, WebGLRenderer as K0, AmbientLight as $0, PointLight as J0, FrontSide as e_, HemisphereLight as t_, DirectionalLight as ou, Box3 as au, MeshStandardMaterial as po, BufferAttribute as jl, ConeGeometry as n_, LineDashedMaterial as i_, GridHelper as r_, Group as s_, LightProbe as o_, WebGLCubeRenderTarget as a_, ShadowMaterial as l_, Scene as u_ } from "three";
import { Easing as Rr, update as c_, Tween as h_ } from "@tweenjs/tween.js";
import { P as xt, U as lu, C as xi, H as f_, D as d_, a as p_ } from "./chunks/PerspectiveCamera-ACx6umAu.mjs";
import eo from "three-spritetext";
import { F as ym, N as Em, S as xm } from "./chunks/network-error-DgecatEk.mjs";
import { F as Am, P as Pm } from "./chunks/file-type-error-D6aWGgyc.mjs";
import { A as Lm, E as Rm, a as Im } from "./chunks/index-C7Wx_9uY.mjs";
const Vl = { type: "change" }, to = { type: "start" }, ql = { type: "end" }, Ir = new F0(), Ql = new W0(), g_ = Math.cos(70 * Zt.DEG2RAD);
class __ extends N0 {
  constructor(a, n) {
    super(), this.object = a, this.domElement = n, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new D(), this.cursor = new D(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: $n.ROTATE, MIDDLE: $n.DOLLY, RIGHT: $n.PAN }, this.touches = { ONE: Jn.ROTATE, TWO: Jn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return P.phi;
    }, this.getAzimuthalAngle = function() {
      return P.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(d) {
      d.addEventListener("keydown", St), this._domElementKeyEvents = d;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", St), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      r.target0.copy(r.target), r.position0.copy(r.object.position), r.zoom0 = r.object.zoom;
    }, this.reset = function() {
      r.target.copy(r.target0), r.object.position.copy(r.position0), r.object.zoom = r.zoom0, r.object.updateProjectionMatrix(), r.dispatchEvent(Vl), r.update(), b = h.NONE;
    }, this.update = function() {
      const d = new D(), T = new pt().setFromUnitVectors(a.up, new D(0, 1, 0)), W = T.clone().invert(), Q = new D(), ye = new pt(), Pt = new D(), Ne = 2 * Math.PI;
      return function(Hr = null) {
        const oi = r.object.position;
        d.copy(oi).sub(r.target), d.applyQuaternion(T), P.setFromVector3(d), r.autoRotate && b === h.NONE && Ot(ti(Hr)), r.enableDamping ? (P.theta += O.theta * r.dampingFactor, P.phi += O.phi * r.dampingFactor) : (P.theta += O.theta, P.phi += O.phi);
        let mt = r.minAzimuthAngle, vt = r.maxAzimuthAngle;
        isFinite(mt) && isFinite(vt) && (mt < -Math.PI ? mt += Ne : mt > Math.PI && (mt -= Ne), vt < -Math.PI ? vt += Ne : vt > Math.PI && (vt -= Ne), mt <= vt ? P.theta = Math.max(mt, Math.min(vt, P.theta)) : P.theta = P.theta > (mt + vt) / 2 ? Math.max(mt, P.theta) : Math.min(vt, P.theta)), P.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, P.phi)), P.makeSafe(), r.enableDamping === !0 ? r.target.addScaledVector(ue, r.dampingFactor) : r.target.add(ue), r.target.sub(r.cursor), r.target.clampLength(r.minTargetRadius, r.maxTargetRadius), r.target.add(r.cursor);
        let _n = !1;
        if (r.zoomToCursor && st || r.object.isOrthographicCamera)
          P.radius = Qe(P.radius);
        else {
          const Ke = P.radius;
          P.radius = Qe(P.radius * X), _n = Ke != P.radius;
        }
        if (d.setFromSpherical(P), d.applyQuaternion(W), oi.copy(r.target).add(d), r.object.lookAt(r.target), r.enableDamping === !0 ? (O.theta *= 1 - r.dampingFactor, O.phi *= 1 - r.dampingFactor, ue.multiplyScalar(1 - r.dampingFactor)) : (O.set(0, 0, 0), ue.set(0, 0, 0)), r.zoomToCursor && st) {
          let Ke = null;
          if (r.object.isPerspectiveCamera) {
            const mn = d.length();
            Ke = Qe(mn * X);
            const en = mn - Ke;
            r.object.position.addScaledVector(ke, en), r.object.updateMatrixWorld(), _n = !!en;
          } else if (r.object.isOrthographicCamera) {
            const mn = new D(te.x, te.y, 0);
            mn.unproject(r.object);
            const en = r.object.zoom;
            r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / X)), r.object.updateProjectionMatrix(), _n = en !== r.object.zoom;
            const Ui = new D(te.x, te.y, 0);
            Ui.unproject(r.object), r.object.position.sub(Ui).add(mn), r.object.updateMatrixWorld(), Ke = d.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), r.zoomToCursor = !1;
          Ke !== null && (this.screenSpacePanning ? r.target.set(0, 0, -1).transformDirection(r.object.matrix).multiplyScalar(Ke).add(r.object.position) : (Ir.origin.copy(r.object.position), Ir.direction.set(0, 0, -1).transformDirection(r.object.matrix), Math.abs(r.object.up.dot(Ir.direction)) < g_ ? a.lookAt(r.target) : (Ql.setFromNormalAndCoplanarPoint(r.object.up, r.target), Ir.intersectPlane(Ql, r.target))));
        } else if (r.object.isOrthographicCamera) {
          const Ke = r.object.zoom;
          r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / X)), Ke !== r.object.zoom && (r.object.updateProjectionMatrix(), _n = !0);
        }
        return X = 1, st = !1, _n || Q.distanceToSquared(r.object.position) > p || 8 * (1 - ye.dot(r.object.quaternion)) > p || Pt.distanceToSquared(r.target) > p ? (r.dispatchEvent(Vl), Q.copy(r.object.position), ye.copy(r.object.quaternion), Pt.copy(r.target), !0) : !1;
      };
    }(), this.dispose = function() {
      r.domElement.removeEventListener("contextmenu", Bn), r.domElement.removeEventListener("pointerdown", ki), r.domElement.removeEventListener("pointercancel", Ae), r.domElement.removeEventListener("wheel", Bi), r.domElement.removeEventListener("pointermove", Ct), r.domElement.removeEventListener("pointerup", Ae), r.domElement.getRootNode().removeEventListener("keydown", zi, { capture: !0 }), r._domElementKeyEvents !== null && (r._domElementKeyEvents.removeEventListener("keydown", St), r._domElementKeyEvents = null);
    };
    const r = this, h = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let b = h.NONE;
    const p = 1e-6, P = new Xl(), O = new Xl();
    let X = 1;
    const ue = new D(), ce = new je(), Le = new je(), Re = new je(), me = new je(), he = new je(), $ = new je(), se = new je(), ie = new je(), V = new je(), ke = new D(), te = new je();
    let st = !1;
    const q = [], Ve = {};
    let Mt = !1;
    function ti(d) {
      return d !== null ? 2 * Math.PI / 60 * r.autoRotateSpeed * d : 2 * Math.PI / 60 / 60 * r.autoRotateSpeed;
    }
    function jt(d) {
      const T = Math.abs(d * 0.01);
      return Math.pow(0.95, r.zoomSpeed * T);
    }
    function Ot(d) {
      O.theta -= d;
    }
    function Vt(d) {
      O.phi -= d;
    }
    const Be = function() {
      const d = new D();
      return function(W, Q) {
        d.setFromMatrixColumn(Q, 0), d.multiplyScalar(-W), ue.add(d);
      };
    }(), Se = function() {
      const d = new D();
      return function(W, Q) {
        r.screenSpacePanning === !0 ? d.setFromMatrixColumn(Q, 1) : (d.setFromMatrixColumn(Q, 0), d.crossVectors(r.object.up, d)), d.multiplyScalar(W), ue.add(d);
      };
    }(), qe = function() {
      const d = new D();
      return function(W, Q) {
        const ye = r.domElement;
        if (r.object.isPerspectiveCamera) {
          const Pt = r.object.position;
          d.copy(Pt).sub(r.target);
          let Ne = d.length();
          Ne *= Math.tan(r.object.fov / 2 * Math.PI / 180), Be(2 * W * Ne / ye.clientHeight, r.object.matrix), Se(2 * Q * Ne / ye.clientHeight, r.object.matrix);
        } else r.object.isOrthographicCamera ? (Be(W * (r.object.right - r.object.left) / r.object.zoom / ye.clientWidth, r.object.matrix), Se(Q * (r.object.top - r.object.bottom) / r.object.zoom / ye.clientHeight, r.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), r.enablePan = !1);
      };
    }();
    function ge(d) {
      r.object.isPerspectiveCamera || r.object.isOrthographicCamera ? X /= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = !1);
    }
    function Ie(d) {
      r.object.isPerspectiveCamera || r.object.isOrthographicCamera ? X *= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = !1);
    }
    function _e(d, T) {
      if (!r.zoomToCursor)
        return;
      st = !0;
      const W = r.domElement.getBoundingClientRect(), Q = d - W.left, ye = T - W.top, Pt = W.width, Ne = W.height;
      te.x = Q / Pt * 2 - 1, te.y = -(ye / Ne) * 2 + 1, ke.set(te.x, te.y, 1).unproject(r.object).sub(r.object.position).normalize();
    }
    function Qe(d) {
      return Math.max(r.minDistance, Math.min(r.maxDistance, d));
    }
    function we(d) {
      ce.set(d.clientX, d.clientY);
    }
    function qt(d) {
      _e(d.clientX, d.clientX), se.set(d.clientX, d.clientY);
    }
    function In(d) {
      me.set(d.clientX, d.clientY);
    }
    function Dn(d) {
      Le.set(d.clientX, d.clientY), Re.subVectors(Le, ce).multiplyScalar(r.rotateSpeed);
      const T = r.domElement;
      Ot(2 * Math.PI * Re.x / T.clientHeight), Vt(2 * Math.PI * Re.y / T.clientHeight), ce.copy(Le), r.update();
    }
    function Qt(d) {
      ie.set(d.clientX, d.clientY), V.subVectors(ie, se), V.y > 0 ? ge(jt(V.y)) : V.y < 0 && Ie(jt(V.y)), se.copy(ie), r.update();
    }
    function Mn(d) {
      he.set(d.clientX, d.clientY), $.subVectors(he, me).multiplyScalar(r.panSpeed), qe($.x, $.y), me.copy(he), r.update();
    }
    function Nr(d) {
      _e(d.clientX, d.clientY), d.deltaY < 0 ? Ie(jt(d.deltaY)) : d.deltaY > 0 && ge(jt(d.deltaY)), r.update();
    }
    function fn(d) {
      let T = !1;
      switch (d.code) {
        case r.keys.UP:
          d.ctrlKey || d.metaKey || d.shiftKey ? Vt(2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : qe(0, r.keyPanSpeed), T = !0;
          break;
        case r.keys.BOTTOM:
          d.ctrlKey || d.metaKey || d.shiftKey ? Vt(-2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : qe(0, -r.keyPanSpeed), T = !0;
          break;
        case r.keys.LEFT:
          d.ctrlKey || d.metaKey || d.shiftKey ? Ot(2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : qe(r.keyPanSpeed, 0), T = !0;
          break;
        case r.keys.RIGHT:
          d.ctrlKey || d.metaKey || d.shiftKey ? Ot(-2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : qe(-r.keyPanSpeed, 0), T = !0;
          break;
      }
      T && (d.preventDefault(), r.update());
    }
    function Kt(d) {
      if (q.length === 1)
        ce.set(d.pageX, d.pageY);
      else {
        const T = At(d), W = 0.5 * (d.pageX + T.x), Q = 0.5 * (d.pageY + T.y);
        ce.set(W, Q);
      }
    }
    function Di(d) {
      if (q.length === 1)
        me.set(d.pageX, d.pageY);
      else {
        const T = At(d), W = 0.5 * (d.pageX + T.x), Q = 0.5 * (d.pageY + T.y);
        me.set(W, Q);
      }
    }
    function dn(d) {
      const T = At(d), W = d.pageX - T.x, Q = d.pageY - T.y, ye = Math.sqrt(W * W + Q * Q);
      se.set(0, ye);
    }
    function On(d) {
      r.enableZoom && dn(d), r.enablePan && Di(d);
    }
    function Mi(d) {
      r.enableZoom && dn(d), r.enableRotate && Kt(d);
    }
    function We(d) {
      if (q.length == 1)
        Le.set(d.pageX, d.pageY);
      else {
        const W = At(d), Q = 0.5 * (d.pageX + W.x), ye = 0.5 * (d.pageY + W.y);
        Le.set(Q, ye);
      }
      Re.subVectors(Le, ce).multiplyScalar(r.rotateSpeed);
      const T = r.domElement;
      Ot(2 * Math.PI * Re.x / T.clientHeight), Vt(2 * Math.PI * Re.y / T.clientHeight), ce.copy(Le);
    }
    function $t(d) {
      if (q.length === 1)
        he.set(d.pageX, d.pageY);
      else {
        const T = At(d), W = 0.5 * (d.pageX + T.x), Q = 0.5 * (d.pageY + T.y);
        he.set(W, Q);
      }
      $.subVectors(he, me).multiplyScalar(r.panSpeed), qe($.x, $.y), me.copy(he);
    }
    function Oi(d) {
      const T = At(d), W = d.pageX - T.x, Q = d.pageY - T.y, ye = Math.sqrt(W * W + Q * Q);
      ie.set(0, ye), V.set(0, Math.pow(ie.y / se.y, r.zoomSpeed)), ge(V.y), se.copy(ie);
      const Pt = (d.pageX + T.x) * 0.5, Ne = (d.pageY + T.y) * 0.5;
      _e(Pt, Ne);
    }
    function _t(d) {
      r.enableZoom && Oi(d), r.enablePan && $t(d);
    }
    function Ci(d) {
      r.enableZoom && Oi(d), r.enableRotate && We(d);
    }
    function ki(d) {
      r.enabled !== !1 && (q.length === 0 && (r.domElement.setPointerCapture(d.pointerId), r.domElement.addEventListener("pointermove", Ct), r.domElement.addEventListener("pointerup", Ae)), !si(d) && (ii(d), d.pointerType === "touch" ? kn(d) : pn(d)));
    }
    function Ct(d) {
      r.enabled !== !1 && (d.pointerType === "touch" ? ni(d) : Cn(d));
    }
    function Ae(d) {
      switch (ri(d), q.length) {
        case 0:
          r.domElement.releasePointerCapture(d.pointerId), r.domElement.removeEventListener("pointermove", Ct), r.domElement.removeEventListener("pointerup", Ae), r.dispatchEvent(ql), b = h.NONE;
          break;
        case 1:
          const T = q[0], W = Ve[T];
          kn({ pointerId: T, pageX: W.x, pageY: W.y });
          break;
      }
    }
    function pn(d) {
      let T;
      switch (d.button) {
        case 0:
          T = r.mouseButtons.LEFT;
          break;
        case 1:
          T = r.mouseButtons.MIDDLE;
          break;
        case 2:
          T = r.mouseButtons.RIGHT;
          break;
        default:
          T = -1;
      }
      switch (T) {
        case $n.DOLLY:
          if (r.enableZoom === !1) return;
          qt(d), b = h.DOLLY;
          break;
        case $n.ROTATE:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (r.enablePan === !1) return;
            In(d), b = h.PAN;
          } else {
            if (r.enableRotate === !1) return;
            we(d), b = h.ROTATE;
          }
          break;
        case $n.PAN:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (r.enableRotate === !1) return;
            we(d), b = h.ROTATE;
          } else {
            if (r.enablePan === !1) return;
            In(d), b = h.PAN;
          }
          break;
        default:
          b = h.NONE;
      }
      b !== h.NONE && r.dispatchEvent(to);
    }
    function Cn(d) {
      switch (b) {
        case h.ROTATE:
          if (r.enableRotate === !1) return;
          Dn(d);
          break;
        case h.DOLLY:
          if (r.enableZoom === !1) return;
          Qt(d);
          break;
        case h.PAN:
          if (r.enablePan === !1) return;
          Mn(d);
          break;
      }
    }
    function Bi(d) {
      r.enabled === !1 || r.enableZoom === !1 || b !== h.NONE || (d.preventDefault(), r.dispatchEvent(to), Nr(gn(d)), r.dispatchEvent(ql));
    }
    function gn(d) {
      const T = d.deltaMode, W = {
        clientX: d.clientX,
        clientY: d.clientY,
        deltaY: d.deltaY
      };
      switch (T) {
        case 1:
          W.deltaY *= 16;
          break;
        case 2:
          W.deltaY *= 100;
          break;
      }
      return d.ctrlKey && !Mt && (W.deltaY *= 10), W;
    }
    function zi(d) {
      d.key === "Control" && (Mt = !0, r.domElement.getRootNode().addEventListener("keyup", Jt, { passive: !0, capture: !0 }));
    }
    function Jt(d) {
      d.key === "Control" && (Mt = !1, r.domElement.getRootNode().removeEventListener("keyup", Jt, { passive: !0, capture: !0 }));
    }
    function St(d) {
      r.enabled === !1 || r.enablePan === !1 || fn(d);
    }
    function kn(d) {
      switch (zn(d), q.length) {
        case 1:
          switch (r.touches.ONE) {
            case Jn.ROTATE:
              if (r.enableRotate === !1) return;
              Kt(d), b = h.TOUCH_ROTATE;
              break;
            case Jn.PAN:
              if (r.enablePan === !1) return;
              Di(d), b = h.TOUCH_PAN;
              break;
            default:
              b = h.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case Jn.DOLLY_PAN:
              if (r.enableZoom === !1 && r.enablePan === !1) return;
              On(d), b = h.TOUCH_DOLLY_PAN;
              break;
            case Jn.DOLLY_ROTATE:
              if (r.enableZoom === !1 && r.enableRotate === !1) return;
              Mi(d), b = h.TOUCH_DOLLY_ROTATE;
              break;
            default:
              b = h.NONE;
          }
          break;
        default:
          b = h.NONE;
      }
      b !== h.NONE && r.dispatchEvent(to);
    }
    function ni(d) {
      switch (zn(d), b) {
        case h.TOUCH_ROTATE:
          if (r.enableRotate === !1) return;
          We(d), r.update();
          break;
        case h.TOUCH_PAN:
          if (r.enablePan === !1) return;
          $t(d), r.update();
          break;
        case h.TOUCH_DOLLY_PAN:
          if (r.enableZoom === !1 && r.enablePan === !1) return;
          _t(d), r.update();
          break;
        case h.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === !1 && r.enableRotate === !1) return;
          Ci(d), r.update();
          break;
        default:
          b = h.NONE;
      }
    }
    function Bn(d) {
      r.enabled !== !1 && d.preventDefault();
    }
    function ii(d) {
      q.push(d.pointerId);
    }
    function ri(d) {
      delete Ve[d.pointerId];
      for (let T = 0; T < q.length; T++)
        if (q[T] == d.pointerId) {
          q.splice(T, 1);
          return;
        }
    }
    function si(d) {
      for (let T = 0; T < q.length; T++)
        if (q[T] == d.pointerId) return !0;
      return !1;
    }
    function zn(d) {
      let T = Ve[d.pointerId];
      T === void 0 && (T = new je(), Ve[d.pointerId] = T), T.set(d.pageX, d.pageY);
    }
    function At(d) {
      const T = d.pointerId === q[0] ? q[1] : q[0];
      return Ve[T];
    }
    r.domElement.addEventListener("contextmenu", Bn), r.domElement.addEventListener("pointerdown", ki), r.domElement.addEventListener("pointercancel", Ae), r.domElement.addEventListener("wheel", Bi, { passive: !1 }), r.domElement.getRootNode().addEventListener("keydown", zi, { passive: !0, capture: !0 }), this.update();
  }
}
const kr = {
  enableDamping: !0,
  dampingFactor: 0.04
}, Ii = class Ii extends __ {
  constructor(n, r, h, b = kr) {
    super(n, r.domElement);
    w(this, "_animationSystem");
    w(this, "last", null);
    w(this, "animating", !1);
    w(this, "locked", !1);
    w(this, "stopMoveTo", () => {
    });
    w(this, "stopRevertLast", () => {
    });
    w(this, "object");
    w(this, "domElement");
    w(this, "_removePreRenderCallback", () => {
    });
    w(this, "preRenderCallback", () => {
      this.locked || this.update();
    });
    this._animationSystem = h, this.domElement = r.domElement, this.object = n;
    const p = r.AddPreRenderCallback(() => {
      this.preRenderCallback();
    });
    this._removePreRenderCallback = () => {
      r.RemovePreRenderCallback(p);
    }, this.enableDamping = b.enableDamping || kr.enableDamping, this.dampingFactor = b.dampingFactor || kr.dampingFactor, this.object.position.set(0, 2, 2), this.target.copy({ x: 0, y: 0.5, z: 0 }), this.update();
  }
  Dispose() {
    this._removePreRenderCallback(), this.dispose();
  }
  ComputeEncompassingView(n) {
    const r = n.getCenter(new D()), h = n.getSize(new D()), b = Math.max(h.x, h.y, h.z) * 1.25;
    return {
      position: this.object.position.clone().normalize().multiplyScalar(b),
      target: r
    };
  }
  ZoomIn(n) {
    const r = n || Ii.DEFAULT_ZOOM_FACTOR, { minDistance: h, maxDistance: b } = this;
    this.minDistance = this.maxDistance = Zt.clamp(
      this.getDistance() - r,
      h + r,
      b - r
    ), this.update(), this.minDistance = h, this.maxDistance = b;
  }
  ZoomOut(n) {
    const r = n || Ii.DEFAULT_ZOOM_FACTOR, { minDistance: h, maxDistance: b } = this;
    this.minDistance = this.maxDistance = Zt.clamp(
      this.getDistance() + r,
      h + r,
      b - r
    ), this.update(), this.minDistance = h, this.maxDistance = b;
  }
  MoveTo(n, r, h, b) {
    if (this.animating) return;
    const p = n || this.object.position.clone(), P = r || this.target.clone();
    this.stopRevertLast(), this.locked || (this.last = {
      pos: this.object.position.clone(),
      target: this.target.clone()
    }), this.animating = h > 0, this.locked = b, this.enabled = !1;
    const O = this._animationSystem.Animate(this.object.position).to(p, h).easing(Rr.Quadratic.Out).start(), X = this._animationSystem.Animate(this.target).to(P, h).easing(Rr.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = !1, this.enabled = !b;
    }).start();
    this.stopMoveTo = () => {
      O.stop(), X.stop();
    };
  }
  RevertLast(n) {
    if (this.animating || !this.locked) return;
    this.stopMoveTo(), this.animating = n > 0, this.enabled = !1;
    const { pos: r, target: h } = this.last, b = this._animationSystem.Animate(this.object.position).to(r, n).easing(Rr.Quadratic.Out).start(), p = this._animationSystem.Animate(this.target).to(h, n).easing(Rr.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = !1, this.locked = !1, this.enabled = !0;
    }).start();
    this.stopRevertLast = () => {
      b.stop(), p.stop();
    };
  }
};
w(Ii, "DEFAULT_ZOOM_FACTOR", 1);
let ro = Ii;
function Br(x, a) {
  return x ? a in x : !1;
}
function Ur(x, a) {
  if (x)
    return Br(x, a) ? x : Ur(x.parent, a);
}
class m_ {
  constructor(a, n) {
    w(this, "POINTER_DRAG_THRESHOLD", 1e-3);
    w(this, "name");
    w(this, "_canvas");
    w(this, "_scene");
    w(this, "_controller");
    // general pointer members
    w(this, "_pointer");
    w(this, "_pointerPrimaryDown");
    w(this, "_pointerMiddleDown");
    w(this, "_pointerSecondaryDown");
    w(this, "_lastPointerDown");
    w(this, "_lastPointerUp");
    // raycast members
    w(this, "_raycaster");
    w(this, "_intersects");
    // hovering members
    w(this, "_hovered");
    // dragging members
    w(this, "_dragging");
    w(this, "_dragStart");
    w(this, "_dragCurrent");
    w(this, "_dragEnd");
    w(this, "_dragDelta");
    w(this, "_draggable");
    w(this, "_dragRaycastOnObjects");
    this.name = "BaseTool", this._canvas = n.domElement, this._scene = a, this._controller = n, this._pointer = new je(), this._pointerPrimaryDown = !1, this._pointerMiddleDown = !1, this._pointerSecondaryDown = !1, this._lastPointerDown = new je(), this._lastPointerUp = new je(), this._raycaster = new Wr(), this._raycaster.layers.mask = xt | lu, this._intersects = [], this._hovered = null, this._dragging = !1, this._dragStart = new D(), this._dragCurrent = new D(), this._dragEnd = new D(), this._dragDelta = new D(), this._draggable = null, this._dragRaycastOnObjects = null;
  }
  get _pointerAnyDown() {
    return this._pointerPrimaryDown || this._pointerMiddleDown || this._pointerSecondaryDown;
  }
  Activate() {
  }
  Deactivate() {
  }
  onPointerDown(a) {
    var n;
    switch (a.button) {
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
          "DIVEBaseTool.onPointerDown: Unknown button: " + a.button
        );
    }
    this._lastPointerDown.copy(this._pointer), this._draggable = Ur(
      (n = this._intersects[0]) == null ? void 0 : n.object,
      "isDraggable"
    ) || null;
  }
  onDragStart(a) {
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
  onPointerMove(a) {
    var r;
    this._pointer.x = a.offsetX / this._canvas.clientWidth * 2 - 1, this._pointer.y = -(a.offsetY / this._canvas.clientHeight) * 2 + 1, this._raycaster.setFromCamera(this._pointer, this._controller.object), this._intersects = this.raycast(this._scene.children);
    const n = Ur(
      (r = this._intersects[0]) == null ? void 0 : r.object,
      "isHoverable"
    );
    if (this._intersects[0] && n) {
      if (!this._hovered) {
        n.onPointerEnter && n.onPointerEnter(this._intersects[0]), this._hovered = n;
        return;
      }
      if (this._hovered.uuid !== n.uuid) {
        this._hovered.onPointerLeave && this._hovered.onPointerLeave(), n.onPointerEnter && n.onPointerEnter(this._intersects[0]), this._hovered = n;
        return;
      }
      n.onPointerOver && n.onPointerOver(this._intersects[0]), this._hovered = n;
    } else
      this._hovered && this._hovered.onPointerLeave && this._hovered.onPointerLeave(), this._hovered = null;
    this._pointerAnyDown && (this._dragging || this.onDragStart(a), this.onDrag(a));
  }
  onDrag(a) {
    this._dragRaycastOnObjects !== null && (this._intersects = this._raycaster.intersectObjects(
      this._dragRaycastOnObjects,
      !0
    ));
    const n = this._intersects[0];
    n && (this._dragCurrent.copy(n.point.clone()), this._dragEnd.copy(n.point.clone()), this._dragDelta.subVectors(
      this._dragCurrent.clone(),
      this._dragStart.clone()
    ), this._draggable && this._draggable.onDrag && this._draggable.onDrag({
      dragStart: this._dragStart,
      dragCurrent: this._dragCurrent,
      dragEnd: this._dragEnd,
      dragDelta: this._dragDelta
    }));
  }
  onPointerUp(a) {
    switch (this.pointerWasDragged() || this._dragging ? this._draggable && this.onDragEnd(a) : this.onClick(a), a.button) {
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
  onClick(a) {
  }
  onDragEnd(a) {
    const n = this._intersects[0];
    n && (this._dragEnd.copy(n.point.clone()), this._dragCurrent.copy(n.point.clone()), this._dragDelta.subVectors(
      this._dragCurrent.clone(),
      this._dragStart.clone()
    )), this._draggable && this._draggable.onDragEnd && this._draggable.onDragEnd({
      dragStart: this._dragStart,
      dragCurrent: this._dragCurrent,
      dragEnd: this._dragEnd,
      dragDelta: this._dragDelta
    }), this._draggable = null, this._dragging = !1, this._dragStart.set(0, 0, 0), this._dragCurrent.set(0, 0, 0), this._dragEnd.set(0, 0, 0), this._dragDelta.set(0, 0, 0), this._controller.enabled = !0;
  }
  onWheel(a) {
  }
  raycast(a) {
    return a !== void 0 ? this._raycaster.intersectObjects(a, !0).filter((n) => n.object.visible) : this._raycaster.intersectObjects(this._scene.children, !0).filter((n) => n.object.visible);
  }
  pointerWasDragged() {
    return this._lastPointerDown.distanceTo(this._pointer) > this.POINTER_DRAG_THRESHOLD;
  }
}
const Tn = new Wr(), Ce = new D(), hn = new D(), ae = new pt(), Kl = {
  X: new D(1, 0, 0),
  Y: new D(0, 1, 0),
  Z: new D(0, 0, 1)
}, no = { type: "change" }, $l = { type: "mouseDown" }, Jl = { type: "mouseUp", mode: null }, eu = { type: "objectChange" };
class v_ extends gt {
  constructor(a, n) {
    super(), n === void 0 && (console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'), n = document), this.isTransformControls = !0, this.visible = !1, this.domElement = n, this.domElement.style.touchAction = "none";
    const r = new S_();
    this._gizmo = r, this.add(r);
    const h = new A_();
    this._plane = h, this.add(h);
    const b = this;
    function p(ie, V) {
      let ke = V;
      Object.defineProperty(b, ie, {
        get: function() {
          return ke !== void 0 ? ke : V;
        },
        set: function(te) {
          ke !== te && (ke = te, h[ie] = te, r[ie] = te, b.dispatchEvent({ type: ie + "-changed", value: te }), b.dispatchEvent(no));
        }
      }), b[ie] = V, h[ie] = V, r[ie] = V;
    }
    p("camera", a), p("object", void 0), p("enabled", !0), p("axis", null), p("mode", "translate"), p("translationSnap", null), p("rotationSnap", null), p("scaleSnap", null), p("space", "world"), p("size", 1), p("dragging", !1), p("showX", !0), p("showY", !0), p("showZ", !0);
    const P = new D(), O = new D(), X = new pt(), ue = new pt(), ce = new D(), Le = new pt(), Re = new D(), me = new D(), he = new D(), $ = 0, se = new D();
    p("worldPosition", P), p("worldPositionStart", O), p("worldQuaternion", X), p("worldQuaternionStart", ue), p("cameraPosition", ce), p("cameraQuaternion", Le), p("pointStart", Re), p("pointEnd", me), p("rotationAxis", he), p("rotationAngle", $), p("eye", se), this._offset = new D(), this._startNorm = new D(), this._endNorm = new D(), this._cameraScale = new D(), this._parentPosition = new D(), this._parentQuaternion = new pt(), this._parentQuaternionInv = new pt(), this._parentScale = new D(), this._worldScaleStart = new D(), this._worldQuaternionInv = new pt(), this._worldScale = new D(), this._positionStart = new D(), this._quaternionStart = new pt(), this._scaleStart = new D(), this._getPointer = b_.bind(this), this._onPointerDown = y_.bind(this), this._onPointerHover = w_.bind(this), this._onPointerMove = E_.bind(this), this._onPointerUp = x_.bind(this), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(a) {
    this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this._parentPosition, this._parentQuaternion, this._parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this._worldScale), this._parentQuaternionInv.copy(this._parentQuaternion).invert(), this._worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this._cameraScale), this.camera.isOrthographicCamera ? this.camera.getWorldDirection(this.eye).negate() : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld(a);
  }
  pointerHover(a) {
    if (this.object === void 0 || this.dragging === !0) return;
    a !== null && Tn.setFromCamera(a, this.camera);
    const n = io(this._gizmo.picker[this.mode], Tn);
    n ? this.axis = n.object.name : this.axis = null;
  }
  pointerDown(a) {
    if (!(this.object === void 0 || this.dragging === !0 || a != null && a.button !== 0) && this.axis !== null) {
      a !== null && Tn.setFromCamera(a, this.camera);
      const n = io(this._plane, Tn, !0);
      n && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(n.point).sub(this.worldPositionStart)), this.dragging = !0, $l.mode = this.mode, this.dispatchEvent($l);
    }
  }
  pointerMove(a) {
    const n = this.axis, r = this.mode, h = this.object;
    let b = this.space;
    if (r === "scale" ? b = "local" : (n === "E" || n === "XYZE" || n === "XYZ") && (b = "world"), h === void 0 || n === null || this.dragging === !1 || a !== null && a.button !== -1) return;
    a !== null && Tn.setFromCamera(a, this.camera);
    const p = io(this._plane, Tn, !0);
    if (p) {
      if (this.pointEnd.copy(p.point).sub(this.worldPositionStart), r === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), b === "local" && n !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), n.indexOf("X") === -1 && (this._offset.x = 0), n.indexOf("Y") === -1 && (this._offset.y = 0), n.indexOf("Z") === -1 && (this._offset.z = 0), b === "local" && n !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), h.position.copy(this._offset).add(this._positionStart), this.translationSnap && (b === "local" && (h.position.applyQuaternion(ae.copy(this._quaternionStart).invert()), n.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), n.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), n.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.position.applyQuaternion(this._quaternionStart)), b === "world" && (h.parent && h.position.add(Ce.setFromMatrixPosition(h.parent.matrixWorld)), n.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), n.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), n.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.parent && h.position.sub(Ce.setFromMatrixPosition(h.parent.matrixWorld))));
      else if (r === "scale") {
        if (n.search("XYZ") !== -1) {
          let P = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (P *= -1), hn.set(P, P, P);
        } else
          Ce.copy(this.pointStart), hn.copy(this.pointEnd), Ce.applyQuaternion(this._worldQuaternionInv), hn.applyQuaternion(this._worldQuaternionInv), hn.divide(Ce), n.search("X") === -1 && (hn.x = 1), n.search("Y") === -1 && (hn.y = 1), n.search("Z") === -1 && (hn.z = 1);
        h.scale.copy(this._scaleStart).multiply(hn), this.scaleSnap && (n.search("X") !== -1 && (h.scale.x = Math.round(h.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), n.search("Y") !== -1 && (h.scale.y = Math.round(h.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), n.search("Z") !== -1 && (h.scale.z = Math.round(h.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (r === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const P = 20 / this.worldPosition.distanceTo(Ce.setFromMatrixPosition(this.camera.matrixWorld));
        let O = !1;
        n === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(Ce.copy(this.rotationAxis).cross(this.eye)) * P) : (n === "X" || n === "Y" || n === "Z") && (this.rotationAxis.copy(Kl[n]), Ce.copy(Kl[n]), b === "local" && Ce.applyQuaternion(this.worldQuaternion), Ce.cross(this.eye), Ce.length() === 0 ? O = !0 : this.rotationAngle = this._offset.dot(Ce.normalize()) * P), (n === "E" || O) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), b === "local" && n !== "E" && n !== "XYZE" ? (h.quaternion.copy(this._quaternionStart), h.quaternion.multiply(ae.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), h.quaternion.copy(ae.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), h.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(no), this.dispatchEvent(eu);
    }
  }
  pointerUp(a) {
    a !== null && a.button !== 0 || (this.dragging && this.axis !== null && (Jl.mode = this.mode, this.dispatchEvent(Jl)), this.dragging = !1, this.axis = null);
  }
  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.traverse(function(a) {
      a.geometry && a.geometry.dispose(), a.material && a.material.dispose();
    });
  }
  // Set current object
  attach(a) {
    return this.object = a, this.visible = !0, this;
  }
  // Detach from object
  detach() {
    return this.object = void 0, this.visible = !1, this.axis = null, this;
  }
  reset() {
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(no), this.dispatchEvent(eu), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return Tn;
  }
  // TODO: deprecate
  getMode() {
    return this.mode;
  }
  setMode(a) {
    this.mode = a;
  }
  setTranslationSnap(a) {
    this.translationSnap = a;
  }
  setRotationSnap(a) {
    this.rotationSnap = a;
  }
  setScaleSnap(a) {
    this.scaleSnap = a;
  }
  setSize(a) {
    this.size = a;
  }
  setSpace(a) {
    this.space = a;
  }
}
function b_(x) {
  if (this.domElement.ownerDocument.pointerLockElement)
    return {
      x: 0,
      y: 0,
      button: x.button
    };
  {
    const a = this.domElement.getBoundingClientRect();
    return {
      x: (x.clientX - a.left) / a.width * 2 - 1,
      y: -(x.clientY - a.top) / a.height * 2 + 1,
      button: x.button
    };
  }
}
function w_(x) {
  if (this.enabled)
    switch (x.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(x));
        break;
    }
}
function y_(x) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(x.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(x)), this.pointerDown(this._getPointer(x)));
}
function E_(x) {
  this.enabled && this.pointerMove(this._getPointer(x));
}
function x_(x) {
  this.enabled && (this.domElement.releasePointerCapture(x.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(x)));
}
function io(x, a, n) {
  const r = a.intersectObject(x, !0);
  for (let h = 0; h < r.length; h++)
    if (r[h].object.visible || n)
      return r[h];
  return !1;
}
const Dr = new Y0(), ee = new D(0, 1, 0), tu = new D(0, 0, 0), nu = new ho(), Mr = new pt(), zr = new pt(), It = new D(), iu = new ho(), Pi = new D(1, 0, 0), Ln = new D(0, 1, 0), Ti = new D(0, 0, 1), Or = new D(), Si = new D(), Ai = new D();
class S_ extends gt {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const a = new uo({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), n = new H0({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), r = a.clone();
    r.opacity = 0.15;
    const h = n.clone();
    h.opacity = 0.5;
    const b = a.clone();
    b.color.setHex(16711680);
    const p = a.clone();
    p.color.setHex(65280);
    const P = a.clone();
    P.color.setHex(255);
    const O = a.clone();
    O.color.setHex(16711680), O.opacity = 0.5;
    const X = a.clone();
    X.color.setHex(65280), X.opacity = 0.5;
    const ue = a.clone();
    ue.color.setHex(255), ue.opacity = 0.5;
    const ce = a.clone();
    ce.opacity = 0.25;
    const Le = a.clone();
    Le.color.setHex(16776960), Le.opacity = 0.25, a.clone().color.setHex(16776960);
    const me = a.clone();
    me.color.setHex(7895160);
    const he = new Fe(0, 0.04, 0.1, 12);
    he.translate(0, 0.05, 0);
    const $ = new xe(0.08, 0.08, 0.08);
    $.translate(0, 0.04, 0);
    const se = new Gr();
    se.setAttribute("position", new Zl([0, 0, 0, 1, 0, 0], 3));
    const ie = new Fe(75e-4, 75e-4, 0.5, 3);
    ie.translate(0, 0.25, 0);
    function V(Se, qe) {
      const ge = new Ei(Se, 75e-4, 3, 64, qe * Math.PI * 2);
      return ge.rotateY(Math.PI / 2), ge.rotateX(Math.PI / 2), ge;
    }
    function ke() {
      const Se = new Gr();
      return Se.setAttribute("position", new Zl([0, 0, 0, 1, 1, 1], 3)), Se;
    }
    const te = {
      X: [
        [new R(he, b), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new R(he, b), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new R(ie, b), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new R(he, p), [0, 0.5, 0]],
        [new R(he, p), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new R(ie, p)]
      ],
      Z: [
        [new R(he, P), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new R(he, P), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new R(ie, P), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new R(new Lr(0.1, 0), ce.clone()), [0, 0, 0]]
      ],
      XY: [
        [new R(new xe(0.15, 0.15, 0.01), ue.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new R(new xe(0.15, 0.15, 0.01), O.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new R(new xe(0.15, 0.15, 0.01), X.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, st = {
      X: [
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new R(new Fe(0.2, 0, 0.6, 4), r), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, 0.3, 0]],
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new R(new Lr(0.2, 0), r)]
      ],
      XY: [
        [new R(new xe(0.2, 0.2, 0.01), r), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new R(new xe(0.2, 0.2, 0.01), r), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new R(new xe(0.2, 0.2, 0.01), r), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, q = {
      START: [
        [new R(new Lr(0.01, 2), h), null, null, null, "helper"]
      ],
      END: [
        [new R(new Lr(0.01, 2), h), null, null, null, "helper"]
      ],
      DELTA: [
        [new Yt(ke(), h), null, null, null, "helper"]
      ],
      X: [
        [new Yt(se, h.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Yt(se, h.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Yt(se, h.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, Ve = {
      XYZE: [
        [new R(V(0.5, 1), me), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new R(V(0.5, 0.5), b)]
      ],
      Y: [
        [new R(V(0.5, 0.5), p), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new R(V(0.5, 0.5), P), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new R(V(0.75, 1), Le), null, [0, Math.PI / 2, 0]]
      ]
    }, Mt = {
      AXIS: [
        [new Yt(se, h.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, ti = {
      XYZE: [
        [new R(new co(0.25, 10, 8), r)]
      ],
      X: [
        [new R(new Ei(0.5, 0.1, 4, 24), r), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new R(new Ei(0.5, 0.1, 4, 24), r), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new R(new Ei(0.5, 0.1, 4, 24), r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new R(new Ei(0.75, 0.1, 2, 24), r)]
      ]
    }, jt = {
      X: [
        [new R($, b), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new R(ie, b), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new R($, b), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new R($, p), [0, 0.5, 0]],
        [new R(ie, p)],
        [new R($, p), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new R($, P), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new R(ie, P), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new R($, P), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new R(new xe(0.15, 0.15, 0.01), ue), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new R(new xe(0.15, 0.15, 0.01), O), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new R(new xe(0.15, 0.15, 0.01), X), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new R(new xe(0.1, 0.1, 0.1), ce.clone())]
      ]
    }, Ot = {
      X: [
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new R(new Fe(0.2, 0, 0.6, 4), r), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, 0.3, 0]],
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new R(new Fe(0.2, 0, 0.6, 4), r), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new R(new xe(0.2, 0.2, 0.01), r), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new R(new xe(0.2, 0.2, 0.01), r), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new R(new xe(0.2, 0.2, 0.01), r), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new R(new xe(0.2, 0.2, 0.2), r), [0, 0, 0]]
      ]
    }, Vt = {
      X: [
        [new Yt(se, h.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Yt(se, h.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Yt(se, h.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function Be(Se) {
      const qe = new gt();
      for (const ge in Se)
        for (let Ie = Se[ge].length; Ie--; ) {
          const _e = Se[ge][Ie][0].clone(), Qe = Se[ge][Ie][1], we = Se[ge][Ie][2], qt = Se[ge][Ie][3], In = Se[ge][Ie][4];
          _e.name = ge, _e.tag = In, Qe && _e.position.set(Qe[0], Qe[1], Qe[2]), we && _e.rotation.set(we[0], we[1], we[2]), qt && _e.scale.set(qt[0], qt[1], qt[2]), _e.updateMatrix();
          const Dn = _e.geometry.clone();
          Dn.applyMatrix4(_e.matrix), _e.geometry = Dn, _e.renderOrder = 1 / 0, _e.position.set(0, 0, 0), _e.rotation.set(0, 0, 0), _e.scale.set(1, 1, 1), qe.add(_e);
        }
      return qe;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = Be(te)), this.add(this.gizmo.rotate = Be(Ve)), this.add(this.gizmo.scale = Be(jt)), this.add(this.picker.translate = Be(st)), this.add(this.picker.rotate = Be(ti)), this.add(this.picker.scale = Be(Ot)), this.add(this.helper.translate = Be(q)), this.add(this.helper.rotate = Be(Mt)), this.add(this.helper.scale = Be(Vt)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(a) {
    const r = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : zr;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let h = [];
    h = h.concat(this.picker[this.mode].children), h = h.concat(this.gizmo[this.mode].children), h = h.concat(this.helper[this.mode].children);
    for (let b = 0; b < h.length; b++) {
      const p = h[b];
      p.visible = !0, p.rotation.set(0, 0, 0), p.position.copy(this.worldPosition);
      let P;
      if (this.camera.isOrthographicCamera ? P = (this.camera.top - this.camera.bottom) / this.camera.zoom : P = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), p.scale.set(1, 1, 1).multiplyScalar(P * this.size / 4), p.tag === "helper") {
        p.visible = !1, p.name === "AXIS" ? (p.visible = !!this.axis, this.axis === "X" && (ae.setFromEuler(Dr.set(0, 0, 0)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Pi).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "Y" && (ae.setFromEuler(Dr.set(0, 0, Math.PI / 2)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Ln).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "Z" && (ae.setFromEuler(Dr.set(0, Math.PI / 2, 0)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "XYZE" && (ae.setFromEuler(Dr.set(0, Math.PI / 2, 0)), ee.copy(this.rotationAxis), p.quaternion.setFromRotationMatrix(nu.lookAt(tu, ee, Ln)), p.quaternion.multiply(ae), p.visible = this.dragging), this.axis === "E" && (p.visible = !1)) : p.name === "START" ? (p.position.copy(this.worldPositionStart), p.visible = this.dragging) : p.name === "END" ? (p.position.copy(this.worldPosition), p.visible = this.dragging) : p.name === "DELTA" ? (p.position.copy(this.worldPositionStart), p.quaternion.copy(this.worldQuaternionStart), Ce.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), Ce.applyQuaternion(this.worldQuaternionStart.clone().invert()), p.scale.copy(Ce), p.visible = this.dragging) : (p.quaternion.copy(r), this.dragging ? p.position.copy(this.worldPositionStart) : p.position.copy(this.worldPosition), this.axis && (p.visible = this.axis.search(p.name) !== -1));
        continue;
      }
      p.quaternion.copy(r), this.mode === "translate" || this.mode === "scale" ? (p.name === "X" && Math.abs(ee.copy(Pi).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "Y" && Math.abs(ee.copy(Ln).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "Z" && Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "XY" && Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "YZ" && Math.abs(ee.copy(Pi).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "XZ" && Math.abs(ee.copy(Ln).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1)) : this.mode === "rotate" && (Mr.copy(r), ee.copy(this.eye).applyQuaternion(ae.copy(r).invert()), p.name.search("E") !== -1 && p.quaternion.setFromRotationMatrix(nu.lookAt(this.eye, tu, Ln)), p.name === "X" && (ae.setFromAxisAngle(Pi, Math.atan2(-ee.y, ee.z)), ae.multiplyQuaternions(Mr, ae), p.quaternion.copy(ae)), p.name === "Y" && (ae.setFromAxisAngle(Ln, Math.atan2(ee.x, ee.z)), ae.multiplyQuaternions(Mr, ae), p.quaternion.copy(ae)), p.name === "Z" && (ae.setFromAxisAngle(Ti, Math.atan2(ee.y, ee.x)), ae.multiplyQuaternions(Mr, ae), p.quaternion.copy(ae))), p.visible = p.visible && (p.name.indexOf("X") === -1 || this.showX), p.visible = p.visible && (p.name.indexOf("Y") === -1 || this.showY), p.visible = p.visible && (p.name.indexOf("Z") === -1 || this.showZ), p.visible = p.visible && (p.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), p.material._color = p.material._color || p.material.color.clone(), p.material._opacity = p.material._opacity || p.material.opacity, p.material.color.copy(p.material._color), p.material.opacity = p.material._opacity, this.enabled && this.axis && (p.name === this.axis || this.axis.split("").some(function(O) {
        return p.name === O;
      })) && (p.material.color.setHex(16776960), p.material.opacity = 1);
    }
    super.updateMatrixWorld(a);
  }
}
class A_ extends R {
  constructor() {
    super(
      new fo(1e5, 1e5, 2, 2),
      new uo({ visible: !1, wireframe: !0, side: X0, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(a) {
    let n = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (n = "local"), Or.copy(Pi).applyQuaternion(n === "local" ? this.worldQuaternion : zr), Si.copy(Ln).applyQuaternion(n === "local" ? this.worldQuaternion : zr), Ai.copy(Ti).applyQuaternion(n === "local" ? this.worldQuaternion : zr), ee.copy(Si), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            ee.copy(this.eye).cross(Or), It.copy(Or).cross(ee);
            break;
          case "Y":
            ee.copy(this.eye).cross(Si), It.copy(Si).cross(ee);
            break;
          case "Z":
            ee.copy(this.eye).cross(Ai), It.copy(Ai).cross(ee);
            break;
          case "XY":
            It.copy(Ai);
            break;
          case "YZ":
            It.copy(Or);
            break;
          case "XZ":
            ee.copy(Ai), It.copy(Si);
            break;
          case "XYZ":
          case "E":
            It.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        It.set(0, 0, 0);
    }
    It.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (iu.lookAt(Ce.set(0, 0, 0), It, ee), this.quaternion.setFromRotationMatrix(iu)), super.updateMatrixWorld(a);
  }
}
const uu = "#c20017", cu = "#00ab26", hu = "#0081d4", so = uu, oo = cu, ao = hu;
class P_ extends m_ {
  constructor(n, r) {
    super(n, r);
    w(this, "isTransformTool", !0);
    w(this, "_scaleLinked");
    w(this, "_gizmo");
    this.name = "DIVETransformTool", this._scaleLinked = !1, this._gizmo = this.initGizmo(), this._scene.add(this._gizmo);
  }
  Activate() {
  }
  SetGizmoMode(n) {
    this._gizmo.mode = n;
  }
  SetGizmoVisibility(n) {
    const r = this._scene.children.includes(this._gizmo);
    n && !r ? (this._scene.add(this._gizmo), "isTransformControls" in this._gizmo && this._gizmo.getRaycaster().layers.enableAll()) : !n && r && (this._scene.remove(this._gizmo), "isTransformControls" in this._gizmo && this._gizmo.getRaycaster().layers.disableAll());
  }
  SetGizmoScaleLinked(n) {
    this._scaleLinked = n;
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
    const n = new v_(
      // this._controller,
      this._controller.object,
      this._controller.domElement
    );
    return n.mode = "translate", n.traverse((r) => {
      if (!("isMesh" in r)) return;
      const h = r.material;
      r.name === "X" && h.color.set(so), r.name === "Y" && h.color.set(oo), r.name === "Z" && h.color.set(ao), r.name === "XY" && h.color.set(ao), r.name === "YZ" && h.color.set(so), r.name === "XZ" && h.color.set(oo);
    }), n.addEventListener("mouseDown", () => {
      this._controller.enabled = !1, Br(n.object, "isMovable") && n.object.onMoveStart && n.object.onMoveStart();
    }), n.addEventListener("objectChange", () => {
      if (Br(n.object, "isMovable") && n.object.onMove && (n.object.onMove(), this._scaleLinked)) {
        const r = n.object.scale, h = (r.x + r.y + r.z) / 3;
        n.object.scale.set(h, h, h);
      }
    }), n.addEventListener("mouseUp", () => {
      this._controller.enabled = !0, Br(n.object, "isMovable") && n.object.onMoveEnd && n.object.onMoveEnd();
    }), n;
  }
}
const ru = (x) => x.isSelectTool !== void 0;
class T_ extends P_ {
  constructor(n, r) {
    super(n, r);
    w(this, "isSelectTool", !0);
    this.name = "SelectTool";
  }
  Activate() {
  }
  Select(n) {
    this.AttachGizmo(n), n.onSelect && n.onSelect();
  }
  Deselect(n) {
    this.DetachGizmo(), n.onDeselect && n.onDeselect();
  }
  AttachGizmo(n) {
    if ("isMovable" in n) {
      const r = n;
      this._gizmo.attach(r), this.SetGizmoVisibility(r.visible);
    }
  }
  DetachGizmo() {
    this._gizmo.detach();
  }
  onClick(n) {
    super.onClick(n);
    const r = this._raycaster.intersectObjects(this._scene.Root.children, !0).filter((b) => b.object.visible)[0], h = Ur(
      r == null ? void 0 : r.object,
      "isSelectable"
    );
    if (!r || !h) {
      this._gizmo.object && this.Deselect(this._gizmo.object);
      return;
    }
    if (this._gizmo.object) {
      if (this._gizmo.object.uuid === h.uuid) return;
      this.Deselect(this._gizmo.object);
    }
    this.Select(h);
  }
}
class fu {
  constructor(a, n) {
    w(this, "_scene");
    w(this, "_controller");
    w(this, "_activeTool");
    w(this, "_selectTool");
    this._scene = a, this._controller = n, this._selectTool = null, this._activeTool = null;
  }
  get selectTool() {
    return this._selectTool || (this._selectTool = new T_(
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
  UseTool(a) {
    var n;
    switch ((n = this._activeTool) == null || n.Deactivate(), a) {
      case "select": {
        this.addEventListeners(), this.selectTool.Activate(), this._activeTool = this.selectTool;
        break;
      }
      case "none": {
        this.removeEventListeners(), this._activeTool = null;
        break;
      }
      default:
        console.warn(`DIVEToolBox.UseTool: Unknown tool: ${a}`);
    }
  }
  SetGizmoMode(a) {
    this.selectTool.SetGizmoMode(a);
  }
  SetGizmoVisibility(a) {
    this.selectTool.SetGizmoVisibility(a);
  }
  SetGizmoScaleLinked(a) {
    this.selectTool.SetGizmoScaleLinked(a);
  }
  onPointerMove(a) {
    var n;
    (n = this._activeTool) == null || n.onPointerMove(a);
  }
  onPointerDown(a) {
    var n;
    (n = this._activeTool) == null || n.onPointerDown(a);
  }
  onPointerUp(a) {
    var n;
    (n = this._activeTool) == null || n.onPointerUp(a);
  }
  onWheel(a) {
    var n;
    (n = this._activeTool) == null || n.onWheel(a);
  }
  addEventListeners() {
    this._controller.domElement.addEventListener(
      "pointermove",
      (a) => this.onPointerMove(a)
    ), this._controller.domElement.addEventListener(
      "pointerdown",
      (a) => this.onPointerDown(a)
    ), this._controller.domElement.addEventListener(
      "pointerup",
      (a) => this.onPointerUp(a)
    ), this._controller.domElement.addEventListener(
      "wheel",
      (a) => this.onWheel(a)
    );
  }
  removeEventListeners() {
    this._controller.domElement.removeEventListener(
      "pointermove",
      (a) => this.onPointerMove(a)
    ), this._controller.domElement.removeEventListener(
      "pointerdown",
      (a) => this.onPointerDown(a)
    ), this._controller.domElement.removeEventListener(
      "pointerup",
      (a) => this.onPointerUp(a)
    ), this._controller.domElement.removeEventListener(
      "wheel",
      (a) => this.onWheel(a)
    );
  }
}
w(fu, "DefaultTool", "select");
const Oe = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function L_() {
  const x = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
  return (Oe[x & 255] + Oe[x >> 8 & 255] + Oe[x >> 16 & 255] + Oe[x >> 24 & 255] + "-" + Oe[a & 255] + Oe[a >> 8 & 255] + "-" + Oe[a >> 16 & 15 | 64] + Oe[a >> 24 & 255] + "-" + Oe[n & 63 | 128] + Oe[n >> 8 & 255] + "-" + Oe[n >> 16 & 255] + Oe[n >> 24 & 255] + Oe[r & 255] + Oe[r >> 8 & 255] + Oe[r >> 16 & 255] + Oe[r >> 24 & 255]).toLowerCase();
}
var Cr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Li = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var R_ = Li.exports, su;
function I_() {
  return su || (su = 1, function(x, a) {
    (function() {
      var n, r = "4.17.21", h = 200, b = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", p = "Expected a function", P = "Invalid `variable` option passed into `_.template`", O = "__lodash_hash_undefined__", X = 500, ue = "__lodash_placeholder__", ce = 1, Le = 2, Re = 4, me = 1, he = 2, $ = 1, se = 2, ie = 4, V = 8, ke = 16, te = 32, st = 64, q = 128, Ve = 256, Mt = 512, ti = 30, jt = "...", Ot = 800, Vt = 16, Be = 1, Se = 2, qe = 3, ge = 1 / 0, Ie = 9007199254740991, _e = 17976931348623157e292, Qe = NaN, we = 4294967295, qt = we - 1, In = we >>> 1, Dn = [
        ["ary", q],
        ["bind", $],
        ["bindKey", se],
        ["curry", V],
        ["curryRight", ke],
        ["flip", Mt],
        ["partial", te],
        ["partialRight", st],
        ["rearg", Ve]
      ], Qt = "[object Arguments]", Mn = "[object Array]", Nr = "[object AsyncFunction]", fn = "[object Boolean]", Kt = "[object Date]", Di = "[object DOMException]", dn = "[object Error]", On = "[object Function]", Mi = "[object GeneratorFunction]", We = "[object Map]", $t = "[object Number]", Oi = "[object Null]", _t = "[object Object]", Ci = "[object Promise]", ki = "[object Proxy]", Ct = "[object RegExp]", Ae = "[object Set]", pn = "[object String]", Cn = "[object Symbol]", Bi = "[object Undefined]", gn = "[object WeakMap]", zi = "[object WeakSet]", Jt = "[object ArrayBuffer]", St = "[object DataView]", kn = "[object Float32Array]", ni = "[object Float64Array]", Bn = "[object Int8Array]", ii = "[object Int16Array]", ri = "[object Int32Array]", si = "[object Uint8Array]", zn = "[object Uint8ClampedArray]", At = "[object Uint16Array]", Gi = "[object Uint32Array]", d = /\b__p \+= '';/g, T = /\b(__p \+=) '' \+/g, W = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Q = /&(?:amp|lt|gt|quot|#39);/g, ye = /[&<>"']/g, Pt = RegExp(Q.source), Ne = RegExp(ye.source), vo = /<%-([\s\S]+?)%>/g, Hr = /<%([\s\S]+?)%>/g, oi = /<%=([\s\S]+?)%>/g, mt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, vt = /^\w*$/, _n = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ke = /[\\^$.*+?()[\]{}|]/g, mn = RegExp(Ke.source), en = /^\s+/, Ui = /\s/, _u = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, mu = /\{\n\/\* \[wrapped with (.+)\] \*/, vu = /,? & /, bu = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, wu = /[()=,{}\[\]\/\s]/, yu = /\\(\\)?/g, Eu = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, bo = /\w*$/, xu = /^[-+]0x[0-9a-f]+$/i, Su = /^0b[01]+$/i, Au = /^\[object .+?Constructor\]$/, Pu = /^0o[0-7]+$/i, Tu = /^(?:0|[1-9]\d*)$/, Lu = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Fi = /($^)/, Ru = /['\n\r\u2028\u2029\\]/g, Wi = "\\ud800-\\udfff", Iu = "\\u0300-\\u036f", Du = "\\ufe20-\\ufe2f", Mu = "\\u20d0-\\u20ff", wo = Iu + Du + Mu, yo = "\\u2700-\\u27bf", Eo = "a-z\\xdf-\\xf6\\xf8-\\xff", Ou = "\\xac\\xb1\\xd7\\xf7", Cu = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ku = "\\u2000-\\u206f", Bu = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", xo = "A-Z\\xc0-\\xd6\\xd8-\\xde", So = "\\ufe0e\\ufe0f", Ao = Ou + Cu + ku + Bu, Yr = "['’]", zu = "[" + Wi + "]", Po = "[" + Ao + "]", Ni = "[" + wo + "]", To = "\\d+", Gu = "[" + yo + "]", Lo = "[" + Eo + "]", Ro = "[^" + Wi + Ao + To + yo + Eo + xo + "]", Xr = "\\ud83c[\\udffb-\\udfff]", Uu = "(?:" + Ni + "|" + Xr + ")", Io = "[^" + Wi + "]", Zr = "(?:\\ud83c[\\udde6-\\uddff]){2}", jr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Gn = "[" + xo + "]", Do = "\\u200d", Mo = "(?:" + Lo + "|" + Ro + ")", Fu = "(?:" + Gn + "|" + Ro + ")", Oo = "(?:" + Yr + "(?:d|ll|m|re|s|t|ve))?", Co = "(?:" + Yr + "(?:D|LL|M|RE|S|T|VE))?", ko = Uu + "?", Bo = "[" + So + "]?", Wu = "(?:" + Do + "(?:" + [Io, Zr, jr].join("|") + ")" + Bo + ko + ")*", Nu = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Hu = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", zo = Bo + ko + Wu, Yu = "(?:" + [Gu, Zr, jr].join("|") + ")" + zo, Xu = "(?:" + [Io + Ni + "?", Ni, Zr, jr, zu].join("|") + ")", Zu = RegExp(Yr, "g"), ju = RegExp(Ni, "g"), Vr = RegExp(Xr + "(?=" + Xr + ")|" + Xu + zo, "g"), Vu = RegExp([
        Gn + "?" + Lo + "+" + Oo + "(?=" + [Po, Gn, "$"].join("|") + ")",
        Fu + "+" + Co + "(?=" + [Po, Gn + Mo, "$"].join("|") + ")",
        Gn + "?" + Mo + "+" + Oo,
        Gn + "+" + Co,
        Hu,
        Nu,
        To,
        Yu
      ].join("|"), "g"), qu = RegExp("[" + Do + Wi + wo + So + "]"), Qu = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Ku = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ], $u = -1, re = {};
      re[kn] = re[ni] = re[Bn] = re[ii] = re[ri] = re[si] = re[zn] = re[At] = re[Gi] = !0, re[Qt] = re[Mn] = re[Jt] = re[fn] = re[St] = re[Kt] = re[dn] = re[On] = re[We] = re[$t] = re[_t] = re[Ct] = re[Ae] = re[pn] = re[gn] = !1;
      var ne = {};
      ne[Qt] = ne[Mn] = ne[Jt] = ne[St] = ne[fn] = ne[Kt] = ne[kn] = ne[ni] = ne[Bn] = ne[ii] = ne[ri] = ne[We] = ne[$t] = ne[_t] = ne[Ct] = ne[Ae] = ne[pn] = ne[Cn] = ne[si] = ne[zn] = ne[At] = ne[Gi] = !0, ne[dn] = ne[On] = ne[gn] = !1;
      var Ju = {
        // Latin-1 Supplement block.
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        // Latin Extended-A block.
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s"
      }, ec = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, tc = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, nc = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, ic = parseFloat, rc = parseInt, Go = typeof Cr == "object" && Cr && Cr.Object === Object && Cr, sc = typeof self == "object" && self && self.Object === Object && self, Pe = Go || sc || Function("return this")(), qr = a && !a.nodeType && a, vn = qr && !0 && x && !x.nodeType && x, Uo = vn && vn.exports === qr, Qr = Uo && Go.process, ot = function() {
        try {
          var g = vn && vn.require && vn.require("util").types;
          return g || Qr && Qr.binding && Qr.binding("util");
        } catch {
        }
      }(), Fo = ot && ot.isArrayBuffer, Wo = ot && ot.isDate, No = ot && ot.isMap, Ho = ot && ot.isRegExp, Yo = ot && ot.isSet, Xo = ot && ot.isTypedArray;
      function $e(g, v, m) {
        switch (m.length) {
          case 0:
            return g.call(v);
          case 1:
            return g.call(v, m[0]);
          case 2:
            return g.call(v, m[0], m[1]);
          case 3:
            return g.call(v, m[0], m[1], m[2]);
        }
        return g.apply(v, m);
      }
      function oc(g, v, m, L) {
        for (var B = -1, Z = g == null ? 0 : g.length; ++B < Z; ) {
          var ve = g[B];
          v(L, ve, m(ve), g);
        }
        return L;
      }
      function at(g, v) {
        for (var m = -1, L = g == null ? 0 : g.length; ++m < L && v(g[m], m, g) !== !1; )
          ;
        return g;
      }
      function ac(g, v) {
        for (var m = g == null ? 0 : g.length; m-- && v(g[m], m, g) !== !1; )
          ;
        return g;
      }
      function Zo(g, v) {
        for (var m = -1, L = g == null ? 0 : g.length; ++m < L; )
          if (!v(g[m], m, g))
            return !1;
        return !0;
      }
      function tn(g, v) {
        for (var m = -1, L = g == null ? 0 : g.length, B = 0, Z = []; ++m < L; ) {
          var ve = g[m];
          v(ve, m, g) && (Z[B++] = ve);
        }
        return Z;
      }
      function Hi(g, v) {
        var m = g == null ? 0 : g.length;
        return !!m && Un(g, v, 0) > -1;
      }
      function Kr(g, v, m) {
        for (var L = -1, B = g == null ? 0 : g.length; ++L < B; )
          if (m(v, g[L]))
            return !0;
        return !1;
      }
      function oe(g, v) {
        for (var m = -1, L = g == null ? 0 : g.length, B = Array(L); ++m < L; )
          B[m] = v(g[m], m, g);
        return B;
      }
      function nn(g, v) {
        for (var m = -1, L = v.length, B = g.length; ++m < L; )
          g[B + m] = v[m];
        return g;
      }
      function $r(g, v, m, L) {
        var B = -1, Z = g == null ? 0 : g.length;
        for (L && Z && (m = g[++B]); ++B < Z; )
          m = v(m, g[B], B, g);
        return m;
      }
      function lc(g, v, m, L) {
        var B = g == null ? 0 : g.length;
        for (L && B && (m = g[--B]); B--; )
          m = v(m, g[B], B, g);
        return m;
      }
      function Jr(g, v) {
        for (var m = -1, L = g == null ? 0 : g.length; ++m < L; )
          if (v(g[m], m, g))
            return !0;
        return !1;
      }
      var uc = es("length");
      function cc(g) {
        return g.split("");
      }
      function hc(g) {
        return g.match(bu) || [];
      }
      function jo(g, v, m) {
        var L;
        return m(g, function(B, Z, ve) {
          if (v(B, Z, ve))
            return L = Z, !1;
        }), L;
      }
      function Yi(g, v, m, L) {
        for (var B = g.length, Z = m + (L ? 1 : -1); L ? Z-- : ++Z < B; )
          if (v(g[Z], Z, g))
            return Z;
        return -1;
      }
      function Un(g, v, m) {
        return v === v ? xc(g, v, m) : Yi(g, Vo, m);
      }
      function fc(g, v, m, L) {
        for (var B = m - 1, Z = g.length; ++B < Z; )
          if (L(g[B], v))
            return B;
        return -1;
      }
      function Vo(g) {
        return g !== g;
      }
      function qo(g, v) {
        var m = g == null ? 0 : g.length;
        return m ? ns(g, v) / m : Qe;
      }
      function es(g) {
        return function(v) {
          return v == null ? n : v[g];
        };
      }
      function ts(g) {
        return function(v) {
          return g == null ? n : g[v];
        };
      }
      function Qo(g, v, m, L, B) {
        return B(g, function(Z, ve, J) {
          m = L ? (L = !1, Z) : v(m, Z, ve, J);
        }), m;
      }
      function dc(g, v) {
        var m = g.length;
        for (g.sort(v); m--; )
          g[m] = g[m].value;
        return g;
      }
      function ns(g, v) {
        for (var m, L = -1, B = g.length; ++L < B; ) {
          var Z = v(g[L]);
          Z !== n && (m = m === n ? Z : m + Z);
        }
        return m;
      }
      function is(g, v) {
        for (var m = -1, L = Array(g); ++m < g; )
          L[m] = v(m);
        return L;
      }
      function pc(g, v) {
        return oe(v, function(m) {
          return [m, g[m]];
        });
      }
      function Ko(g) {
        return g && g.slice(0, ta(g) + 1).replace(en, "");
      }
      function Je(g) {
        return function(v) {
          return g(v);
        };
      }
      function rs(g, v) {
        return oe(v, function(m) {
          return g[m];
        });
      }
      function ai(g, v) {
        return g.has(v);
      }
      function $o(g, v) {
        for (var m = -1, L = g.length; ++m < L && Un(v, g[m], 0) > -1; )
          ;
        return m;
      }
      function Jo(g, v) {
        for (var m = g.length; m-- && Un(v, g[m], 0) > -1; )
          ;
        return m;
      }
      function gc(g, v) {
        for (var m = g.length, L = 0; m--; )
          g[m] === v && ++L;
        return L;
      }
      var _c = ts(Ju), mc = ts(ec);
      function vc(g) {
        return "\\" + nc[g];
      }
      function bc(g, v) {
        return g == null ? n : g[v];
      }
      function Fn(g) {
        return qu.test(g);
      }
      function wc(g) {
        return Qu.test(g);
      }
      function yc(g) {
        for (var v, m = []; !(v = g.next()).done; )
          m.push(v.value);
        return m;
      }
      function ss(g) {
        var v = -1, m = Array(g.size);
        return g.forEach(function(L, B) {
          m[++v] = [B, L];
        }), m;
      }
      function ea(g, v) {
        return function(m) {
          return g(v(m));
        };
      }
      function rn(g, v) {
        for (var m = -1, L = g.length, B = 0, Z = []; ++m < L; ) {
          var ve = g[m];
          (ve === v || ve === ue) && (g[m] = ue, Z[B++] = m);
        }
        return Z;
      }
      function Xi(g) {
        var v = -1, m = Array(g.size);
        return g.forEach(function(L) {
          m[++v] = L;
        }), m;
      }
      function Ec(g) {
        var v = -1, m = Array(g.size);
        return g.forEach(function(L) {
          m[++v] = [L, L];
        }), m;
      }
      function xc(g, v, m) {
        for (var L = m - 1, B = g.length; ++L < B; )
          if (g[L] === v)
            return L;
        return -1;
      }
      function Sc(g, v, m) {
        for (var L = m + 1; L--; )
          if (g[L] === v)
            return L;
        return L;
      }
      function Wn(g) {
        return Fn(g) ? Pc(g) : uc(g);
      }
      function bt(g) {
        return Fn(g) ? Tc(g) : cc(g);
      }
      function ta(g) {
        for (var v = g.length; v-- && Ui.test(g.charAt(v)); )
          ;
        return v;
      }
      var Ac = ts(tc);
      function Pc(g) {
        for (var v = Vr.lastIndex = 0; Vr.test(g); )
          ++v;
        return v;
      }
      function Tc(g) {
        return g.match(Vr) || [];
      }
      function Lc(g) {
        return g.match(Vu) || [];
      }
      var Rc = function g(v) {
        v = v == null ? Pe : Nn.defaults(Pe.Object(), v, Nn.pick(Pe, Ku));
        var m = v.Array, L = v.Date, B = v.Error, Z = v.Function, ve = v.Math, J = v.Object, os = v.RegExp, Ic = v.String, lt = v.TypeError, Zi = m.prototype, Dc = Z.prototype, Hn = J.prototype, ji = v["__core-js_shared__"], Vi = Dc.toString, K = Hn.hasOwnProperty, Mc = 0, na = function() {
          var e = /[^.]+$/.exec(ji && ji.keys && ji.keys.IE_PROTO || "");
          return e ? "Symbol(src)_1." + e : "";
        }(), qi = Hn.toString, Oc = Vi.call(J), Cc = Pe._, kc = os(
          "^" + Vi.call(K).replace(Ke, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Qi = Uo ? v.Buffer : n, sn = v.Symbol, Ki = v.Uint8Array, ia = Qi ? Qi.allocUnsafe : n, $i = ea(J.getPrototypeOf, J), ra = J.create, sa = Hn.propertyIsEnumerable, Ji = Zi.splice, oa = sn ? sn.isConcatSpreadable : n, li = sn ? sn.iterator : n, bn = sn ? sn.toStringTag : n, er = function() {
          try {
            var e = Sn(J, "defineProperty");
            return e({}, "", {}), e;
          } catch {
          }
        }(), Bc = v.clearTimeout !== Pe.clearTimeout && v.clearTimeout, zc = L && L.now !== Pe.Date.now && L.now, Gc = v.setTimeout !== Pe.setTimeout && v.setTimeout, tr = ve.ceil, nr = ve.floor, as = J.getOwnPropertySymbols, Uc = Qi ? Qi.isBuffer : n, aa = v.isFinite, Fc = Zi.join, Wc = ea(J.keys, J), be = ve.max, De = ve.min, Nc = L.now, Hc = v.parseInt, la = ve.random, Yc = Zi.reverse, ls = Sn(v, "DataView"), ui = Sn(v, "Map"), us = Sn(v, "Promise"), Yn = Sn(v, "Set"), ci = Sn(v, "WeakMap"), hi = Sn(J, "create"), ir = ci && new ci(), Xn = {}, Xc = An(ls), Zc = An(ui), jc = An(us), Vc = An(Yn), qc = An(ci), rr = sn ? sn.prototype : n, fi = rr ? rr.valueOf : n, ua = rr ? rr.toString : n;
        function l(e) {
          if (fe(e) && !z(e) && !(e instanceof H)) {
            if (e instanceof ut)
              return e;
            if (K.call(e, "__wrapped__"))
              return cl(e);
          }
          return new ut(e);
        }
        var Zn = /* @__PURE__ */ function() {
          function e() {
          }
          return function(t) {
            if (!le(t))
              return {};
            if (ra)
              return ra(t);
            e.prototype = t;
            var i = new e();
            return e.prototype = n, i;
          };
        }();
        function sr() {
        }
        function ut(e, t) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = n;
        }
        l.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: vo,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: Hr,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: oi,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          variable: "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          imports: {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            _: l
          }
        }, l.prototype = sr.prototype, l.prototype.constructor = l, ut.prototype = Zn(sr.prototype), ut.prototype.constructor = ut;
        function H(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = we, this.__views__ = [];
        }
        function Qc() {
          var e = new H(this.__wrapped__);
          return e.__actions__ = He(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = He(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = He(this.__views__), e;
        }
        function Kc() {
          if (this.__filtered__) {
            var e = new H(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else
            e = this.clone(), e.__dir__ *= -1;
          return e;
        }
        function $c() {
          var e = this.__wrapped__.value(), t = this.__dir__, i = z(e), s = t < 0, o = i ? e.length : 0, u = hf(0, o, this.__views__), c = u.start, f = u.end, _ = f - c, y = s ? f : c - 1, E = this.__iteratees__, S = E.length, A = 0, I = De(_, this.__takeCount__);
          if (!i || !s && o == _ && I == _)
            return Oa(e, this.__actions__);
          var C = [];
          e:
            for (; _-- && A < I; ) {
              y += t;
              for (var U = -1, k = e[y]; ++U < S; ) {
                var N = E[U], Y = N.iteratee, nt = N.type, Ue = Y(k);
                if (nt == Se)
                  k = Ue;
                else if (!Ue) {
                  if (nt == Be)
                    continue e;
                  break e;
                }
              }
              C[A++] = k;
            }
          return C;
        }
        H.prototype = Zn(sr.prototype), H.prototype.constructor = H;
        function wn(e) {
          var t = -1, i = e == null ? 0 : e.length;
          for (this.clear(); ++t < i; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function Jc() {
          this.__data__ = hi ? hi(null) : {}, this.size = 0;
        }
        function eh(e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }
        function th(e) {
          var t = this.__data__;
          if (hi) {
            var i = t[e];
            return i === O ? n : i;
          }
          return K.call(t, e) ? t[e] : n;
        }
        function nh(e) {
          var t = this.__data__;
          return hi ? t[e] !== n : K.call(t, e);
        }
        function ih(e, t) {
          var i = this.__data__;
          return this.size += this.has(e) ? 0 : 1, i[e] = hi && t === n ? O : t, this;
        }
        wn.prototype.clear = Jc, wn.prototype.delete = eh, wn.prototype.get = th, wn.prototype.has = nh, wn.prototype.set = ih;
        function kt(e) {
          var t = -1, i = e == null ? 0 : e.length;
          for (this.clear(); ++t < i; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function rh() {
          this.__data__ = [], this.size = 0;
        }
        function sh(e) {
          var t = this.__data__, i = or(t, e);
          if (i < 0)
            return !1;
          var s = t.length - 1;
          return i == s ? t.pop() : Ji.call(t, i, 1), --this.size, !0;
        }
        function oh(e) {
          var t = this.__data__, i = or(t, e);
          return i < 0 ? n : t[i][1];
        }
        function ah(e) {
          return or(this.__data__, e) > -1;
        }
        function lh(e, t) {
          var i = this.__data__, s = or(i, e);
          return s < 0 ? (++this.size, i.push([e, t])) : i[s][1] = t, this;
        }
        kt.prototype.clear = rh, kt.prototype.delete = sh, kt.prototype.get = oh, kt.prototype.has = ah, kt.prototype.set = lh;
        function Bt(e) {
          var t = -1, i = e == null ? 0 : e.length;
          for (this.clear(); ++t < i; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function uh() {
          this.size = 0, this.__data__ = {
            hash: new wn(),
            map: new (ui || kt)(),
            string: new wn()
          };
        }
        function ch(e) {
          var t = vr(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }
        function hh(e) {
          return vr(this, e).get(e);
        }
        function fh(e) {
          return vr(this, e).has(e);
        }
        function dh(e, t) {
          var i = vr(this, e), s = i.size;
          return i.set(e, t), this.size += i.size == s ? 0 : 1, this;
        }
        Bt.prototype.clear = uh, Bt.prototype.delete = ch, Bt.prototype.get = hh, Bt.prototype.has = fh, Bt.prototype.set = dh;
        function yn(e) {
          var t = -1, i = e == null ? 0 : e.length;
          for (this.__data__ = new Bt(); ++t < i; )
            this.add(e[t]);
        }
        function ph(e) {
          return this.__data__.set(e, O), this;
        }
        function gh(e) {
          return this.__data__.has(e);
        }
        yn.prototype.add = yn.prototype.push = ph, yn.prototype.has = gh;
        function wt(e) {
          var t = this.__data__ = new kt(e);
          this.size = t.size;
        }
        function _h() {
          this.__data__ = new kt(), this.size = 0;
        }
        function mh(e) {
          var t = this.__data__, i = t.delete(e);
          return this.size = t.size, i;
        }
        function vh(e) {
          return this.__data__.get(e);
        }
        function bh(e) {
          return this.__data__.has(e);
        }
        function wh(e, t) {
          var i = this.__data__;
          if (i instanceof kt) {
            var s = i.__data__;
            if (!ui || s.length < h - 1)
              return s.push([e, t]), this.size = ++i.size, this;
            i = this.__data__ = new Bt(s);
          }
          return i.set(e, t), this.size = i.size, this;
        }
        wt.prototype.clear = _h, wt.prototype.delete = mh, wt.prototype.get = vh, wt.prototype.has = bh, wt.prototype.set = wh;
        function ca(e, t) {
          var i = z(e), s = !i && Pn(e), o = !i && !s && cn(e), u = !i && !s && !o && Qn(e), c = i || s || o || u, f = c ? is(e.length, Ic) : [], _ = f.length;
          for (var y in e)
            (t || K.call(e, y)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
            (y == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            o && (y == "offset" || y == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            u && (y == "buffer" || y == "byteLength" || y == "byteOffset") || // Skip index properties.
            Ft(y, _))) && f.push(y);
          return f;
        }
        function ha(e) {
          var t = e.length;
          return t ? e[ws(0, t - 1)] : n;
        }
        function yh(e, t) {
          return br(He(e), En(t, 0, e.length));
        }
        function Eh(e) {
          return br(He(e));
        }
        function cs(e, t, i) {
          (i !== n && !yt(e[t], i) || i === n && !(t in e)) && zt(e, t, i);
        }
        function di(e, t, i) {
          var s = e[t];
          (!(K.call(e, t) && yt(s, i)) || i === n && !(t in e)) && zt(e, t, i);
        }
        function or(e, t) {
          for (var i = e.length; i--; )
            if (yt(e[i][0], t))
              return i;
          return -1;
        }
        function xh(e, t, i, s) {
          return on(e, function(o, u, c) {
            t(s, o, i(o), c);
          }), s;
        }
        function fa(e, t) {
          return e && Lt(t, Ee(t), e);
        }
        function Sh(e, t) {
          return e && Lt(t, Xe(t), e);
        }
        function zt(e, t, i) {
          t == "__proto__" && er ? er(e, t, {
            configurable: !0,
            enumerable: !0,
            value: i,
            writable: !0
          }) : e[t] = i;
        }
        function hs(e, t) {
          for (var i = -1, s = t.length, o = m(s), u = e == null; ++i < s; )
            o[i] = u ? n : Xs(e, t[i]);
          return o;
        }
        function En(e, t, i) {
          return e === e && (i !== n && (e = e <= i ? e : i), t !== n && (e = e >= t ? e : t)), e;
        }
        function ct(e, t, i, s, o, u) {
          var c, f = t & ce, _ = t & Le, y = t & Re;
          if (i && (c = o ? i(e, s, o, u) : i(e)), c !== n)
            return c;
          if (!le(e))
            return e;
          var E = z(e);
          if (E) {
            if (c = df(e), !f)
              return He(e, c);
          } else {
            var S = Me(e), A = S == On || S == Mi;
            if (cn(e))
              return Ba(e, f);
            if (S == _t || S == Qt || A && !o) {
              if (c = _ || A ? {} : tl(e), !f)
                return _ ? tf(e, Sh(c, e)) : ef(e, fa(c, e));
            } else {
              if (!ne[S])
                return o ? e : {};
              c = pf(e, S, f);
            }
          }
          u || (u = new wt());
          var I = u.get(e);
          if (I)
            return I;
          u.set(e, c), Il(e) ? e.forEach(function(k) {
            c.add(ct(k, t, i, k, e, u));
          }) : Ll(e) && e.forEach(function(k, N) {
            c.set(N, ct(k, t, i, N, e, u));
          });
          var C = y ? _ ? Ds : Is : _ ? Xe : Ee, U = E ? n : C(e);
          return at(U || e, function(k, N) {
            U && (N = k, k = e[N]), di(c, N, ct(k, t, i, N, e, u));
          }), c;
        }
        function Ah(e) {
          var t = Ee(e);
          return function(i) {
            return da(i, e, t);
          };
        }
        function da(e, t, i) {
          var s = i.length;
          if (e == null)
            return !s;
          for (e = J(e); s--; ) {
            var o = i[s], u = t[o], c = e[o];
            if (c === n && !(o in e) || !u(c))
              return !1;
          }
          return !0;
        }
        function pa(e, t, i) {
          if (typeof e != "function")
            throw new lt(p);
          return wi(function() {
            e.apply(n, i);
          }, t);
        }
        function pi(e, t, i, s) {
          var o = -1, u = Hi, c = !0, f = e.length, _ = [], y = t.length;
          if (!f)
            return _;
          i && (t = oe(t, Je(i))), s ? (u = Kr, c = !1) : t.length >= h && (u = ai, c = !1, t = new yn(t));
          e:
            for (; ++o < f; ) {
              var E = e[o], S = i == null ? E : i(E);
              if (E = s || E !== 0 ? E : 0, c && S === S) {
                for (var A = y; A--; )
                  if (t[A] === S)
                    continue e;
                _.push(E);
              } else u(t, S, s) || _.push(E);
            }
          return _;
        }
        var on = Wa(Tt), ga = Wa(ds, !0);
        function Ph(e, t) {
          var i = !0;
          return on(e, function(s, o, u) {
            return i = !!t(s, o, u), i;
          }), i;
        }
        function ar(e, t, i) {
          for (var s = -1, o = e.length; ++s < o; ) {
            var u = e[s], c = t(u);
            if (c != null && (f === n ? c === c && !tt(c) : i(c, f)))
              var f = c, _ = u;
          }
          return _;
        }
        function Th(e, t, i, s) {
          var o = e.length;
          for (i = G(i), i < 0 && (i = -i > o ? 0 : o + i), s = s === n || s > o ? o : G(s), s < 0 && (s += o), s = i > s ? 0 : Ml(s); i < s; )
            e[i++] = t;
          return e;
        }
        function _a(e, t) {
          var i = [];
          return on(e, function(s, o, u) {
            t(s, o, u) && i.push(s);
          }), i;
        }
        function Te(e, t, i, s, o) {
          var u = -1, c = e.length;
          for (i || (i = _f), o || (o = []); ++u < c; ) {
            var f = e[u];
            t > 0 && i(f) ? t > 1 ? Te(f, t - 1, i, s, o) : nn(o, f) : s || (o[o.length] = f);
          }
          return o;
        }
        var fs = Na(), ma = Na(!0);
        function Tt(e, t) {
          return e && fs(e, t, Ee);
        }
        function ds(e, t) {
          return e && ma(e, t, Ee);
        }
        function lr(e, t) {
          return tn(t, function(i) {
            return Wt(e[i]);
          });
        }
        function xn(e, t) {
          t = ln(t, e);
          for (var i = 0, s = t.length; e != null && i < s; )
            e = e[Rt(t[i++])];
          return i && i == s ? e : n;
        }
        function va(e, t, i) {
          var s = t(e);
          return z(e) ? s : nn(s, i(e));
        }
        function ze(e) {
          return e == null ? e === n ? Bi : Oi : bn && bn in J(e) ? cf(e) : xf(e);
        }
        function ps(e, t) {
          return e > t;
        }
        function Lh(e, t) {
          return e != null && K.call(e, t);
        }
        function Rh(e, t) {
          return e != null && t in J(e);
        }
        function Ih(e, t, i) {
          return e >= De(t, i) && e < be(t, i);
        }
        function gs(e, t, i) {
          for (var s = i ? Kr : Hi, o = e[0].length, u = e.length, c = u, f = m(u), _ = 1 / 0, y = []; c--; ) {
            var E = e[c];
            c && t && (E = oe(E, Je(t))), _ = De(E.length, _), f[c] = !i && (t || o >= 120 && E.length >= 120) ? new yn(c && E) : n;
          }
          E = e[0];
          var S = -1, A = f[0];
          e:
            for (; ++S < o && y.length < _; ) {
              var I = E[S], C = t ? t(I) : I;
              if (I = i || I !== 0 ? I : 0, !(A ? ai(A, C) : s(y, C, i))) {
                for (c = u; --c; ) {
                  var U = f[c];
                  if (!(U ? ai(U, C) : s(e[c], C, i)))
                    continue e;
                }
                A && A.push(C), y.push(I);
              }
            }
          return y;
        }
        function Dh(e, t, i, s) {
          return Tt(e, function(o, u, c) {
            t(s, i(o), u, c);
          }), s;
        }
        function gi(e, t, i) {
          t = ln(t, e), e = sl(e, t);
          var s = e == null ? e : e[Rt(ft(t))];
          return s == null ? n : $e(s, e, i);
        }
        function ba(e) {
          return fe(e) && ze(e) == Qt;
        }
        function Mh(e) {
          return fe(e) && ze(e) == Jt;
        }
        function Oh(e) {
          return fe(e) && ze(e) == Kt;
        }
        function _i(e, t, i, s, o) {
          return e === t ? !0 : e == null || t == null || !fe(e) && !fe(t) ? e !== e && t !== t : Ch(e, t, i, s, _i, o);
        }
        function Ch(e, t, i, s, o, u) {
          var c = z(e), f = z(t), _ = c ? Mn : Me(e), y = f ? Mn : Me(t);
          _ = _ == Qt ? _t : _, y = y == Qt ? _t : y;
          var E = _ == _t, S = y == _t, A = _ == y;
          if (A && cn(e)) {
            if (!cn(t))
              return !1;
            c = !0, E = !1;
          }
          if (A && !E)
            return u || (u = new wt()), c || Qn(e) ? $a(e, t, i, s, o, u) : lf(e, t, _, i, s, o, u);
          if (!(i & me)) {
            var I = E && K.call(e, "__wrapped__"), C = S && K.call(t, "__wrapped__");
            if (I || C) {
              var U = I ? e.value() : e, k = C ? t.value() : t;
              return u || (u = new wt()), o(U, k, i, s, u);
            }
          }
          return A ? (u || (u = new wt()), uf(e, t, i, s, o, u)) : !1;
        }
        function kh(e) {
          return fe(e) && Me(e) == We;
        }
        function _s(e, t, i, s) {
          var o = i.length, u = o, c = !s;
          if (e == null)
            return !u;
          for (e = J(e); o--; ) {
            var f = i[o];
            if (c && f[2] ? f[1] !== e[f[0]] : !(f[0] in e))
              return !1;
          }
          for (; ++o < u; ) {
            f = i[o];
            var _ = f[0], y = e[_], E = f[1];
            if (c && f[2]) {
              if (y === n && !(_ in e))
                return !1;
            } else {
              var S = new wt();
              if (s)
                var A = s(y, E, _, e, t, S);
              if (!(A === n ? _i(E, y, me | he, s, S) : A))
                return !1;
            }
          }
          return !0;
        }
        function wa(e) {
          if (!le(e) || vf(e))
            return !1;
          var t = Wt(e) ? kc : Au;
          return t.test(An(e));
        }
        function Bh(e) {
          return fe(e) && ze(e) == Ct;
        }
        function zh(e) {
          return fe(e) && Me(e) == Ae;
        }
        function Gh(e) {
          return fe(e) && Ar(e.length) && !!re[ze(e)];
        }
        function ya(e) {
          return typeof e == "function" ? e : e == null ? Ze : typeof e == "object" ? z(e) ? Sa(e[0], e[1]) : xa(e) : Hl(e);
        }
        function ms(e) {
          if (!bi(e))
            return Wc(e);
          var t = [];
          for (var i in J(e))
            K.call(e, i) && i != "constructor" && t.push(i);
          return t;
        }
        function Uh(e) {
          if (!le(e))
            return Ef(e);
          var t = bi(e), i = [];
          for (var s in e)
            s == "constructor" && (t || !K.call(e, s)) || i.push(s);
          return i;
        }
        function vs(e, t) {
          return e < t;
        }
        function Ea(e, t) {
          var i = -1, s = Ye(e) ? m(e.length) : [];
          return on(e, function(o, u, c) {
            s[++i] = t(o, u, c);
          }), s;
        }
        function xa(e) {
          var t = Os(e);
          return t.length == 1 && t[0][2] ? il(t[0][0], t[0][1]) : function(i) {
            return i === e || _s(i, e, t);
          };
        }
        function Sa(e, t) {
          return ks(e) && nl(t) ? il(Rt(e), t) : function(i) {
            var s = Xs(i, e);
            return s === n && s === t ? Zs(i, e) : _i(t, s, me | he);
          };
        }
        function ur(e, t, i, s, o) {
          e !== t && fs(t, function(u, c) {
            if (o || (o = new wt()), le(u))
              Fh(e, t, c, i, ur, s, o);
            else {
              var f = s ? s(zs(e, c), u, c + "", e, t, o) : n;
              f === n && (f = u), cs(e, c, f);
            }
          }, Xe);
        }
        function Fh(e, t, i, s, o, u, c) {
          var f = zs(e, i), _ = zs(t, i), y = c.get(_);
          if (y) {
            cs(e, i, y);
            return;
          }
          var E = u ? u(f, _, i + "", e, t, c) : n, S = E === n;
          if (S) {
            var A = z(_), I = !A && cn(_), C = !A && !I && Qn(_);
            E = _, A || I || C ? z(f) ? E = f : de(f) ? E = He(f) : I ? (S = !1, E = Ba(_, !0)) : C ? (S = !1, E = za(_, !0)) : E = [] : yi(_) || Pn(_) ? (E = f, Pn(f) ? E = Ol(f) : (!le(f) || Wt(f)) && (E = tl(_))) : S = !1;
          }
          S && (c.set(_, E), o(E, _, s, u, c), c.delete(_)), cs(e, i, E);
        }
        function Aa(e, t) {
          var i = e.length;
          if (i)
            return t += t < 0 ? i : 0, Ft(t, i) ? e[t] : n;
        }
        function Pa(e, t, i) {
          t.length ? t = oe(t, function(u) {
            return z(u) ? function(c) {
              return xn(c, u.length === 1 ? u[0] : u);
            } : u;
          }) : t = [Ze];
          var s = -1;
          t = oe(t, Je(M()));
          var o = Ea(e, function(u, c, f) {
            var _ = oe(t, function(y) {
              return y(u);
            });
            return { criteria: _, index: ++s, value: u };
          });
          return dc(o, function(u, c) {
            return Jh(u, c, i);
          });
        }
        function Wh(e, t) {
          return Ta(e, t, function(i, s) {
            return Zs(e, s);
          });
        }
        function Ta(e, t, i) {
          for (var s = -1, o = t.length, u = {}; ++s < o; ) {
            var c = t[s], f = xn(e, c);
            i(f, c) && mi(u, ln(c, e), f);
          }
          return u;
        }
        function Nh(e) {
          return function(t) {
            return xn(t, e);
          };
        }
        function bs(e, t, i, s) {
          var o = s ? fc : Un, u = -1, c = t.length, f = e;
          for (e === t && (t = He(t)), i && (f = oe(e, Je(i))); ++u < c; )
            for (var _ = 0, y = t[u], E = i ? i(y) : y; (_ = o(f, E, _, s)) > -1; )
              f !== e && Ji.call(f, _, 1), Ji.call(e, _, 1);
          return e;
        }
        function La(e, t) {
          for (var i = e ? t.length : 0, s = i - 1; i--; ) {
            var o = t[i];
            if (i == s || o !== u) {
              var u = o;
              Ft(o) ? Ji.call(e, o, 1) : xs(e, o);
            }
          }
          return e;
        }
        function ws(e, t) {
          return e + nr(la() * (t - e + 1));
        }
        function Hh(e, t, i, s) {
          for (var o = -1, u = be(tr((t - e) / (i || 1)), 0), c = m(u); u--; )
            c[s ? u : ++o] = e, e += i;
          return c;
        }
        function ys(e, t) {
          var i = "";
          if (!e || t < 1 || t > Ie)
            return i;
          do
            t % 2 && (i += e), t = nr(t / 2), t && (e += e);
          while (t);
          return i;
        }
        function F(e, t) {
          return Gs(rl(e, t, Ze), e + "");
        }
        function Yh(e) {
          return ha(Kn(e));
        }
        function Xh(e, t) {
          var i = Kn(e);
          return br(i, En(t, 0, i.length));
        }
        function mi(e, t, i, s) {
          if (!le(e))
            return e;
          t = ln(t, e);
          for (var o = -1, u = t.length, c = u - 1, f = e; f != null && ++o < u; ) {
            var _ = Rt(t[o]), y = i;
            if (_ === "__proto__" || _ === "constructor" || _ === "prototype")
              return e;
            if (o != c) {
              var E = f[_];
              y = s ? s(E, _, f) : n, y === n && (y = le(E) ? E : Ft(t[o + 1]) ? [] : {});
            }
            di(f, _, y), f = f[_];
          }
          return e;
        }
        var Ra = ir ? function(e, t) {
          return ir.set(e, t), e;
        } : Ze, Zh = er ? function(e, t) {
          return er(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Vs(t),
            writable: !0
          });
        } : Ze;
        function jh(e) {
          return br(Kn(e));
        }
        function ht(e, t, i) {
          var s = -1, o = e.length;
          t < 0 && (t = -t > o ? 0 : o + t), i = i > o ? o : i, i < 0 && (i += o), o = t > i ? 0 : i - t >>> 0, t >>>= 0;
          for (var u = m(o); ++s < o; )
            u[s] = e[s + t];
          return u;
        }
        function Vh(e, t) {
          var i;
          return on(e, function(s, o, u) {
            return i = t(s, o, u), !i;
          }), !!i;
        }
        function cr(e, t, i) {
          var s = 0, o = e == null ? s : e.length;
          if (typeof t == "number" && t === t && o <= In) {
            for (; s < o; ) {
              var u = s + o >>> 1, c = e[u];
              c !== null && !tt(c) && (i ? c <= t : c < t) ? s = u + 1 : o = u;
            }
            return o;
          }
          return Es(e, t, Ze, i);
        }
        function Es(e, t, i, s) {
          var o = 0, u = e == null ? 0 : e.length;
          if (u === 0)
            return 0;
          t = i(t);
          for (var c = t !== t, f = t === null, _ = tt(t), y = t === n; o < u; ) {
            var E = nr((o + u) / 2), S = i(e[E]), A = S !== n, I = S === null, C = S === S, U = tt(S);
            if (c)
              var k = s || C;
            else y ? k = C && (s || A) : f ? k = C && A && (s || !I) : _ ? k = C && A && !I && (s || !U) : I || U ? k = !1 : k = s ? S <= t : S < t;
            k ? o = E + 1 : u = E;
          }
          return De(u, qt);
        }
        function Ia(e, t) {
          for (var i = -1, s = e.length, o = 0, u = []; ++i < s; ) {
            var c = e[i], f = t ? t(c) : c;
            if (!i || !yt(f, _)) {
              var _ = f;
              u[o++] = c === 0 ? 0 : c;
            }
          }
          return u;
        }
        function Da(e) {
          return typeof e == "number" ? e : tt(e) ? Qe : +e;
        }
        function et(e) {
          if (typeof e == "string")
            return e;
          if (z(e))
            return oe(e, et) + "";
          if (tt(e))
            return ua ? ua.call(e) : "";
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function an(e, t, i) {
          var s = -1, o = Hi, u = e.length, c = !0, f = [], _ = f;
          if (i)
            c = !1, o = Kr;
          else if (u >= h) {
            var y = t ? null : of(e);
            if (y)
              return Xi(y);
            c = !1, o = ai, _ = new yn();
          } else
            _ = t ? [] : f;
          e:
            for (; ++s < u; ) {
              var E = e[s], S = t ? t(E) : E;
              if (E = i || E !== 0 ? E : 0, c && S === S) {
                for (var A = _.length; A--; )
                  if (_[A] === S)
                    continue e;
                t && _.push(S), f.push(E);
              } else o(_, S, i) || (_ !== f && _.push(S), f.push(E));
            }
          return f;
        }
        function xs(e, t) {
          return t = ln(t, e), e = sl(e, t), e == null || delete e[Rt(ft(t))];
        }
        function Ma(e, t, i, s) {
          return mi(e, t, i(xn(e, t)), s);
        }
        function hr(e, t, i, s) {
          for (var o = e.length, u = s ? o : -1; (s ? u-- : ++u < o) && t(e[u], u, e); )
            ;
          return i ? ht(e, s ? 0 : u, s ? u + 1 : o) : ht(e, s ? u + 1 : 0, s ? o : u);
        }
        function Oa(e, t) {
          var i = e;
          return i instanceof H && (i = i.value()), $r(t, function(s, o) {
            return o.func.apply(o.thisArg, nn([s], o.args));
          }, i);
        }
        function Ss(e, t, i) {
          var s = e.length;
          if (s < 2)
            return s ? an(e[0]) : [];
          for (var o = -1, u = m(s); ++o < s; )
            for (var c = e[o], f = -1; ++f < s; )
              f != o && (u[o] = pi(u[o] || c, e[f], t, i));
          return an(Te(u, 1), t, i);
        }
        function Ca(e, t, i) {
          for (var s = -1, o = e.length, u = t.length, c = {}; ++s < o; ) {
            var f = s < u ? t[s] : n;
            i(c, e[s], f);
          }
          return c;
        }
        function As(e) {
          return de(e) ? e : [];
        }
        function Ps(e) {
          return typeof e == "function" ? e : Ze;
        }
        function ln(e, t) {
          return z(e) ? e : ks(e, t) ? [e] : ul(j(e));
        }
        var qh = F;
        function un(e, t, i) {
          var s = e.length;
          return i = i === n ? s : i, !t && i >= s ? e : ht(e, t, i);
        }
        var ka = Bc || function(e) {
          return Pe.clearTimeout(e);
        };
        function Ba(e, t) {
          if (t)
            return e.slice();
          var i = e.length, s = ia ? ia(i) : new e.constructor(i);
          return e.copy(s), s;
        }
        function Ts(e) {
          var t = new e.constructor(e.byteLength);
          return new Ki(t).set(new Ki(e)), t;
        }
        function Qh(e, t) {
          var i = t ? Ts(e.buffer) : e.buffer;
          return new e.constructor(i, e.byteOffset, e.byteLength);
        }
        function Kh(e) {
          var t = new e.constructor(e.source, bo.exec(e));
          return t.lastIndex = e.lastIndex, t;
        }
        function $h(e) {
          return fi ? J(fi.call(e)) : {};
        }
        function za(e, t) {
          var i = t ? Ts(e.buffer) : e.buffer;
          return new e.constructor(i, e.byteOffset, e.length);
        }
        function Ga(e, t) {
          if (e !== t) {
            var i = e !== n, s = e === null, o = e === e, u = tt(e), c = t !== n, f = t === null, _ = t === t, y = tt(t);
            if (!f && !y && !u && e > t || u && c && _ && !f && !y || s && c && _ || !i && _ || !o)
              return 1;
            if (!s && !u && !y && e < t || y && i && o && !s && !u || f && i && o || !c && o || !_)
              return -1;
          }
          return 0;
        }
        function Jh(e, t, i) {
          for (var s = -1, o = e.criteria, u = t.criteria, c = o.length, f = i.length; ++s < c; ) {
            var _ = Ga(o[s], u[s]);
            if (_) {
              if (s >= f)
                return _;
              var y = i[s];
              return _ * (y == "desc" ? -1 : 1);
            }
          }
          return e.index - t.index;
        }
        function Ua(e, t, i, s) {
          for (var o = -1, u = e.length, c = i.length, f = -1, _ = t.length, y = be(u - c, 0), E = m(_ + y), S = !s; ++f < _; )
            E[f] = t[f];
          for (; ++o < c; )
            (S || o < u) && (E[i[o]] = e[o]);
          for (; y--; )
            E[f++] = e[o++];
          return E;
        }
        function Fa(e, t, i, s) {
          for (var o = -1, u = e.length, c = -1, f = i.length, _ = -1, y = t.length, E = be(u - f, 0), S = m(E + y), A = !s; ++o < E; )
            S[o] = e[o];
          for (var I = o; ++_ < y; )
            S[I + _] = t[_];
          for (; ++c < f; )
            (A || o < u) && (S[I + i[c]] = e[o++]);
          return S;
        }
        function He(e, t) {
          var i = -1, s = e.length;
          for (t || (t = m(s)); ++i < s; )
            t[i] = e[i];
          return t;
        }
        function Lt(e, t, i, s) {
          var o = !i;
          i || (i = {});
          for (var u = -1, c = t.length; ++u < c; ) {
            var f = t[u], _ = s ? s(i[f], e[f], f, i, e) : n;
            _ === n && (_ = e[f]), o ? zt(i, f, _) : di(i, f, _);
          }
          return i;
        }
        function ef(e, t) {
          return Lt(e, Cs(e), t);
        }
        function tf(e, t) {
          return Lt(e, Ja(e), t);
        }
        function fr(e, t) {
          return function(i, s) {
            var o = z(i) ? oc : xh, u = t ? t() : {};
            return o(i, e, M(s, 2), u);
          };
        }
        function jn(e) {
          return F(function(t, i) {
            var s = -1, o = i.length, u = o > 1 ? i[o - 1] : n, c = o > 2 ? i[2] : n;
            for (u = e.length > 3 && typeof u == "function" ? (o--, u) : n, c && Ge(i[0], i[1], c) && (u = o < 3 ? n : u, o = 1), t = J(t); ++s < o; ) {
              var f = i[s];
              f && e(t, f, s, u);
            }
            return t;
          });
        }
        function Wa(e, t) {
          return function(i, s) {
            if (i == null)
              return i;
            if (!Ye(i))
              return e(i, s);
            for (var o = i.length, u = t ? o : -1, c = J(i); (t ? u-- : ++u < o) && s(c[u], u, c) !== !1; )
              ;
            return i;
          };
        }
        function Na(e) {
          return function(t, i, s) {
            for (var o = -1, u = J(t), c = s(t), f = c.length; f--; ) {
              var _ = c[e ? f : ++o];
              if (i(u[_], _, u) === !1)
                break;
            }
            return t;
          };
        }
        function nf(e, t, i) {
          var s = t & $, o = vi(e);
          function u() {
            var c = this && this !== Pe && this instanceof u ? o : e;
            return c.apply(s ? i : this, arguments);
          }
          return u;
        }
        function Ha(e) {
          return function(t) {
            t = j(t);
            var i = Fn(t) ? bt(t) : n, s = i ? i[0] : t.charAt(0), o = i ? un(i, 1).join("") : t.slice(1);
            return s[e]() + o;
          };
        }
        function Vn(e) {
          return function(t) {
            return $r(Wl(Fl(t).replace(Zu, "")), e, "");
          };
        }
        function vi(e) {
          return function() {
            var t = arguments;
            switch (t.length) {
              case 0:
                return new e();
              case 1:
                return new e(t[0]);
              case 2:
                return new e(t[0], t[1]);
              case 3:
                return new e(t[0], t[1], t[2]);
              case 4:
                return new e(t[0], t[1], t[2], t[3]);
              case 5:
                return new e(t[0], t[1], t[2], t[3], t[4]);
              case 6:
                return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
              case 7:
                return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
            }
            var i = Zn(e.prototype), s = e.apply(i, t);
            return le(s) ? s : i;
          };
        }
        function rf(e, t, i) {
          var s = vi(e);
          function o() {
            for (var u = arguments.length, c = m(u), f = u, _ = qn(o); f--; )
              c[f] = arguments[f];
            var y = u < 3 && c[0] !== _ && c[u - 1] !== _ ? [] : rn(c, _);
            if (u -= y.length, u < i)
              return Va(
                e,
                t,
                dr,
                o.placeholder,
                n,
                c,
                y,
                n,
                n,
                i - u
              );
            var E = this && this !== Pe && this instanceof o ? s : e;
            return $e(E, this, c);
          }
          return o;
        }
        function Ya(e) {
          return function(t, i, s) {
            var o = J(t);
            if (!Ye(t)) {
              var u = M(i, 3);
              t = Ee(t), i = function(f) {
                return u(o[f], f, o);
              };
            }
            var c = e(t, i, s);
            return c > -1 ? o[u ? t[c] : c] : n;
          };
        }
        function Xa(e) {
          return Ut(function(t) {
            var i = t.length, s = i, o = ut.prototype.thru;
            for (e && t.reverse(); s--; ) {
              var u = t[s];
              if (typeof u != "function")
                throw new lt(p);
              if (o && !c && mr(u) == "wrapper")
                var c = new ut([], !0);
            }
            for (s = c ? s : i; ++s < i; ) {
              u = t[s];
              var f = mr(u), _ = f == "wrapper" ? Ms(u) : n;
              _ && Bs(_[0]) && _[1] == (q | V | te | Ve) && !_[4].length && _[9] == 1 ? c = c[mr(_[0])].apply(c, _[3]) : c = u.length == 1 && Bs(u) ? c[f]() : c.thru(u);
            }
            return function() {
              var y = arguments, E = y[0];
              if (c && y.length == 1 && z(E))
                return c.plant(E).value();
              for (var S = 0, A = i ? t[S].apply(this, y) : E; ++S < i; )
                A = t[S].call(this, A);
              return A;
            };
          });
        }
        function dr(e, t, i, s, o, u, c, f, _, y) {
          var E = t & q, S = t & $, A = t & se, I = t & (V | ke), C = t & Mt, U = A ? n : vi(e);
          function k() {
            for (var N = arguments.length, Y = m(N), nt = N; nt--; )
              Y[nt] = arguments[nt];
            if (I)
              var Ue = qn(k), it = gc(Y, Ue);
            if (s && (Y = Ua(Y, s, o, I)), u && (Y = Fa(Y, u, c, I)), N -= it, I && N < y) {
              var pe = rn(Y, Ue);
              return Va(
                e,
                t,
                dr,
                k.placeholder,
                i,
                Y,
                pe,
                f,
                _,
                y - N
              );
            }
            var Et = S ? i : this, Ht = A ? Et[e] : e;
            return N = Y.length, f ? Y = Sf(Y, f) : C && N > 1 && Y.reverse(), E && _ < N && (Y.length = _), this && this !== Pe && this instanceof k && (Ht = U || vi(Ht)), Ht.apply(Et, Y);
          }
          return k;
        }
        function Za(e, t) {
          return function(i, s) {
            return Dh(i, e, t(s), {});
          };
        }
        function pr(e, t) {
          return function(i, s) {
            var o;
            if (i === n && s === n)
              return t;
            if (i !== n && (o = i), s !== n) {
              if (o === n)
                return s;
              typeof i == "string" || typeof s == "string" ? (i = et(i), s = et(s)) : (i = Da(i), s = Da(s)), o = e(i, s);
            }
            return o;
          };
        }
        function Ls(e) {
          return Ut(function(t) {
            return t = oe(t, Je(M())), F(function(i) {
              var s = this;
              return e(t, function(o) {
                return $e(o, s, i);
              });
            });
          });
        }
        function gr(e, t) {
          t = t === n ? " " : et(t);
          var i = t.length;
          if (i < 2)
            return i ? ys(t, e) : t;
          var s = ys(t, tr(e / Wn(t)));
          return Fn(t) ? un(bt(s), 0, e).join("") : s.slice(0, e);
        }
        function sf(e, t, i, s) {
          var o = t & $, u = vi(e);
          function c() {
            for (var f = -1, _ = arguments.length, y = -1, E = s.length, S = m(E + _), A = this && this !== Pe && this instanceof c ? u : e; ++y < E; )
              S[y] = s[y];
            for (; _--; )
              S[y++] = arguments[++f];
            return $e(A, o ? i : this, S);
          }
          return c;
        }
        function ja(e) {
          return function(t, i, s) {
            return s && typeof s != "number" && Ge(t, i, s) && (i = s = n), t = Nt(t), i === n ? (i = t, t = 0) : i = Nt(i), s = s === n ? t < i ? 1 : -1 : Nt(s), Hh(t, i, s, e);
          };
        }
        function _r(e) {
          return function(t, i) {
            return typeof t == "string" && typeof i == "string" || (t = dt(t), i = dt(i)), e(t, i);
          };
        }
        function Va(e, t, i, s, o, u, c, f, _, y) {
          var E = t & V, S = E ? c : n, A = E ? n : c, I = E ? u : n, C = E ? n : u;
          t |= E ? te : st, t &= ~(E ? st : te), t & ie || (t &= -4);
          var U = [
            e,
            t,
            o,
            I,
            S,
            C,
            A,
            f,
            _,
            y
          ], k = i.apply(n, U);
          return Bs(e) && ol(k, U), k.placeholder = s, al(k, e, t);
        }
        function Rs(e) {
          var t = ve[e];
          return function(i, s) {
            if (i = dt(i), s = s == null ? 0 : De(G(s), 292), s && aa(i)) {
              var o = (j(i) + "e").split("e"), u = t(o[0] + "e" + (+o[1] + s));
              return o = (j(u) + "e").split("e"), +(o[0] + "e" + (+o[1] - s));
            }
            return t(i);
          };
        }
        var of = Yn && 1 / Xi(new Yn([, -0]))[1] == ge ? function(e) {
          return new Yn(e);
        } : Ks;
        function qa(e) {
          return function(t) {
            var i = Me(t);
            return i == We ? ss(t) : i == Ae ? Ec(t) : pc(t, e(t));
          };
        }
        function Gt(e, t, i, s, o, u, c, f) {
          var _ = t & se;
          if (!_ && typeof e != "function")
            throw new lt(p);
          var y = s ? s.length : 0;
          if (y || (t &= -97, s = o = n), c = c === n ? c : be(G(c), 0), f = f === n ? f : G(f), y -= o ? o.length : 0, t & st) {
            var E = s, S = o;
            s = o = n;
          }
          var A = _ ? n : Ms(e), I = [
            e,
            t,
            i,
            s,
            o,
            E,
            S,
            u,
            c,
            f
          ];
          if (A && yf(I, A), e = I[0], t = I[1], i = I[2], s = I[3], o = I[4], f = I[9] = I[9] === n ? _ ? 0 : e.length : be(I[9] - y, 0), !f && t & (V | ke) && (t &= -25), !t || t == $)
            var C = nf(e, t, i);
          else t == V || t == ke ? C = rf(e, t, f) : (t == te || t == ($ | te)) && !o.length ? C = sf(e, t, i, s) : C = dr.apply(n, I);
          var U = A ? Ra : ol;
          return al(U(C, I), e, t);
        }
        function Qa(e, t, i, s) {
          return e === n || yt(e, Hn[i]) && !K.call(s, i) ? t : e;
        }
        function Ka(e, t, i, s, o, u) {
          return le(e) && le(t) && (u.set(t, e), ur(e, t, n, Ka, u), u.delete(t)), e;
        }
        function af(e) {
          return yi(e) ? n : e;
        }
        function $a(e, t, i, s, o, u) {
          var c = i & me, f = e.length, _ = t.length;
          if (f != _ && !(c && _ > f))
            return !1;
          var y = u.get(e), E = u.get(t);
          if (y && E)
            return y == t && E == e;
          var S = -1, A = !0, I = i & he ? new yn() : n;
          for (u.set(e, t), u.set(t, e); ++S < f; ) {
            var C = e[S], U = t[S];
            if (s)
              var k = c ? s(U, C, S, t, e, u) : s(C, U, S, e, t, u);
            if (k !== n) {
              if (k)
                continue;
              A = !1;
              break;
            }
            if (I) {
              if (!Jr(t, function(N, Y) {
                if (!ai(I, Y) && (C === N || o(C, N, i, s, u)))
                  return I.push(Y);
              })) {
                A = !1;
                break;
              }
            } else if (!(C === U || o(C, U, i, s, u))) {
              A = !1;
              break;
            }
          }
          return u.delete(e), u.delete(t), A;
        }
        function lf(e, t, i, s, o, u, c) {
          switch (i) {
            case St:
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                return !1;
              e = e.buffer, t = t.buffer;
            case Jt:
              return !(e.byteLength != t.byteLength || !u(new Ki(e), new Ki(t)));
            case fn:
            case Kt:
            case $t:
              return yt(+e, +t);
            case dn:
              return e.name == t.name && e.message == t.message;
            case Ct:
            case pn:
              return e == t + "";
            case We:
              var f = ss;
            case Ae:
              var _ = s & me;
              if (f || (f = Xi), e.size != t.size && !_)
                return !1;
              var y = c.get(e);
              if (y)
                return y == t;
              s |= he, c.set(e, t);
              var E = $a(f(e), f(t), s, o, u, c);
              return c.delete(e), E;
            case Cn:
              if (fi)
                return fi.call(e) == fi.call(t);
          }
          return !1;
        }
        function uf(e, t, i, s, o, u) {
          var c = i & me, f = Is(e), _ = f.length, y = Is(t), E = y.length;
          if (_ != E && !c)
            return !1;
          for (var S = _; S--; ) {
            var A = f[S];
            if (!(c ? A in t : K.call(t, A)))
              return !1;
          }
          var I = u.get(e), C = u.get(t);
          if (I && C)
            return I == t && C == e;
          var U = !0;
          u.set(e, t), u.set(t, e);
          for (var k = c; ++S < _; ) {
            A = f[S];
            var N = e[A], Y = t[A];
            if (s)
              var nt = c ? s(Y, N, A, t, e, u) : s(N, Y, A, e, t, u);
            if (!(nt === n ? N === Y || o(N, Y, i, s, u) : nt)) {
              U = !1;
              break;
            }
            k || (k = A == "constructor");
          }
          if (U && !k) {
            var Ue = e.constructor, it = t.constructor;
            Ue != it && "constructor" in e && "constructor" in t && !(typeof Ue == "function" && Ue instanceof Ue && typeof it == "function" && it instanceof it) && (U = !1);
          }
          return u.delete(e), u.delete(t), U;
        }
        function Ut(e) {
          return Gs(rl(e, n, dl), e + "");
        }
        function Is(e) {
          return va(e, Ee, Cs);
        }
        function Ds(e) {
          return va(e, Xe, Ja);
        }
        var Ms = ir ? function(e) {
          return ir.get(e);
        } : Ks;
        function mr(e) {
          for (var t = e.name + "", i = Xn[t], s = K.call(Xn, t) ? i.length : 0; s--; ) {
            var o = i[s], u = o.func;
            if (u == null || u == e)
              return o.name;
          }
          return t;
        }
        function qn(e) {
          var t = K.call(l, "placeholder") ? l : e;
          return t.placeholder;
        }
        function M() {
          var e = l.iteratee || qs;
          return e = e === qs ? ya : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function vr(e, t) {
          var i = e.__data__;
          return mf(t) ? i[typeof t == "string" ? "string" : "hash"] : i.map;
        }
        function Os(e) {
          for (var t = Ee(e), i = t.length; i--; ) {
            var s = t[i], o = e[s];
            t[i] = [s, o, nl(o)];
          }
          return t;
        }
        function Sn(e, t) {
          var i = bc(e, t);
          return wa(i) ? i : n;
        }
        function cf(e) {
          var t = K.call(e, bn), i = e[bn];
          try {
            e[bn] = n;
            var s = !0;
          } catch {
          }
          var o = qi.call(e);
          return s && (t ? e[bn] = i : delete e[bn]), o;
        }
        var Cs = as ? function(e) {
          return e == null ? [] : (e = J(e), tn(as(e), function(t) {
            return sa.call(e, t);
          }));
        } : $s, Ja = as ? function(e) {
          for (var t = []; e; )
            nn(t, Cs(e)), e = $i(e);
          return t;
        } : $s, Me = ze;
        (ls && Me(new ls(new ArrayBuffer(1))) != St || ui && Me(new ui()) != We || us && Me(us.resolve()) != Ci || Yn && Me(new Yn()) != Ae || ci && Me(new ci()) != gn) && (Me = function(e) {
          var t = ze(e), i = t == _t ? e.constructor : n, s = i ? An(i) : "";
          if (s)
            switch (s) {
              case Xc:
                return St;
              case Zc:
                return We;
              case jc:
                return Ci;
              case Vc:
                return Ae;
              case qc:
                return gn;
            }
          return t;
        });
        function hf(e, t, i) {
          for (var s = -1, o = i.length; ++s < o; ) {
            var u = i[s], c = u.size;
            switch (u.type) {
              case "drop":
                e += c;
                break;
              case "dropRight":
                t -= c;
                break;
              case "take":
                t = De(t, e + c);
                break;
              case "takeRight":
                e = be(e, t - c);
                break;
            }
          }
          return { start: e, end: t };
        }
        function ff(e) {
          var t = e.match(mu);
          return t ? t[1].split(vu) : [];
        }
        function el(e, t, i) {
          t = ln(t, e);
          for (var s = -1, o = t.length, u = !1; ++s < o; ) {
            var c = Rt(t[s]);
            if (!(u = e != null && i(e, c)))
              break;
            e = e[c];
          }
          return u || ++s != o ? u : (o = e == null ? 0 : e.length, !!o && Ar(o) && Ft(c, o) && (z(e) || Pn(e)));
        }
        function df(e) {
          var t = e.length, i = new e.constructor(t);
          return t && typeof e[0] == "string" && K.call(e, "index") && (i.index = e.index, i.input = e.input), i;
        }
        function tl(e) {
          return typeof e.constructor == "function" && !bi(e) ? Zn($i(e)) : {};
        }
        function pf(e, t, i) {
          var s = e.constructor;
          switch (t) {
            case Jt:
              return Ts(e);
            case fn:
            case Kt:
              return new s(+e);
            case St:
              return Qh(e, i);
            case kn:
            case ni:
            case Bn:
            case ii:
            case ri:
            case si:
            case zn:
            case At:
            case Gi:
              return za(e, i);
            case We:
              return new s();
            case $t:
            case pn:
              return new s(e);
            case Ct:
              return Kh(e);
            case Ae:
              return new s();
            case Cn:
              return $h(e);
          }
        }
        function gf(e, t) {
          var i = t.length;
          if (!i)
            return e;
          var s = i - 1;
          return t[s] = (i > 1 ? "& " : "") + t[s], t = t.join(i > 2 ? ", " : " "), e.replace(_u, `{
/* [wrapped with ` + t + `] */
`);
        }
        function _f(e) {
          return z(e) || Pn(e) || !!(oa && e && e[oa]);
        }
        function Ft(e, t) {
          var i = typeof e;
          return t = t ?? Ie, !!t && (i == "number" || i != "symbol" && Tu.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }
        function Ge(e, t, i) {
          if (!le(i))
            return !1;
          var s = typeof t;
          return (s == "number" ? Ye(i) && Ft(t, i.length) : s == "string" && t in i) ? yt(i[t], e) : !1;
        }
        function ks(e, t) {
          if (z(e))
            return !1;
          var i = typeof e;
          return i == "number" || i == "symbol" || i == "boolean" || e == null || tt(e) ? !0 : vt.test(e) || !mt.test(e) || t != null && e in J(t);
        }
        function mf(e) {
          var t = typeof e;
          return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
        }
        function Bs(e) {
          var t = mr(e), i = l[t];
          if (typeof i != "function" || !(t in H.prototype))
            return !1;
          if (e === i)
            return !0;
          var s = Ms(i);
          return !!s && e === s[0];
        }
        function vf(e) {
          return !!na && na in e;
        }
        var bf = ji ? Wt : Js;
        function bi(e) {
          var t = e && e.constructor, i = typeof t == "function" && t.prototype || Hn;
          return e === i;
        }
        function nl(e) {
          return e === e && !le(e);
        }
        function il(e, t) {
          return function(i) {
            return i == null ? !1 : i[e] === t && (t !== n || e in J(i));
          };
        }
        function wf(e) {
          var t = xr(e, function(s) {
            return i.size === X && i.clear(), s;
          }), i = t.cache;
          return t;
        }
        function yf(e, t) {
          var i = e[1], s = t[1], o = i | s, u = o < ($ | se | q), c = s == q && i == V || s == q && i == Ve && e[7].length <= t[8] || s == (q | Ve) && t[7].length <= t[8] && i == V;
          if (!(u || c))
            return e;
          s & $ && (e[2] = t[2], o |= i & $ ? 0 : ie);
          var f = t[3];
          if (f) {
            var _ = e[3];
            e[3] = _ ? Ua(_, f, t[4]) : f, e[4] = _ ? rn(e[3], ue) : t[4];
          }
          return f = t[5], f && (_ = e[5], e[5] = _ ? Fa(_, f, t[6]) : f, e[6] = _ ? rn(e[5], ue) : t[6]), f = t[7], f && (e[7] = f), s & q && (e[8] = e[8] == null ? t[8] : De(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = o, e;
        }
        function Ef(e) {
          var t = [];
          if (e != null)
            for (var i in J(e))
              t.push(i);
          return t;
        }
        function xf(e) {
          return qi.call(e);
        }
        function rl(e, t, i) {
          return t = be(t === n ? e.length - 1 : t, 0), function() {
            for (var s = arguments, o = -1, u = be(s.length - t, 0), c = m(u); ++o < u; )
              c[o] = s[t + o];
            o = -1;
            for (var f = m(t + 1); ++o < t; )
              f[o] = s[o];
            return f[t] = i(c), $e(e, this, f);
          };
        }
        function sl(e, t) {
          return t.length < 2 ? e : xn(e, ht(t, 0, -1));
        }
        function Sf(e, t) {
          for (var i = e.length, s = De(t.length, i), o = He(e); s--; ) {
            var u = t[s];
            e[s] = Ft(u, i) ? o[u] : n;
          }
          return e;
        }
        function zs(e, t) {
          if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
            return e[t];
        }
        var ol = ll(Ra), wi = Gc || function(e, t) {
          return Pe.setTimeout(e, t);
        }, Gs = ll(Zh);
        function al(e, t, i) {
          var s = t + "";
          return Gs(e, gf(s, Af(ff(s), i)));
        }
        function ll(e) {
          var t = 0, i = 0;
          return function() {
            var s = Nc(), o = Vt - (s - i);
            if (i = s, o > 0) {
              if (++t >= Ot)
                return arguments[0];
            } else
              t = 0;
            return e.apply(n, arguments);
          };
        }
        function br(e, t) {
          var i = -1, s = e.length, o = s - 1;
          for (t = t === n ? s : t; ++i < t; ) {
            var u = ws(i, o), c = e[u];
            e[u] = e[i], e[i] = c;
          }
          return e.length = t, e;
        }
        var ul = wf(function(e) {
          var t = [];
          return e.charCodeAt(0) === 46 && t.push(""), e.replace(_n, function(i, s, o, u) {
            t.push(o ? u.replace(yu, "$1") : s || i);
          }), t;
        });
        function Rt(e) {
          if (typeof e == "string" || tt(e))
            return e;
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function An(e) {
          if (e != null) {
            try {
              return Vi.call(e);
            } catch {
            }
            try {
              return e + "";
            } catch {
            }
          }
          return "";
        }
        function Af(e, t) {
          return at(Dn, function(i) {
            var s = "_." + i[0];
            t & i[1] && !Hi(e, s) && e.push(s);
          }), e.sort();
        }
        function cl(e) {
          if (e instanceof H)
            return e.clone();
          var t = new ut(e.__wrapped__, e.__chain__);
          return t.__actions__ = He(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
        }
        function Pf(e, t, i) {
          (i ? Ge(e, t, i) : t === n) ? t = 1 : t = be(G(t), 0);
          var s = e == null ? 0 : e.length;
          if (!s || t < 1)
            return [];
          for (var o = 0, u = 0, c = m(tr(s / t)); o < s; )
            c[u++] = ht(e, o, o += t);
          return c;
        }
        function Tf(e) {
          for (var t = -1, i = e == null ? 0 : e.length, s = 0, o = []; ++t < i; ) {
            var u = e[t];
            u && (o[s++] = u);
          }
          return o;
        }
        function Lf() {
          var e = arguments.length;
          if (!e)
            return [];
          for (var t = m(e - 1), i = arguments[0], s = e; s--; )
            t[s - 1] = arguments[s];
          return nn(z(i) ? He(i) : [i], Te(t, 1));
        }
        var Rf = F(function(e, t) {
          return de(e) ? pi(e, Te(t, 1, de, !0)) : [];
        }), If = F(function(e, t) {
          var i = ft(t);
          return de(i) && (i = n), de(e) ? pi(e, Te(t, 1, de, !0), M(i, 2)) : [];
        }), Df = F(function(e, t) {
          var i = ft(t);
          return de(i) && (i = n), de(e) ? pi(e, Te(t, 1, de, !0), n, i) : [];
        });
        function Mf(e, t, i) {
          var s = e == null ? 0 : e.length;
          return s ? (t = i || t === n ? 1 : G(t), ht(e, t < 0 ? 0 : t, s)) : [];
        }
        function Of(e, t, i) {
          var s = e == null ? 0 : e.length;
          return s ? (t = i || t === n ? 1 : G(t), t = s - t, ht(e, 0, t < 0 ? 0 : t)) : [];
        }
        function Cf(e, t) {
          return e && e.length ? hr(e, M(t, 3), !0, !0) : [];
        }
        function kf(e, t) {
          return e && e.length ? hr(e, M(t, 3), !0) : [];
        }
        function Bf(e, t, i, s) {
          var o = e == null ? 0 : e.length;
          return o ? (i && typeof i != "number" && Ge(e, t, i) && (i = 0, s = o), Th(e, t, i, s)) : [];
        }
        function hl(e, t, i) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = i == null ? 0 : G(i);
          return o < 0 && (o = be(s + o, 0)), Yi(e, M(t, 3), o);
        }
        function fl(e, t, i) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = s - 1;
          return i !== n && (o = G(i), o = i < 0 ? be(s + o, 0) : De(o, s - 1)), Yi(e, M(t, 3), o, !0);
        }
        function dl(e) {
          var t = e == null ? 0 : e.length;
          return t ? Te(e, 1) : [];
        }
        function zf(e) {
          var t = e == null ? 0 : e.length;
          return t ? Te(e, ge) : [];
        }
        function Gf(e, t) {
          var i = e == null ? 0 : e.length;
          return i ? (t = t === n ? 1 : G(t), Te(e, t)) : [];
        }
        function Uf(e) {
          for (var t = -1, i = e == null ? 0 : e.length, s = {}; ++t < i; ) {
            var o = e[t];
            s[o[0]] = o[1];
          }
          return s;
        }
        function pl(e) {
          return e && e.length ? e[0] : n;
        }
        function Ff(e, t, i) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = i == null ? 0 : G(i);
          return o < 0 && (o = be(s + o, 0)), Un(e, t, o);
        }
        function Wf(e) {
          var t = e == null ? 0 : e.length;
          return t ? ht(e, 0, -1) : [];
        }
        var Nf = F(function(e) {
          var t = oe(e, As);
          return t.length && t[0] === e[0] ? gs(t) : [];
        }), Hf = F(function(e) {
          var t = ft(e), i = oe(e, As);
          return t === ft(i) ? t = n : i.pop(), i.length && i[0] === e[0] ? gs(i, M(t, 2)) : [];
        }), Yf = F(function(e) {
          var t = ft(e), i = oe(e, As);
          return t = typeof t == "function" ? t : n, t && i.pop(), i.length && i[0] === e[0] ? gs(i, n, t) : [];
        });
        function Xf(e, t) {
          return e == null ? "" : Fc.call(e, t);
        }
        function ft(e) {
          var t = e == null ? 0 : e.length;
          return t ? e[t - 1] : n;
        }
        function Zf(e, t, i) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = s;
          return i !== n && (o = G(i), o = o < 0 ? be(s + o, 0) : De(o, s - 1)), t === t ? Sc(e, t, o) : Yi(e, Vo, o, !0);
        }
        function jf(e, t) {
          return e && e.length ? Aa(e, G(t)) : n;
        }
        var Vf = F(gl);
        function gl(e, t) {
          return e && e.length && t && t.length ? bs(e, t) : e;
        }
        function qf(e, t, i) {
          return e && e.length && t && t.length ? bs(e, t, M(i, 2)) : e;
        }
        function Qf(e, t, i) {
          return e && e.length && t && t.length ? bs(e, t, n, i) : e;
        }
        var Kf = Ut(function(e, t) {
          var i = e == null ? 0 : e.length, s = hs(e, t);
          return La(e, oe(t, function(o) {
            return Ft(o, i) ? +o : o;
          }).sort(Ga)), s;
        });
        function $f(e, t) {
          var i = [];
          if (!(e && e.length))
            return i;
          var s = -1, o = [], u = e.length;
          for (t = M(t, 3); ++s < u; ) {
            var c = e[s];
            t(c, s, e) && (i.push(c), o.push(s));
          }
          return La(e, o), i;
        }
        function Us(e) {
          return e == null ? e : Yc.call(e);
        }
        function Jf(e, t, i) {
          var s = e == null ? 0 : e.length;
          return s ? (i && typeof i != "number" && Ge(e, t, i) ? (t = 0, i = s) : (t = t == null ? 0 : G(t), i = i === n ? s : G(i)), ht(e, t, i)) : [];
        }
        function ed(e, t) {
          return cr(e, t);
        }
        function td(e, t, i) {
          return Es(e, t, M(i, 2));
        }
        function nd(e, t) {
          var i = e == null ? 0 : e.length;
          if (i) {
            var s = cr(e, t);
            if (s < i && yt(e[s], t))
              return s;
          }
          return -1;
        }
        function id(e, t) {
          return cr(e, t, !0);
        }
        function rd(e, t, i) {
          return Es(e, t, M(i, 2), !0);
        }
        function sd(e, t) {
          var i = e == null ? 0 : e.length;
          if (i) {
            var s = cr(e, t, !0) - 1;
            if (yt(e[s], t))
              return s;
          }
          return -1;
        }
        function od(e) {
          return e && e.length ? Ia(e) : [];
        }
        function ad(e, t) {
          return e && e.length ? Ia(e, M(t, 2)) : [];
        }
        function ld(e) {
          var t = e == null ? 0 : e.length;
          return t ? ht(e, 1, t) : [];
        }
        function ud(e, t, i) {
          return e && e.length ? (t = i || t === n ? 1 : G(t), ht(e, 0, t < 0 ? 0 : t)) : [];
        }
        function cd(e, t, i) {
          var s = e == null ? 0 : e.length;
          return s ? (t = i || t === n ? 1 : G(t), t = s - t, ht(e, t < 0 ? 0 : t, s)) : [];
        }
        function hd(e, t) {
          return e && e.length ? hr(e, M(t, 3), !1, !0) : [];
        }
        function fd(e, t) {
          return e && e.length ? hr(e, M(t, 3)) : [];
        }
        var dd = F(function(e) {
          return an(Te(e, 1, de, !0));
        }), pd = F(function(e) {
          var t = ft(e);
          return de(t) && (t = n), an(Te(e, 1, de, !0), M(t, 2));
        }), gd = F(function(e) {
          var t = ft(e);
          return t = typeof t == "function" ? t : n, an(Te(e, 1, de, !0), n, t);
        });
        function _d(e) {
          return e && e.length ? an(e) : [];
        }
        function md(e, t) {
          return e && e.length ? an(e, M(t, 2)) : [];
        }
        function vd(e, t) {
          return t = typeof t == "function" ? t : n, e && e.length ? an(e, n, t) : [];
        }
        function Fs(e) {
          if (!(e && e.length))
            return [];
          var t = 0;
          return e = tn(e, function(i) {
            if (de(i))
              return t = be(i.length, t), !0;
          }), is(t, function(i) {
            return oe(e, es(i));
          });
        }
        function _l(e, t) {
          if (!(e && e.length))
            return [];
          var i = Fs(e);
          return t == null ? i : oe(i, function(s) {
            return $e(t, n, s);
          });
        }
        var bd = F(function(e, t) {
          return de(e) ? pi(e, t) : [];
        }), wd = F(function(e) {
          return Ss(tn(e, de));
        }), yd = F(function(e) {
          var t = ft(e);
          return de(t) && (t = n), Ss(tn(e, de), M(t, 2));
        }), Ed = F(function(e) {
          var t = ft(e);
          return t = typeof t == "function" ? t : n, Ss(tn(e, de), n, t);
        }), xd = F(Fs);
        function Sd(e, t) {
          return Ca(e || [], t || [], di);
        }
        function Ad(e, t) {
          return Ca(e || [], t || [], mi);
        }
        var Pd = F(function(e) {
          var t = e.length, i = t > 1 ? e[t - 1] : n;
          return i = typeof i == "function" ? (e.pop(), i) : n, _l(e, i);
        });
        function ml(e) {
          var t = l(e);
          return t.__chain__ = !0, t;
        }
        function Td(e, t) {
          return t(e), e;
        }
        function wr(e, t) {
          return t(e);
        }
        var Ld = Ut(function(e) {
          var t = e.length, i = t ? e[0] : 0, s = this.__wrapped__, o = function(u) {
            return hs(u, e);
          };
          return t > 1 || this.__actions__.length || !(s instanceof H) || !Ft(i) ? this.thru(o) : (s = s.slice(i, +i + (t ? 1 : 0)), s.__actions__.push({
            func: wr,
            args: [o],
            thisArg: n
          }), new ut(s, this.__chain__).thru(function(u) {
            return t && !u.length && u.push(n), u;
          }));
        });
        function Rd() {
          return ml(this);
        }
        function Id() {
          return new ut(this.value(), this.__chain__);
        }
        function Dd() {
          this.__values__ === n && (this.__values__ = Dl(this.value()));
          var e = this.__index__ >= this.__values__.length, t = e ? n : this.__values__[this.__index__++];
          return { done: e, value: t };
        }
        function Md() {
          return this;
        }
        function Od(e) {
          for (var t, i = this; i instanceof sr; ) {
            var s = cl(i);
            s.__index__ = 0, s.__values__ = n, t ? o.__wrapped__ = s : t = s;
            var o = s;
            i = i.__wrapped__;
          }
          return o.__wrapped__ = e, t;
        }
        function Cd() {
          var e = this.__wrapped__;
          if (e instanceof H) {
            var t = e;
            return this.__actions__.length && (t = new H(this)), t = t.reverse(), t.__actions__.push({
              func: wr,
              args: [Us],
              thisArg: n
            }), new ut(t, this.__chain__);
          }
          return this.thru(Us);
        }
        function kd() {
          return Oa(this.__wrapped__, this.__actions__);
        }
        var Bd = fr(function(e, t, i) {
          K.call(e, i) ? ++e[i] : zt(e, i, 1);
        });
        function zd(e, t, i) {
          var s = z(e) ? Zo : Ph;
          return i && Ge(e, t, i) && (t = n), s(e, M(t, 3));
        }
        function Gd(e, t) {
          var i = z(e) ? tn : _a;
          return i(e, M(t, 3));
        }
        var Ud = Ya(hl), Fd = Ya(fl);
        function Wd(e, t) {
          return Te(yr(e, t), 1);
        }
        function Nd(e, t) {
          return Te(yr(e, t), ge);
        }
        function Hd(e, t, i) {
          return i = i === n ? 1 : G(i), Te(yr(e, t), i);
        }
        function vl(e, t) {
          var i = z(e) ? at : on;
          return i(e, M(t, 3));
        }
        function bl(e, t) {
          var i = z(e) ? ac : ga;
          return i(e, M(t, 3));
        }
        var Yd = fr(function(e, t, i) {
          K.call(e, i) ? e[i].push(t) : zt(e, i, [t]);
        });
        function Xd(e, t, i, s) {
          e = Ye(e) ? e : Kn(e), i = i && !s ? G(i) : 0;
          var o = e.length;
          return i < 0 && (i = be(o + i, 0)), Pr(e) ? i <= o && e.indexOf(t, i) > -1 : !!o && Un(e, t, i) > -1;
        }
        var Zd = F(function(e, t, i) {
          var s = -1, o = typeof t == "function", u = Ye(e) ? m(e.length) : [];
          return on(e, function(c) {
            u[++s] = o ? $e(t, c, i) : gi(c, t, i);
          }), u;
        }), jd = fr(function(e, t, i) {
          zt(e, i, t);
        });
        function yr(e, t) {
          var i = z(e) ? oe : Ea;
          return i(e, M(t, 3));
        }
        function Vd(e, t, i, s) {
          return e == null ? [] : (z(t) || (t = t == null ? [] : [t]), i = s ? n : i, z(i) || (i = i == null ? [] : [i]), Pa(e, t, i));
        }
        var qd = fr(function(e, t, i) {
          e[i ? 0 : 1].push(t);
        }, function() {
          return [[], []];
        });
        function Qd(e, t, i) {
          var s = z(e) ? $r : Qo, o = arguments.length < 3;
          return s(e, M(t, 4), i, o, on);
        }
        function Kd(e, t, i) {
          var s = z(e) ? lc : Qo, o = arguments.length < 3;
          return s(e, M(t, 4), i, o, ga);
        }
        function $d(e, t) {
          var i = z(e) ? tn : _a;
          return i(e, Sr(M(t, 3)));
        }
        function Jd(e) {
          var t = z(e) ? ha : Yh;
          return t(e);
        }
        function ep(e, t, i) {
          (i ? Ge(e, t, i) : t === n) ? t = 1 : t = G(t);
          var s = z(e) ? yh : Xh;
          return s(e, t);
        }
        function tp(e) {
          var t = z(e) ? Eh : jh;
          return t(e);
        }
        function np(e) {
          if (e == null)
            return 0;
          if (Ye(e))
            return Pr(e) ? Wn(e) : e.length;
          var t = Me(e);
          return t == We || t == Ae ? e.size : ms(e).length;
        }
        function ip(e, t, i) {
          var s = z(e) ? Jr : Vh;
          return i && Ge(e, t, i) && (t = n), s(e, M(t, 3));
        }
        var rp = F(function(e, t) {
          if (e == null)
            return [];
          var i = t.length;
          return i > 1 && Ge(e, t[0], t[1]) ? t = [] : i > 2 && Ge(t[0], t[1], t[2]) && (t = [t[0]]), Pa(e, Te(t, 1), []);
        }), Er = zc || function() {
          return Pe.Date.now();
        };
        function sp(e, t) {
          if (typeof t != "function")
            throw new lt(p);
          return e = G(e), function() {
            if (--e < 1)
              return t.apply(this, arguments);
          };
        }
        function wl(e, t, i) {
          return t = i ? n : t, t = e && t == null ? e.length : t, Gt(e, q, n, n, n, n, t);
        }
        function yl(e, t) {
          var i;
          if (typeof t != "function")
            throw new lt(p);
          return e = G(e), function() {
            return --e > 0 && (i = t.apply(this, arguments)), e <= 1 && (t = n), i;
          };
        }
        var Ws = F(function(e, t, i) {
          var s = $;
          if (i.length) {
            var o = rn(i, qn(Ws));
            s |= te;
          }
          return Gt(e, s, t, i, o);
        }), El = F(function(e, t, i) {
          var s = $ | se;
          if (i.length) {
            var o = rn(i, qn(El));
            s |= te;
          }
          return Gt(t, s, e, i, o);
        });
        function xl(e, t, i) {
          t = i ? n : t;
          var s = Gt(e, V, n, n, n, n, n, t);
          return s.placeholder = xl.placeholder, s;
        }
        function Sl(e, t, i) {
          t = i ? n : t;
          var s = Gt(e, ke, n, n, n, n, n, t);
          return s.placeholder = Sl.placeholder, s;
        }
        function Al(e, t, i) {
          var s, o, u, c, f, _, y = 0, E = !1, S = !1, A = !0;
          if (typeof e != "function")
            throw new lt(p);
          t = dt(t) || 0, le(i) && (E = !!i.leading, S = "maxWait" in i, u = S ? be(dt(i.maxWait) || 0, t) : u, A = "trailing" in i ? !!i.trailing : A);
          function I(pe) {
            var Et = s, Ht = o;
            return s = o = n, y = pe, c = e.apply(Ht, Et), c;
          }
          function C(pe) {
            return y = pe, f = wi(N, t), E ? I(pe) : c;
          }
          function U(pe) {
            var Et = pe - _, Ht = pe - y, Yl = t - Et;
            return S ? De(Yl, u - Ht) : Yl;
          }
          function k(pe) {
            var Et = pe - _, Ht = pe - y;
            return _ === n || Et >= t || Et < 0 || S && Ht >= u;
          }
          function N() {
            var pe = Er();
            if (k(pe))
              return Y(pe);
            f = wi(N, U(pe));
          }
          function Y(pe) {
            return f = n, A && s ? I(pe) : (s = o = n, c);
          }
          function nt() {
            f !== n && ka(f), y = 0, s = _ = o = f = n;
          }
          function Ue() {
            return f === n ? c : Y(Er());
          }
          function it() {
            var pe = Er(), Et = k(pe);
            if (s = arguments, o = this, _ = pe, Et) {
              if (f === n)
                return C(_);
              if (S)
                return ka(f), f = wi(N, t), I(_);
            }
            return f === n && (f = wi(N, t)), c;
          }
          return it.cancel = nt, it.flush = Ue, it;
        }
        var op = F(function(e, t) {
          return pa(e, 1, t);
        }), ap = F(function(e, t, i) {
          return pa(e, dt(t) || 0, i);
        });
        function lp(e) {
          return Gt(e, Mt);
        }
        function xr(e, t) {
          if (typeof e != "function" || t != null && typeof t != "function")
            throw new lt(p);
          var i = function() {
            var s = arguments, o = t ? t.apply(this, s) : s[0], u = i.cache;
            if (u.has(o))
              return u.get(o);
            var c = e.apply(this, s);
            return i.cache = u.set(o, c) || u, c;
          };
          return i.cache = new (xr.Cache || Bt)(), i;
        }
        xr.Cache = Bt;
        function Sr(e) {
          if (typeof e != "function")
            throw new lt(p);
          return function() {
            var t = arguments;
            switch (t.length) {
              case 0:
                return !e.call(this);
              case 1:
                return !e.call(this, t[0]);
              case 2:
                return !e.call(this, t[0], t[1]);
              case 3:
                return !e.call(this, t[0], t[1], t[2]);
            }
            return !e.apply(this, t);
          };
        }
        function up(e) {
          return yl(2, e);
        }
        var cp = qh(function(e, t) {
          t = t.length == 1 && z(t[0]) ? oe(t[0], Je(M())) : oe(Te(t, 1), Je(M()));
          var i = t.length;
          return F(function(s) {
            for (var o = -1, u = De(s.length, i); ++o < u; )
              s[o] = t[o].call(this, s[o]);
            return $e(e, this, s);
          });
        }), Ns = F(function(e, t) {
          var i = rn(t, qn(Ns));
          return Gt(e, te, n, t, i);
        }), Pl = F(function(e, t) {
          var i = rn(t, qn(Pl));
          return Gt(e, st, n, t, i);
        }), hp = Ut(function(e, t) {
          return Gt(e, Ve, n, n, n, t);
        });
        function fp(e, t) {
          if (typeof e != "function")
            throw new lt(p);
          return t = t === n ? t : G(t), F(e, t);
        }
        function dp(e, t) {
          if (typeof e != "function")
            throw new lt(p);
          return t = t == null ? 0 : be(G(t), 0), F(function(i) {
            var s = i[t], o = un(i, 0, t);
            return s && nn(o, s), $e(e, this, o);
          });
        }
        function pp(e, t, i) {
          var s = !0, o = !0;
          if (typeof e != "function")
            throw new lt(p);
          return le(i) && (s = "leading" in i ? !!i.leading : s, o = "trailing" in i ? !!i.trailing : o), Al(e, t, {
            leading: s,
            maxWait: t,
            trailing: o
          });
        }
        function gp(e) {
          return wl(e, 1);
        }
        function _p(e, t) {
          return Ns(Ps(t), e);
        }
        function mp() {
          if (!arguments.length)
            return [];
          var e = arguments[0];
          return z(e) ? e : [e];
        }
        function vp(e) {
          return ct(e, Re);
        }
        function bp(e, t) {
          return t = typeof t == "function" ? t : n, ct(e, Re, t);
        }
        function wp(e) {
          return ct(e, ce | Re);
        }
        function yp(e, t) {
          return t = typeof t == "function" ? t : n, ct(e, ce | Re, t);
        }
        function Ep(e, t) {
          return t == null || da(e, t, Ee(t));
        }
        function yt(e, t) {
          return e === t || e !== e && t !== t;
        }
        var xp = _r(ps), Sp = _r(function(e, t) {
          return e >= t;
        }), Pn = ba(/* @__PURE__ */ function() {
          return arguments;
        }()) ? ba : function(e) {
          return fe(e) && K.call(e, "callee") && !sa.call(e, "callee");
        }, z = m.isArray, Ap = Fo ? Je(Fo) : Mh;
        function Ye(e) {
          return e != null && Ar(e.length) && !Wt(e);
        }
        function de(e) {
          return fe(e) && Ye(e);
        }
        function Pp(e) {
          return e === !0 || e === !1 || fe(e) && ze(e) == fn;
        }
        var cn = Uc || Js, Tp = Wo ? Je(Wo) : Oh;
        function Lp(e) {
          return fe(e) && e.nodeType === 1 && !yi(e);
        }
        function Rp(e) {
          if (e == null)
            return !0;
          if (Ye(e) && (z(e) || typeof e == "string" || typeof e.splice == "function" || cn(e) || Qn(e) || Pn(e)))
            return !e.length;
          var t = Me(e);
          if (t == We || t == Ae)
            return !e.size;
          if (bi(e))
            return !ms(e).length;
          for (var i in e)
            if (K.call(e, i))
              return !1;
          return !0;
        }
        function Ip(e, t) {
          return _i(e, t);
        }
        function Dp(e, t, i) {
          i = typeof i == "function" ? i : n;
          var s = i ? i(e, t) : n;
          return s === n ? _i(e, t, n, i) : !!s;
        }
        function Hs(e) {
          if (!fe(e))
            return !1;
          var t = ze(e);
          return t == dn || t == Di || typeof e.message == "string" && typeof e.name == "string" && !yi(e);
        }
        function Mp(e) {
          return typeof e == "number" && aa(e);
        }
        function Wt(e) {
          if (!le(e))
            return !1;
          var t = ze(e);
          return t == On || t == Mi || t == Nr || t == ki;
        }
        function Tl(e) {
          return typeof e == "number" && e == G(e);
        }
        function Ar(e) {
          return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ie;
        }
        function le(e) {
          var t = typeof e;
          return e != null && (t == "object" || t == "function");
        }
        function fe(e) {
          return e != null && typeof e == "object";
        }
        var Ll = No ? Je(No) : kh;
        function Op(e, t) {
          return e === t || _s(e, t, Os(t));
        }
        function Cp(e, t, i) {
          return i = typeof i == "function" ? i : n, _s(e, t, Os(t), i);
        }
        function kp(e) {
          return Rl(e) && e != +e;
        }
        function Bp(e) {
          if (bf(e))
            throw new B(b);
          return wa(e);
        }
        function zp(e) {
          return e === null;
        }
        function Gp(e) {
          return e == null;
        }
        function Rl(e) {
          return typeof e == "number" || fe(e) && ze(e) == $t;
        }
        function yi(e) {
          if (!fe(e) || ze(e) != _t)
            return !1;
          var t = $i(e);
          if (t === null)
            return !0;
          var i = K.call(t, "constructor") && t.constructor;
          return typeof i == "function" && i instanceof i && Vi.call(i) == Oc;
        }
        var Ys = Ho ? Je(Ho) : Bh;
        function Up(e) {
          return Tl(e) && e >= -9007199254740991 && e <= Ie;
        }
        var Il = Yo ? Je(Yo) : zh;
        function Pr(e) {
          return typeof e == "string" || !z(e) && fe(e) && ze(e) == pn;
        }
        function tt(e) {
          return typeof e == "symbol" || fe(e) && ze(e) == Cn;
        }
        var Qn = Xo ? Je(Xo) : Gh;
        function Fp(e) {
          return e === n;
        }
        function Wp(e) {
          return fe(e) && Me(e) == gn;
        }
        function Np(e) {
          return fe(e) && ze(e) == zi;
        }
        var Hp = _r(vs), Yp = _r(function(e, t) {
          return e <= t;
        });
        function Dl(e) {
          if (!e)
            return [];
          if (Ye(e))
            return Pr(e) ? bt(e) : He(e);
          if (li && e[li])
            return yc(e[li]());
          var t = Me(e), i = t == We ? ss : t == Ae ? Xi : Kn;
          return i(e);
        }
        function Nt(e) {
          if (!e)
            return e === 0 ? e : 0;
          if (e = dt(e), e === ge || e === -1 / 0) {
            var t = e < 0 ? -1 : 1;
            return t * _e;
          }
          return e === e ? e : 0;
        }
        function G(e) {
          var t = Nt(e), i = t % 1;
          return t === t ? i ? t - i : t : 0;
        }
        function Ml(e) {
          return e ? En(G(e), 0, we) : 0;
        }
        function dt(e) {
          if (typeof e == "number")
            return e;
          if (tt(e))
            return Qe;
          if (le(e)) {
            var t = typeof e.valueOf == "function" ? e.valueOf() : e;
            e = le(t) ? t + "" : t;
          }
          if (typeof e != "string")
            return e === 0 ? e : +e;
          e = Ko(e);
          var i = Su.test(e);
          return i || Pu.test(e) ? rc(e.slice(2), i ? 2 : 8) : xu.test(e) ? Qe : +e;
        }
        function Ol(e) {
          return Lt(e, Xe(e));
        }
        function Xp(e) {
          return e ? En(G(e), -9007199254740991, Ie) : e === 0 ? e : 0;
        }
        function j(e) {
          return e == null ? "" : et(e);
        }
        var Zp = jn(function(e, t) {
          if (bi(t) || Ye(t)) {
            Lt(t, Ee(t), e);
            return;
          }
          for (var i in t)
            K.call(t, i) && di(e, i, t[i]);
        }), Cl = jn(function(e, t) {
          Lt(t, Xe(t), e);
        }), Tr = jn(function(e, t, i, s) {
          Lt(t, Xe(t), e, s);
        }), jp = jn(function(e, t, i, s) {
          Lt(t, Ee(t), e, s);
        }), Vp = Ut(hs);
        function qp(e, t) {
          var i = Zn(e);
          return t == null ? i : fa(i, t);
        }
        var Qp = F(function(e, t) {
          e = J(e);
          var i = -1, s = t.length, o = s > 2 ? t[2] : n;
          for (o && Ge(t[0], t[1], o) && (s = 1); ++i < s; )
            for (var u = t[i], c = Xe(u), f = -1, _ = c.length; ++f < _; ) {
              var y = c[f], E = e[y];
              (E === n || yt(E, Hn[y]) && !K.call(e, y)) && (e[y] = u[y]);
            }
          return e;
        }), Kp = F(function(e) {
          return e.push(n, Ka), $e(kl, n, e);
        });
        function $p(e, t) {
          return jo(e, M(t, 3), Tt);
        }
        function Jp(e, t) {
          return jo(e, M(t, 3), ds);
        }
        function eg(e, t) {
          return e == null ? e : fs(e, M(t, 3), Xe);
        }
        function tg(e, t) {
          return e == null ? e : ma(e, M(t, 3), Xe);
        }
        function ng(e, t) {
          return e && Tt(e, M(t, 3));
        }
        function ig(e, t) {
          return e && ds(e, M(t, 3));
        }
        function rg(e) {
          return e == null ? [] : lr(e, Ee(e));
        }
        function sg(e) {
          return e == null ? [] : lr(e, Xe(e));
        }
        function Xs(e, t, i) {
          var s = e == null ? n : xn(e, t);
          return s === n ? i : s;
        }
        function og(e, t) {
          return e != null && el(e, t, Lh);
        }
        function Zs(e, t) {
          return e != null && el(e, t, Rh);
        }
        var ag = Za(function(e, t, i) {
          t != null && typeof t.toString != "function" && (t = qi.call(t)), e[t] = i;
        }, Vs(Ze)), lg = Za(function(e, t, i) {
          t != null && typeof t.toString != "function" && (t = qi.call(t)), K.call(e, t) ? e[t].push(i) : e[t] = [i];
        }, M), ug = F(gi);
        function Ee(e) {
          return Ye(e) ? ca(e) : ms(e);
        }
        function Xe(e) {
          return Ye(e) ? ca(e, !0) : Uh(e);
        }
        function cg(e, t) {
          var i = {};
          return t = M(t, 3), Tt(e, function(s, o, u) {
            zt(i, t(s, o, u), s);
          }), i;
        }
        function hg(e, t) {
          var i = {};
          return t = M(t, 3), Tt(e, function(s, o, u) {
            zt(i, o, t(s, o, u));
          }), i;
        }
        var fg = jn(function(e, t, i) {
          ur(e, t, i);
        }), kl = jn(function(e, t, i, s) {
          ur(e, t, i, s);
        }), dg = Ut(function(e, t) {
          var i = {};
          if (e == null)
            return i;
          var s = !1;
          t = oe(t, function(u) {
            return u = ln(u, e), s || (s = u.length > 1), u;
          }), Lt(e, Ds(e), i), s && (i = ct(i, ce | Le | Re, af));
          for (var o = t.length; o--; )
            xs(i, t[o]);
          return i;
        });
        function pg(e, t) {
          return Bl(e, Sr(M(t)));
        }
        var gg = Ut(function(e, t) {
          return e == null ? {} : Wh(e, t);
        });
        function Bl(e, t) {
          if (e == null)
            return {};
          var i = oe(Ds(e), function(s) {
            return [s];
          });
          return t = M(t), Ta(e, i, function(s, o) {
            return t(s, o[0]);
          });
        }
        function _g(e, t, i) {
          t = ln(t, e);
          var s = -1, o = t.length;
          for (o || (o = 1, e = n); ++s < o; ) {
            var u = e == null ? n : e[Rt(t[s])];
            u === n && (s = o, u = i), e = Wt(u) ? u.call(e) : u;
          }
          return e;
        }
        function mg(e, t, i) {
          return e == null ? e : mi(e, t, i);
        }
        function vg(e, t, i, s) {
          return s = typeof s == "function" ? s : n, e == null ? e : mi(e, t, i, s);
        }
        var zl = qa(Ee), Gl = qa(Xe);
        function bg(e, t, i) {
          var s = z(e), o = s || cn(e) || Qn(e);
          if (t = M(t, 4), i == null) {
            var u = e && e.constructor;
            o ? i = s ? new u() : [] : le(e) ? i = Wt(u) ? Zn($i(e)) : {} : i = {};
          }
          return (o ? at : Tt)(e, function(c, f, _) {
            return t(i, c, f, _);
          }), i;
        }
        function wg(e, t) {
          return e == null ? !0 : xs(e, t);
        }
        function yg(e, t, i) {
          return e == null ? e : Ma(e, t, Ps(i));
        }
        function Eg(e, t, i, s) {
          return s = typeof s == "function" ? s : n, e == null ? e : Ma(e, t, Ps(i), s);
        }
        function Kn(e) {
          return e == null ? [] : rs(e, Ee(e));
        }
        function xg(e) {
          return e == null ? [] : rs(e, Xe(e));
        }
        function Sg(e, t, i) {
          return i === n && (i = t, t = n), i !== n && (i = dt(i), i = i === i ? i : 0), t !== n && (t = dt(t), t = t === t ? t : 0), En(dt(e), t, i);
        }
        function Ag(e, t, i) {
          return t = Nt(t), i === n ? (i = t, t = 0) : i = Nt(i), e = dt(e), Ih(e, t, i);
        }
        function Pg(e, t, i) {
          if (i && typeof i != "boolean" && Ge(e, t, i) && (t = i = n), i === n && (typeof t == "boolean" ? (i = t, t = n) : typeof e == "boolean" && (i = e, e = n)), e === n && t === n ? (e = 0, t = 1) : (e = Nt(e), t === n ? (t = e, e = 0) : t = Nt(t)), e > t) {
            var s = e;
            e = t, t = s;
          }
          if (i || e % 1 || t % 1) {
            var o = la();
            return De(e + o * (t - e + ic("1e-" + ((o + "").length - 1))), t);
          }
          return ws(e, t);
        }
        var Tg = Vn(function(e, t, i) {
          return t = t.toLowerCase(), e + (i ? Ul(t) : t);
        });
        function Ul(e) {
          return js(j(e).toLowerCase());
        }
        function Fl(e) {
          return e = j(e), e && e.replace(Lu, _c).replace(ju, "");
        }
        function Lg(e, t, i) {
          e = j(e), t = et(t);
          var s = e.length;
          i = i === n ? s : En(G(i), 0, s);
          var o = i;
          return i -= t.length, i >= 0 && e.slice(i, o) == t;
        }
        function Rg(e) {
          return e = j(e), e && Ne.test(e) ? e.replace(ye, mc) : e;
        }
        function Ig(e) {
          return e = j(e), e && mn.test(e) ? e.replace(Ke, "\\$&") : e;
        }
        var Dg = Vn(function(e, t, i) {
          return e + (i ? "-" : "") + t.toLowerCase();
        }), Mg = Vn(function(e, t, i) {
          return e + (i ? " " : "") + t.toLowerCase();
        }), Og = Ha("toLowerCase");
        function Cg(e, t, i) {
          e = j(e), t = G(t);
          var s = t ? Wn(e) : 0;
          if (!t || s >= t)
            return e;
          var o = (t - s) / 2;
          return gr(nr(o), i) + e + gr(tr(o), i);
        }
        function kg(e, t, i) {
          e = j(e), t = G(t);
          var s = t ? Wn(e) : 0;
          return t && s < t ? e + gr(t - s, i) : e;
        }
        function Bg(e, t, i) {
          e = j(e), t = G(t);
          var s = t ? Wn(e) : 0;
          return t && s < t ? gr(t - s, i) + e : e;
        }
        function zg(e, t, i) {
          return i || t == null ? t = 0 : t && (t = +t), Hc(j(e).replace(en, ""), t || 0);
        }
        function Gg(e, t, i) {
          return (i ? Ge(e, t, i) : t === n) ? t = 1 : t = G(t), ys(j(e), t);
        }
        function Ug() {
          var e = arguments, t = j(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }
        var Fg = Vn(function(e, t, i) {
          return e + (i ? "_" : "") + t.toLowerCase();
        });
        function Wg(e, t, i) {
          return i && typeof i != "number" && Ge(e, t, i) && (t = i = n), i = i === n ? we : i >>> 0, i ? (e = j(e), e && (typeof t == "string" || t != null && !Ys(t)) && (t = et(t), !t && Fn(e)) ? un(bt(e), 0, i) : e.split(t, i)) : [];
        }
        var Ng = Vn(function(e, t, i) {
          return e + (i ? " " : "") + js(t);
        });
        function Hg(e, t, i) {
          return e = j(e), i = i == null ? 0 : En(G(i), 0, e.length), t = et(t), e.slice(i, i + t.length) == t;
        }
        function Yg(e, t, i) {
          var s = l.templateSettings;
          i && Ge(e, t, i) && (t = n), e = j(e), t = Tr({}, t, s, Qa);
          var o = Tr({}, t.imports, s.imports, Qa), u = Ee(o), c = rs(o, u), f, _, y = 0, E = t.interpolate || Fi, S = "__p += '", A = os(
            (t.escape || Fi).source + "|" + E.source + "|" + (E === oi ? Eu : Fi).source + "|" + (t.evaluate || Fi).source + "|$",
            "g"
          ), I = "//# sourceURL=" + (K.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++$u + "]") + `
`;
          e.replace(A, function(k, N, Y, nt, Ue, it) {
            return Y || (Y = nt), S += e.slice(y, it).replace(Ru, vc), N && (f = !0, S += `' +
__e(` + N + `) +
'`), Ue && (_ = !0, S += `';
` + Ue + `;
__p += '`), Y && (S += `' +
((__t = (` + Y + `)) == null ? '' : __t) +
'`), y = it + k.length, k;
          }), S += `';
`;
          var C = K.call(t, "variable") && t.variable;
          if (!C)
            S = `with (obj) {
` + S + `
}
`;
          else if (wu.test(C))
            throw new B(P);
          S = (_ ? S.replace(d, "") : S).replace(T, "$1").replace(W, "$1;"), S = "function(" + (C || "obj") + `) {
` + (C ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (f ? ", __e = _.escape" : "") + (_ ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + S + `return __p
}`;
          var U = Nl(function() {
            return Z(u, I + "return " + S).apply(n, c);
          });
          if (U.source = S, Hs(U))
            throw U;
          return U;
        }
        function Xg(e) {
          return j(e).toLowerCase();
        }
        function Zg(e) {
          return j(e).toUpperCase();
        }
        function jg(e, t, i) {
          if (e = j(e), e && (i || t === n))
            return Ko(e);
          if (!e || !(t = et(t)))
            return e;
          var s = bt(e), o = bt(t), u = $o(s, o), c = Jo(s, o) + 1;
          return un(s, u, c).join("");
        }
        function Vg(e, t, i) {
          if (e = j(e), e && (i || t === n))
            return e.slice(0, ta(e) + 1);
          if (!e || !(t = et(t)))
            return e;
          var s = bt(e), o = Jo(s, bt(t)) + 1;
          return un(s, 0, o).join("");
        }
        function qg(e, t, i) {
          if (e = j(e), e && (i || t === n))
            return e.replace(en, "");
          if (!e || !(t = et(t)))
            return e;
          var s = bt(e), o = $o(s, bt(t));
          return un(s, o).join("");
        }
        function Qg(e, t) {
          var i = ti, s = jt;
          if (le(t)) {
            var o = "separator" in t ? t.separator : o;
            i = "length" in t ? G(t.length) : i, s = "omission" in t ? et(t.omission) : s;
          }
          e = j(e);
          var u = e.length;
          if (Fn(e)) {
            var c = bt(e);
            u = c.length;
          }
          if (i >= u)
            return e;
          var f = i - Wn(s);
          if (f < 1)
            return s;
          var _ = c ? un(c, 0, f).join("") : e.slice(0, f);
          if (o === n)
            return _ + s;
          if (c && (f += _.length - f), Ys(o)) {
            if (e.slice(f).search(o)) {
              var y, E = _;
              for (o.global || (o = os(o.source, j(bo.exec(o)) + "g")), o.lastIndex = 0; y = o.exec(E); )
                var S = y.index;
              _ = _.slice(0, S === n ? f : S);
            }
          } else if (e.indexOf(et(o), f) != f) {
            var A = _.lastIndexOf(o);
            A > -1 && (_ = _.slice(0, A));
          }
          return _ + s;
        }
        function Kg(e) {
          return e = j(e), e && Pt.test(e) ? e.replace(Q, Ac) : e;
        }
        var $g = Vn(function(e, t, i) {
          return e + (i ? " " : "") + t.toUpperCase();
        }), js = Ha("toUpperCase");
        function Wl(e, t, i) {
          return e = j(e), t = i ? n : t, t === n ? wc(e) ? Lc(e) : hc(e) : e.match(t) || [];
        }
        var Nl = F(function(e, t) {
          try {
            return $e(e, n, t);
          } catch (i) {
            return Hs(i) ? i : new B(i);
          }
        }), Jg = Ut(function(e, t) {
          return at(t, function(i) {
            i = Rt(i), zt(e, i, Ws(e[i], e));
          }), e;
        });
        function e0(e) {
          var t = e == null ? 0 : e.length, i = M();
          return e = t ? oe(e, function(s) {
            if (typeof s[1] != "function")
              throw new lt(p);
            return [i(s[0]), s[1]];
          }) : [], F(function(s) {
            for (var o = -1; ++o < t; ) {
              var u = e[o];
              if ($e(u[0], this, s))
                return $e(u[1], this, s);
            }
          });
        }
        function t0(e) {
          return Ah(ct(e, ce));
        }
        function Vs(e) {
          return function() {
            return e;
          };
        }
        function n0(e, t) {
          return e == null || e !== e ? t : e;
        }
        var i0 = Xa(), r0 = Xa(!0);
        function Ze(e) {
          return e;
        }
        function qs(e) {
          return ya(typeof e == "function" ? e : ct(e, ce));
        }
        function s0(e) {
          return xa(ct(e, ce));
        }
        function o0(e, t) {
          return Sa(e, ct(t, ce));
        }
        var a0 = F(function(e, t) {
          return function(i) {
            return gi(i, e, t);
          };
        }), l0 = F(function(e, t) {
          return function(i) {
            return gi(e, i, t);
          };
        });
        function Qs(e, t, i) {
          var s = Ee(t), o = lr(t, s);
          i == null && !(le(t) && (o.length || !s.length)) && (i = t, t = e, e = this, o = lr(t, Ee(t)));
          var u = !(le(i) && "chain" in i) || !!i.chain, c = Wt(e);
          return at(o, function(f) {
            var _ = t[f];
            e[f] = _, c && (e.prototype[f] = function() {
              var y = this.__chain__;
              if (u || y) {
                var E = e(this.__wrapped__), S = E.__actions__ = He(this.__actions__);
                return S.push({ func: _, args: arguments, thisArg: e }), E.__chain__ = y, E;
              }
              return _.apply(e, nn([this.value()], arguments));
            });
          }), e;
        }
        function u0() {
          return Pe._ === this && (Pe._ = Cc), this;
        }
        function Ks() {
        }
        function c0(e) {
          return e = G(e), F(function(t) {
            return Aa(t, e);
          });
        }
        var h0 = Ls(oe), f0 = Ls(Zo), d0 = Ls(Jr);
        function Hl(e) {
          return ks(e) ? es(Rt(e)) : Nh(e);
        }
        function p0(e) {
          return function(t) {
            return e == null ? n : xn(e, t);
          };
        }
        var g0 = ja(), _0 = ja(!0);
        function $s() {
          return [];
        }
        function Js() {
          return !1;
        }
        function m0() {
          return {};
        }
        function v0() {
          return "";
        }
        function b0() {
          return !0;
        }
        function w0(e, t) {
          if (e = G(e), e < 1 || e > Ie)
            return [];
          var i = we, s = De(e, we);
          t = M(t), e -= we;
          for (var o = is(s, t); ++i < e; )
            t(i);
          return o;
        }
        function y0(e) {
          return z(e) ? oe(e, Rt) : tt(e) ? [e] : He(ul(j(e)));
        }
        function E0(e) {
          var t = ++Mc;
          return j(e) + t;
        }
        var x0 = pr(function(e, t) {
          return e + t;
        }, 0), S0 = Rs("ceil"), A0 = pr(function(e, t) {
          return e / t;
        }, 1), P0 = Rs("floor");
        function T0(e) {
          return e && e.length ? ar(e, Ze, ps) : n;
        }
        function L0(e, t) {
          return e && e.length ? ar(e, M(t, 2), ps) : n;
        }
        function R0(e) {
          return qo(e, Ze);
        }
        function I0(e, t) {
          return qo(e, M(t, 2));
        }
        function D0(e) {
          return e && e.length ? ar(e, Ze, vs) : n;
        }
        function M0(e, t) {
          return e && e.length ? ar(e, M(t, 2), vs) : n;
        }
        var O0 = pr(function(e, t) {
          return e * t;
        }, 1), C0 = Rs("round"), k0 = pr(function(e, t) {
          return e - t;
        }, 0);
        function B0(e) {
          return e && e.length ? ns(e, Ze) : 0;
        }
        function z0(e, t) {
          return e && e.length ? ns(e, M(t, 2)) : 0;
        }
        return l.after = sp, l.ary = wl, l.assign = Zp, l.assignIn = Cl, l.assignInWith = Tr, l.assignWith = jp, l.at = Vp, l.before = yl, l.bind = Ws, l.bindAll = Jg, l.bindKey = El, l.castArray = mp, l.chain = ml, l.chunk = Pf, l.compact = Tf, l.concat = Lf, l.cond = e0, l.conforms = t0, l.constant = Vs, l.countBy = Bd, l.create = qp, l.curry = xl, l.curryRight = Sl, l.debounce = Al, l.defaults = Qp, l.defaultsDeep = Kp, l.defer = op, l.delay = ap, l.difference = Rf, l.differenceBy = If, l.differenceWith = Df, l.drop = Mf, l.dropRight = Of, l.dropRightWhile = Cf, l.dropWhile = kf, l.fill = Bf, l.filter = Gd, l.flatMap = Wd, l.flatMapDeep = Nd, l.flatMapDepth = Hd, l.flatten = dl, l.flattenDeep = zf, l.flattenDepth = Gf, l.flip = lp, l.flow = i0, l.flowRight = r0, l.fromPairs = Uf, l.functions = rg, l.functionsIn = sg, l.groupBy = Yd, l.initial = Wf, l.intersection = Nf, l.intersectionBy = Hf, l.intersectionWith = Yf, l.invert = ag, l.invertBy = lg, l.invokeMap = Zd, l.iteratee = qs, l.keyBy = jd, l.keys = Ee, l.keysIn = Xe, l.map = yr, l.mapKeys = cg, l.mapValues = hg, l.matches = s0, l.matchesProperty = o0, l.memoize = xr, l.merge = fg, l.mergeWith = kl, l.method = a0, l.methodOf = l0, l.mixin = Qs, l.negate = Sr, l.nthArg = c0, l.omit = dg, l.omitBy = pg, l.once = up, l.orderBy = Vd, l.over = h0, l.overArgs = cp, l.overEvery = f0, l.overSome = d0, l.partial = Ns, l.partialRight = Pl, l.partition = qd, l.pick = gg, l.pickBy = Bl, l.property = Hl, l.propertyOf = p0, l.pull = Vf, l.pullAll = gl, l.pullAllBy = qf, l.pullAllWith = Qf, l.pullAt = Kf, l.range = g0, l.rangeRight = _0, l.rearg = hp, l.reject = $d, l.remove = $f, l.rest = fp, l.reverse = Us, l.sampleSize = ep, l.set = mg, l.setWith = vg, l.shuffle = tp, l.slice = Jf, l.sortBy = rp, l.sortedUniq = od, l.sortedUniqBy = ad, l.split = Wg, l.spread = dp, l.tail = ld, l.take = ud, l.takeRight = cd, l.takeRightWhile = hd, l.takeWhile = fd, l.tap = Td, l.throttle = pp, l.thru = wr, l.toArray = Dl, l.toPairs = zl, l.toPairsIn = Gl, l.toPath = y0, l.toPlainObject = Ol, l.transform = bg, l.unary = gp, l.union = dd, l.unionBy = pd, l.unionWith = gd, l.uniq = _d, l.uniqBy = md, l.uniqWith = vd, l.unset = wg, l.unzip = Fs, l.unzipWith = _l, l.update = yg, l.updateWith = Eg, l.values = Kn, l.valuesIn = xg, l.without = bd, l.words = Wl, l.wrap = _p, l.xor = wd, l.xorBy = yd, l.xorWith = Ed, l.zip = xd, l.zipObject = Sd, l.zipObjectDeep = Ad, l.zipWith = Pd, l.entries = zl, l.entriesIn = Gl, l.extend = Cl, l.extendWith = Tr, Qs(l, l), l.add = x0, l.attempt = Nl, l.camelCase = Tg, l.capitalize = Ul, l.ceil = S0, l.clamp = Sg, l.clone = vp, l.cloneDeep = wp, l.cloneDeepWith = yp, l.cloneWith = bp, l.conformsTo = Ep, l.deburr = Fl, l.defaultTo = n0, l.divide = A0, l.endsWith = Lg, l.eq = yt, l.escape = Rg, l.escapeRegExp = Ig, l.every = zd, l.find = Ud, l.findIndex = hl, l.findKey = $p, l.findLast = Fd, l.findLastIndex = fl, l.findLastKey = Jp, l.floor = P0, l.forEach = vl, l.forEachRight = bl, l.forIn = eg, l.forInRight = tg, l.forOwn = ng, l.forOwnRight = ig, l.get = Xs, l.gt = xp, l.gte = Sp, l.has = og, l.hasIn = Zs, l.head = pl, l.identity = Ze, l.includes = Xd, l.indexOf = Ff, l.inRange = Ag, l.invoke = ug, l.isArguments = Pn, l.isArray = z, l.isArrayBuffer = Ap, l.isArrayLike = Ye, l.isArrayLikeObject = de, l.isBoolean = Pp, l.isBuffer = cn, l.isDate = Tp, l.isElement = Lp, l.isEmpty = Rp, l.isEqual = Ip, l.isEqualWith = Dp, l.isError = Hs, l.isFinite = Mp, l.isFunction = Wt, l.isInteger = Tl, l.isLength = Ar, l.isMap = Ll, l.isMatch = Op, l.isMatchWith = Cp, l.isNaN = kp, l.isNative = Bp, l.isNil = Gp, l.isNull = zp, l.isNumber = Rl, l.isObject = le, l.isObjectLike = fe, l.isPlainObject = yi, l.isRegExp = Ys, l.isSafeInteger = Up, l.isSet = Il, l.isString = Pr, l.isSymbol = tt, l.isTypedArray = Qn, l.isUndefined = Fp, l.isWeakMap = Wp, l.isWeakSet = Np, l.join = Xf, l.kebabCase = Dg, l.last = ft, l.lastIndexOf = Zf, l.lowerCase = Mg, l.lowerFirst = Og, l.lt = Hp, l.lte = Yp, l.max = T0, l.maxBy = L0, l.mean = R0, l.meanBy = I0, l.min = D0, l.minBy = M0, l.stubArray = $s, l.stubFalse = Js, l.stubObject = m0, l.stubString = v0, l.stubTrue = b0, l.multiply = O0, l.nth = jf, l.noConflict = u0, l.noop = Ks, l.now = Er, l.pad = Cg, l.padEnd = kg, l.padStart = Bg, l.parseInt = zg, l.random = Pg, l.reduce = Qd, l.reduceRight = Kd, l.repeat = Gg, l.replace = Ug, l.result = _g, l.round = C0, l.runInContext = g, l.sample = Jd, l.size = np, l.snakeCase = Fg, l.some = ip, l.sortedIndex = ed, l.sortedIndexBy = td, l.sortedIndexOf = nd, l.sortedLastIndex = id, l.sortedLastIndexBy = rd, l.sortedLastIndexOf = sd, l.startCase = Ng, l.startsWith = Hg, l.subtract = k0, l.sum = B0, l.sumBy = z0, l.template = Yg, l.times = w0, l.toFinite = Nt, l.toInteger = G, l.toLength = Ml, l.toLower = Xg, l.toNumber = dt, l.toSafeInteger = Xp, l.toString = j, l.toUpper = Zg, l.trim = jg, l.trimEnd = Vg, l.trimStart = qg, l.truncate = Qg, l.unescape = Kg, l.uniqueId = E0, l.upperCase = $g, l.upperFirst = js, l.each = vl, l.eachRight = bl, l.first = pl, Qs(l, function() {
          var e = {};
          return Tt(l, function(t, i) {
            K.call(l.prototype, i) || (e[i] = t);
          }), e;
        }(), { chain: !1 }), l.VERSION = r, at(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
          l[e].placeholder = l;
        }), at(["drop", "take"], function(e, t) {
          H.prototype[e] = function(i) {
            i = i === n ? 1 : be(G(i), 0);
            var s = this.__filtered__ && !t ? new H(this) : this.clone();
            return s.__filtered__ ? s.__takeCount__ = De(i, s.__takeCount__) : s.__views__.push({
              size: De(i, we),
              type: e + (s.__dir__ < 0 ? "Right" : "")
            }), s;
          }, H.prototype[e + "Right"] = function(i) {
            return this.reverse()[e](i).reverse();
          };
        }), at(["filter", "map", "takeWhile"], function(e, t) {
          var i = t + 1, s = i == Be || i == qe;
          H.prototype[e] = function(o) {
            var u = this.clone();
            return u.__iteratees__.push({
              iteratee: M(o, 3),
              type: i
            }), u.__filtered__ = u.__filtered__ || s, u;
          };
        }), at(["head", "last"], function(e, t) {
          var i = "take" + (t ? "Right" : "");
          H.prototype[e] = function() {
            return this[i](1).value()[0];
          };
        }), at(["initial", "tail"], function(e, t) {
          var i = "drop" + (t ? "" : "Right");
          H.prototype[e] = function() {
            return this.__filtered__ ? new H(this) : this[i](1);
          };
        }), H.prototype.compact = function() {
          return this.filter(Ze);
        }, H.prototype.find = function(e) {
          return this.filter(e).head();
        }, H.prototype.findLast = function(e) {
          return this.reverse().find(e);
        }, H.prototype.invokeMap = F(function(e, t) {
          return typeof e == "function" ? new H(this) : this.map(function(i) {
            return gi(i, e, t);
          });
        }), H.prototype.reject = function(e) {
          return this.filter(Sr(M(e)));
        }, H.prototype.slice = function(e, t) {
          e = G(e);
          var i = this;
          return i.__filtered__ && (e > 0 || t < 0) ? new H(i) : (e < 0 ? i = i.takeRight(-e) : e && (i = i.drop(e)), t !== n && (t = G(t), i = t < 0 ? i.dropRight(-t) : i.take(t - e)), i);
        }, H.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, H.prototype.toArray = function() {
          return this.take(we);
        }, Tt(H.prototype, function(e, t) {
          var i = /^(?:filter|find|map|reject)|While$/.test(t), s = /^(?:head|last)$/.test(t), o = l[s ? "take" + (t == "last" ? "Right" : "") : t], u = s || /^find/.test(t);
          o && (l.prototype[t] = function() {
            var c = this.__wrapped__, f = s ? [1] : arguments, _ = c instanceof H, y = f[0], E = _ || z(c), S = function(N) {
              var Y = o.apply(l, nn([N], f));
              return s && A ? Y[0] : Y;
            };
            E && i && typeof y == "function" && y.length != 1 && (_ = E = !1);
            var A = this.__chain__, I = !!this.__actions__.length, C = u && !A, U = _ && !I;
            if (!u && E) {
              c = U ? c : new H(this);
              var k = e.apply(c, f);
              return k.__actions__.push({ func: wr, args: [S], thisArg: n }), new ut(k, A);
            }
            return C && U ? e.apply(this, f) : (k = this.thru(S), C ? s ? k.value()[0] : k.value() : k);
          });
        }), at(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
          var t = Zi[e], i = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", s = /^(?:pop|shift)$/.test(e);
          l.prototype[e] = function() {
            var o = arguments;
            if (s && !this.__chain__) {
              var u = this.value();
              return t.apply(z(u) ? u : [], o);
            }
            return this[i](function(c) {
              return t.apply(z(c) ? c : [], o);
            });
          };
        }), Tt(H.prototype, function(e, t) {
          var i = l[t];
          if (i) {
            var s = i.name + "";
            K.call(Xn, s) || (Xn[s] = []), Xn[s].push({ name: t, func: i });
          }
        }), Xn[dr(n, se).name] = [{
          name: "wrapper",
          func: n
        }], H.prototype.clone = Qc, H.prototype.reverse = Kc, H.prototype.value = $c, l.prototype.at = Ld, l.prototype.chain = Rd, l.prototype.commit = Id, l.prototype.next = Dd, l.prototype.plant = Od, l.prototype.reverse = Cd, l.prototype.toJSON = l.prototype.valueOf = l.prototype.value = kd, l.prototype.first = l.prototype.head, li && (l.prototype[li] = Md), l;
      }, Nn = Rc();
      vn ? ((vn.exports = Nn)._ = Nn, qr._ = Nn) : Pe._ = Nn;
    }).call(R_);
  }(Li, Li.exports)), Li.exports;
}
var D_ = I_(), M_ = { AssetLoader: "./src/modules/asset/loader/AssetLoader.mjs", AssetConverter: "./src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "./src/modules/asset/exporter/AssetExporter.mjs", ARSystem: "./src/modules/ar/ARSystem.mjs", MediaCreator: "./src/modules/mediacreator/MediaCreator.mjs", SystemInfo: "./src/modules/systeminfo/SystemInfo.mjs" };
class O_ {
  // Constructor now only needs the module name
  constructor(a) {
    w(this, "_promise", null);
    w(this, "_instance", null);
    w(this, "_importFn");
    this._name = a, this._importFn = async () => {
      const n = M_[this._name];
      if (!n)
        throw new Error(
          `Build path for module ${this._name} not found in __MODULE_BUILD_PATHS__. Build configuration issue?`
        );
      try {
        const r = await import(
          /* @vite-ignore */
          n
        );
        if (!r[this._name])
          throw new Error(
            `Module class ${this._name} not found in dynamically imported module: ${n}`
          );
        return r[this._name];
      } catch (r) {
        throw new Error(
          `Failed to dynamically import module ${this._name} from path ${n}: ${r instanceof Error ? r.message : String(r)}`
        );
      }
    };
  }
  /**
   * Get or create a singleton instance of the module
   * @internal
   */
  async getInstance() {
    if (this._instance !== null)
      return this._instance;
    this._promise || (this._promise = this._importFn());
    try {
      const a = await this._promise;
      return this._instance = new a(), this._instance;
    } catch (a) {
      throw new Error(
        `Failed to instantiate module ${this._name}: ${a instanceof Error ? a.message : String(a)}`
      );
    }
  }
}
const Fr = class Fr {
  constructor() {
    // Map now only stores Module instances, keyed by name
    w(this, "_modules", /* @__PURE__ */ new Map());
  }
  static get instance() {
    return this._instance;
  }
  /**
   * Register a module
   * @internal
   */
  register(a) {
    this._modules.has(a) && console.warn(
      `Module '${a}' is already registered. Overwriting.`
    ), this._modules.set(a, new O_(a));
  }
  /**
   * Get a singleton instance of the module
   * @internal
   */
  async get(a) {
    const n = this._modules.get(a);
    if (!n)
      throw new Error(`Module '${a}' not registered`);
    return n.getInstance();
  }
};
w(Fr, "_instance", new Fr());
let lo = Fr;
const Ri = lo.instance, C_ = {
  AssetLoader: "./asset/loader/AssetLoader.ts",
  AssetConverter: "./asset/converter/AssetConverter.ts",
  AssetExporter: "./asset/exporter/AssetExporter.ts",
  ARSystem: "./ar/ARSystem.ts",
  MediaCreator: "./mediacreator/MediaCreator.ts",
  SystemInfo: "./systeminfo/SystemInfo.ts"
};
Object.keys(C_).forEach((x) => {
  Ri.register(x);
});
const ei = class ei {
  constructor(a, n, r, h) {
    w(this, "_id");
    w(this, "renderer");
    w(this, "scene");
    w(this, "controller");
    w(this, "toolbox");
    w(this, "registered", /* @__PURE__ */ new Map());
    // private listeners: { [key: string]: EventListener[] } = {};
    w(this, "listeners", /* @__PURE__ */ new Map());
    this._id = L_(), this.renderer = a, this.scene = n, this.controller = r, this.toolbox = h, ei.__instances.push(this);
  }
  static get(a) {
    const n = this.__instances.find(
      (r) => r.id === a
    );
    return n || this.__instances.find(
      (r) => Array.from(r.registered.values()).find(
        (h) => h.id === a
      )
    );
  }
  get id() {
    return this._id;
  }
  DestroyInstance() {
    const a = ei.__instances.findIndex(
      (n) => n.id === this.id
    );
    return a === -1 ? !1 : (ei.__instances.splice(a, 1), !0);
  }
  PerformAction(a, n) {
    let r = !1;
    switch (a) {
      case "START_RENDER": {
        this.renderer.StartRenderer(this.scene, this.controller.object), r = !0;
        break;
      }
      case "GET_ALL_SCENE_DATA": {
        r = this.getAllSceneData(
          n
        );
        break;
      }
      case "GET_ALL_OBJECTS": {
        r = this.getAllObjects(
          n
        );
        break;
      }
      case "GET_OBJECTS": {
        r = this.getObjects(
          n
        );
        break;
      }
      case "ADD_OBJECT": {
        r = this.addObject(
          n
        );
        break;
      }
      case "UPDATE_OBJECT": {
        r = this.updateObject(
          n
        );
        break;
      }
      case "DELETE_OBJECT": {
        r = this.deleteObject(
          n
        );
        break;
      }
      case "SELECT_OBJECT": {
        r = this.selectObject(
          n
        );
        break;
      }
      case "DESELECT_OBJECT": {
        r = this.deselectObject(
          n
        );
        break;
      }
      case "SET_BACKGROUND": {
        r = this.setBackground(
          n
        );
        break;
      }
      case "DROP_IT": {
        r = this.dropIt(
          n
        );
        break;
      }
      case "PLACE_ON_FLOOR": {
        r = this.placeOnFloor(
          n
        );
        break;
      }
      case "SET_CAMERA_TRANSFORM": {
        r = this.setCameraTransform(
          n
        );
        break;
      }
      case "GET_CAMERA_TRANSFORM": {
        r = this.getCameraTransform(
          n
        );
        break;
      }
      case "MOVE_CAMERA": {
        r = this.moveCamera(
          n
        );
        break;
      }
      case "RESET_CAMERA": {
        r = this.resetCamera(
          n
        );
        break;
      }
      case "COMPUTE_ENCOMPASSING_VIEW": {
        r = this.computeEncompassingView(
          n
        );
        break;
      }
      case "SET_CAMERA_LAYER": {
        r = this.setCameraLayer(
          n
        );
        break;
      }
      case "ZOOM_CAMERA": {
        r = this.zoomCamera(
          n
        );
        break;
      }
      case "SET_GIZMO_MODE": {
        r = this.setGizmoMode(
          n
        );
        break;
      }
      case "SET_GIZMO_VISIBILITY": {
        r = this.setGizmoVisibility(
          n
        );
        break;
      }
      case "SET_GIZMO_SCALE_LINKED": {
        r = this.setGizmoScaleLinked(
          n
        );
        break;
      }
      case "USE_TOOL": {
        r = this.useTool(
          n
        );
        break;
      }
      case "MODEL_LOADED": {
        r = this.modelLoaded(
          n
        );
        break;
      }
      case "UPDATE_SCENE": {
        r = this.updateScene(
          n
        );
        break;
      }
      case "GENERATE_MEDIA": {
        r = this.generateMedia(
          n
        );
        break;
      }
      case "SET_PARENT": {
        r = this.setParent(
          n
        );
        break;
      }
      case "EXPORT_SCENE": {
        r = this.exportScene(
          n
        );
        break;
      }
      case "LAUNCH_AR": {
        const { uri: h, options: b } = n;
        r = new Promise((p, P) => {
          Ri.get("ARSystem").then((O) => {
            p(O.launch(h, b));
          }).catch(P);
        });
        break;
      }
      default:
        console.warn(
          `DIVECommunication.PerformAction: has been executed with unknown Action type ${a}`
        );
    }
    return this.dispatch(a, n), r;
  }
  Subscribe(a, n) {
    return this.listeners.get(a) || this.listeners.set(a, []), this.listeners.get(a).push(n), () => {
      const r = this.listeners.get(a);
      if (!r) return !1;
      const h = r.findIndex(
        (b) => b === n
      );
      return h === -1 ? !1 : (r.splice(h, 1), !0);
    };
  }
  dispatch(a, n) {
    const r = this.listeners.get(a);
    r && r.forEach((h) => h(n));
  }
  getAllSceneData(a) {
    const n = {
      name: this.scene.name,
      mediaItem: null,
      backgroundColor: "#" + this.scene.background.getHexString(),
      floorEnabled: this.scene.Floor.visible,
      floorColor: "#" + this.scene.Floor.material.color.getHexString(),
      userCamera: {
        position: this.controller.object.position.clone(),
        target: this.controller.target.clone()
      },
      spotmarks: [],
      lights: Array.from(this.registered.values()).filter(
        (r) => r.entityType === "light"
      ),
      objects: Array.from(this.registered.values()).filter(
        (r) => r.entityType === "model"
      ),
      cameras: Array.from(this.registered.values()).filter(
        (r) => r.entityType === "pov"
      ),
      primitives: Array.from(this.registered.values()).filter(
        (r) => r.entityType === "primitive"
      ),
      groups: Array.from(this.registered.values()).filter(
        (r) => r.entityType === "group"
      )
    };
    return Object.assign(a, n), n;
  }
  getAllObjects(a) {
    return Object.assign(a, this.registered), this.registered;
  }
  getObjects(a) {
    if (a.ids.length === 0) return [];
    const n = [];
    return this.registered.forEach((r) => {
      a.ids.includes(r.id) && n.push(r);
    }), n;
  }
  addObject(a) {
    return this.registered.get(a.id) ? !1 : (a.parentId === void 0 && (a.parentId = null), this.registered.set(a.id, a), this.scene.AddSceneObject(a), !0);
  }
  updateObject(a) {
    const n = this.registered.get(a.id);
    if (!n) return !1;
    this.registered.set(a.id, D_.merge(n, a));
    const r = this.registered.get(a.id);
    return this.scene.UpdateSceneObject({
      ...a,
      id: r.id,
      entityType: r.entityType
    }), Object.assign(a, r), !0;
  }
  deleteObject(a) {
    const n = this.registered.get(a.id);
    return n ? (n.parentId && this.setParent({
      object: { id: n.id },
      parent: null
    }), n.entityType === "group" && this.registered.forEach((r) => {
      r.parentId === n.id && this.updateObject({
        id: r.id,
        parentId: null
      });
    }), Object.assign(a, n), this.registered.delete(a.id), Array.from(this.registered.values()).forEach((r) => {
      r.parentId && r.parentId === a.id && (r.parentId = null);
    }), this.scene.DeleteSceneObject(n), !0) : !1;
  }
  selectObject(a) {
    const n = this.registered.get(a.id);
    if (!n) return !1;
    const r = this.scene.GetSceneObject(n);
    if (!r || !("isSelectable" in r)) return !1;
    const h = this.toolbox.GetActiveTool();
    return h && ru(h) && h.AttachGizmo(r), Object.assign(a, n), !0;
  }
  deselectObject(a) {
    const n = this.registered.get(a.id);
    if (!n) return !1;
    const r = this.scene.GetSceneObject(n);
    if (!r || !("isSelectable" in r)) return !1;
    const h = this.toolbox.GetActiveTool();
    return h && ru(h) && h.DetachGizmo(), Object.assign(a, n), !0;
  }
  setBackground(a) {
    return this.scene.SetBackground(a.color), !0;
  }
  dropIt(a) {
    const n = this.registered.get(a.id);
    return n ? (this.scene.GetSceneObject(n).DropIt(), !0) : !1;
  }
  placeOnFloor(a) {
    const n = this.registered.get(a.id);
    return n ? (this.scene.PlaceOnFloor(n), !0) : !1;
  }
  setCameraTransform(a) {
    return this.controller.object.position.copy(a.position), this.controller.target.copy(a.target), this.controller.update(), !0;
  }
  getCameraTransform(a) {
    const n = {
      position: this.controller.object.position.clone(),
      target: this.controller.target.clone()
    };
    return Object.assign(a, n), n;
  }
  moveCamera(a) {
    let n = { x: 0, y: 0, z: 0 }, r = { x: 0, y: 0, z: 0 };
    return "id" in a ? (n = this.registered.get(a.id).position, r = this.registered.get(a.id).target) : (n = a.position, r = a.target), this.controller.MoveTo(
      n,
      r,
      a.duration,
      a.locked
    ), !0;
  }
  setCameraLayer(a) {
    return this.controller.object.SetCameraLayer(a.layer), !0;
  }
  resetCamera(a) {
    return this.controller.RevertLast(a.duration), !0;
  }
  computeEncompassingView(a) {
    const n = this.scene.ComputeSceneBB(), r = this.controller.ComputeEncompassingView(n);
    return Object.assign(a, r), r;
  }
  zoomCamera(a) {
    return a.direction === "IN" && this.controller.ZoomIn(a.by), a.direction === "OUT" && this.controller.ZoomOut(a.by), !0;
  }
  setGizmoMode(a) {
    return this.toolbox.SetGizmoMode(a.mode), !0;
  }
  setGizmoVisibility(a) {
    return this.toolbox.SetGizmoVisibility(a), a;
  }
  setGizmoScaleLinked(a) {
    return this.toolbox.SetGizmoScaleLinked(a), a;
  }
  useTool(a) {
    return this.toolbox.UseTool(a.tool), !0;
  }
  modelLoaded(a) {
    return this.registered.get(a.id).loaded = !0, !0;
  }
  updateScene(a) {
    return a.name !== void 0 && (this.scene.name = a.name), a.backgroundColor !== void 0 && this.scene.SetBackground(a.backgroundColor), a.gridEnabled !== void 0 && this.scene.Grid.SetVisibility(a.gridEnabled), a.floorEnabled !== void 0 && this.scene.Floor.SetVisibility(a.floorEnabled), a.floorColor !== void 0 && this.scene.Floor.SetColor(a.floorColor), a.name = this.scene.name, a.backgroundColor = "#" + this.scene.background.getHexString(), a.gridEnabled = this.scene.Grid.visible, a.floorEnabled = this.scene.Floor.visible, a.floorColor = "#" + this.scene.Floor.material.color.getHexString(), !0;
  }
  generateMedia(a) {
    let n = { x: 0, y: 0, z: 0 }, r = { x: 0, y: 0, z: 0 };
    return "id" in a ? (n = this.registered.get(a.id).position, r = this.registered.get(a.id).target) : (n = a.position, r = a.target), Ri.get("MediaCreator").then((h) => h.GenerateMedia(
      n,
      r,
      a.width,
      a.height
    ));
  }
  setParent(a) {
    const n = this.registered.get(a.object.id);
    if (!n) return !1;
    const r = this.scene.GetSceneObject(n);
    if (!r) return !1;
    if (a.parent === null)
      return this.scene.Root.attach(r), this.updateObject({
        id: n.id,
        parentId: null
      }), !0;
    if (a.object.id === a.parent.id)
      return !1;
    const h = this.registered.get(a.parent.id);
    if (!h)
      return this.scene.Root.attach(r), this.updateObject({
        id: n.id,
        parentId: null
      }), !0;
    const b = this.scene.GetSceneObject(h);
    return b ? (b.attach(r), this.updateObject({
      id: n.id,
      parentId: h.id
    }), !0) : (this.scene.Root.attach(r), this.updateObject({
      id: n.id,
      parentId: null
    }), !0);
  }
  exportScene(a) {
    return Ri.get("AssetExporter").then((n) => n.export(this.scene.Root, a.type, {}));
  }
};
w(ei, "__instances", []);
let rt = ei;
class k_ {
  constructor(a) {
    w(this, "_renderer");
    w(this, "_rendererCallbackId");
    this._renderer = a, this._rendererCallbackId = this._renderer.AddPreRenderCallback(() => {
      this.Update();
    });
  }
  Dispose() {
    this._renderer.RemovePreRenderCallback(this._rendererCallbackId);
  }
  Update() {
    c_();
  }
  Animate(a) {
    return new h_(a);
  }
}
class B_ extends Z0 {
  constructor(n, r, h) {
    super(-1, 1, 1, -1, 0.1, 100);
    w(this, "axesHelper");
    w(this, "_renderer");
    w(this, "_scene");
    w(this, "_renderCallbackId");
    this.layers.mask = xi, this.axesHelper = new j0(0.5), this.axesHelper.layers.mask = xi, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new Xt(so),
      new Xt(oo),
      new Xt(ao)
    );
    const b = new eo("X", 0.2, uu), p = new eo("Y", 0.2, cu), P = new eo("Z", 0.2, hu);
    b.layers.mask = xi, p.layers.mask = xi, P.layers.mask = xi, b.position.set(0.7, 0, 0), p.position.set(0, 0.7, 0), P.position.set(0, 0, 0.7), this.axesHelper.add(b), this.axesHelper.add(p), this.axesHelper.add(P), this.add(this.axesHelper), this._renderer = n, this._scene = r, this._scene.add(this);
    const O = new V0();
    this._renderCallbackId = n.AddPostRenderCallback(() => {
      const X = r.background;
      r.background = null, n.getViewport(O), n.setViewport(0, 0, 150, 150), n.autoClear = !1, this.SetFromCameraMatrix(h.object.matrix), n.render(r, this), n.setViewport(O), n.autoClear = !0, r.background = X;
    });
  }
  Dispose() {
    this._renderer.RemovePostRenderCallback(this._renderCallbackId), this._scene.remove(this);
  }
  SetFromCameraMatrix(n) {
    this.axesHelper.rotation.setFromRotationMatrix(
      new ho().extractRotation(n).invert()
    );
  }
}
const z_ = "1.19.1-beta.7", G_ = {
  version: z_
}, Rn = {
  antialias: !0,
  alpha: !0,
  stencil: !1,
  shadowMapEnabled: !0,
  shadowMapType: Q0,
  toneMapping: q0,
  canvas: void 0
};
class U_ extends K0 {
  constructor(n = Rn) {
    super({
      antialias: n.antialias || Rn.antialias,
      alpha: n.alpha || Rn.alpha,
      preserveDrawingBuffer: !0,
      canvas: n.canvas
    });
    // basic functionality members
    w(this, "paused", !1);
    w(this, "running", !1);
    w(this, "force", !1);
    // pre- and post-render callbacks
    w(this, "preRenderCallbacks", /* @__PURE__ */ new Map());
    w(this, "postRenderCallbacks", /* @__PURE__ */ new Map());
    this.setPixelRatio(window.devicePixelRatio), this.shadowMap.enabled = n.shadowMapEnabled || Rn.shadowMapEnabled, this.shadowMap.type = n.shadowMapType || Rn.shadowMapType, this.toneMapping = n.toneMapping || Rn.toneMapping, this.debug.checkShaderErrors = !1;
  }
  // Stops renderings and disposes the renderer.
  Dispose() {
    this.StopRenderer(), this.dispose();
  }
  // Starts the renderer with the given scene and camera.
  StartRenderer(n, r) {
    this.setAnimationLoop((h, b) => {
      this.internal_render(n, r, h, b);
    }), this.running = !0;
  }
  // Pauses the renderer.
  PauseRenderer() {
    this.paused = !0;
  }
  // Resumes the renderer after pausing.
  ResumeRenderer() {
    this.paused = !1;
  }
  // Stops the renderer completely. Has to be started again with StartRenderer().
  StopRenderer() {
    this.setAnimationLoop(null), this.running = !1;
  }
  // Resizes the renderer to the given width and height.
  OnResize(n, r) {
    this.setSize(n, r);
  }
  /**
   * Adds a callback to the render loop before actual render call.
   * @param callback Executed before rendering.
   * @returns uuid to remove the callback.
   */
  AddPreRenderCallback(n) {
    const r = Zt.generateUUID();
    return this.preRenderCallbacks.set(r, n), r;
  }
  /**
   * Removes a callback from the render loop before actual render call.
   * @param uuid of callback to remove.
   * @returns if removing was successful.
   */
  RemovePreRenderCallback(n) {
    return this.preRenderCallbacks.has(n) ? (this.preRenderCallbacks.delete(n), !0) : !1;
  }
  /**
   * Adds a callback to the render loop after actual render call.
   * @param callback Executed after rendering.
   * @returns uuid to remove the callback.
   */
  AddPostRenderCallback(n) {
    const r = Zt.generateUUID();
    return this.postRenderCallbacks.set(r, n), r;
  }
  /**
   * Removes a callback from the render loop after actual render call.
   * @param uuid of callback to remove.
   * @returns if removing was successful.
   */
  RemovePostRenderCallback(n) {
    return this.postRenderCallbacks.has(n) ? (this.postRenderCallbacks.delete(n), !0) : !1;
  }
  /**
   * Forces the renderer to render the next frame.
   */
  ForceRendering() {
    this.force = !0;
  }
  /**
   * Internal render loop.
   *
   * To control renderloop you can add callbacks via AddPreRenderCallback() and AddPostRenderCallback().
   * @param scene Scene to render.
   * @param cam Camera to render with.
   */
  internal_render(n, r, h, b) {
    (this.paused || !this.running) && !this.force || (this.preRenderCallbacks.forEach((p) => {
      p(h, b);
    }), this.render(n, r), this.postRenderCallbacks.forEach((p) => {
      p(h, b);
    }), this.force = !1);
  }
}
class F_ extends gt {
  constructor() {
    super();
    w(this, "isDIVELight", !0);
    w(this, "isDIVEAmbientLight", !0);
    w(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new $0(16777215, 1), this._light.layers.mask = xt, this.add(this._light);
  }
  SetColor(n) {
    this._light.color = n;
  }
  SetIntensity(n) {
    this._light.intensity = n;
  }
  SetEnabled(n) {
    this._light.visible = n;
  }
}
class W_ extends gt {
  constructor() {
    super();
    w(this, "isDIVELight", !0);
    w(this, "isDIVEPointLight", !0);
    w(this, "isMovable", !0);
    w(this, "isSelectable", !0);
    w(this, "gizmo", null);
    w(this, "light");
    w(this, "mesh");
    this.name = "DIVEPointLight", this.light = new J0(16777215, 1), this.light.layers.mask = xt, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const n = 0.1, r = new co(
      n,
      n * 320,
      n * 320
    ), h = new uo({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: e_
    });
    this.mesh = new R(r, h), this.mesh.layers.mask = lu, this.add(this.mesh);
  }
  SetColor(n) {
    this.light.color = n, this.mesh.material.color = n;
  }
  SetIntensity(n) {
    this.light.intensity = n, this.mesh.material.opacity = n > 0.8 ? 0.8 : n * 0.8;
  }
  SetEnabled(n) {
    this.light.visible = n;
  }
  onMove() {
    var n;
    (n = rt.get(this.userData.id)) == null || n.PerformAction(
      "UPDATE_OBJECT",
      { id: this.userData.id, position: this.position }
    );
  }
  onSelect() {
    var n;
    (n = rt.get(this.userData.id)) == null || n.PerformAction(
      "SELECT_OBJECT",
      { id: this.userData.id }
    );
  }
  onDeselect() {
    var n;
    (n = rt.get(this.userData.id)) == null || n.PerformAction(
      "DESELECT_OBJECT",
      { id: this.userData.id }
    );
  }
}
class N_ extends gt {
  constructor() {
    super();
    w(this, "isDIVELight", !0);
    w(this, "isDIVESceneLight", !0);
    w(this, "_hemiLight");
    w(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new t_(16777215, 16777215, 2), this._hemiLight.layers.mask = xt, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new ou(16777215, 3), this._dirLight.layers.mask = xt, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
    const n = 5;
    this._dirLight.shadow.camera.left = -5, this._dirLight.shadow.camera.right = n, this._dirLight.shadow.camera.top = n, this._dirLight.shadow.camera.bottom = -5, this._dirLight.shadow.camera.far = 3500, this.add(this._dirLight);
  }
  SetColor(n) {
    this._hemiLight.color = n, this._dirLight.color = n;
  }
  SetIntensity(n) {
    this._hemiLight.intensity = n * 2, this._dirLight.intensity = n * 3;
  }
  SetEnabled(n) {
    this._hemiLight.visible = n, this._dirLight.visible = n;
  }
}
const go = (x) => x.parent ? go(x.parent) : x;
class H_ {
  constructor() {
    w(this, "isMovable", !0);
  }
}
class Y_ {
  constructor() {
    w(this, "isSelectable", !0);
  }
}
function X_(x, a) {
  return a.forEach((n) => {
    Object.getOwnPropertyNames(n.prototype).forEach((r) => {
      Object.defineProperty(
        x.prototype,
        r,
        Object.getOwnPropertyDescriptor(n.prototype, r)
      );
    });
  }), x;
}
class _o extends X_(gt, [
  Y_,
  H_
]) {
  constructor() {
    super();
    w(this, "isDIVENode", !0);
    w(this, "gizmo", null);
    w(this, "_positionWorldBuffer");
    w(this, "_boundingBox");
    this.layers.mask = xt, this._positionWorldBuffer = new D(), this._boundingBox = new au();
  }
  SetPosition(n) {
    if (!this.parent) {
      this.position.set(n.x, n.y, n.z);
      return;
    }
    const r = new D(n.x, n.y, n.z);
    this.position.copy(this.parent.worldToLocal(r)), "isDIVEGroup" in this.parent && this.parent.UpdateLineTo(this);
  }
  SetRotation(n) {
    this.rotation.set(n.x, n.y, n.z);
  }
  SetScale(n) {
    this.scale.set(n.x, n.y, n.z);
  }
  SetVisibility(n) {
    this.visible = n;
  }
  SetToWorldOrigin() {
    var n;
    this.position.set(0, 0, 0), (n = rt.get(this.userData.id)) == null || n.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      }
    );
  }
  /**
   * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
   */
  onMove() {
    var n;
    (n = rt.get(this.userData.id)) == null || n.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      }
    );
  }
  onSelect() {
    var n;
    (n = rt.get(this.userData.id)) == null || n.PerformAction(
      "SELECT_OBJECT",
      { id: this.userData.id }
    );
  }
  onDeselect() {
    var n;
    (n = rt.get(this.userData.id)) == null || n.PerformAction(
      "DESELECT_OBJECT",
      { id: this.userData.id }
    );
  }
}
class Z_ extends _o {
  constructor() {
    super(...arguments);
    w(this, "isDIVEModel", !0);
    w(this, "_mesh", null);
    w(this, "_material", null);
  }
  SetModel(n) {
    this.clear(), this._boundingBox.makeEmpty(), n.traverse((r) => {
      r.castShadow = !0, r.receiveShadow = !0, r.layers.mask = this.layers.mask, this._boundingBox.expandByObject(r), !this._mesh && "isMesh" in r && (this._mesh = r, this._material ? this._mesh.material = this._material : this._material = r.material);
    }), this.add(n);
  }
  SetMaterial(n) {
    this._material || (this._material = new po()), n.vertexColors !== void 0 && (this._material.vertexColors = n.vertexColors), n.color !== void 0 && this._material.color.set(n.color), n.map !== void 0 && (this._material.map = n.map), n.normalMap !== void 0 && (this._material.normalMap = n.normalMap), n.roughness !== void 0 && (this._material.roughness = n.roughness), n.roughnessMap !== void 0 && (this._material.roughnessMap = n.roughnessMap, this._material.roughnessMap && (this._material.roughness = 1)), n.metalness !== void 0 && (this._material.metalness = n.metalness), n.metalnessMap !== void 0 && (this._material.metalnessMap = n.metalnessMap, this._material.metalnessMap && (this._material.metalness = 1)), this._mesh && (this._mesh.material = this._material);
  }
  PlaceOnFloor() {
    var b, p, P, O, X;
    const n = this.getWorldPosition(this._positionWorldBuffer), r = n.clone();
    (p = (b = this._mesh) == null ? void 0 : b.geometry) == null || p.computeBoundingBox();
    const h = (O = (P = this._mesh) == null ? void 0 : P.geometry) == null ? void 0 : O.boundingBox;
    !h || !this._mesh || (n.y = n.y - this._mesh.localToWorld(h.min.clone()).y, n.y !== r.y && ((X = rt.get(this.userData.id)) == null || X.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: n,
        rotation: this.rotation,
        scale: this.scale
      }
    )));
  }
  DropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEModel: DropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const n = this._boundingBox.min.y * this.scale.y, r = this.localToWorld(
      this._boundingBox.getCenter(new D()).multiply(this.scale)
    );
    r.y = n + this.position.y;
    const h = new Wr(r, new D(0, -1, 0));
    h.layers.mask = xt;
    const b = h.intersectObjects(
      go(this).Root.children,
      !0
    );
    if (b.length > 0) {
      const p = b[0].object;
      p.geometry.computeBoundingBox();
      const P = p.geometry.boundingBox, O = p.localToWorld(P.max.clone()), X = this.position.clone(), ue = this.position.clone().setY(O.y).sub(new D(0, n, 0));
      if (this.position.copy(ue), this.position.y === X.y) return;
      this.onMove();
    }
  }
}
class j_ extends _o {
  constructor() {
    super();
    w(this, "isDIVEPrimitive", !0);
    w(this, "_mesh");
    this._mesh = new R(), this._mesh.layers.mask = xt, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new po(), this.add(this._mesh);
  }
  SetGeometry(n) {
    const r = this.assembleGeometry(n);
    r && (this._mesh.geometry = r, this._boundingBox.setFromObject(this._mesh));
  }
  SetMaterial(n) {
    const r = this._mesh.material;
    n.vertexColors !== void 0 && (r.vertexColors = n.vertexColors), n.color !== void 0 && (r.color = new Xt(n.color)), n.map !== void 0 && (r.map = n.map), n.normalMap !== void 0 && (r.normalMap = n.normalMap), n.roughness !== void 0 && (r.roughness = n.roughness), n.roughnessMap !== void 0 && (r.roughnessMap = n.roughnessMap, r.roughnessMap && (r.roughness = 1)), n.metalness !== void 0 && (r.metalness = n.metalness), n.metalnessMap !== void 0 && (r.metalnessMap = n.metalnessMap, r.metalnessMap && (r.metalness = 0)), this._mesh && (this._mesh.material = r);
  }
  PlaceOnFloor() {
    var b, p, P, O, X;
    const n = this.getWorldPosition(this._positionWorldBuffer), r = n.clone();
    (p = (b = this._mesh) == null ? void 0 : b.geometry) == null || p.computeBoundingBox();
    const h = (O = (P = this._mesh) == null ? void 0 : P.geometry) == null ? void 0 : O.boundingBox;
    !h || !this._mesh || (n.y = n.y - this._mesh.localToWorld(h.min.clone()).y, n.y !== r.y && ((X = rt.get(this.userData.id)) == null || X.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: n,
        rotation: this.rotation,
        scale: this.scale
      }
    )));
  }
  DropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEPrimitive: DropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const n = this._boundingBox.min.y * this.scale.y, r = this.localToWorld(
      this._boundingBox.getCenter(new D()).multiply(this.scale)
    );
    r.y = n + this.position.y;
    const h = new Wr(r, new D(0, -1, 0));
    h.layers.mask = xt;
    const b = h.intersectObjects(
      go(this).Root.children,
      !0
    );
    if (b.length > 0) {
      const p = b[0].object;
      p.geometry.computeBoundingBox();
      const P = p.geometry.boundingBox, O = p.localToWorld(P.max.clone()), X = this.position.clone(), ue = this.position.clone().setY(O.y).sub(new D(0, n, 0));
      if (this.position.copy(ue), this.position.y === X.y) return;
      this.onMove();
    }
  }
  assembleGeometry(n) {
    switch (this._mesh.material.flatShading = !1, n.name.toLowerCase()) {
      case "cylinder":
        return this.createCylinderGeometry(n);
      case "sphere":
        return this.createSphereGeometry(n);
      case "pyramid":
        return this._mesh.material.flatShading = !0, this.createPyramidGeometry(n);
      case "cube":
      case "box":
        return this.createBoxGeometry(n);
      case "cone":
        return this.createConeGeometry(n);
      case "wall":
        return this.createWallGeometry(n);
      case "plane":
        return this.createPlaneGeometry(n);
      default:
        return console.warn(
          "DIVEPrimitive.assembleGeometry: Invalid geometry type:",
          n.name.toLowerCase()
        ), null;
    }
  }
  createCylinderGeometry(n) {
    const r = new Fe(
      n.width / 2,
      n.width / 2,
      n.height,
      64
    );
    return r.translate(0, n.height / 2, 0), r;
  }
  createSphereGeometry(n) {
    return new co(n.width / 2, 256, 256);
  }
  createPyramidGeometry(n) {
    const r = new Float32Array([
      -n.width / 2,
      0,
      -n.depth / 2,
      // 0
      n.width / 2,
      0,
      -n.depth / 2,
      // 1
      n.width / 2,
      0,
      n.depth / 2,
      // 2
      -n.width / 2,
      0,
      n.depth / 2,
      // 3
      0,
      n.height,
      0
    ]), h = new Uint16Array([
      0,
      1,
      2,
      0,
      2,
      3,
      0,
      4,
      1,
      1,
      4,
      2,
      2,
      4,
      3,
      3,
      4,
      0
    ]), b = new Gr();
    return b.setAttribute(
      "position",
      new jl(r, 3)
    ), b.setIndex(new jl(h, 1)), b.computeVertexNormals(), b.computeBoundingBox(), b.computeBoundingSphere(), b;
  }
  createBoxGeometry(n) {
    const r = new xe(
      n.width,
      n.height,
      n.depth
    );
    return r.translate(0, n.height / 2, 0), r;
  }
  createConeGeometry(n) {
    const r = new n_(n.width / 2, n.height, 256);
    return r.translate(0, n.height / 2, 0), r;
  }
  createWallGeometry(n) {
    const r = new xe(
      n.width,
      n.height,
      n.depth || 0.05,
      16
    );
    return r.translate(0, n.height / 2, 0), r;
  }
  createPlaneGeometry(n) {
    const r = new xe(
      n.width,
      n.height,
      n.depth
    );
    return r.translate(0, n.height / 2, 0), r;
  }
}
class V_ extends _o {
  // lines to children
  constructor() {
    super();
    w(this, "isDIVEGroup", !0);
    w(this, "_members");
    w(this, "_lines");
    this.name = "DIVEGroup", this._members = [], this._lines = [];
  }
  // children objects
  get members() {
    return this._members;
  }
  SetPosition(n) {
    super.SetPosition(n), this._members.forEach((r) => {
      "isDIVENode" in r && r.onMove();
    });
  }
  SetLinesVisibility(n, r) {
    if (!r) {
      this._lines.forEach((b) => {
        b.visible = n;
      });
      return;
    }
    const h = this._members.indexOf(r);
    h !== -1 && (this._lines[h].visible = n);
  }
  attach(n) {
    if (this._members.includes(n))
      return this;
    const r = this.createLine();
    return this.add(r), this._lines.push(r), super.attach(n), this._members.push(n), this.updateLineTo(r, n), this.SetLinesVisibility(!0, n), this;
  }
  remove(n) {
    const r = this._members.indexOf(n);
    if (r === -1) return this;
    const h = this._lines[r];
    return super.remove(h), this._lines.splice(r, 1), super.remove(n), this._members.splice(r, 1), this;
  }
  UpdateLineTo(n) {
    const r = this._members.indexOf(n);
    r !== -1 && this.updateLineTo(this._lines[r], n);
  }
  /**
   * Adds a line to this grouo as last child.
   */
  createLine() {
    const n = new Gr(), r = new i_({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), h = new Yt(n, r);
    return h.visible = !1, h;
  }
  /**
   * Updates a line to the object.
   */
  updateLineTo(n, r) {
    n.geometry.setFromPoints([
      new D(0, 0, 0),
      r.position.clone()
    ]), n.computeLineDistances();
  }
  // public SetBoundingBoxVisibility(visible: boolean): void {
  //     this._boxMesh.visible = visible;
  // }
  // /**
  //  * Recalculates the position of the group based on it's bounding box.
  //  * Children's world positions are kept.
  //  */
  // private recalculatePosition(): void {
  //     // store all children's world positions
  //     const childrensWorldPositions: Vector3[] = this.children.map((child) => child.getWorldPosition(new Vector3()));
  //     // calculate new center and set it as the group's position
  //     const bbcenter = this.updateBB();
  //     this.position.copy(bbcenter);
  //     // set childrens's positions so their world positions are kept
  //     this.children.forEach((child, i) => {
  //         if (child.uuid === this._boxMesh.uuid) return;
  //         child.position.copy(this.worldToLocal(childrensWorldPositions[i]));
  //     });
  //     DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
  // }
  // /**
  //  * Updates the bounding box of the group.
  //  * @returns {Vector3} The new center of the bounding box.
  //  */
  // private updateBB(): Vector3 {
  //     this._boundingBox.makeEmpty();
  //     if (this.children.length === 1) {
  //         // because we always have the box mesh as 1 child
  //         return this.position.clone();
  //     }
  //     this.children.forEach((child) => {
  //         if (child.uuid === this._boxMesh.uuid) return;
  //         this._boundingBox.expandByObject(child);
  //     });
  //     return this._boundingBox.getCenter(new Vector3());
  // }
  // private updateBoxMesh(): void {
  //     if (this.children.length === 1) {
  //         // because we always have the box mesh as 1 child
  //         this._boxMesh.visible = false;
  //         return;
  //     }
  //     this._boxMesh.quaternion.copy(this.quaternion.clone().invert());
  //     this._boxMesh.scale.set(1 / this.scale.x, 1 / this.scale.y, 1 / this.scale.z);
  //     this._boxMesh.geometry = new BoxGeometry(this._boundingBox.max.x - this._boundingBox.min.x, this._boundingBox.max.y - this._boundingBox.min.y, this._boundingBox.max.z - this._boundingBox.min.z);
  //     this._boxMesh.visible = true;
  // }
}
class mo extends gt {
  constructor() {
    super();
    w(this, "isDIVERoot", !0);
    this.name = "Root";
  }
  ComputeSceneBB() {
    const n = new au();
    return this.traverse((r) => {
      "isObject3D" in r && n.expandByObject(r);
    }), n;
  }
  GetSceneObject(n) {
    let r;
    return this.traverse((h) => {
      r || h.userData.id === n.id && (r = h);
    }), r;
  }
  AddSceneObject(n) {
    switch (n.entityType) {
      case "pov":
        break;
      case "light": {
        this.updateLight(n);
        break;
      }
      case "model": {
        this.updateModel(n);
        break;
      }
      case "primitive": {
        this.updatePrimitive(n);
        break;
      }
      case "group": {
        this.updateGroup(n);
        break;
      }
      default:
        console.warn(
          `DIVERoot.AddSceneObject: Unknown entity type: ${n.entityType}`
        );
    }
  }
  UpdateSceneObject(n) {
    switch (n.entityType) {
      case "pov":
        break;
      case "light": {
        this.updateLight(n);
        break;
      }
      case "model": {
        this.updateModel(n);
        break;
      }
      case "primitive": {
        this.updatePrimitive(n);
        break;
      }
      case "group": {
        this.updateGroup(n);
        break;
      }
      default:
        console.warn(
          `DIVERoot.UpdateSceneObject: Unknown entity type: ${n.entityType}`
        );
    }
  }
  DeleteSceneObject(n) {
    switch (n.entityType) {
      case "pov":
        break;
      case "light": {
        this.deleteLight(n);
        break;
      }
      case "model": {
        this.deleteModel(n);
        break;
      }
      case "primitive": {
        this.deletePrimitive(n);
        break;
      }
      case "group": {
        this.deleteGroup(n);
        break;
      }
      default:
        console.warn(
          `DIVERoot.DeleteSceneObject: Unknown entity type: ${n.entityType}`
        );
    }
  }
  PlaceOnFloor(n) {
    switch (n.entityType) {
      case "pov":
      case "light":
        break;
      case "model":
      case "primitive": {
        this.placeOnFloor(n);
        break;
      }
      default:
        console.warn(
          `DIVERoot.PlaceOnFloor: Unknown entity type: ${n.entityType}`
        );
    }
  }
  updateLight(n) {
    let r = this.GetSceneObject(n);
    if (!r) {
      switch (n.type) {
        case "scene": {
          r = new N_();
          break;
        }
        case "ambient": {
          r = new F_();
          break;
        }
        case "point": {
          r = new W_();
          break;
        }
        default: {
          console.warn(
            `DIVERoot.updateLight: Unknown light type: ${n.type}`
          );
          return;
        }
      }
      r.userData.id = n.id, this.add(r);
    }
    n.name !== void 0 && n.name !== null && (r.name = n.name), n.position !== void 0 && n.position !== null && r.position.set(
      n.position.x,
      n.position.y,
      n.position.z
    ), n.intensity !== void 0 && n.intensity !== null && r.SetIntensity(
      n.intensity
    ), n.enabled !== void 0 && n.enabled !== null && r.SetEnabled(
      n.enabled
    ), n.color !== void 0 && n.color !== null && r.SetColor(
      new Xt(n.color)
    ), n.visible !== void 0 && n.visible !== null && (r.visible = n.visible), n.parentId !== void 0 && this.setParent({ ...n, parentId: n.parentId });
  }
  updateModel(n) {
    let r = this.GetSceneObject(n);
    r || (r = new Z_(), r.userData.id = n.id, r.userData.uri = n.uri, this.add(r)), n.uri !== void 0 && Ri.get("AssetLoader").then((h) => {
      h.load(n.uri).then((b) => {
        var p;
        r.SetModel(b), (p = rt.get(n.id)) == null || p.PerformAction(
          "MODEL_LOADED",
          { id: n.id }
        );
      });
    }), n.name !== void 0 && (r.name = n.name), n.position !== void 0 && r.SetPosition(n.position), n.rotation !== void 0 && r.SetRotation(n.rotation), n.scale !== void 0 && r.SetScale(n.scale), n.visible !== void 0 && r.SetVisibility(n.visible), n.material !== void 0 && r.SetMaterial(n.material), n.parentId !== void 0 && this.setParent({ ...n, parentId: n.parentId });
  }
  updatePrimitive(n) {
    let r = this.GetSceneObject(n);
    r || (r = new j_(), r.userData.id = n.id, this.add(r)), n.name !== void 0 && (r.name = n.name), n.geometry !== void 0 && r.SetGeometry(n.geometry), n.position !== void 0 && r.SetPosition(n.position), n.rotation !== void 0 && r.SetRotation(n.rotation), n.scale !== void 0 && r.SetScale(n.scale), n.visible !== void 0 && r.SetVisibility(n.visible), n.material !== void 0 && r.SetMaterial(n.material), n.parentId !== void 0 && this.setParent({ ...n, parentId: n.parentId });
  }
  updateGroup(n) {
    let r = this.GetSceneObject(n);
    r || (r = new V_(), r.userData.id = n.id, this.add(r)), n.name !== void 0 && (r.name = n.name), n.position !== void 0 && r.SetPosition(n.position), n.rotation !== void 0 && r.SetRotation(n.rotation), n.scale !== void 0 && r.SetScale(n.scale), n.visible !== void 0 && r.SetVisibility(n.visible), n.bbVisible !== void 0 && r.SetLinesVisibility(n.bbVisible), n.parentId !== void 0 && this.setParent({ ...n, parentId: n.parentId });
  }
  deleteLight(n) {
    const r = this.GetSceneObject(n);
    if (!r) {
      console.warn(
        `DIVERoot.deleteLight: Light with id ${n.id} not found`
      );
      return;
    }
    this.detachTransformControls(r), r.parent.remove(r);
  }
  deleteModel(n) {
    const r = this.GetSceneObject(n);
    if (!r) {
      console.warn(
        `DIVERoot.deleteModel: Model with id ${n.id} not found`
      );
      return;
    }
    this.detachTransformControls(r), r.parent.remove(r);
  }
  deletePrimitive(n) {
    const r = this.GetSceneObject(n);
    if (!r) {
      console.warn(
        `DIVERoot.deletePrimitive: Primitive with id ${n.id} not found`
      );
      return;
    }
    this.detachTransformControls(r), r.parent.remove(r);
  }
  deleteGroup(n) {
    const r = this.GetSceneObject(n);
    if (!r) {
      console.warn(
        `DIVERoot.deleteGroup: Group with id ${n.id} not found`
      );
      return;
    }
    this.detachTransformControls(r);
    for (let h = r.members.length - 1; h >= 0; h--)
      this.attach(r.members[h]);
    r.parent.remove(r);
  }
  placeOnFloor(n) {
    const r = this.GetSceneObject(n);
    r && r.PlaceOnFloor();
  }
  setParent(n) {
    const r = this.GetSceneObject(n);
    if (r)
      if (n.parentId !== null) {
        const h = this.GetSceneObject({
          id: n.parentId
        });
        if (!h) return;
        h.attach(r);
      } else
        this.attach(r);
  }
  detachTransformControls(n) {
    this.findScene(n).children.find((r) => {
      "isTransformControls" in r && r.detach();
    });
  }
  findScene(n) {
    return n.parent !== null ? this.findScene(n.parent) : n;
  }
}
const q_ = "#888888", Q_ = "#dddddd";
class K_ extends gt {
  constructor() {
    super(), this.name = "Grid";
    const a = new r_(
      100,
      100,
      q_,
      Q_
    );
    a.material.depthTest = !1, a.layers.mask = f_, this.add(a);
  }
  SetVisibility(a) {
    this.visible = a;
  }
}
class $_ extends R {
  constructor() {
    super(
      new fo(1e4, 1e4),
      new po({
        color: new Xt(150 / 255, 150 / 255, 150 / 255)
      })
    );
    w(this, "isFloor", !0);
    this.name = "Floor", this.layers.mask = xt, this.receiveShadow = !0, this.rotateX(-Math.PI / 2);
  }
  SetVisibility(n) {
    this.visible = n;
  }
  SetColor(n) {
    this.material.color = new Xt(n);
  }
}
class J_ {
  constructor(a, n, r, h, b) {
    this.xrLight = a, this.renderer = n, this.lightProbe = r, this.xrWebGLBinding = null, this.estimationStartCallback = b, this.frameCallback = this.onXRFrame.bind(this);
    const p = n.xr.getSession();
    if (h && "XRWebGLBinding" in window) {
      const P = new a_(16);
      a.environment = P.texture;
      const O = n.getContext();
      switch (p.preferredReflectionFormat) {
        case "srgba8":
          O.getExtension("EXT_sRGB");
          break;
        case "rgba16f":
          O.getExtension("OES_texture_half_float");
          break;
      }
      this.xrWebGLBinding = new XRWebGLBinding(p, O), this.lightProbe.addEventListener("reflectionchange", () => {
        this.updateReflection();
      });
    }
    p.requestAnimationFrame(this.frameCallback);
  }
  updateReflection() {
    const a = this.renderer.properties.get(this.xrLight.environment);
    if (a) {
      const n = this.xrWebGLBinding.getReflectionCubeMap(this.lightProbe);
      n && (a.__webglTexture = n, this.xrLight.environment.needsPMREMUpdate = !0);
    }
  }
  onXRFrame(a, n) {
    if (!this.xrLight)
      return;
    n.session.requestAnimationFrame(this.frameCallback);
    const h = n.getLightEstimate(this.lightProbe);
    if (h) {
      this.xrLight.lightProbe.sh.fromArray(h.sphericalHarmonicsCoefficients), this.xrLight.lightProbe.intensity = 1;
      const b = Math.max(
        1,
        Math.max(
          h.primaryLightIntensity.x,
          Math.max(
            h.primaryLightIntensity.y,
            h.primaryLightIntensity.z
          )
        )
      );
      this.xrLight.directionalLight.color.setRGB(
        h.primaryLightIntensity.x / b,
        h.primaryLightIntensity.y / b,
        h.primaryLightIntensity.z / b
      ), this.xrLight.directionalLight.intensity = b, this.xrLight.directionalLight.position.copy(h.primaryLightDirection), this.estimationStartCallback && (this.estimationStartCallback(), this.estimationStartCallback = null);
    }
  }
  dispose() {
    this.xrLight = null, this.renderer = null, this.lightProbe = null, this.xrWebGLBinding = null;
  }
}
class em extends s_ {
  constructor(a, n = !0) {
    super(), this.lightProbe = new o_(), this.lightProbe.intensity = 0, this.add(this.lightProbe), this.directionalLight = new ou(), this.directionalLight.intensity = 0, this.add(this.directionalLight), this.environment = null;
    let r = null, h = !1;
    a.xr.addEventListener("sessionstart", () => {
      const b = a.xr.getSession();
      "requestLightProbe" in b && b.requestLightProbe({
        reflectionFormat: b.preferredReflectionFormat
      }).then((p) => {
        r = new J_(this, a, p, n, () => {
          h = !0, this.dispatchEvent({ type: "estimationstart" });
        });
      });
    }), a.xr.addEventListener("sessionend", () => {
      r && (r.dispose(), r = null), h && this.dispatchEvent({ type: "estimationend" });
    }), this.dispose = () => {
      r && (r.dispose(), r = null), this.remove(this.lightProbe), this.lightProbe = null, this.remove(this.directionalLight), this.directionalLight = null, this.environment = null;
    };
  }
}
class tm extends gt {
  constructor(n) {
    super();
    w(this, "_scene");
    w(this, "_xrLight");
    w(this, "_lightRoot");
    this.name = "XRLightRoot", this._scene = n, this._xrLight = null, this._lightRoot = new mo(), this._lightRoot.UpdateSceneObject({
      id: "XRSceneLight",
      entityType: "light",
      name: "XRSceneLight",
      type: "scene",
      color: 16777215,
      intensity: 1,
      enabled: !0,
      visible: !0
    }), this.add(this._lightRoot);
  }
  InitLightEstimation(n) {
    this._xrLight || (this._xrLight = new em(n, !0), this._xrLight.layers.mask = xt, this.add(this._xrLight)), this._xrLight.addEventListener("estimationstart", () => {
      this.onEstimationStart();
    }), this._xrLight.addEventListener("estimationend", () => {
      this.onEstimationEnd();
    });
  }
  DisposeLightEstimation() {
    this._xrLight && (this._xrLight.removeEventListener("estimationstart", () => {
      this.onEstimationStart();
    }), this._xrLight.removeEventListener("estimationend", () => {
      this.onEstimationEnd();
    }));
  }
  onEstimationStart() {
    this._lightRoot.visible = !1, this._xrLight && this._xrLight.environment && (this._scene.environment = this._xrLight.environment);
  }
  onEstimationEnd() {
    this._lightRoot.visible = !0, this._scene.environment = null, this._xrLight;
  }
}
class nm extends gt {
  constructor(n) {
    super();
    w(this, "_xrLightRoot");
    w(this, "_xrModelRoot");
    w(this, "_xrHandNode");
    w(this, "_xrShadowPlane");
    this.name = "XRRoot", this._xrModelRoot = new mo(), this._xrModelRoot.name = "XRModelRoot", this.add(this._xrModelRoot), this._xrShadowPlane = new R(
      new fo(100, 100),
      new l_({ opacity: 1, transparent: !0 })
    ), this._xrModelRoot.add(this._xrShadowPlane), this._xrLightRoot = new tm(n), this._xrLightRoot.name = "XRLightRoot", this.add(this._xrLightRoot), this._xrHandNode = new gt(), this._xrHandNode.name = "XRHandNode", this.add(this._xrHandNode);
  }
  get XRModelRoot() {
    return this._xrModelRoot;
  }
  get XRLightRoot() {
    return this._xrLightRoot;
  }
  get XRHandNode() {
    return this._xrHandNode;
  }
  InitLightEstimation(n) {
    this._xrLightRoot.InitLightEstimation(n);
  }
  DisposeLightEstimation() {
    this._xrLightRoot.DisposeLightEstimation();
  }
}
class im extends u_ {
  constructor() {
    super();
    w(this, "_root");
    w(this, "_floor");
    w(this, "_grid");
    w(this, "_xrRoot");
    this.background = new Xt(16777215), this._root = new mo(), this.add(this._root), this._floor = new $_(), this.add(this._floor), this._grid = new K_(), this.add(this._grid), this._xrRoot = new nm(this), this._xrRoot.visible = !1, this.add(this._xrRoot);
  }
  get Root() {
    return this._root;
  }
  get XRRoot() {
    return this._xrRoot;
  }
  get Floor() {
    return this._floor;
  }
  get Grid() {
    return this._grid;
  }
  InitXR(n) {
    this._root.visible = !1, this._xrRoot.visible = !0, this._xrRoot.InitLightEstimation(n);
  }
  DisposeXR() {
    this._root.visible = !0, this._xrRoot.visible = !1, this._xrRoot.DisposeLightEstimation();
  }
  SetBackground(n) {
    this.background = new Xt(n);
  }
  ComputeSceneBB() {
    return this.Root.ComputeSceneBB();
  }
  GetSceneObject(n) {
    return this.Root.GetSceneObject(n);
  }
  AddSceneObject(n) {
    this.Root.AddSceneObject(n);
  }
  UpdateSceneObject(n) {
    this.Root.UpdateSceneObject(n);
  }
  DeleteSceneObject(n) {
    this.Root.DeleteSceneObject(n);
  }
  PlaceOnFloor(n) {
    this.Root.PlaceOnFloor(n);
  }
}
const du = {
  autoResize: !0,
  autoStart: !0,
  displayAxes: !1,
  renderer: Rn,
  perspectiveCamera: d_
};
class rm {
  constructor(a) {
    // vital component members
    w(this, "_renderer");
    w(this, "_scene");
    w(this, "_perspectiveCamera");
    // descriptive members
    w(this, "_settings");
    w(this, "_resizeObserverId", "");
    w(this, "_width", 0);
    w(this, "_height", 0);
    this._settings = {
      ...du,
      ...a ?? {}
    }, this._renderer = new U_(this._settings.renderer), this._scene = new im(), this._perspectiveCamera = new p_(
      this._settings.perspectiveCamera
    ), this._settings.autoResize && this._addResizeObserver(), this._settings.autoStart && this.renderer.StartRenderer(this.scene, this.perspectiveCamera);
  }
  get renderer() {
    return this._renderer;
  }
  get scene() {
    return this._scene;
  }
  get perspectiveCamera() {
    return this._perspectiveCamera;
  }
  /**
   * Disposes the engine.
   * @internal
   */
  dispose() {
    this._removeResizeObserver(), this._renderer.dispose();
  }
  onResize(a, n) {
    this.renderer.OnResize(a, n), this.perspectiveCamera.OnResize(a, n);
  }
  _addResizeObserver() {
    this._resizeObserverId = this.renderer.AddPreRenderCallback(() => {
      const a = this.renderer.domElement.parentElement;
      if (!a) return;
      const { clientWidth: n, clientHeight: r } = a;
      n === this._width && r === this._height || (this.onResize(n, r), this._width = n, this._height = r);
    });
  }
  _removeResizeObserver() {
    this.renderer.RemovePreRenderCallback(this._resizeObserverId);
  }
}
function Dt(x, a) {
  const n = (x + "e").split("e");
  return +(n[0] + "e" + (+n[1] + (a || 0)));
}
function sm(x, a = 0) {
  const n = Dt(x, +a);
  return Dt(Math.ceil(n), -a);
}
function om(x, a = 0) {
  const n = Dt(x, +a);
  return Dt(Math.floor(n), -a);
}
function pu(x, a = 0) {
  if (x < 0) return -pu(-x, a);
  const n = Dt(x, +a);
  return Dt(Math.round(n), -a);
}
function am(x, a, n) {
  return Math.atan2(
    x.clone().cross(a).dot(n),
    a.clone().dot(x)
  );
}
function lm(x, a = 0) {
  const n = Dt(x, +a);
  return Dt(Math.round(n), -a).toFixed(a);
}
function um(x, a = 0) {
  const n = Dt(x, +a);
  return Dt(Math.trunc(n), -a);
}
function cm(x) {
  return (Zt.radToDeg(x) + 360) % 360;
}
function hm(x) {
  return Zt.degToRad(x);
}
const vm = {
  ceilExp: sm,
  floorExp: om,
  roundExp: pu,
  toFixedExp: lm,
  truncateExp: um,
  signedAngleTo: am,
  radToDeg: cm,
  degToRad: hm
}, fm = {
  ...du,
  orbitControls: kr
};
class gu {
  constructor(a) {
    // descriptive members
    w(this, "_settings");
    w(this, "_engine");
    w(this, "orbitControls");
    w(this, "toolbox");
    w(this, "_communication");
    // additional components
    w(this, "animationSystem");
    w(this, "axisCamera");
    this._settings = {
      ...fm,
      ...a ?? {}
    }, this._engine = new rm(a), this.animationSystem = new k_(this._engine.renderer), this.orbitControls = new ro(
      this._engine.perspectiveCamera,
      this._engine.renderer,
      this.animationSystem,
      this._settings.orbitControls
    ), this.toolbox = new fu(this._engine.scene, this.orbitControls), this._communication = new rt(
      this._engine.renderer,
      this._engine.scene,
      this.orbitControls,
      this.toolbox
    ), this._settings.displayAxes ? this.axisCamera = new B_(
      this._engine.renderer,
      this._engine.scene,
      this.orbitControls
    ) : this.axisCamera = null, window.DIVE = {
      PrintScene: () => this._engine.scene
    }, console.log(`DIVE ${G_.version} initialized successfully!`), console.log(`
                    @@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@@@@@@@
               @@@@+-:::::::---------------------==------------------------------=#@@@@
            @@%=::::.......::---------------------------------------------------------+@@
          @@+:::...........::-----------------------------------------------------------#@@
        @@=:::.........::::::-------------------------------------------------------------%@
       @%:::.......:::::::-----------------------------------------------------------------#@
      @*:::.....:::::-----------------------------------------------------------------------*@
     @%::::::.::::---------------------------------------------------------------------------@@
    @@-:::::::::-----------------------------------------------------------------------------=@
    @%::::::::--------------------------------------------------------------------------------%@
    @+::::::::--------------------------------=@@@@@%-----------------------------------------%@
    @=:::::::--------------------------------*@@    @@+---------------------------------------#@
    @+:::::::-------------------------------*@        @*--------------------------------------%@
    @#::::::::-----------------------------=@@        @@=-------------------------------------%@
    @@-::::::::----------------------------@@          @@------------------------------------=@
     @%:::::::::--------------------------*@            @*-----------------------------------@@
      @*:::::::::-------------------------@@            @@----------------------------------%@
       @#::::::::::----------------------%@              @%--------------------------------%@
        @#:::::::::::-------------------=@@              @@=------------------------------%@
         @@-::::::::::::----------------%@                @%----------------------------=@@
          @@#::::::::::::::------------*@                  @*--------------------------#@@
            @@+::::::::::::::::--------@@                  @@------------------------+@@
              @@*:::::::::::::::::----@@                    @@---------------------+@@
                @@@-:::::::::::::::--#@                      @#-----------------=%@@
                   @@%-::::::::::::-%@                        @%-------------=%@@
                      @@@@+:::::::#@@                          @@*-------*@@@@
                           @@@@@@@                                @@@@@@

        `);
  }
  // static members
  static async QuickView(a, n) {
    return new Promise((r) => {
      const h = new gu(n);
      h._communication.PerformAction("UPDATE_SCENE", {
        backgroundColor: 16777215,
        gridEnabled: !1,
        floorColor: 16777215
      }), h._communication.PerformAction("SET_CAMERA_TRANSFORM", {
        position: { x: 0, y: 2, z: 2 },
        target: { x: 0, y: 0.5, z: 0 }
      });
      const b = Zt.generateUUID();
      h._communication.PerformAction("ADD_OBJECT", {
        entityType: "light",
        type: "scene",
        name: "light",
        id: b,
        enabled: !0,
        visible: !0,
        intensity: 1,
        color: 16777215
      });
      const p = Zt.generateUUID();
      h._communication.Subscribe("MODEL_LOADED", (P) => {
        if (P.id !== p) return;
        const O = h._communication.PerformAction(
          "COMPUTE_ENCOMPASSING_VIEW",
          {}
        );
        h._communication.PerformAction("SET_CAMERA_TRANSFORM", {
          position: O.position,
          target: O.target
        }), window.DIVE.instances || (window.DIVE.instances = []), window.DIVE.instances.push(h), r(h);
      }), h._communication.PerformAction("ADD_OBJECT", {
        entityType: "model",
        name: "object",
        id: p,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        uri: a,
        visible: !0,
        loaded: !1
      });
    });
  }
  get engine() {
    return this._engine;
  }
  // getters
  get communication() {
    return this._communication;
  }
  get canvas() {
    return this._engine.renderer.domElement;
  }
  Dispose() {
    var a;
    this.orbitControls.Dispose(), (a = this.axisCamera) == null || a.Dispose(), this.animationSystem.Dispose(), this.toolbox.Dispose(), this._communication.DestroyInstance();
  }
}
export {
  Lm as ARCompatibilityError,
  gu as DIVE,
  rt as DIVECommunication,
  fm as DIVEDefaultSettings,
  vm as DiveMath,
  Rm as ESystem,
  Im as EWebXRUnsupportedReason,
  ym as FILE_TYPES,
  Am as FileTypeError,
  Em as NetworkError,
  Pm as ParseError,
  xm as SUPPORTED_FILE_TYPES,
  gu as default
};
//# sourceMappingURL=index.mjs.map
