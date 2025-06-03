var ve = Object.defineProperty;
var Je = (A, p, l) => p in A ? ve(A, p, { enumerable: !0, configurable: !0, writable: !0, value: l }) : A[p] = l;
var G = (A, p, l) => Je(A, typeof p != "symbol" ? p + "" : p, l);
import { Ray as $e, Plane as et, MathUtils as Q, EventDispatcher as tt, Vector3 as m, MOUSE as C, TOUCH as Y, Spherical as je, Quaternion as Ae, Vector2 as h } from "three";
const xe = { type: "change" }, ne = { type: "start" }, Le = { type: "end" }, q = new $e(), Re = new et(), ot = Math.cos(70 * Q.DEG2RAD);
class nt extends tt {
  constructor(p, l) {
    super(), this.object = p, this.domElement = l, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new m(), this.cursor = new m(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: C.ROTATE, MIDDLE: C.DOLLY, RIGHT: C.PAN }, this.touches = { ONE: Y.ROTATE, TWO: Y.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(t) {
      t.addEventListener("keydown", oe), this._domElementKeyEvents = t;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", oe), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(xe), e.update(), i = n.NONE;
    }, this.update = function() {
      const t = new m(), o = new Ae().setFromUnitVectors(p.up, new m(0, 1, 0)), a = o.clone().invert(), s = new m(), u = new Ae(), T = new m(), d = 2 * Math.PI;
      return function(Qe = null) {
        const we = e.object.position;
        t.copy(we).sub(e.target), t.applyQuaternion(o), c.setFromVector3(t), e.autoRotate && i === n.NONE && _(ke(Qe)), e.enableDamping ? (c.theta += f.theta * e.dampingFactor, c.phi += f.phi * e.dampingFactor) : (c.theta += f.theta, c.phi += f.phi);
        let b = e.minAzimuthAngle, g = e.maxAzimuthAngle;
        isFinite(b) && isFinite(g) && (b < -Math.PI ? b += d : b > Math.PI && (b -= d), g < -Math.PI ? g += d : g > Math.PI && (g -= d), b <= g ? c.theta = Math.max(b, Math.min(g, c.theta)) : c.theta = c.theta > (b + g) / 2 ? Math.max(b, c.theta) : Math.min(g, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(x, e.dampingFactor) : e.target.add(x), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let K = !1;
        if (e.zoomToCursor && X || e.object.isOrthographicCamera)
          c.radius = ee(c.radius);
        else {
          const y = c.radius;
          c.radius = ee(c.radius * P), K = y != c.radius;
        }
        if (t.setFromSpherical(c), t.applyQuaternion(a), we.copy(e.target).add(t), e.object.lookAt(e.target), e.enableDamping === !0 ? (f.theta *= 1 - e.dampingFactor, f.phi *= 1 - e.dampingFactor, x.multiplyScalar(1 - e.dampingFactor)) : (f.set(0, 0, 0), x.set(0, 0, 0)), e.zoomToCursor && X) {
          let y = null;
          if (e.object.isPerspectiveCamera) {
            const U = t.length();
            y = ee(U * P);
            const B = U - y;
            e.object.position.addScaledVector(ie, B), e.object.updateMatrixWorld(), K = !!B;
          } else if (e.object.isOrthographicCamera) {
            const U = new m(E.x, E.y, 0);
            U.unproject(e.object);
            const B = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / P)), e.object.updateProjectionMatrix(), K = B !== e.object.zoom;
            const Me = new m(E.x, E.y, 0);
            Me.unproject(e.object), e.object.position.sub(Me).add(U), e.object.updateMatrixWorld(), y = t.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          y !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(y).add(e.object.position) : (q.origin.copy(e.object.position), q.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(q.direction)) < ot ? p.lookAt(e.target) : (Re.setFromNormalAndCoplanarPoint(e.object.up, e.target), q.intersectPlane(Re, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const y = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / P)), y !== e.object.zoom && (e.object.updateProjectionMatrix(), K = !0);
        }
        return P = 1, X = !1, K || s.distanceToSquared(e.object.position) > Z || 8 * (1 - u.dot(e.object.quaternion)) > Z || T.distanceToSquared(e.target) > Z ? (e.dispatchEvent(xe), s.copy(e.object.position), u.copy(e.object.quaternion), T.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Oe), e.domElement.removeEventListener("pointerdown", ge), e.domElement.removeEventListener("pointercancel", F), e.domElement.removeEventListener("wheel", ye), e.domElement.removeEventListener("pointermove", te), e.domElement.removeEventListener("pointerup", F), e.domElement.getRootNode().removeEventListener("keydown", Ee, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", oe), e._domElementKeyEvents = null);
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
    let i = n.NONE;
    const Z = 1e-6, c = new je(), f = new je();
    let P = 1;
    const x = new m(), O = new h(), D = new h(), L = new h(), w = new h(), M = new h(), R = new h(), S = new h(), k = new h(), j = new h(), ie = new m(), E = new h();
    let X = !1;
    const r = [], z = {};
    let v = !1;
    function ke(t) {
      return t !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * t : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function V(t) {
      const o = Math.abs(t * 0.01);
      return Math.pow(0.95, e.zoomSpeed * o);
    }
    function _(t) {
      f.theta -= t;
    }
    function W(t) {
      f.phi -= t;
    }
    const se = function() {
      const t = new m();
      return function(a, s) {
        t.setFromMatrixColumn(s, 0), t.multiplyScalar(-a), x.add(t);
      };
    }(), ce = function() {
      const t = new m();
      return function(a, s) {
        e.screenSpacePanning === !0 ? t.setFromMatrixColumn(s, 1) : (t.setFromMatrixColumn(s, 0), t.crossVectors(e.object.up, t)), t.multiplyScalar(a), x.add(t);
      };
    }(), N = function() {
      const t = new m();
      return function(a, s) {
        const u = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const T = e.object.position;
          t.copy(T).sub(e.target);
          let d = t.length();
          d *= Math.tan(e.object.fov / 2 * Math.PI / 180), se(2 * a * d / u.clientHeight, e.object.matrix), ce(2 * s * d / u.clientHeight, e.object.matrix);
        } else e.object.isOrthographicCamera ? (se(a * (e.object.right - e.object.left) / e.object.zoom / u.clientWidth, e.object.matrix), ce(s * (e.object.top - e.object.bottom) / e.object.zoom / u.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function J(t) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? P /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function re(t) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? P *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function $(t, o) {
      if (!e.zoomToCursor)
        return;
      X = !0;
      const a = e.domElement.getBoundingClientRect(), s = t - a.left, u = o - a.top, T = a.width, d = a.height;
      E.x = s / T * 2 - 1, E.y = -(u / d) * 2 + 1, ie.set(E.x, E.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function ee(t) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, t));
    }
    function le(t) {
      O.set(t.clientX, t.clientY);
    }
    function Ne(t) {
      $(t.clientX, t.clientX), S.set(t.clientX, t.clientY);
    }
    function ue(t) {
      w.set(t.clientX, t.clientY);
    }
    function Ie(t) {
      D.set(t.clientX, t.clientY), L.subVectors(D, O).multiplyScalar(e.rotateSpeed);
      const o = e.domElement;
      _(2 * Math.PI * L.x / o.clientHeight), W(2 * Math.PI * L.y / o.clientHeight), O.copy(D), e.update();
    }
    function Ce(t) {
      k.set(t.clientX, t.clientY), j.subVectors(k, S), j.y > 0 ? J(V(j.y)) : j.y < 0 && re(V(j.y)), S.copy(k), e.update();
    }
    function Ye(t) {
      M.set(t.clientX, t.clientY), R.subVectors(M, w).multiplyScalar(e.panSpeed), N(R.x, R.y), w.copy(M), e.update();
    }
    function ze(t) {
      $(t.clientX, t.clientY), t.deltaY < 0 ? re(V(t.deltaY)) : t.deltaY > 0 && J(V(t.deltaY)), e.update();
    }
    function _e(t) {
      let o = !1;
      switch (t.code) {
        case e.keys.UP:
          t.ctrlKey || t.metaKey || t.shiftKey ? W(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(0, e.keyPanSpeed), o = !0;
          break;
        case e.keys.BOTTOM:
          t.ctrlKey || t.metaKey || t.shiftKey ? W(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(0, -e.keyPanSpeed), o = !0;
          break;
        case e.keys.LEFT:
          t.ctrlKey || t.metaKey || t.shiftKey ? _(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(e.keyPanSpeed, 0), o = !0;
          break;
        case e.keys.RIGHT:
          t.ctrlKey || t.metaKey || t.shiftKey ? _(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : N(-e.keyPanSpeed, 0), o = !0;
          break;
      }
      o && (t.preventDefault(), e.update());
    }
    function me(t) {
      if (r.length === 1)
        O.set(t.pageX, t.pageY);
      else {
        const o = I(t), a = 0.5 * (t.pageX + o.x), s = 0.5 * (t.pageY + o.y);
        O.set(a, s);
      }
    }
    function pe(t) {
      if (r.length === 1)
        w.set(t.pageX, t.pageY);
      else {
        const o = I(t), a = 0.5 * (t.pageX + o.x), s = 0.5 * (t.pageY + o.y);
        w.set(a, s);
      }
    }
    function de(t) {
      const o = I(t), a = t.pageX - o.x, s = t.pageY - o.y, u = Math.sqrt(a * a + s * s);
      S.set(0, u);
    }
    function Fe(t) {
      e.enableZoom && de(t), e.enablePan && pe(t);
    }
    function Ke(t) {
      e.enableZoom && de(t), e.enableRotate && me(t);
    }
    function he(t) {
      if (r.length == 1)
        D.set(t.pageX, t.pageY);
      else {
        const a = I(t), s = 0.5 * (t.pageX + a.x), u = 0.5 * (t.pageY + a.y);
        D.set(s, u);
      }
      L.subVectors(D, O).multiplyScalar(e.rotateSpeed);
      const o = e.domElement;
      _(2 * Math.PI * L.x / o.clientHeight), W(2 * Math.PI * L.y / o.clientHeight), O.copy(D);
    }
    function fe(t) {
      if (r.length === 1)
        M.set(t.pageX, t.pageY);
      else {
        const o = I(t), a = 0.5 * (t.pageX + o.x), s = 0.5 * (t.pageY + o.y);
        M.set(a, s);
      }
      R.subVectors(M, w).multiplyScalar(e.panSpeed), N(R.x, R.y), w.copy(M);
    }
    function be(t) {
      const o = I(t), a = t.pageX - o.x, s = t.pageY - o.y, u = Math.sqrt(a * a + s * s);
      k.set(0, u), j.set(0, Math.pow(k.y / S.y, e.zoomSpeed)), J(j.y), S.copy(k);
      const T = (t.pageX + o.x) * 0.5, d = (t.pageY + o.y) * 0.5;
      $(T, d);
    }
    function Ue(t) {
      e.enableZoom && be(t), e.enablePan && fe(t);
    }
    function He(t) {
      e.enableZoom && be(t), e.enableRotate && he(t);
    }
    function ge(t) {
      e.enabled !== !1 && (r.length === 0 && (e.domElement.setPointerCapture(t.pointerId), e.domElement.addEventListener("pointermove", te), e.domElement.addEventListener("pointerup", F)), !qe(t) && (Be(t), t.pointerType === "touch" ? Pe(t) : Ze(t)));
    }
    function te(t) {
      e.enabled !== !1 && (t.pointerType === "touch" ? We(t) : Xe(t));
    }
    function F(t) {
      switch (Ge(t), r.length) {
        case 0:
          e.domElement.releasePointerCapture(t.pointerId), e.domElement.removeEventListener("pointermove", te), e.domElement.removeEventListener("pointerup", F), e.dispatchEvent(Le), i = n.NONE;
          break;
        case 1:
          const o = r[0], a = z[o];
          Pe({ pointerId: o, pageX: a.x, pageY: a.y });
          break;
      }
    }
    function Ze(t) {
      let o;
      switch (t.button) {
        case 0:
          o = e.mouseButtons.LEFT;
          break;
        case 1:
          o = e.mouseButtons.MIDDLE;
          break;
        case 2:
          o = e.mouseButtons.RIGHT;
          break;
        default:
          o = -1;
      }
      switch (o) {
        case C.DOLLY:
          if (e.enableZoom === !1) return;
          Ne(t), i = n.DOLLY;
          break;
        case C.ROTATE:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enablePan === !1) return;
            ue(t), i = n.PAN;
          } else {
            if (e.enableRotate === !1) return;
            le(t), i = n.ROTATE;
          }
          break;
        case C.PAN:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enableRotate === !1) return;
            le(t), i = n.ROTATE;
          } else {
            if (e.enablePan === !1) return;
            ue(t), i = n.PAN;
          }
          break;
        default:
          i = n.NONE;
      }
      i !== n.NONE && e.dispatchEvent(ne);
    }
    function Xe(t) {
      switch (i) {
        case n.ROTATE:
          if (e.enableRotate === !1) return;
          Ie(t);
          break;
        case n.DOLLY:
          if (e.enableZoom === !1) return;
          Ce(t);
          break;
        case n.PAN:
          if (e.enablePan === !1) return;
          Ye(t);
          break;
      }
    }
    function ye(t) {
      e.enabled === !1 || e.enableZoom === !1 || i !== n.NONE || (t.preventDefault(), e.dispatchEvent(ne), ze(Ve(t)), e.dispatchEvent(Le));
    }
    function Ve(t) {
      const o = t.deltaMode, a = {
        clientX: t.clientX,
        clientY: t.clientY,
        deltaY: t.deltaY
      };
      switch (o) {
        case 1:
          a.deltaY *= 16;
          break;
        case 2:
          a.deltaY *= 100;
          break;
      }
      return t.ctrlKey && !v && (a.deltaY *= 10), a;
    }
    function Ee(t) {
      t.key === "Control" && (v = !0, e.domElement.getRootNode().addEventListener("keyup", Te, { passive: !0, capture: !0 }));
    }
    function Te(t) {
      t.key === "Control" && (v = !1, e.domElement.getRootNode().removeEventListener("keyup", Te, { passive: !0, capture: !0 }));
    }
    function oe(t) {
      e.enabled === !1 || e.enablePan === !1 || _e(t);
    }
    function Pe(t) {
      switch (De(t), r.length) {
        case 1:
          switch (e.touches.ONE) {
            case Y.ROTATE:
              if (e.enableRotate === !1) return;
              me(t), i = n.TOUCH_ROTATE;
              break;
            case Y.PAN:
              if (e.enablePan === !1) return;
              pe(t), i = n.TOUCH_PAN;
              break;
            default:
              i = n.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Y.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1) return;
              Fe(t), i = n.TOUCH_DOLLY_PAN;
              break;
            case Y.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1) return;
              Ke(t), i = n.TOUCH_DOLLY_ROTATE;
              break;
            default:
              i = n.NONE;
          }
          break;
        default:
          i = n.NONE;
      }
      i !== n.NONE && e.dispatchEvent(ne);
    }
    function We(t) {
      switch (De(t), i) {
        case n.TOUCH_ROTATE:
          if (e.enableRotate === !1) return;
          he(t), e.update();
          break;
        case n.TOUCH_PAN:
          if (e.enablePan === !1) return;
          fe(t), e.update();
          break;
        case n.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1) return;
          Ue(t), e.update();
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1) return;
          He(t), e.update();
          break;
        default:
          i = n.NONE;
      }
    }
    function Oe(t) {
      e.enabled !== !1 && t.preventDefault();
    }
    function Be(t) {
      r.push(t.pointerId);
    }
    function Ge(t) {
      delete z[t.pointerId];
      for (let o = 0; o < r.length; o++)
        if (r[o] == t.pointerId) {
          r.splice(o, 1);
          return;
        }
    }
    function qe(t) {
      for (let o = 0; o < r.length; o++)
        if (r[o] == t.pointerId) return !0;
      return !1;
    }
    function De(t) {
      let o = z[t.pointerId];
      o === void 0 && (o = new h(), z[t.pointerId] = o), o.set(t.pageX, t.pageY);
    }
    function I(t) {
      const o = t.pointerId === r[0] ? r[1] : r[0];
      return z[o];
    }
    e.domElement.addEventListener("contextmenu", Oe), e.domElement.addEventListener("pointerdown", ge), e.domElement.addEventListener("pointercancel", F), e.domElement.addEventListener("wheel", ye, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", Ee, { passive: !0, capture: !0 }), this.update();
  }
}
const ae = {
  enableDamping: !0,
  dampingFactor: 0.05
}, H = class H extends nt {
  constructor(l, e, n = ae) {
    super(l, e);
    G(this, "uuid", Q.generateUUID());
    G(this, "object");
    this.domElement = e, this.domElement = e, this.object = l, this.enableDamping = n.enableDamping ?? ae.enableDamping, this.dampingFactor = n.dampingFactor ?? ae.dampingFactor, this.object.position.set(0, 2, 2), this.target.copy({ x: 0, y: 0.5, z: 0 }), this.update();
  }
  tick() {
    this.enabled && this.update();
  }
  computeEncompassingView(l) {
    const e = l.getCenter(new m()), n = l.getSize(new m()), i = Math.max(n.x, n.y, n.z) * 1.25;
    return {
      position: this.object.position.clone().normalize().clone().multiplyScalar(i),
      target: e.clone()
    };
  }
  zoomIn(l) {
    const e = l || H.DEFAULT_ZOOM_FACTOR, { minDistance: n, maxDistance: i } = this;
    this.minDistance = this.maxDistance = Q.clamp(
      this.getDistance() - e,
      n + e,
      i - e
    ), this.update(), this.minDistance = n, this.maxDistance = i;
  }
  zoomOut(l) {
    const e = l || H.DEFAULT_ZOOM_FACTOR, { minDistance: n, maxDistance: i } = this;
    this.minDistance = this.maxDistance = Q.clamp(
      this.getDistance() + e,
      n + e,
      i - e
    ), this.update(), this.minDistance = n, this.maxDistance = i;
  }
};
G(H, "DEFAULT_ZOOM_FACTOR", 1);
let Se = H;
export {
  ae as O,
  Se as a
};
