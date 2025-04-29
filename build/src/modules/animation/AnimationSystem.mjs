var c = Object.defineProperty;
var u = (a, e, t) => e in a ? c(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var o = (a, e, t) => u(a, typeof e != "symbol" ? e + "" : e, t);
import { update as m, Tween as l, Easing as h } from "@tweenjs/tween.js";
import { EventDispatcher as _, MathUtils as d } from "three";
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
class g extends _ {
  constructor(t, n, i, s) {
    super();
    o(this, "_uuid", d.generateUUID());
    o(this, "_playing", !1);
    o(this, "_stopped", !1);
    o(this, "_completed", !1);
    this.object = t, this.to = n, this.duration = i, this.options = s;
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
class f {
  constructor() {
    o(this, "uuid", d.generateUUID());
    o(this, "_callbackMap", /* @__PURE__ */ new Map());
    o(this, "_tweens", /* @__PURE__ */ new Map());
  }
  /**
   * Creates a new animator and registers it.
   * @param object - The object to animate.
   * @param to - The target object.
   * @param duration - The duration of the animation.
   * @param options - The options for the animation.
   * @returns The animator.
   */
  createAnimator(e, t, n, i) {
    var r, p;
    const s = new g(e, t, n, i);
    return this._callbackMap.set(s.uuid, {
      onUpdate: ((r = s.options) == null ? void 0 : r.onUpdate) ?? (() => {
      }),
      onComplete: ((p = s.options) == null ? void 0 : p.onComplete) ?? (() => {
      })
    }), this._setupTween(s), s;
  }
  unregister(e) {
    if (!this._callbackMap.has(e)) {
      console.warn(`Animator with uuid ${e} not registered`);
      return;
    }
    this._callbackMap.delete(e), this._tweens.delete(e);
  }
  Dispose() {
    this._callbackMap.clear(), this._tweens.clear();
  }
  tick() {
    m();
  }
  Animate(e) {
    return new l(e);
  }
  _setupTween(e) {
    var n;
    const t = new l(e.object).to(e.to, e.duration).easing(((n = e.options) == null ? void 0 : n.easing) ?? h.Quadratic.Out).onUpdate((i, s) => {
      var r;
      (r = this._callbackMap.get(e.uuid)) == null || r.onUpdate(i, s);
    }).onComplete((i) => {
      var s;
      (s = this._callbackMap.get(e.uuid)) == null || s.onComplete(i);
    });
    e.addEventListener("play", () => {
      t.start();
    }), e.addEventListener("stop", () => {
      t.stop();
    }), this._tweens.set(e.uuid, t);
  }
}
export {
  f as AnimationSystem
};
