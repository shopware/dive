const n = "#c20017", s = "#00ab26", t = "#0081d4", f = n, l = s, u = t;
function o(e, r) {
  return e ? r in e : !1;
}
function a(e, r) {
  if (e)
    return o(e, r) ? e : a(e.parent, r);
}
export {
  f as A,
  l as a,
  u as b,
  n as c,
  s as d,
  t as e,
  a as f,
  o as i
};
