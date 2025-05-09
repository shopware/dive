function o(e) {
  var n;
  const t = e.split("/").pop() || "";
  return !t.includes(".") || t.endsWith(".") ? "" : ((n = t.split(".").pop()) == null ? void 0 : n.toLowerCase().split("?")[0]) || "";
}
function l(e) {
  return e.toLowerCase() in { glb: !0, gltf: !0, usdz: !0 };
}
const s = {
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
}, r = Object.values(s).map(
  (e) => e.extension
);
export {
  s as F,
  r as S,
  o as g,
  l as i
};
