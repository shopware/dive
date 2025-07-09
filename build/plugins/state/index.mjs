var _d = Object.defineProperty;
var dd = (d, g, o) => g in d ? _d(d, g, { enumerable: !0, configurable: !0, writable: !0, value: o }) : d[g] = o;
var fn = (d, g, o) => dd(d, typeof g != "symbol" ? g + "" : g, o);
import { g as pd } from "../../chunks/MathUtils-CFGjHuVF.mjs";
import { B as vd } from "../../chunks/OrbitController-BQ6SV1O_.mjs";
import "../../chunks/FileTypes-rkWpMg2n.mjs";
import "three";
import { a as _o, i as wd } from "../../chunks/PovSchema-DWWvr_ED.mjs";
import { i as po } from "../../chunks/SelectTool-7pU-VXgr.mjs";
const vo = {};
function N(d, g) {
  vo[d] = g;
}
function xd(d) {
  return vo[d];
}
class U {
  constructor(g, o) {
    fn(this, "_payload");
    fn(this, "_dependencies");
    this._payload = g, this._dependencies = o;
  }
  /**
   * Factory method to create a new Action class with the specified description and execution logic.
   *
   * @template P - The type of the payload (use void for actions without payload)
   * @template D - The type of dependencies
   * @template R - The return type of the action
   * @param options - Configuration options for the action
   * @param options.description - A description of what the action does
   * @param options.execute - The function that implements the action's logic
   * @returns A new Action class that can be instantiated with payload and dependencies
   */
  static define({
    description: g,
    execute: o
  }) {
    return class extends U {
      constructor(E, $) {
        super(E, $);
        fn(this, "_description", g);
        fn(this, "_payload");
        this._payload = E;
      }
      execute() {
        return o(this._payload, this._dependencies);
      }
    };
  }
}
const Ad = U.define({
  description: "Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer)",
  execute: async (d, { getARSystem: g }) => g().then((o) => {
    o.launch(d.uri, d.options);
  })
});
N("LAUNCH_AR", Ad);
const Ed = U.define({
  description: "Calculates the camera position and target to view the whole scene. (experimental).",
  execute: (d, { engine: g, controller: o }) => {
    const S = new vd(g.scene.root, !1, 65280);
    return o.computeEncompassingView(S);
  }
});
N(
  "COMPUTE_ENCOMPASSING_VIEW",
  Ed
);
const md = U.define({
  description: "Gets the current camera position and target.",
  execute: (d, { controller: g }) => ({
    position: g.object.position.clone(),
    target: g.target.clone()
  })
});
N(
  "GET_CAMERA_TRANSFORM",
  md
);
const Sd = U.define({
  description: "Moves the camera to a new position and target.",
  execute: async (d, { controller: g, registered: o, getAnimationSystem: S, engine: E }) => {
    let $ = { x: 0, y: 0, z: 0 }, z = { x: 0, y: 0, z: 0 };
    if ("id" in d) {
      const Y = o.get(d.id);
      if (!Y)
        throw new Error(
          `POV with id ${d.id} not registered. Registered: ${o}`
        );
      if (!_o(Y))
        throw new Error(
          `Object with id ${d.id} is not a POV. Object: ${Y}`
        );
      $ = Y.position, z = Y.target;
    } else
      $ = d.position, z = d.target;
    const X = await S().then(
      (Y) => {
        E.clock.hasTicker(Y) || E.clock.addTicker(Y), g.enabled = !0;
        const sr = Y.animate(
          g.object.position,
          $,
          d.duration,
          {
            easing: Y.TWEEN.Easing.Quadratic.Out
          }
        ).play(), ve = Y.animate(g.target, z, d.duration, {
          easing: Y.TWEEN.Easing.Quadratic.Out,
          onUpdate: () => {
            g.object.lookAt(g.target);
          },
          onComplete: () => {
            g.enabled = !d.locked;
          }
        }).play();
        return [
          sr,
          ve
        ];
      }
    );
    return {
      stop: () => X.forEach((Y) => Y.stop())
    };
  }
});
N("MOVE_CAMERA", Sd);
const bd = U.define({
  description: "Sets the camera layer to a certain layer.",
  execute: (d, { controller: g }) => {
    g.object.setCameraLayer(d.layer);
  }
});
N("SET_CAMERA_LAYER", bd);
const Od = U.define({
  description: "Sets the camera position and target.",
  execute: (d, { controller: g }) => {
    g.object.position.copy(d.position), g.target.copy(d.target), g.update();
  }
});
N(
  "SET_CAMERA_TRANSFORM",
  Od
);
const Td = U.define({
  description: "Zooms the camera in or out by a certain amount.",
  execute: (d, { controller: g }) => {
    d.direction === "IN" && g.zoomIn(d.by), d.direction === "OUT" && g.zoomOut(d.by);
  }
});
N("ZOOM_CAMERA", Td);
const Id = U.define({
  description: "Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI.",
  execute: async (d, { registered: g, getMediaCreator: o }) => {
    const S = await o();
    if ("id" in d) {
      const E = g.get(d.id);
      if (!E)
        throw new Error(
          `Object with id ${d.id} not registered. Registered: ${g}`
        );
      if (!_o(E))
        throw new Error(
          `Object with id ${d.id} is not a POV. Object: ${E}`
        );
      const { resolution: $ } = d, { position: z, target: X } = E;
      return S.generateMedia({
        position: z,
        target: X,
        resolution: $
      });
    }
    return S.generateMedia(d);
  }
});
N("GENERATE_MEDIA", Id);
const Cd = U.define({
  description: "Adds an object to the scene.",
  execute: (d, { engine: g, registered: o }) => {
    o.get(d.id) || (d.parentId === void 0 && (d.parentId = null), o.set(d.id, d), g.scene.root.addSceneObject(d));
  }
});
N("ADD_OBJECT", Cd);
var or = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, at = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var Rd = at.exports, ho;
function yd() {
  return ho || (ho = 1, function(d, g) {
    (function() {
      var o, S = "4.17.21", E = 200, $ = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", z = "Expected a function", X = "Invalid `variable` option passed into `_.template`", Y = "__lodash_hash_undefined__", sr = 500, ve = "__lodash_placeholder__", kn = 1, Li = 2, we = 4, xe = 1, ht = 2, Cn = 1, Ae = 2, Mi = 4, Nn = 8, Ge = 16, Gn = 32, $e = 64, $n = 128, He = 256, cr = 512, xo = 30, Ao = "...", Eo = 800, mo = 16, Di = 1, So = 2, bo = 3, gt = 1 / 0, Ee = 9007199254740991, Oo = 17976931348623157e292, _t = NaN, Bn = 4294967295, To = Bn - 1, Io = Bn >>> 1, Co = [
        ["ary", $n],
        ["bind", Cn],
        ["bindKey", Ae],
        ["curry", Nn],
        ["curryRight", Ge],
        ["flip", cr],
        ["partial", Gn],
        ["partialRight", $e],
        ["rearg", He]
      ], me = "[object Arguments]", dt = "[object Array]", Ro = "[object AsyncFunction]", ze = "[object Boolean]", qe = "[object Date]", yo = "[object DOMException]", pt = "[object Error]", vt = "[object Function]", Pi = "[object GeneratorFunction]", Rn = "[object Map]", Ke = "[object Number]", Lo = "[object Null]", Hn = "[object Object]", Bi = "[object Promise]", Mo = "[object Proxy]", Ze = "[object RegExp]", yn = "[object Set]", Ye = "[object String]", wt = "[object Symbol]", Do = "[object Undefined]", Je = "[object WeakMap]", Po = "[object WeakSet]", Xe = "[object ArrayBuffer]", Se = "[object DataView]", lr = "[object Float32Array]", ar = "[object Float64Array]", hr = "[object Int8Array]", gr = "[object Int16Array]", _r = "[object Int32Array]", dr = "[object Uint8Array]", pr = "[object Uint8ClampedArray]", vr = "[object Uint16Array]", wr = "[object Uint32Array]", Bo = /\b__p \+= '';/g, Wo = /\b(__p \+=) '' \+/g, Uo = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Wi = /&(?:amp|lt|gt|quot|#39);/g, Ui = /[&<>"']/g, Fo = RegExp(Wi.source), No = RegExp(Ui.source), Go = /<%-([\s\S]+?)%>/g, $o = /<%([\s\S]+?)%>/g, Fi = /<%=([\s\S]+?)%>/g, Ho = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zo = /^\w*$/, qo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xr = /[\\^$.*+?()[\]{}|]/g, Ko = RegExp(xr.source), Ar = /^\s+/, Zo = /\s/, Yo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Jo = /\{\n\/\* \[wrapped with (.+)\] \*/, Xo = /,? & /, Qo = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Vo = /[()=,{}\[\]\/\s]/, ko = /\\(\\)?/g, jo = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ni = /\w*$/, ns = /^[-+]0x[0-9a-f]+$/i, es = /^0b[01]+$/i, ts = /^\[object .+?Constructor\]$/, rs = /^0o[0-7]+$/i, is = /^(?:0|[1-9]\d*)$/, us = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, xt = /($^)/, fs = /['\n\r\u2028\u2029\\]/g, At = "\\ud800-\\udfff", os = "\\u0300-\\u036f", ss = "\\ufe20-\\ufe2f", cs = "\\u20d0-\\u20ff", Gi = os + ss + cs, $i = "\\u2700-\\u27bf", Hi = "a-z\\xdf-\\xf6\\xf8-\\xff", ls = "\\xac\\xb1\\xd7\\xf7", as = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", hs = "\\u2000-\\u206f", gs = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", zi = "A-Z\\xc0-\\xd6\\xd8-\\xde", qi = "\\ufe0e\\ufe0f", Ki = ls + as + hs + gs, Er = "['’]", _s = "[" + At + "]", Zi = "[" + Ki + "]", Et = "[" + Gi + "]", Yi = "\\d+", ds = "[" + $i + "]", Ji = "[" + Hi + "]", Xi = "[^" + At + Ki + Yi + $i + Hi + zi + "]", mr = "\\ud83c[\\udffb-\\udfff]", ps = "(?:" + Et + "|" + mr + ")", Qi = "[^" + At + "]", Sr = "(?:\\ud83c[\\udde6-\\uddff]){2}", br = "[\\ud800-\\udbff][\\udc00-\\udfff]", be = "[" + zi + "]", Vi = "\\u200d", ki = "(?:" + Ji + "|" + Xi + ")", vs = "(?:" + be + "|" + Xi + ")", ji = "(?:" + Er + "(?:d|ll|m|re|s|t|ve))?", nu = "(?:" + Er + "(?:D|LL|M|RE|S|T|VE))?", eu = ps + "?", tu = "[" + qi + "]?", ws = "(?:" + Vi + "(?:" + [Qi, Sr, br].join("|") + ")" + tu + eu + ")*", xs = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", As = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ru = tu + eu + ws, Es = "(?:" + [ds, Sr, br].join("|") + ")" + ru, ms = "(?:" + [Qi + Et + "?", Et, Sr, br, _s].join("|") + ")", Ss = RegExp(Er, "g"), bs = RegExp(Et, "g"), Or = RegExp(mr + "(?=" + mr + ")|" + ms + ru, "g"), Os = RegExp([
        be + "?" + Ji + "+" + ji + "(?=" + [Zi, be, "$"].join("|") + ")",
        vs + "+" + nu + "(?=" + [Zi, be + ki, "$"].join("|") + ")",
        be + "?" + ki + "+" + ji,
        be + "+" + nu,
        As,
        xs,
        Yi,
        Es
      ].join("|"), "g"), Ts = RegExp("[" + Vi + At + Gi + qi + "]"), Is = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Cs = [
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
      ], Rs = -1, q = {};
      q[lr] = q[ar] = q[hr] = q[gr] = q[_r] = q[dr] = q[pr] = q[vr] = q[wr] = !0, q[me] = q[dt] = q[Xe] = q[ze] = q[Se] = q[qe] = q[pt] = q[vt] = q[Rn] = q[Ke] = q[Hn] = q[Ze] = q[yn] = q[Ye] = q[Je] = !1;
      var H = {};
      H[me] = H[dt] = H[Xe] = H[Se] = H[ze] = H[qe] = H[lr] = H[ar] = H[hr] = H[gr] = H[_r] = H[Rn] = H[Ke] = H[Hn] = H[Ze] = H[yn] = H[Ye] = H[wt] = H[dr] = H[pr] = H[vr] = H[wr] = !0, H[pt] = H[vt] = H[Je] = !1;
      var ys = {
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
      }, Ls = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, Ms = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, Ds = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, Ps = parseFloat, Bs = parseInt, iu = typeof or == "object" && or && or.Object === Object && or, Ws = typeof self == "object" && self && self.Object === Object && self, en = iu || Ws || Function("return this")(), Tr = g && !g.nodeType && g, se = Tr && !0 && d && !d.nodeType && d, uu = se && se.exports === Tr, Ir = uu && iu.process, An = function() {
        try {
          var l = se && se.require && se.require("util").types;
          return l || Ir && Ir.binding && Ir.binding("util");
        } catch {
        }
      }(), fu = An && An.isArrayBuffer, ou = An && An.isDate, su = An && An.isMap, cu = An && An.isRegExp, lu = An && An.isSet, au = An && An.isTypedArray;
      function _n(l, _, h) {
        switch (h.length) {
          case 0:
            return l.call(_);
          case 1:
            return l.call(_, h[0]);
          case 2:
            return l.call(_, h[0], h[1]);
          case 3:
            return l.call(_, h[0], h[1], h[2]);
        }
        return l.apply(_, h);
      }
      function Us(l, _, h, A) {
        for (var I = -1, B = l == null ? 0 : l.length; ++I < B; ) {
          var k = l[I];
          _(A, k, h(k), l);
        }
        return A;
      }
      function En(l, _) {
        for (var h = -1, A = l == null ? 0 : l.length; ++h < A && _(l[h], h, l) !== !1; )
          ;
        return l;
      }
      function Fs(l, _) {
        for (var h = l == null ? 0 : l.length; h-- && _(l[h], h, l) !== !1; )
          ;
        return l;
      }
      function hu(l, _) {
        for (var h = -1, A = l == null ? 0 : l.length; ++h < A; )
          if (!_(l[h], h, l))
            return !1;
        return !0;
      }
      function jn(l, _) {
        for (var h = -1, A = l == null ? 0 : l.length, I = 0, B = []; ++h < A; ) {
          var k = l[h];
          _(k, h, l) && (B[I++] = k);
        }
        return B;
      }
      function mt(l, _) {
        var h = l == null ? 0 : l.length;
        return !!h && Oe(l, _, 0) > -1;
      }
      function Cr(l, _, h) {
        for (var A = -1, I = l == null ? 0 : l.length; ++A < I; )
          if (h(_, l[A]))
            return !0;
        return !1;
      }
      function K(l, _) {
        for (var h = -1, A = l == null ? 0 : l.length, I = Array(A); ++h < A; )
          I[h] = _(l[h], h, l);
        return I;
      }
      function ne(l, _) {
        for (var h = -1, A = _.length, I = l.length; ++h < A; )
          l[I + h] = _[h];
        return l;
      }
      function Rr(l, _, h, A) {
        var I = -1, B = l == null ? 0 : l.length;
        for (A && B && (h = l[++I]); ++I < B; )
          h = _(h, l[I], I, l);
        return h;
      }
      function Ns(l, _, h, A) {
        var I = l == null ? 0 : l.length;
        for (A && I && (h = l[--I]); I--; )
          h = _(h, l[I], I, l);
        return h;
      }
      function yr(l, _) {
        for (var h = -1, A = l == null ? 0 : l.length; ++h < A; )
          if (_(l[h], h, l))
            return !0;
        return !1;
      }
      var Gs = Lr("length");
      function $s(l) {
        return l.split("");
      }
      function Hs(l) {
        return l.match(Qo) || [];
      }
      function gu(l, _, h) {
        var A;
        return h(l, function(I, B, k) {
          if (_(I, B, k))
            return A = B, !1;
        }), A;
      }
      function St(l, _, h, A) {
        for (var I = l.length, B = h + (A ? 1 : -1); A ? B-- : ++B < I; )
          if (_(l[B], B, l))
            return B;
        return -1;
      }
      function Oe(l, _, h) {
        return _ === _ ? nc(l, _, h) : St(l, _u, h);
      }
      function zs(l, _, h, A) {
        for (var I = h - 1, B = l.length; ++I < B; )
          if (A(l[I], _))
            return I;
        return -1;
      }
      function _u(l) {
        return l !== l;
      }
      function du(l, _) {
        var h = l == null ? 0 : l.length;
        return h ? Dr(l, _) / h : _t;
      }
      function Lr(l) {
        return function(_) {
          return _ == null ? o : _[l];
        };
      }
      function Mr(l) {
        return function(_) {
          return l == null ? o : l[_];
        };
      }
      function pu(l, _, h, A, I) {
        return I(l, function(B, k, G) {
          h = A ? (A = !1, B) : _(h, B, k, G);
        }), h;
      }
      function qs(l, _) {
        var h = l.length;
        for (l.sort(_); h--; )
          l[h] = l[h].value;
        return l;
      }
      function Dr(l, _) {
        for (var h, A = -1, I = l.length; ++A < I; ) {
          var B = _(l[A]);
          B !== o && (h = h === o ? B : h + B);
        }
        return h;
      }
      function Pr(l, _) {
        for (var h = -1, A = Array(l); ++h < l; )
          A[h] = _(h);
        return A;
      }
      function Ks(l, _) {
        return K(_, function(h) {
          return [h, l[h]];
        });
      }
      function vu(l) {
        return l && l.slice(0, Eu(l) + 1).replace(Ar, "");
      }
      function dn(l) {
        return function(_) {
          return l(_);
        };
      }
      function Br(l, _) {
        return K(_, function(h) {
          return l[h];
        });
      }
      function Qe(l, _) {
        return l.has(_);
      }
      function wu(l, _) {
        for (var h = -1, A = l.length; ++h < A && Oe(_, l[h], 0) > -1; )
          ;
        return h;
      }
      function xu(l, _) {
        for (var h = l.length; h-- && Oe(_, l[h], 0) > -1; )
          ;
        return h;
      }
      function Zs(l, _) {
        for (var h = l.length, A = 0; h--; )
          l[h] === _ && ++A;
        return A;
      }
      var Ys = Mr(ys), Js = Mr(Ls);
      function Xs(l) {
        return "\\" + Ds[l];
      }
      function Qs(l, _) {
        return l == null ? o : l[_];
      }
      function Te(l) {
        return Ts.test(l);
      }
      function Vs(l) {
        return Is.test(l);
      }
      function ks(l) {
        for (var _, h = []; !(_ = l.next()).done; )
          h.push(_.value);
        return h;
      }
      function Wr(l) {
        var _ = -1, h = Array(l.size);
        return l.forEach(function(A, I) {
          h[++_] = [I, A];
        }), h;
      }
      function Au(l, _) {
        return function(h) {
          return l(_(h));
        };
      }
      function ee(l, _) {
        for (var h = -1, A = l.length, I = 0, B = []; ++h < A; ) {
          var k = l[h];
          (k === _ || k === ve) && (l[h] = ve, B[I++] = h);
        }
        return B;
      }
      function bt(l) {
        var _ = -1, h = Array(l.size);
        return l.forEach(function(A) {
          h[++_] = A;
        }), h;
      }
      function js(l) {
        var _ = -1, h = Array(l.size);
        return l.forEach(function(A) {
          h[++_] = [A, A];
        }), h;
      }
      function nc(l, _, h) {
        for (var A = h - 1, I = l.length; ++A < I; )
          if (l[A] === _)
            return A;
        return -1;
      }
      function ec(l, _, h) {
        for (var A = h + 1; A--; )
          if (l[A] === _)
            return A;
        return A;
      }
      function Ie(l) {
        return Te(l) ? rc(l) : Gs(l);
      }
      function Ln(l) {
        return Te(l) ? ic(l) : $s(l);
      }
      function Eu(l) {
        for (var _ = l.length; _-- && Zo.test(l.charAt(_)); )
          ;
        return _;
      }
      var tc = Mr(Ms);
      function rc(l) {
        for (var _ = Or.lastIndex = 0; Or.test(l); )
          ++_;
        return _;
      }
      function ic(l) {
        return l.match(Or) || [];
      }
      function uc(l) {
        return l.match(Os) || [];
      }
      var fc = function l(_) {
        _ = _ == null ? en : Ce.defaults(en.Object(), _, Ce.pick(en, Cs));
        var h = _.Array, A = _.Date, I = _.Error, B = _.Function, k = _.Math, G = _.Object, Ur = _.RegExp, oc = _.String, mn = _.TypeError, Ot = h.prototype, sc = B.prototype, Re = G.prototype, Tt = _["__core-js_shared__"], It = sc.toString, F = Re.hasOwnProperty, cc = 0, mu = function() {
          var n = /[^.]+$/.exec(Tt && Tt.keys && Tt.keys.IE_PROTO || "");
          return n ? "Symbol(src)_1." + n : "";
        }(), Ct = Re.toString, lc = It.call(G), ac = en._, hc = Ur(
          "^" + It.call(F).replace(xr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Rt = uu ? _.Buffer : o, te = _.Symbol, yt = _.Uint8Array, Su = Rt ? Rt.allocUnsafe : o, Lt = Au(G.getPrototypeOf, G), bu = G.create, Ou = Re.propertyIsEnumerable, Mt = Ot.splice, Tu = te ? te.isConcatSpreadable : o, Ve = te ? te.iterator : o, ce = te ? te.toStringTag : o, Dt = function() {
          try {
            var n = _e(G, "defineProperty");
            return n({}, "", {}), n;
          } catch {
          }
        }(), gc = _.clearTimeout !== en.clearTimeout && _.clearTimeout, _c = A && A.now !== en.Date.now && A.now, dc = _.setTimeout !== en.setTimeout && _.setTimeout, Pt = k.ceil, Bt = k.floor, Fr = G.getOwnPropertySymbols, pc = Rt ? Rt.isBuffer : o, Iu = _.isFinite, vc = Ot.join, wc = Au(G.keys, G), j = k.max, rn = k.min, xc = A.now, Ac = _.parseInt, Cu = k.random, Ec = Ot.reverse, Nr = _e(_, "DataView"), ke = _e(_, "Map"), Gr = _e(_, "Promise"), ye = _e(_, "Set"), je = _e(_, "WeakMap"), nt = _e(G, "create"), Wt = je && new je(), Le = {}, mc = de(Nr), Sc = de(ke), bc = de(Gr), Oc = de(ye), Tc = de(je), Ut = te ? te.prototype : o, et = Ut ? Ut.valueOf : o, Ru = Ut ? Ut.toString : o;
        function u(n) {
          if (J(n) && !C(n) && !(n instanceof D)) {
            if (n instanceof Sn)
              return n;
            if (F.call(n, "__wrapped__"))
              return Lf(n);
          }
          return new Sn(n);
        }
        var Me = /* @__PURE__ */ function() {
          function n() {
          }
          return function(e) {
            if (!Z(e))
              return {};
            if (bu)
              return bu(e);
            n.prototype = e;
            var t = new n();
            return n.prototype = o, t;
          };
        }();
        function Ft() {
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
          escape: Go,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: $o,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: Fi,
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
        }, u.prototype = Ft.prototype, u.prototype.constructor = u, Sn.prototype = Me(Ft.prototype), Sn.prototype.constructor = Sn;
        function D(n) {
          this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Bn, this.__views__ = [];
        }
        function Ic() {
          var n = new D(this.__wrapped__);
          return n.__actions__ = ln(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = ln(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = ln(this.__views__), n;
        }
        function Cc() {
          if (this.__filtered__) {
            var n = new D(this);
            n.__dir__ = -1, n.__filtered__ = !0;
          } else
            n = this.clone(), n.__dir__ *= -1;
          return n;
        }
        function Rc() {
          var n = this.__wrapped__.value(), e = this.__dir__, t = C(n), r = e < 0, i = t ? n.length : 0, f = $l(0, i, this.__views__), s = f.start, c = f.end, a = c - s, p = r ? c : s - 1, v = this.__iteratees__, w = v.length, x = 0, m = rn(a, this.__takeCount__);
          if (!t || !r && i == a && m == a)
            return ju(n, this.__actions__);
          var O = [];
          n:
            for (; a-- && x < m; ) {
              p += e;
              for (var y = -1, T = n[p]; ++y < w; ) {
                var M = v[y], P = M.iteratee, wn = M.type, cn = P(T);
                if (wn == So)
                  T = cn;
                else if (!cn) {
                  if (wn == Di)
                    continue n;
                  break n;
                }
              }
              O[x++] = T;
            }
          return O;
        }
        D.prototype = Me(Ft.prototype), D.prototype.constructor = D;
        function le(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.clear(); ++e < t; ) {
            var r = n[e];
            this.set(r[0], r[1]);
          }
        }
        function yc() {
          this.__data__ = nt ? nt(null) : {}, this.size = 0;
        }
        function Lc(n) {
          var e = this.has(n) && delete this.__data__[n];
          return this.size -= e ? 1 : 0, e;
        }
        function Mc(n) {
          var e = this.__data__;
          if (nt) {
            var t = e[n];
            return t === Y ? o : t;
          }
          return F.call(e, n) ? e[n] : o;
        }
        function Dc(n) {
          var e = this.__data__;
          return nt ? e[n] !== o : F.call(e, n);
        }
        function Pc(n, e) {
          var t = this.__data__;
          return this.size += this.has(n) ? 0 : 1, t[n] = nt && e === o ? Y : e, this;
        }
        le.prototype.clear = yc, le.prototype.delete = Lc, le.prototype.get = Mc, le.prototype.has = Dc, le.prototype.set = Pc;
        function zn(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.clear(); ++e < t; ) {
            var r = n[e];
            this.set(r[0], r[1]);
          }
        }
        function Bc() {
          this.__data__ = [], this.size = 0;
        }
        function Wc(n) {
          var e = this.__data__, t = Nt(e, n);
          if (t < 0)
            return !1;
          var r = e.length - 1;
          return t == r ? e.pop() : Mt.call(e, t, 1), --this.size, !0;
        }
        function Uc(n) {
          var e = this.__data__, t = Nt(e, n);
          return t < 0 ? o : e[t][1];
        }
        function Fc(n) {
          return Nt(this.__data__, n) > -1;
        }
        function Nc(n, e) {
          var t = this.__data__, r = Nt(t, n);
          return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
        }
        zn.prototype.clear = Bc, zn.prototype.delete = Wc, zn.prototype.get = Uc, zn.prototype.has = Fc, zn.prototype.set = Nc;
        function qn(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.clear(); ++e < t; ) {
            var r = n[e];
            this.set(r[0], r[1]);
          }
        }
        function Gc() {
          this.size = 0, this.__data__ = {
            hash: new le(),
            map: new (ke || zn)(),
            string: new le()
          };
        }
        function $c(n) {
          var e = Vt(this, n).delete(n);
          return this.size -= e ? 1 : 0, e;
        }
        function Hc(n) {
          return Vt(this, n).get(n);
        }
        function zc(n) {
          return Vt(this, n).has(n);
        }
        function qc(n, e) {
          var t = Vt(this, n), r = t.size;
          return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
        }
        qn.prototype.clear = Gc, qn.prototype.delete = $c, qn.prototype.get = Hc, qn.prototype.has = zc, qn.prototype.set = qc;
        function ae(n) {
          var e = -1, t = n == null ? 0 : n.length;
          for (this.__data__ = new qn(); ++e < t; )
            this.add(n[e]);
        }
        function Kc(n) {
          return this.__data__.set(n, Y), this;
        }
        function Zc(n) {
          return this.__data__.has(n);
        }
        ae.prototype.add = ae.prototype.push = Kc, ae.prototype.has = Zc;
        function Mn(n) {
          var e = this.__data__ = new zn(n);
          this.size = e.size;
        }
        function Yc() {
          this.__data__ = new zn(), this.size = 0;
        }
        function Jc(n) {
          var e = this.__data__, t = e.delete(n);
          return this.size = e.size, t;
        }
        function Xc(n) {
          return this.__data__.get(n);
        }
        function Qc(n) {
          return this.__data__.has(n);
        }
        function Vc(n, e) {
          var t = this.__data__;
          if (t instanceof zn) {
            var r = t.__data__;
            if (!ke || r.length < E - 1)
              return r.push([n, e]), this.size = ++t.size, this;
            t = this.__data__ = new qn(r);
          }
          return t.set(n, e), this.size = t.size, this;
        }
        Mn.prototype.clear = Yc, Mn.prototype.delete = Jc, Mn.prototype.get = Xc, Mn.prototype.has = Qc, Mn.prototype.set = Vc;
        function yu(n, e) {
          var t = C(n), r = !t && pe(n), i = !t && !r && oe(n), f = !t && !r && !i && We(n), s = t || r || i || f, c = s ? Pr(n.length, oc) : [], a = c.length;
          for (var p in n)
            (e || F.call(n, p)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
            (p == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            i && (p == "offset" || p == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            f && (p == "buffer" || p == "byteLength" || p == "byteOffset") || // Skip index properties.
            Jn(p, a))) && c.push(p);
          return c;
        }
        function Lu(n) {
          var e = n.length;
          return e ? n[Vr(0, e - 1)] : o;
        }
        function kc(n, e) {
          return kt(ln(n), he(e, 0, n.length));
        }
        function jc(n) {
          return kt(ln(n));
        }
        function $r(n, e, t) {
          (t !== o && !Dn(n[e], t) || t === o && !(e in n)) && Kn(n, e, t);
        }
        function tt(n, e, t) {
          var r = n[e];
          (!(F.call(n, e) && Dn(r, t)) || t === o && !(e in n)) && Kn(n, e, t);
        }
        function Nt(n, e) {
          for (var t = n.length; t--; )
            if (Dn(n[t][0], e))
              return t;
          return -1;
        }
        function nl(n, e, t, r) {
          return re(n, function(i, f, s) {
            e(r, i, t(i), s);
          }), r;
        }
        function Mu(n, e) {
          return n && Un(e, nn(e), n);
        }
        function el(n, e) {
          return n && Un(e, hn(e), n);
        }
        function Kn(n, e, t) {
          e == "__proto__" && Dt ? Dt(n, e, {
            configurable: !0,
            enumerable: !0,
            value: t,
            writable: !0
          }) : n[e] = t;
        }
        function Hr(n, e) {
          for (var t = -1, r = e.length, i = h(r), f = n == null; ++t < r; )
            i[t] = f ? o : mi(n, e[t]);
          return i;
        }
        function he(n, e, t) {
          return n === n && (t !== o && (n = n <= t ? n : t), e !== o && (n = n >= e ? n : e)), n;
        }
        function bn(n, e, t, r, i, f) {
          var s, c = e & kn, a = e & Li, p = e & we;
          if (t && (s = i ? t(n, r, i, f) : t(n)), s !== o)
            return s;
          if (!Z(n))
            return n;
          var v = C(n);
          if (v) {
            if (s = zl(n), !c)
              return ln(n, s);
          } else {
            var w = un(n), x = w == vt || w == Pi;
            if (oe(n))
              return tf(n, c);
            if (w == Hn || w == me || x && !i) {
              if (s = a || x ? {} : mf(n), !c)
                return a ? Ml(n, el(s, n)) : Ll(n, Mu(s, n));
            } else {
              if (!H[w])
                return i ? n : {};
              s = ql(n, w, c);
            }
          }
          f || (f = new Mn());
          var m = f.get(n);
          if (m)
            return m;
          f.set(n, s), Vf(n) ? n.forEach(function(T) {
            s.add(bn(T, e, t, T, n, f));
          }) : Xf(n) && n.forEach(function(T, M) {
            s.set(M, bn(T, e, t, M, n, f));
          });
          var O = p ? a ? si : oi : a ? hn : nn, y = v ? o : O(n);
          return En(y || n, function(T, M) {
            y && (M = T, T = n[M]), tt(s, M, bn(T, e, t, M, n, f));
          }), s;
        }
        function tl(n) {
          var e = nn(n);
          return function(t) {
            return Du(t, n, e);
          };
        }
        function Du(n, e, t) {
          var r = t.length;
          if (n == null)
            return !r;
          for (n = G(n); r--; ) {
            var i = t[r], f = e[i], s = n[i];
            if (s === o && !(i in n) || !f(s))
              return !1;
          }
          return !0;
        }
        function Pu(n, e, t) {
          if (typeof n != "function")
            throw new mn(z);
          return ct(function() {
            n.apply(o, t);
          }, e);
        }
        function rt(n, e, t, r) {
          var i = -1, f = mt, s = !0, c = n.length, a = [], p = e.length;
          if (!c)
            return a;
          t && (e = K(e, dn(t))), r ? (f = Cr, s = !1) : e.length >= E && (f = Qe, s = !1, e = new ae(e));
          n:
            for (; ++i < c; ) {
              var v = n[i], w = t == null ? v : t(v);
              if (v = r || v !== 0 ? v : 0, s && w === w) {
                for (var x = p; x--; )
                  if (e[x] === w)
                    continue n;
                a.push(v);
              } else f(e, w, r) || a.push(v);
            }
          return a;
        }
        var re = sf(Wn), Bu = sf(qr, !0);
        function rl(n, e) {
          var t = !0;
          return re(n, function(r, i, f) {
            return t = !!e(r, i, f), t;
          }), t;
        }
        function Gt(n, e, t) {
          for (var r = -1, i = n.length; ++r < i; ) {
            var f = n[r], s = e(f);
            if (s != null && (c === o ? s === s && !vn(s) : t(s, c)))
              var c = s, a = f;
          }
          return a;
        }
        function il(n, e, t, r) {
          var i = n.length;
          for (t = R(t), t < 0 && (t = -t > i ? 0 : i + t), r = r === o || r > i ? i : R(r), r < 0 && (r += i), r = t > r ? 0 : jf(r); t < r; )
            n[t++] = e;
          return n;
        }
        function Wu(n, e) {
          var t = [];
          return re(n, function(r, i, f) {
            e(r, i, f) && t.push(r);
          }), t;
        }
        function tn(n, e, t, r, i) {
          var f = -1, s = n.length;
          for (t || (t = Zl), i || (i = []); ++f < s; ) {
            var c = n[f];
            e > 0 && t(c) ? e > 1 ? tn(c, e - 1, t, r, i) : ne(i, c) : r || (i[i.length] = c);
          }
          return i;
        }
        var zr = cf(), Uu = cf(!0);
        function Wn(n, e) {
          return n && zr(n, e, nn);
        }
        function qr(n, e) {
          return n && Uu(n, e, nn);
        }
        function $t(n, e) {
          return jn(e, function(t) {
            return Xn(n[t]);
          });
        }
        function ge(n, e) {
          e = ue(e, n);
          for (var t = 0, r = e.length; n != null && t < r; )
            n = n[Fn(e[t++])];
          return t && t == r ? n : o;
        }
        function Fu(n, e, t) {
          var r = e(n);
          return C(n) ? r : ne(r, t(n));
        }
        function on(n) {
          return n == null ? n === o ? Do : Lo : ce && ce in G(n) ? Gl(n) : jl(n);
        }
        function Kr(n, e) {
          return n > e;
        }
        function ul(n, e) {
          return n != null && F.call(n, e);
        }
        function fl(n, e) {
          return n != null && e in G(n);
        }
        function ol(n, e, t) {
          return n >= rn(e, t) && n < j(e, t);
        }
        function Zr(n, e, t) {
          for (var r = t ? Cr : mt, i = n[0].length, f = n.length, s = f, c = h(f), a = 1 / 0, p = []; s--; ) {
            var v = n[s];
            s && e && (v = K(v, dn(e))), a = rn(v.length, a), c[s] = !t && (e || i >= 120 && v.length >= 120) ? new ae(s && v) : o;
          }
          v = n[0];
          var w = -1, x = c[0];
          n:
            for (; ++w < i && p.length < a; ) {
              var m = v[w], O = e ? e(m) : m;
              if (m = t || m !== 0 ? m : 0, !(x ? Qe(x, O) : r(p, O, t))) {
                for (s = f; --s; ) {
                  var y = c[s];
                  if (!(y ? Qe(y, O) : r(n[s], O, t)))
                    continue n;
                }
                x && x.push(O), p.push(m);
              }
            }
          return p;
        }
        function sl(n, e, t, r) {
          return Wn(n, function(i, f, s) {
            e(r, t(i), f, s);
          }), r;
        }
        function it(n, e, t) {
          e = ue(e, n), n = Tf(n, e);
          var r = n == null ? n : n[Fn(Tn(e))];
          return r == null ? o : _n(r, n, t);
        }
        function Nu(n) {
          return J(n) && on(n) == me;
        }
        function cl(n) {
          return J(n) && on(n) == Xe;
        }
        function ll(n) {
          return J(n) && on(n) == qe;
        }
        function ut(n, e, t, r, i) {
          return n === e ? !0 : n == null || e == null || !J(n) && !J(e) ? n !== n && e !== e : al(n, e, t, r, ut, i);
        }
        function al(n, e, t, r, i, f) {
          var s = C(n), c = C(e), a = s ? dt : un(n), p = c ? dt : un(e);
          a = a == me ? Hn : a, p = p == me ? Hn : p;
          var v = a == Hn, w = p == Hn, x = a == p;
          if (x && oe(n)) {
            if (!oe(e))
              return !1;
            s = !0, v = !1;
          }
          if (x && !v)
            return f || (f = new Mn()), s || We(n) ? xf(n, e, t, r, i, f) : Fl(n, e, a, t, r, i, f);
          if (!(t & xe)) {
            var m = v && F.call(n, "__wrapped__"), O = w && F.call(e, "__wrapped__");
            if (m || O) {
              var y = m ? n.value() : n, T = O ? e.value() : e;
              return f || (f = new Mn()), i(y, T, t, r, f);
            }
          }
          return x ? (f || (f = new Mn()), Nl(n, e, t, r, i, f)) : !1;
        }
        function hl(n) {
          return J(n) && un(n) == Rn;
        }
        function Yr(n, e, t, r) {
          var i = t.length, f = i, s = !r;
          if (n == null)
            return !f;
          for (n = G(n); i--; ) {
            var c = t[i];
            if (s && c[2] ? c[1] !== n[c[0]] : !(c[0] in n))
              return !1;
          }
          for (; ++i < f; ) {
            c = t[i];
            var a = c[0], p = n[a], v = c[1];
            if (s && c[2]) {
              if (p === o && !(a in n))
                return !1;
            } else {
              var w = new Mn();
              if (r)
                var x = r(p, v, a, n, e, w);
              if (!(x === o ? ut(v, p, xe | ht, r, w) : x))
                return !1;
            }
          }
          return !0;
        }
        function Gu(n) {
          if (!Z(n) || Jl(n))
            return !1;
          var e = Xn(n) ? hc : ts;
          return e.test(de(n));
        }
        function gl(n) {
          return J(n) && on(n) == Ze;
        }
        function _l(n) {
          return J(n) && un(n) == yn;
        }
        function dl(n) {
          return J(n) && ir(n.length) && !!q[on(n)];
        }
        function $u(n) {
          return typeof n == "function" ? n : n == null ? gn : typeof n == "object" ? C(n) ? qu(n[0], n[1]) : zu(n) : lo(n);
        }
        function Jr(n) {
          if (!st(n))
            return wc(n);
          var e = [];
          for (var t in G(n))
            F.call(n, t) && t != "constructor" && e.push(t);
          return e;
        }
        function pl(n) {
          if (!Z(n))
            return kl(n);
          var e = st(n), t = [];
          for (var r in n)
            r == "constructor" && (e || !F.call(n, r)) || t.push(r);
          return t;
        }
        function Xr(n, e) {
          return n < e;
        }
        function Hu(n, e) {
          var t = -1, r = an(n) ? h(n.length) : [];
          return re(n, function(i, f, s) {
            r[++t] = e(i, f, s);
          }), r;
        }
        function zu(n) {
          var e = li(n);
          return e.length == 1 && e[0][2] ? bf(e[0][0], e[0][1]) : function(t) {
            return t === n || Yr(t, n, e);
          };
        }
        function qu(n, e) {
          return hi(n) && Sf(e) ? bf(Fn(n), e) : function(t) {
            var r = mi(t, n);
            return r === o && r === e ? Si(t, n) : ut(e, r, xe | ht);
          };
        }
        function Ht(n, e, t, r, i) {
          n !== e && zr(e, function(f, s) {
            if (i || (i = new Mn()), Z(f))
              vl(n, e, s, t, Ht, r, i);
            else {
              var c = r ? r(_i(n, s), f, s + "", n, e, i) : o;
              c === o && (c = f), $r(n, s, c);
            }
          }, hn);
        }
        function vl(n, e, t, r, i, f, s) {
          var c = _i(n, t), a = _i(e, t), p = s.get(a);
          if (p) {
            $r(n, t, p);
            return;
          }
          var v = f ? f(c, a, t + "", n, e, s) : o, w = v === o;
          if (w) {
            var x = C(a), m = !x && oe(a), O = !x && !m && We(a);
            v = a, x || m || O ? C(c) ? v = c : Q(c) ? v = ln(c) : m ? (w = !1, v = tf(a, !0)) : O ? (w = !1, v = rf(a, !0)) : v = [] : lt(a) || pe(a) ? (v = c, pe(c) ? v = no(c) : (!Z(c) || Xn(c)) && (v = mf(a))) : w = !1;
          }
          w && (s.set(a, v), i(v, a, r, f, s), s.delete(a)), $r(n, t, v);
        }
        function Ku(n, e) {
          var t = n.length;
          if (t)
            return e += e < 0 ? t : 0, Jn(e, t) ? n[e] : o;
        }
        function Zu(n, e, t) {
          e.length ? e = K(e, function(f) {
            return C(f) ? function(s) {
              return ge(s, f.length === 1 ? f[0] : f);
            } : f;
          }) : e = [gn];
          var r = -1;
          e = K(e, dn(b()));
          var i = Hu(n, function(f, s, c) {
            var a = K(e, function(p) {
              return p(f);
            });
            return { criteria: a, index: ++r, value: f };
          });
          return qs(i, function(f, s) {
            return yl(f, s, t);
          });
        }
        function wl(n, e) {
          return Yu(n, e, function(t, r) {
            return Si(n, r);
          });
        }
        function Yu(n, e, t) {
          for (var r = -1, i = e.length, f = {}; ++r < i; ) {
            var s = e[r], c = ge(n, s);
            t(c, s) && ft(f, ue(s, n), c);
          }
          return f;
        }
        function xl(n) {
          return function(e) {
            return ge(e, n);
          };
        }
        function Qr(n, e, t, r) {
          var i = r ? zs : Oe, f = -1, s = e.length, c = n;
          for (n === e && (e = ln(e)), t && (c = K(n, dn(t))); ++f < s; )
            for (var a = 0, p = e[f], v = t ? t(p) : p; (a = i(c, v, a, r)) > -1; )
              c !== n && Mt.call(c, a, 1), Mt.call(n, a, 1);
          return n;
        }
        function Ju(n, e) {
          for (var t = n ? e.length : 0, r = t - 1; t--; ) {
            var i = e[t];
            if (t == r || i !== f) {
              var f = i;
              Jn(i) ? Mt.call(n, i, 1) : ni(n, i);
            }
          }
          return n;
        }
        function Vr(n, e) {
          return n + Bt(Cu() * (e - n + 1));
        }
        function Al(n, e, t, r) {
          for (var i = -1, f = j(Pt((e - n) / (t || 1)), 0), s = h(f); f--; )
            s[r ? f : ++i] = n, n += t;
          return s;
        }
        function kr(n, e) {
          var t = "";
          if (!n || e < 1 || e > Ee)
            return t;
          do
            e % 2 && (t += n), e = Bt(e / 2), e && (n += n);
          while (e);
          return t;
        }
        function L(n, e) {
          return di(Of(n, e, gn), n + "");
        }
        function El(n) {
          return Lu(Ue(n));
        }
        function ml(n, e) {
          var t = Ue(n);
          return kt(t, he(e, 0, t.length));
        }
        function ft(n, e, t, r) {
          if (!Z(n))
            return n;
          e = ue(e, n);
          for (var i = -1, f = e.length, s = f - 1, c = n; c != null && ++i < f; ) {
            var a = Fn(e[i]), p = t;
            if (a === "__proto__" || a === "constructor" || a === "prototype")
              return n;
            if (i != s) {
              var v = c[a];
              p = r ? r(v, a, c) : o, p === o && (p = Z(v) ? v : Jn(e[i + 1]) ? [] : {});
            }
            tt(c, a, p), c = c[a];
          }
          return n;
        }
        var Xu = Wt ? function(n, e) {
          return Wt.set(n, e), n;
        } : gn, Sl = Dt ? function(n, e) {
          return Dt(n, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Oi(e),
            writable: !0
          });
        } : gn;
        function bl(n) {
          return kt(Ue(n));
        }
        function On(n, e, t) {
          var r = -1, i = n.length;
          e < 0 && (e = -e > i ? 0 : i + e), t = t > i ? i : t, t < 0 && (t += i), i = e > t ? 0 : t - e >>> 0, e >>>= 0;
          for (var f = h(i); ++r < i; )
            f[r] = n[r + e];
          return f;
        }
        function Ol(n, e) {
          var t;
          return re(n, function(r, i, f) {
            return t = e(r, i, f), !t;
          }), !!t;
        }
        function zt(n, e, t) {
          var r = 0, i = n == null ? r : n.length;
          if (typeof e == "number" && e === e && i <= Io) {
            for (; r < i; ) {
              var f = r + i >>> 1, s = n[f];
              s !== null && !vn(s) && (t ? s <= e : s < e) ? r = f + 1 : i = f;
            }
            return i;
          }
          return jr(n, e, gn, t);
        }
        function jr(n, e, t, r) {
          var i = 0, f = n == null ? 0 : n.length;
          if (f === 0)
            return 0;
          e = t(e);
          for (var s = e !== e, c = e === null, a = vn(e), p = e === o; i < f; ) {
            var v = Bt((i + f) / 2), w = t(n[v]), x = w !== o, m = w === null, O = w === w, y = vn(w);
            if (s)
              var T = r || O;
            else p ? T = O && (r || x) : c ? T = O && x && (r || !m) : a ? T = O && x && !m && (r || !y) : m || y ? T = !1 : T = r ? w <= e : w < e;
            T ? i = v + 1 : f = v;
          }
          return rn(f, To);
        }
        function Qu(n, e) {
          for (var t = -1, r = n.length, i = 0, f = []; ++t < r; ) {
            var s = n[t], c = e ? e(s) : s;
            if (!t || !Dn(c, a)) {
              var a = c;
              f[i++] = s === 0 ? 0 : s;
            }
          }
          return f;
        }
        function Vu(n) {
          return typeof n == "number" ? n : vn(n) ? _t : +n;
        }
        function pn(n) {
          if (typeof n == "string")
            return n;
          if (C(n))
            return K(n, pn) + "";
          if (vn(n))
            return Ru ? Ru.call(n) : "";
          var e = n + "";
          return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
        }
        function ie(n, e, t) {
          var r = -1, i = mt, f = n.length, s = !0, c = [], a = c;
          if (t)
            s = !1, i = Cr;
          else if (f >= E) {
            var p = e ? null : Wl(n);
            if (p)
              return bt(p);
            s = !1, i = Qe, a = new ae();
          } else
            a = e ? [] : c;
          n:
            for (; ++r < f; ) {
              var v = n[r], w = e ? e(v) : v;
              if (v = t || v !== 0 ? v : 0, s && w === w) {
                for (var x = a.length; x--; )
                  if (a[x] === w)
                    continue n;
                e && a.push(w), c.push(v);
              } else i(a, w, t) || (a !== c && a.push(w), c.push(v));
            }
          return c;
        }
        function ni(n, e) {
          return e = ue(e, n), n = Tf(n, e), n == null || delete n[Fn(Tn(e))];
        }
        function ku(n, e, t, r) {
          return ft(n, e, t(ge(n, e)), r);
        }
        function qt(n, e, t, r) {
          for (var i = n.length, f = r ? i : -1; (r ? f-- : ++f < i) && e(n[f], f, n); )
            ;
          return t ? On(n, r ? 0 : f, r ? f + 1 : i) : On(n, r ? f + 1 : 0, r ? i : f);
        }
        function ju(n, e) {
          var t = n;
          return t instanceof D && (t = t.value()), Rr(e, function(r, i) {
            return i.func.apply(i.thisArg, ne([r], i.args));
          }, t);
        }
        function ei(n, e, t) {
          var r = n.length;
          if (r < 2)
            return r ? ie(n[0]) : [];
          for (var i = -1, f = h(r); ++i < r; )
            for (var s = n[i], c = -1; ++c < r; )
              c != i && (f[i] = rt(f[i] || s, n[c], e, t));
          return ie(tn(f, 1), e, t);
        }
        function nf(n, e, t) {
          for (var r = -1, i = n.length, f = e.length, s = {}; ++r < i; ) {
            var c = r < f ? e[r] : o;
            t(s, n[r], c);
          }
          return s;
        }
        function ti(n) {
          return Q(n) ? n : [];
        }
        function ri(n) {
          return typeof n == "function" ? n : gn;
        }
        function ue(n, e) {
          return C(n) ? n : hi(n, e) ? [n] : yf(W(n));
        }
        var Tl = L;
        function fe(n, e, t) {
          var r = n.length;
          return t = t === o ? r : t, !e && t >= r ? n : On(n, e, t);
        }
        var ef = gc || function(n) {
          return en.clearTimeout(n);
        };
        function tf(n, e) {
          if (e)
            return n.slice();
          var t = n.length, r = Su ? Su(t) : new n.constructor(t);
          return n.copy(r), r;
        }
        function ii(n) {
          var e = new n.constructor(n.byteLength);
          return new yt(e).set(new yt(n)), e;
        }
        function Il(n, e) {
          var t = e ? ii(n.buffer) : n.buffer;
          return new n.constructor(t, n.byteOffset, n.byteLength);
        }
        function Cl(n) {
          var e = new n.constructor(n.source, Ni.exec(n));
          return e.lastIndex = n.lastIndex, e;
        }
        function Rl(n) {
          return et ? G(et.call(n)) : {};
        }
        function rf(n, e) {
          var t = e ? ii(n.buffer) : n.buffer;
          return new n.constructor(t, n.byteOffset, n.length);
        }
        function uf(n, e) {
          if (n !== e) {
            var t = n !== o, r = n === null, i = n === n, f = vn(n), s = e !== o, c = e === null, a = e === e, p = vn(e);
            if (!c && !p && !f && n > e || f && s && a && !c && !p || r && s && a || !t && a || !i)
              return 1;
            if (!r && !f && !p && n < e || p && t && i && !r && !f || c && t && i || !s && i || !a)
              return -1;
          }
          return 0;
        }
        function yl(n, e, t) {
          for (var r = -1, i = n.criteria, f = e.criteria, s = i.length, c = t.length; ++r < s; ) {
            var a = uf(i[r], f[r]);
            if (a) {
              if (r >= c)
                return a;
              var p = t[r];
              return a * (p == "desc" ? -1 : 1);
            }
          }
          return n.index - e.index;
        }
        function ff(n, e, t, r) {
          for (var i = -1, f = n.length, s = t.length, c = -1, a = e.length, p = j(f - s, 0), v = h(a + p), w = !r; ++c < a; )
            v[c] = e[c];
          for (; ++i < s; )
            (w || i < f) && (v[t[i]] = n[i]);
          for (; p--; )
            v[c++] = n[i++];
          return v;
        }
        function of(n, e, t, r) {
          for (var i = -1, f = n.length, s = -1, c = t.length, a = -1, p = e.length, v = j(f - c, 0), w = h(v + p), x = !r; ++i < v; )
            w[i] = n[i];
          for (var m = i; ++a < p; )
            w[m + a] = e[a];
          for (; ++s < c; )
            (x || i < f) && (w[m + t[s]] = n[i++]);
          return w;
        }
        function ln(n, e) {
          var t = -1, r = n.length;
          for (e || (e = h(r)); ++t < r; )
            e[t] = n[t];
          return e;
        }
        function Un(n, e, t, r) {
          var i = !t;
          t || (t = {});
          for (var f = -1, s = e.length; ++f < s; ) {
            var c = e[f], a = r ? r(t[c], n[c], c, t, n) : o;
            a === o && (a = n[c]), i ? Kn(t, c, a) : tt(t, c, a);
          }
          return t;
        }
        function Ll(n, e) {
          return Un(n, ai(n), e);
        }
        function Ml(n, e) {
          return Un(n, Af(n), e);
        }
        function Kt(n, e) {
          return function(t, r) {
            var i = C(t) ? Us : nl, f = e ? e() : {};
            return i(t, n, b(r, 2), f);
          };
        }
        function De(n) {
          return L(function(e, t) {
            var r = -1, i = t.length, f = i > 1 ? t[i - 1] : o, s = i > 2 ? t[2] : o;
            for (f = n.length > 3 && typeof f == "function" ? (i--, f) : o, s && sn(t[0], t[1], s) && (f = i < 3 ? o : f, i = 1), e = G(e); ++r < i; ) {
              var c = t[r];
              c && n(e, c, r, f);
            }
            return e;
          });
        }
        function sf(n, e) {
          return function(t, r) {
            if (t == null)
              return t;
            if (!an(t))
              return n(t, r);
            for (var i = t.length, f = e ? i : -1, s = G(t); (e ? f-- : ++f < i) && r(s[f], f, s) !== !1; )
              ;
            return t;
          };
        }
        function cf(n) {
          return function(e, t, r) {
            for (var i = -1, f = G(e), s = r(e), c = s.length; c--; ) {
              var a = s[n ? c : ++i];
              if (t(f[a], a, f) === !1)
                break;
            }
            return e;
          };
        }
        function Dl(n, e, t) {
          var r = e & Cn, i = ot(n);
          function f() {
            var s = this && this !== en && this instanceof f ? i : n;
            return s.apply(r ? t : this, arguments);
          }
          return f;
        }
        function lf(n) {
          return function(e) {
            e = W(e);
            var t = Te(e) ? Ln(e) : o, r = t ? t[0] : e.charAt(0), i = t ? fe(t, 1).join("") : e.slice(1);
            return r[n]() + i;
          };
        }
        function Pe(n) {
          return function(e) {
            return Rr(so(oo(e).replace(Ss, "")), n, "");
          };
        }
        function ot(n) {
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
            var t = Me(n.prototype), r = n.apply(t, e);
            return Z(r) ? r : t;
          };
        }
        function Pl(n, e, t) {
          var r = ot(n);
          function i() {
            for (var f = arguments.length, s = h(f), c = f, a = Be(i); c--; )
              s[c] = arguments[c];
            var p = f < 3 && s[0] !== a && s[f - 1] !== a ? [] : ee(s, a);
            if (f -= p.length, f < t)
              return df(
                n,
                e,
                Zt,
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
        function af(n) {
          return function(e, t, r) {
            var i = G(e);
            if (!an(e)) {
              var f = b(t, 3);
              e = nn(e), t = function(c) {
                return f(i[c], c, i);
              };
            }
            var s = n(e, t, r);
            return s > -1 ? i[f ? e[s] : s] : o;
          };
        }
        function hf(n) {
          return Yn(function(e) {
            var t = e.length, r = t, i = Sn.prototype.thru;
            for (n && e.reverse(); r--; ) {
              var f = e[r];
              if (typeof f != "function")
                throw new mn(z);
              if (i && !s && Qt(f) == "wrapper")
                var s = new Sn([], !0);
            }
            for (r = s ? r : t; ++r < t; ) {
              f = e[r];
              var c = Qt(f), a = c == "wrapper" ? ci(f) : o;
              a && gi(a[0]) && a[1] == ($n | Nn | Gn | He) && !a[4].length && a[9] == 1 ? s = s[Qt(a[0])].apply(s, a[3]) : s = f.length == 1 && gi(f) ? s[c]() : s.thru(f);
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
        function Zt(n, e, t, r, i, f, s, c, a, p) {
          var v = e & $n, w = e & Cn, x = e & Ae, m = e & (Nn | Ge), O = e & cr, y = x ? o : ot(n);
          function T() {
            for (var M = arguments.length, P = h(M), wn = M; wn--; )
              P[wn] = arguments[wn];
            if (m)
              var cn = Be(T), xn = Zs(P, cn);
            if (r && (P = ff(P, r, i, m)), f && (P = of(P, f, s, m)), M -= xn, m && M < p) {
              var V = ee(P, cn);
              return df(
                n,
                e,
                Zt,
                T.placeholder,
                t,
                P,
                V,
                c,
                a,
                p - M
              );
            }
            var Pn = w ? t : this, Vn = x ? Pn[n] : n;
            return M = P.length, c ? P = na(P, c) : O && M > 1 && P.reverse(), v && a < M && (P.length = a), this && this !== en && this instanceof T && (Vn = y || ot(Vn)), Vn.apply(Pn, P);
          }
          return T;
        }
        function gf(n, e) {
          return function(t, r) {
            return sl(t, n, e(r), {});
          };
        }
        function Yt(n, e) {
          return function(t, r) {
            var i;
            if (t === o && r === o)
              return e;
            if (t !== o && (i = t), r !== o) {
              if (i === o)
                return r;
              typeof t == "string" || typeof r == "string" ? (t = pn(t), r = pn(r)) : (t = Vu(t), r = Vu(r)), i = n(t, r);
            }
            return i;
          };
        }
        function ui(n) {
          return Yn(function(e) {
            return e = K(e, dn(b())), L(function(t) {
              var r = this;
              return n(e, function(i) {
                return _n(i, r, t);
              });
            });
          });
        }
        function Jt(n, e) {
          e = e === o ? " " : pn(e);
          var t = e.length;
          if (t < 2)
            return t ? kr(e, n) : e;
          var r = kr(e, Pt(n / Ie(e)));
          return Te(e) ? fe(Ln(r), 0, n).join("") : r.slice(0, n);
        }
        function Bl(n, e, t, r) {
          var i = e & Cn, f = ot(n);
          function s() {
            for (var c = -1, a = arguments.length, p = -1, v = r.length, w = h(v + a), x = this && this !== en && this instanceof s ? f : n; ++p < v; )
              w[p] = r[p];
            for (; a--; )
              w[p++] = arguments[++c];
            return _n(x, i ? t : this, w);
          }
          return s;
        }
        function _f(n) {
          return function(e, t, r) {
            return r && typeof r != "number" && sn(e, t, r) && (t = r = o), e = Qn(e), t === o ? (t = e, e = 0) : t = Qn(t), r = r === o ? e < t ? 1 : -1 : Qn(r), Al(e, t, r, n);
          };
        }
        function Xt(n) {
          return function(e, t) {
            return typeof e == "string" && typeof t == "string" || (e = In(e), t = In(t)), n(e, t);
          };
        }
        function df(n, e, t, r, i, f, s, c, a, p) {
          var v = e & Nn, w = v ? s : o, x = v ? o : s, m = v ? f : o, O = v ? o : f;
          e |= v ? Gn : $e, e &= ~(v ? $e : Gn), e & Mi || (e &= -4);
          var y = [
            n,
            e,
            i,
            m,
            w,
            O,
            x,
            c,
            a,
            p
          ], T = t.apply(o, y);
          return gi(n) && If(T, y), T.placeholder = r, Cf(T, n, e);
        }
        function fi(n) {
          var e = k[n];
          return function(t, r) {
            if (t = In(t), r = r == null ? 0 : rn(R(r), 292), r && Iu(t)) {
              var i = (W(t) + "e").split("e"), f = e(i[0] + "e" + (+i[1] + r));
              return i = (W(f) + "e").split("e"), +(i[0] + "e" + (+i[1] - r));
            }
            return e(t);
          };
        }
        var Wl = ye && 1 / bt(new ye([, -0]))[1] == gt ? function(n) {
          return new ye(n);
        } : Ci;
        function pf(n) {
          return function(e) {
            var t = un(e);
            return t == Rn ? Wr(e) : t == yn ? js(e) : Ks(e, n(e));
          };
        }
        function Zn(n, e, t, r, i, f, s, c) {
          var a = e & Ae;
          if (!a && typeof n != "function")
            throw new mn(z);
          var p = r ? r.length : 0;
          if (p || (e &= -97, r = i = o), s = s === o ? s : j(R(s), 0), c = c === o ? c : R(c), p -= i ? i.length : 0, e & $e) {
            var v = r, w = i;
            r = i = o;
          }
          var x = a ? o : ci(n), m = [
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
          if (x && Vl(m, x), n = m[0], e = m[1], t = m[2], r = m[3], i = m[4], c = m[9] = m[9] === o ? a ? 0 : n.length : j(m[9] - p, 0), !c && e & (Nn | Ge) && (e &= -25), !e || e == Cn)
            var O = Dl(n, e, t);
          else e == Nn || e == Ge ? O = Pl(n, e, c) : (e == Gn || e == (Cn | Gn)) && !i.length ? O = Bl(n, e, t, r) : O = Zt.apply(o, m);
          var y = x ? Xu : If;
          return Cf(y(O, m), n, e);
        }
        function vf(n, e, t, r) {
          return n === o || Dn(n, Re[t]) && !F.call(r, t) ? e : n;
        }
        function wf(n, e, t, r, i, f) {
          return Z(n) && Z(e) && (f.set(e, n), Ht(n, e, o, wf, f), f.delete(e)), n;
        }
        function Ul(n) {
          return lt(n) ? o : n;
        }
        function xf(n, e, t, r, i, f) {
          var s = t & xe, c = n.length, a = e.length;
          if (c != a && !(s && a > c))
            return !1;
          var p = f.get(n), v = f.get(e);
          if (p && v)
            return p == e && v == n;
          var w = -1, x = !0, m = t & ht ? new ae() : o;
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
            if (m) {
              if (!yr(e, function(M, P) {
                if (!Qe(m, P) && (O === M || i(O, M, t, r, f)))
                  return m.push(P);
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
        function Fl(n, e, t, r, i, f, s) {
          switch (t) {
            case Se:
              if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
                return !1;
              n = n.buffer, e = e.buffer;
            case Xe:
              return !(n.byteLength != e.byteLength || !f(new yt(n), new yt(e)));
            case ze:
            case qe:
            case Ke:
              return Dn(+n, +e);
            case pt:
              return n.name == e.name && n.message == e.message;
            case Ze:
            case Ye:
              return n == e + "";
            case Rn:
              var c = Wr;
            case yn:
              var a = r & xe;
              if (c || (c = bt), n.size != e.size && !a)
                return !1;
              var p = s.get(n);
              if (p)
                return p == e;
              r |= ht, s.set(n, e);
              var v = xf(c(n), c(e), r, i, f, s);
              return s.delete(n), v;
            case wt:
              if (et)
                return et.call(n) == et.call(e);
          }
          return !1;
        }
        function Nl(n, e, t, r, i, f) {
          var s = t & xe, c = oi(n), a = c.length, p = oi(e), v = p.length;
          if (a != v && !s)
            return !1;
          for (var w = a; w--; ) {
            var x = c[w];
            if (!(s ? x in e : F.call(e, x)))
              return !1;
          }
          var m = f.get(n), O = f.get(e);
          if (m && O)
            return m == e && O == n;
          var y = !0;
          f.set(n, e), f.set(e, n);
          for (var T = s; ++w < a; ) {
            x = c[w];
            var M = n[x], P = e[x];
            if (r)
              var wn = s ? r(P, M, x, e, n, f) : r(M, P, x, n, e, f);
            if (!(wn === o ? M === P || i(M, P, t, r, f) : wn)) {
              y = !1;
              break;
            }
            T || (T = x == "constructor");
          }
          if (y && !T) {
            var cn = n.constructor, xn = e.constructor;
            cn != xn && "constructor" in n && "constructor" in e && !(typeof cn == "function" && cn instanceof cn && typeof xn == "function" && xn instanceof xn) && (y = !1);
          }
          return f.delete(n), f.delete(e), y;
        }
        function Yn(n) {
          return di(Of(n, o, Pf), n + "");
        }
        function oi(n) {
          return Fu(n, nn, ai);
        }
        function si(n) {
          return Fu(n, hn, Af);
        }
        var ci = Wt ? function(n) {
          return Wt.get(n);
        } : Ci;
        function Qt(n) {
          for (var e = n.name + "", t = Le[e], r = F.call(Le, e) ? t.length : 0; r--; ) {
            var i = t[r], f = i.func;
            if (f == null || f == n)
              return i.name;
          }
          return e;
        }
        function Be(n) {
          var e = F.call(u, "placeholder") ? u : n;
          return e.placeholder;
        }
        function b() {
          var n = u.iteratee || Ti;
          return n = n === Ti ? $u : n, arguments.length ? n(arguments[0], arguments[1]) : n;
        }
        function Vt(n, e) {
          var t = n.__data__;
          return Yl(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
        }
        function li(n) {
          for (var e = nn(n), t = e.length; t--; ) {
            var r = e[t], i = n[r];
            e[t] = [r, i, Sf(i)];
          }
          return e;
        }
        function _e(n, e) {
          var t = Qs(n, e);
          return Gu(t) ? t : o;
        }
        function Gl(n) {
          var e = F.call(n, ce), t = n[ce];
          try {
            n[ce] = o;
            var r = !0;
          } catch {
          }
          var i = Ct.call(n);
          return r && (e ? n[ce] = t : delete n[ce]), i;
        }
        var ai = Fr ? function(n) {
          return n == null ? [] : (n = G(n), jn(Fr(n), function(e) {
            return Ou.call(n, e);
          }));
        } : Ri, Af = Fr ? function(n) {
          for (var e = []; n; )
            ne(e, ai(n)), n = Lt(n);
          return e;
        } : Ri, un = on;
        (Nr && un(new Nr(new ArrayBuffer(1))) != Se || ke && un(new ke()) != Rn || Gr && un(Gr.resolve()) != Bi || ye && un(new ye()) != yn || je && un(new je()) != Je) && (un = function(n) {
          var e = on(n), t = e == Hn ? n.constructor : o, r = t ? de(t) : "";
          if (r)
            switch (r) {
              case mc:
                return Se;
              case Sc:
                return Rn;
              case bc:
                return Bi;
              case Oc:
                return yn;
              case Tc:
                return Je;
            }
          return e;
        });
        function $l(n, e, t) {
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
        function Hl(n) {
          var e = n.match(Jo);
          return e ? e[1].split(Xo) : [];
        }
        function Ef(n, e, t) {
          e = ue(e, n);
          for (var r = -1, i = e.length, f = !1; ++r < i; ) {
            var s = Fn(e[r]);
            if (!(f = n != null && t(n, s)))
              break;
            n = n[s];
          }
          return f || ++r != i ? f : (i = n == null ? 0 : n.length, !!i && ir(i) && Jn(s, i) && (C(n) || pe(n)));
        }
        function zl(n) {
          var e = n.length, t = new n.constructor(e);
          return e && typeof n[0] == "string" && F.call(n, "index") && (t.index = n.index, t.input = n.input), t;
        }
        function mf(n) {
          return typeof n.constructor == "function" && !st(n) ? Me(Lt(n)) : {};
        }
        function ql(n, e, t) {
          var r = n.constructor;
          switch (e) {
            case Xe:
              return ii(n);
            case ze:
            case qe:
              return new r(+n);
            case Se:
              return Il(n, t);
            case lr:
            case ar:
            case hr:
            case gr:
            case _r:
            case dr:
            case pr:
            case vr:
            case wr:
              return rf(n, t);
            case Rn:
              return new r();
            case Ke:
            case Ye:
              return new r(n);
            case Ze:
              return Cl(n);
            case yn:
              return new r();
            case wt:
              return Rl(n);
          }
        }
        function Kl(n, e) {
          var t = e.length;
          if (!t)
            return n;
          var r = t - 1;
          return e[r] = (t > 1 ? "& " : "") + e[r], e = e.join(t > 2 ? ", " : " "), n.replace(Yo, `{
/* [wrapped with ` + e + `] */
`);
        }
        function Zl(n) {
          return C(n) || pe(n) || !!(Tu && n && n[Tu]);
        }
        function Jn(n, e) {
          var t = typeof n;
          return e = e ?? Ee, !!e && (t == "number" || t != "symbol" && is.test(n)) && n > -1 && n % 1 == 0 && n < e;
        }
        function sn(n, e, t) {
          if (!Z(t))
            return !1;
          var r = typeof e;
          return (r == "number" ? an(t) && Jn(e, t.length) : r == "string" && e in t) ? Dn(t[e], n) : !1;
        }
        function hi(n, e) {
          if (C(n))
            return !1;
          var t = typeof n;
          return t == "number" || t == "symbol" || t == "boolean" || n == null || vn(n) ? !0 : zo.test(n) || !Ho.test(n) || e != null && n in G(e);
        }
        function Yl(n) {
          var e = typeof n;
          return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
        }
        function gi(n) {
          var e = Qt(n), t = u[e];
          if (typeof t != "function" || !(e in D.prototype))
            return !1;
          if (n === t)
            return !0;
          var r = ci(t);
          return !!r && n === r[0];
        }
        function Jl(n) {
          return !!mu && mu in n;
        }
        var Xl = Tt ? Xn : yi;
        function st(n) {
          var e = n && n.constructor, t = typeof e == "function" && e.prototype || Re;
          return n === t;
        }
        function Sf(n) {
          return n === n && !Z(n);
        }
        function bf(n, e) {
          return function(t) {
            return t == null ? !1 : t[n] === e && (e !== o || n in G(t));
          };
        }
        function Ql(n) {
          var e = tr(n, function(r) {
            return t.size === sr && t.clear(), r;
          }), t = e.cache;
          return e;
        }
        function Vl(n, e) {
          var t = n[1], r = e[1], i = t | r, f = i < (Cn | Ae | $n), s = r == $n && t == Nn || r == $n && t == He && n[7].length <= e[8] || r == ($n | He) && e[7].length <= e[8] && t == Nn;
          if (!(f || s))
            return n;
          r & Cn && (n[2] = e[2], i |= t & Cn ? 0 : Mi);
          var c = e[3];
          if (c) {
            var a = n[3];
            n[3] = a ? ff(a, c, e[4]) : c, n[4] = a ? ee(n[3], ve) : e[4];
          }
          return c = e[5], c && (a = n[5], n[5] = a ? of(a, c, e[6]) : c, n[6] = a ? ee(n[5], ve) : e[6]), c = e[7], c && (n[7] = c), r & $n && (n[8] = n[8] == null ? e[8] : rn(n[8], e[8])), n[9] == null && (n[9] = e[9]), n[0] = e[0], n[1] = i, n;
        }
        function kl(n) {
          var e = [];
          if (n != null)
            for (var t in G(n))
              e.push(t);
          return e;
        }
        function jl(n) {
          return Ct.call(n);
        }
        function Of(n, e, t) {
          return e = j(e === o ? n.length - 1 : e, 0), function() {
            for (var r = arguments, i = -1, f = j(r.length - e, 0), s = h(f); ++i < f; )
              s[i] = r[e + i];
            i = -1;
            for (var c = h(e + 1); ++i < e; )
              c[i] = r[i];
            return c[e] = t(s), _n(n, this, c);
          };
        }
        function Tf(n, e) {
          return e.length < 2 ? n : ge(n, On(e, 0, -1));
        }
        function na(n, e) {
          for (var t = n.length, r = rn(e.length, t), i = ln(n); r--; ) {
            var f = e[r];
            n[r] = Jn(f, t) ? i[f] : o;
          }
          return n;
        }
        function _i(n, e) {
          if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
            return n[e];
        }
        var If = Rf(Xu), ct = dc || function(n, e) {
          return en.setTimeout(n, e);
        }, di = Rf(Sl);
        function Cf(n, e, t) {
          var r = e + "";
          return di(n, Kl(r, ea(Hl(r), t)));
        }
        function Rf(n) {
          var e = 0, t = 0;
          return function() {
            var r = xc(), i = mo - (r - t);
            if (t = r, i > 0) {
              if (++e >= Eo)
                return arguments[0];
            } else
              e = 0;
            return n.apply(o, arguments);
          };
        }
        function kt(n, e) {
          var t = -1, r = n.length, i = r - 1;
          for (e = e === o ? r : e; ++t < e; ) {
            var f = Vr(t, i), s = n[f];
            n[f] = n[t], n[t] = s;
          }
          return n.length = e, n;
        }
        var yf = Ql(function(n) {
          var e = [];
          return n.charCodeAt(0) === 46 && e.push(""), n.replace(qo, function(t, r, i, f) {
            e.push(i ? f.replace(ko, "$1") : r || t);
          }), e;
        });
        function Fn(n) {
          if (typeof n == "string" || vn(n))
            return n;
          var e = n + "";
          return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
        }
        function de(n) {
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
        function ea(n, e) {
          return En(Co, function(t) {
            var r = "_." + t[0];
            e & t[1] && !mt(n, r) && n.push(r);
          }), n.sort();
        }
        function Lf(n) {
          if (n instanceof D)
            return n.clone();
          var e = new Sn(n.__wrapped__, n.__chain__);
          return e.__actions__ = ln(n.__actions__), e.__index__ = n.__index__, e.__values__ = n.__values__, e;
        }
        function ta(n, e, t) {
          (t ? sn(n, e, t) : e === o) ? e = 1 : e = j(R(e), 0);
          var r = n == null ? 0 : n.length;
          if (!r || e < 1)
            return [];
          for (var i = 0, f = 0, s = h(Pt(r / e)); i < r; )
            s[f++] = On(n, i, i += e);
          return s;
        }
        function ra(n) {
          for (var e = -1, t = n == null ? 0 : n.length, r = 0, i = []; ++e < t; ) {
            var f = n[e];
            f && (i[r++] = f);
          }
          return i;
        }
        function ia() {
          var n = arguments.length;
          if (!n)
            return [];
          for (var e = h(n - 1), t = arguments[0], r = n; r--; )
            e[r - 1] = arguments[r];
          return ne(C(t) ? ln(t) : [t], tn(e, 1));
        }
        var ua = L(function(n, e) {
          return Q(n) ? rt(n, tn(e, 1, Q, !0)) : [];
        }), fa = L(function(n, e) {
          var t = Tn(e);
          return Q(t) && (t = o), Q(n) ? rt(n, tn(e, 1, Q, !0), b(t, 2)) : [];
        }), oa = L(function(n, e) {
          var t = Tn(e);
          return Q(t) && (t = o), Q(n) ? rt(n, tn(e, 1, Q, !0), o, t) : [];
        });
        function sa(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === o ? 1 : R(e), On(n, e < 0 ? 0 : e, r)) : [];
        }
        function ca(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === o ? 1 : R(e), e = r - e, On(n, 0, e < 0 ? 0 : e)) : [];
        }
        function la(n, e) {
          return n && n.length ? qt(n, b(e, 3), !0, !0) : [];
        }
        function aa(n, e) {
          return n && n.length ? qt(n, b(e, 3), !0) : [];
        }
        function ha(n, e, t, r) {
          var i = n == null ? 0 : n.length;
          return i ? (t && typeof t != "number" && sn(n, e, t) && (t = 0, r = i), il(n, e, t, r)) : [];
        }
        function Mf(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = t == null ? 0 : R(t);
          return i < 0 && (i = j(r + i, 0)), St(n, b(e, 3), i);
        }
        function Df(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = r - 1;
          return t !== o && (i = R(t), i = t < 0 ? j(r + i, 0) : rn(i, r - 1)), St(n, b(e, 3), i, !0);
        }
        function Pf(n) {
          var e = n == null ? 0 : n.length;
          return e ? tn(n, 1) : [];
        }
        function ga(n) {
          var e = n == null ? 0 : n.length;
          return e ? tn(n, gt) : [];
        }
        function _a(n, e) {
          var t = n == null ? 0 : n.length;
          return t ? (e = e === o ? 1 : R(e), tn(n, e)) : [];
        }
        function da(n) {
          for (var e = -1, t = n == null ? 0 : n.length, r = {}; ++e < t; ) {
            var i = n[e];
            r[i[0]] = i[1];
          }
          return r;
        }
        function Bf(n) {
          return n && n.length ? n[0] : o;
        }
        function pa(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = t == null ? 0 : R(t);
          return i < 0 && (i = j(r + i, 0)), Oe(n, e, i);
        }
        function va(n) {
          var e = n == null ? 0 : n.length;
          return e ? On(n, 0, -1) : [];
        }
        var wa = L(function(n) {
          var e = K(n, ti);
          return e.length && e[0] === n[0] ? Zr(e) : [];
        }), xa = L(function(n) {
          var e = Tn(n), t = K(n, ti);
          return e === Tn(t) ? e = o : t.pop(), t.length && t[0] === n[0] ? Zr(t, b(e, 2)) : [];
        }), Aa = L(function(n) {
          var e = Tn(n), t = K(n, ti);
          return e = typeof e == "function" ? e : o, e && t.pop(), t.length && t[0] === n[0] ? Zr(t, o, e) : [];
        });
        function Ea(n, e) {
          return n == null ? "" : vc.call(n, e);
        }
        function Tn(n) {
          var e = n == null ? 0 : n.length;
          return e ? n[e - 1] : o;
        }
        function ma(n, e, t) {
          var r = n == null ? 0 : n.length;
          if (!r)
            return -1;
          var i = r;
          return t !== o && (i = R(t), i = i < 0 ? j(r + i, 0) : rn(i, r - 1)), e === e ? ec(n, e, i) : St(n, _u, i, !0);
        }
        function Sa(n, e) {
          return n && n.length ? Ku(n, R(e)) : o;
        }
        var ba = L(Wf);
        function Wf(n, e) {
          return n && n.length && e && e.length ? Qr(n, e) : n;
        }
        function Oa(n, e, t) {
          return n && n.length && e && e.length ? Qr(n, e, b(t, 2)) : n;
        }
        function Ta(n, e, t) {
          return n && n.length && e && e.length ? Qr(n, e, o, t) : n;
        }
        var Ia = Yn(function(n, e) {
          var t = n == null ? 0 : n.length, r = Hr(n, e);
          return Ju(n, K(e, function(i) {
            return Jn(i, t) ? +i : i;
          }).sort(uf)), r;
        });
        function Ca(n, e) {
          var t = [];
          if (!(n && n.length))
            return t;
          var r = -1, i = [], f = n.length;
          for (e = b(e, 3); ++r < f; ) {
            var s = n[r];
            e(s, r, n) && (t.push(s), i.push(r));
          }
          return Ju(n, i), t;
        }
        function pi(n) {
          return n == null ? n : Ec.call(n);
        }
        function Ra(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (t && typeof t != "number" && sn(n, e, t) ? (e = 0, t = r) : (e = e == null ? 0 : R(e), t = t === o ? r : R(t)), On(n, e, t)) : [];
        }
        function ya(n, e) {
          return zt(n, e);
        }
        function La(n, e, t) {
          return jr(n, e, b(t, 2));
        }
        function Ma(n, e) {
          var t = n == null ? 0 : n.length;
          if (t) {
            var r = zt(n, e);
            if (r < t && Dn(n[r], e))
              return r;
          }
          return -1;
        }
        function Da(n, e) {
          return zt(n, e, !0);
        }
        function Pa(n, e, t) {
          return jr(n, e, b(t, 2), !0);
        }
        function Ba(n, e) {
          var t = n == null ? 0 : n.length;
          if (t) {
            var r = zt(n, e, !0) - 1;
            if (Dn(n[r], e))
              return r;
          }
          return -1;
        }
        function Wa(n) {
          return n && n.length ? Qu(n) : [];
        }
        function Ua(n, e) {
          return n && n.length ? Qu(n, b(e, 2)) : [];
        }
        function Fa(n) {
          var e = n == null ? 0 : n.length;
          return e ? On(n, 1, e) : [];
        }
        function Na(n, e, t) {
          return n && n.length ? (e = t || e === o ? 1 : R(e), On(n, 0, e < 0 ? 0 : e)) : [];
        }
        function Ga(n, e, t) {
          var r = n == null ? 0 : n.length;
          return r ? (e = t || e === o ? 1 : R(e), e = r - e, On(n, e < 0 ? 0 : e, r)) : [];
        }
        function $a(n, e) {
          return n && n.length ? qt(n, b(e, 3), !1, !0) : [];
        }
        function Ha(n, e) {
          return n && n.length ? qt(n, b(e, 3)) : [];
        }
        var za = L(function(n) {
          return ie(tn(n, 1, Q, !0));
        }), qa = L(function(n) {
          var e = Tn(n);
          return Q(e) && (e = o), ie(tn(n, 1, Q, !0), b(e, 2));
        }), Ka = L(function(n) {
          var e = Tn(n);
          return e = typeof e == "function" ? e : o, ie(tn(n, 1, Q, !0), o, e);
        });
        function Za(n) {
          return n && n.length ? ie(n) : [];
        }
        function Ya(n, e) {
          return n && n.length ? ie(n, b(e, 2)) : [];
        }
        function Ja(n, e) {
          return e = typeof e == "function" ? e : o, n && n.length ? ie(n, o, e) : [];
        }
        function vi(n) {
          if (!(n && n.length))
            return [];
          var e = 0;
          return n = jn(n, function(t) {
            if (Q(t))
              return e = j(t.length, e), !0;
          }), Pr(e, function(t) {
            return K(n, Lr(t));
          });
        }
        function Uf(n, e) {
          if (!(n && n.length))
            return [];
          var t = vi(n);
          return e == null ? t : K(t, function(r) {
            return _n(e, o, r);
          });
        }
        var Xa = L(function(n, e) {
          return Q(n) ? rt(n, e) : [];
        }), Qa = L(function(n) {
          return ei(jn(n, Q));
        }), Va = L(function(n) {
          var e = Tn(n);
          return Q(e) && (e = o), ei(jn(n, Q), b(e, 2));
        }), ka = L(function(n) {
          var e = Tn(n);
          return e = typeof e == "function" ? e : o, ei(jn(n, Q), o, e);
        }), ja = L(vi);
        function nh(n, e) {
          return nf(n || [], e || [], tt);
        }
        function eh(n, e) {
          return nf(n || [], e || [], ft);
        }
        var th = L(function(n) {
          var e = n.length, t = e > 1 ? n[e - 1] : o;
          return t = typeof t == "function" ? (n.pop(), t) : o, Uf(n, t);
        });
        function Ff(n) {
          var e = u(n);
          return e.__chain__ = !0, e;
        }
        function rh(n, e) {
          return e(n), n;
        }
        function jt(n, e) {
          return e(n);
        }
        var ih = Yn(function(n) {
          var e = n.length, t = e ? n[0] : 0, r = this.__wrapped__, i = function(f) {
            return Hr(f, n);
          };
          return e > 1 || this.__actions__.length || !(r instanceof D) || !Jn(t) ? this.thru(i) : (r = r.slice(t, +t + (e ? 1 : 0)), r.__actions__.push({
            func: jt,
            args: [i],
            thisArg: o
          }), new Sn(r, this.__chain__).thru(function(f) {
            return e && !f.length && f.push(o), f;
          }));
        });
        function uh() {
          return Ff(this);
        }
        function fh() {
          return new Sn(this.value(), this.__chain__);
        }
        function oh() {
          this.__values__ === o && (this.__values__ = kf(this.value()));
          var n = this.__index__ >= this.__values__.length, e = n ? o : this.__values__[this.__index__++];
          return { done: n, value: e };
        }
        function sh() {
          return this;
        }
        function ch(n) {
          for (var e, t = this; t instanceof Ft; ) {
            var r = Lf(t);
            r.__index__ = 0, r.__values__ = o, e ? i.__wrapped__ = r : e = r;
            var i = r;
            t = t.__wrapped__;
          }
          return i.__wrapped__ = n, e;
        }
        function lh() {
          var n = this.__wrapped__;
          if (n instanceof D) {
            var e = n;
            return this.__actions__.length && (e = new D(this)), e = e.reverse(), e.__actions__.push({
              func: jt,
              args: [pi],
              thisArg: o
            }), new Sn(e, this.__chain__);
          }
          return this.thru(pi);
        }
        function ah() {
          return ju(this.__wrapped__, this.__actions__);
        }
        var hh = Kt(function(n, e, t) {
          F.call(n, t) ? ++n[t] : Kn(n, t, 1);
        });
        function gh(n, e, t) {
          var r = C(n) ? hu : rl;
          return t && sn(n, e, t) && (e = o), r(n, b(e, 3));
        }
        function _h(n, e) {
          var t = C(n) ? jn : Wu;
          return t(n, b(e, 3));
        }
        var dh = af(Mf), ph = af(Df);
        function vh(n, e) {
          return tn(nr(n, e), 1);
        }
        function wh(n, e) {
          return tn(nr(n, e), gt);
        }
        function xh(n, e, t) {
          return t = t === o ? 1 : R(t), tn(nr(n, e), t);
        }
        function Nf(n, e) {
          var t = C(n) ? En : re;
          return t(n, b(e, 3));
        }
        function Gf(n, e) {
          var t = C(n) ? Fs : Bu;
          return t(n, b(e, 3));
        }
        var Ah = Kt(function(n, e, t) {
          F.call(n, t) ? n[t].push(e) : Kn(n, t, [e]);
        });
        function Eh(n, e, t, r) {
          n = an(n) ? n : Ue(n), t = t && !r ? R(t) : 0;
          var i = n.length;
          return t < 0 && (t = j(i + t, 0)), ur(n) ? t <= i && n.indexOf(e, t) > -1 : !!i && Oe(n, e, t) > -1;
        }
        var mh = L(function(n, e, t) {
          var r = -1, i = typeof e == "function", f = an(n) ? h(n.length) : [];
          return re(n, function(s) {
            f[++r] = i ? _n(e, s, t) : it(s, e, t);
          }), f;
        }), Sh = Kt(function(n, e, t) {
          Kn(n, t, e);
        });
        function nr(n, e) {
          var t = C(n) ? K : Hu;
          return t(n, b(e, 3));
        }
        function bh(n, e, t, r) {
          return n == null ? [] : (C(e) || (e = e == null ? [] : [e]), t = r ? o : t, C(t) || (t = t == null ? [] : [t]), Zu(n, e, t));
        }
        var Oh = Kt(function(n, e, t) {
          n[t ? 0 : 1].push(e);
        }, function() {
          return [[], []];
        });
        function Th(n, e, t) {
          var r = C(n) ? Rr : pu, i = arguments.length < 3;
          return r(n, b(e, 4), t, i, re);
        }
        function Ih(n, e, t) {
          var r = C(n) ? Ns : pu, i = arguments.length < 3;
          return r(n, b(e, 4), t, i, Bu);
        }
        function Ch(n, e) {
          var t = C(n) ? jn : Wu;
          return t(n, rr(b(e, 3)));
        }
        function Rh(n) {
          var e = C(n) ? Lu : El;
          return e(n);
        }
        function yh(n, e, t) {
          (t ? sn(n, e, t) : e === o) ? e = 1 : e = R(e);
          var r = C(n) ? kc : ml;
          return r(n, e);
        }
        function Lh(n) {
          var e = C(n) ? jc : bl;
          return e(n);
        }
        function Mh(n) {
          if (n == null)
            return 0;
          if (an(n))
            return ur(n) ? Ie(n) : n.length;
          var e = un(n);
          return e == Rn || e == yn ? n.size : Jr(n).length;
        }
        function Dh(n, e, t) {
          var r = C(n) ? yr : Ol;
          return t && sn(n, e, t) && (e = o), r(n, b(e, 3));
        }
        var Ph = L(function(n, e) {
          if (n == null)
            return [];
          var t = e.length;
          return t > 1 && sn(n, e[0], e[1]) ? e = [] : t > 2 && sn(e[0], e[1], e[2]) && (e = [e[0]]), Zu(n, tn(e, 1), []);
        }), er = _c || function() {
          return en.Date.now();
        };
        function Bh(n, e) {
          if (typeof e != "function")
            throw new mn(z);
          return n = R(n), function() {
            if (--n < 1)
              return e.apply(this, arguments);
          };
        }
        function $f(n, e, t) {
          return e = t ? o : e, e = n && e == null ? n.length : e, Zn(n, $n, o, o, o, o, e);
        }
        function Hf(n, e) {
          var t;
          if (typeof e != "function")
            throw new mn(z);
          return n = R(n), function() {
            return --n > 0 && (t = e.apply(this, arguments)), n <= 1 && (e = o), t;
          };
        }
        var wi = L(function(n, e, t) {
          var r = Cn;
          if (t.length) {
            var i = ee(t, Be(wi));
            r |= Gn;
          }
          return Zn(n, r, e, t, i);
        }), zf = L(function(n, e, t) {
          var r = Cn | Ae;
          if (t.length) {
            var i = ee(t, Be(zf));
            r |= Gn;
          }
          return Zn(e, r, n, t, i);
        });
        function qf(n, e, t) {
          e = t ? o : e;
          var r = Zn(n, Nn, o, o, o, o, o, e);
          return r.placeholder = qf.placeholder, r;
        }
        function Kf(n, e, t) {
          e = t ? o : e;
          var r = Zn(n, Ge, o, o, o, o, o, e);
          return r.placeholder = Kf.placeholder, r;
        }
        function Zf(n, e, t) {
          var r, i, f, s, c, a, p = 0, v = !1, w = !1, x = !0;
          if (typeof n != "function")
            throw new mn(z);
          e = In(e) || 0, Z(t) && (v = !!t.leading, w = "maxWait" in t, f = w ? j(In(t.maxWait) || 0, e) : f, x = "trailing" in t ? !!t.trailing : x);
          function m(V) {
            var Pn = r, Vn = i;
            return r = i = o, p = V, s = n.apply(Vn, Pn), s;
          }
          function O(V) {
            return p = V, c = ct(M, e), v ? m(V) : s;
          }
          function y(V) {
            var Pn = V - a, Vn = V - p, ao = e - Pn;
            return w ? rn(ao, f - Vn) : ao;
          }
          function T(V) {
            var Pn = V - a, Vn = V - p;
            return a === o || Pn >= e || Pn < 0 || w && Vn >= f;
          }
          function M() {
            var V = er();
            if (T(V))
              return P(V);
            c = ct(M, y(V));
          }
          function P(V) {
            return c = o, x && r ? m(V) : (r = i = o, s);
          }
          function wn() {
            c !== o && ef(c), p = 0, r = a = i = c = o;
          }
          function cn() {
            return c === o ? s : P(er());
          }
          function xn() {
            var V = er(), Pn = T(V);
            if (r = arguments, i = this, a = V, Pn) {
              if (c === o)
                return O(a);
              if (w)
                return ef(c), c = ct(M, e), m(a);
            }
            return c === o && (c = ct(M, e)), s;
          }
          return xn.cancel = wn, xn.flush = cn, xn;
        }
        var Wh = L(function(n, e) {
          return Pu(n, 1, e);
        }), Uh = L(function(n, e, t) {
          return Pu(n, In(e) || 0, t);
        });
        function Fh(n) {
          return Zn(n, cr);
        }
        function tr(n, e) {
          if (typeof n != "function" || e != null && typeof e != "function")
            throw new mn(z);
          var t = function() {
            var r = arguments, i = e ? e.apply(this, r) : r[0], f = t.cache;
            if (f.has(i))
              return f.get(i);
            var s = n.apply(this, r);
            return t.cache = f.set(i, s) || f, s;
          };
          return t.cache = new (tr.Cache || qn)(), t;
        }
        tr.Cache = qn;
        function rr(n) {
          if (typeof n != "function")
            throw new mn(z);
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
        function Nh(n) {
          return Hf(2, n);
        }
        var Gh = Tl(function(n, e) {
          e = e.length == 1 && C(e[0]) ? K(e[0], dn(b())) : K(tn(e, 1), dn(b()));
          var t = e.length;
          return L(function(r) {
            for (var i = -1, f = rn(r.length, t); ++i < f; )
              r[i] = e[i].call(this, r[i]);
            return _n(n, this, r);
          });
        }), xi = L(function(n, e) {
          var t = ee(e, Be(xi));
          return Zn(n, Gn, o, e, t);
        }), Yf = L(function(n, e) {
          var t = ee(e, Be(Yf));
          return Zn(n, $e, o, e, t);
        }), $h = Yn(function(n, e) {
          return Zn(n, He, o, o, o, e);
        });
        function Hh(n, e) {
          if (typeof n != "function")
            throw new mn(z);
          return e = e === o ? e : R(e), L(n, e);
        }
        function zh(n, e) {
          if (typeof n != "function")
            throw new mn(z);
          return e = e == null ? 0 : j(R(e), 0), L(function(t) {
            var r = t[e], i = fe(t, 0, e);
            return r && ne(i, r), _n(n, this, i);
          });
        }
        function qh(n, e, t) {
          var r = !0, i = !0;
          if (typeof n != "function")
            throw new mn(z);
          return Z(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), Zf(n, e, {
            leading: r,
            maxWait: e,
            trailing: i
          });
        }
        function Kh(n) {
          return $f(n, 1);
        }
        function Zh(n, e) {
          return xi(ri(e), n);
        }
        function Yh() {
          if (!arguments.length)
            return [];
          var n = arguments[0];
          return C(n) ? n : [n];
        }
        function Jh(n) {
          return bn(n, we);
        }
        function Xh(n, e) {
          return e = typeof e == "function" ? e : o, bn(n, we, e);
        }
        function Qh(n) {
          return bn(n, kn | we);
        }
        function Vh(n, e) {
          return e = typeof e == "function" ? e : o, bn(n, kn | we, e);
        }
        function kh(n, e) {
          return e == null || Du(n, e, nn(e));
        }
        function Dn(n, e) {
          return n === e || n !== n && e !== e;
        }
        var jh = Xt(Kr), ng = Xt(function(n, e) {
          return n >= e;
        }), pe = Nu(/* @__PURE__ */ function() {
          return arguments;
        }()) ? Nu : function(n) {
          return J(n) && F.call(n, "callee") && !Ou.call(n, "callee");
        }, C = h.isArray, eg = fu ? dn(fu) : cl;
        function an(n) {
          return n != null && ir(n.length) && !Xn(n);
        }
        function Q(n) {
          return J(n) && an(n);
        }
        function tg(n) {
          return n === !0 || n === !1 || J(n) && on(n) == ze;
        }
        var oe = pc || yi, rg = ou ? dn(ou) : ll;
        function ig(n) {
          return J(n) && n.nodeType === 1 && !lt(n);
        }
        function ug(n) {
          if (n == null)
            return !0;
          if (an(n) && (C(n) || typeof n == "string" || typeof n.splice == "function" || oe(n) || We(n) || pe(n)))
            return !n.length;
          var e = un(n);
          if (e == Rn || e == yn)
            return !n.size;
          if (st(n))
            return !Jr(n).length;
          for (var t in n)
            if (F.call(n, t))
              return !1;
          return !0;
        }
        function fg(n, e) {
          return ut(n, e);
        }
        function og(n, e, t) {
          t = typeof t == "function" ? t : o;
          var r = t ? t(n, e) : o;
          return r === o ? ut(n, e, o, t) : !!r;
        }
        function Ai(n) {
          if (!J(n))
            return !1;
          var e = on(n);
          return e == pt || e == yo || typeof n.message == "string" && typeof n.name == "string" && !lt(n);
        }
        function sg(n) {
          return typeof n == "number" && Iu(n);
        }
        function Xn(n) {
          if (!Z(n))
            return !1;
          var e = on(n);
          return e == vt || e == Pi || e == Ro || e == Mo;
        }
        function Jf(n) {
          return typeof n == "number" && n == R(n);
        }
        function ir(n) {
          return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Ee;
        }
        function Z(n) {
          var e = typeof n;
          return n != null && (e == "object" || e == "function");
        }
        function J(n) {
          return n != null && typeof n == "object";
        }
        var Xf = su ? dn(su) : hl;
        function cg(n, e) {
          return n === e || Yr(n, e, li(e));
        }
        function lg(n, e, t) {
          return t = typeof t == "function" ? t : o, Yr(n, e, li(e), t);
        }
        function ag(n) {
          return Qf(n) && n != +n;
        }
        function hg(n) {
          if (Xl(n))
            throw new I($);
          return Gu(n);
        }
        function gg(n) {
          return n === null;
        }
        function _g(n) {
          return n == null;
        }
        function Qf(n) {
          return typeof n == "number" || J(n) && on(n) == Ke;
        }
        function lt(n) {
          if (!J(n) || on(n) != Hn)
            return !1;
          var e = Lt(n);
          if (e === null)
            return !0;
          var t = F.call(e, "constructor") && e.constructor;
          return typeof t == "function" && t instanceof t && It.call(t) == lc;
        }
        var Ei = cu ? dn(cu) : gl;
        function dg(n) {
          return Jf(n) && n >= -9007199254740991 && n <= Ee;
        }
        var Vf = lu ? dn(lu) : _l;
        function ur(n) {
          return typeof n == "string" || !C(n) && J(n) && on(n) == Ye;
        }
        function vn(n) {
          return typeof n == "symbol" || J(n) && on(n) == wt;
        }
        var We = au ? dn(au) : dl;
        function pg(n) {
          return n === o;
        }
        function vg(n) {
          return J(n) && un(n) == Je;
        }
        function wg(n) {
          return J(n) && on(n) == Po;
        }
        var xg = Xt(Xr), Ag = Xt(function(n, e) {
          return n <= e;
        });
        function kf(n) {
          if (!n)
            return [];
          if (an(n))
            return ur(n) ? Ln(n) : ln(n);
          if (Ve && n[Ve])
            return ks(n[Ve]());
          var e = un(n), t = e == Rn ? Wr : e == yn ? bt : Ue;
          return t(n);
        }
        function Qn(n) {
          if (!n)
            return n === 0 ? n : 0;
          if (n = In(n), n === gt || n === -1 / 0) {
            var e = n < 0 ? -1 : 1;
            return e * Oo;
          }
          return n === n ? n : 0;
        }
        function R(n) {
          var e = Qn(n), t = e % 1;
          return e === e ? t ? e - t : e : 0;
        }
        function jf(n) {
          return n ? he(R(n), 0, Bn) : 0;
        }
        function In(n) {
          if (typeof n == "number")
            return n;
          if (vn(n))
            return _t;
          if (Z(n)) {
            var e = typeof n.valueOf == "function" ? n.valueOf() : n;
            n = Z(e) ? e + "" : e;
          }
          if (typeof n != "string")
            return n === 0 ? n : +n;
          n = vu(n);
          var t = es.test(n);
          return t || rs.test(n) ? Bs(n.slice(2), t ? 2 : 8) : ns.test(n) ? _t : +n;
        }
        function no(n) {
          return Un(n, hn(n));
        }
        function Eg(n) {
          return n ? he(R(n), -9007199254740991, Ee) : n === 0 ? n : 0;
        }
        function W(n) {
          return n == null ? "" : pn(n);
        }
        var mg = De(function(n, e) {
          if (st(e) || an(e)) {
            Un(e, nn(e), n);
            return;
          }
          for (var t in e)
            F.call(e, t) && tt(n, t, e[t]);
        }), eo = De(function(n, e) {
          Un(e, hn(e), n);
        }), fr = De(function(n, e, t, r) {
          Un(e, hn(e), n, r);
        }), Sg = De(function(n, e, t, r) {
          Un(e, nn(e), n, r);
        }), bg = Yn(Hr);
        function Og(n, e) {
          var t = Me(n);
          return e == null ? t : Mu(t, e);
        }
        var Tg = L(function(n, e) {
          n = G(n);
          var t = -1, r = e.length, i = r > 2 ? e[2] : o;
          for (i && sn(e[0], e[1], i) && (r = 1); ++t < r; )
            for (var f = e[t], s = hn(f), c = -1, a = s.length; ++c < a; ) {
              var p = s[c], v = n[p];
              (v === o || Dn(v, Re[p]) && !F.call(n, p)) && (n[p] = f[p]);
            }
          return n;
        }), Ig = L(function(n) {
          return n.push(o, wf), _n(to, o, n);
        });
        function Cg(n, e) {
          return gu(n, b(e, 3), Wn);
        }
        function Rg(n, e) {
          return gu(n, b(e, 3), qr);
        }
        function yg(n, e) {
          return n == null ? n : zr(n, b(e, 3), hn);
        }
        function Lg(n, e) {
          return n == null ? n : Uu(n, b(e, 3), hn);
        }
        function Mg(n, e) {
          return n && Wn(n, b(e, 3));
        }
        function Dg(n, e) {
          return n && qr(n, b(e, 3));
        }
        function Pg(n) {
          return n == null ? [] : $t(n, nn(n));
        }
        function Bg(n) {
          return n == null ? [] : $t(n, hn(n));
        }
        function mi(n, e, t) {
          var r = n == null ? o : ge(n, e);
          return r === o ? t : r;
        }
        function Wg(n, e) {
          return n != null && Ef(n, e, ul);
        }
        function Si(n, e) {
          return n != null && Ef(n, e, fl);
        }
        var Ug = gf(function(n, e, t) {
          e != null && typeof e.toString != "function" && (e = Ct.call(e)), n[e] = t;
        }, Oi(gn)), Fg = gf(function(n, e, t) {
          e != null && typeof e.toString != "function" && (e = Ct.call(e)), F.call(n, e) ? n[e].push(t) : n[e] = [t];
        }, b), Ng = L(it);
        function nn(n) {
          return an(n) ? yu(n) : Jr(n);
        }
        function hn(n) {
          return an(n) ? yu(n, !0) : pl(n);
        }
        function Gg(n, e) {
          var t = {};
          return e = b(e, 3), Wn(n, function(r, i, f) {
            Kn(t, e(r, i, f), r);
          }), t;
        }
        function $g(n, e) {
          var t = {};
          return e = b(e, 3), Wn(n, function(r, i, f) {
            Kn(t, i, e(r, i, f));
          }), t;
        }
        var Hg = De(function(n, e, t) {
          Ht(n, e, t);
        }), to = De(function(n, e, t, r) {
          Ht(n, e, t, r);
        }), zg = Yn(function(n, e) {
          var t = {};
          if (n == null)
            return t;
          var r = !1;
          e = K(e, function(f) {
            return f = ue(f, n), r || (r = f.length > 1), f;
          }), Un(n, si(n), t), r && (t = bn(t, kn | Li | we, Ul));
          for (var i = e.length; i--; )
            ni(t, e[i]);
          return t;
        });
        function qg(n, e) {
          return ro(n, rr(b(e)));
        }
        var Kg = Yn(function(n, e) {
          return n == null ? {} : wl(n, e);
        });
        function ro(n, e) {
          if (n == null)
            return {};
          var t = K(si(n), function(r) {
            return [r];
          });
          return e = b(e), Yu(n, t, function(r, i) {
            return e(r, i[0]);
          });
        }
        function Zg(n, e, t) {
          e = ue(e, n);
          var r = -1, i = e.length;
          for (i || (i = 1, n = o); ++r < i; ) {
            var f = n == null ? o : n[Fn(e[r])];
            f === o && (r = i, f = t), n = Xn(f) ? f.call(n) : f;
          }
          return n;
        }
        function Yg(n, e, t) {
          return n == null ? n : ft(n, e, t);
        }
        function Jg(n, e, t, r) {
          return r = typeof r == "function" ? r : o, n == null ? n : ft(n, e, t, r);
        }
        var io = pf(nn), uo = pf(hn);
        function Xg(n, e, t) {
          var r = C(n), i = r || oe(n) || We(n);
          if (e = b(e, 4), t == null) {
            var f = n && n.constructor;
            i ? t = r ? new f() : [] : Z(n) ? t = Xn(f) ? Me(Lt(n)) : {} : t = {};
          }
          return (i ? En : Wn)(n, function(s, c, a) {
            return e(t, s, c, a);
          }), t;
        }
        function Qg(n, e) {
          return n == null ? !0 : ni(n, e);
        }
        function Vg(n, e, t) {
          return n == null ? n : ku(n, e, ri(t));
        }
        function kg(n, e, t, r) {
          return r = typeof r == "function" ? r : o, n == null ? n : ku(n, e, ri(t), r);
        }
        function Ue(n) {
          return n == null ? [] : Br(n, nn(n));
        }
        function jg(n) {
          return n == null ? [] : Br(n, hn(n));
        }
        function n_(n, e, t) {
          return t === o && (t = e, e = o), t !== o && (t = In(t), t = t === t ? t : 0), e !== o && (e = In(e), e = e === e ? e : 0), he(In(n), e, t);
        }
        function e_(n, e, t) {
          return e = Qn(e), t === o ? (t = e, e = 0) : t = Qn(t), n = In(n), ol(n, e, t);
        }
        function t_(n, e, t) {
          if (t && typeof t != "boolean" && sn(n, e, t) && (e = t = o), t === o && (typeof e == "boolean" ? (t = e, e = o) : typeof n == "boolean" && (t = n, n = o)), n === o && e === o ? (n = 0, e = 1) : (n = Qn(n), e === o ? (e = n, n = 0) : e = Qn(e)), n > e) {
            var r = n;
            n = e, e = r;
          }
          if (t || n % 1 || e % 1) {
            var i = Cu();
            return rn(n + i * (e - n + Ps("1e-" + ((i + "").length - 1))), e);
          }
          return Vr(n, e);
        }
        var r_ = Pe(function(n, e, t) {
          return e = e.toLowerCase(), n + (t ? fo(e) : e);
        });
        function fo(n) {
          return bi(W(n).toLowerCase());
        }
        function oo(n) {
          return n = W(n), n && n.replace(us, Ys).replace(bs, "");
        }
        function i_(n, e, t) {
          n = W(n), e = pn(e);
          var r = n.length;
          t = t === o ? r : he(R(t), 0, r);
          var i = t;
          return t -= e.length, t >= 0 && n.slice(t, i) == e;
        }
        function u_(n) {
          return n = W(n), n && No.test(n) ? n.replace(Ui, Js) : n;
        }
        function f_(n) {
          return n = W(n), n && Ko.test(n) ? n.replace(xr, "\\$&") : n;
        }
        var o_ = Pe(function(n, e, t) {
          return n + (t ? "-" : "") + e.toLowerCase();
        }), s_ = Pe(function(n, e, t) {
          return n + (t ? " " : "") + e.toLowerCase();
        }), c_ = lf("toLowerCase");
        function l_(n, e, t) {
          n = W(n), e = R(e);
          var r = e ? Ie(n) : 0;
          if (!e || r >= e)
            return n;
          var i = (e - r) / 2;
          return Jt(Bt(i), t) + n + Jt(Pt(i), t);
        }
        function a_(n, e, t) {
          n = W(n), e = R(e);
          var r = e ? Ie(n) : 0;
          return e && r < e ? n + Jt(e - r, t) : n;
        }
        function h_(n, e, t) {
          n = W(n), e = R(e);
          var r = e ? Ie(n) : 0;
          return e && r < e ? Jt(e - r, t) + n : n;
        }
        function g_(n, e, t) {
          return t || e == null ? e = 0 : e && (e = +e), Ac(W(n).replace(Ar, ""), e || 0);
        }
        function __(n, e, t) {
          return (t ? sn(n, e, t) : e === o) ? e = 1 : e = R(e), kr(W(n), e);
        }
        function d_() {
          var n = arguments, e = W(n[0]);
          return n.length < 3 ? e : e.replace(n[1], n[2]);
        }
        var p_ = Pe(function(n, e, t) {
          return n + (t ? "_" : "") + e.toLowerCase();
        });
        function v_(n, e, t) {
          return t && typeof t != "number" && sn(n, e, t) && (e = t = o), t = t === o ? Bn : t >>> 0, t ? (n = W(n), n && (typeof e == "string" || e != null && !Ei(e)) && (e = pn(e), !e && Te(n)) ? fe(Ln(n), 0, t) : n.split(e, t)) : [];
        }
        var w_ = Pe(function(n, e, t) {
          return n + (t ? " " : "") + bi(e);
        });
        function x_(n, e, t) {
          return n = W(n), t = t == null ? 0 : he(R(t), 0, n.length), e = pn(e), n.slice(t, t + e.length) == e;
        }
        function A_(n, e, t) {
          var r = u.templateSettings;
          t && sn(n, e, t) && (e = o), n = W(n), e = fr({}, e, r, vf);
          var i = fr({}, e.imports, r.imports, vf), f = nn(i), s = Br(i, f), c, a, p = 0, v = e.interpolate || xt, w = "__p += '", x = Ur(
            (e.escape || xt).source + "|" + v.source + "|" + (v === Fi ? jo : xt).source + "|" + (e.evaluate || xt).source + "|$",
            "g"
          ), m = "//# sourceURL=" + (F.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Rs + "]") + `
`;
          n.replace(x, function(T, M, P, wn, cn, xn) {
            return P || (P = wn), w += n.slice(p, xn).replace(fs, Xs), M && (c = !0, w += `' +
__e(` + M + `) +
'`), cn && (a = !0, w += `';
` + cn + `;
__p += '`), P && (w += `' +
((__t = (` + P + `)) == null ? '' : __t) +
'`), p = xn + T.length, T;
          }), w += `';
`;
          var O = F.call(e, "variable") && e.variable;
          if (!O)
            w = `with (obj) {
` + w + `
}
`;
          else if (Vo.test(O))
            throw new I(X);
          w = (a ? w.replace(Bo, "") : w).replace(Wo, "$1").replace(Uo, "$1;"), w = "function(" + (O || "obj") + `) {
` + (O ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (a ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + w + `return __p
}`;
          var y = co(function() {
            return B(f, m + "return " + w).apply(o, s);
          });
          if (y.source = w, Ai(y))
            throw y;
          return y;
        }
        function E_(n) {
          return W(n).toLowerCase();
        }
        function m_(n) {
          return W(n).toUpperCase();
        }
        function S_(n, e, t) {
          if (n = W(n), n && (t || e === o))
            return vu(n);
          if (!n || !(e = pn(e)))
            return n;
          var r = Ln(n), i = Ln(e), f = wu(r, i), s = xu(r, i) + 1;
          return fe(r, f, s).join("");
        }
        function b_(n, e, t) {
          if (n = W(n), n && (t || e === o))
            return n.slice(0, Eu(n) + 1);
          if (!n || !(e = pn(e)))
            return n;
          var r = Ln(n), i = xu(r, Ln(e)) + 1;
          return fe(r, 0, i).join("");
        }
        function O_(n, e, t) {
          if (n = W(n), n && (t || e === o))
            return n.replace(Ar, "");
          if (!n || !(e = pn(e)))
            return n;
          var r = Ln(n), i = wu(r, Ln(e));
          return fe(r, i).join("");
        }
        function T_(n, e) {
          var t = xo, r = Ao;
          if (Z(e)) {
            var i = "separator" in e ? e.separator : i;
            t = "length" in e ? R(e.length) : t, r = "omission" in e ? pn(e.omission) : r;
          }
          n = W(n);
          var f = n.length;
          if (Te(n)) {
            var s = Ln(n);
            f = s.length;
          }
          if (t >= f)
            return n;
          var c = t - Ie(r);
          if (c < 1)
            return r;
          var a = s ? fe(s, 0, c).join("") : n.slice(0, c);
          if (i === o)
            return a + r;
          if (s && (c += a.length - c), Ei(i)) {
            if (n.slice(c).search(i)) {
              var p, v = a;
              for (i.global || (i = Ur(i.source, W(Ni.exec(i)) + "g")), i.lastIndex = 0; p = i.exec(v); )
                var w = p.index;
              a = a.slice(0, w === o ? c : w);
            }
          } else if (n.indexOf(pn(i), c) != c) {
            var x = a.lastIndexOf(i);
            x > -1 && (a = a.slice(0, x));
          }
          return a + r;
        }
        function I_(n) {
          return n = W(n), n && Fo.test(n) ? n.replace(Wi, tc) : n;
        }
        var C_ = Pe(function(n, e, t) {
          return n + (t ? " " : "") + e.toUpperCase();
        }), bi = lf("toUpperCase");
        function so(n, e, t) {
          return n = W(n), e = t ? o : e, e === o ? Vs(n) ? uc(n) : Hs(n) : n.match(e) || [];
        }
        var co = L(function(n, e) {
          try {
            return _n(n, o, e);
          } catch (t) {
            return Ai(t) ? t : new I(t);
          }
        }), R_ = Yn(function(n, e) {
          return En(e, function(t) {
            t = Fn(t), Kn(n, t, wi(n[t], n));
          }), n;
        });
        function y_(n) {
          var e = n == null ? 0 : n.length, t = b();
          return n = e ? K(n, function(r) {
            if (typeof r[1] != "function")
              throw new mn(z);
            return [t(r[0]), r[1]];
          }) : [], L(function(r) {
            for (var i = -1; ++i < e; ) {
              var f = n[i];
              if (_n(f[0], this, r))
                return _n(f[1], this, r);
            }
          });
        }
        function L_(n) {
          return tl(bn(n, kn));
        }
        function Oi(n) {
          return function() {
            return n;
          };
        }
        function M_(n, e) {
          return n == null || n !== n ? e : n;
        }
        var D_ = hf(), P_ = hf(!0);
        function gn(n) {
          return n;
        }
        function Ti(n) {
          return $u(typeof n == "function" ? n : bn(n, kn));
        }
        function B_(n) {
          return zu(bn(n, kn));
        }
        function W_(n, e) {
          return qu(n, bn(e, kn));
        }
        var U_ = L(function(n, e) {
          return function(t) {
            return it(t, n, e);
          };
        }), F_ = L(function(n, e) {
          return function(t) {
            return it(n, t, e);
          };
        });
        function Ii(n, e, t) {
          var r = nn(e), i = $t(e, r);
          t == null && !(Z(e) && (i.length || !r.length)) && (t = e, e = n, n = this, i = $t(e, nn(e)));
          var f = !(Z(t) && "chain" in t) || !!t.chain, s = Xn(n);
          return En(i, function(c) {
            var a = e[c];
            n[c] = a, s && (n.prototype[c] = function() {
              var p = this.__chain__;
              if (f || p) {
                var v = n(this.__wrapped__), w = v.__actions__ = ln(this.__actions__);
                return w.push({ func: a, args: arguments, thisArg: n }), v.__chain__ = p, v;
              }
              return a.apply(n, ne([this.value()], arguments));
            });
          }), n;
        }
        function N_() {
          return en._ === this && (en._ = ac), this;
        }
        function Ci() {
        }
        function G_(n) {
          return n = R(n), L(function(e) {
            return Ku(e, n);
          });
        }
        var $_ = ui(K), H_ = ui(hu), z_ = ui(yr);
        function lo(n) {
          return hi(n) ? Lr(Fn(n)) : xl(n);
        }
        function q_(n) {
          return function(e) {
            return n == null ? o : ge(n, e);
          };
        }
        var K_ = _f(), Z_ = _f(!0);
        function Ri() {
          return [];
        }
        function yi() {
          return !1;
        }
        function Y_() {
          return {};
        }
        function J_() {
          return "";
        }
        function X_() {
          return !0;
        }
        function Q_(n, e) {
          if (n = R(n), n < 1 || n > Ee)
            return [];
          var t = Bn, r = rn(n, Bn);
          e = b(e), n -= Bn;
          for (var i = Pr(r, e); ++t < n; )
            e(t);
          return i;
        }
        function V_(n) {
          return C(n) ? K(n, Fn) : vn(n) ? [n] : ln(yf(W(n)));
        }
        function k_(n) {
          var e = ++cc;
          return W(n) + e;
        }
        var j_ = Yt(function(n, e) {
          return n + e;
        }, 0), nd = fi("ceil"), ed = Yt(function(n, e) {
          return n / e;
        }, 1), td = fi("floor");
        function rd(n) {
          return n && n.length ? Gt(n, gn, Kr) : o;
        }
        function id(n, e) {
          return n && n.length ? Gt(n, b(e, 2), Kr) : o;
        }
        function ud(n) {
          return du(n, gn);
        }
        function fd(n, e) {
          return du(n, b(e, 2));
        }
        function od(n) {
          return n && n.length ? Gt(n, gn, Xr) : o;
        }
        function sd(n, e) {
          return n && n.length ? Gt(n, b(e, 2), Xr) : o;
        }
        var cd = Yt(function(n, e) {
          return n * e;
        }, 1), ld = fi("round"), ad = Yt(function(n, e) {
          return n - e;
        }, 0);
        function hd(n) {
          return n && n.length ? Dr(n, gn) : 0;
        }
        function gd(n, e) {
          return n && n.length ? Dr(n, b(e, 2)) : 0;
        }
        return u.after = Bh, u.ary = $f, u.assign = mg, u.assignIn = eo, u.assignInWith = fr, u.assignWith = Sg, u.at = bg, u.before = Hf, u.bind = wi, u.bindAll = R_, u.bindKey = zf, u.castArray = Yh, u.chain = Ff, u.chunk = ta, u.compact = ra, u.concat = ia, u.cond = y_, u.conforms = L_, u.constant = Oi, u.countBy = hh, u.create = Og, u.curry = qf, u.curryRight = Kf, u.debounce = Zf, u.defaults = Tg, u.defaultsDeep = Ig, u.defer = Wh, u.delay = Uh, u.difference = ua, u.differenceBy = fa, u.differenceWith = oa, u.drop = sa, u.dropRight = ca, u.dropRightWhile = la, u.dropWhile = aa, u.fill = ha, u.filter = _h, u.flatMap = vh, u.flatMapDeep = wh, u.flatMapDepth = xh, u.flatten = Pf, u.flattenDeep = ga, u.flattenDepth = _a, u.flip = Fh, u.flow = D_, u.flowRight = P_, u.fromPairs = da, u.functions = Pg, u.functionsIn = Bg, u.groupBy = Ah, u.initial = va, u.intersection = wa, u.intersectionBy = xa, u.intersectionWith = Aa, u.invert = Ug, u.invertBy = Fg, u.invokeMap = mh, u.iteratee = Ti, u.keyBy = Sh, u.keys = nn, u.keysIn = hn, u.map = nr, u.mapKeys = Gg, u.mapValues = $g, u.matches = B_, u.matchesProperty = W_, u.memoize = tr, u.merge = Hg, u.mergeWith = to, u.method = U_, u.methodOf = F_, u.mixin = Ii, u.negate = rr, u.nthArg = G_, u.omit = zg, u.omitBy = qg, u.once = Nh, u.orderBy = bh, u.over = $_, u.overArgs = Gh, u.overEvery = H_, u.overSome = z_, u.partial = xi, u.partialRight = Yf, u.partition = Oh, u.pick = Kg, u.pickBy = ro, u.property = lo, u.propertyOf = q_, u.pull = ba, u.pullAll = Wf, u.pullAllBy = Oa, u.pullAllWith = Ta, u.pullAt = Ia, u.range = K_, u.rangeRight = Z_, u.rearg = $h, u.reject = Ch, u.remove = Ca, u.rest = Hh, u.reverse = pi, u.sampleSize = yh, u.set = Yg, u.setWith = Jg, u.shuffle = Lh, u.slice = Ra, u.sortBy = Ph, u.sortedUniq = Wa, u.sortedUniqBy = Ua, u.split = v_, u.spread = zh, u.tail = Fa, u.take = Na, u.takeRight = Ga, u.takeRightWhile = $a, u.takeWhile = Ha, u.tap = rh, u.throttle = qh, u.thru = jt, u.toArray = kf, u.toPairs = io, u.toPairsIn = uo, u.toPath = V_, u.toPlainObject = no, u.transform = Xg, u.unary = Kh, u.union = za, u.unionBy = qa, u.unionWith = Ka, u.uniq = Za, u.uniqBy = Ya, u.uniqWith = Ja, u.unset = Qg, u.unzip = vi, u.unzipWith = Uf, u.update = Vg, u.updateWith = kg, u.values = Ue, u.valuesIn = jg, u.without = Xa, u.words = so, u.wrap = Zh, u.xor = Qa, u.xorBy = Va, u.xorWith = ka, u.zip = ja, u.zipObject = nh, u.zipObjectDeep = eh, u.zipWith = th, u.entries = io, u.entriesIn = uo, u.extend = eo, u.extendWith = fr, Ii(u, u), u.add = j_, u.attempt = co, u.camelCase = r_, u.capitalize = fo, u.ceil = nd, u.clamp = n_, u.clone = Jh, u.cloneDeep = Qh, u.cloneDeepWith = Vh, u.cloneWith = Xh, u.conformsTo = kh, u.deburr = oo, u.defaultTo = M_, u.divide = ed, u.endsWith = i_, u.eq = Dn, u.escape = u_, u.escapeRegExp = f_, u.every = gh, u.find = dh, u.findIndex = Mf, u.findKey = Cg, u.findLast = ph, u.findLastIndex = Df, u.findLastKey = Rg, u.floor = td, u.forEach = Nf, u.forEachRight = Gf, u.forIn = yg, u.forInRight = Lg, u.forOwn = Mg, u.forOwnRight = Dg, u.get = mi, u.gt = jh, u.gte = ng, u.has = Wg, u.hasIn = Si, u.head = Bf, u.identity = gn, u.includes = Eh, u.indexOf = pa, u.inRange = e_, u.invoke = Ng, u.isArguments = pe, u.isArray = C, u.isArrayBuffer = eg, u.isArrayLike = an, u.isArrayLikeObject = Q, u.isBoolean = tg, u.isBuffer = oe, u.isDate = rg, u.isElement = ig, u.isEmpty = ug, u.isEqual = fg, u.isEqualWith = og, u.isError = Ai, u.isFinite = sg, u.isFunction = Xn, u.isInteger = Jf, u.isLength = ir, u.isMap = Xf, u.isMatch = cg, u.isMatchWith = lg, u.isNaN = ag, u.isNative = hg, u.isNil = _g, u.isNull = gg, u.isNumber = Qf, u.isObject = Z, u.isObjectLike = J, u.isPlainObject = lt, u.isRegExp = Ei, u.isSafeInteger = dg, u.isSet = Vf, u.isString = ur, u.isSymbol = vn, u.isTypedArray = We, u.isUndefined = pg, u.isWeakMap = vg, u.isWeakSet = wg, u.join = Ea, u.kebabCase = o_, u.last = Tn, u.lastIndexOf = ma, u.lowerCase = s_, u.lowerFirst = c_, u.lt = xg, u.lte = Ag, u.max = rd, u.maxBy = id, u.mean = ud, u.meanBy = fd, u.min = od, u.minBy = sd, u.stubArray = Ri, u.stubFalse = yi, u.stubObject = Y_, u.stubString = J_, u.stubTrue = X_, u.multiply = cd, u.nth = Sa, u.noConflict = N_, u.noop = Ci, u.now = er, u.pad = l_, u.padEnd = a_, u.padStart = h_, u.parseInt = g_, u.random = t_, u.reduce = Th, u.reduceRight = Ih, u.repeat = __, u.replace = d_, u.result = Zg, u.round = ld, u.runInContext = l, u.sample = Rh, u.size = Mh, u.snakeCase = p_, u.some = Dh, u.sortedIndex = ya, u.sortedIndexBy = La, u.sortedIndexOf = Ma, u.sortedLastIndex = Da, u.sortedLastIndexBy = Pa, u.sortedLastIndexOf = Ba, u.startCase = w_, u.startsWith = x_, u.subtract = ad, u.sum = hd, u.sumBy = gd, u.template = A_, u.times = Q_, u.toFinite = Qn, u.toInteger = R, u.toLength = jf, u.toLower = E_, u.toNumber = In, u.toSafeInteger = Eg, u.toString = W, u.toUpper = m_, u.trim = S_, u.trimEnd = b_, u.trimStart = O_, u.truncate = T_, u.unescape = I_, u.uniqueId = k_, u.upperCase = C_, u.upperFirst = bi, u.each = Nf, u.eachRight = Gf, u.first = Bf, Ii(u, function() {
          var n = {};
          return Wn(u, function(e, t) {
            F.call(u.prototype, t) || (n[t] = e);
          }), n;
        }(), { chain: !1 }), u.VERSION = S, En(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
          u[n].placeholder = u;
        }), En(["drop", "take"], function(n, e) {
          D.prototype[n] = function(t) {
            t = t === o ? 1 : j(R(t), 0);
            var r = this.__filtered__ && !e ? new D(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = rn(t, r.__takeCount__) : r.__views__.push({
              size: rn(t, Bn),
              type: n + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, D.prototype[n + "Right"] = function(t) {
            return this.reverse()[n](t).reverse();
          };
        }), En(["filter", "map", "takeWhile"], function(n, e) {
          var t = e + 1, r = t == Di || t == bo;
          D.prototype[n] = function(i) {
            var f = this.clone();
            return f.__iteratees__.push({
              iteratee: b(i, 3),
              type: t
            }), f.__filtered__ = f.__filtered__ || r, f;
          };
        }), En(["head", "last"], function(n, e) {
          var t = "take" + (e ? "Right" : "");
          D.prototype[n] = function() {
            return this[t](1).value()[0];
          };
        }), En(["initial", "tail"], function(n, e) {
          var t = "drop" + (e ? "" : "Right");
          D.prototype[n] = function() {
            return this.__filtered__ ? new D(this) : this[t](1);
          };
        }), D.prototype.compact = function() {
          return this.filter(gn);
        }, D.prototype.find = function(n) {
          return this.filter(n).head();
        }, D.prototype.findLast = function(n) {
          return this.reverse().find(n);
        }, D.prototype.invokeMap = L(function(n, e) {
          return typeof n == "function" ? new D(this) : this.map(function(t) {
            return it(t, n, e);
          });
        }), D.prototype.reject = function(n) {
          return this.filter(rr(b(n)));
        }, D.prototype.slice = function(n, e) {
          n = R(n);
          var t = this;
          return t.__filtered__ && (n > 0 || e < 0) ? new D(t) : (n < 0 ? t = t.takeRight(-n) : n && (t = t.drop(n)), e !== o && (e = R(e), t = e < 0 ? t.dropRight(-e) : t.take(e - n)), t);
        }, D.prototype.takeRightWhile = function(n) {
          return this.reverse().takeWhile(n).reverse();
        }, D.prototype.toArray = function() {
          return this.take(Bn);
        }, Wn(D.prototype, function(n, e) {
          var t = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), i = u[r ? "take" + (e == "last" ? "Right" : "") : e], f = r || /^find/.test(e);
          i && (u.prototype[e] = function() {
            var s = this.__wrapped__, c = r ? [1] : arguments, a = s instanceof D, p = c[0], v = a || C(s), w = function(M) {
              var P = i.apply(u, ne([M], c));
              return r && x ? P[0] : P;
            };
            v && t && typeof p == "function" && p.length != 1 && (a = v = !1);
            var x = this.__chain__, m = !!this.__actions__.length, O = f && !x, y = a && !m;
            if (!f && v) {
              s = y ? s : new D(this);
              var T = n.apply(s, c);
              return T.__actions__.push({ func: jt, args: [w], thisArg: o }), new Sn(T, x);
            }
            return O && y ? n.apply(this, c) : (T = this.thru(w), O ? r ? T.value()[0] : T.value() : T);
          });
        }), En(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
          var e = Ot[n], t = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n);
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
        }), Wn(D.prototype, function(n, e) {
          var t = u[e];
          if (t) {
            var r = t.name + "";
            F.call(Le, r) || (Le[r] = []), Le[r].push({ name: e, func: t });
          }
        }), Le[Zt(o, Ae).name] = [{
          name: "wrapper",
          func: o
        }], D.prototype.clone = Ic, D.prototype.reverse = Cc, D.prototype.value = Rc, u.prototype.at = ih, u.prototype.chain = uh, u.prototype.commit = fh, u.prototype.next = oh, u.prototype.plant = ch, u.prototype.reverse = lh, u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = ah, u.prototype.first = u.prototype.head, Ve && (u.prototype[Ve] = sh), u;
      }, Ce = fc();
      se ? ((se.exports = Ce)._ = Ce, Tr._ = Ce) : en._ = Ce;
    }).call(Rd);
  }(at, at.exports)), at.exports;
}
var Ld = yd();
const Fe = U.define({
  description: "Updates an existing object.",
  execute: (d, { engine: g, registered: o }) => {
    const S = o.get(d.id);
    if (!S) throw new Error("Object not found.");
    const E = Ld.merge(S, d);
    o.set(d.id, E), g.scene.root.updateSceneObject({
      ...d,
      id: E.id,
      entityType: E.entityType
    });
  }
});
N("UPDATE_OBJECT", Fe);
const wo = U.define({
  description: "Attach an object to another object.",
  execute: (d, { engine: g, registered: o }) => {
    const S = o.get(d.object.id);
    if (!S) throw new Error("Object not found.");
    const E = g.scene.root.getSceneObject(S);
    if (!E) throw new Error("Object not found in scene.");
    if (d.parent === null)
      throw g.scene.root.attach(E), new Fe(
        {
          id: S.id,
          parentId: null
        },
        { engine: g, registered: o }
      ), new Error("Object not found in scene.");
    if (d.object.id === d.parent.id)
      throw new Error("Cannot attach object to itself.");
    const $ = o.get(d.parent.id);
    if (!$)
      throw g.scene.root.attach(E), new Fe(
        {
          id: S.id,
          parentId: null
        },
        { engine: g, registered: o }
      ), new Error("Parent object not found.");
    const z = g.scene.root.getSceneObject($);
    if (!z)
      throw g.scene.root.attach(E), new Fe(
        {
          id: S.id,
          parentId: null
        },
        { engine: g, registered: o }
      ), new Error("Parent object not found in scene.");
    z.attach(E), new Fe(
      {
        id: S.id,
        parentId: $.id
      },
      { engine: g, registered: o }
    );
  }
});
N("SET_PARENT", wo);
const Md = U.define({
  description: "Deletes an object from the scene.",
  execute: (d, { engine: g, registered: o }) => {
    const S = o.get(d.id);
    if (!S) return !1;
    S.parentId && new wo(
      {
        object: { id: S.id },
        parent: null
      },
      {
        engine: g,
        registered: o
      }
    ).execute(), S.entityType === "group" && o.forEach((E) => {
      E.parentId === S.id && new Fe(
        {
          id: E.id,
          parentId: null
        },
        {
          engine: g,
          registered: o
        }
      ).execute();
    }), Object.assign(d, S), o.delete(d.id), g.scene.root.deleteSceneObject(S);
  }
});
N("DELETE_OBJECT", Md);
const Dd = U.define({
  description: "Deselects an existing object.",
  execute: async (d, { engine: g, getToolbox: o, registered: S }) => {
    const E = S.get(d.id);
    if (!E) throw new Error("Object not found.");
    const $ = g.scene.root.getSceneObject(E);
    if (!$) throw new Error("Object not found in scene.");
    if (!("isSelectable" in $))
      throw new Error("Object is not selectable.");
    const X = (await o()).getActiveTool();
    X && po(X) && X.detachGizmo();
  }
});
N("DESELECT_OBJECT", Dd);
const Pd = U.define({
  description: "Places an object on top of an underlying object or the floor.",
  execute: (d, { engine: g, registered: o }) => {
    const S = o.get(d.id);
    if (!S)
      throw new Error(
        `Object with id ${d.id} not registered. Registered: ${o}`
      );
    const E = g.scene.root.getSceneObject(S);
    if (!E)
      throw new Error(
        `Object with id ${d.id} is not found in the scene. Scene: ${g.scene}`
      );
    if (!("isDIVEModel" in E))
      throw new Error(
        `Object with id ${d.id} is not a DIVEModel. Object: ${E}`
      );
    E.dropIt();
  }
});
N("DROP_IT", Pd);
const Bd = U.define({
  description: "Retrieves all objects in the state.",
  execute: (d, { registered: g }) => g
});
N("GET_ALL_OBJECTS", Bd);
const Wd = U.define({
  description: "Returns a list of objects of given IDs.",
  execute: (d, { registered: g }) => d.ids.length === 0 ? [] : Array.from(g.values()).filter(
    (o) => d.ids.includes(o.id)
  )
});
N("GET_OBJECTS", Wd);
const Ud = U.define({
  description: "Is triggered when a model is loaded.",
  execute: (d, { registered: g }) => {
    const o = g.get(d.id);
    if (!o)
      throw new Error(`Model with id ${d.id} not found`);
    if (!wd(o))
      throw new Error(`Model with id ${d.id} is not a ModelSchema`);
    o.loaded = !0;
  }
});
N("MODEL_LOADED", Ud);
const Fd = U.define({
  description: "Places an object on the floor.",
  execute: (d, { engine: g, registered: o }) => {
    const S = o.get(d.id);
    if (!S)
      throw new Error(
        `Object with id ${d.id} not registered. Registered: ${o}`
      );
    const E = g.scene.root.getSceneObject(S);
    if (!E)
      throw new Error(
        `Object with id ${d.id} is not found in the scene. Scene: ${g.scene}`
      );
    if (!("isDIVEModel" in E))
      throw new Error(
        `Object with id ${d.id} is not a DIVEModel. Object: ${E}`
      );
    E.placeOnFloor();
  }
});
N("PLACE_ON_FLOOR", Fd);
const Nd = U.define({
  description: "Selects an existing object.",
  execute: async (d, { engine: g, getToolbox: o, registered: S }) => {
    const E = S.get(d.id);
    if (!E) throw new Error("Object not found.");
    const $ = g.scene.root.getSceneObject(E);
    if (!$) throw new Error("Object not found in scene.");
    if (!("isSelectable" in $))
      throw new Error("Object is not selectable.");
    const X = (await o()).getActiveTool();
    X && po(X) && X.attachGizmo($);
  }
});
N("SELECT_OBJECT", Nd);
const Gd = U.define({
  description: "Starts the render process.",
  execute: (d, { engine: g }) => {
    g.start();
  }
});
N("START_RENDER", Gd);
const $d = U.define({
  description: "Exports the current scene to a blob and returns the URL.",
  execute: async (d, { engine: g, getAssetExporter: o }) => o().then((S) => S.export(g.scene.root, d.type))
});
N("EXPORT_SCENE", $d);
const Hd = U.define({
  description: "Retrieves all current scene data.",
  execute: (d, { engine: g, controller: o, registered: S }) => ({
    name: g.scene.name,
    mediaItem: null,
    backgroundColor: "#" + g.scene.background.getHexString(),
    floorEnabled: g.scene.root.floor.visible,
    floorColor: "#" + g.scene.root.floor.material.color.getHexString(),
    userCamera: {
      position: o.object.position.clone(),
      target: o.target.clone()
    },
    spotmarks: [],
    lights: Array.from(S.values()).filter(
      (E) => E.entityType === "light"
    ),
    objects: Array.from(S.values()).filter(
      (E) => E.entityType === "model"
    ),
    cameras: Array.from(S.values()).filter(
      (E) => E.entityType === "pov"
    ),
    primitives: Array.from(S.values()).filter(
      (E) => E.entityType === "primitive"
    ),
    groups: Array.from(S.values()).filter(
      (E) => E.entityType === "group"
    )
  })
});
N(
  "GET_ALL_SCENE_DATA",
  Hd
);
const zd = U.define({
  description: "Set the background color of the scene.",
  execute: (d, { engine: g }) => {
    g.scene.setBackground(d.color);
  }
});
N("SET_BACKGROUND", zd);
const qd = U.define({
  description: "Updates scene properties.",
  execute: (d, { engine: g }) => {
    d.name !== void 0 && (g.scene.name = d.name), d.backgroundColor !== void 0 && g.scene.setBackground(d.backgroundColor), d.gridEnabled !== void 0 && g.scene.grid.setVisibility(d.gridEnabled), d.floorEnabled !== void 0 && g.scene.root.floor.setVisibility(d.floorEnabled), d.floorColor !== void 0 && g.scene.root.floor.setColor(d.floorColor), d.name = g.scene.name, d.backgroundColor = "#" + g.scene.background.getHexString(), d.gridEnabled = g.scene.grid.visible, d.floorEnabled = g.scene.root.floor.visible, d.floorColor = "#" + g.scene.root.floor.material.color.getHexString();
  }
});
N("UPDATE_SCENE", qd);
const Kd = U.define({
  description: "Sets the gizmo's mode.",
  execute: async (d, { getToolbox: g }) => {
    (await g()).setGizmoMode(d.mode);
  }
});
N("SET_GIZMO_MODE", Kd);
const Zd = U.define({
  description: "Sets the gizmo's unified scale mode.",
  execute: async (d, { getToolbox: g }) => {
    (await g()).setGizmoScaleLinked(d);
  }
});
N(
  "SET_GIZMO_SCALE_LINKED",
  Zd
);
const Yd = U.define({
  description: "Sets the gizmo's visibility.",
  execute: async (d, { getToolbox: g }) => {
    (await g()).setGizmoVisible(d);
  }
});
N(
  "SET_GIZMO_VISIBILITY",
  Yd
);
const Jd = U.define({
  description: "Activates a specific tool from the toolbox.",
  execute: async (d, { getToolbox: g }) => {
    (await g()).useTool(d.tool);
  }
});
N("USE_TOOL", Jd);
const Ne = class Ne {
  constructor(g, o) {
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
    this._id = pd(), this.engine = g, this.controller = o, Ne.__instances.push(this);
  }
  static get(g) {
    const o = this.__instances.find(
      (S) => S.id === g
    );
    return o || this.__instances.find(
      (S) => Array.from(S.registered.values()).find(
        (E) => E.id === g
      )
    );
  }
  get id() {
    return this._id;
  }
  async getMediaCreator() {
    return this._mediaCreator || (this._mediaCreator = new (await import("../mediacreator/index.mjs")).MediaCreator(
      this.engine.renderer,
      this.engine.scene,
      this.controller
    )), this._mediaCreator;
  }
  async getARSystem() {
    return this._arSystem || (this._arSystem = new (await import("../ar/index.mjs")).ARSystem()), this._arSystem;
  }
  async getAssetExporter() {
    return this._assetExplorer || (this._assetExplorer = new (await import("../assetexporter/index.mjs")).AssetExporter()), this._assetExplorer;
  }
  async getAnimationSystem() {
    return this._animationSystem || (this._animationSystem = new (await import("../animation/index.mjs")).AnimationSystem()), this._animationSystem;
  }
  async getToolbox() {
    return this._toolbox || (this._toolbox = new (await import("../toolbox/index.mjs")).Toolbox(this.engine.scene, this.controller)), this._toolbox;
  }
  destroyInstance() {
    const g = Ne.__instances.findIndex(
      (o) => o.id === this.id
    );
    return g === -1 ? !1 : (Ne.__instances.splice(g, 1), !0);
  }
  performAction(g, ...o) {
    const S = xd(g);
    if (!S)
      throw new Error(`Action ${g} is not defined.`);
    const E = this.getDependencies(), $ = o[0], z = new S($, E);
    try {
      const X = z.execute();
      return X && typeof X == "object" && "then" in X ? X.then((Y) => (this.dispatch(g, $), Y)).catch((Y) => {
        throw new Error(`Failed to execute ${g}`, {
          cause: Y
        });
      }) : (this.dispatch(g, $), X);
    } catch (X) {
      throw new Error(`Failed to execute ${g}`, { cause: X });
    }
  }
  subscribe(g, o) {
    return this.listeners.get(g) || this.listeners.set(g, []), this.listeners.get(g).push(o), () => {
      const S = this.listeners.get(g);
      if (!S) return;
      const E = S.findIndex(
        ($) => $ === o
      );
      E !== -1 && S.splice(E, 1);
    };
  }
  dispatch(g, o) {
    const S = this.listeners.get(g);
    S && S.forEach((E) => E(o));
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
let go = Ne;
export {
  Cd as AddObjectAction,
  Ed as ComputeEncompassingViewAction,
  Md as DeleteObjectAction,
  Dd as DeselectObjectAction,
  Pd as DropItAction,
  $d as ExportSceneAction,
  Id as GenerateMediaAction,
  Bd as GetAllObjectsAction,
  Hd as GetAllSceneDataAction,
  md as GetCameraTransformAction,
  Wd as GetObjectsAction,
  Ad as LaunchARAction,
  Ud as ModelLoadedAction,
  Sd as MoveCameraAction,
  Fd as PlaceOnFloorAction,
  Nd as SelectObjectAction,
  zd as SetBackgroundAction,
  bd as SetCameraLayerAction,
  Od as SetCameraTransformAction,
  Kd as SetGizmoModeAction,
  Zd as SetGizmoScaleLinkedAction,
  Yd as SetGizmoVisibleAction,
  wo as SetParentAction,
  Gd as StartRenderAction,
  go as State,
  Fe as UpdateObjectAction,
  qd as UpdateSceneAction,
  Jd as UseToolAction,
  Td as ZoomCameraAction,
  xd as getActionClass,
  N as registerAction
};
