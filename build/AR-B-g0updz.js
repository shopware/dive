import { c as Jt, N as Kt, O as wt, o as te, p as ee, q as kt, M as dt, V as k, r as ie, Q as et, s as Z, t as st, W as se } from "./dive-Mi8g8Khn.js";
import { d as re } from "./TextureUtils-CxpuVgwF.js";
function ne(e, t) {
  return e ? t in e : !1;
}
function Lt(e, t) {
  if (e)
    return ne(e, t) ? e : Lt(e.parent, t);
}
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/
var T = Uint8Array, I = Uint16Array, yt = Int32Array, xt = new T([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), Mt = new T([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Pt = new T([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), zt = function(e, t) {
  for (var i = new I(31), s = 0; s < 31; ++s)
    i[s] = t += 1 << e[s - 1];
  for (var r = new yt(i[30]), s = 1; s < 30; ++s)
    for (var n = i[s]; n < i[s + 1]; ++n)
      r[n] = n - i[s] << 5 | s;
  return { b: i, r };
}, Bt = zt(xt, 2), oe = Bt.b, _t = Bt.r;
oe[28] = 258, _t[258] = 28;
var ae = zt(Mt, 0), Ht = ae.r, pt = new I(32768);
for (var m = 0; m < 32768; ++m) {
  var W = (m & 43690) >> 1 | (m & 21845) << 1;
  W = (W & 52428) >> 2 | (W & 13107) << 2, W = (W & 61680) >> 4 | (W & 3855) << 4, pt[m] = ((W & 65280) >> 8 | (W & 255) << 8) >> 1;
}
var it = function(e, t, i) {
  for (var s = e.length, r = 0, n = new I(t); r < s; ++r)
    e[r] && ++n[e[r] - 1];
  var o = new I(t);
  for (r = 1; r < t; ++r)
    o[r] = o[r - 1] + n[r - 1] << 1;
  var h;
  if (i) {
    h = new I(1 << t);
    var c = 15 - t;
    for (r = 0; r < s; ++r)
      if (e[r])
        for (var u = r << 4 | e[r], a = t - e[r], l = o[e[r] - 1]++ << a, d = l | (1 << a) - 1; l <= d; ++l)
          h[pt[l] >> c] = u;
  } else
    for (h = new I(s), r = 0; r < s; ++r)
      e[r] && (h[r] = pt[o[e[r] - 1]++] >> 15 - e[r]);
  return h;
}, F = new T(288);
for (var m = 0; m < 144; ++m)
  F[m] = 8;
for (var m = 144; m < 256; ++m)
  F[m] = 9;
for (var m = 256; m < 280; ++m)
  F[m] = 7;
for (var m = 280; m < 288; ++m)
  F[m] = 8;
var nt = new T(32);
for (var m = 0; m < 32; ++m)
  nt[m] = 5;
var ce = /* @__PURE__ */ it(F, 9, 0), he = /* @__PURE__ */ it(nt, 5, 0), Vt = function(e) {
  return (e + 7) / 8 | 0;
}, Nt = function(e, t, i) {
  return (i == null || i > e.length) && (i = e.length), new T(e.subarray(t, i));
}, le = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], at = function(e, t, i) {
  var s = new Error(t || le[e]);
  if (s.code = e, Error.captureStackTrace && Error.captureStackTrace(s, at), !i)
    throw s;
  return s;
}, N = function(e, t, i) {
  i <<= t & 7;
  var s = t / 8 | 0;
  e[s] |= i, e[s + 1] |= i >> 8;
}, K = function(e, t, i) {
  i <<= t & 7;
  var s = t / 8 | 0;
  e[s] |= i, e[s + 1] |= i >> 8, e[s + 2] |= i >> 16;
}, ft = function(e, t) {
  for (var i = [], s = 0; s < e.length; ++s)
    e[s] && i.push({ s, f: e[s] });
  var r = i.length, n = i.slice();
  if (!r)
    return { t: Wt, l: 0 };
  if (r == 1) {
    var o = new T(i[0].s + 1);
    return o[i[0].s] = 1, { t: o, l: 1 };
  }
  i.sort(function($, P) {
    return $.f - P.f;
  }), i.push({ s: -1, f: 25001 });
  var h = i[0], c = i[1], u = 0, a = 1, l = 2;
  for (i[0] = { s: -1, f: h.f + c.f, l: h, r: c }; a != r - 1; )
    h = i[i[u].f < i[l].f ? u++ : l++], c = i[u != a && i[u].f < i[l].f ? u++ : l++], i[a++] = { s: -1, f: h.f + c.f, l: h, r: c };
  for (var d = n[0].s, s = 1; s < r; ++s)
    n[s].s > d && (d = n[s].s);
  var f = new I(d + 1), p = vt(i[a - 1], f, 0);
  if (p > t) {
    var s = 0, g = 0, S = p - t, C = 1 << S;
    for (n.sort(function(P, R) {
      return f[R.s] - f[P.s] || P.f - R.f;
    }); s < r; ++s) {
      var O = n[s].s;
      if (f[O] > t)
        g += C - (1 << p - f[O]), f[O] = t;
      else
        break;
    }
    for (g >>= S; g > 0; ) {
      var L = n[s].s;
      f[L] < t ? g -= 1 << t - f[L]++ - 1 : ++s;
    }
    for (; s >= 0 && g; --s) {
      var w = n[s].s;
      f[w] == t && (--f[w], ++g);
    }
    p = t;
  }
  return { t: new T(f), l: p };
}, vt = function(e, t, i) {
  return e.s == -1 ? Math.max(vt(e.l, t, i + 1), vt(e.r, t, i + 1)) : t[e.s] = i;
}, At = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var i = new I(++t), s = 0, r = e[0], n = 1, o = function(c) {
    i[s++] = c;
  }, h = 1; h <= t; ++h)
    if (e[h] == r && h != t)
      ++n;
    else {
      if (!r && n > 2) {
        for (; n > 138; n -= 138)
          o(32754);
        n > 2 && (o(n > 10 ? n - 11 << 5 | 28690 : n - 3 << 5 | 12305), n = 0);
      } else if (n > 3) {
        for (o(r), --n; n > 6; n -= 6)
          o(8304);
        n > 2 && (o(n - 3 << 5 | 8208), n = 0);
      }
      for (; n--; )
        o(r);
      n = 1, r = e[h];
    }
  return { c: i.subarray(0, s), n: t };
}, tt = function(e, t) {
  for (var i = 0, s = 0; s < t.length; ++s)
    i += e[s] * t[s];
  return i;
}, jt = function(e, t, i) {
  var s = i.length, r = Vt(t + 2);
  e[r] = s & 255, e[r + 1] = s >> 8, e[r + 2] = e[r] ^ 255, e[r + 3] = e[r + 1] ^ 255;
  for (var n = 0; n < s; ++n)
    e[r + n + 4] = i[n];
  return (r + 4 + s) * 8;
}, It = function(e, t, i, s, r, n, o, h, c, u, a) {
  N(t, a++, i), ++r[256];
  for (var l = ft(r, 15), d = l.t, f = l.l, p = ft(n, 15), g = p.t, S = p.l, C = At(d), O = C.c, L = C.n, w = At(g), $ = w.c, P = w.n, R = new I(19), v = 0; v < O.length; ++v)
    ++R[O[v] & 31];
  for (var v = 0; v < $.length; ++v)
    ++R[$[v] & 31];
  for (var _ = ft(R, 7), H = _.t, q = _.l, A = 19; A > 4 && !H[Pt[A - 1]]; --A)
    ;
  var G = u + 5 << 3, D = tt(r, F) + tt(n, nt) + o, X = tt(r, d) + tt(n, g) + o + 14 + 3 * A + tt(R, H) + 2 * R[16] + 3 * R[17] + 7 * R[18];
  if (c >= 0 && G <= D && G <= X)
    return jt(t, a, e.subarray(c, c + u));
  var z, y, U, j;
  if (N(t, a, 1 + (X < D)), a += 2, X < D) {
    z = it(d, f, 0), y = d, U = it(g, S, 0), j = g;
    var ct = it(H, q, 0);
    N(t, a, L - 257), N(t, a + 5, P - 1), N(t, a + 10, A - 4), a += 14;
    for (var v = 0; v < A; ++v)
      N(t, a + 3 * v, H[Pt[v]]);
    a += 3 * A;
    for (var B = [O, $], J = 0; J < 2; ++J)
      for (var Q = B[J], v = 0; v < Q.length; ++v) {
        var V = Q[v] & 31;
        N(t, a, ct[V]), a += H[V], V > 15 && (N(t, a, Q[v] >> 5 & 127), a += Q[v] >> 12);
      }
  } else
    z = ce, y = F, U = he, j = nt;
  for (var v = 0; v < h; ++v) {
    var M = s[v];
    if (M > 255) {
      var V = M >> 18 & 31;
      K(t, a, z[V + 257]), a += y[V + 257], V > 7 && (N(t, a, M >> 23 & 31), a += xt[V]);
      var Y = M & 31;
      K(t, a, U[Y]), a += j[Y], Y > 3 && (K(t, a, M >> 5 & 8191), a += Mt[Y]);
    } else
      K(t, a, z[M]), a += y[M];
  }
  return K(t, a, z[256]), a + y[256];
}, ue = /* @__PURE__ */ new yt([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Wt = /* @__PURE__ */ new T(0), fe = function(e, t, i, s, r, n) {
  var o = n.z || e.length, h = new T(s + o + 5 * (1 + Math.ceil(o / 7e3)) + r), c = h.subarray(s, h.length - r), u = n.l, a = (n.r || 0) & 7;
  if (t) {
    a && (c[0] = n.r >> 3);
    for (var l = ue[t - 1], d = l >> 13, f = l & 8191, p = (1 << i) - 1, g = n.p || new I(32768), S = n.h || new I(p + 1), C = Math.ceil(i / 3), O = 2 * C, L = function(ut) {
      return (e[ut] ^ e[ut + 1] << C ^ e[ut + 2] << O) & p;
    }, w = new yt(25e3), $ = new I(288), P = new I(32), R = 0, v = 0, _ = n.i || 0, H = 0, q = n.w || 0, A = 0; _ + 2 < o; ++_) {
      var G = L(_), D = _ & 32767, X = S[G];
      if (g[D] = X, S[G] = D, q <= _) {
        var z = o - _;
        if ((R > 7e3 || H > 24576) && (z > 423 || !u)) {
          a = It(e, c, 0, w, $, P, v, H, A, _ - A, a), H = R = v = 0, A = _;
          for (var y = 0; y < 286; ++y)
            $[y] = 0;
          for (var y = 0; y < 30; ++y)
            P[y] = 0;
        }
        var U = 2, j = 0, ct = f, B = D - X & 32767;
        if (z > 2 && G == L(_ - B))
          for (var J = Math.min(d, z) - 1, Q = Math.min(32767, _), V = Math.min(258, z); B <= Q && --ct && D != X; ) {
            if (e[_ + U] == e[_ + U - B]) {
              for (var M = 0; M < V && e[_ + M] == e[_ + M - B]; ++M)
                ;
              if (M > U) {
                if (U = M, j = B, M > J)
                  break;
                for (var Y = Math.min(B, M - 2), Tt = 0, y = 0; y < Y; ++y) {
                  var ht = _ - B + y & 32767, Zt = g[ht], Et = ht - Zt & 32767;
                  Et > Tt && (Tt = Et, X = ht);
                }
              }
            }
            D = X, X = g[D], B += D - X & 32767;
          }
        if (j) {
          w[H++] = 268435456 | _t[U] << 18 | Ht[j];
          var $t = _t[U] & 31, Ct = Ht[j] & 31;
          v += xt[$t] + Mt[Ct], ++$[257 + $t], ++P[Ct], q = _ + U, ++R;
        } else
          w[H++] = e[_], ++$[e[_]];
      }
    }
    for (_ = Math.max(_, q); _ < o; ++_)
      w[H++] = e[_], ++$[e[_]];
    a = It(e, c, u, w, $, P, v, H, A, _ - A, a), u || (n.r = a & 7 | c[a / 8 | 0] << 3, a -= 7, n.h = S, n.p = g, n.i = _, n.w = q);
  } else {
    for (var _ = n.w || 0; _ < o + u; _ += 65535) {
      var lt = _ + 65535;
      lt >= o && (c[a / 8 | 0] = u, lt = o), a = jt(c, a + 1, e.subarray(_, lt));
    }
    n.i = o;
  }
  return Nt(h, 0, s + Vt(a) + r);
}, de = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var i = t, s = 9; --s; )
      i = (i & 1 && -306674912) ^ i >>> 1;
    e[t] = i;
  }
  return e;
}(), _e = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var i = e, s = 0; s < t.length; ++s)
        i = de[i & 255 ^ t[s]] ^ i >>> 8;
      e = i;
    },
    d: function() {
      return ~e;
    }
  };
}, pe = function(e, t, i, s, r) {
  if (!r && (r = { l: 1 }, t.dictionary)) {
    var n = t.dictionary.subarray(-32768), o = new T(n.length + e.length);
    o.set(n), o.set(e, n.length), e = o, r.w = n.length;
  }
  return fe(e, t.level == null ? 6 : t.level, t.mem == null ? r.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, i, s, r);
}, Ft = function(e, t) {
  var i = {};
  for (var s in e)
    i[s] = e[s];
  for (var s in t)
    i[s] = t[s];
  return i;
}, x = function(e, t, i) {
  for (; i; ++t)
    e[t] = i, i >>>= 8;
};
function ve(e, t) {
  return pe(e, t || {}, 0, 0);
}
var qt = function(e, t, i, s) {
  for (var r in e) {
    var n = e[r], o = t + r, h = s;
    Array.isArray(n) && (h = Ft(s, n[1]), n = n[0]), n instanceof T ? i[o] = [n, h] : (i[o += "/"] = [new T(0), h], qt(n, o, i, s));
  }
}, Ot = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), ge = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), me = 0;
try {
  ge.decode(Wt, { stream: !0 }), me = 1;
} catch {
}
function ot(e, t) {
  var i;
  if (Ot)
    return Ot.encode(e);
  for (var s = e.length, r = new T(e.length + (e.length >> 1)), n = 0, o = function(u) {
    r[n++] = u;
  }, i = 0; i < s; ++i) {
    if (n + 5 > r.length) {
      var h = new T(n + 8 + (s - i << 1));
      h.set(r), r = h;
    }
    var c = e.charCodeAt(i);
    c < 128 || t ? o(c) : c < 2048 ? (o(192 | c >> 6), o(128 | c & 63)) : c > 55295 && c < 57344 ? (c = 65536 + (c & 1047552) | e.charCodeAt(++i) & 1023, o(240 | c >> 18), o(128 | c >> 12 & 63), o(128 | c >> 6 & 63), o(128 | c & 63)) : (o(224 | c >> 12), o(128 | c >> 6 & 63), o(128 | c & 63));
  }
  return Nt(r, 0, n);
}
var gt = function(e) {
  var t = 0;
  if (e)
    for (var i in e) {
      var s = e[i].length;
      s > 65535 && at(9), t += s + 4;
    }
  return t;
}, Dt = function(e, t, i, s, r, n, o, h) {
  var c = s.length, u = i.extra, a = h && h.length, l = gt(u);
  x(e, t, o != null ? 33639248 : 67324752), t += 4, o != null && (e[t++] = 20, e[t++] = i.os), e[t] = 20, t += 2, e[t++] = i.flag << 1 | (n < 0 && 8), e[t++] = r && 8, e[t++] = i.compression & 255, e[t++] = i.compression >> 8;
  var d = new Date(i.mtime == null ? Date.now() : i.mtime), f = d.getFullYear() - 1980;
  if ((f < 0 || f > 119) && at(10), x(e, t, f << 25 | d.getMonth() + 1 << 21 | d.getDate() << 16 | d.getHours() << 11 | d.getMinutes() << 5 | d.getSeconds() >> 1), t += 4, n != -1 && (x(e, t, i.crc), x(e, t + 4, n < 0 ? -n - 2 : n), x(e, t + 8, i.size)), x(e, t + 12, c), x(e, t + 14, l), t += 16, o != null && (x(e, t, a), x(e, t + 6, i.attrs), x(e, t + 10, o), t += 14), e.set(s, t), t += c, l)
    for (var p in u) {
      var g = u[p], S = g.length;
      x(e, t, +p), x(e, t + 2, S), e.set(g, t + 4), t += 4 + S;
    }
  return a && (e.set(h, t), t += a), t;
}, Re = function(e, t, i, s, r) {
  x(e, t, 101010256), x(e, t + 8, i), x(e, t + 10, i), x(e, t + 12, s), x(e, t + 16, r);
};
function Se(e, t) {
  t || (t = {});
  var i = {}, s = [];
  qt(e, "", i, t);
  var r = 0, n = 0;
  for (var o in i) {
    var h = i[o], c = h[0], u = h[1], a = u.level == 0 ? 0 : 8, l = ot(o), d = l.length, f = u.comment, p = f && ot(f), g = p && p.length, S = gt(u.extra);
    d > 65535 && at(11);
    var C = a ? ve(c, u) : c, O = C.length, L = _e();
    L.p(c), s.push(Ft(u, {
      size: c.length,
      crc: L.d(),
      c: C,
      f: l,
      m: p,
      u: d != o.length || p && f.length != g,
      o: r,
      compression: a
    })), r += 30 + d + S + O, n += 76 + 2 * (d + S) + (g || 0) + O;
  }
  for (var w = new T(n + 22), $ = r, P = n - r, R = 0; R < s.length; ++R) {
    var l = s[R];
    Dt(w, l.o, l, l.f, l.u, l.c.length);
    var v = 30 + l.f.length + gt(l.extra);
    w.set(l.c, l.o + v), Dt(w, r, l, l.f, l.u, l.c.length, l.o, l.m), r += 16 + v + (l.m ? l.m.length : 0);
  }
  return Re(w, r, s.length, P, $), w;
}
class we {
  async parse(t, i = {}) {
    i = Object.assign({
      ar: {
        anchoring: { type: "plane" },
        planeAnchoring: { alignment: "horizontal" }
      },
      quickLookCompatible: !1,
      maxTextureSize: 1024
    }, i);
    const s = {}, r = "model.usda";
    s[r] = null;
    let n = Gt();
    n += xe(i);
    const o = {}, h = {};
    t.traverseVisible((u) => {
      if (u.isMesh) {
        const a = u.geometry, l = u.material;
        if (l.isMeshStandardMaterial) {
          const d = "geometries/Geometry_" + a.id + ".usda";
          if (!(d in s)) {
            const f = Ee(a);
            s[d] = be(f);
          }
          l.uuid in o || (o[l.uuid] = l), n += Te(u, a, l);
        } else
          console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)", u);
      } else u.isCamera && (n += Xe(u));
    }), n += Me(), n += Ie(o, h, i.quickLookCompatible), s[r] = ot(n), n = null;
    for (const u in h) {
      let a = h[u];
      a.isCompressedTexture === !0 && (a = re(a));
      const l = ye(a.image, a.flipY, i.maxTextureSize), d = await new Promise((f) => l.toBlob(f, "image/png", 1));
      s[`textures/Texture_${u}.png`] = new Uint8Array(await d.arrayBuffer());
    }
    let c = 0;
    for (const u in s) {
      const a = s[u], l = 34 + u.length;
      c += l;
      const d = c & 63;
      if (d !== 4) {
        const f = 64 - d, p = new Uint8Array(f);
        s[u] = [a, { extra: { 12345: p } }];
      }
      c = a.length;
    }
    return Se(s, { level: 0 });
  }
}
function ye(e, t, i) {
  if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
    const s = i / Math.max(e.width, e.height), r = document.createElement("canvas");
    r.width = e.width * Math.min(1, s), r.height = e.height * Math.min(1, s);
    const n = r.getContext("2d");
    return t === !0 && (n.translate(0, r.height), n.scale(1, -1)), n.drawImage(e, 0, 0, r.width, r.height), r;
  } else
    throw new Error("THREE.USDZExporter: No valid image data found. Unable to process texture.");
}
const b = 7;
function Gt() {
  return `#usda 1.0
(
	customLayerData = {
		string creator = "Three.js USDZExporter"
	}
	defaultPrim = "Root"
	metersPerUnit = 1
	upAxis = "Y"
)

`;
}
function xe(e) {
  return `def Xform "Root"
{
	def Scope "Scenes" (
		kind = "sceneLibrary"
	)
	{
		def Xform "Scene" (
			customData = {
				bool preliminary_collidesWithEnvironment = 0
				string sceneName = "Scene"
			}
			sceneName = "Scene"
		)
		{
		token preliminary:anchoring:type = "${e.ar.anchoring.type}"
		token preliminary:planeAnchoring:alignment = "${e.ar.planeAnchoring.alignment}"

`;
}
function Me() {
  return `
		}
	}
}

`;
}
function be(e) {
  let t = Gt();
  return t += e, ot(t);
}
function Te(e, t, i) {
  const s = "Object_" + e.id, r = Qt(e.matrixWorld);
  return e.matrixWorld.determinant() < 0 && console.warn("THREE.USDZExporter: USDZ does not support negative scales", e), `def Xform "${s}" (
	prepend references = @./geometries/Geometry_${t.id}.usda@</Geometry>
	prepend apiSchemas = ["MaterialBindingAPI"]
)
{
	matrix4d xformOp:transform = ${r}
	uniform token[] xformOpOrder = ["xformOp:transform"]

	rel material:binding = </Materials/Material_${i.id}>
}

`;
}
function Qt(e) {
  const t = e.elements;
  return `( ${rt(t, 0)}, ${rt(t, 4)}, ${rt(t, 8)}, ${rt(t, 12)} )`;
}
function rt(e, t) {
  return `(${e[t + 0]}, ${e[t + 1]}, ${e[t + 2]}, ${e[t + 3]})`;
}
function Ee(e) {
  return `
def "Geometry"
{
${$e(e)}
}
`;
}
function $e(e) {
  const t = "Geometry", i = e.attributes, s = i.position.count;
  return `
	def Mesh "${t}"
	{
		int[] faceVertexCounts = [${Ce(e)}]
		int[] faceVertexIndices = [${Pe(e)}]
		normal3f[] normals = [${mt(i.normal, s)}] (
			interpolation = "vertex"
		)
		point3f[] points = [${mt(i.position, s)}]
${Ae(i)}
		uniform token subdivisionScheme = "none"
	}
`;
}
function Ce(e) {
  const t = e.index !== null ? e.index.count : e.attributes.position.count;
  return Array(t / 3).fill(3).join(", ");
}
function Pe(e) {
  const t = e.index, i = [];
  if (t !== null)
    for (let s = 0; s < t.count; s++)
      i.push(t.getX(s));
  else {
    const s = e.attributes.position.count;
    for (let r = 0; r < s; r++)
      i.push(r);
  }
  return i.join(", ");
}
function mt(e, t) {
  if (e === void 0)
    return console.warn("USDZExporter: Normals missing."), Array(t).fill("(0, 0, 0)").join(", ");
  const i = [];
  for (let s = 0; s < e.count; s++) {
    const r = e.getX(s), n = e.getY(s), o = e.getZ(s);
    i.push(`(${r.toPrecision(b)}, ${n.toPrecision(b)}, ${o.toPrecision(b)})`);
  }
  return i.join(", ");
}
function He(e) {
  const t = [];
  for (let i = 0; i < e.count; i++) {
    const s = e.getX(i), r = e.getY(i);
    t.push(`(${s.toPrecision(b)}, ${1 - r.toPrecision(b)})`);
  }
  return t.join(", ");
}
function Ae(e) {
  let t = "";
  for (let s = 0; s < 4; s++) {
    const r = s > 0 ? s : "", n = e["uv" + r];
    n !== void 0 && (t += `
		texCoord2f[] primvars:st${r} = [${He(n)}] (
			interpolation = "vertex"
		)`);
  }
  const i = e.color;
  if (i !== void 0) {
    const s = i.count;
    t += `
	color3f[] primvars:displayColor = [${mt(i, s)}] (
		interpolation = "vertex"
		)`;
  }
  return t;
}
function Ie(e, t, i = !1) {
  const s = [];
  for (const r in e) {
    const n = e[r];
    s.push(Oe(n, t, i));
  }
  return `def "Materials"
{
${s.join("")}
}

`;
}
function Oe(e, t, i = !1) {
  const s = "			", r = [], n = [];
  function o(h, c, u) {
    const a = h.source.id + "_" + h.flipY;
    t[a] = h;
    const l = h.channel > 0 ? "st" + h.channel : "st", d = {
      1e3: "repeat",
      // RepeatWrapping
      1001: "clamp",
      // ClampToEdgeWrapping
      1002: "mirror"
      // MirroredRepeatWrapping
    }, f = h.repeat.clone(), p = h.offset.clone(), g = h.rotation, S = Math.sin(g), C = Math.cos(g);
    return p.y = 1 - p.y - f.y, i ? (p.x = p.x / f.x, p.y = p.y / f.y, p.x += S / f.x, p.y += C - 1) : (p.x += S * f.x, p.y += (1 - C) * f.y), `
		def Shader "PrimvarReader_${c}"
		{
			uniform token info:id = "UsdPrimvarReader_float2"
			float2 inputs:fallback = (0.0, 0.0)
			token inputs:varname = "${l}"
			float2 outputs:result
		}

		def Shader "Transform2d_${c}"
		{
			uniform token info:id = "UsdTransform2d"
			token inputs:in.connect = </Materials/Material_${e.id}/PrimvarReader_${c}.outputs:result>
			float inputs:rotation = ${(g * (180 / Math.PI)).toFixed(b)}
			float2 inputs:scale = ${Ut(f)}
			float2 inputs:translation = ${Ut(p)}
			float2 outputs:result
		}

		def Shader "Texture_${h.id}_${c}"
		{
			uniform token info:id = "UsdUVTexture"
			asset inputs:file = @textures/Texture_${a}.png@
			float2 inputs:st.connect = </Materials/Material_${e.id}/Transform2d_${c}.outputs:result>
			${u !== void 0 ? "float4 inputs:scale = " + De(u) : ""}
			token inputs:sourceColorSpace = "${h.colorSpace === Kt ? "raw" : "sRGB"}"
			token inputs:wrapS = "${d[h.wrapS]}"
			token inputs:wrapT = "${d[h.wrapT]}"
			float outputs:r
			float outputs:g
			float outputs:b
			float3 outputs:rgb
			${e.transparent || e.alphaTest > 0 ? "float outputs:a" : ""}
		}`;
  }
  return e.side === Jt && console.warn("THREE.USDZExporter: USDZ does not support double sided materials", e), e.map !== null ? (r.push(`${s}color3f inputs:diffuseColor.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:rgb>`), e.transparent ? r.push(`${s}float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`) : e.alphaTest > 0 && (r.push(`${s}float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`), r.push(`${s}float inputs:opacityThreshold = ${e.alphaTest}`)), n.push(o(e.map, "diffuse", e.color))) : r.push(`${s}color3f inputs:diffuseColor = ${Xt(e.color)}`), e.emissiveMap !== null ? (r.push(`${s}color3f inputs:emissiveColor.connect = </Materials/Material_${e.id}/Texture_${e.emissiveMap.id}_emissive.outputs:rgb>`), n.push(o(e.emissiveMap, "emissive"))) : e.emissive.getHex() > 0 && r.push(`${s}color3f inputs:emissiveColor = ${Xt(e.emissive)}`), e.normalMap !== null && (r.push(`${s}normal3f inputs:normal.connect = </Materials/Material_${e.id}/Texture_${e.normalMap.id}_normal.outputs:rgb>`), n.push(o(e.normalMap, "normal"))), e.aoMap !== null && (r.push(`${s}float inputs:occlusion.connect = </Materials/Material_${e.id}/Texture_${e.aoMap.id}_occlusion.outputs:r>`), n.push(o(e.aoMap, "occlusion"))), e.roughnessMap !== null && e.roughness === 1 ? (r.push(`${s}float inputs:roughness.connect = </Materials/Material_${e.id}/Texture_${e.roughnessMap.id}_roughness.outputs:g>`), n.push(o(e.roughnessMap, "roughness"))) : r.push(`${s}float inputs:roughness = ${e.roughness}`), e.metalnessMap !== null && e.metalness === 1 ? (r.push(`${s}float inputs:metallic.connect = </Materials/Material_${e.id}/Texture_${e.metalnessMap.id}_metallic.outputs:b>`), n.push(o(e.metalnessMap, "metallic"))) : r.push(`${s}float inputs:metallic = ${e.metalness}`), e.alphaMap !== null ? (r.push(`${s}float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.alphaMap.id}_opacity.outputs:r>`), r.push(`${s}float inputs:opacityThreshold = 0.0001`), n.push(o(e.alphaMap, "opacity"))) : r.push(`${s}float inputs:opacity = ${e.opacity}`), e.isMeshPhysicalMaterial && (r.push(`${s}float inputs:clearcoat = ${e.clearcoat}`), r.push(`${s}float inputs:clearcoatRoughness = ${e.clearcoatRoughness}`), r.push(`${s}float inputs:ior = ${e.ior}`)), `
	def Material "Material_${e.id}"
	{
		def Shader "PreviewSurface"
		{
			uniform token info:id = "UsdPreviewSurface"
${r.join(`
`)}
			int inputs:useSpecularWorkflow = 0
			token outputs:surface
		}

		token outputs:surface.connect = </Materials/Material_${e.id}/PreviewSurface.outputs:surface>

${n.join(`
`)}

	}
`;
}
function Xt(e) {
  return `(${e.r}, ${e.g}, ${e.b})`;
}
function De(e) {
  return `(${e.r}, ${e.g}, ${e.b}, 1.0)`;
}
function Ut(e) {
  return `(${e.x}, ${e.y})`;
}
function Xe(e) {
  const t = e.name ? e.name : "Camera_" + e.id, i = Qt(e.matrixWorld);
  return e.matrixWorld.determinant() < 0 && console.warn("THREE.USDZExporter: USDZ does not support negative scales", e), e.isOrthographicCamera ? `def Camera "${t}"
		{
			matrix4d xformOp:transform = ${i}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${e.near.toPrecision(b)}, ${e.far.toPrecision(b)})
			float horizontalAperture = ${((Math.abs(e.left) + Math.abs(e.right)) * 10).toPrecision(b)}
			float verticalAperture = ${((Math.abs(e.top) + Math.abs(e.bottom)) * 10).toPrecision(b)}
			token projection = "orthographic"
		}
	
	` : `def Camera "${t}"
		{
			matrix4d xformOp:transform = ${i}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${e.near.toPrecision(b)}, ${e.far.toPrecision(b)})
			float focalLength = ${e.getFocalLength().toPrecision(b)}
			float focusDistance = ${e.focus.toPrecision(b)}
			float horizontalAperture = ${e.getFilmWidth().toPrecision(b)}
			token projection = "perspective"
			float verticalAperture = ${e.getFilmHeight().toPrecision(b)}
		}
	
	`;
}
class Ue extends we {
  parse(t, i) {
    return super.parse(t, i);
  }
}
const bt = class bt {
  static Launch(t, i) {
    const s = new wt(), r = t.Root.clone(!0);
    return s.add(...r.children), this.launchARFromNode(s, i);
  }
  static extractModels(t) {
    return t.Root.children;
  }
  static launchARFromNode(t, i) {
    return this._usdzExporter.parse(t, {
      quickLookCompatible: !0,
      ar: {
        anchoring: { type: "plane" },
        planeAnchoring: {
          alignment: (i == null ? void 0 : i.arPlacement) === "vertical" ? "vertical" : "horizontal"
        }
      }
    }).then((s) => {
      const r = new Blob([s], { type: "model/vnd.usdz+zip" });
      let n = URL.createObjectURL(r);
      (i == null ? void 0 : i.arScale) === "fixed" && (n = n.concat("#allowsContentScaling=0"));
      const o = document.createElement("a");
      o.innerHTML = "<picture></picture>", o.rel = "ar", o.href = n, o.download = "scene.usdz", o.click();
    });
  }
};
bt._usdzExporter = new Ue();
let Rt = bt;
class ke {
  get Element() {
    return this._element;
  }
  get CloseButton() {
    return this._closeButton;
  }
  constructor() {
    this._element = document.createElement("div"), this._closeButton = this.createCloseButton(), this._element.appendChild(this._closeButton), document.body.appendChild(this._element);
  }
  createCloseButton() {
    const t = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    t.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28"), t.setAttribute("stroke", "#fff"), t.setAttribute("stroke-width", "2");
    const i = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    return i.setAttribute("width", "38"), i.setAttribute("height", "38"), i.style.position = "absolute", i.style.right = "20px", i.style.top = "20px", i.appendChild(t), i;
  }
}
class Le extends wt {
  set mesh(t) {
    this.clear(), t && this.add(t);
  }
  constructor(t) {
    return super(), t ? this.mesh = t : this.UseDefaultMesh(), this.matrixAutoUpdate = !1, this;
  }
  UseDefaultMesh() {
    const t = new te(0.08, 0.1, 32).rotateX(-Math.PI / 2), i = new ee();
    this.mesh = new kt(t, i);
  }
  UpdateFromPose(t) {
    this.matrix.fromArray(t.transform.matrix);
  }
}
class ze {
  constructor(t, i) {
    this._referenceSpaceBuffer = null, this._requesting = !1, this._initialized = !1, this._session = t, this._renderer = i, this._hitMatrixBuffer = new dt();
  }
  Dispose() {
    var t;
    (t = this._transientHitTestSource) == null || t.cancel(), this._transientHitTestSource = void 0, this._initialized = !1;
  }
  async Init() {
    return this._session ? this._requesting ? (console.error(
      "DIVEWebXRRaycaster: Currently initializing! Aborting initialization..."
    ), Promise.reject()) : this._initialized ? (console.error(
      "DIVEWebXRRaycaster: Already initialized! Aborting initialization..."
    ), Promise.reject()) : (this._requesting = !0, this._transientHitTestSource = await this._session.requestHitTestSourceForTransientInput({
      profile: "generic-touchscreen"
    }), this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace(), this._requesting = !1, this._transientHitTestSource ? (this._initialized = !0, console.log("DIVEWebXRRaycasterAR: Initialized"), Promise.resolve(this)) : Promise.reject()) : (console.error(
      "DIVEWebXRRaycaster: No session set in Init()! Aborting initialization..."
    ), Promise.reject());
  }
  GetIntersections(t) {
    if (!this._transientHitTestSource) return [];
    const i = t.getHitTestResultsForTransientInput(
      this._transientHitTestSource
    );
    return i.length === 0 ? [] : i.map((r) => {
      if (!this._referenceSpaceBuffer || !r.results[0] || !r.results[0].getPose) return;
      const n = r.results[0].getPose(this._referenceSpaceBuffer);
      return n ? (this._hitMatrixBuffer.fromArray(n.transform.matrix), {
        point: new k().setFromMatrixPosition(
          this._hitMatrixBuffer
        ),
        matrix: this._hitMatrixBuffer,
        object: void 0
      }) : void 0;
    }).filter((r) => r !== void 0);
  }
}
class Be {
  constructor(t, i) {
    this._raycaster = new ie(), this._renderer = t, this._scene = i, this._controller = this._renderer.xr.getController(0);
  }
  async Init() {
    return console.log("DIVEWebXRRaycasterTHREE: Initialized"), Promise.resolve(this);
  }
  GetIntersections() {
    this._controller.updateMatrixWorld(), this._raycaster.setFromXRController(this._controller);
    const t = this._raycaster.intersectObjects(
      this._scene.XRRoot.XRModelRoot.children
    );
    return t.length === 0 ? [] : t.map((i) => ({
      point: i.point,
      matrix: i.object.matrixWorld,
      object: i.object
    }));
  }
}
class Yt {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  Subscribe(t, i) {
    return this._listeners.get(t) || this._listeners.set(t, []), this._listeners.get(t).push(i), () => {
      const s = this._listeners.get(t);
      if (!s) return !1;
      const r = s.findIndex(
        (n) => n === i
      );
      return r === -1 ? !1 : (s.splice(r, 1), !0);
    };
  }
  dispatch(t, i) {
    const s = this._listeners.get(t);
    s && s.forEach((r) => r(i));
  }
}
class Ve extends Yt {
  constructor(t, i, s) {
    super(), this._initialized = !1, this._arHitResultBuffer = [], this._sceneHitResultBuffer = [], this._hasHit = !1, this._session = t, this._threeRaycaster = new Be(i, s), this._arRaycaster = new ze(t, i);
  }
  Dispose() {
    this._initialized = !1;
  }
  async Init() {
    return this._session ? this._initialized ? (console.error(
      "DIVEWebXRRaycaster: Already initialized! Aborting initialization..."
    ), Promise.reject()) : (await this._threeRaycaster.Init(), await this._arRaycaster.Init(), console.log("DIVEWebXRRaycaster: Initialized"), this._initialized = !0, Promise.resolve(this)) : (console.error(
      "DIVEWebXRRaycaster: No session set in Init()! Aborting initialization..."
    ), Promise.reject());
  }
  GetARIntersections(t) {
    return this._arHitResultBuffer = this._arRaycaster.GetIntersections(t), this._arHitResultBuffer.length > 0 ? this.onARHitFound(this._arHitResultBuffer[0]) : this.onARHitLost(), this._arHitResultBuffer;
  }
  GetSceneIntersections() {
    return this._sceneHitResultBuffer = this._threeRaycaster.GetIntersections(), this._sceneHitResultBuffer.length > 0 ? this.onSceneHitFound(this._sceneHitResultBuffer[0]) : this.onSceneHitLost(), this._sceneHitResultBuffer;
  }
  onARHitFound(t) {
    this._hasHit = !0, this.dispatch("AR_HIT_FOUND", { hit: t });
  }
  onARHitLost() {
    this._hasHit && (this._hasHit = !1, this.dispatch("AR_HIT_LOST"));
  }
  onSceneHitFound(t) {
    this._hasHit = !0, this.dispatch("SCENE_HIT_FOUND", { hit: t });
  }
  onSceneHitLost() {
    this._hasHit && (this._hasHit = !1, this.dispatch("SCENE_HIT_LOST"));
  }
}
class Ne {
  constructor(t, i, s) {
    this._raycastHitCounter = 0, this._originSetResolve = () => {
    }, this._renderer = i, this._session = t, this._originSet = new Promise((r) => {
      this._originSetResolve = r;
    }), this._requesting = !1, this._initialized = !1, this._referenceSpaceBuffer = null, this._hitTestSource = null, this._entityTypes = s || ["plane"], this._hitTestResultBuffer = [], this._matrix = new dt(), this._position = new k(), this._quaternion = new et(), this._scale = new k(), this._originSet.then(() => {
      this._matrix.decompose(
        this._position,
        this._quaternion,
        this._scale
      );
    });
  }
  get originSet() {
    return this._originSet;
  }
  get matrix() {
    return this._matrix;
  }
  set matrix(t) {
    this._matrix = t, this._matrix.decompose(this._position, this._quaternion, this._scale);
  }
  get position() {
    return this._position;
  }
  get quaternion() {
    return this._quaternion;
  }
  get scale() {
    return this._scale;
  }
  async Init() {
    if (this._initialized)
      return Promise.resolve(this);
    if (!this._session)
      return console.error(
        "DIVEWebXROrigin: No session set in Init()! Aborting initialization..."
      ), Promise.reject();
    if (this._requesting)
      return console.error(
        "DIVEWebXROrigin: Currently initializing! Aborting initialization..."
      ), Promise.reject();
    this._requesting = !0;
    const t = await this._session.requestReferenceSpace("viewer");
    return this._hitTestSource = await this._session.requestHitTestSource({
      space: t,
      entityTypes: this._entityTypes
    }) || null, this._requesting = !1, this._hitTestSource ? (this._initialized = !0, Promise.resolve(this)) : Promise.reject();
  }
  Dispose() {
    var t;
    this._initialized = !1, this._requesting = !1, (t = this._hitTestSource) == null || t.cancel(), this._hitTestSource = null, this._hitTestResultBuffer = [], this._matrix = new dt(), this._position = new k(), this._quaternion = new et(), this._scale = new k();
  }
  Update(t) {
    if (this._initialized) {
      if (!this._hitTestSource)
        throw new Error(
          "DIVEWebXRRaycaster: Critical Error: HitTestSource not available but WebXROrigin is initialized!"
        );
      if (this._hitTestResultBuffer = t.getHitTestResults(
        this._hitTestSource
      ), this._hitTestResultBuffer.length > 0) {
        if (this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace(), !this._referenceSpaceBuffer) {
          this.onHitLost();
          return;
        }
        const i = this._hitTestResultBuffer[0].getPose(
          this._referenceSpaceBuffer
        );
        if (!i) {
          this.onHitLost();
          return;
        }
        this.onHitFound(i);
      } else
        this.onHitLost();
    }
  }
  onHitFound(t) {
    this._raycastHitCounter++, this.matrix.fromArray(t.transform.matrix), this._raycastHitCounter > 50 && this._originSetResolve();
  }
  onHitLost() {
    this._raycastHitCounter = 0;
  }
}
class je extends Yt {
  constructor(t) {
    super(), this._touchCount = 0, this._touches = [], this._handleRotateStarted = !1, this._handleRotateMoved = !1, this._handleRotateEnded = !1, this._startAngle = 0, this._lastAngle = 0, this._angleDelta = 0, this._handlePinchStarted = !1, this._handlePinchMoved = !1, this._handlePinchEnded = !1, this._scaleDistanceStart = 0, this._currentDistance = 1, this._deltaDistance = 0, this._session = t, this._touches = [
      {
        start: new Z(),
        current: new Z(),
        delta: new Z()
      },
      {
        start: new Z(),
        current: new Z(),
        delta: new Z()
      }
    ], this._handleRotateStarted = !1, window.addEventListener(
      "touchstart",
      (i) => this.onTouchStart(i)
    ), window.addEventListener(
      "touchmove",
      (i) => this.onTouchMove(i)
    ), window.addEventListener(
      "touchend",
      (i) => this.onTouchEnd(i)
    ), this._session.addEventListener(
      "selectstart",
      () => this.onSessionSelectStart()
    ), this._session.addEventListener(
      "selectend",
      () => this.onSessionSelectEnd()
    );
  }
  Dispose() {
    window.removeEventListener(
      "touchstart",
      (t) => this.onTouchStart(t)
    ), window.removeEventListener(
      "touchmove",
      (t) => this.onTouchMove(t)
    ), window.removeEventListener(
      "touchend",
      (t) => this.onTouchEnd(t)
    ), this._session.removeEventListener(
      "selectstart",
      () => this.onSessionSelectStart()
    ), this._session.removeEventListener(
      "selectend",
      () => this.onSessionSelectEnd()
    );
  }
  onTouchStart(t) {
    this._touchCount = t.touches.length, this._touches[0].start.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].current.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].delta.set(0, 0), this._touchCount > 1 && (this._touches[1].start.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].current.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].delta.set(0, 0)), this._touchCount === 2 && (this.handleRotateStart(), this.handlePinchStart()), this._handleRotateStarted && (this.dispatch("ROTATE_START", {
      current: 0
    }), this._handleRotateStarted = !1), this._handlePinchStarted && (this.dispatch("PINCH_START", {
      current: 0
    }), this._handlePinchStarted = !1);
  }
  onTouchMove(t) {
    this._touchCount = t.touches.length, this._touches[0].start.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].current.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].delta.copy(
      this._touches[0].current.clone().sub(this._touches[0].start)
    ), this._touchCount > 1 && (this._touches[1].start.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].current.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].delta.copy(
      this._touches[1].current.clone().sub(this._touches[1].start)
    )), this._touchCount === 2 && (this.handleRotateMoved(), this.handlePinchMoved()), this._touchCount === 1 && this.dispatch("TOUCH_MOVE", {
      touches: [
        {
          current: this._touches[0].current.clone(),
          delta: this._touches[0].delta.clone()
        },
        {
          current: this._touches[1].current.clone(),
          delta: this._touches[1].delta.clone()
        }
      ],
      touchCount: this._touchCount
    }), this._touchCount === 2 && (this._handleRotateMoved && (this.dispatch("ROTATE_MOVE", {
      current: this._lastAngle,
      delta: this._angleDelta
    }), this._handleRotateMoved = !1), this._handlePinchMoved && (this.dispatch("PINCH_MOVE", {
      current: this._currentDistance,
      delta: this._deltaDistance
    }), this._handlePinchMoved = !1));
  }
  onTouchEnd(t) {
    this._touchCount = t.touches.length, this._touchCount === 0 && (this._touches[0].start.set(0, 0), this._touches[0].current.set(0, 0), this._touches[0].delta.set(0, 0)), this._touchCount === 1 && (this.handleRotateEnded(), this.handlePinchEnded(), this._touches[1].start.set(0, 0), this._touches[1].current.set(0, 0), this._touches[1].delta.set(0, 0)), this._handleRotateEnded && (this.dispatch("ROTATE_END", {
      current: this._lastAngle
    }), this._handleRotateEnded = !1), this._handlePinchEnded && (this.dispatch("PINCH_END", {
      current: this._currentDistance
    }), this._handlePinchEnded = !1);
  }
  onSessionSelectStart() {
    this.dispatch("TOUCH_START", {
      touches: [
        {
          current: this._touches[0].current.clone()
        },
        {
          current: this._touches[1].current.clone()
        }
      ],
      touchCount: this._touchCount
    });
  }
  onSessionSelectEnd() {
    this.dispatch("TOUCH_END", {
      touches: [
        {
          current: this._touches[0].current.clone()
        },
        {
          current: this._touches[1].current.clone()
        }
      ],
      touchCount: this._touchCount
    });
  }
  // rotation handler
  handleRotateStart() {
    this._handleRotateStarted = !0, this._startAngle = this._touches[1].start.clone().sub(this._touches[0].current).angle();
  }
  handleRotateMoved() {
    this._handleRotateMoved = !0;
    const t = this._touches[1].current.clone().sub(this._touches[0].current).angle();
    this._angleDelta = t - this._startAngle, this._lastAngle = this._angleDelta * -1;
  }
  handleRotateEnded() {
    this._handleRotateEnded = !0;
  }
  // pinch handler
  handlePinchStart() {
    this._handlePinchStarted = !0, this._scaleDistanceStart = this._touches[1].start.distanceTo(
      this._touches[0].current
    );
  }
  handlePinchMoved() {
    this._handlePinchMoved = !0;
    const t = this._currentDistance, i = this._touches[1].current.distanceTo(
      this._touches[0].current
    );
    this._currentDistance = i / this._scaleDistanceStart, this._deltaDistance = this._currentDistance - t;
  }
  handlePinchEnded() {
    this._handlePinchEnded = !0;
  }
}
class We extends wt {
  constructor(t, i, s) {
    super(), this._frameBuffer = null, this._handNodeInitialPosition = new k(), this._placed = !1, this._grabbedObject = null, this._arHitPosition = new k(), this._arHitQuaternion = new et(), this._arHitScale = new k(1, 1, 1), this._initialObjectPosition = null, this._initialRaycastHit = null, this._deltaRaycastHit = new k(), this._touchQuaterion = new et(), this._touchScale = 1, this._scaleThreshold = 0.1, this._startTouchQuaternion = new et(), this._startTouchScale = 1, this._renderer = i, this._scene = s, this._session = t, this._xrRaycaster = new Ve(t, i, s), this._origin = new Ne(this._session, this._renderer, [
      "plane"
    ]), this._crosshair = new Le(), this._crosshair.visible = !1, this._xrCamera = this._renderer.xr.getCamera(), this._scene.XRRoot.XRHandNode.position.set(0, -0.05, -0.25), this._handNodeInitialPosition = this._scene.XRRoot.XRHandNode.position.clone(), this._touchscreenControls = new je(
      this._session
    ), this._touchscreenControls.Subscribe(
      "TOUCH_START",
      () => this.onTouchStart()
    ), this._touchscreenControls.Subscribe(
      "TOUCH_MOVE",
      () => this.onTouchMove()
    ), this._touchscreenControls.Subscribe(
      "TOUCH_END",
      (r) => this.onTouchEnd(r)
    ), this._touchscreenControls.Subscribe(
      "ROTATE_START",
      () => this.onRotateStart()
    ), this._touchscreenControls.Subscribe(
      "ROTATE_MOVE",
      (r) => this.onRotateMove(r)
    ), this._touchscreenControls.Subscribe(
      "PINCH_START",
      () => this.onPinchStart()
    ), this._touchscreenControls.Subscribe(
      "PINCH_MOVE",
      (r) => this.onPinchMove(r)
    );
  }
  async Init() {
    return this.prepareScene(), await this.initOrigin(), await this.initRaycaster(), Promise.resolve(this);
  }
  Dispose() {
    this.restoreScene(), this._origin.Dispose(), this._xrRaycaster.Dispose(), this._placed = !1;
  }
  Update(t) {
    this._frameBuffer = t, this._placed || (this.updateHandNode(), this._origin && this._origin.Update(t));
  }
  updateHandNode() {
    this._xrCamera.updateMatrixWorld(), this._scene.XRRoot.XRHandNode.position.copy(
      this._handNodeInitialPosition.clone().applyMatrix4(this._xrCamera.matrixWorld)
    ), this._scene.XRRoot.XRHandNode.quaternion.setFromRotationMatrix(
      this._xrCamera.matrixWorld
    );
  }
  // placement
  async initOrigin() {
    this._origin = await this._origin.Init(), this._origin.originSet.then(() => {
      this.placeObjects(this._origin.matrix);
    });
  }
  placeObjects(t) {
    this._scene.XRRoot.XRModelRoot.matrix.copy(t), [...this._scene.XRRoot.XRHandNode.children].forEach((i) => {
      this._scene.XRRoot.XRModelRoot.add(i);
    }), this._placed = !0;
  }
  // grabbing
  updateObject() {
    this._grabbedObject && (this._grabbedObject.position.copy(this._arHitPosition), this._grabbedObject.quaternion.copy(
      this._arHitQuaternion.clone().multiply(this._touchQuaterion)
    ), this._grabbedObject.scale.copy(
      new k(
        this._touchScale,
        this._touchScale,
        this._touchScale
      ).multiply(this._arHitScale)
    ));
  }
  onTouchStart() {
    const t = this._xrRaycaster.GetSceneIntersections();
    if (console.log("sceneHits", t), t.length === 0 || !t[0].object) return;
    const i = Lt(
      t[0].object,
      "isMovable"
    );
    i && (this._grabbedObject = i);
  }
  onTouchMove() {
    if (!this._frameBuffer || !this._grabbedObject) return;
    const t = this._xrRaycaster.GetARIntersections(
      this._frameBuffer
    );
    if (t.length === 0) {
      this._crosshair.visible = !1;
      return;
    }
    const i = t[0];
    this._crosshair.visible = !0, this._crosshair.matrix.copy(i.matrix), this._grabbedObject && ((!this._initialObjectPosition || !this._initialRaycastHit) && (this._initialObjectPosition = this._grabbedObject.position.clone(), this._initialRaycastHit = i.point.clone()), i.matrix.decompose(
      this._arHitPosition,
      this._arHitQuaternion,
      this._arHitScale
    ), this._deltaRaycastHit.copy(
      i.point.clone().sub(this._initialRaycastHit)
    ), this._arHitPosition.copy(
      this._initialObjectPosition.clone().add(this._deltaRaycastHit)
    ), console.log("arHitPosition", this._arHitPosition), this.updateObject());
  }
  onTouchEnd(t) {
    t.touchCount === 0 && (this._crosshair.visible = !1, this._initialObjectPosition = null, this._initialRaycastHit = null, this._grabbedObject = null);
  }
  onRotateStart() {
    this._startTouchQuaternion = this._touchQuaterion.clone();
  }
  onRotateMove(t) {
    this._touchQuaterion.setFromAxisAngle(
      new k(0, -1, 0),
      t.delta * 3
    ), this._touchQuaterion.multiply(this._startTouchQuaternion), this.updateObject();
  }
  onPinchStart() {
    this._startTouchScale = this._touchScale;
  }
  onPinchMove(t) {
    this._touchScale = this._startTouchScale * t.current, this.updateObject();
  }
  // prepare & cleanup scene
  prepareScene() {
    this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = !1, this._scene.add(this._crosshair);
    const t = [];
    this._scene.Root.children.forEach((i) => {
      const s = i.clone();
      s.layers.enableAll(), s.traverse((r) => {
        r.layers.enableAll(), r instanceof kt && r.scale.set(0.1, 0.1, 0.1);
      }), s.position.set(0, 0, 0), t.push(s);
    }), this._scene.XRRoot.XRHandNode.add(...t);
  }
  restoreScene() {
    this._scene.remove(this._crosshair), this._scene.XRRoot.XRHandNode.clear(), this._scene.XRRoot.XRModelRoot.clear(), this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = !0;
  }
  // raycast
  async initRaycaster() {
    if (await this._xrRaycaster.Init(), !this._xrRaycaster)
      return console.error(
        "Raycaster not initialized successfully. Aborting WebXR..."
      ), this.Dispose(), Promise.reject();
  }
}
const E = class E {
  static async Launch(t, i, s) {
    if (this._renderer = t, this._scene = i, this._controller = s, this._cameraPosition = this._controller.object.position.clone(), this._cameraTarget = this._controller.target.clone(), !navigator.xr)
      return console.error("WebXR not supported"), Promise.reject();
    if (this._renderer.xr.enabled = !0, this._scene.InitXR(t), !E._overlay) {
      const n = new ke();
      E._overlay = n;
    }
    E._options.domOverlay = { root: E._overlay.Element };
    const r = await navigator.xr.requestSession(
      "immersive-ar",
      this._options
    );
    return r.addEventListener("end", () => {
      this._onSessionEnded();
    }), t.xr.setReferenceSpaceType(this._referenceSpaceType), await t.xr.setSession(r), E._overlay.Element.style.display = "", this._session = r, E._overlay.CloseButton.addEventListener(
      "click",
      () => this.End()
    ), await this._onSessionStarted(), Promise.resolve();
  }
  static Update(t, i) {
    this._session && this._xrController && this._xrController.Update(i);
  }
  static End() {
    this._session && this._session.end();
  }
  static async _onSessionStarted() {
    if (this._session)
      return this._renderCallbackId = this._renderer.AddPreRenderCallback(
        (t, i) => {
          this.Update(t, i);
        }
      ), this._xrController = new We(
        this._session,
        this._renderer,
        this._scene
      ), await this._xrController.Init().catch(() => {
        this.End();
      }), Promise.resolve();
  }
  static _onSessionEnded() {
    if (!this._session) return;
    this._xrController && this._xrController.Dispose(), this._renderCallbackId && (this._renderer.RemovePreRenderCallback(this._renderCallbackId), this._renderCallbackId = null), this._renderer.xr.enabled = !1;
    const t = this._renderer.domElement.parentElement;
    if (t) {
      const { clientWidth: i, clientHeight: s } = t;
      this._renderer.OnResize(i, s), this._controller.object.OnResize(i, s);
    }
    this._controller.object.position.copy(this._cameraPosition), this._controller.target.copy(this._cameraTarget), this._cameraPosition.set(0, 0, 0), this._cameraTarget.set(0, 0, 0), this._scene.DisposeXR(), this._session.removeEventListener("end", this._onSessionEnded), E._overlay.Element.style.display = "none", this._session = null;
  }
};
E._renderCallbackId = null, E._session = null, E._referenceSpaceType = "local", E._overlay = null, E._options = {
  requiredFeatures: [
    "local",
    "hit-test"
  ],
  optionalFeatures: [
    "light-estimation",
    "local-floor",
    "dom-overlay",
    "depth-sensing"
  ],
  depthSensing: {
    usagePreference: ["gpu-optimized"],
    dataFormatPreference: []
  },
  domOverlay: { root: {} }
}, E._xrController = null;
let St = E;
class Fe {
  static Launch(t, i) {
    const s = this.findSceneViewerSrc(t);
    this.launchSceneViewer(s, i);
  }
  static launchSceneViewer(t, i) {
    const s = document.createElement("a"), r = "#model-viewer-no-ar-fallback", n = self.location.toString(), o = new URL(n), h = new URL(t, n), c = new URLSearchParams(h.search);
    o.hash = r, c.set("mode", "ar_only"), (i == null ? void 0 : i.arScale) === "fixed" && c.set("resizable", "false"), (i == null ? void 0 : i.arPlacement) === "vertical" && c.set("enable_vertical_placement", "true");
    const u = `intent://arvr.google.com/scene-viewer/1.2?${c.toString() + "&file=" + h.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      o.toString()
    )};end;`;
    s.setAttribute("href", u), s.click();
  }
  static findSceneViewerSrc(t) {
    let i = null;
    if (t.traverse((s) => {
      i || s.userData.uri && (i = s.userData.uri);
    }), !i)
      throw new Error("No model found in scene");
    return i;
  }
}
class Qe {
  constructor(t, i, s) {
    this._renderer = t, this._scene = i, this._controller = s;
  }
  async Launch(t) {
    const i = st.GetSystem();
    if (i === "iOS")
      return this.tryARQuickLook();
    if (i === "Android")
      return t != null && t.useWebXR ? (console.warn("DIVE: WebXR is experimental on Android."), this.tryWebXR()) : this.trySceneViewer();
    console.log(
      "DIVE: AR not supported. Not a mobile system. (System is " + i + ")"
    );
  }
  async tryARQuickLook(t) {
    return st.GetSupportsARQuickLook() ? (console.log("DIVE: Launching AR with ARQuickLook ..."), await Rt.Launch(this._scene, t), Promise.resolve()) : (console.log("ARQuickLook not supported"), Promise.reject());
  }
  async tryWebXR() {
    return await st.GetSupportsWebXR() ? (console.log("DIVE: Launching AR with WebXR ..."), await St.Launch(this._renderer, this._scene, this._controller), Promise.resolve()) : (console.log(
      "WebXR not supported. Reason: " + se[st.GetWebXRUnsupportedReason()]
    ), Promise.reject());
  }
  async trySceneViewer(t) {
    return console.log("DIVE: Launching AR with SceneViewer ..."), Fe.Launch(this._scene, t), Promise.resolve();
  }
}
export {
  Qe as DIVEAR
};
//# sourceMappingURL=AR-B-g0updz.js.map
