import { P as ie, S as se, U as re, a as ne, M as bt, b as oe, c as ae, W as ce, C as he, D as le, N as ue, O as Tt, R as fe, d as de, e as gt, V as L, f as _e, Q as st, g as Z, h as nt, i as pe } from "./dive-BmDCwQRo.js";
function ve(e, t) {
  return e ? t in e : !1;
}
function Ft(e, t) {
  if (e)
    return ve(e, t) ? e : Ft(e.parent, t);
}
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/
var T = Uint8Array, I = Uint16Array, Et = Int32Array, Ct = new T([
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
]), $t = new T([
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
]), Ot = new T([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Nt = function(e, t) {
  for (var i = new I(31), s = 0; s < 31; ++s)
    i[s] = t += 1 << e[s - 1];
  for (var r = new Et(i[30]), s = 1; s < 30; ++s)
    for (var n = i[s]; n < i[s + 1]; ++n)
      r[n] = n - i[s] << 5 | s;
  return { b: i, r };
}, jt = Nt(Ct, 2), ge = jt.b, mt = jt.r;
ge[28] = 258, mt[258] = 28;
var me = Nt($t, 0), Xt = me.r, Rt = new I(32768);
for (var m = 0; m < 32768; ++m) {
  var j = (m & 43690) >> 1 | (m & 21845) << 1;
  j = (j & 52428) >> 2 | (j & 13107) << 2, j = (j & 61680) >> 4 | (j & 3855) << 4, Rt[m] = ((j & 65280) >> 8 | (j & 255) << 8) >> 1;
}
var rt = function(e, t, i) {
  for (var s = e.length, r = 0, n = new I(t); r < s; ++r)
    e[r] && ++n[e[r] - 1];
  var o = new I(t);
  for (r = 1; r < t; ++r)
    o[r] = o[r - 1] + n[r - 1] << 1;
  var c;
  if (i) {
    c = new I(1 << t);
    var h = 15 - t;
    for (r = 0; r < s; ++r)
      if (e[r])
        for (var l = r << 4 | e[r], a = t - e[r], u = o[e[r] - 1]++ << a, d = u | (1 << a) - 1; u <= d; ++u)
          c[Rt[u] >> h] = l;
  } else
    for (c = new I(s), r = 0; r < s; ++r)
      e[r] && (c[r] = Rt[o[e[r] - 1]++] >> 15 - e[r]);
  return c;
}, W = new T(288);
for (var m = 0; m < 144; ++m)
  W[m] = 8;
for (var m = 144; m < 256; ++m)
  W[m] = 9;
for (var m = 256; m < 280; ++m)
  W[m] = 7;
for (var m = 280; m < 288; ++m)
  W[m] = 8;
var ct = new T(32);
for (var m = 0; m < 32; ++m)
  ct[m] = 5;
var Re = /* @__PURE__ */ rt(W, 9, 0), Se = /* @__PURE__ */ rt(ct, 5, 0), Wt = function(e) {
  return (e + 7) / 8 | 0;
}, qt = function(e, t, i) {
  return (i == null || i > e.length) && (i = e.length), new T(e.subarray(t, i));
}, we = [
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
], lt = function(e, t, i) {
  var s = new Error(t || we[e]);
  if (s.code = e, Error.captureStackTrace && Error.captureStackTrace(s, lt), !i)
    throw s;
  return s;
}, F = function(e, t, i) {
  i <<= t & 7;
  var s = t / 8 | 0;
  e[s] |= i, e[s + 1] |= i >> 8;
}, tt = function(e, t, i) {
  i <<= t & 7;
  var s = t / 8 | 0;
  e[s] |= i, e[s + 1] |= i >> 8, e[s + 2] |= i >> 16;
}, pt = function(e, t) {
  for (var i = [], s = 0; s < e.length; ++s)
    e[s] && i.push({ s, f: e[s] });
  var r = i.length, n = i.slice();
  if (!r)
    return { t: Qt, l: 0 };
  if (r == 1) {
    var o = new T(i[0].s + 1);
    return o[i[0].s] = 1, { t: o, l: 1 };
  }
  i.sort(function(C, P) {
    return C.f - P.f;
  }), i.push({ s: -1, f: 25001 });
  var c = i[0], h = i[1], l = 0, a = 1, u = 2;
  for (i[0] = { s: -1, f: c.f + h.f, l: c, r: h }; a != r - 1; )
    c = i[i[l].f < i[u].f ? l++ : u++], h = i[l != a && i[l].f < i[u].f ? l++ : u++], i[a++] = { s: -1, f: c.f + h.f, l: c, r: h };
  for (var d = n[0].s, s = 1; s < r; ++s)
    n[s].s > d && (d = n[s].s);
  var f = new I(d + 1), p = St(i[a - 1], f, 0);
  if (p > t) {
    var s = 0, g = 0, S = p - t, $ = 1 << S;
    for (n.sort(function(P, R) {
      return f[R.s] - f[P.s] || P.f - R.f;
    }); s < r; ++s) {
      var D = n[s].s;
      if (f[D] > t)
        g += $ - (1 << p - f[D]), f[D] = t;
      else
        break;
    }
    for (g >>= S; g > 0; ) {
      var k = n[s].s;
      f[k] < t ? g -= 1 << t - f[k]++ - 1 : ++s;
    }
    for (; s >= 0 && g; --s) {
      var w = n[s].s;
      f[w] == t && (--f[w], ++g);
    }
    p = t;
  }
  return { t: new T(f), l: p };
}, St = function(e, t, i) {
  return e.s == -1 ? Math.max(St(e.l, t, i + 1), St(e.r, t, i + 1)) : t[e.s] = i;
}, Ut = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var i = new I(++t), s = 0, r = e[0], n = 1, o = function(h) {
    i[s++] = h;
  }, c = 1; c <= t; ++c)
    if (e[c] == r && c != t)
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
      n = 1, r = e[c];
    }
  return { c: i.subarray(0, s), n: t };
}, et = function(e, t) {
  for (var i = 0, s = 0; s < t.length; ++s)
    i += e[s] * t[s];
  return i;
}, Gt = function(e, t, i) {
  var s = i.length, r = Wt(t + 2);
  e[r] = s & 255, e[r + 1] = s >> 8, e[r + 2] = e[r] ^ 255, e[r + 3] = e[r + 1] ^ 255;
  for (var n = 0; n < s; ++n)
    e[r + n + 4] = i[n];
  return (r + 4 + s) * 8;
}, Lt = function(e, t, i, s, r, n, o, c, h, l, a) {
  F(t, a++, i), ++r[256];
  for (var u = pt(r, 15), d = u.t, f = u.l, p = pt(n, 15), g = p.t, S = p.l, $ = Ut(d), D = $.c, k = $.n, w = Ut(g), C = w.c, P = w.n, R = new I(19), v = 0; v < D.length; ++v)
    ++R[D[v] & 31];
  for (var v = 0; v < C.length; ++v)
    ++R[C[v] & 31];
  for (var _ = pt(R, 7), H = _.t, q = _.l, A = 19; A > 4 && !H[Ot[A - 1]]; --A)
    ;
  var G = l + 5 << 3, O = et(r, W) + et(n, ct) + o, X = et(r, d) + et(n, g) + o + 14 + 3 * A + et(R, H) + 2 * R[16] + 3 * R[17] + 7 * R[18];
  if (h >= 0 && G <= O && G <= X)
    return Gt(t, a, e.subarray(h, h + l));
  var z, y, U, N;
  if (F(t, a, 1 + (X < O)), a += 2, X < O) {
    z = rt(d, f, 0), y = d, U = rt(g, S, 0), N = g;
    var ut = rt(H, q, 0);
    F(t, a, k - 257), F(t, a + 5, P - 1), F(t, a + 10, A - 4), a += 14;
    for (var v = 0; v < A; ++v)
      F(t, a + 3 * v, H[Ot[v]]);
    a += 3 * A;
    for (var B = [D, C], K = 0; K < 2; ++K)
      for (var Q = B[K], v = 0; v < Q.length; ++v) {
        var V = Q[v] & 31;
        F(t, a, ut[V]), a += H[V], V > 15 && (F(t, a, Q[v] >> 5 & 127), a += Q[v] >> 12);
      }
  } else
    z = Re, y = W, U = Se, N = ct;
  for (var v = 0; v < c; ++v) {
    var M = s[v];
    if (M > 255) {
      var V = M >> 18 & 31;
      tt(t, a, z[V + 257]), a += y[V + 257], V > 7 && (F(t, a, M >> 23 & 31), a += Ct[V]);
      var Y = M & 31;
      tt(t, a, U[Y]), a += N[Y], Y > 3 && (tt(t, a, M >> 5 & 8191), a += $t[Y]);
    } else
      tt(t, a, z[M]), a += y[M];
  }
  return tt(t, a, z[256]), a + y[256];
}, ye = /* @__PURE__ */ new Et([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Qt = /* @__PURE__ */ new T(0), xe = function(e, t, i, s, r, n) {
  var o = n.z || e.length, c = new T(s + o + 5 * (1 + Math.ceil(o / 7e3)) + r), h = c.subarray(s, c.length - r), l = n.l, a = (n.r || 0) & 7;
  if (t) {
    a && (h[0] = n.r >> 3);
    for (var u = ye[t - 1], d = u >> 13, f = u & 8191, p = (1 << i) - 1, g = n.p || new I(32768), S = n.h || new I(p + 1), $ = Math.ceil(i / 3), D = 2 * $, k = function(_t) {
      return (e[_t] ^ e[_t + 1] << $ ^ e[_t + 2] << D) & p;
    }, w = new Et(25e3), C = new I(288), P = new I(32), R = 0, v = 0, _ = n.i || 0, H = 0, q = n.w || 0, A = 0; _ + 2 < o; ++_) {
      var G = k(_), O = _ & 32767, X = S[G];
      if (g[O] = X, S[G] = O, q <= _) {
        var z = o - _;
        if ((R > 7e3 || H > 24576) && (z > 423 || !l)) {
          a = Lt(e, h, 0, w, C, P, v, H, A, _ - A, a), H = R = v = 0, A = _;
          for (var y = 0; y < 286; ++y)
            C[y] = 0;
          for (var y = 0; y < 30; ++y)
            P[y] = 0;
        }
        var U = 2, N = 0, ut = f, B = O - X & 32767;
        if (z > 2 && G == k(_ - B))
          for (var K = Math.min(d, z) - 1, Q = Math.min(32767, _), V = Math.min(258, z); B <= Q && --ut && O != X; ) {
            if (e[_ + U] == e[_ + U - B]) {
              for (var M = 0; M < V && e[_ + M] == e[_ + M - B]; ++M)
                ;
              if (M > U) {
                if (U = M, N = B, M > K)
                  break;
                for (var Y = Math.min(B, M - 2), Ht = 0, y = 0; y < Y; ++y) {
                  var ft = _ - B + y & 32767, ee = g[ft], At = ft - ee & 32767;
                  At > Ht && (Ht = At, X = ft);
                }
              }
            }
            O = X, X = g[O], B += O - X & 32767;
          }
        if (N) {
          w[H++] = 268435456 | mt[U] << 18 | Xt[N];
          var It = mt[U] & 31, Dt = Xt[N] & 31;
          v += Ct[It] + $t[Dt], ++C[257 + It], ++P[Dt], q = _ + U, ++R;
        } else
          w[H++] = e[_], ++C[e[_]];
      }
    }
    for (_ = Math.max(_, q); _ < o; ++_)
      w[H++] = e[_], ++C[e[_]];
    a = Lt(e, h, l, w, C, P, v, H, A, _ - A, a), l || (n.r = a & 7 | h[a / 8 | 0] << 3, a -= 7, n.h = S, n.p = g, n.i = _, n.w = q);
  } else {
    for (var _ = n.w || 0; _ < o + l; _ += 65535) {
      var dt = _ + 65535;
      dt >= o && (h[a / 8 | 0] = l, dt = o), a = Gt(h, a + 1, e.subarray(_, dt));
    }
    n.i = o;
  }
  return qt(c, 0, s + Wt(a) + r);
}, Me = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var i = t, s = 9; --s; )
      i = (i & 1 && -306674912) ^ i >>> 1;
    e[t] = i;
  }
  return e;
}(), be = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var i = e, s = 0; s < t.length; ++s)
        i = Me[i & 255 ^ t[s]] ^ i >>> 8;
      e = i;
    },
    d: function() {
      return ~e;
    }
  };
}, Te = function(e, t, i, s, r) {
  if (!r && (r = { l: 1 }, t.dictionary)) {
    var n = t.dictionary.subarray(-32768), o = new T(n.length + e.length);
    o.set(n), o.set(e, n.length), e = o, r.w = n.length;
  }
  return xe(e, t.level == null ? 6 : t.level, t.mem == null ? r.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, i, s, r);
}, Yt = function(e, t) {
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
function Ee(e, t) {
  return Te(e, t || {}, 0, 0);
}
var Zt = function(e, t, i, s) {
  for (var r in e) {
    var n = e[r], o = t + r, c = s;
    Array.isArray(n) && (c = Yt(s, n[1]), n = n[0]), n instanceof T ? i[o] = [n, c] : (i[o += "/"] = [new T(0), c], Zt(n, o, i, s));
  }
}, kt = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), Ce = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), $e = 0;
try {
  Ce.decode(Qt, { stream: !0 }), $e = 1;
} catch {
}
function ht(e, t) {
  var i;
  if (kt)
    return kt.encode(e);
  for (var s = e.length, r = new T(e.length + (e.length >> 1)), n = 0, o = function(l) {
    r[n++] = l;
  }, i = 0; i < s; ++i) {
    if (n + 5 > r.length) {
      var c = new T(n + 8 + (s - i << 1));
      c.set(r), r = c;
    }
    var h = e.charCodeAt(i);
    h < 128 || t ? o(h) : h < 2048 ? (o(192 | h >> 6), o(128 | h & 63)) : h > 55295 && h < 57344 ? (h = 65536 + (h & 1047552) | e.charCodeAt(++i) & 1023, o(240 | h >> 18), o(128 | h >> 12 & 63), o(128 | h >> 6 & 63), o(128 | h & 63)) : (o(224 | h >> 12), o(128 | h >> 6 & 63), o(128 | h & 63));
  }
  return qt(r, 0, n);
}
var wt = function(e) {
  var t = 0;
  if (e)
    for (var i in e) {
      var s = e[i].length;
      s > 65535 && lt(9), t += s + 4;
    }
  return t;
}, zt = function(e, t, i, s, r, n, o, c) {
  var h = s.length, l = i.extra, a = c && c.length, u = wt(l);
  x(e, t, o != null ? 33639248 : 67324752), t += 4, o != null && (e[t++] = 20, e[t++] = i.os), e[t] = 20, t += 2, e[t++] = i.flag << 1 | (n < 0 && 8), e[t++] = r && 8, e[t++] = i.compression & 255, e[t++] = i.compression >> 8;
  var d = new Date(i.mtime == null ? Date.now() : i.mtime), f = d.getFullYear() - 1980;
  if ((f < 0 || f > 119) && lt(10), x(e, t, f << 25 | d.getMonth() + 1 << 21 | d.getDate() << 16 | d.getHours() << 11 | d.getMinutes() << 5 | d.getSeconds() >> 1), t += 4, n != -1 && (x(e, t, i.crc), x(e, t + 4, n < 0 ? -n - 2 : n), x(e, t + 8, i.size)), x(e, t + 12, h), x(e, t + 14, u), t += 16, o != null && (x(e, t, a), x(e, t + 6, i.attrs), x(e, t + 10, o), t += 14), e.set(s, t), t += h, u)
    for (var p in l) {
      var g = l[p], S = g.length;
      x(e, t, +p), x(e, t + 2, S), e.set(g, t + 4), t += 4 + S;
    }
  return a && (e.set(c, t), t += a), t;
}, Pe = function(e, t, i, s, r) {
  x(e, t, 101010256), x(e, t + 8, i), x(e, t + 10, i), x(e, t + 12, s), x(e, t + 16, r);
};
function He(e, t) {
  t || (t = {});
  var i = {}, s = [];
  Zt(e, "", i, t);
  var r = 0, n = 0;
  for (var o in i) {
    var c = i[o], h = c[0], l = c[1], a = l.level == 0 ? 0 : 8, u = ht(o), d = u.length, f = l.comment, p = f && ht(f), g = p && p.length, S = wt(l.extra);
    d > 65535 && lt(11);
    var $ = a ? Ee(h, l) : h, D = $.length, k = be();
    k.p(h), s.push(Yt(l, {
      size: h.length,
      crc: k.d(),
      c: $,
      f: u,
      m: p,
      u: d != o.length || p && f.length != g,
      o: r,
      compression: a
    })), r += 30 + d + S + D, n += 76 + 2 * (d + S) + (g || 0) + D;
  }
  for (var w = new T(n + 22), C = r, P = n - r, R = 0; R < s.length; ++R) {
    var u = s[R];
    zt(w, u.o, u, u.f, u.u, u.c.length);
    var v = 30 + u.f.length + wt(u.extra);
    w.set(u.c, u.o + v), zt(w, r, u, u.f, u.u, u.c.length, u.o, u.m), r += 16 + v + (u.m ? u.m.length : 0);
  }
  return Pe(w, r, s.length, P, C), w;
}
let it, vt, J, ot;
function Ae(e, t = 1 / 0, i = null) {
  vt || (vt = new ie(2, 2, 1, 1)), J || (J = new se({
    uniforms: { blitTexture: new re(e) },
    vertexShader: `
			varying vec2 vUv;
			void main(){
				vUv = uv;
				gl_Position = vec4(position.xy * 1.0,0.,.999999);
			}`,
    fragmentShader: `
			uniform sampler2D blitTexture; 
			varying vec2 vUv;

			void main(){ 
				gl_FragColor = vec4(vUv.xy, 0, 1);
				
				#ifdef IS_SRGB
				gl_FragColor = LinearTosRGB( texture2D( blitTexture, vUv) );
				#else
				gl_FragColor = texture2D( blitTexture, vUv);
				#endif
			}`
  })), J.uniforms.blitTexture.value = e, J.defines.IS_SRGB = e.colorSpace == ne, J.needsUpdate = !0, ot || (ot = new bt(vt, J), ot.frustumCulled = !1);
  const s = new oe(), r = new ae();
  r.add(ot), i === null && (i = it = new ce({ antialias: !1 }));
  const n = Math.min(e.image.width, t), o = Math.min(e.image.height, t);
  i.setSize(n, o), i.clear(), i.render(r, s);
  const c = document.createElement("canvas"), h = c.getContext("2d");
  c.width = n, c.height = o, h.drawImage(i.domElement, 0, 0, n, o);
  const l = new he(c);
  return l.minFilter = e.minFilter, l.magFilter = e.magFilter, l.wrapS = e.wrapS, l.wrapT = e.wrapT, l.name = e.name, it && (it.forceContextLoss(), it.dispose(), it = null), l;
}
class Ie {
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
    let n = Jt();
    n += Oe(i);
    const o = {}, c = {};
    t.traverseVisible((l) => {
      if (l.isMesh) {
        const a = l.geometry, u = l.material;
        if (u.isMeshStandardMaterial) {
          const d = "geometries/Geometry_" + a.id + ".usda";
          if (!(d in s)) {
            const f = ke(a);
            s[d] = Ue(f);
          }
          u.uuid in o || (o[u.uuid] = u), n += Le(l, a, u);
        } else
          console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)", l);
      } else l.isCamera && (n += Ge(l));
    }), n += Xe(), n += je(o, c, i.quickLookCompatible), s[r] = ht(n), n = null;
    for (const l in c) {
      let a = c[l];
      a.isCompressedTexture === !0 && (a = Ae(a));
      const u = De(a.image, a.flipY, i.maxTextureSize), d = await new Promise((f) => u.toBlob(f, "image/png", 1));
      s[`textures/Texture_${l}.png`] = new Uint8Array(await d.arrayBuffer());
    }
    let h = 0;
    for (const l in s) {
      const a = s[l], u = 34 + l.length;
      h += u;
      const d = h & 63;
      if (d !== 4) {
        const f = 64 - d, p = new Uint8Array(f);
        s[l] = [a, { extra: { 12345: p } }];
      }
      h = a.length;
    }
    return He(s, { level: 0 });
  }
}
function De(e, t, i) {
  if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
    const s = i / Math.max(e.width, e.height), r = document.createElement("canvas");
    r.width = e.width * Math.min(1, s), r.height = e.height * Math.min(1, s);
    const n = r.getContext("2d");
    return t === !0 && (n.translate(0, r.height), n.scale(1, -1)), n.drawImage(e, 0, 0, r.width, r.height), r;
  } else
    throw new Error("THREE.USDZExporter: No valid image data found. Unable to process texture.");
}
const b = 7;
function Jt() {
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
function Oe(e) {
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
function Xe() {
  return `
		}
	}
}

`;
}
function Ue(e) {
  let t = Jt();
  return t += e, ht(t);
}
function Le(e, t, i) {
  const s = "Object_" + e.id, r = Kt(e.matrixWorld);
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
function Kt(e) {
  const t = e.elements;
  return `( ${at(t, 0)}, ${at(t, 4)}, ${at(t, 8)}, ${at(t, 12)} )`;
}
function at(e, t) {
  return `(${e[t + 0]}, ${e[t + 1]}, ${e[t + 2]}, ${e[t + 3]})`;
}
function ke(e) {
  return `
def "Geometry"
{
${ze(e)}
}
`;
}
function ze(e) {
  const t = "Geometry", i = e.attributes, s = i.position.count;
  return `
	def Mesh "${t}"
	{
		int[] faceVertexCounts = [${Be(e)}]
		int[] faceVertexIndices = [${Ve(e)}]
		normal3f[] normals = [${yt(i.normal, s)}] (
			interpolation = "vertex"
		)
		point3f[] points = [${yt(i.position, s)}]
${Ne(i)}
		uniform token subdivisionScheme = "none"
	}
`;
}
function Be(e) {
  const t = e.index !== null ? e.index.count : e.attributes.position.count;
  return Array(t / 3).fill(3).join(", ");
}
function Ve(e) {
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
function yt(e, t) {
  if (e === void 0)
    return console.warn("USDZExporter: Normals missing."), Array(t).fill("(0, 0, 0)").join(", ");
  const i = [];
  for (let s = 0; s < e.count; s++) {
    const r = e.getX(s), n = e.getY(s), o = e.getZ(s);
    i.push(`(${r.toPrecision(b)}, ${n.toPrecision(b)}, ${o.toPrecision(b)})`);
  }
  return i.join(", ");
}
function Fe(e) {
  const t = [];
  for (let i = 0; i < e.count; i++) {
    const s = e.getX(i), r = e.getY(i);
    t.push(`(${s.toPrecision(b)}, ${1 - r.toPrecision(b)})`);
  }
  return t.join(", ");
}
function Ne(e) {
  let t = "";
  for (let s = 0; s < 4; s++) {
    const r = s > 0 ? s : "", n = e["uv" + r];
    n !== void 0 && (t += `
		texCoord2f[] primvars:st${r} = [${Fe(n)}] (
			interpolation = "vertex"
		)`);
  }
  const i = e.color;
  if (i !== void 0) {
    const s = i.count;
    t += `
	color3f[] primvars:displayColor = [${yt(i, s)}] (
		interpolation = "vertex"
		)`;
  }
  return t;
}
function je(e, t, i = !1) {
  const s = [];
  for (const r in e) {
    const n = e[r];
    s.push(We(n, t, i));
  }
  return `def "Materials"
{
${s.join("")}
}

`;
}
function We(e, t, i = !1) {
  const s = "			", r = [], n = [];
  function o(c, h, l) {
    const a = c.source.id + "_" + c.flipY;
    t[a] = c;
    const u = c.channel > 0 ? "st" + c.channel : "st", d = {
      1e3: "repeat",
      // RepeatWrapping
      1001: "clamp",
      // ClampToEdgeWrapping
      1002: "mirror"
      // MirroredRepeatWrapping
    }, f = c.repeat.clone(), p = c.offset.clone(), g = c.rotation, S = Math.sin(g), $ = Math.cos(g);
    return p.y = 1 - p.y - f.y, i ? (p.x = p.x / f.x, p.y = p.y / f.y, p.x += S / f.x, p.y += $ - 1) : (p.x += S * f.x, p.y += (1 - $) * f.y), `
		def Shader "PrimvarReader_${h}"
		{
			uniform token info:id = "UsdPrimvarReader_float2"
			float2 inputs:fallback = (0.0, 0.0)
			token inputs:varname = "${u}"
			float2 outputs:result
		}

		def Shader "Transform2d_${h}"
		{
			uniform token info:id = "UsdTransform2d"
			token inputs:in.connect = </Materials/Material_${e.id}/PrimvarReader_${h}.outputs:result>
			float inputs:rotation = ${(g * (180 / Math.PI)).toFixed(b)}
			float2 inputs:scale = ${Vt(f)}
			float2 inputs:translation = ${Vt(p)}
			float2 outputs:result
		}

		def Shader "Texture_${c.id}_${h}"
		{
			uniform token info:id = "UsdUVTexture"
			asset inputs:file = @textures/Texture_${a}.png@
			float2 inputs:st.connect = </Materials/Material_${e.id}/Transform2d_${h}.outputs:result>
			${l !== void 0 ? "float4 inputs:scale = " + qe(l) : ""}
			token inputs:sourceColorSpace = "${c.colorSpace === ue ? "raw" : "sRGB"}"
			token inputs:wrapS = "${d[c.wrapS]}"
			token inputs:wrapT = "${d[c.wrapT]}"
			float outputs:r
			float outputs:g
			float outputs:b
			float3 outputs:rgb
			${e.transparent || e.alphaTest > 0 ? "float outputs:a" : ""}
		}`;
  }
  return e.side === le && console.warn("THREE.USDZExporter: USDZ does not support double sided materials", e), e.map !== null ? (r.push(`${s}color3f inputs:diffuseColor.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:rgb>`), e.transparent ? r.push(`${s}float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`) : e.alphaTest > 0 && (r.push(`${s}float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`), r.push(`${s}float inputs:opacityThreshold = ${e.alphaTest}`)), n.push(o(e.map, "diffuse", e.color))) : r.push(`${s}color3f inputs:diffuseColor = ${Bt(e.color)}`), e.emissiveMap !== null ? (r.push(`${s}color3f inputs:emissiveColor.connect = </Materials/Material_${e.id}/Texture_${e.emissiveMap.id}_emissive.outputs:rgb>`), n.push(o(e.emissiveMap, "emissive"))) : e.emissive.getHex() > 0 && r.push(`${s}color3f inputs:emissiveColor = ${Bt(e.emissive)}`), e.normalMap !== null && (r.push(`${s}normal3f inputs:normal.connect = </Materials/Material_${e.id}/Texture_${e.normalMap.id}_normal.outputs:rgb>`), n.push(o(e.normalMap, "normal"))), e.aoMap !== null && (r.push(`${s}float inputs:occlusion.connect = </Materials/Material_${e.id}/Texture_${e.aoMap.id}_occlusion.outputs:r>`), n.push(o(e.aoMap, "occlusion"))), e.roughnessMap !== null && e.roughness === 1 ? (r.push(`${s}float inputs:roughness.connect = </Materials/Material_${e.id}/Texture_${e.roughnessMap.id}_roughness.outputs:g>`), n.push(o(e.roughnessMap, "roughness"))) : r.push(`${s}float inputs:roughness = ${e.roughness}`), e.metalnessMap !== null && e.metalness === 1 ? (r.push(`${s}float inputs:metallic.connect = </Materials/Material_${e.id}/Texture_${e.metalnessMap.id}_metallic.outputs:b>`), n.push(o(e.metalnessMap, "metallic"))) : r.push(`${s}float inputs:metallic = ${e.metalness}`), e.alphaMap !== null ? (r.push(`${s}float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.alphaMap.id}_opacity.outputs:r>`), r.push(`${s}float inputs:opacityThreshold = 0.0001`), n.push(o(e.alphaMap, "opacity"))) : r.push(`${s}float inputs:opacity = ${e.opacity}`), e.isMeshPhysicalMaterial && (r.push(`${s}float inputs:clearcoat = ${e.clearcoat}`), r.push(`${s}float inputs:clearcoatRoughness = ${e.clearcoatRoughness}`), r.push(`${s}float inputs:ior = ${e.ior}`)), `
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
function Bt(e) {
  return `(${e.r}, ${e.g}, ${e.b})`;
}
function qe(e) {
  return `(${e.r}, ${e.g}, ${e.b}, 1.0)`;
}
function Vt(e) {
  return `(${e.x}, ${e.y})`;
}
function Ge(e) {
  const t = e.name ? e.name : "Camera_" + e.id, i = Kt(e.matrixWorld);
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
class Qe extends Ie {
  parse(t, i) {
    return super.parse(t, i);
  }
}
const Pt = class Pt {
  static Launch(t, i) {
    const s = new Tt();
    return s.add(...this.extractModels(t)), this.launchARFromNode(s, i);
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
Pt._usdzExporter = new Qe();
let xt = Pt;
class Ye {
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
class Ze extends Tt {
  set mesh(t) {
    this.clear(), t && this.add(t);
  }
  constructor(t) {
    return super(), t ? this.mesh = t : this.UseDefaultMesh(), this.matrixAutoUpdate = !1, this;
  }
  UseDefaultMesh() {
    const t = new fe(0.08, 0.1, 32).rotateX(-Math.PI / 2), i = new de();
    this.mesh = new bt(t, i);
  }
  UpdateFromPose(t) {
    this.matrix.fromArray(t.transform.matrix);
  }
}
class Je {
  constructor(t, i) {
    this._referenceSpaceBuffer = null, this._requesting = !1, this._initialized = !1, this._session = t, this._renderer = i, this._hitMatrixBuffer = new gt();
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
        point: new L().setFromMatrixPosition(
          this._hitMatrixBuffer
        ),
        matrix: this._hitMatrixBuffer,
        object: void 0
      }) : void 0;
    }).filter((r) => r !== void 0);
  }
}
class Ke {
  constructor(t, i) {
    this._raycaster = new _e(), this._renderer = t, this._scene = i, this._controller = this._renderer.xr.getController(0);
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
class te {
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
class ti extends te {
  constructor(t, i, s) {
    super(), this._initialized = !1, this._arHitResultBuffer = [], this._sceneHitResultBuffer = [], this._hasHit = !1, this._session = t, this._threeRaycaster = new Ke(i, s), this._arRaycaster = new Je(t, i);
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
class ei {
  constructor(t, i, s) {
    this._raycastHitCounter = 0, this._originSetResolve = () => {
    }, this._renderer = i, this._session = t, this._originSet = new Promise((r) => {
      this._originSetResolve = r;
    }), this._requesting = !1, this._initialized = !1, this._referenceSpaceBuffer = null, this._hitTestSource = null, this._entityTypes = s || ["plane"], this._hitTestResultBuffer = [], this._matrix = new gt(), this._position = new L(), this._quaternion = new st(), this._scale = new L(), this._originSet.then(() => {
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
    this._initialized = !1, this._requesting = !1, (t = this._hitTestSource) == null || t.cancel(), this._hitTestSource = null, this._hitTestResultBuffer = [], this._matrix = new gt(), this._position = new L(), this._quaternion = new st(), this._scale = new L();
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
class ii extends te {
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
class si extends Tt {
  constructor(t, i, s) {
    super(), this._frameBuffer = null, this._handNodeInitialPosition = new L(), this._placed = !1, this._grabbedObject = null, this._arHitPosition = new L(), this._arHitQuaternion = new st(), this._arHitScale = new L(1, 1, 1), this._initialObjectPosition = null, this._initialRaycastHit = null, this._deltaRaycastHit = new L(), this._touchQuaterion = new st(), this._touchScale = 1, this._scaleThreshold = 0.1, this._startTouchQuaternion = new st(), this._startTouchScale = 1, this._renderer = i, this._scene = s, this._session = t, this._xrRaycaster = new ti(t, i, s), this._origin = new ei(this._session, this._renderer, [
      "plane"
    ]), this._crosshair = new Ze(), this._crosshair.visible = !1, this._xrCamera = this._renderer.xr.getCamera(), this._scene.XRRoot.XRHandNode.position.set(0, -0.05, -0.25), this._handNodeInitialPosition = this._scene.XRRoot.XRHandNode.position.clone(), this._touchscreenControls = new ii(
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
      new L(
        this._touchScale,
        this._touchScale,
        this._touchScale
      ).multiply(this._arHitScale)
    ));
  }
  onTouchStart() {
    const t = this._xrRaycaster.GetSceneIntersections();
    if (console.log("sceneHits", t), t.length === 0 || !t[0].object) return;
    const i = Ft(
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
      new L(0, -1, 0),
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
        r.layers.enableAll(), r instanceof bt && r.scale.set(0.1, 0.1, 0.1);
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
      const n = new Ye();
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
      ), this._xrController = new si(
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
let Mt = E;
class ri {
  static Launch(t, i) {
    const s = this.findSceneViewerSrc(t);
    this.launchSceneViewer(s, i);
  }
  static launchSceneViewer(t, i) {
    const s = document.createElement("a"), r = "#model-viewer-no-ar-fallback", n = self.location.toString(), o = new URL(n), c = new URL(t, n), h = new URLSearchParams(c.search);
    o.hash = r, h.set("mode", "ar_only"), (i == null ? void 0 : i.arScale) === "fixed" && h.set("resizable", "false"), (i == null ? void 0 : i.arPlacement) === "vertical" && h.set("enable_vertical_placement", "true");
    const l = `intent://arvr.google.com/scene-viewer/1.2?${h.toString() + "&file=" + c.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      o.toString()
    )};end;`;
    s.setAttribute("href", l), s.click();
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
class oi {
  constructor(t, i, s) {
    this._renderer = t, this._scene = i, this._controller = s;
  }
  async Launch(t) {
    const i = nt.GetSystem();
    if (i === "iOS")
      return this.tryARQuickLook();
    if (i === "Android")
      return t != null && t.useWebXR ? (console.warn("DIVE: WebXR is experimental on Android."), this.tryWebXR()) : this.trySceneViewer();
    console.log(
      "DIVE: AR not supported. Not a mobile system. (System is " + i + ")"
    );
  }
  async tryARQuickLook(t) {
    return nt.GetSupportsARQuickLook() ? (console.log("DIVE: Launching AR with ARQuickLook ..."), await xt.Launch(this._scene, t), Promise.resolve()) : (console.log("ARQuickLook not supported"), Promise.reject());
  }
  async tryWebXR() {
    return await nt.GetSupportsWebXR() ? (console.log("DIVE: Launching AR with WebXR ..."), await Mt.Launch(this._renderer, this._scene, this._controller), Promise.resolve()) : (console.log(
      "WebXR not supported. Reason: " + pe[nt.GetWebXRUnsupportedReason()]
    ), Promise.reject());
  }
  async trySceneViewer(t) {
    return console.log("DIVE: Launching AR with SceneViewer ..."), ri.Launch(this._scene, t), Promise.resolve();
  }
}
export {
  oi as DIVEAR
};
//# sourceMappingURL=AR-B6LRgTEL.js.map
