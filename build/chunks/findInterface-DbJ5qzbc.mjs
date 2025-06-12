function e(n, r) {
  return n ? r in n : !1;
}
function f(n, r) {
  if (n)
    return e(n, r) ? n : f(n.parent, r);
}
export {
  f,
  e as i
};
