function o(r) {
  var t;
  const e = r.split("/").pop() || "";
  return !e.includes(".") || e.endsWith(".") ? "" : ((t = e.split(".").pop()) == null ? void 0 : t.toLowerCase().split("?")[0]) || "";
}
function i(r) {
  return r.toLowerCase() in { glb: !0, gltf: !0, usdz: !0 };
}
class n extends Error {
  constructor(e, s, t) {
    super(s), this.url = e, this.cause = t, this.name = "NetworkError";
  }
}
export {
  n as N,
  o as g,
  i
};
