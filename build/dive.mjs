var Dt = Object.defineProperty;
var xt = (h, s, t) => s in h ? Dt(h, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[s] = t;
var a = (h, s, t) => xt(h, typeof s != "symbol" ? s + "" : s, t);
import { Ray as Tt, Plane as Lt, MathUtils as C, EventDispatcher as Pt, Vector3 as m, MOUSE as G, TOUCH as U, Spherical as Ne, Quaternion as Fe, Vector2 as E, OrthographicCamera as St, Vector4 as Mt, AxesHelper as It, Color as D, Matrix4 as Ct, Object3D as j, AmbientLight as vt, PointLight as Ot, SphereGeometry as Ke, MeshBasicMaterial as At, FrontSide as kt, Mesh as pe, HemisphereLight as Rt, DirectionalLight as Vt, Box3 as Ze, MeshStandardMaterial as fe, Raycaster as Xe, CylinderGeometry as Bt, BufferGeometry as qe, BufferAttribute as Ye, BoxGeometry as de, ConeGeometry as zt, LineDashedMaterial as Nt, Line as Ft, PlaneGeometry as Yt, GridHelper as Gt, Scene as Ut, WebGLRenderer as Ge } from "three";
import ue from "three-spritetext";
import { C as q, P as S, U as jt, H as Ht } from "./chunks/VisibilityLayerMask-CXgt1fJc.mjs";
import { A as Wt, a as Kt, b as Zt, c as Xt, d as qt, e as Jt } from "./chunks/findInterface-OrXgmwxj.mjs";
import { f as Fi, i as Yi } from "./chunks/findInterface-OrXgmwxj.mjs";
import { g as w } from "./chunks/ModuleRegistry-RSub8W0G.mjs";
import { D as $t, a as Qt } from "./chunks/PerspectiveCamera-sm4_81KJ.mjs";
import { F as Ui, S as ji, g as Hi, i as Wi } from "./chunks/FileTypes-qgYnI0Jg.mjs";
import { E as Zi, a as Xi } from "./chunks/index-C_uFFwT2.mjs";
const Ue = { type: "change" }, me = { type: "start" }, je = { type: "end" }, ie = new Tt(), He = new Lt(), ei = Math.cos(70 * C.DEG2RAD);
class ti extends Pt {
  constructor(s, t) {
    super(), this.object = s, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new m(), this.cursor = new m(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: G.ROTATE, MIDDLE: G.DOLLY, RIGHT: G.PAN }, this.touches = { ONE: U.ROTATE, TWO: U.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(i) {
      i.addEventListener("keydown", ce), this._domElementKeyEvents = i;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ce), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Ue), e.update(), o = n.NONE;
    }, this.update = function() {
      const i = new m(), r = new Fe().setFromUnitVectors(s.up, new m(0, 1, 0)), d = r.clone().invert(), u = new m(), y = new Fe(), I = new m(), b = 2 * Math.PI;
      return function(Et = null) {
        const Be = e.object.position;
        i.copy(Be).sub(e.target), i.applyQuaternion(r), l.setFromVector3(i), e.autoRotate && o === n.NONE && W(st(Et)), e.enableDamping ? (l.theta += p.theta * e.dampingFactor, l.phi += p.phi * e.dampingFactor) : (l.theta += p.theta, l.phi += p.phi);
        let T = e.minAzimuthAngle, L = e.maxAzimuthAngle;
        isFinite(T) && isFinite(L) && (T < -Math.PI ? T += b : T > Math.PI && (T -= b), L < -Math.PI ? L += b : L > Math.PI && (L -= b), T <= L ? l.theta = Math.max(T, Math.min(L, l.theta)) : l.theta = l.theta > (T + L) / 2 ? Math.max(T, l.theta) : Math.min(L, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(_, e.dampingFactor) : e.target.add(_), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let Z = !1;
        if (e.zoomToCursor && $ || e.object.isOrthographicCamera)
          l.radius = he(l.radius);
        else {
          const P = l.radius;
          l.radius = he(l.radius * f), Z = P != l.radius;
        }
        if (i.setFromSpherical(l), i.applyQuaternion(d), Be.copy(e.target).add(i), e.object.lookAt(e.target), e.enableDamping === !0 ? (p.theta *= 1 - e.dampingFactor, p.phi *= 1 - e.dampingFactor, _.multiplyScalar(1 - e.dampingFactor)) : (p.set(0, 0, 0), _.set(0, 0, 0)), e.zoomToCursor && $) {
          let P = null;
          if (e.object.isPerspectiveCamera) {
            const X = i.length();
            P = he(X * f);
            const te = X - P;
            e.object.position.addScaledVector(ye, te), e.object.updateMatrixWorld(), Z = !!te;
          } else if (e.object.isOrthographicCamera) {
            const X = new m(M.x, M.y, 0);
            X.unproject(e.object);
            const te = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), Z = te !== e.object.zoom;
            const ze = new m(M.x, M.y, 0);
            ze.unproject(e.object), e.object.position.sub(ze).add(X), e.object.updateMatrixWorld(), P = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          P !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(P).add(e.object.position) : (ie.origin.copy(e.object.position), ie.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(ie.direction)) < ei ? s.lookAt(e.target) : (He.setFromNormalAndCoplanarPoint(e.object.up, e.target), ie.intersectPlane(He, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const P = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), P !== e.object.zoom && (e.object.updateProjectionMatrix(), Z = !0);
        }
        return f = 1, $ = !1, Z || u.distanceToSquared(e.object.position) > c || 8 * (1 - y.dot(e.object.quaternion)) > c || I.distanceToSquared(e.target) > c ? (e.dispatchEvent(Ue), u.copy(e.object.position), y.copy(e.object.quaternion), I.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Re), e.domElement.removeEventListener("pointerdown", Ce), e.domElement.removeEventListener("pointercancel", K), e.domElement.removeEventListener("wheel", ve), e.domElement.removeEventListener("pointermove", le), e.domElement.removeEventListener("pointerup", K), e.domElement.getRootNode().removeEventListener("keydown", Oe, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", ce), e._domElementKeyEvents = null);
    };
    const e = this, n = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let o = n.NONE;
    const c = 1e-6, l = new Ne(), p = new Ne();
    let f = 1;
    const _ = new m(), v = new E(), O = new E(), V = new E(), A = new E(), k = new E(), B = new E(), z = new E(), N = new E(), R = new E(), ye = new m(), M = new E();
    let $ = !1;
    const g = [], H = {};
    let oe = !1;
    function st(i) {
      return i !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * i : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Q(i) {
      const r = Math.abs(i * 0.01);
      return Math.pow(0.95, e.zoomSpeed * r);
    }
    function W(i) {
      p.theta -= i;
    }
    function ee(i) {
      p.phi -= i;
    }
    const be = function() {
      const i = new m();
      return function(d, u) {
        i.setFromMatrixColumn(u, 0), i.multiplyScalar(-d), _.add(i);
      };
    }(), we = function() {
      const i = new m();
      return function(d, u) {
        e.screenSpacePanning === !0 ? i.setFromMatrixColumn(u, 1) : (i.setFromMatrixColumn(u, 0), i.crossVectors(e.object.up, i)), i.multiplyScalar(d), _.add(i);
      };
    }(), F = function() {
      const i = new m();
      return function(d, u) {
        const y = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const I = e.object.position;
          i.copy(I).sub(e.target);
          let b = i.length();
          b *= Math.tan(e.object.fov / 2 * Math.PI / 180), be(2 * d * b / y.clientHeight, e.object.matrix), we(2 * u * b / y.clientHeight, e.object.matrix);
        } else e.object.isOrthographicCamera ? (be(d * (e.object.right - e.object.left) / e.object.zoom / y.clientWidth, e.object.matrix), we(u * (e.object.top - e.object.bottom) / e.object.zoom / y.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function re(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ee(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function ae(i, r) {
      if (!e.zoomToCursor)
        return;
      $ = !0;
      const d = e.domElement.getBoundingClientRect(), u = i - d.left, y = r - d.top, I = d.width, b = d.height;
      M.x = u / I * 2 - 1, M.y = -(y / b) * 2 + 1, ye.set(M.x, M.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function he(i) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, i));
    }
    function De(i) {
      v.set(i.clientX, i.clientY);
    }
    function nt(i) {
      ae(i.clientX, i.clientX), z.set(i.clientX, i.clientY);
    }
    function xe(i) {
      A.set(i.clientX, i.clientY);
    }
    function ot(i) {
      O.set(i.clientX, i.clientY), V.subVectors(O, v).multiplyScalar(e.rotateSpeed);
      const r = e.domElement;
      W(2 * Math.PI * V.x / r.clientHeight), ee(2 * Math.PI * V.y / r.clientHeight), v.copy(O), e.update();
    }
    function rt(i) {
      N.set(i.clientX, i.clientY), R.subVectors(N, z), R.y > 0 ? re(Q(R.y)) : R.y < 0 && Ee(Q(R.y)), z.copy(N), e.update();
    }
    function at(i) {
      k.set(i.clientX, i.clientY), B.subVectors(k, A).multiplyScalar(e.panSpeed), F(B.x, B.y), A.copy(k), e.update();
    }
    function ht(i) {
      ae(i.clientX, i.clientY), i.deltaY < 0 ? Ee(Q(i.deltaY)) : i.deltaY > 0 && re(Q(i.deltaY)), e.update();
    }
    function lt(i) {
      let r = !1;
      switch (i.code) {
        case e.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? ee(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : F(0, e.keyPanSpeed), r = !0;
          break;
        case e.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? ee(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : F(0, -e.keyPanSpeed), r = !0;
          break;
        case e.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? W(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : F(e.keyPanSpeed, 0), r = !0;
          break;
        case e.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? W(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : F(-e.keyPanSpeed, 0), r = !0;
          break;
      }
      r && (i.preventDefault(), e.update());
    }
    function Te(i) {
      if (g.length === 1)
        v.set(i.pageX, i.pageY);
      else {
        const r = Y(i), d = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        v.set(d, u);
      }
    }
    function Le(i) {
      if (g.length === 1)
        A.set(i.pageX, i.pageY);
      else {
        const r = Y(i), d = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        A.set(d, u);
      }
    }
    function Pe(i) {
      const r = Y(i), d = i.pageX - r.x, u = i.pageY - r.y, y = Math.sqrt(d * d + u * u);
      z.set(0, y);
    }
    function ct(i) {
      e.enableZoom && Pe(i), e.enablePan && Le(i);
    }
    function dt(i) {
      e.enableZoom && Pe(i), e.enableRotate && Te(i);
    }
    function Se(i) {
      if (g.length == 1)
        O.set(i.pageX, i.pageY);
      else {
        const d = Y(i), u = 0.5 * (i.pageX + d.x), y = 0.5 * (i.pageY + d.y);
        O.set(u, y);
      }
      V.subVectors(O, v).multiplyScalar(e.rotateSpeed);
      const r = e.domElement;
      W(2 * Math.PI * V.x / r.clientHeight), ee(2 * Math.PI * V.y / r.clientHeight), v.copy(O);
    }
    function Me(i) {
      if (g.length === 1)
        k.set(i.pageX, i.pageY);
      else {
        const r = Y(i), d = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        k.set(d, u);
      }
      B.subVectors(k, A).multiplyScalar(e.panSpeed), F(B.x, B.y), A.copy(k);
    }
    function Ie(i) {
      const r = Y(i), d = i.pageX - r.x, u = i.pageY - r.y, y = Math.sqrt(d * d + u * u);
      N.set(0, y), R.set(0, Math.pow(N.y / z.y, e.zoomSpeed)), re(R.y), z.copy(N);
      const I = (i.pageX + r.x) * 0.5, b = (i.pageY + r.y) * 0.5;
      ae(I, b);
    }
    function ut(i) {
      e.enableZoom && Ie(i), e.enablePan && Me(i);
    }
    function mt(i) {
      e.enableZoom && Ie(i), e.enableRotate && Se(i);
    }
    function Ce(i) {
      e.enabled !== !1 && (g.length === 0 && (e.domElement.setPointerCapture(i.pointerId), e.domElement.addEventListener("pointermove", le), e.domElement.addEventListener("pointerup", K)), !wt(i) && (yt(i), i.pointerType === "touch" ? ke(i) : pt(i)));
    }
    function le(i) {
      e.enabled !== !1 && (i.pointerType === "touch" ? _t(i) : ft(i));
    }
    function K(i) {
      switch (bt(i), g.length) {
        case 0:
          e.domElement.releasePointerCapture(i.pointerId), e.domElement.removeEventListener("pointermove", le), e.domElement.removeEventListener("pointerup", K), e.dispatchEvent(je), o = n.NONE;
          break;
        case 1:
          const r = g[0], d = H[r];
          ke({ pointerId: r, pageX: d.x, pageY: d.y });
          break;
      }
    }
    function pt(i) {
      let r;
      switch (i.button) {
        case 0:
          r = e.mouseButtons.LEFT;
          break;
        case 1:
          r = e.mouseButtons.MIDDLE;
          break;
        case 2:
          r = e.mouseButtons.RIGHT;
          break;
        default:
          r = -1;
      }
      switch (r) {
        case G.DOLLY:
          if (e.enableZoom === !1) return;
          nt(i), o = n.DOLLY;
          break;
        case G.ROTATE:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enablePan === !1) return;
            xe(i), o = n.PAN;
          } else {
            if (e.enableRotate === !1) return;
            De(i), o = n.ROTATE;
          }
          break;
        case G.PAN:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enableRotate === !1) return;
            De(i), o = n.ROTATE;
          } else {
            if (e.enablePan === !1) return;
            xe(i), o = n.PAN;
          }
          break;
        default:
          o = n.NONE;
      }
      o !== n.NONE && e.dispatchEvent(me);
    }
    function ft(i) {
      switch (o) {
        case n.ROTATE:
          if (e.enableRotate === !1) return;
          ot(i);
          break;
        case n.DOLLY:
          if (e.enableZoom === !1) return;
          rt(i);
          break;
        case n.PAN:
          if (e.enablePan === !1) return;
          at(i);
          break;
      }
    }
    function ve(i) {
      e.enabled === !1 || e.enableZoom === !1 || o !== n.NONE || (i.preventDefault(), e.dispatchEvent(me), ht(gt(i)), e.dispatchEvent(je));
    }
    function gt(i) {
      const r = i.deltaMode, d = {
        clientX: i.clientX,
        clientY: i.clientY,
        deltaY: i.deltaY
      };
      switch (r) {
        case 1:
          d.deltaY *= 16;
          break;
        case 2:
          d.deltaY *= 100;
          break;
      }
      return i.ctrlKey && !oe && (d.deltaY *= 10), d;
    }
    function Oe(i) {
      i.key === "Control" && (oe = !0, e.domElement.getRootNode().addEventListener("keyup", Ae, { passive: !0, capture: !0 }));
    }
    function Ae(i) {
      i.key === "Control" && (oe = !1, e.domElement.getRootNode().removeEventListener("keyup", Ae, { passive: !0, capture: !0 }));
    }
    function ce(i) {
      e.enabled === !1 || e.enablePan === !1 || lt(i);
    }
    function ke(i) {
      switch (Ve(i), g.length) {
        case 1:
          switch (e.touches.ONE) {
            case U.ROTATE:
              if (e.enableRotate === !1) return;
              Te(i), o = n.TOUCH_ROTATE;
              break;
            case U.PAN:
              if (e.enablePan === !1) return;
              Le(i), o = n.TOUCH_PAN;
              break;
            default:
              o = n.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case U.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1) return;
              ct(i), o = n.TOUCH_DOLLY_PAN;
              break;
            case U.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1) return;
              dt(i), o = n.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = n.NONE;
          }
          break;
        default:
          o = n.NONE;
      }
      o !== n.NONE && e.dispatchEvent(me);
    }
    function _t(i) {
      switch (Ve(i), o) {
        case n.TOUCH_ROTATE:
          if (e.enableRotate === !1) return;
          Se(i), e.update();
          break;
        case n.TOUCH_PAN:
          if (e.enablePan === !1) return;
          Me(i), e.update();
          break;
        case n.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1) return;
          ut(i), e.update();
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1) return;
          mt(i), e.update();
          break;
        default:
          o = n.NONE;
      }
    }
    function Re(i) {
      e.enabled !== !1 && i.preventDefault();
    }
    function yt(i) {
      g.push(i.pointerId);
    }
    function bt(i) {
      delete H[i.pointerId];
      for (let r = 0; r < g.length; r++)
        if (g[r] == i.pointerId) {
          g.splice(r, 1);
          return;
        }
    }
    function wt(i) {
      for (let r = 0; r < g.length; r++)
        if (g[r] == i.pointerId) return !0;
      return !1;
    }
    function Ve(i) {
      let r = H[i.pointerId];
      r === void 0 && (r = new E(), H[i.pointerId] = r), r.set(i.pageX, i.pageY);
    }
    function Y(i) {
      const r = i.pointerId === g[0] ? g[1] : g[0];
      return H[r];
    }
    e.domElement.addEventListener("contextmenu", Re), e.domElement.addEventListener("pointerdown", Ce), e.domElement.addEventListener("pointercancel", K), e.domElement.addEventListener("wheel", ve, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", Oe, { passive: !0, capture: !0 }), this.update();
  }
}
const se = {
  enableDamping: !0,
  dampingFactor: 0.05
}, J = class J extends ti {
  constructor(t, e, n = se) {
    super(t, e);
    a(this, "uuid", C.generateUUID());
    a(this, "object");
    this.domElement = e, this.domElement = e, this.object = t, this.enableDamping = n.enableDamping ?? se.enableDamping, this.dampingFactor = n.dampingFactor ?? se.dampingFactor, this.object.position.set(0, 2, 2), this.target.copy({ x: 0, y: 0.5, z: 0 }), this.update();
  }
  tick() {
    this.enabled && this.update();
  }
  computeEncompassingView(t) {
    const e = t.getCenter(new m()), n = t.getSize(new m()), o = Math.max(n.x, n.y, n.z) * 1.25;
    return {
      position: this.object.position.clone().normalize().clone().multiplyScalar(o),
      target: e.clone()
    };
  }
  zoomIn(t) {
    const e = t || J.DEFAULT_ZOOM_FACTOR, { minDistance: n, maxDistance: o } = this;
    this.minDistance = this.maxDistance = C.clamp(
      this.getDistance() - e,
      n + e,
      o - e
    ), this.update(), this.minDistance = n, this.maxDistance = o;
  }
  zoomOut(t) {
    const e = t || J.DEFAULT_ZOOM_FACTOR, { minDistance: n, maxDistance: o } = this;
    this.minDistance = this.maxDistance = C.clamp(
      this.getDistance() + e,
      n + e,
      o - e
    ), this.update(), this.minDistance = n, this.maxDistance = o;
  }
};
a(J, "DEFAULT_ZOOM_FACTOR", 1);
let ne = J;
class ii extends St {
  constructor(t, e, n) {
    super(-1, 1, 1, -1, 0.1, 100);
    a(this, "axesHelper");
    a(this, "_renderer");
    a(this, "_scene");
    a(this, "_camera");
    a(this, "_restoreViewport", new Mt());
    this.layers.mask = q, this.axesHelper = new It(0.5), this.axesHelper.layers.mask = q, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new D(Wt),
      new D(Kt),
      new D(Zt)
    );
    const o = new ue("X", 0.2, Xt), c = new ue("Y", 0.2, qt), l = new ue("Z", 0.2, Jt);
    o.layers.mask = q, c.layers.mask = q, l.layers.mask = q, o.position.set(0.7, 0, 0), c.position.set(0, 0.7, 0), l.position.set(0, 0, 0.7), this.axesHelper.add(o), this.axesHelper.add(c), this.axesHelper.add(l), this.add(this.axesHelper), this._renderer = t, this._scene = e, this._camera = n, this._scene.add(this);
  }
  tick() {
    const t = this._scene.background;
    this._scene.background = null, this._renderer.webglrenderer.getViewport(this._restoreViewport), this._renderer.webglrenderer.setViewport(0, 0, 150, 150), this._renderer.webglrenderer.autoClear = !1, this.setFromCameraMatrix(this._camera.matrix), this._renderer.webglrenderer.render(this._scene, this), this._renderer.webglrenderer.setViewport(this._restoreViewport), this._renderer.webglrenderer.autoClear = !0, this._scene.background = t;
  }
  dispose() {
    this._scene.remove(this);
  }
  setFromCameraMatrix(t) {
    this.axesHelper.rotation.setFromRotationMatrix(
      new Ct().extractRotation(t).invert()
    );
  }
}
class si extends j {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVEAmbientLight", !0);
    a(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new vt(16777215, 1), this._light.layers.mask = S, this.add(this._light);
  }
  setColor(t) {
    this._light.color = t;
  }
  setIntensity(t) {
    this._light.intensity = t;
  }
  setEnabled(t) {
    this._light.visible = t;
  }
}
class ni extends j {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVEPointLight", !0);
    a(this, "isMovable", !0);
    a(this, "isSelectable", !0);
    a(this, "gizmo", null);
    a(this, "light");
    a(this, "mesh");
    this.name = "DIVEPointLight", this.light = new Ot(16777215, 1), this.light.layers.mask = S, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const t = 0.1, e = new Ke(
      t,
      t * 320,
      t * 320
    ), n = new At({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: kt
    });
    this.mesh = new pe(e, n), this.mesh.layers.mask = jt, this.add(this.mesh);
  }
  setColor(t) {
    this.light.color = t, this.mesh.material.color = t;
  }
  setIntensity(t) {
    this.light.intensity = t, this.mesh.material.opacity = t > 0.8 ? 0.8 : t * 0.8;
  }
  setEnabled(t) {
    this.light.visible = t;
  }
  onMove() {
    w("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.position
      });
    });
  }
  onSelect() {
    w("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    w("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class Je extends j {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVESceneLight", !0);
    a(this, "_hemiLight");
    a(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new Rt(16777215, 16777215, 2), this._hemiLight.layers.mask = S, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new Vt(16777215, 3), this._dirLight.layers.mask = S, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
    const t = 5;
    this._dirLight.shadow.camera.left = -5, this._dirLight.shadow.camera.right = t, this._dirLight.shadow.camera.top = t, this._dirLight.shadow.camera.bottom = -5, this._dirLight.shadow.camera.far = 3500, this.add(this._dirLight);
  }
  setColor(t) {
    this._hemiLight.color = t, this._dirLight.color = t;
  }
  setIntensity(t) {
    this._hemiLight.intensity = t * 2, this._dirLight.intensity = t * 3;
  }
  setEnabled(t) {
    this._hemiLight.visible = t, this._dirLight.visible = t;
  }
}
const ge = (h) => h.parent ? ge(h.parent) : h;
class oi {
  constructor() {
    a(this, "isMovable", !0);
  }
}
class ri {
  constructor() {
    a(this, "isSelectable", !0);
  }
}
function ai(h, s) {
  return s.forEach((t) => {
    Object.getOwnPropertyNames(t.prototype).forEach((e) => {
      Object.defineProperty(
        h.prototype,
        e,
        Object.getOwnPropertyDescriptor(t.prototype, e)
      );
    });
  }), h;
}
class _e extends ai(j, [
  ri,
  oi
]) {
  constructor() {
    super();
    a(this, "isDIVENode", !0);
    a(this, "gizmo", null);
    a(this, "_positionWorldBuffer");
    a(this, "_boundingBox");
    this.layers.mask = S, this._positionWorldBuffer = new m(), this._boundingBox = new Ze();
  }
  setPosition(t) {
    if (!this.parent) {
      this.position.set(t.x, t.y, t.z);
      return;
    }
    const e = new m(t.x, t.y, t.z);
    this.position.copy(this.parent.worldToLocal(e)), "isDIVEGroup" in this.parent && this.parent.updateLineTo(this);
  }
  setRotation(t) {
    this.rotation.set(t.x, t.y, t.z);
  }
  setScale(t) {
    this.scale.set(t.x, t.y, t.z);
  }
  setVisibility(t) {
    this.visible = t;
  }
  setToWorldOrigin() {
    this.position.set(0, 0, 0), w("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      });
    });
  }
  /**
   * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
   */
  onMove() {
    w("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      });
    });
  }
  onSelect() {
    w("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    w("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class $e extends _e {
  constructor() {
    super(...arguments);
    a(this, "isDIVEModel", !0);
    a(this, "_mesh", null);
    a(this, "_material", null);
    a(this, "_assetLoader", null);
  }
  async _getAssetLoader() {
    return this._assetLoader || (this._assetLoader = new (await w("AssetLoader"))()), this._assetLoader;
  }
  async setFromURL(t) {
    const n = await (await this._getAssetLoader()).load(t);
    this.setFromGLTF(n), w("State").then((o) => {
      var c;
      (c = o.get(this.userData.id)) == null || c.performAction("MODEL_LOADED", {
        id: this.userData.id
      });
    });
  }
  setFromGLTF(t) {
    this.clear(), this._boundingBox.makeEmpty(), t.traverse((e) => {
      e.castShadow = !0, e.receiveShadow = !0, e.layers.mask = this.layers.mask, this._boundingBox.expandByObject(e), !this._mesh && "isMesh" in e && (this._mesh = e, this._material ? this._mesh.material = this._material : this._material = e.material);
    }), this.add(t);
  }
  setMaterial(t) {
    this._material || (this._material = new fe()), t.vertexColors !== void 0 && (this._material.vertexColors = t.vertexColors), t.color !== void 0 && this._material.color.set(t.color), t.map !== void 0 && (this._material.map = t.map), t.normalMap !== void 0 && (this._material.normalMap = t.normalMap), t.roughness !== void 0 && (this._material.roughness = t.roughness), t.roughnessMap !== void 0 && (this._material.roughnessMap = t.roughnessMap, this._material.roughnessMap && (this._material.roughness = 1)), t.metalness !== void 0 && (this._material.metalness = t.metalness), t.metalnessMap !== void 0 && (this._material.metalnessMap = t.metalnessMap, this._material.metalnessMap && (this._material.metalness = 1)), this._mesh && (this._mesh.material = this._material);
  }
  placeOnFloor() {
    var o, c, l, p;
    const t = this.getWorldPosition(this._positionWorldBuffer), e = t.clone();
    (c = (o = this._mesh) == null ? void 0 : o.geometry) == null || c.computeBoundingBox();
    const n = (p = (l = this._mesh) == null ? void 0 : l.geometry) == null ? void 0 : p.boundingBox;
    !n || !this._mesh || (t.y = t.y - this._mesh.localToWorld(n.min.clone()).y, t.y !== e.y && w("State").then((f) => {
      var _;
      (_ = f.get(this.userData.id)) == null || _.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: t,
        rotation: this.rotation,
        scale: this.scale
      });
    }));
  }
  dropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEModel: dropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const t = this._boundingBox.min.y * this.scale.y, e = this.localToWorld(
      this._boundingBox.getCenter(new m()).multiply(this.scale)
    );
    e.y = t + this.position.y;
    const n = new Xe(e, new m(0, -1, 0));
    n.layers.mask = S;
    const o = n.intersectObjects(
      ge(this).root.children,
      !0
    );
    if (o.length > 0) {
      const c = o[0].object;
      c.geometry.computeBoundingBox();
      const l = c.geometry.boundingBox, p = c.localToWorld(l.max.clone()), f = this.position.clone(), _ = this.position.clone().setY(p.y).sub(new m(0, t, 0));
      if (this.position.copy(_), this.position.y === f.y) return;
      this.onMove();
    }
  }
}
class hi extends _e {
  constructor() {
    super();
    a(this, "isDIVEPrimitive", !0);
    a(this, "_mesh");
    this._mesh = new pe(), this._mesh.layers.mask = S, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new fe(), this.add(this._mesh);
  }
  setGeometry(t) {
    const e = this.assembleGeometry(t);
    e && (this._mesh.geometry = e, this._boundingBox.setFromObject(this._mesh));
  }
  setMaterial(t) {
    const e = this._mesh.material;
    t.vertexColors !== void 0 && (e.vertexColors = t.vertexColors), t.color !== void 0 && (e.color = new D(t.color)), t.map !== void 0 && (e.map = t.map), t.normalMap !== void 0 && (e.normalMap = t.normalMap), t.roughness !== void 0 && (e.roughness = t.roughness), t.roughnessMap !== void 0 && (e.roughnessMap = t.roughnessMap, e.roughnessMap && (e.roughness = 1)), t.metalness !== void 0 && (e.metalness = t.metalness), t.metalnessMap !== void 0 && (e.metalnessMap = t.metalnessMap, e.metalnessMap && (e.metalness = 0)), this._mesh && (this._mesh.material = e);
  }
  placeOnFloor() {
    var o, c, l, p;
    const t = this.getWorldPosition(this._positionWorldBuffer), e = t.clone();
    (c = (o = this._mesh) == null ? void 0 : o.geometry) == null || c.computeBoundingBox();
    const n = (p = (l = this._mesh) == null ? void 0 : l.geometry) == null ? void 0 : p.boundingBox;
    !n || !this._mesh || (t.y = t.y - this._mesh.localToWorld(n.min.clone()).y, t.y !== e.y && w("State").then((f) => {
      var _;
      (_ = f.get(this.userData.id)) == null || _.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: t,
        rotation: this.rotation,
        scale: this.scale
      });
    }));
  }
  dropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEPrimitive: dropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const t = this._boundingBox.min.y * this.scale.y, e = this.localToWorld(
      this._boundingBox.getCenter(new m()).multiply(this.scale)
    );
    e.y = t + this.position.y;
    const n = new Xe(e, new m(0, -1, 0));
    n.layers.mask = S;
    const o = n.intersectObjects(
      ge(this).root.children,
      !0
    );
    if (o.length > 0) {
      const c = o[0].object;
      c.geometry.computeBoundingBox();
      const l = c.geometry.boundingBox, p = c.localToWorld(l.max.clone()), f = this.position.clone(), _ = this.position.clone().setY(p.y).sub(new m(0, t, 0));
      if (this.position.copy(_), this.position.y === f.y) return;
      this.onMove();
    }
  }
  assembleGeometry(t) {
    switch (this._mesh.material.flatShading = !1, t.name.toLowerCase()) {
      case "cylinder":
        return this.createCylinderGeometry(t);
      case "sphere":
        return this.createSphereGeometry(t);
      case "pyramid":
        return this._mesh.material.flatShading = !0, this.createPyramidGeometry(t);
      case "cube":
      case "box":
        return this.createBoxGeometry(t);
      case "cone":
        return this.createConeGeometry(t);
      case "wall":
        return this.createWallGeometry(t);
      case "plane":
        return this.createPlaneGeometry(t);
      default:
        return console.warn(
          "DIVEPrimitive.assembleGeometry: Invalid geometry type:",
          t.name.toLowerCase()
        ), null;
    }
  }
  createCylinderGeometry(t) {
    const e = new Bt(
      t.width / 2,
      t.width / 2,
      t.height,
      64
    );
    return e.translate(0, t.height / 2, 0), e;
  }
  createSphereGeometry(t) {
    return new Ke(t.width / 2, 256, 256);
  }
  createPyramidGeometry(t) {
    const e = new Float32Array([
      -t.width / 2,
      0,
      -t.depth / 2,
      // 0
      t.width / 2,
      0,
      -t.depth / 2,
      // 1
      t.width / 2,
      0,
      t.depth / 2,
      // 2
      -t.width / 2,
      0,
      t.depth / 2,
      // 3
      0,
      t.height,
      0
    ]), n = new Uint16Array([
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
    ]), o = new qe();
    return o.setAttribute(
      "position",
      new Ye(e, 3)
    ), o.setIndex(new Ye(n, 1)), o.computeVertexNormals(), o.computeBoundingBox(), o.computeBoundingSphere(), o;
  }
  createBoxGeometry(t) {
    const e = new de(
      t.width,
      t.height,
      t.depth
    );
    return e.translate(0, t.height / 2, 0), e;
  }
  createConeGeometry(t) {
    const e = new zt(t.width / 2, t.height, 256);
    return e.translate(0, t.height / 2, 0), e;
  }
  createWallGeometry(t) {
    const e = new de(
      t.width,
      t.height,
      t.depth || 0.05,
      16
    );
    return e.translate(0, t.height / 2, 0), e;
  }
  createPlaneGeometry(t) {
    const e = new de(
      t.width,
      t.height,
      t.depth
    );
    return e.translate(0, t.height / 2, 0), e;
  }
}
class li extends _e {
  // lines to children
  constructor() {
    super();
    a(this, "isDIVEGroup", !0);
    a(this, "_members");
    a(this, "_lines");
    this.name = "DIVEGroup", this._members = [], this._lines = [];
  }
  // children objects
  get members() {
    return this._members;
  }
  setPosition(t) {
    super.setPosition(t), this._members.forEach((e) => {
      "isDIVENode" in e && e.onMove();
    });
  }
  setLinesVisibility(t, e) {
    if (!e) {
      this._lines.forEach((o) => {
        o.visible = t;
      });
      return;
    }
    const n = this._members.indexOf(e);
    n !== -1 && (this._lines[n].visible = t);
  }
  attach(t) {
    if (this._members.includes(t))
      return this;
    const e = this.createLine();
    return this.add(e), this._lines.push(e), super.attach(t), this._members.push(t), this._updateLineTo(e, t), this.setLinesVisibility(!0, t), this;
  }
  /**
   * Removes an object from the group.
   * @param object - The object to remove.
   * @returns The group instance.
   */
  remove(t) {
    const e = this._members.indexOf(t);
    if (e === -1)
      return this;
    const n = this._lines[e];
    return super.remove(n), this._lines.splice(e, 1), super.remove(t), this._members.splice(e, 1), this;
  }
  updateLineTo(t) {
    const e = this._members.indexOf(t);
    e !== -1 && this._updateLineTo(this._lines[e], t);
  }
  /**
   * Creates a line for visualization.
   */
  createLine() {
    const t = new qe(), e = new Nt({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), n = new Ft(t, e);
    return n.visible = !1, n;
  }
  /**
   * Updates a line to the object.
   */
  _updateLineTo(t, e) {
    const n = [
      new m(0, 0, 0),
      e.position.clone()
    ];
    t.geometry.setFromPoints(n), t.computeLineDistances();
  }
  // public setBoundingBoxVisibility(visible: boolean): void {
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
  //     DIVECommunication.get(this.userData.id)?.performAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
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
class ci extends pe {
  constructor() {
    super(
      new Yt(1e4, 1e4),
      new fe({
        color: new D(150 / 255, 150 / 255, 150 / 255)
      })
    );
    a(this, "isDIVEFloor", !0);
    this.name = "Floor", this.layers.mask = S, this.receiveShadow = !0, this.rotateX(-Math.PI / 2);
  }
  setVisibility(t) {
    this.visible = t;
  }
  setColor(t) {
    this.material.color = new D(t);
  }
}
class di extends j {
  constructor() {
    super();
    a(this, "isDIVERoot", !0);
    a(this, "_floor");
    a(this, "_assetLoader", null);
    this.name = "Root", this._floor = new ci(), this.add(this._floor);
  }
  get floor() {
    return this._floor;
  }
  async _getAssetLoader() {
    return this._assetLoader || (this._assetLoader = new (await w("AssetLoader"))()), this._assetLoader;
  }
  computeSceneBB() {
    const t = new Ze();
    return this.children.forEach((e) => {
      "isDIVEFloor" in e || e.traverse((n) => {
        "isObject3D" in n && t.expandByObject(n);
      });
    }), t;
  }
  getSceneObject(t) {
    let e;
    return this.traverse((n) => {
      e || n.userData.id === t.id && (e = n);
    }), e;
  }
  addSceneObject(t) {
    let e = this.getSceneObject(t);
    if (e)
      return console.warn(
        `DIVERoot.addSceneObject: Scene object with id ${t.id} already exists`
      ), e;
    switch (t.entityType) {
      case "pov":
        break;
      case "light": {
        switch (t.type) {
          case "scene": {
            e = new Je();
            break;
          }
          case "ambient": {
            e = new si();
            break;
          }
          case "point": {
            e = new ni();
            break;
          }
          default:
            throw new Error(
              `DIVERoot.addSceneObject: Unknown light type: ${t.type}`
            );
        }
        e.name = t.name, e.userData.id = t.id, this.add(e), this._updateLight(e, t);
        break;
      }
      case "model": {
        e = new $e(), e.name = t.name, e.userData.id = t.id, e.userData.uri = t.uri, this.add(e), this._updateModel(e, t);
        break;
      }
      case "primitive": {
        e = new hi(), e.name = t.name, e.userData.id = t.id, this.add(e), this._updatePrimitive(e, t);
        break;
      }
      case "group": {
        e = new li(), e.name = t.name, e.userData.id = t.id, this.add(e), this._updateGroup(e, t);
        break;
      }
      default:
        throw new Error(
          `DIVERoot.addSceneObject: Unknown entity type: ${t.entityType}`
        );
    }
    return e;
  }
  updateSceneObject(t) {
    const e = this.getSceneObject(t);
    if (!e) {
      console.warn(
        `DIVERoot.updateSceneObject: Scene object with id ${t.id} does not exist`
      );
      return;
    }
    switch (t.entityType) {
      case "pov":
        break;
      case "light": {
        this._updateLight(e, t);
        break;
      }
      case "model": {
        this._updateModel(e, t);
        break;
      }
      case "primitive": {
        this._updatePrimitive(e, t);
        break;
      }
      case "group": {
        this._updateGroup(e, t);
        break;
      }
      default:
        throw new Error(
          `DIVERoot.updateSceneObject: Unknown entity type: ${t.entityType}`
        );
    }
  }
  deleteSceneObject(t) {
    const e = this.getSceneObject(t);
    if (!e) {
      console.warn(
        `DIVERoot.deleteSceneObject: Object with id ${t.id} not found`
      );
      return;
    }
    switch (t.entityType) {
      case "pov":
        break;
      case "light": {
        this._deleteLight(e);
        break;
      }
      case "model": {
        this._deleteModel(e);
        break;
      }
      case "primitive": {
        this._deletePrimitive(e);
        break;
      }
      case "group": {
        this._deleteGroup(e);
        break;
      }
      default:
        throw new Error(
          `DIVERoot.deleteSceneObject: Unknown entity type: ${t.entityType}`
        );
    }
  }
  _updateLight(t, e) {
    e.name !== void 0 && e.name !== null && (t.name = e.name), e.position !== void 0 && e.position !== null && t.position.set(
      e.position.x,
      e.position.y,
      e.position.z
    ), e.intensity !== void 0 && e.intensity !== null && t.setIntensity(e.intensity), e.enabled !== void 0 && e.enabled !== null && t.setEnabled(e.enabled), e.color !== void 0 && e.color !== null && t.setColor(new D(e.color)), e.visible !== void 0 && e.visible !== null && (t.visible = e.visible), e.parentId !== void 0 && this._setParent({ ...e, parentId: e.parentId });
  }
  _updateModel(t, e) {
    e.uri !== void 0 && t.setFromURL(e.uri), e.name !== void 0 && (t.name = e.name), e.position !== void 0 && t.setPosition(e.position), e.rotation !== void 0 && t.setRotation(e.rotation), e.scale !== void 0 && t.setScale(e.scale), e.visible !== void 0 && t.setVisibility(e.visible), e.material !== void 0 && t.setMaterial(e.material), e.parentId !== void 0 && this._setParent({ ...e, parentId: e.parentId });
  }
  _updatePrimitive(t, e) {
    e.name !== void 0 && (t.name = e.name), e.geometry !== void 0 && t.setGeometry(e.geometry), e.position !== void 0 && t.setPosition(e.position), e.rotation !== void 0 && t.setRotation(e.rotation), e.scale !== void 0 && t.setScale(e.scale), e.visible !== void 0 && t.setVisibility(e.visible), e.material !== void 0 && t.setMaterial(e.material), e.parentId !== void 0 && this._setParent({ ...e, parentId: e.parentId });
  }
  _updateGroup(t, e) {
    e.name !== void 0 && (t.name = e.name), e.position !== void 0 && t.setPosition(e.position), e.rotation !== void 0 && t.setRotation(e.rotation), e.scale !== void 0 && t.setScale(e.scale), e.visible !== void 0 && t.setVisibility(e.visible), e.bbVisible !== void 0 && t.setLinesVisibility(e.bbVisible), e.parentId !== void 0 && this._setParent({ ...e, parentId: e.parentId });
  }
  _deleteLight(t) {
    this._detachTransformControls(t), t.parent.remove(t);
  }
  _deleteModel(t) {
    this._detachTransformControls(t), t.parent.remove(t);
  }
  _deletePrimitive(t) {
    this._detachTransformControls(t), t.parent.remove(t);
  }
  _deleteGroup(t) {
    this._detachTransformControls(t);
    for (let e = t.members.length - 1; e >= 0; e--)
      this.attach(t.members[e]);
    t.parent.remove(t);
  }
  _setParent(t) {
    const e = this.getSceneObject(t);
    if (t.parentId !== null) {
      const n = this.getSceneObject({
        id: t.parentId,
        entityType: t.entityType
      });
      if (!n) return;
      n.attach(e);
    } else
      this.attach(e);
  }
  _detachTransformControls(t) {
    this._findScene(t).children.find((e) => {
      "isTransformControls" in e && e.detach();
    });
  }
  _findScene(t) {
    return t.parent !== null ? this._findScene(t.parent) : t;
  }
}
const ui = "#888888", mi = "#dddddd";
class pi extends j {
  constructor() {
    super(), this.name = "Grid";
    const s = new Gt(
      100,
      100,
      ui,
      mi
    );
    s.material.depthTest = !1, s.layers.mask = Ht, this.add(s);
  }
  setVisibility(s) {
    this.visible = s;
  }
}
class fi extends Ut {
  constructor() {
    super();
    a(this, "_root");
    a(this, "_grid");
    this.background = new D(16777215), this._root = new di(), this.add(this._root), this._grid = new pi(), this.add(this._grid);
  }
  get root() {
    return this._root;
  }
  get grid() {
    return this._grid;
  }
  setBackground(t) {
    this.background = new D(t);
  }
  computeSceneBB() {
    return this.root.computeSceneBB();
  }
}
const Qe = {
  canvas: void 0,
  antialias: !0,
  alpha: !0,
  powerPreference: "high-performance",
  precision: "highp",
  stencil: !1,
  depth: !0,
  logarithmicDepthBuffer: !1
};
class gi {
  constructor(s, t, e) {
    a(this, "_webglrenderer");
    a(this, "_settings");
    this._scene = s, this._camera = t, this._settings = {
      ...Qe,
      ...e ?? {}
    }, this._webglrenderer = new Ge({
      canvas: this._settings.canvas,
      antialias: this._settings.antialias,
      alpha: this._settings.alpha,
      powerPreference: this._settings.powerPreference,
      precision: this._settings.precision,
      stencil: this._settings.stencil,
      depth: this._settings.depth,
      logarithmicDepthBuffer: this._settings.logarithmicDepthBuffer
    });
  }
  get webglrenderer() {
    return this._webglrenderer;
  }
  setCanvas(s) {
    this._webglrenderer.dispose(), this._settings.canvas = s, this._webglrenderer = new Ge(this._settings);
  }
  render() {
    this._webglrenderer.render(this._scene, this._camera);
  }
  onResize(s, t) {
    this._webglrenderer.setSize(s, t, !1);
  }
  dispose() {
    this._webglrenderer.dispose();
  }
}
class _i {
  constructor() {
    a(this, "_renderer", null);
    a(this, "_lastTime", 0);
    a(this, "_isRunning", !1);
    a(this, "_tickers", []);
  }
  start() {
    this._isRunning || (this._isRunning = !0, this._lastTime = performance.now(), requestAnimationFrame(this._tick.bind(this)));
  }
  stop() {
    this._isRunning = !1;
  }
  setRenderer(s) {
    this._renderer = s;
  }
  addTicker(s) {
    this._tickers.find((t) => t.uuid === s.uuid) || this._tickers.push(s);
  }
  removeTicker(s) {
    const t = this._tickers.findIndex((e) => e.uuid === s.uuid);
    t !== -1 && this._tickers.splice(t, 1);
  }
  dispose() {
    this.stop(), this._tickers.forEach((s) => {
      var t;
      return (t = s.dispose) == null ? void 0 : t.call(s);
    }), this._tickers = [], this._isRunning = !1, this._lastTime = 0;
  }
  _tick(s) {
    var e;
    if (!this._isRunning) return;
    const t = (s - this._lastTime) / 1e3;
    this._lastTime = s, this._tickers.forEach((n) => n.tick(t)), (e = this._renderer) == null || e.render(), requestAnimationFrame(this._tick.bind(this));
  }
}
class yi {
  constructor(s, t) {
    a(this, "_resizeObserver");
    a(this, "_width", 0);
    a(this, "_height", 0);
    this._resizeObserver = new ResizeObserver((e) => {
      for (const n of e) {
        const { width: o, height: c } = n.contentRect;
        o === this._width && c === this._height || (s.onResize(o, c), t.onResize(o, c), this._width = o, this._height = c);
      }
    }), this._observeCanvas(s.webglrenderer.domElement);
  }
  setCanvas(s) {
    this._resizeObserver.disconnect(), this._observeCanvas(s);
  }
  dispose() {
    this._resizeObserver.disconnect();
  }
  _observeCanvas(s) {
    if (s.parentElement)
      this._resizeObserver.observe(s.parentElement);
    else {
      const t = setInterval(() => {
        s.parentElement && (this._resizeObserver.observe(s.parentElement), clearInterval(t));
      }, 16);
    }
  }
}
const et = {
  autoStart: !0,
  displayAxes: !1,
  ...$t,
  ...Qe
};
class bi {
  constructor(s) {
    a(this, "_renderer");
    a(this, "_scene");
    a(this, "_camera");
    a(this, "_resizeManager");
    a(this, "_clock");
    a(this, "_settings");
    this._settings = {
      ...et,
      ...s ?? {}
    }, this._scene = new fi(), this._camera = new Qt(this._settings), this._renderer = new gi(
      this._scene,
      this._camera,
      this._settings
    ), this._resizeManager = new yi(
      this._renderer,
      this._camera
    ), this._clock = new _i(), this._clock.setRenderer(this._renderer), this._settings.autoStart && this.start();
  }
  get scene() {
    return this._scene;
  }
  get camera() {
    return this._camera;
  }
  get renderer() {
    return this._renderer;
  }
  setCanvas(s) {
    this._renderer.setCanvas(s), this._resizeManager.setCanvas(s);
  }
  get clock() {
    return this._clock;
  }
  start() {
    this._clock.start();
  }
  stop() {
    this._clock.stop();
  }
  dispose() {
    this._clock.dispose(), this._resizeManager.dispose(), this._renderer.dispose();
  }
}
function x(h, s) {
  const t = (h + "e").split("e");
  return +(t[0] + "e" + (+t[1] + (s || 0)));
}
function wi(h, s = 0) {
  const t = x(h, +s);
  return x(Math.ceil(t), -s);
}
function Ei(h, s = 0) {
  const t = x(h, +s);
  return x(Math.floor(t), -s);
}
function tt(h, s = 0) {
  if (h < 0) return -tt(-h, s);
  const t = x(h, +s);
  return x(Math.round(t), -s);
}
function Di(h, s, t) {
  return Math.atan2(
    h.clone().cross(s).dot(t),
    s.clone().dot(h)
  );
}
function xi(h, s = 0) {
  const t = x(h, +s);
  return x(Math.round(t), -s).toFixed(s);
}
function Ti(h, s = 0) {
  const t = x(h, +s);
  return x(Math.trunc(t), -s);
}
function Li(h) {
  return (C.radToDeg(h) + 360) % 360;
}
function Pi(h) {
  return C.degToRad(h);
}
const Bi = {
  ceilExp: wi,
  floorExp: Ei,
  roundExp: tt,
  toFixedExp: xi,
  truncateExp: Ti,
  signedAngleTo: Di,
  radToDeg: Li,
  degToRad: Pi
};
window.DIVE = {
  instances: [],
  get instance() {
    return window.DIVE.instances[0];
  }
};
const Si = {
  ...et,
  ...se
};
class it {
  constructor(s) {
    // descriptive members
    a(this, "_settings");
    a(this, "_engine");
    a(this, "orbitController");
    a(this, "axisCamera");
    this._settings = {
      ...Si,
      ...s ?? {}
    }, this._engine = new bi(s), this.orbitController = new ne(
      this._engine.camera,
      this._engine.renderer.webglrenderer.domElement,
      this._settings
    ), this._engine.clock.addTicker(this.orbitController), this._settings.displayAxes ? (this.axisCamera = new ii(
      this._engine.renderer,
      this._engine.scene,
      this._engine.camera
    ), this._engine.clock.addTicker(this.axisCamera)) : this.axisCamera = null, import("./chunks/package-CgUmyOWW.mjs").then((t) => {
      console.log(
        `DIVE ${t.default.version} initialized successfully!`
      ), console.log(`
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
    });
  }
  // static members
  static async QuickView(s, t) {
    const e = new it(t);
    window.DIVE.instances.push(e), e.engine.scene.background = new D(16777215), e.engine.scene.grid.setVisibility(!1), e.engine.scene.root.floor.setVisibility(!1), e.engine.scene.root.floor.setColor(16777215), e.engine.camera.position.set(0, 2, 2), e.orbitController.target.set(0, 0.5, 0);
    const n = new Je();
    n.name = "SceneLight", n.userData.id = C.generateUUID(), n.setEnabled(!0), n.visible = !0, n.setIntensity((t == null ? void 0 : t.lightIntensity) ?? 1), n.setColor(new D(16777215)), e.engine.scene.root.add(n);
    const o = new $e();
    o.name = "object", o.userData.id = C.generateUUID(), o.userData.uri = s, o.visible = !0, e.engine.scene.root.add(o), await o.setFromURL(s);
    const c = e.engine.scene.computeSceneBB(), l = e.orbitController.computeEncompassingView(c);
    return e.engine.camera.position.copy(l.position), e.orbitController.target.copy(l.target), e;
  }
  get engine() {
    return this._engine;
  }
  get canvas() {
    return this._engine.renderer.webglrenderer.domElement;
  }
  setCanvas(s) {
    this._engine.setCanvas(s), this._engine.clock.removeTicker(this.orbitController), this.orbitController.dispose(), this.orbitController = new ne(
      this._engine.camera,
      s,
      this._settings
    ), this._engine.clock.addTicker(this.orbitController);
  }
  async dispose() {
    return new Promise((s) => {
      this._engine.clock.removeTicker(this.orbitController), this.orbitController.dispose(), this.axisCamera && (this._engine.clock.removeTicker(this.axisCamera), this.axisCamera.dispose()), s();
    });
  }
}
const We = (h, s) => {
  if (Object.keys(h).length === 0 && Object.keys(s).length === 0)
    return {};
  if (typeof h != "object" || typeof s != "object")
    return s;
  let t = {};
  return Object.keys(s).forEach((e) => {
    if (!Object.keys(h).includes(e)) {
      t = { ...t, [e]: s[e] };
      return;
    }
    if (Array.isArray(s[e])) {
      if (!Array.isArray(h[e])) {
        t = { ...t, [e]: s[e] };
        return;
      }
      const n = h[e], o = s[e];
      if (n.length === 0 && o.length === 0) {
        t = { ...t };
        return;
      }
      if (n.length !== o.length) {
        t = { ...t, [e]: s[e] };
        return;
      }
      const c = [];
      if (o.forEach((l, p) => {
        const f = We(
          n[p],
          o[p]
        );
        Object.keys(f).length && c.push(o[p]);
      }), Object.keys(c).length) {
        t = { ...t, [e]: c };
        return;
      }
      return;
    }
    if (typeof s[e] == "object") {
      if (typeof h[e] != "object") {
        t = { ...t, [e]: s[e] };
        return;
      }
      const n = We(
        h[e],
        s[e]
      );
      if (Object.keys(n).length) {
        t = { ...t, [e]: n };
        return;
      }
    }
    h[e] !== s[e] && (t = { ...t, [e]: s[e] });
  }), t;
};
export {
  it as DIVE,
  Si as DIVEDefaultSettings,
  Bi as DIVEMath,
  Zi as ESystem,
  Xi as EWebXRUnsupportedReason,
  Ui as FILE_TYPES,
  ji as SUPPORTED_FILE_TYPES,
  ai as applyMixins,
  Fi as findInterface,
  ge as findSceneRecursive,
  Hi as getFileTypeFromUri,
  w as getModule,
  We as getObjectDelta,
  Yi as implementsInterface,
  Wi as isFileTypeSupported
};
