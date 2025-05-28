/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/
var A = Uint8Array, R = Uint16Array, Tr = Int32Array, gr = new A([
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
]), wr = new A([
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
]), Cr = new A([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Hr = function(r, e) {
  for (var n = new R(31), a = 0; a < 31; ++a)
    n[a] = e += 1 << r[a - 1];
  for (var v = new Tr(n[30]), a = 1; a < 30; ++a)
    for (var f = n[a]; f < n[a + 1]; ++f)
      v[f] = f - n[a] << 5 | a;
  return { b: n, r: v };
}, Or = Hr(gr, 2), Yr = Or.b, Sr = Or.r;
Yr[28] = 258, Sr[258] = 28;
var Gr = Hr(wr, 0), Qr = Gr.b, Br = Gr.r, zr = new R(32768);
for (var C = 0; C < 32768; ++C) {
  var b = (C & 43690) >> 1 | (C & 21845) << 1;
  b = (b & 52428) >> 2 | (b & 13107) << 2, b = (b & 61680) >> 4 | (b & 3855) << 4, zr[C] = ((b & 65280) >> 8 | (b & 255) << 8) >> 1;
}
var j = function(r, e, n) {
  for (var a = r.length, v = 0, f = new R(e); v < a; ++v)
    r[v] && ++f[r[v] - 1];
  var i = new R(e);
  for (v = 1; v < e; ++v)
    i[v] = i[v - 1] + f[v - 1] << 1;
  var u;
  if (n) {
    u = new R(1 << e);
    var t = 15 - e;
    for (v = 0; v < a; ++v)
      if (r[v])
        for (var g = v << 4 | r[v], o = e - r[v], l = i[r[v] - 1]++ << o, h = l | (1 << o) - 1; l <= h; ++l)
          u[zr[l] >> t] = g;
  } else
    for (u = new R(a), v = 0; v < a; ++v)
      r[v] && (u[v] = zr[i[r[v] - 1]++] >> 15 - r[v]);
  return u;
}, d = new A(288);
for (var C = 0; C < 144; ++C)
  d[C] = 8;
for (var C = 144; C < 256; ++C)
  d[C] = 9;
for (var C = 256; C < 280; ++C)
  d[C] = 7;
for (var C = 280; C < 288; ++C)
  d[C] = 8;
var or = new A(32);
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
}, mr = function(r) {
  return (r + 7) / 8 | 0;
}, tr = function(r, e, n) {
  return (e == null || e < 0) && (e = 0), (n == null || n > r.length) && (n = r.length), new A(r.subarray(e, n));
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
], Y = function(r, e, n) {
  var a = new Error(e || Zr[r]);
  if (a.code = r, Error.captureStackTrace && Error.captureStackTrace(a, Y), !n)
    throw a;
  return a;
}, $r = function(r, e, n, a) {
  var v = r.length, f = a ? a.length : 0;
  if (!v || e.f && !e.l)
    return n || new A(0);
  var i = !n, u = i || e.i != 2, t = e.i;
  i && (n = new A(v * 3));
  var g = function(vr) {
    var fr = n.length;
    if (vr > fr) {
      var nr = new A(Math.max(fr * 2, vr));
      nr.set(n), n = nr;
    }
  }, o = e.f || 0, l = e.p || 0, h = e.b || 0, c = e.l, M = e.d, x = e.m, y = e.n, G = v * 8;
  do {
    if (!c) {
      o = W(r, l, 1);
      var H = W(r, l + 1, 3);
      if (l += 3, H)
        if (H == 1)
          c = Vr, M = Xr, x = 9, y = 5;
        else if (H == 2) {
          var E = W(r, l, 31) + 257, T = W(r, l + 10, 15) + 4, s = E + W(r, l + 5, 31) + 1;
          l += 14;
          for (var w = new A(s), U = new A(19), m = 0; m < T; ++m)
            U[Cr[m]] = W(r, l + m * 3, 7);
          l += T * 3;
          for (var O = sr(U), p = (1 << O) - 1, N = j(U, O, 1), m = 0; m < s; ) {
            var J = N[W(r, l, p)];
            l += J & 15;
            var F = J >> 4;
            if (F < 16)
              w[m++] = F;
            else {
              var D = 0, S = 0;
              for (F == 16 ? (S = 3 + W(r, l, 3), l += 2, D = w[m - 1]) : F == 17 ? (S = 3 + W(r, l, 7), l += 3) : F == 18 && (S = 11 + W(r, l, 127), l += 7); S--; )
                w[m++] = D;
            }
          }
          var K = w.subarray(0, E), I = w.subarray(E);
          x = sr(K), y = sr(I), c = j(K, x, 1), M = j(I, y, 1);
        } else
          Y(1);
      else {
        var F = mr(l) + 4, k = r[F - 4] | r[F - 3] << 8, B = F + k;
        if (B > v) {
          t && Y(0);
          break;
        }
        u && g(h + k), n.set(r.subarray(F, B), h), e.b = h += k, e.p = l = B * 8, e.f = o;
        continue;
      }
      if (l > G) {
        t && Y(0);
        break;
      }
    }
    u && g(h + 131072);
    for (var ar = (1 << x) - 1, V = (1 << y) - 1, L = l; ; L = l) {
      var D = c[xr(r, l) & ar], P = D >> 4;
      if (l += D & 15, l > G) {
        t && Y(0);
        break;
      }
      if (D || Y(2), P < 256)
        n[h++] = P;
      else if (P == 256) {
        L = l, c = null;
        break;
      } else {
        var Q = P - 254;
        if (P > 264) {
          var m = P - 257, z = gr[m];
          Q = W(r, l, (1 << z) - 1) + Yr[m], l += z;
        }
        var Z = M[xr(r, l) & V], rr = Z >> 4;
        Z || Y(3), l += Z & 15;
        var I = Qr[rr];
        if (rr > 3) {
          var z = wr[rr];
          I += xr(r, l) & (1 << z) - 1, l += z;
        }
        if (l > G) {
          t && Y(0);
          break;
        }
        u && g(h + 131072);
        var er = h + Q;
        if (h < I) {
          var ur = f - I, hr = Math.min(I, er);
          for (ur + h < 0 && Y(3); h < hr; ++h)
            n[h] = a[ur + h];
        }
        for (; h < er; ++h)
          n[h] = n[h - I];
      }
    }
    e.l = c, e.p = L, e.b = h, e.f = o, c && (o = 1, e.m = x, e.d = M, e.n = y);
  } while (!o);
  return h != n.length && i ? tr(n, 0, h) : n.subarray(0, h);
}, _ = function(r, e, n) {
  n <<= e & 7;
  var a = e / 8 | 0;
  r[a] |= n, r[a + 1] |= n >> 8;
}, lr = function(r, e, n) {
  n <<= e & 7;
  var a = e / 8 | 0;
  r[a] |= n, r[a + 1] |= n >> 8, r[a + 2] |= n >> 16;
}, Mr = function(r, e) {
  for (var n = [], a = 0; a < r.length; ++a)
    r[a] && n.push({ s: a, f: r[a] });
  var v = n.length, f = n.slice();
  if (!v)
    return { t: Kr, l: 0 };
  if (v == 1) {
    var i = new A(n[0].s + 1);
    return i[n[0].s] = 1, { t: i, l: 1 };
  }
  n.sort(function(B, E) {
    return B.f - E.f;
  }), n.push({ s: -1, f: 25001 });
  var u = n[0], t = n[1], g = 0, o = 1, l = 2;
  for (n[0] = { s: -1, f: u.f + t.f, l: u, r: t }; o != v - 1; )
    u = n[n[g].f < n[l].f ? g++ : l++], t = n[g != o && n[g].f < n[l].f ? g++ : l++], n[o++] = { s: -1, f: u.f + t.f, l: u, r: t };
  for (var h = f[0].s, a = 1; a < v; ++a)
    f[a].s > h && (h = f[a].s);
  var c = new R(h + 1), M = Ar(n[o - 1], c, 0);
  if (M > e) {
    var a = 0, x = 0, y = M - e, G = 1 << y;
    for (f.sort(function(E, T) {
      return c[T.s] - c[E.s] || E.f - T.f;
    }); a < v; ++a) {
      var H = f[a].s;
      if (c[H] > e)
        x += G - (1 << M - c[H]), c[H] = e;
      else
        break;
    }
    for (x >>= y; x > 0; ) {
      var F = f[a].s;
      c[F] < e ? x -= 1 << e - c[F]++ - 1 : ++a;
    }
    for (; a >= 0 && x; --a) {
      var k = f[a].s;
      c[k] == e && (--c[k], ++x);
    }
    M = e;
  }
  return { t: new A(c), l: M };
}, Ar = function(r, e, n) {
  return r.s == -1 ? Math.max(Ar(r.l, e, n + 1), Ar(r.r, e, n + 1)) : e[r.s] = n;
}, Er = function(r) {
  for (var e = r.length; e && !r[--e]; )
    ;
  for (var n = new R(++e), a = 0, v = r[0], f = 1, i = function(t) {
    n[a++] = t;
  }, u = 1; u <= e; ++u)
    if (r[u] == v && u != e)
      ++f;
    else {
      if (!v && f > 2) {
        for (; f > 138; f -= 138)
          i(32754);
        f > 2 && (i(f > 10 ? f - 11 << 5 | 28690 : f - 3 << 5 | 12305), f = 0);
      } else if (f > 3) {
        for (i(v), --f; f > 6; f -= 6)
          i(8304);
        f > 2 && (i(f - 3 << 5 | 8208), f = 0);
      }
      for (; f--; )
        i(v);
      f = 1, v = r[u];
    }
  return { c: n.subarray(0, a), n: e };
}, ir = function(r, e) {
  for (var n = 0, a = 0; a < e.length; ++a)
    n += r[a] * e[a];
  return n;
}, Jr = function(r, e, n) {
  var a = n.length, v = mr(e + 2);
  r[v] = a & 255, r[v + 1] = a >> 8, r[v + 2] = r[v] ^ 255, r[v + 3] = r[v + 1] ^ 255;
  for (var f = 0; f < a; ++f)
    r[v + f + 4] = n[f];
  return (v + 4 + a) * 8;
}, Ur = function(r, e, n, a, v, f, i, u, t, g, o) {
  _(e, o++, n), ++v[256];
  for (var l = Mr(v, 15), h = l.t, c = l.l, M = Mr(f, 15), x = M.t, y = M.l, G = Er(h), H = G.c, F = G.n, k = Er(x), B = k.c, E = k.n, T = new R(19), s = 0; s < H.length; ++s)
    ++T[H[s] & 31];
  for (var s = 0; s < B.length; ++s)
    ++T[B[s] & 31];
  for (var w = Mr(T, 7), U = w.t, m = w.l, O = 19; O > 4 && !U[Cr[O - 1]]; --O)
    ;
  var p = g + 5 << 3, N = ir(v, d) + ir(f, or) + i, J = ir(v, h) + ir(f, x) + i + 14 + 3 * O + ir(T, U) + 2 * T[16] + 3 * T[17] + 7 * T[18];
  if (t >= 0 && p <= N && p <= J)
    return Jr(e, o, r.subarray(t, t + g));
  var D, S, K, I;
  if (_(e, o, 1 + (J < N)), o += 2, J < N) {
    D = j(h, c, 0), S = h, K = j(x, y, 0), I = x;
    var ar = j(U, m, 0);
    _(e, o, F - 257), _(e, o + 5, E - 1), _(e, o + 10, O - 4), o += 14;
    for (var s = 0; s < O; ++s)
      _(e, o + 3 * s, U[Cr[s]]);
    o += 3 * O;
    for (var V = [H, B], L = 0; L < 2; ++L)
      for (var P = V[L], s = 0; s < P.length; ++s) {
        var Q = P[s] & 31;
        _(e, o, ar[Q]), o += U[Q], Q > 15 && (_(e, o, P[s] >> 5 & 127), o += P[s] >> 12);
      }
  } else
    D = Rr, S = d, K = Wr, I = or;
  for (var s = 0; s < u; ++s) {
    var z = a[s];
    if (z > 255) {
      var Q = z >> 18 & 31;
      lr(e, o, D[Q + 257]), o += S[Q + 257], Q > 7 && (_(e, o, z >> 23 & 31), o += gr[Q]);
      var Z = z & 31;
      lr(e, o, K[Z]), o += I[Z], Z > 3 && (lr(e, o, z >> 5 & 8191), o += wr[Z]);
    } else
      lr(e, o, D[z]), o += S[z];
  }
  return lr(e, o, D[256]), o + S[256];
}, jr = /* @__PURE__ */ new Tr([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Kr = /* @__PURE__ */ new A(0), Lr = function(r, e, n, a, v, f) {
  var i = f.z || r.length, u = new A(a + i + 5 * (1 + Math.ceil(i / 7e3)) + v), t = u.subarray(a, u.length - v), g = f.l, o = (f.r || 0) & 7;
  if (e) {
    o && (t[0] = f.r >> 3);
    for (var l = jr[e - 1], h = l >> 13, c = l & 8191, M = (1 << n) - 1, x = f.p || new R(32768), y = f.h || new R(M + 1), G = Math.ceil(n / 3), H = 2 * G, F = function(cr) {
      return (r[cr] ^ r[cr + 1] << G ^ r[cr + 2] << H) & M;
    }, k = new Tr(25e3), B = new R(288), E = new R(32), T = 0, s = 0, w = f.i || 0, U = 0, m = f.w || 0, O = 0; w + 2 < i; ++w) {
      var p = F(w), N = w & 32767, J = y[p];
      if (x[N] = J, y[p] = N, m <= w) {
        var D = i - w;
        if ((T > 7e3 || U > 24576) && (D > 423 || !g)) {
          o = Ur(r, t, 0, k, B, E, s, U, O, w - O, o), U = T = s = 0, O = w;
          for (var S = 0; S < 286; ++S)
            B[S] = 0;
          for (var S = 0; S < 30; ++S)
            E[S] = 0;
        }
        var K = 2, I = 0, ar = c, V = N - J & 32767;
        if (D > 2 && p == F(w - V))
          for (var L = Math.min(h, D) - 1, P = Math.min(32767, w), Q = Math.min(258, D); V <= P && --ar && N != J; ) {
            if (r[w + K] == r[w + K - V]) {
              for (var z = 0; z < Q && r[w + z] == r[w + z - V]; ++z)
                ;
              if (z > K) {
                if (K = z, I = V, z > L)
                  break;
                for (var Z = Math.min(V, z - 2), rr = 0, S = 0; S < Z; ++S) {
                  var er = w - V + S & 32767, ur = x[er], hr = er - ur & 32767;
                  hr > rr && (rr = hr, J = er);
                }
              }
            }
            N = J, J = x[N], V += N - J & 32767;
          }
        if (I) {
          k[U++] = 268435456 | Sr[K] << 18 | Br[I];
          var vr = Sr[K] & 31, fr = Br[I] & 31;
          s += gr[vr] + wr[fr], ++B[257 + vr], ++E[fr], m = w + K, ++T;
        } else
          k[U++] = r[w], ++B[r[w]];
      }
    }
    for (w = Math.max(w, m); w < i; ++w)
      k[U++] = r[w], ++B[r[w]];
    o = Ur(r, t, g, k, B, E, s, U, O, w - O, o), g || (f.r = o & 7 | t[o / 8 | 0] << 3, o -= 7, f.h = y, f.p = x, f.i = w, f.w = m);
  } else {
    for (var w = f.w || 0; w < i + g; w += 65535) {
      var nr = w + 65535;
      nr >= i && (t[o / 8 | 0] = g, nr = i), o = Jr(t, o + 1, r.subarray(w, nr));
    }
    f.i = i;
  }
  return tr(u, 0, a + mr(o) + v);
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
    var f = e.dictionary.subarray(-32768), i = new A(f.length + r.length);
    i.set(f), i.set(r, f.length), r = i, v.w = f.length;
  }
  return Lr(r, e.level == null ? 6 : e.level, e.mem == null ? v.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 20 : 12 + e.mem, n, a, v);
}, Nr = function(r, e) {
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
}, yr = function(r, e) {
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
var Pr = function(r, e, n, a) {
  for (var v in r) {
    var f = r[v], i = e + v, u = a;
    Array.isArray(f) && (u = Nr(a, f[1]), f = f[0]), f instanceof A ? n[i] = [f, u] : (n[i += "/"] = [new A(0), u], Pr(f, i, n, a));
  }
}, Dr = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), Fr = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), ee = 0;
try {
  Fr.decode(Kr, { stream: !0 }), ee = 1;
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
function Ir(r, e) {
  var n;
  if (Dr)
    return Dr.encode(r);
  for (var a = r.length, v = new A(r.length + (r.length >> 1)), f = 0, i = function(g) {
    v[f++] = g;
  }, n = 0; n < a; ++n) {
    if (f + 5 > v.length) {
      var u = new A(f + 8 + (a - n << 1));
      u.set(v), v = u;
    }
    var t = r.charCodeAt(n);
    t < 128 || e ? i(t) : t < 2048 ? (i(192 | t >> 6), i(128 | t & 63)) : t > 55295 && t < 57344 ? (t = 65536 + (t & 1047552) | r.charCodeAt(++n) & 1023, i(240 | t >> 18), i(128 | t >> 12 & 63), i(128 | t >> 6 & 63), i(128 | t & 63)) : (i(224 | t >> 12), i(128 | t >> 6 & 63), i(128 | t & 63));
  }
  return tr(v, 0, f);
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
    return n.length && Y(8), f;
  }
}
var ve = function(r, e) {
  return e + 30 + $(r, e + 26) + $(r, e + 28);
}, fe = function(r, e, n) {
  var a = $(r, e + 28), v = ae(r.subarray(e + 46, e + 46 + a), !($(r, e + 8) & 2048)), f = e + 46 + a, i = X(r, e + 20), u = n && i == 4294967295 ? le(r, f) : [i, X(r, e + 24), X(r, e + 42)], t = u[0], g = u[1], o = u[2];
  return [$(r, e + 10), t, g, v, f + $(r, e + 30) + $(r, e + 32), o];
}, le = function(r, e) {
  for (; $(r, e) != 1; e += 4 + $(r, e + 2))
    ;
  return [yr(r, e + 12), yr(r, e + 4), yr(r, e + 20)];
}, kr = function(r) {
  var e = 0;
  if (r)
    for (var n in r) {
      var a = r[n].length;
      a > 65535 && Y(9), e += a + 4;
    }
  return e;
}, qr = function(r, e, n, a, v, f, i, u) {
  var t = a.length, g = n.extra, o = u && u.length, l = kr(g);
  q(r, e, i != null ? 33639248 : 67324752), e += 4, i != null && (r[e++] = 20, r[e++] = n.os), r[e] = 20, e += 2, r[e++] = n.flag << 1 | (f < 0 && 8), r[e++] = v && 8, r[e++] = n.compression & 255, r[e++] = n.compression >> 8;
  var h = new Date(n.mtime == null ? Date.now() : n.mtime), c = h.getFullYear() - 1980;
  if ((c < 0 || c > 119) && Y(10), q(r, e, c << 25 | h.getMonth() + 1 << 21 | h.getDate() << 16 | h.getHours() << 11 | h.getMinutes() << 5 | h.getSeconds() >> 1), e += 4, f != -1 && (q(r, e, n.crc), q(r, e + 4, f < 0 ? -f - 2 : f), q(r, e + 8, n.size)), q(r, e + 12, t), q(r, e + 14, l), e += 16, i != null && (q(r, e, o), q(r, e + 6, n.attrs), q(r, e + 10, i), e += 14), r.set(a, e), e += t, l)
    for (var M in g) {
      var x = g[M], y = x.length;
      q(r, e, +M), q(r, e + 2, y), r.set(x, e + 4), e += 4 + y;
    }
  return o && (r.set(u, e), e += o), e;
}, ie = function(r, e, n, a, v) {
  q(r, e, 101010256), q(r, e + 8, n), q(r, e + 10, n), q(r, e + 12, a), q(r, e + 16, v);
};
function oe(r, e) {
  e || (e = {});
  var n = {}, a = [];
  Pr(r, "", n, e);
  var v = 0, f = 0;
  for (var i in n) {
    var u = n[i], t = u[0], g = u[1], o = g.level == 0 ? 0 : 8, l = Ir(i), h = l.length, c = g.comment, M = c && Ir(c), x = M && M.length, y = kr(g.extra);
    h > 65535 && Y(11);
    var G = o ? dr(t, g) : t, H = G.length, F = pr();
    F.p(t), a.push(Nr(g, {
      size: t.length,
      crc: F.d(),
      c: G,
      f: l,
      m: M,
      u: h != i.length || M && c.length != x,
      o: v,
      compression: o
    })), v += 30 + h + y + H, f += 76 + 2 * (h + y) + (x || 0) + H;
  }
  for (var k = new A(f + 22), B = v, E = f - v, T = 0; T < a.length; ++T) {
    var l = a[T];
    qr(k, l.o, l, l.f, l.u, l.c.length);
    var s = 30 + l.f.length + kr(l.extra);
    k.set(l.c, l.o + s), qr(k, v, l, l.f, l.u, l.c.length, l.o, l.m), v += 16 + s + (l.m ? l.m.length : 0);
  }
  return ie(k, v, a.length, E, B), k;
}
function te(r, e) {
  for (var n = {}, a = r.length - 22; X(r, a) != 101010256; --a)
    (!a || r.length - a > 65558) && Y(13);
  var v = $(r, a + 8);
  if (!v)
    return {};
  var f = X(r, a + 16), i = f == 4294967295 || v == 65535;
  if (i) {
    var u = X(r, a - 12);
    i = X(r, u) == 101075792, i && (v = X(r, u + 32), f = X(r, u + 48));
  }
  for (var t = 0; t < v; ++t) {
    var g = fe(r, f, i), o = g[0], l = g[1], h = g[2], c = g[3], M = g[4], x = g[5], y = ve(r, x);
    f = M, o ? o == 8 ? n[c] = re(r.subarray(y, y + l), { out: new A(h) }) : Y(14, "unknown compression type " + o) : n[c] = tr(r, y, y + l);
  }
  return n;
}
export {
  ae as a,
  Ir as s,
  te as u,
  oe as z
};
