var a = Object.defineProperty;
var m = (s, e, t) => e in s ? a(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var o = (s, e, t) => m(s, typeof e != "symbol" ? e + "" : e, t);
var d = { AssetLoader: "./asset/loader/AssetLoader.mjs", AssetConverter: "./asset/converter/AssetConverter.mjs", AssetExporter: "./asset/exporter/AssetExporter.mjs", ARSystem: "./ar/ARSystem.mjs", MediaCreator: "./mediacreator/MediaCreator.mjs", SystemInfo: "./systeminfo/SystemInfo.mjs" };
class c {
  constructor(e) {
    o(this, "_promise", null);
    o(this, "_importFn");
    this._name = e, this._importFn = async () => {
      const t = d[this._name];
      if (!t)
        throw new Error(
          `Build path for module ${this._name} not found in __MODULE_BUILD_PATHS__. Build configuration issue?`
        );
      try {
        const r = await import(
          /* @vite-ignore */
          t
        );
        if (!r[this._name])
          throw new Error(
            `Module class ${this._name} not found in dynamically imported module: ${t}`
          );
        return r[this._name];
      } catch (r) {
        throw new Error(
          `Failed to dynamically import module ${this._name} from path ${t}: ${r instanceof Error ? r.message : String(r)}`
        );
      }
    };
  }
  /**
   * @internal
   * Get the module class, importing it if not already cached.
   * @returns A Promise that resolves to the module's class constructor.
   */
  async getClass() {
    return this._promise || (this._promise = this._importFn()), this._promise;
  }
}
const i = class i {
  constructor() {
    // Map stores ModuleImporter instances, keyed by name
    o(this, "_modules", /* @__PURE__ */ new Map());
  }
  /**
   * @internal
   * Get the singleton instance of the ModuleRegistryClass.
   * This ensures that there is only one registry throughout the application.
   */
  static get instance() {
    return this._instance;
  }
  /**
   * @internal
   * Register a module by its name.
   * This creates a new ModuleImporter instance that will handle the dynamic importing of the module class.
   *
   * @param name - The name of the module to register. Must be a key of ModuleClasses.
   * @throws Error if the module name is not a valid key of ModuleClasses.
   * @example
   * ```typescript
   * ModuleRegistry.register('MyModule');
   * ```
   */
  register(e) {
    this._modules.has(e) && console.warn(
      `Module '${e}' is already registered. Overwriting.`
    ), this._modules.set(e, new c(e));
  }
  /**
   * @internal
   * Get the class constructor for a registered module.
   * This will dynamically import the module if it hasn't been imported yet.
   *
   * @param name - The name of the module to get. Must be a key of ModuleClasses.
   * @returns A Promise that resolves to the module's class constructor.
   * @throws Error if the module is not registered.
   * @example
   * ```typescript
   * const ModuleClass = await ModuleRegistry.get('MyModule');
   * const instance = new ModuleClass();
   * ```
   */
  async get(e) {
    const t = this._modules.get(e);
    if (!t)
      throw new Error(`Module '${e}' not registered`);
    return t.getClass();
  }
};
o(i, "_instance", new i());
let n = i;
const l = n.instance, _ = {
  AssetLoader: "./asset/loader/AssetLoader.ts",
  AssetConverter: "./asset/converter/AssetConverter.ts",
  AssetExporter: "./asset/exporter/AssetExporter.ts",
  ARSystem: "./ar/ARSystem.ts",
  MediaCreator: "./mediacreator/MediaCreator.ts",
  SystemInfo: "./systeminfo/SystemInfo.ts"
};
Object.keys(_).forEach((s) => {
  l.register(s);
});
export {
  _ as MODULE_PATHS,
  l as ModuleRegistry
};
//# sourceMappingURL=index.mjs.map
