var ie = Object.defineProperty;
var se = (S, e, i) => e in S ? ie(S, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : S[e] = i;
var z = (S, e, i) => se(S, typeof e != "symbol" ? e + "" : e, i);
import { Ray as ne, Plane as oe, MathUtils as ae, EventDispatcher as re, Vector3 as b, MOUSE as H, TOUCH as F, Spherical as St, Quaternion as ht, Vector2 as D, Object3D as he, Box3 as Rt, Box3Helper as ce, Sphere as le, SphereGeometry as ue, Mesh as pe, MeshBasicMaterial as me } from "three";
import { c as Nt, M as nt } from "./MathUtils-CFGjHuVF.mjs";
import { P as de } from "./VisibilityLayerMask-CXgt1fJc.mjs";
const At = { type: "change" }, ot = { type: "start" }, jt = { type: "end" }, G = new ne(), kt = new oe(), ye = Math.cos(70 * ae.DEG2RAD);
class xe extends re {
  constructor(e, i) {
    super(), this.object = e, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new b(), this.cursor = new b(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: H.ROTATE, MIDDLE: H.DOLLY, RIGHT: H.PAN }, this.touches = { ONE: F.ROTATE, TWO: F.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", st), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", st), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(At), t.update(), n = o.NONE;
    }, this.update = function() {
      const s = new b(), l = new ht().setFromUnitVectors(e.up, new b(0, 1, 0)), x = l.clone().invert(), _ = new b(), w = new ht(), L = new b(), T = 2 * Math.PI;
      return function(ee = null) {
        const Dt = t.object.position;
        s.copy(Dt).sub(t.target), s.applyQuaternion(l), r.setFromVector3(s), t.autoRotate && n === o.NONE && B(It(ee)), t.enableDamping ? (r.theta += p.theta * t.dampingFactor, r.phi += p.phi * t.dampingFactor) : (r.theta += p.theta, r.phi += p.phi);
        let j = t.minAzimuthAngle, k = t.maxAzimuthAngle;
        isFinite(j) && isFinite(k) && (j < -Math.PI ? j += T : j > Math.PI && (j -= T), k < -Math.PI ? k += T : k > Math.PI && (k -= T), j <= k ? r.theta = Math.max(j, Math.min(k, r.theta)) : r.theta = r.theta > (j + k) / 2 ? Math.max(j, r.theta) : Math.min(k, r.theta)), r.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, r.phi)), r.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(c, t.dampingFactor) : t.target.add(c), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let X = !1;
        if (t.zoomToCursor && N || t.object.isOrthographicCamera)
          r.radius = et(r.radius);
        else {
          const O = r.radius;
          r.radius = et(r.radius * a), X = O != r.radius;
        }
        if (s.setFromSpherical(r), s.applyQuaternion(x), Dt.copy(t.target).add(s), t.object.lookAt(t.target), t.enableDamping === !0 ? (p.theta *= 1 - t.dampingFactor, p.phi *= 1 - t.dampingFactor, c.multiplyScalar(1 - t.dampingFactor)) : (p.set(0, 0, 0), c.set(0, 0, 0)), t.zoomToCursor && N) {
          let O = null;
          if (t.object.isPerspectiveCamera) {
            const K = s.length();
            O = et(K * a);
            const Q = K - O;
            t.object.position.addScaledVector(R, Q), t.object.updateMatrixWorld(), X = !!Q;
          } else if (t.object.isOrthographicCamera) {
            const K = new b(f.x, f.y, 0);
            K.unproject(t.object);
            const Q = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / a)), t.object.updateProjectionMatrix(), X = Q !== t.object.zoom;
            const Ct = new b(f.x, f.y, 0);
            Ct.unproject(t.object), t.object.position.sub(Ct).add(K), t.object.updateMatrixWorld(), O = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          O !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(O).add(t.object.position) : (G.origin.copy(t.object.position), G.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(G.direction)) < ye ? e.lookAt(t.target) : (kt.setFromNormalAndCoplanarPoint(t.object.up, t.target), G.intersectPlane(kt, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const O = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / a)), O !== t.object.zoom && (t.object.updateProjectionMatrix(), X = !0);
        }
        return a = 1, N = !1, X || _.distanceToSquared(t.object.position) > d || 8 * (1 - w.dot(t.object.quaternion)) > d || L.distanceToSquared(t.target) > d ? (t.dispatchEvent(At), _.copy(t.object.position), w.copy(t.object.quaternion), L.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Tt), t.domElement.removeEventListener("pointerdown", zt), t.domElement.removeEventListener("pointercancel", U), t.domElement.removeEventListener("wheel", bt), t.domElement.removeEventListener("pointermove", it), t.domElement.removeEventListener("pointerup", U), t.domElement.getRootNode().removeEventListener("keydown", Mt, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", st), t._domElementKeyEvents = null);
    };
    const t = this, o = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let n = o.NONE;
    const d = 1e-6, r = new St(), p = new St();
    let a = 1;
    const c = new b(), u = new D(), m = new D(), h = new D(), y = new D(), E = new D(), M = new D(), P = new D(), A = new D(), C = new D(), R = new b(), f = new D();
    let N = !1;
    const g = [], Z = {};
    let $ = !1;
    function It(s) {
      return s !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function q(s) {
      const l = Math.abs(s * 0.01);
      return Math.pow(0.95, t.zoomSpeed * l);
    }
    function B(s) {
      p.theta -= s;
    }
    function W(s) {
      p.phi -= s;
    }
    const ct = function() {
      const s = new b();
      return function(x, _) {
        s.setFromMatrixColumn(_, 0), s.multiplyScalar(-x), c.add(s);
      };
    }(), lt = function() {
      const s = new b();
      return function(x, _) {
        t.screenSpacePanning === !0 ? s.setFromMatrixColumn(_, 1) : (s.setFromMatrixColumn(_, 0), s.crossVectors(t.object.up, s)), s.multiplyScalar(x), c.add(s);
      };
    }(), I = function() {
      const s = new b();
      return function(x, _) {
        const w = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const L = t.object.position;
          s.copy(L).sub(t.target);
          let T = s.length();
          T *= Math.tan(t.object.fov / 2 * Math.PI / 180), ct(2 * x * T / w.clientHeight, t.object.matrix), lt(2 * _ * T / w.clientHeight, t.object.matrix);
        } else t.object.isOrthographicCamera ? (ct(x * (t.object.right - t.object.left) / t.object.zoom / w.clientWidth, t.object.matrix), lt(_ * (t.object.top - t.object.bottom) / t.object.zoom / w.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function v(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? a /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function ut(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? a *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function tt(s, l) {
      if (!t.zoomToCursor)
        return;
      N = !0;
      const x = t.domElement.getBoundingClientRect(), _ = s - x.left, w = l - x.top, L = x.width, T = x.height;
      f.x = _ / L * 2 - 1, f.y = -(w / T) * 2 + 1, R.set(f.x, f.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function et(s) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, s));
    }
    function pt(s) {
      u.set(s.clientX, s.clientY);
    }
    function Yt(s) {
      tt(s.clientX, s.clientX), P.set(s.clientX, s.clientY);
    }
    function mt(s) {
      y.set(s.clientX, s.clientY);
    }
    function Ht(s) {
      m.set(s.clientX, s.clientY), h.subVectors(m, u).multiplyScalar(t.rotateSpeed);
      const l = t.domElement;
      B(2 * Math.PI * h.x / l.clientHeight), W(2 * Math.PI * h.y / l.clientHeight), u.copy(m), t.update();
    }
    function Ft(s) {
      A.set(s.clientX, s.clientY), C.subVectors(A, P), C.y > 0 ? v(q(C.y)) : C.y < 0 && ut(q(C.y)), P.copy(A), t.update();
    }
    function Zt(s) {
      E.set(s.clientX, s.clientY), M.subVectors(E, y).multiplyScalar(t.panSpeed), I(M.x, M.y), y.copy(E), t.update();
    }
    function Bt(s) {
      tt(s.clientX, s.clientY), s.deltaY < 0 ? ut(q(s.deltaY)) : s.deltaY > 0 && v(q(s.deltaY)), t.update();
    }
    function Ut(s) {
      let l = !1;
      switch (s.code) {
        case t.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? W(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : I(0, t.keyPanSpeed), l = !0;
          break;
        case t.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? W(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : I(0, -t.keyPanSpeed), l = !0;
          break;
        case t.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? B(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : I(t.keyPanSpeed, 0), l = !0;
          break;
        case t.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? B(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : I(-t.keyPanSpeed, 0), l = !0;
          break;
      }
      l && (s.preventDefault(), t.update());
    }
    function dt(s) {
      if (g.length === 1)
        u.set(s.pageX, s.pageY);
      else {
        const l = Y(s), x = 0.5 * (s.pageX + l.x), _ = 0.5 * (s.pageY + l.y);
        u.set(x, _);
      }
    }
    function yt(s) {
      if (g.length === 1)
        y.set(s.pageX, s.pageY);
      else {
        const l = Y(s), x = 0.5 * (s.pageX + l.x), _ = 0.5 * (s.pageY + l.y);
        y.set(x, _);
      }
    }
    function xt(s) {
      const l = Y(s), x = s.pageX - l.x, _ = s.pageY - l.y, w = Math.sqrt(x * x + _ * _);
      P.set(0, w);
    }
    function Xt(s) {
      t.enableZoom && xt(s), t.enablePan && yt(s);
    }
    function Kt(s) {
      t.enableZoom && xt(s), t.enableRotate && dt(s);
    }
    function _t(s) {
      if (g.length == 1)
        m.set(s.pageX, s.pageY);
      else {
        const x = Y(s), _ = 0.5 * (s.pageX + x.x), w = 0.5 * (s.pageY + x.y);
        m.set(_, w);
      }
      h.subVectors(m, u).multiplyScalar(t.rotateSpeed);
      const l = t.domElement;
      B(2 * Math.PI * h.x / l.clientHeight), W(2 * Math.PI * h.y / l.clientHeight), u.copy(m);
    }
    function ft(s) {
      if (g.length === 1)
        E.set(s.pageX, s.pageY);
      else {
        const l = Y(s), x = 0.5 * (s.pageX + l.x), _ = 0.5 * (s.pageY + l.y);
        E.set(x, _);
      }
      M.subVectors(E, y).multiplyScalar(t.panSpeed), I(M.x, M.y), y.copy(E);
    }
    function gt(s) {
      const l = Y(s), x = s.pageX - l.x, _ = s.pageY - l.y, w = Math.sqrt(x * x + _ * _);
      A.set(0, w), C.set(0, Math.pow(A.y / P.y, t.zoomSpeed)), v(C.y), P.copy(A);
      const L = (s.pageX + l.x) * 0.5, T = (s.pageY + l.y) * 0.5;
      tt(L, T);
    }
    function Vt(s) {
      t.enableZoom && gt(s), t.enablePan && ft(s);
    }
    function qt(s) {
      t.enableZoom && gt(s), t.enableRotate && _t(s);
    }
    function zt(s) {
      t.enabled !== !1 && (g.length === 0 && (t.domElement.setPointerCapture(s.pointerId), t.domElement.addEventListener("pointermove", it), t.domElement.addEventListener("pointerup", U)), !te(s) && ($t(s), s.pointerType === "touch" ? Et(s) : Wt(s)));
    }
    function it(s) {
      t.enabled !== !1 && (s.pointerType === "touch" ? Jt(s) : Qt(s));
    }
    function U(s) {
      switch (vt(s), g.length) {
        case 0:
          t.domElement.releasePointerCapture(s.pointerId), t.domElement.removeEventListener("pointermove", it), t.domElement.removeEventListener("pointerup", U), t.dispatchEvent(jt), n = o.NONE;
          break;
        case 1:
          const l = g[0], x = Z[l];
          Et({ pointerId: l, pageX: x.x, pageY: x.y });
          break;
      }
    }
    function Wt(s) {
      let l;
      switch (s.button) {
        case 0:
          l = t.mouseButtons.LEFT;
          break;
        case 1:
          l = t.mouseButtons.MIDDLE;
          break;
        case 2:
          l = t.mouseButtons.RIGHT;
          break;
        default:
          l = -1;
      }
      switch (l) {
        case H.DOLLY:
          if (t.enableZoom === !1) return;
          Yt(s), n = o.DOLLY;
          break;
        case H.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enablePan === !1) return;
            mt(s), n = o.PAN;
          } else {
            if (t.enableRotate === !1) return;
            pt(s), n = o.ROTATE;
          }
          break;
        case H.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enableRotate === !1) return;
            pt(s), n = o.ROTATE;
          } else {
            if (t.enablePan === !1) return;
            mt(s), n = o.PAN;
          }
          break;
        default:
          n = o.NONE;
      }
      n !== o.NONE && t.dispatchEvent(ot);
    }
    function Qt(s) {
      switch (n) {
        case o.ROTATE:
          if (t.enableRotate === !1) return;
          Ht(s);
          break;
        case o.DOLLY:
          if (t.enableZoom === !1) return;
          Ft(s);
          break;
        case o.PAN:
          if (t.enablePan === !1) return;
          Zt(s);
          break;
      }
    }
    function bt(s) {
      t.enabled === !1 || t.enableZoom === !1 || n !== o.NONE || (s.preventDefault(), t.dispatchEvent(ot), Bt(Gt(s)), t.dispatchEvent(jt));
    }
    function Gt(s) {
      const l = s.deltaMode, x = {
        clientX: s.clientX,
        clientY: s.clientY,
        deltaY: s.deltaY
      };
      switch (l) {
        case 1:
          x.deltaY *= 16;
          break;
        case 2:
          x.deltaY *= 100;
          break;
      }
      return s.ctrlKey && !$ && (x.deltaY *= 10), x;
    }
    function Mt(s) {
      s.key === "Control" && ($ = !0, t.domElement.getRootNode().addEventListener("keyup", wt, { passive: !0, capture: !0 }));
    }
    function wt(s) {
      s.key === "Control" && ($ = !1, t.domElement.getRootNode().removeEventListener("keyup", wt, { passive: !0, capture: !0 }));
    }
    function st(s) {
      t.enabled === !1 || t.enablePan === !1 || Ut(s);
    }
    function Et(s) {
      switch (Pt(s), g.length) {
        case 1:
          switch (t.touches.ONE) {
            case F.ROTATE:
              if (t.enableRotate === !1) return;
              dt(s), n = o.TOUCH_ROTATE;
              break;
            case F.PAN:
              if (t.enablePan === !1) return;
              yt(s), n = o.TOUCH_PAN;
              break;
            default:
              n = o.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case F.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1) return;
              Xt(s), n = o.TOUCH_DOLLY_PAN;
              break;
            case F.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1) return;
              Kt(s), n = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              n = o.NONE;
          }
          break;
        default:
          n = o.NONE;
      }
      n !== o.NONE && t.dispatchEvent(ot);
    }
    function Jt(s) {
      switch (Pt(s), n) {
        case o.TOUCH_ROTATE:
          if (t.enableRotate === !1) return;
          _t(s), t.update();
          break;
        case o.TOUCH_PAN:
          if (t.enablePan === !1) return;
          ft(s), t.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1) return;
          Vt(s), t.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1) return;
          qt(s), t.update();
          break;
        default:
          n = o.NONE;
      }
    }
    function Tt(s) {
      t.enabled !== !1 && s.preventDefault();
    }
    function $t(s) {
      g.push(s.pointerId);
    }
    function vt(s) {
      delete Z[s.pointerId];
      for (let l = 0; l < g.length; l++)
        if (g[l] == s.pointerId) {
          g.splice(l, 1);
          return;
        }
    }
    function te(s) {
      for (let l = 0; l < g.length; l++)
        if (g[l] == s.pointerId) return !0;
      return !1;
    }
    function Pt(s) {
      let l = Z[s.pointerId];
      l === void 0 && (l = new D(), Z[s.pointerId] = l), l.set(s.pageX, s.pageY);
    }
    function Y(s) {
      const l = s.pointerId === g[0] ? g[1] : g[0];
      return Z[l];
    }
    t.domElement.addEventListener("contextmenu", Tt), t.domElement.addEventListener("pointerdown", zt), t.domElement.addEventListener("pointercancel", U), t.domElement.addEventListener("wheel", bt, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", Mt, { passive: !0, capture: !0 }), this.update();
  }
}
class _e {
  constructor(e = 0, i = 0, t = 0, o = 1) {
    this.isQuaternion = !0, this._x = e, this._y = i, this._z = t, this._w = o;
  }
  static slerpFlat(e, i, t, o, n, d, r) {
    let p = t[o + 0], a = t[o + 1], c = t[o + 2], u = t[o + 3];
    const m = n[d + 0], h = n[d + 1], y = n[d + 2], E = n[d + 3];
    if (r === 0) {
      e[i + 0] = p, e[i + 1] = a, e[i + 2] = c, e[i + 3] = u;
      return;
    }
    if (r === 1) {
      e[i + 0] = m, e[i + 1] = h, e[i + 2] = y, e[i + 3] = E;
      return;
    }
    if (u !== E || p !== m || a !== h || c !== y) {
      let M = 1 - r;
      const P = p * m + a * h + c * y + u * E, A = P >= 0 ? 1 : -1, C = 1 - P * P;
      if (C > Number.EPSILON) {
        const f = Math.sqrt(C), N = Math.atan2(f, P * A);
        M = Math.sin(M * N) / f, r = Math.sin(r * N) / f;
      }
      const R = r * A;
      if (p = p * M + m * R, a = a * M + h * R, c = c * M + y * R, u = u * M + E * R, M === 1 - r) {
        const f = 1 / Math.sqrt(p * p + a * a + c * c + u * u);
        p *= f, a *= f, c *= f, u *= f;
      }
    }
    e[i] = p, e[i + 1] = a, e[i + 2] = c, e[i + 3] = u;
  }
  static multiplyQuaternionsFlat(e, i, t, o, n, d) {
    const r = t[o], p = t[o + 1], a = t[o + 2], c = t[o + 3], u = n[d], m = n[d + 1], h = n[d + 2], y = n[d + 3];
    return e[i] = r * y + c * u + p * h - a * m, e[i + 1] = p * y + c * m + a * u - r * h, e[i + 2] = a * y + c * h + r * m - p * u, e[i + 3] = c * y - r * u - p * m - a * h, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, i, t, o) {
    return this._x = e, this._y = i, this._z = t, this._w = o, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, i = !0) {
    const t = e._x, o = e._y, n = e._z, d = e._order, r = Math.cos, p = Math.sin, a = r(t / 2), c = r(o / 2), u = r(n / 2), m = p(t / 2), h = p(o / 2), y = p(n / 2);
    switch (d) {
      case "XYZ":
        this._x = m * c * u + a * h * y, this._y = a * h * u - m * c * y, this._z = a * c * y + m * h * u, this._w = a * c * u - m * h * y;
        break;
      case "YXZ":
        this._x = m * c * u + a * h * y, this._y = a * h * u - m * c * y, this._z = a * c * y - m * h * u, this._w = a * c * u + m * h * y;
        break;
      case "ZXY":
        this._x = m * c * u - a * h * y, this._y = a * h * u + m * c * y, this._z = a * c * y + m * h * u, this._w = a * c * u - m * h * y;
        break;
      case "ZYX":
        this._x = m * c * u - a * h * y, this._y = a * h * u + m * c * y, this._z = a * c * y - m * h * u, this._w = a * c * u + m * h * y;
        break;
      case "YZX":
        this._x = m * c * u + a * h * y, this._y = a * h * u + m * c * y, this._z = a * c * y - m * h * u, this._w = a * c * u - m * h * y;
        break;
      case "XZY":
        this._x = m * c * u - a * h * y, this._y = a * h * u - m * c * y, this._z = a * c * y + m * h * u, this._w = a * c * u + m * h * y;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + d);
    }
    return i === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, i) {
    const t = i / 2, o = Math.sin(t);
    return this._x = e.x * o, this._y = e.y * o, this._z = e.z * o, this._w = Math.cos(t), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const i = e.elements, t = i[0], o = i[4], n = i[8], d = i[1], r = i[5], p = i[9], a = i[2], c = i[6], u = i[10], m = t + r + u;
    if (m > 0) {
      const h = 0.5 / Math.sqrt(m + 1);
      this._w = 0.25 / h, this._x = (c - p) * h, this._y = (n - a) * h, this._z = (d - o) * h;
    } else if (t > r && t > u) {
      const h = 2 * Math.sqrt(1 + t - r - u);
      this._w = (c - p) / h, this._x = 0.25 * h, this._y = (o + d) / h, this._z = (n + a) / h;
    } else if (r > u) {
      const h = 2 * Math.sqrt(1 + r - t - u);
      this._w = (n - a) / h, this._x = (o + d) / h, this._y = 0.25 * h, this._z = (p + c) / h;
    } else {
      const h = 2 * Math.sqrt(1 + u - t - r);
      this._w = (d - o) / h, this._x = (n + a) / h, this._y = (p + c) / h, this._z = 0.25 * h;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, i) {
    let t = e.dot(i) + 1;
    return t < Number.EPSILON ? (t = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = t) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = t)) : (this._x = e.y * i.z - e.z * i.y, this._y = e.z * i.x - e.x * i.z, this._z = e.x * i.y - e.y * i.x, this._w = t), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Nt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, i) {
    const t = this.angleTo(e);
    if (t === 0) return this;
    const o = Math.min(1, i / t);
    return this.slerp(e, o), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, i) {
    const t = e._x, o = e._y, n = e._z, d = e._w, r = i._x, p = i._y, a = i._z, c = i._w;
    return this._x = t * c + d * r + o * a - n * p, this._y = o * c + d * p + n * r - t * a, this._z = n * c + d * a + t * p - o * r, this._w = d * c - t * r - o * p - n * a, this._onChangeCallback(), this;
  }
  slerp(e, i) {
    if (i === 0) return this;
    if (i === 1) return this.copy(e);
    const t = this._x, o = this._y, n = this._z, d = this._w;
    let r = d * e._w + t * e._x + o * e._y + n * e._z;
    if (r < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, r = -r) : this.copy(e), r >= 1)
      return this._w = d, this._x = t, this._y = o, this._z = n, this;
    const p = 1 - r * r;
    if (p <= Number.EPSILON) {
      const h = 1 - i;
      return this._w = h * d + i * this._w, this._x = h * t + i * this._x, this._y = h * o + i * this._y, this._z = h * n + i * this._z, this.normalize(), this;
    }
    const a = Math.sqrt(p), c = Math.atan2(a, r), u = Math.sin((1 - i) * c) / a, m = Math.sin(i * c) / a;
    return this._w = d * u + this._w * m, this._x = t * u + this._x * m, this._y = o * u + this._y * m, this._z = n * u + this._z * m, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, i, t) {
    return this.copy(e).slerp(i, t);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), i = 2 * Math.PI * Math.random(), t = Math.random(), o = Math.sqrt(1 - t), n = Math.sqrt(t);
    return this.set(
      o * Math.sin(e),
      o * Math.cos(e),
      n * Math.sin(i),
      n * Math.cos(i)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, i = 0) {
    return this._x = e[i], this._y = e[i + 1], this._z = e[i + 2], this._w = e[i + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], i = 0) {
    return e[i] = this._x, e[i + 1] = this._y, e[i + 2] = this._z, e[i + 3] = this._w, e;
  }
  fromBufferAttribute(e, i) {
    return this._x = e.getX(i), this._y = e.getY(i), this._z = e.getZ(i), this._w = e.getW(i), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class J {
  constructor(e = 0, i = 0, t = 0) {
    J.prototype.isVector3 = !0, this.x = e, this.y = i, this.z = t;
  }
  set(e, i, t) {
    return t === void 0 && (t = this.z), this.x = e, this.y = i, this.z = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, i) {
    switch (e) {
      case 0:
        this.x = i;
        break;
      case 1:
        this.y = i;
        break;
      case 2:
        this.z = i;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, i) {
    return this.x = e.x + i.x, this.y = e.y + i.y, this.z = e.z + i.z, this;
  }
  addScaledVector(e, i) {
    return this.x += e.x * i, this.y += e.y * i, this.z += e.z * i, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, i) {
    return this.x = e.x - i.x, this.y = e.y - i.y, this.z = e.z - i.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, i) {
    return this.x = e.x * i.x, this.y = e.y * i.y, this.z = e.z * i.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(Ot.setFromEuler(e));
  }
  applyAxisAngle(e, i) {
    return this.applyQuaternion(Ot.setFromAxisAngle(e, i));
  }
  applyMatrix3(e) {
    const i = this.x, t = this.y, o = this.z, n = e.elements;
    return this.x = n[0] * i + n[3] * t + n[6] * o, this.y = n[1] * i + n[4] * t + n[7] * o, this.z = n[2] * i + n[5] * t + n[8] * o, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const i = this.x, t = this.y, o = this.z, n = e.elements, d = 1 / (n[3] * i + n[7] * t + n[11] * o + n[15]);
    return this.x = (n[0] * i + n[4] * t + n[8] * o + n[12]) * d, this.y = (n[1] * i + n[5] * t + n[9] * o + n[13]) * d, this.z = (n[2] * i + n[6] * t + n[10] * o + n[14]) * d, this;
  }
  applyQuaternion(e) {
    const i = this.x, t = this.y, o = this.z, n = e.x, d = e.y, r = e.z, p = e.w, a = 2 * (d * o - r * t), c = 2 * (r * i - n * o), u = 2 * (n * t - d * i);
    return this.x = i + p * a + d * u - r * c, this.y = t + p * c + r * a - n * u, this.z = o + p * u + n * c - d * a, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const i = this.x, t = this.y, o = this.z, n = e.elements;
    return this.x = n[0] * i + n[4] * t + n[8] * o, this.y = n[1] * i + n[5] * t + n[9] * o, this.z = n[2] * i + n[6] * t + n[10] * o, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, i) {
    return this.x = Math.max(e.x, Math.min(i.x, this.x)), this.y = Math.max(e.y, Math.min(i.y, this.y)), this.z = Math.max(e.z, Math.min(i.z, this.z)), this;
  }
  clampScalar(e, i) {
    return this.x = Math.max(e, Math.min(i, this.x)), this.y = Math.max(e, Math.min(i, this.y)), this.z = Math.max(e, Math.min(i, this.z)), this;
  }
  clampLength(e, i) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(Math.max(e, Math.min(i, t)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, i) {
    return this.x += (e.x - this.x) * i, this.y += (e.y - this.y) * i, this.z += (e.z - this.z) * i, this;
  }
  lerpVectors(e, i, t) {
    return this.x = e.x + (i.x - e.x) * t, this.y = e.y + (i.y - e.y) * t, this.z = e.z + (i.z - e.z) * t, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, i) {
    const t = e.x, o = e.y, n = e.z, d = i.x, r = i.y, p = i.z;
    return this.x = o * p - n * r, this.y = n * d - t * p, this.z = t * r - o * d, this;
  }
  projectOnVector(e) {
    const i = e.lengthSq();
    if (i === 0) return this.set(0, 0, 0);
    const t = e.dot(this) / i;
    return this.copy(e).multiplyScalar(t);
  }
  projectOnPlane(e) {
    return at.copy(this).projectOnVector(e), this.sub(at);
  }
  reflect(e) {
    return this.sub(at.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const i = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (i === 0) return Math.PI / 2;
    const t = this.dot(e) / i;
    return Math.acos(Nt(t, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const i = this.x - e.x, t = this.y - e.y, o = this.z - e.z;
    return i * i + t * t + o * o;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, i, t) {
    const o = Math.sin(i) * e;
    return this.x = o * Math.sin(t), this.y = Math.cos(i) * e, this.z = o * Math.cos(t), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, i, t) {
    return this.x = e * Math.sin(i), this.y = t, this.z = e * Math.cos(i), this;
  }
  setFromMatrixPosition(e) {
    const i = e.elements;
    return this.x = i[12], this.y = i[13], this.z = i[14], this;
  }
  setFromMatrixScale(e) {
    const i = this.setFromMatrixColumn(e, 0).length(), t = this.setFromMatrixColumn(e, 1).length(), o = this.setFromMatrixColumn(e, 2).length();
    return this.x = i, this.y = t, this.z = o, this;
  }
  setFromMatrixColumn(e, i) {
    return this.fromArray(e.elements, i * 4);
  }
  setFromMatrix3Column(e, i) {
    return this.fromArray(e.elements, i * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, i = 0) {
    return this.x = e[i], this.y = e[i + 1], this.z = e[i + 2], this;
  }
  toArray(e = [], i = 0) {
    return e[i] = this.x, e[i + 1] = this.y, e[i + 2] = this.z, e;
  }
  fromBufferAttribute(e, i) {
    return this.x = e.getX(i), this.y = e.getY(i), this.z = e.getZ(i), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, i = Math.random() * 2 - 1, t = Math.sqrt(1 - i * i);
    return this.x = t * Math.cos(e), this.y = i, this.z = t * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const at = /* @__PURE__ */ new J(), Ot = /* @__PURE__ */ new _e();
class fe extends he {
  constructor() {
    super();
    z(this, "isSelectable", !0);
    z(this, "isMovable", !0);
    z(this, "isDIVENode", !0);
    z(this, "gizmo", null);
    z(this, "_positionWorldBuffer");
    z(this, "_boundingBox");
    this.layers.mask = de, this._positionWorldBuffer = new b(), this._boundingBox = new Rt();
  }
  setPosition(i) {
    if (!this.parent) {
      this.position.set(i.x, i.y, i.z);
      return;
    }
    const t = new b(i.x, i.y, i.z);
    this.position.copy(this.parent.worldToLocal(t)), "isDIVEGroup" in this.parent && this.parent.updateLineTo(this);
  }
  setRotation(i) {
    this.rotation.set(i.x, i.y, i.z);
  }
  setScale(i) {
    this.scale.set(i.x, i.y, i.z);
  }
  setVisibility(i) {
    this.visible = i;
  }
  setToWorldOrigin() {
    this.position.set(0, 0, 0), import("../plugins/state/index.mjs").then(({ State: i }) => {
      var t;
      (t = i.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
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
    import("../plugins/state/index.mjs").then(({ State: i }) => {
      var t;
      (t = i.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      });
    });
  }
  onSelect() {
    import("../plugins/state/index.mjs").then(({ State: i }) => {
      var t;
      (t = i.get(this.userData.id)) == null || t.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    import("../plugins/state/index.mjs").then(({ State: i }) => {
      var t;
      (t = i.get(this.userData.id)) == null || t.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class ge extends fe {
  /**
   * Creates a new BoundingBox instance for the specified 3D object.
   *
   * The constructor computes both a bounding box and bounding sphere for the given object.
   * It handles complex objects with multiple meshes and nested transformations.
   *
   * @param object - The 3D object to compute bounding volumes for
   * @param axisAligned - Whether to create an axis-aligned bounding box (true) or oriented bounding box (false). Defaults to false.
   * @param wireframeColor - The color for the wireframe helpers. Can be a hex number or ColorRepresentation. Defaults to green (0x00ff00).
   *
   * @example
   * ```typescript
   * // Create an oriented bounding box (aligned with object's rotation)
   * const obb = new BoundingBox(mesh, false, 0x00ff00);
   *
   * // Create an axis-aligned bounding box (aligned with world coordinates)
   * const aabb = new BoundingBox(mesh, true, 0xff0000);
   *
   * // Use default green color
   * const defaultBox = new BoundingBox(mesh);
   * ```
   */
  constructor(i, t = !1, o = 65280) {
    super();
    /** The computed bounding box (Box3) */
    z(this, "_box");
    /** The computed bounding sphere (Sphere) */
    z(this, "_sphere");
    /** The center point of the bounding box */
    z(this, "_center");
    /** The radius of the bounding sphere */
    z(this, "_radius");
    /** Visual helper for the bounding box wireframe */
    z(this, "_boxHelper");
    /** Visual helper for the bounding sphere wireframe */
    z(this, "_sphereHelper");
    /** The dimensions (width, height, depth) of the bounding box */
    z(this, "_size");
    const n = new Rt();
    t ? n.setFromObject(i) : (i.updateWorldMatrix(!0, !0), i.traverse((r) => {
      if (r.isMesh) {
        const p = r, a = p.geometry.clone();
        a.applyMatrix4(p.matrixWorld);
        const c = p.getWorldQuaternion(new ht()).invert();
        a.applyQuaternion(c), a.computeBoundingBox(), a.boundingBox && n.union(a.boundingBox);
      }
    })), this.rotation.copy(i.rotation), this._box = n, this._size = n.getSize(new b()), this._center = n.getCenter(new b()), this._boxHelper = new ce(this._box, o), this._boxHelper.visible = !1, this.add(this._boxHelper), this._sphere = n.getBoundingSphere(new le()), this._radius = this._sphere.radius;
    const d = new ue(this._radius, 32, 32);
    d.translate(this._center.x, this._center.y, this._center.z), this._sphereHelper = new pe(
      d,
      new me({ color: o, wireframe: !0 })
    ), this._sphereHelper.visible = !1, this.add(this._sphereHelper);
  }
  /**
   * Gets the computed bounding box.
   * @returns The Box3 instance representing the bounding box
   */
  get box() {
    return this._box;
  }
  /**
   * Gets the computed bounding sphere.
   * @returns The Sphere instance representing the bounding sphere
   */
  get sphere() {
    return this._sphere;
  }
  /**
   * Gets the center point of the bounding box.
   * @returns A Vector3 representing the center coordinates
   */
  get center() {
    return this._center;
  }
  /**
   * Gets the radius of the bounding sphere.
   * @returns The radius as a number
   */
  get radius() {
    return this._radius;
  }
  /**
   * Gets the dimensions of the bounding box.
   * @returns A Vector3 representing width, height, and depth
   */
  get size() {
    return this._size;
  }
  /**
   * Sets the visibility of the bounding box wireframe helper.
   *
   * @param visible - Whether the box helper should be visible
   *
   * @example
   * ```typescript
   * const boundingBox = new BoundingBox(mesh);
   *
   * // Show the bounding box wireframe
   * boundingBox.setBoxHelperVisible(true);
   *
   * // Hide the bounding box wireframe
   * boundingBox.setBoxHelperVisible(false);
   * ```
   */
  setBoxHelperVisible(i) {
    this._boxHelper.visible = i;
  }
  /**
   * Sets the visibility of the bounding sphere wireframe helper.
   *
   * @param visible - Whether the sphere helper should be visible
   *
   * @example
   * ```typescript
   * const boundingBox = new BoundingBox(mesh);
   *
   * // Show the bounding sphere wireframe
   * boundingBox.setSphereHelperVisible(true);
   *
   * // Hide the bounding sphere wireframe
   * boundingBox.setSphereHelperVisible(false);
   * ```
   */
  setSphereHelperVisible(i) {
    this._sphereHelper.visible = i;
  }
}
const rt = {
  enableDamping: !0,
  dampingFactor: 0.05
}, V = class V extends xe {
  constructor(i, t, o = rt) {
    super(i, t);
    z(this, "uuid", nt.generateUUID());
    z(this, "object");
    this.domElement = t, this.domElement = t, this.object = i, this.enableDamping = o.enableDamping ?? rt.enableDamping, this.dampingFactor = o.dampingFactor ?? rt.dampingFactor, this.object.position.set(0, 2, 2), this.target.copy({ x: 0, y: 0.5, z: 0 }), this.update();
  }
  tick() {
    this.enabled && this.update();
  }
  /**
   * Computes the camera position and target to perfectly fit a bounding sphere into the camera's frustum.
   * This robust approach ensures the entire object is always visible, regardless of rotation or aspect ratio.
   *
   * @param bb - The bounding box to encompass
   * @param padding - Optional padding factor to add space around the object depending on the object's bounding sphere diameter (default: 0.0 = no padding)
   * @returns Object containing the calculated camera position and target
   */
  computeEncompassingView(i, t = 0) {
    const o = i.center, d = i.sphere.radius, r = this.object.fov * Math.PI / 180, p = this.object.aspect, a = r / 2, c = Math.atan(Math.tan(a) * p), u = d / Math.sin(a), m = d / Math.sin(c), h = Math.max(u, m) * (1 + t), y = this.object.position.clone().sub(this.target).normalize(), E = y.length() > 1e-3 ? y : new J(0, 0, 1);
    return {
      position: o.clone().add(E.multiplyScalar(h)),
      target: o
    };
  }
  /**
   * Focus the camera on a specific object by computing its bounding box
   * @param object - The object to focus on
   * @param padding - Optional padding factor to add space around the object depending on the object's bounding sphere diameter (default: 0.0 = no padding)
   */
  focusOnObject(i, t = 0) {
    const o = new ge(i, !1, 65280), n = this.computeEncompassingView(o, t);
    this.object.position.copy(n.position), this.target.copy(n.target), this.update();
  }
  zoomIn(i) {
    const t = i || V.DEFAULT_ZOOM_FACTOR, { minDistance: o, maxDistance: n } = this;
    this.minDistance = this.maxDistance = nt.clamp(
      this.getDistance() - t,
      o + t,
      n - t
    ), this.update(), this.minDistance = o, this.maxDistance = n;
  }
  zoomOut(i) {
    const t = i || V.DEFAULT_ZOOM_FACTOR, { minDistance: o, maxDistance: n } = this;
    this.minDistance = this.maxDistance = nt.clamp(
      this.getDistance() + t,
      o + t,
      n - t
    ), this.update(), this.minDistance = o, this.maxDistance = n;
  }
};
z(V, "DEFAULT_ZOOM_FACTOR", 1);
let Lt = V;
export {
  ge as B,
  fe as D,
  rt as O,
  Lt as a
};
