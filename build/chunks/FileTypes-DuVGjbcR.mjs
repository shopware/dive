function o(e) {
  var s;
  const t = e.split("/").pop() || "";
  return !t.includes(".") || t.endsWith(".") ? "" : ((s = t.split(".").pop()) == null ? void 0 : s.toLowerCase().split("?")[0]) || "";
}
function i(e) {
  return e.toLowerCase() in { glb: !0, gltf: !0, usdz: !0 };
}
class u extends Error {
  constructor(t, n, s) {
    super(n), this.url = t, this.cause = s, this.name = "NetworkError";
  }
}
const r = {
  glb: {
    key: "glb",
    extension: "glb"
  },
  gltf: {
    key: "gltf",
    extension: "gltf"
  },
  usdz: {
    key: "usdz",
    extension: "usdz"
  }
}, l = Object.values(r).map(
  (e) => e.extension
);
export {
  r as F,
  u as N,
  l as S,
  o as g,
  i
};
