var ve = Object.defineProperty;
var Ge = (f, t, e) => t in f ? ve(f, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : f[t] = e;
var J = (f, t, e) => Ge(f, typeof t != "symbol" ? t + "" : t, e);
import { TrianglesDrawMode as Ue, TriangleFanDrawMode as ne, TriangleStripDrawMode as Se, Loader as we, LoaderUtils as V, FileLoader as W, MeshPhysicalMaterial as C, Vector2 as z, Color as G, LinearSRGBColorSpace as O, SRGBColorSpace as P, SpotLight as Be, PointLight as je, DirectionalLight as Ke, Matrix4 as q, Vector3 as U, Quaternion as _e, InstancedMesh as Ve, InstancedBufferAttribute as Xe, Object3D as oe, TextureLoader as ye, ImageBitmapLoader as We, BufferAttribute as v, InterleavedBuffer as ze, InterleavedBufferAttribute as qe, LinearMipmapLinearFilter as Le, NearestMipmapLinearFilter as Ye, LinearMipmapNearestFilter as Qe, NearestMipmapNearestFilter as Je, LinearFilter as Me, NearestFilter as Ze, RepeatWrapping as Y, MirroredRepeatWrapping as be, ClampToEdgeWrapping as Ne, PointsMaterial as $e, Material as Z, LineBasicMaterial as et, MeshStandardMaterial as Ie, DoubleSide as tt, MeshBasicMaterial as K, PropertyBinding as nt, BufferGeometry as Ce, SkinnedMesh as st, Mesh as Oe, LineSegments as rt, Line as ot, LineLoop as it, Points as at, Group as X, PerspectiveCamera as ct, MathUtils as lt, OrthographicCamera as ut, Skeleton as ft, AnimationClip as dt, Bone as ht, InterpolateDiscrete as pt, InterpolateLinear as Fe, Texture as ce, VectorKeyframeTrack as le, NumberKeyframeTrack as ue, QuaternionKeyframeTrack as fe, ColorManagement as de, FrontSide as mt, Interpolant as gt, Box3 as At, Sphere as Tt, NoColorSpace as k } from "three";
import { u as xt, a as he, F as pe, P as me } from "./fflate.module-CK2avau9.mjs";
window.__MODULE_PATHS__ = { AnimationSystem: "../src/modules/animation/AnimationSystem.mjs", ARSystem: "../src/modules/ar/ARSystem.mjs", AssetConverter: "../src/modules/asset/converter/AssetConverter.mjs", AssetExporter: "../src/modules/asset/exporter/AssetExporter.mjs", AssetLoader: "../src/modules/asset/loader/AssetLoader.mjs", MediaCreator: "../src/modules/mediacreator/MediaCreator.mjs", State: "../src/modules/state/State.mjs", SystemInfo: "../src/modules/systeminfo/SystemInfo.mjs", Toolbox: "../src/modules/toolbox/Toolbox.mjs" };
function Rt(f) {
  var o;
  const t = f.split("/").pop() || "";
  return !t.includes(".") || t.endsWith(".") ? "" : ((o = t.split(".").pop()) == null ? void 0 : o.toLowerCase().split("?")[0]) || "";
}
function Et(f) {
  return f.toLowerCase() in { glb: !0, gltf: !0, usdz: !0 };
}
class ge extends Error {
  constructor(t, e, o) {
    super(e), this.url = t, this.cause = o, this.name = "NetworkError";
  }
}
const St = {
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
}, wt = Object.values(St).map(
  (f) => f.extension
);
function Ae(f, t) {
  if (t === Ue)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), f;
  if (t === ne || t === Se) {
    let e = f.getIndex();
    if (e === null) {
      const s = [], a = f.getAttribute("position");
      if (a !== void 0) {
        for (let i = 0; i < a.count; i++)
          s.push(i);
        f.setIndex(s), e = f.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), f;
    }
    const o = e.count - 2, n = [];
    if (t === ne)
      for (let s = 1; s <= o; s++)
        n.push(e.getX(0)), n.push(e.getX(s)), n.push(e.getX(s + 1));
    else
      for (let s = 0; s < o; s++)
        s % 2 === 0 ? (n.push(e.getX(s)), n.push(e.getX(s + 1)), n.push(e.getX(s + 2))) : (n.push(e.getX(s + 2)), n.push(e.getX(s + 1)), n.push(e.getX(s)));
    n.length / 3 !== o && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = f.clone();
    return r.setIndex(n), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), f;
}
class _t extends we {
  constructor(t) {
    super(t), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new Nt(e);
    }), this.register(function(e) {
      return new vt(e);
    }), this.register(function(e) {
      return new Gt(e);
    }), this.register(function(e) {
      return new Ut(e);
    }), this.register(function(e) {
      return new Ct(e);
    }), this.register(function(e) {
      return new Ot(e);
    }), this.register(function(e) {
      return new Ft(e);
    }), this.register(function(e) {
      return new Dt(e);
    }), this.register(function(e) {
      return new bt(e);
    }), this.register(function(e) {
      return new Pt(e);
    }), this.register(function(e) {
      return new It(e);
    }), this.register(function(e) {
      return new Ht(e);
    }), this.register(function(e) {
      return new kt(e);
    }), this.register(function(e) {
      return new Lt(e);
    }), this.register(function(e) {
      return new Bt(e);
    }), this.register(function(e) {
      return new jt(e);
    });
  }
  load(t, e, o, n) {
    const r = this;
    let s;
    if (this.resourcePath !== "")
      s = this.resourcePath;
    else if (this.path !== "") {
      const c = V.extractUrlBase(t);
      s = V.resolveURL(c, this.path);
    } else
      s = V.extractUrlBase(t);
    this.manager.itemStart(t);
    const a = function(c) {
      n ? n(c) : console.error(c), r.manager.itemError(t), r.manager.itemEnd(t);
    }, i = new W(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(t, function(c) {
      try {
        r.parse(c, s, function(u) {
          e(u), r.manager.itemEnd(t);
        }, a);
      } catch (u) {
        a(u);
      }
    }, o, a);
  }
  setDRACOLoader(t) {
    return this.dracoLoader = t, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(t) {
    return this.ktx2Loader = t, this;
  }
  setMeshoptDecoder(t) {
    return this.meshoptDecoder = t, this;
  }
  register(t) {
    return this.pluginCallbacks.indexOf(t) === -1 && this.pluginCallbacks.push(t), this;
  }
  unregister(t) {
    return this.pluginCallbacks.indexOf(t) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1), this;
  }
  parse(t, e, o, n) {
    let r;
    const s = {}, a = {}, i = new TextDecoder();
    if (typeof t == "string")
      r = JSON.parse(t);
    else if (t instanceof ArrayBuffer)
      if (i.decode(new Uint8Array(t, 0, 4)) === De) {
        try {
          s[w.KHR_BINARY_GLTF] = new Kt(t);
        } catch (l) {
          n && n(l);
          return;
        }
        r = JSON.parse(s[w.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(i.decode(t));
    else
      r = t;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new nn(r, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let u = 0; u < this.pluginCallbacks.length; u++) {
      const l = this.pluginCallbacks[u](c);
      l.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[l.name] = l, s[l.name] = !0;
    }
    if (r.extensionsUsed)
      for (let u = 0; u < r.extensionsUsed.length; ++u) {
        const l = r.extensionsUsed[u], p = r.extensionsRequired || [];
        switch (l) {
          case w.KHR_MATERIALS_UNLIT:
            s[l] = new Mt();
            break;
          case w.KHR_DRACO_MESH_COMPRESSION:
            s[l] = new Vt(r, this.dracoLoader);
            break;
          case w.KHR_TEXTURE_TRANSFORM:
            s[l] = new Xt();
            break;
          case w.KHR_MESH_QUANTIZATION:
            s[l] = new Wt();
            break;
          default:
            p.indexOf(l) >= 0 && a[l] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + l + '".');
        }
      }
    c.setExtensions(s), c.setPlugins(a), c.parse(o, n);
  }
  parseAsync(t, e) {
    const o = this;
    return new Promise(function(n, r) {
      o.parse(t, e, n, r);
    });
  }
}
function yt() {
  let f = {};
  return {
    get: function(t) {
      return f[t];
    },
    add: function(t, e) {
      f[t] = e;
    },
    remove: function(t) {
      delete f[t];
    },
    removeAll: function() {
      f = {};
    }
  };
}
const w = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Lt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const t = this.parser, e = this.parser.json.nodes || [];
    for (let o = 0, n = e.length; o < n; o++) {
      const r = e[o];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && t._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(t) {
    const e = this.parser, o = "light:" + t;
    let n = e.cache.get(o);
    if (n) return n;
    const r = e.json, i = ((r.extensions && r.extensions[this.name] || {}).lights || [])[t];
    let c;
    const u = new G(16777215);
    i.color !== void 0 && u.setRGB(i.color[0], i.color[1], i.color[2], O);
    const l = i.range !== void 0 ? i.range : 0;
    switch (i.type) {
      case "directional":
        c = new Ke(u), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new je(u), c.distance = l;
        break;
      case "spot":
        c = new Be(u), c.distance = l, i.spot = i.spot || {}, i.spot.innerConeAngle = i.spot.innerConeAngle !== void 0 ? i.spot.innerConeAngle : 0, i.spot.outerConeAngle = i.spot.outerConeAngle !== void 0 ? i.spot.outerConeAngle : Math.PI / 4, c.angle = i.spot.outerConeAngle, c.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + i.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, D(c, i), i.intensity !== void 0 && (c.intensity = i.intensity), c.name = e.createUniqueName(i.name || "light_" + t), n = Promise.resolve(c), e.cache.add(o, n), n;
  }
  getDependency(t, e) {
    if (t === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(t) {
    const e = this, o = this.parser, r = o.json.nodes[t], a = (r.extensions && r.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(i) {
      return o._getNodeRef(e.cache, a, i);
    });
  }
}
class Mt {
  constructor() {
    this.name = w.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return K;
  }
  extendParams(t, e, o) {
    const n = [];
    t.color = new G(1, 1, 1), t.opacity = 1;
    const r = e.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const s = r.baseColorFactor;
        t.color.setRGB(s[0], s[1], s[2], O), t.opacity = s[3];
      }
      r.baseColorTexture !== void 0 && n.push(o.assignTexture(t, "map", r.baseColorTexture, P));
    }
    return Promise.all(n);
  }
}
class bt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(t, e) {
    const n = this.parser.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = n.extensions[this.name].emissiveStrength;
    return r !== void 0 && (e.emissiveIntensity = r), Promise.resolve();
  }
}
class Nt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    if (s.clearcoatFactor !== void 0 && (e.clearcoat = s.clearcoatFactor), s.clearcoatTexture !== void 0 && r.push(o.assignTexture(e, "clearcoatMap", s.clearcoatTexture)), s.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = s.clearcoatRoughnessFactor), s.clearcoatRoughnessTexture !== void 0 && r.push(o.assignTexture(e, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)), s.clearcoatNormalTexture !== void 0 && (r.push(o.assignTexture(e, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== void 0)) {
      const a = s.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new z(a, a);
    }
    return Promise.all(r);
  }
}
class It {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.iridescenceFactor !== void 0 && (e.iridescence = s.iridescenceFactor), s.iridescenceTexture !== void 0 && r.push(o.assignTexture(e, "iridescenceMap", s.iridescenceTexture)), s.iridescenceIor !== void 0 && (e.iridescenceIOR = s.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), s.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = s.iridescenceThicknessMinimum), s.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = s.iridescenceThicknessMaximum), s.iridescenceThicknessTexture !== void 0 && r.push(o.assignTexture(e, "iridescenceThicknessMap", s.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class Ct {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [];
    e.sheenColor = new G(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const s = n.extensions[this.name];
    if (s.sheenColorFactor !== void 0) {
      const a = s.sheenColorFactor;
      e.sheenColor.setRGB(a[0], a[1], a[2], O);
    }
    return s.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = s.sheenRoughnessFactor), s.sheenColorTexture !== void 0 && r.push(o.assignTexture(e, "sheenColorMap", s.sheenColorTexture, P)), s.sheenRoughnessTexture !== void 0 && r.push(o.assignTexture(e, "sheenRoughnessMap", s.sheenRoughnessTexture)), Promise.all(r);
  }
}
class Ot {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.transmissionFactor !== void 0 && (e.transmission = s.transmissionFactor), s.transmissionTexture !== void 0 && r.push(o.assignTexture(e, "transmissionMap", s.transmissionTexture)), Promise.all(r);
  }
}
class Ft {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    e.thickness = s.thicknessFactor !== void 0 ? s.thicknessFactor : 0, s.thicknessTexture !== void 0 && r.push(o.assignTexture(e, "thicknessMap", s.thicknessTexture)), e.attenuationDistance = s.attenuationDistance || 1 / 0;
    const a = s.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new G().setRGB(a[0], a[1], a[2], O), Promise.all(r);
  }
}
class Dt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_IOR;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const n = this.parser.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = n.extensions[this.name];
    return e.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class Pt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    e.specularIntensity = s.specularFactor !== void 0 ? s.specularFactor : 1, s.specularTexture !== void 0 && r.push(o.assignTexture(e, "specularIntensityMap", s.specularTexture));
    const a = s.specularColorFactor || [1, 1, 1];
    return e.specularColor = new G().setRGB(a[0], a[1], a[2], O), s.specularColorTexture !== void 0 && r.push(o.assignTexture(e, "specularColorMap", s.specularColorTexture, P)), Promise.all(r);
  }
}
class kt {
  constructor(t) {
    this.parser = t, this.name = w.EXT_MATERIALS_BUMP;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return e.bumpScale = s.bumpFactor !== void 0 ? s.bumpFactor : 1, s.bumpTexture !== void 0 && r.push(o.assignTexture(e, "bumpMap", s.bumpTexture)), Promise.all(r);
  }
}
class Ht {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(t) {
    const o = this.parser.json.materials[t];
    return !o.extensions || !o.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const o = this.parser, n = o.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.anisotropyStrength !== void 0 && (e.anisotropy = s.anisotropyStrength), s.anisotropyRotation !== void 0 && (e.anisotropyRotation = s.anisotropyRotation), s.anisotropyTexture !== void 0 && r.push(o.assignTexture(e, "anisotropyMap", s.anisotropyTexture)), Promise.all(r);
  }
}
class vt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_TEXTURE_BASISU;
  }
  loadTexture(t) {
    const e = this.parser, o = e.json, n = o.textures[t];
    if (!n.extensions || !n.extensions[this.name])
      return null;
    const r = n.extensions[this.name], s = e.options.ktx2Loader;
    if (!s) {
      if (o.extensionsRequired && o.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return e.loadTextureImage(t, r.source, s);
  }
}
class Gt {
  constructor(t) {
    this.parser = t, this.name = w.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, o = this.parser, n = o.json, r = n.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const s = r.extensions[e], a = n.images[s.source];
    let i = o.textureLoader;
    if (a.uri) {
      const c = o.options.manager.getHandler(a.uri);
      c !== null && (i = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return o.loadTextureImage(t, s.source, i);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return o.loadTexture(t);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(t) {
      const e = new Image();
      e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.onload = e.onerror = function() {
        t(e.height === 1);
      };
    })), this.isSupported;
  }
}
class Ut {
  constructor(t) {
    this.parser = t, this.name = w.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, o = this.parser, n = o.json, r = n.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const s = r.extensions[e], a = n.images[s.source];
    let i = o.textureLoader;
    if (a.uri) {
      const c = o.options.manager.getHandler(a.uri);
      c !== null && (i = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return o.loadTextureImage(t, s.source, i);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return o.loadTexture(t);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(t) {
      const e = new Image();
      e.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", e.onload = e.onerror = function() {
        t(e.height === 1);
      };
    })), this.isSupported;
  }
}
class Bt {
  constructor(t) {
    this.name = w.EXT_MESHOPT_COMPRESSION, this.parser = t;
  }
  loadBufferView(t) {
    const e = this.parser.json, o = e.bufferViews[t];
    if (o.extensions && o.extensions[this.name]) {
      const n = o.extensions[this.name], r = this.parser.getDependency("buffer", n.buffer), s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function(a) {
        const i = n.byteOffset || 0, c = n.byteLength || 0, u = n.count, l = n.byteStride, p = new Uint8Array(a, i, c);
        return s.decodeGltfBufferAsync ? s.decodeGltfBufferAsync(u, l, p, n.mode, n.filter).then(function(A) {
          return A.buffer;
        }) : s.ready.then(function() {
          const A = new ArrayBuffer(u * l);
          return s.decodeGltfBuffer(new Uint8Array(A), u, l, p, n.mode, n.filter), A;
        });
      });
    } else
      return null;
  }
}
class jt {
  constructor(t) {
    this.name = w.EXT_MESH_GPU_INSTANCING, this.parser = t;
  }
  createNodeMesh(t) {
    const e = this.parser.json, o = e.nodes[t];
    if (!o.extensions || !o.extensions[this.name] || o.mesh === void 0)
      return null;
    const n = e.meshes[o.mesh];
    for (const c of n.primitives)
      if (c.mode !== I.TRIANGLES && c.mode !== I.TRIANGLE_STRIP && c.mode !== I.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const s = o.extensions[this.name].attributes, a = [], i = {};
    for (const c in s)
      a.push(this.parser.getDependency("accessor", s[c]).then((u) => (i[c] = u, i[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(t)), Promise.all(a).then((c) => {
      const u = c.pop(), l = u.isGroup ? u.children : [u], p = c[0].count, A = [];
      for (const x of l) {
        const _ = new q(), T = new U(), R = new _e(), y = new U(1, 1, 1), L = new Ve(x.geometry, x.material, p);
        for (let S = 0; S < p; S++)
          i.TRANSLATION && T.fromBufferAttribute(i.TRANSLATION, S), i.ROTATION && R.fromBufferAttribute(i.ROTATION, S), i.SCALE && y.fromBufferAttribute(i.SCALE, S), L.setMatrixAt(S, _.compose(T, R, y));
        for (const S in i)
          if (S === "_COLOR_0") {
            const b = i[S];
            L.instanceColor = new Xe(b.array, b.itemSize, b.normalized);
          } else S !== "TRANSLATION" && S !== "ROTATION" && S !== "SCALE" && x.geometry.setAttribute(S, i[S]);
        oe.prototype.copy.call(L, x), this.parser.assignFinalMaterial(L), A.push(L);
      }
      return u.isGroup ? (u.clear(), u.add(...A), u) : A[0];
    }));
  }
}
const De = "glTF", j = 12, Te = { JSON: 1313821514, BIN: 5130562 };
class Kt {
  constructor(t) {
    this.name = w.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(t, 0, j), o = new TextDecoder();
    if (this.header = {
      magic: o.decode(new Uint8Array(t.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== De)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - j, r = new DataView(t, j);
    let s = 0;
    for (; s < n; ) {
      const a = r.getUint32(s, !0);
      s += 4;
      const i = r.getUint32(s, !0);
      if (s += 4, i === Te.JSON) {
        const c = new Uint8Array(t, j + s, a);
        this.content = o.decode(c);
      } else if (i === Te.BIN) {
        const c = j + s;
        this.body = t.slice(c, c + a);
      }
      s += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Vt {
  constructor(t, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = w.KHR_DRACO_MESH_COMPRESSION, this.json = t, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const o = this.json, n = this.dracoLoader, r = t.extensions[this.name].bufferView, s = t.extensions[this.name].attributes, a = {}, i = {}, c = {};
    for (const u in s) {
      const l = se[u] || u.toLowerCase();
      a[l] = s[u];
    }
    for (const u in t.attributes) {
      const l = se[u] || u.toLowerCase();
      if (s[u] !== void 0) {
        const p = o.accessors[t.attributes[u]], A = B[p.componentType];
        c[l] = A.name, i[l] = p.normalized === !0;
      }
    }
    return e.getDependency("bufferView", r).then(function(u) {
      return new Promise(function(l, p) {
        n.decodeDracoFile(u, function(A) {
          for (const x in A.attributes) {
            const _ = A.attributes[x], T = i[x];
            T !== void 0 && (_.normalized = T);
          }
          l(A);
        }, a, c, O, p);
      });
    });
  }
}
class Xt {
  constructor() {
    this.name = w.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    return (e.texCoord === void 0 || e.texCoord === t.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (t = t.clone(), e.texCoord !== void 0 && (t.channel = e.texCoord), e.offset !== void 0 && t.offset.fromArray(e.offset), e.rotation !== void 0 && (t.rotation = e.rotation), e.scale !== void 0 && t.repeat.fromArray(e.scale), t.needsUpdate = !0), t;
  }
}
class Wt {
  constructor() {
    this.name = w.KHR_MESH_QUANTIZATION;
  }
}
class Pe extends gt {
  constructor(t, e, o, n) {
    super(t, e, o, n);
  }
  copySampleValue_(t) {
    const e = this.resultBuffer, o = this.sampleValues, n = this.valueSize, r = t * n * 3 + n;
    for (let s = 0; s !== n; s++)
      e[s] = o[r + s];
    return e;
  }
  interpolate_(t, e, o, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, i = a * 2, c = a * 3, u = n - e, l = (o - e) / u, p = l * l, A = p * l, x = t * c, _ = x - c, T = -2 * A + 3 * p, R = A - p, y = 1 - T, L = R - p + l;
    for (let S = 0; S !== a; S++) {
      const b = s[_ + S + a], N = s[_ + S + i] * u, M = s[x + S + a], d = s[x + S] * u;
      r[S] = y * b + L * N + T * M + R * d;
    }
    return r;
  }
}
const zt = new _e();
class qt extends Pe {
  interpolate_(t, e, o, n) {
    const r = super.interpolate_(t, e, o, n);
    return zt.fromArray(r).normalize().toArray(r), r;
  }
}
const I = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, B = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, xe = {
  9728: Ze,
  9729: Me,
  9984: Je,
  9985: Qe,
  9986: Ye,
  9987: Le
}, Re = {
  33071: Ne,
  33648: be,
  10497: Y
}, $ = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, se = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, F = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Yt = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Fe,
  STEP: pt
}, ee = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Qt(f) {
  return f.DefaultMaterial === void 0 && (f.DefaultMaterial = new Ie({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: mt
  })), f.DefaultMaterial;
}
function H(f, t, e) {
  for (const o in e.extensions)
    f[o] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[o] = e.extensions[o]);
}
function D(f, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(f.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Jt(f, t, e) {
  let o = !1, n = !1, r = !1;
  for (let c = 0, u = t.length; c < u; c++) {
    const l = t[c];
    if (l.POSITION !== void 0 && (o = !0), l.NORMAL !== void 0 && (n = !0), l.COLOR_0 !== void 0 && (r = !0), o && n && r) break;
  }
  if (!o && !n && !r) return Promise.resolve(f);
  const s = [], a = [], i = [];
  for (let c = 0, u = t.length; c < u; c++) {
    const l = t[c];
    if (o) {
      const p = l.POSITION !== void 0 ? e.getDependency("accessor", l.POSITION) : f.attributes.position;
      s.push(p);
    }
    if (n) {
      const p = l.NORMAL !== void 0 ? e.getDependency("accessor", l.NORMAL) : f.attributes.normal;
      a.push(p);
    }
    if (r) {
      const p = l.COLOR_0 !== void 0 ? e.getDependency("accessor", l.COLOR_0) : f.attributes.color;
      i.push(p);
    }
  }
  return Promise.all([
    Promise.all(s),
    Promise.all(a),
    Promise.all(i)
  ]).then(function(c) {
    const u = c[0], l = c[1], p = c[2];
    return o && (f.morphAttributes.position = u), n && (f.morphAttributes.normal = l), r && (f.morphAttributes.color = p), f.morphTargetsRelative = !0, f;
  });
}
function Zt(f, t) {
  if (f.updateMorphTargets(), t.weights !== void 0)
    for (let e = 0, o = t.weights.length; e < o; e++)
      f.morphTargetInfluences[e] = t.weights[e];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const e = t.extras.targetNames;
    if (f.morphTargetInfluences.length === e.length) {
      f.morphTargetDictionary = {};
      for (let o = 0, n = e.length; o < n; o++)
        f.morphTargetDictionary[e[o]] = o;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function $t(f) {
  let t;
  const e = f.extensions && f.extensions[w.KHR_DRACO_MESH_COMPRESSION];
  if (e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + te(e.attributes) : t = f.indices + ":" + te(f.attributes) + ":" + f.mode, f.targets !== void 0)
    for (let o = 0, n = f.targets.length; o < n; o++)
      t += ":" + te(f.targets[o]);
  return t;
}
function te(f) {
  let t = "";
  const e = Object.keys(f).sort();
  for (let o = 0, n = e.length; o < n; o++)
    t += e[o] + ":" + f[e[o]] + ";";
  return t;
}
function re(f) {
  switch (f) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function en(f) {
  return f.search(/\.jpe?g($|\?)/i) > 0 || f.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : f.search(/\.webp($|\?)/i) > 0 || f.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const tn = new q();
class nn {
  constructor(t = {}, e = {}) {
    this.json = t, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new yt(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let o = !1, n = !1, r = -1;
    typeof navigator < "u" && (o = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, n = navigator.userAgent.indexOf("Firefox") > -1, r = n ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || o || n && r < 98 ? this.textureLoader = new ye(this.options.manager) : this.textureLoader = new We(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new W(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(t) {
    this.extensions = t;
  }
  setPlugins(t) {
    this.plugins = t;
  }
  parse(t, e) {
    const o = this, n = this.json, r = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(s) {
      return s._markDefs && s._markDefs();
    }), Promise.all(this._invokeAll(function(s) {
      return s.beforeRoot && s.beforeRoot();
    })).then(function() {
      return Promise.all([
        o.getDependencies("scene"),
        o.getDependencies("animation"),
        o.getDependencies("camera")
      ]);
    }).then(function(s) {
      const a = {
        scene: s[0][n.scene || 0],
        scenes: s[0],
        animations: s[1],
        cameras: s[2],
        asset: n.asset,
        parser: o,
        userData: {}
      };
      return H(r, a, n), D(a, n), Promise.all(o._invokeAll(function(i) {
        return i.afterRoot && i.afterRoot(a);
      })).then(function() {
        for (const i of a.scenes)
          i.updateMatrixWorld();
        t(a);
      });
    }).catch(e);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const t = this.json.nodes || [], e = this.json.skins || [], o = this.json.meshes || [];
    for (let n = 0, r = e.length; n < r; n++) {
      const s = e[n].joints;
      for (let a = 0, i = s.length; a < i; a++)
        t[s[a]].isBone = !0;
    }
    for (let n = 0, r = t.length; n < r; n++) {
      const s = t[n];
      s.mesh !== void 0 && (this._addNodeRef(this.meshCache, s.mesh), s.skin !== void 0 && (o[s.mesh].isSkinnedMesh = !0)), s.camera !== void 0 && this._addNodeRef(this.cameraCache, s.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(t, e) {
    e !== void 0 && (t.refs[e] === void 0 && (t.refs[e] = t.uses[e] = 0), t.refs[e]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(t, e, o) {
    if (t.refs[e] <= 1) return o;
    const n = o.clone(), r = (s, a) => {
      const i = this.associations.get(s);
      i != null && this.associations.set(a, i);
      for (const [c, u] of s.children.entries())
        r(u, a.children[c]);
    };
    return r(o, n), n.name += "_instance_" + t.uses[e]++, n;
  }
  _invokeOne(t) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let o = 0; o < e.length; o++) {
      const n = t(e[o]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(t) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const o = [];
    for (let n = 0; n < e.length; n++) {
      const r = t(e[n]);
      r && o.push(r);
    }
    return o;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(t, e) {
    const o = t + ":" + e;
    let n = this.cache.get(o);
    if (!n) {
      switch (t) {
        case "scene":
          n = this.loadScene(e);
          break;
        case "node":
          n = this._invokeOne(function(r) {
            return r.loadNode && r.loadNode(e);
          });
          break;
        case "mesh":
          n = this._invokeOne(function(r) {
            return r.loadMesh && r.loadMesh(e);
          });
          break;
        case "accessor":
          n = this.loadAccessor(e);
          break;
        case "bufferView":
          n = this._invokeOne(function(r) {
            return r.loadBufferView && r.loadBufferView(e);
          });
          break;
        case "buffer":
          n = this.loadBuffer(e);
          break;
        case "material":
          n = this._invokeOne(function(r) {
            return r.loadMaterial && r.loadMaterial(e);
          });
          break;
        case "texture":
          n = this._invokeOne(function(r) {
            return r.loadTexture && r.loadTexture(e);
          });
          break;
        case "skin":
          n = this.loadSkin(e);
          break;
        case "animation":
          n = this._invokeOne(function(r) {
            return r.loadAnimation && r.loadAnimation(e);
          });
          break;
        case "camera":
          n = this.loadCamera(e);
          break;
        default:
          if (n = this._invokeOne(function(r) {
            return r != this && r.getDependency && r.getDependency(t, e);
          }), !n)
            throw new Error("Unknown type: " + t);
          break;
      }
      this.cache.add(o, n);
    }
    return n;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(t) {
    let e = this.cache.get(t);
    if (!e) {
      const o = this, n = this.json[t + (t === "mesh" ? "es" : "s")] || [];
      e = Promise.all(n.map(function(r, s) {
        return o.getDependency(t, s);
      })), this.cache.add(t, e);
    }
    return e;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(t) {
    const e = this.json.buffers[t], o = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
    if (e.uri === void 0 && t === 0)
      return Promise.resolve(this.extensions[w.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function(r, s) {
      o.load(V.resolveURL(e.uri, n.path), r, void 0, function() {
        s(new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(t) {
    const e = this.json.bufferViews[t];
    return this.getDependency("buffer", e.buffer).then(function(o) {
      const n = e.byteLength || 0, r = e.byteOffset || 0;
      return o.slice(r, r + n);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(t) {
    const e = this, o = this.json, n = this.json.accessors[t];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      const s = $[n.type], a = B[n.componentType], i = n.normalized === !0, c = new a(n.count * s);
      return Promise.resolve(new v(c, s, i));
    }
    const r = [];
    return n.bufferView !== void 0 ? r.push(this.getDependency("bufferView", n.bufferView)) : r.push(null), n.sparse !== void 0 && (r.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(r).then(function(s) {
      const a = s[0], i = $[n.type], c = B[n.componentType], u = c.BYTES_PER_ELEMENT, l = u * i, p = n.byteOffset || 0, A = n.bufferView !== void 0 ? o.bufferViews[n.bufferView].byteStride : void 0, x = n.normalized === !0;
      let _, T;
      if (A && A !== l) {
        const R = Math.floor(p / A), y = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + R + ":" + n.count;
        let L = e.cache.get(y);
        L || (_ = new c(a, R * A, n.count * A / u), L = new ze(_, A / u), e.cache.add(y, L)), T = new qe(L, i, p % A / u, x);
      } else
        a === null ? _ = new c(n.count * i) : _ = new c(a, p, n.count * i), T = new v(_, i, x);
      if (n.sparse !== void 0) {
        const R = $.SCALAR, y = B[n.sparse.indices.componentType], L = n.sparse.indices.byteOffset || 0, S = n.sparse.values.byteOffset || 0, b = new y(s[1], L, n.sparse.count * R), N = new c(s[2], S, n.sparse.count * i);
        a !== null && (T = new v(T.array.slice(), T.itemSize, T.normalized));
        for (let M = 0, d = b.length; M < d; M++) {
          const h = b[M];
          if (T.setX(h, N[M * i]), i >= 2 && T.setY(h, N[M * i + 1]), i >= 3 && T.setZ(h, N[M * i + 2]), i >= 4 && T.setW(h, N[M * i + 3]), i >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return T;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(t) {
    const e = this.json, o = this.options, r = e.textures[t].source, s = e.images[r];
    let a = this.textureLoader;
    if (s.uri) {
      const i = o.manager.getHandler(s.uri);
      i !== null && (a = i);
    }
    return this.loadTextureImage(t, r, a);
  }
  loadTextureImage(t, e, o) {
    const n = this, r = this.json, s = r.textures[t], a = r.images[e], i = (a.uri || a.bufferView) + ":" + s.sampler;
    if (this.textureCache[i])
      return this.textureCache[i];
    const c = this.loadImageSource(e, o).then(function(u) {
      u.flipY = !1, u.name = s.name || a.name || "", u.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (u.name = a.uri);
      const p = (r.samplers || {})[s.sampler] || {};
      return u.magFilter = xe[p.magFilter] || Me, u.minFilter = xe[p.minFilter] || Le, u.wrapS = Re[p.wrapS] || Y, u.wrapT = Re[p.wrapT] || Y, n.associations.set(u, { textures: t }), u;
    }).catch(function() {
      return null;
    });
    return this.textureCache[i] = c, c;
  }
  loadImageSource(t, e) {
    const o = this, n = this.json, r = this.options;
    if (this.sourceCache[t] !== void 0)
      return this.sourceCache[t].then((l) => l.clone());
    const s = n.images[t], a = self.URL || self.webkitURL;
    let i = s.uri || "", c = !1;
    if (s.bufferView !== void 0)
      i = o.getDependency("bufferView", s.bufferView).then(function(l) {
        c = !0;
        const p = new Blob([l], { type: s.mimeType });
        return i = a.createObjectURL(p), i;
      });
    else if (s.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
    const u = Promise.resolve(i).then(function(l) {
      return new Promise(function(p, A) {
        let x = p;
        e.isImageBitmapLoader === !0 && (x = function(_) {
          const T = new ce(_);
          T.needsUpdate = !0, p(T);
        }), e.load(V.resolveURL(l, r.path), x, void 0, A);
      });
    }).then(function(l) {
      return c === !0 && a.revokeObjectURL(i), l.userData.mimeType = s.mimeType || en(s.uri), l;
    }).catch(function(l) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", i), l;
    });
    return this.sourceCache[t] = u, u;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(t, e, o, n) {
    const r = this;
    return this.getDependency("texture", o.index).then(function(s) {
      if (!s) return null;
      if (o.texCoord !== void 0 && o.texCoord > 0 && (s = s.clone(), s.channel = o.texCoord), r.extensions[w.KHR_TEXTURE_TRANSFORM]) {
        const a = o.extensions !== void 0 ? o.extensions[w.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const i = r.associations.get(s);
          s = r.extensions[w.KHR_TEXTURE_TRANSFORM].extendTexture(s, a), r.associations.set(s, i);
        }
      }
      return n !== void 0 && (s.colorSpace = n), t[e] = s, s;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(t) {
    const e = t.geometry;
    let o = t.material;
    const n = e.attributes.tangent === void 0, r = e.attributes.color !== void 0, s = e.attributes.normal === void 0;
    if (t.isPoints) {
      const a = "PointsMaterial:" + o.uuid;
      let i = this.cache.get(a);
      i || (i = new $e(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, i.sizeAttenuation = !1, this.cache.add(a, i)), o = i;
    } else if (t.isLine) {
      const a = "LineBasicMaterial:" + o.uuid;
      let i = this.cache.get(a);
      i || (i = new et(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, this.cache.add(a, i)), o = i;
    }
    if (n || r || s) {
      let a = "ClonedMaterial:" + o.uuid + ":";
      n && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), s && (a += "flat-shading:");
      let i = this.cache.get(a);
      i || (i = o.clone(), r && (i.vertexColors = !0), s && (i.flatShading = !0), n && (i.normalScale && (i.normalScale.y *= -1), i.clearcoatNormalScale && (i.clearcoatNormalScale.y *= -1)), this.cache.add(a, i), this.associations.set(i, this.associations.get(o))), o = i;
    }
    t.material = o;
  }
  getMaterialType() {
    return Ie;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(t) {
    const e = this, o = this.json, n = this.extensions, r = o.materials[t];
    let s;
    const a = {}, i = r.extensions || {}, c = [];
    if (i[w.KHR_MATERIALS_UNLIT]) {
      const l = n[w.KHR_MATERIALS_UNLIT];
      s = l.getMaterialType(), c.push(l.extendParams(a, r, e));
    } else {
      const l = r.pbrMetallicRoughness || {};
      if (a.color = new G(1, 1, 1), a.opacity = 1, Array.isArray(l.baseColorFactor)) {
        const p = l.baseColorFactor;
        a.color.setRGB(p[0], p[1], p[2], O), a.opacity = p[3];
      }
      l.baseColorTexture !== void 0 && c.push(e.assignTexture(a, "map", l.baseColorTexture, P)), a.metalness = l.metallicFactor !== void 0 ? l.metallicFactor : 1, a.roughness = l.roughnessFactor !== void 0 ? l.roughnessFactor : 1, l.metallicRoughnessTexture !== void 0 && (c.push(e.assignTexture(a, "metalnessMap", l.metallicRoughnessTexture)), c.push(e.assignTexture(a, "roughnessMap", l.metallicRoughnessTexture))), s = this._invokeOne(function(p) {
        return p.getMaterialType && p.getMaterialType(t);
      }), c.push(Promise.all(this._invokeAll(function(p) {
        return p.extendMaterialParams && p.extendMaterialParams(t, a);
      })));
    }
    r.doubleSided === !0 && (a.side = tt);
    const u = r.alphaMode || ee.OPAQUE;
    if (u === ee.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, u === ee.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && s !== K && (c.push(e.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new z(1, 1), r.normalTexture.scale !== void 0)) {
      const l = r.normalTexture.scale;
      a.normalScale.set(l, l);
    }
    if (r.occlusionTexture !== void 0 && s !== K && (c.push(e.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && s !== K) {
      const l = r.emissiveFactor;
      a.emissive = new G().setRGB(l[0], l[1], l[2], O);
    }
    return r.emissiveTexture !== void 0 && s !== K && c.push(e.assignTexture(a, "emissiveMap", r.emissiveTexture, P)), Promise.all(c).then(function() {
      const l = new s(a);
      return r.name && (l.name = r.name), D(l, r), e.associations.set(l, { materials: t }), r.extensions && H(n, l, r), l;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(t) {
    const e = nt.sanitizeNodeName(t || "");
    return e in this.nodeNamesUsed ? e + "_" + ++this.nodeNamesUsed[e] : (this.nodeNamesUsed[e] = 0, e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(t) {
    const e = this, o = this.extensions, n = this.primitiveCache;
    function r(a) {
      return o[w.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, e).then(function(i) {
        return Ee(i, a, e);
      });
    }
    const s = [];
    for (let a = 0, i = t.length; a < i; a++) {
      const c = t[a], u = $t(c), l = n[u];
      if (l)
        s.push(l.promise);
      else {
        let p;
        c.extensions && c.extensions[w.KHR_DRACO_MESH_COMPRESSION] ? p = r(c) : p = Ee(new Ce(), c, e), n[u] = { primitive: c, promise: p }, s.push(p);
      }
    }
    return Promise.all(s);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(t) {
    const e = this, o = this.json, n = this.extensions, r = o.meshes[t], s = r.primitives, a = [];
    for (let i = 0, c = s.length; i < c; i++) {
      const u = s[i].material === void 0 ? Qt(this.cache) : this.getDependency("material", s[i].material);
      a.push(u);
    }
    return a.push(e.loadGeometries(s)), Promise.all(a).then(function(i) {
      const c = i.slice(0, i.length - 1), u = i[i.length - 1], l = [];
      for (let A = 0, x = u.length; A < x; A++) {
        const _ = u[A], T = s[A];
        let R;
        const y = c[A];
        if (T.mode === I.TRIANGLES || T.mode === I.TRIANGLE_STRIP || T.mode === I.TRIANGLE_FAN || T.mode === void 0)
          R = r.isSkinnedMesh === !0 ? new st(_, y) : new Oe(_, y), R.isSkinnedMesh === !0 && R.normalizeSkinWeights(), T.mode === I.TRIANGLE_STRIP ? R.geometry = Ae(R.geometry, Se) : T.mode === I.TRIANGLE_FAN && (R.geometry = Ae(R.geometry, ne));
        else if (T.mode === I.LINES)
          R = new rt(_, y);
        else if (T.mode === I.LINE_STRIP)
          R = new ot(_, y);
        else if (T.mode === I.LINE_LOOP)
          R = new it(_, y);
        else if (T.mode === I.POINTS)
          R = new at(_, y);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + T.mode);
        Object.keys(R.geometry.morphAttributes).length > 0 && Zt(R, r), R.name = e.createUniqueName(r.name || "mesh_" + t), D(R, r), T.extensions && H(n, R, T), e.assignFinalMaterial(R), l.push(R);
      }
      for (let A = 0, x = l.length; A < x; A++)
        e.associations.set(l[A], {
          meshes: t,
          primitives: A
        });
      if (l.length === 1)
        return r.extensions && H(n, l[0], r), l[0];
      const p = new X();
      r.extensions && H(n, p, r), e.associations.set(p, { meshes: t });
      for (let A = 0, x = l.length; A < x; A++)
        p.add(l[A]);
      return p;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(t) {
    let e;
    const o = this.json.cameras[t], n = o[o.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return o.type === "perspective" ? e = new ct(lt.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : o.type === "orthographic" && (e = new ut(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), o.name && (e.name = this.createUniqueName(o.name)), D(e, o), Promise.resolve(e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(t) {
    const e = this.json.skins[t], o = [];
    for (let n = 0, r = e.joints.length; n < r; n++)
      o.push(this._loadNodeShallow(e.joints[n]));
    return e.inverseBindMatrices !== void 0 ? o.push(this.getDependency("accessor", e.inverseBindMatrices)) : o.push(null), Promise.all(o).then(function(n) {
      const r = n.pop(), s = n, a = [], i = [];
      for (let c = 0, u = s.length; c < u; c++) {
        const l = s[c];
        if (l) {
          a.push(l);
          const p = new q();
          r !== null && p.fromArray(r.array, c * 16), i.push(p);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[c]);
      }
      return new ft(a, i);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(t) {
    const e = this.json, o = this, n = e.animations[t], r = n.name ? n.name : "animation_" + t, s = [], a = [], i = [], c = [], u = [];
    for (let l = 0, p = n.channels.length; l < p; l++) {
      const A = n.channels[l], x = n.samplers[A.sampler], _ = A.target, T = _.node, R = n.parameters !== void 0 ? n.parameters[x.input] : x.input, y = n.parameters !== void 0 ? n.parameters[x.output] : x.output;
      _.node !== void 0 && (s.push(this.getDependency("node", T)), a.push(this.getDependency("accessor", R)), i.push(this.getDependency("accessor", y)), c.push(x), u.push(_));
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(a),
      Promise.all(i),
      Promise.all(c),
      Promise.all(u)
    ]).then(function(l) {
      const p = l[0], A = l[1], x = l[2], _ = l[3], T = l[4], R = [];
      for (let y = 0, L = p.length; y < L; y++) {
        const S = p[y], b = A[y], N = x[y], M = _[y], d = T[y];
        if (S === void 0) continue;
        S.updateMatrix && S.updateMatrix();
        const h = o._createAnimationTracks(S, b, N, M, d);
        if (h)
          for (let m = 0; m < h.length; m++)
            R.push(h[m]);
      }
      return new dt(r, void 0, R);
    });
  }
  createNodeMesh(t) {
    const e = this.json, o = this, n = e.nodes[t];
    return n.mesh === void 0 ? null : o.getDependency("mesh", n.mesh).then(function(r) {
      const s = o._getNodeRef(o.meshCache, n.mesh, r);
      return n.weights !== void 0 && s.traverse(function(a) {
        if (a.isMesh)
          for (let i = 0, c = n.weights.length; i < c; i++)
            a.morphTargetInfluences[i] = n.weights[i];
      }), s;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(t) {
    const e = this.json, o = this, n = e.nodes[t], r = o._loadNodeShallow(t), s = [], a = n.children || [];
    for (let c = 0, u = a.length; c < u; c++)
      s.push(o.getDependency("node", a[c]));
    const i = n.skin === void 0 ? Promise.resolve(null) : o.getDependency("skin", n.skin);
    return Promise.all([
      r,
      Promise.all(s),
      i
    ]).then(function(c) {
      const u = c[0], l = c[1], p = c[2];
      p !== null && u.traverse(function(A) {
        A.isSkinnedMesh && A.bind(p, tn);
      });
      for (let A = 0, x = l.length; A < x; A++)
        u.add(l[A]);
      return u;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(t) {
    const e = this.json, o = this.extensions, n = this;
    if (this.nodeCache[t] !== void 0)
      return this.nodeCache[t];
    const r = e.nodes[t], s = r.name ? n.createUniqueName(r.name) : "", a = [], i = n._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(t);
    });
    return i && a.push(i), r.camera !== void 0 && a.push(n.getDependency("camera", r.camera).then(function(c) {
      return n._getNodeRef(n.cameraCache, r.camera, c);
    })), n._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(t);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[t] = Promise.all(a).then(function(c) {
      let u;
      if (r.isBone === !0 ? u = new ht() : c.length > 1 ? u = new X() : c.length === 1 ? u = c[0] : u = new oe(), u !== c[0])
        for (let l = 0, p = c.length; l < p; l++)
          u.add(c[l]);
      if (r.name && (u.userData.name = r.name, u.name = s), D(u, r), r.extensions && H(o, u, r), r.matrix !== void 0) {
        const l = new q();
        l.fromArray(r.matrix), u.applyMatrix4(l);
      } else
        r.translation !== void 0 && u.position.fromArray(r.translation), r.rotation !== void 0 && u.quaternion.fromArray(r.rotation), r.scale !== void 0 && u.scale.fromArray(r.scale);
      return n.associations.has(u) || n.associations.set(u, {}), n.associations.get(u).nodes = t, u;
    }), this.nodeCache[t];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(t) {
    const e = this.extensions, o = this.json.scenes[t], n = this, r = new X();
    o.name && (r.name = n.createUniqueName(o.name)), D(r, o), o.extensions && H(e, r, o);
    const s = o.nodes || [], a = [];
    for (let i = 0, c = s.length; i < c; i++)
      a.push(n.getDependency("node", s[i]));
    return Promise.all(a).then(function(i) {
      for (let u = 0, l = i.length; u < l; u++)
        r.add(i[u]);
      const c = (u) => {
        const l = /* @__PURE__ */ new Map();
        for (const [p, A] of n.associations)
          (p instanceof Z || p instanceof ce) && l.set(p, A);
        return u.traverse((p) => {
          const A = n.associations.get(p);
          A != null && l.set(p, A);
        }), l;
      };
      return n.associations = c(r), r;
    });
  }
  _createAnimationTracks(t, e, o, n, r) {
    const s = [], a = t.name ? t.name : t.uuid, i = [];
    F[r.path] === F.weights ? t.traverse(function(p) {
      p.morphTargetInfluences && i.push(p.name ? p.name : p.uuid);
    }) : i.push(a);
    let c;
    switch (F[r.path]) {
      case F.weights:
        c = ue;
        break;
      case F.rotation:
        c = fe;
        break;
      case F.position:
      case F.scale:
        c = le;
        break;
      default:
        switch (o.itemSize) {
          case 1:
            c = ue;
            break;
          case 2:
          case 3:
          default:
            c = le;
            break;
        }
        break;
    }
    const u = n.interpolation !== void 0 ? Yt[n.interpolation] : Fe, l = this._getArrayFromAccessor(o);
    for (let p = 0, A = i.length; p < A; p++) {
      const x = new c(
        i[p] + "." + F[r.path],
        e.array,
        l,
        u
      );
      n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(x), s.push(x);
    }
    return s;
  }
  _getArrayFromAccessor(t) {
    let e = t.array;
    if (t.normalized) {
      const o = re(e.constructor), n = new Float32Array(e.length);
      for (let r = 0, s = e.length; r < s; r++)
        n[r] = e[r] * o;
      e = n;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(t) {
    t.createInterpolant = function(o) {
      const n = this instanceof fe ? qt : Pe;
      return new n(this.times, this.values, this.getValueSize() / 3, o);
    }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function sn(f, t, e) {
  const o = t.attributes, n = new At();
  if (o.POSITION !== void 0) {
    const a = e.json.accessors[o.POSITION], i = a.min, c = a.max;
    if (i !== void 0 && c !== void 0) {
      if (n.set(
        new U(i[0], i[1], i[2]),
        new U(c[0], c[1], c[2])
      ), a.normalized) {
        const u = re(B[a.componentType]);
        n.min.multiplyScalar(u), n.max.multiplyScalar(u);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = t.targets;
  if (r !== void 0) {
    const a = new U(), i = new U();
    for (let c = 0, u = r.length; c < u; c++) {
      const l = r[c];
      if (l.POSITION !== void 0) {
        const p = e.json.accessors[l.POSITION], A = p.min, x = p.max;
        if (A !== void 0 && x !== void 0) {
          if (i.setX(Math.max(Math.abs(A[0]), Math.abs(x[0]))), i.setY(Math.max(Math.abs(A[1]), Math.abs(x[1]))), i.setZ(Math.max(Math.abs(A[2]), Math.abs(x[2]))), p.normalized) {
            const _ = re(B[p.componentType]);
            i.multiplyScalar(_);
          }
          a.max(i);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(a);
  }
  f.boundingBox = n;
  const s = new Tt();
  n.getCenter(s.center), s.radius = n.min.distanceTo(n.max) / 2, f.boundingSphere = s;
}
function Ee(f, t, e) {
  const o = t.attributes, n = [];
  function r(s, a) {
    return e.getDependency("accessor", s).then(function(i) {
      f.setAttribute(a, i);
    });
  }
  for (const s in o) {
    const a = se[s] || s.toLowerCase();
    a in f.attributes || n.push(r(o[s], a));
  }
  if (t.indices !== void 0 && !f.index) {
    const s = e.getDependency("accessor", t.indices).then(function(a) {
      f.setIndex(a);
    });
    n.push(s);
  }
  return de.workingColorSpace !== O && "COLOR_0" in o && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${de.workingColorSpace}" not supported.`), D(f, t), sn(f, t, e), Promise.all(n).then(function() {
    return t.targets !== void 0 ? Jt(f, t.targets, e) : f;
  });
}
class rn {
  parse(t) {
    const e = {}, o = t.split(`
`);
    let n = null, r = e;
    const s = [e];
    for (const a of o)
      if (a.includes("=")) {
        const i = a.split("="), c = i[0].trim(), u = i[1].trim();
        if (u.endsWith("{")) {
          const l = {};
          s.push(l), r[c] = l, r = l;
        } else
          r[c] = u;
      } else if (a.endsWith("{")) {
        const i = r[n] || {};
        s.push(i), r[n] = i, r = i;
      } else if (a.endsWith("}")) {
        if (s.pop(), s.length === 0) continue;
        r = s[s.length - 1];
      } else if (a.endsWith("(")) {
        const i = {};
        s.push(i), n = a.split("(")[0].trim() || n, r[n] = i, r = i;
      } else a.endsWith(")") ? (s.pop(), r = s[s.length - 1]) : n = a.trim();
    return e;
  }
}
class on extends we {
  constructor(t) {
    super(t);
  }
  load(t, e, o, n) {
    const r = this, s = new W(r.manager);
    s.setPath(r.path), s.setResponseType("arraybuffer"), s.setRequestHeader(r.requestHeader), s.setWithCredentials(r.withCredentials), s.load(t, function(a) {
      try {
        e(r.parse(a));
      } catch (i) {
        n ? n(i) : console.error(i), r.manager.itemError(t);
      }
    }, o, n);
  }
  parse(t) {
    const e = new rn();
    function o(d) {
      const h = {};
      new W().setResponseType("arraybuffer");
      for (const g in d) {
        if (g.endsWith("png")) {
          const E = new Blob([d[g]], { type: { type: "image/png" } });
          h[g] = URL.createObjectURL(E);
        }
        if (g.endsWith("usd") || g.endsWith("usda")) {
          if (n(d[g])) {
            console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
            continue;
          }
          const E = he(d[g]);
          h[g] = e.parse(E);
        }
      }
      return h;
    }
    function n(d) {
      const h = d.slice(0, 7), m = new Uint8Array([80, 88, 82, 45, 85, 83, 68, 67]);
      return h.every((g, E) => g === m[E]);
    }
    function r(d) {
      if (d.length < 1) return;
      const h = Object.keys(d)[0];
      let m = !1;
      if (h.endsWith("usda")) return d[h];
      if (h.endsWith("usdc"))
        m = !0;
      else if (h.endsWith("usd"))
        if (n(d[h]))
          m = !0;
        else
          return d[h];
      m && console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
    }
    const s = xt(new Uint8Array(t)), a = o(s), i = r(s);
    if (i === void 0)
      return console.warn("THREE.USDZLoader: No usda file found."), new X();
    const c = he(i), u = e.parse(c);
    function l(d) {
      if (d) {
        if ("prepend references" in d) {
          const m = d["prepend references"].split("@"), g = m[1].replace(/^.\//, ""), E = m[2].replace(/^<\//, "").replace(/>$/, "");
          return p(a[g], E);
        }
        return p(d);
      }
    }
    function p(d, h) {
      if (d) {
        if (h !== void 0) {
          const m = `def Mesh "${h}"`;
          if (m in d)
            return d[m];
        }
        for (const m in d) {
          const g = d[m];
          if (m.startsWith("def Mesh"))
            return "point3f[] points" in d && (g["point3f[] points"] = d["point3f[] points"]), "texCoord2f[] primvars:st" in d && (g["texCoord2f[] primvars:st"] = d["texCoord2f[] primvars:st"]), "int[] primvars:st:indices" in d && (g["int[] primvars:st:indices"] = d["int[] primvars:st:indices"]), g;
          if (typeof g == "object") {
            const E = p(g);
            if (E) return E;
          }
        }
      }
    }
    function A(d) {
      if (!d) return;
      let h = new Ce();
      if ("int[] faceVertexIndices" in d) {
        const m = JSON.parse(d["int[] faceVertexIndices"]);
        h.setIndex(m);
      }
      if ("point3f[] points" in d) {
        const m = JSON.parse(d["point3f[] points"].replace(/[()]*/g, "")), g = new v(new Float32Array(m), 3);
        h.setAttribute("position", g);
      }
      if ("normal3f[] normals" in d) {
        const m = JSON.parse(d["normal3f[] normals"].replace(/[()]*/g, "")), g = new v(new Float32Array(m), 3);
        h.setAttribute("normal", g);
      } else
        h.computeVertexNormals();
      if ("float2[] primvars:st" in d && (d["texCoord2f[] primvars:st"] = d["float2[] primvars:st"]), "texCoord2f[] primvars:st" in d) {
        const m = JSON.parse(d["texCoord2f[] primvars:st"].replace(/[()]*/g, "")), g = new v(new Float32Array(m), 2);
        if ("int[] primvars:st:indices" in d) {
          h = h.toNonIndexed();
          const E = JSON.parse(d["int[] primvars:st:indices"]);
          h.setAttribute("uv", x(g, E));
        } else
          h.setAttribute("uv", g);
      }
      return h;
    }
    function x(d, h) {
      const m = d.array, g = d.itemSize, E = new m.constructor(h.length * g);
      let ie = 0, ke = 0;
      for (let Q = 0, He = h.length; Q < He; Q++) {
        ie = h[Q] * g;
        for (let ae = 0; ae < g; ae++)
          E[ke++] = m[ie++];
      }
      return new v(E, g);
    }
    function _(d) {
      if (d) {
        if ("rel material:binding" in d) {
          const g = d["rel material:binding"].replace(/^<\//, "").replace(/>$/, "").split("/");
          return T(u, ` "${g[1]}"`);
        }
        return T(d);
      }
    }
    function T(d, h = "") {
      for (const m in d) {
        const g = d[m];
        if (m.startsWith("def Material" + h))
          return g;
        if (typeof g == "object") {
          const E = T(g, h);
          if (E) return E;
        }
      }
    }
    function R(d, h) {
      h["float inputs:rotation"] && (d.rotation = parseFloat(h["float inputs:rotation"])), h["float2 inputs:scale"] && (d.repeat = new z().fromArray(JSON.parse("[" + h["float2 inputs:scale"].replace(/[()]*/g, "") + "]"))), h["float2 inputs:translation"] && (d.offset = new z().fromArray(JSON.parse("[" + h["float2 inputs:translation"].replace(/[()]*/g, "") + "]")));
    }
    function y(d) {
      const h = new C();
      if (d !== void 0) {
        if ('def Shader "PreviewSurface"' in d) {
          const m = d['def Shader "PreviewSurface"'];
          if ("color3f inputs:diffuseColor.connect" in m) {
            const g = m["color3f inputs:diffuseColor.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.map = S(E), h.map.colorSpace = P, 'def Shader "Transform2d_diffuse"' in d && R(h.map, d['def Shader "Transform2d_diffuse"']);
          } else if ("color3f inputs:diffuseColor" in m) {
            const g = m["color3f inputs:diffuseColor"].replace(/[()]*/g, "");
            h.color.fromArray(JSON.parse("[" + g + "]"));
          }
          if ("color3f inputs:emissiveColor.connect" in m) {
            const g = m["color3f inputs:emissiveColor.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.emissiveMap = S(E), h.emissiveMap.colorSpace = P, h.emissive.set(16777215), 'def Shader "Transform2d_emissive"' in d && R(h.emissiveMap, d['def Shader "Transform2d_emissive"']);
          } else if ("color3f inputs:emissiveColor" in m) {
            const g = m["color3f inputs:emissiveColor"].replace(/[()]*/g, "");
            h.emissive.fromArray(JSON.parse("[" + g + "]"));
          }
          if ("normal3f inputs:normal.connect" in m) {
            const g = m["normal3f inputs:normal.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.normalMap = S(E), h.normalMap.colorSpace = k, 'def Shader "Transform2d_normal"' in d && R(h.normalMap, d['def Shader "Transform2d_normal"']);
          }
          if ("float inputs:roughness.connect" in m) {
            const g = m["float inputs:roughness.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.roughness = 1, h.roughnessMap = S(E), h.roughnessMap.colorSpace = k, 'def Shader "Transform2d_roughness"' in d && R(h.roughnessMap, d['def Shader "Transform2d_roughness"']);
          } else "float inputs:roughness" in m && (h.roughness = parseFloat(m["float inputs:roughness"]));
          if ("float inputs:metallic.connect" in m) {
            const g = m["float inputs:metallic.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.metalness = 1, h.metalnessMap = S(E), h.metalnessMap.colorSpace = k, 'def Shader "Transform2d_metallic"' in d && R(h.metalnessMap, d['def Shader "Transform2d_metallic"']);
          } else "float inputs:metallic" in m && (h.metalness = parseFloat(m["float inputs:metallic"]));
          if ("float inputs:clearcoat.connect" in m) {
            const g = m["float inputs:clearcoat.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.clearcoat = 1, h.clearcoatMap = S(E), h.clearcoatMap.colorSpace = k, 'def Shader "Transform2d_clearcoat"' in d && R(h.clearcoatMap, d['def Shader "Transform2d_clearcoat"']);
          } else "float inputs:clearcoat" in m && (h.clearcoat = parseFloat(m["float inputs:clearcoat"]));
          if ("float inputs:clearcoatRoughness.connect" in m) {
            const g = m["float inputs:clearcoatRoughness.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.clearcoatRoughness = 1, h.clearcoatRoughnessMap = S(E), h.clearcoatRoughnessMap.colorSpace = k, 'def Shader "Transform2d_clearcoatRoughness"' in d && R(h.clearcoatRoughnessMap, d['def Shader "Transform2d_clearcoatRoughness"']);
          } else "float inputs:clearcoatRoughness" in m && (h.clearcoatRoughness = parseFloat(m["float inputs:clearcoatRoughness"]));
          if ("float inputs:ior" in m && (h.ior = parseFloat(m["float inputs:ior"])), "float inputs:occlusion.connect" in m) {
            const g = m["float inputs:occlusion.connect"], E = L(u, /(\w+).output/.exec(g)[1]);
            h.aoMap = S(E), h.aoMap.colorSpace = k, 'def Shader "Transform2d_occlusion"' in d && R(h.aoMap, d['def Shader "Transform2d_occlusion"']);
          }
        }
        if ('def Shader "diffuseColor_texture"' in d) {
          const m = d['def Shader "diffuseColor_texture"'];
          h.map = S(m), h.map.colorSpace = P;
        }
        if ('def Shader "normal_texture"' in d) {
          const m = d['def Shader "normal_texture"'];
          h.normalMap = S(m), h.normalMap.colorSpace = k;
        }
      }
      return h;
    }
    function L(d, h) {
      for (const m in d) {
        const g = d[m];
        if (m.startsWith(`def Shader "${h}"`))
          return g;
        if (typeof g == "object") {
          const E = L(g, h);
          if (E) return E;
        }
      }
    }
    function S(d) {
      if ("asset inputs:file" in d) {
        const h = d["asset inputs:file"].replace(/@*/g, ""), g = new ye().load(a[h]), E = {
          '"clamp"': Ne,
          '"mirror"': be,
          '"repeat"': Y
        };
        return "token inputs:wrapS" in d && (g.wrapS = E[d["token inputs:wrapS"]]), "token inputs:wrapT" in d && (g.wrapT = E[d["token inputs:wrapT"]]), g;
      }
      return null;
    }
    function b(d) {
      const h = A(l(d)), m = y(_(d)), g = h ? new Oe(h, m) : new oe();
      if ("matrix4d xformOp:transform" in d) {
        const E = JSON.parse("[" + d["matrix4d xformOp:transform"].replace(/[()]*/g, "") + "]");
        g.matrix.fromArray(E), g.matrix.decompose(g.position, g.quaternion, g.scale);
      }
      return g;
    }
    function N(d, h) {
      for (const m in d)
        if (m.startsWith("def Scope"))
          N(d[m], h);
        else if (m.startsWith("def Xform")) {
          const g = b(d[m]);
          /def Xform "(\w+)"/.test(m) && (g.name = /def Xform "(\w+)"/.exec(m)[1]), h.add(g), N(d[m], g);
        }
    }
    const M = new X();
    return N(u, M), M;
  }
}
class un {
  constructor() {
    J(this, "_gltfLoader");
    J(this, "_usdzLoader");
    this._gltfLoader = new _t(), this._usdzLoader = new on();
  }
  async _loadFile(t) {
    const e = await fetch(t);
    if (!e.ok)
      throw new ge(t, `Failed to fetch file from ${t}`);
    try {
      return await e.arrayBuffer();
    } catch {
      throw new ge(t, `Failed to fetch file from ${t}`);
    }
  }
  async load(t) {
    const e = Rt(t);
    if (e.length === 0)
      throw new pe("No file extension found in URI", "");
    if (!Et(e))
      throw new pe(
        `Unsupported file type: ${e}. Supported types: ${wt.join(", ")}`,
        e
      );
    const o = await this._loadFile(t);
    try {
      switch (e) {
        case "glb":
        case "gltf":
          return (await this._gltfLoader.parseAsync(
            o,
            ""
          )).scene;
        case "usdz":
          return await this._usdzLoader.parse(o);
      }
    } catch (n) {
      throw n instanceof Error ? new me(
        `Failed to parse ${e} file: ${n.message}`,
        n
      ) : new me(`Failed to parse ${e} file`);
    }
  }
}
export {
  un as A,
  St as F,
  ge as N,
  wt as S,
  Rt as g,
  Et as i
};
