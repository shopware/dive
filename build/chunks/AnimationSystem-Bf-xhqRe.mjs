var d = Object.defineProperty;
var h = (a, t, e) => t in a ? d(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var i = (a, t, e) => h(a, typeof t != "symbol" ? t + "" : t, e);
import { update as u, Tween as r, Easing as _ } from "@tweenjs/tween.js";
import { EventDispatcher as g, MathUtils as c } from "three";
class y extends g {
  constructor(e, p, n, s) {
    super();
    i(this, "_uuid", c.generateUUID());
    i(this, "_playing", !1);
    i(this, "_stopped", !1);
    i(this, "_completed", !1);
    this.object = e, this.to = p, this.duration = n, this.options = s;
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
class w {
  constructor() {
    i(this, "uuid", c.generateUUID());
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
  createAnimator(t, e, p, n) {
    var o, l;
    const s = new y(t, e, p, n);
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
  dispose() {
    this._callbackMap.clear(), this._tweens.clear();
  }
  tick() {
    u();
  }
  animate(t) {
    return new r(t);
  }
  _setupTween(t) {
    var p;
    const e = new r(t.object).to(t.to, t.duration).easing(((p = t.options) == null ? void 0 : p.easing) ?? _.Quadratic.Out).onUpdate((n, s) => {
      var o;
      (o = this._callbackMap.get(t.uuid)) == null || o.onUpdate(n, s);
    }).onComplete((n) => {
      var s;
      (s = this._callbackMap.get(t.uuid)) == null || s.onComplete(n);
    });
    t.addEventListener("play", () => {
      e.start();
    }), t.addEventListener("stop", () => {
      e.stop();
    }), this._tweens.set(t.uuid, e);
  }
}
const M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AnimationSystem: w
}, Symbol.toStringTag, { value: "Module" }));
export {
  w as A,
  y as a,
  M as b
};
