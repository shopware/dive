class oe extends Error {
  constructor(e, n) {
    super(e), this.cause = n, this.name = "ParseError";
  }
}
class te extends Error {
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
var z = Uint8Array, R = Uint16Array, Tr = Int32Array, gr = new z([
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
]), cr = new z([
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
]), Cr = new z([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Ir = function(r, e) {
  for (var n = new R(31), a = 0; a < 31; ++a)
    n[a] = e += 1 << r[a - 1];
  for (var v = new Tr(n[30]), a = 1; a < 30; ++a)
    for (var f = n[a]; f < n[a + 1]; ++f)
      v[f] = f - n[a] << 5 | a;
  return { b: n, r: v };
}, Hr = Ir(gr, 2), Or = Hr.b, Fr = Hr.r;
Or[28] = 258, Fr[258] = 28;
var Yr = Ir(cr, 0), Qr = Yr.b, mr = Yr.r, Sr = new R(32768);
for (var C = 0; C < 32768; ++C) {
  var b = (C & 43690) >> 1 | (C & 21845) << 1;
  b = (b & 52428) >> 2 | (b & 13107) << 2, b = (b & 61680) >> 4 | (b & 3855) << 4, Sr[C] = ((b & 65280) >> 8 | (b & 255) << 8) >> 1;
}
var j = function(r, e, n) {
  for (var a = r.length, v = 0, f = new R(e); v < a; ++v)
    r[v] && ++f[r[v] - 1];
  var l = new R(e);
  for (v = 1; v < e; ++v)
    l[v] = l[v - 1] + f[v - 1] << 1;
  var u;
  if (n) {
    u = new R(1 << e);
    var t = 15 - e;
    for (v = 0; v < a; ++v)
      if (r[v])
        for (var g = v << 4 | r[v], o = e - r[v], i = l[r[v] - 1]++ << o, h = i | (1 << o) - 1; i <= h; ++i)
          u[Sr[i] >> t] = g;
  } else
    for (u = new R(a), v = 0; v < a; ++v)
      r[v] && (u[v] = Sr[l[r[v] - 1]++] >> 15 - r[v]);
  return u;
}, d = new z(288);
for (var C = 0; C < 144; ++C)
  d[C] = 8;
for (var C = 144; C < 256; ++C)
  d[C] = 9;
for (var C = 256; C < 280; ++C)
  d[C] = 7;
for (var C = 280; C < 288; ++C)
  d[C] = 8;
var or = new z(32);
for (var C = 0; C < 32; ++C)
  or[C] = 5;
var Rr = /* @__PURE__ */ j(d, 9, 0), Vr = /* @__PURE__ */ j(d, 9, 1), Wr = /* @__PURE__ */ j(or, 5, 0), Xr = /* @__PURE__ */ j(or, 5, 1), sr = function(r) {
  for (var e = r[0], n = 1; n < r.length; ++n)
    r[n] > e && (e = r[n]);
  return e;
}, W = function(r, e, n) {
  var a = e / 8 | 0;
  return (r[a] | r[a + 1] << 8) >> (e & 7) & n;
}, xr = function(r, e) {
  var n = e / 8 | 0;
  return (r[n] | r[n + 1] << 8 | r[n + 2] << 16) >> (e & 7);
}, kr = function(r) {
  return (r + 7) / 8 | 0;
}, tr = function(r, e, n) {
  return (e == null || e < 0) && (e = 0), (n == null || n > r.length) && (n = r.length), new z(r.subarray(e, n));
}, Zr = [
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
], O = function(r, e, n) {
  var a = new Error(e || Zr[r]);
  if (a.code = r, Error.captureStackTrace && Error.captureStackTrace(a, O), !n)
    throw a;
  return a;
}, $r = function(r, e, n, a) {
  var v = r.length, f = a ? a.length : 0;
  if (!v || e.f && !e.l)
    return n || new z(0);
  var l = !n, u = l || e.i != 2, t = e.i;
  l && (n = new z(v * 3));
  var g = function(vr) {
    var fr = n.length;
    if (vr > fr) {
      var nr = new z(Math.max(fr * 2, vr));
      nr.set(n), n = nr;
    }
  }, o = e.f || 0, i = e.p || 0, h = e.b || 0, w = e.l, y = e.d, x = e.m, M = e.n, Y = v * 8;
  do {
    if (!w) {
      o = W(r, i, 1);
      var I = W(r, i + 1, 3);
      if (i += 3, I)
        if (I == 1)
          w = Vr, y = Xr, x = 9, M = 5;
        else if (I == 2) {
          var B = W(r, i, 31) + 257, T = W(r, i + 10, 15) + 4, s = B + W(r, i + 5, 31) + 1;
          i += 14;
          for (var c = new z(s), U = new z(19), k = 0; k < T; ++k)
            U[Cr[k]] = W(r, i + k * 3, 7);
          i += T * 3;
          for (var H = sr(U), p = (1 << H) - 1, K = j(U, H, 1), k = 0; k < s; ) {
            var G = K[W(r, i, p)];
            i += G & 15;
            var A = G >> 4;
            if (A < 16)
              c[k++] = A;
            else {
              var D = 0, F = 0;
              for (A == 16 ? (F = 3 + W(r, i, 3), i += 2, D = c[k - 1]) : A == 17 ? (F = 3 + W(r, i, 7), i += 3) : A == 18 && (F = 11 + W(r, i, 127), i += 7); F--; )
                c[k++] = D;
            }
          }
          var J = c.subarray(0, B), P = c.subarray(B);
          x = sr(J), M = sr(P), w = j(J, x, 1), y = j(P, M, 1);
        } else
          O(1);
      else {
        var A = kr(i) + 4, E = r[A - 4] | r[A - 3] << 8, m = A + E;
        if (m > v) {
          t && O(0);
          break;
        }
        u && g(h + E), n.set(r.subarray(A, m), h), e.b = h += E, e.p = i = m * 8, e.f = o;
        continue;
      }
      if (i > Y) {
        t && O(0);
        break;
      }
    }
    u && g(h + 131072);
    for (var ar = (1 << x) - 1, V = (1 << M) - 1, L = i; ; L = i) {
      var D = w[xr(r, i) & ar], N = D >> 4;
      if (i += D & 15, i > Y) {
        t && O(0);
        break;
      }
      if (D || O(2), N < 256)
        n[h++] = N;
      else if (N == 256) {
        L = i, w = null;
        break;
      } else {
        var Q = N - 254;
        if (N > 264) {
          var k = N - 257, S = gr[k];
          Q = W(r, i, (1 << S) - 1) + Or[k], i += S;
        }
        var Z = y[xr(r, i) & V], rr = Z >> 4;
        Z || O(3), i += Z & 15;
        var P = Qr[rr];
        if (rr > 3) {
          var S = cr[rr];
          P += xr(r, i) & (1 << S) - 1, i += S;
        }
        if (i > Y) {
          t && O(0);
          break;
        }
        u && g(h + 131072);
        var er = h + Q;
        if (h < P) {
          var ur = f - P, hr = Math.min(P, er);
          for (ur + h < 0 && O(3); h < hr; ++h)
            n[h] = a[ur + h];
        }
        for (; h < er; ++h)
          n[h] = n[h - P];
      }
    }
    e.l = w, e.p = L, e.b = h, e.f = o, w && (o = 1, e.m = x, e.d = y, e.n = M);
  } while (!o);
  return h != n.length && l ? tr(n, 0, h) : n.subarray(0, h);
}, _ = function(r, e, n) {
  n <<= e & 7;
  var a = e / 8 | 0;
  r[a] |= n, r[a + 1] |= n >> 8;
}, ir = function(r, e, n) {
  n <<= e & 7;
  var a = e / 8 | 0;
  r[a] |= n, r[a + 1] |= n >> 8, r[a + 2] |= n >> 16;
}, yr = function(r, e) {
  for (var n = [], a = 0; a < r.length; ++a)
    r[a] && n.push({ s: a, f: r[a] });
  var v = n.length, f = n.slice();
  if (!v)
    return { t: Jr, l: 0 };
  if (v == 1) {
    var l = new z(n[0].s + 1);
    return l[n[0].s] = 1, { t: l, l: 1 };
  }
  n.sort(function(m, B) {
    return m.f - B.f;
  }), n.push({ s: -1, f: 25001 });
  var u = n[0], t = n[1], g = 0, o = 1, i = 2;
  for (n[0] = { s: -1, f: u.f + t.f, l: u, r: t }; o != v - 1; )
    u = n[n[g].f < n[i].f ? g++ : i++], t = n[g != o && n[g].f < n[i].f ? g++ : i++], n[o++] = { s: -1, f: u.f + t.f, l: u, r: t };
  for (var h = f[0].s, a = 1; a < v; ++a)
    f[a].s > h && (h = f[a].s);
  var w = new R(h + 1), y = zr(n[o - 1], w, 0);
  if (y > e) {
    var a = 0, x = 0, M = y - e, Y = 1 << M;
    for (f.sort(function(B, T) {
      return w[T.s] - w[B.s] || B.f - T.f;
    }); a < v; ++a) {
      var I = f[a].s;
      if (w[I] > e)
        x += Y - (1 << y - w[I]), w[I] = e;
      else
        break;
    }
    for (x >>= M; x > 0; ) {
      var A = f[a].s;
      w[A] < e ? x -= 1 << e - w[A]++ - 1 : ++a;
    }
    for (; a >= 0 && x; --a) {
      var E = f[a].s;
      w[E] == e && (--w[E], ++x);
    }
    y = e;
  }
  return { t: new z(w), l: y };
}, zr = function(r, e, n) {
  return r.s == -1 ? Math.max(zr(r.l, e, n + 1), zr(r.r, e, n + 1)) : e[r.s] = n;
}, Br = function(r) {
  for (var e = r.length; e && !r[--e]; )
    ;
  for (var n = new R(++e), a = 0, v = r[0], f = 1, l = function(t) {
    n[a++] = t;
  }, u = 1; u <= e; ++u)
    if (r[u] == v && u != e)
      ++f;
    else {
      if (!v && f > 2) {
        for (; f > 138; f -= 138)
          l(32754);
        f > 2 && (l(f > 10 ? f - 11 << 5 | 28690 : f - 3 << 5 | 12305), f = 0);
      } else if (f > 3) {
        for (l(v), --f; f > 6; f -= 6)
          l(8304);
        f > 2 && (l(f - 3 << 5 | 8208), f = 0);
      }
      for (; f--; )
        l(v);
      f = 1, v = r[u];
    }
  return { c: n.subarray(0, a), n: e };
}, lr = function(r, e) {
  for (var n = 0, a = 0; a < e.length; ++a)
    n += r[a] * e[a];
  return n;
}, Gr = function(r, e, n) {
  var a = n.length, v = kr(e + 2);
  r[v] = a & 255, r[v + 1] = a >> 8, r[v + 2] = r[v] ^ 255, r[v + 3] = r[v + 1] ^ 255;
  for (var f = 0; f < a; ++f)
    r[v + f + 4] = n[f];
  return (v + 4 + a) * 8;
}, Ur = function(r, e, n, a, v, f, l, u, t, g, o) {
  _(e, o++, n), ++v[256];
  for (var i = yr(v, 15), h = i.t, w = i.l, y = yr(f, 15), x = y.t, M = y.l, Y = Br(h), I = Y.c, A = Y.n, E = Br(x), m = E.c, B = E.n, T = new R(19), s = 0; s < I.length; ++s)
    ++T[I[s] & 31];
  for (var s = 0; s < m.length; ++s)
    ++T[m[s] & 31];
  for (var c = yr(T, 7), U = c.t, k = c.l, H = 19; H > 4 && !U[Cr[H - 1]]; --H)
    ;
  var p = g + 5 << 3, K = lr(v, d) + lr(f, or) + l, G = lr(v, h) + lr(f, x) + l + 14 + 3 * H + lr(T, U) + 2 * T[16] + 3 * T[17] + 7 * T[18];
  if (t >= 0 && p <= K && p <= G)
    return Gr(e, o, r.subarray(t, t + g));
  var D, F, J, P;
  if (_(e, o, 1 + (G < K)), o += 2, G < K) {
    D = j(h, w, 0), F = h, J = j(x, M, 0), P = x;
    var ar = j(U, k, 0);
    _(e, o, A - 257), _(e, o + 5, B - 1), _(e, o + 10, H - 4), o += 14;
    for (var s = 0; s < H; ++s)
      _(e, o + 3 * s, U[Cr[s]]);
    o += 3 * H;
    for (var V = [I, m], L = 0; L < 2; ++L)
      for (var N = V[L], s = 0; s < N.length; ++s) {
        var Q = N[s] & 31;
        _(e, o, ar[Q]), o += U[Q], Q > 15 && (_(e, o, N[s] >> 5 & 127), o += N[s] >> 12);
      }
  } else
    D = Rr, F = d, J = Wr, P = or;
  for (var s = 0; s < u; ++s) {
    var S = a[s];
    if (S > 255) {
      var Q = S >> 18 & 31;
      ir(e, o, D[Q + 257]), o += F[Q + 257], Q > 7 && (_(e, o, S >> 23 & 31), o += gr[Q]);
      var Z = S & 31;
      ir(e, o, J[Z]), o += P[Z], Z > 3 && (ir(e, o, S >> 5 & 8191), o += cr[Z]);
    } else
      ir(e, o, D[S]), o += F[S];
  }
  return ir(e, o, D[256]), o + F[256];
}, jr = /* @__PURE__ */ new Tr([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Jr = /* @__PURE__ */ new z(0), Lr = function(r, e, n, a, v, f) {
  var l = f.z || r.length, u = new z(a + l + 5 * (1 + Math.ceil(l / 7e3)) + v), t = u.subarray(a, u.length - v), g = f.l, o = (f.r || 0) & 7;
  if (e) {
    o && (t[0] = f.r >> 3);
    for (var i = jr[e - 1], h = i >> 13, w = i & 8191, y = (1 << n) - 1, x = f.p || new R(32768), M = f.h || new R(y + 1), Y = Math.ceil(n / 3), I = 2 * Y, A = function(wr) {
      return (r[wr] ^ r[wr + 1] << Y ^ r[wr + 2] << I) & y;
    }, E = new Tr(25e3), m = new R(288), B = new R(32), T = 0, s = 0, c = f.i || 0, U = 0, k = f.w || 0, H = 0; c + 2 < l; ++c) {
      var p = A(c), K = c & 32767, G = M[p];
      if (x[K] = G, M[p] = K, k <= c) {
        var D = l - c;
        if ((T > 7e3 || U > 24576) && (D > 423 || !g)) {
          o = Ur(r, t, 0, E, m, B, s, U, H, c - H, o), U = T = s = 0, H = c;
          for (var F = 0; F < 286; ++F)
            m[F] = 0;
          for (var F = 0; F < 30; ++F)
            B[F] = 0;
        }
        var J = 2, P = 0, ar = w, V = K - G & 32767;
        if (D > 2 && p == A(c - V))
          for (var L = Math.min(h, D) - 1, N = Math.min(32767, c), Q = Math.min(258, D); V <= N && --ar && K != G; ) {
            if (r[c + J] == r[c + J - V]) {
              for (var S = 0; S < Q && r[c + S] == r[c + S - V]; ++S)
                ;
              if (S > J) {
                if (J = S, P = V, S > L)
                  break;
                for (var Z = Math.min(V, S - 2), rr = 0, F = 0; F < Z; ++F) {
                  var er = c - V + F & 32767, ur = x[er], hr = er - ur & 32767;
                  hr > rr && (rr = hr, G = er);
                }
              }
            }
            K = G, G = x[K], V += K - G & 32767;
          }
        if (P) {
          E[U++] = 268435456 | Fr[J] << 18 | mr[P];
          var vr = Fr[J] & 31, fr = mr[P] & 31;
          s += gr[vr] + cr[fr], ++m[257 + vr], ++B[fr], k = c + J, ++T;
        } else
          E[U++] = r[c], ++m[r[c]];
      }
    }
    for (c = Math.max(c, k); c < l; ++c)
      E[U++] = r[c], ++m[r[c]];
    o = Ur(r, t, g, E, m, B, s, U, H, c - H, o), g || (f.r = o & 7 | t[o / 8 | 0] << 3, o -= 7, f.h = M, f.p = x, f.i = c, f.w = k);
  } else {
    for (var c = f.w || 0; c < l + g; c += 65535) {
      var nr = c + 65535;
      nr >= l && (t[o / 8 | 0] = g, nr = l), o = Gr(t, o + 1, r.subarray(c, nr));
    }
    f.i = l;
  }
  return tr(u, 0, a + kr(o) + v);
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
    var f = e.dictionary.subarray(-32768), l = new z(f.length + r.length);
    l.set(f), l.set(r, f.length), r = l, v.w = f.length;
  }
  return Lr(r, e.level == null ? 6 : e.level, e.mem == null ? v.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 20 : 12 + e.mem, n, a, v);
}, Kr = function(r, e) {
  var n = {};
  for (var a in r)
    n[a] = r[a];
  for (var a in e)
    n[a] = e[a];
  return n;
}, $ = function(r, e) {
  return r[e] | r[e + 1] << 8;
}, X = function(r, e) {
  return (r[e] | r[e + 1] << 8 | r[e + 2] << 16 | r[e + 3] << 24) >>> 0;
}, Mr = function(r, e) {
  return X(r, e) + X(r, e + 4) * 4294967296;
}, q = function(r, e, n) {
  for (; n; ++e)
    r[e] = n, n >>>= 8;
};
function dr(r, e) {
  return br(r, e || {}, 0, 0);
}
function re(r, e) {
  return $r(r, { i: 2 }, e && e.out, e && e.dictionary);
}
var Nr = function(r, e, n, a) {
  for (var v in r) {
    var f = r[v], l = e + v, u = a;
    Array.isArray(f) && (u = Kr(a, f[1]), f = f[0]), f instanceof z ? n[l] = [f, u] : (n[l += "/"] = [new z(0), u], Nr(f, l, n, a));
  }
}, Dr = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), Ar = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), ee = 0;
try {
  Ar.decode(Jr, { stream: !0 }), ee = 1;
} catch {
}
var ne = function(r) {
  for (var e = "", n = 0; ; ) {
    var a = r[n++], v = (a > 127) + (a > 223) + (a > 239);
    if (n + v > r.length)
      return { s: e, r: tr(r, n - 1) };
    v ? v == 3 ? (a = ((a & 15) << 18 | (r[n++] & 63) << 12 | (r[n++] & 63) << 6 | r[n++] & 63) - 65536, e += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023)) : v & 1 ? e += String.fromCharCode((a & 31) << 6 | r[n++] & 63) : e += String.fromCharCode((a & 15) << 12 | (r[n++] & 63) << 6 | r[n++] & 63) : e += String.fromCharCode(a);
  }
};
function Pr(r, e) {
  var n;
  if (Dr)
    return Dr.encode(r);
  for (var a = r.length, v = new z(r.length + (r.length >> 1)), f = 0, l = function(g) {
    v[f++] = g;
  }, n = 0; n < a; ++n) {
    if (f + 5 > v.length) {
      var u = new z(f + 8 + (a - n << 1));
      u.set(v), v = u;
    }
    var t = r.charCodeAt(n);
    t < 128 || e ? l(t) : t < 2048 ? (l(192 | t >> 6), l(128 | t & 63)) : t > 55295 && t < 57344 ? (t = 65536 + (t & 1047552) | r.charCodeAt(++n) & 1023, l(240 | t >> 18), l(128 | t >> 12 & 63), l(128 | t >> 6 & 63), l(128 | t & 63)) : (l(224 | t >> 12), l(128 | t >> 6 & 63), l(128 | t & 63));
  }
  return tr(v, 0, f);
}
function ae(r, e) {
  if (e) {
    for (var n = "", a = 0; a < r.length; a += 16384)
      n += String.fromCharCode.apply(null, r.subarray(a, a + 16384));
    return n;
  } else {
    if (Ar)
      return Ar.decode(r);
    var v = ne(r), f = v.s, n = v.r;
    return n.length && O(8), f;
  }
}
var ve = function(r, e) {
  return e + 30 + $(r, e + 26) + $(r, e + 28);
}, fe = function(r, e, n) {
  var a = $(r, e + 28), v = ae(r.subarray(e + 46, e + 46 + a), !($(r, e + 8) & 2048)), f = e + 46 + a, l = X(r, e + 20), u = n && l == 4294967295 ? ie(r, f) : [l, X(r, e + 24), X(r, e + 42)], t = u[0], g = u[1], o = u[2];
  return [$(r, e + 10), t, g, v, f + $(r, e + 30) + $(r, e + 32), o];
}, ie = function(r, e) {
  for (; $(r, e) != 1; e += 4 + $(r, e + 2))
    ;
  return [Mr(r, e + 12), Mr(r, e + 4), Mr(r, e + 20)];
}, Er = function(r) {
  var e = 0;
  if (r)
    for (var n in r) {
      var a = r[n].length;
      a > 65535 && O(9), e += a + 4;
    }
  return e;
}, qr = function(r, e, n, a, v, f, l, u) {
  var t = a.length, g = n.extra, o = u && u.length, i = Er(g);
  q(r, e, l != null ? 33639248 : 67324752), e += 4, l != null && (r[e++] = 20, r[e++] = n.os), r[e] = 20, e += 2, r[e++] = n.flag << 1 | (f < 0 && 8), r[e++] = v && 8, r[e++] = n.compression & 255, r[e++] = n.compression >> 8;
  var h = new Date(n.mtime == null ? Date.now() : n.mtime), w = h.getFullYear() - 1980;
  if ((w < 0 || w > 119) && O(10), q(r, e, w << 25 | h.getMonth() + 1 << 21 | h.getDate() << 16 | h.getHours() << 11 | h.getMinutes() << 5 | h.getSeconds() >> 1), e += 4, f != -1 && (q(r, e, n.crc), q(r, e + 4, f < 0 ? -f - 2 : f), q(r, e + 8, n.size)), q(r, e + 12, t), q(r, e + 14, i), e += 16, l != null && (q(r, e, o), q(r, e + 6, n.attrs), q(r, e + 10, l), e += 14), r.set(a, e), e += t, i)
    for (var y in g) {
      var x = g[y], M = x.length;
      q(r, e, +y), q(r, e + 2, M), r.set(x, e + 4), e += 4 + M;
    }
  return o && (r.set(u, e), e += o), e;
}, le = function(r, e, n, a, v) {
  q(r, e, 101010256), q(r, e + 8, n), q(r, e + 10, n), q(r, e + 12, a), q(r, e + 16, v);
};
function ue(r, e) {
  e || (e = {});
  var n = {}, a = [];
  Nr(r, "", n, e);
  var v = 0, f = 0;
  for (var l in n) {
    var u = n[l], t = u[0], g = u[1], o = g.level == 0 ? 0 : 8, i = Pr(l), h = i.length, w = g.comment, y = w && Pr(w), x = y && y.length, M = Er(g.extra);
    h > 65535 && O(11);
    var Y = o ? dr(t, g) : t, I = Y.length, A = pr();
    A.p(t), a.push(Kr(g, {
      size: t.length,
      crc: A.d(),
      c: Y,
      f: i,
      m: y,
      u: h != l.length || y && w.length != x,
      o: v,
      compression: o
    })), v += 30 + h + M + I, f += 76 + 2 * (h + M) + (x || 0) + I;
  }
  for (var E = new z(f + 22), m = v, B = f - v, T = 0; T < a.length; ++T) {
    var i = a[T];
    qr(E, i.o, i, i.f, i.u, i.c.length);
    var s = 30 + i.f.length + Er(i.extra);
    E.set(i.c, i.o + s), qr(E, v, i, i.f, i.u, i.c.length, i.o, i.m), v += 16 + s + (i.m ? i.m.length : 0);
  }
  return le(E, v, a.length, B, m), E;
}
function he(r, e) {
  for (var n = {}, a = r.length - 22; X(r, a) != 101010256; --a)
    (!a || r.length - a > 65558) && O(13);
  var v = $(r, a + 8);
  if (!v)
    return {};
  var f = X(r, a + 16), l = f == 4294967295 || v == 65535;
  if (l) {
    var u = X(r, a - 12);
    l = X(r, u) == 101075792, l && (v = X(r, u + 32), f = X(r, u + 48));
  }
  for (var t = 0; t < v; ++t) {
    var g = fe(r, f, l), o = g[0], i = g[1], h = g[2], w = g[3], y = g[4], x = g[5], M = ve(r, x);
    f = y, o ? o == 8 ? n[w] = re(r.subarray(M, M + i), { out: new z(h) }) : O(14, "unknown compression type " + o) : n[w] = tr(r, M, M + i);
  }
  return n;
}
export {
  te as F,
  oe as P,
  ae as a,
  Pr as s,
  he as u,
  ue as z
};
//# sourceMappingURL=fflate.module-BQhIETD7.mjs.map
