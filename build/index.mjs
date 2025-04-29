var Et = Object.defineProperty;
var wt = (c, n, t) => n in c ? Et(c, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[n] = t;
var a = (c, n, t) => wt(c, typeof n != "symbol" ? n + "" : n, t);
import { Ray as St, Plane as Dt, MathUtils as L, EventDispatcher as Ot, Vector3 as p, MOUSE as F, TOUCH as U, Spherical as ze, Quaternion as Ge, Vector2 as y, OrthographicCamera as At, Vector4 as xt, AxesHelper as Tt, Color as x, Matrix4 as Pt, Object3D as Y, AmbientLight as Mt, PointLight as Lt, SphereGeometry as We, MeshBasicMaterial as Ct, FrontSide as It, Mesh as pe, HemisphereLight as Rt, DirectionalLight as vt, Box3 as Ke, MeshStandardMaterial as fe, Raycaster as Ze, CylinderGeometry as kt, BufferGeometry as Xe, BufferAttribute as Ne, BoxGeometry as he, ConeGeometry as jt, LineDashedMaterial as Vt, Line as Bt, PlaneGeometry as zt, GridHelper as Gt, Scene as Nt, WebGLRenderer as Ft } from "three";
import de from "three-spritetext";
import { C as q, P as T, U as Ut, H as Yt } from "./chunks/VisibilityLayerMask-BAKNt1Mg.mjs";
import { A as Ht, a as Wt, b as Kt, c as Zt, d as Xt, e as qt } from "./chunks/SelectTool-BqLz-UL1.mjs";
import { f as Ui, i as Yi } from "./chunks/SelectTool-BqLz-UL1.mjs";
import { S as w, M as qe } from "./chunks/State-DKVvDtWu.mjs";
import { A as Wi, C as Ki, D as Zi, e as Xi, f as qi, E as Ji, d as $i, h as Qi, n as es, G as ts, i as is, L as ss, j as ns, a as os, P as rs, k as as, o as cs, b as ls, c as hs, q as ds, s as us, t as ms, l as ps, m as fs, U as gs, p as bs, u as _s, Z as ys, g as Es, z as ws, x as Ss, w as Ds, y as Os, v as As, r as xs } from "./chunks/State-DKVvDtWu.mjs";
import { D as Jt, a as $t } from "./chunks/MediaCreator-BlYNy7LU.mjs";
import { M as Ps } from "./chunks/MediaCreator-BlYNy7LU.mjs";
import { A as Ls, F as Cs, N as Is, S as Rs, g as vs, i as ks } from "./chunks/AssetLoader-oPgCU9ZZ.mjs";
import { F as Vs, P as Bs } from "./chunks/fflate.module-CK2avau9.mjs";
import { A as Gs, E as Ns, a as Fs, S as Us } from "./chunks/SystemInfo-BME6iEuf.mjs";
import { ARSystem as Hs } from "./src/modules/ar/ARSystem.mjs";
import { AssetConverter as Ks } from "./src/modules/asset/converter/AssetConverter.mjs";
import { AssetExporter as Xs } from "./src/modules/asset/exporter/AssetExporter.mjs";
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
const Fe = { type: "change" }, ue = { type: "start" }, Ue = { type: "end" }, ie = new St(), Ye = new Dt(), Qt = Math.cos(70 * L.DEG2RAD);
class ei extends Ot {
  constructor(n, t) {
    super(), this.object = n, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new p(), this.cursor = new p(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: F.ROTATE, MIDDLE: F.DOLLY, RIGHT: F.PAN }, this.touches = { ONE: U.ROTATE, TWO: U.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(i) {
      i.addEventListener("keydown", le), this._domElementKeyEvents = i;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", le), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Fe), e.update(), o = s.NONE;
    }, this.update = function() {
      const i = new p(), r = new Ge().setFromUnitVectors(n.up, new p(0, 1, 0)), h = r.clone().invert(), u = new p(), b = new Ge(), M = new p(), _ = 2 * Math.PI;
      return function(yt = null) {
        const Ve = e.object.position;
        i.copy(Ve).sub(e.target), i.applyQuaternion(r), l.setFromVector3(i), e.autoRotate && o === s.NONE && W(tt(yt)), e.enableDamping ? (l.theta += m.theta * e.dampingFactor, l.phi += m.phi * e.dampingFactor) : (l.theta += m.theta, l.phi += m.phi);
        let D = e.minAzimuthAngle, O = e.maxAzimuthAngle;
        isFinite(D) && isFinite(O) && (D < -Math.PI ? D += _ : D > Math.PI && (D -= _), O < -Math.PI ? O += _ : O > Math.PI && (O -= _), D <= O ? l.theta = Math.max(D, Math.min(O, l.theta)) : l.theta = l.theta > (D + O) / 2 ? Math.max(D, l.theta) : Math.min(O, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(E, e.dampingFactor) : e.target.add(E), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let Z = !1;
        if (e.zoomToCursor && $ || e.object.isOrthographicCamera)
          l.radius = ae(l.radius);
        else {
          const A = l.radius;
          l.radius = ae(l.radius * f), Z = A != l.radius;
        }
        if (i.setFromSpherical(l), i.applyQuaternion(h), Ve.copy(e.target).add(i), e.object.lookAt(e.target), e.enableDamping === !0 ? (m.theta *= 1 - e.dampingFactor, m.phi *= 1 - e.dampingFactor, E.multiplyScalar(1 - e.dampingFactor)) : (m.set(0, 0, 0), E.set(0, 0, 0)), e.zoomToCursor && $) {
          let A = null;
          if (e.object.isPerspectiveCamera) {
            const X = i.length();
            A = ae(X * f);
            const te = X - A;
            e.object.position.addScaledVector(_e, te), e.object.updateMatrixWorld(), Z = !!te;
          } else if (e.object.isOrthographicCamera) {
            const X = new p(P.x, P.y, 0);
            X.unproject(e.object);
            const te = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), Z = te !== e.object.zoom;
            const Be = new p(P.x, P.y, 0);
            Be.unproject(e.object), e.object.position.sub(Be).add(X), e.object.updateMatrixWorld(), A = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          A !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(A).add(e.object.position) : (ie.origin.copy(e.object.position), ie.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(ie.direction)) < Qt ? n.lookAt(e.target) : (Ye.setFromNormalAndCoplanarPoint(e.object.up, e.target), ie.intersectPlane(Ye, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const A = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), A !== e.object.zoom && (e.object.updateProjectionMatrix(), Z = !0);
        }
        return f = 1, $ = !1, Z || u.distanceToSquared(e.object.position) > d || 8 * (1 - b.dot(e.object.quaternion)) > d || M.distanceToSquared(e.target) > d ? (e.dispatchEvent(Fe), u.copy(e.object.position), b.copy(e.object.quaternion), M.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", ke), e.domElement.removeEventListener("pointerdown", Le), e.domElement.removeEventListener("pointercancel", K), e.domElement.removeEventListener("wheel", Ce), e.domElement.removeEventListener("pointermove", ce), e.domElement.removeEventListener("pointerup", K), e.domElement.getRootNode().removeEventListener("keydown", Ie, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", le), e._domElementKeyEvents = null);
    };
    const e = this, s = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let o = s.NONE;
    const d = 1e-6, l = new ze(), m = new ze();
    let f = 1;
    const E = new p(), C = new y(), I = new y(), j = new y(), R = new y(), v = new y(), V = new y(), B = new y(), z = new y(), k = new y(), _e = new p(), P = new y();
    let $ = !1;
    const g = [], H = {};
    let ne = !1;
    function tt(i) {
      return i !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * i : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Q(i) {
      const r = Math.abs(i * 0.01);
      return Math.pow(0.95, e.zoomSpeed * r);
    }
    function W(i) {
      m.theta -= i;
    }
    function ee(i) {
      m.phi -= i;
    }
    const ye = function() {
      const i = new p();
      return function(h, u) {
        i.setFromMatrixColumn(u, 0), i.multiplyScalar(-h), E.add(i);
      };
    }(), Ee = function() {
      const i = new p();
      return function(h, u) {
        e.screenSpacePanning === !0 ? i.setFromMatrixColumn(u, 1) : (i.setFromMatrixColumn(u, 0), i.crossVectors(e.object.up, i)), i.multiplyScalar(h), E.add(i);
      };
    }(), G = function() {
      const i = new p();
      return function(h, u) {
        const b = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const M = e.object.position;
          i.copy(M).sub(e.target);
          let _ = i.length();
          _ *= Math.tan(e.object.fov / 2 * Math.PI / 180), ye(2 * h * _ / b.clientHeight, e.object.matrix), Ee(2 * u * _ / b.clientHeight, e.object.matrix);
        } else e.object.isOrthographicCamera ? (ye(h * (e.object.right - e.object.left) / e.object.zoom / b.clientWidth, e.object.matrix), Ee(u * (e.object.top - e.object.bottom) / e.object.zoom / b.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function oe(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function we(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function re(i, r) {
      if (!e.zoomToCursor)
        return;
      $ = !0;
      const h = e.domElement.getBoundingClientRect(), u = i - h.left, b = r - h.top, M = h.width, _ = h.height;
      P.x = u / M * 2 - 1, P.y = -(b / _) * 2 + 1, _e.set(P.x, P.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function ae(i) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, i));
    }
    function Se(i) {
      C.set(i.clientX, i.clientY);
    }
    function it(i) {
      re(i.clientX, i.clientX), B.set(i.clientX, i.clientY);
    }
    function De(i) {
      R.set(i.clientX, i.clientY);
    }
    function st(i) {
      I.set(i.clientX, i.clientY), j.subVectors(I, C).multiplyScalar(e.rotateSpeed);
      const r = e.domElement;
      W(2 * Math.PI * j.x / r.clientHeight), ee(2 * Math.PI * j.y / r.clientHeight), C.copy(I), e.update();
    }
    function nt(i) {
      z.set(i.clientX, i.clientY), k.subVectors(z, B), k.y > 0 ? oe(Q(k.y)) : k.y < 0 && we(Q(k.y)), B.copy(z), e.update();
    }
    function ot(i) {
      v.set(i.clientX, i.clientY), V.subVectors(v, R).multiplyScalar(e.panSpeed), G(V.x, V.y), R.copy(v), e.update();
    }
    function rt(i) {
      re(i.clientX, i.clientY), i.deltaY < 0 ? we(Q(i.deltaY)) : i.deltaY > 0 && oe(Q(i.deltaY)), e.update();
    }
    function at(i) {
      let r = !1;
      switch (i.code) {
        case e.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? ee(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : G(0, e.keyPanSpeed), r = !0;
          break;
        case e.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? ee(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : G(0, -e.keyPanSpeed), r = !0;
          break;
        case e.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? W(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : G(e.keyPanSpeed, 0), r = !0;
          break;
        case e.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? W(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : G(-e.keyPanSpeed, 0), r = !0;
          break;
      }
      r && (i.preventDefault(), e.update());
    }
    function Oe(i) {
      if (g.length === 1)
        C.set(i.pageX, i.pageY);
      else {
        const r = N(i), h = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        C.set(h, u);
      }
    }
    function Ae(i) {
      if (g.length === 1)
        R.set(i.pageX, i.pageY);
      else {
        const r = N(i), h = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        R.set(h, u);
      }
    }
    function xe(i) {
      const r = N(i), h = i.pageX - r.x, u = i.pageY - r.y, b = Math.sqrt(h * h + u * u);
      B.set(0, b);
    }
    function ct(i) {
      e.enableZoom && xe(i), e.enablePan && Ae(i);
    }
    function lt(i) {
      e.enableZoom && xe(i), e.enableRotate && Oe(i);
    }
    function Te(i) {
      if (g.length == 1)
        I.set(i.pageX, i.pageY);
      else {
        const h = N(i), u = 0.5 * (i.pageX + h.x), b = 0.5 * (i.pageY + h.y);
        I.set(u, b);
      }
      j.subVectors(I, C).multiplyScalar(e.rotateSpeed);
      const r = e.domElement;
      W(2 * Math.PI * j.x / r.clientHeight), ee(2 * Math.PI * j.y / r.clientHeight), C.copy(I);
    }
    function Pe(i) {
      if (g.length === 1)
        v.set(i.pageX, i.pageY);
      else {
        const r = N(i), h = 0.5 * (i.pageX + r.x), u = 0.5 * (i.pageY + r.y);
        v.set(h, u);
      }
      V.subVectors(v, R).multiplyScalar(e.panSpeed), G(V.x, V.y), R.copy(v);
    }
    function Me(i) {
      const r = N(i), h = i.pageX - r.x, u = i.pageY - r.y, b = Math.sqrt(h * h + u * u);
      z.set(0, b), k.set(0, Math.pow(z.y / B.y, e.zoomSpeed)), oe(k.y), B.copy(z);
      const M = (i.pageX + r.x) * 0.5, _ = (i.pageY + r.y) * 0.5;
      re(M, _);
    }
    function ht(i) {
      e.enableZoom && Me(i), e.enablePan && Pe(i);
    }
    function dt(i) {
      e.enableZoom && Me(i), e.enableRotate && Te(i);
    }
    function Le(i) {
      e.enabled !== !1 && (g.length === 0 && (e.domElement.setPointerCapture(i.pointerId), e.domElement.addEventListener("pointermove", ce), e.domElement.addEventListener("pointerup", K)), !_t(i) && (gt(i), i.pointerType === "touch" ? ve(i) : ut(i)));
    }
    function ce(i) {
      e.enabled !== !1 && (i.pointerType === "touch" ? ft(i) : mt(i));
    }
    function K(i) {
      switch (bt(i), g.length) {
        case 0:
          e.domElement.releasePointerCapture(i.pointerId), e.domElement.removeEventListener("pointermove", ce), e.domElement.removeEventListener("pointerup", K), e.dispatchEvent(Ue), o = s.NONE;
          break;
        case 1:
          const r = g[0], h = H[r];
          ve({ pointerId: r, pageX: h.x, pageY: h.y });
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
          it(i), o = s.DOLLY;
          break;
        case F.ROTATE:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enablePan === !1) return;
            De(i), o = s.PAN;
          } else {
            if (e.enableRotate === !1) return;
            Se(i), o = s.ROTATE;
          }
          break;
        case F.PAN:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enableRotate === !1) return;
            Se(i), o = s.ROTATE;
          } else {
            if (e.enablePan === !1) return;
            De(i), o = s.PAN;
          }
          break;
        default:
          o = s.NONE;
      }
      o !== s.NONE && e.dispatchEvent(ue);
    }
    function mt(i) {
      switch (o) {
        case s.ROTATE:
          if (e.enableRotate === !1) return;
          st(i);
          break;
        case s.DOLLY:
          if (e.enableZoom === !1) return;
          nt(i);
          break;
        case s.PAN:
          if (e.enablePan === !1) return;
          ot(i);
          break;
      }
    }
    function Ce(i) {
      e.enabled === !1 || e.enableZoom === !1 || o !== s.NONE || (i.preventDefault(), e.dispatchEvent(ue), rt(pt(i)), e.dispatchEvent(Ue));
    }
    function pt(i) {
      const r = i.deltaMode, h = {
        clientX: i.clientX,
        clientY: i.clientY,
        deltaY: i.deltaY
      };
      switch (r) {
        case 1:
          h.deltaY *= 16;
          break;
        case 2:
          h.deltaY *= 100;
          break;
      }
      return i.ctrlKey && !ne && (h.deltaY *= 10), h;
    }
    function Ie(i) {
      i.key === "Control" && (ne = !0, e.domElement.getRootNode().addEventListener("keyup", Re, { passive: !0, capture: !0 }));
    }
    function Re(i) {
      i.key === "Control" && (ne = !1, e.domElement.getRootNode().removeEventListener("keyup", Re, { passive: !0, capture: !0 }));
    }
    function le(i) {
      e.enabled === !1 || e.enablePan === !1 || at(i);
    }
    function ve(i) {
      switch (je(i), g.length) {
        case 1:
          switch (e.touches.ONE) {
            case U.ROTATE:
              if (e.enableRotate === !1) return;
              Oe(i), o = s.TOUCH_ROTATE;
              break;
            case U.PAN:
              if (e.enablePan === !1) return;
              Ae(i), o = s.TOUCH_PAN;
              break;
            default:
              o = s.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case U.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1) return;
              ct(i), o = s.TOUCH_DOLLY_PAN;
              break;
            case U.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1) return;
              lt(i), o = s.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = s.NONE;
          }
          break;
        default:
          o = s.NONE;
      }
      o !== s.NONE && e.dispatchEvent(ue);
    }
    function ft(i) {
      switch (je(i), o) {
        case s.TOUCH_ROTATE:
          if (e.enableRotate === !1) return;
          Te(i), e.update();
          break;
        case s.TOUCH_PAN:
          if (e.enablePan === !1) return;
          Pe(i), e.update();
          break;
        case s.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1) return;
          ht(i), e.update();
          break;
        case s.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1) return;
          dt(i), e.update();
          break;
        default:
          o = s.NONE;
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
      r === void 0 && (r = new y(), H[i.pointerId] = r), r.set(i.pageX, i.pageY);
    }
    function N(i) {
      const r = i.pointerId === g[0] ? g[1] : g[0];
      return H[r];
    }
    e.domElement.addEventListener("contextmenu", ke), e.domElement.addEventListener("pointerdown", Le), e.domElement.addEventListener("pointercancel", K), e.domElement.addEventListener("wheel", Ce, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", Ie, { passive: !0, capture: !0 }), this.update();
  }
}
const se = {
  enableDamping: !0,
  dampingFactor: 0.05
}, J = class J extends ei {
  constructor(t, e, s = se) {
    super(t, e);
    a(this, "uuid", L.generateUUID());
    a(this, "object");
    a(this, "domElement");
    this.domElement = e, this.object = t, this.enableDamping = s.enableDamping ?? se.enableDamping, this.dampingFactor = s.dampingFactor ?? se.dampingFactor, this.object.position.set(0, 2, 2), this.target.copy({ x: 0, y: 0.5, z: 0 }), this.update();
  }
  tick() {
    this.enabled && this.update();
  }
  computeEncompassingView(t) {
    const e = t.getCenter(new p()), s = t.getSize(new p()), o = Math.max(s.x, s.y, s.z) * 1.25;
    return {
      position: this.object.position.clone().normalize().clone().multiplyScalar(o),
      target: e.clone()
    };
  }
  zoomIn(t) {
    const e = t || J.DEFAULT_ZOOM_FACTOR, { minDistance: s, maxDistance: o } = this;
    this.minDistance = this.maxDistance = L.clamp(
      this.getDistance() - e,
      s + e,
      o - e
    ), this.update(), this.minDistance = s, this.maxDistance = o;
  }
  zoomOut(t) {
    const e = t || J.DEFAULT_ZOOM_FACTOR, { minDistance: s, maxDistance: o } = this;
    this.minDistance = this.maxDistance = L.clamp(
      this.getDistance() + e,
      s + e,
      o - e
    ), this.update(), this.minDistance = s, this.maxDistance = o;
  }
};
a(J, "DEFAULT_ZOOM_FACTOR", 1);
let me = J;
class ti extends At {
  constructor(t, e, s) {
    super(-1, 1, 1, -1, 0.1, 100);
    a(this, "axesHelper");
    a(this, "_renderer");
    a(this, "_scene");
    a(this, "_camera");
    a(this, "_restoreViewport", new xt());
    this.layers.mask = q, this.axesHelper = new Tt(0.5), this.axesHelper.layers.mask = q, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new x(Ht),
      new x(Wt),
      new x(Kt)
    );
    const o = new de("X", 0.2, Zt), d = new de("Y", 0.2, Xt), l = new de("Z", 0.2, qt);
    o.layers.mask = q, d.layers.mask = q, l.layers.mask = q, o.position.set(0.7, 0, 0), d.position.set(0, 0.7, 0), l.position.set(0, 0, 0.7), this.axesHelper.add(o), this.axesHelper.add(d), this.axesHelper.add(l), this.add(this.axesHelper), this._renderer = t, this._scene = e, this._camera = s, this._scene.add(this);
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
      new Pt().extractRotation(t).invert()
    );
  }
}
const ii = "1.19.1-beta.10", si = {
  version: ii
};
class ni extends Y {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVEAmbientLight", !0);
    a(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new Mt(16777215, 1), this._light.layers.mask = T, this.add(this._light);
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
class oi extends Y {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVEPointLight", !0);
    a(this, "isMovable", !0);
    a(this, "isSelectable", !0);
    a(this, "gizmo", null);
    a(this, "light");
    a(this, "mesh");
    this.name = "DIVEPointLight", this.light = new Lt(16777215, 1), this.light.layers.mask = T, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const t = 0.1, e = new We(
      t,
      t * 320,
      t * 320
    ), s = new Ct({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: It
    });
    this.mesh = new pe(e, s), this.mesh.layers.mask = Ut, this.add(this.mesh);
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
    var t;
    (t = w.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: this.position
    });
  }
  onSelect() {
    var t;
    (t = w.get(this.userData.id)) == null || t.performAction("SELECT_OBJECT", {
      id: this.userData.id
    });
  }
  onDeselect() {
    var t;
    (t = w.get(this.userData.id)) == null || t.performAction("DESELECT_OBJECT", {
      id: this.userData.id
    });
  }
}
class ri extends Y {
  constructor() {
    super();
    a(this, "isDIVELight", !0);
    a(this, "isDIVESceneLight", !0);
    a(this, "_hemiLight");
    a(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new Rt(16777215, 16777215, 2), this._hemiLight.layers.mask = T, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new vt(16777215, 3), this._dirLight.layers.mask = T, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
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
class ai {
  constructor() {
    a(this, "isMovable", !0);
  }
}
class ci {
  constructor() {
    a(this, "isSelectable", !0);
  }
}
function li(c, n) {
  return n.forEach((t) => {
    Object.getOwnPropertyNames(t.prototype).forEach((e) => {
      Object.defineProperty(
        c.prototype,
        e,
        Object.getOwnPropertyDescriptor(t.prototype, e)
      );
    });
  }), c;
}
class be extends li(Y, [
  ci,
  ai
]) {
  constructor() {
    super();
    a(this, "isDIVENode", !0);
    a(this, "gizmo", null);
    a(this, "_positionWorldBuffer");
    a(this, "_boundingBox");
    this.layers.mask = T, this._positionWorldBuffer = new p(), this._boundingBox = new Ke();
  }
  SetPosition(t) {
    if (!this.parent) {
      this.position.set(t.x, t.y, t.z);
      return;
    }
    const e = new p(t.x, t.y, t.z);
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
    var t;
    this.position.set(0, 0, 0), (t = w.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: this.getWorldPosition(this._positionWorldBuffer),
      rotation: this.rotation,
      scale: this.scale
    });
  }
  /**
   * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
   */
  onMove() {
    var t;
    (t = w.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: this.getWorldPosition(this._positionWorldBuffer),
      rotation: this.rotation,
      scale: this.scale
    });
  }
  onSelect() {
    var t;
    (t = w.get(this.userData.id)) == null || t.performAction("SELECT_OBJECT", {
      id: this.userData.id
    });
  }
  onDeselect() {
    var t;
    (t = w.get(this.userData.id)) == null || t.performAction("DESELECT_OBJECT", {
      id: this.userData.id
    });
  }
}
class hi extends be {
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
    var o, d, l, m, f;
    const t = this.getWorldPosition(this._positionWorldBuffer), e = t.clone();
    (d = (o = this._mesh) == null ? void 0 : o.geometry) == null || d.computeBoundingBox();
    const s = (m = (l = this._mesh) == null ? void 0 : l.geometry) == null ? void 0 : m.boundingBox;
    !s || !this._mesh || (t.y = t.y - this._mesh.localToWorld(s.min.clone()).y, t.y !== e.y && ((f = w.get(this.userData.id)) == null || f.performAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: t,
      rotation: this.rotation,
      scale: this.scale
    })));
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
      this._boundingBox.getCenter(new p()).multiply(this.scale)
    );
    e.y = t + this.position.y;
    const s = new Ze(e, new p(0, -1, 0));
    s.layers.mask = T;
    const o = s.intersectObjects(
      ge(this).Root.children,
      !0
    );
    if (o.length > 0) {
      const d = o[0].object;
      d.geometry.computeBoundingBox();
      const l = d.geometry.boundingBox, m = d.localToWorld(l.max.clone()), f = this.position.clone(), E = this.position.clone().setY(m.y).sub(new p(0, t, 0));
      if (this.position.copy(E), this.position.y === f.y) return;
      this.onMove();
    }
  }
}
class di extends be {
  constructor() {
    super();
    a(this, "isDIVEPrimitive", !0);
    a(this, "_mesh");
    this._mesh = new pe(), this._mesh.layers.mask = T, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new fe(), this.add(this._mesh);
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
    var o, d, l, m, f;
    const t = this.getWorldPosition(this._positionWorldBuffer), e = t.clone();
    (d = (o = this._mesh) == null ? void 0 : o.geometry) == null || d.computeBoundingBox();
    const s = (m = (l = this._mesh) == null ? void 0 : l.geometry) == null ? void 0 : m.boundingBox;
    !s || !this._mesh || (t.y = t.y - this._mesh.localToWorld(s.min.clone()).y, t.y !== e.y && ((f = w.get(this.userData.id)) == null || f.performAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: t,
      rotation: this.rotation,
      scale: this.scale
    })));
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
      this._boundingBox.getCenter(new p()).multiply(this.scale)
    );
    e.y = t + this.position.y;
    const s = new Ze(e, new p(0, -1, 0));
    s.layers.mask = T;
    const o = s.intersectObjects(
      ge(this).Root.children,
      !0
    );
    if (o.length > 0) {
      const d = o[0].object;
      d.geometry.computeBoundingBox();
      const l = d.geometry.boundingBox, m = d.localToWorld(l.max.clone()), f = this.position.clone(), E = this.position.clone().setY(m.y).sub(new p(0, t, 0));
      if (this.position.copy(E), this.position.y === f.y) return;
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
    return new We(t.width / 2, 256, 256);
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
    ]), s = new Uint16Array([
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
    ]), o = new Xe();
    return o.setAttribute(
      "position",
      new Ne(e, 3)
    ), o.setIndex(new Ne(s, 1)), o.computeVertexNormals(), o.computeBoundingBox(), o.computeBoundingSphere(), o;
  }
  createBoxGeometry(t) {
    const e = new he(
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
    const e = new he(
      t.width,
      t.height,
      t.depth || 0.05,
      16
    );
    return e.translate(0, t.height / 2, 0), e;
  }
  createPlaneGeometry(t) {
    const e = new he(
      t.width,
      t.height,
      t.depth
    );
    return e.translate(0, t.height / 2, 0), e;
  }
}
class ui extends be {
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
    const s = this._members.indexOf(e);
    s !== -1 && (this._lines[s].visible = t);
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
    const s = this._lines[e];
    return super.remove(s), this._lines.splice(e, 1), super.remove(t), this._members.splice(e, 1), this;
  }
  UpdateLineTo(t) {
    const e = this._members.indexOf(t);
    e !== -1 && this.updateLineTo(this._lines[e], t);
  }
  /**
   * Creates a line for visualization.
   */
  createLine() {
    const t = new Xe(), e = new Vt({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), s = new Bt(t, e);
    return s.visible = !1, s;
  }
  /**
   * Updates a line to the object.
   */
  updateLineTo(t, e) {
    const s = [
      new p(0, 0, 0),
      e.position.clone()
    ];
    t.geometry.setFromPoints(s), t.computeLineDistances();
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
class mi extends pe {
  constructor() {
    super(
      new zt(1e4, 1e4),
      new fe({
        color: new x(150 / 255, 150 / 255, 150 / 255)
      })
    );
    a(this, "isDIVEFloor", !0);
    this.name = "Floor", this.layers.mask = T, this.receiveShadow = !0, this.rotateX(-Math.PI / 2);
  }
  SetVisibility(t) {
    this.visible = t;
  }
  SetColor(t) {
    this.material.color = new x(t);
  }
}
class pi extends Y {
  constructor() {
    super();
    a(this, "isDIVERoot", !0);
    a(this, "_floor");
    a(this, "_assetLoader");
    this.name = "Root", this._floor = new mi(), this.add(this._floor), this._assetLoader = new qe("AssetLoader");
  }
  get floor() {
    return this._floor;
  }
  ComputeSceneBB() {
    const t = new Ke();
    return this.children.forEach((e) => {
      "isDIVEFloor" in e || e.traverse((s) => {
        "isObject3D" in s && t.expandByObject(s);
      });
    }), t;
  }
  GetSceneObject(t) {
    let e;
    return this.traverse((s) => {
      e || s.userData.id === t.id && (e = s);
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
          e = new ri();
          break;
        }
        case "ambient": {
          e = new ni();
          break;
        }
        case "point": {
          e = new oi();
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
    e || (e = new hi(), e.userData.id = t.id, e.userData.uri = t.uri, this.add(e)), t.uri !== void 0 && this._assetLoader.instantiate().then((s) => s.load(t.uri)).then((s) => {
      var o;
      e.SetModel(s), (o = w.get(t.id)) == null || o.performAction("MODEL_LOADED", {
        id: t.id
      });
    }), t.name !== void 0 && (e.name = t.name), t.position !== void 0 && e.SetPosition(t.position), t.rotation !== void 0 && e.SetRotation(t.rotation), t.scale !== void 0 && e.SetScale(t.scale), t.visible !== void 0 && e.SetVisibility(t.visible), t.material !== void 0 && e.SetMaterial(t.material), t.parentId !== void 0 && this.setParent({ ...t, parentId: t.parentId });
  }
  updatePrimitive(t) {
    let e = this.GetSceneObject(t);
    e || (e = new di(), e.userData.id = t.id, this.add(e)), t.name !== void 0 && (e.name = t.name), t.geometry !== void 0 && e.SetGeometry(t.geometry), t.position !== void 0 && e.SetPosition(t.position), t.rotation !== void 0 && e.SetRotation(t.rotation), t.scale !== void 0 && e.SetScale(t.scale), t.visible !== void 0 && e.SetVisibility(t.visible), t.material !== void 0 && e.SetMaterial(t.material), t.parentId !== void 0 && this.setParent({ ...t, parentId: t.parentId });
  }
  updateGroup(t) {
    let e = this.GetSceneObject(t);
    e || (e = new ui(), e.userData.id = t.id, this.add(e)), t.name !== void 0 && (e.name = t.name), t.position !== void 0 && e.SetPosition(t.position), t.rotation !== void 0 && e.SetRotation(t.rotation), t.scale !== void 0 && e.SetScale(t.scale), t.visible !== void 0 && e.SetVisibility(t.visible), t.bbVisible !== void 0 && e.SetLinesVisibility(t.bbVisible), t.parentId !== void 0 && this.setParent({ ...t, parentId: t.parentId });
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
    for (let s = e.members.length - 1; s >= 0; s--)
      this.attach(e.members[s]);
    e.parent.remove(e);
  }
  placeOnFloor(t) {
    const e = this.GetSceneObject(t);
    e && e.PlaceOnFloor();
  }
  setParent(t) {
    const e = this.GetSceneObject(t);
    if (t.parentId !== null) {
      const s = this.GetSceneObject({
        id: t.parentId
      });
      if (!s) return;
      s.attach(e);
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
const fi = "#888888", gi = "#dddddd";
class bi extends Y {
  constructor() {
    super(), this.name = "Grid";
    const n = new Gt(
      100,
      100,
      fi,
      gi
    );
    n.material.depthTest = !1, n.layers.mask = Yt, this.add(n);
  }
  SetVisibility(n) {
    this.visible = n;
  }
}
class _i extends Nt {
  constructor() {
    super();
    a(this, "_root");
    a(this, "_grid");
    this.background = new x(16777215), this._root = new pi(), this.add(this._root), this._grid = new bi(), this.add(this._grid);
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
const Je = {
  antialias: !0,
  alpha: !0,
  powerPreference: "high-performance",
  precision: "highp",
  stencil: !1,
  depth: !0,
  logarithmicDepthBuffer: !1
};
class yi {
  constructor(n, t, e) {
    a(this, "_webglrenderer");
    a(this, "_settings");
    this._scene = n, this._camera = t, this._settings = {
      ...Je,
      ...e ?? {}
    }, this._webglrenderer = new Ft({
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
  render() {
    this._webglrenderer.render(this._scene, this._camera);
  }
  onResize(n, t) {
    this._webglrenderer.setSize(n, t, !1);
  }
  dispose() {
    this._webglrenderer.dispose();
  }
}
class Ei {
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
  setRenderer(n) {
    this._renderer = n;
  }
  addTicker(n) {
    this._tickers.find((t) => t.uuid === n.uuid) || this._tickers.push(n);
  }
  removeTicker(n) {
    const t = this._tickers.findIndex((e) => e.uuid === n.uuid);
    t !== -1 && this._tickers.splice(t, 1);
  }
  dispose() {
    this.stop(), this._tickers.forEach((n) => {
      var t;
      return (t = n.dispose) == null ? void 0 : t.call(n);
    }), this._tickers = [], this._isRunning = !1, this._lastTime = 0;
  }
  _tick(n) {
    var e;
    if (!this._isRunning) return;
    const t = (n - this._lastTime) / 1e3;
    this._lastTime = n, this._tickers.forEach((s) => s.tick(t)), (e = this._renderer) == null || e.render(), requestAnimationFrame(this._tick.bind(this));
  }
}
class wi {
  constructor(n, t) {
    a(this, "_resizeObserver");
    a(this, "_width", 0);
    a(this, "_height", 0);
    if (this._resizeObserver = new ResizeObserver((e) => {
      for (const s of e) {
        const { width: o, height: d } = s.contentRect;
        o === this._width && d === this._height || (n.onResize(o, d), t.onResize(o, d), this._width = o, this._height = d);
      }
    }), n.webglrenderer.domElement.parentElement)
      this._resizeObserver.observe(
        n.webglrenderer.domElement.parentElement
      );
    else {
      const e = setInterval(() => {
        n.webglrenderer.domElement.parentElement && (this._resizeObserver.observe(
          n.webglrenderer.domElement.parentElement
        ), clearInterval(e));
      }, 16);
    }
  }
  dispose() {
    this._resizeObserver.disconnect();
  }
}
const $e = {
  autoStart: !0,
  displayAxes: !1,
  perspectiveCamera: Jt,
  renderer: Je
};
class Si {
  constructor(n) {
    a(this, "_renderer");
    a(this, "_scene");
    a(this, "_camera");
    a(this, "_resizeManager");
    a(this, "_clock");
    a(this, "_settings");
    this._settings = {
      ...$e,
      ...n ?? {}
    }, this._scene = new _i(), this._camera = new $t(
      this._settings.perspectiveCamera
    ), this._renderer = new yi(this._scene, this._camera), this._resizeManager = new wi(
      this._renderer,
      this._camera
    ), this._clock = new Ei(), this._clock.setRenderer(this._renderer), this._settings.autoStart && this.start();
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
const Di = {
  ...$e,
  orbitController: se
};
class Qe {
  constructor(n) {
    // descriptive members
    a(this, "_settings");
    a(this, "_engine");
    a(this, "orbitController");
    a(this, "axisCamera");
    this._settings = {
      ...Di,
      ...n ?? {}
    }, this._engine = new Si(n), this.orbitController = new me(
      this._engine.camera,
      this._engine.renderer.webglrenderer.domElement,
      this._settings.orbitController
    ), this._engine.clock.addTicker(this.orbitController), this._settings.displayAxes ? (this.axisCamera = new ti(
      this._engine.renderer,
      this._engine.scene,
      this._engine.camera
    ), this._engine.clock.addTicker(this.axisCamera)) : this.axisCamera = null, window.DIVE = {
      instances: [],
      PrintScene: () => this._engine.scene
    }, console.log(`DIVE ${si.version} initialized successfully!`), console.log(`
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
  static async QuickView(n, t) {
    return new Promise((e) => {
      const s = new Qe(t);
      new qe("State").instantiate(s._engine, s.orbitController).then((o) => {
        o.performAction("UPDATE_SCENE", {
          backgroundColor: 16777215,
          gridEnabled: !1,
          floorColor: 16777215
        }), o.performAction("SET_CAMERA_TRANSFORM", {
          position: { x: 0, y: 2, z: 2 },
          target: { x: 0, y: 0.5, z: 0 }
        });
        const d = L.generateUUID();
        o.performAction("ADD_OBJECT", {
          entityType: "light",
          type: "scene",
          name: "light",
          id: d,
          enabled: !0,
          visible: !0,
          intensity: 1,
          color: 16777215
        });
        const l = L.generateUUID();
        o.subscribe("MODEL_LOADED", (m) => {
          if (m.id !== l) return;
          const f = o.performAction(
            "COMPUTE_ENCOMPASSING_VIEW"
          );
          o.performAction("SET_CAMERA_TRANSFORM", {
            position: f.position,
            target: f.target
          }), window.DIVE.instances.push(s), e(s);
        }), o.performAction("ADD_OBJECT", {
          entityType: "model",
          name: "object",
          id: l,
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          uri: n,
          visible: !0,
          loaded: !1
        });
      });
    });
  }
  get engine() {
    return this._engine;
  }
  get canvas() {
    return this._engine.renderer.webglrenderer.domElement;
  }
  async Dispose() {
    return new Promise((n) => {
      this._engine.clock.removeTicker(this.orbitController), this.orbitController.dispose(), this.axisCamera && (this._engine.clock.removeTicker(this.axisCamera), this.axisCamera.Dispose()), n();
    });
  }
}
const He = (c, n) => {
  if (Object.keys(c).length === 0 && Object.keys(n).length === 0)
    return {};
  if (typeof c != "object" || typeof n != "object")
    return n;
  let t = {};
  return Object.keys(n).forEach((e) => {
    if (!Object.keys(c).includes(e)) {
      t = { ...t, [e]: n[e] };
      return;
    }
    if (Array.isArray(n[e])) {
      if (!Array.isArray(c[e])) {
        t = { ...t, [e]: n[e] };
        return;
      }
      const s = c[e], o = n[e];
      if (s.length === 0 && o.length === 0) {
        t = { ...t };
        return;
      }
      if (s.length !== o.length) {
        t = { ...t, [e]: n[e] };
        return;
      }
      const d = [];
      if (o.forEach((l, m) => {
        const f = He(
          s[m],
          o[m]
        );
        Object.keys(f).length && d.push(o[m]);
      }), Object.keys(d).length) {
        t = { ...t, [e]: d };
        return;
      }
      return;
    }
    if (typeof n[e] == "object") {
      if (typeof c[e] != "object") {
        t = { ...t, [e]: n[e] };
        return;
      }
      const s = He(
        c[e],
        n[e]
      );
      if (Object.keys(s).length) {
        t = { ...t, [e]: s };
        return;
      }
    }
    c[e] !== n[e] && (t = { ...t, [e]: n[e] });
  }), t;
};
function S(c, n) {
  const t = (c + "e").split("e");
  return +(t[0] + "e" + (+t[1] + (n || 0)));
}
function Oi(c, n = 0) {
  const t = S(c, +n);
  return S(Math.ceil(t), -n);
}
function Ai(c, n = 0) {
  const t = S(c, +n);
  return S(Math.floor(t), -n);
}
function et(c, n = 0) {
  if (c < 0) return -et(-c, n);
  const t = S(c, +n);
  return S(Math.round(t), -n);
}
function xi(c, n, t) {
  return Math.atan2(
    c.clone().cross(n).dot(t),
    n.clone().dot(c)
  );
}
function Ti(c, n = 0) {
  const t = S(c, +n);
  return S(Math.round(t), -n).toFixed(n);
}
function Pi(c, n = 0) {
  const t = S(c, +n);
  return S(Math.trunc(t), -n);
}
function Mi(c) {
  return (L.radToDeg(c) + 360) % 360;
}
function Li(c) {
  return L.degToRad(c);
}
const Gi = {
  ceilExp: Oi,
  floorExp: Ai,
  roundExp: et,
  toFixedExp: Ti,
  truncateExp: Pi,
  signedAngleTo: xi,
  radToDeg: Mi,
  degToRad: Li
};
export {
  Gs as ARCompatibilityError,
  Hs as ARSystem,
  Wi as AddObjectAction,
  Ks as AssetConverter,
  Xs as AssetExporter,
  Ls as AssetLoader,
  Ki as ComputeEncompassingViewAction,
  Qe as DIVE,
  Di as DIVEDefaultSettings,
  Gi as DIVEMath,
  Zi as DeleteObjectAction,
  Xi as DeselectObjectAction,
  qi as DropItAction,
  Ns as ESystem,
  Fs as EWebXRUnsupportedReason,
  Ji as ExportSceneAction,
  Cs as FILE_TYPES,
  Vs as FileTypeError,
  $i as GenerateMediaAction,
  Qi as GetAllObjectsAction,
  es as GetAllSceneDataAction,
  ts as GetCameraTransformAction,
  is as GetObjectsAction,
  ss as LaunchARAction,
  Ps as MediaCreator,
  ns as ModelLoadedAction,
  os as MoveCameraAction,
  Is as NetworkError,
  Bs as ParseError,
  rs as PlaceOnFloorAction,
  Rs as SUPPORTED_FILE_TYPES,
  as as SelectObjectAction,
  cs as SetBackgroundAction,
  ls as SetCameraLayerAction,
  hs as SetCameraTransformAction,
  ds as SetGizmoModeAction,
  us as SetGizmoScaleLinkedAction,
  ms as SetGizmoVisibilityAction,
  ps as SetParentAction,
  fs as StartRenderAction,
  w as State,
  Us as SystemInfo,
  gs as UpdateObjectAction,
  bs as UpdateSceneAction,
  _s as UseToolAction,
  ys as ZoomCameraAction,
  li as applyMixins,
  Ui as findInterface,
  ge as findSceneRecursive,
  Es as getActionClass,
  vs as getFileTypeFromUri,
  He as getObjectDelta,
  Yi as implementsInterface,
  ws as isCOMGroup,
  Ss as isCOMLight,
  Ds as isCOMModel,
  Os as isCOMPov,
  As as isCOMPrimitive,
  ks as isFileTypeSupported,
  xs as registerAction
};
