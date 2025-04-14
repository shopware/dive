const o = {
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
}, n = Object.values(o).map(
  (s) => s.extension
);
class l extends Error {
  constructor(e, t, r) {
    super(t), this.url = e, this.cause = r, this.name = "NetworkError";
  }
}
export {
  o as F,
  l as N,
  n as S
};
//# sourceMappingURL=network-error-DgecatEk.mjs.map
