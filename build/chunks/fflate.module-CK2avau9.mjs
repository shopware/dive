window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
class le extends Error {
  constructor(e, n) {
    super(e), this.cause = n, this.name = "ParseError";
  }
}
class ie extends Error {
  constructor(e, n) {
    super(e), this.requestedFileType = n, this.name = "FileTypeError";
  }
}
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/
var M = Uint8Array, L = Uint16Array, Tr = Int32Array, hr = new M([
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
]), cr = new M([
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
]), Ar = new M([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Pr = function(r, e) {
  for (var n = new L(31), a = 0; a < 31; ++a)
    n[a] = e += 1 << r[a - 1];
  for (var v = new Tr(n[30]), a = 1; a < 30; ++a)
    for (var f = n[a]; f < n[a + 1]; ++f)
      v[f] = f - n[a] << 5 | a;
  return { b: n, r: v };
}, qr = Pr(hr, 2), Hr = qr.b, Sr = qr.r;
Hr[28] = 258, Sr[258] = 28;
var Or = Pr(cr, 0), Kr = Or.b, kr = Or.r, Cr = new L(32768);
for (var A = 0; A < 32768; ++A) {
  var b = (A & 43690) >> 1 | (A & 21845) << 1;
  b = (b & 52428) >> 2 | (b & 13107) << 2, b = (b & 61680) >> 4 | (b & 3855) << 4, Cr[A] = ((b & 65280) >> 8 | (b & 255) << 8) >> 1;
}
var Z = function(r, e, n) {
  for (var a = r.length, v = 0, f = new L(e); v < a; ++v)
    r[v] && ++f[r[v] - 1];
  var t = new L(e);
  for (v = 1; v < e; ++v)
    t[v] = t[v - 1] + f[v - 1] << 1;
  var u;
  if (n) {
    u = new L(1 << e);
    var i = 15 - e;
    for (v = 0; v < a; ++v)
      if (r[v])
        for (var h = v << 4 | r[v], l = e - r[v], o = t[r[v] - 1]++ << l, s = o | (1 << l) - 1; o <= s; ++o)
          u[Cr[o] >> i] = h;
  } else
    for (u = new L(a), v = 0; v < a; ++v)
      r[v] && (u[v] = Cr[t[r[v] - 1]++] >> 15 - r[v]);
  return u;
}, d = new M(288);
for (var A = 0; A < 144; ++A)
  d[A] = 8;
for (var A = 144; A < 256; ++A)
  d[A] = 9;
for (var A = 256; A < 280; ++A)
  d[A] = 7;
for (var A = 280; A < 288; ++A)
  d[A] = 8;
var lr = new M(32);
for (var A = 0; A < 32; ++A)
  lr[A] = 5;
var Lr = /* @__PURE__ */ Z(d, 9, 0), Nr = /* @__PURE__ */ Z(d, 9, 1), Qr = /* @__PURE__ */ Z(lr, 5, 0), Vr = /* @__PURE__ */ Z(lr, 5, 1), wr = function(r) {
  for (var e = r[0], n = 1; n < r.length; ++n)
    r[n] > e && (e = r[n]);
  return e;
}, Q = function(r, e, n) {
  var a = e / 8 | 0;
  return (r[a] | r[a + 1] << 8) >> (e & 7) & n;
}, mr = function(r, e) {
  var n = e / 8 | 0;
  return (r[n] | r[n + 1] << 8 | r[n + 2] << 16) >> (e & 7);
}, zr = function(r) {
  return (r + 7) / 8 | 0;
}, ir = function(r, e, n) {
  return (e == null || e < 0) && (e = 0), (n == null || n > r.length) && (n = r.length), new M(r.subarray(e, n));
}, Wr = [
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
], H = function(r, e, n) {
  var a = new Error(e || Wr[r]);
  if (a.code = r, Error.captureStackTrace && Error.captureStackTrace(a, H), !n)
    throw a;
  return a;
}, Xr = function(r, e, n, a) {
  var v = r.length, f = a ? a.length : 0;
  if (!v || e.f && !e.l)
    return n || new M(0);
  var t = !n, u = t || e.i != 2, i = e.i;
  t && (n = new M(v * 3));
  var h = function(vr) {
    var fr = n.length;
    if (vr > fr) {
      var nr = new M(Math.max(fr * 2, vr));
      nr.set(n), n = nr;
    }
  }, l = e.f || 0, o = e.p || 0, s = e.b || 0, g = e.l, x = e.d, m = e.m, y = e.n, O = v * 8;
  do {
    if (!g) {
      l = Q(r, o, 1);
      var P = Q(r, o + 1, 3);
      if (o += 3, P)
        if (P == 1)
          g = Nr, x = Vr, m = 9, y = 5;
        else if (P == 2) {
          var j = Q(r, o, 31) + 257, T = Q(r, o + 10, 15) + 4, w = j + Q(r, o + 5, 31) + 1;
          o += 14;
          for (var c = new M(w), B = new M(19), z = 0; z < T; ++z)
            B[Ar[z]] = Q(r, o + z * 3, 7);
          o += T * 3;
          for (var q = wr(B), p = (1 << q) - 1, G = Z(B, q, 1), z = 0; z < w; ) {
            var R = G[Q(r, o, p)];
            o += R & 15;
            var F = R >> 4;
            if (F < 16)
              c[z++] = F;
            else {
              var U = 0, S = 0;
              for (F == 16 ? (S = 3 + Q(r, o, 3), o += 2, U = c[z - 1]) : F == 17 ? (S = 3 + Q(r, o, 7), o += 3) : F == 18 && (S = 11 + Q(r, o, 127), o += 7); S--; )
                c[z++] = U;
            }
          }
          var Y = c.subarray(0, j), D = c.subarray(j);
          m = wr(Y), y = wr(D), g = Z(Y, m, 1), x = Z(D, y, 1);
        } else
          H(1);
      else {
        var F = zr(o) + 4, E = r[F - 4] | r[F - 3] << 8, k = F + E;
        if (k > v) {
          i && H(0);
          break;
        }
        u && h(s + E), n.set(r.subarray(F, k), s), e.b = s += E, e.p = o = k * 8, e.f = l;
        continue;
      }
      if (o > O) {
        i && H(0);
        break;
      }
    }
    u && h(s + 131072);
    for (var ar = (1 << m) - 1, N = (1 << y) - 1, $ = o; ; $ = o) {
      var U = g[mr(r, o) & ar], J = U >> 4;
      if (o += U & 15, o > O) {
        i && H(0);
        break;
      }
      if (U || H(2), J < 256)
        n[s++] = J;
      else if (J == 256) {
        $ = o, g = null;
        break;
      } else {
        var K = J - 254;
        if (J > 264) {
          var z = J - 257, C = hr[z];
          K = Q(r, o, (1 << C) - 1) + Hr[z], o += C;
        }
        var W = x[mr(r, o) & N], rr = W >> 4;
        W || H(3), o += W & 15;
        var D = Kr[rr];
        if (rr > 3) {
          var C = cr[rr];
          D += mr(r, o) & (1 << C) - 1, o += C;
        }
        if (o > O) {
          i && H(0);
          break;
        }
        u && h(s + 131072);
        var er = s + K;
        if (s < D) {
          var ur = f - D, sr = Math.min(D, er);
          for (ur + s < 0 && H(3); s < sr; ++s)
            n[s] = a[ur + s];
        }
        for (; s < er; ++s)
          n[s] = n[s - D];
      }
    }
    e.l = g, e.p = $, e.b = s, e.f = l, g && (l = 1, e.m = m, e.d = x, e.n = y);
  } while (!l);
  return s != n.length && t ? ir(n, 0, s) : n.subarray(0, s);
}, _ = function(r, e, n) {
  n <<= e & 7;
  var a = e / 8 | 0;
  r[a] |= n, r[a + 1] |= n >> 8;
}, or = function(r, e, n) {
  n <<= e & 7;
  var a = e / 8 | 0;
  r[a] |= n, r[a + 1] |= n >> 8, r[a + 2] |= n >> 16;
}, xr = function(r, e) {
  for (var n = [], a = 0; a < r.length; ++a)
    r[a] && n.push({ s: a, f: r[a] });
  var v = n.length, f = n.slice();
  if (!v)
    return { t: Yr, l: 0 };
  if (v == 1) {
    var t = new M(n[0].s + 1);
    return t[n[0].s] = 1, { t, l: 1 };
  }
  n.sort(function(k, j) {
    return k.f - j.f;
  }), n.push({ s: -1, f: 25001 });
  var u = n[0], i = n[1], h = 0, l = 1, o = 2;
  for (n[0] = { s: -1, f: u.f + i.f, l: u, r: i }; l != v - 1; )
    u = n[n[h].f < n[o].f ? h++ : o++], i = n[h != l && n[h].f < n[o].f ? h++ : o++], n[l++] = { s: -1, f: u.f + i.f, l: u, r: i };
  for (var s = f[0].s, a = 1; a < v; ++a)
    f[a].s > s && (s = f[a].s);
  var g = new L(s + 1), x = Mr(n[l - 1], g, 0);
  if (x > e) {
    var a = 0, m = 0, y = x - e, O = 1 << y;
    for (f.sort(function(j, T) {
      return g[T.s] - g[j.s] || j.f - T.f;
    }); a < v; ++a) {
      var P = f[a].s;
      if (g[P] > e)
        m += O - (1 << x - g[P]), g[P] = e;
      else
        break;
    }
    for (m >>= y; m > 0; ) {
      var F = f[a].s;
      g[F] < e ? m -= 1 << e - g[F]++ - 1 : ++a;
    }
    for (; a >= 0 && m; --a) {
      var E = f[a].s;
      g[E] == e && (--g[E], ++m);
    }
    x = e;
  }
  return { t: new M(g), l: x };
}, Mr = function(r, e, n) {
  return r.s == -1 ? Math.max(Mr(r.l, e, n + 1), Mr(r.r, e, n + 1)) : e[r.s] = n;
}, jr = function(r) {
  for (var e = r.length; e && !r[--e]; )
    ;
  for (var n = new L(++e), a = 0, v = r[0], f = 1, t = function(i) {
    n[a++] = i;
  }, u = 1; u <= e; ++u)
    if (r[u] == v && u != e)
      ++f;
    else {
      if (!v && f > 2) {
        for (; f > 138; f -= 138)
          t(32754);
        f > 2 && (t(f > 10 ? f - 11 << 5 | 28690 : f - 3 << 5 | 12305), f = 0);
      } else if (f > 3) {
        for (t(v), --f; f > 6; f -= 6)
          t(8304);
        f > 2 && (t(f - 3 << 5 | 8208), f = 0);
      }
      for (; f--; )
        t(v);
      f = 1, v = r[u];
    }
  return { c: n.subarray(0, a), n: e };
}, tr = function(r, e) {
  for (var n = 0, a = 0; a < e.length; ++a)
    n += r[a] * e[a];
  return n;
}, Rr = function(r, e, n) {
  var a = n.length, v = zr(e + 2);
  r[v] = a & 255, r[v + 1] = a >> 8, r[v + 2] = r[v] ^ 255, r[v + 3] = r[v + 1] ^ 255;
  for (var f = 0; f < a; ++f)
    r[v + f + 4] = n[f];
  return (v + 4 + a) * 8;
}, Br = function(r, e, n, a, v, f, t, u, i, h, l) {
  _(e, l++, n), ++v[256];
  for (var o = xr(v, 15), s = o.t, g = o.l, x = xr(f, 15), m = x.t, y = x.l, O = jr(s), P = O.c, F = O.n, E = jr(m), k = E.c, j = E.n, T = new L(19), w = 0; w < P.length; ++w)
    ++T[P[w] & 31];
  for (var w = 0; w < k.length; ++w)
    ++T[k[w] & 31];
  for (var c = xr(T, 7), B = c.t, z = c.l, q = 19; q > 4 && !B[Ar[q - 1]]; --q)
    ;
  var p = h + 5 << 3, G = tr(v, d) + tr(f, lr) + t, R = tr(v, s) + tr(f, m) + t + 14 + 3 * q + tr(T, B) + 2 * T[16] + 3 * T[17] + 7 * T[18];
  if (i >= 0 && p <= G && p <= R)
    return Rr(e, l, r.subarray(i, i + h));
  var U, S, Y, D;
  if (_(e, l, 1 + (R < G)), l += 2, R < G) {
    U = Z(s, g, 0), S = s, Y = Z(m, y, 0), D = m;
    var ar = Z(B, z, 0);
    _(e, l, F - 257), _(e, l + 5, j - 1), _(e, l + 10, q - 4), l += 14;
    for (var w = 0; w < q; ++w)
      _(e, l + 3 * w, B[Ar[w]]);
    l += 3 * q;
    for (var N = [P, k], $ = 0; $ < 2; ++$)
      for (var J = N[$], w = 0; w < J.length; ++w) {
        var K = J[w] & 31;
        _(e, l, ar[K]), l += B[K], K > 15 && (_(e, l, J[w] >> 5 & 127), l += J[w] >> 12);
      }
  } else
    U = Lr, S = d, Y = Qr, D = lr;
  for (var w = 0; w < u; ++w) {
    var C = a[w];
    if (C > 255) {
      var K = C >> 18 & 31;
      or(e, l, U[K + 257]), l += S[K + 257], K > 7 && (_(e, l, C >> 23 & 31), l += hr[K]);
      var W = C & 31;
      or(e, l, Y[W]), l += D[W], W > 3 && (or(e, l, C >> 5 & 8191), l += cr[W]);
    } else
      or(e, l, U[C]), l += S[C];
  }
  return or(e, l, U[256]), l + S[256];
}, Zr = /* @__PURE__ */ new Tr([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Yr = /* @__PURE__ */ new M(0), $r = function(r, e, n, a, v, f) {
  var t = f.z || r.length, u = new M(a + t + 5 * (1 + Math.ceil(t / 7e3)) + v), i = u.subarray(a, u.length - v), h = f.l, l = (f.r || 0) & 7;
  if (e) {
    l && (i[0] = f.r >> 3);
    for (var o = Zr[e - 1], s = o >> 13, g = o & 8191, x = (1 << n) - 1, m = f.p || new L(32768), y = f.h || new L(x + 1), O = Math.ceil(n / 3), P = 2 * O, F = function(gr) {
      return (r[gr] ^ r[gr + 1] << O ^ r[gr + 2] << P) & x;
    }, E = new Tr(25e3), k = new L(288), j = new L(32), T = 0, w = 0, c = f.i || 0, B = 0, z = f.w || 0, q = 0; c + 2 < t; ++c) {
      var p = F(c), G = c & 32767, R = y[p];
      if (m[G] = R, y[p] = G, z <= c) {
        var U = t - c;
        if ((T > 7e3 || B > 24576) && (U > 423 || !h)) {
          l = Br(r, i, 0, E, k, j, w, B, q, c - q, l), B = T = w = 0, q = c;
          for (var S = 0; S < 286; ++S)
            k[S] = 0;
          for (var S = 0; S < 30; ++S)
            j[S] = 0;
        }
        var Y = 2, D = 0, ar = g, N = G - R & 32767;
        if (U > 2 && p == F(c - N))
          for (var $ = Math.min(s, U) - 1, J = Math.min(32767, c), K = Math.min(258, U); N <= J && --ar && G != R; ) {
            if (r[c + Y] == r[c + Y - N]) {
              for (var C = 0; C < K && r[c + C] == r[c + C - N]; ++C)
                ;
              if (C > Y) {
                if (Y = C, D = N, C > $)
                  break;
                for (var W = Math.min(N, C - 2), rr = 0, S = 0; S < W; ++S) {
                  var er = c - N + S & 32767, ur = m[er], sr = er - ur & 32767;
                  sr > rr && (rr = sr, R = er);
                }
              }
            }
            G = R, R = m[G], N += G - R & 32767;
          }
        if (D) {
          E[B++] = 268435456 | Sr[Y] << 18 | kr[D];
          var vr = Sr[Y] & 31, fr = kr[D] & 31;
          w += hr[vr] + cr[fr], ++k[257 + vr], ++j[fr], z = c + Y, ++T;
        } else
          E[B++] = r[c], ++k[r[c]];
      }
    }
    for (c = Math.max(c, z); c < t; ++c)
      E[B++] = r[c], ++k[r[c]];
    l = Br(r, i, h, E, k, j, w, B, q, c - q, l), h || (f.r = l & 7 | i[l / 8 | 0] << 3, l -= 7, f.h = y, f.p = m, f.i = c, f.w = z);
  } else {
    for (var c = f.w || 0; c < t + h; c += 65535) {
      var nr = c + 65535;
      nr >= t && (i[l / 8 | 0] = h, nr = t), l = Rr(i, l + 1, r.subarray(c, nr));
    }
    f.i = t;
  }
  return ir(u, 0, a + zr(l) + v);
}, _r = /* @__PURE__ */ function() {
  for (var r = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var n = e, a = 9; --a; )
      n = (n & 1 && -306674912) ^ n >>> 1;
    r[e] = n;
  }
  return r;
}(), pr = function() {
  var r = -1;
  return {
    p: function(e) {
      for (var n = r, a = 0; a < e.length; ++a)
        n = _r[n & 255 ^ e[a]] ^ n >>> 8;
      r = n;
    },
    d: function() {
      return ~r;
    }
  };
}, br = function(r, e, n, a, v) {
  if (!v && (v = { l: 1 }, e.dictionary)) {
    var f = e.dictionary.subarray(-32768), t = new M(f.length + r.length);
    t.set(f), t.set(r, f.length), r = t, v.w = f.length;
  }
  return $r(r, e.level == null ? 6 : e.level, e.mem == null ? v.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 20 : 12 + e.mem, n, a, v);
}, Gr = function(r, e) {
  var n = {};
  for (var a in r)
    n[a] = r[a];
  for (var a in e)
    n[a] = e[a];
  return n;
}, X = function(r, e) {
  return r[e] | r[e + 1] << 8;
}, V = function(r, e) {
  return (r[e] | r[e + 1] << 8 | r[e + 2] << 16 | r[e + 3] << 24) >>> 0;
}, yr = function(r, e) {
  return V(r, e) + V(r, e + 4) * 4294967296;
}, I = function(r, e, n) {
  for (; n; ++e)
    r[e] = n, n >>>= 8;
};
function dr(r, e) {
  return br(r, e || {}, 0, 0);
}
function re(r, e) {
  return Xr(r, { i: 2 }, e && e.out, e && e.dictionary);
}
var Jr = function(r, e, n, a) {
  for (var v in r) {
    var f = r[v], t = e + v, u = a;
    Array.isArray(f) && (u = Gr(a, f[1]), f = f[0]), f instanceof M ? n[t] = [f, u] : (n[t += "/"] = [new M(0), u], Jr(f, t, n, a));
  }
}, Ur = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), Fr = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), ee = 0;
try {
  Fr.decode(Yr, { stream: !0 }), ee = 1;
} catch {
}
var ne = function(r) {
  for (var e = "", n = 0; ; ) {
    var a = r[n++], v = (a > 127) + (a > 223) + (a > 239);
    if (n + v > r.length)
      return { s: e, r: ir(r, n - 1) };
    v ? v == 3 ? (a = ((a & 15) << 18 | (r[n++] & 63) << 12 | (r[n++] & 63) << 6 | r[n++] & 63) - 65536, e += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023)) : v & 1 ? e += String.fromCharCode((a & 31) << 6 | r[n++] & 63) : e += String.fromCharCode((a & 15) << 12 | (r[n++] & 63) << 6 | r[n++] & 63) : e += String.fromCharCode(a);
  }
};
function Dr(r, e) {
  var n;
  if (Ur)
    return Ur.encode(r);
  for (var a = r.length, v = new M(r.length + (r.length >> 1)), f = 0, t = function(h) {
    v[f++] = h;
  }, n = 0; n < a; ++n) {
    if (f + 5 > v.length) {
      var u = new M(f + 8 + (a - n << 1));
      u.set(v), v = u;
    }
    var i = r.charCodeAt(n);
    i < 128 || e ? t(i) : i < 2048 ? (t(192 | i >> 6), t(128 | i & 63)) : i > 55295 && i < 57344 ? (i = 65536 + (i & 1047552) | r.charCodeAt(++n) & 1023, t(240 | i >> 18), t(128 | i >> 12 & 63), t(128 | i >> 6 & 63), t(128 | i & 63)) : (t(224 | i >> 12), t(128 | i >> 6 & 63), t(128 | i & 63));
  }
  return ir(v, 0, f);
}
function ae(r, e) {
  if (e) {
    for (var n = "", a = 0; a < r.length; a += 16384)
      n += String.fromCharCode.apply(null, r.subarray(a, a + 16384));
    return n;
  } else {
    if (Fr)
      return Fr.decode(r);
    var v = ne(r), f = v.s, n = v.r;
    return n.length && H(8), f;
  }
}
var ve = function(r, e) {
  return e + 30 + X(r, e + 26) + X(r, e + 28);
}, fe = function(r, e, n) {
  var a = X(r, e + 28), v = ae(r.subarray(e + 46, e + 46 + a), !(X(r, e + 8) & 2048)), f = e + 46 + a, t = V(r, e + 20), u = n && t == 4294967295 ? oe(r, f) : [t, V(r, e + 24), V(r, e + 42)], i = u[0], h = u[1], l = u[2];
  return [X(r, e + 10), i, h, v, f + X(r, e + 30) + X(r, e + 32), l];
}, oe = function(r, e) {
  for (; X(r, e) != 1; e += 4 + X(r, e + 2))
    ;
  return [yr(r, e + 12), yr(r, e + 4), yr(r, e + 20)];
}, Er = function(r) {
  var e = 0;
  if (r)
    for (var n in r) {
      var a = r[n].length;
      a > 65535 && H(9), e += a + 4;
    }
  return e;
}, Ir = function(r, e, n, a, v, f, t, u) {
  var i = a.length, h = n.extra, l = u && u.length, o = Er(h);
  I(r, e, t != null ? 33639248 : 67324752), e += 4, t != null && (r[e++] = 20, r[e++] = n.os), r[e] = 20, e += 2, r[e++] = n.flag << 1 | (f < 0 && 8), r[e++] = v && 8, r[e++] = n.compression & 255, r[e++] = n.compression >> 8;
  var s = new Date(n.mtime == null ? Date.now() : n.mtime), g = s.getFullYear() - 1980;
  if ((g < 0 || g > 119) && H(10), I(r, e, g << 25 | s.getMonth() + 1 << 21 | s.getDate() << 16 | s.getHours() << 11 | s.getMinutes() << 5 | s.getSeconds() >> 1), e += 4, f != -1 && (I(r, e, n.crc), I(r, e + 4, f < 0 ? -f - 2 : f), I(r, e + 8, n.size)), I(r, e + 12, i), I(r, e + 14, o), e += 16, t != null && (I(r, e, l), I(r, e + 6, n.attrs), I(r, e + 10, t), e += 14), r.set(a, e), e += i, o)
    for (var x in h) {
      var m = h[x], y = m.length;
      I(r, e, +x), I(r, e + 2, y), r.set(m, e + 4), e += 4 + y;
    }
  return l && (r.set(u, e), e += l), e;
}, te = function(r, e, n, a, v) {
  I(r, e, 101010256), I(r, e + 8, n), I(r, e + 10, n), I(r, e + 12, a), I(r, e + 16, v);
};
function ue(r, e) {
  e || (e = {});
  var n = {}, a = [];
  Jr(r, "", n, e);
  var v = 0, f = 0;
  for (var t in n) {
    var u = n[t], i = u[0], h = u[1], l = h.level == 0 ? 0 : 8, o = Dr(t), s = o.length, g = h.comment, x = g && Dr(g), m = x && x.length, y = Er(h.extra);
    s > 65535 && H(11);
    var O = l ? dr(i, h) : i, P = O.length, F = pr();
    F.p(i), a.push(Gr(h, {
      size: i.length,
      crc: F.d(),
      c: O,
      f: o,
      m: x,
      u: s != t.length || x && g.length != m,
      o: v,
      compression: l
    })), v += 30 + s + y + P, f += 76 + 2 * (s + y) + (m || 0) + P;
  }
  for (var E = new M(f + 22), k = v, j = f - v, T = 0; T < a.length; ++T) {
    var o = a[T];
    Ir(E, o.o, o, o.f, o.u, o.c.length);
    var w = 30 + o.f.length + Er(o.extra);
    E.set(o.c, o.o + w), Ir(E, v, o, o.f, o.u, o.c.length, o.o, o.m), v += 16 + w + (o.m ? o.m.length : 0);
  }
  return te(E, v, a.length, j, k), E;
}
function se(r, e) {
  for (var n = {}, a = r.length - 22; V(r, a) != 101010256; --a)
    (!a || r.length - a > 65558) && H(13);
  var v = X(r, a + 8);
  if (!v)
    return {};
  var f = V(r, a + 16), t = f == 4294967295 || v == 65535;
  if (t) {
    var u = V(r, a - 12);
    t = V(r, u) == 101075792, t && (v = V(r, u + 32), f = V(r, u + 48));
  }
  for (var i = 0; i < v; ++i) {
    var h = fe(r, f, t), l = h[0], o = h[1], s = h[2], g = h[3], x = h[4], m = h[5], y = ve(r, m);
    f = x, l ? l == 8 ? n[g] = re(r.subarray(y, y + o), { out: new M(s) }) : H(14, "unknown compression type " + l) : n[g] = ir(r, y, y + o);
  }
  return n;
}
export {
  ie as F,
  le as P,
  ae as a,
  Dr as s,
  se as u,
  ue as z
};
