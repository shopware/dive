const a = {
  AnimationSystem: async () => (await import("../src/modules/animation/AnimationSystem.mjs")).AnimationSystem,
  ARSystem: async () => (await import("../src/modules/ar/ARSystem.mjs")).ARSystem,
  AssetConverter: async () => (await import("../src/modules/asset/converter/AssetConverter.mjs")).AssetConverter,
  AssetExporter: async () => (await import("../src/modules/asset/exporter/AssetExporter.mjs")).AssetExporter,
  AssetLoader: async () => (await import("../src/modules/asset/loader/AssetLoader.mjs")).AssetLoader,
  MediaCreator: async () => (await import("../src/modules/mediacreator/MediaCreator.mjs")).MediaCreator,
  State: async () => (await import("../src/modules/state/State.mjs")).State,
  Toolbox: async () => (await import("../src/modules/toolbox/Toolbox.mjs")).Toolbox
}, e = async (t) => await a[t]();
export {
  e as g
};
