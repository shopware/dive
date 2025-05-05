var c = Object.defineProperty;
var d = (p, t, e) => t in p ? c(p, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : p[t] = e;
var i = (p, t, e) => d(p, typeof t != "symbol" ? t + "" : t, e);
import { update as u, Tween as r, Easing as _ } from "@tweenjs/tween.js";
import { EventDispatcher as g, MathUtils as h } from "three";
class w extends g {
  constructor(e, n, a, s) {
    super();
    i(this, "_uuid", h.generateUUID());
    i(this, "_playing", !1);
    i(this, "_stopped", !1);
    i(this, "_completed", !1);
    this.object = e, this.to = n, this.duration = a, this.options = s;
  }
  get uuid() {
    return this._uuid;
  }
  get playing() {
    return this._playing;
  }
  get stopped() {
    return this._stopped;
  }
  get completed() {
    return this._completed;
  }
  dispose() {
    this._playing = !1, this._stopped = !1, this._completed = !1;
  }
  play() {
    return this._playing = !0, this._stopped = !1, this.dispatchEvent({ type: "play", target: this }), console.log("play", this), this;
  }
  stop() {
    return this._playing = !1, this._stopped = !0, this.dispatchEvent({ type: "stop", target: this }), this;
  }
}
class M {
  constructor() {
    i(this, "uuid", h.generateUUID());
    i(this, "_callbackMap", /* @__PURE__ */ new Map());
    i(this, "_tweens", /* @__PURE__ */ new Map());
  }
  /**
   * Creates a new animator and registers it.
   * @param object - The object to animate.
   * @param to - The target object.
   * @param duration - The duration of the animation.
   * @param options - The options for the animation.
   * @returns The animator.
   */
  createAnimator(t, e, n, a) {
    var o, l;
    const s = new w(t, e, n, a);
    return this._callbackMap.set(s.uuid, {
      onUpdate: ((o = s.options) == null ? void 0 : o.onUpdate) ?? (() => {
      }),
      onComplete: ((l = s.options) == null ? void 0 : l.onComplete) ?? (() => {
      })
    }), this._setupTween(s), s;
  }
  unregister(t) {
    if (!this._callbackMap.has(t)) {
      console.warn(`Animator with uuid ${t} not registered`);
      return;
    }
    this._callbackMap.delete(t), this._tweens.delete(t);
  }
  Dispose() {
    this._callbackMap.clear(), this._tweens.clear();
  }
  tick() {
    u();
  }
  Animate(t) {
    return new r(t);
  }
  _setupTween(t) {
    var n;
    const e = new r(t.object).to(t.to, t.duration).easing(((n = t.options) == null ? void 0 : n.easing) ?? _.Quadratic.Out).onUpdate((a, s) => {
      var o;
      (o = this._callbackMap.get(t.uuid)) == null || o.onUpdate(a, s);
    }).onComplete((a) => {
      var s;
      (s = this._callbackMap.get(t.uuid)) == null || s.onComplete(a);
    });
    t.addEventListener("play", () => {
      e.start();
    }), t.addEventListener("stop", () => {
      e.stop();
    }), this._tweens.set(t.uuid, e);
  }
}
export {
  M as AnimationSystem
};
