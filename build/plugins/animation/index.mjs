var d = Object.defineProperty;
var h = (r, e, t) => e in r ? d(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var a = (r, e, t) => h(r, typeof e != "symbol" ? e + "" : e, t);
import * as c from "@tweenjs/tween.js";
import { M as p } from "../../chunks/MathUtils-CFGjHuVF.mjs";
class u {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const i = this._listeners;
    i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === -1 && i[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const i = this._listeners;
    return i[e] !== void 0 && i[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e];
    if (n !== void 0) {
      const s = n.indexOf(t);
      s !== -1 && n.splice(s, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const i = this._listeners[e.type];
    if (i !== void 0) {
      e.target = this;
      const n = i.slice(0);
      for (let s = 0, l = n.length; s < l; s++)
        n[s].call(this, e);
      e.target = null;
    }
  }
}
class _ extends u {
  constructor(t, i, n, s) {
    super();
    a(this, "_uuid", p.generateUUID());
    a(this, "_playing", !1);
    a(this, "_stopped", !1);
    a(this, "_completed", !1);
    this.object = t, this.to = i, this.duration = n, this.options = s;
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
    return this._playing = !0, this._stopped = !1, this.dispatchEvent({ type: "play", target: this }), this;
  }
  stop() {
    return this._playing = !1, this._stopped = !0, this.dispatchEvent({ type: "stop", target: this }), this;
  }
}
class E {
  constructor() {
    a(this, "uuid", p.generateUUID());
    a(this, "TWEEN", c);
    a(this, "_callbackMap", /* @__PURE__ */ new Map());
    a(this, "_tweens", /* @__PURE__ */ new Map());
  }
  /**
   * Creates a new animator and registers it.
   * @param object - The object to animate.
   * @param to - The target value.
   * @param duration - The duration of the animation in milliseconds.
   * @param options - The options for the animation.
   * @returns The animator.
   */
  animate(e, t, i, n) {
    var l, o;
    const s = new _(e, t, i, n);
    return this._callbackMap.set(s.uuid, {
      onUpdate: ((l = s.options) == null ? void 0 : l.onUpdate) ?? (() => {
      }),
      onComplete: ((o = s.options) == null ? void 0 : o.onComplete) ?? (() => {
      })
    }), this._createTween(s), s;
  }
  remove(e) {
    if (!this._callbackMap.has(e)) {
      console.warn(`Animator with uuid ${e} not found`);
      return;
    }
    this._callbackMap.delete(e), this._tweens.delete(e);
  }
  dispose() {
    this._callbackMap.clear(), this._tweens.clear();
  }
  tick() {
    this.TWEEN.update();
  }
  _createTween(e) {
    var i;
    const t = new this.TWEEN.Tween(e.object).to(e.to, e.duration).easing(((i = e.options) == null ? void 0 : i.easing) ?? this.TWEEN.Easing.Quadratic.Out).onUpdate((n, s) => {
      var l;
      (l = this._callbackMap.get(e.uuid)) == null || l.onUpdate(n, s);
    }).onComplete((n) => {
      var s;
      (s = this._callbackMap.get(e.uuid)) == null || s.onComplete(n);
    });
    e.addEventListener("play", () => {
      t.start();
    }), e.addEventListener("stop", () => {
      t.stop();
    }), this._tweens.set(e.uuid, t);
  }
}
export {
  E as AnimationSystem,
  _ as Animator,
  c as TWEEN
};
