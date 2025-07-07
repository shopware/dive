function o(e) {
  var i;
  const t = e.split("/").pop() || "";
  return !t.includes(".") || t.endsWith(".") ? "" : ((i = t.split(".").pop()) == null ? void 0 : i.toLowerCase().split("?")[0]) || "";
}
function r(e) {
  return e.toLowerCase() in { glb: !0, gltf: !0, usdz: !0 };
}
export {
  o as g,
  r as i
};
