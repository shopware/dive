var B0 = Object.defineProperty;
var z0 = (S, a, i) => a in S ? B0(S, a, { enumerable: !0, configurable: !0, writable: !0, value: i }) : S[a] = i;
var w = (S, a, i) => z0(S, typeof a != "symbol" ? a + "" : a, i);
import { Ray as G0, Plane as U0, MathUtils as Zt, EventDispatcher as F0, Vector3 as D, MOUSE as $n, TOUCH as Jn, Spherical as Hl, Quaternion as pt, Vector2 as je, Raycaster as Fr, Object3D as gt, MeshBasicMaterial as ao, LineBasicMaterial as W0, CylinderGeometry as Fe, BoxGeometry as xe, BufferGeometry as Gr, Float32BufferAttribute as Yl, Mesh as L, OctahedronGeometry as Tr, Line as Yt, TorusGeometry as Ei, SphereGeometry as lo, Euler as N0, Matrix4 as uo, PlaneGeometry as co, DoubleSide as H0, OrthographicCamera as Y0, AxesHelper as X0, Color as Xt, Vector4 as Z0, NoToneMapping as j0, PCFSoftShadowMap as V0, WebGLRenderer as q0, AmbientLight as Q0, PointLight as K0, FrontSide as $0, HemisphereLight as J0, DirectionalLight as ru, Box3 as su, MeshStandardMaterial as ho, BufferAttribute as Xl, ConeGeometry as e_, LineDashedMaterial as t_, GridHelper as n_, Group as i_, LightProbe as r_, WebGLCubeRenderTarget as s_, ShadowMaterial as o_, Scene as a_ } from "three";
import { Easing as Rr, update as l_, Tween as u_ } from "@tweenjs/tween.js";
import { P as xt, U as ou, C as xi, H as c_, D as h_, a as f_ } from "./chunks/PerspectiveCamera-ACx6umAu.mjs";
import { ModuleRegistry as Cr } from "./src/modules/index.mjs";
import Js from "three-spritetext";
import { F as mm, N as bm, S as vm } from "./chunks/network-error-DgecatEk.mjs";
import { F as ym, P as Em } from "./chunks/file-type-error-D6aWGgyc.mjs";
import { A as Sm, E as Pm, a as Am } from "./chunks/index-C7Wx_9uY.mjs";
const Zl = { type: "change" }, eo = { type: "start" }, jl = { type: "end" }, Lr = new G0(), Vl = new U0(), d_ = Math.cos(70 * Zt.DEG2RAD);
class p_ extends F0 {
  constructor(a, i) {
    super(), this.object = a, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new D(), this.cursor = new D(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: $n.ROTATE, MIDDLE: $n.DOLLY, RIGHT: $n.PAN }, this.touches = { ONE: Jn.ROTATE, TWO: Jn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return A.phi;
    }, this.getAzimuthalAngle = function() {
      return A.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(d) {
      d.addEventListener("keydown", St), this._domElementKeyEvents = d;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", St), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      r.target0.copy(r.target), r.position0.copy(r.object.position), r.zoom0 = r.object.zoom;
    }, this.reset = function() {
      r.target.copy(r.target0), r.object.position.copy(r.position0), r.object.zoom = r.zoom0, r.object.updateProjectionMatrix(), r.dispatchEvent(Zl), r.update(), b = h.NONE;
    }, this.update = function() {
      const d = new D(), T = new pt().setFromUnitVectors(a.up, new D(0, 1, 0)), W = T.clone().invert(), Q = new D(), ye = new pt(), At = new D(), Ne = 2 * Math.PI;
      return function(Nr = null) {
        const oi = r.object.position;
        d.copy(oi).sub(r.target), d.applyQuaternion(T), A.setFromVector3(d), r.autoRotate && b === h.NONE && Mt(ti(Nr)), r.enableDamping ? (A.theta += M.theta * r.dampingFactor, A.phi += M.phi * r.dampingFactor) : (A.theta += M.theta, A.phi += M.phi);
        let mt = r.minAzimuthAngle, bt = r.maxAzimuthAngle;
        isFinite(mt) && isFinite(bt) && (mt < -Math.PI ? mt += Ne : mt > Math.PI && (mt -= Ne), bt < -Math.PI ? bt += Ne : bt > Math.PI && (bt -= Ne), mt <= bt ? A.theta = Math.max(mt, Math.min(bt, A.theta)) : A.theta = A.theta > (mt + bt) / 2 ? Math.max(mt, A.theta) : Math.min(bt, A.theta)), A.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, A.phi)), A.makeSafe(), r.enableDamping === !0 ? r.target.addScaledVector(ue, r.dampingFactor) : r.target.add(ue), r.target.sub(r.cursor), r.target.clampLength(r.minTargetRadius, r.maxTargetRadius), r.target.add(r.cursor);
        let _n = !1;
        if (r.zoomToCursor && st || r.object.isOrthographicCamera)
          A.radius = Qe(A.radius);
        else {
          const Ke = A.radius;
          A.radius = Qe(A.radius * X), _n = Ke != A.radius;
        }
        if (d.setFromSpherical(A), d.applyQuaternion(W), oi.copy(r.target).add(d), r.object.lookAt(r.target), r.enableDamping === !0 ? (M.theta *= 1 - r.dampingFactor, M.phi *= 1 - r.dampingFactor, ue.multiplyScalar(1 - r.dampingFactor)) : (M.set(0, 0, 0), ue.set(0, 0, 0)), r.zoomToCursor && st) {
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
            const Gi = new D(te.x, te.y, 0);
            Gi.unproject(r.object), r.object.position.sub(Gi).add(mn), r.object.updateMatrixWorld(), Ke = d.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), r.zoomToCursor = !1;
          Ke !== null && (this.screenSpacePanning ? r.target.set(0, 0, -1).transformDirection(r.object.matrix).multiplyScalar(Ke).add(r.object.position) : (Lr.origin.copy(r.object.position), Lr.direction.set(0, 0, -1).transformDirection(r.object.matrix), Math.abs(r.object.up.dot(Lr.direction)) < d_ ? a.lookAt(r.target) : (Vl.setFromNormalAndCoplanarPoint(r.object.up, r.target), Lr.intersectPlane(Vl, r.target))));
        } else if (r.object.isOrthographicCamera) {
          const Ke = r.object.zoom;
          r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / X)), Ke !== r.object.zoom && (r.object.updateProjectionMatrix(), _n = !0);
        }
        return X = 1, st = !1, _n || Q.distanceToSquared(r.object.position) > p || 8 * (1 - ye.dot(r.object.quaternion)) > p || At.distanceToSquared(r.target) > p ? (r.dispatchEvent(Zl), Q.copy(r.object.position), ye.copy(r.object.quaternion), At.copy(r.target), !0) : !1;
      };
    }(), this.dispose = function() {
      r.domElement.removeEventListener("contextmenu", Bn), r.domElement.removeEventListener("pointerdown", Ci), r.domElement.removeEventListener("pointercancel", Pe), r.domElement.removeEventListener("wheel", ki), r.domElement.removeEventListener("pointermove", Ct), r.domElement.removeEventListener("pointerup", Pe), r.domElement.getRootNode().removeEventListener("keydown", Bi, { capture: !0 }), r._domElementKeyEvents !== null && (r._domElementKeyEvents.removeEventListener("keydown", St), r._domElementKeyEvents = null);
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
    const p = 1e-6, A = new Hl(), M = new Hl();
    let X = 1;
    const ue = new D(), ce = new je(), Re = new je(), Le = new je(), me = new je(), he = new je(), $ = new je(), se = new je(), ie = new je(), V = new je(), ke = new D(), te = new je();
    let st = !1;
    const q = [], Ve = {};
    let Ot = !1;
    function ti(d) {
      return d !== null ? 2 * Math.PI / 60 * r.autoRotateSpeed * d : 2 * Math.PI / 60 / 60 * r.autoRotateSpeed;
    }
    function jt(d) {
      const T = Math.abs(d * 0.01);
      return Math.pow(0.95, r.zoomSpeed * T);
    }
    function Mt(d) {
      M.theta -= d;
    }
    function Vt(d) {
      M.phi -= d;
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
          const At = r.object.position;
          d.copy(At).sub(r.target);
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
      const W = r.domElement.getBoundingClientRect(), Q = d - W.left, ye = T - W.top, At = W.width, Ne = W.height;
      te.x = Q / At * 2 - 1, te.y = -(ye / Ne) * 2 + 1, ke.set(te.x, te.y, 1).unproject(r.object).sub(r.object.position).normalize();
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
      Re.set(d.clientX, d.clientY), Le.subVectors(Re, ce).multiplyScalar(r.rotateSpeed);
      const T = r.domElement;
      Mt(2 * Math.PI * Le.x / T.clientHeight), Vt(2 * Math.PI * Le.y / T.clientHeight), ce.copy(Re), r.update();
    }
    function Qt(d) {
      ie.set(d.clientX, d.clientY), V.subVectors(ie, se), V.y > 0 ? ge(jt(V.y)) : V.y < 0 && Ie(jt(V.y)), se.copy(ie), r.update();
    }
    function On(d) {
      he.set(d.clientX, d.clientY), $.subVectors(he, me).multiplyScalar(r.panSpeed), qe($.x, $.y), me.copy(he), r.update();
    }
    function Wr(d) {
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
          d.ctrlKey || d.metaKey || d.shiftKey ? Mt(2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : qe(r.keyPanSpeed, 0), T = !0;
          break;
        case r.keys.RIGHT:
          d.ctrlKey || d.metaKey || d.shiftKey ? Mt(-2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : qe(-r.keyPanSpeed, 0), T = !0;
          break;
      }
      T && (d.preventDefault(), r.update());
    }
    function Kt(d) {
      if (q.length === 1)
        ce.set(d.pageX, d.pageY);
      else {
        const T = Pt(d), W = 0.5 * (d.pageX + T.x), Q = 0.5 * (d.pageY + T.y);
        ce.set(W, Q);
      }
    }
    function Ii(d) {
      if (q.length === 1)
        me.set(d.pageX, d.pageY);
      else {
        const T = Pt(d), W = 0.5 * (d.pageX + T.x), Q = 0.5 * (d.pageY + T.y);
        me.set(W, Q);
      }
    }
    function dn(d) {
      const T = Pt(d), W = d.pageX - T.x, Q = d.pageY - T.y, ye = Math.sqrt(W * W + Q * Q);
      se.set(0, ye);
    }
    function Mn(d) {
      r.enableZoom && dn(d), r.enablePan && Ii(d);
    }
    function Di(d) {
      r.enableZoom && dn(d), r.enableRotate && Kt(d);
    }
    function We(d) {
      if (q.length == 1)
        Re.set(d.pageX, d.pageY);
      else {
        const W = Pt(d), Q = 0.5 * (d.pageX + W.x), ye = 0.5 * (d.pageY + W.y);
        Re.set(Q, ye);
      }
      Le.subVectors(Re, ce).multiplyScalar(r.rotateSpeed);
      const T = r.domElement;
      Mt(2 * Math.PI * Le.x / T.clientHeight), Vt(2 * Math.PI * Le.y / T.clientHeight), ce.copy(Re);
    }
    function $t(d) {
      if (q.length === 1)
        he.set(d.pageX, d.pageY);
      else {
        const T = Pt(d), W = 0.5 * (d.pageX + T.x), Q = 0.5 * (d.pageY + T.y);
        he.set(W, Q);
      }
      $.subVectors(he, me).multiplyScalar(r.panSpeed), qe($.x, $.y), me.copy(he);
    }
    function Oi(d) {
      const T = Pt(d), W = d.pageX - T.x, Q = d.pageY - T.y, ye = Math.sqrt(W * W + Q * Q);
      ie.set(0, ye), V.set(0, Math.pow(ie.y / se.y, r.zoomSpeed)), ge(V.y), se.copy(ie);
      const At = (d.pageX + T.x) * 0.5, Ne = (d.pageY + T.y) * 0.5;
      _e(At, Ne);
    }
    function _t(d) {
      r.enableZoom && Oi(d), r.enablePan && $t(d);
    }
    function Mi(d) {
      r.enableZoom && Oi(d), r.enableRotate && We(d);
    }
    function Ci(d) {
      r.enabled !== !1 && (q.length === 0 && (r.domElement.setPointerCapture(d.pointerId), r.domElement.addEventListener("pointermove", Ct), r.domElement.addEventListener("pointerup", Pe)), !si(d) && (ii(d), d.pointerType === "touch" ? kn(d) : pn(d)));
    }
    function Ct(d) {
      r.enabled !== !1 && (d.pointerType === "touch" ? ni(d) : Cn(d));
    }
    function Pe(d) {
      switch (ri(d), q.length) {
        case 0:
          r.domElement.releasePointerCapture(d.pointerId), r.domElement.removeEventListener("pointermove", Ct), r.domElement.removeEventListener("pointerup", Pe), r.dispatchEvent(jl), b = h.NONE;
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
      b !== h.NONE && r.dispatchEvent(eo);
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
          On(d);
          break;
      }
    }
    function ki(d) {
      r.enabled === !1 || r.enableZoom === !1 || b !== h.NONE || (d.preventDefault(), r.dispatchEvent(eo), Wr(gn(d)), r.dispatchEvent(jl));
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
      return d.ctrlKey && !Ot && (W.deltaY *= 10), W;
    }
    function Bi(d) {
      d.key === "Control" && (Ot = !0, r.domElement.getRootNode().addEventListener("keyup", Jt, { passive: !0, capture: !0 }));
    }
    function Jt(d) {
      d.key === "Control" && (Ot = !1, r.domElement.getRootNode().removeEventListener("keyup", Jt, { passive: !0, capture: !0 }));
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
              Ii(d), b = h.TOUCH_PAN;
              break;
            default:
              b = h.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case Jn.DOLLY_PAN:
              if (r.enableZoom === !1 && r.enablePan === !1) return;
              Mn(d), b = h.TOUCH_DOLLY_PAN;
              break;
            case Jn.DOLLY_ROTATE:
              if (r.enableZoom === !1 && r.enableRotate === !1) return;
              Di(d), b = h.TOUCH_DOLLY_ROTATE;
              break;
            default:
              b = h.NONE;
          }
          break;
        default:
          b = h.NONE;
      }
      b !== h.NONE && r.dispatchEvent(eo);
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
          Mi(d), r.update();
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
    function Pt(d) {
      const T = d.pointerId === q[0] ? q[1] : q[0];
      return Ve[T];
    }
    r.domElement.addEventListener("contextmenu", Bn), r.domElement.addEventListener("pointerdown", Ci), r.domElement.addEventListener("pointercancel", Pe), r.domElement.addEventListener("wheel", ki, { passive: !1 }), r.domElement.getRootNode().addEventListener("keydown", Bi, { passive: !0, capture: !0 }), this.update();
  }
}
const kr = {
  enableDamping: !0,
  dampingFactor: 0.04
}, Li = class Li extends p_ {
  constructor(i, r, h, b = kr) {
    super(i, r.domElement);
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
    this._animationSystem = h, this.domElement = r.domElement, this.object = i;
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
  ComputeEncompassingView(i) {
    const r = i.getCenter(new D()), h = i.getSize(new D()), b = Math.max(h.x, h.y, h.z) * 1.25;
    return {
      position: this.object.position.clone().normalize().multiplyScalar(b),
      target: r
    };
  }
  ZoomIn(i) {
    const r = i || Li.DEFAULT_ZOOM_FACTOR, { minDistance: h, maxDistance: b } = this;
    this.minDistance = this.maxDistance = Zt.clamp(
      this.getDistance() - r,
      h + r,
      b - r
    ), this.update(), this.minDistance = h, this.maxDistance = b;
  }
  ZoomOut(i) {
    const r = i || Li.DEFAULT_ZOOM_FACTOR, { minDistance: h, maxDistance: b } = this;
    this.minDistance = this.maxDistance = Zt.clamp(
      this.getDistance() + r,
      h + r,
      b - r
    ), this.update(), this.minDistance = h, this.maxDistance = b;
  }
  MoveTo(i, r, h, b) {
    if (this.animating) return;
    const p = i || this.object.position.clone(), A = r || this.target.clone();
    this.stopRevertLast(), this.locked || (this.last = {
      pos: this.object.position.clone(),
      target: this.target.clone()
    }), this.animating = h > 0, this.locked = b, this.enabled = !1;
    const M = this._animationSystem.Animate(this.object.position).to(p, h).easing(Rr.Quadratic.Out).start(), X = this._animationSystem.Animate(this.target).to(A, h).easing(Rr.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = !1, this.enabled = !b;
    }).start();
    this.stopMoveTo = () => {
      M.stop(), X.stop();
    };
  }
  RevertLast(i) {
    if (this.animating || !this.locked) return;
    this.stopMoveTo(), this.animating = i > 0, this.enabled = !1;
    const { pos: r, target: h } = this.last, b = this._animationSystem.Animate(this.object.position).to(r, i).easing(Rr.Quadratic.Out).start(), p = this._animationSystem.Animate(this.target).to(h, i).easing(Rr.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = !1, this.locked = !1, this.enabled = !0;
    }).start();
    this.stopRevertLast = () => {
      b.stop(), p.stop();
    };
  }
};
w(Li, "DEFAULT_ZOOM_FACTOR", 1);
let io = Li;
function Br(S, a) {
  return S ? a in S : !1;
}
function Ur(S, a) {
  if (S)
    return Br(S, a) ? S : Ur(S.parent, a);
}
class g_ {
  constructor(a, i) {
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
    this.name = "BaseTool", this._canvas = i.domElement, this._scene = a, this._controller = i, this._pointer = new je(), this._pointerPrimaryDown = !1, this._pointerMiddleDown = !1, this._pointerSecondaryDown = !1, this._lastPointerDown = new je(), this._lastPointerUp = new je(), this._raycaster = new Fr(), this._raycaster.layers.mask = xt | ou, this._intersects = [], this._hovered = null, this._dragging = !1, this._dragStart = new D(), this._dragCurrent = new D(), this._dragEnd = new D(), this._dragDelta = new D(), this._draggable = null, this._dragRaycastOnObjects = null;
  }
  get _pointerAnyDown() {
    return this._pointerPrimaryDown || this._pointerMiddleDown || this._pointerSecondaryDown;
  }
  Activate() {
  }
  Deactivate() {
  }
  onPointerDown(a) {
    var i;
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
      (i = this._intersects[0]) == null ? void 0 : i.object,
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
    const i = Ur(
      (r = this._intersects[0]) == null ? void 0 : r.object,
      "isHoverable"
    );
    if (this._intersects[0] && i) {
      if (!this._hovered) {
        i.onPointerEnter && i.onPointerEnter(this._intersects[0]), this._hovered = i;
        return;
      }
      if (this._hovered.uuid !== i.uuid) {
        this._hovered.onPointerLeave && this._hovered.onPointerLeave(), i.onPointerEnter && i.onPointerEnter(this._intersects[0]), this._hovered = i;
        return;
      }
      i.onPointerOver && i.onPointerOver(this._intersects[0]), this._hovered = i;
    } else
      this._hovered && this._hovered.onPointerLeave && this._hovered.onPointerLeave(), this._hovered = null;
    this._pointerAnyDown && (this._dragging || this.onDragStart(a), this.onDrag(a));
  }
  onDrag(a) {
    this._dragRaycastOnObjects !== null && (this._intersects = this._raycaster.intersectObjects(
      this._dragRaycastOnObjects,
      !0
    ));
    const i = this._intersects[0];
    i && (this._dragCurrent.copy(i.point.clone()), this._dragEnd.copy(i.point.clone()), this._dragDelta.subVectors(
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
    const i = this._intersects[0];
    i && (this._dragEnd.copy(i.point.clone()), this._dragCurrent.copy(i.point.clone()), this._dragDelta.subVectors(
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
    return a !== void 0 ? this._raycaster.intersectObjects(a, !0).filter((i) => i.object.visible) : this._raycaster.intersectObjects(this._scene.children, !0).filter((i) => i.object.visible);
  }
  pointerWasDragged() {
    return this._lastPointerDown.distanceTo(this._pointer) > this.POINTER_DRAG_THRESHOLD;
  }
}
const Tn = new Fr(), Ce = new D(), hn = new D(), ae = new pt(), ql = {
  X: new D(1, 0, 0),
  Y: new D(0, 1, 0),
  Z: new D(0, 0, 1)
}, to = { type: "change" }, Ql = { type: "mouseDown" }, Kl = { type: "mouseUp", mode: null }, $l = { type: "objectChange" };
class __ extends gt {
  constructor(a, i) {
    super(), i === void 0 && (console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'), i = document), this.isTransformControls = !0, this.visible = !1, this.domElement = i, this.domElement.style.touchAction = "none";
    const r = new E_();
    this._gizmo = r, this.add(r);
    const h = new x_();
    this._plane = h, this.add(h);
    const b = this;
    function p(ie, V) {
      let ke = V;
      Object.defineProperty(b, ie, {
        get: function() {
          return ke !== void 0 ? ke : V;
        },
        set: function(te) {
          ke !== te && (ke = te, h[ie] = te, r[ie] = te, b.dispatchEvent({ type: ie + "-changed", value: te }), b.dispatchEvent(to));
        }
      }), b[ie] = V, h[ie] = V, r[ie] = V;
    }
    p("camera", a), p("object", void 0), p("enabled", !0), p("axis", null), p("mode", "translate"), p("translationSnap", null), p("rotationSnap", null), p("scaleSnap", null), p("space", "world"), p("size", 1), p("dragging", !1), p("showX", !0), p("showY", !0), p("showZ", !0);
    const A = new D(), M = new D(), X = new pt(), ue = new pt(), ce = new D(), Re = new pt(), Le = new D(), me = new D(), he = new D(), $ = 0, se = new D();
    p("worldPosition", A), p("worldPositionStart", M), p("worldQuaternion", X), p("worldQuaternionStart", ue), p("cameraPosition", ce), p("cameraQuaternion", Re), p("pointStart", Le), p("pointEnd", me), p("rotationAxis", he), p("rotationAngle", $), p("eye", se), this._offset = new D(), this._startNorm = new D(), this._endNorm = new D(), this._cameraScale = new D(), this._parentPosition = new D(), this._parentQuaternion = new pt(), this._parentQuaternionInv = new pt(), this._parentScale = new D(), this._worldScaleStart = new D(), this._worldQuaternionInv = new pt(), this._worldScale = new D(), this._positionStart = new D(), this._quaternionStart = new pt(), this._scaleStart = new D(), this._getPointer = m_.bind(this), this._onPointerDown = v_.bind(this), this._onPointerHover = b_.bind(this), this._onPointerMove = w_.bind(this), this._onPointerUp = y_.bind(this), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(a) {
    this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this._parentPosition, this._parentQuaternion, this._parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this._worldScale), this._parentQuaternionInv.copy(this._parentQuaternion).invert(), this._worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this._cameraScale), this.camera.isOrthographicCamera ? this.camera.getWorldDirection(this.eye).negate() : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld(a);
  }
  pointerHover(a) {
    if (this.object === void 0 || this.dragging === !0) return;
    a !== null && Tn.setFromCamera(a, this.camera);
    const i = no(this._gizmo.picker[this.mode], Tn);
    i ? this.axis = i.object.name : this.axis = null;
  }
  pointerDown(a) {
    if (!(this.object === void 0 || this.dragging === !0 || a != null && a.button !== 0) && this.axis !== null) {
      a !== null && Tn.setFromCamera(a, this.camera);
      const i = no(this._plane, Tn, !0);
      i && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(i.point).sub(this.worldPositionStart)), this.dragging = !0, Ql.mode = this.mode, this.dispatchEvent(Ql);
    }
  }
  pointerMove(a) {
    const i = this.axis, r = this.mode, h = this.object;
    let b = this.space;
    if (r === "scale" ? b = "local" : (i === "E" || i === "XYZE" || i === "XYZ") && (b = "world"), h === void 0 || i === null || this.dragging === !1 || a !== null && a.button !== -1) return;
    a !== null && Tn.setFromCamera(a, this.camera);
    const p = no(this._plane, Tn, !0);
    if (p) {
      if (this.pointEnd.copy(p.point).sub(this.worldPositionStart), r === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), b === "local" && i !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), i.indexOf("X") === -1 && (this._offset.x = 0), i.indexOf("Y") === -1 && (this._offset.y = 0), i.indexOf("Z") === -1 && (this._offset.z = 0), b === "local" && i !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), h.position.copy(this._offset).add(this._positionStart), this.translationSnap && (b === "local" && (h.position.applyQuaternion(ae.copy(this._quaternionStart).invert()), i.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), i.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), i.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.position.applyQuaternion(this._quaternionStart)), b === "world" && (h.parent && h.position.add(Ce.setFromMatrixPosition(h.parent.matrixWorld)), i.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), i.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), i.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.parent && h.position.sub(Ce.setFromMatrixPosition(h.parent.matrixWorld))));
      else if (r === "scale") {
        if (i.search("XYZ") !== -1) {
          let A = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (A *= -1), hn.set(A, A, A);
        } else
          Ce.copy(this.pointStart), hn.copy(this.pointEnd), Ce.applyQuaternion(this._worldQuaternionInv), hn.applyQuaternion(this._worldQuaternionInv), hn.divide(Ce), i.search("X") === -1 && (hn.x = 1), i.search("Y") === -1 && (hn.y = 1), i.search("Z") === -1 && (hn.z = 1);
        h.scale.copy(this._scaleStart).multiply(hn), this.scaleSnap && (i.search("X") !== -1 && (h.scale.x = Math.round(h.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), i.search("Y") !== -1 && (h.scale.y = Math.round(h.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), i.search("Z") !== -1 && (h.scale.z = Math.round(h.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (r === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const A = 20 / this.worldPosition.distanceTo(Ce.setFromMatrixPosition(this.camera.matrixWorld));
        let M = !1;
        i === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(Ce.copy(this.rotationAxis).cross(this.eye)) * A) : (i === "X" || i === "Y" || i === "Z") && (this.rotationAxis.copy(ql[i]), Ce.copy(ql[i]), b === "local" && Ce.applyQuaternion(this.worldQuaternion), Ce.cross(this.eye), Ce.length() === 0 ? M = !0 : this.rotationAngle = this._offset.dot(Ce.normalize()) * A), (i === "E" || M) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), b === "local" && i !== "E" && i !== "XYZE" ? (h.quaternion.copy(this._quaternionStart), h.quaternion.multiply(ae.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), h.quaternion.copy(ae.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), h.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(to), this.dispatchEvent($l);
    }
  }
  pointerUp(a) {
    a !== null && a.button !== 0 || (this.dragging && this.axis !== null && (Kl.mode = this.mode, this.dispatchEvent(Kl)), this.dragging = !1, this.axis = null);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(to), this.dispatchEvent($l), this.pointStart.copy(this.pointEnd));
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
function m_(S) {
  if (this.domElement.ownerDocument.pointerLockElement)
    return {
      x: 0,
      y: 0,
      button: S.button
    };
  {
    const a = this.domElement.getBoundingClientRect();
    return {
      x: (S.clientX - a.left) / a.width * 2 - 1,
      y: -(S.clientY - a.top) / a.height * 2 + 1,
      button: S.button
    };
  }
}
function b_(S) {
  if (this.enabled)
    switch (S.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(S));
        break;
    }
}
function v_(S) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(S.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(S)), this.pointerDown(this._getPointer(S)));
}
function w_(S) {
  this.enabled && this.pointerMove(this._getPointer(S));
}
function y_(S) {
  this.enabled && (this.domElement.releasePointerCapture(S.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(S)));
}
function no(S, a, i) {
  const r = a.intersectObject(S, !0);
  for (let h = 0; h < r.length; h++)
    if (r[h].object.visible || i)
      return r[h];
  return !1;
}
const Ir = new N0(), ee = new D(0, 1, 0), Jl = new D(0, 0, 0), eu = new uo(), Dr = new pt(), zr = new pt(), It = new D(), tu = new uo(), Ai = new D(1, 0, 0), Rn = new D(0, 1, 0), Ti = new D(0, 0, 1), Or = new D(), Si = new D(), Pi = new D();
class E_ extends gt {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const a = new ao({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), i = new W0({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), r = a.clone();
    r.opacity = 0.15;
    const h = i.clone();
    h.opacity = 0.5;
    const b = a.clone();
    b.color.setHex(16711680);
    const p = a.clone();
    p.color.setHex(65280);
    const A = a.clone();
    A.color.setHex(255);
    const M = a.clone();
    M.color.setHex(16711680), M.opacity = 0.5;
    const X = a.clone();
    X.color.setHex(65280), X.opacity = 0.5;
    const ue = a.clone();
    ue.color.setHex(255), ue.opacity = 0.5;
    const ce = a.clone();
    ce.opacity = 0.25;
    const Re = a.clone();
    Re.color.setHex(16776960), Re.opacity = 0.25, a.clone().color.setHex(16776960);
    const me = a.clone();
    me.color.setHex(7895160);
    const he = new Fe(0, 0.04, 0.1, 12);
    he.translate(0, 0.05, 0);
    const $ = new xe(0.08, 0.08, 0.08);
    $.translate(0, 0.04, 0);
    const se = new Gr();
    se.setAttribute("position", new Yl([0, 0, 0, 1, 0, 0], 3));
    const ie = new Fe(75e-4, 75e-4, 0.5, 3);
    ie.translate(0, 0.25, 0);
    function V(Se, qe) {
      const ge = new Ei(Se, 75e-4, 3, 64, qe * Math.PI * 2);
      return ge.rotateY(Math.PI / 2), ge.rotateX(Math.PI / 2), ge;
    }
    function ke() {
      const Se = new Gr();
      return Se.setAttribute("position", new Yl([0, 0, 0, 1, 1, 1], 3)), Se;
    }
    const te = {
      X: [
        [new L(he, b), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new L(he, b), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new L(ie, b), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new L(he, p), [0, 0.5, 0]],
        [new L(he, p), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new L(ie, p)]
      ],
      Z: [
        [new L(he, A), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new L(he, A), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new L(ie, A), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new L(new Tr(0.1, 0), ce.clone()), [0, 0, 0]]
      ],
      XY: [
        [new L(new xe(0.15, 0.15, 0.01), ue.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new L(new xe(0.15, 0.15, 0.01), M.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new L(new xe(0.15, 0.15, 0.01), X.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, st = {
      X: [
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new L(new Fe(0.2, 0, 0.6, 4), r), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, 0.3, 0]],
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new L(new Tr(0.2, 0), r)]
      ],
      XY: [
        [new L(new xe(0.2, 0.2, 0.01), r), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new L(new xe(0.2, 0.2, 0.01), r), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new L(new xe(0.2, 0.2, 0.01), r), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, q = {
      START: [
        [new L(new Tr(0.01, 2), h), null, null, null, "helper"]
      ],
      END: [
        [new L(new Tr(0.01, 2), h), null, null, null, "helper"]
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
        [new L(V(0.5, 1), me), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new L(V(0.5, 0.5), b)]
      ],
      Y: [
        [new L(V(0.5, 0.5), p), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new L(V(0.5, 0.5), A), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new L(V(0.75, 1), Re), null, [0, Math.PI / 2, 0]]
      ]
    }, Ot = {
      AXIS: [
        [new Yt(se, h.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, ti = {
      XYZE: [
        [new L(new lo(0.25, 10, 8), r)]
      ],
      X: [
        [new L(new Ei(0.5, 0.1, 4, 24), r), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new L(new Ei(0.5, 0.1, 4, 24), r), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new L(new Ei(0.5, 0.1, 4, 24), r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new L(new Ei(0.75, 0.1, 2, 24), r)]
      ]
    }, jt = {
      X: [
        [new L($, b), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new L(ie, b), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new L($, b), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new L($, p), [0, 0.5, 0]],
        [new L(ie, p)],
        [new L($, p), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new L($, A), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new L(ie, A), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new L($, A), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new L(new xe(0.15, 0.15, 0.01), ue), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new L(new xe(0.15, 0.15, 0.01), M), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new L(new xe(0.15, 0.15, 0.01), X), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new L(new xe(0.1, 0.1, 0.1), ce.clone())]
      ]
    }, Mt = {
      X: [
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new L(new Fe(0.2, 0, 0.6, 4), r), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, 0.3, 0]],
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new L(new Fe(0.2, 0, 0.6, 4), r), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new L(new xe(0.2, 0.2, 0.01), r), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new L(new xe(0.2, 0.2, 0.01), r), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new L(new xe(0.2, 0.2, 0.01), r), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new L(new xe(0.2, 0.2, 0.2), r), [0, 0, 0]]
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
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = Be(te)), this.add(this.gizmo.rotate = Be(Ve)), this.add(this.gizmo.scale = Be(jt)), this.add(this.picker.translate = Be(st)), this.add(this.picker.rotate = Be(ti)), this.add(this.picker.scale = Be(Mt)), this.add(this.helper.translate = Be(q)), this.add(this.helper.rotate = Be(Ot)), this.add(this.helper.scale = Be(Vt)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
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
      let A;
      if (this.camera.isOrthographicCamera ? A = (this.camera.top - this.camera.bottom) / this.camera.zoom : A = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), p.scale.set(1, 1, 1).multiplyScalar(A * this.size / 4), p.tag === "helper") {
        p.visible = !1, p.name === "AXIS" ? (p.visible = !!this.axis, this.axis === "X" && (ae.setFromEuler(Ir.set(0, 0, 0)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Ai).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "Y" && (ae.setFromEuler(Ir.set(0, 0, Math.PI / 2)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Rn).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "Z" && (ae.setFromEuler(Ir.set(0, Math.PI / 2, 0)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "XYZE" && (ae.setFromEuler(Ir.set(0, Math.PI / 2, 0)), ee.copy(this.rotationAxis), p.quaternion.setFromRotationMatrix(eu.lookAt(Jl, ee, Rn)), p.quaternion.multiply(ae), p.visible = this.dragging), this.axis === "E" && (p.visible = !1)) : p.name === "START" ? (p.position.copy(this.worldPositionStart), p.visible = this.dragging) : p.name === "END" ? (p.position.copy(this.worldPosition), p.visible = this.dragging) : p.name === "DELTA" ? (p.position.copy(this.worldPositionStart), p.quaternion.copy(this.worldQuaternionStart), Ce.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), Ce.applyQuaternion(this.worldQuaternionStart.clone().invert()), p.scale.copy(Ce), p.visible = this.dragging) : (p.quaternion.copy(r), this.dragging ? p.position.copy(this.worldPositionStart) : p.position.copy(this.worldPosition), this.axis && (p.visible = this.axis.search(p.name) !== -1));
        continue;
      }
      p.quaternion.copy(r), this.mode === "translate" || this.mode === "scale" ? (p.name === "X" && Math.abs(ee.copy(Ai).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "Y" && Math.abs(ee.copy(Rn).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "Z" && Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "XY" && Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "YZ" && Math.abs(ee.copy(Ai).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "XZ" && Math.abs(ee.copy(Rn).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1)) : this.mode === "rotate" && (Dr.copy(r), ee.copy(this.eye).applyQuaternion(ae.copy(r).invert()), p.name.search("E") !== -1 && p.quaternion.setFromRotationMatrix(eu.lookAt(this.eye, Jl, Rn)), p.name === "X" && (ae.setFromAxisAngle(Ai, Math.atan2(-ee.y, ee.z)), ae.multiplyQuaternions(Dr, ae), p.quaternion.copy(ae)), p.name === "Y" && (ae.setFromAxisAngle(Rn, Math.atan2(ee.x, ee.z)), ae.multiplyQuaternions(Dr, ae), p.quaternion.copy(ae)), p.name === "Z" && (ae.setFromAxisAngle(Ti, Math.atan2(ee.y, ee.x)), ae.multiplyQuaternions(Dr, ae), p.quaternion.copy(ae))), p.visible = p.visible && (p.name.indexOf("X") === -1 || this.showX), p.visible = p.visible && (p.name.indexOf("Y") === -1 || this.showY), p.visible = p.visible && (p.name.indexOf("Z") === -1 || this.showZ), p.visible = p.visible && (p.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), p.material._color = p.material._color || p.material.color.clone(), p.material._opacity = p.material._opacity || p.material.opacity, p.material.color.copy(p.material._color), p.material.opacity = p.material._opacity, this.enabled && this.axis && (p.name === this.axis || this.axis.split("").some(function(M) {
        return p.name === M;
      })) && (p.material.color.setHex(16776960), p.material.opacity = 1);
    }
    super.updateMatrixWorld(a);
  }
}
class x_ extends L {
  constructor() {
    super(
      new co(1e5, 1e5, 2, 2),
      new ao({ visible: !1, wireframe: !0, side: H0, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(a) {
    let i = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (i = "local"), Or.copy(Ai).applyQuaternion(i === "local" ? this.worldQuaternion : zr), Si.copy(Rn).applyQuaternion(i === "local" ? this.worldQuaternion : zr), Pi.copy(Ti).applyQuaternion(i === "local" ? this.worldQuaternion : zr), ee.copy(Si), this.mode) {
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
            ee.copy(this.eye).cross(Pi), It.copy(Pi).cross(ee);
            break;
          case "XY":
            It.copy(Pi);
            break;
          case "YZ":
            It.copy(Or);
            break;
          case "XZ":
            ee.copy(Pi), It.copy(Si);
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
    It.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (tu.lookAt(Ce.set(0, 0, 0), It, ee), this.quaternion.setFromRotationMatrix(tu)), super.updateMatrixWorld(a);
  }
}
const au = "#c20017", lu = "#00ab26", uu = "#0081d4", ro = au, so = lu, oo = uu;
class S_ extends g_ {
  constructor(i, r) {
    super(i, r);
    w(this, "isTransformTool", !0);
    w(this, "_scaleLinked");
    w(this, "_gizmo");
    this.name = "DIVETransformTool", this._scaleLinked = !1, this._gizmo = this.initGizmo(), this._scene.add(this._gizmo);
  }
  Activate() {
  }
  SetGizmoMode(i) {
    this._gizmo.mode = i;
  }
  SetGizmoVisibility(i) {
    const r = this._scene.children.includes(this._gizmo);
    i && !r ? (this._scene.add(this._gizmo), "isTransformControls" in this._gizmo && this._gizmo.getRaycaster().layers.enableAll()) : !i && r && (this._scene.remove(this._gizmo), "isTransformControls" in this._gizmo && this._gizmo.getRaycaster().layers.disableAll());
  }
  SetGizmoScaleLinked(i) {
    this._scaleLinked = i;
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
    const i = new __(
      // this._controller,
      this._controller.object,
      this._controller.domElement
    );
    return i.mode = "translate", i.traverse((r) => {
      if (!("isMesh" in r)) return;
      const h = r.material;
      r.name === "X" && h.color.set(ro), r.name === "Y" && h.color.set(so), r.name === "Z" && h.color.set(oo), r.name === "XY" && h.color.set(oo), r.name === "YZ" && h.color.set(ro), r.name === "XZ" && h.color.set(so);
    }), i.addEventListener("mouseDown", () => {
      this._controller.enabled = !1, Br(i.object, "isMovable") && i.object.onMoveStart && i.object.onMoveStart();
    }), i.addEventListener("objectChange", () => {
      if (Br(i.object, "isMovable") && i.object.onMove && (i.object.onMove(), this._scaleLinked)) {
        const r = i.object.scale, h = (r.x + r.y + r.z) / 3;
        i.object.scale.set(h, h, h);
      }
    }), i.addEventListener("mouseUp", () => {
      this._controller.enabled = !0, Br(i.object, "isMovable") && i.object.onMoveEnd && i.object.onMoveEnd();
    }), i;
  }
}
const nu = (S) => S.isSelectTool !== void 0;
class P_ extends S_ {
  constructor(i, r) {
    super(i, r);
    w(this, "isSelectTool", !0);
    this.name = "SelectTool";
  }
  Activate() {
  }
  Select(i) {
    this.AttachGizmo(i), i.onSelect && i.onSelect();
  }
  Deselect(i) {
    this.DetachGizmo(), i.onDeselect && i.onDeselect();
  }
  AttachGizmo(i) {
    if ("isMovable" in i) {
      const r = i;
      this._gizmo.attach(r), this.SetGizmoVisibility(r.visible);
    }
  }
  DetachGizmo() {
    this._gizmo.detach();
  }
  onClick(i) {
    super.onClick(i);
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
class cu {
  constructor(a, i) {
    w(this, "_scene");
    w(this, "_controller");
    w(this, "_activeTool");
    w(this, "_selectTool");
    this._scene = a, this._controller = i, this._selectTool = null, this._activeTool = null;
  }
  get selectTool() {
    return this._selectTool || (this._selectTool = new P_(
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
    var i;
    switch ((i = this._activeTool) == null || i.Deactivate(), a) {
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
    var i;
    (i = this._activeTool) == null || i.onPointerMove(a);
  }
  onPointerDown(a) {
    var i;
    (i = this._activeTool) == null || i.onPointerDown(a);
  }
  onPointerUp(a) {
    var i;
    (i = this._activeTool) == null || i.onPointerUp(a);
  }
  onWheel(a) {
    var i;
    (i = this._activeTool) == null || i.onWheel(a);
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
w(cu, "DefaultTool", "select");
const Me = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function A_() {
  const S = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
  return (Me[S & 255] + Me[S >> 8 & 255] + Me[S >> 16 & 255] + Me[S >> 24 & 255] + "-" + Me[a & 255] + Me[a >> 8 & 255] + "-" + Me[a >> 16 & 15 | 64] + Me[a >> 24 & 255] + "-" + Me[i & 63 | 128] + Me[i >> 8 & 255] + "-" + Me[i >> 16 & 255] + Me[i >> 24 & 255] + Me[r & 255] + Me[r >> 8 & 255] + Me[r >> 16 & 255] + Me[r >> 24 & 255]).toLowerCase();
}
var Mr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ri = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var T_ = Ri.exports, iu;
function R_() {
  return iu || (iu = 1, function(S, a) {
    (function() {
      var i, r = "4.17.21", h = 200, b = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", p = "Expected a function", A = "Invalid `variable` option passed into `_.template`", M = "__lodash_hash_undefined__", X = 500, ue = "__lodash_placeholder__", ce = 1, Re = 2, Le = 4, me = 1, he = 2, $ = 1, se = 2, ie = 4, V = 8, ke = 16, te = 32, st = 64, q = 128, Ve = 256, Ot = 512, ti = 30, jt = "...", Mt = 800, Vt = 16, Be = 1, Se = 2, qe = 3, ge = 1 / 0, Ie = 9007199254740991, _e = 17976931348623157e292, Qe = NaN, we = 4294967295, qt = we - 1, In = we >>> 1, Dn = [
        ["ary", q],
        ["bind", $],
        ["bindKey", se],
        ["curry", V],
        ["curryRight", ke],
        ["flip", Ot],
        ["partial", te],
        ["partialRight", st],
        ["rearg", Ve]
      ], Qt = "[object Arguments]", On = "[object Array]", Wr = "[object AsyncFunction]", fn = "[object Boolean]", Kt = "[object Date]", Ii = "[object DOMException]", dn = "[object Error]", Mn = "[object Function]", Di = "[object GeneratorFunction]", We = "[object Map]", $t = "[object Number]", Oi = "[object Null]", _t = "[object Object]", Mi = "[object Promise]", Ci = "[object Proxy]", Ct = "[object RegExp]", Pe = "[object Set]", pn = "[object String]", Cn = "[object Symbol]", ki = "[object Undefined]", gn = "[object WeakMap]", Bi = "[object WeakSet]", Jt = "[object ArrayBuffer]", St = "[object DataView]", kn = "[object Float32Array]", ni = "[object Float64Array]", Bn = "[object Int8Array]", ii = "[object Int16Array]", ri = "[object Int32Array]", si = "[object Uint8Array]", zn = "[object Uint8ClampedArray]", Pt = "[object Uint16Array]", zi = "[object Uint32Array]", d = /\b__p \+= '';/g, T = /\b(__p \+=) '' \+/g, W = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Q = /&(?:amp|lt|gt|quot|#39);/g, ye = /[&<>"']/g, At = RegExp(Q.source), Ne = RegExp(ye.source), _o = /<%-([\s\S]+?)%>/g, Nr = /<%([\s\S]+?)%>/g, oi = /<%=([\s\S]+?)%>/g, mt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, bt = /^\w*$/, _n = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ke = /[\\^$.*+?()[\]{}|]/g, mn = RegExp(Ke.source), en = /^\s+/, Gi = /\s/, pu = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, gu = /\{\n\/\* \[wrapped with (.+)\] \*/, _u = /,? & /, mu = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, bu = /[()=,{}\[\]\/\s]/, vu = /\\(\\)?/g, wu = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, mo = /\w*$/, yu = /^[-+]0x[0-9a-f]+$/i, Eu = /^0b[01]+$/i, xu = /^\[object .+?Constructor\]$/, Su = /^0o[0-7]+$/i, Pu = /^(?:0|[1-9]\d*)$/, Au = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ui = /($^)/, Tu = /['\n\r\u2028\u2029\\]/g, Fi = "\\ud800-\\udfff", Ru = "\\u0300-\\u036f", Lu = "\\ufe20-\\ufe2f", Iu = "\\u20d0-\\u20ff", bo = Ru + Lu + Iu, vo = "\\u2700-\\u27bf", wo = "a-z\\xdf-\\xf6\\xf8-\\xff", Du = "\\xac\\xb1\\xd7\\xf7", Ou = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Mu = "\\u2000-\\u206f", Cu = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", yo = "A-Z\\xc0-\\xd6\\xd8-\\xde", Eo = "\\ufe0e\\ufe0f", xo = Du + Ou + Mu + Cu, Hr = "['’]", ku = "[" + Fi + "]", So = "[" + xo + "]", Wi = "[" + bo + "]", Po = "\\d+", Bu = "[" + vo + "]", Ao = "[" + wo + "]", To = "[^" + Fi + xo + Po + vo + wo + yo + "]", Yr = "\\ud83c[\\udffb-\\udfff]", zu = "(?:" + Wi + "|" + Yr + ")", Ro = "[^" + Fi + "]", Xr = "(?:\\ud83c[\\udde6-\\uddff]){2}", Zr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Gn = "[" + yo + "]", Lo = "\\u200d", Io = "(?:" + Ao + "|" + To + ")", Gu = "(?:" + Gn + "|" + To + ")", Do = "(?:" + Hr + "(?:d|ll|m|re|s|t|ve))?", Oo = "(?:" + Hr + "(?:D|LL|M|RE|S|T|VE))?", Mo = zu + "?", Co = "[" + Eo + "]?", Uu = "(?:" + Lo + "(?:" + [Ro, Xr, Zr].join("|") + ")" + Co + Mo + ")*", Fu = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Wu = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ko = Co + Mo + Uu, Nu = "(?:" + [Bu, Xr, Zr].join("|") + ")" + ko, Hu = "(?:" + [Ro + Wi + "?", Wi, Xr, Zr, ku].join("|") + ")", Yu = RegExp(Hr, "g"), Xu = RegExp(Wi, "g"), jr = RegExp(Yr + "(?=" + Yr + ")|" + Hu + ko, "g"), Zu = RegExp([
        Gn + "?" + Ao + "+" + Do + "(?=" + [So, Gn, "$"].join("|") + ")",
        Gu + "+" + Oo + "(?=" + [So, Gn + Io, "$"].join("|") + ")",
        Gn + "?" + Io + "+" + Do,
        Gn + "+" + Oo,
        Wu,
        Fu,
        Po,
        Nu
      ].join("|"), "g"), ju = RegExp("[" + Lo + Fi + bo + Eo + "]"), Vu = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, qu = [
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
      ], Qu = -1, re = {};
      re[kn] = re[ni] = re[Bn] = re[ii] = re[ri] = re[si] = re[zn] = re[Pt] = re[zi] = !0, re[Qt] = re[On] = re[Jt] = re[fn] = re[St] = re[Kt] = re[dn] = re[Mn] = re[We] = re[$t] = re[_t] = re[Ct] = re[Pe] = re[pn] = re[gn] = !1;
      var ne = {};
      ne[Qt] = ne[On] = ne[Jt] = ne[St] = ne[fn] = ne[Kt] = ne[kn] = ne[ni] = ne[Bn] = ne[ii] = ne[ri] = ne[We] = ne[$t] = ne[_t] = ne[Ct] = ne[Pe] = ne[pn] = ne[Cn] = ne[si] = ne[zn] = ne[Pt] = ne[zi] = !0, ne[dn] = ne[Mn] = ne[gn] = !1;
      var Ku = {
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
      }, $u = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, Ju = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, ec = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, tc = parseFloat, nc = parseInt, Bo = typeof Mr == "object" && Mr && Mr.Object === Object && Mr, ic = typeof self == "object" && self && self.Object === Object && self, Ae = Bo || ic || Function("return this")(), Vr = a && !a.nodeType && a, bn = Vr && !0 && S && !S.nodeType && S, zo = bn && bn.exports === Vr, qr = zo && Bo.process, ot = function() {
        try {
          var g = bn && bn.require && bn.require("util").types;
          return g || qr && qr.binding && qr.binding("util");
        } catch {
        }
      }(), Go = ot && ot.isArrayBuffer, Uo = ot && ot.isDate, Fo = ot && ot.isMap, Wo = ot && ot.isRegExp, No = ot && ot.isSet, Ho = ot && ot.isTypedArray;
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
      function rc(g, v, m, R) {
        for (var B = -1, Z = g == null ? 0 : g.length; ++B < Z; ) {
          var be = g[B];
          v(R, be, m(be), g);
        }
        return R;
      }
      function at(g, v) {
        for (var m = -1, R = g == null ? 0 : g.length; ++m < R && v(g[m], m, g) !== !1; )
          ;
        return g;
      }
      function sc(g, v) {
        for (var m = g == null ? 0 : g.length; m-- && v(g[m], m, g) !== !1; )
          ;
        return g;
      }
      function Yo(g, v) {
        for (var m = -1, R = g == null ? 0 : g.length; ++m < R; )
          if (!v(g[m], m, g))
            return !1;
        return !0;
      }
      function tn(g, v) {
        for (var m = -1, R = g == null ? 0 : g.length, B = 0, Z = []; ++m < R; ) {
          var be = g[m];
          v(be, m, g) && (Z[B++] = be);
        }
        return Z;
      }
      function Ni(g, v) {
        var m = g == null ? 0 : g.length;
        return !!m && Un(g, v, 0) > -1;
      }
      function Qr(g, v, m) {
        for (var R = -1, B = g == null ? 0 : g.length; ++R < B; )
          if (m(v, g[R]))
            return !0;
        return !1;
      }
      function oe(g, v) {
        for (var m = -1, R = g == null ? 0 : g.length, B = Array(R); ++m < R; )
          B[m] = v(g[m], m, g);
        return B;
      }
      function nn(g, v) {
        for (var m = -1, R = v.length, B = g.length; ++m < R; )
          g[B + m] = v[m];
        return g;
      }
      function Kr(g, v, m, R) {
        var B = -1, Z = g == null ? 0 : g.length;
        for (R && Z && (m = g[++B]); ++B < Z; )
          m = v(m, g[B], B, g);
        return m;
      }
      function oc(g, v, m, R) {
        var B = g == null ? 0 : g.length;
        for (R && B && (m = g[--B]); B--; )
          m = v(m, g[B], B, g);
        return m;
      }
      function $r(g, v) {
        for (var m = -1, R = g == null ? 0 : g.length; ++m < R; )
          if (v(g[m], m, g))
            return !0;
        return !1;
      }
      var ac = Jr("length");
      function lc(g) {
        return g.split("");
      }
      function uc(g) {
        return g.match(mu) || [];
      }
      function Xo(g, v, m) {
        var R;
        return m(g, function(B, Z, be) {
          if (v(B, Z, be))
            return R = Z, !1;
        }), R;
      }
      function Hi(g, v, m, R) {
        for (var B = g.length, Z = m + (R ? 1 : -1); R ? Z-- : ++Z < B; )
          if (v(g[Z], Z, g))
            return Z;
        return -1;
      }
      function Un(g, v, m) {
        return v === v ? yc(g, v, m) : Hi(g, Zo, m);
      }
      function cc(g, v, m, R) {
        for (var B = m - 1, Z = g.length; ++B < Z; )
          if (R(g[B], v))
            return B;
        return -1;
      }
      function Zo(g) {
        return g !== g;
      }
      function jo(g, v) {
        var m = g == null ? 0 : g.length;
        return m ? ts(g, v) / m : Qe;
      }
      function Jr(g) {
        return function(v) {
          return v == null ? i : v[g];
        };
      }
      function es(g) {
        return function(v) {
          return g == null ? i : g[v];
        };
      }
      function Vo(g, v, m, R, B) {
        return B(g, function(Z, be, J) {
          m = R ? (R = !1, Z) : v(m, Z, be, J);
        }), m;
      }
      function hc(g, v) {
        var m = g.length;
        for (g.sort(v); m--; )
          g[m] = g[m].value;
        return g;
      }
      function ts(g, v) {
        for (var m, R = -1, B = g.length; ++R < B; ) {
          var Z = v(g[R]);
          Z !== i && (m = m === i ? Z : m + Z);
        }
        return m;
      }
      function ns(g, v) {
        for (var m = -1, R = Array(g); ++m < g; )
          R[m] = v(m);
        return R;
      }
      function fc(g, v) {
        return oe(v, function(m) {
          return [m, g[m]];
        });
      }
      function qo(g) {
        return g && g.slice(0, Jo(g) + 1).replace(en, "");
      }
      function Je(g) {
        return function(v) {
          return g(v);
        };
      }
      function is(g, v) {
        return oe(v, function(m) {
          return g[m];
        });
      }
      function ai(g, v) {
        return g.has(v);
      }
      function Qo(g, v) {
        for (var m = -1, R = g.length; ++m < R && Un(v, g[m], 0) > -1; )
          ;
        return m;
      }
      function Ko(g, v) {
        for (var m = g.length; m-- && Un(v, g[m], 0) > -1; )
          ;
        return m;
      }
      function dc(g, v) {
        for (var m = g.length, R = 0; m--; )
          g[m] === v && ++R;
        return R;
      }
      var pc = es(Ku), gc = es($u);
      function _c(g) {
        return "\\" + ec[g];
      }
      function mc(g, v) {
        return g == null ? i : g[v];
      }
      function Fn(g) {
        return ju.test(g);
      }
      function bc(g) {
        return Vu.test(g);
      }
      function vc(g) {
        for (var v, m = []; !(v = g.next()).done; )
          m.push(v.value);
        return m;
      }
      function rs(g) {
        var v = -1, m = Array(g.size);
        return g.forEach(function(R, B) {
          m[++v] = [B, R];
        }), m;
      }
      function $o(g, v) {
        return function(m) {
          return g(v(m));
        };
      }
      function rn(g, v) {
        for (var m = -1, R = g.length, B = 0, Z = []; ++m < R; ) {
          var be = g[m];
          (be === v || be === ue) && (g[m] = ue, Z[B++] = m);
        }
        return Z;
      }
      function Yi(g) {
        var v = -1, m = Array(g.size);
        return g.forEach(function(R) {
          m[++v] = R;
        }), m;
      }
      function wc(g) {
        var v = -1, m = Array(g.size);
        return g.forEach(function(R) {
          m[++v] = [R, R];
        }), m;
      }
      function yc(g, v, m) {
        for (var R = m - 1, B = g.length; ++R < B; )
          if (g[R] === v)
            return R;
        return -1;
      }
      function Ec(g, v, m) {
        for (var R = m + 1; R--; )
          if (g[R] === v)
            return R;
        return R;
      }
      function Wn(g) {
        return Fn(g) ? Sc(g) : ac(g);
      }
      function vt(g) {
        return Fn(g) ? Pc(g) : lc(g);
      }
      function Jo(g) {
        for (var v = g.length; v-- && Gi.test(g.charAt(v)); )
          ;
        return v;
      }
      var xc = es(Ju);
      function Sc(g) {
        for (var v = jr.lastIndex = 0; jr.test(g); )
          ++v;
        return v;
      }
      function Pc(g) {
        return g.match(jr) || [];
      }
      function Ac(g) {
        return g.match(Zu) || [];
      }
      var Tc = function g(v) {
        v = v == null ? Ae : Nn.defaults(Ae.Object(), v, Nn.pick(Ae, qu));
        var m = v.Array, R = v.Date, B = v.Error, Z = v.Function, be = v.Math, J = v.Object, ss = v.RegExp, Rc = v.String, lt = v.TypeError, Xi = m.prototype, Lc = Z.prototype, Hn = J.prototype, Zi = v["__core-js_shared__"], ji = Lc.toString, K = Hn.hasOwnProperty, Ic = 0, ea = function() {
          var e = /[^.]+$/.exec(Zi && Zi.keys && Zi.keys.IE_PROTO || "");
          return e ? "Symbol(src)_1." + e : "";
        }(), Vi = Hn.toString, Dc = ji.call(J), Oc = Ae._, Mc = ss(
          "^" + ji.call(K).replace(Ke, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), qi = zo ? v.Buffer : i, sn = v.Symbol, Qi = v.Uint8Array, ta = qi ? qi.allocUnsafe : i, Ki = $o(J.getPrototypeOf, J), na = J.create, ia = Hn.propertyIsEnumerable, $i = Xi.splice, ra = sn ? sn.isConcatSpreadable : i, li = sn ? sn.iterator : i, vn = sn ? sn.toStringTag : i, Ji = function() {
          try {
            var e = Sn(J, "defineProperty");
            return e({}, "", {}), e;
          } catch {
          }
        }(), Cc = v.clearTimeout !== Ae.clearTimeout && v.clearTimeout, kc = R && R.now !== Ae.Date.now && R.now, Bc = v.setTimeout !== Ae.setTimeout && v.setTimeout, er = be.ceil, tr = be.floor, os = J.getOwnPropertySymbols, zc = qi ? qi.isBuffer : i, sa = v.isFinite, Gc = Xi.join, Uc = $o(J.keys, J), ve = be.max, De = be.min, Fc = R.now, Wc = v.parseInt, oa = be.random, Nc = Xi.reverse, as = Sn(v, "DataView"), ui = Sn(v, "Map"), ls = Sn(v, "Promise"), Yn = Sn(v, "Set"), ci = Sn(v, "WeakMap"), hi = Sn(J, "create"), nr = ci && new ci(), Xn = {}, Hc = Pn(as), Yc = Pn(ui), Xc = Pn(ls), Zc = Pn(Yn), jc = Pn(ci), ir = sn ? sn.prototype : i, fi = ir ? ir.valueOf : i, aa = ir ? ir.toString : i;
        function l(e) {
          if (fe(e) && !z(e) && !(e instanceof H)) {
            if (e instanceof ut)
              return e;
            if (K.call(e, "__wrapped__"))
              return ll(e);
          }
          return new ut(e);
        }
        var Zn = /* @__PURE__ */ function() {
          function e() {
          }
          return function(t) {
            if (!le(t))
              return {};
            if (na)
              return na(t);
            e.prototype = t;
            var n = new e();
            return e.prototype = i, n;
          };
        }();
        function rr() {
        }
        function ut(e, t) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
        }
        l.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: _o,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: Nr,
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
        }, l.prototype = rr.prototype, l.prototype.constructor = l, ut.prototype = Zn(rr.prototype), ut.prototype.constructor = ut;
        function H(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = we, this.__views__ = [];
        }
        function Vc() {
          var e = new H(this.__wrapped__);
          return e.__actions__ = He(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = He(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = He(this.__views__), e;
        }
        function qc() {
          if (this.__filtered__) {
            var e = new H(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else
            e = this.clone(), e.__dir__ *= -1;
          return e;
        }
        function Qc() {
          var e = this.__wrapped__.value(), t = this.__dir__, n = z(e), s = t < 0, o = n ? e.length : 0, u = uf(0, o, this.__views__), c = u.start, f = u.end, _ = f - c, y = s ? f : c - 1, E = this.__iteratees__, x = E.length, P = 0, I = De(_, this.__takeCount__);
          if (!n || !s && o == _ && I == _)
            return Da(e, this.__actions__);
          var C = [];
          e:
            for (; _-- && P < I; ) {
              y += t;
              for (var U = -1, k = e[y]; ++U < x; ) {
                var N = E[U], Y = N.iteratee, nt = N.type, Ue = Y(k);
                if (nt == Se)
                  k = Ue;
                else if (!Ue) {
                  if (nt == Be)
                    continue e;
                  break e;
                }
              }
              C[P++] = k;
            }
          return C;
        }
        H.prototype = Zn(rr.prototype), H.prototype.constructor = H;
        function wn(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function Kc() {
          this.__data__ = hi ? hi(null) : {}, this.size = 0;
        }
        function $c(e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }
        function Jc(e) {
          var t = this.__data__;
          if (hi) {
            var n = t[e];
            return n === M ? i : n;
          }
          return K.call(t, e) ? t[e] : i;
        }
        function eh(e) {
          var t = this.__data__;
          return hi ? t[e] !== i : K.call(t, e);
        }
        function th(e, t) {
          var n = this.__data__;
          return this.size += this.has(e) ? 0 : 1, n[e] = hi && t === i ? M : t, this;
        }
        wn.prototype.clear = Kc, wn.prototype.delete = $c, wn.prototype.get = Jc, wn.prototype.has = eh, wn.prototype.set = th;
        function kt(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function nh() {
          this.__data__ = [], this.size = 0;
        }
        function ih(e) {
          var t = this.__data__, n = sr(t, e);
          if (n < 0)
            return !1;
          var s = t.length - 1;
          return n == s ? t.pop() : $i.call(t, n, 1), --this.size, !0;
        }
        function rh(e) {
          var t = this.__data__, n = sr(t, e);
          return n < 0 ? i : t[n][1];
        }
        function sh(e) {
          return sr(this.__data__, e) > -1;
        }
        function oh(e, t) {
          var n = this.__data__, s = sr(n, e);
          return s < 0 ? (++this.size, n.push([e, t])) : n[s][1] = t, this;
        }
        kt.prototype.clear = nh, kt.prototype.delete = ih, kt.prototype.get = rh, kt.prototype.has = sh, kt.prototype.set = oh;
        function Bt(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function ah() {
          this.size = 0, this.__data__ = {
            hash: new wn(),
            map: new (ui || kt)(),
            string: new wn()
          };
        }
        function lh(e) {
          var t = mr(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }
        function uh(e) {
          return mr(this, e).get(e);
        }
        function ch(e) {
          return mr(this, e).has(e);
        }
        function hh(e, t) {
          var n = mr(this, e), s = n.size;
          return n.set(e, t), this.size += n.size == s ? 0 : 1, this;
        }
        Bt.prototype.clear = ah, Bt.prototype.delete = lh, Bt.prototype.get = uh, Bt.prototype.has = ch, Bt.prototype.set = hh;
        function yn(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.__data__ = new Bt(); ++t < n; )
            this.add(e[t]);
        }
        function fh(e) {
          return this.__data__.set(e, M), this;
        }
        function dh(e) {
          return this.__data__.has(e);
        }
        yn.prototype.add = yn.prototype.push = fh, yn.prototype.has = dh;
        function wt(e) {
          var t = this.__data__ = new kt(e);
          this.size = t.size;
        }
        function ph() {
          this.__data__ = new kt(), this.size = 0;
        }
        function gh(e) {
          var t = this.__data__, n = t.delete(e);
          return this.size = t.size, n;
        }
        function _h(e) {
          return this.__data__.get(e);
        }
        function mh(e) {
          return this.__data__.has(e);
        }
        function bh(e, t) {
          var n = this.__data__;
          if (n instanceof kt) {
            var s = n.__data__;
            if (!ui || s.length < h - 1)
              return s.push([e, t]), this.size = ++n.size, this;
            n = this.__data__ = new Bt(s);
          }
          return n.set(e, t), this.size = n.size, this;
        }
        wt.prototype.clear = ph, wt.prototype.delete = gh, wt.prototype.get = _h, wt.prototype.has = mh, wt.prototype.set = bh;
        function la(e, t) {
          var n = z(e), s = !n && An(e), o = !n && !s && cn(e), u = !n && !s && !o && Qn(e), c = n || s || o || u, f = c ? ns(e.length, Rc) : [], _ = f.length;
          for (var y in e)
            (t || K.call(e, y)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
            (y == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            o && (y == "offset" || y == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            u && (y == "buffer" || y == "byteLength" || y == "byteOffset") || // Skip index properties.
            Ft(y, _))) && f.push(y);
          return f;
        }
        function ua(e) {
          var t = e.length;
          return t ? e[vs(0, t - 1)] : i;
        }
        function vh(e, t) {
          return br(He(e), En(t, 0, e.length));
        }
        function wh(e) {
          return br(He(e));
        }
        function us(e, t, n) {
          (n !== i && !yt(e[t], n) || n === i && !(t in e)) && zt(e, t, n);
        }
        function di(e, t, n) {
          var s = e[t];
          (!(K.call(e, t) && yt(s, n)) || n === i && !(t in e)) && zt(e, t, n);
        }
        function sr(e, t) {
          for (var n = e.length; n--; )
            if (yt(e[n][0], t))
              return n;
          return -1;
        }
        function yh(e, t, n, s) {
          return on(e, function(o, u, c) {
            t(s, o, n(o), c);
          }), s;
        }
        function ca(e, t) {
          return e && Rt(t, Ee(t), e);
        }
        function Eh(e, t) {
          return e && Rt(t, Xe(t), e);
        }
        function zt(e, t, n) {
          t == "__proto__" && Ji ? Ji(e, t, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : e[t] = n;
        }
        function cs(e, t) {
          for (var n = -1, s = t.length, o = m(s), u = e == null; ++n < s; )
            o[n] = u ? i : Ys(e, t[n]);
          return o;
        }
        function En(e, t, n) {
          return e === e && (n !== i && (e = e <= n ? e : n), t !== i && (e = e >= t ? e : t)), e;
        }
        function ct(e, t, n, s, o, u) {
          var c, f = t & ce, _ = t & Re, y = t & Le;
          if (n && (c = o ? n(e, s, o, u) : n(e)), c !== i)
            return c;
          if (!le(e))
            return e;
          var E = z(e);
          if (E) {
            if (c = hf(e), !f)
              return He(e, c);
          } else {
            var x = Oe(e), P = x == Mn || x == Di;
            if (cn(e))
              return Ca(e, f);
            if (x == _t || x == Qt || P && !o) {
              if (c = _ || P ? {} : Ja(e), !f)
                return _ ? Jh(e, Eh(c, e)) : $h(e, ca(c, e));
            } else {
              if (!ne[x])
                return o ? e : {};
              c = ff(e, x, f);
            }
          }
          u || (u = new wt());
          var I = u.get(e);
          if (I)
            return I;
          u.set(e, c), Rl(e) ? e.forEach(function(k) {
            c.add(ct(k, t, n, k, e, u));
          }) : Al(e) && e.forEach(function(k, N) {
            c.set(N, ct(k, t, n, N, e, u));
          });
          var C = y ? _ ? Is : Ls : _ ? Xe : Ee, U = E ? i : C(e);
          return at(U || e, function(k, N) {
            U && (N = k, k = e[N]), di(c, N, ct(k, t, n, N, e, u));
          }), c;
        }
        function xh(e) {
          var t = Ee(e);
          return function(n) {
            return ha(n, e, t);
          };
        }
        function ha(e, t, n) {
          var s = n.length;
          if (e == null)
            return !s;
          for (e = J(e); s--; ) {
            var o = n[s], u = t[o], c = e[o];
            if (c === i && !(o in e) || !u(c))
              return !1;
          }
          return !0;
        }
        function fa(e, t, n) {
          if (typeof e != "function")
            throw new lt(p);
          return wi(function() {
            e.apply(i, n);
          }, t);
        }
        function pi(e, t, n, s) {
          var o = -1, u = Ni, c = !0, f = e.length, _ = [], y = t.length;
          if (!f)
            return _;
          n && (t = oe(t, Je(n))), s ? (u = Qr, c = !1) : t.length >= h && (u = ai, c = !1, t = new yn(t));
          e:
            for (; ++o < f; ) {
              var E = e[o], x = n == null ? E : n(E);
              if (E = s || E !== 0 ? E : 0, c && x === x) {
                for (var P = y; P--; )
                  if (t[P] === x)
                    continue e;
                _.push(E);
              } else u(t, x, s) || _.push(E);
            }
          return _;
        }
        var on = Ua(Tt), da = Ua(fs, !0);
        function Sh(e, t) {
          var n = !0;
          return on(e, function(s, o, u) {
            return n = !!t(s, o, u), n;
          }), n;
        }
        function or(e, t, n) {
          for (var s = -1, o = e.length; ++s < o; ) {
            var u = e[s], c = t(u);
            if (c != null && (f === i ? c === c && !tt(c) : n(c, f)))
              var f = c, _ = u;
          }
          return _;
        }
        function Ph(e, t, n, s) {
          var o = e.length;
          for (n = G(n), n < 0 && (n = -n > o ? 0 : o + n), s = s === i || s > o ? o : G(s), s < 0 && (s += o), s = n > s ? 0 : Il(s); n < s; )
            e[n++] = t;
          return e;
        }
        function pa(e, t) {
          var n = [];
          return on(e, function(s, o, u) {
            t(s, o, u) && n.push(s);
          }), n;
        }
        function Te(e, t, n, s, o) {
          var u = -1, c = e.length;
          for (n || (n = pf), o || (o = []); ++u < c; ) {
            var f = e[u];
            t > 0 && n(f) ? t > 1 ? Te(f, t - 1, n, s, o) : nn(o, f) : s || (o[o.length] = f);
          }
          return o;
        }
        var hs = Fa(), ga = Fa(!0);
        function Tt(e, t) {
          return e && hs(e, t, Ee);
        }
        function fs(e, t) {
          return e && ga(e, t, Ee);
        }
        function ar(e, t) {
          return tn(t, function(n) {
            return Wt(e[n]);
          });
        }
        function xn(e, t) {
          t = ln(t, e);
          for (var n = 0, s = t.length; e != null && n < s; )
            e = e[Lt(t[n++])];
          return n && n == s ? e : i;
        }
        function _a(e, t, n) {
          var s = t(e);
          return z(e) ? s : nn(s, n(e));
        }
        function ze(e) {
          return e == null ? e === i ? ki : Oi : vn && vn in J(e) ? lf(e) : yf(e);
        }
        function ds(e, t) {
          return e > t;
        }
        function Ah(e, t) {
          return e != null && K.call(e, t);
        }
        function Th(e, t) {
          return e != null && t in J(e);
        }
        function Rh(e, t, n) {
          return e >= De(t, n) && e < ve(t, n);
        }
        function ps(e, t, n) {
          for (var s = n ? Qr : Ni, o = e[0].length, u = e.length, c = u, f = m(u), _ = 1 / 0, y = []; c--; ) {
            var E = e[c];
            c && t && (E = oe(E, Je(t))), _ = De(E.length, _), f[c] = !n && (t || o >= 120 && E.length >= 120) ? new yn(c && E) : i;
          }
          E = e[0];
          var x = -1, P = f[0];
          e:
            for (; ++x < o && y.length < _; ) {
              var I = E[x], C = t ? t(I) : I;
              if (I = n || I !== 0 ? I : 0, !(P ? ai(P, C) : s(y, C, n))) {
                for (c = u; --c; ) {
                  var U = f[c];
                  if (!(U ? ai(U, C) : s(e[c], C, n)))
                    continue e;
                }
                P && P.push(C), y.push(I);
              }
            }
          return y;
        }
        function Lh(e, t, n, s) {
          return Tt(e, function(o, u, c) {
            t(s, n(o), u, c);
          }), s;
        }
        function gi(e, t, n) {
          t = ln(t, e), e = il(e, t);
          var s = e == null ? e : e[Lt(ft(t))];
          return s == null ? i : $e(s, e, n);
        }
        function ma(e) {
          return fe(e) && ze(e) == Qt;
        }
        function Ih(e) {
          return fe(e) && ze(e) == Jt;
        }
        function Dh(e) {
          return fe(e) && ze(e) == Kt;
        }
        function _i(e, t, n, s, o) {
          return e === t ? !0 : e == null || t == null || !fe(e) && !fe(t) ? e !== e && t !== t : Oh(e, t, n, s, _i, o);
        }
        function Oh(e, t, n, s, o, u) {
          var c = z(e), f = z(t), _ = c ? On : Oe(e), y = f ? On : Oe(t);
          _ = _ == Qt ? _t : _, y = y == Qt ? _t : y;
          var E = _ == _t, x = y == _t, P = _ == y;
          if (P && cn(e)) {
            if (!cn(t))
              return !1;
            c = !0, E = !1;
          }
          if (P && !E)
            return u || (u = new wt()), c || Qn(e) ? Qa(e, t, n, s, o, u) : of(e, t, _, n, s, o, u);
          if (!(n & me)) {
            var I = E && K.call(e, "__wrapped__"), C = x && K.call(t, "__wrapped__");
            if (I || C) {
              var U = I ? e.value() : e, k = C ? t.value() : t;
              return u || (u = new wt()), o(U, k, n, s, u);
            }
          }
          return P ? (u || (u = new wt()), af(e, t, n, s, o, u)) : !1;
        }
        function Mh(e) {
          return fe(e) && Oe(e) == We;
        }
        function gs(e, t, n, s) {
          var o = n.length, u = o, c = !s;
          if (e == null)
            return !u;
          for (e = J(e); o--; ) {
            var f = n[o];
            if (c && f[2] ? f[1] !== e[f[0]] : !(f[0] in e))
              return !1;
          }
          for (; ++o < u; ) {
            f = n[o];
            var _ = f[0], y = e[_], E = f[1];
            if (c && f[2]) {
              if (y === i && !(_ in e))
                return !1;
            } else {
              var x = new wt();
              if (s)
                var P = s(y, E, _, e, t, x);
              if (!(P === i ? _i(E, y, me | he, s, x) : P))
                return !1;
            }
          }
          return !0;
        }
        function ba(e) {
          if (!le(e) || _f(e))
            return !1;
          var t = Wt(e) ? Mc : xu;
          return t.test(Pn(e));
        }
        function Ch(e) {
          return fe(e) && ze(e) == Ct;
        }
        function kh(e) {
          return fe(e) && Oe(e) == Pe;
        }
        function Bh(e) {
          return fe(e) && Sr(e.length) && !!re[ze(e)];
        }
        function va(e) {
          return typeof e == "function" ? e : e == null ? Ze : typeof e == "object" ? z(e) ? Ea(e[0], e[1]) : ya(e) : Wl(e);
        }
        function _s(e) {
          if (!vi(e))
            return Uc(e);
          var t = [];
          for (var n in J(e))
            K.call(e, n) && n != "constructor" && t.push(n);
          return t;
        }
        function zh(e) {
          if (!le(e))
            return wf(e);
          var t = vi(e), n = [];
          for (var s in e)
            s == "constructor" && (t || !K.call(e, s)) || n.push(s);
          return n;
        }
        function ms(e, t) {
          return e < t;
        }
        function wa(e, t) {
          var n = -1, s = Ye(e) ? m(e.length) : [];
          return on(e, function(o, u, c) {
            s[++n] = t(o, u, c);
          }), s;
        }
        function ya(e) {
          var t = Os(e);
          return t.length == 1 && t[0][2] ? tl(t[0][0], t[0][1]) : function(n) {
            return n === e || gs(n, e, t);
          };
        }
        function Ea(e, t) {
          return Cs(e) && el(t) ? tl(Lt(e), t) : function(n) {
            var s = Ys(n, e);
            return s === i && s === t ? Xs(n, e) : _i(t, s, me | he);
          };
        }
        function lr(e, t, n, s, o) {
          e !== t && hs(t, function(u, c) {
            if (o || (o = new wt()), le(u))
              Gh(e, t, c, n, lr, s, o);
            else {
              var f = s ? s(Bs(e, c), u, c + "", e, t, o) : i;
              f === i && (f = u), us(e, c, f);
            }
          }, Xe);
        }
        function Gh(e, t, n, s, o, u, c) {
          var f = Bs(e, n), _ = Bs(t, n), y = c.get(_);
          if (y) {
            us(e, n, y);
            return;
          }
          var E = u ? u(f, _, n + "", e, t, c) : i, x = E === i;
          if (x) {
            var P = z(_), I = !P && cn(_), C = !P && !I && Qn(_);
            E = _, P || I || C ? z(f) ? E = f : de(f) ? E = He(f) : I ? (x = !1, E = Ca(_, !0)) : C ? (x = !1, E = ka(_, !0)) : E = [] : yi(_) || An(_) ? (E = f, An(f) ? E = Dl(f) : (!le(f) || Wt(f)) && (E = Ja(_))) : x = !1;
          }
          x && (c.set(_, E), o(E, _, s, u, c), c.delete(_)), us(e, n, E);
        }
        function xa(e, t) {
          var n = e.length;
          if (n)
            return t += t < 0 ? n : 0, Ft(t, n) ? e[t] : i;
        }
        function Sa(e, t, n) {
          t.length ? t = oe(t, function(u) {
            return z(u) ? function(c) {
              return xn(c, u.length === 1 ? u[0] : u);
            } : u;
          }) : t = [Ze];
          var s = -1;
          t = oe(t, Je(O()));
          var o = wa(e, function(u, c, f) {
            var _ = oe(t, function(y) {
              return y(u);
            });
            return { criteria: _, index: ++s, value: u };
          });
          return hc(o, function(u, c) {
            return Kh(u, c, n);
          });
        }
        function Uh(e, t) {
          return Pa(e, t, function(n, s) {
            return Xs(e, s);
          });
        }
        function Pa(e, t, n) {
          for (var s = -1, o = t.length, u = {}; ++s < o; ) {
            var c = t[s], f = xn(e, c);
            n(f, c) && mi(u, ln(c, e), f);
          }
          return u;
        }
        function Fh(e) {
          return function(t) {
            return xn(t, e);
          };
        }
        function bs(e, t, n, s) {
          var o = s ? cc : Un, u = -1, c = t.length, f = e;
          for (e === t && (t = He(t)), n && (f = oe(e, Je(n))); ++u < c; )
            for (var _ = 0, y = t[u], E = n ? n(y) : y; (_ = o(f, E, _, s)) > -1; )
              f !== e && $i.call(f, _, 1), $i.call(e, _, 1);
          return e;
        }
        function Aa(e, t) {
          for (var n = e ? t.length : 0, s = n - 1; n--; ) {
            var o = t[n];
            if (n == s || o !== u) {
              var u = o;
              Ft(o) ? $i.call(e, o, 1) : Es(e, o);
            }
          }
          return e;
        }
        function vs(e, t) {
          return e + tr(oa() * (t - e + 1));
        }
        function Wh(e, t, n, s) {
          for (var o = -1, u = ve(er((t - e) / (n || 1)), 0), c = m(u); u--; )
            c[s ? u : ++o] = e, e += n;
          return c;
        }
        function ws(e, t) {
          var n = "";
          if (!e || t < 1 || t > Ie)
            return n;
          do
            t % 2 && (n += e), t = tr(t / 2), t && (e += e);
          while (t);
          return n;
        }
        function F(e, t) {
          return zs(nl(e, t, Ze), e + "");
        }
        function Nh(e) {
          return ua(Kn(e));
        }
        function Hh(e, t) {
          var n = Kn(e);
          return br(n, En(t, 0, n.length));
        }
        function mi(e, t, n, s) {
          if (!le(e))
            return e;
          t = ln(t, e);
          for (var o = -1, u = t.length, c = u - 1, f = e; f != null && ++o < u; ) {
            var _ = Lt(t[o]), y = n;
            if (_ === "__proto__" || _ === "constructor" || _ === "prototype")
              return e;
            if (o != c) {
              var E = f[_];
              y = s ? s(E, _, f) : i, y === i && (y = le(E) ? E : Ft(t[o + 1]) ? [] : {});
            }
            di(f, _, y), f = f[_];
          }
          return e;
        }
        var Ta = nr ? function(e, t) {
          return nr.set(e, t), e;
        } : Ze, Yh = Ji ? function(e, t) {
          return Ji(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: js(t),
            writable: !0
          });
        } : Ze;
        function Xh(e) {
          return br(Kn(e));
        }
        function ht(e, t, n) {
          var s = -1, o = e.length;
          t < 0 && (t = -t > o ? 0 : o + t), n = n > o ? o : n, n < 0 && (n += o), o = t > n ? 0 : n - t >>> 0, t >>>= 0;
          for (var u = m(o); ++s < o; )
            u[s] = e[s + t];
          return u;
        }
        function Zh(e, t) {
          var n;
          return on(e, function(s, o, u) {
            return n = t(s, o, u), !n;
          }), !!n;
        }
        function ur(e, t, n) {
          var s = 0, o = e == null ? s : e.length;
          if (typeof t == "number" && t === t && o <= In) {
            for (; s < o; ) {
              var u = s + o >>> 1, c = e[u];
              c !== null && !tt(c) && (n ? c <= t : c < t) ? s = u + 1 : o = u;
            }
            return o;
          }
          return ys(e, t, Ze, n);
        }
        function ys(e, t, n, s) {
          var o = 0, u = e == null ? 0 : e.length;
          if (u === 0)
            return 0;
          t = n(t);
          for (var c = t !== t, f = t === null, _ = tt(t), y = t === i; o < u; ) {
            var E = tr((o + u) / 2), x = n(e[E]), P = x !== i, I = x === null, C = x === x, U = tt(x);
            if (c)
              var k = s || C;
            else y ? k = C && (s || P) : f ? k = C && P && (s || !I) : _ ? k = C && P && !I && (s || !U) : I || U ? k = !1 : k = s ? x <= t : x < t;
            k ? o = E + 1 : u = E;
          }
          return De(u, qt);
        }
        function Ra(e, t) {
          for (var n = -1, s = e.length, o = 0, u = []; ++n < s; ) {
            var c = e[n], f = t ? t(c) : c;
            if (!n || !yt(f, _)) {
              var _ = f;
              u[o++] = c === 0 ? 0 : c;
            }
          }
          return u;
        }
        function La(e) {
          return typeof e == "number" ? e : tt(e) ? Qe : +e;
        }
        function et(e) {
          if (typeof e == "string")
            return e;
          if (z(e))
            return oe(e, et) + "";
          if (tt(e))
            return aa ? aa.call(e) : "";
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function an(e, t, n) {
          var s = -1, o = Ni, u = e.length, c = !0, f = [], _ = f;
          if (n)
            c = !1, o = Qr;
          else if (u >= h) {
            var y = t ? null : rf(e);
            if (y)
              return Yi(y);
            c = !1, o = ai, _ = new yn();
          } else
            _ = t ? [] : f;
          e:
            for (; ++s < u; ) {
              var E = e[s], x = t ? t(E) : E;
              if (E = n || E !== 0 ? E : 0, c && x === x) {
                for (var P = _.length; P--; )
                  if (_[P] === x)
                    continue e;
                t && _.push(x), f.push(E);
              } else o(_, x, n) || (_ !== f && _.push(x), f.push(E));
            }
          return f;
        }
        function Es(e, t) {
          return t = ln(t, e), e = il(e, t), e == null || delete e[Lt(ft(t))];
        }
        function Ia(e, t, n, s) {
          return mi(e, t, n(xn(e, t)), s);
        }
        function cr(e, t, n, s) {
          for (var o = e.length, u = s ? o : -1; (s ? u-- : ++u < o) && t(e[u], u, e); )
            ;
          return n ? ht(e, s ? 0 : u, s ? u + 1 : o) : ht(e, s ? u + 1 : 0, s ? o : u);
        }
        function Da(e, t) {
          var n = e;
          return n instanceof H && (n = n.value()), Kr(t, function(s, o) {
            return o.func.apply(o.thisArg, nn([s], o.args));
          }, n);
        }
        function xs(e, t, n) {
          var s = e.length;
          if (s < 2)
            return s ? an(e[0]) : [];
          for (var o = -1, u = m(s); ++o < s; )
            for (var c = e[o], f = -1; ++f < s; )
              f != o && (u[o] = pi(u[o] || c, e[f], t, n));
          return an(Te(u, 1), t, n);
        }
        function Oa(e, t, n) {
          for (var s = -1, o = e.length, u = t.length, c = {}; ++s < o; ) {
            var f = s < u ? t[s] : i;
            n(c, e[s], f);
          }
          return c;
        }
        function Ss(e) {
          return de(e) ? e : [];
        }
        function Ps(e) {
          return typeof e == "function" ? e : Ze;
        }
        function ln(e, t) {
          return z(e) ? e : Cs(e, t) ? [e] : al(j(e));
        }
        var jh = F;
        function un(e, t, n) {
          var s = e.length;
          return n = n === i ? s : n, !t && n >= s ? e : ht(e, t, n);
        }
        var Ma = Cc || function(e) {
          return Ae.clearTimeout(e);
        };
        function Ca(e, t) {
          if (t)
            return e.slice();
          var n = e.length, s = ta ? ta(n) : new e.constructor(n);
          return e.copy(s), s;
        }
        function As(e) {
          var t = new e.constructor(e.byteLength);
          return new Qi(t).set(new Qi(e)), t;
        }
        function Vh(e, t) {
          var n = t ? As(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.byteLength);
        }
        function qh(e) {
          var t = new e.constructor(e.source, mo.exec(e));
          return t.lastIndex = e.lastIndex, t;
        }
        function Qh(e) {
          return fi ? J(fi.call(e)) : {};
        }
        function ka(e, t) {
          var n = t ? As(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        }
        function Ba(e, t) {
          if (e !== t) {
            var n = e !== i, s = e === null, o = e === e, u = tt(e), c = t !== i, f = t === null, _ = t === t, y = tt(t);
            if (!f && !y && !u && e > t || u && c && _ && !f && !y || s && c && _ || !n && _ || !o)
              return 1;
            if (!s && !u && !y && e < t || y && n && o && !s && !u || f && n && o || !c && o || !_)
              return -1;
          }
          return 0;
        }
        function Kh(e, t, n) {
          for (var s = -1, o = e.criteria, u = t.criteria, c = o.length, f = n.length; ++s < c; ) {
            var _ = Ba(o[s], u[s]);
            if (_) {
              if (s >= f)
                return _;
              var y = n[s];
              return _ * (y == "desc" ? -1 : 1);
            }
          }
          return e.index - t.index;
        }
        function za(e, t, n, s) {
          for (var o = -1, u = e.length, c = n.length, f = -1, _ = t.length, y = ve(u - c, 0), E = m(_ + y), x = !s; ++f < _; )
            E[f] = t[f];
          for (; ++o < c; )
            (x || o < u) && (E[n[o]] = e[o]);
          for (; y--; )
            E[f++] = e[o++];
          return E;
        }
        function Ga(e, t, n, s) {
          for (var o = -1, u = e.length, c = -1, f = n.length, _ = -1, y = t.length, E = ve(u - f, 0), x = m(E + y), P = !s; ++o < E; )
            x[o] = e[o];
          for (var I = o; ++_ < y; )
            x[I + _] = t[_];
          for (; ++c < f; )
            (P || o < u) && (x[I + n[c]] = e[o++]);
          return x;
        }
        function He(e, t) {
          var n = -1, s = e.length;
          for (t || (t = m(s)); ++n < s; )
            t[n] = e[n];
          return t;
        }
        function Rt(e, t, n, s) {
          var o = !n;
          n || (n = {});
          for (var u = -1, c = t.length; ++u < c; ) {
            var f = t[u], _ = s ? s(n[f], e[f], f, n, e) : i;
            _ === i && (_ = e[f]), o ? zt(n, f, _) : di(n, f, _);
          }
          return n;
        }
        function $h(e, t) {
          return Rt(e, Ms(e), t);
        }
        function Jh(e, t) {
          return Rt(e, Ka(e), t);
        }
        function hr(e, t) {
          return function(n, s) {
            var o = z(n) ? rc : yh, u = t ? t() : {};
            return o(n, e, O(s, 2), u);
          };
        }
        function jn(e) {
          return F(function(t, n) {
            var s = -1, o = n.length, u = o > 1 ? n[o - 1] : i, c = o > 2 ? n[2] : i;
            for (u = e.length > 3 && typeof u == "function" ? (o--, u) : i, c && Ge(n[0], n[1], c) && (u = o < 3 ? i : u, o = 1), t = J(t); ++s < o; ) {
              var f = n[s];
              f && e(t, f, s, u);
            }
            return t;
          });
        }
        function Ua(e, t) {
          return function(n, s) {
            if (n == null)
              return n;
            if (!Ye(n))
              return e(n, s);
            for (var o = n.length, u = t ? o : -1, c = J(n); (t ? u-- : ++u < o) && s(c[u], u, c) !== !1; )
              ;
            return n;
          };
        }
        function Fa(e) {
          return function(t, n, s) {
            for (var o = -1, u = J(t), c = s(t), f = c.length; f--; ) {
              var _ = c[e ? f : ++o];
              if (n(u[_], _, u) === !1)
                break;
            }
            return t;
          };
        }
        function ef(e, t, n) {
          var s = t & $, o = bi(e);
          function u() {
            var c = this && this !== Ae && this instanceof u ? o : e;
            return c.apply(s ? n : this, arguments);
          }
          return u;
        }
        function Wa(e) {
          return function(t) {
            t = j(t);
            var n = Fn(t) ? vt(t) : i, s = n ? n[0] : t.charAt(0), o = n ? un(n, 1).join("") : t.slice(1);
            return s[e]() + o;
          };
        }
        function Vn(e) {
          return function(t) {
            return Kr(Ul(Gl(t).replace(Yu, "")), e, "");
          };
        }
        function bi(e) {
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
            var n = Zn(e.prototype), s = e.apply(n, t);
            return le(s) ? s : n;
          };
        }
        function tf(e, t, n) {
          var s = bi(e);
          function o() {
            for (var u = arguments.length, c = m(u), f = u, _ = qn(o); f--; )
              c[f] = arguments[f];
            var y = u < 3 && c[0] !== _ && c[u - 1] !== _ ? [] : rn(c, _);
            if (u -= y.length, u < n)
              return Za(
                e,
                t,
                fr,
                o.placeholder,
                i,
                c,
                y,
                i,
                i,
                n - u
              );
            var E = this && this !== Ae && this instanceof o ? s : e;
            return $e(E, this, c);
          }
          return o;
        }
        function Na(e) {
          return function(t, n, s) {
            var o = J(t);
            if (!Ye(t)) {
              var u = O(n, 3);
              t = Ee(t), n = function(f) {
                return u(o[f], f, o);
              };
            }
            var c = e(t, n, s);
            return c > -1 ? o[u ? t[c] : c] : i;
          };
        }
        function Ha(e) {
          return Ut(function(t) {
            var n = t.length, s = n, o = ut.prototype.thru;
            for (e && t.reverse(); s--; ) {
              var u = t[s];
              if (typeof u != "function")
                throw new lt(p);
              if (o && !c && _r(u) == "wrapper")
                var c = new ut([], !0);
            }
            for (s = c ? s : n; ++s < n; ) {
              u = t[s];
              var f = _r(u), _ = f == "wrapper" ? Ds(u) : i;
              _ && ks(_[0]) && _[1] == (q | V | te | Ve) && !_[4].length && _[9] == 1 ? c = c[_r(_[0])].apply(c, _[3]) : c = u.length == 1 && ks(u) ? c[f]() : c.thru(u);
            }
            return function() {
              var y = arguments, E = y[0];
              if (c && y.length == 1 && z(E))
                return c.plant(E).value();
              for (var x = 0, P = n ? t[x].apply(this, y) : E; ++x < n; )
                P = t[x].call(this, P);
              return P;
            };
          });
        }
        function fr(e, t, n, s, o, u, c, f, _, y) {
          var E = t & q, x = t & $, P = t & se, I = t & (V | ke), C = t & Ot, U = P ? i : bi(e);
          function k() {
            for (var N = arguments.length, Y = m(N), nt = N; nt--; )
              Y[nt] = arguments[nt];
            if (I)
              var Ue = qn(k), it = dc(Y, Ue);
            if (s && (Y = za(Y, s, o, I)), u && (Y = Ga(Y, u, c, I)), N -= it, I && N < y) {
              var pe = rn(Y, Ue);
              return Za(
                e,
                t,
                fr,
                k.placeholder,
                n,
                Y,
                pe,
                f,
                _,
                y - N
              );
            }
            var Et = x ? n : this, Ht = P ? Et[e] : e;
            return N = Y.length, f ? Y = Ef(Y, f) : C && N > 1 && Y.reverse(), E && _ < N && (Y.length = _), this && this !== Ae && this instanceof k && (Ht = U || bi(Ht)), Ht.apply(Et, Y);
          }
          return k;
        }
        function Ya(e, t) {
          return function(n, s) {
            return Lh(n, e, t(s), {});
          };
        }
        function dr(e, t) {
          return function(n, s) {
            var o;
            if (n === i && s === i)
              return t;
            if (n !== i && (o = n), s !== i) {
              if (o === i)
                return s;
              typeof n == "string" || typeof s == "string" ? (n = et(n), s = et(s)) : (n = La(n), s = La(s)), o = e(n, s);
            }
            return o;
          };
        }
        function Ts(e) {
          return Ut(function(t) {
            return t = oe(t, Je(O())), F(function(n) {
              var s = this;
              return e(t, function(o) {
                return $e(o, s, n);
              });
            });
          });
        }
        function pr(e, t) {
          t = t === i ? " " : et(t);
          var n = t.length;
          if (n < 2)
            return n ? ws(t, e) : t;
          var s = ws(t, er(e / Wn(t)));
          return Fn(t) ? un(vt(s), 0, e).join("") : s.slice(0, e);
        }
        function nf(e, t, n, s) {
          var o = t & $, u = bi(e);
          function c() {
            for (var f = -1, _ = arguments.length, y = -1, E = s.length, x = m(E + _), P = this && this !== Ae && this instanceof c ? u : e; ++y < E; )
              x[y] = s[y];
            for (; _--; )
              x[y++] = arguments[++f];
            return $e(P, o ? n : this, x);
          }
          return c;
        }
        function Xa(e) {
          return function(t, n, s) {
            return s && typeof s != "number" && Ge(t, n, s) && (n = s = i), t = Nt(t), n === i ? (n = t, t = 0) : n = Nt(n), s = s === i ? t < n ? 1 : -1 : Nt(s), Wh(t, n, s, e);
          };
        }
        function gr(e) {
          return function(t, n) {
            return typeof t == "string" && typeof n == "string" || (t = dt(t), n = dt(n)), e(t, n);
          };
        }
        function Za(e, t, n, s, o, u, c, f, _, y) {
          var E = t & V, x = E ? c : i, P = E ? i : c, I = E ? u : i, C = E ? i : u;
          t |= E ? te : st, t &= ~(E ? st : te), t & ie || (t &= -4);
          var U = [
            e,
            t,
            o,
            I,
            x,
            C,
            P,
            f,
            _,
            y
          ], k = n.apply(i, U);
          return ks(e) && rl(k, U), k.placeholder = s, sl(k, e, t);
        }
        function Rs(e) {
          var t = be[e];
          return function(n, s) {
            if (n = dt(n), s = s == null ? 0 : De(G(s), 292), s && sa(n)) {
              var o = (j(n) + "e").split("e"), u = t(o[0] + "e" + (+o[1] + s));
              return o = (j(u) + "e").split("e"), +(o[0] + "e" + (+o[1] - s));
            }
            return t(n);
          };
        }
        var rf = Yn && 1 / Yi(new Yn([, -0]))[1] == ge ? function(e) {
          return new Yn(e);
        } : Qs;
        function ja(e) {
          return function(t) {
            var n = Oe(t);
            return n == We ? rs(t) : n == Pe ? wc(t) : fc(t, e(t));
          };
        }
        function Gt(e, t, n, s, o, u, c, f) {
          var _ = t & se;
          if (!_ && typeof e != "function")
            throw new lt(p);
          var y = s ? s.length : 0;
          if (y || (t &= -97, s = o = i), c = c === i ? c : ve(G(c), 0), f = f === i ? f : G(f), y -= o ? o.length : 0, t & st) {
            var E = s, x = o;
            s = o = i;
          }
          var P = _ ? i : Ds(e), I = [
            e,
            t,
            n,
            s,
            o,
            E,
            x,
            u,
            c,
            f
          ];
          if (P && vf(I, P), e = I[0], t = I[1], n = I[2], s = I[3], o = I[4], f = I[9] = I[9] === i ? _ ? 0 : e.length : ve(I[9] - y, 0), !f && t & (V | ke) && (t &= -25), !t || t == $)
            var C = ef(e, t, n);
          else t == V || t == ke ? C = tf(e, t, f) : (t == te || t == ($ | te)) && !o.length ? C = nf(e, t, n, s) : C = fr.apply(i, I);
          var U = P ? Ta : rl;
          return sl(U(C, I), e, t);
        }
        function Va(e, t, n, s) {
          return e === i || yt(e, Hn[n]) && !K.call(s, n) ? t : e;
        }
        function qa(e, t, n, s, o, u) {
          return le(e) && le(t) && (u.set(t, e), lr(e, t, i, qa, u), u.delete(t)), e;
        }
        function sf(e) {
          return yi(e) ? i : e;
        }
        function Qa(e, t, n, s, o, u) {
          var c = n & me, f = e.length, _ = t.length;
          if (f != _ && !(c && _ > f))
            return !1;
          var y = u.get(e), E = u.get(t);
          if (y && E)
            return y == t && E == e;
          var x = -1, P = !0, I = n & he ? new yn() : i;
          for (u.set(e, t), u.set(t, e); ++x < f; ) {
            var C = e[x], U = t[x];
            if (s)
              var k = c ? s(U, C, x, t, e, u) : s(C, U, x, e, t, u);
            if (k !== i) {
              if (k)
                continue;
              P = !1;
              break;
            }
            if (I) {
              if (!$r(t, function(N, Y) {
                if (!ai(I, Y) && (C === N || o(C, N, n, s, u)))
                  return I.push(Y);
              })) {
                P = !1;
                break;
              }
            } else if (!(C === U || o(C, U, n, s, u))) {
              P = !1;
              break;
            }
          }
          return u.delete(e), u.delete(t), P;
        }
        function of(e, t, n, s, o, u, c) {
          switch (n) {
            case St:
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                return !1;
              e = e.buffer, t = t.buffer;
            case Jt:
              return !(e.byteLength != t.byteLength || !u(new Qi(e), new Qi(t)));
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
              var f = rs;
            case Pe:
              var _ = s & me;
              if (f || (f = Yi), e.size != t.size && !_)
                return !1;
              var y = c.get(e);
              if (y)
                return y == t;
              s |= he, c.set(e, t);
              var E = Qa(f(e), f(t), s, o, u, c);
              return c.delete(e), E;
            case Cn:
              if (fi)
                return fi.call(e) == fi.call(t);
          }
          return !1;
        }
        function af(e, t, n, s, o, u) {
          var c = n & me, f = Ls(e), _ = f.length, y = Ls(t), E = y.length;
          if (_ != E && !c)
            return !1;
          for (var x = _; x--; ) {
            var P = f[x];
            if (!(c ? P in t : K.call(t, P)))
              return !1;
          }
          var I = u.get(e), C = u.get(t);
          if (I && C)
            return I == t && C == e;
          var U = !0;
          u.set(e, t), u.set(t, e);
          for (var k = c; ++x < _; ) {
            P = f[x];
            var N = e[P], Y = t[P];
            if (s)
              var nt = c ? s(Y, N, P, t, e, u) : s(N, Y, P, e, t, u);
            if (!(nt === i ? N === Y || o(N, Y, n, s, u) : nt)) {
              U = !1;
              break;
            }
            k || (k = P == "constructor");
          }
          if (U && !k) {
            var Ue = e.constructor, it = t.constructor;
            Ue != it && "constructor" in e && "constructor" in t && !(typeof Ue == "function" && Ue instanceof Ue && typeof it == "function" && it instanceof it) && (U = !1);
          }
          return u.delete(e), u.delete(t), U;
        }
        function Ut(e) {
          return zs(nl(e, i, hl), e + "");
        }
        function Ls(e) {
          return _a(e, Ee, Ms);
        }
        function Is(e) {
          return _a(e, Xe, Ka);
        }
        var Ds = nr ? function(e) {
          return nr.get(e);
        } : Qs;
        function _r(e) {
          for (var t = e.name + "", n = Xn[t], s = K.call(Xn, t) ? n.length : 0; s--; ) {
            var o = n[s], u = o.func;
            if (u == null || u == e)
              return o.name;
          }
          return t;
        }
        function qn(e) {
          var t = K.call(l, "placeholder") ? l : e;
          return t.placeholder;
        }
        function O() {
          var e = l.iteratee || Vs;
          return e = e === Vs ? va : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function mr(e, t) {
          var n = e.__data__;
          return gf(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
        }
        function Os(e) {
          for (var t = Ee(e), n = t.length; n--; ) {
            var s = t[n], o = e[s];
            t[n] = [s, o, el(o)];
          }
          return t;
        }
        function Sn(e, t) {
          var n = mc(e, t);
          return ba(n) ? n : i;
        }
        function lf(e) {
          var t = K.call(e, vn), n = e[vn];
          try {
            e[vn] = i;
            var s = !0;
          } catch {
          }
          var o = Vi.call(e);
          return s && (t ? e[vn] = n : delete e[vn]), o;
        }
        var Ms = os ? function(e) {
          return e == null ? [] : (e = J(e), tn(os(e), function(t) {
            return ia.call(e, t);
          }));
        } : Ks, Ka = os ? function(e) {
          for (var t = []; e; )
            nn(t, Ms(e)), e = Ki(e);
          return t;
        } : Ks, Oe = ze;
        (as && Oe(new as(new ArrayBuffer(1))) != St || ui && Oe(new ui()) != We || ls && Oe(ls.resolve()) != Mi || Yn && Oe(new Yn()) != Pe || ci && Oe(new ci()) != gn) && (Oe = function(e) {
          var t = ze(e), n = t == _t ? e.constructor : i, s = n ? Pn(n) : "";
          if (s)
            switch (s) {
              case Hc:
                return St;
              case Yc:
                return We;
              case Xc:
                return Mi;
              case Zc:
                return Pe;
              case jc:
                return gn;
            }
          return t;
        });
        function uf(e, t, n) {
          for (var s = -1, o = n.length; ++s < o; ) {
            var u = n[s], c = u.size;
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
                e = ve(e, t - c);
                break;
            }
          }
          return { start: e, end: t };
        }
        function cf(e) {
          var t = e.match(gu);
          return t ? t[1].split(_u) : [];
        }
        function $a(e, t, n) {
          t = ln(t, e);
          for (var s = -1, o = t.length, u = !1; ++s < o; ) {
            var c = Lt(t[s]);
            if (!(u = e != null && n(e, c)))
              break;
            e = e[c];
          }
          return u || ++s != o ? u : (o = e == null ? 0 : e.length, !!o && Sr(o) && Ft(c, o) && (z(e) || An(e)));
        }
        function hf(e) {
          var t = e.length, n = new e.constructor(t);
          return t && typeof e[0] == "string" && K.call(e, "index") && (n.index = e.index, n.input = e.input), n;
        }
        function Ja(e) {
          return typeof e.constructor == "function" && !vi(e) ? Zn(Ki(e)) : {};
        }
        function ff(e, t, n) {
          var s = e.constructor;
          switch (t) {
            case Jt:
              return As(e);
            case fn:
            case Kt:
              return new s(+e);
            case St:
              return Vh(e, n);
            case kn:
            case ni:
            case Bn:
            case ii:
            case ri:
            case si:
            case zn:
            case Pt:
            case zi:
              return ka(e, n);
            case We:
              return new s();
            case $t:
            case pn:
              return new s(e);
            case Ct:
              return qh(e);
            case Pe:
              return new s();
            case Cn:
              return Qh(e);
          }
        }
        function df(e, t) {
          var n = t.length;
          if (!n)
            return e;
          var s = n - 1;
          return t[s] = (n > 1 ? "& " : "") + t[s], t = t.join(n > 2 ? ", " : " "), e.replace(pu, `{
/* [wrapped with ` + t + `] */
`);
        }
        function pf(e) {
          return z(e) || An(e) || !!(ra && e && e[ra]);
        }
        function Ft(e, t) {
          var n = typeof e;
          return t = t ?? Ie, !!t && (n == "number" || n != "symbol" && Pu.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }
        function Ge(e, t, n) {
          if (!le(n))
            return !1;
          var s = typeof t;
          return (s == "number" ? Ye(n) && Ft(t, n.length) : s == "string" && t in n) ? yt(n[t], e) : !1;
        }
        function Cs(e, t) {
          if (z(e))
            return !1;
          var n = typeof e;
          return n == "number" || n == "symbol" || n == "boolean" || e == null || tt(e) ? !0 : bt.test(e) || !mt.test(e) || t != null && e in J(t);
        }
        function gf(e) {
          var t = typeof e;
          return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
        }
        function ks(e) {
          var t = _r(e), n = l[t];
          if (typeof n != "function" || !(t in H.prototype))
            return !1;
          if (e === n)
            return !0;
          var s = Ds(n);
          return !!s && e === s[0];
        }
        function _f(e) {
          return !!ea && ea in e;
        }
        var mf = Zi ? Wt : $s;
        function vi(e) {
          var t = e && e.constructor, n = typeof t == "function" && t.prototype || Hn;
          return e === n;
        }
        function el(e) {
          return e === e && !le(e);
        }
        function tl(e, t) {
          return function(n) {
            return n == null ? !1 : n[e] === t && (t !== i || e in J(n));
          };
        }
        function bf(e) {
          var t = Er(e, function(s) {
            return n.size === X && n.clear(), s;
          }), n = t.cache;
          return t;
        }
        function vf(e, t) {
          var n = e[1], s = t[1], o = n | s, u = o < ($ | se | q), c = s == q && n == V || s == q && n == Ve && e[7].length <= t[8] || s == (q | Ve) && t[7].length <= t[8] && n == V;
          if (!(u || c))
            return e;
          s & $ && (e[2] = t[2], o |= n & $ ? 0 : ie);
          var f = t[3];
          if (f) {
            var _ = e[3];
            e[3] = _ ? za(_, f, t[4]) : f, e[4] = _ ? rn(e[3], ue) : t[4];
          }
          return f = t[5], f && (_ = e[5], e[5] = _ ? Ga(_, f, t[6]) : f, e[6] = _ ? rn(e[5], ue) : t[6]), f = t[7], f && (e[7] = f), s & q && (e[8] = e[8] == null ? t[8] : De(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = o, e;
        }
        function wf(e) {
          var t = [];
          if (e != null)
            for (var n in J(e))
              t.push(n);
          return t;
        }
        function yf(e) {
          return Vi.call(e);
        }
        function nl(e, t, n) {
          return t = ve(t === i ? e.length - 1 : t, 0), function() {
            for (var s = arguments, o = -1, u = ve(s.length - t, 0), c = m(u); ++o < u; )
              c[o] = s[t + o];
            o = -1;
            for (var f = m(t + 1); ++o < t; )
              f[o] = s[o];
            return f[t] = n(c), $e(e, this, f);
          };
        }
        function il(e, t) {
          return t.length < 2 ? e : xn(e, ht(t, 0, -1));
        }
        function Ef(e, t) {
          for (var n = e.length, s = De(t.length, n), o = He(e); s--; ) {
            var u = t[s];
            e[s] = Ft(u, n) ? o[u] : i;
          }
          return e;
        }
        function Bs(e, t) {
          if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
            return e[t];
        }
        var rl = ol(Ta), wi = Bc || function(e, t) {
          return Ae.setTimeout(e, t);
        }, zs = ol(Yh);
        function sl(e, t, n) {
          var s = t + "";
          return zs(e, df(s, xf(cf(s), n)));
        }
        function ol(e) {
          var t = 0, n = 0;
          return function() {
            var s = Fc(), o = Vt - (s - n);
            if (n = s, o > 0) {
              if (++t >= Mt)
                return arguments[0];
            } else
              t = 0;
            return e.apply(i, arguments);
          };
        }
        function br(e, t) {
          var n = -1, s = e.length, o = s - 1;
          for (t = t === i ? s : t; ++n < t; ) {
            var u = vs(n, o), c = e[u];
            e[u] = e[n], e[n] = c;
          }
          return e.length = t, e;
        }
        var al = bf(function(e) {
          var t = [];
          return e.charCodeAt(0) === 46 && t.push(""), e.replace(_n, function(n, s, o, u) {
            t.push(o ? u.replace(vu, "$1") : s || n);
          }), t;
        });
        function Lt(e) {
          if (typeof e == "string" || tt(e))
            return e;
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function Pn(e) {
          if (e != null) {
            try {
              return ji.call(e);
            } catch {
            }
            try {
              return e + "";
            } catch {
            }
          }
          return "";
        }
        function xf(e, t) {
          return at(Dn, function(n) {
            var s = "_." + n[0];
            t & n[1] && !Ni(e, s) && e.push(s);
          }), e.sort();
        }
        function ll(e) {
          if (e instanceof H)
            return e.clone();
          var t = new ut(e.__wrapped__, e.__chain__);
          return t.__actions__ = He(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
        }
        function Sf(e, t, n) {
          (n ? Ge(e, t, n) : t === i) ? t = 1 : t = ve(G(t), 0);
          var s = e == null ? 0 : e.length;
          if (!s || t < 1)
            return [];
          for (var o = 0, u = 0, c = m(er(s / t)); o < s; )
            c[u++] = ht(e, o, o += t);
          return c;
        }
        function Pf(e) {
          for (var t = -1, n = e == null ? 0 : e.length, s = 0, o = []; ++t < n; ) {
            var u = e[t];
            u && (o[s++] = u);
          }
          return o;
        }
        function Af() {
          var e = arguments.length;
          if (!e)
            return [];
          for (var t = m(e - 1), n = arguments[0], s = e; s--; )
            t[s - 1] = arguments[s];
          return nn(z(n) ? He(n) : [n], Te(t, 1));
        }
        var Tf = F(function(e, t) {
          return de(e) ? pi(e, Te(t, 1, de, !0)) : [];
        }), Rf = F(function(e, t) {
          var n = ft(t);
          return de(n) && (n = i), de(e) ? pi(e, Te(t, 1, de, !0), O(n, 2)) : [];
        }), Lf = F(function(e, t) {
          var n = ft(t);
          return de(n) && (n = i), de(e) ? pi(e, Te(t, 1, de, !0), i, n) : [];
        });
        function If(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (t = n || t === i ? 1 : G(t), ht(e, t < 0 ? 0 : t, s)) : [];
        }
        function Df(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (t = n || t === i ? 1 : G(t), t = s - t, ht(e, 0, t < 0 ? 0 : t)) : [];
        }
        function Of(e, t) {
          return e && e.length ? cr(e, O(t, 3), !0, !0) : [];
        }
        function Mf(e, t) {
          return e && e.length ? cr(e, O(t, 3), !0) : [];
        }
        function Cf(e, t, n, s) {
          var o = e == null ? 0 : e.length;
          return o ? (n && typeof n != "number" && Ge(e, t, n) && (n = 0, s = o), Ph(e, t, n, s)) : [];
        }
        function ul(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = n == null ? 0 : G(n);
          return o < 0 && (o = ve(s + o, 0)), Hi(e, O(t, 3), o);
        }
        function cl(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = s - 1;
          return n !== i && (o = G(n), o = n < 0 ? ve(s + o, 0) : De(o, s - 1)), Hi(e, O(t, 3), o, !0);
        }
        function hl(e) {
          var t = e == null ? 0 : e.length;
          return t ? Te(e, 1) : [];
        }
        function kf(e) {
          var t = e == null ? 0 : e.length;
          return t ? Te(e, ge) : [];
        }
        function Bf(e, t) {
          var n = e == null ? 0 : e.length;
          return n ? (t = t === i ? 1 : G(t), Te(e, t)) : [];
        }
        function zf(e) {
          for (var t = -1, n = e == null ? 0 : e.length, s = {}; ++t < n; ) {
            var o = e[t];
            s[o[0]] = o[1];
          }
          return s;
        }
        function fl(e) {
          return e && e.length ? e[0] : i;
        }
        function Gf(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = n == null ? 0 : G(n);
          return o < 0 && (o = ve(s + o, 0)), Un(e, t, o);
        }
        function Uf(e) {
          var t = e == null ? 0 : e.length;
          return t ? ht(e, 0, -1) : [];
        }
        var Ff = F(function(e) {
          var t = oe(e, Ss);
          return t.length && t[0] === e[0] ? ps(t) : [];
        }), Wf = F(function(e) {
          var t = ft(e), n = oe(e, Ss);
          return t === ft(n) ? t = i : n.pop(), n.length && n[0] === e[0] ? ps(n, O(t, 2)) : [];
        }), Nf = F(function(e) {
          var t = ft(e), n = oe(e, Ss);
          return t = typeof t == "function" ? t : i, t && n.pop(), n.length && n[0] === e[0] ? ps(n, i, t) : [];
        });
        function Hf(e, t) {
          return e == null ? "" : Gc.call(e, t);
        }
        function ft(e) {
          var t = e == null ? 0 : e.length;
          return t ? e[t - 1] : i;
        }
        function Yf(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = s;
          return n !== i && (o = G(n), o = o < 0 ? ve(s + o, 0) : De(o, s - 1)), t === t ? Ec(e, t, o) : Hi(e, Zo, o, !0);
        }
        function Xf(e, t) {
          return e && e.length ? xa(e, G(t)) : i;
        }
        var Zf = F(dl);
        function dl(e, t) {
          return e && e.length && t && t.length ? bs(e, t) : e;
        }
        function jf(e, t, n) {
          return e && e.length && t && t.length ? bs(e, t, O(n, 2)) : e;
        }
        function Vf(e, t, n) {
          return e && e.length && t && t.length ? bs(e, t, i, n) : e;
        }
        var qf = Ut(function(e, t) {
          var n = e == null ? 0 : e.length, s = cs(e, t);
          return Aa(e, oe(t, function(o) {
            return Ft(o, n) ? +o : o;
          }).sort(Ba)), s;
        });
        function Qf(e, t) {
          var n = [];
          if (!(e && e.length))
            return n;
          var s = -1, o = [], u = e.length;
          for (t = O(t, 3); ++s < u; ) {
            var c = e[s];
            t(c, s, e) && (n.push(c), o.push(s));
          }
          return Aa(e, o), n;
        }
        function Gs(e) {
          return e == null ? e : Nc.call(e);
        }
        function Kf(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (n && typeof n != "number" && Ge(e, t, n) ? (t = 0, n = s) : (t = t == null ? 0 : G(t), n = n === i ? s : G(n)), ht(e, t, n)) : [];
        }
        function $f(e, t) {
          return ur(e, t);
        }
        function Jf(e, t, n) {
          return ys(e, t, O(n, 2));
        }
        function ed(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var s = ur(e, t);
            if (s < n && yt(e[s], t))
              return s;
          }
          return -1;
        }
        function td(e, t) {
          return ur(e, t, !0);
        }
        function nd(e, t, n) {
          return ys(e, t, O(n, 2), !0);
        }
        function id(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var s = ur(e, t, !0) - 1;
            if (yt(e[s], t))
              return s;
          }
          return -1;
        }
        function rd(e) {
          return e && e.length ? Ra(e) : [];
        }
        function sd(e, t) {
          return e && e.length ? Ra(e, O(t, 2)) : [];
        }
        function od(e) {
          var t = e == null ? 0 : e.length;
          return t ? ht(e, 1, t) : [];
        }
        function ad(e, t, n) {
          return e && e.length ? (t = n || t === i ? 1 : G(t), ht(e, 0, t < 0 ? 0 : t)) : [];
        }
        function ld(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (t = n || t === i ? 1 : G(t), t = s - t, ht(e, t < 0 ? 0 : t, s)) : [];
        }
        function ud(e, t) {
          return e && e.length ? cr(e, O(t, 3), !1, !0) : [];
        }
        function cd(e, t) {
          return e && e.length ? cr(e, O(t, 3)) : [];
        }
        var hd = F(function(e) {
          return an(Te(e, 1, de, !0));
        }), fd = F(function(e) {
          var t = ft(e);
          return de(t) && (t = i), an(Te(e, 1, de, !0), O(t, 2));
        }), dd = F(function(e) {
          var t = ft(e);
          return t = typeof t == "function" ? t : i, an(Te(e, 1, de, !0), i, t);
        });
        function pd(e) {
          return e && e.length ? an(e) : [];
        }
        function gd(e, t) {
          return e && e.length ? an(e, O(t, 2)) : [];
        }
        function _d(e, t) {
          return t = typeof t == "function" ? t : i, e && e.length ? an(e, i, t) : [];
        }
        function Us(e) {
          if (!(e && e.length))
            return [];
          var t = 0;
          return e = tn(e, function(n) {
            if (de(n))
              return t = ve(n.length, t), !0;
          }), ns(t, function(n) {
            return oe(e, Jr(n));
          });
        }
        function pl(e, t) {
          if (!(e && e.length))
            return [];
          var n = Us(e);
          return t == null ? n : oe(n, function(s) {
            return $e(t, i, s);
          });
        }
        var md = F(function(e, t) {
          return de(e) ? pi(e, t) : [];
        }), bd = F(function(e) {
          return xs(tn(e, de));
        }), vd = F(function(e) {
          var t = ft(e);
          return de(t) && (t = i), xs(tn(e, de), O(t, 2));
        }), wd = F(function(e) {
          var t = ft(e);
          return t = typeof t == "function" ? t : i, xs(tn(e, de), i, t);
        }), yd = F(Us);
        function Ed(e, t) {
          return Oa(e || [], t || [], di);
        }
        function xd(e, t) {
          return Oa(e || [], t || [], mi);
        }
        var Sd = F(function(e) {
          var t = e.length, n = t > 1 ? e[t - 1] : i;
          return n = typeof n == "function" ? (e.pop(), n) : i, pl(e, n);
        });
        function gl(e) {
          var t = l(e);
          return t.__chain__ = !0, t;
        }
        function Pd(e, t) {
          return t(e), e;
        }
        function vr(e, t) {
          return t(e);
        }
        var Ad = Ut(function(e) {
          var t = e.length, n = t ? e[0] : 0, s = this.__wrapped__, o = function(u) {
            return cs(u, e);
          };
          return t > 1 || this.__actions__.length || !(s instanceof H) || !Ft(n) ? this.thru(o) : (s = s.slice(n, +n + (t ? 1 : 0)), s.__actions__.push({
            func: vr,
            args: [o],
            thisArg: i
          }), new ut(s, this.__chain__).thru(function(u) {
            return t && !u.length && u.push(i), u;
          }));
        });
        function Td() {
          return gl(this);
        }
        function Rd() {
          return new ut(this.value(), this.__chain__);
        }
        function Ld() {
          this.__values__ === i && (this.__values__ = Ll(this.value()));
          var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
          return { done: e, value: t };
        }
        function Id() {
          return this;
        }
        function Dd(e) {
          for (var t, n = this; n instanceof rr; ) {
            var s = ll(n);
            s.__index__ = 0, s.__values__ = i, t ? o.__wrapped__ = s : t = s;
            var o = s;
            n = n.__wrapped__;
          }
          return o.__wrapped__ = e, t;
        }
        function Od() {
          var e = this.__wrapped__;
          if (e instanceof H) {
            var t = e;
            return this.__actions__.length && (t = new H(this)), t = t.reverse(), t.__actions__.push({
              func: vr,
              args: [Gs],
              thisArg: i
            }), new ut(t, this.__chain__);
          }
          return this.thru(Gs);
        }
        function Md() {
          return Da(this.__wrapped__, this.__actions__);
        }
        var Cd = hr(function(e, t, n) {
          K.call(e, n) ? ++e[n] : zt(e, n, 1);
        });
        function kd(e, t, n) {
          var s = z(e) ? Yo : Sh;
          return n && Ge(e, t, n) && (t = i), s(e, O(t, 3));
        }
        function Bd(e, t) {
          var n = z(e) ? tn : pa;
          return n(e, O(t, 3));
        }
        var zd = Na(ul), Gd = Na(cl);
        function Ud(e, t) {
          return Te(wr(e, t), 1);
        }
        function Fd(e, t) {
          return Te(wr(e, t), ge);
        }
        function Wd(e, t, n) {
          return n = n === i ? 1 : G(n), Te(wr(e, t), n);
        }
        function _l(e, t) {
          var n = z(e) ? at : on;
          return n(e, O(t, 3));
        }
        function ml(e, t) {
          var n = z(e) ? sc : da;
          return n(e, O(t, 3));
        }
        var Nd = hr(function(e, t, n) {
          K.call(e, n) ? e[n].push(t) : zt(e, n, [t]);
        });
        function Hd(e, t, n, s) {
          e = Ye(e) ? e : Kn(e), n = n && !s ? G(n) : 0;
          var o = e.length;
          return n < 0 && (n = ve(o + n, 0)), Pr(e) ? n <= o && e.indexOf(t, n) > -1 : !!o && Un(e, t, n) > -1;
        }
        var Yd = F(function(e, t, n) {
          var s = -1, o = typeof t == "function", u = Ye(e) ? m(e.length) : [];
          return on(e, function(c) {
            u[++s] = o ? $e(t, c, n) : gi(c, t, n);
          }), u;
        }), Xd = hr(function(e, t, n) {
          zt(e, n, t);
        });
        function wr(e, t) {
          var n = z(e) ? oe : wa;
          return n(e, O(t, 3));
        }
        function Zd(e, t, n, s) {
          return e == null ? [] : (z(t) || (t = t == null ? [] : [t]), n = s ? i : n, z(n) || (n = n == null ? [] : [n]), Sa(e, t, n));
        }
        var jd = hr(function(e, t, n) {
          e[n ? 0 : 1].push(t);
        }, function() {
          return [[], []];
        });
        function Vd(e, t, n) {
          var s = z(e) ? Kr : Vo, o = arguments.length < 3;
          return s(e, O(t, 4), n, o, on);
        }
        function qd(e, t, n) {
          var s = z(e) ? oc : Vo, o = arguments.length < 3;
          return s(e, O(t, 4), n, o, da);
        }
        function Qd(e, t) {
          var n = z(e) ? tn : pa;
          return n(e, xr(O(t, 3)));
        }
        function Kd(e) {
          var t = z(e) ? ua : Nh;
          return t(e);
        }
        function $d(e, t, n) {
          (n ? Ge(e, t, n) : t === i) ? t = 1 : t = G(t);
          var s = z(e) ? vh : Hh;
          return s(e, t);
        }
        function Jd(e) {
          var t = z(e) ? wh : Xh;
          return t(e);
        }
        function ep(e) {
          if (e == null)
            return 0;
          if (Ye(e))
            return Pr(e) ? Wn(e) : e.length;
          var t = Oe(e);
          return t == We || t == Pe ? e.size : _s(e).length;
        }
        function tp(e, t, n) {
          var s = z(e) ? $r : Zh;
          return n && Ge(e, t, n) && (t = i), s(e, O(t, 3));
        }
        var np = F(function(e, t) {
          if (e == null)
            return [];
          var n = t.length;
          return n > 1 && Ge(e, t[0], t[1]) ? t = [] : n > 2 && Ge(t[0], t[1], t[2]) && (t = [t[0]]), Sa(e, Te(t, 1), []);
        }), yr = kc || function() {
          return Ae.Date.now();
        };
        function ip(e, t) {
          if (typeof t != "function")
            throw new lt(p);
          return e = G(e), function() {
            if (--e < 1)
              return t.apply(this, arguments);
          };
        }
        function bl(e, t, n) {
          return t = n ? i : t, t = e && t == null ? e.length : t, Gt(e, q, i, i, i, i, t);
        }
        function vl(e, t) {
          var n;
          if (typeof t != "function")
            throw new lt(p);
          return e = G(e), function() {
            return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = i), n;
          };
        }
        var Fs = F(function(e, t, n) {
          var s = $;
          if (n.length) {
            var o = rn(n, qn(Fs));
            s |= te;
          }
          return Gt(e, s, t, n, o);
        }), wl = F(function(e, t, n) {
          var s = $ | se;
          if (n.length) {
            var o = rn(n, qn(wl));
            s |= te;
          }
          return Gt(t, s, e, n, o);
        });
        function yl(e, t, n) {
          t = n ? i : t;
          var s = Gt(e, V, i, i, i, i, i, t);
          return s.placeholder = yl.placeholder, s;
        }
        function El(e, t, n) {
          t = n ? i : t;
          var s = Gt(e, ke, i, i, i, i, i, t);
          return s.placeholder = El.placeholder, s;
        }
        function xl(e, t, n) {
          var s, o, u, c, f, _, y = 0, E = !1, x = !1, P = !0;
          if (typeof e != "function")
            throw new lt(p);
          t = dt(t) || 0, le(n) && (E = !!n.leading, x = "maxWait" in n, u = x ? ve(dt(n.maxWait) || 0, t) : u, P = "trailing" in n ? !!n.trailing : P);
          function I(pe) {
            var Et = s, Ht = o;
            return s = o = i, y = pe, c = e.apply(Ht, Et), c;
          }
          function C(pe) {
            return y = pe, f = wi(N, t), E ? I(pe) : c;
          }
          function U(pe) {
            var Et = pe - _, Ht = pe - y, Nl = t - Et;
            return x ? De(Nl, u - Ht) : Nl;
          }
          function k(pe) {
            var Et = pe - _, Ht = pe - y;
            return _ === i || Et >= t || Et < 0 || x && Ht >= u;
          }
          function N() {
            var pe = yr();
            if (k(pe))
              return Y(pe);
            f = wi(N, U(pe));
          }
          function Y(pe) {
            return f = i, P && s ? I(pe) : (s = o = i, c);
          }
          function nt() {
            f !== i && Ma(f), y = 0, s = _ = o = f = i;
          }
          function Ue() {
            return f === i ? c : Y(yr());
          }
          function it() {
            var pe = yr(), Et = k(pe);
            if (s = arguments, o = this, _ = pe, Et) {
              if (f === i)
                return C(_);
              if (x)
                return Ma(f), f = wi(N, t), I(_);
            }
            return f === i && (f = wi(N, t)), c;
          }
          return it.cancel = nt, it.flush = Ue, it;
        }
        var rp = F(function(e, t) {
          return fa(e, 1, t);
        }), sp = F(function(e, t, n) {
          return fa(e, dt(t) || 0, n);
        });
        function op(e) {
          return Gt(e, Ot);
        }
        function Er(e, t) {
          if (typeof e != "function" || t != null && typeof t != "function")
            throw new lt(p);
          var n = function() {
            var s = arguments, o = t ? t.apply(this, s) : s[0], u = n.cache;
            if (u.has(o))
              return u.get(o);
            var c = e.apply(this, s);
            return n.cache = u.set(o, c) || u, c;
          };
          return n.cache = new (Er.Cache || Bt)(), n;
        }
        Er.Cache = Bt;
        function xr(e) {
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
        function ap(e) {
          return vl(2, e);
        }
        var lp = jh(function(e, t) {
          t = t.length == 1 && z(t[0]) ? oe(t[0], Je(O())) : oe(Te(t, 1), Je(O()));
          var n = t.length;
          return F(function(s) {
            for (var o = -1, u = De(s.length, n); ++o < u; )
              s[o] = t[o].call(this, s[o]);
            return $e(e, this, s);
          });
        }), Ws = F(function(e, t) {
          var n = rn(t, qn(Ws));
          return Gt(e, te, i, t, n);
        }), Sl = F(function(e, t) {
          var n = rn(t, qn(Sl));
          return Gt(e, st, i, t, n);
        }), up = Ut(function(e, t) {
          return Gt(e, Ve, i, i, i, t);
        });
        function cp(e, t) {
          if (typeof e != "function")
            throw new lt(p);
          return t = t === i ? t : G(t), F(e, t);
        }
        function hp(e, t) {
          if (typeof e != "function")
            throw new lt(p);
          return t = t == null ? 0 : ve(G(t), 0), F(function(n) {
            var s = n[t], o = un(n, 0, t);
            return s && nn(o, s), $e(e, this, o);
          });
        }
        function fp(e, t, n) {
          var s = !0, o = !0;
          if (typeof e != "function")
            throw new lt(p);
          return le(n) && (s = "leading" in n ? !!n.leading : s, o = "trailing" in n ? !!n.trailing : o), xl(e, t, {
            leading: s,
            maxWait: t,
            trailing: o
          });
        }
        function dp(e) {
          return bl(e, 1);
        }
        function pp(e, t) {
          return Ws(Ps(t), e);
        }
        function gp() {
          if (!arguments.length)
            return [];
          var e = arguments[0];
          return z(e) ? e : [e];
        }
        function _p(e) {
          return ct(e, Le);
        }
        function mp(e, t) {
          return t = typeof t == "function" ? t : i, ct(e, Le, t);
        }
        function bp(e) {
          return ct(e, ce | Le);
        }
        function vp(e, t) {
          return t = typeof t == "function" ? t : i, ct(e, ce | Le, t);
        }
        function wp(e, t) {
          return t == null || ha(e, t, Ee(t));
        }
        function yt(e, t) {
          return e === t || e !== e && t !== t;
        }
        var yp = gr(ds), Ep = gr(function(e, t) {
          return e >= t;
        }), An = ma(/* @__PURE__ */ function() {
          return arguments;
        }()) ? ma : function(e) {
          return fe(e) && K.call(e, "callee") && !ia.call(e, "callee");
        }, z = m.isArray, xp = Go ? Je(Go) : Ih;
        function Ye(e) {
          return e != null && Sr(e.length) && !Wt(e);
        }
        function de(e) {
          return fe(e) && Ye(e);
        }
        function Sp(e) {
          return e === !0 || e === !1 || fe(e) && ze(e) == fn;
        }
        var cn = zc || $s, Pp = Uo ? Je(Uo) : Dh;
        function Ap(e) {
          return fe(e) && e.nodeType === 1 && !yi(e);
        }
        function Tp(e) {
          if (e == null)
            return !0;
          if (Ye(e) && (z(e) || typeof e == "string" || typeof e.splice == "function" || cn(e) || Qn(e) || An(e)))
            return !e.length;
          var t = Oe(e);
          if (t == We || t == Pe)
            return !e.size;
          if (vi(e))
            return !_s(e).length;
          for (var n in e)
            if (K.call(e, n))
              return !1;
          return !0;
        }
        function Rp(e, t) {
          return _i(e, t);
        }
        function Lp(e, t, n) {
          n = typeof n == "function" ? n : i;
          var s = n ? n(e, t) : i;
          return s === i ? _i(e, t, i, n) : !!s;
        }
        function Ns(e) {
          if (!fe(e))
            return !1;
          var t = ze(e);
          return t == dn || t == Ii || typeof e.message == "string" && typeof e.name == "string" && !yi(e);
        }
        function Ip(e) {
          return typeof e == "number" && sa(e);
        }
        function Wt(e) {
          if (!le(e))
            return !1;
          var t = ze(e);
          return t == Mn || t == Di || t == Wr || t == Ci;
        }
        function Pl(e) {
          return typeof e == "number" && e == G(e);
        }
        function Sr(e) {
          return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ie;
        }
        function le(e) {
          var t = typeof e;
          return e != null && (t == "object" || t == "function");
        }
        function fe(e) {
          return e != null && typeof e == "object";
        }
        var Al = Fo ? Je(Fo) : Mh;
        function Dp(e, t) {
          return e === t || gs(e, t, Os(t));
        }
        function Op(e, t, n) {
          return n = typeof n == "function" ? n : i, gs(e, t, Os(t), n);
        }
        function Mp(e) {
          return Tl(e) && e != +e;
        }
        function Cp(e) {
          if (mf(e))
            throw new B(b);
          return ba(e);
        }
        function kp(e) {
          return e === null;
        }
        function Bp(e) {
          return e == null;
        }
        function Tl(e) {
          return typeof e == "number" || fe(e) && ze(e) == $t;
        }
        function yi(e) {
          if (!fe(e) || ze(e) != _t)
            return !1;
          var t = Ki(e);
          if (t === null)
            return !0;
          var n = K.call(t, "constructor") && t.constructor;
          return typeof n == "function" && n instanceof n && ji.call(n) == Dc;
        }
        var Hs = Wo ? Je(Wo) : Ch;
        function zp(e) {
          return Pl(e) && e >= -9007199254740991 && e <= Ie;
        }
        var Rl = No ? Je(No) : kh;
        function Pr(e) {
          return typeof e == "string" || !z(e) && fe(e) && ze(e) == pn;
        }
        function tt(e) {
          return typeof e == "symbol" || fe(e) && ze(e) == Cn;
        }
        var Qn = Ho ? Je(Ho) : Bh;
        function Gp(e) {
          return e === i;
        }
        function Up(e) {
          return fe(e) && Oe(e) == gn;
        }
        function Fp(e) {
          return fe(e) && ze(e) == Bi;
        }
        var Wp = gr(ms), Np = gr(function(e, t) {
          return e <= t;
        });
        function Ll(e) {
          if (!e)
            return [];
          if (Ye(e))
            return Pr(e) ? vt(e) : He(e);
          if (li && e[li])
            return vc(e[li]());
          var t = Oe(e), n = t == We ? rs : t == Pe ? Yi : Kn;
          return n(e);
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
          var t = Nt(e), n = t % 1;
          return t === t ? n ? t - n : t : 0;
        }
        function Il(e) {
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
          e = qo(e);
          var n = Eu.test(e);
          return n || Su.test(e) ? nc(e.slice(2), n ? 2 : 8) : yu.test(e) ? Qe : +e;
        }
        function Dl(e) {
          return Rt(e, Xe(e));
        }
        function Hp(e) {
          return e ? En(G(e), -9007199254740991, Ie) : e === 0 ? e : 0;
        }
        function j(e) {
          return e == null ? "" : et(e);
        }
        var Yp = jn(function(e, t) {
          if (vi(t) || Ye(t)) {
            Rt(t, Ee(t), e);
            return;
          }
          for (var n in t)
            K.call(t, n) && di(e, n, t[n]);
        }), Ol = jn(function(e, t) {
          Rt(t, Xe(t), e);
        }), Ar = jn(function(e, t, n, s) {
          Rt(t, Xe(t), e, s);
        }), Xp = jn(function(e, t, n, s) {
          Rt(t, Ee(t), e, s);
        }), Zp = Ut(cs);
        function jp(e, t) {
          var n = Zn(e);
          return t == null ? n : ca(n, t);
        }
        var Vp = F(function(e, t) {
          e = J(e);
          var n = -1, s = t.length, o = s > 2 ? t[2] : i;
          for (o && Ge(t[0], t[1], o) && (s = 1); ++n < s; )
            for (var u = t[n], c = Xe(u), f = -1, _ = c.length; ++f < _; ) {
              var y = c[f], E = e[y];
              (E === i || yt(E, Hn[y]) && !K.call(e, y)) && (e[y] = u[y]);
            }
          return e;
        }), qp = F(function(e) {
          return e.push(i, qa), $e(Ml, i, e);
        });
        function Qp(e, t) {
          return Xo(e, O(t, 3), Tt);
        }
        function Kp(e, t) {
          return Xo(e, O(t, 3), fs);
        }
        function $p(e, t) {
          return e == null ? e : hs(e, O(t, 3), Xe);
        }
        function Jp(e, t) {
          return e == null ? e : ga(e, O(t, 3), Xe);
        }
        function eg(e, t) {
          return e && Tt(e, O(t, 3));
        }
        function tg(e, t) {
          return e && fs(e, O(t, 3));
        }
        function ng(e) {
          return e == null ? [] : ar(e, Ee(e));
        }
        function ig(e) {
          return e == null ? [] : ar(e, Xe(e));
        }
        function Ys(e, t, n) {
          var s = e == null ? i : xn(e, t);
          return s === i ? n : s;
        }
        function rg(e, t) {
          return e != null && $a(e, t, Ah);
        }
        function Xs(e, t) {
          return e != null && $a(e, t, Th);
        }
        var sg = Ya(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = Vi.call(t)), e[t] = n;
        }, js(Ze)), og = Ya(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = Vi.call(t)), K.call(e, t) ? e[t].push(n) : e[t] = [n];
        }, O), ag = F(gi);
        function Ee(e) {
          return Ye(e) ? la(e) : _s(e);
        }
        function Xe(e) {
          return Ye(e) ? la(e, !0) : zh(e);
        }
        function lg(e, t) {
          var n = {};
          return t = O(t, 3), Tt(e, function(s, o, u) {
            zt(n, t(s, o, u), s);
          }), n;
        }
        function ug(e, t) {
          var n = {};
          return t = O(t, 3), Tt(e, function(s, o, u) {
            zt(n, o, t(s, o, u));
          }), n;
        }
        var cg = jn(function(e, t, n) {
          lr(e, t, n);
        }), Ml = jn(function(e, t, n, s) {
          lr(e, t, n, s);
        }), hg = Ut(function(e, t) {
          var n = {};
          if (e == null)
            return n;
          var s = !1;
          t = oe(t, function(u) {
            return u = ln(u, e), s || (s = u.length > 1), u;
          }), Rt(e, Is(e), n), s && (n = ct(n, ce | Re | Le, sf));
          for (var o = t.length; o--; )
            Es(n, t[o]);
          return n;
        });
        function fg(e, t) {
          return Cl(e, xr(O(t)));
        }
        var dg = Ut(function(e, t) {
          return e == null ? {} : Uh(e, t);
        });
        function Cl(e, t) {
          if (e == null)
            return {};
          var n = oe(Is(e), function(s) {
            return [s];
          });
          return t = O(t), Pa(e, n, function(s, o) {
            return t(s, o[0]);
          });
        }
        function pg(e, t, n) {
          t = ln(t, e);
          var s = -1, o = t.length;
          for (o || (o = 1, e = i); ++s < o; ) {
            var u = e == null ? i : e[Lt(t[s])];
            u === i && (s = o, u = n), e = Wt(u) ? u.call(e) : u;
          }
          return e;
        }
        function gg(e, t, n) {
          return e == null ? e : mi(e, t, n);
        }
        function _g(e, t, n, s) {
          return s = typeof s == "function" ? s : i, e == null ? e : mi(e, t, n, s);
        }
        var kl = ja(Ee), Bl = ja(Xe);
        function mg(e, t, n) {
          var s = z(e), o = s || cn(e) || Qn(e);
          if (t = O(t, 4), n == null) {
            var u = e && e.constructor;
            o ? n = s ? new u() : [] : le(e) ? n = Wt(u) ? Zn(Ki(e)) : {} : n = {};
          }
          return (o ? at : Tt)(e, function(c, f, _) {
            return t(n, c, f, _);
          }), n;
        }
        function bg(e, t) {
          return e == null ? !0 : Es(e, t);
        }
        function vg(e, t, n) {
          return e == null ? e : Ia(e, t, Ps(n));
        }
        function wg(e, t, n, s) {
          return s = typeof s == "function" ? s : i, e == null ? e : Ia(e, t, Ps(n), s);
        }
        function Kn(e) {
          return e == null ? [] : is(e, Ee(e));
        }
        function yg(e) {
          return e == null ? [] : is(e, Xe(e));
        }
        function Eg(e, t, n) {
          return n === i && (n = t, t = i), n !== i && (n = dt(n), n = n === n ? n : 0), t !== i && (t = dt(t), t = t === t ? t : 0), En(dt(e), t, n);
        }
        function xg(e, t, n) {
          return t = Nt(t), n === i ? (n = t, t = 0) : n = Nt(n), e = dt(e), Rh(e, t, n);
        }
        function Sg(e, t, n) {
          if (n && typeof n != "boolean" && Ge(e, t, n) && (t = n = i), n === i && (typeof t == "boolean" ? (n = t, t = i) : typeof e == "boolean" && (n = e, e = i)), e === i && t === i ? (e = 0, t = 1) : (e = Nt(e), t === i ? (t = e, e = 0) : t = Nt(t)), e > t) {
            var s = e;
            e = t, t = s;
          }
          if (n || e % 1 || t % 1) {
            var o = oa();
            return De(e + o * (t - e + tc("1e-" + ((o + "").length - 1))), t);
          }
          return vs(e, t);
        }
        var Pg = Vn(function(e, t, n) {
          return t = t.toLowerCase(), e + (n ? zl(t) : t);
        });
        function zl(e) {
          return Zs(j(e).toLowerCase());
        }
        function Gl(e) {
          return e = j(e), e && e.replace(Au, pc).replace(Xu, "");
        }
        function Ag(e, t, n) {
          e = j(e), t = et(t);
          var s = e.length;
          n = n === i ? s : En(G(n), 0, s);
          var o = n;
          return n -= t.length, n >= 0 && e.slice(n, o) == t;
        }
        function Tg(e) {
          return e = j(e), e && Ne.test(e) ? e.replace(ye, gc) : e;
        }
        function Rg(e) {
          return e = j(e), e && mn.test(e) ? e.replace(Ke, "\\$&") : e;
        }
        var Lg = Vn(function(e, t, n) {
          return e + (n ? "-" : "") + t.toLowerCase();
        }), Ig = Vn(function(e, t, n) {
          return e + (n ? " " : "") + t.toLowerCase();
        }), Dg = Wa("toLowerCase");
        function Og(e, t, n) {
          e = j(e), t = G(t);
          var s = t ? Wn(e) : 0;
          if (!t || s >= t)
            return e;
          var o = (t - s) / 2;
          return pr(tr(o), n) + e + pr(er(o), n);
        }
        function Mg(e, t, n) {
          e = j(e), t = G(t);
          var s = t ? Wn(e) : 0;
          return t && s < t ? e + pr(t - s, n) : e;
        }
        function Cg(e, t, n) {
          e = j(e), t = G(t);
          var s = t ? Wn(e) : 0;
          return t && s < t ? pr(t - s, n) + e : e;
        }
        function kg(e, t, n) {
          return n || t == null ? t = 0 : t && (t = +t), Wc(j(e).replace(en, ""), t || 0);
        }
        function Bg(e, t, n) {
          return (n ? Ge(e, t, n) : t === i) ? t = 1 : t = G(t), ws(j(e), t);
        }
        function zg() {
          var e = arguments, t = j(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }
        var Gg = Vn(function(e, t, n) {
          return e + (n ? "_" : "") + t.toLowerCase();
        });
        function Ug(e, t, n) {
          return n && typeof n != "number" && Ge(e, t, n) && (t = n = i), n = n === i ? we : n >>> 0, n ? (e = j(e), e && (typeof t == "string" || t != null && !Hs(t)) && (t = et(t), !t && Fn(e)) ? un(vt(e), 0, n) : e.split(t, n)) : [];
        }
        var Fg = Vn(function(e, t, n) {
          return e + (n ? " " : "") + Zs(t);
        });
        function Wg(e, t, n) {
          return e = j(e), n = n == null ? 0 : En(G(n), 0, e.length), t = et(t), e.slice(n, n + t.length) == t;
        }
        function Ng(e, t, n) {
          var s = l.templateSettings;
          n && Ge(e, t, n) && (t = i), e = j(e), t = Ar({}, t, s, Va);
          var o = Ar({}, t.imports, s.imports, Va), u = Ee(o), c = is(o, u), f, _, y = 0, E = t.interpolate || Ui, x = "__p += '", P = ss(
            (t.escape || Ui).source + "|" + E.source + "|" + (E === oi ? wu : Ui).source + "|" + (t.evaluate || Ui).source + "|$",
            "g"
          ), I = "//# sourceURL=" + (K.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Qu + "]") + `
`;
          e.replace(P, function(k, N, Y, nt, Ue, it) {
            return Y || (Y = nt), x += e.slice(y, it).replace(Tu, _c), N && (f = !0, x += `' +
__e(` + N + `) +
'`), Ue && (_ = !0, x += `';
` + Ue + `;
__p += '`), Y && (x += `' +
((__t = (` + Y + `)) == null ? '' : __t) +
'`), y = it + k.length, k;
          }), x += `';
`;
          var C = K.call(t, "variable") && t.variable;
          if (!C)
            x = `with (obj) {
` + x + `
}
`;
          else if (bu.test(C))
            throw new B(A);
          x = (_ ? x.replace(d, "") : x).replace(T, "$1").replace(W, "$1;"), x = "function(" + (C || "obj") + `) {
` + (C ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (f ? ", __e = _.escape" : "") + (_ ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + x + `return __p
}`;
          var U = Fl(function() {
            return Z(u, I + "return " + x).apply(i, c);
          });
          if (U.source = x, Ns(U))
            throw U;
          return U;
        }
        function Hg(e) {
          return j(e).toLowerCase();
        }
        function Yg(e) {
          return j(e).toUpperCase();
        }
        function Xg(e, t, n) {
          if (e = j(e), e && (n || t === i))
            return qo(e);
          if (!e || !(t = et(t)))
            return e;
          var s = vt(e), o = vt(t), u = Qo(s, o), c = Ko(s, o) + 1;
          return un(s, u, c).join("");
        }
        function Zg(e, t, n) {
          if (e = j(e), e && (n || t === i))
            return e.slice(0, Jo(e) + 1);
          if (!e || !(t = et(t)))
            return e;
          var s = vt(e), o = Ko(s, vt(t)) + 1;
          return un(s, 0, o).join("");
        }
        function jg(e, t, n) {
          if (e = j(e), e && (n || t === i))
            return e.replace(en, "");
          if (!e || !(t = et(t)))
            return e;
          var s = vt(e), o = Qo(s, vt(t));
          return un(s, o).join("");
        }
        function Vg(e, t) {
          var n = ti, s = jt;
          if (le(t)) {
            var o = "separator" in t ? t.separator : o;
            n = "length" in t ? G(t.length) : n, s = "omission" in t ? et(t.omission) : s;
          }
          e = j(e);
          var u = e.length;
          if (Fn(e)) {
            var c = vt(e);
            u = c.length;
          }
          if (n >= u)
            return e;
          var f = n - Wn(s);
          if (f < 1)
            return s;
          var _ = c ? un(c, 0, f).join("") : e.slice(0, f);
          if (o === i)
            return _ + s;
          if (c && (f += _.length - f), Hs(o)) {
            if (e.slice(f).search(o)) {
              var y, E = _;
              for (o.global || (o = ss(o.source, j(mo.exec(o)) + "g")), o.lastIndex = 0; y = o.exec(E); )
                var x = y.index;
              _ = _.slice(0, x === i ? f : x);
            }
          } else if (e.indexOf(et(o), f) != f) {
            var P = _.lastIndexOf(o);
            P > -1 && (_ = _.slice(0, P));
          }
          return _ + s;
        }
        function qg(e) {
          return e = j(e), e && At.test(e) ? e.replace(Q, xc) : e;
        }
        var Qg = Vn(function(e, t, n) {
          return e + (n ? " " : "") + t.toUpperCase();
        }), Zs = Wa("toUpperCase");
        function Ul(e, t, n) {
          return e = j(e), t = n ? i : t, t === i ? bc(e) ? Ac(e) : uc(e) : e.match(t) || [];
        }
        var Fl = F(function(e, t) {
          try {
            return $e(e, i, t);
          } catch (n) {
            return Ns(n) ? n : new B(n);
          }
        }), Kg = Ut(function(e, t) {
          return at(t, function(n) {
            n = Lt(n), zt(e, n, Fs(e[n], e));
          }), e;
        });
        function $g(e) {
          var t = e == null ? 0 : e.length, n = O();
          return e = t ? oe(e, function(s) {
            if (typeof s[1] != "function")
              throw new lt(p);
            return [n(s[0]), s[1]];
          }) : [], F(function(s) {
            for (var o = -1; ++o < t; ) {
              var u = e[o];
              if ($e(u[0], this, s))
                return $e(u[1], this, s);
            }
          });
        }
        function Jg(e) {
          return xh(ct(e, ce));
        }
        function js(e) {
          return function() {
            return e;
          };
        }
        function e0(e, t) {
          return e == null || e !== e ? t : e;
        }
        var t0 = Ha(), n0 = Ha(!0);
        function Ze(e) {
          return e;
        }
        function Vs(e) {
          return va(typeof e == "function" ? e : ct(e, ce));
        }
        function i0(e) {
          return ya(ct(e, ce));
        }
        function r0(e, t) {
          return Ea(e, ct(t, ce));
        }
        var s0 = F(function(e, t) {
          return function(n) {
            return gi(n, e, t);
          };
        }), o0 = F(function(e, t) {
          return function(n) {
            return gi(e, n, t);
          };
        });
        function qs(e, t, n) {
          var s = Ee(t), o = ar(t, s);
          n == null && !(le(t) && (o.length || !s.length)) && (n = t, t = e, e = this, o = ar(t, Ee(t)));
          var u = !(le(n) && "chain" in n) || !!n.chain, c = Wt(e);
          return at(o, function(f) {
            var _ = t[f];
            e[f] = _, c && (e.prototype[f] = function() {
              var y = this.__chain__;
              if (u || y) {
                var E = e(this.__wrapped__), x = E.__actions__ = He(this.__actions__);
                return x.push({ func: _, args: arguments, thisArg: e }), E.__chain__ = y, E;
              }
              return _.apply(e, nn([this.value()], arguments));
            });
          }), e;
        }
        function a0() {
          return Ae._ === this && (Ae._ = Oc), this;
        }
        function Qs() {
        }
        function l0(e) {
          return e = G(e), F(function(t) {
            return xa(t, e);
          });
        }
        var u0 = Ts(oe), c0 = Ts(Yo), h0 = Ts($r);
        function Wl(e) {
          return Cs(e) ? Jr(Lt(e)) : Fh(e);
        }
        function f0(e) {
          return function(t) {
            return e == null ? i : xn(e, t);
          };
        }
        var d0 = Xa(), p0 = Xa(!0);
        function Ks() {
          return [];
        }
        function $s() {
          return !1;
        }
        function g0() {
          return {};
        }
        function _0() {
          return "";
        }
        function m0() {
          return !0;
        }
        function b0(e, t) {
          if (e = G(e), e < 1 || e > Ie)
            return [];
          var n = we, s = De(e, we);
          t = O(t), e -= we;
          for (var o = ns(s, t); ++n < e; )
            t(n);
          return o;
        }
        function v0(e) {
          return z(e) ? oe(e, Lt) : tt(e) ? [e] : He(al(j(e)));
        }
        function w0(e) {
          var t = ++Ic;
          return j(e) + t;
        }
        var y0 = dr(function(e, t) {
          return e + t;
        }, 0), E0 = Rs("ceil"), x0 = dr(function(e, t) {
          return e / t;
        }, 1), S0 = Rs("floor");
        function P0(e) {
          return e && e.length ? or(e, Ze, ds) : i;
        }
        function A0(e, t) {
          return e && e.length ? or(e, O(t, 2), ds) : i;
        }
        function T0(e) {
          return jo(e, Ze);
        }
        function R0(e, t) {
          return jo(e, O(t, 2));
        }
        function L0(e) {
          return e && e.length ? or(e, Ze, ms) : i;
        }
        function I0(e, t) {
          return e && e.length ? or(e, O(t, 2), ms) : i;
        }
        var D0 = dr(function(e, t) {
          return e * t;
        }, 1), O0 = Rs("round"), M0 = dr(function(e, t) {
          return e - t;
        }, 0);
        function C0(e) {
          return e && e.length ? ts(e, Ze) : 0;
        }
        function k0(e, t) {
          return e && e.length ? ts(e, O(t, 2)) : 0;
        }
        return l.after = ip, l.ary = bl, l.assign = Yp, l.assignIn = Ol, l.assignInWith = Ar, l.assignWith = Xp, l.at = Zp, l.before = vl, l.bind = Fs, l.bindAll = Kg, l.bindKey = wl, l.castArray = gp, l.chain = gl, l.chunk = Sf, l.compact = Pf, l.concat = Af, l.cond = $g, l.conforms = Jg, l.constant = js, l.countBy = Cd, l.create = jp, l.curry = yl, l.curryRight = El, l.debounce = xl, l.defaults = Vp, l.defaultsDeep = qp, l.defer = rp, l.delay = sp, l.difference = Tf, l.differenceBy = Rf, l.differenceWith = Lf, l.drop = If, l.dropRight = Df, l.dropRightWhile = Of, l.dropWhile = Mf, l.fill = Cf, l.filter = Bd, l.flatMap = Ud, l.flatMapDeep = Fd, l.flatMapDepth = Wd, l.flatten = hl, l.flattenDeep = kf, l.flattenDepth = Bf, l.flip = op, l.flow = t0, l.flowRight = n0, l.fromPairs = zf, l.functions = ng, l.functionsIn = ig, l.groupBy = Nd, l.initial = Uf, l.intersection = Ff, l.intersectionBy = Wf, l.intersectionWith = Nf, l.invert = sg, l.invertBy = og, l.invokeMap = Yd, l.iteratee = Vs, l.keyBy = Xd, l.keys = Ee, l.keysIn = Xe, l.map = wr, l.mapKeys = lg, l.mapValues = ug, l.matches = i0, l.matchesProperty = r0, l.memoize = Er, l.merge = cg, l.mergeWith = Ml, l.method = s0, l.methodOf = o0, l.mixin = qs, l.negate = xr, l.nthArg = l0, l.omit = hg, l.omitBy = fg, l.once = ap, l.orderBy = Zd, l.over = u0, l.overArgs = lp, l.overEvery = c0, l.overSome = h0, l.partial = Ws, l.partialRight = Sl, l.partition = jd, l.pick = dg, l.pickBy = Cl, l.property = Wl, l.propertyOf = f0, l.pull = Zf, l.pullAll = dl, l.pullAllBy = jf, l.pullAllWith = Vf, l.pullAt = qf, l.range = d0, l.rangeRight = p0, l.rearg = up, l.reject = Qd, l.remove = Qf, l.rest = cp, l.reverse = Gs, l.sampleSize = $d, l.set = gg, l.setWith = _g, l.shuffle = Jd, l.slice = Kf, l.sortBy = np, l.sortedUniq = rd, l.sortedUniqBy = sd, l.split = Ug, l.spread = hp, l.tail = od, l.take = ad, l.takeRight = ld, l.takeRightWhile = ud, l.takeWhile = cd, l.tap = Pd, l.throttle = fp, l.thru = vr, l.toArray = Ll, l.toPairs = kl, l.toPairsIn = Bl, l.toPath = v0, l.toPlainObject = Dl, l.transform = mg, l.unary = dp, l.union = hd, l.unionBy = fd, l.unionWith = dd, l.uniq = pd, l.uniqBy = gd, l.uniqWith = _d, l.unset = bg, l.unzip = Us, l.unzipWith = pl, l.update = vg, l.updateWith = wg, l.values = Kn, l.valuesIn = yg, l.without = md, l.words = Ul, l.wrap = pp, l.xor = bd, l.xorBy = vd, l.xorWith = wd, l.zip = yd, l.zipObject = Ed, l.zipObjectDeep = xd, l.zipWith = Sd, l.entries = kl, l.entriesIn = Bl, l.extend = Ol, l.extendWith = Ar, qs(l, l), l.add = y0, l.attempt = Fl, l.camelCase = Pg, l.capitalize = zl, l.ceil = E0, l.clamp = Eg, l.clone = _p, l.cloneDeep = bp, l.cloneDeepWith = vp, l.cloneWith = mp, l.conformsTo = wp, l.deburr = Gl, l.defaultTo = e0, l.divide = x0, l.endsWith = Ag, l.eq = yt, l.escape = Tg, l.escapeRegExp = Rg, l.every = kd, l.find = zd, l.findIndex = ul, l.findKey = Qp, l.findLast = Gd, l.findLastIndex = cl, l.findLastKey = Kp, l.floor = S0, l.forEach = _l, l.forEachRight = ml, l.forIn = $p, l.forInRight = Jp, l.forOwn = eg, l.forOwnRight = tg, l.get = Ys, l.gt = yp, l.gte = Ep, l.has = rg, l.hasIn = Xs, l.head = fl, l.identity = Ze, l.includes = Hd, l.indexOf = Gf, l.inRange = xg, l.invoke = ag, l.isArguments = An, l.isArray = z, l.isArrayBuffer = xp, l.isArrayLike = Ye, l.isArrayLikeObject = de, l.isBoolean = Sp, l.isBuffer = cn, l.isDate = Pp, l.isElement = Ap, l.isEmpty = Tp, l.isEqual = Rp, l.isEqualWith = Lp, l.isError = Ns, l.isFinite = Ip, l.isFunction = Wt, l.isInteger = Pl, l.isLength = Sr, l.isMap = Al, l.isMatch = Dp, l.isMatchWith = Op, l.isNaN = Mp, l.isNative = Cp, l.isNil = Bp, l.isNull = kp, l.isNumber = Tl, l.isObject = le, l.isObjectLike = fe, l.isPlainObject = yi, l.isRegExp = Hs, l.isSafeInteger = zp, l.isSet = Rl, l.isString = Pr, l.isSymbol = tt, l.isTypedArray = Qn, l.isUndefined = Gp, l.isWeakMap = Up, l.isWeakSet = Fp, l.join = Hf, l.kebabCase = Lg, l.last = ft, l.lastIndexOf = Yf, l.lowerCase = Ig, l.lowerFirst = Dg, l.lt = Wp, l.lte = Np, l.max = P0, l.maxBy = A0, l.mean = T0, l.meanBy = R0, l.min = L0, l.minBy = I0, l.stubArray = Ks, l.stubFalse = $s, l.stubObject = g0, l.stubString = _0, l.stubTrue = m0, l.multiply = D0, l.nth = Xf, l.noConflict = a0, l.noop = Qs, l.now = yr, l.pad = Og, l.padEnd = Mg, l.padStart = Cg, l.parseInt = kg, l.random = Sg, l.reduce = Vd, l.reduceRight = qd, l.repeat = Bg, l.replace = zg, l.result = pg, l.round = O0, l.runInContext = g, l.sample = Kd, l.size = ep, l.snakeCase = Gg, l.some = tp, l.sortedIndex = $f, l.sortedIndexBy = Jf, l.sortedIndexOf = ed, l.sortedLastIndex = td, l.sortedLastIndexBy = nd, l.sortedLastIndexOf = id, l.startCase = Fg, l.startsWith = Wg, l.subtract = M0, l.sum = C0, l.sumBy = k0, l.template = Ng, l.times = b0, l.toFinite = Nt, l.toInteger = G, l.toLength = Il, l.toLower = Hg, l.toNumber = dt, l.toSafeInteger = Hp, l.toString = j, l.toUpper = Yg, l.trim = Xg, l.trimEnd = Zg, l.trimStart = jg, l.truncate = Vg, l.unescape = qg, l.uniqueId = w0, l.upperCase = Qg, l.upperFirst = Zs, l.each = _l, l.eachRight = ml, l.first = fl, qs(l, function() {
          var e = {};
          return Tt(l, function(t, n) {
            K.call(l.prototype, n) || (e[n] = t);
          }), e;
        }(), { chain: !1 }), l.VERSION = r, at(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
          l[e].placeholder = l;
        }), at(["drop", "take"], function(e, t) {
          H.prototype[e] = function(n) {
            n = n === i ? 1 : ve(G(n), 0);
            var s = this.__filtered__ && !t ? new H(this) : this.clone();
            return s.__filtered__ ? s.__takeCount__ = De(n, s.__takeCount__) : s.__views__.push({
              size: De(n, we),
              type: e + (s.__dir__ < 0 ? "Right" : "")
            }), s;
          }, H.prototype[e + "Right"] = function(n) {
            return this.reverse()[e](n).reverse();
          };
        }), at(["filter", "map", "takeWhile"], function(e, t) {
          var n = t + 1, s = n == Be || n == qe;
          H.prototype[e] = function(o) {
            var u = this.clone();
            return u.__iteratees__.push({
              iteratee: O(o, 3),
              type: n
            }), u.__filtered__ = u.__filtered__ || s, u;
          };
        }), at(["head", "last"], function(e, t) {
          var n = "take" + (t ? "Right" : "");
          H.prototype[e] = function() {
            return this[n](1).value()[0];
          };
        }), at(["initial", "tail"], function(e, t) {
          var n = "drop" + (t ? "" : "Right");
          H.prototype[e] = function() {
            return this.__filtered__ ? new H(this) : this[n](1);
          };
        }), H.prototype.compact = function() {
          return this.filter(Ze);
        }, H.prototype.find = function(e) {
          return this.filter(e).head();
        }, H.prototype.findLast = function(e) {
          return this.reverse().find(e);
        }, H.prototype.invokeMap = F(function(e, t) {
          return typeof e == "function" ? new H(this) : this.map(function(n) {
            return gi(n, e, t);
          });
        }), H.prototype.reject = function(e) {
          return this.filter(xr(O(e)));
        }, H.prototype.slice = function(e, t) {
          e = G(e);
          var n = this;
          return n.__filtered__ && (e > 0 || t < 0) ? new H(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== i && (t = G(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
        }, H.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, H.prototype.toArray = function() {
          return this.take(we);
        }, Tt(H.prototype, function(e, t) {
          var n = /^(?:filter|find|map|reject)|While$/.test(t), s = /^(?:head|last)$/.test(t), o = l[s ? "take" + (t == "last" ? "Right" : "") : t], u = s || /^find/.test(t);
          o && (l.prototype[t] = function() {
            var c = this.__wrapped__, f = s ? [1] : arguments, _ = c instanceof H, y = f[0], E = _ || z(c), x = function(N) {
              var Y = o.apply(l, nn([N], f));
              return s && P ? Y[0] : Y;
            };
            E && n && typeof y == "function" && y.length != 1 && (_ = E = !1);
            var P = this.__chain__, I = !!this.__actions__.length, C = u && !P, U = _ && !I;
            if (!u && E) {
              c = U ? c : new H(this);
              var k = e.apply(c, f);
              return k.__actions__.push({ func: vr, args: [x], thisArg: i }), new ut(k, P);
            }
            return C && U ? e.apply(this, f) : (k = this.thru(x), C ? s ? k.value()[0] : k.value() : k);
          });
        }), at(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
          var t = Xi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", s = /^(?:pop|shift)$/.test(e);
          l.prototype[e] = function() {
            var o = arguments;
            if (s && !this.__chain__) {
              var u = this.value();
              return t.apply(z(u) ? u : [], o);
            }
            return this[n](function(c) {
              return t.apply(z(c) ? c : [], o);
            });
          };
        }), Tt(H.prototype, function(e, t) {
          var n = l[t];
          if (n) {
            var s = n.name + "";
            K.call(Xn, s) || (Xn[s] = []), Xn[s].push({ name: t, func: n });
          }
        }), Xn[fr(i, se).name] = [{
          name: "wrapper",
          func: i
        }], H.prototype.clone = Vc, H.prototype.reverse = qc, H.prototype.value = Qc, l.prototype.at = Ad, l.prototype.chain = Td, l.prototype.commit = Rd, l.prototype.next = Ld, l.prototype.plant = Dd, l.prototype.reverse = Od, l.prototype.toJSON = l.prototype.valueOf = l.prototype.value = Md, l.prototype.first = l.prototype.head, li && (l.prototype[li] = Id), l;
      }, Nn = Tc();
      bn ? ((bn.exports = Nn)._ = Nn, Vr._ = Nn) : Ae._ = Nn;
    }).call(T_);
  }(Ri, Ri.exports)), Ri.exports;
}
var L_ = R_();
const ei = class ei {
  constructor(a, i, r, h) {
    w(this, "_id");
    w(this, "renderer");
    w(this, "scene");
    w(this, "controller");
    w(this, "toolbox");
    // modules
    w(this, "_mediaCreator");
    w(this, "_arSystem");
    w(this, "_assetExporter");
    w(this, "registered", /* @__PURE__ */ new Map());
    w(this, "listeners", /* @__PURE__ */ new Map());
    this._id = A_(), this.renderer = a, this.scene = i, this.controller = r, this.toolbox = h, this._mediaCreator = Cr.get("MediaCreator").then(
      (b) => new b(
        this.renderer,
        this.scene,
        this.controller
      )
    ), this._arSystem = Cr.get("ARSystem").then((b) => new b()), this._assetExporter = Cr.get("AssetExporter").then(
      (b) => new b()
    ), ei.__instances.push(this);
  }
  static get(a) {
    const i = this.__instances.find(
      (r) => r.id === a
    );
    return i || this.__instances.find(
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
      (i) => i.id === this.id
    );
    return a === -1 ? !1 : (ei.__instances.splice(a, 1), !0);
  }
  PerformAction(a, i) {
    let r = !1;
    switch (a) {
      case "START_RENDER": {
        this.renderer.StartRenderer(this.scene, this.controller.object), r = !0;
        break;
      }
      case "GET_ALL_SCENE_DATA": {
        r = this.getAllSceneData(
          i
        );
        break;
      }
      case "GET_ALL_OBJECTS": {
        r = this.getAllObjects(
          i
        );
        break;
      }
      case "GET_OBJECTS": {
        r = this.getObjects(
          i
        );
        break;
      }
      case "ADD_OBJECT": {
        r = this.addObject(
          i
        );
        break;
      }
      case "UPDATE_OBJECT": {
        r = this.updateObject(
          i
        );
        break;
      }
      case "DELETE_OBJECT": {
        r = this.deleteObject(
          i
        );
        break;
      }
      case "SELECT_OBJECT": {
        r = this.selectObject(
          i
        );
        break;
      }
      case "DESELECT_OBJECT": {
        r = this.deselectObject(
          i
        );
        break;
      }
      case "SET_BACKGROUND": {
        r = this.setBackground(
          i
        );
        break;
      }
      case "DROP_IT": {
        r = this.dropIt(
          i
        );
        break;
      }
      case "PLACE_ON_FLOOR": {
        r = this.placeOnFloor(
          i
        );
        break;
      }
      case "SET_CAMERA_TRANSFORM": {
        r = this.setCameraTransform(
          i
        );
        break;
      }
      case "GET_CAMERA_TRANSFORM": {
        r = this.getCameraTransform(
          i
        );
        break;
      }
      case "MOVE_CAMERA": {
        r = this.moveCamera(
          i
        );
        break;
      }
      case "RESET_CAMERA": {
        r = this.resetCamera(
          i
        );
        break;
      }
      case "COMPUTE_ENCOMPASSING_VIEW": {
        r = this.computeEncompassingView(
          i
        );
        break;
      }
      case "SET_CAMERA_LAYER": {
        r = this.setCameraLayer(
          i
        );
        break;
      }
      case "ZOOM_CAMERA": {
        r = this.zoomCamera(
          i
        );
        break;
      }
      case "SET_GIZMO_MODE": {
        r = this.setGizmoMode(
          i
        );
        break;
      }
      case "SET_GIZMO_VISIBILITY": {
        r = this.setGizmoVisibility(
          i
        );
        break;
      }
      case "SET_GIZMO_SCALE_LINKED": {
        r = this.setGizmoScaleLinked(
          i
        );
        break;
      }
      case "USE_TOOL": {
        r = this.useTool(
          i
        );
        break;
      }
      case "MODEL_LOADED": {
        r = this.modelLoaded(
          i
        );
        break;
      }
      case "UPDATE_SCENE": {
        r = this.updateScene(
          i
        );
        break;
      }
      case "GENERATE_MEDIA": {
        r = this.generateMedia(
          i
        );
        break;
      }
      case "SET_PARENT": {
        r = this.setParent(
          i
        );
        break;
      }
      case "EXPORT_SCENE": {
        r = this.exportScene(
          i
        );
        break;
      }
      case "LAUNCH_AR": {
        const { uri: h, options: b } = i;
        r = new Promise((p, A) => {
          this._arSystem.then((M) => {
            p(M.launch(h, b));
          }).catch(A);
        });
        break;
      }
      default:
        console.warn(
          `DIVECommunication.PerformAction: has been executed with unknown Action type ${a}`
        );
    }
    return this.dispatch(a, i), r;
  }
  Subscribe(a, i) {
    return this.listeners.get(a) || this.listeners.set(a, []), this.listeners.get(a).push(i), () => {
      const r = this.listeners.get(a);
      if (!r) return !1;
      const h = r.findIndex(
        (b) => b === i
      );
      return h === -1 ? !1 : (r.splice(h, 1), !0);
    };
  }
  dispatch(a, i) {
    const r = this.listeners.get(a);
    r && r.forEach((h) => h(i));
  }
  getAllSceneData(a) {
    const i = {
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
    return Object.assign(a, i), i;
  }
  getAllObjects(a) {
    return Object.assign(a, this.registered), this.registered;
  }
  getObjects(a) {
    if (a.ids.length === 0) return [];
    const i = [];
    return this.registered.forEach((r) => {
      a.ids.includes(r.id) && i.push(r);
    }), i;
  }
  addObject(a) {
    return this.registered.get(a.id) ? !1 : (a.parentId === void 0 && (a.parentId = null), this.registered.set(a.id, a), this.scene.AddSceneObject(a), !0);
  }
  updateObject(a) {
    const i = this.registered.get(a.id);
    if (!i) return !1;
    this.registered.set(a.id, L_.merge(i, a));
    const r = this.registered.get(a.id);
    return this.scene.UpdateSceneObject({
      ...a,
      id: r.id,
      entityType: r.entityType
    }), Object.assign(a, r), !0;
  }
  deleteObject(a) {
    const i = this.registered.get(a.id);
    return i ? (i.parentId && this.setParent({
      object: { id: i.id },
      parent: null
    }), i.entityType === "group" && this.registered.forEach((r) => {
      r.parentId === i.id && this.updateObject({
        id: r.id,
        parentId: null
      });
    }), Object.assign(a, i), this.registered.delete(a.id), Array.from(this.registered.values()).forEach((r) => {
      r.parentId && r.parentId === a.id && (r.parentId = null);
    }), this.scene.DeleteSceneObject(i), !0) : !1;
  }
  selectObject(a) {
    const i = this.registered.get(a.id);
    if (!i) return !1;
    const r = this.scene.GetSceneObject(i);
    if (!r || !("isSelectable" in r)) return !1;
    const h = this.toolbox.GetActiveTool();
    return h && nu(h) && h.AttachGizmo(r), Object.assign(a, i), !0;
  }
  deselectObject(a) {
    const i = this.registered.get(a.id);
    if (!i) return !1;
    const r = this.scene.GetSceneObject(i);
    if (!r || !("isSelectable" in r)) return !1;
    const h = this.toolbox.GetActiveTool();
    return h && nu(h) && h.DetachGizmo(), Object.assign(a, i), !0;
  }
  setBackground(a) {
    return this.scene.SetBackground(a.color), !0;
  }
  dropIt(a) {
    const i = this.registered.get(a.id);
    return i ? (this.scene.GetSceneObject(i).DropIt(), !0) : !1;
  }
  placeOnFloor(a) {
    const i = this.registered.get(a.id);
    return i ? (this.scene.PlaceOnFloor(i), !0) : !1;
  }
  setCameraTransform(a) {
    return this.controller.object.position.copy(a.position), this.controller.target.copy(a.target), this.controller.update(), !0;
  }
  getCameraTransform(a) {
    const i = {
      position: this.controller.object.position.clone(),
      target: this.controller.target.clone()
    };
    return Object.assign(a, i), i;
  }
  moveCamera(a) {
    let i = { x: 0, y: 0, z: 0 }, r = { x: 0, y: 0, z: 0 };
    return "id" in a ? (i = this.registered.get(a.id).position, r = this.registered.get(a.id).target) : (i = a.position, r = a.target), this.controller.MoveTo(
      i,
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
    const i = this.scene.ComputeSceneBB(), r = this.controller.ComputeEncompassingView(i);
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
    let i = { x: 0, y: 0, z: 0 }, r = { x: 0, y: 0, z: 0 };
    return "id" in a ? (i = this.registered.get(a.id).position, r = this.registered.get(a.id).target) : (i = a.position, r = a.target), this._mediaCreator.then((h) => h.GenerateMedia(
      i,
      r,
      a.width,
      a.height
    ));
  }
  setParent(a) {
    const i = this.registered.get(a.object.id);
    if (!i) return !1;
    const r = this.scene.GetSceneObject(i);
    if (!r) return !1;
    if (a.parent === null)
      return this.scene.Root.attach(r), this.updateObject({
        id: i.id,
        parentId: null
      }), !0;
    if (a.object.id === a.parent.id)
      return !1;
    const h = this.registered.get(a.parent.id);
    if (!h)
      return this.scene.Root.attach(r), this.updateObject({
        id: i.id,
        parentId: null
      }), !0;
    const b = this.scene.GetSceneObject(h);
    return b ? (b.attach(r), this.updateObject({
      id: i.id,
      parentId: h.id
    }), !0) : (this.scene.Root.attach(r), this.updateObject({
      id: i.id,
      parentId: null
    }), !0);
  }
  exportScene(a) {
    return this._assetExporter.then((i) => i.export(this.scene.Root, a.type, {}));
  }
};
w(ei, "__instances", []);
let rt = ei;
class I_ {
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
    l_();
  }
  Animate(a) {
    return new u_(a);
  }
}
class D_ extends Y0 {
  constructor(i, r, h) {
    super(-1, 1, 1, -1, 0.1, 100);
    w(this, "axesHelper");
    w(this, "_renderer");
    w(this, "_scene");
    w(this, "_renderCallbackId");
    this.layers.mask = xi, this.axesHelper = new X0(0.5), this.axesHelper.layers.mask = xi, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new Xt(ro),
      new Xt(so),
      new Xt(oo)
    );
    const b = new Js("X", 0.2, au), p = new Js("Y", 0.2, lu), A = new Js("Z", 0.2, uu);
    b.layers.mask = xi, p.layers.mask = xi, A.layers.mask = xi, b.position.set(0.7, 0, 0), p.position.set(0, 0.7, 0), A.position.set(0, 0, 0.7), this.axesHelper.add(b), this.axesHelper.add(p), this.axesHelper.add(A), this.add(this.axesHelper), this._renderer = i, this._scene = r, this._scene.add(this);
    const M = new Z0();
    this._renderCallbackId = i.AddPostRenderCallback(() => {
      const X = r.background;
      r.background = null, i.getViewport(M), i.setViewport(0, 0, 150, 150), i.autoClear = !1, this.SetFromCameraMatrix(h.object.matrix), i.render(r, this), i.setViewport(M), i.autoClear = !0, r.background = X;
    });
  }
  Dispose() {
    this._renderer.RemovePostRenderCallback(this._renderCallbackId), this._scene.remove(this);
  }
  SetFromCameraMatrix(i) {
    this.axesHelper.rotation.setFromRotationMatrix(
      new uo().extractRotation(i).invert()
    );
  }
}
const O_ = "1.19.1-beta.8", M_ = {
  version: O_
}, Ln = {
  antialias: !0,
  alpha: !0,
  stencil: !1,
  shadowMapEnabled: !0,
  shadowMapType: V0,
  toneMapping: j0,
  canvas: void 0
};
class C_ extends q0 {
  constructor(i = Ln) {
    super({
      antialias: i.antialias || Ln.antialias,
      alpha: i.alpha || Ln.alpha,
      preserveDrawingBuffer: !0,
      canvas: i.canvas
    });
    // basic functionality members
    w(this, "paused", !1);
    w(this, "running", !1);
    w(this, "force", !1);
    // pre- and post-render callbacks
    w(this, "preRenderCallbacks", /* @__PURE__ */ new Map());
    w(this, "postRenderCallbacks", /* @__PURE__ */ new Map());
    this.setPixelRatio(window.devicePixelRatio), this.shadowMap.enabled = i.shadowMapEnabled || Ln.shadowMapEnabled, this.shadowMap.type = i.shadowMapType || Ln.shadowMapType, this.toneMapping = i.toneMapping || Ln.toneMapping, this.debug.checkShaderErrors = !1;
  }
  // Stops renderings and disposes the renderer.
  Dispose() {
    this.StopRenderer(), this.dispose();
  }
  // Starts the renderer with the given scene and camera.
  StartRenderer(i, r) {
    this.setAnimationLoop((h, b) => {
      this.internal_render(i, r, h, b);
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
  OnResize(i, r) {
    this.setSize(i, r);
  }
  /**
   * Adds a callback to the render loop before actual render call.
   * @param callback Executed before rendering.
   * @returns uuid to remove the callback.
   */
  AddPreRenderCallback(i) {
    const r = Zt.generateUUID();
    return this.preRenderCallbacks.set(r, i), r;
  }
  /**
   * Removes a callback from the render loop before actual render call.
   * @param uuid of callback to remove.
   * @returns if removing was successful.
   */
  RemovePreRenderCallback(i) {
    return this.preRenderCallbacks.has(i) ? (this.preRenderCallbacks.delete(i), !0) : !1;
  }
  /**
   * Adds a callback to the render loop after actual render call.
   * @param callback Executed after rendering.
   * @returns uuid to remove the callback.
   */
  AddPostRenderCallback(i) {
    const r = Zt.generateUUID();
    return this.postRenderCallbacks.set(r, i), r;
  }
  /**
   * Removes a callback from the render loop after actual render call.
   * @param uuid of callback to remove.
   * @returns if removing was successful.
   */
  RemovePostRenderCallback(i) {
    return this.postRenderCallbacks.has(i) ? (this.postRenderCallbacks.delete(i), !0) : !1;
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
  internal_render(i, r, h, b) {
    (this.paused || !this.running) && !this.force || (this.preRenderCallbacks.forEach((p) => {
      p(h, b);
    }), this.render(i, r), this.postRenderCallbacks.forEach((p) => {
      p(h, b);
    }), this.force = !1);
  }
}
class k_ extends gt {
  constructor() {
    super();
    w(this, "isDIVELight", !0);
    w(this, "isDIVEAmbientLight", !0);
    w(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new Q0(16777215, 1), this._light.layers.mask = xt, this.add(this._light);
  }
  SetColor(i) {
    this._light.color = i;
  }
  SetIntensity(i) {
    this._light.intensity = i;
  }
  SetEnabled(i) {
    this._light.visible = i;
  }
}
class B_ extends gt {
  constructor() {
    super();
    w(this, "isDIVELight", !0);
    w(this, "isDIVEPointLight", !0);
    w(this, "isMovable", !0);
    w(this, "isSelectable", !0);
    w(this, "gizmo", null);
    w(this, "light");
    w(this, "mesh");
    this.name = "DIVEPointLight", this.light = new K0(16777215, 1), this.light.layers.mask = xt, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const i = 0.1, r = new lo(
      i,
      i * 320,
      i * 320
    ), h = new ao({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: $0
    });
    this.mesh = new L(r, h), this.mesh.layers.mask = ou, this.add(this.mesh);
  }
  SetColor(i) {
    this.light.color = i, this.mesh.material.color = i;
  }
  SetIntensity(i) {
    this.light.intensity = i, this.mesh.material.opacity = i > 0.8 ? 0.8 : i * 0.8;
  }
  SetEnabled(i) {
    this.light.visible = i;
  }
  onMove() {
    var i;
    (i = rt.get(this.userData.id)) == null || i.PerformAction(
      "UPDATE_OBJECT",
      { id: this.userData.id, position: this.position }
    );
  }
  onSelect() {
    var i;
    (i = rt.get(this.userData.id)) == null || i.PerformAction(
      "SELECT_OBJECT",
      { id: this.userData.id }
    );
  }
  onDeselect() {
    var i;
    (i = rt.get(this.userData.id)) == null || i.PerformAction(
      "DESELECT_OBJECT",
      { id: this.userData.id }
    );
  }
}
class z_ extends gt {
  constructor() {
    super();
    w(this, "isDIVELight", !0);
    w(this, "isDIVESceneLight", !0);
    w(this, "_hemiLight");
    w(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new J0(16777215, 16777215, 2), this._hemiLight.layers.mask = xt, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new ru(16777215, 3), this._dirLight.layers.mask = xt, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
    const i = 5;
    this._dirLight.shadow.camera.left = -5, this._dirLight.shadow.camera.right = i, this._dirLight.shadow.camera.top = i, this._dirLight.shadow.camera.bottom = -5, this._dirLight.shadow.camera.far = 3500, this.add(this._dirLight);
  }
  SetColor(i) {
    this._hemiLight.color = i, this._dirLight.color = i;
  }
  SetIntensity(i) {
    this._hemiLight.intensity = i * 2, this._dirLight.intensity = i * 3;
  }
  SetEnabled(i) {
    this._hemiLight.visible = i, this._dirLight.visible = i;
  }
}
const fo = (S) => S.parent ? fo(S.parent) : S;
class G_ {
  constructor() {
    w(this, "isMovable", !0);
  }
}
class U_ {
  constructor() {
    w(this, "isSelectable", !0);
  }
}
function F_(S, a) {
  return a.forEach((i) => {
    Object.getOwnPropertyNames(i.prototype).forEach((r) => {
      Object.defineProperty(
        S.prototype,
        r,
        Object.getOwnPropertyDescriptor(i.prototype, r)
      );
    });
  }), S;
}
class po extends F_(gt, [
  U_,
  G_
]) {
  constructor() {
    super();
    w(this, "isDIVENode", !0);
    w(this, "gizmo", null);
    w(this, "_positionWorldBuffer");
    w(this, "_boundingBox");
    this.layers.mask = xt, this._positionWorldBuffer = new D(), this._boundingBox = new su();
  }
  SetPosition(i) {
    if (!this.parent) {
      this.position.set(i.x, i.y, i.z);
      return;
    }
    const r = new D(i.x, i.y, i.z);
    this.position.copy(this.parent.worldToLocal(r)), "isDIVEGroup" in this.parent && this.parent.UpdateLineTo(this);
  }
  SetRotation(i) {
    this.rotation.set(i.x, i.y, i.z);
  }
  SetScale(i) {
    this.scale.set(i.x, i.y, i.z);
  }
  SetVisibility(i) {
    this.visible = i;
  }
  SetToWorldOrigin() {
    var i;
    this.position.set(0, 0, 0), (i = rt.get(this.userData.id)) == null || i.PerformAction(
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
    var i;
    (i = rt.get(this.userData.id)) == null || i.PerformAction(
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
    var i;
    (i = rt.get(this.userData.id)) == null || i.PerformAction(
      "SELECT_OBJECT",
      { id: this.userData.id }
    );
  }
  onDeselect() {
    var i;
    (i = rt.get(this.userData.id)) == null || i.PerformAction(
      "DESELECT_OBJECT",
      { id: this.userData.id }
    );
  }
}
class W_ extends po {
  constructor() {
    super(...arguments);
    w(this, "isDIVEModel", !0);
    w(this, "_mesh", null);
    w(this, "_material", null);
  }
  SetModel(i) {
    this.clear(), this._boundingBox.makeEmpty(), i.traverse((r) => {
      r.castShadow = !0, r.receiveShadow = !0, r.layers.mask = this.layers.mask, this._boundingBox.expandByObject(r), !this._mesh && "isMesh" in r && (this._mesh = r, this._material ? this._mesh.material = this._material : this._material = r.material);
    }), this.add(i);
  }
  SetMaterial(i) {
    this._material || (this._material = new ho()), i.vertexColors !== void 0 && (this._material.vertexColors = i.vertexColors), i.color !== void 0 && this._material.color.set(i.color), i.map !== void 0 && (this._material.map = i.map), i.normalMap !== void 0 && (this._material.normalMap = i.normalMap), i.roughness !== void 0 && (this._material.roughness = i.roughness), i.roughnessMap !== void 0 && (this._material.roughnessMap = i.roughnessMap, this._material.roughnessMap && (this._material.roughness = 1)), i.metalness !== void 0 && (this._material.metalness = i.metalness), i.metalnessMap !== void 0 && (this._material.metalnessMap = i.metalnessMap, this._material.metalnessMap && (this._material.metalness = 1)), this._mesh && (this._mesh.material = this._material);
  }
  PlaceOnFloor() {
    var b, p, A, M, X;
    const i = this.getWorldPosition(this._positionWorldBuffer), r = i.clone();
    (p = (b = this._mesh) == null ? void 0 : b.geometry) == null || p.computeBoundingBox();
    const h = (M = (A = this._mesh) == null ? void 0 : A.geometry) == null ? void 0 : M.boundingBox;
    !h || !this._mesh || (i.y = i.y - this._mesh.localToWorld(h.min.clone()).y, i.y !== r.y && ((X = rt.get(this.userData.id)) == null || X.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: i,
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
    const i = this._boundingBox.min.y * this.scale.y, r = this.localToWorld(
      this._boundingBox.getCenter(new D()).multiply(this.scale)
    );
    r.y = i + this.position.y;
    const h = new Fr(r, new D(0, -1, 0));
    h.layers.mask = xt;
    const b = h.intersectObjects(
      fo(this).Root.children,
      !0
    );
    if (b.length > 0) {
      const p = b[0].object;
      p.geometry.computeBoundingBox();
      const A = p.geometry.boundingBox, M = p.localToWorld(A.max.clone()), X = this.position.clone(), ue = this.position.clone().setY(M.y).sub(new D(0, i, 0));
      if (this.position.copy(ue), this.position.y === X.y) return;
      this.onMove();
    }
  }
}
class N_ extends po {
  constructor() {
    super();
    w(this, "isDIVEPrimitive", !0);
    w(this, "_mesh");
    this._mesh = new L(), this._mesh.layers.mask = xt, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new ho(), this.add(this._mesh);
  }
  SetGeometry(i) {
    const r = this.assembleGeometry(i);
    r && (this._mesh.geometry = r, this._boundingBox.setFromObject(this._mesh));
  }
  SetMaterial(i) {
    const r = this._mesh.material;
    i.vertexColors !== void 0 && (r.vertexColors = i.vertexColors), i.color !== void 0 && (r.color = new Xt(i.color)), i.map !== void 0 && (r.map = i.map), i.normalMap !== void 0 && (r.normalMap = i.normalMap), i.roughness !== void 0 && (r.roughness = i.roughness), i.roughnessMap !== void 0 && (r.roughnessMap = i.roughnessMap, r.roughnessMap && (r.roughness = 1)), i.metalness !== void 0 && (r.metalness = i.metalness), i.metalnessMap !== void 0 && (r.metalnessMap = i.metalnessMap, r.metalnessMap && (r.metalness = 0)), this._mesh && (this._mesh.material = r);
  }
  PlaceOnFloor() {
    var b, p, A, M, X;
    const i = this.getWorldPosition(this._positionWorldBuffer), r = i.clone();
    (p = (b = this._mesh) == null ? void 0 : b.geometry) == null || p.computeBoundingBox();
    const h = (M = (A = this._mesh) == null ? void 0 : A.geometry) == null ? void 0 : M.boundingBox;
    !h || !this._mesh || (i.y = i.y - this._mesh.localToWorld(h.min.clone()).y, i.y !== r.y && ((X = rt.get(this.userData.id)) == null || X.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: i,
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
    const i = this._boundingBox.min.y * this.scale.y, r = this.localToWorld(
      this._boundingBox.getCenter(new D()).multiply(this.scale)
    );
    r.y = i + this.position.y;
    const h = new Fr(r, new D(0, -1, 0));
    h.layers.mask = xt;
    const b = h.intersectObjects(
      fo(this).Root.children,
      !0
    );
    if (b.length > 0) {
      const p = b[0].object;
      p.geometry.computeBoundingBox();
      const A = p.geometry.boundingBox, M = p.localToWorld(A.max.clone()), X = this.position.clone(), ue = this.position.clone().setY(M.y).sub(new D(0, i, 0));
      if (this.position.copy(ue), this.position.y === X.y) return;
      this.onMove();
    }
  }
  assembleGeometry(i) {
    switch (this._mesh.material.flatShading = !1, i.name.toLowerCase()) {
      case "cylinder":
        return this.createCylinderGeometry(i);
      case "sphere":
        return this.createSphereGeometry(i);
      case "pyramid":
        return this._mesh.material.flatShading = !0, this.createPyramidGeometry(i);
      case "cube":
      case "box":
        return this.createBoxGeometry(i);
      case "cone":
        return this.createConeGeometry(i);
      case "wall":
        return this.createWallGeometry(i);
      case "plane":
        return this.createPlaneGeometry(i);
      default:
        return console.warn(
          "DIVEPrimitive.assembleGeometry: Invalid geometry type:",
          i.name.toLowerCase()
        ), null;
    }
  }
  createCylinderGeometry(i) {
    const r = new Fe(
      i.width / 2,
      i.width / 2,
      i.height,
      64
    );
    return r.translate(0, i.height / 2, 0), r;
  }
  createSphereGeometry(i) {
    return new lo(i.width / 2, 256, 256);
  }
  createPyramidGeometry(i) {
    const r = new Float32Array([
      -i.width / 2,
      0,
      -i.depth / 2,
      // 0
      i.width / 2,
      0,
      -i.depth / 2,
      // 1
      i.width / 2,
      0,
      i.depth / 2,
      // 2
      -i.width / 2,
      0,
      i.depth / 2,
      // 3
      0,
      i.height,
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
      new Xl(r, 3)
    ), b.setIndex(new Xl(h, 1)), b.computeVertexNormals(), b.computeBoundingBox(), b.computeBoundingSphere(), b;
  }
  createBoxGeometry(i) {
    const r = new xe(
      i.width,
      i.height,
      i.depth
    );
    return r.translate(0, i.height / 2, 0), r;
  }
  createConeGeometry(i) {
    const r = new e_(i.width / 2, i.height, 256);
    return r.translate(0, i.height / 2, 0), r;
  }
  createWallGeometry(i) {
    const r = new xe(
      i.width,
      i.height,
      i.depth || 0.05,
      16
    );
    return r.translate(0, i.height / 2, 0), r;
  }
  createPlaneGeometry(i) {
    const r = new xe(
      i.width,
      i.height,
      i.depth
    );
    return r.translate(0, i.height / 2, 0), r;
  }
}
class H_ extends po {
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
  SetPosition(i) {
    super.SetPosition(i), this._members.forEach((r) => {
      "isDIVENode" in r && r.onMove();
    });
  }
  SetLinesVisibility(i, r) {
    if (!r) {
      this._lines.forEach((b) => {
        b.visible = i;
      });
      return;
    }
    const h = this._members.indexOf(r);
    h !== -1 && (this._lines[h].visible = i);
  }
  attach(i) {
    if (this._members.includes(i))
      return this;
    const r = this.createLine();
    return this.add(r), this._lines.push(r), super.attach(i), this._members.push(i), this.updateLineTo(r, i), this.SetLinesVisibility(!0, i), this;
  }
  remove(i) {
    const r = this._members.indexOf(i);
    if (r === -1) return this;
    const h = this._lines[r];
    return super.remove(h), this._lines.splice(r, 1), super.remove(i), this._members.splice(r, 1), this;
  }
  UpdateLineTo(i) {
    const r = this._members.indexOf(i);
    r !== -1 && this.updateLineTo(this._lines[r], i);
  }
  /**
   * Adds a line to this grouo as last child.
   */
  createLine() {
    const i = new Gr(), r = new t_({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), h = new Yt(i, r);
    return h.visible = !1, h;
  }
  /**
   * Updates a line to the object.
   */
  updateLineTo(i, r) {
    i.geometry.setFromPoints([
      new D(0, 0, 0),
      r.position.clone()
    ]), i.computeLineDistances();
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
class go extends gt {
  constructor() {
    super();
    w(this, "isDIVERoot", !0);
    w(this, "_assetLoader");
    this.name = "Root", this._assetLoader = Cr.get("AssetLoader").then(
      (i) => new i()
    );
  }
  ComputeSceneBB() {
    const i = new su();
    return this.traverse((r) => {
      "isObject3D" in r && i.expandByObject(r);
    }), i;
  }
  GetSceneObject(i) {
    let r;
    return this.traverse((h) => {
      r || h.userData.id === i.id && (r = h);
    }), r;
  }
  AddSceneObject(i) {
    switch (i.entityType) {
      case "pov":
        break;
      case "light": {
        this.updateLight(i);
        break;
      }
      case "model": {
        this.updateModel(i);
        break;
      }
      case "primitive": {
        this.updatePrimitive(i);
        break;
      }
      case "group": {
        this.updateGroup(i);
        break;
      }
      default:
        console.warn(
          `DIVERoot.AddSceneObject: Unknown entity type: ${i.entityType}`
        );
    }
  }
  UpdateSceneObject(i) {
    switch (i.entityType) {
      case "pov":
        break;
      case "light": {
        this.updateLight(i);
        break;
      }
      case "model": {
        this.updateModel(i);
        break;
      }
      case "primitive": {
        this.updatePrimitive(i);
        break;
      }
      case "group": {
        this.updateGroup(i);
        break;
      }
      default:
        console.warn(
          `DIVERoot.UpdateSceneObject: Unknown entity type: ${i.entityType}`
        );
    }
  }
  DeleteSceneObject(i) {
    switch (i.entityType) {
      case "pov":
        break;
      case "light": {
        this.deleteLight(i);
        break;
      }
      case "model": {
        this.deleteModel(i);
        break;
      }
      case "primitive": {
        this.deletePrimitive(i);
        break;
      }
      case "group": {
        this.deleteGroup(i);
        break;
      }
      default:
        console.warn(
          `DIVERoot.DeleteSceneObject: Unknown entity type: ${i.entityType}`
        );
    }
  }
  PlaceOnFloor(i) {
    switch (i.entityType) {
      case "pov":
      case "light":
        break;
      case "model":
      case "primitive": {
        this.placeOnFloor(i);
        break;
      }
      default:
        console.warn(
          `DIVERoot.PlaceOnFloor: Unknown entity type: ${i.entityType}`
        );
    }
  }
  updateLight(i) {
    let r = this.GetSceneObject(i);
    if (!r) {
      switch (i.type) {
        case "scene": {
          r = new z_();
          break;
        }
        case "ambient": {
          r = new k_();
          break;
        }
        case "point": {
          r = new B_();
          break;
        }
        default: {
          console.warn(
            `DIVERoot.updateLight: Unknown light type: ${i.type}`
          );
          return;
        }
      }
      r.userData.id = i.id, this.add(r);
    }
    i.name !== void 0 && i.name !== null && (r.name = i.name), i.position !== void 0 && i.position !== null && r.position.set(
      i.position.x,
      i.position.y,
      i.position.z
    ), i.intensity !== void 0 && i.intensity !== null && r.SetIntensity(
      i.intensity
    ), i.enabled !== void 0 && i.enabled !== null && r.SetEnabled(
      i.enabled
    ), i.color !== void 0 && i.color !== null && r.SetColor(
      new Xt(i.color)
    ), i.visible !== void 0 && i.visible !== null && (r.visible = i.visible), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
  }
  updateModel(i) {
    let r = this.GetSceneObject(i);
    r || (r = new W_(), r.userData.id = i.id, r.userData.uri = i.uri, this.add(r)), i.uri !== void 0 && this._assetLoader.then((h) => h.load(i.uri)).then((h) => {
      var b;
      r.SetModel(h), (b = rt.get(i.id)) == null || b.PerformAction(
        "MODEL_LOADED",
        { id: i.id }
      );
    }), i.name !== void 0 && (r.name = i.name), i.position !== void 0 && r.SetPosition(i.position), i.rotation !== void 0 && r.SetRotation(i.rotation), i.scale !== void 0 && r.SetScale(i.scale), i.visible !== void 0 && r.SetVisibility(i.visible), i.material !== void 0 && r.SetMaterial(i.material), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
  }
  updatePrimitive(i) {
    let r = this.GetSceneObject(i);
    r || (r = new N_(), r.userData.id = i.id, this.add(r)), i.name !== void 0 && (r.name = i.name), i.geometry !== void 0 && r.SetGeometry(i.geometry), i.position !== void 0 && r.SetPosition(i.position), i.rotation !== void 0 && r.SetRotation(i.rotation), i.scale !== void 0 && r.SetScale(i.scale), i.visible !== void 0 && r.SetVisibility(i.visible), i.material !== void 0 && r.SetMaterial(i.material), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
  }
  updateGroup(i) {
    let r = this.GetSceneObject(i);
    r || (r = new H_(), r.userData.id = i.id, this.add(r)), i.name !== void 0 && (r.name = i.name), i.position !== void 0 && r.SetPosition(i.position), i.rotation !== void 0 && r.SetRotation(i.rotation), i.scale !== void 0 && r.SetScale(i.scale), i.visible !== void 0 && r.SetVisibility(i.visible), i.bbVisible !== void 0 && r.SetLinesVisibility(i.bbVisible), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
  }
  deleteLight(i) {
    const r = this.GetSceneObject(i);
    if (!r) {
      console.warn(
        `DIVERoot.deleteLight: Light with id ${i.id} not found`
      );
      return;
    }
    this.detachTransformControls(r), r.parent.remove(r);
  }
  deleteModel(i) {
    const r = this.GetSceneObject(i);
    if (!r) {
      console.warn(
        `DIVERoot.deleteModel: Model with id ${i.id} not found`
      );
      return;
    }
    this.detachTransformControls(r), r.parent.remove(r);
  }
  deletePrimitive(i) {
    const r = this.GetSceneObject(i);
    if (!r) {
      console.warn(
        `DIVERoot.deletePrimitive: Primitive with id ${i.id} not found`
      );
      return;
    }
    this.detachTransformControls(r), r.parent.remove(r);
  }
  deleteGroup(i) {
    const r = this.GetSceneObject(i);
    if (!r) {
      console.warn(
        `DIVERoot.deleteGroup: Group with id ${i.id} not found`
      );
      return;
    }
    this.detachTransformControls(r);
    for (let h = r.members.length - 1; h >= 0; h--)
      this.attach(r.members[h]);
    r.parent.remove(r);
  }
  placeOnFloor(i) {
    const r = this.GetSceneObject(i);
    r && r.PlaceOnFloor();
  }
  setParent(i) {
    const r = this.GetSceneObject(i);
    if (r)
      if (i.parentId !== null) {
        const h = this.GetSceneObject({
          id: i.parentId
        });
        if (!h) return;
        h.attach(r);
      } else
        this.attach(r);
  }
  detachTransformControls(i) {
    this.findScene(i).children.find((r) => {
      "isTransformControls" in r && r.detach();
    });
  }
  findScene(i) {
    return i.parent !== null ? this.findScene(i.parent) : i;
  }
}
const Y_ = "#888888", X_ = "#dddddd";
class Z_ extends gt {
  constructor() {
    super(), this.name = "Grid";
    const a = new n_(
      100,
      100,
      Y_,
      X_
    );
    a.material.depthTest = !1, a.layers.mask = c_, this.add(a);
  }
  SetVisibility(a) {
    this.visible = a;
  }
}
class j_ extends L {
  constructor() {
    super(
      new co(1e4, 1e4),
      new ho({
        color: new Xt(150 / 255, 150 / 255, 150 / 255)
      })
    );
    w(this, "isFloor", !0);
    this.name = "Floor", this.layers.mask = xt, this.receiveShadow = !0, this.rotateX(-Math.PI / 2);
  }
  SetVisibility(i) {
    this.visible = i;
  }
  SetColor(i) {
    this.material.color = new Xt(i);
  }
}
class V_ {
  constructor(a, i, r, h, b) {
    this.xrLight = a, this.renderer = i, this.lightProbe = r, this.xrWebGLBinding = null, this.estimationStartCallback = b, this.frameCallback = this.onXRFrame.bind(this);
    const p = i.xr.getSession();
    if (h && "XRWebGLBinding" in window) {
      const A = new s_(16);
      a.environment = A.texture;
      const M = i.getContext();
      switch (p.preferredReflectionFormat) {
        case "srgba8":
          M.getExtension("EXT_sRGB");
          break;
        case "rgba16f":
          M.getExtension("OES_texture_half_float");
          break;
      }
      this.xrWebGLBinding = new XRWebGLBinding(p, M), this.lightProbe.addEventListener("reflectionchange", () => {
        this.updateReflection();
      });
    }
    p.requestAnimationFrame(this.frameCallback);
  }
  updateReflection() {
    const a = this.renderer.properties.get(this.xrLight.environment);
    if (a) {
      const i = this.xrWebGLBinding.getReflectionCubeMap(this.lightProbe);
      i && (a.__webglTexture = i, this.xrLight.environment.needsPMREMUpdate = !0);
    }
  }
  onXRFrame(a, i) {
    if (!this.xrLight)
      return;
    i.session.requestAnimationFrame(this.frameCallback);
    const h = i.getLightEstimate(this.lightProbe);
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
class q_ extends i_ {
  constructor(a, i = !0) {
    super(), this.lightProbe = new r_(), this.lightProbe.intensity = 0, this.add(this.lightProbe), this.directionalLight = new ru(), this.directionalLight.intensity = 0, this.add(this.directionalLight), this.environment = null;
    let r = null, h = !1;
    a.xr.addEventListener("sessionstart", () => {
      const b = a.xr.getSession();
      "requestLightProbe" in b && b.requestLightProbe({
        reflectionFormat: b.preferredReflectionFormat
      }).then((p) => {
        r = new V_(this, a, p, i, () => {
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
class Q_ extends gt {
  constructor(i) {
    super();
    w(this, "_scene");
    w(this, "_xrLight");
    w(this, "_lightRoot");
    this.name = "XRLightRoot", this._scene = i, this._xrLight = null, this._lightRoot = new go(), this._lightRoot.UpdateSceneObject({
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
  InitLightEstimation(i) {
    this._xrLight || (this._xrLight = new q_(i, !0), this._xrLight.layers.mask = xt, this.add(this._xrLight)), this._xrLight.addEventListener("estimationstart", () => {
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
class K_ extends gt {
  constructor(i) {
    super();
    w(this, "_xrLightRoot");
    w(this, "_xrModelRoot");
    w(this, "_xrHandNode");
    w(this, "_xrShadowPlane");
    this.name = "XRRoot", this._xrModelRoot = new go(), this._xrModelRoot.name = "XRModelRoot", this.add(this._xrModelRoot), this._xrShadowPlane = new L(
      new co(100, 100),
      new o_({ opacity: 1, transparent: !0 })
    ), this._xrModelRoot.add(this._xrShadowPlane), this._xrLightRoot = new Q_(i), this._xrLightRoot.name = "XRLightRoot", this.add(this._xrLightRoot), this._xrHandNode = new gt(), this._xrHandNode.name = "XRHandNode", this.add(this._xrHandNode);
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
  InitLightEstimation(i) {
    this._xrLightRoot.InitLightEstimation(i);
  }
  DisposeLightEstimation() {
    this._xrLightRoot.DisposeLightEstimation();
  }
}
class $_ extends a_ {
  constructor() {
    super();
    w(this, "_root");
    w(this, "_floor");
    w(this, "_grid");
    w(this, "_xrRoot");
    this.background = new Xt(16777215), this._root = new go(), this.add(this._root), this._floor = new j_(), this.add(this._floor), this._grid = new Z_(), this.add(this._grid), this._xrRoot = new K_(this), this._xrRoot.visible = !1, this.add(this._xrRoot);
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
  InitXR(i) {
    this._root.visible = !1, this._xrRoot.visible = !0, this._xrRoot.InitLightEstimation(i);
  }
  DisposeXR() {
    this._root.visible = !0, this._xrRoot.visible = !1, this._xrRoot.DisposeLightEstimation();
  }
  SetBackground(i) {
    this.background = new Xt(i);
  }
  ComputeSceneBB() {
    return this.Root.ComputeSceneBB();
  }
  GetSceneObject(i) {
    return this.Root.GetSceneObject(i);
  }
  AddSceneObject(i) {
    this.Root.AddSceneObject(i);
  }
  UpdateSceneObject(i) {
    this.Root.UpdateSceneObject(i);
  }
  DeleteSceneObject(i) {
    this.Root.DeleteSceneObject(i);
  }
  PlaceOnFloor(i) {
    this.Root.PlaceOnFloor(i);
  }
}
const hu = {
  autoResize: !0,
  autoStart: !0,
  displayAxes: !1,
  renderer: Ln,
  perspectiveCamera: h_
};
class J_ {
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
      ...hu,
      ...a ?? {}
    }, this._renderer = new C_(this._settings.renderer), this._scene = new $_(), this._perspectiveCamera = new f_(
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
  onResize(a, i) {
    this.renderer.OnResize(a, i), this.perspectiveCamera.OnResize(a, i);
  }
  _addResizeObserver() {
    this._resizeObserverId = this.renderer.AddPreRenderCallback(() => {
      const a = this.renderer.domElement.parentElement;
      if (!a) return;
      const { clientWidth: i, clientHeight: r } = a;
      i === this._width && r === this._height || (this.onResize(i, r), this._width = i, this._height = r);
    });
  }
  _removeResizeObserver() {
    this.renderer.RemovePreRenderCallback(this._resizeObserverId);
  }
}
function Dt(S, a) {
  const i = (S + "e").split("e");
  return +(i[0] + "e" + (+i[1] + (a || 0)));
}
function em(S, a = 0) {
  const i = Dt(S, +a);
  return Dt(Math.ceil(i), -a);
}
function tm(S, a = 0) {
  const i = Dt(S, +a);
  return Dt(Math.floor(i), -a);
}
function fu(S, a = 0) {
  if (S < 0) return -fu(-S, a);
  const i = Dt(S, +a);
  return Dt(Math.round(i), -a);
}
function nm(S, a, i) {
  return Math.atan2(
    S.clone().cross(a).dot(i),
    a.clone().dot(S)
  );
}
function im(S, a = 0) {
  const i = Dt(S, +a);
  return Dt(Math.round(i), -a).toFixed(a);
}
function rm(S, a = 0) {
  const i = Dt(S, +a);
  return Dt(Math.trunc(i), -a);
}
function sm(S) {
  return (Zt.radToDeg(S) + 360) % 360;
}
function om(S) {
  return Zt.degToRad(S);
}
const pm = {
  ceilExp: em,
  floorExp: tm,
  roundExp: fu,
  toFixedExp: im,
  truncateExp: rm,
  signedAngleTo: nm,
  radToDeg: sm,
  degToRad: om
}, am = {
  ...hu,
  orbitControls: kr
};
class du {
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
      ...am,
      ...a ?? {}
    }, this._engine = new J_(a), this.animationSystem = new I_(this._engine.renderer), this.orbitControls = new io(
      this._engine.perspectiveCamera,
      this._engine.renderer,
      this.animationSystem,
      this._settings.orbitControls
    ), this.toolbox = new cu(this._engine.scene, this.orbitControls), this._communication = new rt(
      this._engine.renderer,
      this._engine.scene,
      this.orbitControls,
      this.toolbox
    ), this._settings.displayAxes ? this.axisCamera = new D_(
      this._engine.renderer,
      this._engine.scene,
      this.orbitControls
    ) : this.axisCamera = null, window.DIVE = {
      PrintScene: () => this._engine.scene
    }, console.log(`DIVE ${M_.version} initialized successfully!`), console.log(`
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
  static async QuickView(a, i) {
    return new Promise((r) => {
      const h = new du(i);
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
      h._communication.Subscribe("MODEL_LOADED", (A) => {
        if (A.id !== p) return;
        const M = h._communication.PerformAction(
          "COMPUTE_ENCOMPASSING_VIEW",
          {}
        );
        h._communication.PerformAction("SET_CAMERA_TRANSFORM", {
          position: M.position,
          target: M.target
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
  Sm as ARCompatibilityError,
  du as DIVE,
  rt as DIVECommunication,
  am as DIVEDefaultSettings,
  pm as DIVEMath,
  Pm as ESystem,
  Am as EWebXRUnsupportedReason,
  mm as FILE_TYPES,
  ym as FileTypeError,
  bm as NetworkError,
  Em as ParseError,
  vm as SUPPORTED_FILE_TYPES,
  du as default
};
//# sourceMappingURL=index.mjs.map
