var Et = Object.defineProperty;
var wt = (c, s, t) => s in c ? Et(c, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[s] = t;
var a = (c, s, t) => wt(c, typeof s != "symbol" ? s + "" : s, t);
import { Ray as Dt, Plane as St, MathUtils as C, EventDispatcher as Ot, Vector3 as m, MOUSE as F, TOUCH as U, Spherical as ze, Quaternion as Ne, Vector2 as w, OrthographicCamera as Tt, Vector4 as xt, AxesHelper as Pt, Color as x, Matrix4 as Mt, Object3D as Y, AmbientLight as Lt, PointLight as Ct, SphereGeometry as Ke, MeshBasicMaterial as It, FrontSide as At, Mesh as me, HemisphereLight as vt, DirectionalLight as Rt, Box3 as Ze, MeshStandardMaterial as fe, Raycaster as Xe, CylinderGeometry as kt, BufferGeometry as Je, BufferAttribute as Ge, BoxGeometry as de, ConeGeometry as jt, LineDashedMaterial as Vt, Line as Bt, PlaneGeometry as zt, GridHelper as Nt, Scene as Gt, WebGLRenderer as Fe } from "three";
import ue from "three-spritetext";
import { C as J, P, U as Ft, H as Ut } from "./chunks/VisibilityLayerMask-CXgt1fJc.mjs";
import { A as Yt, a as Ht, b as Wt, c as Kt, d as Zt, e as Xt } from "./chunks/findInterface-OrXgmwxj.mjs";
import { f as Ni, i as Gi } from "./chunks/findInterface-OrXgmwxj.mjs";
import { g as E } from "./chunks/ModuleRegistry-RSub8W0G.mjs";
import { D as Jt, a as qt } from "./chunks/PerspectiveCamera-sm4_81KJ.mjs";
import { F as Ui, S as Yi, g as Hi, i as Wi } from "./chunks/FileTypes-qgYnI0Jg.mjs";
import { E as Zi, a as Xi } from "./chunks/index-C_uFFwT2.mjs";
const Ue = { type: "change" }, pe = { type: "start" }, Ye = { type: "end" }, ie = new Dt(), He = new St(), $t = Math.cos(70 * C.DEG2RAD);
class Qt extends Ot {
  constructor(s, t) {
    super(), this.object = s, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new m(), this.cursor = new m(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: F.ROTATE, MIDDLE: F.DOLLY, RIGHT: F.PAN }, this.touches = { ONE: U.ROTATE, TWO: U.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(i) {
      i.addEventListener("keydown", he), this._domElementKeyEvents = i;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", he), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Ue), e.update(), o = n.NONE;
    }, this.update = function() {
      const i = new m(), r = new Ne().setFromUnitVectors(s.up, new m(0, 1, 0)), d = r.clone().invert(), u = new m(), _ = new Ne(), L = new m(), y = 2 * Math.PI;
      return function(yt = null) {
        const Ve = e.object.position;
        i.copy(Ve).sub(e.target), i.applyQuaternion(r), l.setFromVector3(i), e.autoRotate && o === n.NONE && W(tt(yt)), e.enableDamping ? (l.theta += p.theta * e.dampingFactor, l.phi += p.phi * e.dampingFactor) : (l.theta += p.theta, l.phi += p.phi);
        let S = e.minAzimuthAngle, O = e.maxAzimuthAngle;
        isFinite(S) && isFinite(O) && (S < -Math.PI ? S += y : S > Math.PI && (S -= y), O < -Math.PI ? O += y : O > Math.PI && (O -= y), S <= O ? l.theta = Math.max(S, Math.min(O, l.theta)) : l.theta = l.theta > (S + O) / 2 ? Math.max(S, l.theta) : Math.min(O, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(b, e.dampingFactor) : e.target.add(b), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let Z = !1;
        if (e.zoomToCursor && $ || e.object.isOrthographicCamera)
          l.radius = ce(l.radius);
        else {
          const T = l.radius;
          l.radius = ce(l.radius * f), Z = T != l.radius;
        }
        if (i.setFromSpherical(l), i.applyQuaternion(d), Ve.copy(e.target).add(i), e.object.lookAt(e.target), e.enableDamping === !0 ? (p.theta *= 1 - e.dampingFactor, p.phi *= 1 - e.dampingFactor, b.multiplyScalar(1 - e.dampingFactor)) : (p.set(0, 0, 0), b.set(0, 0, 0)), e.zoomToCursor && $) {
          let T = null;
          if (e.object.isPerspectiveCamera) {
            const X = i.length();
            T = ce(X * f);
            const te = X - T;
            e.object.position.addScaledVector(_e, te), e.object.updateMatrixWorld(), Z = !!te;
          } else if (e.object.isOrthographicCamera) {
            const X = new m(M.x, M.y, 0);
            X.unproject(e.object);
            const te = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), Z = te !== e.object.zoom;
            const Be = new m(M.x, M.y, 0);
            Be.unproject(e.object), e.object.position.sub(Be).add(X), e.object.updateMatrixWorld(), T = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          T !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(T).add(e.object.position) : (ie.origin.copy(e.object.position), ie.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(ie.direction)) < $t ? s.lookAt(e.target) : (He.setFromNormalAndCoplanarPoint(e.object.up, e.target), ie.intersectPlane(He, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const T = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), T !== e.object.zoom && (e.object.updateProjectionMatrix(), Z = !0);
        }
        return f = 1, $ = !1, Z || u.distanceToSquared(e.object.position) > h || 8 * (1 - _.dot(e.object.quaternion)) > h || L.distanceToSquared(e.target) > h ? (e.dispatchEvent(Ue), u.copy(e.object.position), _.copy(e.object.quaternion), L.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", ke), e.domElement.removeEventListener("pointerdown", Ce), e.domElement.removeEventListener("pointercancel", K), e.domElement.removeEventListener("wheel", Ie), e.domElement.removeEventListener("pointermove", le), e.domElement.removeEventListener("pointerup", K), e.domElement.getRootNode().removeEventListener("keydown", Ae, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", he), e._domElementKeyEvents = null);
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
    const h = 1e-6, l = new ze(), p = new ze();
    let f = 1;
    const b = new m(), I = new w(), A = new w(), j = new w(), v = new w(), R = new w(), V = new w(), B = new w(), z = new w(), k = new w(), _e = new m(), M = new w();
    let $ = !1;
    const g = [], H = {};
    let oe = !1;
    function tt(i) {
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
    const ye = function() {
      const i = new m();
      return function(d, u) {
        i.setFromMatrixColumn(u, 0), i.multiplyScalar(-d), b.add(i);
      };
    }(), Ee = function() {
      const i = new m();
      return function(d, u) {
        e.screenSpacePanning === !0 ? i.setFromMatrixColumn(u, 1) : (i.setFromMatrixColumn(u, 0), i.crossVectors(e.object.up, i)), i.multiplyScalar(d), b.add(i);
      };
    }(), N = function() {
      const i = new m();
      return function(d, u) {
        const _ = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const L = e.object.position;
          i.copy(L).sub(e.target);
          let y = i.length();
          y *= Math.tan(e.object.fov / 2 * Math.PI / 180), ye(2 * d * y / _.clientHeight, e.object.matrix), Ee(2 * u * y / _.clientHeight, e.object.matrix);
        } else e.object.isOrthographicCamera ? (ye(d * (e.object.right - e.object.left) / e.object.zoom / _.clientWidth, e.object.matrix), Ee(u * (e.object.top - e.object.bottom) / e.object.zoom / _.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function re(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function we(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function ae(i, r) {
      if (!e.zoomToCursor)
        return;
      $ = !0;
      const d = e.domElement.getBoundingClientRect(), u = i - d.left, _ = r - d.top, L = d.width, y = d.height;
      M.x = u / L * 2 - 1, M.y = -(_ / y) * 2 + 1, _e.set(M.x, M.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function ce(i) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, i));
    }
    function De(i) {
      I.set(i.clientX, i.clientY);
    }
    function it(i) {
      ae(i.clientX, i.clientX), B.set(i.clientX, i.clientY);
    }
    function Se(i) {
      v.set(i.clientX, i.clientY);
    }
    function st(i) {
      A.set(i.clientX, i.clientY), j.subVectors(A, I).multiplyScalar(e.rotateSpeed);
      const r = e.domElement;
      W(2 * Math.PI * j.x / r.clientHeight), ee(2 * Math.PI * j.y / r.clientHeight), I.copy(A), e.update();
    }
    function nt(i) {
      z.set(i.clientX, i.clientY), k.subVectors(z, B), k.y > 0 ? re(Q(k.y)) : k.y < 0 && we(Q(k.y)), B.copy(z), e.update();
    }
    function ot(i) {
      R.set(i.clientX, i.clientY), V.subVectors(R, v).multiplyScalar(e.panSpeed), N(V.x, V.y), v.copy(R), e.update();
    }
    function rt(i) {
      ae(i.clientX, i.clientY), i.deltaY < 0 ? we(Q(i.deltaY)) : i.deltaY > 0 && re(Q(i.deltaY)), e.update();
    }
    function at(i) {
      let r = !1;
      switch (i.code) {
        case e.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? ee(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(0, e.keyPanSpeed), r = !0;
          break;
        case e.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? ee(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(0, -e.keyPanSpeed), r = !0;
          break;
        case e.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? W(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(e.keyPanSpeed, 0), r = !0;
          break;
        case e.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? W(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(-e.keyPanSpeed, 0), r = !0;
          break;
      }
      r && (i.preventDefault(), e.update());
    }
    function Oe(i) {
      if (g.length === 1)
        I.set(i.pageX, i.pageY);
      else {
        const r = G(i), d = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        I.set(d, u);
      }
    }
    function Te(i) {
      if (g.length === 1)
        v.set(i.pageX, i.pageY);
      else {
        const r = G(i), d = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        v.set(d, u);
      }
    }
    function xe(i) {
      const r = G(i), d = i.pageX - r.x, u = i.pageY - r.y, _ = Math.sqrt(d * d + u * u);
      B.set(0, _);
    }
    function ct(i) {
      e.enableZoom && xe(i), e.enablePan && Te(i);
    }
    function lt(i) {
      e.enableZoom && xe(i), e.enableRotate && Oe(i);
    }
    function Pe(i) {
      if (g.length == 1)
        A.set(i.pageX, i.pageY);
      else {
        const d = G(i), u = 0.5 * (i.pageX + d.x), _ = 0.5 * (i.pageY + d.y);
        A.set(u, _);
      }
      j.subVectors(A, I).multiplyScalar(e.rotateSpeed);
      const r = e.domElement;
      W(2 * Math.PI * j.x / r.clientHeight), ee(2 * Math.PI * j.y / r.clientHeight), I.copy(A);
    }
    function Me(i) {
      if (g.length === 1)
        R.set(i.pageX, i.pageY);
      else {
        const r = G(i), d = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        R.set(d, u);
      }
      V.subVectors(R, v).multiplyScalar(e.panSpeed), N(V.x, V.y), v.copy(R);
    }
    function Le(i) {
      const r = G(i), d = i.pageX - r.x, u = i.pageY - r.y, _ = Math.sqrt(d * d + u * u);
      z.set(0, _), k.set(0, Math.pow(z.y / B.y, e.zoomSpeed)), re(k.y), B.copy(z);
      const L = (i.pageX + r.x) * 0.5, y = (i.pageY + r.y) * 0.5;
      ae(L, y);
    }
    function ht(i) {
      e.enableZoom && Le(i), e.enablePan && Me(i);
    }
    function dt(i) {
      e.enableZoom && Le(i), e.enableRotate && Pe(i);
    }
    function Ce(i) {
      e.enabled !== !1 && (g.length === 0 && (e.domElement.setPointerCapture(i.pointerId), e.domElement.addEventListener("pointermove", le), e.domElement.addEventListener("pointerup", K)), !_t(i) && (gt(i), i.pointerType === "touch" ? Re(i) : ut(i)));
    }
    function le(i) {
      e.enabled !== !1 && (i.pointerType === "touch" ? ft(i) : pt(i));
    }
    function K(i) {
      switch (bt(i), g.length) {
        case 0:
          e.domElement.releasePointerCapture(i.pointerId), e.domElement.removeEventListener("pointermove", le), e.domElement.removeEventListener("pointerup", K), e.dispatchEvent(Ye), o = n.NONE;
          break;
        case 1:
          const r = g[0], d = H[r];
          Re({ pointerId: r, pageX: d.x, pageY: d.y });
          break;
      }
    }
    function ut(i) {
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
        case F.DOLLY:
          if (e.enableZoom === !1) return;
          it(i), o = n.DOLLY;
          break;
        case F.ROTATE:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enablePan === !1) return;
            Se(i), o = n.PAN;
          } else {
            if (e.enableRotate === !1) return;
            De(i), o = n.ROTATE;
          }
          break;
        case F.PAN:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enableRotate === !1) return;
            De(i), o = n.ROTATE;
          } else {
            if (e.enablePan === !1) return;
            Se(i), o = n.PAN;
          }
          break;
        default:
          o = n.NONE;
      }
      o !== n.NONE && e.dispatchEvent(pe);
    }
    function pt(i) {
      switch (o) {
        case n.ROTATE:
          if (e.enableRotate === !1) return;
          st(i);
          break;
        case n.DOLLY:
          if (e.enableZoom === !1) return;
          nt(i);
          break;
        case n.PAN:
          if (e.enablePan === !1) return;
          ot(i);
          break;
      }
    }
    function Ie(i) {
      e.enabled === !1 || e.enableZoom === !1 || o !== n.NONE || (i.preventDefault(), e.dispatchEvent(pe), rt(mt(i)), e.dispatchEvent(Ye));
    }
    function mt(i) {
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
    function Ae(i) {
      i.key === "Control" && (oe = !0, e.domElement.getRootNode().addEventListener("keyup", ve, { passive: !0, capture: !0 }));
    }
    function ve(i) {
      i.key === "Control" && (oe = !1, e.domElement.getRootNode().removeEventListener("keyup", ve, { passive: !0, capture: !0 }));
    }
    function he(i) {
      e.enabled === !1 || e.enablePan === !1 || at(i);
    }
    function Re(i) {
      switch (je(i), g.length) {
        case 1:
          switch (e.touches.ONE) {
            case U.ROTATE:
              if (e.enableRotate === !1) return;
              Oe(i), o = n.TOUCH_ROTATE;
              break;
            case U.PAN:
              if (e.enablePan === !1) return;
              Te(i), o = n.TOUCH_PAN;
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
              lt(i), o = n.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = n.NONE;
          }
          break;
        default:
          o = n.NONE;
      }
      o !== n.NONE && e.dispatchEvent(pe);
    }
    function ft(i) {
      switch (je(i), o) {
        case n.TOUCH_ROTATE:
          if (e.enableRotate === !1) return;
          Pe(i), e.update();
          break;
        case n.TOUCH_PAN:
          if (e.enablePan === !1) return;
          Me(i), e.update();
          break;
        case n.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1) return;
          ht(i), e.update();
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1) return;
          dt(i), e.update();
          break;
        default:
          o = n.NONE;
      }
    }
    function ke(i) {
      e.enabled !== !1 && i.preventDefault();
    }
    function gt(i) {
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
    function _t(i) {
      for (let r = 0; r < g.length; r++)
        if (g[r] == i.pointerId) return !0;
      return !1;
    }
    function je(i) {
      let r = H[i.pointerId];
      r === void 0 && (r = new w(), H[i.pointerId] = r), r.set(i.pageX, i.pageY);
    }
    function G(i) {
      const r = i.pointerId === g[0] ? g[1] : g[0];
      return H[r];
    }
    e.domElement.addEventListener("contextmenu", ke), e.domElement.addEventListener("pointerdown", Ce), e.domElement.addEventListener("pointercancel", K), e.domElement.addEventListener("wheel", Ie, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", Ae, { passive: !0, capture: !0 }), this.update();
  }
}
const se = {
  enableDamping: !0,
  dampingFactor: 0.05
}, q = class q extends Qt {
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
    const e = t || q.DEFAULT_ZOOM_FACTOR, { minDistance: n, maxDistance: o } = this;
    this.minDistance = this.maxDistance = C.clamp(
      this.getDistance() - e,
      n + e,
      o - e
    ), this.update(), this.minDistance = n, this.maxDistance = o;
  }
  zoomOut(t) {
    const e = t || q.DEFAULT_ZOOM_FACTOR, { minDistance: n, maxDistance: o } = this;
    this.minDistance = this.maxDistance = C.clamp(
      this.getDistance() + e,
      n + e,
      o - e
    ), this.update(), this.minDistance = n, this.maxDistance = o;
  }
};
a(q, "DEFAULT_ZOOM_FACTOR", 1);
let ne = q;
class ei extends Tt {
  constructor(t, e, n) {
    super(-1, 1, 1, -1, 0.1, 100);
    a(this, "axesHelper");
    a(this, "_renderer");
    a(this, "_scene");
    a(this, "_camera");
    a(this, "_restoreViewport", new xt());
    this.layers.mask = J, this.axesHelper = new Pt(0.5), this.axesHelper.layers.mask = J, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new x(Yt),
      new x(Ht),
      new x(Wt)
    );
    const o = new ue("X", 0.2, Kt), h = new ue("Y", 0.2, Zt), l = new ue("Z", 0.2, Xt);
    o.layers.mask = J, h.layers.mask = J, l.layers.mask = J, o.position.set(0.7, 0, 0), h.position.set(0, 0.7, 0), l.position.set(0, 0, 0.7), this.axesHelper.add(o), this.axesHelper.add(h), this.axesHelper.add(l), this.add(this.axesHelper), this._renderer = t, this._scene = e, this._camera = n, this._scene.add(this);
  }
  tick() {
    const t = this._scene.background;
    this._scene.background = null, this._renderer.webglrenderer.getViewport(this._restoreViewport), this._renderer.webglrenderer.setViewport(0, 0, 150, 150), this._renderer.webglrenderer.autoClear = !1, this.SetFromCameraMatrix(this._camera.matrix), this._renderer.webglrenderer.render(this._scene, this), this._renderer.webglrenderer.setViewport(this._restoreViewport), this._renderer.webglrenderer.autoClear = !0, this._scene.background = t;
  }
  Dispose() {
    this._scene.remove(this);
  }
  SetFromCameraMatrix(t) {
    this.axesHelper.rotation.setFromRotationMatrix(
      new Mt().extractRotation(t).invert()
    );
  }
}
class ti extends Y {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVEAmbientLight", !0);
    a(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new Lt(16777215, 1), this._light.layers.mask = P, this.add(this._light);
  }
  SetColor(t) {
    this._light.color = t;
  }
  SetIntensity(t) {
    this._light.intensity = t;
  }
  SetEnabled(t) {
    this._light.visible = t;
  }
}
class ii extends Y {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVEPointLight", !0);
    a(this, "isMovable", !0);
    a(this, "isSelectable", !0);
    a(this, "gizmo", null);
    a(this, "light");
    a(this, "mesh");
    this.name = "DIVEPointLight", this.light = new Ct(16777215, 1), this.light.layers.mask = P, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const t = 0.1, e = new Ke(
      t,
      t * 320,
      t * 320
    ), n = new It({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: At
    });
    this.mesh = new me(e, n), this.mesh.layers.mask = Ft, this.add(this.mesh);
  }
  SetColor(t) {
    this.light.color = t, this.mesh.material.color = t;
  }
  SetIntensity(t) {
    this.light.intensity = t, this.mesh.material.opacity = t > 0.8 ? 0.8 : t * 0.8;
  }
  SetEnabled(t) {
    this.light.visible = t;
  }
  onMove() {
    E("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.position
      });
    });
  }
  onSelect() {
    E("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    E("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class si extends Y {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVESceneLight", !0);
    a(this, "_hemiLight");
    a(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new vt(16777215, 16777215, 2), this._hemiLight.layers.mask = P, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new Rt(16777215, 3), this._dirLight.layers.mask = P, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
    const t = 5;
    this._dirLight.shadow.camera.left = -5, this._dirLight.shadow.camera.right = t, this._dirLight.shadow.camera.top = t, this._dirLight.shadow.camera.bottom = -5, this._dirLight.shadow.camera.far = 3500, this.add(this._dirLight);
  }
  SetColor(t) {
    this._hemiLight.color = t, this._dirLight.color = t;
  }
  SetIntensity(t) {
    this._hemiLight.intensity = t * 2, this._dirLight.intensity = t * 3;
  }
  SetEnabled(t) {
    this._hemiLight.visible = t, this._dirLight.visible = t;
  }
}
const ge = (c) => c.parent ? ge(c.parent) : c;
class ni {
  constructor() {
    a(this, "isMovable", !0);
  }
}
class oi {
  constructor() {
    a(this, "isSelectable", !0);
  }
}
function ri(c, s) {
  return s.forEach((t) => {
    Object.getOwnPropertyNames(t.prototype).forEach((e) => {
      Object.defineProperty(
        c.prototype,
        e,
        Object.getOwnPropertyDescriptor(t.prototype, e)
      );
    });
  }), c;
}
class be extends ri(Y, [
  oi,
  ni
]) {
  constructor() {
    super();
    a(this, "isDIVENode", !0);
    a(this, "gizmo", null);
    a(this, "_positionWorldBuffer");
    a(this, "_boundingBox");
    this.layers.mask = P, this._positionWorldBuffer = new m(), this._boundingBox = new Ze();
  }
  SetPosition(t) {
    if (!this.parent) {
      this.position.set(t.x, t.y, t.z);
      return;
    }
    const e = new m(t.x, t.y, t.z);
    this.position.copy(this.parent.worldToLocal(e)), "isDIVEGroup" in this.parent && this.parent.UpdateLineTo(this);
  }
  SetRotation(t) {
    this.rotation.set(t.x, t.y, t.z);
  }
  SetScale(t) {
    this.scale.set(t.x, t.y, t.z);
  }
  SetVisibility(t) {
    this.visible = t;
  }
  SetToWorldOrigin() {
    this.position.set(0, 0, 0), E("State").then((t) => {
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
    E("State").then((t) => {
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
    E("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    E("State").then((t) => {
      var e;
      (e = t.get(this.userData.id)) == null || e.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class ai extends be {
  constructor() {
    super(...arguments);
    a(this, "isDIVEModel", !0);
    a(this, "_mesh", null);
    a(this, "_material", null);
  }
  SetModel(t) {
    this.clear(), this._boundingBox.makeEmpty(), t.traverse((e) => {
      e.castShadow = !0, e.receiveShadow = !0, e.layers.mask = this.layers.mask, this._boundingBox.expandByObject(e), !this._mesh && "isMesh" in e && (this._mesh = e, this._material ? this._mesh.material = this._material : this._material = e.material);
    }), this.add(t);
  }
  SetMaterial(t) {
    this._material || (this._material = new fe()), t.vertexColors !== void 0 && (this._material.vertexColors = t.vertexColors), t.color !== void 0 && this._material.color.set(t.color), t.map !== void 0 && (this._material.map = t.map), t.normalMap !== void 0 && (this._material.normalMap = t.normalMap), t.roughness !== void 0 && (this._material.roughness = t.roughness), t.roughnessMap !== void 0 && (this._material.roughnessMap = t.roughnessMap, this._material.roughnessMap && (this._material.roughness = 1)), t.metalness !== void 0 && (this._material.metalness = t.metalness), t.metalnessMap !== void 0 && (this._material.metalnessMap = t.metalnessMap, this._material.metalnessMap && (this._material.metalness = 1)), this._mesh && (this._mesh.material = this._material);
  }
  PlaceOnFloor() {
    var o, h, l, p;
    const t = this.getWorldPosition(this._positionWorldBuffer), e = t.clone();
    (h = (o = this._mesh) == null ? void 0 : o.geometry) == null || h.computeBoundingBox();
    const n = (p = (l = this._mesh) == null ? void 0 : l.geometry) == null ? void 0 : p.boundingBox;
    !n || !this._mesh || (t.y = t.y - this._mesh.localToWorld(n.min.clone()).y, t.y !== e.y && E("State").then((f) => {
      var b;
      (b = f.get(this.userData.id)) == null || b.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: t,
        rotation: this.rotation,
        scale: this.scale
      });
    }));
  }
  DropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEModel: DropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const t = this._boundingBox.min.y * this.scale.y, e = this.localToWorld(
      this._boundingBox.getCenter(new m()).multiply(this.scale)
    );
    e.y = t + this.position.y;
    const n = new Xe(e, new m(0, -1, 0));
    n.layers.mask = P;
    const o = n.intersectObjects(
      ge(this).Root.children,
      !0
    );
    if (o.length > 0) {
      const h = o[0].object;
      h.geometry.computeBoundingBox();
      const l = h.geometry.boundingBox, p = h.localToWorld(l.max.clone()), f = this.position.clone(), b = this.position.clone().setY(p.y).sub(new m(0, t, 0));
      if (this.position.copy(b), this.position.y === f.y) return;
      this.onMove();
    }
  }
}
class ci extends be {
  constructor() {
    super();
    a(this, "isDIVEPrimitive", !0);
    a(this, "_mesh");
    this._mesh = new me(), this._mesh.layers.mask = P, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new fe(), this.add(this._mesh);
  }
  SetGeometry(t) {
    const e = this.assembleGeometry(t);
    e && (this._mesh.geometry = e, this._boundingBox.setFromObject(this._mesh));
  }
  SetMaterial(t) {
    const e = this._mesh.material;
    t.vertexColors !== void 0 && (e.vertexColors = t.vertexColors), t.color !== void 0 && (e.color = new x(t.color)), t.map !== void 0 && (e.map = t.map), t.normalMap !== void 0 && (e.normalMap = t.normalMap), t.roughness !== void 0 && (e.roughness = t.roughness), t.roughnessMap !== void 0 && (e.roughnessMap = t.roughnessMap, e.roughnessMap && (e.roughness = 1)), t.metalness !== void 0 && (e.metalness = t.metalness), t.metalnessMap !== void 0 && (e.metalnessMap = t.metalnessMap, e.metalnessMap && (e.metalness = 0)), this._mesh && (this._mesh.material = e);
  }
  PlaceOnFloor() {
    var o, h, l, p;
    const t = this.getWorldPosition(this._positionWorldBuffer), e = t.clone();
    (h = (o = this._mesh) == null ? void 0 : o.geometry) == null || h.computeBoundingBox();
    const n = (p = (l = this._mesh) == null ? void 0 : l.geometry) == null ? void 0 : p.boundingBox;
    !n || !this._mesh || (t.y = t.y - this._mesh.localToWorld(n.min.clone()).y, t.y !== e.y && E("State").then((f) => {
      var b;
      (b = f.get(this.userData.id)) == null || b.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: t,
        rotation: this.rotation,
        scale: this.scale
      });
    }));
  }
  DropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEPrimitive: DropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const t = this._boundingBox.min.y * this.scale.y, e = this.localToWorld(
      this._boundingBox.getCenter(new m()).multiply(this.scale)
    );
    e.y = t + this.position.y;
    const n = new Xe(e, new m(0, -1, 0));
    n.layers.mask = P;
    const o = n.intersectObjects(
      ge(this).Root.children,
      !0
    );
    if (o.length > 0) {
      const h = o[0].object;
      h.geometry.computeBoundingBox();
      const l = h.geometry.boundingBox, p = h.localToWorld(l.max.clone()), f = this.position.clone(), b = this.position.clone().setY(p.y).sub(new m(0, t, 0));
      if (this.position.copy(b), this.position.y === f.y) return;
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
    const e = new kt(
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
    ]), o = new Je();
    return o.setAttribute(
      "position",
      new Ge(e, 3)
    ), o.setIndex(new Ge(n, 1)), o.computeVertexNormals(), o.computeBoundingBox(), o.computeBoundingSphere(), o;
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
    const e = new jt(t.width / 2, t.height, 256);
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
class li extends be {
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
  SetPosition(t) {
    super.SetPosition(t), this._members.forEach((e) => {
      "isDIVENode" in e && e.onMove();
    });
  }
  SetLinesVisibility(t, e) {
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
    return this.add(e), this._lines.push(e), super.attach(t), this._members.push(t), this.updateLineTo(e, t), this.SetLinesVisibility(!0, t), this;
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
  UpdateLineTo(t) {
    const e = this._members.indexOf(t);
    e !== -1 && this.updateLineTo(this._lines[e], t);
  }
  /**
   * Creates a line for visualization.
   */
  createLine() {
    const t = new Je(), e = new Vt({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), n = new Bt(t, e);
    return n.visible = !1, n;
  }
  /**
   * Updates a line to the object.
   */
  updateLineTo(t, e) {
    const n = [
      new m(0, 0, 0),
      e.position.clone()
    ];
    t.geometry.setFromPoints(n), t.computeLineDistances();
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
class hi extends me {
  constructor() {
    super(
      new zt(1e4, 1e4),
      new fe({
        color: new x(150 / 255, 150 / 255, 150 / 255)
      })
    );
    a(this, "isDIVEFloor", !0);
    this.name = "Floor", this.layers.mask = P, this.receiveShadow = !0, this.rotateX(-Math.PI / 2);
  }
  SetVisibility(t) {
    this.visible = t;
  }
  SetColor(t) {
    this.material.color = new x(t);
  }
}
class di extends Y {
  constructor() {
    super();
    a(this, "isDIVERoot", !0);
    a(this, "_floor");
    a(this, "_assetLoader", null);
    this.name = "Root", this._floor = new hi(), this.add(this._floor);
  }
  get floor() {
    return this._floor;
  }
  async _getAssetLoader() {
    return this._assetLoader || (this._assetLoader = new (await E("AssetLoader"))()), this._assetLoader;
  }
  ComputeSceneBB() {
    const t = new Ze();
    return this.children.forEach((e) => {
      "isDIVEFloor" in e || e.traverse((n) => {
        "isObject3D" in n && t.expandByObject(n);
      });
    }), t;
  }
  GetSceneObject(t) {
    let e;
    return this.traverse((n) => {
      e || n.userData.id === t.id && (e = n);
    }), e;
  }
  AddSceneObject(t) {
    switch (t.entityType) {
      case "pov":
        break;
      case "light": {
        this.updateLight(t);
        break;
      }
      case "model": {
        this.updateModel(t);
        break;
      }
      case "primitive": {
        this.updatePrimitive(t);
        break;
      }
      case "group": {
        this.updateGroup(t);
        break;
      }
      default:
        console.warn(
          `DIVERoot.AddSceneObject: Unknown entity type: ${t.entityType}`
        );
    }
  }
  UpdateSceneObject(t) {
    switch (t.entityType) {
      case "pov":
        break;
      case "light": {
        this.updateLight(t);
        break;
      }
      case "model": {
        this.updateModel(t);
        break;
      }
      case "primitive": {
        this.updatePrimitive(t);
        break;
      }
      case "group": {
        this.updateGroup(t);
        break;
      }
      default:
        console.warn(
          `DIVERoot.UpdateSceneObject: Unknown entity type: ${t.entityType}`
        );
    }
  }
  DeleteSceneObject(t) {
    switch (t.entityType) {
      case "pov":
        break;
      case "light": {
        this.deleteLight(t);
        break;
      }
      case "model": {
        this.deleteModel(t);
        break;
      }
      case "primitive": {
        this.deletePrimitive(t);
        break;
      }
      case "group": {
        this.deleteGroup(t);
        break;
      }
      default:
        console.warn(
          `DIVERoot.DeleteSceneObject: Unknown entity type: ${t.entityType}`
        );
    }
  }
  PlaceOnFloor(t) {
    switch (t.entityType) {
      case "pov":
      case "light":
        break;
      case "model":
      case "primitive": {
        this.placeOnFloor(t);
        break;
      }
      default:
        console.warn(
          `DIVERoot.PlaceOnFloor: Unknown entity type: ${t.entityType}`
        );
    }
  }
  updateLight(t) {
    let e = this.GetSceneObject(t);
    if (!e) {
      switch (t.type) {
        case "scene": {
          e = new si();
          break;
        }
        case "ambient": {
          e = new ti();
          break;
        }
        case "point": {
          e = new ii();
          break;
        }
        default: {
          console.warn(
            `DIVERoot.updateLight: Unknown light type: ${t.type}`
          );
          return;
        }
      }
      e.userData.id = t.id, this.add(e);
    }
    t.name !== void 0 && t.name !== null && (e.name = t.name), t.position !== void 0 && t.position !== null && e.position.set(
      t.position.x,
      t.position.y,
      t.position.z
    ), t.intensity !== void 0 && t.intensity !== null && e.SetIntensity(
      t.intensity
    ), t.enabled !== void 0 && t.enabled !== null && e.SetEnabled(
      t.enabled
    ), t.color !== void 0 && t.color !== null && e.SetColor(
      new x(t.color)
    ), t.visible !== void 0 && t.visible !== null && (e.visible = t.visible), t.parentId !== void 0 && this.setParent({ ...t, parentId: t.parentId });
  }
  updateModel(t) {
    let e = this.GetSceneObject(t);
    e || (e = new ai(), e.userData.id = t.id, e.userData.uri = t.uri, this.add(e)), t.uri !== void 0 && this._getAssetLoader().then((n) => n.load(t.uri)).then((n) => {
      e.SetModel(n), E("State").then((o) => {
        var h;
        (h = o.get(t.id)) == null || h.performAction("MODEL_LOADED", {
          id: t.id
        });
      });
    }), t.name !== void 0 && (e.name = t.name), t.position !== void 0 && e.SetPosition(t.position), t.rotation !== void 0 && e.SetRotation(t.rotation), t.scale !== void 0 && e.SetScale(t.scale), t.visible !== void 0 && e.SetVisibility(t.visible), t.material !== void 0 && e.SetMaterial(t.material), t.parentId !== void 0 && this.setParent({ ...t, parentId: t.parentId });
  }
  updatePrimitive(t) {
    let e = this.GetSceneObject(t);
    e || (e = new ci(), e.userData.id = t.id, this.add(e)), t.name !== void 0 && (e.name = t.name), t.geometry !== void 0 && e.SetGeometry(t.geometry), t.position !== void 0 && e.SetPosition(t.position), t.rotation !== void 0 && e.SetRotation(t.rotation), t.scale !== void 0 && e.SetScale(t.scale), t.visible !== void 0 && e.SetVisibility(t.visible), t.material !== void 0 && e.SetMaterial(t.material), t.parentId !== void 0 && this.setParent({ ...t, parentId: t.parentId });
  }
  updateGroup(t) {
    let e = this.GetSceneObject(t);
    e || (e = new li(), e.userData.id = t.id, this.add(e)), t.name !== void 0 && (e.name = t.name), t.position !== void 0 && e.SetPosition(t.position), t.rotation !== void 0 && e.SetRotation(t.rotation), t.scale !== void 0 && e.SetScale(t.scale), t.visible !== void 0 && e.SetVisibility(t.visible), t.bbVisible !== void 0 && e.SetLinesVisibility(t.bbVisible), t.parentId !== void 0 && this.setParent({ ...t, parentId: t.parentId });
  }
  deleteLight(t) {
    const e = this.GetSceneObject(t);
    if (!e) {
      console.warn(
        `DIVERoot.deleteLight: Light with id ${t.id} not found`
      );
      return;
    }
    this.detachTransformControls(e), e.parent.remove(e);
  }
  deleteModel(t) {
    const e = this.GetSceneObject(t);
    if (!e) {
      console.warn(
        `DIVERoot.deleteModel: Model with id ${t.id} not found`
      );
      return;
    }
    this.detachTransformControls(e), e.parent.remove(e);
  }
  deletePrimitive(t) {
    const e = this.GetSceneObject(t);
    if (!e) {
      console.warn(
        `DIVERoot.deletePrimitive: Primitive with id ${t.id} not found`
      );
      return;
    }
    this.detachTransformControls(e), e.parent.remove(e);
  }
  deleteGroup(t) {
    const e = this.GetSceneObject(t);
    if (!e) {
      console.warn(
        `DIVERoot.deleteGroup: Group with id ${t.id} not found`
      );
      return;
    }
    this.detachTransformControls(e);
    for (let n = e.members.length - 1; n >= 0; n--)
      this.attach(e.members[n]);
    e.parent.remove(e);
  }
  placeOnFloor(t) {
    const e = this.GetSceneObject(t);
    e && e.PlaceOnFloor();
  }
  setParent(t) {
    const e = this.GetSceneObject(t);
    if (t.parentId !== null) {
      const n = this.GetSceneObject({
        id: t.parentId
      });
      if (!n) return;
      n.attach(e);
    } else
      this.attach(e);
  }
  detachTransformControls(t) {
    this.findScene(t).children.find((e) => {
      "isTransformControls" in e && e.detach();
    });
  }
  findScene(t) {
    return t.parent !== null ? this.findScene(t.parent) : t;
  }
}
const ui = "#888888", pi = "#dddddd";
class mi extends Y {
  constructor() {
    super(), this.name = "Grid";
    const s = new Nt(
      100,
      100,
      ui,
      pi
    );
    s.material.depthTest = !1, s.layers.mask = Ut, this.add(s);
  }
  SetVisibility(s) {
    this.visible = s;
  }
}
class fi extends Gt {
  constructor() {
    super();
    a(this, "_root");
    a(this, "_grid");
    this.background = new x(16777215), this._root = new di(), this.add(this._root), this._grid = new mi(), this.add(this._grid);
  }
  get Root() {
    return this._root;
  }
  get Grid() {
    return this._grid;
  }
  SetBackground(t) {
    this.background = new x(t);
  }
  ComputeSceneBB() {
    return this.Root.ComputeSceneBB();
  }
  GetSceneObject(t) {
    return this.Root.GetSceneObject(t);
  }
  AddSceneObject(t) {
    this.Root.AddSceneObject(t);
  }
  UpdateSceneObject(t) {
    this.Root.UpdateSceneObject(t);
  }
  DeleteSceneObject(t) {
    this.Root.DeleteSceneObject(t);
  }
  PlaceOnFloor(t) {
    this.Root.PlaceOnFloor(t);
  }
}
const qe = {
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
      ...qe,
      ...e ?? {}
    }, this._webglrenderer = new Fe({
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
    this._webglrenderer.dispose(), this._settings.canvas = s, this._webglrenderer = new Fe(this._settings);
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
class bi {
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
class _i {
  constructor(s, t) {
    a(this, "_resizeObserver");
    a(this, "_width", 0);
    a(this, "_height", 0);
    this._resizeObserver = new ResizeObserver((e) => {
      for (const n of e) {
        const { width: o, height: h } = n.contentRect;
        o === this._width && h === this._height || (s.onResize(o, h), t.onResize(o, h), this._width = o, this._height = h);
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
const $e = {
  autoStart: !0,
  displayAxes: !1,
  perspectiveCamera: Jt,
  renderer: qe
};
class yi {
  constructor(s) {
    a(this, "_renderer");
    a(this, "_scene");
    a(this, "_camera");
    a(this, "_resizeManager");
    a(this, "_clock");
    a(this, "_settings");
    this._settings = {
      ...$e,
      ...s ?? {}
    }, this._scene = new fi(), this._camera = new qt(
      this._settings.perspectiveCamera
    ), this._renderer = new gi(
      this._scene,
      this._camera,
      this._settings.renderer
    ), this._resizeManager = new _i(
      this._renderer,
      this._camera
    ), this._clock = new bi(), this._clock.setRenderer(this._renderer), this._settings.autoStart && this.start();
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
window.DIVE = {
  instances: [],
  get instance() {
    return window.DIVE.instances[0];
  }
};
const Ei = {
  ...$e,
  orbitController: se
};
class Qe {
  constructor(s) {
    // descriptive members
    a(this, "_settings");
    a(this, "_engine");
    a(this, "orbitController");
    a(this, "axisCamera");
    this._settings = {
      ...Ei,
      ...s ?? {}
    }, this._engine = new yi(s), this.orbitController = new ne(
      this._engine.camera,
      this._engine.renderer.webglrenderer.domElement,
      this._settings.orbitController
    ), this._engine.clock.addTicker(this.orbitController), this._settings.displayAxes ? (this.axisCamera = new ei(
      this._engine.renderer,
      this._engine.scene,
      this._engine.camera
    ), this._engine.clock.addTicker(this.axisCamera)) : this.axisCamera = null, import("./chunks/package-BvoZkrge.mjs").then((t) => {
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
    const e = new Qe(t);
    window.DIVE.instances.push(e);
    const n = new (await E("State"))(
      e._engine,
      e.orbitController
    );
    n.performAction("UPDATE_SCENE", {
      backgroundColor: 16777215,
      gridEnabled: !1,
      floorEnabled: !0,
      floorColor: 16777215
    }), n.performAction("SET_CAMERA_TRANSFORM", {
      position: { x: 0, y: 2, z: 2 },
      target: { x: 0, y: 0.5, z: 0 }
    });
    const o = C.generateUUID();
    n.performAction("ADD_OBJECT", {
      entityType: "light",
      type: "scene",
      name: "light",
      id: o,
      enabled: !0,
      visible: !0,
      intensity: (t == null ? void 0 : t.lightIntensity) ?? 1,
      color: 16777215
    });
    const h = C.generateUUID();
    return new Promise((l) => {
      n.subscribe("MODEL_LOADED", (p) => {
        if (p.id !== h) return;
        const f = n.performAction(
          "COMPUTE_ENCOMPASSING_VIEW"
        );
        n.performAction("SET_CAMERA_TRANSFORM", {
          position: f.position,
          target: f.target
        }), l(e);
      }), n.performAction("ADD_OBJECT", {
        entityType: "model",
        name: "object",
        id: h,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        uri: s,
        visible: !0,
        loaded: !1
      });
    });
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
      this._settings.orbitController
    ), this._engine.clock.addTicker(this.orbitController);
  }
  async Dispose() {
    return new Promise((s) => {
      this._engine.clock.removeTicker(this.orbitController), this.orbitController.dispose(), this.axisCamera && (this._engine.clock.removeTicker(this.axisCamera), this.axisCamera.Dispose()), s();
    });
  }
}
const We = (c, s) => {
  if (Object.keys(c).length === 0 && Object.keys(s).length === 0)
    return {};
  if (typeof c != "object" || typeof s != "object")
    return s;
  let t = {};
  return Object.keys(s).forEach((e) => {
    if (!Object.keys(c).includes(e)) {
      t = { ...t, [e]: s[e] };
      return;
    }
    if (Array.isArray(s[e])) {
      if (!Array.isArray(c[e])) {
        t = { ...t, [e]: s[e] };
        return;
      }
      const n = c[e], o = s[e];
      if (n.length === 0 && o.length === 0) {
        t = { ...t };
        return;
      }
      if (n.length !== o.length) {
        t = { ...t, [e]: s[e] };
        return;
      }
      const h = [];
      if (o.forEach((l, p) => {
        const f = We(
          n[p],
          o[p]
        );
        Object.keys(f).length && h.push(o[p]);
      }), Object.keys(h).length) {
        t = { ...t, [e]: h };
        return;
      }
      return;
    }
    if (typeof s[e] == "object") {
      if (typeof c[e] != "object") {
        t = { ...t, [e]: s[e] };
        return;
      }
      const n = We(
        c[e],
        s[e]
      );
      if (Object.keys(n).length) {
        t = { ...t, [e]: n };
        return;
      }
    }
    c[e] !== s[e] && (t = { ...t, [e]: s[e] });
  }), t;
};
function D(c, s) {
  const t = (c + "e").split("e");
  return +(t[0] + "e" + (+t[1] + (s || 0)));
}
function wi(c, s = 0) {
  const t = D(c, +s);
  return D(Math.ceil(t), -s);
}
function Di(c, s = 0) {
  const t = D(c, +s);
  return D(Math.floor(t), -s);
}
function et(c, s = 0) {
  if (c < 0) return -et(-c, s);
  const t = D(c, +s);
  return D(Math.round(t), -s);
}
function Si(c, s, t) {
  return Math.atan2(
    c.clone().cross(s).dot(t),
    s.clone().dot(c)
  );
}
function Oi(c, s = 0) {
  const t = D(c, +s);
  return D(Math.round(t), -s).toFixed(s);
}
function Ti(c, s = 0) {
  const t = D(c, +s);
  return D(Math.trunc(t), -s);
}
function xi(c) {
  return (C.radToDeg(c) + 360) % 360;
}
function Pi(c) {
  return C.degToRad(c);
}
const Vi = {
  ceilExp: wi,
  floorExp: Di,
  roundExp: et,
  toFixedExp: Oi,
  truncateExp: Ti,
  signedAngleTo: Si,
  radToDeg: xi,
  degToRad: Pi
};
export {
  Qe as DIVE,
  Ei as DIVEDefaultSettings,
  Vi as DIVEMath,
  Zi as ESystem,
  Xi as EWebXRUnsupportedReason,
  Ui as FILE_TYPES,
  Yi as SUPPORTED_FILE_TYPES,
  ri as applyMixins,
  Ni as findInterface,
  ge as findSceneRecursive,
  Hi as getFileTypeFromUri,
  E as getModule,
  We as getObjectDelta,
  Gi as implementsInterface,
  Wi as isFileTypeSupported
};
