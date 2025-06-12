const a = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let m = 1234567;
const l = Math.PI / 180, w = 180 / Math.PI;
function I() {
  const r = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (a[r & 255] + a[r >> 8 & 255] + a[r >> 16 & 255] + a[r >> 24 & 255] + "-" + a[t & 255] + a[t >> 8 & 255] + "-" + a[t >> 16 & 15 | 64] + a[t >> 24 & 255] + "-" + a[e & 63 | 128] + a[e >> 8 & 255] + "-" + a[e >> 16 & 255] + a[e >> 24 & 255] + a[n & 255] + a[n >> 8 & 255] + a[n >> 16 & 255] + a[n >> 24 & 255]).toLowerCase();
}
function D(r, t, e) {
  return Math.max(t, Math.min(e, r));
}
function A(r, t) {
  return (r % t + t) % t;
}
function U(r, t, e, n, s) {
  return n + (r - t) * (s - n) / (e - t);
}
function g(r, t, e) {
  return r !== t ? (e - r) / (t - r) : 0;
}
function y(r, t, e) {
  return (1 - e) * r + e * t;
}
function x(r, t, e, n) {
  return y(r, t, 1 - Math.exp(-e * n));
}
function E(r, t = 1) {
  return t - Math.abs(A(r, t * 2) - t);
}
function P(r, t, e) {
  return r <= t ? 0 : r >= e ? 1 : (r = (r - t) / (e - t), r * r * (3 - 2 * r));
}
function T(r, t, e) {
  return r <= t ? 0 : r >= e ? 1 : (r = (r - t) / (e - t), r * r * r * (r * (r * 6 - 15) + 10));
}
function F(r, t) {
  return r + Math.floor(Math.random() * (t - r + 1));
}
function R(r, t) {
  return r + Math.random() * (t - r);
}
function k(r) {
  return r * (0.5 - Math.random());
}
function L(r) {
  r !== void 0 && (m = r);
  let t = m += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function O(r) {
  return r * l;
}
function X(r) {
  return r * w;
}
function Y(r) {
  return (r & r - 1) === 0 && r !== 0;
}
function Z(r) {
  return Math.pow(2, Math.ceil(Math.log(r) / Math.LN2));
}
function _(r) {
  return Math.pow(2, Math.floor(Math.log(r) / Math.LN2));
}
function z(r, t, e, n, s) {
  const u = Math.cos, i = Math.sin, f = u(e / 2), o = i(e / 2), c = u((t + n) / 2), d = i((t + n) / 2), h = u((t - n) / 2), M = i((t - n) / 2), b = u((n - t) / 2), p = i((n - t) / 2);
  switch (s) {
    case "XYX":
      r.set(f * d, o * h, o * M, f * c);
      break;
    case "YZY":
      r.set(o * M, f * d, o * h, f * c);
      break;
    case "ZXZ":
      r.set(o * h, o * M, f * d, f * c);
      break;
    case "XZX":
      r.set(f * d, o * p, o * b, f * c);
      break;
    case "YXY":
      r.set(o * b, f * d, o * p, f * c);
      break;
    case "ZYZ":
      r.set(o * p, o * b, f * d, f * c);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s);
  }
}
function G(r, t) {
  switch (t.constructor) {
    case Float32Array:
      return r;
    case Uint32Array:
      return r / 4294967295;
    case Uint16Array:
      return r / 65535;
    case Uint8Array:
      return r / 255;
    case Int32Array:
      return Math.max(r / 2147483647, -1);
    case Int16Array:
      return Math.max(r / 32767, -1);
    case Int8Array:
      return Math.max(r / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Q(r, t) {
  switch (t.constructor) {
    case Float32Array:
      return r;
    case Uint32Array:
      return Math.round(r * 4294967295);
    case Uint16Array:
      return Math.round(r * 65535);
    case Uint8Array:
      return Math.round(r * 255);
    case Int32Array:
      return Math.round(r * 2147483647);
    case Int16Array:
      return Math.round(r * 32767);
    case Int8Array:
      return Math.round(r * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const N = {
  DEG2RAD: l,
  RAD2DEG: w,
  generateUUID: I,
  clamp: D,
  euclideanModulo: A,
  mapLinear: U,
  inverseLerp: g,
  lerp: y,
  damp: x,
  pingpong: E,
  smoothstep: P,
  smootherstep: T,
  randInt: F,
  randFloat: R,
  randFloatSpread: k,
  seededRandom: L,
  degToRad: O,
  radToDeg: X,
  isPowerOfTwo: Y,
  ceilPowerOfTwo: Z,
  floorPowerOfTwo: _,
  setQuaternionFromProperEuler: z,
  normalize: Q,
  denormalize: G
};
export {
  N as M,
  D as c,
  I as g
};
