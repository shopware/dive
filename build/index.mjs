var Cg = Object.defineProperty;
var Bg = (S, a, i) => a in S ? Cg(S, a, { enumerable: !0, configurable: !0, writable: !0, value: i }) : S[a] = i;
var v = (S, a, i) => Bg(S, typeof a != "symbol" ? a + "" : a, i);
import { Ray as zg, Plane as Gg, MathUtils as On, EventDispatcher as Fg, Vector3 as M, MOUSE as Kn, TOUCH as $n, Spherical as kl, Quaternion as pt, Vector2 as Xe, Raycaster as Ur, Object3D as jt, MeshBasicMaterial as oo, LineBasicMaterial as Ug, CylinderGeometry as ke, BoxGeometry as Se, BufferGeometry as Gr, Float32BufferAttribute as Wl, Mesh as D, OctahedronGeometry as Tr, Line as Ht, TorusGeometry as yi, SphereGeometry as ao, Euler as kg, Matrix4 as lo, PlaneGeometry as nc, DoubleSide as Wg, OrthographicCamera as Ng, Vector4 as Hg, AxesHelper as Yg, Color as Yt, AmbientLight as jg, PointLight as Zg, FrontSide as Xg, HemisphereLight as Vg, DirectionalLight as Qg, Box3 as ic, MeshStandardMaterial as co, BufferAttribute as Nl, ConeGeometry as qg, LineDashedMaterial as Kg, GridHelper as $g, Scene as Jg, WebGLRenderer as e_ } from "three";
import { Easing as Pr, update as t_, Tween as n_ } from "@tweenjs/tween.js";
import { P as Dt, U as rc, C as Ei, H as i_, D as r_, a as s_ } from "./chunks/MediaCreator-CAXBbn15.mjs";
import { M as um } from "./chunks/MediaCreator-CAXBbn15.mjs";
import $s from "three-spritetext";
import { A as fm, F as dm, N as pm, S as gm, g as _m, i as mm } from "./chunks/AssetLoader-Bmcx40wo.mjs";
import { F as vm, P as bm } from "./chunks/fflate.module-BQhIETD7.mjs";
import { A as Em, E as Sm, a as xm, S as Am } from "./chunks/SystemInfo-DYq9x4Ch.mjs";
import { ARSystem as Pm } from "./src/modules/ar/ARSystem.mjs";
import { AssetConverter as Dm } from "./src/modules/asset/converter/AssetConverter.mjs";
import { AssetExporter as Mm } from "./src/modules/asset/exporter/AssetExporter.mjs";
const Hl = { type: "change" }, Js = { type: "start" }, Yl = { type: "end" }, Or = new zg(), jl = new Gg(), o_ = Math.cos(70 * On.DEG2RAD);
class a_ extends Fg {
  constructor(a, i) {
    super(), this.object = a, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new M(), this.cursor = new M(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Kn.ROTATE, MIDDLE: Kn.DOLLY, RIGHT: Kn.PAN }, this.touches = { ONE: $n.ROTATE, TWO: $n.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return T.phi;
    }, this.getAzimuthalAngle = function() {
      return T.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(d) {
      d.addEventListener("keydown", Et), this._domElementKeyEvents = d;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Et), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      r.target0.copy(r.target), r.position0.copy(r.object.position), r.zoom0 = r.object.zoom;
    }, this.reset = function() {
      r.target.copy(r.target0), r.object.position.copy(r.position0), r.object.zoom = r.zoom0, r.object.updateProjectionMatrix(), r.dispatchEvent(Hl), r.update(), E = h.NONE;
    }, this.update = function() {
      const d = new M(), P = new pt().setFromUnitVectors(a.up, new M(0, 1, 0)), W = P.clone().invert(), q = new M(), ye = new pt(), xt = new M(), Ne = 2 * Math.PI;
      return function(Wr = null) {
        const si = r.object.position;
        d.copy(si).sub(r.target), d.applyQuaternion(P), T.setFromVector3(d), r.autoRotate && E === h.NONE && Rt(ei(Wr)), r.enableDamping ? (T.theta += R.theta * r.dampingFactor, T.phi += R.phi * r.dampingFactor) : (T.theta += R.theta, T.phi += R.phi);
        let _t = r.minAzimuthAngle, mt = r.maxAzimuthAngle;
        isFinite(_t) && isFinite(mt) && (_t < -Math.PI ? _t += Ne : _t > Math.PI && (_t -= Ne), mt < -Math.PI ? mt += Ne : mt > Math.PI && (mt -= Ne), _t <= mt ? T.theta = Math.max(_t, Math.min(mt, T.theta)) : T.theta = T.theta > (_t + mt) / 2 ? Math.max(_t, T.theta) : Math.min(mt, T.theta)), T.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, T.phi)), T.makeSafe(), r.enableDamping === !0 ? r.target.addScaledVector(ce, r.dampingFactor) : r.target.add(ce), r.target.sub(r.cursor), r.target.clampLength(r.minTargetRadius, r.maxTargetRadius), r.target.add(r.cursor);
        let gn = !1;
        if (r.zoomToCursor && st || r.object.isOrthographicCamera)
          T.radius = qe(T.radius);
        else {
          const Ke = T.radius;
          T.radius = qe(T.radius * j), gn = Ke != T.radius;
        }
        if (d.setFromSpherical(T), d.applyQuaternion(W), si.copy(r.target).add(d), r.object.lookAt(r.target), r.enableDamping === !0 ? (R.theta *= 1 - r.dampingFactor, R.phi *= 1 - r.dampingFactor, ce.multiplyScalar(1 - r.dampingFactor)) : (R.set(0, 0, 0), ce.set(0, 0, 0)), r.zoomToCursor && st) {
          let Ke = null;
          if (r.object.isPerspectiveCamera) {
            const _n = d.length();
            Ke = qe(_n * j);
            const Jt = _n - Ke;
            r.object.position.addScaledVector(Be, Jt), r.object.updateMatrixWorld(), gn = !!Jt;
          } else if (r.object.isOrthographicCamera) {
            const _n = new M(te.x, te.y, 0);
            _n.unproject(r.object);
            const Jt = r.object.zoom;
            r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / j)), r.object.updateProjectionMatrix(), gn = Jt !== r.object.zoom;
            const Gi = new M(te.x, te.y, 0);
            Gi.unproject(r.object), r.object.position.sub(Gi).add(_n), r.object.updateMatrixWorld(), Ke = d.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), r.zoomToCursor = !1;
          Ke !== null && (this.screenSpacePanning ? r.target.set(0, 0, -1).transformDirection(r.object.matrix).multiplyScalar(Ke).add(r.object.position) : (Or.origin.copy(r.object.position), Or.direction.set(0, 0, -1).transformDirection(r.object.matrix), Math.abs(r.object.up.dot(Or.direction)) < o_ ? a.lookAt(r.target) : (jl.setFromNormalAndCoplanarPoint(r.object.up, r.target), Or.intersectPlane(jl, r.target))));
        } else if (r.object.isOrthographicCamera) {
          const Ke = r.object.zoom;
          r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / j)), Ke !== r.object.zoom && (r.object.updateProjectionMatrix(), gn = !0);
        }
        return j = 1, st = !1, gn || q.distanceToSquared(r.object.position) > p || 8 * (1 - ye.dot(r.object.quaternion)) > p || xt.distanceToSquared(r.target) > p ? (r.dispatchEvent(Hl), q.copy(r.object.position), ye.copy(r.object.quaternion), xt.copy(r.target), !0) : !1;
      };
    }(), this.dispose = function() {
      r.domElement.removeEventListener("contextmenu", Bn), r.domElement.removeEventListener("pointerdown", Li), r.domElement.removeEventListener("pointercancel", Ae), r.domElement.removeEventListener("wheel", Ci), r.domElement.removeEventListener("pointermove", Lt), r.domElement.removeEventListener("pointerup", Ae), r.domElement.getRootNode().removeEventListener("keydown", Bi, { capture: !0 }), r._domElementKeyEvents !== null && (r._domElementKeyEvents.removeEventListener("keydown", Et), r._domElementKeyEvents = null);
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
    let E = h.NONE;
    const p = 1e-6, T = new kl(), R = new kl();
    let j = 1;
    const ce = new M(), ue = new Xe(), Oe = new Xe(), De = new Xe(), me = new Xe(), he = new Xe(), $ = new Xe(), se = new Xe(), ie = new Xe(), V = new Xe(), Be = new M(), te = new Xe();
    let st = !1;
    const Q = [], Ve = {};
    let Mt = !1;
    function ei(d) {
      return d !== null ? 2 * Math.PI / 60 * r.autoRotateSpeed * d : 2 * Math.PI / 60 / 60 * r.autoRotateSpeed;
    }
    function Zt(d) {
      const P = Math.abs(d * 0.01);
      return Math.pow(0.95, r.zoomSpeed * P);
    }
    function Rt(d) {
      R.theta -= d;
    }
    function Xt(d) {
      R.phi -= d;
    }
    const ze = function() {
      const d = new M();
      return function(W, q) {
        d.setFromMatrixColumn(q, 0), d.multiplyScalar(-W), ce.add(d);
      };
    }(), xe = function() {
      const d = new M();
      return function(W, q) {
        r.screenSpacePanning === !0 ? d.setFromMatrixColumn(q, 1) : (d.setFromMatrixColumn(q, 0), d.crossVectors(r.object.up, d)), d.multiplyScalar(W), ce.add(d);
      };
    }(), Qe = function() {
      const d = new M();
      return function(W, q) {
        const ye = r.domElement;
        if (r.object.isPerspectiveCamera) {
          const xt = r.object.position;
          d.copy(xt).sub(r.target);
          let Ne = d.length();
          Ne *= Math.tan(r.object.fov / 2 * Math.PI / 180), ze(2 * W * Ne / ye.clientHeight, r.object.matrix), xe(2 * q * Ne / ye.clientHeight, r.object.matrix);
        } else r.object.isOrthographicCamera ? (ze(W * (r.object.right - r.object.left) / r.object.zoom / ye.clientWidth, r.object.matrix), xe(q * (r.object.top - r.object.bottom) / r.object.zoom / ye.clientHeight, r.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), r.enablePan = !1);
      };
    }();
    function ge(d) {
      r.object.isPerspectiveCamera || r.object.isOrthographicCamera ? j /= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = !1);
    }
    function Ie(d) {
      r.object.isPerspectiveCamera || r.object.isOrthographicCamera ? j *= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), r.enableZoom = !1);
    }
    function _e(d, P) {
      if (!r.zoomToCursor)
        return;
      st = !0;
      const W = r.domElement.getBoundingClientRect(), q = d - W.left, ye = P - W.top, xt = W.width, Ne = W.height;
      te.x = q / xt * 2 - 1, te.y = -(ye / Ne) * 2 + 1, Be.set(te.x, te.y, 1).unproject(r.object).sub(r.object.position).normalize();
    }
    function qe(d) {
      return Math.max(r.minDistance, Math.min(r.maxDistance, d));
    }
    function be(d) {
      ue.set(d.clientX, d.clientY);
    }
    function Vt(d) {
      _e(d.clientX, d.clientX), se.set(d.clientX, d.clientY);
    }
    function Dn(d) {
      me.set(d.clientX, d.clientY);
    }
    function In(d) {
      Oe.set(d.clientX, d.clientY), De.subVectors(Oe, ue).multiplyScalar(r.rotateSpeed);
      const P = r.domElement;
      Rt(2 * Math.PI * De.x / P.clientHeight), Xt(2 * Math.PI * De.y / P.clientHeight), ue.copy(Oe), r.update();
    }
    function Qt(d) {
      ie.set(d.clientX, d.clientY), V.subVectors(ie, se), V.y > 0 ? ge(Zt(V.y)) : V.y < 0 && Ie(Zt(V.y)), se.copy(ie), r.update();
    }
    function Mn(d) {
      he.set(d.clientX, d.clientY), $.subVectors(he, me).multiplyScalar(r.panSpeed), Qe($.x, $.y), me.copy(he), r.update();
    }
    function kr(d) {
      _e(d.clientX, d.clientY), d.deltaY < 0 ? Ie(Zt(d.deltaY)) : d.deltaY > 0 && ge(Zt(d.deltaY)), r.update();
    }
    function hn(d) {
      let P = !1;
      switch (d.code) {
        case r.keys.UP:
          d.ctrlKey || d.metaKey || d.shiftKey ? Xt(2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : Qe(0, r.keyPanSpeed), P = !0;
          break;
        case r.keys.BOTTOM:
          d.ctrlKey || d.metaKey || d.shiftKey ? Xt(-2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : Qe(0, -r.keyPanSpeed), P = !0;
          break;
        case r.keys.LEFT:
          d.ctrlKey || d.metaKey || d.shiftKey ? Rt(2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : Qe(r.keyPanSpeed, 0), P = !0;
          break;
        case r.keys.RIGHT:
          d.ctrlKey || d.metaKey || d.shiftKey ? Rt(-2 * Math.PI * r.rotateSpeed / r.domElement.clientHeight) : Qe(-r.keyPanSpeed, 0), P = !0;
          break;
      }
      P && (d.preventDefault(), r.update());
    }
    function qt(d) {
      if (Q.length === 1)
        ue.set(d.pageX, d.pageY);
      else {
        const P = St(d), W = 0.5 * (d.pageX + P.x), q = 0.5 * (d.pageY + P.y);
        ue.set(W, q);
      }
    }
    function Di(d) {
      if (Q.length === 1)
        me.set(d.pageX, d.pageY);
      else {
        const P = St(d), W = 0.5 * (d.pageX + P.x), q = 0.5 * (d.pageY + P.y);
        me.set(W, q);
      }
    }
    function fn(d) {
      const P = St(d), W = d.pageX - P.x, q = d.pageY - P.y, ye = Math.sqrt(W * W + q * q);
      se.set(0, ye);
    }
    function Rn(d) {
      r.enableZoom && fn(d), r.enablePan && Di(d);
    }
    function Ii(d) {
      r.enableZoom && fn(d), r.enableRotate && qt(d);
    }
    function We(d) {
      if (Q.length == 1)
        Oe.set(d.pageX, d.pageY);
      else {
        const W = St(d), q = 0.5 * (d.pageX + W.x), ye = 0.5 * (d.pageY + W.y);
        Oe.set(q, ye);
      }
      De.subVectors(Oe, ue).multiplyScalar(r.rotateSpeed);
      const P = r.domElement;
      Rt(2 * Math.PI * De.x / P.clientHeight), Xt(2 * Math.PI * De.y / P.clientHeight), ue.copy(Oe);
    }
    function Kt(d) {
      if (Q.length === 1)
        he.set(d.pageX, d.pageY);
      else {
        const P = St(d), W = 0.5 * (d.pageX + P.x), q = 0.5 * (d.pageY + P.y);
        he.set(W, q);
      }
      $.subVectors(he, me).multiplyScalar(r.panSpeed), Qe($.x, $.y), me.copy(he);
    }
    function Mi(d) {
      const P = St(d), W = d.pageX - P.x, q = d.pageY - P.y, ye = Math.sqrt(W * W + q * q);
      ie.set(0, ye), V.set(0, Math.pow(ie.y / se.y, r.zoomSpeed)), ge(V.y), se.copy(ie);
      const xt = (d.pageX + P.x) * 0.5, Ne = (d.pageY + P.y) * 0.5;
      _e(xt, Ne);
    }
    function gt(d) {
      r.enableZoom && Mi(d), r.enablePan && Kt(d);
    }
    function Ri(d) {
      r.enableZoom && Mi(d), r.enableRotate && We(d);
    }
    function Li(d) {
      r.enabled !== !1 && (Q.length === 0 && (r.domElement.setPointerCapture(d.pointerId), r.domElement.addEventListener("pointermove", Lt), r.domElement.addEventListener("pointerup", Ae)), !ri(d) && (ni(d), d.pointerType === "touch" ? Cn(d) : dn(d)));
    }
    function Lt(d) {
      r.enabled !== !1 && (d.pointerType === "touch" ? ti(d) : Ln(d));
    }
    function Ae(d) {
      switch (ii(d), Q.length) {
        case 0:
          r.domElement.releasePointerCapture(d.pointerId), r.domElement.removeEventListener("pointermove", Lt), r.domElement.removeEventListener("pointerup", Ae), r.dispatchEvent(Yl), E = h.NONE;
          break;
        case 1:
          const P = Q[0], W = Ve[P];
          Cn({ pointerId: P, pageX: W.x, pageY: W.y });
          break;
      }
    }
    function dn(d) {
      let P;
      switch (d.button) {
        case 0:
          P = r.mouseButtons.LEFT;
          break;
        case 1:
          P = r.mouseButtons.MIDDLE;
          break;
        case 2:
          P = r.mouseButtons.RIGHT;
          break;
        default:
          P = -1;
      }
      switch (P) {
        case Kn.DOLLY:
          if (r.enableZoom === !1) return;
          Vt(d), E = h.DOLLY;
          break;
        case Kn.ROTATE:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (r.enablePan === !1) return;
            Dn(d), E = h.PAN;
          } else {
            if (r.enableRotate === !1) return;
            be(d), E = h.ROTATE;
          }
          break;
        case Kn.PAN:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (r.enableRotate === !1) return;
            be(d), E = h.ROTATE;
          } else {
            if (r.enablePan === !1) return;
            Dn(d), E = h.PAN;
          }
          break;
        default:
          E = h.NONE;
      }
      E !== h.NONE && r.dispatchEvent(Js);
    }
    function Ln(d) {
      switch (E) {
        case h.ROTATE:
          if (r.enableRotate === !1) return;
          In(d);
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
    function Ci(d) {
      r.enabled === !1 || r.enableZoom === !1 || E !== h.NONE || (d.preventDefault(), r.dispatchEvent(Js), kr(pn(d)), r.dispatchEvent(Yl));
    }
    function pn(d) {
      const P = d.deltaMode, W = {
        clientX: d.clientX,
        clientY: d.clientY,
        deltaY: d.deltaY
      };
      switch (P) {
        case 1:
          W.deltaY *= 16;
          break;
        case 2:
          W.deltaY *= 100;
          break;
      }
      return d.ctrlKey && !Mt && (W.deltaY *= 10), W;
    }
    function Bi(d) {
      d.key === "Control" && (Mt = !0, r.domElement.getRootNode().addEventListener("keyup", $t, { passive: !0, capture: !0 }));
    }
    function $t(d) {
      d.key === "Control" && (Mt = !1, r.domElement.getRootNode().removeEventListener("keyup", $t, { passive: !0, capture: !0 }));
    }
    function Et(d) {
      r.enabled === !1 || r.enablePan === !1 || hn(d);
    }
    function Cn(d) {
      switch (zn(d), Q.length) {
        case 1:
          switch (r.touches.ONE) {
            case $n.ROTATE:
              if (r.enableRotate === !1) return;
              qt(d), E = h.TOUCH_ROTATE;
              break;
            case $n.PAN:
              if (r.enablePan === !1) return;
              Di(d), E = h.TOUCH_PAN;
              break;
            default:
              E = h.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case $n.DOLLY_PAN:
              if (r.enableZoom === !1 && r.enablePan === !1) return;
              Rn(d), E = h.TOUCH_DOLLY_PAN;
              break;
            case $n.DOLLY_ROTATE:
              if (r.enableZoom === !1 && r.enableRotate === !1) return;
              Ii(d), E = h.TOUCH_DOLLY_ROTATE;
              break;
            default:
              E = h.NONE;
          }
          break;
        default:
          E = h.NONE;
      }
      E !== h.NONE && r.dispatchEvent(Js);
    }
    function ti(d) {
      switch (zn(d), E) {
        case h.TOUCH_ROTATE:
          if (r.enableRotate === !1) return;
          We(d), r.update();
          break;
        case h.TOUCH_PAN:
          if (r.enablePan === !1) return;
          Kt(d), r.update();
          break;
        case h.TOUCH_DOLLY_PAN:
          if (r.enableZoom === !1 && r.enablePan === !1) return;
          gt(d), r.update();
          break;
        case h.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === !1 && r.enableRotate === !1) return;
          Ri(d), r.update();
          break;
        default:
          E = h.NONE;
      }
    }
    function Bn(d) {
      r.enabled !== !1 && d.preventDefault();
    }
    function ni(d) {
      Q.push(d.pointerId);
    }
    function ii(d) {
      delete Ve[d.pointerId];
      for (let P = 0; P < Q.length; P++)
        if (Q[P] == d.pointerId) {
          Q.splice(P, 1);
          return;
        }
    }
    function ri(d) {
      for (let P = 0; P < Q.length; P++)
        if (Q[P] == d.pointerId) return !0;
      return !1;
    }
    function zn(d) {
      let P = Ve[d.pointerId];
      P === void 0 && (P = new Xe(), Ve[d.pointerId] = P), P.set(d.pageX, d.pageY);
    }
    function St(d) {
      const P = d.pointerId === Q[0] ? Q[1] : Q[0];
      return Ve[P];
    }
    r.domElement.addEventListener("contextmenu", Bn), r.domElement.addEventListener("pointerdown", Li), r.domElement.addEventListener("pointercancel", Ae), r.domElement.addEventListener("wheel", Ci, { passive: !1 }), r.domElement.getRootNode().addEventListener("keydown", Bi, { passive: !0, capture: !0 }), this.update();
  }
}
const Lr = {
  enableDamping: !0,
  dampingFactor: 0.05
}, Oi = class Oi extends a_ {
  constructor(i, r, h, E, p = Lr) {
    super(i, r.domElement);
    v(this, "_animationSystem");
    v(this, "_pipeline");
    v(this, "last", null);
    v(this, "animating", !1);
    v(this, "locked", !1);
    v(this, "stopMoveTo", () => {
    });
    v(this, "stopRevertLast", () => {
    });
    v(this, "object");
    v(this, "domElement");
    v(this, "preRenderCallback", () => {
      this.locked || this.update();
    });
    this._animationSystem = E, this._pipeline = h, this.domElement = r.domElement, this.object = i, this._pipeline.addPreRenderStep(this.preRenderCallback), this.enableDamping = p.enableDamping || Lr.enableDamping, this.dampingFactor = p.dampingFactor || Lr.dampingFactor, this.object.position.set(0, 2, 2), this.target.copy({ x: 0, y: 0.5, z: 0 }), this.update();
  }
  Dispose() {
    this._pipeline.removePreRenderStep(this.preRenderCallback), this.dispose();
  }
  ComputeEncompassingView(i) {
    const r = i.getCenter(new M()), h = i.getSize(new M()), E = Math.max(h.x, h.y, h.z) * 1.25;
    return {
      position: this.object.position.clone().normalize().multiplyScalar(E),
      target: r
    };
  }
  ZoomIn(i) {
    const r = i || Oi.DEFAULT_ZOOM_FACTOR, { minDistance: h, maxDistance: E } = this;
    this.minDistance = this.maxDistance = On.clamp(
      this.getDistance() - r,
      h + r,
      E - r
    ), this.update(), this.minDistance = h, this.maxDistance = E;
  }
  ZoomOut(i) {
    const r = i || Oi.DEFAULT_ZOOM_FACTOR, { minDistance: h, maxDistance: E } = this;
    this.minDistance = this.maxDistance = On.clamp(
      this.getDistance() + r,
      h + r,
      E - r
    ), this.update(), this.minDistance = h, this.maxDistance = E;
  }
  MoveTo(i, r, h, E) {
    if (this.animating) return;
    const p = i || this.object.position.clone(), T = r || this.target.clone();
    this.stopRevertLast(), this.locked || (this.last = {
      pos: this.object.position.clone(),
      target: this.target.clone()
    }), this.animating = h > 0, this.locked = E, this.enabled = !1;
    const R = this._animationSystem.Animate(this.object.position).to(p, h).easing(Pr.Quadratic.Out).start(), j = this._animationSystem.Animate(this.target).to(T, h).easing(Pr.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = !1, this.enabled = !E;
    }).start();
    this.stopMoveTo = () => {
      R.stop(), j.stop();
    };
  }
  RevertLast(i) {
    if (this.animating || !this.locked) return;
    this.stopMoveTo(), this.animating = i > 0, this.enabled = !1;
    const { pos: r, target: h } = this.last, E = this._animationSystem.Animate(this.object.position).to(r, i).easing(Pr.Quadratic.Out).start(), p = this._animationSystem.Animate(this.target).to(h, i).easing(Pr.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = !1, this.locked = !1, this.enabled = !0;
    }).start();
    this.stopRevertLast = () => {
      E.stop(), p.stop();
    };
  }
};
v(Oi, "DEFAULT_ZOOM_FACTOR", 1);
let no = Oi;
function Cr(S, a) {
  return S ? a in S : !1;
}
function Fr(S, a) {
  if (S)
    return Cr(S, a) ? S : Fr(S.parent, a);
}
class l_ {
  constructor(a, i) {
    v(this, "POINTER_DRAG_THRESHOLD", 1e-3);
    v(this, "name");
    v(this, "_canvas");
    v(this, "_scene");
    v(this, "_controller");
    // general pointer members
    v(this, "_pointer");
    v(this, "_pointerPrimaryDown");
    v(this, "_pointerMiddleDown");
    v(this, "_pointerSecondaryDown");
    v(this, "_lastPointerDown");
    v(this, "_lastPointerUp");
    // raycast members
    v(this, "_raycaster");
    v(this, "_intersects");
    // hovering members
    v(this, "_hovered");
    // dragging members
    v(this, "_dragging");
    v(this, "_dragStart");
    v(this, "_dragCurrent");
    v(this, "_dragEnd");
    v(this, "_dragDelta");
    v(this, "_draggable");
    v(this, "_dragRaycastOnObjects");
    this.name = "BaseTool", this._canvas = i.domElement, this._scene = a, this._controller = i, this._pointer = new Xe(), this._pointerPrimaryDown = !1, this._pointerMiddleDown = !1, this._pointerSecondaryDown = !1, this._lastPointerDown = new Xe(), this._lastPointerUp = new Xe(), this._raycaster = new Ur(), this._raycaster.layers.mask = Dt | rc, this._intersects = [], this._hovered = null, this._dragging = !1, this._dragStart = new M(), this._dragCurrent = new M(), this._dragEnd = new M(), this._dragDelta = new M(), this._draggable = null, this._dragRaycastOnObjects = null;
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
    this._lastPointerDown.copy(this._pointer), this._draggable = Fr(
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
    const i = Fr(
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
const Tn = new Ur(), Ce = new M(), un = new M(), ae = new pt(), Zl = {
  X: new M(1, 0, 0),
  Y: new M(0, 1, 0),
  Z: new M(0, 0, 1)
}, eo = { type: "change" }, Xl = { type: "mouseDown" }, Vl = { type: "mouseUp", mode: null }, Ql = { type: "objectChange" };
class c_ extends jt {
  constructor(a, i) {
    super(), i === void 0 && (console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'), i = document), this.isTransformControls = !0, this.visible = !1, this.domElement = i, this.domElement.style.touchAction = "none";
    const r = new g_();
    this._gizmo = r, this.add(r);
    const h = new __();
    this._plane = h, this.add(h);
    const E = this;
    function p(ie, V) {
      let Be = V;
      Object.defineProperty(E, ie, {
        get: function() {
          return Be !== void 0 ? Be : V;
        },
        set: function(te) {
          Be !== te && (Be = te, h[ie] = te, r[ie] = te, E.dispatchEvent({ type: ie + "-changed", value: te }), E.dispatchEvent(eo));
        }
      }), E[ie] = V, h[ie] = V, r[ie] = V;
    }
    p("camera", a), p("object", void 0), p("enabled", !0), p("axis", null), p("mode", "translate"), p("translationSnap", null), p("rotationSnap", null), p("scaleSnap", null), p("space", "world"), p("size", 1), p("dragging", !1), p("showX", !0), p("showY", !0), p("showZ", !0);
    const T = new M(), R = new M(), j = new pt(), ce = new pt(), ue = new M(), Oe = new pt(), De = new M(), me = new M(), he = new M(), $ = 0, se = new M();
    p("worldPosition", T), p("worldPositionStart", R), p("worldQuaternion", j), p("worldQuaternionStart", ce), p("cameraPosition", ue), p("cameraQuaternion", Oe), p("pointStart", De), p("pointEnd", me), p("rotationAxis", he), p("rotationAngle", $), p("eye", se), this._offset = new M(), this._startNorm = new M(), this._endNorm = new M(), this._cameraScale = new M(), this._parentPosition = new M(), this._parentQuaternion = new pt(), this._parentQuaternionInv = new pt(), this._parentScale = new M(), this._worldScaleStart = new M(), this._worldQuaternionInv = new pt(), this._worldScale = new M(), this._positionStart = new M(), this._quaternionStart = new pt(), this._scaleStart = new M(), this._getPointer = u_.bind(this), this._onPointerDown = f_.bind(this), this._onPointerHover = h_.bind(this), this._onPointerMove = d_.bind(this), this._onPointerUp = p_.bind(this), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(a) {
    this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this._parentPosition, this._parentQuaternion, this._parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this._worldScale), this._parentQuaternionInv.copy(this._parentQuaternion).invert(), this._worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this._cameraScale), this.camera.isOrthographicCamera ? this.camera.getWorldDirection(this.eye).negate() : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld(a);
  }
  pointerHover(a) {
    if (this.object === void 0 || this.dragging === !0) return;
    a !== null && Tn.setFromCamera(a, this.camera);
    const i = to(this._gizmo.picker[this.mode], Tn);
    i ? this.axis = i.object.name : this.axis = null;
  }
  pointerDown(a) {
    if (!(this.object === void 0 || this.dragging === !0 || a != null && a.button !== 0) && this.axis !== null) {
      a !== null && Tn.setFromCamera(a, this.camera);
      const i = to(this._plane, Tn, !0);
      i && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(i.point).sub(this.worldPositionStart)), this.dragging = !0, Xl.mode = this.mode, this.dispatchEvent(Xl);
    }
  }
  pointerMove(a) {
    const i = this.axis, r = this.mode, h = this.object;
    let E = this.space;
    if (r === "scale" ? E = "local" : (i === "E" || i === "XYZE" || i === "XYZ") && (E = "world"), h === void 0 || i === null || this.dragging === !1 || a !== null && a.button !== -1) return;
    a !== null && Tn.setFromCamera(a, this.camera);
    const p = to(this._plane, Tn, !0);
    if (p) {
      if (this.pointEnd.copy(p.point).sub(this.worldPositionStart), r === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), E === "local" && i !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), i.indexOf("X") === -1 && (this._offset.x = 0), i.indexOf("Y") === -1 && (this._offset.y = 0), i.indexOf("Z") === -1 && (this._offset.z = 0), E === "local" && i !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), h.position.copy(this._offset).add(this._positionStart), this.translationSnap && (E === "local" && (h.position.applyQuaternion(ae.copy(this._quaternionStart).invert()), i.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), i.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), i.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.position.applyQuaternion(this._quaternionStart)), E === "world" && (h.parent && h.position.add(Ce.setFromMatrixPosition(h.parent.matrixWorld)), i.search("X") !== -1 && (h.position.x = Math.round(h.position.x / this.translationSnap) * this.translationSnap), i.search("Y") !== -1 && (h.position.y = Math.round(h.position.y / this.translationSnap) * this.translationSnap), i.search("Z") !== -1 && (h.position.z = Math.round(h.position.z / this.translationSnap) * this.translationSnap), h.parent && h.position.sub(Ce.setFromMatrixPosition(h.parent.matrixWorld))));
      else if (r === "scale") {
        if (i.search("XYZ") !== -1) {
          let T = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (T *= -1), un.set(T, T, T);
        } else
          Ce.copy(this.pointStart), un.copy(this.pointEnd), Ce.applyQuaternion(this._worldQuaternionInv), un.applyQuaternion(this._worldQuaternionInv), un.divide(Ce), i.search("X") === -1 && (un.x = 1), i.search("Y") === -1 && (un.y = 1), i.search("Z") === -1 && (un.z = 1);
        h.scale.copy(this._scaleStart).multiply(un), this.scaleSnap && (i.search("X") !== -1 && (h.scale.x = Math.round(h.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), i.search("Y") !== -1 && (h.scale.y = Math.round(h.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), i.search("Z") !== -1 && (h.scale.z = Math.round(h.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (r === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const T = 20 / this.worldPosition.distanceTo(Ce.setFromMatrixPosition(this.camera.matrixWorld));
        let R = !1;
        i === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(Ce.copy(this.rotationAxis).cross(this.eye)) * T) : (i === "X" || i === "Y" || i === "Z") && (this.rotationAxis.copy(Zl[i]), Ce.copy(Zl[i]), E === "local" && Ce.applyQuaternion(this.worldQuaternion), Ce.cross(this.eye), Ce.length() === 0 ? R = !0 : this.rotationAngle = this._offset.dot(Ce.normalize()) * T), (i === "E" || R) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), E === "local" && i !== "E" && i !== "XYZE" ? (h.quaternion.copy(this._quaternionStart), h.quaternion.multiply(ae.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), h.quaternion.copy(ae.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), h.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(eo), this.dispatchEvent(Ql);
    }
  }
  pointerUp(a) {
    a !== null && a.button !== 0 || (this.dragging && this.axis !== null && (Vl.mode = this.mode, this.dispatchEvent(Vl)), this.dragging = !1, this.axis = null);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(eo), this.dispatchEvent(Ql), this.pointStart.copy(this.pointEnd));
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
function u_(S) {
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
function h_(S) {
  if (this.enabled)
    switch (S.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(S));
        break;
    }
}
function f_(S) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(S.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(S)), this.pointerDown(this._getPointer(S)));
}
function d_(S) {
  this.enabled && this.pointerMove(this._getPointer(S));
}
function p_(S) {
  this.enabled && (this.domElement.releasePointerCapture(S.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(S)));
}
function to(S, a, i) {
  const r = a.intersectObject(S, !0);
  for (let h = 0; h < r.length; h++)
    if (r[h].object.visible || i)
      return r[h];
  return !1;
}
const Dr = new kg(), ee = new M(0, 1, 0), ql = new M(0, 0, 0), Kl = new lo(), Ir = new pt(), Br = new pt(), Ot = new M(), $l = new lo(), Ai = new M(1, 0, 0), Pn = new M(0, 1, 0), Ti = new M(0, 0, 1), Mr = new M(), Si = new M(), xi = new M();
class g_ extends jt {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const a = new oo({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), i = new Ug({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), r = a.clone();
    r.opacity = 0.15;
    const h = i.clone();
    h.opacity = 0.5;
    const E = a.clone();
    E.color.setHex(16711680);
    const p = a.clone();
    p.color.setHex(65280);
    const T = a.clone();
    T.color.setHex(255);
    const R = a.clone();
    R.color.setHex(16711680), R.opacity = 0.5;
    const j = a.clone();
    j.color.setHex(65280), j.opacity = 0.5;
    const ce = a.clone();
    ce.color.setHex(255), ce.opacity = 0.5;
    const ue = a.clone();
    ue.opacity = 0.25;
    const Oe = a.clone();
    Oe.color.setHex(16776960), Oe.opacity = 0.25, a.clone().color.setHex(16776960);
    const me = a.clone();
    me.color.setHex(7895160);
    const he = new ke(0, 0.04, 0.1, 12);
    he.translate(0, 0.05, 0);
    const $ = new Se(0.08, 0.08, 0.08);
    $.translate(0, 0.04, 0);
    const se = new Gr();
    se.setAttribute("position", new Wl([0, 0, 0, 1, 0, 0], 3));
    const ie = new ke(75e-4, 75e-4, 0.5, 3);
    ie.translate(0, 0.25, 0);
    function V(xe, Qe) {
      const ge = new yi(xe, 75e-4, 3, 64, Qe * Math.PI * 2);
      return ge.rotateY(Math.PI / 2), ge.rotateX(Math.PI / 2), ge;
    }
    function Be() {
      const xe = new Gr();
      return xe.setAttribute("position", new Wl([0, 0, 0, 1, 1, 1], 3)), xe;
    }
    const te = {
      X: [
        [new D(he, E), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new D(he, E), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new D(ie, E), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new D(he, p), [0, 0.5, 0]],
        [new D(he, p), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new D(ie, p)]
      ],
      Z: [
        [new D(he, T), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new D(he, T), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new D(ie, T), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new D(new Tr(0.1, 0), ue.clone()), [0, 0, 0]]
      ],
      XY: [
        [new D(new Se(0.15, 0.15, 0.01), ce.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new D(new Se(0.15, 0.15, 0.01), R.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new D(new Se(0.15, 0.15, 0.01), j.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, st = {
      X: [
        [new D(new ke(0.2, 0, 0.6, 4), r), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new D(new ke(0.2, 0, 0.6, 4), r), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, 0.3, 0]],
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new D(new Tr(0.2, 0), r)]
      ],
      XY: [
        [new D(new Se(0.2, 0.2, 0.01), r), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new D(new Se(0.2, 0.2, 0.01), r), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new D(new Se(0.2, 0.2, 0.01), r), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, Q = {
      START: [
        [new D(new Tr(0.01, 2), h), null, null, null, "helper"]
      ],
      END: [
        [new D(new Tr(0.01, 2), h), null, null, null, "helper"]
      ],
      DELTA: [
        [new Ht(Be(), h), null, null, null, "helper"]
      ],
      X: [
        [new Ht(se, h.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Ht(se, h.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Ht(se, h.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, Ve = {
      XYZE: [
        [new D(V(0.5, 1), me), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new D(V(0.5, 0.5), E)]
      ],
      Y: [
        [new D(V(0.5, 0.5), p), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new D(V(0.5, 0.5), T), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new D(V(0.75, 1), Oe), null, [0, Math.PI / 2, 0]]
      ]
    }, Mt = {
      AXIS: [
        [new Ht(se, h.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, ei = {
      XYZE: [
        [new D(new ao(0.25, 10, 8), r)]
      ],
      X: [
        [new D(new yi(0.5, 0.1, 4, 24), r), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new D(new yi(0.5, 0.1, 4, 24), r), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new D(new yi(0.5, 0.1, 4, 24), r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new D(new yi(0.75, 0.1, 2, 24), r)]
      ]
    }, Zt = {
      X: [
        [new D($, E), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new D(ie, E), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new D($, E), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new D($, p), [0, 0.5, 0]],
        [new D(ie, p)],
        [new D($, p), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new D($, T), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new D(ie, T), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new D($, T), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new D(new Se(0.15, 0.15, 0.01), ce), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new D(new Se(0.15, 0.15, 0.01), R), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new D(new Se(0.15, 0.15, 0.01), j), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new D(new Se(0.1, 0.1, 0.1), ue.clone())]
      ]
    }, Rt = {
      X: [
        [new D(new ke(0.2, 0, 0.6, 4), r), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new D(new ke(0.2, 0, 0.6, 4), r), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, 0.3, 0]],
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new D(new ke(0.2, 0, 0.6, 4), r), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new D(new Se(0.2, 0.2, 0.01), r), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new D(new Se(0.2, 0.2, 0.01), r), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new D(new Se(0.2, 0.2, 0.01), r), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new D(new Se(0.2, 0.2, 0.2), r), [0, 0, 0]]
      ]
    }, Xt = {
      X: [
        [new Ht(se, h.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Ht(se, h.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Ht(se, h.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function ze(xe) {
      const Qe = new jt();
      for (const ge in xe)
        for (let Ie = xe[ge].length; Ie--; ) {
          const _e = xe[ge][Ie][0].clone(), qe = xe[ge][Ie][1], be = xe[ge][Ie][2], Vt = xe[ge][Ie][3], Dn = xe[ge][Ie][4];
          _e.name = ge, _e.tag = Dn, qe && _e.position.set(qe[0], qe[1], qe[2]), be && _e.rotation.set(be[0], be[1], be[2]), Vt && _e.scale.set(Vt[0], Vt[1], Vt[2]), _e.updateMatrix();
          const In = _e.geometry.clone();
          In.applyMatrix4(_e.matrix), _e.geometry = In, _e.renderOrder = 1 / 0, _e.position.set(0, 0, 0), _e.rotation.set(0, 0, 0), _e.scale.set(1, 1, 1), Qe.add(_e);
        }
      return Qe;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = ze(te)), this.add(this.gizmo.rotate = ze(Ve)), this.add(this.gizmo.scale = ze(Zt)), this.add(this.picker.translate = ze(st)), this.add(this.picker.rotate = ze(ei)), this.add(this.picker.scale = ze(Rt)), this.add(this.helper.translate = ze(Q)), this.add(this.helper.rotate = ze(Mt)), this.add(this.helper.scale = ze(Xt)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(a) {
    const r = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : Br;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let h = [];
    h = h.concat(this.picker[this.mode].children), h = h.concat(this.gizmo[this.mode].children), h = h.concat(this.helper[this.mode].children);
    for (let E = 0; E < h.length; E++) {
      const p = h[E];
      p.visible = !0, p.rotation.set(0, 0, 0), p.position.copy(this.worldPosition);
      let T;
      if (this.camera.isOrthographicCamera ? T = (this.camera.top - this.camera.bottom) / this.camera.zoom : T = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), p.scale.set(1, 1, 1).multiplyScalar(T * this.size / 4), p.tag === "helper") {
        p.visible = !1, p.name === "AXIS" ? (p.visible = !!this.axis, this.axis === "X" && (ae.setFromEuler(Dr.set(0, 0, 0)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Ai).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "Y" && (ae.setFromEuler(Dr.set(0, 0, Math.PI / 2)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Pn).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "Z" && (ae.setFromEuler(Dr.set(0, Math.PI / 2, 0)), p.quaternion.copy(r).multiply(ae), Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) > 0.9 && (p.visible = !1)), this.axis === "XYZE" && (ae.setFromEuler(Dr.set(0, Math.PI / 2, 0)), ee.copy(this.rotationAxis), p.quaternion.setFromRotationMatrix(Kl.lookAt(ql, ee, Pn)), p.quaternion.multiply(ae), p.visible = this.dragging), this.axis === "E" && (p.visible = !1)) : p.name === "START" ? (p.position.copy(this.worldPositionStart), p.visible = this.dragging) : p.name === "END" ? (p.position.copy(this.worldPosition), p.visible = this.dragging) : p.name === "DELTA" ? (p.position.copy(this.worldPositionStart), p.quaternion.copy(this.worldQuaternionStart), Ce.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), Ce.applyQuaternion(this.worldQuaternionStart.clone().invert()), p.scale.copy(Ce), p.visible = this.dragging) : (p.quaternion.copy(r), this.dragging ? p.position.copy(this.worldPositionStart) : p.position.copy(this.worldPosition), this.axis && (p.visible = this.axis.search(p.name) !== -1));
        continue;
      }
      p.quaternion.copy(r), this.mode === "translate" || this.mode === "scale" ? (p.name === "X" && Math.abs(ee.copy(Ai).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "Y" && Math.abs(ee.copy(Pn).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "Z" && Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) > 0.99 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "XY" && Math.abs(ee.copy(Ti).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "YZ" && Math.abs(ee.copy(Ai).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1), p.name === "XZ" && Math.abs(ee.copy(Pn).applyQuaternion(r).dot(this.eye)) < 0.2 && (p.scale.set(1e-10, 1e-10, 1e-10), p.visible = !1)) : this.mode === "rotate" && (Ir.copy(r), ee.copy(this.eye).applyQuaternion(ae.copy(r).invert()), p.name.search("E") !== -1 && p.quaternion.setFromRotationMatrix(Kl.lookAt(this.eye, ql, Pn)), p.name === "X" && (ae.setFromAxisAngle(Ai, Math.atan2(-ee.y, ee.z)), ae.multiplyQuaternions(Ir, ae), p.quaternion.copy(ae)), p.name === "Y" && (ae.setFromAxisAngle(Pn, Math.atan2(ee.x, ee.z)), ae.multiplyQuaternions(Ir, ae), p.quaternion.copy(ae)), p.name === "Z" && (ae.setFromAxisAngle(Ti, Math.atan2(ee.y, ee.x)), ae.multiplyQuaternions(Ir, ae), p.quaternion.copy(ae))), p.visible = p.visible && (p.name.indexOf("X") === -1 || this.showX), p.visible = p.visible && (p.name.indexOf("Y") === -1 || this.showY), p.visible = p.visible && (p.name.indexOf("Z") === -1 || this.showZ), p.visible = p.visible && (p.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), p.material._color = p.material._color || p.material.color.clone(), p.material._opacity = p.material._opacity || p.material.opacity, p.material.color.copy(p.material._color), p.material.opacity = p.material._opacity, this.enabled && this.axis && (p.name === this.axis || this.axis.split("").some(function(R) {
        return p.name === R;
      })) && (p.material.color.setHex(16776960), p.material.opacity = 1);
    }
    super.updateMatrixWorld(a);
  }
}
class __ extends D {
  constructor() {
    super(
      new nc(1e5, 1e5, 2, 2),
      new oo({ visible: !1, wireframe: !0, side: Wg, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(a) {
    let i = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (i = "local"), Mr.copy(Ai).applyQuaternion(i === "local" ? this.worldQuaternion : Br), Si.copy(Pn).applyQuaternion(i === "local" ? this.worldQuaternion : Br), xi.copy(Ti).applyQuaternion(i === "local" ? this.worldQuaternion : Br), ee.copy(Si), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            ee.copy(this.eye).cross(Mr), Ot.copy(Mr).cross(ee);
            break;
          case "Y":
            ee.copy(this.eye).cross(Si), Ot.copy(Si).cross(ee);
            break;
          case "Z":
            ee.copy(this.eye).cross(xi), Ot.copy(xi).cross(ee);
            break;
          case "XY":
            Ot.copy(xi);
            break;
          case "YZ":
            Ot.copy(Mr);
            break;
          case "XZ":
            ee.copy(xi), Ot.copy(Si);
            break;
          case "XYZ":
          case "E":
            Ot.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        Ot.set(0, 0, 0);
    }
    Ot.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : ($l.lookAt(Ce.set(0, 0, 0), Ot, ee), this.quaternion.setFromRotationMatrix($l)), super.updateMatrixWorld(a);
  }
}
const sc = "#c20017", oc = "#00ab26", ac = "#0081d4", io = sc, ro = oc, so = ac;
class m_ extends l_ {
  constructor(i, r) {
    super(i, r);
    v(this, "isTransformTool", !0);
    v(this, "_scaleLinked");
    v(this, "_gizmo");
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
    const i = new c_(
      // this._controller,
      this._controller.object,
      this._controller.domElement
    );
    return i.mode = "translate", i.traverse((r) => {
      if (!("isMesh" in r)) return;
      const h = r.material;
      r.name === "X" && h.color.set(io), r.name === "Y" && h.color.set(ro), r.name === "Z" && h.color.set(so), r.name === "XY" && h.color.set(so), r.name === "YZ" && h.color.set(io), r.name === "XZ" && h.color.set(ro);
    }), i.addEventListener("mouseDown", () => {
      this._controller.enabled = !1, Cr(i.object, "isMovable") && i.object.onMoveStart && i.object.onMoveStart();
    }), i.addEventListener("objectChange", () => {
      if (Cr(i.object, "isMovable") && i.object.onMove && (i.object.onMove(), this._scaleLinked)) {
        const r = i.object.scale, h = (r.x + r.y + r.z) / 3;
        i.object.scale.set(h, h, h);
      }
    }), i.addEventListener("mouseUp", () => {
      this._controller.enabled = !0, Cr(i.object, "isMovable") && i.object.onMoveEnd && i.object.onMoveEnd();
    }), i;
  }
}
const Jl = (S) => S.isSelectTool !== void 0;
class w_ extends m_ {
  constructor(i, r) {
    super(i, r);
    v(this, "isSelectTool", !0);
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
    const r = this._raycaster.intersectObjects(this._scene.Root.children, !0).filter((E) => E.object.visible)[0], h = Fr(
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
class lc {
  constructor(a, i) {
    v(this, "_scene");
    v(this, "_controller");
    v(this, "_activeTool");
    v(this, "_selectTool");
    this._scene = a, this._controller = i, this._selectTool = null, this._activeTool = null;
  }
  get selectTool() {
    return this._selectTool || (this._selectTool = new w_(
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
v(lc, "DefaultTool", "select");
const Le = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function v_() {
  const S = Math.random() * 4294967295 | 0, a = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
  return (Le[S & 255] + Le[S >> 8 & 255] + Le[S >> 16 & 255] + Le[S >> 24 & 255] + "-" + Le[a & 255] + Le[a >> 8 & 255] + "-" + Le[a >> 16 & 15 | 64] + Le[a >> 24 & 255] + "-" + Le[i & 63 | 128] + Le[i >> 8 & 255] + "-" + Le[i >> 16 & 255] + Le[i >> 24 & 255] + Le[r & 255] + Le[r >> 8 & 255] + Le[r >> 16 & 255] + Le[r >> 24 & 255]).toLowerCase();
}
var Rr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pi = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var b_ = Pi.exports, ec;
function y_() {
  return ec || (ec = 1, function(S, a) {
    (function() {
      var i, r = "4.17.21", h = 200, E = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", p = "Expected a function", T = "Invalid `variable` option passed into `_.template`", R = "__lodash_hash_undefined__", j = 500, ce = "__lodash_placeholder__", ue = 1, Oe = 2, De = 4, me = 1, he = 2, $ = 1, se = 2, ie = 4, V = 8, Be = 16, te = 32, st = 64, Q = 128, Ve = 256, Mt = 512, ei = 30, Zt = "...", Rt = 800, Xt = 16, ze = 1, xe = 2, Qe = 3, ge = 1 / 0, Ie = 9007199254740991, _e = 17976931348623157e292, qe = NaN, be = 4294967295, Vt = be - 1, Dn = be >>> 1, In = [
        ["ary", Q],
        ["bind", $],
        ["bindKey", se],
        ["curry", V],
        ["curryRight", Be],
        ["flip", Mt],
        ["partial", te],
        ["partialRight", st],
        ["rearg", Ve]
      ], Qt = "[object Arguments]", Mn = "[object Array]", kr = "[object AsyncFunction]", hn = "[object Boolean]", qt = "[object Date]", Di = "[object DOMException]", fn = "[object Error]", Rn = "[object Function]", Ii = "[object GeneratorFunction]", We = "[object Map]", Kt = "[object Number]", Mi = "[object Null]", gt = "[object Object]", Ri = "[object Promise]", Li = "[object Proxy]", Lt = "[object RegExp]", Ae = "[object Set]", dn = "[object String]", Ln = "[object Symbol]", Ci = "[object Undefined]", pn = "[object WeakMap]", Bi = "[object WeakSet]", $t = "[object ArrayBuffer]", Et = "[object DataView]", Cn = "[object Float32Array]", ti = "[object Float64Array]", Bn = "[object Int8Array]", ni = "[object Int16Array]", ii = "[object Int32Array]", ri = "[object Uint8Array]", zn = "[object Uint8ClampedArray]", St = "[object Uint16Array]", zi = "[object Uint32Array]", d = /\b__p \+= '';/g, P = /\b(__p \+=) '' \+/g, W = /(__e\(.*?\)|\b__t\)) \+\n'';/g, q = /&(?:amp|lt|gt|quot|#39);/g, ye = /[&<>"']/g, xt = RegExp(q.source), Ne = RegExp(ye.source), fo = /<%-([\s\S]+?)%>/g, Wr = /<%([\s\S]+?)%>/g, si = /<%=([\s\S]+?)%>/g, _t = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, mt = /^\w*$/, gn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ke = /[\\^$.*+?()[\]{}|]/g, _n = RegExp(Ke.source), Jt = /^\s+/, Gi = /\s/, fc = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, dc = /\{\n\/\* \[wrapped with (.+)\] \*/, pc = /,? & /, gc = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, _c = /[()=,{}\[\]\/\s]/, mc = /\\(\\)?/g, wc = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, po = /\w*$/, vc = /^[-+]0x[0-9a-f]+$/i, bc = /^0b[01]+$/i, yc = /^\[object .+?Constructor\]$/, Ec = /^0o[0-7]+$/i, Sc = /^(?:0|[1-9]\d*)$/, xc = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Fi = /($^)/, Ac = /['\n\r\u2028\u2029\\]/g, Ui = "\\ud800-\\udfff", Tc = "\\u0300-\\u036f", Pc = "\\ufe20-\\ufe2f", Oc = "\\u20d0-\\u20ff", go = Tc + Pc + Oc, _o = "\\u2700-\\u27bf", mo = "a-z\\xdf-\\xf6\\xf8-\\xff", Dc = "\\xac\\xb1\\xd7\\xf7", Ic = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Mc = "\\u2000-\\u206f", Rc = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", wo = "A-Z\\xc0-\\xd6\\xd8-\\xde", vo = "\\ufe0e\\ufe0f", bo = Dc + Ic + Mc + Rc, Nr = "['’]", Lc = "[" + Ui + "]", yo = "[" + bo + "]", ki = "[" + go + "]", Eo = "\\d+", Cc = "[" + _o + "]", So = "[" + mo + "]", xo = "[^" + Ui + bo + Eo + _o + mo + wo + "]", Hr = "\\ud83c[\\udffb-\\udfff]", Bc = "(?:" + ki + "|" + Hr + ")", Ao = "[^" + Ui + "]", Yr = "(?:\\ud83c[\\udde6-\\uddff]){2}", jr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Gn = "[" + wo + "]", To = "\\u200d", Po = "(?:" + So + "|" + xo + ")", zc = "(?:" + Gn + "|" + xo + ")", Oo = "(?:" + Nr + "(?:d|ll|m|re|s|t|ve))?", Do = "(?:" + Nr + "(?:D|LL|M|RE|S|T|VE))?", Io = Bc + "?", Mo = "[" + vo + "]?", Gc = "(?:" + To + "(?:" + [Ao, Yr, jr].join("|") + ")" + Mo + Io + ")*", Fc = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Uc = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Ro = Mo + Io + Gc, kc = "(?:" + [Cc, Yr, jr].join("|") + ")" + Ro, Wc = "(?:" + [Ao + ki + "?", ki, Yr, jr, Lc].join("|") + ")", Nc = RegExp(Nr, "g"), Hc = RegExp(ki, "g"), Zr = RegExp(Hr + "(?=" + Hr + ")|" + Wc + Ro, "g"), Yc = RegExp([
        Gn + "?" + So + "+" + Oo + "(?=" + [yo, Gn, "$"].join("|") + ")",
        zc + "+" + Do + "(?=" + [yo, Gn + Po, "$"].join("|") + ")",
        Gn + "?" + Po + "+" + Oo,
        Gn + "+" + Do,
        Uc,
        Fc,
        Eo,
        kc
      ].join("|"), "g"), jc = RegExp("[" + To + Ui + go + vo + "]"), Zc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Xc = [
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
      ], Vc = -1, re = {};
      re[Cn] = re[ti] = re[Bn] = re[ni] = re[ii] = re[ri] = re[zn] = re[St] = re[zi] = !0, re[Qt] = re[Mn] = re[$t] = re[hn] = re[Et] = re[qt] = re[fn] = re[Rn] = re[We] = re[Kt] = re[gt] = re[Lt] = re[Ae] = re[dn] = re[pn] = !1;
      var ne = {};
      ne[Qt] = ne[Mn] = ne[$t] = ne[Et] = ne[hn] = ne[qt] = ne[Cn] = ne[ti] = ne[Bn] = ne[ni] = ne[ii] = ne[We] = ne[Kt] = ne[gt] = ne[Lt] = ne[Ae] = ne[dn] = ne[Ln] = ne[ri] = ne[zn] = ne[St] = ne[zi] = !0, ne[fn] = ne[Rn] = ne[pn] = !1;
      var Qc = {
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
      }, qc = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, Kc = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, $c = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, Jc = parseFloat, eu = parseInt, Lo = typeof Rr == "object" && Rr && Rr.Object === Object && Rr, tu = typeof self == "object" && self && self.Object === Object && self, Te = Lo || tu || Function("return this")(), Xr = a && !a.nodeType && a, mn = Xr && !0 && S && !S.nodeType && S, Co = mn && mn.exports === Xr, Vr = Co && Lo.process, ot = function() {
        try {
          var g = mn && mn.require && mn.require("util").types;
          return g || Vr && Vr.binding && Vr.binding("util");
        } catch {
        }
      }(), Bo = ot && ot.isArrayBuffer, zo = ot && ot.isDate, Go = ot && ot.isMap, Fo = ot && ot.isRegExp, Uo = ot && ot.isSet, ko = ot && ot.isTypedArray;
      function $e(g, w, m) {
        switch (m.length) {
          case 0:
            return g.call(w);
          case 1:
            return g.call(w, m[0]);
          case 2:
            return g.call(w, m[0], m[1]);
          case 3:
            return g.call(w, m[0], m[1], m[2]);
        }
        return g.apply(w, m);
      }
      function nu(g, w, m, O) {
        for (var z = -1, Z = g == null ? 0 : g.length; ++z < Z; ) {
          var we = g[z];
          w(O, we, m(we), g);
        }
        return O;
      }
      function at(g, w) {
        for (var m = -1, O = g == null ? 0 : g.length; ++m < O && w(g[m], m, g) !== !1; )
          ;
        return g;
      }
      function iu(g, w) {
        for (var m = g == null ? 0 : g.length; m-- && w(g[m], m, g) !== !1; )
          ;
        return g;
      }
      function Wo(g, w) {
        for (var m = -1, O = g == null ? 0 : g.length; ++m < O; )
          if (!w(g[m], m, g))
            return !1;
        return !0;
      }
      function en(g, w) {
        for (var m = -1, O = g == null ? 0 : g.length, z = 0, Z = []; ++m < O; ) {
          var we = g[m];
          w(we, m, g) && (Z[z++] = we);
        }
        return Z;
      }
      function Wi(g, w) {
        var m = g == null ? 0 : g.length;
        return !!m && Fn(g, w, 0) > -1;
      }
      function Qr(g, w, m) {
        for (var O = -1, z = g == null ? 0 : g.length; ++O < z; )
          if (m(w, g[O]))
            return !0;
        return !1;
      }
      function oe(g, w) {
        for (var m = -1, O = g == null ? 0 : g.length, z = Array(O); ++m < O; )
          z[m] = w(g[m], m, g);
        return z;
      }
      function tn(g, w) {
        for (var m = -1, O = w.length, z = g.length; ++m < O; )
          g[z + m] = w[m];
        return g;
      }
      function qr(g, w, m, O) {
        var z = -1, Z = g == null ? 0 : g.length;
        for (O && Z && (m = g[++z]); ++z < Z; )
          m = w(m, g[z], z, g);
        return m;
      }
      function ru(g, w, m, O) {
        var z = g == null ? 0 : g.length;
        for (O && z && (m = g[--z]); z--; )
          m = w(m, g[z], z, g);
        return m;
      }
      function Kr(g, w) {
        for (var m = -1, O = g == null ? 0 : g.length; ++m < O; )
          if (w(g[m], m, g))
            return !0;
        return !1;
      }
      var su = $r("length");
      function ou(g) {
        return g.split("");
      }
      function au(g) {
        return g.match(gc) || [];
      }
      function No(g, w, m) {
        var O;
        return m(g, function(z, Z, we) {
          if (w(z, Z, we))
            return O = Z, !1;
        }), O;
      }
      function Ni(g, w, m, O) {
        for (var z = g.length, Z = m + (O ? 1 : -1); O ? Z-- : ++Z < z; )
          if (w(g[Z], Z, g))
            return Z;
        return -1;
      }
      function Fn(g, w, m) {
        return w === w ? vu(g, w, m) : Ni(g, Ho, m);
      }
      function lu(g, w, m, O) {
        for (var z = m - 1, Z = g.length; ++z < Z; )
          if (O(g[z], w))
            return z;
        return -1;
      }
      function Ho(g) {
        return g !== g;
      }
      function Yo(g, w) {
        var m = g == null ? 0 : g.length;
        return m ? es(g, w) / m : qe;
      }
      function $r(g) {
        return function(w) {
          return w == null ? i : w[g];
        };
      }
      function Jr(g) {
        return function(w) {
          return g == null ? i : g[w];
        };
      }
      function jo(g, w, m, O, z) {
        return z(g, function(Z, we, J) {
          m = O ? (O = !1, Z) : w(m, Z, we, J);
        }), m;
      }
      function cu(g, w) {
        var m = g.length;
        for (g.sort(w); m--; )
          g[m] = g[m].value;
        return g;
      }
      function es(g, w) {
        for (var m, O = -1, z = g.length; ++O < z; ) {
          var Z = w(g[O]);
          Z !== i && (m = m === i ? Z : m + Z);
        }
        return m;
      }
      function ts(g, w) {
        for (var m = -1, O = Array(g); ++m < g; )
          O[m] = w(m);
        return O;
      }
      function uu(g, w) {
        return oe(w, function(m) {
          return [m, g[m]];
        });
      }
      function Zo(g) {
        return g && g.slice(0, qo(g) + 1).replace(Jt, "");
      }
      function Je(g) {
        return function(w) {
          return g(w);
        };
      }
      function ns(g, w) {
        return oe(w, function(m) {
          return g[m];
        });
      }
      function oi(g, w) {
        return g.has(w);
      }
      function Xo(g, w) {
        for (var m = -1, O = g.length; ++m < O && Fn(w, g[m], 0) > -1; )
          ;
        return m;
      }
      function Vo(g, w) {
        for (var m = g.length; m-- && Fn(w, g[m], 0) > -1; )
          ;
        return m;
      }
      function hu(g, w) {
        for (var m = g.length, O = 0; m--; )
          g[m] === w && ++O;
        return O;
      }
      var fu = Jr(Qc), du = Jr(qc);
      function pu(g) {
        return "\\" + $c[g];
      }
      function gu(g, w) {
        return g == null ? i : g[w];
      }
      function Un(g) {
        return jc.test(g);
      }
      function _u(g) {
        return Zc.test(g);
      }
      function mu(g) {
        for (var w, m = []; !(w = g.next()).done; )
          m.push(w.value);
        return m;
      }
      function is(g) {
        var w = -1, m = Array(g.size);
        return g.forEach(function(O, z) {
          m[++w] = [z, O];
        }), m;
      }
      function Qo(g, w) {
        return function(m) {
          return g(w(m));
        };
      }
      function nn(g, w) {
        for (var m = -1, O = g.length, z = 0, Z = []; ++m < O; ) {
          var we = g[m];
          (we === w || we === ce) && (g[m] = ce, Z[z++] = m);
        }
        return Z;
      }
      function Hi(g) {
        var w = -1, m = Array(g.size);
        return g.forEach(function(O) {
          m[++w] = O;
        }), m;
      }
      function wu(g) {
        var w = -1, m = Array(g.size);
        return g.forEach(function(O) {
          m[++w] = [O, O];
        }), m;
      }
      function vu(g, w, m) {
        for (var O = m - 1, z = g.length; ++O < z; )
          if (g[O] === w)
            return O;
        return -1;
      }
      function bu(g, w, m) {
        for (var O = m + 1; O--; )
          if (g[O] === w)
            return O;
        return O;
      }
      function kn(g) {
        return Un(g) ? Eu(g) : su(g);
      }
      function wt(g) {
        return Un(g) ? Su(g) : ou(g);
      }
      function qo(g) {
        for (var w = g.length; w-- && Gi.test(g.charAt(w)); )
          ;
        return w;
      }
      var yu = Jr(Kc);
      function Eu(g) {
        for (var w = Zr.lastIndex = 0; Zr.test(g); )
          ++w;
        return w;
      }
      function Su(g) {
        return g.match(Zr) || [];
      }
      function xu(g) {
        return g.match(Yc) || [];
      }
      var Au = function g(w) {
        w = w == null ? Te : Wn.defaults(Te.Object(), w, Wn.pick(Te, Xc));
        var m = w.Array, O = w.Date, z = w.Error, Z = w.Function, we = w.Math, J = w.Object, rs = w.RegExp, Tu = w.String, lt = w.TypeError, Yi = m.prototype, Pu = Z.prototype, Nn = J.prototype, ji = w["__core-js_shared__"], Zi = Pu.toString, K = Nn.hasOwnProperty, Ou = 0, Ko = function() {
          var e = /[^.]+$/.exec(ji && ji.keys && ji.keys.IE_PROTO || "");
          return e ? "Symbol(src)_1." + e : "";
        }(), Xi = Nn.toString, Du = Zi.call(J), Iu = Te._, Mu = rs(
          "^" + Zi.call(K).replace(Ke, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Vi = Co ? w.Buffer : i, rn = w.Symbol, Qi = w.Uint8Array, $o = Vi ? Vi.allocUnsafe : i, qi = Qo(J.getPrototypeOf, J), Jo = J.create, ea = Nn.propertyIsEnumerable, Ki = Yi.splice, ta = rn ? rn.isConcatSpreadable : i, ai = rn ? rn.iterator : i, wn = rn ? rn.toStringTag : i, $i = function() {
          try {
            var e = Sn(J, "defineProperty");
            return e({}, "", {}), e;
          } catch {
          }
        }(), Ru = w.clearTimeout !== Te.clearTimeout && w.clearTimeout, Lu = O && O.now !== Te.Date.now && O.now, Cu = w.setTimeout !== Te.setTimeout && w.setTimeout, Ji = we.ceil, er = we.floor, ss = J.getOwnPropertySymbols, Bu = Vi ? Vi.isBuffer : i, na = w.isFinite, zu = Yi.join, Gu = Qo(J.keys, J), ve = we.max, Me = we.min, Fu = O.now, Uu = w.parseInt, ia = we.random, ku = Yi.reverse, os = Sn(w, "DataView"), li = Sn(w, "Map"), as = Sn(w, "Promise"), Hn = Sn(w, "Set"), ci = Sn(w, "WeakMap"), ui = Sn(J, "create"), tr = ci && new ci(), Yn = {}, Wu = xn(os), Nu = xn(li), Hu = xn(as), Yu = xn(Hn), ju = xn(ci), nr = rn ? rn.prototype : i, hi = nr ? nr.valueOf : i, ra = nr ? nr.toString : i;
        function l(e) {
          if (fe(e) && !G(e) && !(e instanceof H)) {
            if (e instanceof ct)
              return e;
            if (K.call(e, "__wrapped__"))
              return sl(e);
          }
          return new ct(e);
        }
        var jn = /* @__PURE__ */ function() {
          function e() {
          }
          return function(t) {
            if (!le(t))
              return {};
            if (Jo)
              return Jo(t);
            e.prototype = t;
            var n = new e();
            return e.prototype = i, n;
          };
        }();
        function ir() {
        }
        function ct(e, t) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
        }
        l.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: fo,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: Wr,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: si,
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
        }, l.prototype = ir.prototype, l.prototype.constructor = l, ct.prototype = jn(ir.prototype), ct.prototype.constructor = ct;
        function H(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = be, this.__views__ = [];
        }
        function Zu() {
          var e = new H(this.__wrapped__);
          return e.__actions__ = He(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = He(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = He(this.__views__), e;
        }
        function Xu() {
          if (this.__filtered__) {
            var e = new H(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else
            e = this.clone(), e.__dir__ *= -1;
          return e;
        }
        function Vu() {
          var e = this.__wrapped__.value(), t = this.__dir__, n = G(e), s = t < 0, o = n ? e.length : 0, c = af(0, o, this.__views__), u = c.start, f = c.end, _ = f - u, b = s ? f : u - 1, y = this.__iteratees__, x = y.length, A = 0, I = Me(_, this.__takeCount__);
          if (!n || !s && o == _ && I == _)
            return Oa(e, this.__actions__);
          var C = [];
          e:
            for (; _-- && A < I; ) {
              b += t;
              for (var U = -1, B = e[b]; ++U < x; ) {
                var N = y[U], Y = N.iteratee, nt = N.type, Ue = Y(B);
                if (nt == xe)
                  B = Ue;
                else if (!Ue) {
                  if (nt == ze)
                    continue e;
                  break e;
                }
              }
              C[A++] = B;
            }
          return C;
        }
        H.prototype = jn(ir.prototype), H.prototype.constructor = H;
        function vn(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function Qu() {
          this.__data__ = ui ? ui(null) : {}, this.size = 0;
        }
        function qu(e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }
        function Ku(e) {
          var t = this.__data__;
          if (ui) {
            var n = t[e];
            return n === R ? i : n;
          }
          return K.call(t, e) ? t[e] : i;
        }
        function $u(e) {
          var t = this.__data__;
          return ui ? t[e] !== i : K.call(t, e);
        }
        function Ju(e, t) {
          var n = this.__data__;
          return this.size += this.has(e) ? 0 : 1, n[e] = ui && t === i ? R : t, this;
        }
        vn.prototype.clear = Qu, vn.prototype.delete = qu, vn.prototype.get = Ku, vn.prototype.has = $u, vn.prototype.set = Ju;
        function Ct(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function eh() {
          this.__data__ = [], this.size = 0;
        }
        function th(e) {
          var t = this.__data__, n = rr(t, e);
          if (n < 0)
            return !1;
          var s = t.length - 1;
          return n == s ? t.pop() : Ki.call(t, n, 1), --this.size, !0;
        }
        function nh(e) {
          var t = this.__data__, n = rr(t, e);
          return n < 0 ? i : t[n][1];
        }
        function ih(e) {
          return rr(this.__data__, e) > -1;
        }
        function rh(e, t) {
          var n = this.__data__, s = rr(n, e);
          return s < 0 ? (++this.size, n.push([e, t])) : n[s][1] = t, this;
        }
        Ct.prototype.clear = eh, Ct.prototype.delete = th, Ct.prototype.get = nh, Ct.prototype.has = ih, Ct.prototype.set = rh;
        function Bt(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var s = e[t];
            this.set(s[0], s[1]);
          }
        }
        function sh() {
          this.size = 0, this.__data__ = {
            hash: new vn(),
            map: new (li || Ct)(),
            string: new vn()
          };
        }
        function oh(e) {
          var t = _r(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }
        function ah(e) {
          return _r(this, e).get(e);
        }
        function lh(e) {
          return _r(this, e).has(e);
        }
        function ch(e, t) {
          var n = _r(this, e), s = n.size;
          return n.set(e, t), this.size += n.size == s ? 0 : 1, this;
        }
        Bt.prototype.clear = sh, Bt.prototype.delete = oh, Bt.prototype.get = ah, Bt.prototype.has = lh, Bt.prototype.set = ch;
        function bn(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.__data__ = new Bt(); ++t < n; )
            this.add(e[t]);
        }
        function uh(e) {
          return this.__data__.set(e, R), this;
        }
        function hh(e) {
          return this.__data__.has(e);
        }
        bn.prototype.add = bn.prototype.push = uh, bn.prototype.has = hh;
        function vt(e) {
          var t = this.__data__ = new Ct(e);
          this.size = t.size;
        }
        function fh() {
          this.__data__ = new Ct(), this.size = 0;
        }
        function dh(e) {
          var t = this.__data__, n = t.delete(e);
          return this.size = t.size, n;
        }
        function ph(e) {
          return this.__data__.get(e);
        }
        function gh(e) {
          return this.__data__.has(e);
        }
        function _h(e, t) {
          var n = this.__data__;
          if (n instanceof Ct) {
            var s = n.__data__;
            if (!li || s.length < h - 1)
              return s.push([e, t]), this.size = ++n.size, this;
            n = this.__data__ = new Bt(s);
          }
          return n.set(e, t), this.size = n.size, this;
        }
        vt.prototype.clear = fh, vt.prototype.delete = dh, vt.prototype.get = ph, vt.prototype.has = gh, vt.prototype.set = _h;
        function sa(e, t) {
          var n = G(e), s = !n && An(e), o = !n && !s && cn(e), c = !n && !s && !o && Qn(e), u = n || s || o || c, f = u ? ts(e.length, Tu) : [], _ = f.length;
          for (var b in e)
            (t || K.call(e, b)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
            (b == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            o && (b == "offset" || b == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            c && (b == "buffer" || b == "byteLength" || b == "byteOffset") || // Skip index properties.
            Ut(b, _))) && f.push(b);
          return f;
        }
        function oa(e) {
          var t = e.length;
          return t ? e[ws(0, t - 1)] : i;
        }
        function mh(e, t) {
          return mr(He(e), yn(t, 0, e.length));
        }
        function wh(e) {
          return mr(He(e));
        }
        function ls(e, t, n) {
          (n !== i && !bt(e[t], n) || n === i && !(t in e)) && zt(e, t, n);
        }
        function fi(e, t, n) {
          var s = e[t];
          (!(K.call(e, t) && bt(s, n)) || n === i && !(t in e)) && zt(e, t, n);
        }
        function rr(e, t) {
          for (var n = e.length; n--; )
            if (bt(e[n][0], t))
              return n;
          return -1;
        }
        function vh(e, t, n, s) {
          return sn(e, function(o, c, u) {
            t(s, o, n(o), u);
          }), s;
        }
        function aa(e, t) {
          return e && Tt(t, Ee(t), e);
        }
        function bh(e, t) {
          return e && Tt(t, je(t), e);
        }
        function zt(e, t, n) {
          t == "__proto__" && $i ? $i(e, t, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : e[t] = n;
        }
        function cs(e, t) {
          for (var n = -1, s = t.length, o = m(s), c = e == null; ++n < s; )
            o[n] = c ? i : Hs(e, t[n]);
          return o;
        }
        function yn(e, t, n) {
          return e === e && (n !== i && (e = e <= n ? e : n), t !== i && (e = e >= t ? e : t)), e;
        }
        function ut(e, t, n, s, o, c) {
          var u, f = t & ue, _ = t & Oe, b = t & De;
          if (n && (u = o ? n(e, s, o, c) : n(e)), u !== i)
            return u;
          if (!le(e))
            return e;
          var y = G(e);
          if (y) {
            if (u = cf(e), !f)
              return He(e, u);
          } else {
            var x = Re(e), A = x == Rn || x == Ii;
            if (cn(e))
              return Ma(e, f);
            if (x == gt || x == Qt || A && !o) {
              if (u = _ || A ? {} : qa(e), !f)
                return _ ? Kh(e, bh(u, e)) : qh(e, aa(u, e));
            } else {
              if (!ne[x])
                return o ? e : {};
              u = uf(e, x, f);
            }
          }
          c || (c = new vt());
          var I = c.get(e);
          if (I)
            return I;
          c.set(e, u), Al(e) ? e.forEach(function(B) {
            u.add(ut(B, t, n, B, e, c));
          }) : Sl(e) && e.forEach(function(B, N) {
            u.set(N, ut(B, t, n, N, e, c));
          });
          var C = b ? _ ? Ds : Os : _ ? je : Ee, U = y ? i : C(e);
          return at(U || e, function(B, N) {
            U && (N = B, B = e[N]), fi(u, N, ut(B, t, n, N, e, c));
          }), u;
        }
        function yh(e) {
          var t = Ee(e);
          return function(n) {
            return la(n, e, t);
          };
        }
        function la(e, t, n) {
          var s = n.length;
          if (e == null)
            return !s;
          for (e = J(e); s--; ) {
            var o = n[s], c = t[o], u = e[o];
            if (u === i && !(o in e) || !c(u))
              return !1;
          }
          return !0;
        }
        function ca(e, t, n) {
          if (typeof e != "function")
            throw new lt(p);
          return vi(function() {
            e.apply(i, n);
          }, t);
        }
        function di(e, t, n, s) {
          var o = -1, c = Wi, u = !0, f = e.length, _ = [], b = t.length;
          if (!f)
            return _;
          n && (t = oe(t, Je(n))), s ? (c = Qr, u = !1) : t.length >= h && (c = oi, u = !1, t = new bn(t));
          e:
            for (; ++o < f; ) {
              var y = e[o], x = n == null ? y : n(y);
              if (y = s || y !== 0 ? y : 0, u && x === x) {
                for (var A = b; A--; )
                  if (t[A] === x)
                    continue e;
                _.push(y);
              } else c(t, x, s) || _.push(y);
            }
          return _;
        }
        var sn = za(At), ua = za(hs, !0);
        function Eh(e, t) {
          var n = !0;
          return sn(e, function(s, o, c) {
            return n = !!t(s, o, c), n;
          }), n;
        }
        function sr(e, t, n) {
          for (var s = -1, o = e.length; ++s < o; ) {
            var c = e[s], u = t(c);
            if (u != null && (f === i ? u === u && !tt(u) : n(u, f)))
              var f = u, _ = c;
          }
          return _;
        }
        function Sh(e, t, n, s) {
          var o = e.length;
          for (n = F(n), n < 0 && (n = -n > o ? 0 : o + n), s = s === i || s > o ? o : F(s), s < 0 && (s += o), s = n > s ? 0 : Pl(s); n < s; )
            e[n++] = t;
          return e;
        }
        function ha(e, t) {
          var n = [];
          return sn(e, function(s, o, c) {
            t(s, o, c) && n.push(s);
          }), n;
        }
        function Pe(e, t, n, s, o) {
          var c = -1, u = e.length;
          for (n || (n = ff), o || (o = []); ++c < u; ) {
            var f = e[c];
            t > 0 && n(f) ? t > 1 ? Pe(f, t - 1, n, s, o) : tn(o, f) : s || (o[o.length] = f);
          }
          return o;
        }
        var us = Ga(), fa = Ga(!0);
        function At(e, t) {
          return e && us(e, t, Ee);
        }
        function hs(e, t) {
          return e && fa(e, t, Ee);
        }
        function or(e, t) {
          return en(t, function(n) {
            return kt(e[n]);
          });
        }
        function En(e, t) {
          t = an(t, e);
          for (var n = 0, s = t.length; e != null && n < s; )
            e = e[Pt(t[n++])];
          return n && n == s ? e : i;
        }
        function da(e, t, n) {
          var s = t(e);
          return G(e) ? s : tn(s, n(e));
        }
        function Ge(e) {
          return e == null ? e === i ? Ci : Mi : wn && wn in J(e) ? of(e) : vf(e);
        }
        function fs(e, t) {
          return e > t;
        }
        function xh(e, t) {
          return e != null && K.call(e, t);
        }
        function Ah(e, t) {
          return e != null && t in J(e);
        }
        function Th(e, t, n) {
          return e >= Me(t, n) && e < ve(t, n);
        }
        function ds(e, t, n) {
          for (var s = n ? Qr : Wi, o = e[0].length, c = e.length, u = c, f = m(c), _ = 1 / 0, b = []; u--; ) {
            var y = e[u];
            u && t && (y = oe(y, Je(t))), _ = Me(y.length, _), f[u] = !n && (t || o >= 120 && y.length >= 120) ? new bn(u && y) : i;
          }
          y = e[0];
          var x = -1, A = f[0];
          e:
            for (; ++x < o && b.length < _; ) {
              var I = y[x], C = t ? t(I) : I;
              if (I = n || I !== 0 ? I : 0, !(A ? oi(A, C) : s(b, C, n))) {
                for (u = c; --u; ) {
                  var U = f[u];
                  if (!(U ? oi(U, C) : s(e[u], C, n)))
                    continue e;
                }
                A && A.push(C), b.push(I);
              }
            }
          return b;
        }
        function Ph(e, t, n, s) {
          return At(e, function(o, c, u) {
            t(s, n(o), c, u);
          }), s;
        }
        function pi(e, t, n) {
          t = an(t, e), e = el(e, t);
          var s = e == null ? e : e[Pt(ft(t))];
          return s == null ? i : $e(s, e, n);
        }
        function pa(e) {
          return fe(e) && Ge(e) == Qt;
        }
        function Oh(e) {
          return fe(e) && Ge(e) == $t;
        }
        function Dh(e) {
          return fe(e) && Ge(e) == qt;
        }
        function gi(e, t, n, s, o) {
          return e === t ? !0 : e == null || t == null || !fe(e) && !fe(t) ? e !== e && t !== t : Ih(e, t, n, s, gi, o);
        }
        function Ih(e, t, n, s, o, c) {
          var u = G(e), f = G(t), _ = u ? Mn : Re(e), b = f ? Mn : Re(t);
          _ = _ == Qt ? gt : _, b = b == Qt ? gt : b;
          var y = _ == gt, x = b == gt, A = _ == b;
          if (A && cn(e)) {
            if (!cn(t))
              return !1;
            u = !0, y = !1;
          }
          if (A && !y)
            return c || (c = new vt()), u || Qn(e) ? Xa(e, t, n, s, o, c) : rf(e, t, _, n, s, o, c);
          if (!(n & me)) {
            var I = y && K.call(e, "__wrapped__"), C = x && K.call(t, "__wrapped__");
            if (I || C) {
              var U = I ? e.value() : e, B = C ? t.value() : t;
              return c || (c = new vt()), o(U, B, n, s, c);
            }
          }
          return A ? (c || (c = new vt()), sf(e, t, n, s, o, c)) : !1;
        }
        function Mh(e) {
          return fe(e) && Re(e) == We;
        }
        function ps(e, t, n, s) {
          var o = n.length, c = o, u = !s;
          if (e == null)
            return !c;
          for (e = J(e); o--; ) {
            var f = n[o];
            if (u && f[2] ? f[1] !== e[f[0]] : !(f[0] in e))
              return !1;
          }
          for (; ++o < c; ) {
            f = n[o];
            var _ = f[0], b = e[_], y = f[1];
            if (u && f[2]) {
              if (b === i && !(_ in e))
                return !1;
            } else {
              var x = new vt();
              if (s)
                var A = s(b, y, _, e, t, x);
              if (!(A === i ? gi(y, b, me | he, s, x) : A))
                return !1;
            }
          }
          return !0;
        }
        function ga(e) {
          if (!le(e) || pf(e))
            return !1;
          var t = kt(e) ? Mu : yc;
          return t.test(xn(e));
        }
        function Rh(e) {
          return fe(e) && Ge(e) == Lt;
        }
        function Lh(e) {
          return fe(e) && Re(e) == Ae;
        }
        function Ch(e) {
          return fe(e) && Sr(e.length) && !!re[Ge(e)];
        }
        function _a(e) {
          return typeof e == "function" ? e : e == null ? Ze : typeof e == "object" ? G(e) ? va(e[0], e[1]) : wa(e) : Fl(e);
        }
        function gs(e) {
          if (!wi(e))
            return Gu(e);
          var t = [];
          for (var n in J(e))
            K.call(e, n) && n != "constructor" && t.push(n);
          return t;
        }
        function Bh(e) {
          if (!le(e))
            return wf(e);
          var t = wi(e), n = [];
          for (var s in e)
            s == "constructor" && (t || !K.call(e, s)) || n.push(s);
          return n;
        }
        function _s(e, t) {
          return e < t;
        }
        function ma(e, t) {
          var n = -1, s = Ye(e) ? m(e.length) : [];
          return sn(e, function(o, c, u) {
            s[++n] = t(o, c, u);
          }), s;
        }
        function wa(e) {
          var t = Ms(e);
          return t.length == 1 && t[0][2] ? $a(t[0][0], t[0][1]) : function(n) {
            return n === e || ps(n, e, t);
          };
        }
        function va(e, t) {
          return Ls(e) && Ka(t) ? $a(Pt(e), t) : function(n) {
            var s = Hs(n, e);
            return s === i && s === t ? Ys(n, e) : gi(t, s, me | he);
          };
        }
        function ar(e, t, n, s, o) {
          e !== t && us(t, function(c, u) {
            if (o || (o = new vt()), le(c))
              zh(e, t, u, n, ar, s, o);
            else {
              var f = s ? s(Bs(e, u), c, u + "", e, t, o) : i;
              f === i && (f = c), ls(e, u, f);
            }
          }, je);
        }
        function zh(e, t, n, s, o, c, u) {
          var f = Bs(e, n), _ = Bs(t, n), b = u.get(_);
          if (b) {
            ls(e, n, b);
            return;
          }
          var y = c ? c(f, _, n + "", e, t, u) : i, x = y === i;
          if (x) {
            var A = G(_), I = !A && cn(_), C = !A && !I && Qn(_);
            y = _, A || I || C ? G(f) ? y = f : de(f) ? y = He(f) : I ? (x = !1, y = Ma(_, !0)) : C ? (x = !1, y = Ra(_, !0)) : y = [] : bi(_) || An(_) ? (y = f, An(f) ? y = Ol(f) : (!le(f) || kt(f)) && (y = qa(_))) : x = !1;
          }
          x && (u.set(_, y), o(y, _, s, c, u), u.delete(_)), ls(e, n, y);
        }
        function ba(e, t) {
          var n = e.length;
          if (n)
            return t += t < 0 ? n : 0, Ut(t, n) ? e[t] : i;
        }
        function ya(e, t, n) {
          t.length ? t = oe(t, function(c) {
            return G(c) ? function(u) {
              return En(u, c.length === 1 ? c[0] : c);
            } : c;
          }) : t = [Ze];
          var s = -1;
          t = oe(t, Je(L()));
          var o = ma(e, function(c, u, f) {
            var _ = oe(t, function(b) {
              return b(c);
            });
            return { criteria: _, index: ++s, value: c };
          });
          return cu(o, function(c, u) {
            return Qh(c, u, n);
          });
        }
        function Gh(e, t) {
          return Ea(e, t, function(n, s) {
            return Ys(e, s);
          });
        }
        function Ea(e, t, n) {
          for (var s = -1, o = t.length, c = {}; ++s < o; ) {
            var u = t[s], f = En(e, u);
            n(f, u) && _i(c, an(u, e), f);
          }
          return c;
        }
        function Fh(e) {
          return function(t) {
            return En(t, e);
          };
        }
        function ms(e, t, n, s) {
          var o = s ? lu : Fn, c = -1, u = t.length, f = e;
          for (e === t && (t = He(t)), n && (f = oe(e, Je(n))); ++c < u; )
            for (var _ = 0, b = t[c], y = n ? n(b) : b; (_ = o(f, y, _, s)) > -1; )
              f !== e && Ki.call(f, _, 1), Ki.call(e, _, 1);
          return e;
        }
        function Sa(e, t) {
          for (var n = e ? t.length : 0, s = n - 1; n--; ) {
            var o = t[n];
            if (n == s || o !== c) {
              var c = o;
              Ut(o) ? Ki.call(e, o, 1) : ys(e, o);
            }
          }
          return e;
        }
        function ws(e, t) {
          return e + er(ia() * (t - e + 1));
        }
        function Uh(e, t, n, s) {
          for (var o = -1, c = ve(Ji((t - e) / (n || 1)), 0), u = m(c); c--; )
            u[s ? c : ++o] = e, e += n;
          return u;
        }
        function vs(e, t) {
          var n = "";
          if (!e || t < 1 || t > Ie)
            return n;
          do
            t % 2 && (n += e), t = er(t / 2), t && (e += e);
          while (t);
          return n;
        }
        function k(e, t) {
          return zs(Ja(e, t, Ze), e + "");
        }
        function kh(e) {
          return oa(qn(e));
        }
        function Wh(e, t) {
          var n = qn(e);
          return mr(n, yn(t, 0, n.length));
        }
        function _i(e, t, n, s) {
          if (!le(e))
            return e;
          t = an(t, e);
          for (var o = -1, c = t.length, u = c - 1, f = e; f != null && ++o < c; ) {
            var _ = Pt(t[o]), b = n;
            if (_ === "__proto__" || _ === "constructor" || _ === "prototype")
              return e;
            if (o != u) {
              var y = f[_];
              b = s ? s(y, _, f) : i, b === i && (b = le(y) ? y : Ut(t[o + 1]) ? [] : {});
            }
            fi(f, _, b), f = f[_];
          }
          return e;
        }
        var xa = tr ? function(e, t) {
          return tr.set(e, t), e;
        } : Ze, Nh = $i ? function(e, t) {
          return $i(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Zs(t),
            writable: !0
          });
        } : Ze;
        function Hh(e) {
          return mr(qn(e));
        }
        function ht(e, t, n) {
          var s = -1, o = e.length;
          t < 0 && (t = -t > o ? 0 : o + t), n = n > o ? o : n, n < 0 && (n += o), o = t > n ? 0 : n - t >>> 0, t >>>= 0;
          for (var c = m(o); ++s < o; )
            c[s] = e[s + t];
          return c;
        }
        function Yh(e, t) {
          var n;
          return sn(e, function(s, o, c) {
            return n = t(s, o, c), !n;
          }), !!n;
        }
        function lr(e, t, n) {
          var s = 0, o = e == null ? s : e.length;
          if (typeof t == "number" && t === t && o <= Dn) {
            for (; s < o; ) {
              var c = s + o >>> 1, u = e[c];
              u !== null && !tt(u) && (n ? u <= t : u < t) ? s = c + 1 : o = c;
            }
            return o;
          }
          return bs(e, t, Ze, n);
        }
        function bs(e, t, n, s) {
          var o = 0, c = e == null ? 0 : e.length;
          if (c === 0)
            return 0;
          t = n(t);
          for (var u = t !== t, f = t === null, _ = tt(t), b = t === i; o < c; ) {
            var y = er((o + c) / 2), x = n(e[y]), A = x !== i, I = x === null, C = x === x, U = tt(x);
            if (u)
              var B = s || C;
            else b ? B = C && (s || A) : f ? B = C && A && (s || !I) : _ ? B = C && A && !I && (s || !U) : I || U ? B = !1 : B = s ? x <= t : x < t;
            B ? o = y + 1 : c = y;
          }
          return Me(c, Vt);
        }
        function Aa(e, t) {
          for (var n = -1, s = e.length, o = 0, c = []; ++n < s; ) {
            var u = e[n], f = t ? t(u) : u;
            if (!n || !bt(f, _)) {
              var _ = f;
              c[o++] = u === 0 ? 0 : u;
            }
          }
          return c;
        }
        function Ta(e) {
          return typeof e == "number" ? e : tt(e) ? qe : +e;
        }
        function et(e) {
          if (typeof e == "string")
            return e;
          if (G(e))
            return oe(e, et) + "";
          if (tt(e))
            return ra ? ra.call(e) : "";
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function on(e, t, n) {
          var s = -1, o = Wi, c = e.length, u = !0, f = [], _ = f;
          if (n)
            u = !1, o = Qr;
          else if (c >= h) {
            var b = t ? null : tf(e);
            if (b)
              return Hi(b);
            u = !1, o = oi, _ = new bn();
          } else
            _ = t ? [] : f;
          e:
            for (; ++s < c; ) {
              var y = e[s], x = t ? t(y) : y;
              if (y = n || y !== 0 ? y : 0, u && x === x) {
                for (var A = _.length; A--; )
                  if (_[A] === x)
                    continue e;
                t && _.push(x), f.push(y);
              } else o(_, x, n) || (_ !== f && _.push(x), f.push(y));
            }
          return f;
        }
        function ys(e, t) {
          return t = an(t, e), e = el(e, t), e == null || delete e[Pt(ft(t))];
        }
        function Pa(e, t, n, s) {
          return _i(e, t, n(En(e, t)), s);
        }
        function cr(e, t, n, s) {
          for (var o = e.length, c = s ? o : -1; (s ? c-- : ++c < o) && t(e[c], c, e); )
            ;
          return n ? ht(e, s ? 0 : c, s ? c + 1 : o) : ht(e, s ? c + 1 : 0, s ? o : c);
        }
        function Oa(e, t) {
          var n = e;
          return n instanceof H && (n = n.value()), qr(t, function(s, o) {
            return o.func.apply(o.thisArg, tn([s], o.args));
          }, n);
        }
        function Es(e, t, n) {
          var s = e.length;
          if (s < 2)
            return s ? on(e[0]) : [];
          for (var o = -1, c = m(s); ++o < s; )
            for (var u = e[o], f = -1; ++f < s; )
              f != o && (c[o] = di(c[o] || u, e[f], t, n));
          return on(Pe(c, 1), t, n);
        }
        function Da(e, t, n) {
          for (var s = -1, o = e.length, c = t.length, u = {}; ++s < o; ) {
            var f = s < c ? t[s] : i;
            n(u, e[s], f);
          }
          return u;
        }
        function Ss(e) {
          return de(e) ? e : [];
        }
        function xs(e) {
          return typeof e == "function" ? e : Ze;
        }
        function an(e, t) {
          return G(e) ? e : Ls(e, t) ? [e] : rl(X(e));
        }
        var jh = k;
        function ln(e, t, n) {
          var s = e.length;
          return n = n === i ? s : n, !t && n >= s ? e : ht(e, t, n);
        }
        var Ia = Ru || function(e) {
          return Te.clearTimeout(e);
        };
        function Ma(e, t) {
          if (t)
            return e.slice();
          var n = e.length, s = $o ? $o(n) : new e.constructor(n);
          return e.copy(s), s;
        }
        function As(e) {
          var t = new e.constructor(e.byteLength);
          return new Qi(t).set(new Qi(e)), t;
        }
        function Zh(e, t) {
          var n = t ? As(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.byteLength);
        }
        function Xh(e) {
          var t = new e.constructor(e.source, po.exec(e));
          return t.lastIndex = e.lastIndex, t;
        }
        function Vh(e) {
          return hi ? J(hi.call(e)) : {};
        }
        function Ra(e, t) {
          var n = t ? As(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        }
        function La(e, t) {
          if (e !== t) {
            var n = e !== i, s = e === null, o = e === e, c = tt(e), u = t !== i, f = t === null, _ = t === t, b = tt(t);
            if (!f && !b && !c && e > t || c && u && _ && !f && !b || s && u && _ || !n && _ || !o)
              return 1;
            if (!s && !c && !b && e < t || b && n && o && !s && !c || f && n && o || !u && o || !_)
              return -1;
          }
          return 0;
        }
        function Qh(e, t, n) {
          for (var s = -1, o = e.criteria, c = t.criteria, u = o.length, f = n.length; ++s < u; ) {
            var _ = La(o[s], c[s]);
            if (_) {
              if (s >= f)
                return _;
              var b = n[s];
              return _ * (b == "desc" ? -1 : 1);
            }
          }
          return e.index - t.index;
        }
        function Ca(e, t, n, s) {
          for (var o = -1, c = e.length, u = n.length, f = -1, _ = t.length, b = ve(c - u, 0), y = m(_ + b), x = !s; ++f < _; )
            y[f] = t[f];
          for (; ++o < u; )
            (x || o < c) && (y[n[o]] = e[o]);
          for (; b--; )
            y[f++] = e[o++];
          return y;
        }
        function Ba(e, t, n, s) {
          for (var o = -1, c = e.length, u = -1, f = n.length, _ = -1, b = t.length, y = ve(c - f, 0), x = m(y + b), A = !s; ++o < y; )
            x[o] = e[o];
          for (var I = o; ++_ < b; )
            x[I + _] = t[_];
          for (; ++u < f; )
            (A || o < c) && (x[I + n[u]] = e[o++]);
          return x;
        }
        function He(e, t) {
          var n = -1, s = e.length;
          for (t || (t = m(s)); ++n < s; )
            t[n] = e[n];
          return t;
        }
        function Tt(e, t, n, s) {
          var o = !n;
          n || (n = {});
          for (var c = -1, u = t.length; ++c < u; ) {
            var f = t[c], _ = s ? s(n[f], e[f], f, n, e) : i;
            _ === i && (_ = e[f]), o ? zt(n, f, _) : fi(n, f, _);
          }
          return n;
        }
        function qh(e, t) {
          return Tt(e, Rs(e), t);
        }
        function Kh(e, t) {
          return Tt(e, Va(e), t);
        }
        function ur(e, t) {
          return function(n, s) {
            var o = G(n) ? nu : vh, c = t ? t() : {};
            return o(n, e, L(s, 2), c);
          };
        }
        function Zn(e) {
          return k(function(t, n) {
            var s = -1, o = n.length, c = o > 1 ? n[o - 1] : i, u = o > 2 ? n[2] : i;
            for (c = e.length > 3 && typeof c == "function" ? (o--, c) : i, u && Fe(n[0], n[1], u) && (c = o < 3 ? i : c, o = 1), t = J(t); ++s < o; ) {
              var f = n[s];
              f && e(t, f, s, c);
            }
            return t;
          });
        }
        function za(e, t) {
          return function(n, s) {
            if (n == null)
              return n;
            if (!Ye(n))
              return e(n, s);
            for (var o = n.length, c = t ? o : -1, u = J(n); (t ? c-- : ++c < o) && s(u[c], c, u) !== !1; )
              ;
            return n;
          };
        }
        function Ga(e) {
          return function(t, n, s) {
            for (var o = -1, c = J(t), u = s(t), f = u.length; f--; ) {
              var _ = u[e ? f : ++o];
              if (n(c[_], _, c) === !1)
                break;
            }
            return t;
          };
        }
        function $h(e, t, n) {
          var s = t & $, o = mi(e);
          function c() {
            var u = this && this !== Te && this instanceof c ? o : e;
            return u.apply(s ? n : this, arguments);
          }
          return c;
        }
        function Fa(e) {
          return function(t) {
            t = X(t);
            var n = Un(t) ? wt(t) : i, s = n ? n[0] : t.charAt(0), o = n ? ln(n, 1).join("") : t.slice(1);
            return s[e]() + o;
          };
        }
        function Xn(e) {
          return function(t) {
            return qr(zl(Bl(t).replace(Nc, "")), e, "");
          };
        }
        function mi(e) {
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
            var n = jn(e.prototype), s = e.apply(n, t);
            return le(s) ? s : n;
          };
        }
        function Jh(e, t, n) {
          var s = mi(e);
          function o() {
            for (var c = arguments.length, u = m(c), f = c, _ = Vn(o); f--; )
              u[f] = arguments[f];
            var b = c < 3 && u[0] !== _ && u[c - 1] !== _ ? [] : nn(u, _);
            if (c -= b.length, c < n)
              return Ha(
                e,
                t,
                hr,
                o.placeholder,
                i,
                u,
                b,
                i,
                i,
                n - c
              );
            var y = this && this !== Te && this instanceof o ? s : e;
            return $e(y, this, u);
          }
          return o;
        }
        function Ua(e) {
          return function(t, n, s) {
            var o = J(t);
            if (!Ye(t)) {
              var c = L(n, 3);
              t = Ee(t), n = function(f) {
                return c(o[f], f, o);
              };
            }
            var u = e(t, n, s);
            return u > -1 ? o[c ? t[u] : u] : i;
          };
        }
        function ka(e) {
          return Ft(function(t) {
            var n = t.length, s = n, o = ct.prototype.thru;
            for (e && t.reverse(); s--; ) {
              var c = t[s];
              if (typeof c != "function")
                throw new lt(p);
              if (o && !u && gr(c) == "wrapper")
                var u = new ct([], !0);
            }
            for (s = u ? s : n; ++s < n; ) {
              c = t[s];
              var f = gr(c), _ = f == "wrapper" ? Is(c) : i;
              _ && Cs(_[0]) && _[1] == (Q | V | te | Ve) && !_[4].length && _[9] == 1 ? u = u[gr(_[0])].apply(u, _[3]) : u = c.length == 1 && Cs(c) ? u[f]() : u.thru(c);
            }
            return function() {
              var b = arguments, y = b[0];
              if (u && b.length == 1 && G(y))
                return u.plant(y).value();
              for (var x = 0, A = n ? t[x].apply(this, b) : y; ++x < n; )
                A = t[x].call(this, A);
              return A;
            };
          });
        }
        function hr(e, t, n, s, o, c, u, f, _, b) {
          var y = t & Q, x = t & $, A = t & se, I = t & (V | Be), C = t & Mt, U = A ? i : mi(e);
          function B() {
            for (var N = arguments.length, Y = m(N), nt = N; nt--; )
              Y[nt] = arguments[nt];
            if (I)
              var Ue = Vn(B), it = hu(Y, Ue);
            if (s && (Y = Ca(Y, s, o, I)), c && (Y = Ba(Y, c, u, I)), N -= it, I && N < b) {
              var pe = nn(Y, Ue);
              return Ha(
                e,
                t,
                hr,
                B.placeholder,
                n,
                Y,
                pe,
                f,
                _,
                b - N
              );
            }
            var yt = x ? n : this, Nt = A ? yt[e] : e;
            return N = Y.length, f ? Y = bf(Y, f) : C && N > 1 && Y.reverse(), y && _ < N && (Y.length = _), this && this !== Te && this instanceof B && (Nt = U || mi(Nt)), Nt.apply(yt, Y);
          }
          return B;
        }
        function Wa(e, t) {
          return function(n, s) {
            return Ph(n, e, t(s), {});
          };
        }
        function fr(e, t) {
          return function(n, s) {
            var o;
            if (n === i && s === i)
              return t;
            if (n !== i && (o = n), s !== i) {
              if (o === i)
                return s;
              typeof n == "string" || typeof s == "string" ? (n = et(n), s = et(s)) : (n = Ta(n), s = Ta(s)), o = e(n, s);
            }
            return o;
          };
        }
        function Ts(e) {
          return Ft(function(t) {
            return t = oe(t, Je(L())), k(function(n) {
              var s = this;
              return e(t, function(o) {
                return $e(o, s, n);
              });
            });
          });
        }
        function dr(e, t) {
          t = t === i ? " " : et(t);
          var n = t.length;
          if (n < 2)
            return n ? vs(t, e) : t;
          var s = vs(t, Ji(e / kn(t)));
          return Un(t) ? ln(wt(s), 0, e).join("") : s.slice(0, e);
        }
        function ef(e, t, n, s) {
          var o = t & $, c = mi(e);
          function u() {
            for (var f = -1, _ = arguments.length, b = -1, y = s.length, x = m(y + _), A = this && this !== Te && this instanceof u ? c : e; ++b < y; )
              x[b] = s[b];
            for (; _--; )
              x[b++] = arguments[++f];
            return $e(A, o ? n : this, x);
          }
          return u;
        }
        function Na(e) {
          return function(t, n, s) {
            return s && typeof s != "number" && Fe(t, n, s) && (n = s = i), t = Wt(t), n === i ? (n = t, t = 0) : n = Wt(n), s = s === i ? t < n ? 1 : -1 : Wt(s), Uh(t, n, s, e);
          };
        }
        function pr(e) {
          return function(t, n) {
            return typeof t == "string" && typeof n == "string" || (t = dt(t), n = dt(n)), e(t, n);
          };
        }
        function Ha(e, t, n, s, o, c, u, f, _, b) {
          var y = t & V, x = y ? u : i, A = y ? i : u, I = y ? c : i, C = y ? i : c;
          t |= y ? te : st, t &= ~(y ? st : te), t & ie || (t &= -4);
          var U = [
            e,
            t,
            o,
            I,
            x,
            C,
            A,
            f,
            _,
            b
          ], B = n.apply(i, U);
          return Cs(e) && tl(B, U), B.placeholder = s, nl(B, e, t);
        }
        function Ps(e) {
          var t = we[e];
          return function(n, s) {
            if (n = dt(n), s = s == null ? 0 : Me(F(s), 292), s && na(n)) {
              var o = (X(n) + "e").split("e"), c = t(o[0] + "e" + (+o[1] + s));
              return o = (X(c) + "e").split("e"), +(o[0] + "e" + (+o[1] - s));
            }
            return t(n);
          };
        }
        var tf = Hn && 1 / Hi(new Hn([, -0]))[1] == ge ? function(e) {
          return new Hn(e);
        } : Qs;
        function Ya(e) {
          return function(t) {
            var n = Re(t);
            return n == We ? is(t) : n == Ae ? wu(t) : uu(t, e(t));
          };
        }
        function Gt(e, t, n, s, o, c, u, f) {
          var _ = t & se;
          if (!_ && typeof e != "function")
            throw new lt(p);
          var b = s ? s.length : 0;
          if (b || (t &= -97, s = o = i), u = u === i ? u : ve(F(u), 0), f = f === i ? f : F(f), b -= o ? o.length : 0, t & st) {
            var y = s, x = o;
            s = o = i;
          }
          var A = _ ? i : Is(e), I = [
            e,
            t,
            n,
            s,
            o,
            y,
            x,
            c,
            u,
            f
          ];
          if (A && mf(I, A), e = I[0], t = I[1], n = I[2], s = I[3], o = I[4], f = I[9] = I[9] === i ? _ ? 0 : e.length : ve(I[9] - b, 0), !f && t & (V | Be) && (t &= -25), !t || t == $)
            var C = $h(e, t, n);
          else t == V || t == Be ? C = Jh(e, t, f) : (t == te || t == ($ | te)) && !o.length ? C = ef(e, t, n, s) : C = hr.apply(i, I);
          var U = A ? xa : tl;
          return nl(U(C, I), e, t);
        }
        function ja(e, t, n, s) {
          return e === i || bt(e, Nn[n]) && !K.call(s, n) ? t : e;
        }
        function Za(e, t, n, s, o, c) {
          return le(e) && le(t) && (c.set(t, e), ar(e, t, i, Za, c), c.delete(t)), e;
        }
        function nf(e) {
          return bi(e) ? i : e;
        }
        function Xa(e, t, n, s, o, c) {
          var u = n & me, f = e.length, _ = t.length;
          if (f != _ && !(u && _ > f))
            return !1;
          var b = c.get(e), y = c.get(t);
          if (b && y)
            return b == t && y == e;
          var x = -1, A = !0, I = n & he ? new bn() : i;
          for (c.set(e, t), c.set(t, e); ++x < f; ) {
            var C = e[x], U = t[x];
            if (s)
              var B = u ? s(U, C, x, t, e, c) : s(C, U, x, e, t, c);
            if (B !== i) {
              if (B)
                continue;
              A = !1;
              break;
            }
            if (I) {
              if (!Kr(t, function(N, Y) {
                if (!oi(I, Y) && (C === N || o(C, N, n, s, c)))
                  return I.push(Y);
              })) {
                A = !1;
                break;
              }
            } else if (!(C === U || o(C, U, n, s, c))) {
              A = !1;
              break;
            }
          }
          return c.delete(e), c.delete(t), A;
        }
        function rf(e, t, n, s, o, c, u) {
          switch (n) {
            case Et:
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                return !1;
              e = e.buffer, t = t.buffer;
            case $t:
              return !(e.byteLength != t.byteLength || !c(new Qi(e), new Qi(t)));
            case hn:
            case qt:
            case Kt:
              return bt(+e, +t);
            case fn:
              return e.name == t.name && e.message == t.message;
            case Lt:
            case dn:
              return e == t + "";
            case We:
              var f = is;
            case Ae:
              var _ = s & me;
              if (f || (f = Hi), e.size != t.size && !_)
                return !1;
              var b = u.get(e);
              if (b)
                return b == t;
              s |= he, u.set(e, t);
              var y = Xa(f(e), f(t), s, o, c, u);
              return u.delete(e), y;
            case Ln:
              if (hi)
                return hi.call(e) == hi.call(t);
          }
          return !1;
        }
        function sf(e, t, n, s, o, c) {
          var u = n & me, f = Os(e), _ = f.length, b = Os(t), y = b.length;
          if (_ != y && !u)
            return !1;
          for (var x = _; x--; ) {
            var A = f[x];
            if (!(u ? A in t : K.call(t, A)))
              return !1;
          }
          var I = c.get(e), C = c.get(t);
          if (I && C)
            return I == t && C == e;
          var U = !0;
          c.set(e, t), c.set(t, e);
          for (var B = u; ++x < _; ) {
            A = f[x];
            var N = e[A], Y = t[A];
            if (s)
              var nt = u ? s(Y, N, A, t, e, c) : s(N, Y, A, e, t, c);
            if (!(nt === i ? N === Y || o(N, Y, n, s, c) : nt)) {
              U = !1;
              break;
            }
            B || (B = A == "constructor");
          }
          if (U && !B) {
            var Ue = e.constructor, it = t.constructor;
            Ue != it && "constructor" in e && "constructor" in t && !(typeof Ue == "function" && Ue instanceof Ue && typeof it == "function" && it instanceof it) && (U = !1);
          }
          return c.delete(e), c.delete(t), U;
        }
        function Ft(e) {
          return zs(Ja(e, i, ll), e + "");
        }
        function Os(e) {
          return da(e, Ee, Rs);
        }
        function Ds(e) {
          return da(e, je, Va);
        }
        var Is = tr ? function(e) {
          return tr.get(e);
        } : Qs;
        function gr(e) {
          for (var t = e.name + "", n = Yn[t], s = K.call(Yn, t) ? n.length : 0; s--; ) {
            var o = n[s], c = o.func;
            if (c == null || c == e)
              return o.name;
          }
          return t;
        }
        function Vn(e) {
          var t = K.call(l, "placeholder") ? l : e;
          return t.placeholder;
        }
        function L() {
          var e = l.iteratee || Xs;
          return e = e === Xs ? _a : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function _r(e, t) {
          var n = e.__data__;
          return df(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
        }
        function Ms(e) {
          for (var t = Ee(e), n = t.length; n--; ) {
            var s = t[n], o = e[s];
            t[n] = [s, o, Ka(o)];
          }
          return t;
        }
        function Sn(e, t) {
          var n = gu(e, t);
          return ga(n) ? n : i;
        }
        function of(e) {
          var t = K.call(e, wn), n = e[wn];
          try {
            e[wn] = i;
            var s = !0;
          } catch {
          }
          var o = Xi.call(e);
          return s && (t ? e[wn] = n : delete e[wn]), o;
        }
        var Rs = ss ? function(e) {
          return e == null ? [] : (e = J(e), en(ss(e), function(t) {
            return ea.call(e, t);
          }));
        } : qs, Va = ss ? function(e) {
          for (var t = []; e; )
            tn(t, Rs(e)), e = qi(e);
          return t;
        } : qs, Re = Ge;
        (os && Re(new os(new ArrayBuffer(1))) != Et || li && Re(new li()) != We || as && Re(as.resolve()) != Ri || Hn && Re(new Hn()) != Ae || ci && Re(new ci()) != pn) && (Re = function(e) {
          var t = Ge(e), n = t == gt ? e.constructor : i, s = n ? xn(n) : "";
          if (s)
            switch (s) {
              case Wu:
                return Et;
              case Nu:
                return We;
              case Hu:
                return Ri;
              case Yu:
                return Ae;
              case ju:
                return pn;
            }
          return t;
        });
        function af(e, t, n) {
          for (var s = -1, o = n.length; ++s < o; ) {
            var c = n[s], u = c.size;
            switch (c.type) {
              case "drop":
                e += u;
                break;
              case "dropRight":
                t -= u;
                break;
              case "take":
                t = Me(t, e + u);
                break;
              case "takeRight":
                e = ve(e, t - u);
                break;
            }
          }
          return { start: e, end: t };
        }
        function lf(e) {
          var t = e.match(dc);
          return t ? t[1].split(pc) : [];
        }
        function Qa(e, t, n) {
          t = an(t, e);
          for (var s = -1, o = t.length, c = !1; ++s < o; ) {
            var u = Pt(t[s]);
            if (!(c = e != null && n(e, u)))
              break;
            e = e[u];
          }
          return c || ++s != o ? c : (o = e == null ? 0 : e.length, !!o && Sr(o) && Ut(u, o) && (G(e) || An(e)));
        }
        function cf(e) {
          var t = e.length, n = new e.constructor(t);
          return t && typeof e[0] == "string" && K.call(e, "index") && (n.index = e.index, n.input = e.input), n;
        }
        function qa(e) {
          return typeof e.constructor == "function" && !wi(e) ? jn(qi(e)) : {};
        }
        function uf(e, t, n) {
          var s = e.constructor;
          switch (t) {
            case $t:
              return As(e);
            case hn:
            case qt:
              return new s(+e);
            case Et:
              return Zh(e, n);
            case Cn:
            case ti:
            case Bn:
            case ni:
            case ii:
            case ri:
            case zn:
            case St:
            case zi:
              return Ra(e, n);
            case We:
              return new s();
            case Kt:
            case dn:
              return new s(e);
            case Lt:
              return Xh(e);
            case Ae:
              return new s();
            case Ln:
              return Vh(e);
          }
        }
        function hf(e, t) {
          var n = t.length;
          if (!n)
            return e;
          var s = n - 1;
          return t[s] = (n > 1 ? "& " : "") + t[s], t = t.join(n > 2 ? ", " : " "), e.replace(fc, `{
/* [wrapped with ` + t + `] */
`);
        }
        function ff(e) {
          return G(e) || An(e) || !!(ta && e && e[ta]);
        }
        function Ut(e, t) {
          var n = typeof e;
          return t = t ?? Ie, !!t && (n == "number" || n != "symbol" && Sc.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }
        function Fe(e, t, n) {
          if (!le(n))
            return !1;
          var s = typeof t;
          return (s == "number" ? Ye(n) && Ut(t, n.length) : s == "string" && t in n) ? bt(n[t], e) : !1;
        }
        function Ls(e, t) {
          if (G(e))
            return !1;
          var n = typeof e;
          return n == "number" || n == "symbol" || n == "boolean" || e == null || tt(e) ? !0 : mt.test(e) || !_t.test(e) || t != null && e in J(t);
        }
        function df(e) {
          var t = typeof e;
          return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
        }
        function Cs(e) {
          var t = gr(e), n = l[t];
          if (typeof n != "function" || !(t in H.prototype))
            return !1;
          if (e === n)
            return !0;
          var s = Is(n);
          return !!s && e === s[0];
        }
        function pf(e) {
          return !!Ko && Ko in e;
        }
        var gf = ji ? kt : Ks;
        function wi(e) {
          var t = e && e.constructor, n = typeof t == "function" && t.prototype || Nn;
          return e === n;
        }
        function Ka(e) {
          return e === e && !le(e);
        }
        function $a(e, t) {
          return function(n) {
            return n == null ? !1 : n[e] === t && (t !== i || e in J(n));
          };
        }
        function _f(e) {
          var t = yr(e, function(s) {
            return n.size === j && n.clear(), s;
          }), n = t.cache;
          return t;
        }
        function mf(e, t) {
          var n = e[1], s = t[1], o = n | s, c = o < ($ | se | Q), u = s == Q && n == V || s == Q && n == Ve && e[7].length <= t[8] || s == (Q | Ve) && t[7].length <= t[8] && n == V;
          if (!(c || u))
            return e;
          s & $ && (e[2] = t[2], o |= n & $ ? 0 : ie);
          var f = t[3];
          if (f) {
            var _ = e[3];
            e[3] = _ ? Ca(_, f, t[4]) : f, e[4] = _ ? nn(e[3], ce) : t[4];
          }
          return f = t[5], f && (_ = e[5], e[5] = _ ? Ba(_, f, t[6]) : f, e[6] = _ ? nn(e[5], ce) : t[6]), f = t[7], f && (e[7] = f), s & Q && (e[8] = e[8] == null ? t[8] : Me(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = o, e;
        }
        function wf(e) {
          var t = [];
          if (e != null)
            for (var n in J(e))
              t.push(n);
          return t;
        }
        function vf(e) {
          return Xi.call(e);
        }
        function Ja(e, t, n) {
          return t = ve(t === i ? e.length - 1 : t, 0), function() {
            for (var s = arguments, o = -1, c = ve(s.length - t, 0), u = m(c); ++o < c; )
              u[o] = s[t + o];
            o = -1;
            for (var f = m(t + 1); ++o < t; )
              f[o] = s[o];
            return f[t] = n(u), $e(e, this, f);
          };
        }
        function el(e, t) {
          return t.length < 2 ? e : En(e, ht(t, 0, -1));
        }
        function bf(e, t) {
          for (var n = e.length, s = Me(t.length, n), o = He(e); s--; ) {
            var c = t[s];
            e[s] = Ut(c, n) ? o[c] : i;
          }
          return e;
        }
        function Bs(e, t) {
          if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
            return e[t];
        }
        var tl = il(xa), vi = Cu || function(e, t) {
          return Te.setTimeout(e, t);
        }, zs = il(Nh);
        function nl(e, t, n) {
          var s = t + "";
          return zs(e, hf(s, yf(lf(s), n)));
        }
        function il(e) {
          var t = 0, n = 0;
          return function() {
            var s = Fu(), o = Xt - (s - n);
            if (n = s, o > 0) {
              if (++t >= Rt)
                return arguments[0];
            } else
              t = 0;
            return e.apply(i, arguments);
          };
        }
        function mr(e, t) {
          var n = -1, s = e.length, o = s - 1;
          for (t = t === i ? s : t; ++n < t; ) {
            var c = ws(n, o), u = e[c];
            e[c] = e[n], e[n] = u;
          }
          return e.length = t, e;
        }
        var rl = _f(function(e) {
          var t = [];
          return e.charCodeAt(0) === 46 && t.push(""), e.replace(gn, function(n, s, o, c) {
            t.push(o ? c.replace(mc, "$1") : s || n);
          }), t;
        });
        function Pt(e) {
          if (typeof e == "string" || tt(e))
            return e;
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function xn(e) {
          if (e != null) {
            try {
              return Zi.call(e);
            } catch {
            }
            try {
              return e + "";
            } catch {
            }
          }
          return "";
        }
        function yf(e, t) {
          return at(In, function(n) {
            var s = "_." + n[0];
            t & n[1] && !Wi(e, s) && e.push(s);
          }), e.sort();
        }
        function sl(e) {
          if (e instanceof H)
            return e.clone();
          var t = new ct(e.__wrapped__, e.__chain__);
          return t.__actions__ = He(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
        }
        function Ef(e, t, n) {
          (n ? Fe(e, t, n) : t === i) ? t = 1 : t = ve(F(t), 0);
          var s = e == null ? 0 : e.length;
          if (!s || t < 1)
            return [];
          for (var o = 0, c = 0, u = m(Ji(s / t)); o < s; )
            u[c++] = ht(e, o, o += t);
          return u;
        }
        function Sf(e) {
          for (var t = -1, n = e == null ? 0 : e.length, s = 0, o = []; ++t < n; ) {
            var c = e[t];
            c && (o[s++] = c);
          }
          return o;
        }
        function xf() {
          var e = arguments.length;
          if (!e)
            return [];
          for (var t = m(e - 1), n = arguments[0], s = e; s--; )
            t[s - 1] = arguments[s];
          return tn(G(n) ? He(n) : [n], Pe(t, 1));
        }
        var Af = k(function(e, t) {
          return de(e) ? di(e, Pe(t, 1, de, !0)) : [];
        }), Tf = k(function(e, t) {
          var n = ft(t);
          return de(n) && (n = i), de(e) ? di(e, Pe(t, 1, de, !0), L(n, 2)) : [];
        }), Pf = k(function(e, t) {
          var n = ft(t);
          return de(n) && (n = i), de(e) ? di(e, Pe(t, 1, de, !0), i, n) : [];
        });
        function Of(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (t = n || t === i ? 1 : F(t), ht(e, t < 0 ? 0 : t, s)) : [];
        }
        function Df(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (t = n || t === i ? 1 : F(t), t = s - t, ht(e, 0, t < 0 ? 0 : t)) : [];
        }
        function If(e, t) {
          return e && e.length ? cr(e, L(t, 3), !0, !0) : [];
        }
        function Mf(e, t) {
          return e && e.length ? cr(e, L(t, 3), !0) : [];
        }
        function Rf(e, t, n, s) {
          var o = e == null ? 0 : e.length;
          return o ? (n && typeof n != "number" && Fe(e, t, n) && (n = 0, s = o), Sh(e, t, n, s)) : [];
        }
        function ol(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = n == null ? 0 : F(n);
          return o < 0 && (o = ve(s + o, 0)), Ni(e, L(t, 3), o);
        }
        function al(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = s - 1;
          return n !== i && (o = F(n), o = n < 0 ? ve(s + o, 0) : Me(o, s - 1)), Ni(e, L(t, 3), o, !0);
        }
        function ll(e) {
          var t = e == null ? 0 : e.length;
          return t ? Pe(e, 1) : [];
        }
        function Lf(e) {
          var t = e == null ? 0 : e.length;
          return t ? Pe(e, ge) : [];
        }
        function Cf(e, t) {
          var n = e == null ? 0 : e.length;
          return n ? (t = t === i ? 1 : F(t), Pe(e, t)) : [];
        }
        function Bf(e) {
          for (var t = -1, n = e == null ? 0 : e.length, s = {}; ++t < n; ) {
            var o = e[t];
            s[o[0]] = o[1];
          }
          return s;
        }
        function cl(e) {
          return e && e.length ? e[0] : i;
        }
        function zf(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = n == null ? 0 : F(n);
          return o < 0 && (o = ve(s + o, 0)), Fn(e, t, o);
        }
        function Gf(e) {
          var t = e == null ? 0 : e.length;
          return t ? ht(e, 0, -1) : [];
        }
        var Ff = k(function(e) {
          var t = oe(e, Ss);
          return t.length && t[0] === e[0] ? ds(t) : [];
        }), Uf = k(function(e) {
          var t = ft(e), n = oe(e, Ss);
          return t === ft(n) ? t = i : n.pop(), n.length && n[0] === e[0] ? ds(n, L(t, 2)) : [];
        }), kf = k(function(e) {
          var t = ft(e), n = oe(e, Ss);
          return t = typeof t == "function" ? t : i, t && n.pop(), n.length && n[0] === e[0] ? ds(n, i, t) : [];
        });
        function Wf(e, t) {
          return e == null ? "" : zu.call(e, t);
        }
        function ft(e) {
          var t = e == null ? 0 : e.length;
          return t ? e[t - 1] : i;
        }
        function Nf(e, t, n) {
          var s = e == null ? 0 : e.length;
          if (!s)
            return -1;
          var o = s;
          return n !== i && (o = F(n), o = o < 0 ? ve(s + o, 0) : Me(o, s - 1)), t === t ? bu(e, t, o) : Ni(e, Ho, o, !0);
        }
        function Hf(e, t) {
          return e && e.length ? ba(e, F(t)) : i;
        }
        var Yf = k(ul);
        function ul(e, t) {
          return e && e.length && t && t.length ? ms(e, t) : e;
        }
        function jf(e, t, n) {
          return e && e.length && t && t.length ? ms(e, t, L(n, 2)) : e;
        }
        function Zf(e, t, n) {
          return e && e.length && t && t.length ? ms(e, t, i, n) : e;
        }
        var Xf = Ft(function(e, t) {
          var n = e == null ? 0 : e.length, s = cs(e, t);
          return Sa(e, oe(t, function(o) {
            return Ut(o, n) ? +o : o;
          }).sort(La)), s;
        });
        function Vf(e, t) {
          var n = [];
          if (!(e && e.length))
            return n;
          var s = -1, o = [], c = e.length;
          for (t = L(t, 3); ++s < c; ) {
            var u = e[s];
            t(u, s, e) && (n.push(u), o.push(s));
          }
          return Sa(e, o), n;
        }
        function Gs(e) {
          return e == null ? e : ku.call(e);
        }
        function Qf(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (n && typeof n != "number" && Fe(e, t, n) ? (t = 0, n = s) : (t = t == null ? 0 : F(t), n = n === i ? s : F(n)), ht(e, t, n)) : [];
        }
        function qf(e, t) {
          return lr(e, t);
        }
        function Kf(e, t, n) {
          return bs(e, t, L(n, 2));
        }
        function $f(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var s = lr(e, t);
            if (s < n && bt(e[s], t))
              return s;
          }
          return -1;
        }
        function Jf(e, t) {
          return lr(e, t, !0);
        }
        function ed(e, t, n) {
          return bs(e, t, L(n, 2), !0);
        }
        function td(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var s = lr(e, t, !0) - 1;
            if (bt(e[s], t))
              return s;
          }
          return -1;
        }
        function nd(e) {
          return e && e.length ? Aa(e) : [];
        }
        function id(e, t) {
          return e && e.length ? Aa(e, L(t, 2)) : [];
        }
        function rd(e) {
          var t = e == null ? 0 : e.length;
          return t ? ht(e, 1, t) : [];
        }
        function sd(e, t, n) {
          return e && e.length ? (t = n || t === i ? 1 : F(t), ht(e, 0, t < 0 ? 0 : t)) : [];
        }
        function od(e, t, n) {
          var s = e == null ? 0 : e.length;
          return s ? (t = n || t === i ? 1 : F(t), t = s - t, ht(e, t < 0 ? 0 : t, s)) : [];
        }
        function ad(e, t) {
          return e && e.length ? cr(e, L(t, 3), !1, !0) : [];
        }
        function ld(e, t) {
          return e && e.length ? cr(e, L(t, 3)) : [];
        }
        var cd = k(function(e) {
          return on(Pe(e, 1, de, !0));
        }), ud = k(function(e) {
          var t = ft(e);
          return de(t) && (t = i), on(Pe(e, 1, de, !0), L(t, 2));
        }), hd = k(function(e) {
          var t = ft(e);
          return t = typeof t == "function" ? t : i, on(Pe(e, 1, de, !0), i, t);
        });
        function fd(e) {
          return e && e.length ? on(e) : [];
        }
        function dd(e, t) {
          return e && e.length ? on(e, L(t, 2)) : [];
        }
        function pd(e, t) {
          return t = typeof t == "function" ? t : i, e && e.length ? on(e, i, t) : [];
        }
        function Fs(e) {
          if (!(e && e.length))
            return [];
          var t = 0;
          return e = en(e, function(n) {
            if (de(n))
              return t = ve(n.length, t), !0;
          }), ts(t, function(n) {
            return oe(e, $r(n));
          });
        }
        function hl(e, t) {
          if (!(e && e.length))
            return [];
          var n = Fs(e);
          return t == null ? n : oe(n, function(s) {
            return $e(t, i, s);
          });
        }
        var gd = k(function(e, t) {
          return de(e) ? di(e, t) : [];
        }), _d = k(function(e) {
          return Es(en(e, de));
        }), md = k(function(e) {
          var t = ft(e);
          return de(t) && (t = i), Es(en(e, de), L(t, 2));
        }), wd = k(function(e) {
          var t = ft(e);
          return t = typeof t == "function" ? t : i, Es(en(e, de), i, t);
        }), vd = k(Fs);
        function bd(e, t) {
          return Da(e || [], t || [], fi);
        }
        function yd(e, t) {
          return Da(e || [], t || [], _i);
        }
        var Ed = k(function(e) {
          var t = e.length, n = t > 1 ? e[t - 1] : i;
          return n = typeof n == "function" ? (e.pop(), n) : i, hl(e, n);
        });
        function fl(e) {
          var t = l(e);
          return t.__chain__ = !0, t;
        }
        function Sd(e, t) {
          return t(e), e;
        }
        function wr(e, t) {
          return t(e);
        }
        var xd = Ft(function(e) {
          var t = e.length, n = t ? e[0] : 0, s = this.__wrapped__, o = function(c) {
            return cs(c, e);
          };
          return t > 1 || this.__actions__.length || !(s instanceof H) || !Ut(n) ? this.thru(o) : (s = s.slice(n, +n + (t ? 1 : 0)), s.__actions__.push({
            func: wr,
            args: [o],
            thisArg: i
          }), new ct(s, this.__chain__).thru(function(c) {
            return t && !c.length && c.push(i), c;
          }));
        });
        function Ad() {
          return fl(this);
        }
        function Td() {
          return new ct(this.value(), this.__chain__);
        }
        function Pd() {
          this.__values__ === i && (this.__values__ = Tl(this.value()));
          var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
          return { done: e, value: t };
        }
        function Od() {
          return this;
        }
        function Dd(e) {
          for (var t, n = this; n instanceof ir; ) {
            var s = sl(n);
            s.__index__ = 0, s.__values__ = i, t ? o.__wrapped__ = s : t = s;
            var o = s;
            n = n.__wrapped__;
          }
          return o.__wrapped__ = e, t;
        }
        function Id() {
          var e = this.__wrapped__;
          if (e instanceof H) {
            var t = e;
            return this.__actions__.length && (t = new H(this)), t = t.reverse(), t.__actions__.push({
              func: wr,
              args: [Gs],
              thisArg: i
            }), new ct(t, this.__chain__);
          }
          return this.thru(Gs);
        }
        function Md() {
          return Oa(this.__wrapped__, this.__actions__);
        }
        var Rd = ur(function(e, t, n) {
          K.call(e, n) ? ++e[n] : zt(e, n, 1);
        });
        function Ld(e, t, n) {
          var s = G(e) ? Wo : Eh;
          return n && Fe(e, t, n) && (t = i), s(e, L(t, 3));
        }
        function Cd(e, t) {
          var n = G(e) ? en : ha;
          return n(e, L(t, 3));
        }
        var Bd = Ua(ol), zd = Ua(al);
        function Gd(e, t) {
          return Pe(vr(e, t), 1);
        }
        function Fd(e, t) {
          return Pe(vr(e, t), ge);
        }
        function Ud(e, t, n) {
          return n = n === i ? 1 : F(n), Pe(vr(e, t), n);
        }
        function dl(e, t) {
          var n = G(e) ? at : sn;
          return n(e, L(t, 3));
        }
        function pl(e, t) {
          var n = G(e) ? iu : ua;
          return n(e, L(t, 3));
        }
        var kd = ur(function(e, t, n) {
          K.call(e, n) ? e[n].push(t) : zt(e, n, [t]);
        });
        function Wd(e, t, n, s) {
          e = Ye(e) ? e : qn(e), n = n && !s ? F(n) : 0;
          var o = e.length;
          return n < 0 && (n = ve(o + n, 0)), xr(e) ? n <= o && e.indexOf(t, n) > -1 : !!o && Fn(e, t, n) > -1;
        }
        var Nd = k(function(e, t, n) {
          var s = -1, o = typeof t == "function", c = Ye(e) ? m(e.length) : [];
          return sn(e, function(u) {
            c[++s] = o ? $e(t, u, n) : pi(u, t, n);
          }), c;
        }), Hd = ur(function(e, t, n) {
          zt(e, n, t);
        });
        function vr(e, t) {
          var n = G(e) ? oe : ma;
          return n(e, L(t, 3));
        }
        function Yd(e, t, n, s) {
          return e == null ? [] : (G(t) || (t = t == null ? [] : [t]), n = s ? i : n, G(n) || (n = n == null ? [] : [n]), ya(e, t, n));
        }
        var jd = ur(function(e, t, n) {
          e[n ? 0 : 1].push(t);
        }, function() {
          return [[], []];
        });
        function Zd(e, t, n) {
          var s = G(e) ? qr : jo, o = arguments.length < 3;
          return s(e, L(t, 4), n, o, sn);
        }
        function Xd(e, t, n) {
          var s = G(e) ? ru : jo, o = arguments.length < 3;
          return s(e, L(t, 4), n, o, ua);
        }
        function Vd(e, t) {
          var n = G(e) ? en : ha;
          return n(e, Er(L(t, 3)));
        }
        function Qd(e) {
          var t = G(e) ? oa : kh;
          return t(e);
        }
        function qd(e, t, n) {
          (n ? Fe(e, t, n) : t === i) ? t = 1 : t = F(t);
          var s = G(e) ? mh : Wh;
          return s(e, t);
        }
        function Kd(e) {
          var t = G(e) ? wh : Hh;
          return t(e);
        }
        function $d(e) {
          if (e == null)
            return 0;
          if (Ye(e))
            return xr(e) ? kn(e) : e.length;
          var t = Re(e);
          return t == We || t == Ae ? e.size : gs(e).length;
        }
        function Jd(e, t, n) {
          var s = G(e) ? Kr : Yh;
          return n && Fe(e, t, n) && (t = i), s(e, L(t, 3));
        }
        var ep = k(function(e, t) {
          if (e == null)
            return [];
          var n = t.length;
          return n > 1 && Fe(e, t[0], t[1]) ? t = [] : n > 2 && Fe(t[0], t[1], t[2]) && (t = [t[0]]), ya(e, Pe(t, 1), []);
        }), br = Lu || function() {
          return Te.Date.now();
        };
        function tp(e, t) {
          if (typeof t != "function")
            throw new lt(p);
          return e = F(e), function() {
            if (--e < 1)
              return t.apply(this, arguments);
          };
        }
        function gl(e, t, n) {
          return t = n ? i : t, t = e && t == null ? e.length : t, Gt(e, Q, i, i, i, i, t);
        }
        function _l(e, t) {
          var n;
          if (typeof t != "function")
            throw new lt(p);
          return e = F(e), function() {
            return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = i), n;
          };
        }
        var Us = k(function(e, t, n) {
          var s = $;
          if (n.length) {
            var o = nn(n, Vn(Us));
            s |= te;
          }
          return Gt(e, s, t, n, o);
        }), ml = k(function(e, t, n) {
          var s = $ | se;
          if (n.length) {
            var o = nn(n, Vn(ml));
            s |= te;
          }
          return Gt(t, s, e, n, o);
        });
        function wl(e, t, n) {
          t = n ? i : t;
          var s = Gt(e, V, i, i, i, i, i, t);
          return s.placeholder = wl.placeholder, s;
        }
        function vl(e, t, n) {
          t = n ? i : t;
          var s = Gt(e, Be, i, i, i, i, i, t);
          return s.placeholder = vl.placeholder, s;
        }
        function bl(e, t, n) {
          var s, o, c, u, f, _, b = 0, y = !1, x = !1, A = !0;
          if (typeof e != "function")
            throw new lt(p);
          t = dt(t) || 0, le(n) && (y = !!n.leading, x = "maxWait" in n, c = x ? ve(dt(n.maxWait) || 0, t) : c, A = "trailing" in n ? !!n.trailing : A);
          function I(pe) {
            var yt = s, Nt = o;
            return s = o = i, b = pe, u = e.apply(Nt, yt), u;
          }
          function C(pe) {
            return b = pe, f = vi(N, t), y ? I(pe) : u;
          }
          function U(pe) {
            var yt = pe - _, Nt = pe - b, Ul = t - yt;
            return x ? Me(Ul, c - Nt) : Ul;
          }
          function B(pe) {
            var yt = pe - _, Nt = pe - b;
            return _ === i || yt >= t || yt < 0 || x && Nt >= c;
          }
          function N() {
            var pe = br();
            if (B(pe))
              return Y(pe);
            f = vi(N, U(pe));
          }
          function Y(pe) {
            return f = i, A && s ? I(pe) : (s = o = i, u);
          }
          function nt() {
            f !== i && Ia(f), b = 0, s = _ = o = f = i;
          }
          function Ue() {
            return f === i ? u : Y(br());
          }
          function it() {
            var pe = br(), yt = B(pe);
            if (s = arguments, o = this, _ = pe, yt) {
              if (f === i)
                return C(_);
              if (x)
                return Ia(f), f = vi(N, t), I(_);
            }
            return f === i && (f = vi(N, t)), u;
          }
          return it.cancel = nt, it.flush = Ue, it;
        }
        var np = k(function(e, t) {
          return ca(e, 1, t);
        }), ip = k(function(e, t, n) {
          return ca(e, dt(t) || 0, n);
        });
        function rp(e) {
          return Gt(e, Mt);
        }
        function yr(e, t) {
          if (typeof e != "function" || t != null && typeof t != "function")
            throw new lt(p);
          var n = function() {
            var s = arguments, o = t ? t.apply(this, s) : s[0], c = n.cache;
            if (c.has(o))
              return c.get(o);
            var u = e.apply(this, s);
            return n.cache = c.set(o, u) || c, u;
          };
          return n.cache = new (yr.Cache || Bt)(), n;
        }
        yr.Cache = Bt;
        function Er(e) {
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
        function sp(e) {
          return _l(2, e);
        }
        var op = jh(function(e, t) {
          t = t.length == 1 && G(t[0]) ? oe(t[0], Je(L())) : oe(Pe(t, 1), Je(L()));
          var n = t.length;
          return k(function(s) {
            for (var o = -1, c = Me(s.length, n); ++o < c; )
              s[o] = t[o].call(this, s[o]);
            return $e(e, this, s);
          });
        }), ks = k(function(e, t) {
          var n = nn(t, Vn(ks));
          return Gt(e, te, i, t, n);
        }), yl = k(function(e, t) {
          var n = nn(t, Vn(yl));
          return Gt(e, st, i, t, n);
        }), ap = Ft(function(e, t) {
          return Gt(e, Ve, i, i, i, t);
        });
        function lp(e, t) {
          if (typeof e != "function")
            throw new lt(p);
          return t = t === i ? t : F(t), k(e, t);
        }
        function cp(e, t) {
          if (typeof e != "function")
            throw new lt(p);
          return t = t == null ? 0 : ve(F(t), 0), k(function(n) {
            var s = n[t], o = ln(n, 0, t);
            return s && tn(o, s), $e(e, this, o);
          });
        }
        function up(e, t, n) {
          var s = !0, o = !0;
          if (typeof e != "function")
            throw new lt(p);
          return le(n) && (s = "leading" in n ? !!n.leading : s, o = "trailing" in n ? !!n.trailing : o), bl(e, t, {
            leading: s,
            maxWait: t,
            trailing: o
          });
        }
        function hp(e) {
          return gl(e, 1);
        }
        function fp(e, t) {
          return ks(xs(t), e);
        }
        function dp() {
          if (!arguments.length)
            return [];
          var e = arguments[0];
          return G(e) ? e : [e];
        }
        function pp(e) {
          return ut(e, De);
        }
        function gp(e, t) {
          return t = typeof t == "function" ? t : i, ut(e, De, t);
        }
        function _p(e) {
          return ut(e, ue | De);
        }
        function mp(e, t) {
          return t = typeof t == "function" ? t : i, ut(e, ue | De, t);
        }
        function wp(e, t) {
          return t == null || la(e, t, Ee(t));
        }
        function bt(e, t) {
          return e === t || e !== e && t !== t;
        }
        var vp = pr(fs), bp = pr(function(e, t) {
          return e >= t;
        }), An = pa(/* @__PURE__ */ function() {
          return arguments;
        }()) ? pa : function(e) {
          return fe(e) && K.call(e, "callee") && !ea.call(e, "callee");
        }, G = m.isArray, yp = Bo ? Je(Bo) : Oh;
        function Ye(e) {
          return e != null && Sr(e.length) && !kt(e);
        }
        function de(e) {
          return fe(e) && Ye(e);
        }
        function Ep(e) {
          return e === !0 || e === !1 || fe(e) && Ge(e) == hn;
        }
        var cn = Bu || Ks, Sp = zo ? Je(zo) : Dh;
        function xp(e) {
          return fe(e) && e.nodeType === 1 && !bi(e);
        }
        function Ap(e) {
          if (e == null)
            return !0;
          if (Ye(e) && (G(e) || typeof e == "string" || typeof e.splice == "function" || cn(e) || Qn(e) || An(e)))
            return !e.length;
          var t = Re(e);
          if (t == We || t == Ae)
            return !e.size;
          if (wi(e))
            return !gs(e).length;
          for (var n in e)
            if (K.call(e, n))
              return !1;
          return !0;
        }
        function Tp(e, t) {
          return gi(e, t);
        }
        function Pp(e, t, n) {
          n = typeof n == "function" ? n : i;
          var s = n ? n(e, t) : i;
          return s === i ? gi(e, t, i, n) : !!s;
        }
        function Ws(e) {
          if (!fe(e))
            return !1;
          var t = Ge(e);
          return t == fn || t == Di || typeof e.message == "string" && typeof e.name == "string" && !bi(e);
        }
        function Op(e) {
          return typeof e == "number" && na(e);
        }
        function kt(e) {
          if (!le(e))
            return !1;
          var t = Ge(e);
          return t == Rn || t == Ii || t == kr || t == Li;
        }
        function El(e) {
          return typeof e == "number" && e == F(e);
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
        var Sl = Go ? Je(Go) : Mh;
        function Dp(e, t) {
          return e === t || ps(e, t, Ms(t));
        }
        function Ip(e, t, n) {
          return n = typeof n == "function" ? n : i, ps(e, t, Ms(t), n);
        }
        function Mp(e) {
          return xl(e) && e != +e;
        }
        function Rp(e) {
          if (gf(e))
            throw new z(E);
          return ga(e);
        }
        function Lp(e) {
          return e === null;
        }
        function Cp(e) {
          return e == null;
        }
        function xl(e) {
          return typeof e == "number" || fe(e) && Ge(e) == Kt;
        }
        function bi(e) {
          if (!fe(e) || Ge(e) != gt)
            return !1;
          var t = qi(e);
          if (t === null)
            return !0;
          var n = K.call(t, "constructor") && t.constructor;
          return typeof n == "function" && n instanceof n && Zi.call(n) == Du;
        }
        var Ns = Fo ? Je(Fo) : Rh;
        function Bp(e) {
          return El(e) && e >= -9007199254740991 && e <= Ie;
        }
        var Al = Uo ? Je(Uo) : Lh;
        function xr(e) {
          return typeof e == "string" || !G(e) && fe(e) && Ge(e) == dn;
        }
        function tt(e) {
          return typeof e == "symbol" || fe(e) && Ge(e) == Ln;
        }
        var Qn = ko ? Je(ko) : Ch;
        function zp(e) {
          return e === i;
        }
        function Gp(e) {
          return fe(e) && Re(e) == pn;
        }
        function Fp(e) {
          return fe(e) && Ge(e) == Bi;
        }
        var Up = pr(_s), kp = pr(function(e, t) {
          return e <= t;
        });
        function Tl(e) {
          if (!e)
            return [];
          if (Ye(e))
            return xr(e) ? wt(e) : He(e);
          if (ai && e[ai])
            return mu(e[ai]());
          var t = Re(e), n = t == We ? is : t == Ae ? Hi : qn;
          return n(e);
        }
        function Wt(e) {
          if (!e)
            return e === 0 ? e : 0;
          if (e = dt(e), e === ge || e === -1 / 0) {
            var t = e < 0 ? -1 : 1;
            return t * _e;
          }
          return e === e ? e : 0;
        }
        function F(e) {
          var t = Wt(e), n = t % 1;
          return t === t ? n ? t - n : t : 0;
        }
        function Pl(e) {
          return e ? yn(F(e), 0, be) : 0;
        }
        function dt(e) {
          if (typeof e == "number")
            return e;
          if (tt(e))
            return qe;
          if (le(e)) {
            var t = typeof e.valueOf == "function" ? e.valueOf() : e;
            e = le(t) ? t + "" : t;
          }
          if (typeof e != "string")
            return e === 0 ? e : +e;
          e = Zo(e);
          var n = bc.test(e);
          return n || Ec.test(e) ? eu(e.slice(2), n ? 2 : 8) : vc.test(e) ? qe : +e;
        }
        function Ol(e) {
          return Tt(e, je(e));
        }
        function Wp(e) {
          return e ? yn(F(e), -9007199254740991, Ie) : e === 0 ? e : 0;
        }
        function X(e) {
          return e == null ? "" : et(e);
        }
        var Np = Zn(function(e, t) {
          if (wi(t) || Ye(t)) {
            Tt(t, Ee(t), e);
            return;
          }
          for (var n in t)
            K.call(t, n) && fi(e, n, t[n]);
        }), Dl = Zn(function(e, t) {
          Tt(t, je(t), e);
        }), Ar = Zn(function(e, t, n, s) {
          Tt(t, je(t), e, s);
        }), Hp = Zn(function(e, t, n, s) {
          Tt(t, Ee(t), e, s);
        }), Yp = Ft(cs);
        function jp(e, t) {
          var n = jn(e);
          return t == null ? n : aa(n, t);
        }
        var Zp = k(function(e, t) {
          e = J(e);
          var n = -1, s = t.length, o = s > 2 ? t[2] : i;
          for (o && Fe(t[0], t[1], o) && (s = 1); ++n < s; )
            for (var c = t[n], u = je(c), f = -1, _ = u.length; ++f < _; ) {
              var b = u[f], y = e[b];
              (y === i || bt(y, Nn[b]) && !K.call(e, b)) && (e[b] = c[b]);
            }
          return e;
        }), Xp = k(function(e) {
          return e.push(i, Za), $e(Il, i, e);
        });
        function Vp(e, t) {
          return No(e, L(t, 3), At);
        }
        function Qp(e, t) {
          return No(e, L(t, 3), hs);
        }
        function qp(e, t) {
          return e == null ? e : us(e, L(t, 3), je);
        }
        function Kp(e, t) {
          return e == null ? e : fa(e, L(t, 3), je);
        }
        function $p(e, t) {
          return e && At(e, L(t, 3));
        }
        function Jp(e, t) {
          return e && hs(e, L(t, 3));
        }
        function e0(e) {
          return e == null ? [] : or(e, Ee(e));
        }
        function t0(e) {
          return e == null ? [] : or(e, je(e));
        }
        function Hs(e, t, n) {
          var s = e == null ? i : En(e, t);
          return s === i ? n : s;
        }
        function n0(e, t) {
          return e != null && Qa(e, t, xh);
        }
        function Ys(e, t) {
          return e != null && Qa(e, t, Ah);
        }
        var i0 = Wa(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = Xi.call(t)), e[t] = n;
        }, Zs(Ze)), r0 = Wa(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = Xi.call(t)), K.call(e, t) ? e[t].push(n) : e[t] = [n];
        }, L), s0 = k(pi);
        function Ee(e) {
          return Ye(e) ? sa(e) : gs(e);
        }
        function je(e) {
          return Ye(e) ? sa(e, !0) : Bh(e);
        }
        function o0(e, t) {
          var n = {};
          return t = L(t, 3), At(e, function(s, o, c) {
            zt(n, t(s, o, c), s);
          }), n;
        }
        function a0(e, t) {
          var n = {};
          return t = L(t, 3), At(e, function(s, o, c) {
            zt(n, o, t(s, o, c));
          }), n;
        }
        var l0 = Zn(function(e, t, n) {
          ar(e, t, n);
        }), Il = Zn(function(e, t, n, s) {
          ar(e, t, n, s);
        }), c0 = Ft(function(e, t) {
          var n = {};
          if (e == null)
            return n;
          var s = !1;
          t = oe(t, function(c) {
            return c = an(c, e), s || (s = c.length > 1), c;
          }), Tt(e, Ds(e), n), s && (n = ut(n, ue | Oe | De, nf));
          for (var o = t.length; o--; )
            ys(n, t[o]);
          return n;
        });
        function u0(e, t) {
          return Ml(e, Er(L(t)));
        }
        var h0 = Ft(function(e, t) {
          return e == null ? {} : Gh(e, t);
        });
        function Ml(e, t) {
          if (e == null)
            return {};
          var n = oe(Ds(e), function(s) {
            return [s];
          });
          return t = L(t), Ea(e, n, function(s, o) {
            return t(s, o[0]);
          });
        }
        function f0(e, t, n) {
          t = an(t, e);
          var s = -1, o = t.length;
          for (o || (o = 1, e = i); ++s < o; ) {
            var c = e == null ? i : e[Pt(t[s])];
            c === i && (s = o, c = n), e = kt(c) ? c.call(e) : c;
          }
          return e;
        }
        function d0(e, t, n) {
          return e == null ? e : _i(e, t, n);
        }
        function p0(e, t, n, s) {
          return s = typeof s == "function" ? s : i, e == null ? e : _i(e, t, n, s);
        }
        var Rl = Ya(Ee), Ll = Ya(je);
        function g0(e, t, n) {
          var s = G(e), o = s || cn(e) || Qn(e);
          if (t = L(t, 4), n == null) {
            var c = e && e.constructor;
            o ? n = s ? new c() : [] : le(e) ? n = kt(c) ? jn(qi(e)) : {} : n = {};
          }
          return (o ? at : At)(e, function(u, f, _) {
            return t(n, u, f, _);
          }), n;
        }
        function _0(e, t) {
          return e == null ? !0 : ys(e, t);
        }
        function m0(e, t, n) {
          return e == null ? e : Pa(e, t, xs(n));
        }
        function w0(e, t, n, s) {
          return s = typeof s == "function" ? s : i, e == null ? e : Pa(e, t, xs(n), s);
        }
        function qn(e) {
          return e == null ? [] : ns(e, Ee(e));
        }
        function v0(e) {
          return e == null ? [] : ns(e, je(e));
        }
        function b0(e, t, n) {
          return n === i && (n = t, t = i), n !== i && (n = dt(n), n = n === n ? n : 0), t !== i && (t = dt(t), t = t === t ? t : 0), yn(dt(e), t, n);
        }
        function y0(e, t, n) {
          return t = Wt(t), n === i ? (n = t, t = 0) : n = Wt(n), e = dt(e), Th(e, t, n);
        }
        function E0(e, t, n) {
          if (n && typeof n != "boolean" && Fe(e, t, n) && (t = n = i), n === i && (typeof t == "boolean" ? (n = t, t = i) : typeof e == "boolean" && (n = e, e = i)), e === i && t === i ? (e = 0, t = 1) : (e = Wt(e), t === i ? (t = e, e = 0) : t = Wt(t)), e > t) {
            var s = e;
            e = t, t = s;
          }
          if (n || e % 1 || t % 1) {
            var o = ia();
            return Me(e + o * (t - e + Jc("1e-" + ((o + "").length - 1))), t);
          }
          return ws(e, t);
        }
        var S0 = Xn(function(e, t, n) {
          return t = t.toLowerCase(), e + (n ? Cl(t) : t);
        });
        function Cl(e) {
          return js(X(e).toLowerCase());
        }
        function Bl(e) {
          return e = X(e), e && e.replace(xc, fu).replace(Hc, "");
        }
        function x0(e, t, n) {
          e = X(e), t = et(t);
          var s = e.length;
          n = n === i ? s : yn(F(n), 0, s);
          var o = n;
          return n -= t.length, n >= 0 && e.slice(n, o) == t;
        }
        function A0(e) {
          return e = X(e), e && Ne.test(e) ? e.replace(ye, du) : e;
        }
        function T0(e) {
          return e = X(e), e && _n.test(e) ? e.replace(Ke, "\\$&") : e;
        }
        var P0 = Xn(function(e, t, n) {
          return e + (n ? "-" : "") + t.toLowerCase();
        }), O0 = Xn(function(e, t, n) {
          return e + (n ? " " : "") + t.toLowerCase();
        }), D0 = Fa("toLowerCase");
        function I0(e, t, n) {
          e = X(e), t = F(t);
          var s = t ? kn(e) : 0;
          if (!t || s >= t)
            return e;
          var o = (t - s) / 2;
          return dr(er(o), n) + e + dr(Ji(o), n);
        }
        function M0(e, t, n) {
          e = X(e), t = F(t);
          var s = t ? kn(e) : 0;
          return t && s < t ? e + dr(t - s, n) : e;
        }
        function R0(e, t, n) {
          e = X(e), t = F(t);
          var s = t ? kn(e) : 0;
          return t && s < t ? dr(t - s, n) + e : e;
        }
        function L0(e, t, n) {
          return n || t == null ? t = 0 : t && (t = +t), Uu(X(e).replace(Jt, ""), t || 0);
        }
        function C0(e, t, n) {
          return (n ? Fe(e, t, n) : t === i) ? t = 1 : t = F(t), vs(X(e), t);
        }
        function B0() {
          var e = arguments, t = X(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }
        var z0 = Xn(function(e, t, n) {
          return e + (n ? "_" : "") + t.toLowerCase();
        });
        function G0(e, t, n) {
          return n && typeof n != "number" && Fe(e, t, n) && (t = n = i), n = n === i ? be : n >>> 0, n ? (e = X(e), e && (typeof t == "string" || t != null && !Ns(t)) && (t = et(t), !t && Un(e)) ? ln(wt(e), 0, n) : e.split(t, n)) : [];
        }
        var F0 = Xn(function(e, t, n) {
          return e + (n ? " " : "") + js(t);
        });
        function U0(e, t, n) {
          return e = X(e), n = n == null ? 0 : yn(F(n), 0, e.length), t = et(t), e.slice(n, n + t.length) == t;
        }
        function k0(e, t, n) {
          var s = l.templateSettings;
          n && Fe(e, t, n) && (t = i), e = X(e), t = Ar({}, t, s, ja);
          var o = Ar({}, t.imports, s.imports, ja), c = Ee(o), u = ns(o, c), f, _, b = 0, y = t.interpolate || Fi, x = "__p += '", A = rs(
            (t.escape || Fi).source + "|" + y.source + "|" + (y === si ? wc : Fi).source + "|" + (t.evaluate || Fi).source + "|$",
            "g"
          ), I = "//# sourceURL=" + (K.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Vc + "]") + `
`;
          e.replace(A, function(B, N, Y, nt, Ue, it) {
            return Y || (Y = nt), x += e.slice(b, it).replace(Ac, pu), N && (f = !0, x += `' +
__e(` + N + `) +
'`), Ue && (_ = !0, x += `';
` + Ue + `;
__p += '`), Y && (x += `' +
((__t = (` + Y + `)) == null ? '' : __t) +
'`), b = it + B.length, B;
          }), x += `';
`;
          var C = K.call(t, "variable") && t.variable;
          if (!C)
            x = `with (obj) {
` + x + `
}
`;
          else if (_c.test(C))
            throw new z(T);
          x = (_ ? x.replace(d, "") : x).replace(P, "$1").replace(W, "$1;"), x = "function(" + (C || "obj") + `) {
` + (C ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (f ? ", __e = _.escape" : "") + (_ ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + x + `return __p
}`;
          var U = Gl(function() {
            return Z(c, I + "return " + x).apply(i, u);
          });
          if (U.source = x, Ws(U))
            throw U;
          return U;
        }
        function W0(e) {
          return X(e).toLowerCase();
        }
        function N0(e) {
          return X(e).toUpperCase();
        }
        function H0(e, t, n) {
          if (e = X(e), e && (n || t === i))
            return Zo(e);
          if (!e || !(t = et(t)))
            return e;
          var s = wt(e), o = wt(t), c = Xo(s, o), u = Vo(s, o) + 1;
          return ln(s, c, u).join("");
        }
        function Y0(e, t, n) {
          if (e = X(e), e && (n || t === i))
            return e.slice(0, qo(e) + 1);
          if (!e || !(t = et(t)))
            return e;
          var s = wt(e), o = Vo(s, wt(t)) + 1;
          return ln(s, 0, o).join("");
        }
        function j0(e, t, n) {
          if (e = X(e), e && (n || t === i))
            return e.replace(Jt, "");
          if (!e || !(t = et(t)))
            return e;
          var s = wt(e), o = Xo(s, wt(t));
          return ln(s, o).join("");
        }
        function Z0(e, t) {
          var n = ei, s = Zt;
          if (le(t)) {
            var o = "separator" in t ? t.separator : o;
            n = "length" in t ? F(t.length) : n, s = "omission" in t ? et(t.omission) : s;
          }
          e = X(e);
          var c = e.length;
          if (Un(e)) {
            var u = wt(e);
            c = u.length;
          }
          if (n >= c)
            return e;
          var f = n - kn(s);
          if (f < 1)
            return s;
          var _ = u ? ln(u, 0, f).join("") : e.slice(0, f);
          if (o === i)
            return _ + s;
          if (u && (f += _.length - f), Ns(o)) {
            if (e.slice(f).search(o)) {
              var b, y = _;
              for (o.global || (o = rs(o.source, X(po.exec(o)) + "g")), o.lastIndex = 0; b = o.exec(y); )
                var x = b.index;
              _ = _.slice(0, x === i ? f : x);
            }
          } else if (e.indexOf(et(o), f) != f) {
            var A = _.lastIndexOf(o);
            A > -1 && (_ = _.slice(0, A));
          }
          return _ + s;
        }
        function X0(e) {
          return e = X(e), e && xt.test(e) ? e.replace(q, yu) : e;
        }
        var V0 = Xn(function(e, t, n) {
          return e + (n ? " " : "") + t.toUpperCase();
        }), js = Fa("toUpperCase");
        function zl(e, t, n) {
          return e = X(e), t = n ? i : t, t === i ? _u(e) ? xu(e) : au(e) : e.match(t) || [];
        }
        var Gl = k(function(e, t) {
          try {
            return $e(e, i, t);
          } catch (n) {
            return Ws(n) ? n : new z(n);
          }
        }), Q0 = Ft(function(e, t) {
          return at(t, function(n) {
            n = Pt(n), zt(e, n, Us(e[n], e));
          }), e;
        });
        function q0(e) {
          var t = e == null ? 0 : e.length, n = L();
          return e = t ? oe(e, function(s) {
            if (typeof s[1] != "function")
              throw new lt(p);
            return [n(s[0]), s[1]];
          }) : [], k(function(s) {
            for (var o = -1; ++o < t; ) {
              var c = e[o];
              if ($e(c[0], this, s))
                return $e(c[1], this, s);
            }
          });
        }
        function K0(e) {
          return yh(ut(e, ue));
        }
        function Zs(e) {
          return function() {
            return e;
          };
        }
        function $0(e, t) {
          return e == null || e !== e ? t : e;
        }
        var J0 = ka(), eg = ka(!0);
        function Ze(e) {
          return e;
        }
        function Xs(e) {
          return _a(typeof e == "function" ? e : ut(e, ue));
        }
        function tg(e) {
          return wa(ut(e, ue));
        }
        function ng(e, t) {
          return va(e, ut(t, ue));
        }
        var ig = k(function(e, t) {
          return function(n) {
            return pi(n, e, t);
          };
        }), rg = k(function(e, t) {
          return function(n) {
            return pi(e, n, t);
          };
        });
        function Vs(e, t, n) {
          var s = Ee(t), o = or(t, s);
          n == null && !(le(t) && (o.length || !s.length)) && (n = t, t = e, e = this, o = or(t, Ee(t)));
          var c = !(le(n) && "chain" in n) || !!n.chain, u = kt(e);
          return at(o, function(f) {
            var _ = t[f];
            e[f] = _, u && (e.prototype[f] = function() {
              var b = this.__chain__;
              if (c || b) {
                var y = e(this.__wrapped__), x = y.__actions__ = He(this.__actions__);
                return x.push({ func: _, args: arguments, thisArg: e }), y.__chain__ = b, y;
              }
              return _.apply(e, tn([this.value()], arguments));
            });
          }), e;
        }
        function sg() {
          return Te._ === this && (Te._ = Iu), this;
        }
        function Qs() {
        }
        function og(e) {
          return e = F(e), k(function(t) {
            return ba(t, e);
          });
        }
        var ag = Ts(oe), lg = Ts(Wo), cg = Ts(Kr);
        function Fl(e) {
          return Ls(e) ? $r(Pt(e)) : Fh(e);
        }
        function ug(e) {
          return function(t) {
            return e == null ? i : En(e, t);
          };
        }
        var hg = Na(), fg = Na(!0);
        function qs() {
          return [];
        }
        function Ks() {
          return !1;
        }
        function dg() {
          return {};
        }
        function pg() {
          return "";
        }
        function gg() {
          return !0;
        }
        function _g(e, t) {
          if (e = F(e), e < 1 || e > Ie)
            return [];
          var n = be, s = Me(e, be);
          t = L(t), e -= be;
          for (var o = ts(s, t); ++n < e; )
            t(n);
          return o;
        }
        function mg(e) {
          return G(e) ? oe(e, Pt) : tt(e) ? [e] : He(rl(X(e)));
        }
        function wg(e) {
          var t = ++Ou;
          return X(e) + t;
        }
        var vg = fr(function(e, t) {
          return e + t;
        }, 0), bg = Ps("ceil"), yg = fr(function(e, t) {
          return e / t;
        }, 1), Eg = Ps("floor");
        function Sg(e) {
          return e && e.length ? sr(e, Ze, fs) : i;
        }
        function xg(e, t) {
          return e && e.length ? sr(e, L(t, 2), fs) : i;
        }
        function Ag(e) {
          return Yo(e, Ze);
        }
        function Tg(e, t) {
          return Yo(e, L(t, 2));
        }
        function Pg(e) {
          return e && e.length ? sr(e, Ze, _s) : i;
        }
        function Og(e, t) {
          return e && e.length ? sr(e, L(t, 2), _s) : i;
        }
        var Dg = fr(function(e, t) {
          return e * t;
        }, 1), Ig = Ps("round"), Mg = fr(function(e, t) {
          return e - t;
        }, 0);
        function Rg(e) {
          return e && e.length ? es(e, Ze) : 0;
        }
        function Lg(e, t) {
          return e && e.length ? es(e, L(t, 2)) : 0;
        }
        return l.after = tp, l.ary = gl, l.assign = Np, l.assignIn = Dl, l.assignInWith = Ar, l.assignWith = Hp, l.at = Yp, l.before = _l, l.bind = Us, l.bindAll = Q0, l.bindKey = ml, l.castArray = dp, l.chain = fl, l.chunk = Ef, l.compact = Sf, l.concat = xf, l.cond = q0, l.conforms = K0, l.constant = Zs, l.countBy = Rd, l.create = jp, l.curry = wl, l.curryRight = vl, l.debounce = bl, l.defaults = Zp, l.defaultsDeep = Xp, l.defer = np, l.delay = ip, l.difference = Af, l.differenceBy = Tf, l.differenceWith = Pf, l.drop = Of, l.dropRight = Df, l.dropRightWhile = If, l.dropWhile = Mf, l.fill = Rf, l.filter = Cd, l.flatMap = Gd, l.flatMapDeep = Fd, l.flatMapDepth = Ud, l.flatten = ll, l.flattenDeep = Lf, l.flattenDepth = Cf, l.flip = rp, l.flow = J0, l.flowRight = eg, l.fromPairs = Bf, l.functions = e0, l.functionsIn = t0, l.groupBy = kd, l.initial = Gf, l.intersection = Ff, l.intersectionBy = Uf, l.intersectionWith = kf, l.invert = i0, l.invertBy = r0, l.invokeMap = Nd, l.iteratee = Xs, l.keyBy = Hd, l.keys = Ee, l.keysIn = je, l.map = vr, l.mapKeys = o0, l.mapValues = a0, l.matches = tg, l.matchesProperty = ng, l.memoize = yr, l.merge = l0, l.mergeWith = Il, l.method = ig, l.methodOf = rg, l.mixin = Vs, l.negate = Er, l.nthArg = og, l.omit = c0, l.omitBy = u0, l.once = sp, l.orderBy = Yd, l.over = ag, l.overArgs = op, l.overEvery = lg, l.overSome = cg, l.partial = ks, l.partialRight = yl, l.partition = jd, l.pick = h0, l.pickBy = Ml, l.property = Fl, l.propertyOf = ug, l.pull = Yf, l.pullAll = ul, l.pullAllBy = jf, l.pullAllWith = Zf, l.pullAt = Xf, l.range = hg, l.rangeRight = fg, l.rearg = ap, l.reject = Vd, l.remove = Vf, l.rest = lp, l.reverse = Gs, l.sampleSize = qd, l.set = d0, l.setWith = p0, l.shuffle = Kd, l.slice = Qf, l.sortBy = ep, l.sortedUniq = nd, l.sortedUniqBy = id, l.split = G0, l.spread = cp, l.tail = rd, l.take = sd, l.takeRight = od, l.takeRightWhile = ad, l.takeWhile = ld, l.tap = Sd, l.throttle = up, l.thru = wr, l.toArray = Tl, l.toPairs = Rl, l.toPairsIn = Ll, l.toPath = mg, l.toPlainObject = Ol, l.transform = g0, l.unary = hp, l.union = cd, l.unionBy = ud, l.unionWith = hd, l.uniq = fd, l.uniqBy = dd, l.uniqWith = pd, l.unset = _0, l.unzip = Fs, l.unzipWith = hl, l.update = m0, l.updateWith = w0, l.values = qn, l.valuesIn = v0, l.without = gd, l.words = zl, l.wrap = fp, l.xor = _d, l.xorBy = md, l.xorWith = wd, l.zip = vd, l.zipObject = bd, l.zipObjectDeep = yd, l.zipWith = Ed, l.entries = Rl, l.entriesIn = Ll, l.extend = Dl, l.extendWith = Ar, Vs(l, l), l.add = vg, l.attempt = Gl, l.camelCase = S0, l.capitalize = Cl, l.ceil = bg, l.clamp = b0, l.clone = pp, l.cloneDeep = _p, l.cloneDeepWith = mp, l.cloneWith = gp, l.conformsTo = wp, l.deburr = Bl, l.defaultTo = $0, l.divide = yg, l.endsWith = x0, l.eq = bt, l.escape = A0, l.escapeRegExp = T0, l.every = Ld, l.find = Bd, l.findIndex = ol, l.findKey = Vp, l.findLast = zd, l.findLastIndex = al, l.findLastKey = Qp, l.floor = Eg, l.forEach = dl, l.forEachRight = pl, l.forIn = qp, l.forInRight = Kp, l.forOwn = $p, l.forOwnRight = Jp, l.get = Hs, l.gt = vp, l.gte = bp, l.has = n0, l.hasIn = Ys, l.head = cl, l.identity = Ze, l.includes = Wd, l.indexOf = zf, l.inRange = y0, l.invoke = s0, l.isArguments = An, l.isArray = G, l.isArrayBuffer = yp, l.isArrayLike = Ye, l.isArrayLikeObject = de, l.isBoolean = Ep, l.isBuffer = cn, l.isDate = Sp, l.isElement = xp, l.isEmpty = Ap, l.isEqual = Tp, l.isEqualWith = Pp, l.isError = Ws, l.isFinite = Op, l.isFunction = kt, l.isInteger = El, l.isLength = Sr, l.isMap = Sl, l.isMatch = Dp, l.isMatchWith = Ip, l.isNaN = Mp, l.isNative = Rp, l.isNil = Cp, l.isNull = Lp, l.isNumber = xl, l.isObject = le, l.isObjectLike = fe, l.isPlainObject = bi, l.isRegExp = Ns, l.isSafeInteger = Bp, l.isSet = Al, l.isString = xr, l.isSymbol = tt, l.isTypedArray = Qn, l.isUndefined = zp, l.isWeakMap = Gp, l.isWeakSet = Fp, l.join = Wf, l.kebabCase = P0, l.last = ft, l.lastIndexOf = Nf, l.lowerCase = O0, l.lowerFirst = D0, l.lt = Up, l.lte = kp, l.max = Sg, l.maxBy = xg, l.mean = Ag, l.meanBy = Tg, l.min = Pg, l.minBy = Og, l.stubArray = qs, l.stubFalse = Ks, l.stubObject = dg, l.stubString = pg, l.stubTrue = gg, l.multiply = Dg, l.nth = Hf, l.noConflict = sg, l.noop = Qs, l.now = br, l.pad = I0, l.padEnd = M0, l.padStart = R0, l.parseInt = L0, l.random = E0, l.reduce = Zd, l.reduceRight = Xd, l.repeat = C0, l.replace = B0, l.result = f0, l.round = Ig, l.runInContext = g, l.sample = Qd, l.size = $d, l.snakeCase = z0, l.some = Jd, l.sortedIndex = qf, l.sortedIndexBy = Kf, l.sortedIndexOf = $f, l.sortedLastIndex = Jf, l.sortedLastIndexBy = ed, l.sortedLastIndexOf = td, l.startCase = F0, l.startsWith = U0, l.subtract = Mg, l.sum = Rg, l.sumBy = Lg, l.template = k0, l.times = _g, l.toFinite = Wt, l.toInteger = F, l.toLength = Pl, l.toLower = W0, l.toNumber = dt, l.toSafeInteger = Wp, l.toString = X, l.toUpper = N0, l.trim = H0, l.trimEnd = Y0, l.trimStart = j0, l.truncate = Z0, l.unescape = X0, l.uniqueId = wg, l.upperCase = V0, l.upperFirst = js, l.each = dl, l.eachRight = pl, l.first = cl, Vs(l, function() {
          var e = {};
          return At(l, function(t, n) {
            K.call(l.prototype, n) || (e[n] = t);
          }), e;
        }(), { chain: !1 }), l.VERSION = r, at(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
          l[e].placeholder = l;
        }), at(["drop", "take"], function(e, t) {
          H.prototype[e] = function(n) {
            n = n === i ? 1 : ve(F(n), 0);
            var s = this.__filtered__ && !t ? new H(this) : this.clone();
            return s.__filtered__ ? s.__takeCount__ = Me(n, s.__takeCount__) : s.__views__.push({
              size: Me(n, be),
              type: e + (s.__dir__ < 0 ? "Right" : "")
            }), s;
          }, H.prototype[e + "Right"] = function(n) {
            return this.reverse()[e](n).reverse();
          };
        }), at(["filter", "map", "takeWhile"], function(e, t) {
          var n = t + 1, s = n == ze || n == Qe;
          H.prototype[e] = function(o) {
            var c = this.clone();
            return c.__iteratees__.push({
              iteratee: L(o, 3),
              type: n
            }), c.__filtered__ = c.__filtered__ || s, c;
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
        }, H.prototype.invokeMap = k(function(e, t) {
          return typeof e == "function" ? new H(this) : this.map(function(n) {
            return pi(n, e, t);
          });
        }), H.prototype.reject = function(e) {
          return this.filter(Er(L(e)));
        }, H.prototype.slice = function(e, t) {
          e = F(e);
          var n = this;
          return n.__filtered__ && (e > 0 || t < 0) ? new H(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== i && (t = F(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
        }, H.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, H.prototype.toArray = function() {
          return this.take(be);
        }, At(H.prototype, function(e, t) {
          var n = /^(?:filter|find|map|reject)|While$/.test(t), s = /^(?:head|last)$/.test(t), o = l[s ? "take" + (t == "last" ? "Right" : "") : t], c = s || /^find/.test(t);
          o && (l.prototype[t] = function() {
            var u = this.__wrapped__, f = s ? [1] : arguments, _ = u instanceof H, b = f[0], y = _ || G(u), x = function(N) {
              var Y = o.apply(l, tn([N], f));
              return s && A ? Y[0] : Y;
            };
            y && n && typeof b == "function" && b.length != 1 && (_ = y = !1);
            var A = this.__chain__, I = !!this.__actions__.length, C = c && !A, U = _ && !I;
            if (!c && y) {
              u = U ? u : new H(this);
              var B = e.apply(u, f);
              return B.__actions__.push({ func: wr, args: [x], thisArg: i }), new ct(B, A);
            }
            return C && U ? e.apply(this, f) : (B = this.thru(x), C ? s ? B.value()[0] : B.value() : B);
          });
        }), at(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
          var t = Yi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", s = /^(?:pop|shift)$/.test(e);
          l.prototype[e] = function() {
            var o = arguments;
            if (s && !this.__chain__) {
              var c = this.value();
              return t.apply(G(c) ? c : [], o);
            }
            return this[n](function(u) {
              return t.apply(G(u) ? u : [], o);
            });
          };
        }), At(H.prototype, function(e, t) {
          var n = l[t];
          if (n) {
            var s = n.name + "";
            K.call(Yn, s) || (Yn[s] = []), Yn[s].push({ name: t, func: n });
          }
        }), Yn[hr(i, se).name] = [{
          name: "wrapper",
          func: i
        }], H.prototype.clone = Zu, H.prototype.reverse = Xu, H.prototype.value = Vu, l.prototype.at = xd, l.prototype.chain = Ad, l.prototype.commit = Td, l.prototype.next = Pd, l.prototype.plant = Dd, l.prototype.reverse = Id, l.prototype.toJSON = l.prototype.valueOf = l.prototype.value = Md, l.prototype.first = l.prototype.head, ai && (l.prototype[ai] = Od), l;
      }, Wn = Au();
      mn ? ((mn.exports = Wn)._ = Wn, Xr._ = Wn) : Te._ = Wn;
    }).call(b_);
  }(Pi, Pi.exports)), Pi.exports;
}
var E_ = y_();
class zr {
  constructor(a) {
    v(this, "_promise", null);
    v(this, "_instance", null);
    v(this, "_importFn");
    this._path = a, this._importFn = async () => {
      try {
        const i = await this._dynamicImport(this._path), r = Object.keys(i)[0];
        if (!r || !i[r])
          throw new Error(
            `Module class not found in dynamically imported module: ${this._path}`
          );
        return i[r];
      } catch (i) {
        throw new Error(
          `Failed to dynamically import module from path ${this._path}: ${i instanceof Error ? i.message : String(i)}`
        );
      }
    };
  }
  /**
   * @internal
   * Get the module class, importing it if not already cached.
   * @returns A Promise that resolves to the module's class constructor.
   */
  async import() {
    return this._promise || (this._promise = this._importFn()), this._promise;
  }
  /**
   * @internal
   * Get an instance of the module class, importing it if not already cached.
   * @returns A Promise that resolves to an instance of the module's class.
   */
  async instantiate(...a) {
    if (this._instance !== null)
      return Promise.resolve(this._instance);
    const i = await this.import();
    return this._instance = new i(...a), this._instance;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _dynamicImport(a) {
    return import(
      /* @vite-ignore */
      a
    );
  }
}
const Jn = class Jn {
  constructor(a, i, r) {
    v(this, "_id");
    v(this, "engine");
    v(this, "controller");
    v(this, "toolbox");
    // modules
    v(this, "_mediaCreator");
    v(this, "_arSystem");
    v(this, "_assetExporter");
    v(this, "registered", /* @__PURE__ */ new Map());
    v(this, "listeners", /* @__PURE__ */ new Map());
    this._id = v_(), this.engine = a, this.controller = i, this.toolbox = r, this._mediaCreator = new zr(
      "./src/modules/mediacreator/MediaCreator.mjs"
    ), this._arSystem = new zr(
      "./src/modules/ar/ARSystem.mjs"
    ), this._assetExporter = new zr(
      "./src/modules/asset/exporter/AssetExporter.mjs"
    ), Jn.__instances.push(this);
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
    const a = Jn.__instances.findIndex(
      (i) => i.id === this.id
    );
    return a === -1 ? !1 : (Jn.__instances.splice(a, 1), !0);
  }
  PerformAction(a, i) {
    let r = !1;
    switch (a) {
      case "START_RENDER": {
        this.engine.start(), r = !0;
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
        const { uri: h, options: E } = i;
        r = new Promise((p, T) => {
          this._arSystem.instantiate().then((R) => {
            p(R.launch(h, E));
          }).catch(T);
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
        (E) => E === i
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
      name: this.engine.scene.name,
      mediaItem: null,
      backgroundColor: "#" + this.engine.scene.background.getHexString(),
      floorEnabled: this.engine.scene.Root.floor.visible,
      floorColor: "#" + this.engine.scene.Root.floor.material.color.getHexString(),
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
    return this.registered.get(a.id) ? !1 : (a.parentId === void 0 && (a.parentId = null), this.registered.set(a.id, a), this.engine.scene.AddSceneObject(a), !0);
  }
  updateObject(a) {
    const i = this.registered.get(a.id);
    if (!i) return !1;
    this.registered.set(a.id, E_.merge(i, a));
    const r = this.registered.get(a.id);
    return this.engine.scene.UpdateSceneObject({
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
    }), Object.assign(a, i), this.registered.delete(a.id), this.engine.scene.DeleteSceneObject(i), !0) : !1;
  }
  selectObject(a) {
    const i = this.registered.get(a.id);
    if (!i) return !1;
    const r = this.engine.scene.GetSceneObject(i);
    if (!r || !("isSelectable" in r)) return !1;
    const h = this.toolbox.GetActiveTool();
    return h && Jl(h) && h.AttachGizmo(r), Object.assign(a, i), !0;
  }
  deselectObject(a) {
    const i = this.registered.get(a.id);
    if (!i) return !1;
    const r = this.engine.scene.GetSceneObject(i);
    if (!r || !("isSelectable" in r)) return !1;
    const h = this.toolbox.GetActiveTool();
    return h && Jl(h) && h.DetachGizmo(), Object.assign(a, i), !0;
  }
  setBackground(a) {
    return this.engine.scene.SetBackground(a.color), !0;
  }
  dropIt(a) {
    const i = this.registered.get(a.id);
    return i ? (this.engine.scene.GetSceneObject(i).DropIt(), !0) : !1;
  }
  placeOnFloor(a) {
    const i = this.registered.get(a.id);
    return i ? (this.engine.scene.PlaceOnFloor(i), !0) : !1;
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
    return this.controller.object.setCameraLayer(a.layer), !0;
  }
  resetCamera(a) {
    return this.controller.RevertLast(a.duration), !0;
  }
  computeEncompassingView(a) {
    const i = this.engine.scene.ComputeSceneBB(), r = this.controller.ComputeEncompassingView(i);
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
    return a.name !== void 0 && (this.engine.scene.name = a.name), a.backgroundColor !== void 0 && this.engine.scene.SetBackground(a.backgroundColor), a.gridEnabled !== void 0 && this.engine.scene.Grid.SetVisibility(a.gridEnabled), a.floorEnabled !== void 0 && this.engine.scene.Root.floor.SetVisibility(a.floorEnabled), a.floorColor !== void 0 && this.engine.scene.Root.floor.SetColor(a.floorColor), a.name = this.engine.scene.name, a.backgroundColor = "#" + this.engine.scene.background.getHexString(), a.gridEnabled = this.engine.scene.Grid.visible, a.floorEnabled = this.engine.scene.Root.floor.visible, a.floorColor = "#" + this.engine.scene.Root.floor.material.color.getHexString(), !0;
  }
  generateMedia(a) {
    let i = { x: 0, y: 0, z: 0 }, r = { x: 0, y: 0, z: 0 };
    return "id" in a ? (i = this.registered.get(a.id).position, r = this.registered.get(a.id).target) : (i = a.position, r = a.target), this._mediaCreator.instantiate(
      this.engine.renderer,
      this.engine.scene,
      this.controller
    ).then((h) => h.GenerateMedia(
      i,
      r,
      a.width,
      a.height
    ));
  }
  setParent(a) {
    const i = this.registered.get(a.object.id);
    if (!i) return !1;
    const r = this.engine.scene.GetSceneObject(i);
    if (!r) return !1;
    if (a.parent === null)
      return this.engine.scene.Root.attach(r), this.updateObject({
        id: i.id,
        parentId: null
      }), !0;
    if (a.object.id === a.parent.id)
      return !1;
    const h = this.registered.get(a.parent.id);
    if (!h)
      return this.engine.scene.Root.attach(r), this.updateObject({
        id: i.id,
        parentId: null
      }), !0;
    const E = this.engine.scene.GetSceneObject(h);
    return E ? (E.attach(r), this.updateObject({
      id: i.id,
      parentId: h.id
    }), !0) : (this.engine.scene.Root.attach(r), this.updateObject({
      id: i.id,
      parentId: null
    }), !0);
  }
  exportScene(a) {
    return this._assetExporter.instantiate().then((i) => i.export(
      this.engine.scene.Root,
      a.type,
      {}
    ));
  }
};
v(Jn, "__instances", []);
let rt = Jn;
class S_ {
  Dispose() {
  }
  Update() {
    t_();
  }
  Animate(a) {
    return new n_(a);
  }
}
class x_ extends Ng {
  constructor(i, r, h, E) {
    super(-1, 1, 1, -1, 0.1, 100);
    v(this, "axesHelper");
    v(this, "_renderer");
    v(this, "_pipeline");
    v(this, "_scene");
    v(this, "_controller");
    v(this, "_restoreViewport", new Hg());
    v(this, "_postRenderCallback", () => {
      const i = this._scene.background;
      this._scene.background = null, this._renderer.webglrenderer.getViewport(this._restoreViewport), this._renderer.webglrenderer.setViewport(0, 0, 150, 150), this._renderer.webglrenderer.autoClear = !1, this.SetFromCameraMatrix(this._controller.object.matrix), this._renderer.render(this._scene, this), this._renderer.webglrenderer.setViewport(this._restoreViewport), this._renderer.webglrenderer.autoClear = !0, this._scene.background = i;
    });
    this.layers.mask = Ei, this.axesHelper = new Yg(0.5), this.axesHelper.layers.mask = Ei, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new Yt(io),
      new Yt(ro),
      new Yt(so)
    );
    const p = new $s("X", 0.2, sc), T = new $s("Y", 0.2, oc), R = new $s("Z", 0.2, ac);
    p.layers.mask = Ei, T.layers.mask = Ei, R.layers.mask = Ei, p.position.set(0.7, 0, 0), T.position.set(0, 0.7, 0), R.position.set(0, 0, 0.7), this.axesHelper.add(p), this.axesHelper.add(T), this.axesHelper.add(R), this.add(this.axesHelper), this._renderer = i, this._pipeline = r, this._scene = h, this._controller = E, this._scene.add(this), this._pipeline.addPostRenderStep(this._postRenderCallback);
  }
  Dispose() {
    this._pipeline.removePostRenderStep(this._postRenderCallback), this._scene.remove(this);
  }
  SetFromCameraMatrix(i) {
    this.axesHelper.rotation.setFromRotationMatrix(
      new lo().extractRotation(i).invert()
    );
  }
}
const A_ = "1.19.1-beta.9", T_ = {
  version: A_
};
class P_ extends jt {
  constructor() {
    super();
    v(this, "isDIVELight", !0);
    v(this, "isDIVEAmbientLight", !0);
    v(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new jg(16777215, 1), this._light.layers.mask = Dt, this.add(this._light);
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
class O_ extends jt {
  constructor() {
    super();
    v(this, "isDIVELight", !0);
    v(this, "isDIVEPointLight", !0);
    v(this, "isMovable", !0);
    v(this, "isSelectable", !0);
    v(this, "gizmo", null);
    v(this, "light");
    v(this, "mesh");
    this.name = "DIVEPointLight", this.light = new Zg(16777215, 1), this.light.layers.mask = Dt, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const i = 0.1, r = new ao(
      i,
      i * 320,
      i * 320
    ), h = new oo({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: Xg
    });
    this.mesh = new D(r, h), this.mesh.layers.mask = rc, this.add(this.mesh);
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
class D_ extends jt {
  constructor() {
    super();
    v(this, "isDIVELight", !0);
    v(this, "isDIVESceneLight", !0);
    v(this, "_hemiLight");
    v(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new Vg(16777215, 16777215, 2), this._hemiLight.layers.mask = Dt, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new Qg(16777215, 3), this._dirLight.layers.mask = Dt, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
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
const uo = (S) => S.parent ? uo(S.parent) : S;
class I_ {
  constructor() {
    v(this, "isMovable", !0);
  }
}
class M_ {
  constructor() {
    v(this, "isSelectable", !0);
  }
}
function R_(S, a) {
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
class ho extends R_(jt, [
  M_,
  I_
]) {
  constructor() {
    super();
    v(this, "isDIVENode", !0);
    v(this, "gizmo", null);
    v(this, "_positionWorldBuffer");
    v(this, "_boundingBox");
    this.layers.mask = Dt, this._positionWorldBuffer = new M(), this._boundingBox = new ic();
  }
  SetPosition(i) {
    if (!this.parent) {
      this.position.set(i.x, i.y, i.z);
      return;
    }
    const r = new M(i.x, i.y, i.z);
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
class L_ extends ho {
  constructor() {
    super(...arguments);
    v(this, "isDIVEModel", !0);
    v(this, "_mesh", null);
    v(this, "_material", null);
  }
  SetModel(i) {
    this.clear(), this._boundingBox.makeEmpty(), i.traverse((r) => {
      r.castShadow = !0, r.receiveShadow = !0, r.layers.mask = this.layers.mask, this._boundingBox.expandByObject(r), !this._mesh && "isMesh" in r && (this._mesh = r, this._material ? this._mesh.material = this._material : this._material = r.material);
    }), this.add(i);
  }
  SetMaterial(i) {
    this._material || (this._material = new co()), i.vertexColors !== void 0 && (this._material.vertexColors = i.vertexColors), i.color !== void 0 && this._material.color.set(i.color), i.map !== void 0 && (this._material.map = i.map), i.normalMap !== void 0 && (this._material.normalMap = i.normalMap), i.roughness !== void 0 && (this._material.roughness = i.roughness), i.roughnessMap !== void 0 && (this._material.roughnessMap = i.roughnessMap, this._material.roughnessMap && (this._material.roughness = 1)), i.metalness !== void 0 && (this._material.metalness = i.metalness), i.metalnessMap !== void 0 && (this._material.metalnessMap = i.metalnessMap, this._material.metalnessMap && (this._material.metalness = 1)), this._mesh && (this._mesh.material = this._material);
  }
  PlaceOnFloor() {
    var E, p, T, R, j;
    const i = this.getWorldPosition(this._positionWorldBuffer), r = i.clone();
    (p = (E = this._mesh) == null ? void 0 : E.geometry) == null || p.computeBoundingBox();
    const h = (R = (T = this._mesh) == null ? void 0 : T.geometry) == null ? void 0 : R.boundingBox;
    !h || !this._mesh || (i.y = i.y - this._mesh.localToWorld(h.min.clone()).y, i.y !== r.y && ((j = rt.get(this.userData.id)) == null || j.PerformAction(
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
      this._boundingBox.getCenter(new M()).multiply(this.scale)
    );
    r.y = i + this.position.y;
    const h = new Ur(r, new M(0, -1, 0));
    h.layers.mask = Dt;
    const E = h.intersectObjects(
      uo(this).Root.children,
      !0
    );
    if (E.length > 0) {
      const p = E[0].object;
      p.geometry.computeBoundingBox();
      const T = p.geometry.boundingBox, R = p.localToWorld(T.max.clone()), j = this.position.clone(), ce = this.position.clone().setY(R.y).sub(new M(0, i, 0));
      if (this.position.copy(ce), this.position.y === j.y) return;
      this.onMove();
    }
  }
}
class C_ extends ho {
  constructor() {
    super();
    v(this, "isDIVEPrimitive", !0);
    v(this, "_mesh");
    this._mesh = new D(), this._mesh.layers.mask = Dt, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new co(), this.add(this._mesh);
  }
  SetGeometry(i) {
    const r = this.assembleGeometry(i);
    r && (this._mesh.geometry = r, this._boundingBox.setFromObject(this._mesh));
  }
  SetMaterial(i) {
    const r = this._mesh.material;
    i.vertexColors !== void 0 && (r.vertexColors = i.vertexColors), i.color !== void 0 && (r.color = new Yt(i.color)), i.map !== void 0 && (r.map = i.map), i.normalMap !== void 0 && (r.normalMap = i.normalMap), i.roughness !== void 0 && (r.roughness = i.roughness), i.roughnessMap !== void 0 && (r.roughnessMap = i.roughnessMap, r.roughnessMap && (r.roughness = 1)), i.metalness !== void 0 && (r.metalness = i.metalness), i.metalnessMap !== void 0 && (r.metalnessMap = i.metalnessMap, r.metalnessMap && (r.metalness = 0)), this._mesh && (this._mesh.material = r);
  }
  PlaceOnFloor() {
    var E, p, T, R, j;
    const i = this.getWorldPosition(this._positionWorldBuffer), r = i.clone();
    (p = (E = this._mesh) == null ? void 0 : E.geometry) == null || p.computeBoundingBox();
    const h = (R = (T = this._mesh) == null ? void 0 : T.geometry) == null ? void 0 : R.boundingBox;
    !h || !this._mesh || (i.y = i.y - this._mesh.localToWorld(h.min.clone()).y, i.y !== r.y && ((j = rt.get(this.userData.id)) == null || j.PerformAction(
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
      this._boundingBox.getCenter(new M()).multiply(this.scale)
    );
    r.y = i + this.position.y;
    const h = new Ur(r, new M(0, -1, 0));
    h.layers.mask = Dt;
    const E = h.intersectObjects(
      uo(this).Root.children,
      !0
    );
    if (E.length > 0) {
      const p = E[0].object;
      p.geometry.computeBoundingBox();
      const T = p.geometry.boundingBox, R = p.localToWorld(T.max.clone()), j = this.position.clone(), ce = this.position.clone().setY(R.y).sub(new M(0, i, 0));
      if (this.position.copy(ce), this.position.y === j.y) return;
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
    const r = new ke(
      i.width / 2,
      i.width / 2,
      i.height,
      64
    );
    return r.translate(0, i.height / 2, 0), r;
  }
  createSphereGeometry(i) {
    return new ao(i.width / 2, 256, 256);
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
    ]), E = new Gr();
    return E.setAttribute(
      "position",
      new Nl(r, 3)
    ), E.setIndex(new Nl(h, 1)), E.computeVertexNormals(), E.computeBoundingBox(), E.computeBoundingSphere(), E;
  }
  createBoxGeometry(i) {
    const r = new Se(
      i.width,
      i.height,
      i.depth
    );
    return r.translate(0, i.height / 2, 0), r;
  }
  createConeGeometry(i) {
    const r = new qg(i.width / 2, i.height, 256);
    return r.translate(0, i.height / 2, 0), r;
  }
  createWallGeometry(i) {
    const r = new Se(
      i.width,
      i.height,
      i.depth || 0.05,
      16
    );
    return r.translate(0, i.height / 2, 0), r;
  }
  createPlaneGeometry(i) {
    const r = new Se(
      i.width,
      i.height,
      i.depth
    );
    return r.translate(0, i.height / 2, 0), r;
  }
}
class B_ extends ho {
  // lines to children
  constructor() {
    super();
    v(this, "isDIVEGroup", !0);
    v(this, "_members");
    v(this, "_lines");
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
      this._lines.forEach((E) => {
        E.visible = i;
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
  /**
   * Removes an object from the group.
   * @param object - The object to remove.
   * @returns The group instance.
   */
  remove(i) {
    const r = this._members.indexOf(i);
    if (r === -1)
      return this;
    const h = this._lines[r];
    return super.remove(h), this._lines.splice(r, 1), super.remove(i), this._members.splice(r, 1), this;
  }
  UpdateLineTo(i) {
    const r = this._members.indexOf(i);
    r !== -1 && this.updateLineTo(this._lines[r], i);
  }
  /**
   * Creates a line for visualization.
   */
  createLine() {
    const i = new Gr(), r = new Kg({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), h = new Ht(i, r);
    return h.visible = !1, h;
  }
  /**
   * Updates a line to the object.
   */
  updateLineTo(i, r) {
    const h = [
      new M(0, 0, 0),
      r.position.clone()
    ];
    i.geometry.setFromPoints(h), i.computeLineDistances();
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
class z_ extends D {
  constructor() {
    super(
      new nc(1e4, 1e4),
      new co({
        color: new Yt(150 / 255, 150 / 255, 150 / 255)
      })
    );
    v(this, "isDIVEFloor", !0);
    this.name = "Floor", this.layers.mask = Dt, this.receiveShadow = !0, this.rotateX(-Math.PI / 2);
  }
  SetVisibility(i) {
    this.visible = i;
  }
  SetColor(i) {
    this.material.color = new Yt(i);
  }
}
class G_ extends jt {
  constructor() {
    super();
    v(this, "isDIVERoot", !0);
    v(this, "_floor");
    v(this, "_assetLoader");
    this.name = "Root", this._floor = new z_(), this.add(this._floor), this._assetLoader = new zr(
      "./src/modules/asset/loader/AssetLoader.mjs"
    );
  }
  get floor() {
    return this._floor;
  }
  ComputeSceneBB() {
    const i = new ic();
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
          r = new D_();
          break;
        }
        case "ambient": {
          r = new P_();
          break;
        }
        case "point": {
          r = new O_();
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
      new Yt(i.color)
    ), i.visible !== void 0 && i.visible !== null && (r.visible = i.visible), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
  }
  updateModel(i) {
    let r = this.GetSceneObject(i);
    r || (r = new L_(), r.userData.id = i.id, r.userData.uri = i.uri, this.add(r)), i.uri !== void 0 && this._assetLoader.instantiate().then((h) => h.load(i.uri)).then((h) => {
      var E;
      r.SetModel(h), (E = rt.get(i.id)) == null || E.PerformAction(
        "MODEL_LOADED",
        { id: i.id }
      );
    }), i.name !== void 0 && (r.name = i.name), i.position !== void 0 && r.SetPosition(i.position), i.rotation !== void 0 && r.SetRotation(i.rotation), i.scale !== void 0 && r.SetScale(i.scale), i.visible !== void 0 && r.SetVisibility(i.visible), i.material !== void 0 && r.SetMaterial(i.material), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
  }
  updatePrimitive(i) {
    let r = this.GetSceneObject(i);
    r || (r = new C_(), r.userData.id = i.id, this.add(r)), i.name !== void 0 && (r.name = i.name), i.geometry !== void 0 && r.SetGeometry(i.geometry), i.position !== void 0 && r.SetPosition(i.position), i.rotation !== void 0 && r.SetRotation(i.rotation), i.scale !== void 0 && r.SetScale(i.scale), i.visible !== void 0 && r.SetVisibility(i.visible), i.material !== void 0 && r.SetMaterial(i.material), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
  }
  updateGroup(i) {
    let r = this.GetSceneObject(i);
    r || (r = new B_(), r.userData.id = i.id, this.add(r)), i.name !== void 0 && (r.name = i.name), i.position !== void 0 && r.SetPosition(i.position), i.rotation !== void 0 && r.SetRotation(i.rotation), i.scale !== void 0 && r.SetScale(i.scale), i.visible !== void 0 && r.SetVisibility(i.visible), i.bbVisible !== void 0 && r.SetLinesVisibility(i.bbVisible), i.parentId !== void 0 && this.setParent({ ...i, parentId: i.parentId });
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
const F_ = "#888888", U_ = "#dddddd";
class k_ extends jt {
  constructor() {
    super(), this.name = "Grid";
    const a = new $g(
      100,
      100,
      F_,
      U_
    );
    a.material.depthTest = !1, a.layers.mask = i_, this.add(a);
  }
  SetVisibility(a) {
    this.visible = a;
  }
}
class W_ extends Jg {
  constructor() {
    super();
    v(this, "_root");
    v(this, "_grid");
    this.background = new Yt(16777215), this._root = new G_(), this.add(this._root), this._grid = new k_(), this.add(this._grid);
  }
  get Root() {
    return this._root;
  }
  get Grid() {
    return this._grid;
  }
  SetBackground(i) {
    this.background = new Yt(i);
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
const N_ = {
  antialias: !0,
  alpha: !0,
  powerPreference: "high-performance",
  precision: "highp",
  stencil: !1,
  depth: !0,
  logarithmicDepthBuffer: !1
};
class H_ {
  constructor(a) {
    v(this, "_webglrenderer");
    v(this, "_settings");
    this._settings = {
      ...N_,
      ...a ?? {}
    }, this._webglrenderer = new e_({
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
  get domElement() {
    return this._webglrenderer.domElement;
  }
  set domElement(a) {
    this._webglrenderer.domElement = a;
  }
  render(a, i) {
    this._webglrenderer.render(a, i);
  }
  onResize(a, i) {
    this._webglrenderer.setSize(a, i, !1);
  }
  dispose() {
    this._webglrenderer.dispose();
  }
}
class Y_ {
  constructor() {
    v(this, "_lastTime", 0);
    v(this, "_isRunning", !1);
    v(this, "_tickers", []);
  }
  start() {
    this._isRunning || (this._isRunning = !0, this._lastTime = performance.now(), requestAnimationFrame(this._tick.bind(this)));
  }
  stop() {
    this._isRunning = !1;
  }
  addTicker(a) {
    this._tickers.push(a);
  }
  removeTicker(a) {
    const i = this._tickers.indexOf(a);
    i !== -1 && this._tickers.splice(i, 1);
  }
  dispose() {
    this.stop(), this._tickers.forEach((a) => {
      var i;
      return (i = a.dispose) == null ? void 0 : i.call(a);
    }), this._tickers = [], this._isRunning = !1, this._lastTime = 0;
  }
  _tick(a) {
    if (!this._isRunning) return;
    const i = (a - this._lastTime) / 1e3;
    this._lastTime = a, this._tickers.forEach((r) => r.tick(i)), requestAnimationFrame(this._tick.bind(this));
  }
}
class j_ {
  constructor(a, i, r) {
    v(this, "_preRenderSteps", []);
    v(this, "_postRenderSteps", []);
    this._renderer = a, this._scene = i, this._camera = r;
  }
  get renderer() {
    return this._renderer;
  }
  get scene() {
    return this._scene;
  }
  get camera() {
    return this._camera;
  }
  addPreRenderStep(a) {
    this._preRenderSteps.push(a);
  }
  removePreRenderStep(a) {
    const i = this._preRenderSteps.findIndex((r) => r === a);
    i !== -1 && this._preRenderSteps.splice(i, 1);
  }
  addPostRenderStep(a) {
    this._postRenderSteps.push(a);
  }
  removePostRenderStep(a) {
    const i = this._postRenderSteps.findIndex((r) => r === a);
    i !== -1 && this._postRenderSteps.splice(i, 1);
  }
  tick(a) {
    this._preRenderSteps.forEach((i) => i(a)), this._renderer.render(this._scene, this._camera), this._postRenderSteps.forEach((i) => i(a));
  }
  dispose() {
    this._postRenderSteps = [], this._preRenderSteps = [];
  }
}
class Z_ {
  constructor(a, i) {
    v(this, "_resizeObserver");
    v(this, "_width", 0);
    v(this, "_height", 0);
    this._resizeObserver = new ResizeObserver((h) => {
      for (const E of h) {
        const { width: p, height: T } = E.contentRect;
        p === this._width && T === this._height || (a.onResize(p, T), i.onResize(p, T), this._width = p, this._height = T);
      }
    });
    const r = a.domElement.parentElement;
    r && this._resizeObserver.observe(r);
  }
  dispose() {
    this._resizeObserver.disconnect();
  }
}
const cc = {
  autoStart: !0,
  displayAxes: !1,
  perspectiveCamera: r_,
  renderPipeline: {}
};
class X_ {
  constructor(a) {
    v(this, "_renderer");
    v(this, "_scene");
    v(this, "_camera");
    v(this, "_pipeline");
    v(this, "_resizeManager");
    v(this, "_clock");
    v(this, "_settings");
    this._settings = {
      ...cc,
      ...a ?? {}
    }, this._renderer = new H_(), this._scene = new W_(), this._camera = new s_(
      this._settings.perspectiveCamera
    ), this._pipeline = new j_(
      this._renderer,
      this._scene,
      this._camera
    ), this._resizeManager = new Z_(
      this._renderer,
      this._camera
    ), this._clock = new Y_(), this._clock.addTicker(this._pipeline), this._settings.autoStart && this.start();
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
  get pipeline() {
    return this._pipeline;
  }
  start() {
    this._clock.start();
  }
  stop() {
    this._clock.stop();
  }
  dispose() {
    this._clock.dispose(), this._resizeManager.dispose(), this._pipeline.dispose(), this._renderer.dispose();
  }
}
const V_ = {
  ...cc,
  orbitController: Lr
};
class uc {
  constructor(a) {
    // descriptive members
    v(this, "_settings");
    v(this, "_engine");
    v(this, "orbitControls");
    v(this, "toolbox");
    v(this, "_communication");
    // additional components
    v(this, "animationSystem");
    v(this, "axisCamera");
    this._settings = {
      ...V_,
      ...a ?? {}
    }, this._engine = new X_(a), this.animationSystem = new S_(), this._engine.pipeline.addPreRenderStep(() => {
      this.animationSystem.Update();
    }), this.orbitControls = new no(
      this._engine.camera,
      this._engine.renderer,
      this._engine.pipeline,
      this.animationSystem,
      this._settings.orbitController
    ), this.toolbox = new lc(this._engine.scene, this.orbitControls), this._communication = new rt(
      this._engine,
      this.orbitControls,
      this.toolbox
    ), this._settings.displayAxes ? this.axisCamera = new x_(
      this._engine.renderer,
      this._engine.pipeline,
      this._engine.scene,
      this.orbitControls
    ) : this.axisCamera = null, window.DIVE = {
      instances: [],
      PrintScene: () => this._engine.scene
    }, console.log(`DIVE ${T_.version} initialized successfully!`), console.log(`
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
      const h = new uc(i);
      h._communication.PerformAction("UPDATE_SCENE", {
        backgroundColor: 16777215,
        gridEnabled: !1,
        floorColor: 16777215
      }), h._communication.PerformAction("SET_CAMERA_TRANSFORM", {
        position: { x: 0, y: 2, z: 2 },
        target: { x: 0, y: 0.5, z: 0 }
      });
      const E = On.generateUUID();
      h._communication.PerformAction("ADD_OBJECT", {
        entityType: "light",
        type: "scene",
        name: "light",
        id: E,
        enabled: !0,
        visible: !0,
        intensity: 1,
        color: 16777215
      });
      const p = On.generateUUID();
      h._communication.Subscribe("MODEL_LOADED", (T) => {
        if (T.id !== p) return;
        const R = h._communication.PerformAction(
          "COMPUTE_ENCOMPASSING_VIEW",
          {}
        );
        h._communication.PerformAction("SET_CAMERA_TRANSFORM", {
          position: R.position,
          target: R.target
        }), window.DIVE.instances.push(h), r(h);
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
    this.orbitControls.Dispose(), (a = this.axisCamera) == null || a.Dispose(), this._engine.pipeline.removePreRenderStep(() => {
      this.animationSystem.Update();
    }), this.animationSystem.Dispose(), this.toolbox.Dispose(), this._communication.DestroyInstance();
  }
}
const tc = (S, a) => {
  if (Object.keys(S).length === 0 && Object.keys(a).length === 0)
    return {};
  if (typeof S != "object" || typeof a != "object")
    return a;
  let i = {};
  return Object.keys(a).forEach((r) => {
    if (!Object.keys(S).includes(r)) {
      i = { ...i, [r]: a[r] };
      return;
    }
    if (Array.isArray(a[r])) {
      if (!Array.isArray(S[r])) {
        i = { ...i, [r]: a[r] };
        return;
      }
      const h = S[r], E = a[r];
      if (h.length === 0 && E.length === 0) {
        i = { ...i };
        return;
      }
      if (h.length !== E.length) {
        i = { ...i, [r]: a[r] };
        return;
      }
      const p = [];
      if (E.forEach((T, R) => {
        const j = tc(
          h[R],
          E[R]
        );
        Object.keys(j).length && p.push(E[R]);
      }), Object.keys(p).length) {
        i = { ...i, [r]: p };
        return;
      }
      return;
    }
    if (typeof a[r] == "object") {
      if (typeof S[r] != "object") {
        i = { ...i, [r]: a[r] };
        return;
      }
      const h = tc(
        S[r],
        a[r]
      );
      if (Object.keys(h).length) {
        i = { ...i, [r]: h };
        return;
      }
    }
    S[r] !== a[r] && (i = { ...i, [r]: a[r] });
  }), i;
};
function It(S, a) {
  const i = (S + "e").split("e");
  return +(i[0] + "e" + (+i[1] + (a || 0)));
}
function Q_(S, a = 0) {
  const i = It(S, +a);
  return It(Math.ceil(i), -a);
}
function q_(S, a = 0) {
  const i = It(S, +a);
  return It(Math.floor(i), -a);
}
function hc(S, a = 0) {
  if (S < 0) return -hc(-S, a);
  const i = It(S, +a);
  return It(Math.round(i), -a);
}
function K_(S, a, i) {
  return Math.atan2(
    S.clone().cross(a).dot(i),
    a.clone().dot(S)
  );
}
function $_(S, a = 0) {
  const i = It(S, +a);
  return It(Math.round(i), -a).toFixed(a);
}
function J_(S, a = 0) {
  const i = It(S, +a);
  return It(Math.trunc(i), -a);
}
function em(S) {
  return (On.radToDeg(S) + 360) % 360;
}
function tm(S) {
  return On.degToRad(S);
}
const am = {
  ceilExp: Q_,
  floorExp: q_,
  roundExp: hc,
  toFixedExp: $_,
  truncateExp: J_,
  signedAngleTo: K_,
  radToDeg: em,
  degToRad: tm
};
export {
  Em as ARCompatibilityError,
  Pm as ARSystem,
  Dm as AssetConverter,
  Mm as AssetExporter,
  fm as AssetLoader,
  uc as DIVE,
  V_ as DIVEDefaultSettings,
  am as DIVEMath,
  Sm as ESystem,
  xm as EWebXRUnsupportedReason,
  dm as FILE_TYPES,
  vm as FileTypeError,
  um as MediaCreator,
  pm as NetworkError,
  bm as ParseError,
  gm as SUPPORTED_FILE_TYPES,
  Am as SystemInfo,
  R_ as applyMixins,
  Fr as findInterface,
  uo as findSceneRecursive,
  _m as getFileTypeFromUri,
  tc as getObjectDelta,
  Cr as implementsInterface,
  mm as isFileTypeSupported
};
//# sourceMappingURL=index.mjs.map
