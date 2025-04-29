var v_ = Object.defineProperty;
var w_ = (g, h, f) => h in g ? v_(g, h, { enumerable: !0, configurable: !0, writable: !0, value: f }) : g[h] = f;
var nn = (g, h, f) => w_(g, typeof h != "symbol" ? h + "" : h, f);
import { Easing as _o } from "@tweenjs/tween.js";
import { g as wo } from "./SelectTool-BqLz-UL1.mjs";
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
const on = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function x_() {
  const g = Math.random() * 4294967295 | 0, h = Math.random() * 4294967295 | 0, f = Math.random() * 4294967295 | 0, x = Math.random() * 4294967295 | 0;
  return (on[g & 255] + on[g >> 8 & 255] + on[g >> 16 & 255] + on[g >> 24 & 255] + "-" + on[h & 255] + on[h >> 8 & 255] + "-" + on[h >> 16 & 15 | 64] + on[h >> 24 & 255] + "-" + on[f & 63 | 128] + on[f >> 8 & 255] + "-" + on[f >> 16 & 255] + on[f >> 24 & 255] + on[x & 255] + on[x >> 8 & 255] + on[x >> 16 & 255] + on[x >> 24 & 255]).toLowerCase();
}
class ht {
  constructor(h) {
    nn(this, "_promise", null);
    nn(this, "_instance", null);
    nn(this, "_importFn");
    this._moduleName = h, this._importFn = async () => {
      if (!window.__MODULE_PATHS__)
        throw new Error(
          "Module path map not found, invalid build of @shopware-ag/dive!"
        );
      const f = window.__MODULE_PATHS__;
      try {
        if (!f || !f[this._moduleName])
          throw new Error(
            `Module ${this._moduleName} not found in path map`
          );
        const x = await this._dynamicImport(
          f[this._moduleName]
        );
        if (!x[this._moduleName])
          throw new Error(
            `Module class not found in dynamically imported module: ${this._moduleName}`
          );
        return x[this._moduleName];
      } catch (x) {
        throw new Error(
          `Failed to dynamically import module from path ${f[this._moduleName]}: ${x.message}`
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
  async instantiate(...h) {
    if (this._instance !== null)
      return Promise.resolve(this._instance);
    const f = await this.import();
    return this._instance = new f(...h), this._instance;
  }
  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _dynamicImport(h) {
    return import(
      /* @vite-ignore */
      h
    );
  }
}
const xo = {};
function N(g, h) {
  xo[g] = h;
}
function A_(g) {
  return xo[g];
}
class F {
  constructor(h, f) {
    nn(this, "_payload");
    nn(this, "_dependencies");
    this._payload = h, this._dependencies = f;
  }
  /**
   * Factory method to create a new Action class with the specified description and execution logic.
   *
   * @template T - The type of the payload (use void for actions without payload)
   * @template D - The type of dependencies
   * @template R - The return type of the action
   * @param options - Configuration options for the action
   * @param options.description - A description of what the action does
   * @param options.execute - The function that implements the action's logic
   * @returns A new Action class that can be instantiated with payload and dependencies
   */
  static define({
    description: h,
    execute: f
  }) {
    return class extends F {
      constructor(b, $) {
        super(b, $);
        nn(this, "_description", h);
        nn(this, "_payload");
        this._payload = b;
      }
      execute() {
        return f(this._payload, this._dependencies);
      }
    };
  }
}
const m_ = F.define({
  description: "Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer)",
  execute: async (g, { ARSystem: h }) => h.instantiate().then((f) => {
    f.launch(g.uri, g.options);
  })
});
N("LAUNCH_AR", m_);
const E_ = F.define({
  description: "Calculates the camera position and target to view the whole scene. (experimental).",
  execute: (g, { engine: h, controller: f }) => {
    const x = h.scene.ComputeSceneBB();
    return f.computeEncompassingView(x);
  }
});
N("COMPUTE_ENCOMPASSING_VIEW", E_);
const b_ = F.define({
  description: "Gets the current camera position and target.",
  execute: (g, { controller: h }) => ({
    position: h.object.position.clone(),
    target: h.target.clone()
  })
});
N("GET_CAMERA_TRANSFORM", b_);
function np(g) {
  return g.entityType === "primitive";
}
function S_(g) {
  return g.entityType === "model";
}
function ep(g) {
  return g.entityType === "light";
}
function Ao(g) {
  return g.entityType === "pov";
}
function tp(g) {
  return g.entityType === "group";
}
const O_ = F.define({
  description: "Moves the camera to a new position and target.",
  execute: async (g, { controller: h, registered: f, AnimationSystem: x, engine: b }) => {
    let $ = { x: 0, y: 0, z: 0 }, B = { x: 0, y: 0, z: 0 };
    if ("id" in g) {
      const H = f.get(g.id);
      if (!H)
        throw new Error(
          `POV with id ${g.id} not registered. Registered: ${f}`
        );
      if (!Ao(H))
        throw new Error(
          `Object with id ${g.id} is not a POV. Object: ${H}`
        );
      $ = H.position, B = H.target;
    } else
      $ = g.position, B = g.target;
    const X = await x.instantiate().then(
      (H) => {
        b.clock.addTicker(H), h.enabled = !0;
        const ar = H.createAnimator(
          h.object.position,
          $,
          g.duration,
          {
            easing: _o.Quadratic.Out
          }
        ).play(), we = H.createAnimator(
          h.target,
          B,
          g.duration,
          {
            easing: _o.Quadratic.Out,
            onUpdate: () => {
              h.object.lookAt(h.target);
            },
            onComplete: () => {
              h.enabled = !g.locked;
            }
          }
        ).play();
        return [
          ar,
          we
        ];
      }
    );
    return {
      stop: () => X.forEach((H) => H.stop())
    };
  }
});
N("MOVE_CAMERA", O_);
const T_ = F.define({
  description: "Sets the camera layer to a certain layer.",
  execute: (g, { controller: h }) => {
    h.object.setCameraLayer(g.layer);
  }
});
N("SET_CAMERA_LAYER", T_);
const R_ = F.define({
  description: "Sets the camera position and target.",
  execute: (g, { controller: h }) => {
    h.object.position.copy(g.position), h.target.copy(g.target), h.update();
  }
});
N("SET_CAMERA_TRANSFORM", R_);
const C_ = F.define({
  description: "Zooms the camera in or out by a certain amount.",
  execute: (g, { controller: h }) => {
    g.direction === "IN" && h.zoomIn(g.by), g.direction === "OUT" && h.zoomOut(g.by);
  }
});
N("ZOOM_CAMERA", C_);
const I_ = F.define({
  description: "Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI.",
  execute: async (g, { engine: h, registered: f, controller: x, MediaCreator: b }) => {
    let $ = { x: 0, y: 0, z: 0 }, B = { x: 0, y: 0, z: 0 };
    if ("id" in g) {
      const X = f.get(g.id);
      if (!X)
        throw new Error(
          `Object with id ${g.id} not registered. Registered: ${f}`
        );
      if (!Ao(X))
        throw new Error(
          `Object with id ${g.id} is not a POV. Object: ${X}`
        );
      $ = X.position, B = X.target;
    } else
      $ = g.position, B = g.target;
    return b.instantiate(
      h.renderer,
      h.scene,
      x
    ).then((X) => X.GenerateMedia(
      $,
      B,
      g.width,
      g.height
    ));
  }
});
N("GENERATE_MEDIA", I_);
const y_ = F.define({
  description: "Adds an object to the scene.",
  execute: (g, { engine: h, registered: f }) => {
    f.get(g.id) || (g.parentId === void 0 && (g.parentId = null), f.set(g.id, g), h.scene.AddSceneObject(g));
  }
});
N("ADD_OBJECT", y_);
var cr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, dt = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var L_ = dt.exports, po;
function M_() {
  return po || (po = 1, function(g, h) {
    (function() {
      var f, x = "4.17.21", b = 200, $ = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", B = "Expected a function", X = "Invalid `variable` option passed into `_.template`", H = "__lodash_hash_undefined__", ar = 500, we = "__lodash_placeholder__", jn = 1, Pi = 2, xe = 4, Ae = 1, gt = 2, In = 1, me = 2, Di = 4, Nn = 8, $e = 16, $n = 32, He = 64, Hn = 128, ze = 256, lr = 512, Eo = 30, bo = "...", So = 800, Oo = 16, Bi = 1, To = 2, Ro = 3, _t = 1 / 0, Ee = 9007199254740991, Co = 17976931348623157e292, pt = NaN, Un = 4294967295, Io = Un - 1, yo = Un >>> 1, Lo = [
        ["ary", Hn],
        ["bind", In],
        ["bindKey", me],
        ["curry", Nn],
        ["curryRight", $e],
        ["flip", lr],
        ["partial", $n],
        ["partialRight", He],
        ["rearg", ze]
      ], be = "[object Arguments]", vt = "[object Array]", Mo = "[object AsyncFunction]", qe = "[object Boolean]", Ke = "[object Date]", Po = "[object DOMException]", wt = "[object Error]", xt = "[object Function]", Ui = "[object GeneratorFunction]", yn = "[object Map]", Ze = "[object Number]", Do = "[object Null]", zn = "[object Object]", Wi = "[object Promise]", Bo = "[object Proxy]", Ye = "[object RegExp]", Ln = "[object Set]", Je = "[object String]", At = "[object Symbol]", Uo = "[object Undefined]", Xe = "[object WeakMap]", Wo = "[object WeakSet]", Qe = "[object ArrayBuffer]", Se = "[object DataView]", hr = "[object Float32Array]", dr = "[object Float64Array]", gr = "[object Int8Array]", _r = "[object Int16Array]", pr = "[object Int32Array]", vr = "[object Uint8Array]", wr = "[object Uint8ClampedArray]", xr = "[object Uint16Array]", Ar = "[object Uint32Array]", Fo = /\b__p \+= '';/g, Go = /\b(__p \+=) '' \+/g, No = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Fi = /&(?:amp|lt|gt|quot|#39);/g, Gi = /[&<>"']/g, $o = RegExp(Fi.source), Ho = RegExp(Gi.source), zo = /<%-([\s\S]+?)%>/g, qo = /<%([\s\S]+?)%>/g, Ni = /<%=([\s\S]+?)%>/g, Ko = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Zo = /^\w*$/, Yo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, Jo = RegExp(mr.source), Er = /^\s+/, Xo = /\s/, Qo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Vo = /\{\n\/\* \[wrapped with (.+)\] \*/, ko = /,? & /, jo = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, ns = /[()=,{}\[\]\/\s]/, es = /\\(\\)?/g, ts = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, $i = /\w*$/, rs = /^[-+]0x[0-9a-f]+$/i, is = /^0b[01]+$/i, us = /^\[object .+?Constructor\]$/, fs = /^0o[0-7]+$/i, os = /^(?:0|[1-9]\d*)$/, ss = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, mt = /($^)/, cs = /['\n\r\u2028\u2029\\]/g, Et = "\\ud800-\\udfff", as = "\\u0300-\\u036f", ls = "\\ufe20-\\ufe2f", hs = "\\u20d0-\\u20ff", Hi = as + ls + hs, zi = "\\u2700-\\u27bf", qi = "a-z\\xdf-\\xf6\\xf8-\\xff", ds = "\\xac\\xb1\\xd7\\xf7", gs = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", _s = "\\u2000-\\u206f", ps = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ki = "A-Z\\xc0-\\xd6\\xd8-\\xde", Zi = "\\ufe0e\\ufe0f", Yi = ds + gs + _s + ps, br = "['’]", vs = "[" + Et + "]", Ji = "[" + Yi + "]", bt = "[" + Hi + "]", Xi = "\\d+", ws = "[" + zi + "]", Qi = "[" + qi + "]", Vi = "[^" + Et + Yi + Xi + zi + qi + Ki + "]", Sr = "\\ud83c[\\udffb-\\udfff]", xs = "(?:" + bt + "|" + Sr + ")", ki = "[^" + Et + "]", Or = "(?:\\ud83c[\\udde6-\\uddff]){2}", Tr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Oe = "[" + Ki + "]", ji = "\\u200d", nu = "(?:" + Qi + "|" + Vi + ")", As = "(?:" + Oe + "|" + Vi + ")", eu = "(?:" + br + "(?:d|ll|m|re|s|t|ve))?", tu = "(?:" + br + "(?:D|LL|M|RE|S|T|VE))?", ru = xs + "?", iu = "[" + Zi + "]?", ms = "(?:" + ji + "(?:" + [ki, Or, Tr].join("|") + ")" + iu + ru + ")*", Es = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", bs = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", uu = iu + ru + ms, Ss = "(?:" + [ws, Or, Tr].join("|") + ")" + uu, Os = "(?:" + [ki + bt + "?", bt, Or, Tr, vs].join("|") + ")", Ts = RegExp(br, "g"), Rs = RegExp(bt, "g"), Rr = RegExp(Sr + "(?=" + Sr + ")|" + Os + uu, "g"), Cs = RegExp([
        Oe + "?" + Qi + "+" + eu + "(?=" + [Ji, Oe, "$"].join("|") + ")",
        As + "+" + tu + "(?=" + [Ji, Oe + nu, "$"].join("|") + ")",
        Oe + "?" + nu + "+" + eu,
        Oe + "+" + tu,
        bs,
        Es,
        Xi,
        Ss
      ].join("|"), "g"), Is = RegExp("[" + ji + Et + Hi + Zi + "]"), ys = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Ls = [
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
      ], Ms = -1, K = {};
      K[hr] = K[dr] = K[gr] = K[_r] = K[pr] = K[vr] = K[wr] = K[xr] = K[Ar] = !0, K[be] = K[vt] = K[Qe] = K[qe] = K[Se] = K[Ke] = K[wt] = K[xt] = K[yn] = K[Ze] = K[zn] = K[Ye] = K[Ln] = K[Je] = K[Xe] = !1;
      var q = {};
      q[be] = q[vt] = q[Qe] = q[Se] = q[qe] = q[Ke] = q[hr] = q[dr] = q[gr] = q[_r] = q[pr] = q[yn] = q[Ze] = q[zn] = q[Ye] = q[Ln] = q[Je] = q[At] = q[vr] = q[wr] = q[xr] = q[Ar] = !0, q[wt] = q[xt] = q[Xe] = !1;
      var Ps = {
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
      }, Ds = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, Bs = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, Us = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, Ws = parseFloat, Fs = parseInt, fu = typeof cr == "object" && cr && cr.Object === Object && cr, Gs = typeof self == "object" && self && self.Object === Object && self, tn = fu || Gs || Function("return this")(), Cr = h && !h.nodeType && h, ce = Cr && !0 && g && !g.nodeType && g, ou = ce && ce.exports === Cr, Ir = ou && fu.process, mn = function() {
        try {
          var a = ce && ce.require && ce.require("util").types;
          return a || Ir && Ir.binding && Ir.binding("util");
        } catch {
        }
      }(), su = mn && mn.isArrayBuffer, cu = mn && mn.isDate, au = mn && mn.isMap, lu = mn && mn.isRegExp, hu = mn && mn.isSet, du = mn && mn.isTypedArray;
      function _n(a, _, d) {
        switch (d.length) {
          case 0:
            return a.call(_);
          case 1:
            return a.call(_, d[0]);
          case 2:
            return a.call(_, d[0], d[1]);
          case 3:
            return a.call(_, d[0], d[1], d[2]);
        }
        return a.apply(_, d);
      }
      function Ns(a, _, d, m) {
        for (var R = -1, U = a == null ? 0 : a.length; ++R < U; ) {
          var k = a[R];
          _(m, k, d(k), a);
        }
        return m;
      }
      function En(a, _) {
        for (var d = -1, m = a == null ? 0 : a.length; ++d < m && _(a[d], d, a) !== !1; )
          ;
        return a;
      }
      function $s(a, _) {
        for (var d = a == null ? 0 : a.length; d-- && _(a[d], d, a) !== !1; )
          ;
        return a;
      }
      function gu(a, _) {
        for (var d = -1, m = a == null ? 0 : a.length; ++d < m; )
          if (!_(a[d], d, a))
            return !1;
        return !0;
      }
      function ne(a, _) {
        for (var d = -1, m = a == null ? 0 : a.length, R = 0, U = []; ++d < m; ) {
          var k = a[d];
          _(k, d, a) && (U[R++] = k);
        }
        return U;
      }
      function St(a, _) {
        var d = a == null ? 0 : a.length;
        return !!d && Te(a, _, 0) > -1;
      }
      function yr(a, _, d) {
        for (var m = -1, R = a == null ? 0 : a.length; ++m < R; )
          if (d(_, a[m]))
            return !0;
        return !1;
      }
      function Z(a, _) {
        for (var d = -1, m = a == null ? 0 : a.length, R = Array(m); ++d < m; )
          R[d] = _(a[d], d, a);
        return R;
      }
      function ee(a, _) {
        for (var d = -1, m = _.length, R = a.length; ++d < m; )
          a[R + d] = _[d];
        return a;
      }
      function Lr(a, _, d, m) {
        var R = -1, U = a == null ? 0 : a.length;
        for (m && U && (d = a[++R]); ++R < U; )
          d = _(d, a[R], R, a);
        return d;
      }
      function Hs(a, _, d, m) {
        var R = a == null ? 0 : a.length;
        for (m && R && (d = a[--R]); R--; )
          d = _(d, a[R], R, a);
        return d;
      }
      function Mr(a, _) {
        for (var d = -1, m = a == null ? 0 : a.length; ++d < m; )
          if (_(a[d], d, a))
            return !0;
        return !1;
      }
      var zs = Pr("length");
      function qs(a) {
        return a.split("");
      }
      function Ks(a) {
        return a.match(jo) || [];
      }
      function _u(a, _, d) {
        var m;
        return d(a, function(R, U, k) {
          if (_(R, U, k))
            return m = U, !1;
        }), m;
      }
      function Ot(a, _, d, m) {
        for (var R = a.length, U = d + (m ? 1 : -1); m ? U-- : ++U < R; )
          if (_(a[U], U, a))
            return U;
        return -1;
      }
      function Te(a, _, d) {
        return _ === _ ? rc(a, _, d) : Ot(a, pu, d);
      }
      function Zs(a, _, d, m) {
        for (var R = d - 1, U = a.length; ++R < U; )
          if (m(a[R], _))
            return R;
        return -1;
      }
      function pu(a) {
        return a !== a;
      }
      function vu(a, _) {
        var d = a == null ? 0 : a.length;
        return d ? Br(a, _) / d : pt;
      }
      function Pr(a) {
        return function(_) {
          return _ == null ? f : _[a];
        };
      }
      function Dr(a) {
        return function(_) {
          return a == null ? f : a[_];
        };
      }
      function wu(a, _, d, m, R) {
        return R(a, function(U, k, z) {
          d = m ? (m = !1, U) : _(d, U, k, z);
        }), d;
      }
      function Ys(a, _) {
        var d = a.length;
        for (a.sort(_); d--; )
          a[d] = a[d].value;
        return a;
      }
      function Br(a, _) {
        for (var d, m = -1, R = a.length; ++m < R; ) {
          var U = _(a[m]);
          U !== f && (d = d === f ? U : d + U);
        }
        return d;
      }
      function Ur(a, _) {
        for (var d = -1, m = Array(a); ++d < a; )
          m[d] = _(d);
        return m;
      }
      function Js(a, _) {
        return Z(_, function(d) {
          return [d, a[d]];
        });
      }
      function xu(a) {
        return a && a.slice(0, bu(a) + 1).replace(Er, "");
      }
      function pn(a) {
        return function(_) {
          return a(_);
        };
      }
      function Wr(a, _) {
        return Z(_, function(d) {
          return a[d];
        });
      }
      function Ve(a, _) {
        return a.has(_);
      }
      function Au(a, _) {
        for (var d = -1, m = a.length; ++d < m && Te(_, a[d], 0) > -1; )
          ;
        return d;
      }
      function mu(a, _) {
        for (var d = a.length; d-- && Te(_, a[d], 0) > -1; )
          ;
        return d;
      }
      function Xs(a, _) {
        for (var d = a.length, m = 0; d--; )
          a[d] === _ && ++m;
        return m;
      }
      var Qs = Dr(Ps), Vs = Dr(Ds);
      function ks(a) {
        return "\\" + Us[a];
      }
      function js(a, _) {
        return a == null ? f : a[_];
      }
      function Re(a) {
        return Is.test(a);
      }
      function nc(a) {
        return ys.test(a);
      }
      function ec(a) {
        for (var _, d = []; !(_ = a.next()).done; )
          d.push(_.value);
        return d;
      }
      function Fr(a) {
        var _ = -1, d = Array(a.size);
        return a.forEach(function(m, R) {
          d[++_] = [R, m];
        }), d;
      }
      function Eu(a, _) {
        return function(d) {
          return a(_(d));
        };
      }
      function te(a, _) {
        for (var d = -1, m = a.length, R = 0, U = []; ++d < m; ) {
          var k = a[d];
          (k === _ || k === we) && (a[d] = we, U[R++] = d);
        }
        return U;
      }
      function Tt(a) {
        var _ = -1, d = Array(a.size);
        return a.forEach(function(m) {
          d[++_] = m;
        }), d;
      }
      function tc(a) {
        var _ = -1, d = Array(a.size);
        return a.forEach(function(m) {
          d[++_] = [m, m];
        }), d;
      }
      function rc(a, _, d) {
        for (var m = d - 1, R = a.length; ++m < R; )
          if (a[m] === _)
            return m;
        return -1;
      }
      function ic(a, _, d) {
        for (var m = d + 1; m--; )
          if (a[m] === _)
            return m;
        return m;
      }
      function Ce(a) {
        return Re(a) ? fc(a) : zs(a);
      }
      function Mn(a) {
        return Re(a) ? oc(a) : qs(a);
      }
      function bu(a) {
        for (var _ = a.length; _-- && Xo.test(a.charAt(_)); )
          ;
        return _;
      }
      var uc = Dr(Bs);
      function fc(a) {
        for (var _ = Rr.lastIndex = 0; Rr.test(a); )
          ++_;
        return _;
      }
      function oc(a) {
        return a.match(Rr) || [];
      }
      function sc(a) {
        return a.match(Cs) || [];
      }
      var cc = function a(_) {
        _ = _ == null ? tn : Ie.defaults(tn.Object(), _, Ie.pick(tn, Ls));
        var d = _.Array, m = _.Date, R = _.Error, U = _.Function, k = _.Math, z = _.Object, Gr = _.RegExp, ac = _.String, bn = _.TypeError, Rt = d.prototype, lc = U.prototype, ye = z.prototype, Ct = _["__core-js_shared__"], It = lc.toString, G = ye.hasOwnProperty, hc = 0, Su = function() {
          var n = /[^.]+$/.exec(Ct && Ct.keys && Ct.keys.IE_PROTO || "");
          return n ? "Symbol(src)_1." + n : "";
        }(), yt = ye.toString, dc = It.call(z), gc = tn._, _c = Gr(
          "^" + It.call(G).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Lt = ou ? _.Buffer : f, re = _.Symbol, Mt = _.Uint8Array, Ou = Lt ? Lt.allocUnsafe : f, Pt = Eu(z.getPrototypeOf, z), Tu = z.create, Ru = ye.propertyIsEnumerable, Dt = Rt.splice, Cu = re ? re.isConcatSpreadable : f, ke = re ? re.iterator : f, ae = re ? re.toStringTag : f, Bt = function() {
          try {
            var n = _e(z, "defineProperty");
            return n({}, "", {}), n;
          } catch {
          }
        }(), pc = _.clearTimeout !== tn.clearTimeout && _.clearTimeout, vc = m && m.now !== tn.Date.now && m.now, wc = _.setTimeout !== tn.setTimeout && _.setTimeout, Ut = k.ceil, Wt = k.floor, Nr = z.getOwnPropertySymbols, xc = Lt ? Lt.isBuffer : f, Iu = _.isFinite, Ac = Rt.join, mc = Eu(z.keys, z), j = k.max, un = k.min, Ec = m.now, bc = _.parseInt, yu = k.random, Sc = Rt.reverse, $r = _e(_, "DataView"), je = _e(_, "Map"), Hr = _e(_, "Promise"), Le = _e(_, "Set"), nt = _e(_, "WeakMap"), et = _e(z, "create"), Ft = nt && new nt(), Me = {}, Oc = pe($r), Tc = pe(je), Rc = pe(Hr), Cc = pe(Le), Ic = pe(nt), Gt = re ? re.prototype : f, tt = Gt ? Gt.valueOf : f, Lu = Gt ? Gt.toString : f;
        function u(n) {
          if (J(n) && !C(n) && !(n instanceof P)) {
            if (n instanceof Sn)
              return n;
            if (G.call(n, "__wrapped__"))
              return Pf(n);
          }
          return new Sn(n);
        }
        var Pe = /* @__PURE__ */ function() {
          function n() {
          }
          return function(e) {
            if (!Y(e))
              return {};
            if (Tu)
              return Tu(e);
            n.prototype = e;
            var t = new n();
            return n.prototype = f, t;
          };
        }();
        function Nt() {
        }
        function Sn(n, e) {
          this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = f;
        }
        u.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: zo,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: qo,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: Ni,
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
            _: u
          }
        }, u.prototype = Nt.prototype, u.prototype.constructor = u, Sn.prototype = Pe(Nt.prototype), Sn.prototype.constructor = Sn;
        function P(n) {
          this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Un, this.__views__ = [];
        }
        function yc() {
          var n = new P(this.__wrapped__);
          return n.__actions__ = ln(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = ln(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = ln(this.__views__), n;
        }
        function Lc() {
          if (this.__filtered__) {
            var n = new P(this);
            n.__dir__ = -1, n.__filtered__ = !0;
          } else
            n = this.clone(), n.__dir__ *= -1;
          return n;
        }
        function Mc() {
          var n = this.__wrapped__.value(), e = this.__dir__, t = C(n), r = e < 0, i = t ? n.length : 0, o = qa(0, i, this.__views__), s = o.start, c = o.end, l = c - s, p = r ? c : s - 1, v = this.__iteratees__, w = v.length, A = 0, E = un(l, this.__takeCount__);
          if (!t || !r && i == l && E == l)
            return ef(n, this.__actions__);
          var O = [];
          n:
            for (; l-- && A < E; ) {
              p += e;
              for (var y = -1, T = n[p]; ++y < w; ) {
                var M = v[y], D = M.iteratee, xn = M.type, an = D(T);
                if (xn == To)
                  T = an;
                else if (!an) {
                  if (xn == Bi)
                    continue n;
                  break n;
                }
              }
              O[A++] = T;
            }
          return O;
        }
        P.prototype = Pe(Nt.prototype), P.prototype.constructor = P;
        function le(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.clear(); ++e < t; ) {
            var r = n[e];
            this.set(r[0], r[1]);
          }
        }
        function Pc() {
          this.__data__ = et ? et(null) : {}, this.size = 0;
        }
        function Dc(n) {
          var e = this.has(n) && delete this.__data__[n];
          return this.size -= e ? 1 : 0, e;
        }
        function Bc(n) {
          var e = this.__data__;
          if (et) {
            var t = e[n];
            return t === H ? f : t;
          }
          return G.call(e, n) ? e[n] : f;
        }
        function Uc(n) {
          var e = this.__data__;
          return et ? e[n] !== f : G.call(e, n);
        }
        function Wc(n, e) {
          var t = this.__data__;
          return this.size += this.has(n) ? 0 : 1, t[n] = et && e === f ? H : e, this;
        }
        le.prototype.clear = Pc, le.prototype.delete = Dc, le.prototype.get = Bc, le.prototype.has = Uc, le.prototype.set = Wc;
        function qn(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.clear(); ++e < t; ) {
            var r = n[e];
            this.set(r[0], r[1]);
          }
        }
        function Fc() {
          this.__data__ = [], this.size = 0;
        }
        function Gc(n) {
          var e = this.__data__, t = $t(e, n);
          if (t < 0)
            return !1;
          var r = e.length - 1;
          return t == r ? e.pop() : Dt.call(e, t, 1), --this.size, !0;
        }
        function Nc(n) {
          var e = this.__data__, t = $t(e, n);
          return t < 0 ? f : e[t][1];
        }
        function $c(n) {
          return $t(this.__data__, n) > -1;
        }
        function Hc(n, e) {
          var t = this.__data__, r = $t(t, n);
          return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
        }
        qn.prototype.clear = Fc, qn.prototype.delete = Gc, qn.prototype.get = Nc, qn.prototype.has = $c, qn.prototype.set = Hc;
        function Kn(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.clear(); ++e < t; ) {
            var r = n[e];
            this.set(r[0], r[1]);
          }
        }
        function zc() {
          this.size = 0, this.__data__ = {
            hash: new le(),
            map: new (je || qn)(),
            string: new le()
          };
        }
        function qc(n) {
          var e = jt(this, n).delete(n);
          return this.size -= e ? 1 : 0, e;
        }
        function Kc(n) {
          return jt(this, n).get(n);
        }
        function Zc(n) {
          return jt(this, n).has(n);
        }
        function Yc(n, e) {
          var t = jt(this, n), r = t.size;
          return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
        }
        Kn.prototype.clear = zc, Kn.prototype.delete = qc, Kn.prototype.get = Kc, Kn.prototype.has = Zc, Kn.prototype.set = Yc;
        function he(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.__data__ = new Kn(); ++e < t; )
            this.add(n[e]);
        }
        function Jc(n) {
          return this.__data__.set(n, H), this;
        }
        function Xc(n) {
          return this.__data__.has(n);
        }
        he.prototype.add = he.prototype.push = Jc, he.prototype.has = Xc;
        function Pn(n) {
          var e = this.__data__ = new qn(n);
          this.size = e.size;
        }
        function Qc() {
          this.__data__ = new qn(), this.size = 0;
        }
        function Vc(n) {
          var e = this.__data__, t = e.delete(n);
          return this.size = e.size, t;
        }
        function kc(n) {
          return this.__data__.get(n);
        }
        function jc(n) {
          return this.__data__.has(n);
        }
        function na(n, e) {
          var t = this.__data__;
          if (t instanceof qn) {
            var r = t.__data__;
            if (!je || r.length < b - 1)
              return r.push([n, e]), this.size = ++t.size, this;
            t = this.__data__ = new Kn(r);
          }
          return t.set(n, e), this.size = t.size, this;
        }
        Pn.prototype.clear = Qc, Pn.prototype.delete = Vc, Pn.prototype.get = kc, Pn.prototype.has = jc, Pn.prototype.set = na;
        function Mu(n, e) {
          var t = C(n), r = !t && ve(n), i = !t && !r && se(n), o = !t && !r && !i && We(n), s = t || r || i || o, c = s ? Ur(n.length, ac) : [], l = c.length;
          for (var p in n)
            (e || G.call(n, p)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
            (p == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            i && (p == "offset" || p == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            o && (p == "buffer" || p == "byteLength" || p == "byteOffset") || // Skip index properties.
            Xn(p, l))) && c.push(p);
          return c;
        }
        function Pu(n) {
          var e = n.length;
          return e ? n[jr(0, e - 1)] : f;
        }
        function ea(n, e) {
          return nr(ln(n), de(e, 0, n.length));
        }
        function ta(n) {
          return nr(ln(n));
        }
        function zr(n, e, t) {
          (t !== f && !Dn(n[e], t) || t === f && !(e in n)) && Zn(n, e, t);
        }
        function rt(n, e, t) {
          var r = n[e];
          (!(G.call(n, e) && Dn(r, t)) || t === f && !(e in n)) && Zn(n, e, t);
        }
        function $t(n, e) {
          for (var t = n.length; t--; )
            if (Dn(n[t][0], e))
              return t;
          return -1;
        }
        function ra(n, e, t, r) {
          return ie(n, function(i, o, s) {
            e(r, i, t(i), s);
          }), r;
        }
        function Du(n, e) {
          return n && Fn(e, en(e), n);
        }
        function ia(n, e) {
          return n && Fn(e, dn(e), n);
        }
        function Zn(n, e, t) {
          e == "__proto__" && Bt ? Bt(n, e, {
            configurable: !0,
            enumerable: !0,
            value: t,
            writable: !0
          }) : n[e] = t;
        }
        function qr(n, e) {
          for (var t = -1, r = e.length, i = d(r), o = n == null; ++t < r; )
            i[t] = o ? f : Si(n, e[t]);
          return i;
        }
        function de(n, e, t) {
          return n === n && (t !== f && (n = n <= t ? n : t), e !== f && (n = n >= e ? n : e)), n;
        }
        function On(n, e, t, r, i, o) {
          var s, c = e & jn, l = e & Pi, p = e & xe;
          if (t && (s = i ? t(n, r, i, o) : t(n)), s !== f)
            return s;
          if (!Y(n))
            return n;
          var v = C(n);
          if (v) {
            if (s = Za(n), !c)
              return ln(n, s);
          } else {
            var w = fn(n), A = w == xt || w == Ui;
            if (se(n))
              return uf(n, c);
            if (w == zn || w == be || A && !i) {
              if (s = l || A ? {} : Sf(n), !c)
                return l ? Ba(n, ia(s, n)) : Da(n, Du(s, n));
            } else {
              if (!q[w])
                return i ? n : {};
              s = Ya(n, w, c);
            }
          }
          o || (o = new Pn());
          var E = o.get(n);
          if (E)
            return E;
          o.set(n, s), jf(n) ? n.forEach(function(T) {
            s.add(On(T, e, t, T, n, o));
          }) : Vf(n) && n.forEach(function(T, M) {
            s.set(M, On(T, e, t, M, n, o));
          });
          var O = p ? l ? ai : ci : l ? dn : en, y = v ? f : O(n);
          return En(y || n, function(T, M) {
            y && (M = T, T = n[M]), rt(s, M, On(T, e, t, M, n, o));
          }), s;
        }
        function ua(n) {
          var e = en(n);
          return function(t) {
            return Bu(t, n, e);
          };
        }
        function Bu(n, e, t) {
          var r = t.length;
          if (n == null)
            return !r;
          for (n = z(n); r--; ) {
            var i = t[r], o = e[i], s = n[i];
            if (s === f && !(i in n) || !o(s))
              return !1;
          }
          return !0;
        }
        function Uu(n, e, t) {
          if (typeof n != "function")
            throw new bn(B);
          return at(function() {
            n.apply(f, t);
          }, e);
        }
        function it(n, e, t, r) {
          var i = -1, o = St, s = !0, c = n.length, l = [], p = e.length;
          if (!c)
            return l;
          t && (e = Z(e, pn(t))), r ? (o = yr, s = !1) : e.length >= b && (o = Ve, s = !1, e = new he(e));
          n:
            for (; ++i < c; ) {
              var v = n[i], w = t == null ? v : t(v);
              if (v = r || v !== 0 ? v : 0, s && w === w) {
                for (var A = p; A--; )
                  if (e[A] === w)
                    continue n;
                l.push(v);
              } else o(e, w, r) || l.push(v);
            }
          return l;
        }
        var ie = af(Wn), Wu = af(Zr, !0);
        function fa(n, e) {
          var t = !0;
          return ie(n, function(r, i, o) {
            return t = !!e(r, i, o), t;
          }), t;
        }
        function Ht(n, e, t) {
          for (var r = -1, i = n.length; ++r < i; ) {
            var o = n[r], s = e(o);
            if (s != null && (c === f ? s === s && !wn(s) : t(s, c)))
              var c = s, l = o;
          }
          return l;
        }
        function oa(n, e, t, r) {
          var i = n.length;
          for (t = I(t), t < 0 && (t = -t > i ? 0 : i + t), r = r === f || r > i ? i : I(r), r < 0 && (r += i), r = t > r ? 0 : eo(r); t < r; )
            n[t++] = e;
          return n;
        }
        function Fu(n, e) {
          var t = [];
          return ie(n, function(r, i, o) {
            e(r, i, o) && t.push(r);
          }), t;
        }
        function rn(n, e, t, r, i) {
          var o = -1, s = n.length;
          for (t || (t = Xa), i || (i = []); ++o < s; ) {
            var c = n[o];
            e > 0 && t(c) ? e > 1 ? rn(c, e - 1, t, r, i) : ee(i, c) : r || (i[i.length] = c);
          }
          return i;
        }
        var Kr = lf(), Gu = lf(!0);
        function Wn(n, e) {
          return n && Kr(n, e, en);
        }
        function Zr(n, e) {
          return n && Gu(n, e, en);
        }
        function zt(n, e) {
          return ne(e, function(t) {
            return Qn(n[t]);
          });
        }
        function ge(n, e) {
          e = fe(e, n);
          for (var t = 0, r = e.length; n != null && t < r; )
            n = n[Gn(e[t++])];
          return t && t == r ? n : f;
        }
        function Nu(n, e, t) {
          var r = e(n);
          return C(n) ? r : ee(r, t(n));
        }
        function sn(n) {
          return n == null ? n === f ? Uo : Do : ae && ae in z(n) ? za(n) : tl(n);
        }
        function Yr(n, e) {
          return n > e;
        }
        function sa(n, e) {
          return n != null && G.call(n, e);
        }
        function ca(n, e) {
          return n != null && e in z(n);
        }
        function aa(n, e, t) {
          return n >= un(e, t) && n < j(e, t);
        }
        function Jr(n, e, t) {
          for (var r = t ? yr : St, i = n[0].length, o = n.length, s = o, c = d(o), l = 1 / 0, p = []; s--; ) {
            var v = n[s];
            s && e && (v = Z(v, pn(e))), l = un(v.length, l), c[s] = !t && (e || i >= 120 && v.length >= 120) ? new he(s && v) : f;
          }
          v = n[0];
          var w = -1, A = c[0];
          n:
            for (; ++w < i && p.length < l; ) {
              var E = v[w], O = e ? e(E) : E;
              if (E = t || E !== 0 ? E : 0, !(A ? Ve(A, O) : r(p, O, t))) {
                for (s = o; --s; ) {
                  var y = c[s];
                  if (!(y ? Ve(y, O) : r(n[s], O, t)))
                    continue n;
                }
                A && A.push(O), p.push(E);
              }
            }
          return p;
        }
        function la(n, e, t, r) {
          return Wn(n, function(i, o, s) {
            e(r, t(i), o, s);
          }), r;
        }
        function ut(n, e, t) {
          e = fe(e, n), n = Cf(n, e);
          var r = n == null ? n : n[Gn(Rn(e))];
          return r == null ? f : _n(r, n, t);
        }
        function $u(n) {
          return J(n) && sn(n) == be;
        }
        function ha(n) {
          return J(n) && sn(n) == Qe;
        }
        function da(n) {
          return J(n) && sn(n) == Ke;
        }
        function ft(n, e, t, r, i) {
          return n === e ? !0 : n == null || e == null || !J(n) && !J(e) ? n !== n && e !== e : ga(n, e, t, r, ft, i);
        }
        function ga(n, e, t, r, i, o) {
          var s = C(n), c = C(e), l = s ? vt : fn(n), p = c ? vt : fn(e);
          l = l == be ? zn : l, p = p == be ? zn : p;
          var v = l == zn, w = p == zn, A = l == p;
          if (A && se(n)) {
            if (!se(e))
              return !1;
            s = !0, v = !1;
          }
          if (A && !v)
            return o || (o = new Pn()), s || We(n) ? mf(n, e, t, r, i, o) : $a(n, e, l, t, r, i, o);
          if (!(t & Ae)) {
            var E = v && G.call(n, "__wrapped__"), O = w && G.call(e, "__wrapped__");
            if (E || O) {
              var y = E ? n.value() : n, T = O ? e.value() : e;
              return o || (o = new Pn()), i(y, T, t, r, o);
            }
          }
          return A ? (o || (o = new Pn()), Ha(n, e, t, r, i, o)) : !1;
        }
        function _a(n) {
          return J(n) && fn(n) == yn;
        }
        function Xr(n, e, t, r) {
          var i = t.length, o = i, s = !r;
          if (n == null)
            return !o;
          for (n = z(n); i--; ) {
            var c = t[i];
            if (s && c[2] ? c[1] !== n[c[0]] : !(c[0] in n))
              return !1;
          }
          for (; ++i < o; ) {
            c = t[i];
            var l = c[0], p = n[l], v = c[1];
            if (s && c[2]) {
              if (p === f && !(l in n))
                return !1;
            } else {
              var w = new Pn();
              if (r)
                var A = r(p, v, l, n, e, w);
              if (!(A === f ? ft(v, p, Ae | gt, r, w) : A))
                return !1;
            }
          }
          return !0;
        }
        function Hu(n) {
          if (!Y(n) || Va(n))
            return !1;
          var e = Qn(n) ? _c : us;
          return e.test(pe(n));
        }
        function pa(n) {
          return J(n) && sn(n) == Ye;
        }
        function va(n) {
          return J(n) && fn(n) == Ln;
        }
        function wa(n) {
          return J(n) && fr(n.length) && !!K[sn(n)];
        }
        function zu(n) {
          return typeof n == "function" ? n : n == null ? gn : typeof n == "object" ? C(n) ? Zu(n[0], n[1]) : Ku(n) : ho(n);
        }
        function Qr(n) {
          if (!ct(n))
            return mc(n);
          var e = [];
          for (var t in z(n))
            G.call(n, t) && t != "constructor" && e.push(t);
          return e;
        }
        function xa(n) {
          if (!Y(n))
            return el(n);
          var e = ct(n), t = [];
          for (var r in n)
            r == "constructor" && (e || !G.call(n, r)) || t.push(r);
          return t;
        }
        function Vr(n, e) {
          return n < e;
        }
        function qu(n, e) {
          var t = -1, r = hn(n) ? d(n.length) : [];
          return ie(n, function(i, o, s) {
            r[++t] = e(i, o, s);
          }), r;
        }
        function Ku(n) {
          var e = hi(n);
          return e.length == 1 && e[0][2] ? Tf(e[0][0], e[0][1]) : function(t) {
            return t === n || Xr(t, n, e);
          };
        }
        function Zu(n, e) {
          return gi(n) && Of(e) ? Tf(Gn(n), e) : function(t) {
            var r = Si(t, n);
            return r === f && r === e ? Oi(t, n) : ft(e, r, Ae | gt);
          };
        }
        function qt(n, e, t, r, i) {
          n !== e && Kr(e, function(o, s) {
            if (i || (i = new Pn()), Y(o))
              Aa(n, e, s, t, qt, r, i);
            else {
              var c = r ? r(pi(n, s), o, s + "", n, e, i) : f;
              c === f && (c = o), zr(n, s, c);
            }
          }, dn);
        }
        function Aa(n, e, t, r, i, o, s) {
          var c = pi(n, t), l = pi(e, t), p = s.get(l);
          if (p) {
            zr(n, t, p);
            return;
          }
          var v = o ? o(c, l, t + "", n, e, s) : f, w = v === f;
          if (w) {
            var A = C(l), E = !A && se(l), O = !A && !E && We(l);
            v = l, A || E || O ? C(c) ? v = c : Q(c) ? v = ln(c) : E ? (w = !1, v = uf(l, !0)) : O ? (w = !1, v = ff(l, !0)) : v = [] : lt(l) || ve(l) ? (v = c, ve(c) ? v = to(c) : (!Y(c) || Qn(c)) && (v = Sf(l))) : w = !1;
          }
          w && (s.set(l, v), i(v, l, r, o, s), s.delete(l)), zr(n, t, v);
        }
        function Yu(n, e) {
          var t = n.length;
          if (t)
            return e += e < 0 ? t : 0, Xn(e, t) ? n[e] : f;
        }
        function Ju(n, e, t) {
          e.length ? e = Z(e, function(o) {
            return C(o) ? function(s) {
              return ge(s, o.length === 1 ? o[0] : o);
            } : o;
          }) : e = [gn];
          var r = -1;
          e = Z(e, pn(S()));
          var i = qu(n, function(o, s, c) {
            var l = Z(e, function(p) {
              return p(o);
            });
            return { criteria: l, index: ++r, value: o };
          });
          return Ys(i, function(o, s) {
            return Pa(o, s, t);
          });
        }
        function ma(n, e) {
          return Xu(n, e, function(t, r) {
            return Oi(n, r);
          });
        }
        function Xu(n, e, t) {
          for (var r = -1, i = e.length, o = {}; ++r < i; ) {
            var s = e[r], c = ge(n, s);
            t(c, s) && ot(o, fe(s, n), c);
          }
          return o;
        }
        function Ea(n) {
          return function(e) {
            return ge(e, n);
          };
        }
        function kr(n, e, t, r) {
          var i = r ? Zs : Te, o = -1, s = e.length, c = n;
          for (n === e && (e = ln(e)), t && (c = Z(n, pn(t))); ++o < s; )
            for (var l = 0, p = e[o], v = t ? t(p) : p; (l = i(c, v, l, r)) > -1; )
              c !== n && Dt.call(c, l, 1), Dt.call(n, l, 1);
          return n;
        }
        function Qu(n, e) {
          for (var t = n ? e.length : 0, r = t - 1; t--; ) {
            var i = e[t];
            if (t == r || i !== o) {
              var o = i;
              Xn(i) ? Dt.call(n, i, 1) : ti(n, i);
            }
          }
          return n;
        }
        function jr(n, e) {
          return n + Wt(yu() * (e - n + 1));
        }
        function ba(n, e, t, r) {
          for (var i = -1, o = j(Ut((e - n) / (t || 1)), 0), s = d(o); o--; )
            s[r ? o : ++i] = n, n += t;
          return s;
        }
        function ni(n, e) {
          var t = "";
          if (!n || e < 1 || e > Ee)
            return t;
          do
            e % 2 && (t += n), e = Wt(e / 2), e && (n += n);
          while (e);
          return t;
        }
        function L(n, e) {
          return vi(Rf(n, e, gn), n + "");
        }
        function Sa(n) {
          return Pu(Fe(n));
        }
        function Oa(n, e) {
          var t = Fe(n);
          return nr(t, de(e, 0, t.length));
        }
        function ot(n, e, t, r) {
          if (!Y(n))
            return n;
          e = fe(e, n);
          for (var i = -1, o = e.length, s = o - 1, c = n; c != null && ++i < o; ) {
            var l = Gn(e[i]), p = t;
            if (l === "__proto__" || l === "constructor" || l === "prototype")
              return n;
            if (i != s) {
              var v = c[l];
              p = r ? r(v, l, c) : f, p === f && (p = Y(v) ? v : Xn(e[i + 1]) ? [] : {});
            }
            rt(c, l, p), c = c[l];
          }
          return n;
        }
        var Vu = Ft ? function(n, e) {
          return Ft.set(n, e), n;
        } : gn, Ta = Bt ? function(n, e) {
          return Bt(n, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Ri(e),
            writable: !0
          });
        } : gn;
        function Ra(n) {
          return nr(Fe(n));
        }
        function Tn(n, e, t) {
          var r = -1, i = n.length;
          e < 0 && (e = -e > i ? 0 : i + e), t = t > i ? i : t, t < 0 && (t += i), i = e > t ? 0 : t - e >>> 0, e >>>= 0;
          for (var o = d(i); ++r < i; )
            o[r] = n[r + e];
          return o;
        }
        function Ca(n, e) {
          var t;
          return ie(n, function(r, i, o) {
            return t = e(r, i, o), !t;
          }), !!t;
        }
        function Kt(n, e, t) {
          var r = 0, i = n == null ? r : n.length;
          if (typeof e == "number" && e === e && i <= yo) {
            for (; r < i; ) {
              var o = r + i >>> 1, s = n[o];
              s !== null && !wn(s) && (t ? s <= e : s < e) ? r = o + 1 : i = o;
            }
            return i;
          }
          return ei(n, e, gn, t);
        }
        function ei(n, e, t, r) {
          var i = 0, o = n == null ? 0 : n.length;
          if (o === 0)
            return 0;
          e = t(e);
          for (var s = e !== e, c = e === null, l = wn(e), p = e === f; i < o; ) {
            var v = Wt((i + o) / 2), w = t(n[v]), A = w !== f, E = w === null, O = w === w, y = wn(w);
            if (s)
              var T = r || O;
            else p ? T = O && (r || A) : c ? T = O && A && (r || !E) : l ? T = O && A && !E && (r || !y) : E || y ? T = !1 : T = r ? w <= e : w < e;
            T ? i = v + 1 : o = v;
          }
          return un(o, Io);
        }
        function ku(n, e) {
          for (var t = -1, r = n.length, i = 0, o = []; ++t < r; ) {
            var s = n[t], c = e ? e(s) : s;
            if (!t || !Dn(c, l)) {
              var l = c;
              o[i++] = s === 0 ? 0 : s;
            }
          }
          return o;
        }
        function ju(n) {
          return typeof n == "number" ? n : wn(n) ? pt : +n;
        }
        function vn(n) {
          if (typeof n == "string")
            return n;
          if (C(n))
            return Z(n, vn) + "";
          if (wn(n))
            return Lu ? Lu.call(n) : "";
          var e = n + "";
          return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
        }
        function ue(n, e, t) {
          var r = -1, i = St, o = n.length, s = !0, c = [], l = c;
          if (t)
            s = !1, i = yr;
          else if (o >= b) {
            var p = e ? null : Ga(n);
            if (p)
              return Tt(p);
            s = !1, i = Ve, l = new he();
          } else
            l = e ? [] : c;
          n:
            for (; ++r < o; ) {
              var v = n[r], w = e ? e(v) : v;
              if (v = t || v !== 0 ? v : 0, s && w === w) {
                for (var A = l.length; A--; )
                  if (l[A] === w)
                    continue n;
                e && l.push(w), c.push(v);
              } else i(l, w, t) || (l !== c && l.push(w), c.push(v));
            }
          return c;
        }
        function ti(n, e) {
          return e = fe(e, n), n = Cf(n, e), n == null || delete n[Gn(Rn(e))];
        }
        function nf(n, e, t, r) {
          return ot(n, e, t(ge(n, e)), r);
        }
        function Zt(n, e, t, r) {
          for (var i = n.length, o = r ? i : -1; (r ? o-- : ++o < i) && e(n[o], o, n); )
            ;
          return t ? Tn(n, r ? 0 : o, r ? o + 1 : i) : Tn(n, r ? o + 1 : 0, r ? i : o);
        }
        function ef(n, e) {
          var t = n;
          return t instanceof P && (t = t.value()), Lr(e, function(r, i) {
            return i.func.apply(i.thisArg, ee([r], i.args));
          }, t);
        }
        function ri(n, e, t) {
          var r = n.length;
          if (r < 2)
            return r ? ue(n[0]) : [];
          for (var i = -1, o = d(r); ++i < r; )
            for (var s = n[i], c = -1; ++c < r; )
              c != i && (o[i] = it(o[i] || s, n[c], e, t));
          return ue(rn(o, 1), e, t);
        }
        function tf(n, e, t) {
          for (var r = -1, i = n.length, o = e.length, s = {}; ++r < i; ) {
            var c = r < o ? e[r] : f;
            t(s, n[r], c);
          }
          return s;
        }
        function ii(n) {
          return Q(n) ? n : [];
        }
        function ui(n) {
          return typeof n == "function" ? n : gn;
        }
        function fe(n, e) {
          return C(n) ? n : gi(n, e) ? [n] : Mf(W(n));
        }
        var Ia = L;
        function oe(n, e, t) {
          var r = n.length;
          return t = t === f ? r : t, !e && t >= r ? n : Tn(n, e, t);
        }
        var rf = pc || function(n) {
          return tn.clearTimeout(n);
        };
        function uf(n, e) {
          if (e)
            return n.slice();
          var t = n.length, r = Ou ? Ou(t) : new n.constructor(t);
          return n.copy(r), r;
        }
        function fi(n) {
          var e = new n.constructor(n.byteLength);
          return new Mt(e).set(new Mt(n)), e;
        }
        function ya(n, e) {
          var t = e ? fi(n.buffer) : n.buffer;
          return new n.constructor(t, n.byteOffset, n.byteLength);
        }
        function La(n) {
          var e = new n.constructor(n.source, $i.exec(n));
          return e.lastIndex = n.lastIndex, e;
        }
        function Ma(n) {
          return tt ? z(tt.call(n)) : {};
        }
        function ff(n, e) {
          var t = e ? fi(n.buffer) : n.buffer;
          return new n.constructor(t, n.byteOffset, n.length);
        }
        function of(n, e) {
          if (n !== e) {
            var t = n !== f, r = n === null, i = n === n, o = wn(n), s = e !== f, c = e === null, l = e === e, p = wn(e);
            if (!c && !p && !o && n > e || o && s && l && !c && !p || r && s && l || !t && l || !i)
              return 1;
            if (!r && !o && !p && n < e || p && t && i && !r && !o || c && t && i || !s && i || !l)
              return -1;
          }
          return 0;
        }
        function Pa(n, e, t) {
          for (var r = -1, i = n.criteria, o = e.criteria, s = i.length, c = t.length; ++r < s; ) {
            var l = of(i[r], o[r]);
            if (l) {
              if (r >= c)
                return l;
              var p = t[r];
              return l * (p == "desc" ? -1 : 1);
            }
          }
          return n.index - e.index;
        }
        function sf(n, e, t, r) {
          for (var i = -1, o = n.length, s = t.length, c = -1, l = e.length, p = j(o - s, 0), v = d(l + p), w = !r; ++c < l; )
            v[c] = e[c];
          for (; ++i < s; )
            (w || i < o) && (v[t[i]] = n[i]);
          for (; p--; )
            v[c++] = n[i++];
          return v;
        }
        function cf(n, e, t, r) {
          for (var i = -1, o = n.length, s = -1, c = t.length, l = -1, p = e.length, v = j(o - c, 0), w = d(v + p), A = !r; ++i < v; )
            w[i] = n[i];
          for (var E = i; ++l < p; )
            w[E + l] = e[l];
          for (; ++s < c; )
            (A || i < o) && (w[E + t[s]] = n[i++]);
          return w;
        }
        function ln(n, e) {
          var t = -1, r = n.length;
          for (e || (e = d(r)); ++t < r; )
            e[t] = n[t];
          return e;
        }
        function Fn(n, e, t, r) {
          var i = !t;
          t || (t = {});
          for (var o = -1, s = e.length; ++o < s; ) {
            var c = e[o], l = r ? r(t[c], n[c], c, t, n) : f;
            l === f && (l = n[c]), i ? Zn(t, c, l) : rt(t, c, l);
          }
          return t;
        }
        function Da(n, e) {
          return Fn(n, di(n), e);
        }
        function Ba(n, e) {
          return Fn(n, Ef(n), e);
        }
        function Yt(n, e) {
          return function(t, r) {
            var i = C(t) ? Ns : ra, o = e ? e() : {};
            return i(t, n, S(r, 2), o);
          };
        }
        function De(n) {
          return L(function(e, t) {
            var r = -1, i = t.length, o = i > 1 ? t[i - 1] : f, s = i > 2 ? t[2] : f;
            for (o = n.length > 3 && typeof o == "function" ? (i--, o) : f, s && cn(t[0], t[1], s) && (o = i < 3 ? f : o, i = 1), e = z(e); ++r < i; ) {
              var c = t[r];
              c && n(e, c, r, o);
            }
            return e;
          });
        }
        function af(n, e) {
          return function(t, r) {
            if (t == null)
              return t;
            if (!hn(t))
              return n(t, r);
            for (var i = t.length, o = e ? i : -1, s = z(t); (e ? o-- : ++o < i) && r(s[o], o, s) !== !1; )
              ;
            return t;
          };
        }
        function lf(n) {
          return function(e, t, r) {
            for (var i = -1, o = z(e), s = r(e), c = s.length; c--; ) {
              var l = s[n ? c : ++i];
              if (t(o[l], l, o) === !1)
                break;
            }
            return e;
          };
        }
        function Ua(n, e, t) {
          var r = e & In, i = st(n);
          function o() {
            var s = this && this !== tn && this instanceof o ? i : n;
            return s.apply(r ? t : this, arguments);
          }
          return o;
        }
        function hf(n) {
          return function(e) {
            e = W(e);
            var t = Re(e) ? Mn(e) : f, r = t ? t[0] : e.charAt(0), i = t ? oe(t, 1).join("") : e.slice(1);
            return r[n]() + i;
          };
        }
        function Be(n) {
          return function(e) {
            return Lr(ao(co(e).replace(Ts, "")), n, "");
          };
        }
        function st(n) {
          return function() {
            var e = arguments;
            switch (e.length) {
              case 0:
                return new n();
              case 1:
                return new n(e[0]);
              case 2:
                return new n(e[0], e[1]);
              case 3:
                return new n(e[0], e[1], e[2]);
              case 4:
                return new n(e[0], e[1], e[2], e[3]);
              case 5:
                return new n(e[0], e[1], e[2], e[3], e[4]);
              case 6:
                return new n(e[0], e[1], e[2], e[3], e[4], e[5]);
              case 7:
                return new n(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
            }
            var t = Pe(n.prototype), r = n.apply(t, e);
            return Y(r) ? r : t;
          };
        }
        function Wa(n, e, t) {
          var r = st(n);
          function i() {
            for (var o = arguments.length, s = d(o), c = o, l = Ue(i); c--; )
              s[c] = arguments[c];
            var p = o < 3 && s[0] !== l && s[o - 1] !== l ? [] : te(s, l);
            if (o -= p.length, o < t)
              return vf(
                n,
                e,
                Jt,
                i.placeholder,
                f,
                s,
                p,
                f,
                f,
                t - o
              );
            var v = this && this !== tn && this instanceof i ? r : n;
            return _n(v, this, s);
          }
          return i;
        }
        function df(n) {
          return function(e, t, r) {
            var i = z(e);
            if (!hn(e)) {
              var o = S(t, 3);
              e = en(e), t = function(c) {
                return o(i[c], c, i);
              };
            }
            var s = n(e, t, r);
            return s > -1 ? i[o ? e[s] : s] : f;
          };
        }
        function gf(n) {
          return Jn(function(e) {
            var t = e.length, r = t, i = Sn.prototype.thru;
            for (n && e.reverse(); r--; ) {
              var o = e[r];
              if (typeof o != "function")
                throw new bn(B);
              if (i && !s && kt(o) == "wrapper")
                var s = new Sn([], !0);
            }
            for (r = s ? r : t; ++r < t; ) {
              o = e[r];
              var c = kt(o), l = c == "wrapper" ? li(o) : f;
              l && _i(l[0]) && l[1] == (Hn | Nn | $n | ze) && !l[4].length && l[9] == 1 ? s = s[kt(l[0])].apply(s, l[3]) : s = o.length == 1 && _i(o) ? s[c]() : s.thru(o);
            }
            return function() {
              var p = arguments, v = p[0];
              if (s && p.length == 1 && C(v))
                return s.plant(v).value();
              for (var w = 0, A = t ? e[w].apply(this, p) : v; ++w < t; )
                A = e[w].call(this, A);
              return A;
            };
          });
        }
        function Jt(n, e, t, r, i, o, s, c, l, p) {
          var v = e & Hn, w = e & In, A = e & me, E = e & (Nn | $e), O = e & lr, y = A ? f : st(n);
          function T() {
            for (var M = arguments.length, D = d(M), xn = M; xn--; )
              D[xn] = arguments[xn];
            if (E)
              var an = Ue(T), An = Xs(D, an);
            if (r && (D = sf(D, r, i, E)), o && (D = cf(D, o, s, E)), M -= An, E && M < p) {
              var V = te(D, an);
              return vf(
                n,
                e,
                Jt,
                T.placeholder,
                t,
                D,
                V,
                c,
                l,
                p - M
              );
            }
            var Bn = w ? t : this, kn = A ? Bn[n] : n;
            return M = D.length, c ? D = rl(D, c) : O && M > 1 && D.reverse(), v && l < M && (D.length = l), this && this !== tn && this instanceof T && (kn = y || st(kn)), kn.apply(Bn, D);
          }
          return T;
        }
        function _f(n, e) {
          return function(t, r) {
            return la(t, n, e(r), {});
          };
        }
        function Xt(n, e) {
          return function(t, r) {
            var i;
            if (t === f && r === f)
              return e;
            if (t !== f && (i = t), r !== f) {
              if (i === f)
                return r;
              typeof t == "string" || typeof r == "string" ? (t = vn(t), r = vn(r)) : (t = ju(t), r = ju(r)), i = n(t, r);
            }
            return i;
          };
        }
        function oi(n) {
          return Jn(function(e) {
            return e = Z(e, pn(S())), L(function(t) {
              var r = this;
              return n(e, function(i) {
                return _n(i, r, t);
              });
            });
          });
        }
        function Qt(n, e) {
          e = e === f ? " " : vn(e);
          var t = e.length;
          if (t < 2)
            return t ? ni(e, n) : e;
          var r = ni(e, Ut(n / Ce(e)));
          return Re(e) ? oe(Mn(r), 0, n).join("") : r.slice(0, n);
        }
        function Fa(n, e, t, r) {
          var i = e & In, o = st(n);
          function s() {
            for (var c = -1, l = arguments.length, p = -1, v = r.length, w = d(v + l), A = this && this !== tn && this instanceof s ? o : n; ++p < v; )
              w[p] = r[p];
            for (; l--; )
              w[p++] = arguments[++c];
            return _n(A, i ? t : this, w);
          }
          return s;
        }
        function pf(n) {
          return function(e, t, r) {
            return r && typeof r != "number" && cn(e, t, r) && (t = r = f), e = Vn(e), t === f ? (t = e, e = 0) : t = Vn(t), r = r === f ? e < t ? 1 : -1 : Vn(r), ba(e, t, r, n);
          };
        }
        function Vt(n) {
          return function(e, t) {
            return typeof e == "string" && typeof t == "string" || (e = Cn(e), t = Cn(t)), n(e, t);
          };
        }
        function vf(n, e, t, r, i, o, s, c, l, p) {
          var v = e & Nn, w = v ? s : f, A = v ? f : s, E = v ? o : f, O = v ? f : o;
          e |= v ? $n : He, e &= ~(v ? He : $n), e & Di || (e &= -4);
          var y = [
            n,
            e,
            i,
            E,
            w,
            O,
            A,
            c,
            l,
            p
          ], T = t.apply(f, y);
          return _i(n) && If(T, y), T.placeholder = r, yf(T, n, e);
        }
        function si(n) {
          var e = k[n];
          return function(t, r) {
            if (t = Cn(t), r = r == null ? 0 : un(I(r), 292), r && Iu(t)) {
              var i = (W(t) + "e").split("e"), o = e(i[0] + "e" + (+i[1] + r));
              return i = (W(o) + "e").split("e"), +(i[0] + "e" + (+i[1] - r));
            }
            return e(t);
          };
        }
        var Ga = Le && 1 / Tt(new Le([, -0]))[1] == _t ? function(n) {
          return new Le(n);
        } : yi;
        function wf(n) {
          return function(e) {
            var t = fn(e);
            return t == yn ? Fr(e) : t == Ln ? tc(e) : Js(e, n(e));
          };
        }
        function Yn(n, e, t, r, i, o, s, c) {
          var l = e & me;
          if (!l && typeof n != "function")
            throw new bn(B);
          var p = r ? r.length : 0;
          if (p || (e &= -97, r = i = f), s = s === f ? s : j(I(s), 0), c = c === f ? c : I(c), p -= i ? i.length : 0, e & He) {
            var v = r, w = i;
            r = i = f;
          }
          var A = l ? f : li(n), E = [
            n,
            e,
            t,
            r,
            i,
            v,
            w,
            o,
            s,
            c
          ];
          if (A && nl(E, A), n = E[0], e = E[1], t = E[2], r = E[3], i = E[4], c = E[9] = E[9] === f ? l ? 0 : n.length : j(E[9] - p, 0), !c && e & (Nn | $e) && (e &= -25), !e || e == In)
            var O = Ua(n, e, t);
          else e == Nn || e == $e ? O = Wa(n, e, c) : (e == $n || e == (In | $n)) && !i.length ? O = Fa(n, e, t, r) : O = Jt.apply(f, E);
          var y = A ? Vu : If;
          return yf(y(O, E), n, e);
        }
        function xf(n, e, t, r) {
          return n === f || Dn(n, ye[t]) && !G.call(r, t) ? e : n;
        }
        function Af(n, e, t, r, i, o) {
          return Y(n) && Y(e) && (o.set(e, n), qt(n, e, f, Af, o), o.delete(e)), n;
        }
        function Na(n) {
          return lt(n) ? f : n;
        }
        function mf(n, e, t, r, i, o) {
          var s = t & Ae, c = n.length, l = e.length;
          if (c != l && !(s && l > c))
            return !1;
          var p = o.get(n), v = o.get(e);
          if (p && v)
            return p == e && v == n;
          var w = -1, A = !0, E = t & gt ? new he() : f;
          for (o.set(n, e), o.set(e, n); ++w < c; ) {
            var O = n[w], y = e[w];
            if (r)
              var T = s ? r(y, O, w, e, n, o) : r(O, y, w, n, e, o);
            if (T !== f) {
              if (T)
                continue;
              A = !1;
              break;
            }
            if (E) {
              if (!Mr(e, function(M, D) {
                if (!Ve(E, D) && (O === M || i(O, M, t, r, o)))
                  return E.push(D);
              })) {
                A = !1;
                break;
              }
            } else if (!(O === y || i(O, y, t, r, o))) {
              A = !1;
              break;
            }
          }
          return o.delete(n), o.delete(e), A;
        }
        function $a(n, e, t, r, i, o, s) {
          switch (t) {
            case Se:
              if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
                return !1;
              n = n.buffer, e = e.buffer;
            case Qe:
              return !(n.byteLength != e.byteLength || !o(new Mt(n), new Mt(e)));
            case qe:
            case Ke:
            case Ze:
              return Dn(+n, +e);
            case wt:
              return n.name == e.name && n.message == e.message;
            case Ye:
            case Je:
              return n == e + "";
            case yn:
              var c = Fr;
            case Ln:
              var l = r & Ae;
              if (c || (c = Tt), n.size != e.size && !l)
                return !1;
              var p = s.get(n);
              if (p)
                return p == e;
              r |= gt, s.set(n, e);
              var v = mf(c(n), c(e), r, i, o, s);
              return s.delete(n), v;
            case At:
              if (tt)
                return tt.call(n) == tt.call(e);
          }
          return !1;
        }
        function Ha(n, e, t, r, i, o) {
          var s = t & Ae, c = ci(n), l = c.length, p = ci(e), v = p.length;
          if (l != v && !s)
            return !1;
          for (var w = l; w--; ) {
            var A = c[w];
            if (!(s ? A in e : G.call(e, A)))
              return !1;
          }
          var E = o.get(n), O = o.get(e);
          if (E && O)
            return E == e && O == n;
          var y = !0;
          o.set(n, e), o.set(e, n);
          for (var T = s; ++w < l; ) {
            A = c[w];
            var M = n[A], D = e[A];
            if (r)
              var xn = s ? r(D, M, A, e, n, o) : r(M, D, A, n, e, o);
            if (!(xn === f ? M === D || i(M, D, t, r, o) : xn)) {
              y = !1;
              break;
            }
            T || (T = A == "constructor");
          }
          if (y && !T) {
            var an = n.constructor, An = e.constructor;
            an != An && "constructor" in n && "constructor" in e && !(typeof an == "function" && an instanceof an && typeof An == "function" && An instanceof An) && (y = !1);
          }
          return o.delete(n), o.delete(e), y;
        }
        function Jn(n) {
          return vi(Rf(n, f, Uf), n + "");
        }
        function ci(n) {
          return Nu(n, en, di);
        }
        function ai(n) {
          return Nu(n, dn, Ef);
        }
        var li = Ft ? function(n) {
          return Ft.get(n);
        } : yi;
        function kt(n) {
          for (var e = n.name + "", t = Me[e], r = G.call(Me, e) ? t.length : 0; r--; ) {
            var i = t[r], o = i.func;
            if (o == null || o == n)
              return i.name;
          }
          return e;
        }
        function Ue(n) {
          var e = G.call(u, "placeholder") ? u : n;
          return e.placeholder;
        }
        function S() {
          var n = u.iteratee || Ci;
          return n = n === Ci ? zu : n, arguments.length ? n(arguments[0], arguments[1]) : n;
        }
        function jt(n, e) {
          var t = n.__data__;
          return Qa(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
        }
        function hi(n) {
          for (var e = en(n), t = e.length; t--; ) {
            var r = e[t], i = n[r];
            e[t] = [r, i, Of(i)];
          }
          return e;
        }
        function _e(n, e) {
          var t = js(n, e);
          return Hu(t) ? t : f;
        }
        function za(n) {
          var e = G.call(n, ae), t = n[ae];
          try {
            n[ae] = f;
            var r = !0;
          } catch {
          }
          var i = yt.call(n);
          return r && (e ? n[ae] = t : delete n[ae]), i;
        }
        var di = Nr ? function(n) {
          return n == null ? [] : (n = z(n), ne(Nr(n), function(e) {
            return Ru.call(n, e);
          }));
        } : Li, Ef = Nr ? function(n) {
          for (var e = []; n; )
            ee(e, di(n)), n = Pt(n);
          return e;
        } : Li, fn = sn;
        ($r && fn(new $r(new ArrayBuffer(1))) != Se || je && fn(new je()) != yn || Hr && fn(Hr.resolve()) != Wi || Le && fn(new Le()) != Ln || nt && fn(new nt()) != Xe) && (fn = function(n) {
          var e = sn(n), t = e == zn ? n.constructor : f, r = t ? pe(t) : "";
          if (r)
            switch (r) {
              case Oc:
                return Se;
              case Tc:
                return yn;
              case Rc:
                return Wi;
              case Cc:
                return Ln;
              case Ic:
                return Xe;
            }
          return e;
        });
        function qa(n, e, t) {
          for (var r = -1, i = t.length; ++r < i; ) {
            var o = t[r], s = o.size;
            switch (o.type) {
              case "drop":
                n += s;
                break;
              case "dropRight":
                e -= s;
                break;
              case "take":
                e = un(e, n + s);
                break;
              case "takeRight":
                n = j(n, e - s);
                break;
            }
          }
          return { start: n, end: e };
        }
        function Ka(n) {
          var e = n.match(Vo);
          return e ? e[1].split(ko) : [];
        }
        function bf(n, e, t) {
          e = fe(e, n);
          for (var r = -1, i = e.length, o = !1; ++r < i; ) {
            var s = Gn(e[r]);
            if (!(o = n != null && t(n, s)))
              break;
            n = n[s];
          }
          return o || ++r != i ? o : (i = n == null ? 0 : n.length, !!i && fr(i) && Xn(s, i) && (C(n) || ve(n)));
        }
        function Za(n) {
          var e = n.length, t = new n.constructor(e);
          return e && typeof n[0] == "string" && G.call(n, "index") && (t.index = n.index, t.input = n.input), t;
        }
        function Sf(n) {
          return typeof n.constructor == "function" && !ct(n) ? Pe(Pt(n)) : {};
        }
        function Ya(n, e, t) {
          var r = n.constructor;
          switch (e) {
            case Qe:
              return fi(n);
            case qe:
            case Ke:
              return new r(+n);
            case Se:
              return ya(n, t);
            case hr:
            case dr:
            case gr:
            case _r:
            case pr:
            case vr:
            case wr:
            case xr:
            case Ar:
              return ff(n, t);
            case yn:
              return new r();
            case Ze:
            case Je:
              return new r(n);
            case Ye:
              return La(n);
            case Ln:
              return new r();
            case At:
              return Ma(n);
          }
        }
        function Ja(n, e) {
          var t = e.length;
          if (!t)
            return n;
          var r = t - 1;
          return e[r] = (t > 1 ? "& " : "") + e[r], e = e.join(t > 2 ? ", " : " "), n.replace(Qo, `{
/* [wrapped with ` + e + `] */
`);
        }
        function Xa(n) {
          return C(n) || ve(n) || !!(Cu && n && n[Cu]);
        }
        function Xn(n, e) {
          var t = typeof n;
          return e = e ?? Ee, !!e && (t == "number" || t != "symbol" && os.test(n)) && n > -1 && n % 1 == 0 && n < e;
        }
        function cn(n, e, t) {
          if (!Y(t))
            return !1;
          var r = typeof e;
          return (r == "number" ? hn(t) && Xn(e, t.length) : r == "string" && e in t) ? Dn(t[e], n) : !1;
        }
        function gi(n, e) {
          if (C(n))
            return !1;
          var t = typeof n;
          return t == "number" || t == "symbol" || t == "boolean" || n == null || wn(n) ? !0 : Zo.test(n) || !Ko.test(n) || e != null && n in z(e);
        }
        function Qa(n) {
          var e = typeof n;
          return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
        }
        function _i(n) {
          var e = kt(n), t = u[e];
          if (typeof t != "function" || !(e in P.prototype))
            return !1;
          if (n === t)
            return !0;
          var r = li(t);
          return !!r && n === r[0];
        }
        function Va(n) {
          return !!Su && Su in n;
        }
        var ka = Ct ? Qn : Mi;
        function ct(n) {
          var e = n && n.constructor, t = typeof e == "function" && e.prototype || ye;
          return n === t;
        }
        function Of(n) {
          return n === n && !Y(n);
        }
        function Tf(n, e) {
          return function(t) {
            return t == null ? !1 : t[n] === e && (e !== f || n in z(t));
          };
        }
        function ja(n) {
          var e = ir(n, function(r) {
            return t.size === ar && t.clear(), r;
          }), t = e.cache;
          return e;
        }
        function nl(n, e) {
          var t = n[1], r = e[1], i = t | r, o = i < (In | me | Hn), s = r == Hn && t == Nn || r == Hn && t == ze && n[7].length <= e[8] || r == (Hn | ze) && e[7].length <= e[8] && t == Nn;
          if (!(o || s))
            return n;
          r & In && (n[2] = e[2], i |= t & In ? 0 : Di);
          var c = e[3];
          if (c) {
            var l = n[3];
            n[3] = l ? sf(l, c, e[4]) : c, n[4] = l ? te(n[3], we) : e[4];
          }
          return c = e[5], c && (l = n[5], n[5] = l ? cf(l, c, e[6]) : c, n[6] = l ? te(n[5], we) : e[6]), c = e[7], c && (n[7] = c), r & Hn && (n[8] = n[8] == null ? e[8] : un(n[8], e[8])), n[9] == null && (n[9] = e[9]), n[0] = e[0], n[1] = i, n;
        }
        function el(n) {
          var e = [];
          if (n != null)
            for (var t in z(n))
              e.push(t);
          return e;
        }
        function tl(n) {
          return yt.call(n);
        }
        function Rf(n, e, t) {
          return e = j(e === f ? n.length - 1 : e, 0), function() {
            for (var r = arguments, i = -1, o = j(r.length - e, 0), s = d(o); ++i < o; )
              s[i] = r[e + i];
            i = -1;
            for (var c = d(e + 1); ++i < e; )
              c[i] = r[i];
            return c[e] = t(s), _n(n, this, c);
          };
        }
        function Cf(n, e) {
          return e.length < 2 ? n : ge(n, Tn(e, 0, -1));
        }
        function rl(n, e) {
          for (var t = n.length, r = un(e.length, t), i = ln(n); r--; ) {
            var o = e[r];
            n[r] = Xn(o, t) ? i[o] : f;
          }
          return n;
        }
        function pi(n, e) {
          if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
            return n[e];
        }
        var If = Lf(Vu), at = wc || function(n, e) {
          return tn.setTimeout(n, e);
        }, vi = Lf(Ta);
        function yf(n, e, t) {
          var r = e + "";
          return vi(n, Ja(r, il(Ka(r), t)));
        }
        function Lf(n) {
          var e = 0, t = 0;
          return function() {
            var r = Ec(), i = Oo - (r - t);
            if (t = r, i > 0) {
              if (++e >= So)
                return arguments[0];
            } else
              e = 0;
            return n.apply(f, arguments);
          };
        }
        function nr(n, e) {
          var t = -1, r = n.length, i = r - 1;
          for (e = e === f ? r : e; ++t < e; ) {
            var o = jr(t, i), s = n[o];
            n[o] = n[t], n[t] = s;
          }
          return n.length = e, n;
        }
        var Mf = ja(function(n) {
          var e = [];
          return n.charCodeAt(0) === 46 && e.push(""), n.replace(Yo, function(t, r, i, o) {
            e.push(i ? o.replace(es, "$1") : r || t);
          }), e;
        });
        function Gn(n) {
          if (typeof n == "string" || wn(n))
            return n;
          var e = n + "";
          return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
        }
        function pe(n) {
          if (n != null) {
            try {
              return It.call(n);
            } catch {
            }
            try {
              return n + "";
            } catch {
            }
          }
          return "";
        }
        function il(n, e) {
          return En(Lo, function(t) {
            var r = "_." + t[0];
            e & t[1] && !St(n, r) && n.push(r);
          }), n.sort();
        }
        function Pf(n) {
          if (n instanceof P)
            return n.clone();
          var e = new Sn(n.__wrapped__, n.__chain__);
          return e.__actions__ = ln(n.__actions__), e.__index__ = n.__index__, e.__values__ = n.__values__, e;
        }
        function ul(n, e, t) {
          (t ? cn(n, e, t) : e === f) ? e = 1 : e = j(I(e), 0);
          var r = n == null ? 0 : n.length;
          if (!r || e < 1)
            return [];
          for (var i = 0, o = 0, s = d(Ut(r / e)); i < r; )
            s[o++] = Tn(n, i, i += e);
          return s;
        }
        function fl(n) {
          for (var e = -1, t = n == null ? 0 : n.length, r = 0, i = []; ++e < t; ) {
            var o = n[e];
            o && (i[r++] = o);
          }
          return i;
        }
        function ol() {
          var n = arguments.length;
          if (!n)
            return [];
          for (var e = d(n - 1), t = arguments[0], r = n; r--; )
            e[r - 1] = arguments[r];
          return ee(C(t) ? ln(t) : [t], rn(e, 1));
        }
        var sl = L(function(n, e) {
          return Q(n) ? it(n, rn(e, 1, Q, !0)) : [];
        }), cl = L(function(n, e) {
          var t = Rn(e);
          return Q(t) && (t = f), Q(n) ? it(n, rn(e, 1, Q, !0), S(t, 2)) : [];
        }), al = L(function(n, e) {
          var t = Rn(e);
          return Q(t) && (t = f), Q(n) ? it(n, rn(e, 1, Q, !0), f, t) : [];
        });
        function ll(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === f ? 1 : I(e), Tn(n, e < 0 ? 0 : e, r)) : [];
        }
        function hl(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === f ? 1 : I(e), e = r - e, Tn(n, 0, e < 0 ? 0 : e)) : [];
        }
        function dl(n, e) {
          return n && n.length ? Zt(n, S(e, 3), !0, !0) : [];
        }
        function gl(n, e) {
          return n && n.length ? Zt(n, S(e, 3), !0) : [];
        }
        function _l(n, e, t, r) {
          var i = n == null ? 0 : n.length;
          return i ? (t && typeof t != "number" && cn(n, e, t) && (t = 0, r = i), oa(n, e, t, r)) : [];
        }
        function Df(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = t == null ? 0 : I(t);
          return i < 0 && (i = j(r + i, 0)), Ot(n, S(e, 3), i);
        }
        function Bf(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = r - 1;
          return t !== f && (i = I(t), i = t < 0 ? j(r + i, 0) : un(i, r - 1)), Ot(n, S(e, 3), i, !0);
        }
        function Uf(n) {
          var e = n == null ? 0 : n.length;
          return e ? rn(n, 1) : [];
        }
        function pl(n) {
          var e = n == null ? 0 : n.length;
          return e ? rn(n, _t) : [];
        }
        function vl(n, e) {
          var t = n == null ? 0 : n.length;
          return t ? (e = e === f ? 1 : I(e), rn(n, e)) : [];
        }
        function wl(n) {
          for (var e = -1, t = n == null ? 0 : n.length, r = {}; ++e < t; ) {
            var i = n[e];
            r[i[0]] = i[1];
          }
          return r;
        }
        function Wf(n) {
          return n && n.length ? n[0] : f;
        }
        function xl(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = t == null ? 0 : I(t);
          return i < 0 && (i = j(r + i, 0)), Te(n, e, i);
        }
        function Al(n) {
          var e = n == null ? 0 : n.length;
          return e ? Tn(n, 0, -1) : [];
        }
        var ml = L(function(n) {
          var e = Z(n, ii);
          return e.length && e[0] === n[0] ? Jr(e) : [];
        }), El = L(function(n) {
          var e = Rn(n), t = Z(n, ii);
          return e === Rn(t) ? e = f : t.pop(), t.length && t[0] === n[0] ? Jr(t, S(e, 2)) : [];
        }), bl = L(function(n) {
          var e = Rn(n), t = Z(n, ii);
          return e = typeof e == "function" ? e : f, e && t.pop(), t.length && t[0] === n[0] ? Jr(t, f, e) : [];
        });
        function Sl(n, e) {
          return n == null ? "" : Ac.call(n, e);
        }
        function Rn(n) {
          var e = n == null ? 0 : n.length;
          return e ? n[e - 1] : f;
        }
        function Ol(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = r;
          return t !== f && (i = I(t), i = i < 0 ? j(r + i, 0) : un(i, r - 1)), e === e ? ic(n, e, i) : Ot(n, pu, i, !0);
        }
        function Tl(n, e) {
          return n && n.length ? Yu(n, I(e)) : f;
        }
        var Rl = L(Ff);
        function Ff(n, e) {
          return n && n.length && e && e.length ? kr(n, e) : n;
        }
        function Cl(n, e, t) {
          return n && n.length && e && e.length ? kr(n, e, S(t, 2)) : n;
        }
        function Il(n, e, t) {
          return n && n.length && e && e.length ? kr(n, e, f, t) : n;
        }
        var yl = Jn(function(n, e) {
          var t = n == null ? 0 : n.length, r = qr(n, e);
          return Qu(n, Z(e, function(i) {
            return Xn(i, t) ? +i : i;
          }).sort(of)), r;
        });
        function Ll(n, e) {
          var t = [];
          if (!(n && n.length))
            return t;
          var r = -1, i = [], o = n.length;
          for (e = S(e, 3); ++r < o; ) {
            var s = n[r];
            e(s, r, n) && (t.push(s), i.push(r));
          }
          return Qu(n, i), t;
        }
        function wi(n) {
          return n == null ? n : Sc.call(n);
        }
        function Ml(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (t && typeof t != "number" && cn(n, e, t) ? (e = 0, t = r) : (e = e == null ? 0 : I(e), t = t === f ? r : I(t)), Tn(n, e, t)) : [];
        }
        function Pl(n, e) {
          return Kt(n, e);
        }
        function Dl(n, e, t) {
          return ei(n, e, S(t, 2));
        }
        function Bl(n, e) {
          var t = n == null ? 0 : n.length;
          if (t) {
            var r = Kt(n, e);
            if (r < t && Dn(n[r], e))
              return r;
          }
          return -1;
        }
        function Ul(n, e) {
          return Kt(n, e, !0);
        }
        function Wl(n, e, t) {
          return ei(n, e, S(t, 2), !0);
        }
        function Fl(n, e) {
          var t = n == null ? 0 : n.length;
          if (t) {
            var r = Kt(n, e, !0) - 1;
            if (Dn(n[r], e))
              return r;
          }
          return -1;
        }
        function Gl(n) {
          return n && n.length ? ku(n) : [];
        }
        function Nl(n, e) {
          return n && n.length ? ku(n, S(e, 2)) : [];
        }
        function $l(n) {
          var e = n == null ? 0 : n.length;
          return e ? Tn(n, 1, e) : [];
        }
        function Hl(n, e, t) {
          return n && n.length ? (e = t || e === f ? 1 : I(e), Tn(n, 0, e < 0 ? 0 : e)) : [];
        }
        function zl(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === f ? 1 : I(e), e = r - e, Tn(n, e < 0 ? 0 : e, r)) : [];
        }
        function ql(n, e) {
          return n && n.length ? Zt(n, S(e, 3), !1, !0) : [];
        }
        function Kl(n, e) {
          return n && n.length ? Zt(n, S(e, 3)) : [];
        }
        var Zl = L(function(n) {
          return ue(rn(n, 1, Q, !0));
        }), Yl = L(function(n) {
          var e = Rn(n);
          return Q(e) && (e = f), ue(rn(n, 1, Q, !0), S(e, 2));
        }), Jl = L(function(n) {
          var e = Rn(n);
          return e = typeof e == "function" ? e : f, ue(rn(n, 1, Q, !0), f, e);
        });
        function Xl(n) {
          return n && n.length ? ue(n) : [];
        }
        function Ql(n, e) {
          return n && n.length ? ue(n, S(e, 2)) : [];
        }
        function Vl(n, e) {
          return e = typeof e == "function" ? e : f, n && n.length ? ue(n, f, e) : [];
        }
        function xi(n) {
          if (!(n && n.length))
            return [];
          var e = 0;
          return n = ne(n, function(t) {
            if (Q(t))
              return e = j(t.length, e), !0;
          }), Ur(e, function(t) {
            return Z(n, Pr(t));
          });
        }
        function Gf(n, e) {
          if (!(n && n.length))
            return [];
          var t = xi(n);
          return e == null ? t : Z(t, function(r) {
            return _n(e, f, r);
          });
        }
        var kl = L(function(n, e) {
          return Q(n) ? it(n, e) : [];
        }), jl = L(function(n) {
          return ri(ne(n, Q));
        }), nh = L(function(n) {
          var e = Rn(n);
          return Q(e) && (e = f), ri(ne(n, Q), S(e, 2));
        }), eh = L(function(n) {
          var e = Rn(n);
          return e = typeof e == "function" ? e : f, ri(ne(n, Q), f, e);
        }), th = L(xi);
        function rh(n, e) {
          return tf(n || [], e || [], rt);
        }
        function ih(n, e) {
          return tf(n || [], e || [], ot);
        }
        var uh = L(function(n) {
          var e = n.length, t = e > 1 ? n[e - 1] : f;
          return t = typeof t == "function" ? (n.pop(), t) : f, Gf(n, t);
        });
        function Nf(n) {
          var e = u(n);
          return e.__chain__ = !0, e;
        }
        function fh(n, e) {
          return e(n), n;
        }
        function er(n, e) {
          return e(n);
        }
        var oh = Jn(function(n) {
          var e = n.length, t = e ? n[0] : 0, r = this.__wrapped__, i = function(o) {
            return qr(o, n);
          };
          return e > 1 || this.__actions__.length || !(r instanceof P) || !Xn(t) ? this.thru(i) : (r = r.slice(t, +t + (e ? 1 : 0)), r.__actions__.push({
            func: er,
            args: [i],
            thisArg: f
          }), new Sn(r, this.__chain__).thru(function(o) {
            return e && !o.length && o.push(f), o;
          }));
        });
        function sh() {
          return Nf(this);
        }
        function ch() {
          return new Sn(this.value(), this.__chain__);
        }
        function ah() {
          this.__values__ === f && (this.__values__ = no(this.value()));
          var n = this.__index__ >= this.__values__.length, e = n ? f : this.__values__[this.__index__++];
          return { done: n, value: e };
        }
        function lh() {
          return this;
        }
        function hh(n) {
          for (var e, t = this; t instanceof Nt; ) {
            var r = Pf(t);
            r.__index__ = 0, r.__values__ = f, e ? i.__wrapped__ = r : e = r;
            var i = r;
            t = t.__wrapped__;
          }
          return i.__wrapped__ = n, e;
        }
        function dh() {
          var n = this.__wrapped__;
          if (n instanceof P) {
            var e = n;
            return this.__actions__.length && (e = new P(this)), e = e.reverse(), e.__actions__.push({
              func: er,
              args: [wi],
              thisArg: f
            }), new Sn(e, this.__chain__);
          }
          return this.thru(wi);
        }
        function gh() {
          return ef(this.__wrapped__, this.__actions__);
        }
        var _h = Yt(function(n, e, t) {
          G.call(n, t) ? ++n[t] : Zn(n, t, 1);
        });
        function ph(n, e, t) {
          var r = C(n) ? gu : fa;
          return t && cn(n, e, t) && (e = f), r(n, S(e, 3));
        }
        function vh(n, e) {
          var t = C(n) ? ne : Fu;
          return t(n, S(e, 3));
        }
        var wh = df(Df), xh = df(Bf);
        function Ah(n, e) {
          return rn(tr(n, e), 1);
        }
        function mh(n, e) {
          return rn(tr(n, e), _t);
        }
        function Eh(n, e, t) {
          return t = t === f ? 1 : I(t), rn(tr(n, e), t);
        }
        function $f(n, e) {
          var t = C(n) ? En : ie;
          return t(n, S(e, 3));
        }
        function Hf(n, e) {
          var t = C(n) ? $s : Wu;
          return t(n, S(e, 3));
        }
        var bh = Yt(function(n, e, t) {
          G.call(n, t) ? n[t].push(e) : Zn(n, t, [e]);
        });
        function Sh(n, e, t, r) {
          n = hn(n) ? n : Fe(n), t = t && !r ? I(t) : 0;
          var i = n.length;
          return t < 0 && (t = j(i + t, 0)), or(n) ? t <= i && n.indexOf(e, t) > -1 : !!i && Te(n, e, t) > -1;
        }
        var Oh = L(function(n, e, t) {
          var r = -1, i = typeof e == "function", o = hn(n) ? d(n.length) : [];
          return ie(n, function(s) {
            o[++r] = i ? _n(e, s, t) : ut(s, e, t);
          }), o;
        }), Th = Yt(function(n, e, t) {
          Zn(n, t, e);
        });
        function tr(n, e) {
          var t = C(n) ? Z : qu;
          return t(n, S(e, 3));
        }
        function Rh(n, e, t, r) {
          return n == null ? [] : (C(e) || (e = e == null ? [] : [e]), t = r ? f : t, C(t) || (t = t == null ? [] : [t]), Ju(n, e, t));
        }
        var Ch = Yt(function(n, e, t) {
          n[t ? 0 : 1].push(e);
        }, function() {
          return [[], []];
        });
        function Ih(n, e, t) {
          var r = C(n) ? Lr : wu, i = arguments.length < 3;
          return r(n, S(e, 4), t, i, ie);
        }
        function yh(n, e, t) {
          var r = C(n) ? Hs : wu, i = arguments.length < 3;
          return r(n, S(e, 4), t, i, Wu);
        }
        function Lh(n, e) {
          var t = C(n) ? ne : Fu;
          return t(n, ur(S(e, 3)));
        }
        function Mh(n) {
          var e = C(n) ? Pu : Sa;
          return e(n);
        }
        function Ph(n, e, t) {
          (t ? cn(n, e, t) : e === f) ? e = 1 : e = I(e);
          var r = C(n) ? ea : Oa;
          return r(n, e);
        }
        function Dh(n) {
          var e = C(n) ? ta : Ra;
          return e(n);
        }
        function Bh(n) {
          if (n == null)
            return 0;
          if (hn(n))
            return or(n) ? Ce(n) : n.length;
          var e = fn(n);
          return e == yn || e == Ln ? n.size : Qr(n).length;
        }
        function Uh(n, e, t) {
          var r = C(n) ? Mr : Ca;
          return t && cn(n, e, t) && (e = f), r(n, S(e, 3));
        }
        var Wh = L(function(n, e) {
          if (n == null)
            return [];
          var t = e.length;
          return t > 1 && cn(n, e[0], e[1]) ? e = [] : t > 2 && cn(e[0], e[1], e[2]) && (e = [e[0]]), Ju(n, rn(e, 1), []);
        }), rr = vc || function() {
          return tn.Date.now();
        };
        function Fh(n, e) {
          if (typeof e != "function")
            throw new bn(B);
          return n = I(n), function() {
            if (--n < 1)
              return e.apply(this, arguments);
          };
        }
        function zf(n, e, t) {
          return e = t ? f : e, e = n && e == null ? n.length : e, Yn(n, Hn, f, f, f, f, e);
        }
        function qf(n, e) {
          var t;
          if (typeof e != "function")
            throw new bn(B);
          return n = I(n), function() {
            return --n > 0 && (t = e.apply(this, arguments)), n <= 1 && (e = f), t;
          };
        }
        var Ai = L(function(n, e, t) {
          var r = In;
          if (t.length) {
            var i = te(t, Ue(Ai));
            r |= $n;
          }
          return Yn(n, r, e, t, i);
        }), Kf = L(function(n, e, t) {
          var r = In | me;
          if (t.length) {
            var i = te(t, Ue(Kf));
            r |= $n;
          }
          return Yn(e, r, n, t, i);
        });
        function Zf(n, e, t) {
          e = t ? f : e;
          var r = Yn(n, Nn, f, f, f, f, f, e);
          return r.placeholder = Zf.placeholder, r;
        }
        function Yf(n, e, t) {
          e = t ? f : e;
          var r = Yn(n, $e, f, f, f, f, f, e);
          return r.placeholder = Yf.placeholder, r;
        }
        function Jf(n, e, t) {
          var r, i, o, s, c, l, p = 0, v = !1, w = !1, A = !0;
          if (typeof n != "function")
            throw new bn(B);
          e = Cn(e) || 0, Y(t) && (v = !!t.leading, w = "maxWait" in t, o = w ? j(Cn(t.maxWait) || 0, e) : o, A = "trailing" in t ? !!t.trailing : A);
          function E(V) {
            var Bn = r, kn = i;
            return r = i = f, p = V, s = n.apply(kn, Bn), s;
          }
          function O(V) {
            return p = V, c = at(M, e), v ? E(V) : s;
          }
          function y(V) {
            var Bn = V - l, kn = V - p, go = e - Bn;
            return w ? un(go, o - kn) : go;
          }
          function T(V) {
            var Bn = V - l, kn = V - p;
            return l === f || Bn >= e || Bn < 0 || w && kn >= o;
          }
          function M() {
            var V = rr();
            if (T(V))
              return D(V);
            c = at(M, y(V));
          }
          function D(V) {
            return c = f, A && r ? E(V) : (r = i = f, s);
          }
          function xn() {
            c !== f && rf(c), p = 0, r = l = i = c = f;
          }
          function an() {
            return c === f ? s : D(rr());
          }
          function An() {
            var V = rr(), Bn = T(V);
            if (r = arguments, i = this, l = V, Bn) {
              if (c === f)
                return O(l);
              if (w)
                return rf(c), c = at(M, e), E(l);
            }
            return c === f && (c = at(M, e)), s;
          }
          return An.cancel = xn, An.flush = an, An;
        }
        var Gh = L(function(n, e) {
          return Uu(n, 1, e);
        }), Nh = L(function(n, e, t) {
          return Uu(n, Cn(e) || 0, t);
        });
        function $h(n) {
          return Yn(n, lr);
        }
        function ir(n, e) {
          if (typeof n != "function" || e != null && typeof e != "function")
            throw new bn(B);
          var t = function() {
            var r = arguments, i = e ? e.apply(this, r) : r[0], o = t.cache;
            if (o.has(i))
              return o.get(i);
            var s = n.apply(this, r);
            return t.cache = o.set(i, s) || o, s;
          };
          return t.cache = new (ir.Cache || Kn)(), t;
        }
        ir.Cache = Kn;
        function ur(n) {
          if (typeof n != "function")
            throw new bn(B);
          return function() {
            var e = arguments;
            switch (e.length) {
              case 0:
                return !n.call(this);
              case 1:
                return !n.call(this, e[0]);
              case 2:
                return !n.call(this, e[0], e[1]);
              case 3:
                return !n.call(this, e[0], e[1], e[2]);
            }
            return !n.apply(this, e);
          };
        }
        function Hh(n) {
          return qf(2, n);
        }
        var zh = Ia(function(n, e) {
          e = e.length == 1 && C(e[0]) ? Z(e[0], pn(S())) : Z(rn(e, 1), pn(S()));
          var t = e.length;
          return L(function(r) {
            for (var i = -1, o = un(r.length, t); ++i < o; )
              r[i] = e[i].call(this, r[i]);
            return _n(n, this, r);
          });
        }), mi = L(function(n, e) {
          var t = te(e, Ue(mi));
          return Yn(n, $n, f, e, t);
        }), Xf = L(function(n, e) {
          var t = te(e, Ue(Xf));
          return Yn(n, He, f, e, t);
        }), qh = Jn(function(n, e) {
          return Yn(n, ze, f, f, f, e);
        });
        function Kh(n, e) {
          if (typeof n != "function")
            throw new bn(B);
          return e = e === f ? e : I(e), L(n, e);
        }
        function Zh(n, e) {
          if (typeof n != "function")
            throw new bn(B);
          return e = e == null ? 0 : j(I(e), 0), L(function(t) {
            var r = t[e], i = oe(t, 0, e);
            return r && ee(i, r), _n(n, this, i);
          });
        }
        function Yh(n, e, t) {
          var r = !0, i = !0;
          if (typeof n != "function")
            throw new bn(B);
          return Y(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), Jf(n, e, {
            leading: r,
            maxWait: e,
            trailing: i
          });
        }
        function Jh(n) {
          return zf(n, 1);
        }
        function Xh(n, e) {
          return mi(ui(e), n);
        }
        function Qh() {
          if (!arguments.length)
            return [];
          var n = arguments[0];
          return C(n) ? n : [n];
        }
        function Vh(n) {
          return On(n, xe);
        }
        function kh(n, e) {
          return e = typeof e == "function" ? e : f, On(n, xe, e);
        }
        function jh(n) {
          return On(n, jn | xe);
        }
        function nd(n, e) {
          return e = typeof e == "function" ? e : f, On(n, jn | xe, e);
        }
        function ed(n, e) {
          return e == null || Bu(n, e, en(e));
        }
        function Dn(n, e) {
          return n === e || n !== n && e !== e;
        }
        var td = Vt(Yr), rd = Vt(function(n, e) {
          return n >= e;
        }), ve = $u(/* @__PURE__ */ function() {
          return arguments;
        }()) ? $u : function(n) {
          return J(n) && G.call(n, "callee") && !Ru.call(n, "callee");
        }, C = d.isArray, id = su ? pn(su) : ha;
        function hn(n) {
          return n != null && fr(n.length) && !Qn(n);
        }
        function Q(n) {
          return J(n) && hn(n);
        }
        function ud(n) {
          return n === !0 || n === !1 || J(n) && sn(n) == qe;
        }
        var se = xc || Mi, fd = cu ? pn(cu) : da;
        function od(n) {
          return J(n) && n.nodeType === 1 && !lt(n);
        }
        function sd(n) {
          if (n == null)
            return !0;
          if (hn(n) && (C(n) || typeof n == "string" || typeof n.splice == "function" || se(n) || We(n) || ve(n)))
            return !n.length;
          var e = fn(n);
          if (e == yn || e == Ln)
            return !n.size;
          if (ct(n))
            return !Qr(n).length;
          for (var t in n)
            if (G.call(n, t))
              return !1;
          return !0;
        }
        function cd(n, e) {
          return ft(n, e);
        }
        function ad(n, e, t) {
          t = typeof t == "function" ? t : f;
          var r = t ? t(n, e) : f;
          return r === f ? ft(n, e, f, t) : !!r;
        }
        function Ei(n) {
          if (!J(n))
            return !1;
          var e = sn(n);
          return e == wt || e == Po || typeof n.message == "string" && typeof n.name == "string" && !lt(n);
        }
        function ld(n) {
          return typeof n == "number" && Iu(n);
        }
        function Qn(n) {
          if (!Y(n))
            return !1;
          var e = sn(n);
          return e == xt || e == Ui || e == Mo || e == Bo;
        }
        function Qf(n) {
          return typeof n == "number" && n == I(n);
        }
        function fr(n) {
          return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Ee;
        }
        function Y(n) {
          var e = typeof n;
          return n != null && (e == "object" || e == "function");
        }
        function J(n) {
          return n != null && typeof n == "object";
        }
        var Vf = au ? pn(au) : _a;
        function hd(n, e) {
          return n === e || Xr(n, e, hi(e));
        }
        function dd(n, e, t) {
          return t = typeof t == "function" ? t : f, Xr(n, e, hi(e), t);
        }
        function gd(n) {
          return kf(n) && n != +n;
        }
        function _d(n) {
          if (ka(n))
            throw new R($);
          return Hu(n);
        }
        function pd(n) {
          return n === null;
        }
        function vd(n) {
          return n == null;
        }
        function kf(n) {
          return typeof n == "number" || J(n) && sn(n) == Ze;
        }
        function lt(n) {
          if (!J(n) || sn(n) != zn)
            return !1;
          var e = Pt(n);
          if (e === null)
            return !0;
          var t = G.call(e, "constructor") && e.constructor;
          return typeof t == "function" && t instanceof t && It.call(t) == dc;
        }
        var bi = lu ? pn(lu) : pa;
        function wd(n) {
          return Qf(n) && n >= -9007199254740991 && n <= Ee;
        }
        var jf = hu ? pn(hu) : va;
        function or(n) {
          return typeof n == "string" || !C(n) && J(n) && sn(n) == Je;
        }
        function wn(n) {
          return typeof n == "symbol" || J(n) && sn(n) == At;
        }
        var We = du ? pn(du) : wa;
        function xd(n) {
          return n === f;
        }
        function Ad(n) {
          return J(n) && fn(n) == Xe;
        }
        function md(n) {
          return J(n) && sn(n) == Wo;
        }
        var Ed = Vt(Vr), bd = Vt(function(n, e) {
          return n <= e;
        });
        function no(n) {
          if (!n)
            return [];
          if (hn(n))
            return or(n) ? Mn(n) : ln(n);
          if (ke && n[ke])
            return ec(n[ke]());
          var e = fn(n), t = e == yn ? Fr : e == Ln ? Tt : Fe;
          return t(n);
        }
        function Vn(n) {
          if (!n)
            return n === 0 ? n : 0;
          if (n = Cn(n), n === _t || n === -1 / 0) {
            var e = n < 0 ? -1 : 1;
            return e * Co;
          }
          return n === n ? n : 0;
        }
        function I(n) {
          var e = Vn(n), t = e % 1;
          return e === e ? t ? e - t : e : 0;
        }
        function eo(n) {
          return n ? de(I(n), 0, Un) : 0;
        }
        function Cn(n) {
          if (typeof n == "number")
            return n;
          if (wn(n))
            return pt;
          if (Y(n)) {
            var e = typeof n.valueOf == "function" ? n.valueOf() : n;
            n = Y(e) ? e + "" : e;
          }
          if (typeof n != "string")
            return n === 0 ? n : +n;
          n = xu(n);
          var t = is.test(n);
          return t || fs.test(n) ? Fs(n.slice(2), t ? 2 : 8) : rs.test(n) ? pt : +n;
        }
        function to(n) {
          return Fn(n, dn(n));
        }
        function Sd(n) {
          return n ? de(I(n), -9007199254740991, Ee) : n === 0 ? n : 0;
        }
        function W(n) {
          return n == null ? "" : vn(n);
        }
        var Od = De(function(n, e) {
          if (ct(e) || hn(e)) {
            Fn(e, en(e), n);
            return;
          }
          for (var t in e)
            G.call(e, t) && rt(n, t, e[t]);
        }), ro = De(function(n, e) {
          Fn(e, dn(e), n);
        }), sr = De(function(n, e, t, r) {
          Fn(e, dn(e), n, r);
        }), Td = De(function(n, e, t, r) {
          Fn(e, en(e), n, r);
        }), Rd = Jn(qr);
        function Cd(n, e) {
          var t = Pe(n);
          return e == null ? t : Du(t, e);
        }
        var Id = L(function(n, e) {
          n = z(n);
          var t = -1, r = e.length, i = r > 2 ? e[2] : f;
          for (i && cn(e[0], e[1], i) && (r = 1); ++t < r; )
            for (var o = e[t], s = dn(o), c = -1, l = s.length; ++c < l; ) {
              var p = s[c], v = n[p];
              (v === f || Dn(v, ye[p]) && !G.call(n, p)) && (n[p] = o[p]);
            }
          return n;
        }), yd = L(function(n) {
          return n.push(f, Af), _n(io, f, n);
        });
        function Ld(n, e) {
          return _u(n, S(e, 3), Wn);
        }
        function Md(n, e) {
          return _u(n, S(e, 3), Zr);
        }
        function Pd(n, e) {
          return n == null ? n : Kr(n, S(e, 3), dn);
        }
        function Dd(n, e) {
          return n == null ? n : Gu(n, S(e, 3), dn);
        }
        function Bd(n, e) {
          return n && Wn(n, S(e, 3));
        }
        function Ud(n, e) {
          return n && Zr(n, S(e, 3));
        }
        function Wd(n) {
          return n == null ? [] : zt(n, en(n));
        }
        function Fd(n) {
          return n == null ? [] : zt(n, dn(n));
        }
        function Si(n, e, t) {
          var r = n == null ? f : ge(n, e);
          return r === f ? t : r;
        }
        function Gd(n, e) {
          return n != null && bf(n, e, sa);
        }
        function Oi(n, e) {
          return n != null && bf(n, e, ca);
        }
        var Nd = _f(function(n, e, t) {
          e != null && typeof e.toString != "function" && (e = yt.call(e)), n[e] = t;
        }, Ri(gn)), $d = _f(function(n, e, t) {
          e != null && typeof e.toString != "function" && (e = yt.call(e)), G.call(n, e) ? n[e].push(t) : n[e] = [t];
        }, S), Hd = L(ut);
        function en(n) {
          return hn(n) ? Mu(n) : Qr(n);
        }
        function dn(n) {
          return hn(n) ? Mu(n, !0) : xa(n);
        }
        function zd(n, e) {
          var t = {};
          return e = S(e, 3), Wn(n, function(r, i, o) {
            Zn(t, e(r, i, o), r);
          }), t;
        }
        function qd(n, e) {
          var t = {};
          return e = S(e, 3), Wn(n, function(r, i, o) {
            Zn(t, i, e(r, i, o));
          }), t;
        }
        var Kd = De(function(n, e, t) {
          qt(n, e, t);
        }), io = De(function(n, e, t, r) {
          qt(n, e, t, r);
        }), Zd = Jn(function(n, e) {
          var t = {};
          if (n == null)
            return t;
          var r = !1;
          e = Z(e, function(o) {
            return o = fe(o, n), r || (r = o.length > 1), o;
          }), Fn(n, ai(n), t), r && (t = On(t, jn | Pi | xe, Na));
          for (var i = e.length; i--; )
            ti(t, e[i]);
          return t;
        });
        function Yd(n, e) {
          return uo(n, ur(S(e)));
        }
        var Jd = Jn(function(n, e) {
          return n == null ? {} : ma(n, e);
        });
        function uo(n, e) {
          if (n == null)
            return {};
          var t = Z(ai(n), function(r) {
            return [r];
          });
          return e = S(e), Xu(n, t, function(r, i) {
            return e(r, i[0]);
          });
        }
        function Xd(n, e, t) {
          e = fe(e, n);
          var r = -1, i = e.length;
          for (i || (i = 1, n = f); ++r < i; ) {
            var o = n == null ? f : n[Gn(e[r])];
            o === f && (r = i, o = t), n = Qn(o) ? o.call(n) : o;
          }
          return n;
        }
        function Qd(n, e, t) {
          return n == null ? n : ot(n, e, t);
        }
        function Vd(n, e, t, r) {
          return r = typeof r == "function" ? r : f, n == null ? n : ot(n, e, t, r);
        }
        var fo = wf(en), oo = wf(dn);
        function kd(n, e, t) {
          var r = C(n), i = r || se(n) || We(n);
          if (e = S(e, 4), t == null) {
            var o = n && n.constructor;
            i ? t = r ? new o() : [] : Y(n) ? t = Qn(o) ? Pe(Pt(n)) : {} : t = {};
          }
          return (i ? En : Wn)(n, function(s, c, l) {
            return e(t, s, c, l);
          }), t;
        }
        function jd(n, e) {
          return n == null ? !0 : ti(n, e);
        }
        function ng(n, e, t) {
          return n == null ? n : nf(n, e, ui(t));
        }
        function eg(n, e, t, r) {
          return r = typeof r == "function" ? r : f, n == null ? n : nf(n, e, ui(t), r);
        }
        function Fe(n) {
          return n == null ? [] : Wr(n, en(n));
        }
        function tg(n) {
          return n == null ? [] : Wr(n, dn(n));
        }
        function rg(n, e, t) {
          return t === f && (t = e, e = f), t !== f && (t = Cn(t), t = t === t ? t : 0), e !== f && (e = Cn(e), e = e === e ? e : 0), de(Cn(n), e, t);
        }
        function ig(n, e, t) {
          return e = Vn(e), t === f ? (t = e, e = 0) : t = Vn(t), n = Cn(n), aa(n, e, t);
        }
        function ug(n, e, t) {
          if (t && typeof t != "boolean" && cn(n, e, t) && (e = t = f), t === f && (typeof e == "boolean" ? (t = e, e = f) : typeof n == "boolean" && (t = n, n = f)), n === f && e === f ? (n = 0, e = 1) : (n = Vn(n), e === f ? (e = n, n = 0) : e = Vn(e)), n > e) {
            var r = n;
            n = e, e = r;
          }
          if (t || n % 1 || e % 1) {
            var i = yu();
            return un(n + i * (e - n + Ws("1e-" + ((i + "").length - 1))), e);
          }
          return jr(n, e);
        }
        var fg = Be(function(n, e, t) {
          return e = e.toLowerCase(), n + (t ? so(e) : e);
        });
        function so(n) {
          return Ti(W(n).toLowerCase());
        }
        function co(n) {
          return n = W(n), n && n.replace(ss, Qs).replace(Rs, "");
        }
        function og(n, e, t) {
          n = W(n), e = vn(e);
          var r = n.length;
          t = t === f ? r : de(I(t), 0, r);
          var i = t;
          return t -= e.length, t >= 0 && n.slice(t, i) == e;
        }
        function sg(n) {
          return n = W(n), n && Ho.test(n) ? n.replace(Gi, Vs) : n;
        }
        function cg(n) {
          return n = W(n), n && Jo.test(n) ? n.replace(mr, "\\$&") : n;
        }
        var ag = Be(function(n, e, t) {
          return n + (t ? "-" : "") + e.toLowerCase();
        }), lg = Be(function(n, e, t) {
          return n + (t ? " " : "") + e.toLowerCase();
        }), hg = hf("toLowerCase");
        function dg(n, e, t) {
          n = W(n), e = I(e);
          var r = e ? Ce(n) : 0;
          if (!e || r >= e)
            return n;
          var i = (e - r) / 2;
          return Qt(Wt(i), t) + n + Qt(Ut(i), t);
        }
        function gg(n, e, t) {
          n = W(n), e = I(e);
          var r = e ? Ce(n) : 0;
          return e && r < e ? n + Qt(e - r, t) : n;
        }
        function _g(n, e, t) {
          n = W(n), e = I(e);
          var r = e ? Ce(n) : 0;
          return e && r < e ? Qt(e - r, t) + n : n;
        }
        function pg(n, e, t) {
          return t || e == null ? e = 0 : e && (e = +e), bc(W(n).replace(Er, ""), e || 0);
        }
        function vg(n, e, t) {
          return (t ? cn(n, e, t) : e === f) ? e = 1 : e = I(e), ni(W(n), e);
        }
        function wg() {
          var n = arguments, e = W(n[0]);
          return n.length < 3 ? e : e.replace(n[1], n[2]);
        }
        var xg = Be(function(n, e, t) {
          return n + (t ? "_" : "") + e.toLowerCase();
        });
        function Ag(n, e, t) {
          return t && typeof t != "number" && cn(n, e, t) && (e = t = f), t = t === f ? Un : t >>> 0, t ? (n = W(n), n && (typeof e == "string" || e != null && !bi(e)) && (e = vn(e), !e && Re(n)) ? oe(Mn(n), 0, t) : n.split(e, t)) : [];
        }
        var mg = Be(function(n, e, t) {
          return n + (t ? " " : "") + Ti(e);
        });
        function Eg(n, e, t) {
          return n = W(n), t = t == null ? 0 : de(I(t), 0, n.length), e = vn(e), n.slice(t, t + e.length) == e;
        }
        function bg(n, e, t) {
          var r = u.templateSettings;
          t && cn(n, e, t) && (e = f), n = W(n), e = sr({}, e, r, xf);
          var i = sr({}, e.imports, r.imports, xf), o = en(i), s = Wr(i, o), c, l, p = 0, v = e.interpolate || mt, w = "__p += '", A = Gr(
            (e.escape || mt).source + "|" + v.source + "|" + (v === Ni ? ts : mt).source + "|" + (e.evaluate || mt).source + "|$",
            "g"
          ), E = "//# sourceURL=" + (G.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Ms + "]") + `
`;
          n.replace(A, function(T, M, D, xn, an, An) {
            return D || (D = xn), w += n.slice(p, An).replace(cs, ks), M && (c = !0, w += `' +
__e(` + M + `) +
'`), an && (l = !0, w += `';
` + an + `;
__p += '`), D && (w += `' +
((__t = (` + D + `)) == null ? '' : __t) +
'`), p = An + T.length, T;
          }), w += `';
`;
          var O = G.call(e, "variable") && e.variable;
          if (!O)
            w = `with (obj) {
` + w + `
}
`;
          else if (ns.test(O))
            throw new R(X);
          w = (l ? w.replace(Fo, "") : w).replace(Go, "$1").replace(No, "$1;"), w = "function(" + (O || "obj") + `) {
` + (O ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (l ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + w + `return __p
}`;
          var y = lo(function() {
            return U(o, E + "return " + w).apply(f, s);
          });
          if (y.source = w, Ei(y))
            throw y;
          return y;
        }
        function Sg(n) {
          return W(n).toLowerCase();
        }
        function Og(n) {
          return W(n).toUpperCase();
        }
        function Tg(n, e, t) {
          if (n = W(n), n && (t || e === f))
            return xu(n);
          if (!n || !(e = vn(e)))
            return n;
          var r = Mn(n), i = Mn(e), o = Au(r, i), s = mu(r, i) + 1;
          return oe(r, o, s).join("");
        }
        function Rg(n, e, t) {
          if (n = W(n), n && (t || e === f))
            return n.slice(0, bu(n) + 1);
          if (!n || !(e = vn(e)))
            return n;
          var r = Mn(n), i = mu(r, Mn(e)) + 1;
          return oe(r, 0, i).join("");
        }
        function Cg(n, e, t) {
          if (n = W(n), n && (t || e === f))
            return n.replace(Er, "");
          if (!n || !(e = vn(e)))
            return n;
          var r = Mn(n), i = Au(r, Mn(e));
          return oe(r, i).join("");
        }
        function Ig(n, e) {
          var t = Eo, r = bo;
          if (Y(e)) {
            var i = "separator" in e ? e.separator : i;
            t = "length" in e ? I(e.length) : t, r = "omission" in e ? vn(e.omission) : r;
          }
          n = W(n);
          var o = n.length;
          if (Re(n)) {
            var s = Mn(n);
            o = s.length;
          }
          if (t >= o)
            return n;
          var c = t - Ce(r);
          if (c < 1)
            return r;
          var l = s ? oe(s, 0, c).join("") : n.slice(0, c);
          if (i === f)
            return l + r;
          if (s && (c += l.length - c), bi(i)) {
            if (n.slice(c).search(i)) {
              var p, v = l;
              for (i.global || (i = Gr(i.source, W($i.exec(i)) + "g")), i.lastIndex = 0; p = i.exec(v); )
                var w = p.index;
              l = l.slice(0, w === f ? c : w);
            }
          } else if (n.indexOf(vn(i), c) != c) {
            var A = l.lastIndexOf(i);
            A > -1 && (l = l.slice(0, A));
          }
          return l + r;
        }
        function yg(n) {
          return n = W(n), n && $o.test(n) ? n.replace(Fi, uc) : n;
        }
        var Lg = Be(function(n, e, t) {
          return n + (t ? " " : "") + e.toUpperCase();
        }), Ti = hf("toUpperCase");
        function ao(n, e, t) {
          return n = W(n), e = t ? f : e, e === f ? nc(n) ? sc(n) : Ks(n) : n.match(e) || [];
        }
        var lo = L(function(n, e) {
          try {
            return _n(n, f, e);
          } catch (t) {
            return Ei(t) ? t : new R(t);
          }
        }), Mg = Jn(function(n, e) {
          return En(e, function(t) {
            t = Gn(t), Zn(n, t, Ai(n[t], n));
          }), n;
        });
        function Pg(n) {
          var e = n == null ? 0 : n.length, t = S();
          return n = e ? Z(n, function(r) {
            if (typeof r[1] != "function")
              throw new bn(B);
            return [t(r[0]), r[1]];
          }) : [], L(function(r) {
            for (var i = -1; ++i < e; ) {
              var o = n[i];
              if (_n(o[0], this, r))
                return _n(o[1], this, r);
            }
          });
        }
        function Dg(n) {
          return ua(On(n, jn));
        }
        function Ri(n) {
          return function() {
            return n;
          };
        }
        function Bg(n, e) {
          return n == null || n !== n ? e : n;
        }
        var Ug = gf(), Wg = gf(!0);
        function gn(n) {
          return n;
        }
        function Ci(n) {
          return zu(typeof n == "function" ? n : On(n, jn));
        }
        function Fg(n) {
          return Ku(On(n, jn));
        }
        function Gg(n, e) {
          return Zu(n, On(e, jn));
        }
        var Ng = L(function(n, e) {
          return function(t) {
            return ut(t, n, e);
          };
        }), $g = L(function(n, e) {
          return function(t) {
            return ut(n, t, e);
          };
        });
        function Ii(n, e, t) {
          var r = en(e), i = zt(e, r);
          t == null && !(Y(e) && (i.length || !r.length)) && (t = e, e = n, n = this, i = zt(e, en(e)));
          var o = !(Y(t) && "chain" in t) || !!t.chain, s = Qn(n);
          return En(i, function(c) {
            var l = e[c];
            n[c] = l, s && (n.prototype[c] = function() {
              var p = this.__chain__;
              if (o || p) {
                var v = n(this.__wrapped__), w = v.__actions__ = ln(this.__actions__);
                return w.push({ func: l, args: arguments, thisArg: n }), v.__chain__ = p, v;
              }
              return l.apply(n, ee([this.value()], arguments));
            });
          }), n;
        }
        function Hg() {
          return tn._ === this && (tn._ = gc), this;
        }
        function yi() {
        }
        function zg(n) {
          return n = I(n), L(function(e) {
            return Yu(e, n);
          });
        }
        var qg = oi(Z), Kg = oi(gu), Zg = oi(Mr);
        function ho(n) {
          return gi(n) ? Pr(Gn(n)) : Ea(n);
        }
        function Yg(n) {
          return function(e) {
            return n == null ? f : ge(n, e);
          };
        }
        var Jg = pf(), Xg = pf(!0);
        function Li() {
          return [];
        }
        function Mi() {
          return !1;
        }
        function Qg() {
          return {};
        }
        function Vg() {
          return "";
        }
        function kg() {
          return !0;
        }
        function jg(n, e) {
          if (n = I(n), n < 1 || n > Ee)
            return [];
          var t = Un, r = un(n, Un);
          e = S(e), n -= Un;
          for (var i = Ur(r, e); ++t < n; )
            e(t);
          return i;
        }
        function n_(n) {
          return C(n) ? Z(n, Gn) : wn(n) ? [n] : ln(Mf(W(n)));
        }
        function e_(n) {
          var e = ++hc;
          return W(n) + e;
        }
        var t_ = Xt(function(n, e) {
          return n + e;
        }, 0), r_ = si("ceil"), i_ = Xt(function(n, e) {
          return n / e;
        }, 1), u_ = si("floor");
        function f_(n) {
          return n && n.length ? Ht(n, gn, Yr) : f;
        }
        function o_(n, e) {
          return n && n.length ? Ht(n, S(e, 2), Yr) : f;
        }
        function s_(n) {
          return vu(n, gn);
        }
        function c_(n, e) {
          return vu(n, S(e, 2));
        }
        function a_(n) {
          return n && n.length ? Ht(n, gn, Vr) : f;
        }
        function l_(n, e) {
          return n && n.length ? Ht(n, S(e, 2), Vr) : f;
        }
        var h_ = Xt(function(n, e) {
          return n * e;
        }, 1), d_ = si("round"), g_ = Xt(function(n, e) {
          return n - e;
        }, 0);
        function __(n) {
          return n && n.length ? Br(n, gn) : 0;
        }
        function p_(n, e) {
          return n && n.length ? Br(n, S(e, 2)) : 0;
        }
        return u.after = Fh, u.ary = zf, u.assign = Od, u.assignIn = ro, u.assignInWith = sr, u.assignWith = Td, u.at = Rd, u.before = qf, u.bind = Ai, u.bindAll = Mg, u.bindKey = Kf, u.castArray = Qh, u.chain = Nf, u.chunk = ul, u.compact = fl, u.concat = ol, u.cond = Pg, u.conforms = Dg, u.constant = Ri, u.countBy = _h, u.create = Cd, u.curry = Zf, u.curryRight = Yf, u.debounce = Jf, u.defaults = Id, u.defaultsDeep = yd, u.defer = Gh, u.delay = Nh, u.difference = sl, u.differenceBy = cl, u.differenceWith = al, u.drop = ll, u.dropRight = hl, u.dropRightWhile = dl, u.dropWhile = gl, u.fill = _l, u.filter = vh, u.flatMap = Ah, u.flatMapDeep = mh, u.flatMapDepth = Eh, u.flatten = Uf, u.flattenDeep = pl, u.flattenDepth = vl, u.flip = $h, u.flow = Ug, u.flowRight = Wg, u.fromPairs = wl, u.functions = Wd, u.functionsIn = Fd, u.groupBy = bh, u.initial = Al, u.intersection = ml, u.intersectionBy = El, u.intersectionWith = bl, u.invert = Nd, u.invertBy = $d, u.invokeMap = Oh, u.iteratee = Ci, u.keyBy = Th, u.keys = en, u.keysIn = dn, u.map = tr, u.mapKeys = zd, u.mapValues = qd, u.matches = Fg, u.matchesProperty = Gg, u.memoize = ir, u.merge = Kd, u.mergeWith = io, u.method = Ng, u.methodOf = $g, u.mixin = Ii, u.negate = ur, u.nthArg = zg, u.omit = Zd, u.omitBy = Yd, u.once = Hh, u.orderBy = Rh, u.over = qg, u.overArgs = zh, u.overEvery = Kg, u.overSome = Zg, u.partial = mi, u.partialRight = Xf, u.partition = Ch, u.pick = Jd, u.pickBy = uo, u.property = ho, u.propertyOf = Yg, u.pull = Rl, u.pullAll = Ff, u.pullAllBy = Cl, u.pullAllWith = Il, u.pullAt = yl, u.range = Jg, u.rangeRight = Xg, u.rearg = qh, u.reject = Lh, u.remove = Ll, u.rest = Kh, u.reverse = wi, u.sampleSize = Ph, u.set = Qd, u.setWith = Vd, u.shuffle = Dh, u.slice = Ml, u.sortBy = Wh, u.sortedUniq = Gl, u.sortedUniqBy = Nl, u.split = Ag, u.spread = Zh, u.tail = $l, u.take = Hl, u.takeRight = zl, u.takeRightWhile = ql, u.takeWhile = Kl, u.tap = fh, u.throttle = Yh, u.thru = er, u.toArray = no, u.toPairs = fo, u.toPairsIn = oo, u.toPath = n_, u.toPlainObject = to, u.transform = kd, u.unary = Jh, u.union = Zl, u.unionBy = Yl, u.unionWith = Jl, u.uniq = Xl, u.uniqBy = Ql, u.uniqWith = Vl, u.unset = jd, u.unzip = xi, u.unzipWith = Gf, u.update = ng, u.updateWith = eg, u.values = Fe, u.valuesIn = tg, u.without = kl, u.words = ao, u.wrap = Xh, u.xor = jl, u.xorBy = nh, u.xorWith = eh, u.zip = th, u.zipObject = rh, u.zipObjectDeep = ih, u.zipWith = uh, u.entries = fo, u.entriesIn = oo, u.extend = ro, u.extendWith = sr, Ii(u, u), u.add = t_, u.attempt = lo, u.camelCase = fg, u.capitalize = so, u.ceil = r_, u.clamp = rg, u.clone = Vh, u.cloneDeep = jh, u.cloneDeepWith = nd, u.cloneWith = kh, u.conformsTo = ed, u.deburr = co, u.defaultTo = Bg, u.divide = i_, u.endsWith = og, u.eq = Dn, u.escape = sg, u.escapeRegExp = cg, u.every = ph, u.find = wh, u.findIndex = Df, u.findKey = Ld, u.findLast = xh, u.findLastIndex = Bf, u.findLastKey = Md, u.floor = u_, u.forEach = $f, u.forEachRight = Hf, u.forIn = Pd, u.forInRight = Dd, u.forOwn = Bd, u.forOwnRight = Ud, u.get = Si, u.gt = td, u.gte = rd, u.has = Gd, u.hasIn = Oi, u.head = Wf, u.identity = gn, u.includes = Sh, u.indexOf = xl, u.inRange = ig, u.invoke = Hd, u.isArguments = ve, u.isArray = C, u.isArrayBuffer = id, u.isArrayLike = hn, u.isArrayLikeObject = Q, u.isBoolean = ud, u.isBuffer = se, u.isDate = fd, u.isElement = od, u.isEmpty = sd, u.isEqual = cd, u.isEqualWith = ad, u.isError = Ei, u.isFinite = ld, u.isFunction = Qn, u.isInteger = Qf, u.isLength = fr, u.isMap = Vf, u.isMatch = hd, u.isMatchWith = dd, u.isNaN = gd, u.isNative = _d, u.isNil = vd, u.isNull = pd, u.isNumber = kf, u.isObject = Y, u.isObjectLike = J, u.isPlainObject = lt, u.isRegExp = bi, u.isSafeInteger = wd, u.isSet = jf, u.isString = or, u.isSymbol = wn, u.isTypedArray = We, u.isUndefined = xd, u.isWeakMap = Ad, u.isWeakSet = md, u.join = Sl, u.kebabCase = ag, u.last = Rn, u.lastIndexOf = Ol, u.lowerCase = lg, u.lowerFirst = hg, u.lt = Ed, u.lte = bd, u.max = f_, u.maxBy = o_, u.mean = s_, u.meanBy = c_, u.min = a_, u.minBy = l_, u.stubArray = Li, u.stubFalse = Mi, u.stubObject = Qg, u.stubString = Vg, u.stubTrue = kg, u.multiply = h_, u.nth = Tl, u.noConflict = Hg, u.noop = yi, u.now = rr, u.pad = dg, u.padEnd = gg, u.padStart = _g, u.parseInt = pg, u.random = ug, u.reduce = Ih, u.reduceRight = yh, u.repeat = vg, u.replace = wg, u.result = Xd, u.round = d_, u.runInContext = a, u.sample = Mh, u.size = Bh, u.snakeCase = xg, u.some = Uh, u.sortedIndex = Pl, u.sortedIndexBy = Dl, u.sortedIndexOf = Bl, u.sortedLastIndex = Ul, u.sortedLastIndexBy = Wl, u.sortedLastIndexOf = Fl, u.startCase = mg, u.startsWith = Eg, u.subtract = g_, u.sum = __, u.sumBy = p_, u.template = bg, u.times = jg, u.toFinite = Vn, u.toInteger = I, u.toLength = eo, u.toLower = Sg, u.toNumber = Cn, u.toSafeInteger = Sd, u.toString = W, u.toUpper = Og, u.trim = Tg, u.trimEnd = Rg, u.trimStart = Cg, u.truncate = Ig, u.unescape = yg, u.uniqueId = e_, u.upperCase = Lg, u.upperFirst = Ti, u.each = $f, u.eachRight = Hf, u.first = Wf, Ii(u, function() {
          var n = {};
          return Wn(u, function(e, t) {
            G.call(u.prototype, t) || (n[t] = e);
          }), n;
        }(), { chain: !1 }), u.VERSION = x, En(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
          u[n].placeholder = u;
        }), En(["drop", "take"], function(n, e) {
          P.prototype[n] = function(t) {
            t = t === f ? 1 : j(I(t), 0);
            var r = this.__filtered__ && !e ? new P(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = un(t, r.__takeCount__) : r.__views__.push({
              size: un(t, Un),
              type: n + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, P.prototype[n + "Right"] = function(t) {
            return this.reverse()[n](t).reverse();
          };
        }), En(["filter", "map", "takeWhile"], function(n, e) {
          var t = e + 1, r = t == Bi || t == Ro;
          P.prototype[n] = function(i) {
            var o = this.clone();
            return o.__iteratees__.push({
              iteratee: S(i, 3),
              type: t
            }), o.__filtered__ = o.__filtered__ || r, o;
          };
        }), En(["head", "last"], function(n, e) {
          var t = "take" + (e ? "Right" : "");
          P.prototype[n] = function() {
            return this[t](1).value()[0];
          };
        }), En(["initial", "tail"], function(n, e) {
          var t = "drop" + (e ? "" : "Right");
          P.prototype[n] = function() {
            return this.__filtered__ ? new P(this) : this[t](1);
          };
        }), P.prototype.compact = function() {
          return this.filter(gn);
        }, P.prototype.find = function(n) {
          return this.filter(n).head();
        }, P.prototype.findLast = function(n) {
          return this.reverse().find(n);
        }, P.prototype.invokeMap = L(function(n, e) {
          return typeof n == "function" ? new P(this) : this.map(function(t) {
            return ut(t, n, e);
          });
        }), P.prototype.reject = function(n) {
          return this.filter(ur(S(n)));
        }, P.prototype.slice = function(n, e) {
          n = I(n);
          var t = this;
          return t.__filtered__ && (n > 0 || e < 0) ? new P(t) : (n < 0 ? t = t.takeRight(-n) : n && (t = t.drop(n)), e !== f && (e = I(e), t = e < 0 ? t.dropRight(-e) : t.take(e - n)), t);
        }, P.prototype.takeRightWhile = function(n) {
          return this.reverse().takeWhile(n).reverse();
        }, P.prototype.toArray = function() {
          return this.take(Un);
        }, Wn(P.prototype, function(n, e) {
          var t = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), i = u[r ? "take" + (e == "last" ? "Right" : "") : e], o = r || /^find/.test(e);
          i && (u.prototype[e] = function() {
            var s = this.__wrapped__, c = r ? [1] : arguments, l = s instanceof P, p = c[0], v = l || C(s), w = function(M) {
              var D = i.apply(u, ee([M], c));
              return r && A ? D[0] : D;
            };
            v && t && typeof p == "function" && p.length != 1 && (l = v = !1);
            var A = this.__chain__, E = !!this.__actions__.length, O = o && !A, y = l && !E;
            if (!o && v) {
              s = y ? s : new P(this);
              var T = n.apply(s, c);
              return T.__actions__.push({ func: er, args: [w], thisArg: f }), new Sn(T, A);
            }
            return O && y ? n.apply(this, c) : (T = this.thru(w), O ? r ? T.value()[0] : T.value() : T);
          });
        }), En(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
          var e = Rt[n], t = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n);
          u.prototype[n] = function() {
            var i = arguments;
            if (r && !this.__chain__) {
              var o = this.value();
              return e.apply(C(o) ? o : [], i);
            }
            return this[t](function(s) {
              return e.apply(C(s) ? s : [], i);
            });
          };
        }), Wn(P.prototype, function(n, e) {
          var t = u[e];
          if (t) {
            var r = t.name + "";
            G.call(Me, r) || (Me[r] = []), Me[r].push({ name: e, func: t });
          }
        }), Me[Jt(f, me).name] = [{
          name: "wrapper",
          func: f
        }], P.prototype.clone = yc, P.prototype.reverse = Lc, P.prototype.value = Mc, u.prototype.at = oh, u.prototype.chain = sh, u.prototype.commit = ch, u.prototype.next = ah, u.prototype.plant = hh, u.prototype.reverse = dh, u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = gh, u.prototype.first = u.prototype.head, ke && (u.prototype[ke] = lh), u;
      }, Ie = cc();
      ce ? ((ce.exports = Ie)._ = Ie, Cr._ = Ie) : tn._ = Ie;
    }).call(L_);
  }(dt, dt.exports)), dt.exports;
}
var P_ = M_();
const Ge = F.define({
  description: "Updates an existing object.",
  execute: (g, { engine: h, registered: f }) => {
    const x = f.get(g.id);
    if (!x) throw new Error("Object not found.");
    f.set(g.id, P_.merge(x, g));
    const b = f.get(g.id);
    h.scene.UpdateSceneObject({
      ...g,
      id: b.id,
      entityType: b.entityType
    });
  }
});
N("UPDATE_OBJECT", Ge);
const mo = F.define({
  description: "Attach an object to another object.",
  execute: (g, { engine: h, registered: f }) => {
    const x = f.get(g.object.id);
    if (!x) throw new Error("Object not found.");
    const b = h.scene.GetSceneObject(x);
    if (!b) throw new Error("Object not found in scene.");
    if (g.parent === null)
      throw h.scene.Root.attach(b), new Ge(
        {
          id: x.id,
          parentId: null
        },
        { engine: h, registered: f }
      ), new Error("Object not found in scene.");
    if (g.object.id === g.parent.id)
      throw new Error("Cannot attach object to itself.");
    const $ = f.get(g.parent.id);
    if (!$)
      throw h.scene.Root.attach(b), new Ge(
        {
          id: x.id,
          parentId: null
        },
        { engine: h, registered: f }
      ), new Error("Parent object not found.");
    const B = h.scene.GetSceneObject($);
    if (!B)
      throw h.scene.Root.attach(b), new Ge(
        {
          id: x.id,
          parentId: null
        },
        { engine: h, registered: f }
      ), new Error("Parent object not found in scene.");
    B.attach(b), new Ge(
      {
        id: x.id,
        parentId: $.id
      },
      { engine: h, registered: f }
    );
  }
});
N("SET_PARENT", mo);
const D_ = F.define({
  description: "Deletes an object from the scene.",
  execute: (g, { engine: h, registered: f }) => {
    const x = f.get(g.id);
    if (!x) return !1;
    x.parentId && new mo(
      {
        object: { id: x.id },
        parent: null
      },
      {
        engine: h,
        registered: f
      }
    ).execute(), x.entityType === "group" && f.forEach((b) => {
      b.parentId === x.id && new Ge(
        {
          id: b.id,
          parentId: null
        },
        {
          engine: h,
          registered: f
        }
      ).execute();
    }), Object.assign(g, x), f.delete(g.id), h.scene.DeleteSceneObject(x);
  }
});
N("DELETE_OBJECT", D_);
const B_ = F.define({
  description: "Deselects an existing object.",
  execute: async (g, { engine: h, controller: f, Toolbox: x, registered: b }) => {
    const $ = b.get(g.id);
    if (!$) throw new Error("Object not found.");
    const B = h.scene.GetSceneObject($);
    if (!B) throw new Error("Object not found in scene.");
    if (!("isSelectable" in B))
      throw new Error("Object is not selectable.");
    const H = (await x.instantiate(h.scene, f)).GetActiveTool();
    H && wo(H) && H.DetachGizmo();
  }
});
N("DESELECT_OBJECT", B_);
const U_ = F.define({
  description: "Places an object on top of an underlying object or the floor.",
  execute: (g, { engine: h, registered: f }) => {
    const x = f.get(g.id);
    if (!x)
      throw new Error(
        `Object with id ${g.id} not registered. Registered: ${f}`
      );
    const b = h.scene.GetSceneObject(x);
    if (!b)
      throw new Error(
        `Object with id ${g.id} is not found in the scene. Scene: ${h.scene}`
      );
    b.DropIt();
  }
});
N("DROP_IT", U_);
const W_ = F.define({
  description: "Retrieves all objects in the state.",
  execute: (g, { registered: h }) => h
});
N("GET_ALL_OBJECTS", W_);
const F_ = F.define({
  description: "Returns a list of objects of given IDs.",
  execute: (g, { registered: h }) => g.ids.length === 0 ? [] : Array.from(h.values()).filter(
    (f) => g.ids.includes(f.id)
  )
});
N("GET_OBJECTS", F_);
const G_ = F.define({
  description: "Is triggered when a model is loaded.",
  execute: (g, { registered: h }) => {
    const f = h.get(g.id);
    if (!f)
      throw new Error(`Model with id ${g.id} not found`);
    if (!S_(f))
      throw new Error(`Model with id ${g.id} is not a COMModel`);
    f.loaded = !0;
  }
});
N("MODEL_LOADED", G_);
const N_ = F.define({
  description: "Places an object on the floor.",
  execute: (g, { engine: h, registered: f }) => {
    const x = f.get(g.id);
    if (!x)
      throw new Error(
        `Object with id ${g.id} not registered. Registered: ${f}`
      );
    const b = h.scene.GetSceneObject(x);
    if (!b)
      throw new Error(
        `Object with id ${g.id} is not found in the scene. Scene: ${h.scene}`
      );
    b.PlaceOnFloor();
  }
});
N("PLACE_ON_FLOOR", N_);
const $_ = F.define({
  description: "Selects an existing object.",
  execute: async (g, { engine: h, controller: f, Toolbox: x, registered: b }) => {
    const $ = b.get(g.id);
    if (!$) throw new Error("Object not found.");
    const B = h.scene.GetSceneObject($);
    if (!B) throw new Error("Object not found in scene.");
    if (!("isSelectable" in B))
      throw new Error("Object is not selectable.");
    const H = (await x.instantiate(h.scene, f)).GetActiveTool();
    H && wo(H) && H.AttachGizmo(B);
  }
});
N("SELECT_OBJECT", $_);
const H_ = F.define({
  description: "Starts the render process.",
  execute: (g, { engine: h }) => {
    h.start();
  }
});
N("START_RENDER", H_);
const z_ = F.define({
  description: "Exports the current scene to a blob and returns the URL.",
  execute: async (g, { engine: h, AssetExporter: f }) => f.instantiate().then((x) => x.export(h.scene.Root, g.type))
});
N("EXPORT_SCENE", z_);
const q_ = F.define({
  description: "Retrieves all current scene data.",
  execute: (g, { engine: h, controller: f, registered: x }) => ({
    name: h.scene.name,
    mediaItem: null,
    backgroundColor: "#" + h.scene.background.getHexString(),
    floorEnabled: h.scene.Root.floor.visible,
    floorColor: "#" + h.scene.Root.floor.material.color.getHexString(),
    userCamera: {
      position: f.object.position.clone(),
      target: f.target.clone()
    },
    spotmarks: [],
    lights: Array.from(x.values()).filter(
      (b) => b.entityType === "light"
    ),
    objects: Array.from(x.values()).filter(
      (b) => b.entityType === "model"
    ),
    cameras: Array.from(x.values()).filter(
      (b) => b.entityType === "pov"
    ),
    primitives: Array.from(x.values()).filter(
      (b) => b.entityType === "primitive"
    ),
    groups: Array.from(x.values()).filter(
      (b) => b.entityType === "group"
    )
  })
});
N("GET_ALL_SCENE_DATA", q_);
const K_ = F.define({
  description: "Set the background color of the scene.",
  execute: (g, { engine: h }) => {
    h.scene.SetBackground(g.color);
  }
});
N("SET_BACKGROUND", K_);
const Z_ = F.define({
  description: "Updates scene properties.",
  execute: (g, { engine: h }) => {
    g.name !== void 0 && (h.scene.name = g.name), g.backgroundColor !== void 0 && h.scene.SetBackground(g.backgroundColor), g.gridEnabled !== void 0 && h.scene.Grid.SetVisibility(g.gridEnabled), g.floorEnabled !== void 0 && h.scene.Root.floor.SetVisibility(g.floorEnabled), g.floorColor !== void 0 && h.scene.Root.floor.SetColor(g.floorColor), g.name = h.scene.name, g.backgroundColor = "#" + h.scene.background.getHexString(), g.gridEnabled = h.scene.Grid.visible, g.floorEnabled = h.scene.Root.floor.visible, g.floorColor = "#" + h.scene.Root.floor.material.color.getHexString();
  }
});
N("UPDATE_SCENE", Z_);
const Y_ = F.define({
  description: "Sets the gizmo's mode.",
  execute: async (g, { engine: h, controller: f, Toolbox: x }) => {
    (await x.instantiate(h.scene, f)).SetGizmoMode(g.mode);
  }
});
N("SET_GIZMO_MODE", Y_);
const J_ = F.define({
  description: "Sets the gizmo's unified scale mode.",
  execute: async (g, { engine: h, controller: f, Toolbox: x }) => {
    (await x.instantiate(h.scene, f)).SetGizmoScaleLinked(g);
  }
});
N("SET_GIZMO_SCALE_LINKED", J_);
const X_ = F.define({
  description: "Sets the gizmo's visibility.",
  execute: async (g, { engine: h, controller: f, Toolbox: x }) => {
    (await x.instantiate(h.scene, f)).SetGizmoVisibility(g);
  }
});
N("SET_GIZMO_VISIBILITY", X_);
const Q_ = F.define({
  description: "Activates a specific tool from the toolbox.",
  execute: async (g, { engine: h, controller: f, Toolbox: x }) => {
    (await x.instantiate(h.scene, f)).UseTool(g.tool);
  }
});
N("USE_TOOL", Q_);
const Ne = class Ne {
  constructor(h, f) {
    nn(this, "_id");
    nn(this, "engine");
    nn(this, "controller");
    // modules
    nn(this, "_mediaCreator");
    nn(this, "_arSystem");
    nn(this, "_assetExporter");
    nn(this, "_animationSystem");
    nn(this, "_toolbox");
    // registered entities
    nn(this, "registered", /* @__PURE__ */ new Map());
    nn(this, "listeners", /* @__PURE__ */ new Map());
    this._id = x_(), this.engine = h, this.controller = f, this._mediaCreator = new ht("MediaCreator"), this._arSystem = new ht("ARSystem"), this._assetExporter = new ht(
      "AssetExporter"
    ), this._animationSystem = new ht(
      "AnimationSystem"
    ), this._toolbox = new ht("Toolbox"), Ne.__instances.push(this);
  }
  static get(h) {
    const f = this.__instances.find(
      (x) => x.id === h
    );
    return f || this.__instances.find(
      (x) => Array.from(x.registered.values()).find(
        (b) => b.id === h
      )
    );
  }
  get id() {
    return this._id;
  }
  destroyInstance() {
    const h = Ne.__instances.findIndex(
      (f) => f.id === this.id
    );
    return h === -1 ? !1 : (Ne.__instances.splice(h, 1), !0);
  }
  performAction(h, ...f) {
    const x = A_(h);
    if (!x)
      throw new Error(`Action ${h} is not defined.`);
    const b = this.getDependencies(), $ = f[0], B = new x($, b);
    try {
      const X = B.execute();
      return X && typeof X == "object" && "then" in X ? X.then((H) => (this.dispatch(h, $), H)).catch((H) => {
        throw new Error(`Failed to execute ${h}`, {
          cause: H
        });
      }) : (this.dispatch(h, $), X);
    } catch (X) {
      throw new Error(`Failed to execute ${h}`, { cause: X });
    }
  }
  subscribe(h, f) {
    return this.listeners.get(h) || this.listeners.set(h, []), this.listeners.get(h).push(f), () => {
      const x = this.listeners.get(h);
      if (!x) return;
      const b = x.findIndex(
        ($) => $ === f
      );
      b !== -1 && x.splice(b, 1);
    };
  }
  dispatch(h, f) {
    const x = this.listeners.get(h);
    x && x.forEach((b) => b(f));
  }
  getDependencies() {
    return {
      registered: this.registered,
      engine: this.engine,
      controller: this.controller,
      Toolbox: this._toolbox,
      MediaCreator: this._mediaCreator,
      ARSystem: this._arSystem,
      AssetExporter: this._assetExporter,
      AnimationSystem: this._animationSystem
    };
  }
};
nn(Ne, "__instances", []);
let vo = Ne;
export {
  y_ as A,
  E_ as C,
  D_ as D,
  z_ as E,
  b_ as G,
  m_ as L,
  ht as M,
  N_ as P,
  vo as S,
  Ge as U,
  C_ as Z,
  O_ as a,
  T_ as b,
  R_ as c,
  I_ as d,
  B_ as e,
  U_ as f,
  A_ as g,
  W_ as h,
  F_ as i,
  G_ as j,
  $_ as k,
  mo as l,
  H_ as m,
  q_ as n,
  K_ as o,
  Z_ as p,
  Y_ as q,
  N as r,
  J_ as s,
  X_ as t,
  Q_ as u,
  np as v,
  S_ as w,
  ep as x,
  Ao as y,
  tp as z
};
