const a = {
  AnimationSystem: async () => (await import("./AnimationSystem-Bf-xhqRe.mjs").then((t) => t.b)).AnimationSystem,
  ARSystem: async () => (await import("./ARSystem-D27w7Pck.mjs").then((t) => t.g)).ARSystem,
  AssetConverter: async () => (await import("./AssetConverter-D-qOTLs1.mjs")).AssetConverter,
  AssetExporter: async () => (await import("./AssetExporter-ClYQ4gnb.mjs")).AssetExporter,
  AssetLoader: async () => (await import("./AssetLoader-BewzFwHi.mjs")).AssetLoader,
  MediaCreator: async () => (await import("./MediaCreator-psLAAyJA.mjs")).MediaCreator,
  State: async () => (await import("./State-BNgqNPrs.mjs")).State,
  Toolbox: async () => (await import("./Toolbox-DKuyL8n5.mjs")).Toolbox
}, e = async (t) => await a[t]();
export {
  e as g
};
