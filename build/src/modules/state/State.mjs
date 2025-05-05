var v_ = Object.defineProperty;
var w_ = (g, d, o) => d in g ? v_(g, d, { enumerable: !0, configurable: !0, writable: !0, value: o }) : g[d] = o;
var fn = (g, d, o) => w_(g, typeof d != "symbol" ? d + "" : d, o);
import { g as ht } from "../../../chunks/ModuleRegistry-RSub8W0G.mjs";
import { Easing as _o } from "@tweenjs/tween.js";
import { i as wo } from "../../../chunks/SelectTool-mTRiZYaC.mjs";
const on = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function x_() {
  const g = Math.random() * 4294967295 | 0, d = Math.random() * 4294967295 | 0, o = Math.random() * 4294967295 | 0, m = Math.random() * 4294967295 | 0;
  return (on[g & 255] + on[g >> 8 & 255] + on[g >> 16 & 255] + on[g >> 24 & 255] + "-" + on[d & 255] + on[d >> 8 & 255] + "-" + on[d >> 16 & 15 | 64] + on[d >> 24 & 255] + "-" + on[o & 63 | 128] + on[o >> 8 & 255] + "-" + on[o >> 16 & 255] + on[o >> 24 & 255] + on[m & 255] + on[m >> 8 & 255] + on[m >> 16 & 255] + on[m >> 24 & 255]).toLowerCase();
}
const xo = {};
function N(g, d) {
  xo[g] = d;
}
function A_(g) {
  return xo[g];
}
class F {
  constructor(d, o) {
    fn(this, "_payload");
    fn(this, "_dependencies");
    this._payload = d, this._dependencies = o;
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
    description: d,
    execute: o
  }) {
    return class extends F {
      constructor(b, B) {
        super(b, B);
        fn(this, "_description", d);
        fn(this, "_payload");
        this._payload = b;
      }
      execute() {
        return o(this._payload, this._dependencies);
      }
    };
  }
}
const m_ = F.define({
  description: "Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer)",
  execute: async (g, { getARSystem: d }) => d().then((o) => {
    o.launch(g.uri, g.options);
  })
});
N("LAUNCH_AR", m_);
const E_ = F.define({
  description: "Calculates the camera position and target to view the whole scene. (experimental).",
  execute: (g, { engine: d, controller: o }) => {
    const m = d.scene.ComputeSceneBB();
    return o.computeEncompassingView(m);
  }
});
N("COMPUTE_ENCOMPASSING_VIEW", E_);
const b_ = F.define({
  description: "Gets the current camera position and target.",
  execute: (g, { controller: d }) => ({
    position: d.object.position.clone(),
    target: d.target.clone()
  })
});
N("GET_CAMERA_TRANSFORM", b_);
function ep(g) {
  return g.entityType === "primitive";
}
function S_(g) {
  return g.entityType === "model";
}
function tp(g) {
  return g.entityType === "light";
}
function Ao(g) {
  return g.entityType === "pov";
}
function rp(g) {
  return g.entityType === "group";
}
const O_ = F.define({
  description: "Moves the camera to a new position and target.",
  execute: async (g, { controller: d, registered: o, getAnimationSystem: m, engine: b }) => {
    let B = { x: 0, y: 0, z: 0 }, K = { x: 0, y: 0, z: 0 };
    if ("id" in g) {
      const V = o.get(g.id);
      if (!V)
        throw new Error(
          `POV with id ${g.id} not registered. Registered: ${o}`
        );
      if (!Ao(V))
        throw new Error(
          `Object with id ${g.id} is not a POV. Object: ${V}`
        );
      B = V.position, K = V.target;
    } else
      B = g.position, K = g.target;
    const Q = await m().then(
      (V) => {
        b.clock.addTicker(V), d.enabled = !0;
        const ar = V.createAnimator(
          d.object.position,
          B,
          g.duration,
          {
            easing: _o.Quadratic.Out
          }
        ).play(), we = V.createAnimator(
          d.target,
          K,
          g.duration,
          {
            easing: _o.Quadratic.Out,
            onUpdate: () => {
              d.object.lookAt(d.target);
            },
            onComplete: () => {
              d.enabled = !g.locked;
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
      stop: () => Q.forEach((V) => V.stop())
    };
  }
});
N("MOVE_CAMERA", O_);
const T_ = F.define({
  description: "Sets the camera layer to a certain layer.",
  execute: (g, { controller: d }) => {
    d.object.setCameraLayer(g.layer);
  }
});
N("SET_CAMERA_LAYER", T_);
const R_ = F.define({
  description: "Sets the camera position and target.",
  execute: (g, { controller: d }) => {
    d.object.position.copy(g.position), d.target.copy(g.target), d.update();
  }
});
N("SET_CAMERA_TRANSFORM", R_);
const C_ = F.define({
  description: "Zooms the camera in or out by a certain amount.",
  execute: (g, { controller: d }) => {
    g.direction === "IN" && d.zoomIn(g.by), g.direction === "OUT" && d.zoomOut(g.by);
  }
});
N("ZOOM_CAMERA", C_);
const I_ = F.define({
  description: "Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI.",
  execute: async (g, { registered: d, getMediaCreator: o }) => {
    let m = { x: 0, y: 0, z: 0 }, b = { x: 0, y: 0, z: 0 };
    if ("id" in g) {
      const B = d.get(g.id);
      if (!B)
        throw new Error(
          `Object with id ${g.id} not registered. Registered: ${d}`
        );
      if (!Ao(B))
        throw new Error(
          `Object with id ${g.id} is not a POV. Object: ${B}`
        );
      m = B.position, b = B.target;
    } else
      m = g.position, b = g.target;
    return o().then((B) => B.GenerateMedia(
      m,
      b,
      g.width,
      g.height
    ));
  }
});
N("GENERATE_MEDIA", I_);
const y_ = F.define({
  description: "Adds an object to the scene.",
  execute: (g, { engine: d, registered: o }) => {
    o.get(g.id) || (g.parentId === void 0 && (g.parentId = null), o.set(g.id, g), d.scene.AddSceneObject(g));
  }
});
N("ADD_OBJECT", y_);
var cr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, gt = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var L_ = gt.exports, po;
function M_() {
  return po || (po = 1, function(g, d) {
    (function() {
      var o, m = "4.17.21", b = 200, B = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", K = "Expected a function", Q = "Invalid `variable` option passed into `_.template`", V = "__lodash_hash_undefined__", ar = 500, we = "__lodash_placeholder__", jn = 1, Pi = 2, xe = 4, Ae = 1, dt = 2, In = 1, me = 2, Di = 4, Nn = 8, $e = 16, $n = 32, He = 64, Hn = 128, ze = 256, lr = 512, Eo = 30, bo = "...", So = 800, Oo = 16, Bi = 1, To = 2, Ro = 3, _t = 1 / 0, Ee = 9007199254740991, Co = 17976931348623157e292, pt = NaN, Un = 4294967295, Io = Un - 1, yo = Un >>> 1, Lo = [
        ["ary", Hn],
        ["bind", In],
        ["bindKey", me],
        ["curry", Nn],
        ["curryRight", $e],
        ["flip", lr],
        ["partial", $n],
        ["partialRight", He],
        ["rearg", ze]
      ], be = "[object Arguments]", vt = "[object Array]", Mo = "[object AsyncFunction]", qe = "[object Boolean]", Ke = "[object Date]", Po = "[object DOMException]", wt = "[object Error]", xt = "[object Function]", Ui = "[object GeneratorFunction]", yn = "[object Map]", Ze = "[object Number]", Do = "[object Null]", zn = "[object Object]", Wi = "[object Promise]", Bo = "[object Proxy]", Ye = "[object RegExp]", Ln = "[object Set]", Je = "[object String]", At = "[object Symbol]", Uo = "[object Undefined]", Xe = "[object WeakMap]", Wo = "[object WeakSet]", Qe = "[object ArrayBuffer]", Se = "[object DataView]", hr = "[object Float32Array]", gr = "[object Float64Array]", dr = "[object Int8Array]", _r = "[object Int16Array]", pr = "[object Int32Array]", vr = "[object Uint8Array]", wr = "[object Uint8ClampedArray]", xr = "[object Uint16Array]", Ar = "[object Uint32Array]", Fo = /\b__p \+= '';/g, Go = /\b(__p \+=) '' \+/g, No = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Fi = /&(?:amp|lt|gt|quot|#39);/g, Gi = /[&<>"']/g, $o = RegExp(Fi.source), Ho = RegExp(Gi.source), zo = /<%-([\s\S]+?)%>/g, qo = /<%([\s\S]+?)%>/g, Ni = /<%=([\s\S]+?)%>/g, Ko = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Zo = /^\w*$/, Yo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, Jo = RegExp(mr.source), Er = /^\s+/, Xo = /\s/, Qo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Vo = /\{\n\/\* \[wrapped with (.+)\] \*/, ko = /,? & /, jo = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, ns = /[()=,{}\[\]\/\s]/, es = /\\(\\)?/g, ts = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, $i = /\w*$/, rs = /^[-+]0x[0-9a-f]+$/i, is = /^0b[01]+$/i, us = /^\[object .+?Constructor\]$/, fs = /^0o[0-7]+$/i, os = /^(?:0|[1-9]\d*)$/, ss = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, mt = /($^)/, cs = /['\n\r\u2028\u2029\\]/g, Et = "\\ud800-\\udfff", as = "\\u0300-\\u036f", ls = "\\ufe20-\\ufe2f", hs = "\\u20d0-\\u20ff", Hi = as + ls + hs, zi = "\\u2700-\\u27bf", qi = "a-z\\xdf-\\xf6\\xf8-\\xff", gs = "\\xac\\xb1\\xd7\\xf7", ds = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", _s = "\\u2000-\\u206f", ps = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ki = "A-Z\\xc0-\\xd6\\xd8-\\xde", Zi = "\\ufe0e\\ufe0f", Yi = gs + ds + _s + ps, br = "['’]", vs = "[" + Et + "]", Ji = "[" + Yi + "]", bt = "[" + Hi + "]", Xi = "\\d+", ws = "[" + zi + "]", Qi = "[" + qi + "]", Vi = "[^" + Et + Yi + Xi + zi + qi + Ki + "]", Sr = "\\ud83c[\\udffb-\\udfff]", xs = "(?:" + bt + "|" + Sr + ")", ki = "[^" + Et + "]", Or = "(?:\\ud83c[\\udde6-\\uddff]){2}", Tr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Oe = "[" + Ki + "]", ji = "\\u200d", nu = "(?:" + Qi + "|" + Vi + ")", As = "(?:" + Oe + "|" + Vi + ")", eu = "(?:" + br + "(?:d|ll|m|re|s|t|ve))?", tu = "(?:" + br + "(?:D|LL|M|RE|S|T|VE))?", ru = xs + "?", iu = "[" + Zi + "]?", ms = "(?:" + ji + "(?:" + [ki, Or, Tr].join("|") + ")" + iu + ru + ")*", Es = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", bs = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", uu = iu + ru + ms, Ss = "(?:" + [ws, Or, Tr].join("|") + ")" + uu, Os = "(?:" + [ki + bt + "?", bt, Or, Tr, vs].join("|") + ")", Ts = RegExp(br, "g"), Rs = RegExp(bt, "g"), Rr = RegExp(Sr + "(?=" + Sr + ")|" + Os + uu, "g"), Cs = RegExp([
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
      ], Ms = -1, z = {};
      z[hr] = z[gr] = z[dr] = z[_r] = z[pr] = z[vr] = z[wr] = z[xr] = z[Ar] = !0, z[be] = z[vt] = z[Qe] = z[qe] = z[Se] = z[Ke] = z[wt] = z[xt] = z[yn] = z[Ze] = z[zn] = z[Ye] = z[Ln] = z[Je] = z[Xe] = !1;
      var H = {};
      H[be] = H[vt] = H[Qe] = H[Se] = H[qe] = H[Ke] = H[hr] = H[gr] = H[dr] = H[_r] = H[pr] = H[yn] = H[Ze] = H[zn] = H[Ye] = H[Ln] = H[Je] = H[At] = H[vr] = H[wr] = H[xr] = H[Ar] = !0, H[wt] = H[xt] = H[Xe] = !1;
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
      }, Ws = parseFloat, Fs = parseInt, fu = typeof cr == "object" && cr && cr.Object === Object && cr, Gs = typeof self == "object" && self && self.Object === Object && self, en = fu || Gs || Function("return this")(), Cr = d && !d.nodeType && d, ce = Cr && !0 && g && !g.nodeType && g, ou = ce && ce.exports === Cr, Ir = ou && fu.process, mn = function() {
        try {
          var a = ce && ce.require && ce.require("util").types;
          return a || Ir && Ir.binding && Ir.binding("util");
        } catch {
        }
      }(), su = mn && mn.isArrayBuffer, cu = mn && mn.isDate, au = mn && mn.isMap, lu = mn && mn.isRegExp, hu = mn && mn.isSet, gu = mn && mn.isTypedArray;
      function _n(a, _, h) {
        switch (h.length) {
          case 0:
            return a.call(_);
          case 1:
            return a.call(_, h[0]);
          case 2:
            return a.call(_, h[0], h[1]);
          case 3:
            return a.call(_, h[0], h[1], h[2]);
        }
        return a.apply(_, h);
      }
      function Ns(a, _, h, A) {
        for (var R = -1, U = a == null ? 0 : a.length; ++R < U; ) {
          var k = a[R];
          _(A, k, h(k), a);
        }
        return A;
      }
      function En(a, _) {
        for (var h = -1, A = a == null ? 0 : a.length; ++h < A && _(a[h], h, a) !== !1; )
          ;
        return a;
      }
      function $s(a, _) {
        for (var h = a == null ? 0 : a.length; h-- && _(a[h], h, a) !== !1; )
          ;
        return a;
      }
      function du(a, _) {
        for (var h = -1, A = a == null ? 0 : a.length; ++h < A; )
          if (!_(a[h], h, a))
            return !1;
        return !0;
      }
      function ne(a, _) {
        for (var h = -1, A = a == null ? 0 : a.length, R = 0, U = []; ++h < A; ) {
          var k = a[h];
          _(k, h, a) && (U[R++] = k);
        }
        return U;
      }
      function St(a, _) {
        var h = a == null ? 0 : a.length;
        return !!h && Te(a, _, 0) > -1;
      }
      function yr(a, _, h) {
        for (var A = -1, R = a == null ? 0 : a.length; ++A < R; )
          if (h(_, a[A]))
            return !0;
        return !1;
      }
      function q(a, _) {
        for (var h = -1, A = a == null ? 0 : a.length, R = Array(A); ++h < A; )
          R[h] = _(a[h], h, a);
        return R;
      }
      function ee(a, _) {
        for (var h = -1, A = _.length, R = a.length; ++h < A; )
          a[R + h] = _[h];
        return a;
      }
      function Lr(a, _, h, A) {
        var R = -1, U = a == null ? 0 : a.length;
        for (A && U && (h = a[++R]); ++R < U; )
          h = _(h, a[R], R, a);
        return h;
      }
      function Hs(a, _, h, A) {
        var R = a == null ? 0 : a.length;
        for (A && R && (h = a[--R]); R--; )
          h = _(h, a[R], R, a);
        return h;
      }
      function Mr(a, _) {
        for (var h = -1, A = a == null ? 0 : a.length; ++h < A; )
          if (_(a[h], h, a))
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
      function _u(a, _, h) {
        var A;
        return h(a, function(R, U, k) {
          if (_(R, U, k))
            return A = U, !1;
        }), A;
      }
      function Ot(a, _, h, A) {
        for (var R = a.length, U = h + (A ? 1 : -1); A ? U-- : ++U < R; )
          if (_(a[U], U, a))
            return U;
        return -1;
      }
      function Te(a, _, h) {
        return _ === _ ? rc(a, _, h) : Ot(a, pu, h);
      }
      function Zs(a, _, h, A) {
        for (var R = h - 1, U = a.length; ++R < U; )
          if (A(a[R], _))
            return R;
        return -1;
      }
      function pu(a) {
        return a !== a;
      }
      function vu(a, _) {
        var h = a == null ? 0 : a.length;
        return h ? Br(a, _) / h : pt;
      }
      function Pr(a) {
        return function(_) {
          return _ == null ? o : _[a];
        };
      }
      function Dr(a) {
        return function(_) {
          return a == null ? o : a[_];
        };
      }
      function wu(a, _, h, A, R) {
        return R(a, function(U, k, $) {
          h = A ? (A = !1, U) : _(h, U, k, $);
        }), h;
      }
      function Ys(a, _) {
        var h = a.length;
        for (a.sort(_); h--; )
          a[h] = a[h].value;
        return a;
      }
      function Br(a, _) {
        for (var h, A = -1, R = a.length; ++A < R; ) {
          var U = _(a[A]);
          U !== o && (h = h === o ? U : h + U);
        }
        return h;
      }
      function Ur(a, _) {
        for (var h = -1, A = Array(a); ++h < a; )
          A[h] = _(h);
        return A;
      }
      function Js(a, _) {
        return q(_, function(h) {
          return [h, a[h]];
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
        return q(_, function(h) {
          return a[h];
        });
      }
      function Ve(a, _) {
        return a.has(_);
      }
      function Au(a, _) {
        for (var h = -1, A = a.length; ++h < A && Te(_, a[h], 0) > -1; )
          ;
        return h;
      }
      function mu(a, _) {
        for (var h = a.length; h-- && Te(_, a[h], 0) > -1; )
          ;
        return h;
      }
      function Xs(a, _) {
        for (var h = a.length, A = 0; h--; )
          a[h] === _ && ++A;
        return A;
      }
      var Qs = Dr(Ps), Vs = Dr(Ds);
      function ks(a) {
        return "\\" + Us[a];
      }
      function js(a, _) {
        return a == null ? o : a[_];
      }
      function Re(a) {
        return Is.test(a);
      }
      function nc(a) {
        return ys.test(a);
      }
      function ec(a) {
        for (var _, h = []; !(_ = a.next()).done; )
          h.push(_.value);
        return h;
      }
      function Fr(a) {
        var _ = -1, h = Array(a.size);
        return a.forEach(function(A, R) {
          h[++_] = [R, A];
        }), h;
      }
      function Eu(a, _) {
        return function(h) {
          return a(_(h));
        };
      }
      function te(a, _) {
        for (var h = -1, A = a.length, R = 0, U = []; ++h < A; ) {
          var k = a[h];
          (k === _ || k === we) && (a[h] = we, U[R++] = h);
        }
        return U;
      }
      function Tt(a) {
        var _ = -1, h = Array(a.size);
        return a.forEach(function(A) {
          h[++_] = A;
        }), h;
      }
      function tc(a) {
        var _ = -1, h = Array(a.size);
        return a.forEach(function(A) {
          h[++_] = [A, A];
        }), h;
      }
      function rc(a, _, h) {
        for (var A = h - 1, R = a.length; ++A < R; )
          if (a[A] === _)
            return A;
        return -1;
      }
      function ic(a, _, h) {
        for (var A = h + 1; A--; )
          if (a[A] === _)
            return A;
        return A;
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
        _ = _ == null ? en : Ie.defaults(en.Object(), _, Ie.pick(en, Ls));
        var h = _.Array, A = _.Date, R = _.Error, U = _.Function, k = _.Math, $ = _.Object, Gr = _.RegExp, ac = _.String, bn = _.TypeError, Rt = h.prototype, lc = U.prototype, ye = $.prototype, Ct = _["__core-js_shared__"], It = lc.toString, G = ye.hasOwnProperty, hc = 0, Su = function() {
          var n = /[^.]+$/.exec(Ct && Ct.keys && Ct.keys.IE_PROTO || "");
          return n ? "Symbol(src)_1." + n : "";
        }(), yt = ye.toString, gc = It.call($), dc = en._, _c = Gr(
          "^" + It.call(G).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Lt = ou ? _.Buffer : o, re = _.Symbol, Mt = _.Uint8Array, Ou = Lt ? Lt.allocUnsafe : o, Pt = Eu($.getPrototypeOf, $), Tu = $.create, Ru = ye.propertyIsEnumerable, Dt = Rt.splice, Cu = re ? re.isConcatSpreadable : o, ke = re ? re.iterator : o, ae = re ? re.toStringTag : o, Bt = function() {
          try {
            var n = _e($, "defineProperty");
            return n({}, "", {}), n;
          } catch {
          }
        }(), pc = _.clearTimeout !== en.clearTimeout && _.clearTimeout, vc = A && A.now !== en.Date.now && A.now, wc = _.setTimeout !== en.setTimeout && _.setTimeout, Ut = k.ceil, Wt = k.floor, Nr = $.getOwnPropertySymbols, xc = Lt ? Lt.isBuffer : o, Iu = _.isFinite, Ac = Rt.join, mc = Eu($.keys, $), j = k.max, rn = k.min, Ec = A.now, bc = _.parseInt, yu = k.random, Sc = Rt.reverse, $r = _e(_, "DataView"), je = _e(_, "Map"), Hr = _e(_, "Promise"), Le = _e(_, "Set"), nt = _e(_, "WeakMap"), et = _e($, "create"), Ft = nt && new nt(), Me = {}, Oc = pe($r), Tc = pe(je), Rc = pe(Hr), Cc = pe(Le), Ic = pe(nt), Gt = re ? re.prototype : o, tt = Gt ? Gt.valueOf : o, Lu = Gt ? Gt.toString : o;
        function u(n) {
          if (Y(n) && !C(n) && !(n instanceof P)) {
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
            if (!Z(e))
              return {};
            if (Tu)
              return Tu(e);
            n.prototype = e;
            var t = new n();
            return n.prototype = o, t;
          };
        }();
        function Nt() {
        }
        function Sn(n, e) {
          this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = o;
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
          var n = this.__wrapped__.value(), e = this.__dir__, t = C(n), r = e < 0, i = t ? n.length : 0, f = qa(0, i, this.__views__), s = f.start, c = f.end, l = c - s, p = r ? c : s - 1, v = this.__iteratees__, w = v.length, x = 0, E = rn(l, this.__takeCount__);
          if (!t || !r && i == l && E == l)
            return ef(n, this.__actions__);
          var O = [];
          n:
            for (; l-- && x < E; ) {
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
              O[x++] = T;
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
            return t === V ? o : t;
          }
          return G.call(e, n) ? e[n] : o;
        }
        function Uc(n) {
          var e = this.__data__;
          return et ? e[n] !== o : G.call(e, n);
        }
        function Wc(n, e) {
          var t = this.__data__;
          return this.size += this.has(n) ? 0 : 1, t[n] = et && e === o ? V : e, this;
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
          return t < 0 ? o : e[t][1];
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
          return this.__data__.set(n, V), this;
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
          var t = C(n), r = !t && ve(n), i = !t && !r && se(n), f = !t && !r && !i && We(n), s = t || r || i || f, c = s ? Ur(n.length, ac) : [], l = c.length;
          for (var p in n)
            (e || G.call(n, p)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
            (p == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            i && (p == "offset" || p == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            f && (p == "buffer" || p == "byteLength" || p == "byteOffset") || // Skip index properties.
            Xn(p, l))) && c.push(p);
          return c;
        }
        function Pu(n) {
          var e = n.length;
          return e ? n[jr(0, e - 1)] : o;
        }
        function ea(n, e) {
          return nr(ln(n), ge(e, 0, n.length));
        }
        function ta(n) {
          return nr(ln(n));
        }
        function zr(n, e, t) {
          (t !== o && !Dn(n[e], t) || t === o && !(e in n)) && Zn(n, e, t);
        }
        function rt(n, e, t) {
          var r = n[e];
          (!(G.call(n, e) && Dn(r, t)) || t === o && !(e in n)) && Zn(n, e, t);
        }
        function $t(n, e) {
          for (var t = n.length; t--; )
            if (Dn(n[t][0], e))
              return t;
          return -1;
        }
        function ra(n, e, t, r) {
          return ie(n, function(i, f, s) {
            e(r, i, t(i), s);
          }), r;
        }
        function Du(n, e) {
          return n && Fn(e, nn(e), n);
        }
        function ia(n, e) {
          return n && Fn(e, gn(e), n);
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
          for (var t = -1, r = e.length, i = h(r), f = n == null; ++t < r; )
            i[t] = f ? o : Si(n, e[t]);
          return i;
        }
        function ge(n, e, t) {
          return n === n && (t !== o && (n = n <= t ? n : t), e !== o && (n = n >= e ? n : e)), n;
        }
        function On(n, e, t, r, i, f) {
          var s, c = e & jn, l = e & Pi, p = e & xe;
          if (t && (s = i ? t(n, r, i, f) : t(n)), s !== o)
            return s;
          if (!Z(n))
            return n;
          var v = C(n);
          if (v) {
            if (s = Za(n), !c)
              return ln(n, s);
          } else {
            var w = un(n), x = w == xt || w == Ui;
            if (se(n))
              return uf(n, c);
            if (w == zn || w == be || x && !i) {
              if (s = l || x ? {} : Sf(n), !c)
                return l ? Ba(n, ia(s, n)) : Da(n, Du(s, n));
            } else {
              if (!H[w])
                return i ? n : {};
              s = Ya(n, w, c);
            }
          }
          f || (f = new Pn());
          var E = f.get(n);
          if (E)
            return E;
          f.set(n, s), jf(n) ? n.forEach(function(T) {
            s.add(On(T, e, t, T, n, f));
          }) : Vf(n) && n.forEach(function(T, M) {
            s.set(M, On(T, e, t, M, n, f));
          });
          var O = p ? l ? ai : ci : l ? gn : nn, y = v ? o : O(n);
          return En(y || n, function(T, M) {
            y && (M = T, T = n[M]), rt(s, M, On(T, e, t, M, n, f));
          }), s;
        }
        function ua(n) {
          var e = nn(n);
          return function(t) {
            return Bu(t, n, e);
          };
        }
        function Bu(n, e, t) {
          var r = t.length;
          if (n == null)
            return !r;
          for (n = $(n); r--; ) {
            var i = t[r], f = e[i], s = n[i];
            if (s === o && !(i in n) || !f(s))
              return !1;
          }
          return !0;
        }
        function Uu(n, e, t) {
          if (typeof n != "function")
            throw new bn(K);
          return at(function() {
            n.apply(o, t);
          }, e);
        }
        function it(n, e, t, r) {
          var i = -1, f = St, s = !0, c = n.length, l = [], p = e.length;
          if (!c)
            return l;
          t && (e = q(e, pn(t))), r ? (f = yr, s = !1) : e.length >= b && (f = Ve, s = !1, e = new he(e));
          n:
            for (; ++i < c; ) {
              var v = n[i], w = t == null ? v : t(v);
              if (v = r || v !== 0 ? v : 0, s && w === w) {
                for (var x = p; x--; )
                  if (e[x] === w)
                    continue n;
                l.push(v);
              } else f(e, w, r) || l.push(v);
            }
          return l;
        }
        var ie = af(Wn), Wu = af(Zr, !0);
        function fa(n, e) {
          var t = !0;
          return ie(n, function(r, i, f) {
            return t = !!e(r, i, f), t;
          }), t;
        }
        function Ht(n, e, t) {
          for (var r = -1, i = n.length; ++r < i; ) {
            var f = n[r], s = e(f);
            if (s != null && (c === o ? s === s && !wn(s) : t(s, c)))
              var c = s, l = f;
          }
          return l;
        }
        function oa(n, e, t, r) {
          var i = n.length;
          for (t = I(t), t < 0 && (t = -t > i ? 0 : i + t), r = r === o || r > i ? i : I(r), r < 0 && (r += i), r = t > r ? 0 : eo(r); t < r; )
            n[t++] = e;
          return n;
        }
        function Fu(n, e) {
          var t = [];
          return ie(n, function(r, i, f) {
            e(r, i, f) && t.push(r);
          }), t;
        }
        function tn(n, e, t, r, i) {
          var f = -1, s = n.length;
          for (t || (t = Xa), i || (i = []); ++f < s; ) {
            var c = n[f];
            e > 0 && t(c) ? e > 1 ? tn(c, e - 1, t, r, i) : ee(i, c) : r || (i[i.length] = c);
          }
          return i;
        }
        var Kr = lf(), Gu = lf(!0);
        function Wn(n, e) {
          return n && Kr(n, e, nn);
        }
        function Zr(n, e) {
          return n && Gu(n, e, nn);
        }
        function zt(n, e) {
          return ne(e, function(t) {
            return Qn(n[t]);
          });
        }
        function de(n, e) {
          e = fe(e, n);
          for (var t = 0, r = e.length; n != null && t < r; )
            n = n[Gn(e[t++])];
          return t && t == r ? n : o;
        }
        function Nu(n, e, t) {
          var r = e(n);
          return C(n) ? r : ee(r, t(n));
        }
        function sn(n) {
          return n == null ? n === o ? Uo : Do : ae && ae in $(n) ? za(n) : tl(n);
        }
        function Yr(n, e) {
          return n > e;
        }
        function sa(n, e) {
          return n != null && G.call(n, e);
        }
        function ca(n, e) {
          return n != null && e in $(n);
        }
        function aa(n, e, t) {
          return n >= rn(e, t) && n < j(e, t);
        }
        function Jr(n, e, t) {
          for (var r = t ? yr : St, i = n[0].length, f = n.length, s = f, c = h(f), l = 1 / 0, p = []; s--; ) {
            var v = n[s];
            s && e && (v = q(v, pn(e))), l = rn(v.length, l), c[s] = !t && (e || i >= 120 && v.length >= 120) ? new he(s && v) : o;
          }
          v = n[0];
          var w = -1, x = c[0];
          n:
            for (; ++w < i && p.length < l; ) {
              var E = v[w], O = e ? e(E) : E;
              if (E = t || E !== 0 ? E : 0, !(x ? Ve(x, O) : r(p, O, t))) {
                for (s = f; --s; ) {
                  var y = c[s];
                  if (!(y ? Ve(y, O) : r(n[s], O, t)))
                    continue n;
                }
                x && x.push(O), p.push(E);
              }
            }
          return p;
        }
        function la(n, e, t, r) {
          return Wn(n, function(i, f, s) {
            e(r, t(i), f, s);
          }), r;
        }
        function ut(n, e, t) {
          e = fe(e, n), n = Cf(n, e);
          var r = n == null ? n : n[Gn(Rn(e))];
          return r == null ? o : _n(r, n, t);
        }
        function $u(n) {
          return Y(n) && sn(n) == be;
        }
        function ha(n) {
          return Y(n) && sn(n) == Qe;
        }
        function ga(n) {
          return Y(n) && sn(n) == Ke;
        }
        function ft(n, e, t, r, i) {
          return n === e ? !0 : n == null || e == null || !Y(n) && !Y(e) ? n !== n && e !== e : da(n, e, t, r, ft, i);
        }
        function da(n, e, t, r, i, f) {
          var s = C(n), c = C(e), l = s ? vt : un(n), p = c ? vt : un(e);
          l = l == be ? zn : l, p = p == be ? zn : p;
          var v = l == zn, w = p == zn, x = l == p;
          if (x && se(n)) {
            if (!se(e))
              return !1;
            s = !0, v = !1;
          }
          if (x && !v)
            return f || (f = new Pn()), s || We(n) ? mf(n, e, t, r, i, f) : $a(n, e, l, t, r, i, f);
          if (!(t & Ae)) {
            var E = v && G.call(n, "__wrapped__"), O = w && G.call(e, "__wrapped__");
            if (E || O) {
              var y = E ? n.value() : n, T = O ? e.value() : e;
              return f || (f = new Pn()), i(y, T, t, r, f);
            }
          }
          return x ? (f || (f = new Pn()), Ha(n, e, t, r, i, f)) : !1;
        }
        function _a(n) {
          return Y(n) && un(n) == yn;
        }
        function Xr(n, e, t, r) {
          var i = t.length, f = i, s = !r;
          if (n == null)
            return !f;
          for (n = $(n); i--; ) {
            var c = t[i];
            if (s && c[2] ? c[1] !== n[c[0]] : !(c[0] in n))
              return !1;
          }
          for (; ++i < f; ) {
            c = t[i];
            var l = c[0], p = n[l], v = c[1];
            if (s && c[2]) {
              if (p === o && !(l in n))
                return !1;
            } else {
              var w = new Pn();
              if (r)
                var x = r(p, v, l, n, e, w);
              if (!(x === o ? ft(v, p, Ae | dt, r, w) : x))
                return !1;
            }
          }
          return !0;
        }
        function Hu(n) {
          if (!Z(n) || Va(n))
            return !1;
          var e = Qn(n) ? _c : us;
          return e.test(pe(n));
        }
        function pa(n) {
          return Y(n) && sn(n) == Ye;
        }
        function va(n) {
          return Y(n) && un(n) == Ln;
        }
        function wa(n) {
          return Y(n) && fr(n.length) && !!z[sn(n)];
        }
        function zu(n) {
          return typeof n == "function" ? n : n == null ? dn : typeof n == "object" ? C(n) ? Zu(n[0], n[1]) : Ku(n) : ho(n);
        }
        function Qr(n) {
          if (!ct(n))
            return mc(n);
          var e = [];
          for (var t in $(n))
            G.call(n, t) && t != "constructor" && e.push(t);
          return e;
        }
        function xa(n) {
          if (!Z(n))
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
          var t = -1, r = hn(n) ? h(n.length) : [];
          return ie(n, function(i, f, s) {
            r[++t] = e(i, f, s);
          }), r;
        }
        function Ku(n) {
          var e = hi(n);
          return e.length == 1 && e[0][2] ? Tf(e[0][0], e[0][1]) : function(t) {
            return t === n || Xr(t, n, e);
          };
        }
        function Zu(n, e) {
          return di(n) && Of(e) ? Tf(Gn(n), e) : function(t) {
            var r = Si(t, n);
            return r === o && r === e ? Oi(t, n) : ft(e, r, Ae | dt);
          };
        }
        function qt(n, e, t, r, i) {
          n !== e && Kr(e, function(f, s) {
            if (i || (i = new Pn()), Z(f))
              Aa(n, e, s, t, qt, r, i);
            else {
              var c = r ? r(pi(n, s), f, s + "", n, e, i) : o;
              c === o && (c = f), zr(n, s, c);
            }
          }, gn);
        }
        function Aa(n, e, t, r, i, f, s) {
          var c = pi(n, t), l = pi(e, t), p = s.get(l);
          if (p) {
            zr(n, t, p);
            return;
          }
          var v = f ? f(c, l, t + "", n, e, s) : o, w = v === o;
          if (w) {
            var x = C(l), E = !x && se(l), O = !x && !E && We(l);
            v = l, x || E || O ? C(c) ? v = c : J(c) ? v = ln(c) : E ? (w = !1, v = uf(l, !0)) : O ? (w = !1, v = ff(l, !0)) : v = [] : lt(l) || ve(l) ? (v = c, ve(c) ? v = to(c) : (!Z(c) || Qn(c)) && (v = Sf(l))) : w = !1;
          }
          w && (s.set(l, v), i(v, l, r, f, s), s.delete(l)), zr(n, t, v);
        }
        function Yu(n, e) {
          var t = n.length;
          if (t)
            return e += e < 0 ? t : 0, Xn(e, t) ? n[e] : o;
        }
        function Ju(n, e, t) {
          e.length ? e = q(e, function(f) {
            return C(f) ? function(s) {
              return de(s, f.length === 1 ? f[0] : f);
            } : f;
          }) : e = [dn];
          var r = -1;
          e = q(e, pn(S()));
          var i = qu(n, function(f, s, c) {
            var l = q(e, function(p) {
              return p(f);
            });
            return { criteria: l, index: ++r, value: f };
          });
          return Ys(i, function(f, s) {
            return Pa(f, s, t);
          });
        }
        function ma(n, e) {
          return Xu(n, e, function(t, r) {
            return Oi(n, r);
          });
        }
        function Xu(n, e, t) {
          for (var r = -1, i = e.length, f = {}; ++r < i; ) {
            var s = e[r], c = de(n, s);
            t(c, s) && ot(f, fe(s, n), c);
          }
          return f;
        }
        function Ea(n) {
          return function(e) {
            return de(e, n);
          };
        }
        function kr(n, e, t, r) {
          var i = r ? Zs : Te, f = -1, s = e.length, c = n;
          for (n === e && (e = ln(e)), t && (c = q(n, pn(t))); ++f < s; )
            for (var l = 0, p = e[f], v = t ? t(p) : p; (l = i(c, v, l, r)) > -1; )
              c !== n && Dt.call(c, l, 1), Dt.call(n, l, 1);
          return n;
        }
        function Qu(n, e) {
          for (var t = n ? e.length : 0, r = t - 1; t--; ) {
            var i = e[t];
            if (t == r || i !== f) {
              var f = i;
              Xn(i) ? Dt.call(n, i, 1) : ti(n, i);
            }
          }
          return n;
        }
        function jr(n, e) {
          return n + Wt(yu() * (e - n + 1));
        }
        function ba(n, e, t, r) {
          for (var i = -1, f = j(Ut((e - n) / (t || 1)), 0), s = h(f); f--; )
            s[r ? f : ++i] = n, n += t;
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
          return vi(Rf(n, e, dn), n + "");
        }
        function Sa(n) {
          return Pu(Fe(n));
        }
        function Oa(n, e) {
          var t = Fe(n);
          return nr(t, ge(e, 0, t.length));
        }
        function ot(n, e, t, r) {
          if (!Z(n))
            return n;
          e = fe(e, n);
          for (var i = -1, f = e.length, s = f - 1, c = n; c != null && ++i < f; ) {
            var l = Gn(e[i]), p = t;
            if (l === "__proto__" || l === "constructor" || l === "prototype")
              return n;
            if (i != s) {
              var v = c[l];
              p = r ? r(v, l, c) : o, p === o && (p = Z(v) ? v : Xn(e[i + 1]) ? [] : {});
            }
            rt(c, l, p), c = c[l];
          }
          return n;
        }
        var Vu = Ft ? function(n, e) {
          return Ft.set(n, e), n;
        } : dn, Ta = Bt ? function(n, e) {
          return Bt(n, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Ri(e),
            writable: !0
          });
        } : dn;
        function Ra(n) {
          return nr(Fe(n));
        }
        function Tn(n, e, t) {
          var r = -1, i = n.length;
          e < 0 && (e = -e > i ? 0 : i + e), t = t > i ? i : t, t < 0 && (t += i), i = e > t ? 0 : t - e >>> 0, e >>>= 0;
          for (var f = h(i); ++r < i; )
            f[r] = n[r + e];
          return f;
        }
        function Ca(n, e) {
          var t;
          return ie(n, function(r, i, f) {
            return t = e(r, i, f), !t;
          }), !!t;
        }
        function Kt(n, e, t) {
          var r = 0, i = n == null ? r : n.length;
          if (typeof e == "number" && e === e && i <= yo) {
            for (; r < i; ) {
              var f = r + i >>> 1, s = n[f];
              s !== null && !wn(s) && (t ? s <= e : s < e) ? r = f + 1 : i = f;
            }
            return i;
          }
          return ei(n, e, dn, t);
        }
        function ei(n, e, t, r) {
          var i = 0, f = n == null ? 0 : n.length;
          if (f === 0)
            return 0;
          e = t(e);
          for (var s = e !== e, c = e === null, l = wn(e), p = e === o; i < f; ) {
            var v = Wt((i + f) / 2), w = t(n[v]), x = w !== o, E = w === null, O = w === w, y = wn(w);
            if (s)
              var T = r || O;
            else p ? T = O && (r || x) : c ? T = O && x && (r || !E) : l ? T = O && x && !E && (r || !y) : E || y ? T = !1 : T = r ? w <= e : w < e;
            T ? i = v + 1 : f = v;
          }
          return rn(f, Io);
        }
        function ku(n, e) {
          for (var t = -1, r = n.length, i = 0, f = []; ++t < r; ) {
            var s = n[t], c = e ? e(s) : s;
            if (!t || !Dn(c, l)) {
              var l = c;
              f[i++] = s === 0 ? 0 : s;
            }
          }
          return f;
        }
        function ju(n) {
          return typeof n == "number" ? n : wn(n) ? pt : +n;
        }
        function vn(n) {
          if (typeof n == "string")
            return n;
          if (C(n))
            return q(n, vn) + "";
          if (wn(n))
            return Lu ? Lu.call(n) : "";
          var e = n + "";
          return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
        }
        function ue(n, e, t) {
          var r = -1, i = St, f = n.length, s = !0, c = [], l = c;
          if (t)
            s = !1, i = yr;
          else if (f >= b) {
            var p = e ? null : Ga(n);
            if (p)
              return Tt(p);
            s = !1, i = Ve, l = new he();
          } else
            l = e ? [] : c;
          n:
            for (; ++r < f; ) {
              var v = n[r], w = e ? e(v) : v;
              if (v = t || v !== 0 ? v : 0, s && w === w) {
                for (var x = l.length; x--; )
                  if (l[x] === w)
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
          return ot(n, e, t(de(n, e)), r);
        }
        function Zt(n, e, t, r) {
          for (var i = n.length, f = r ? i : -1; (r ? f-- : ++f < i) && e(n[f], f, n); )
            ;
          return t ? Tn(n, r ? 0 : f, r ? f + 1 : i) : Tn(n, r ? f + 1 : 0, r ? i : f);
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
          for (var i = -1, f = h(r); ++i < r; )
            for (var s = n[i], c = -1; ++c < r; )
              c != i && (f[i] = it(f[i] || s, n[c], e, t));
          return ue(tn(f, 1), e, t);
        }
        function tf(n, e, t) {
          for (var r = -1, i = n.length, f = e.length, s = {}; ++r < i; ) {
            var c = r < f ? e[r] : o;
            t(s, n[r], c);
          }
          return s;
        }
        function ii(n) {
          return J(n) ? n : [];
        }
        function ui(n) {
          return typeof n == "function" ? n : dn;
        }
        function fe(n, e) {
          return C(n) ? n : di(n, e) ? [n] : Mf(W(n));
        }
        var Ia = L;
        function oe(n, e, t) {
          var r = n.length;
          return t = t === o ? r : t, !e && t >= r ? n : Tn(n, e, t);
        }
        var rf = pc || function(n) {
          return en.clearTimeout(n);
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
          return tt ? $(tt.call(n)) : {};
        }
        function ff(n, e) {
          var t = e ? fi(n.buffer) : n.buffer;
          return new n.constructor(t, n.byteOffset, n.length);
        }
        function of(n, e) {
          if (n !== e) {
            var t = n !== o, r = n === null, i = n === n, f = wn(n), s = e !== o, c = e === null, l = e === e, p = wn(e);
            if (!c && !p && !f && n > e || f && s && l && !c && !p || r && s && l || !t && l || !i)
              return 1;
            if (!r && !f && !p && n < e || p && t && i && !r && !f || c && t && i || !s && i || !l)
              return -1;
          }
          return 0;
        }
        function Pa(n, e, t) {
          for (var r = -1, i = n.criteria, f = e.criteria, s = i.length, c = t.length; ++r < s; ) {
            var l = of(i[r], f[r]);
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
          for (var i = -1, f = n.length, s = t.length, c = -1, l = e.length, p = j(f - s, 0), v = h(l + p), w = !r; ++c < l; )
            v[c] = e[c];
          for (; ++i < s; )
            (w || i < f) && (v[t[i]] = n[i]);
          for (; p--; )
            v[c++] = n[i++];
          return v;
        }
        function cf(n, e, t, r) {
          for (var i = -1, f = n.length, s = -1, c = t.length, l = -1, p = e.length, v = j(f - c, 0), w = h(v + p), x = !r; ++i < v; )
            w[i] = n[i];
          for (var E = i; ++l < p; )
            w[E + l] = e[l];
          for (; ++s < c; )
            (x || i < f) && (w[E + t[s]] = n[i++]);
          return w;
        }
        function ln(n, e) {
          var t = -1, r = n.length;
          for (e || (e = h(r)); ++t < r; )
            e[t] = n[t];
          return e;
        }
        function Fn(n, e, t, r) {
          var i = !t;
          t || (t = {});
          for (var f = -1, s = e.length; ++f < s; ) {
            var c = e[f], l = r ? r(t[c], n[c], c, t, n) : o;
            l === o && (l = n[c]), i ? Zn(t, c, l) : rt(t, c, l);
          }
          return t;
        }
        function Da(n, e) {
          return Fn(n, gi(n), e);
        }
        function Ba(n, e) {
          return Fn(n, Ef(n), e);
        }
        function Yt(n, e) {
          return function(t, r) {
            var i = C(t) ? Ns : ra, f = e ? e() : {};
            return i(t, n, S(r, 2), f);
          };
        }
        function De(n) {
          return L(function(e, t) {
            var r = -1, i = t.length, f = i > 1 ? t[i - 1] : o, s = i > 2 ? t[2] : o;
            for (f = n.length > 3 && typeof f == "function" ? (i--, f) : o, s && cn(t[0], t[1], s) && (f = i < 3 ? o : f, i = 1), e = $(e); ++r < i; ) {
              var c = t[r];
              c && n(e, c, r, f);
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
            for (var i = t.length, f = e ? i : -1, s = $(t); (e ? f-- : ++f < i) && r(s[f], f, s) !== !1; )
              ;
            return t;
          };
        }
        function lf(n) {
          return function(e, t, r) {
            for (var i = -1, f = $(e), s = r(e), c = s.length; c--; ) {
              var l = s[n ? c : ++i];
              if (t(f[l], l, f) === !1)
                break;
            }
            return e;
          };
        }
        function Ua(n, e, t) {
          var r = e & In, i = st(n);
          function f() {
            var s = this && this !== en && this instanceof f ? i : n;
            return s.apply(r ? t : this, arguments);
          }
          return f;
        }
        function hf(n) {
          return function(e) {
            e = W(e);
            var t = Re(e) ? Mn(e) : o, r = t ? t[0] : e.charAt(0), i = t ? oe(t, 1).join("") : e.slice(1);
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
            return Z(r) ? r : t;
          };
        }
        function Wa(n, e, t) {
          var r = st(n);
          function i() {
            for (var f = arguments.length, s = h(f), c = f, l = Ue(i); c--; )
              s[c] = arguments[c];
            var p = f < 3 && s[0] !== l && s[f - 1] !== l ? [] : te(s, l);
            if (f -= p.length, f < t)
              return vf(
                n,
                e,
                Jt,
                i.placeholder,
                o,
                s,
                p,
                o,
                o,
                t - f
              );
            var v = this && this !== en && this instanceof i ? r : n;
            return _n(v, this, s);
          }
          return i;
        }
        function gf(n) {
          return function(e, t, r) {
            var i = $(e);
            if (!hn(e)) {
              var f = S(t, 3);
              e = nn(e), t = function(c) {
                return f(i[c], c, i);
              };
            }
            var s = n(e, t, r);
            return s > -1 ? i[f ? e[s] : s] : o;
          };
        }
        function df(n) {
          return Jn(function(e) {
            var t = e.length, r = t, i = Sn.prototype.thru;
            for (n && e.reverse(); r--; ) {
              var f = e[r];
              if (typeof f != "function")
                throw new bn(K);
              if (i && !s && kt(f) == "wrapper")
                var s = new Sn([], !0);
            }
            for (r = s ? r : t; ++r < t; ) {
              f = e[r];
              var c = kt(f), l = c == "wrapper" ? li(f) : o;
              l && _i(l[0]) && l[1] == (Hn | Nn | $n | ze) && !l[4].length && l[9] == 1 ? s = s[kt(l[0])].apply(s, l[3]) : s = f.length == 1 && _i(f) ? s[c]() : s.thru(f);
            }
            return function() {
              var p = arguments, v = p[0];
              if (s && p.length == 1 && C(v))
                return s.plant(v).value();
              for (var w = 0, x = t ? e[w].apply(this, p) : v; ++w < t; )
                x = e[w].call(this, x);
              return x;
            };
          });
        }
        function Jt(n, e, t, r, i, f, s, c, l, p) {
          var v = e & Hn, w = e & In, x = e & me, E = e & (Nn | $e), O = e & lr, y = x ? o : st(n);
          function T() {
            for (var M = arguments.length, D = h(M), xn = M; xn--; )
              D[xn] = arguments[xn];
            if (E)
              var an = Ue(T), An = Xs(D, an);
            if (r && (D = sf(D, r, i, E)), f && (D = cf(D, f, s, E)), M -= An, E && M < p) {
              var X = te(D, an);
              return vf(
                n,
                e,
                Jt,
                T.placeholder,
                t,
                D,
                X,
                c,
                l,
                p - M
              );
            }
            var Bn = w ? t : this, kn = x ? Bn[n] : n;
            return M = D.length, c ? D = rl(D, c) : O && M > 1 && D.reverse(), v && l < M && (D.length = l), this && this !== en && this instanceof T && (kn = y || st(kn)), kn.apply(Bn, D);
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
            if (t === o && r === o)
              return e;
            if (t !== o && (i = t), r !== o) {
              if (i === o)
                return r;
              typeof t == "string" || typeof r == "string" ? (t = vn(t), r = vn(r)) : (t = ju(t), r = ju(r)), i = n(t, r);
            }
            return i;
          };
        }
        function oi(n) {
          return Jn(function(e) {
            return e = q(e, pn(S())), L(function(t) {
              var r = this;
              return n(e, function(i) {
                return _n(i, r, t);
              });
            });
          });
        }
        function Qt(n, e) {
          e = e === o ? " " : vn(e);
          var t = e.length;
          if (t < 2)
            return t ? ni(e, n) : e;
          var r = ni(e, Ut(n / Ce(e)));
          return Re(e) ? oe(Mn(r), 0, n).join("") : r.slice(0, n);
        }
        function Fa(n, e, t, r) {
          var i = e & In, f = st(n);
          function s() {
            for (var c = -1, l = arguments.length, p = -1, v = r.length, w = h(v + l), x = this && this !== en && this instanceof s ? f : n; ++p < v; )
              w[p] = r[p];
            for (; l--; )
              w[p++] = arguments[++c];
            return _n(x, i ? t : this, w);
          }
          return s;
        }
        function pf(n) {
          return function(e, t, r) {
            return r && typeof r != "number" && cn(e, t, r) && (t = r = o), e = Vn(e), t === o ? (t = e, e = 0) : t = Vn(t), r = r === o ? e < t ? 1 : -1 : Vn(r), ba(e, t, r, n);
          };
        }
        function Vt(n) {
          return function(e, t) {
            return typeof e == "string" && typeof t == "string" || (e = Cn(e), t = Cn(t)), n(e, t);
          };
        }
        function vf(n, e, t, r, i, f, s, c, l, p) {
          var v = e & Nn, w = v ? s : o, x = v ? o : s, E = v ? f : o, O = v ? o : f;
          e |= v ? $n : He, e &= ~(v ? He : $n), e & Di || (e &= -4);
          var y = [
            n,
            e,
            i,
            E,
            w,
            O,
            x,
            c,
            l,
            p
          ], T = t.apply(o, y);
          return _i(n) && If(T, y), T.placeholder = r, yf(T, n, e);
        }
        function si(n) {
          var e = k[n];
          return function(t, r) {
            if (t = Cn(t), r = r == null ? 0 : rn(I(r), 292), r && Iu(t)) {
              var i = (W(t) + "e").split("e"), f = e(i[0] + "e" + (+i[1] + r));
              return i = (W(f) + "e").split("e"), +(i[0] + "e" + (+i[1] - r));
            }
            return e(t);
          };
        }
        var Ga = Le && 1 / Tt(new Le([, -0]))[1] == _t ? function(n) {
          return new Le(n);
        } : yi;
        function wf(n) {
          return function(e) {
            var t = un(e);
            return t == yn ? Fr(e) : t == Ln ? tc(e) : Js(e, n(e));
          };
        }
        function Yn(n, e, t, r, i, f, s, c) {
          var l = e & me;
          if (!l && typeof n != "function")
            throw new bn(K);
          var p = r ? r.length : 0;
          if (p || (e &= -97, r = i = o), s = s === o ? s : j(I(s), 0), c = c === o ? c : I(c), p -= i ? i.length : 0, e & He) {
            var v = r, w = i;
            r = i = o;
          }
          var x = l ? o : li(n), E = [
            n,
            e,
            t,
            r,
            i,
            v,
            w,
            f,
            s,
            c
          ];
          if (x && nl(E, x), n = E[0], e = E[1], t = E[2], r = E[3], i = E[4], c = E[9] = E[9] === o ? l ? 0 : n.length : j(E[9] - p, 0), !c && e & (Nn | $e) && (e &= -25), !e || e == In)
            var O = Ua(n, e, t);
          else e == Nn || e == $e ? O = Wa(n, e, c) : (e == $n || e == (In | $n)) && !i.length ? O = Fa(n, e, t, r) : O = Jt.apply(o, E);
          var y = x ? Vu : If;
          return yf(y(O, E), n, e);
        }
        function xf(n, e, t, r) {
          return n === o || Dn(n, ye[t]) && !G.call(r, t) ? e : n;
        }
        function Af(n, e, t, r, i, f) {
          return Z(n) && Z(e) && (f.set(e, n), qt(n, e, o, Af, f), f.delete(e)), n;
        }
        function Na(n) {
          return lt(n) ? o : n;
        }
        function mf(n, e, t, r, i, f) {
          var s = t & Ae, c = n.length, l = e.length;
          if (c != l && !(s && l > c))
            return !1;
          var p = f.get(n), v = f.get(e);
          if (p && v)
            return p == e && v == n;
          var w = -1, x = !0, E = t & dt ? new he() : o;
          for (f.set(n, e), f.set(e, n); ++w < c; ) {
            var O = n[w], y = e[w];
            if (r)
              var T = s ? r(y, O, w, e, n, f) : r(O, y, w, n, e, f);
            if (T !== o) {
              if (T)
                continue;
              x = !1;
              break;
            }
            if (E) {
              if (!Mr(e, function(M, D) {
                if (!Ve(E, D) && (O === M || i(O, M, t, r, f)))
                  return E.push(D);
              })) {
                x = !1;
                break;
              }
            } else if (!(O === y || i(O, y, t, r, f))) {
              x = !1;
              break;
            }
          }
          return f.delete(n), f.delete(e), x;
        }
        function $a(n, e, t, r, i, f, s) {
          switch (t) {
            case Se:
              if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
                return !1;
              n = n.buffer, e = e.buffer;
            case Qe:
              return !(n.byteLength != e.byteLength || !f(new Mt(n), new Mt(e)));
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
              r |= dt, s.set(n, e);
              var v = mf(c(n), c(e), r, i, f, s);
              return s.delete(n), v;
            case At:
              if (tt)
                return tt.call(n) == tt.call(e);
          }
          return !1;
        }
        function Ha(n, e, t, r, i, f) {
          var s = t & Ae, c = ci(n), l = c.length, p = ci(e), v = p.length;
          if (l != v && !s)
            return !1;
          for (var w = l; w--; ) {
            var x = c[w];
            if (!(s ? x in e : G.call(e, x)))
              return !1;
          }
          var E = f.get(n), O = f.get(e);
          if (E && O)
            return E == e && O == n;
          var y = !0;
          f.set(n, e), f.set(e, n);
          for (var T = s; ++w < l; ) {
            x = c[w];
            var M = n[x], D = e[x];
            if (r)
              var xn = s ? r(D, M, x, e, n, f) : r(M, D, x, n, e, f);
            if (!(xn === o ? M === D || i(M, D, t, r, f) : xn)) {
              y = !1;
              break;
            }
            T || (T = x == "constructor");
          }
          if (y && !T) {
            var an = n.constructor, An = e.constructor;
            an != An && "constructor" in n && "constructor" in e && !(typeof an == "function" && an instanceof an && typeof An == "function" && An instanceof An) && (y = !1);
          }
          return f.delete(n), f.delete(e), y;
        }
        function Jn(n) {
          return vi(Rf(n, o, Uf), n + "");
        }
        function ci(n) {
          return Nu(n, nn, gi);
        }
        function ai(n) {
          return Nu(n, gn, Ef);
        }
        var li = Ft ? function(n) {
          return Ft.get(n);
        } : yi;
        function kt(n) {
          for (var e = n.name + "", t = Me[e], r = G.call(Me, e) ? t.length : 0; r--; ) {
            var i = t[r], f = i.func;
            if (f == null || f == n)
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
          for (var e = nn(n), t = e.length; t--; ) {
            var r = e[t], i = n[r];
            e[t] = [r, i, Of(i)];
          }
          return e;
        }
        function _e(n, e) {
          var t = js(n, e);
          return Hu(t) ? t : o;
        }
        function za(n) {
          var e = G.call(n, ae), t = n[ae];
          try {
            n[ae] = o;
            var r = !0;
          } catch {
          }
          var i = yt.call(n);
          return r && (e ? n[ae] = t : delete n[ae]), i;
        }
        var gi = Nr ? function(n) {
          return n == null ? [] : (n = $(n), ne(Nr(n), function(e) {
            return Ru.call(n, e);
          }));
        } : Li, Ef = Nr ? function(n) {
          for (var e = []; n; )
            ee(e, gi(n)), n = Pt(n);
          return e;
        } : Li, un = sn;
        ($r && un(new $r(new ArrayBuffer(1))) != Se || je && un(new je()) != yn || Hr && un(Hr.resolve()) != Wi || Le && un(new Le()) != Ln || nt && un(new nt()) != Xe) && (un = function(n) {
          var e = sn(n), t = e == zn ? n.constructor : o, r = t ? pe(t) : "";
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
            var f = t[r], s = f.size;
            switch (f.type) {
              case "drop":
                n += s;
                break;
              case "dropRight":
                e -= s;
                break;
              case "take":
                e = rn(e, n + s);
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
          for (var r = -1, i = e.length, f = !1; ++r < i; ) {
            var s = Gn(e[r]);
            if (!(f = n != null && t(n, s)))
              break;
            n = n[s];
          }
          return f || ++r != i ? f : (i = n == null ? 0 : n.length, !!i && fr(i) && Xn(s, i) && (C(n) || ve(n)));
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
            case gr:
            case dr:
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
          if (!Z(t))
            return !1;
          var r = typeof e;
          return (r == "number" ? hn(t) && Xn(e, t.length) : r == "string" && e in t) ? Dn(t[e], n) : !1;
        }
        function di(n, e) {
          if (C(n))
            return !1;
          var t = typeof n;
          return t == "number" || t == "symbol" || t == "boolean" || n == null || wn(n) ? !0 : Zo.test(n) || !Ko.test(n) || e != null && n in $(e);
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
          return n === n && !Z(n);
        }
        function Tf(n, e) {
          return function(t) {
            return t == null ? !1 : t[n] === e && (e !== o || n in $(t));
          };
        }
        function ja(n) {
          var e = ir(n, function(r) {
            return t.size === ar && t.clear(), r;
          }), t = e.cache;
          return e;
        }
        function nl(n, e) {
          var t = n[1], r = e[1], i = t | r, f = i < (In | me | Hn), s = r == Hn && t == Nn || r == Hn && t == ze && n[7].length <= e[8] || r == (Hn | ze) && e[7].length <= e[8] && t == Nn;
          if (!(f || s))
            return n;
          r & In && (n[2] = e[2], i |= t & In ? 0 : Di);
          var c = e[3];
          if (c) {
            var l = n[3];
            n[3] = l ? sf(l, c, e[4]) : c, n[4] = l ? te(n[3], we) : e[4];
          }
          return c = e[5], c && (l = n[5], n[5] = l ? cf(l, c, e[6]) : c, n[6] = l ? te(n[5], we) : e[6]), c = e[7], c && (n[7] = c), r & Hn && (n[8] = n[8] == null ? e[8] : rn(n[8], e[8])), n[9] == null && (n[9] = e[9]), n[0] = e[0], n[1] = i, n;
        }
        function el(n) {
          var e = [];
          if (n != null)
            for (var t in $(n))
              e.push(t);
          return e;
        }
        function tl(n) {
          return yt.call(n);
        }
        function Rf(n, e, t) {
          return e = j(e === o ? n.length - 1 : e, 0), function() {
            for (var r = arguments, i = -1, f = j(r.length - e, 0), s = h(f); ++i < f; )
              s[i] = r[e + i];
            i = -1;
            for (var c = h(e + 1); ++i < e; )
              c[i] = r[i];
            return c[e] = t(s), _n(n, this, c);
          };
        }
        function Cf(n, e) {
          return e.length < 2 ? n : de(n, Tn(e, 0, -1));
        }
        function rl(n, e) {
          for (var t = n.length, r = rn(e.length, t), i = ln(n); r--; ) {
            var f = e[r];
            n[r] = Xn(f, t) ? i[f] : o;
          }
          return n;
        }
        function pi(n, e) {
          if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
            return n[e];
        }
        var If = Lf(Vu), at = wc || function(n, e) {
          return en.setTimeout(n, e);
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
            return n.apply(o, arguments);
          };
        }
        function nr(n, e) {
          var t = -1, r = n.length, i = r - 1;
          for (e = e === o ? r : e; ++t < e; ) {
            var f = jr(t, i), s = n[f];
            n[f] = n[t], n[t] = s;
          }
          return n.length = e, n;
        }
        var Mf = ja(function(n) {
          var e = [];
          return n.charCodeAt(0) === 46 && e.push(""), n.replace(Yo, function(t, r, i, f) {
            e.push(i ? f.replace(es, "$1") : r || t);
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
          (t ? cn(n, e, t) : e === o) ? e = 1 : e = j(I(e), 0);
          var r = n == null ? 0 : n.length;
          if (!r || e < 1)
            return [];
          for (var i = 0, f = 0, s = h(Ut(r / e)); i < r; )
            s[f++] = Tn(n, i, i += e);
          return s;
        }
        function fl(n) {
          for (var e = -1, t = n == null ? 0 : n.length, r = 0, i = []; ++e < t; ) {
            var f = n[e];
            f && (i[r++] = f);
          }
          return i;
        }
        function ol() {
          var n = arguments.length;
          if (!n)
            return [];
          for (var e = h(n - 1), t = arguments[0], r = n; r--; )
            e[r - 1] = arguments[r];
          return ee(C(t) ? ln(t) : [t], tn(e, 1));
        }
        var sl = L(function(n, e) {
          return J(n) ? it(n, tn(e, 1, J, !0)) : [];
        }), cl = L(function(n, e) {
          var t = Rn(e);
          return J(t) && (t = o), J(n) ? it(n, tn(e, 1, J, !0), S(t, 2)) : [];
        }), al = L(function(n, e) {
          var t = Rn(e);
          return J(t) && (t = o), J(n) ? it(n, tn(e, 1, J, !0), o, t) : [];
        });
        function ll(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === o ? 1 : I(e), Tn(n, e < 0 ? 0 : e, r)) : [];
        }
        function hl(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === o ? 1 : I(e), e = r - e, Tn(n, 0, e < 0 ? 0 : e)) : [];
        }
        function gl(n, e) {
          return n && n.length ? Zt(n, S(e, 3), !0, !0) : [];
        }
        function dl(n, e) {
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
          return t !== o && (i = I(t), i = t < 0 ? j(r + i, 0) : rn(i, r - 1)), Ot(n, S(e, 3), i, !0);
        }
        function Uf(n) {
          var e = n == null ? 0 : n.length;
          return e ? tn(n, 1) : [];
        }
        function pl(n) {
          var e = n == null ? 0 : n.length;
          return e ? tn(n, _t) : [];
        }
        function vl(n, e) {
          var t = n == null ? 0 : n.length;
          return t ? (e = e === o ? 1 : I(e), tn(n, e)) : [];
        }
        function wl(n) {
          for (var e = -1, t = n == null ? 0 : n.length, r = {}; ++e < t; ) {
            var i = n[e];
            r[i[0]] = i[1];
          }
          return r;
        }
        function Wf(n) {
          return n && n.length ? n[0] : o;
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
          var e = q(n, ii);
          return e.length && e[0] === n[0] ? Jr(e) : [];
        }), El = L(function(n) {
          var e = Rn(n), t = q(n, ii);
          return e === Rn(t) ? e = o : t.pop(), t.length && t[0] === n[0] ? Jr(t, S(e, 2)) : [];
        }), bl = L(function(n) {
          var e = Rn(n), t = q(n, ii);
          return e = typeof e == "function" ? e : o, e && t.pop(), t.length && t[0] === n[0] ? Jr(t, o, e) : [];
        });
        function Sl(n, e) {
          return n == null ? "" : Ac.call(n, e);
        }
        function Rn(n) {
          var e = n == null ? 0 : n.length;
          return e ? n[e - 1] : o;
        }
        function Ol(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = r;
          return t !== o && (i = I(t), i = i < 0 ? j(r + i, 0) : rn(i, r - 1)), e === e ? ic(n, e, i) : Ot(n, pu, i, !0);
        }
        function Tl(n, e) {
          return n && n.length ? Yu(n, I(e)) : o;
        }
        var Rl = L(Ff);
        function Ff(n, e) {
          return n && n.length && e && e.length ? kr(n, e) : n;
        }
        function Cl(n, e, t) {
          return n && n.length && e && e.length ? kr(n, e, S(t, 2)) : n;
        }
        function Il(n, e, t) {
          return n && n.length && e && e.length ? kr(n, e, o, t) : n;
        }
        var yl = Jn(function(n, e) {
          var t = n == null ? 0 : n.length, r = qr(n, e);
          return Qu(n, q(e, function(i) {
            return Xn(i, t) ? +i : i;
          }).sort(of)), r;
        });
        function Ll(n, e) {
          var t = [];
          if (!(n && n.length))
            return t;
          var r = -1, i = [], f = n.length;
          for (e = S(e, 3); ++r < f; ) {
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
          return r ? (t && typeof t != "number" && cn(n, e, t) ? (e = 0, t = r) : (e = e == null ? 0 : I(e), t = t === o ? r : I(t)), Tn(n, e, t)) : [];
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
          return n && n.length ? (e = t || e === o ? 1 : I(e), Tn(n, 0, e < 0 ? 0 : e)) : [];
        }
        function zl(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === o ? 1 : I(e), e = r - e, Tn(n, e < 0 ? 0 : e, r)) : [];
        }
        function ql(n, e) {
          return n && n.length ? Zt(n, S(e, 3), !1, !0) : [];
        }
        function Kl(n, e) {
          return n && n.length ? Zt(n, S(e, 3)) : [];
        }
        var Zl = L(function(n) {
          return ue(tn(n, 1, J, !0));
        }), Yl = L(function(n) {
          var e = Rn(n);
          return J(e) && (e = o), ue(tn(n, 1, J, !0), S(e, 2));
        }), Jl = L(function(n) {
          var e = Rn(n);
          return e = typeof e == "function" ? e : o, ue(tn(n, 1, J, !0), o, e);
        });
        function Xl(n) {
          return n && n.length ? ue(n) : [];
        }
        function Ql(n, e) {
          return n && n.length ? ue(n, S(e, 2)) : [];
        }
        function Vl(n, e) {
          return e = typeof e == "function" ? e : o, n && n.length ? ue(n, o, e) : [];
        }
        function xi(n) {
          if (!(n && n.length))
            return [];
          var e = 0;
          return n = ne(n, function(t) {
            if (J(t))
              return e = j(t.length, e), !0;
          }), Ur(e, function(t) {
            return q(n, Pr(t));
          });
        }
        function Gf(n, e) {
          if (!(n && n.length))
            return [];
          var t = xi(n);
          return e == null ? t : q(t, function(r) {
            return _n(e, o, r);
          });
        }
        var kl = L(function(n, e) {
          return J(n) ? it(n, e) : [];
        }), jl = L(function(n) {
          return ri(ne(n, J));
        }), nh = L(function(n) {
          var e = Rn(n);
          return J(e) && (e = o), ri(ne(n, J), S(e, 2));
        }), eh = L(function(n) {
          var e = Rn(n);
          return e = typeof e == "function" ? e : o, ri(ne(n, J), o, e);
        }), th = L(xi);
        function rh(n, e) {
          return tf(n || [], e || [], rt);
        }
        function ih(n, e) {
          return tf(n || [], e || [], ot);
        }
        var uh = L(function(n) {
          var e = n.length, t = e > 1 ? n[e - 1] : o;
          return t = typeof t == "function" ? (n.pop(), t) : o, Gf(n, t);
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
          var e = n.length, t = e ? n[0] : 0, r = this.__wrapped__, i = function(f) {
            return qr(f, n);
          };
          return e > 1 || this.__actions__.length || !(r instanceof P) || !Xn(t) ? this.thru(i) : (r = r.slice(t, +t + (e ? 1 : 0)), r.__actions__.push({
            func: er,
            args: [i],
            thisArg: o
          }), new Sn(r, this.__chain__).thru(function(f) {
            return e && !f.length && f.push(o), f;
          }));
        });
        function sh() {
          return Nf(this);
        }
        function ch() {
          return new Sn(this.value(), this.__chain__);
        }
        function ah() {
          this.__values__ === o && (this.__values__ = no(this.value()));
          var n = this.__index__ >= this.__values__.length, e = n ? o : this.__values__[this.__index__++];
          return { done: n, value: e };
        }
        function lh() {
          return this;
        }
        function hh(n) {
          for (var e, t = this; t instanceof Nt; ) {
            var r = Pf(t);
            r.__index__ = 0, r.__values__ = o, e ? i.__wrapped__ = r : e = r;
            var i = r;
            t = t.__wrapped__;
          }
          return i.__wrapped__ = n, e;
        }
        function gh() {
          var n = this.__wrapped__;
          if (n instanceof P) {
            var e = n;
            return this.__actions__.length && (e = new P(this)), e = e.reverse(), e.__actions__.push({
              func: er,
              args: [wi],
              thisArg: o
            }), new Sn(e, this.__chain__);
          }
          return this.thru(wi);
        }
        function dh() {
          return ef(this.__wrapped__, this.__actions__);
        }
        var _h = Yt(function(n, e, t) {
          G.call(n, t) ? ++n[t] : Zn(n, t, 1);
        });
        function ph(n, e, t) {
          var r = C(n) ? du : fa;
          return t && cn(n, e, t) && (e = o), r(n, S(e, 3));
        }
        function vh(n, e) {
          var t = C(n) ? ne : Fu;
          return t(n, S(e, 3));
        }
        var wh = gf(Df), xh = gf(Bf);
        function Ah(n, e) {
          return tn(tr(n, e), 1);
        }
        function mh(n, e) {
          return tn(tr(n, e), _t);
        }
        function Eh(n, e, t) {
          return t = t === o ? 1 : I(t), tn(tr(n, e), t);
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
          var r = -1, i = typeof e == "function", f = hn(n) ? h(n.length) : [];
          return ie(n, function(s) {
            f[++r] = i ? _n(e, s, t) : ut(s, e, t);
          }), f;
        }), Th = Yt(function(n, e, t) {
          Zn(n, t, e);
        });
        function tr(n, e) {
          var t = C(n) ? q : qu;
          return t(n, S(e, 3));
        }
        function Rh(n, e, t, r) {
          return n == null ? [] : (C(e) || (e = e == null ? [] : [e]), t = r ? o : t, C(t) || (t = t == null ? [] : [t]), Ju(n, e, t));
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
          (t ? cn(n, e, t) : e === o) ? e = 1 : e = I(e);
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
          var e = un(n);
          return e == yn || e == Ln ? n.size : Qr(n).length;
        }
        function Uh(n, e, t) {
          var r = C(n) ? Mr : Ca;
          return t && cn(n, e, t) && (e = o), r(n, S(e, 3));
        }
        var Wh = L(function(n, e) {
          if (n == null)
            return [];
          var t = e.length;
          return t > 1 && cn(n, e[0], e[1]) ? e = [] : t > 2 && cn(e[0], e[1], e[2]) && (e = [e[0]]), Ju(n, tn(e, 1), []);
        }), rr = vc || function() {
          return en.Date.now();
        };
        function Fh(n, e) {
          if (typeof e != "function")
            throw new bn(K);
          return n = I(n), function() {
            if (--n < 1)
              return e.apply(this, arguments);
          };
        }
        function zf(n, e, t) {
          return e = t ? o : e, e = n && e == null ? n.length : e, Yn(n, Hn, o, o, o, o, e);
        }
        function qf(n, e) {
          var t;
          if (typeof e != "function")
            throw new bn(K);
          return n = I(n), function() {
            return --n > 0 && (t = e.apply(this, arguments)), n <= 1 && (e = o), t;
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
          e = t ? o : e;
          var r = Yn(n, Nn, o, o, o, o, o, e);
          return r.placeholder = Zf.placeholder, r;
        }
        function Yf(n, e, t) {
          e = t ? o : e;
          var r = Yn(n, $e, o, o, o, o, o, e);
          return r.placeholder = Yf.placeholder, r;
        }
        function Jf(n, e, t) {
          var r, i, f, s, c, l, p = 0, v = !1, w = !1, x = !0;
          if (typeof n != "function")
            throw new bn(K);
          e = Cn(e) || 0, Z(t) && (v = !!t.leading, w = "maxWait" in t, f = w ? j(Cn(t.maxWait) || 0, e) : f, x = "trailing" in t ? !!t.trailing : x);
          function E(X) {
            var Bn = r, kn = i;
            return r = i = o, p = X, s = n.apply(kn, Bn), s;
          }
          function O(X) {
            return p = X, c = at(M, e), v ? E(X) : s;
          }
          function y(X) {
            var Bn = X - l, kn = X - p, go = e - Bn;
            return w ? rn(go, f - kn) : go;
          }
          function T(X) {
            var Bn = X - l, kn = X - p;
            return l === o || Bn >= e || Bn < 0 || w && kn >= f;
          }
          function M() {
            var X = rr();
            if (T(X))
              return D(X);
            c = at(M, y(X));
          }
          function D(X) {
            return c = o, x && r ? E(X) : (r = i = o, s);
          }
          function xn() {
            c !== o && rf(c), p = 0, r = l = i = c = o;
          }
          function an() {
            return c === o ? s : D(rr());
          }
          function An() {
            var X = rr(), Bn = T(X);
            if (r = arguments, i = this, l = X, Bn) {
              if (c === o)
                return O(l);
              if (w)
                return rf(c), c = at(M, e), E(l);
            }
            return c === o && (c = at(M, e)), s;
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
            throw new bn(K);
          var t = function() {
            var r = arguments, i = e ? e.apply(this, r) : r[0], f = t.cache;
            if (f.has(i))
              return f.get(i);
            var s = n.apply(this, r);
            return t.cache = f.set(i, s) || f, s;
          };
          return t.cache = new (ir.Cache || Kn)(), t;
        }
        ir.Cache = Kn;
        function ur(n) {
          if (typeof n != "function")
            throw new bn(K);
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
          e = e.length == 1 && C(e[0]) ? q(e[0], pn(S())) : q(tn(e, 1), pn(S()));
          var t = e.length;
          return L(function(r) {
            for (var i = -1, f = rn(r.length, t); ++i < f; )
              r[i] = e[i].call(this, r[i]);
            return _n(n, this, r);
          });
        }), mi = L(function(n, e) {
          var t = te(e, Ue(mi));
          return Yn(n, $n, o, e, t);
        }), Xf = L(function(n, e) {
          var t = te(e, Ue(Xf));
          return Yn(n, He, o, e, t);
        }), qh = Jn(function(n, e) {
          return Yn(n, ze, o, o, o, e);
        });
        function Kh(n, e) {
          if (typeof n != "function")
            throw new bn(K);
          return e = e === o ? e : I(e), L(n, e);
        }
        function Zh(n, e) {
          if (typeof n != "function")
            throw new bn(K);
          return e = e == null ? 0 : j(I(e), 0), L(function(t) {
            var r = t[e], i = oe(t, 0, e);
            return r && ee(i, r), _n(n, this, i);
          });
        }
        function Yh(n, e, t) {
          var r = !0, i = !0;
          if (typeof n != "function")
            throw new bn(K);
          return Z(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), Jf(n, e, {
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
          return e = typeof e == "function" ? e : o, On(n, xe, e);
        }
        function jh(n) {
          return On(n, jn | xe);
        }
        function ng(n, e) {
          return e = typeof e == "function" ? e : o, On(n, jn | xe, e);
        }
        function eg(n, e) {
          return e == null || Bu(n, e, nn(e));
        }
        function Dn(n, e) {
          return n === e || n !== n && e !== e;
        }
        var tg = Vt(Yr), rg = Vt(function(n, e) {
          return n >= e;
        }), ve = $u(/* @__PURE__ */ function() {
          return arguments;
        }()) ? $u : function(n) {
          return Y(n) && G.call(n, "callee") && !Ru.call(n, "callee");
        }, C = h.isArray, ig = su ? pn(su) : ha;
        function hn(n) {
          return n != null && fr(n.length) && !Qn(n);
        }
        function J(n) {
          return Y(n) && hn(n);
        }
        function ug(n) {
          return n === !0 || n === !1 || Y(n) && sn(n) == qe;
        }
        var se = xc || Mi, fg = cu ? pn(cu) : ga;
        function og(n) {
          return Y(n) && n.nodeType === 1 && !lt(n);
        }
        function sg(n) {
          if (n == null)
            return !0;
          if (hn(n) && (C(n) || typeof n == "string" || typeof n.splice == "function" || se(n) || We(n) || ve(n)))
            return !n.length;
          var e = un(n);
          if (e == yn || e == Ln)
            return !n.size;
          if (ct(n))
            return !Qr(n).length;
          for (var t in n)
            if (G.call(n, t))
              return !1;
          return !0;
        }
        function cg(n, e) {
          return ft(n, e);
        }
        function ag(n, e, t) {
          t = typeof t == "function" ? t : o;
          var r = t ? t(n, e) : o;
          return r === o ? ft(n, e, o, t) : !!r;
        }
        function Ei(n) {
          if (!Y(n))
            return !1;
          var e = sn(n);
          return e == wt || e == Po || typeof n.message == "string" && typeof n.name == "string" && !lt(n);
        }
        function lg(n) {
          return typeof n == "number" && Iu(n);
        }
        function Qn(n) {
          if (!Z(n))
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
        function Z(n) {
          var e = typeof n;
          return n != null && (e == "object" || e == "function");
        }
        function Y(n) {
          return n != null && typeof n == "object";
        }
        var Vf = au ? pn(au) : _a;
        function hg(n, e) {
          return n === e || Xr(n, e, hi(e));
        }
        function gg(n, e, t) {
          return t = typeof t == "function" ? t : o, Xr(n, e, hi(e), t);
        }
        function dg(n) {
          return kf(n) && n != +n;
        }
        function _g(n) {
          if (ka(n))
            throw new R(B);
          return Hu(n);
        }
        function pg(n) {
          return n === null;
        }
        function vg(n) {
          return n == null;
        }
        function kf(n) {
          return typeof n == "number" || Y(n) && sn(n) == Ze;
        }
        function lt(n) {
          if (!Y(n) || sn(n) != zn)
            return !1;
          var e = Pt(n);
          if (e === null)
            return !0;
          var t = G.call(e, "constructor") && e.constructor;
          return typeof t == "function" && t instanceof t && It.call(t) == gc;
        }
        var bi = lu ? pn(lu) : pa;
        function wg(n) {
          return Qf(n) && n >= -9007199254740991 && n <= Ee;
        }
        var jf = hu ? pn(hu) : va;
        function or(n) {
          return typeof n == "string" || !C(n) && Y(n) && sn(n) == Je;
        }
        function wn(n) {
          return typeof n == "symbol" || Y(n) && sn(n) == At;
        }
        var We = gu ? pn(gu) : wa;
        function xg(n) {
          return n === o;
        }
        function Ag(n) {
          return Y(n) && un(n) == Xe;
        }
        function mg(n) {
          return Y(n) && sn(n) == Wo;
        }
        var Eg = Vt(Vr), bg = Vt(function(n, e) {
          return n <= e;
        });
        function no(n) {
          if (!n)
            return [];
          if (hn(n))
            return or(n) ? Mn(n) : ln(n);
          if (ke && n[ke])
            return ec(n[ke]());
          var e = un(n), t = e == yn ? Fr : e == Ln ? Tt : Fe;
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
          return n ? ge(I(n), 0, Un) : 0;
        }
        function Cn(n) {
          if (typeof n == "number")
            return n;
          if (wn(n))
            return pt;
          if (Z(n)) {
            var e = typeof n.valueOf == "function" ? n.valueOf() : n;
            n = Z(e) ? e + "" : e;
          }
          if (typeof n != "string")
            return n === 0 ? n : +n;
          n = xu(n);
          var t = is.test(n);
          return t || fs.test(n) ? Fs(n.slice(2), t ? 2 : 8) : rs.test(n) ? pt : +n;
        }
        function to(n) {
          return Fn(n, gn(n));
        }
        function Sg(n) {
          return n ? ge(I(n), -9007199254740991, Ee) : n === 0 ? n : 0;
        }
        function W(n) {
          return n == null ? "" : vn(n);
        }
        var Og = De(function(n, e) {
          if (ct(e) || hn(e)) {
            Fn(e, nn(e), n);
            return;
          }
          for (var t in e)
            G.call(e, t) && rt(n, t, e[t]);
        }), ro = De(function(n, e) {
          Fn(e, gn(e), n);
        }), sr = De(function(n, e, t, r) {
          Fn(e, gn(e), n, r);
        }), Tg = De(function(n, e, t, r) {
          Fn(e, nn(e), n, r);
        }), Rg = Jn(qr);
        function Cg(n, e) {
          var t = Pe(n);
          return e == null ? t : Du(t, e);
        }
        var Ig = L(function(n, e) {
          n = $(n);
          var t = -1, r = e.length, i = r > 2 ? e[2] : o;
          for (i && cn(e[0], e[1], i) && (r = 1); ++t < r; )
            for (var f = e[t], s = gn(f), c = -1, l = s.length; ++c < l; ) {
              var p = s[c], v = n[p];
              (v === o || Dn(v, ye[p]) && !G.call(n, p)) && (n[p] = f[p]);
            }
          return n;
        }), yg = L(function(n) {
          return n.push(o, Af), _n(io, o, n);
        });
        function Lg(n, e) {
          return _u(n, S(e, 3), Wn);
        }
        function Mg(n, e) {
          return _u(n, S(e, 3), Zr);
        }
        function Pg(n, e) {
          return n == null ? n : Kr(n, S(e, 3), gn);
        }
        function Dg(n, e) {
          return n == null ? n : Gu(n, S(e, 3), gn);
        }
        function Bg(n, e) {
          return n && Wn(n, S(e, 3));
        }
        function Ug(n, e) {
          return n && Zr(n, S(e, 3));
        }
        function Wg(n) {
          return n == null ? [] : zt(n, nn(n));
        }
        function Fg(n) {
          return n == null ? [] : zt(n, gn(n));
        }
        function Si(n, e, t) {
          var r = n == null ? o : de(n, e);
          return r === o ? t : r;
        }
        function Gg(n, e) {
          return n != null && bf(n, e, sa);
        }
        function Oi(n, e) {
          return n != null && bf(n, e, ca);
        }
        var Ng = _f(function(n, e, t) {
          e != null && typeof e.toString != "function" && (e = yt.call(e)), n[e] = t;
        }, Ri(dn)), $g = _f(function(n, e, t) {
          e != null && typeof e.toString != "function" && (e = yt.call(e)), G.call(n, e) ? n[e].push(t) : n[e] = [t];
        }, S), Hg = L(ut);
        function nn(n) {
          return hn(n) ? Mu(n) : Qr(n);
        }
        function gn(n) {
          return hn(n) ? Mu(n, !0) : xa(n);
        }
        function zg(n, e) {
          var t = {};
          return e = S(e, 3), Wn(n, function(r, i, f) {
            Zn(t, e(r, i, f), r);
          }), t;
        }
        function qg(n, e) {
          var t = {};
          return e = S(e, 3), Wn(n, function(r, i, f) {
            Zn(t, i, e(r, i, f));
          }), t;
        }
        var Kg = De(function(n, e, t) {
          qt(n, e, t);
        }), io = De(function(n, e, t, r) {
          qt(n, e, t, r);
        }), Zg = Jn(function(n, e) {
          var t = {};
          if (n == null)
            return t;
          var r = !1;
          e = q(e, function(f) {
            return f = fe(f, n), r || (r = f.length > 1), f;
          }), Fn(n, ai(n), t), r && (t = On(t, jn | Pi | xe, Na));
          for (var i = e.length; i--; )
            ti(t, e[i]);
          return t;
        });
        function Yg(n, e) {
          return uo(n, ur(S(e)));
        }
        var Jg = Jn(function(n, e) {
          return n == null ? {} : ma(n, e);
        });
        function uo(n, e) {
          if (n == null)
            return {};
          var t = q(ai(n), function(r) {
            return [r];
          });
          return e = S(e), Xu(n, t, function(r, i) {
            return e(r, i[0]);
          });
        }
        function Xg(n, e, t) {
          e = fe(e, n);
          var r = -1, i = e.length;
          for (i || (i = 1, n = o); ++r < i; ) {
            var f = n == null ? o : n[Gn(e[r])];
            f === o && (r = i, f = t), n = Qn(f) ? f.call(n) : f;
          }
          return n;
        }
        function Qg(n, e, t) {
          return n == null ? n : ot(n, e, t);
        }
        function Vg(n, e, t, r) {
          return r = typeof r == "function" ? r : o, n == null ? n : ot(n, e, t, r);
        }
        var fo = wf(nn), oo = wf(gn);
        function kg(n, e, t) {
          var r = C(n), i = r || se(n) || We(n);
          if (e = S(e, 4), t == null) {
            var f = n && n.constructor;
            i ? t = r ? new f() : [] : Z(n) ? t = Qn(f) ? Pe(Pt(n)) : {} : t = {};
          }
          return (i ? En : Wn)(n, function(s, c, l) {
            return e(t, s, c, l);
          }), t;
        }
        function jg(n, e) {
          return n == null ? !0 : ti(n, e);
        }
        function nd(n, e, t) {
          return n == null ? n : nf(n, e, ui(t));
        }
        function ed(n, e, t, r) {
          return r = typeof r == "function" ? r : o, n == null ? n : nf(n, e, ui(t), r);
        }
        function Fe(n) {
          return n == null ? [] : Wr(n, nn(n));
        }
        function td(n) {
          return n == null ? [] : Wr(n, gn(n));
        }
        function rd(n, e, t) {
          return t === o && (t = e, e = o), t !== o && (t = Cn(t), t = t === t ? t : 0), e !== o && (e = Cn(e), e = e === e ? e : 0), ge(Cn(n), e, t);
        }
        function id(n, e, t) {
          return e = Vn(e), t === o ? (t = e, e = 0) : t = Vn(t), n = Cn(n), aa(n, e, t);
        }
        function ud(n, e, t) {
          if (t && typeof t != "boolean" && cn(n, e, t) && (e = t = o), t === o && (typeof e == "boolean" ? (t = e, e = o) : typeof n == "boolean" && (t = n, n = o)), n === o && e === o ? (n = 0, e = 1) : (n = Vn(n), e === o ? (e = n, n = 0) : e = Vn(e)), n > e) {
            var r = n;
            n = e, e = r;
          }
          if (t || n % 1 || e % 1) {
            var i = yu();
            return rn(n + i * (e - n + Ws("1e-" + ((i + "").length - 1))), e);
          }
          return jr(n, e);
        }
        var fd = Be(function(n, e, t) {
          return e = e.toLowerCase(), n + (t ? so(e) : e);
        });
        function so(n) {
          return Ti(W(n).toLowerCase());
        }
        function co(n) {
          return n = W(n), n && n.replace(ss, Qs).replace(Rs, "");
        }
        function od(n, e, t) {
          n = W(n), e = vn(e);
          var r = n.length;
          t = t === o ? r : ge(I(t), 0, r);
          var i = t;
          return t -= e.length, t >= 0 && n.slice(t, i) == e;
        }
        function sd(n) {
          return n = W(n), n && Ho.test(n) ? n.replace(Gi, Vs) : n;
        }
        function cd(n) {
          return n = W(n), n && Jo.test(n) ? n.replace(mr, "\\$&") : n;
        }
        var ad = Be(function(n, e, t) {
          return n + (t ? "-" : "") + e.toLowerCase();
        }), ld = Be(function(n, e, t) {
          return n + (t ? " " : "") + e.toLowerCase();
        }), hd = hf("toLowerCase");
        function gd(n, e, t) {
          n = W(n), e = I(e);
          var r = e ? Ce(n) : 0;
          if (!e || r >= e)
            return n;
          var i = (e - r) / 2;
          return Qt(Wt(i), t) + n + Qt(Ut(i), t);
        }
        function dd(n, e, t) {
          n = W(n), e = I(e);
          var r = e ? Ce(n) : 0;
          return e && r < e ? n + Qt(e - r, t) : n;
        }
        function _d(n, e, t) {
          n = W(n), e = I(e);
          var r = e ? Ce(n) : 0;
          return e && r < e ? Qt(e - r, t) + n : n;
        }
        function pd(n, e, t) {
          return t || e == null ? e = 0 : e && (e = +e), bc(W(n).replace(Er, ""), e || 0);
        }
        function vd(n, e, t) {
          return (t ? cn(n, e, t) : e === o) ? e = 1 : e = I(e), ni(W(n), e);
        }
        function wd() {
          var n = arguments, e = W(n[0]);
          return n.length < 3 ? e : e.replace(n[1], n[2]);
        }
        var xd = Be(function(n, e, t) {
          return n + (t ? "_" : "") + e.toLowerCase();
        });
        function Ad(n, e, t) {
          return t && typeof t != "number" && cn(n, e, t) && (e = t = o), t = t === o ? Un : t >>> 0, t ? (n = W(n), n && (typeof e == "string" || e != null && !bi(e)) && (e = vn(e), !e && Re(n)) ? oe(Mn(n), 0, t) : n.split(e, t)) : [];
        }
        var md = Be(function(n, e, t) {
          return n + (t ? " " : "") + Ti(e);
        });
        function Ed(n, e, t) {
          return n = W(n), t = t == null ? 0 : ge(I(t), 0, n.length), e = vn(e), n.slice(t, t + e.length) == e;
        }
        function bd(n, e, t) {
          var r = u.templateSettings;
          t && cn(n, e, t) && (e = o), n = W(n), e = sr({}, e, r, xf);
          var i = sr({}, e.imports, r.imports, xf), f = nn(i), s = Wr(i, f), c, l, p = 0, v = e.interpolate || mt, w = "__p += '", x = Gr(
            (e.escape || mt).source + "|" + v.source + "|" + (v === Ni ? ts : mt).source + "|" + (e.evaluate || mt).source + "|$",
            "g"
          ), E = "//# sourceURL=" + (G.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Ms + "]") + `
`;
          n.replace(x, function(T, M, D, xn, an, An) {
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
            throw new R(Q);
          w = (l ? w.replace(Fo, "") : w).replace(Go, "$1").replace(No, "$1;"), w = "function(" + (O || "obj") + `) {
` + (O ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (l ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + w + `return __p
}`;
          var y = lo(function() {
            return U(f, E + "return " + w).apply(o, s);
          });
          if (y.source = w, Ei(y))
            throw y;
          return y;
        }
        function Sd(n) {
          return W(n).toLowerCase();
        }
        function Od(n) {
          return W(n).toUpperCase();
        }
        function Td(n, e, t) {
          if (n = W(n), n && (t || e === o))
            return xu(n);
          if (!n || !(e = vn(e)))
            return n;
          var r = Mn(n), i = Mn(e), f = Au(r, i), s = mu(r, i) + 1;
          return oe(r, f, s).join("");
        }
        function Rd(n, e, t) {
          if (n = W(n), n && (t || e === o))
            return n.slice(0, bu(n) + 1);
          if (!n || !(e = vn(e)))
            return n;
          var r = Mn(n), i = mu(r, Mn(e)) + 1;
          return oe(r, 0, i).join("");
        }
        function Cd(n, e, t) {
          if (n = W(n), n && (t || e === o))
            return n.replace(Er, "");
          if (!n || !(e = vn(e)))
            return n;
          var r = Mn(n), i = Au(r, Mn(e));
          return oe(r, i).join("");
        }
        function Id(n, e) {
          var t = Eo, r = bo;
          if (Z(e)) {
            var i = "separator" in e ? e.separator : i;
            t = "length" in e ? I(e.length) : t, r = "omission" in e ? vn(e.omission) : r;
          }
          n = W(n);
          var f = n.length;
          if (Re(n)) {
            var s = Mn(n);
            f = s.length;
          }
          if (t >= f)
            return n;
          var c = t - Ce(r);
          if (c < 1)
            return r;
          var l = s ? oe(s, 0, c).join("") : n.slice(0, c);
          if (i === o)
            return l + r;
          if (s && (c += l.length - c), bi(i)) {
            if (n.slice(c).search(i)) {
              var p, v = l;
              for (i.global || (i = Gr(i.source, W($i.exec(i)) + "g")), i.lastIndex = 0; p = i.exec(v); )
                var w = p.index;
              l = l.slice(0, w === o ? c : w);
            }
          } else if (n.indexOf(vn(i), c) != c) {
            var x = l.lastIndexOf(i);
            x > -1 && (l = l.slice(0, x));
          }
          return l + r;
        }
        function yd(n) {
          return n = W(n), n && $o.test(n) ? n.replace(Fi, uc) : n;
        }
        var Ld = Be(function(n, e, t) {
          return n + (t ? " " : "") + e.toUpperCase();
        }), Ti = hf("toUpperCase");
        function ao(n, e, t) {
          return n = W(n), e = t ? o : e, e === o ? nc(n) ? sc(n) : Ks(n) : n.match(e) || [];
        }
        var lo = L(function(n, e) {
          try {
            return _n(n, o, e);
          } catch (t) {
            return Ei(t) ? t : new R(t);
          }
        }), Md = Jn(function(n, e) {
          return En(e, function(t) {
            t = Gn(t), Zn(n, t, Ai(n[t], n));
          }), n;
        });
        function Pd(n) {
          var e = n == null ? 0 : n.length, t = S();
          return n = e ? q(n, function(r) {
            if (typeof r[1] != "function")
              throw new bn(K);
            return [t(r[0]), r[1]];
          }) : [], L(function(r) {
            for (var i = -1; ++i < e; ) {
              var f = n[i];
              if (_n(f[0], this, r))
                return _n(f[1], this, r);
            }
          });
        }
        function Dd(n) {
          return ua(On(n, jn));
        }
        function Ri(n) {
          return function() {
            return n;
          };
        }
        function Bd(n, e) {
          return n == null || n !== n ? e : n;
        }
        var Ud = df(), Wd = df(!0);
        function dn(n) {
          return n;
        }
        function Ci(n) {
          return zu(typeof n == "function" ? n : On(n, jn));
        }
        function Fd(n) {
          return Ku(On(n, jn));
        }
        function Gd(n, e) {
          return Zu(n, On(e, jn));
        }
        var Nd = L(function(n, e) {
          return function(t) {
            return ut(t, n, e);
          };
        }), $d = L(function(n, e) {
          return function(t) {
            return ut(n, t, e);
          };
        });
        function Ii(n, e, t) {
          var r = nn(e), i = zt(e, r);
          t == null && !(Z(e) && (i.length || !r.length)) && (t = e, e = n, n = this, i = zt(e, nn(e)));
          var f = !(Z(t) && "chain" in t) || !!t.chain, s = Qn(n);
          return En(i, function(c) {
            var l = e[c];
            n[c] = l, s && (n.prototype[c] = function() {
              var p = this.__chain__;
              if (f || p) {
                var v = n(this.__wrapped__), w = v.__actions__ = ln(this.__actions__);
                return w.push({ func: l, args: arguments, thisArg: n }), v.__chain__ = p, v;
              }
              return l.apply(n, ee([this.value()], arguments));
            });
          }), n;
        }
        function Hd() {
          return en._ === this && (en._ = dc), this;
        }
        function yi() {
        }
        function zd(n) {
          return n = I(n), L(function(e) {
            return Yu(e, n);
          });
        }
        var qd = oi(q), Kd = oi(du), Zd = oi(Mr);
        function ho(n) {
          return di(n) ? Pr(Gn(n)) : Ea(n);
        }
        function Yd(n) {
          return function(e) {
            return n == null ? o : de(n, e);
          };
        }
        var Jd = pf(), Xd = pf(!0);
        function Li() {
          return [];
        }
        function Mi() {
          return !1;
        }
        function Qd() {
          return {};
        }
        function Vd() {
          return "";
        }
        function kd() {
          return !0;
        }
        function jd(n, e) {
          if (n = I(n), n < 1 || n > Ee)
            return [];
          var t = Un, r = rn(n, Un);
          e = S(e), n -= Un;
          for (var i = Ur(r, e); ++t < n; )
            e(t);
          return i;
        }
        function n_(n) {
          return C(n) ? q(n, Gn) : wn(n) ? [n] : ln(Mf(W(n)));
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
          return n && n.length ? Ht(n, dn, Yr) : o;
        }
        function o_(n, e) {
          return n && n.length ? Ht(n, S(e, 2), Yr) : o;
        }
        function s_(n) {
          return vu(n, dn);
        }
        function c_(n, e) {
          return vu(n, S(e, 2));
        }
        function a_(n) {
          return n && n.length ? Ht(n, dn, Vr) : o;
        }
        function l_(n, e) {
          return n && n.length ? Ht(n, S(e, 2), Vr) : o;
        }
        var h_ = Xt(function(n, e) {
          return n * e;
        }, 1), g_ = si("round"), d_ = Xt(function(n, e) {
          return n - e;
        }, 0);
        function __(n) {
          return n && n.length ? Br(n, dn) : 0;
        }
        function p_(n, e) {
          return n && n.length ? Br(n, S(e, 2)) : 0;
        }
        return u.after = Fh, u.ary = zf, u.assign = Og, u.assignIn = ro, u.assignInWith = sr, u.assignWith = Tg, u.at = Rg, u.before = qf, u.bind = Ai, u.bindAll = Md, u.bindKey = Kf, u.castArray = Qh, u.chain = Nf, u.chunk = ul, u.compact = fl, u.concat = ol, u.cond = Pd, u.conforms = Dd, u.constant = Ri, u.countBy = _h, u.create = Cg, u.curry = Zf, u.curryRight = Yf, u.debounce = Jf, u.defaults = Ig, u.defaultsDeep = yg, u.defer = Gh, u.delay = Nh, u.difference = sl, u.differenceBy = cl, u.differenceWith = al, u.drop = ll, u.dropRight = hl, u.dropRightWhile = gl, u.dropWhile = dl, u.fill = _l, u.filter = vh, u.flatMap = Ah, u.flatMapDeep = mh, u.flatMapDepth = Eh, u.flatten = Uf, u.flattenDeep = pl, u.flattenDepth = vl, u.flip = $h, u.flow = Ud, u.flowRight = Wd, u.fromPairs = wl, u.functions = Wg, u.functionsIn = Fg, u.groupBy = bh, u.initial = Al, u.intersection = ml, u.intersectionBy = El, u.intersectionWith = bl, u.invert = Ng, u.invertBy = $g, u.invokeMap = Oh, u.iteratee = Ci, u.keyBy = Th, u.keys = nn, u.keysIn = gn, u.map = tr, u.mapKeys = zg, u.mapValues = qg, u.matches = Fd, u.matchesProperty = Gd, u.memoize = ir, u.merge = Kg, u.mergeWith = io, u.method = Nd, u.methodOf = $d, u.mixin = Ii, u.negate = ur, u.nthArg = zd, u.omit = Zg, u.omitBy = Yg, u.once = Hh, u.orderBy = Rh, u.over = qd, u.overArgs = zh, u.overEvery = Kd, u.overSome = Zd, u.partial = mi, u.partialRight = Xf, u.partition = Ch, u.pick = Jg, u.pickBy = uo, u.property = ho, u.propertyOf = Yd, u.pull = Rl, u.pullAll = Ff, u.pullAllBy = Cl, u.pullAllWith = Il, u.pullAt = yl, u.range = Jd, u.rangeRight = Xd, u.rearg = qh, u.reject = Lh, u.remove = Ll, u.rest = Kh, u.reverse = wi, u.sampleSize = Ph, u.set = Qg, u.setWith = Vg, u.shuffle = Dh, u.slice = Ml, u.sortBy = Wh, u.sortedUniq = Gl, u.sortedUniqBy = Nl, u.split = Ad, u.spread = Zh, u.tail = $l, u.take = Hl, u.takeRight = zl, u.takeRightWhile = ql, u.takeWhile = Kl, u.tap = fh, u.throttle = Yh, u.thru = er, u.toArray = no, u.toPairs = fo, u.toPairsIn = oo, u.toPath = n_, u.toPlainObject = to, u.transform = kg, u.unary = Jh, u.union = Zl, u.unionBy = Yl, u.unionWith = Jl, u.uniq = Xl, u.uniqBy = Ql, u.uniqWith = Vl, u.unset = jg, u.unzip = xi, u.unzipWith = Gf, u.update = nd, u.updateWith = ed, u.values = Fe, u.valuesIn = td, u.without = kl, u.words = ao, u.wrap = Xh, u.xor = jl, u.xorBy = nh, u.xorWith = eh, u.zip = th, u.zipObject = rh, u.zipObjectDeep = ih, u.zipWith = uh, u.entries = fo, u.entriesIn = oo, u.extend = ro, u.extendWith = sr, Ii(u, u), u.add = t_, u.attempt = lo, u.camelCase = fd, u.capitalize = so, u.ceil = r_, u.clamp = rd, u.clone = Vh, u.cloneDeep = jh, u.cloneDeepWith = ng, u.cloneWith = kh, u.conformsTo = eg, u.deburr = co, u.defaultTo = Bd, u.divide = i_, u.endsWith = od, u.eq = Dn, u.escape = sd, u.escapeRegExp = cd, u.every = ph, u.find = wh, u.findIndex = Df, u.findKey = Lg, u.findLast = xh, u.findLastIndex = Bf, u.findLastKey = Mg, u.floor = u_, u.forEach = $f, u.forEachRight = Hf, u.forIn = Pg, u.forInRight = Dg, u.forOwn = Bg, u.forOwnRight = Ug, u.get = Si, u.gt = tg, u.gte = rg, u.has = Gg, u.hasIn = Oi, u.head = Wf, u.identity = dn, u.includes = Sh, u.indexOf = xl, u.inRange = id, u.invoke = Hg, u.isArguments = ve, u.isArray = C, u.isArrayBuffer = ig, u.isArrayLike = hn, u.isArrayLikeObject = J, u.isBoolean = ug, u.isBuffer = se, u.isDate = fg, u.isElement = og, u.isEmpty = sg, u.isEqual = cg, u.isEqualWith = ag, u.isError = Ei, u.isFinite = lg, u.isFunction = Qn, u.isInteger = Qf, u.isLength = fr, u.isMap = Vf, u.isMatch = hg, u.isMatchWith = gg, u.isNaN = dg, u.isNative = _g, u.isNil = vg, u.isNull = pg, u.isNumber = kf, u.isObject = Z, u.isObjectLike = Y, u.isPlainObject = lt, u.isRegExp = bi, u.isSafeInteger = wg, u.isSet = jf, u.isString = or, u.isSymbol = wn, u.isTypedArray = We, u.isUndefined = xg, u.isWeakMap = Ag, u.isWeakSet = mg, u.join = Sl, u.kebabCase = ad, u.last = Rn, u.lastIndexOf = Ol, u.lowerCase = ld, u.lowerFirst = hd, u.lt = Eg, u.lte = bg, u.max = f_, u.maxBy = o_, u.mean = s_, u.meanBy = c_, u.min = a_, u.minBy = l_, u.stubArray = Li, u.stubFalse = Mi, u.stubObject = Qd, u.stubString = Vd, u.stubTrue = kd, u.multiply = h_, u.nth = Tl, u.noConflict = Hd, u.noop = yi, u.now = rr, u.pad = gd, u.padEnd = dd, u.padStart = _d, u.parseInt = pd, u.random = ud, u.reduce = Ih, u.reduceRight = yh, u.repeat = vd, u.replace = wd, u.result = Xg, u.round = g_, u.runInContext = a, u.sample = Mh, u.size = Bh, u.snakeCase = xd, u.some = Uh, u.sortedIndex = Pl, u.sortedIndexBy = Dl, u.sortedIndexOf = Bl, u.sortedLastIndex = Ul, u.sortedLastIndexBy = Wl, u.sortedLastIndexOf = Fl, u.startCase = md, u.startsWith = Ed, u.subtract = d_, u.sum = __, u.sumBy = p_, u.template = bd, u.times = jd, u.toFinite = Vn, u.toInteger = I, u.toLength = eo, u.toLower = Sd, u.toNumber = Cn, u.toSafeInteger = Sg, u.toString = W, u.toUpper = Od, u.trim = Td, u.trimEnd = Rd, u.trimStart = Cd, u.truncate = Id, u.unescape = yd, u.uniqueId = e_, u.upperCase = Ld, u.upperFirst = Ti, u.each = $f, u.eachRight = Hf, u.first = Wf, Ii(u, function() {
          var n = {};
          return Wn(u, function(e, t) {
            G.call(u.prototype, t) || (n[t] = e);
          }), n;
        }(), { chain: !1 }), u.VERSION = m, En(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
          u[n].placeholder = u;
        }), En(["drop", "take"], function(n, e) {
          P.prototype[n] = function(t) {
            t = t === o ? 1 : j(I(t), 0);
            var r = this.__filtered__ && !e ? new P(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = rn(t, r.__takeCount__) : r.__views__.push({
              size: rn(t, Un),
              type: n + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, P.prototype[n + "Right"] = function(t) {
            return this.reverse()[n](t).reverse();
          };
        }), En(["filter", "map", "takeWhile"], function(n, e) {
          var t = e + 1, r = t == Bi || t == Ro;
          P.prototype[n] = function(i) {
            var f = this.clone();
            return f.__iteratees__.push({
              iteratee: S(i, 3),
              type: t
            }), f.__filtered__ = f.__filtered__ || r, f;
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
          return this.filter(dn);
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
          return t.__filtered__ && (n > 0 || e < 0) ? new P(t) : (n < 0 ? t = t.takeRight(-n) : n && (t = t.drop(n)), e !== o && (e = I(e), t = e < 0 ? t.dropRight(-e) : t.take(e - n)), t);
        }, P.prototype.takeRightWhile = function(n) {
          return this.reverse().takeWhile(n).reverse();
        }, P.prototype.toArray = function() {
          return this.take(Un);
        }, Wn(P.prototype, function(n, e) {
          var t = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), i = u[r ? "take" + (e == "last" ? "Right" : "") : e], f = r || /^find/.test(e);
          i && (u.prototype[e] = function() {
            var s = this.__wrapped__, c = r ? [1] : arguments, l = s instanceof P, p = c[0], v = l || C(s), w = function(M) {
              var D = i.apply(u, ee([M], c));
              return r && x ? D[0] : D;
            };
            v && t && typeof p == "function" && p.length != 1 && (l = v = !1);
            var x = this.__chain__, E = !!this.__actions__.length, O = f && !x, y = l && !E;
            if (!f && v) {
              s = y ? s : new P(this);
              var T = n.apply(s, c);
              return T.__actions__.push({ func: er, args: [w], thisArg: o }), new Sn(T, x);
            }
            return O && y ? n.apply(this, c) : (T = this.thru(w), O ? r ? T.value()[0] : T.value() : T);
          });
        }), En(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
          var e = Rt[n], t = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n);
          u.prototype[n] = function() {
            var i = arguments;
            if (r && !this.__chain__) {
              var f = this.value();
              return e.apply(C(f) ? f : [], i);
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
        }), Me[Jt(o, me).name] = [{
          name: "wrapper",
          func: o
        }], P.prototype.clone = yc, P.prototype.reverse = Lc, P.prototype.value = Mc, u.prototype.at = oh, u.prototype.chain = sh, u.prototype.commit = ch, u.prototype.next = ah, u.prototype.plant = hh, u.prototype.reverse = gh, u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = dh, u.prototype.first = u.prototype.head, ke && (u.prototype[ke] = lh), u;
      }, Ie = cc();
      ce ? ((ce.exports = Ie)._ = Ie, Cr._ = Ie) : en._ = Ie;
    }).call(L_);
  }(gt, gt.exports)), gt.exports;
}
var P_ = M_();
const Ge = F.define({
  description: "Updates an existing object.",
  execute: (g, { engine: d, registered: o }) => {
    const m = o.get(g.id);
    if (!m) throw new Error("Object not found.");
    o.set(g.id, P_.merge(m, g));
    const b = o.get(g.id);
    d.scene.UpdateSceneObject({
      ...g,
      id: b.id,
      entityType: b.entityType
    });
  }
});
N("UPDATE_OBJECT", Ge);
const mo = F.define({
  description: "Attach an object to another object.",
  execute: (g, { engine: d, registered: o }) => {
    const m = o.get(g.object.id);
    if (!m) throw new Error("Object not found.");
    const b = d.scene.GetSceneObject(m);
    if (!b) throw new Error("Object not found in scene.");
    if (g.parent === null)
      throw d.scene.Root.attach(b), new Ge(
        {
          id: m.id,
          parentId: null
        },
        { engine: d, registered: o }
      ), new Error("Object not found in scene.");
    if (g.object.id === g.parent.id)
      throw new Error("Cannot attach object to itself.");
    const B = o.get(g.parent.id);
    if (!B)
      throw d.scene.Root.attach(b), new Ge(
        {
          id: m.id,
          parentId: null
        },
        { engine: d, registered: o }
      ), new Error("Parent object not found.");
    const K = d.scene.GetSceneObject(B);
    if (!K)
      throw d.scene.Root.attach(b), new Ge(
        {
          id: m.id,
          parentId: null
        },
        { engine: d, registered: o }
      ), new Error("Parent object not found in scene.");
    K.attach(b), new Ge(
      {
        id: m.id,
        parentId: B.id
      },
      { engine: d, registered: o }
    );
  }
});
N("SET_PARENT", mo);
const D_ = F.define({
  description: "Deletes an object from the scene.",
  execute: (g, { engine: d, registered: o }) => {
    const m = o.get(g.id);
    if (!m) return !1;
    m.parentId && new mo(
      {
        object: { id: m.id },
        parent: null
      },
      {
        engine: d,
        registered: o
      }
    ).execute(), m.entityType === "group" && o.forEach((b) => {
      b.parentId === m.id && new Ge(
        {
          id: b.id,
          parentId: null
        },
        {
          engine: d,
          registered: o
        }
      ).execute();
    }), Object.assign(g, m), o.delete(g.id), d.scene.DeleteSceneObject(m);
  }
});
N("DELETE_OBJECT", D_);
const B_ = F.define({
  description: "Deselects an existing object.",
  execute: async (g, { engine: d, getToolbox: o, registered: m }) => {
    const b = m.get(g.id);
    if (!b) throw new Error("Object not found.");
    const B = d.scene.GetSceneObject(b);
    if (!B) throw new Error("Object not found in scene.");
    if (!("isSelectable" in B))
      throw new Error("Object is not selectable.");
    const Q = (await o()).GetActiveTool();
    Q && wo(Q) && Q.DetachGizmo();
  }
});
N("DESELECT_OBJECT", B_);
const U_ = F.define({
  description: "Places an object on top of an underlying object or the floor.",
  execute: (g, { engine: d, registered: o }) => {
    const m = o.get(g.id);
    if (!m)
      throw new Error(
        `Object with id ${g.id} not registered. Registered: ${o}`
      );
    const b = d.scene.GetSceneObject(m);
    if (!b)
      throw new Error(
        `Object with id ${g.id} is not found in the scene. Scene: ${d.scene}`
      );
    b.DropIt();
  }
});
N("DROP_IT", U_);
const W_ = F.define({
  description: "Retrieves all objects in the state.",
  execute: (g, { registered: d }) => d
});
N("GET_ALL_OBJECTS", W_);
const F_ = F.define({
  description: "Returns a list of objects of given IDs.",
  execute: (g, { registered: d }) => g.ids.length === 0 ? [] : Array.from(d.values()).filter(
    (o) => g.ids.includes(o.id)
  )
});
N("GET_OBJECTS", F_);
const G_ = F.define({
  description: "Is triggered when a model is loaded.",
  execute: (g, { registered: d }) => {
    const o = d.get(g.id);
    if (!o)
      throw new Error(`Model with id ${g.id} not found`);
    if (!S_(o))
      throw new Error(`Model with id ${g.id} is not a COMModel`);
    o.loaded = !0;
  }
});
N("MODEL_LOADED", G_);
const N_ = F.define({
  description: "Places an object on the floor.",
  execute: (g, { engine: d, registered: o }) => {
    const m = o.get(g.id);
    if (!m)
      throw new Error(
        `Object with id ${g.id} not registered. Registered: ${o}`
      );
    const b = d.scene.GetSceneObject(m);
    if (!b)
      throw new Error(
        `Object with id ${g.id} is not found in the scene. Scene: ${d.scene}`
      );
    b.PlaceOnFloor();
  }
});
N("PLACE_ON_FLOOR", N_);
const $_ = F.define({
  description: "Selects an existing object.",
  execute: async (g, { engine: d, getToolbox: o, registered: m }) => {
    const b = m.get(g.id);
    if (!b) throw new Error("Object not found.");
    const B = d.scene.GetSceneObject(b);
    if (!B) throw new Error("Object not found in scene.");
    if (!("isSelectable" in B))
      throw new Error("Object is not selectable.");
    const Q = (await o()).GetActiveTool();
    Q && wo(Q) && Q.AttachGizmo(B);
  }
});
N("SELECT_OBJECT", $_);
const H_ = F.define({
  description: "Starts the render process.",
  execute: (g, { engine: d }) => {
    d.start();
  }
});
N("START_RENDER", H_);
const z_ = F.define({
  description: "Exports the current scene to a blob and returns the URL.",
  execute: async (g, { engine: d, getAssetExporter: o }) => o().then((m) => m.export(d.scene.Root, g.type))
});
N("EXPORT_SCENE", z_);
const q_ = F.define({
  description: "Retrieves all current scene data.",
  execute: (g, { engine: d, controller: o, registered: m }) => ({
    name: d.scene.name,
    mediaItem: null,
    backgroundColor: "#" + d.scene.background.getHexString(),
    floorEnabled: d.scene.Root.floor.visible,
    floorColor: "#" + d.scene.Root.floor.material.color.getHexString(),
    userCamera: {
      position: o.object.position.clone(),
      target: o.target.clone()
    },
    spotmarks: [],
    lights: Array.from(m.values()).filter(
      (b) => b.entityType === "light"
    ),
    objects: Array.from(m.values()).filter(
      (b) => b.entityType === "model"
    ),
    cameras: Array.from(m.values()).filter(
      (b) => b.entityType === "pov"
    ),
    primitives: Array.from(m.values()).filter(
      (b) => b.entityType === "primitive"
    ),
    groups: Array.from(m.values()).filter(
      (b) => b.entityType === "group"
    )
  })
});
N("GET_ALL_SCENE_DATA", q_);
const K_ = F.define({
  description: "Set the background color of the scene.",
  execute: (g, { engine: d }) => {
    d.scene.SetBackground(g.color);
  }
});
N("SET_BACKGROUND", K_);
const Z_ = F.define({
  description: "Updates scene properties.",
  execute: (g, { engine: d }) => {
    g.name !== void 0 && (d.scene.name = g.name), g.backgroundColor !== void 0 && d.scene.SetBackground(g.backgroundColor), g.gridEnabled !== void 0 && d.scene.Grid.SetVisibility(g.gridEnabled), g.floorEnabled !== void 0 && d.scene.Root.floor.SetVisibility(g.floorEnabled), g.floorColor !== void 0 && d.scene.Root.floor.SetColor(g.floorColor), g.name = d.scene.name, g.backgroundColor = "#" + d.scene.background.getHexString(), g.gridEnabled = d.scene.Grid.visible, g.floorEnabled = d.scene.Root.floor.visible, g.floorColor = "#" + d.scene.Root.floor.material.color.getHexString();
  }
});
N("UPDATE_SCENE", Z_);
const Y_ = F.define({
  description: "Sets the gizmo's mode.",
  execute: async (g, { getToolbox: d }) => {
    (await d()).SetGizmoMode(g.mode);
  }
});
N("SET_GIZMO_MODE", Y_);
const J_ = F.define({
  description: "Sets the gizmo's unified scale mode.",
  execute: async (g, { getToolbox: d }) => {
    (await d()).SetGizmoScaleLinked(g);
  }
});
N("SET_GIZMO_SCALE_LINKED", J_);
const X_ = F.define({
  description: "Sets the gizmo's visibility.",
  execute: async (g, { getToolbox: d }) => {
    (await d()).SetGizmoVisibility(g);
  }
});
N("SET_GIZMO_VISIBILITY", X_);
const Q_ = F.define({
  description: "Activates a specific tool from the toolbox.",
  execute: async (g, { getToolbox: d }) => {
    (await d()).UseTool(g.tool);
  }
});
N("USE_TOOL", Q_);
const Ne = class Ne {
  constructor(d, o) {
    fn(this, "_id");
    fn(this, "engine");
    fn(this, "controller");
    // modules
    fn(this, "_mediaCreator", null);
    fn(this, "_arSystem", null);
    fn(this, "_assetExplorer", null);
    fn(this, "_animationSystem", null);
    fn(this, "_toolbox", null);
    // registered entities
    fn(this, "registered", /* @__PURE__ */ new Map());
    fn(this, "listeners", /* @__PURE__ */ new Map());
    this._id = x_(), this.engine = d, this.controller = o, Ne.__instances.push(this);
  }
  static get(d) {
    const o = this.__instances.find(
      (m) => m.id === d
    );
    return o || this.__instances.find(
      (m) => Array.from(m.registered.values()).find(
        (b) => b.id === d
      )
    );
  }
  get id() {
    return this._id;
  }
  async getMediaCreator() {
    return this._mediaCreator || (this._mediaCreator = new (await ht("MediaCreator"))(
      this.engine.renderer,
      this.engine.scene,
      this.controller
    )), this._mediaCreator;
  }
  async getARSystem() {
    return this._arSystem || (this._arSystem = new (await ht("ARSystem"))()), this._arSystem;
  }
  async getAssetExporter() {
    return this._assetExplorer || (this._assetExplorer = new (await ht("AssetExporter"))()), this._assetExplorer;
  }
  async getAnimationSystem() {
    return this._animationSystem || (this._animationSystem = new (await ht("AnimationSystem"))()), this._animationSystem;
  }
  async getToolbox() {
    return this._toolbox || (this._toolbox = new (await ht("Toolbox"))(
      this.engine.scene,
      this.controller
    )), this._toolbox;
  }
  destroyInstance() {
    const d = Ne.__instances.findIndex(
      (o) => o.id === this.id
    );
    return d === -1 ? !1 : (Ne.__instances.splice(d, 1), !0);
  }
  performAction(d, ...o) {
    const m = A_(d);
    if (!m)
      throw new Error(`Action ${d} is not defined.`);
    const b = this.getDependencies(), B = o[0], K = new m(B, b);
    try {
      const Q = K.execute();
      return Q && typeof Q == "object" && "then" in Q ? Q.then((V) => (this.dispatch(d, B), V)).catch((V) => {
        throw new Error(`Failed to execute ${d}`, {
          cause: V
        });
      }) : (this.dispatch(d, B), Q);
    } catch (Q) {
      throw new Error(`Failed to execute ${d}`, { cause: Q });
    }
  }
  subscribe(d, o) {
    return this.listeners.get(d) || this.listeners.set(d, []), this.listeners.get(d).push(o), () => {
      const m = this.listeners.get(d);
      if (!m) return;
      const b = m.findIndex(
        (B) => B === o
      );
      b !== -1 && m.splice(b, 1);
    };
  }
  dispatch(d, o) {
    const m = this.listeners.get(d);
    m && m.forEach((b) => b(o));
  }
  getDependencies() {
    return {
      registered: this.registered,
      engine: this.engine,
      controller: this.controller,
      getARSystem: () => this.getARSystem(),
      getAssetExporter: () => this.getAssetExporter(),
      getAnimationSystem: () => this.getAnimationSystem(),
      getMediaCreator: () => this.getMediaCreator(),
      getToolbox: () => this.getToolbox()
    };
  }
};
fn(Ne, "__instances", []);
let vo = Ne;
export {
  y_ as AddObjectAction,
  E_ as ComputeEncompassingViewAction,
  D_ as DeleteObjectAction,
  B_ as DeselectObjectAction,
  U_ as DropItAction,
  z_ as ExportSceneAction,
  I_ as GenerateMediaAction,
  W_ as GetAllObjectsAction,
  q_ as GetAllSceneDataAction,
  b_ as GetCameraTransformAction,
  F_ as GetObjectsAction,
  m_ as LaunchARAction,
  G_ as ModelLoadedAction,
  O_ as MoveCameraAction,
  N_ as PlaceOnFloorAction,
  $_ as SelectObjectAction,
  K_ as SetBackgroundAction,
  T_ as SetCameraLayerAction,
  R_ as SetCameraTransformAction,
  Y_ as SetGizmoModeAction,
  J_ as SetGizmoScaleLinkedAction,
  X_ as SetGizmoVisibilityAction,
  mo as SetParentAction,
  H_ as StartRenderAction,
  vo as State,
  Ge as UpdateObjectAction,
  Z_ as UpdateSceneAction,
  Q_ as UseToolAction,
  C_ as ZoomCameraAction,
  A_ as getActionClass,
  rp as isCOMGroup,
  tp as isCOMLight,
  S_ as isCOMModel,
  Ao as isCOMPov,
  ep as isCOMPrimitive,
  N as registerAction
};
