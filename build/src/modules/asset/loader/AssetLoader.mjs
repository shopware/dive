var ve = Object.defineProperty;
var Ge = (d, t, e) => t in d ? ve(d, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : d[t] = e;
var J = (d, t, e) => Ge(d, typeof t != "symbol" ? t + "" : t, e);
import { TrianglesDrawMode as Be, TriangleFanDrawMode as ne, TriangleStripDrawMode as Se, Loader as we, LoaderUtils as V, FileLoader as W, MeshPhysicalMaterial as C, Vector2 as z, Color as G, LinearSRGBColorSpace as O, SRGBColorSpace as P, SpotLight as Ue, PointLight as je, DirectionalLight as Ke, Matrix4 as q, Vector3 as B, Quaternion as _e, InstancedMesh as Ve, InstancedBufferAttribute as Xe, Object3D as ie, TextureLoader as ye, ImageBitmapLoader as We, BufferAttribute as v, InterleavedBuffer as ze, InterleavedBufferAttribute as qe, LinearMipmapLinearFilter as Le, NearestMipmapLinearFilter as Ye, LinearMipmapNearestFilter as Qe, NearestMipmapNearestFilter as Je, LinearFilter as Me, NearestFilter as Ze, RepeatWrapping as Y, MirroredRepeatWrapping as be, ClampToEdgeWrapping as Ne, PointsMaterial as $e, Material as Z, LineBasicMaterial as et, MeshStandardMaterial as Ie, DoubleSide as tt, MeshBasicMaterial as K, PropertyBinding as nt, BufferGeometry as Ce, SkinnedMesh as st, Mesh as Oe, LineSegments as rt, Line as it, LineLoop as ot, Points as at, Group as X, PerspectiveCamera as ct, MathUtils as ut, OrthographicCamera as lt, Skeleton as ft, AnimationClip as dt, Bone as ht, InterpolateDiscrete as pt, InterpolateLinear as Fe, Texture as ce, VectorKeyframeTrack as ue, NumberKeyframeTrack as le, QuaternionKeyframeTrack as fe, ColorManagement as de, FrontSide as mt, Interpolant as gt, Box3 as At, Sphere as Tt, NoColorSpace as k } from "three";
import { u as xt, s as he } from "../../../../chunks/fflate.module-DkZg07PZ.mjs";
import { N as pe, S as Rt } from "../../../../chunks/network-error-DgecatEk.mjs";
import { F as me, P as ge } from "../../../../chunks/file-type-error-D6aWGgyc.mjs";
function Ae(d, t) {
  if (t === Be)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), d;
  if (t === ne || t === Se) {
    let e = d.getIndex();
    if (e === null) {
      const s = [], a = d.getAttribute("position");
      if (a !== void 0) {
        for (let o = 0; o < a.count; o++)
          s.push(o);
        d.setIndex(s), e = d.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), d;
    }
    const i = e.count - 2, n = [];
    if (t === ne)
      for (let s = 1; s <= i; s++)
        n.push(e.getX(0)), n.push(e.getX(s)), n.push(e.getX(s + 1));
    else
      for (let s = 0; s < i; s++)
        s % 2 === 0 ? (n.push(e.getX(s)), n.push(e.getX(s + 1)), n.push(e.getX(s + 2))) : (n.push(e.getX(s + 2)), n.push(e.getX(s + 1)), n.push(e.getX(s)));
    n.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = d.clone();
    return r.setIndex(n), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), d;
}
class Et extends we {
  constructor(t) {
    super(t), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new Lt(e);
    }), this.register(function(e) {
      return new Pt(e);
    }), this.register(function(e) {
      return new kt(e);
    }), this.register(function(e) {
      return new Ht(e);
    }), this.register(function(e) {
      return new bt(e);
    }), this.register(function(e) {
      return new Nt(e);
    }), this.register(function(e) {
      return new It(e);
    }), this.register(function(e) {
      return new Ct(e);
    }), this.register(function(e) {
      return new yt(e);
    }), this.register(function(e) {
      return new Ot(e);
    }), this.register(function(e) {
      return new Mt(e);
    }), this.register(function(e) {
      return new Dt(e);
    }), this.register(function(e) {
      return new Ft(e);
    }), this.register(function(e) {
      return new wt(e);
    }), this.register(function(e) {
      return new vt(e);
    }), this.register(function(e) {
      return new Gt(e);
    });
  }
  load(t, e, i, n) {
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
    }, o = new W(this.manager);
    o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(t, function(c) {
      try {
        r.parse(c, s, function(l) {
          e(l), r.manager.itemEnd(t);
        }, a);
      } catch (l) {
        a(l);
      }
    }, i, a);
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
  parse(t, e, i, n) {
    let r;
    const s = {}, a = {}, o = new TextDecoder();
    if (typeof t == "string")
      r = JSON.parse(t);
    else if (t instanceof ArrayBuffer)
      if (o.decode(new Uint8Array(t, 0, 4)) === De) {
        try {
          s[w.KHR_BINARY_GLTF] = new Bt(t);
        } catch (u) {
          n && n(u);
          return;
        }
        r = JSON.parse(s[w.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(o.decode(t));
    else
      r = t;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new $t(r, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let l = 0; l < this.pluginCallbacks.length; l++) {
      const u = this.pluginCallbacks[l](c);
      u.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[u.name] = u, s[u.name] = !0;
    }
    if (r.extensionsUsed)
      for (let l = 0; l < r.extensionsUsed.length; ++l) {
        const u = r.extensionsUsed[l], p = r.extensionsRequired || [];
        switch (u) {
          case w.KHR_MATERIALS_UNLIT:
            s[u] = new _t();
            break;
          case w.KHR_DRACO_MESH_COMPRESSION:
            s[u] = new Ut(r, this.dracoLoader);
            break;
          case w.KHR_TEXTURE_TRANSFORM:
            s[u] = new jt();
            break;
          case w.KHR_MESH_QUANTIZATION:
            s[u] = new Kt();
            break;
          default:
            p.indexOf(u) >= 0 && a[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    c.setExtensions(s), c.setPlugins(a), c.parse(i, n);
  }
  parseAsync(t, e) {
    const i = this;
    return new Promise(function(n, r) {
      i.parse(t, e, n, r);
    });
  }
}
function St() {
  let d = {};
  return {
    get: function(t) {
      return d[t];
    },
    add: function(t, e) {
      d[t] = e;
    },
    remove: function(t) {
      delete d[t];
    },
    removeAll: function() {
      d = {};
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
class wt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const t = this.parser, e = this.parser.json.nodes || [];
    for (let i = 0, n = e.length; i < n; i++) {
      const r = e[i];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && t._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(t) {
    const e = this.parser, i = "light:" + t;
    let n = e.cache.get(i);
    if (n) return n;
    const r = e.json, o = ((r.extensions && r.extensions[this.name] || {}).lights || [])[t];
    let c;
    const l = new G(16777215);
    o.color !== void 0 && l.setRGB(o.color[0], o.color[1], o.color[2], O);
    const u = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        c = new Ke(l), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new je(l), c.distance = u;
        break;
      case "spot":
        c = new Ue(l), c.distance = u, o.spot = o.spot || {}, o.spot.innerConeAngle = o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0, o.spot.outerConeAngle = o.spot.outerConeAngle !== void 0 ? o.spot.outerConeAngle : Math.PI / 4, c.angle = o.spot.outerConeAngle, c.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, D(c, o), o.intensity !== void 0 && (c.intensity = o.intensity), c.name = e.createUniqueName(o.name || "light_" + t), n = Promise.resolve(c), e.cache.add(i, n), n;
  }
  getDependency(t, e) {
    if (t === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(t) {
    const e = this, i = this.parser, r = i.json.nodes[t], a = (r.extensions && r.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(o) {
      return i._getNodeRef(e.cache, a, o);
    });
  }
}
class _t {
  constructor() {
    this.name = w.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return K;
  }
  extendParams(t, e, i) {
    const n = [];
    t.color = new G(1, 1, 1), t.opacity = 1;
    const r = e.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const s = r.baseColorFactor;
        t.color.setRGB(s[0], s[1], s[2], O), t.opacity = s[3];
      }
      r.baseColorTexture !== void 0 && n.push(i.assignTexture(t, "map", r.baseColorTexture, P));
    }
    return Promise.all(n);
  }
}
class yt {
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
class Lt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    if (s.clearcoatFactor !== void 0 && (e.clearcoat = s.clearcoatFactor), s.clearcoatTexture !== void 0 && r.push(i.assignTexture(e, "clearcoatMap", s.clearcoatTexture)), s.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = s.clearcoatRoughnessFactor), s.clearcoatRoughnessTexture !== void 0 && r.push(i.assignTexture(e, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)), s.clearcoatNormalTexture !== void 0 && (r.push(i.assignTexture(e, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== void 0)) {
      const a = s.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new z(a, a);
    }
    return Promise.all(r);
  }
}
class Mt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.iridescenceFactor !== void 0 && (e.iridescence = s.iridescenceFactor), s.iridescenceTexture !== void 0 && r.push(i.assignTexture(e, "iridescenceMap", s.iridescenceTexture)), s.iridescenceIor !== void 0 && (e.iridescenceIOR = s.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), s.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = s.iridescenceThicknessMinimum), s.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = s.iridescenceThicknessMaximum), s.iridescenceThicknessTexture !== void 0 && r.push(i.assignTexture(e, "iridescenceThicknessMap", s.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class bt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [];
    e.sheenColor = new G(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const s = n.extensions[this.name];
    if (s.sheenColorFactor !== void 0) {
      const a = s.sheenColorFactor;
      e.sheenColor.setRGB(a[0], a[1], a[2], O);
    }
    return s.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = s.sheenRoughnessFactor), s.sheenColorTexture !== void 0 && r.push(i.assignTexture(e, "sheenColorMap", s.sheenColorTexture, P)), s.sheenRoughnessTexture !== void 0 && r.push(i.assignTexture(e, "sheenRoughnessMap", s.sheenRoughnessTexture)), Promise.all(r);
  }
}
class Nt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.transmissionFactor !== void 0 && (e.transmission = s.transmissionFactor), s.transmissionTexture !== void 0 && r.push(i.assignTexture(e, "transmissionMap", s.transmissionTexture)), Promise.all(r);
  }
}
class It {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    e.thickness = s.thicknessFactor !== void 0 ? s.thicknessFactor : 0, s.thicknessTexture !== void 0 && r.push(i.assignTexture(e, "thicknessMap", s.thicknessTexture)), e.attenuationDistance = s.attenuationDistance || 1 / 0;
    const a = s.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new G().setRGB(a[0], a[1], a[2], O), Promise.all(r);
  }
}
class Ct {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_IOR;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const n = this.parser.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = n.extensions[this.name];
    return e.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class Ot {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    e.specularIntensity = s.specularFactor !== void 0 ? s.specularFactor : 1, s.specularTexture !== void 0 && r.push(i.assignTexture(e, "specularIntensityMap", s.specularTexture));
    const a = s.specularColorFactor || [1, 1, 1];
    return e.specularColor = new G().setRGB(a[0], a[1], a[2], O), s.specularColorTexture !== void 0 && r.push(i.assignTexture(e, "specularColorMap", s.specularColorTexture, P)), Promise.all(r);
  }
}
class Ft {
  constructor(t) {
    this.parser = t, this.name = w.EXT_MATERIALS_BUMP;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return e.bumpScale = s.bumpFactor !== void 0 ? s.bumpFactor : 1, s.bumpTexture !== void 0 && r.push(i.assignTexture(e, "bumpMap", s.bumpTexture)), Promise.all(r);
  }
}
class Dt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(t) {
    const i = this.parser.json.materials[t];
    return !i.extensions || !i.extensions[this.name] ? null : C;
  }
  extendMaterialParams(t, e) {
    const i = this.parser, n = i.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.anisotropyStrength !== void 0 && (e.anisotropy = s.anisotropyStrength), s.anisotropyRotation !== void 0 && (e.anisotropyRotation = s.anisotropyRotation), s.anisotropyTexture !== void 0 && r.push(i.assignTexture(e, "anisotropyMap", s.anisotropyTexture)), Promise.all(r);
  }
}
class Pt {
  constructor(t) {
    this.parser = t, this.name = w.KHR_TEXTURE_BASISU;
  }
  loadTexture(t) {
    const e = this.parser, i = e.json, n = i.textures[t];
    if (!n.extensions || !n.extensions[this.name])
      return null;
    const r = n.extensions[this.name], s = e.options.ktx2Loader;
    if (!s) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return e.loadTextureImage(t, r.source, s);
  }
}
class kt {
  constructor(t) {
    this.parser = t, this.name = w.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, i = this.parser, n = i.json, r = n.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const s = r.extensions[e], a = n.images[s.source];
    let o = i.textureLoader;
    if (a.uri) {
      const c = i.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return i.loadTextureImage(t, s.source, o);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return i.loadTexture(t);
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
class Ht {
  constructor(t) {
    this.parser = t, this.name = w.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, i = this.parser, n = i.json, r = n.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const s = r.extensions[e], a = n.images[s.source];
    let o = i.textureLoader;
    if (a.uri) {
      const c = i.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return i.loadTextureImage(t, s.source, o);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return i.loadTexture(t);
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
class vt {
  constructor(t) {
    this.name = w.EXT_MESHOPT_COMPRESSION, this.parser = t;
  }
  loadBufferView(t) {
    const e = this.parser.json, i = e.bufferViews[t];
    if (i.extensions && i.extensions[this.name]) {
      const n = i.extensions[this.name], r = this.parser.getDependency("buffer", n.buffer), s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function(a) {
        const o = n.byteOffset || 0, c = n.byteLength || 0, l = n.count, u = n.byteStride, p = new Uint8Array(a, o, c);
        return s.decodeGltfBufferAsync ? s.decodeGltfBufferAsync(l, u, p, n.mode, n.filter).then(function(A) {
          return A.buffer;
        }) : s.ready.then(function() {
          const A = new ArrayBuffer(l * u);
          return s.decodeGltfBuffer(new Uint8Array(A), l, u, p, n.mode, n.filter), A;
        });
      });
    } else
      return null;
  }
}
class Gt {
  constructor(t) {
    this.name = w.EXT_MESH_GPU_INSTANCING, this.parser = t;
  }
  createNodeMesh(t) {
    const e = this.parser.json, i = e.nodes[t];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const n = e.meshes[i.mesh];
    for (const c of n.primitives)
      if (c.mode !== I.TRIANGLES && c.mode !== I.TRIANGLE_STRIP && c.mode !== I.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const s = i.extensions[this.name].attributes, a = [], o = {};
    for (const c in s)
      a.push(this.parser.getDependency("accessor", s[c]).then((l) => (o[c] = l, o[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(t)), Promise.all(a).then((c) => {
      const l = c.pop(), u = l.isGroup ? l.children : [l], p = c[0].count, A = [];
      for (const x of u) {
        const _ = new q(), T = new B(), R = new _e(), y = new B(1, 1, 1), L = new Ve(x.geometry, x.material, p);
        for (let S = 0; S < p; S++)
          o.TRANSLATION && T.fromBufferAttribute(o.TRANSLATION, S), o.ROTATION && R.fromBufferAttribute(o.ROTATION, S), o.SCALE && y.fromBufferAttribute(o.SCALE, S), L.setMatrixAt(S, _.compose(T, R, y));
        for (const S in o)
          if (S === "_COLOR_0") {
            const b = o[S];
            L.instanceColor = new Xe(b.array, b.itemSize, b.normalized);
          } else S !== "TRANSLATION" && S !== "ROTATION" && S !== "SCALE" && x.geometry.setAttribute(S, o[S]);
        ie.prototype.copy.call(L, x), this.parser.assignFinalMaterial(L), A.push(L);
      }
      return l.isGroup ? (l.clear(), l.add(...A), l) : A[0];
    }));
  }
}
const De = "glTF", j = 12, Te = { JSON: 1313821514, BIN: 5130562 };
class Bt {
  constructor(t) {
    this.name = w.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(t, 0, j), i = new TextDecoder();
    if (this.header = {
      magic: i.decode(new Uint8Array(t.slice(0, 4))),
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
      const o = r.getUint32(s, !0);
      if (s += 4, o === Te.JSON) {
        const c = new Uint8Array(t, j + s, a);
        this.content = i.decode(c);
      } else if (o === Te.BIN) {
        const c = j + s;
        this.body = t.slice(c, c + a);
      }
      s += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Ut {
  constructor(t, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = w.KHR_DRACO_MESH_COMPRESSION, this.json = t, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const i = this.json, n = this.dracoLoader, r = t.extensions[this.name].bufferView, s = t.extensions[this.name].attributes, a = {}, o = {}, c = {};
    for (const l in s) {
      const u = se[l] || l.toLowerCase();
      a[u] = s[l];
    }
    for (const l in t.attributes) {
      const u = se[l] || l.toLowerCase();
      if (s[l] !== void 0) {
        const p = i.accessors[t.attributes[l]], A = U[p.componentType];
        c[u] = A.name, o[u] = p.normalized === !0;
      }
    }
    return e.getDependency("bufferView", r).then(function(l) {
      return new Promise(function(u, p) {
        n.decodeDracoFile(l, function(A) {
          for (const x in A.attributes) {
            const _ = A.attributes[x], T = o[x];
            T !== void 0 && (_.normalized = T);
          }
          u(A);
        }, a, c, O, p);
      });
    });
  }
}
class jt {
  constructor() {
    this.name = w.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    return (e.texCoord === void 0 || e.texCoord === t.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (t = t.clone(), e.texCoord !== void 0 && (t.channel = e.texCoord), e.offset !== void 0 && t.offset.fromArray(e.offset), e.rotation !== void 0 && (t.rotation = e.rotation), e.scale !== void 0 && t.repeat.fromArray(e.scale), t.needsUpdate = !0), t;
  }
}
class Kt {
  constructor() {
    this.name = w.KHR_MESH_QUANTIZATION;
  }
}
class Pe extends gt {
  constructor(t, e, i, n) {
    super(t, e, i, n);
  }
  copySampleValue_(t) {
    const e = this.resultBuffer, i = this.sampleValues, n = this.valueSize, r = t * n * 3 + n;
    for (let s = 0; s !== n; s++)
      e[s] = i[r + s];
    return e;
  }
  interpolate_(t, e, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = a * 2, c = a * 3, l = n - e, u = (i - e) / l, p = u * u, A = p * u, x = t * c, _ = x - c, T = -2 * A + 3 * p, R = A - p, y = 1 - T, L = R - p + u;
    for (let S = 0; S !== a; S++) {
      const b = s[_ + S + a], N = s[_ + S + o] * l, M = s[x + S + a], f = s[x + S] * l;
      r[S] = y * b + L * N + T * M + R * f;
    }
    return r;
  }
}
const Vt = new _e();
class Xt extends Pe {
  interpolate_(t, e, i, n) {
    const r = super.interpolate_(t, e, i, n);
    return Vt.fromArray(r).normalize().toArray(r), r;
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
}, U = {
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
}, Wt = {
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
function zt(d) {
  return d.DefaultMaterial === void 0 && (d.DefaultMaterial = new Ie({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: mt
  })), d.DefaultMaterial;
}
function H(d, t, e) {
  for (const i in e.extensions)
    d[i] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[i] = e.extensions[i]);
}
function D(d, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(d.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function qt(d, t, e) {
  let i = !1, n = !1, r = !1;
  for (let c = 0, l = t.length; c < l; c++) {
    const u = t[c];
    if (u.POSITION !== void 0 && (i = !0), u.NORMAL !== void 0 && (n = !0), u.COLOR_0 !== void 0 && (r = !0), i && n && r) break;
  }
  if (!i && !n && !r) return Promise.resolve(d);
  const s = [], a = [], o = [];
  for (let c = 0, l = t.length; c < l; c++) {
    const u = t[c];
    if (i) {
      const p = u.POSITION !== void 0 ? e.getDependency("accessor", u.POSITION) : d.attributes.position;
      s.push(p);
    }
    if (n) {
      const p = u.NORMAL !== void 0 ? e.getDependency("accessor", u.NORMAL) : d.attributes.normal;
      a.push(p);
    }
    if (r) {
      const p = u.COLOR_0 !== void 0 ? e.getDependency("accessor", u.COLOR_0) : d.attributes.color;
      o.push(p);
    }
  }
  return Promise.all([
    Promise.all(s),
    Promise.all(a),
    Promise.all(o)
  ]).then(function(c) {
    const l = c[0], u = c[1], p = c[2];
    return i && (d.morphAttributes.position = l), n && (d.morphAttributes.normal = u), r && (d.morphAttributes.color = p), d.morphTargetsRelative = !0, d;
  });
}
function Yt(d, t) {
  if (d.updateMorphTargets(), t.weights !== void 0)
    for (let e = 0, i = t.weights.length; e < i; e++)
      d.morphTargetInfluences[e] = t.weights[e];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const e = t.extras.targetNames;
    if (d.morphTargetInfluences.length === e.length) {
      d.morphTargetDictionary = {};
      for (let i = 0, n = e.length; i < n; i++)
        d.morphTargetDictionary[e[i]] = i;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Qt(d) {
  let t;
  const e = d.extensions && d.extensions[w.KHR_DRACO_MESH_COMPRESSION];
  if (e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + te(e.attributes) : t = d.indices + ":" + te(d.attributes) + ":" + d.mode, d.targets !== void 0)
    for (let i = 0, n = d.targets.length; i < n; i++)
      t += ":" + te(d.targets[i]);
  return t;
}
function te(d) {
  let t = "";
  const e = Object.keys(d).sort();
  for (let i = 0, n = e.length; i < n; i++)
    t += e[i] + ":" + d[e[i]] + ";";
  return t;
}
function re(d) {
  switch (d) {
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
function Jt(d) {
  return d.search(/\.jpe?g($|\?)/i) > 0 || d.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : d.search(/\.webp($|\?)/i) > 0 || d.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Zt = new q();
class $t {
  constructor(t = {}, e = {}) {
    this.json = t, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new St(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, n = !1, r = -1;
    typeof navigator < "u" && (i = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, n = navigator.userAgent.indexOf("Firefox") > -1, r = n ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || i || n && r < 98 ? this.textureLoader = new ye(this.options.manager) : this.textureLoader = new We(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new W(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(t) {
    this.extensions = t;
  }
  setPlugins(t) {
    this.plugins = t;
  }
  parse(t, e) {
    const i = this, n = this.json, r = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(s) {
      return s._markDefs && s._markDefs();
    }), Promise.all(this._invokeAll(function(s) {
      return s.beforeRoot && s.beforeRoot();
    })).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(s) {
      const a = {
        scene: s[0][n.scene || 0],
        scenes: s[0],
        animations: s[1],
        cameras: s[2],
        asset: n.asset,
        parser: i,
        userData: {}
      };
      return H(r, a, n), D(a, n), Promise.all(i._invokeAll(function(o) {
        return o.afterRoot && o.afterRoot(a);
      })).then(function() {
        for (const o of a.scenes)
          o.updateMatrixWorld();
        t(a);
      });
    }).catch(e);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const t = this.json.nodes || [], e = this.json.skins || [], i = this.json.meshes || [];
    for (let n = 0, r = e.length; n < r; n++) {
      const s = e[n].joints;
      for (let a = 0, o = s.length; a < o; a++)
        t[s[a]].isBone = !0;
    }
    for (let n = 0, r = t.length; n < r; n++) {
      const s = t[n];
      s.mesh !== void 0 && (this._addNodeRef(this.meshCache, s.mesh), s.skin !== void 0 && (i[s.mesh].isSkinnedMesh = !0)), s.camera !== void 0 && this._addNodeRef(this.cameraCache, s.camera);
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
  _getNodeRef(t, e, i) {
    if (t.refs[e] <= 1) return i;
    const n = i.clone(), r = (s, a) => {
      const o = this.associations.get(s);
      o != null && this.associations.set(a, o);
      for (const [c, l] of s.children.entries())
        r(l, a.children[c]);
    };
    return r(i, n), n.name += "_instance_" + t.uses[e]++, n;
  }
  _invokeOne(t) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let i = 0; i < e.length; i++) {
      const n = t(e[i]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(t) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const i = [];
    for (let n = 0; n < e.length; n++) {
      const r = t(e[n]);
      r && i.push(r);
    }
    return i;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(t, e) {
    const i = t + ":" + e;
    let n = this.cache.get(i);
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
      this.cache.add(i, n);
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
      const i = this, n = this.json[t + (t === "mesh" ? "es" : "s")] || [];
      e = Promise.all(n.map(function(r, s) {
        return i.getDependency(t, s);
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
    const e = this.json.buffers[t], i = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
    if (e.uri === void 0 && t === 0)
      return Promise.resolve(this.extensions[w.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function(r, s) {
      i.load(V.resolveURL(e.uri, n.path), r, void 0, function() {
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
    return this.getDependency("buffer", e.buffer).then(function(i) {
      const n = e.byteLength || 0, r = e.byteOffset || 0;
      return i.slice(r, r + n);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(t) {
    const e = this, i = this.json, n = this.json.accessors[t];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      const s = $[n.type], a = U[n.componentType], o = n.normalized === !0, c = new a(n.count * s);
      return Promise.resolve(new v(c, s, o));
    }
    const r = [];
    return n.bufferView !== void 0 ? r.push(this.getDependency("bufferView", n.bufferView)) : r.push(null), n.sparse !== void 0 && (r.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(r).then(function(s) {
      const a = s[0], o = $[n.type], c = U[n.componentType], l = c.BYTES_PER_ELEMENT, u = l * o, p = n.byteOffset || 0, A = n.bufferView !== void 0 ? i.bufferViews[n.bufferView].byteStride : void 0, x = n.normalized === !0;
      let _, T;
      if (A && A !== u) {
        const R = Math.floor(p / A), y = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + R + ":" + n.count;
        let L = e.cache.get(y);
        L || (_ = new c(a, R * A, n.count * A / l), L = new ze(_, A / l), e.cache.add(y, L)), T = new qe(L, o, p % A / l, x);
      } else
        a === null ? _ = new c(n.count * o) : _ = new c(a, p, n.count * o), T = new v(_, o, x);
      if (n.sparse !== void 0) {
        const R = $.SCALAR, y = U[n.sparse.indices.componentType], L = n.sparse.indices.byteOffset || 0, S = n.sparse.values.byteOffset || 0, b = new y(s[1], L, n.sparse.count * R), N = new c(s[2], S, n.sparse.count * o);
        a !== null && (T = new v(T.array.slice(), T.itemSize, T.normalized));
        for (let M = 0, f = b.length; M < f; M++) {
          const h = b[M];
          if (T.setX(h, N[M * o]), o >= 2 && T.setY(h, N[M * o + 1]), o >= 3 && T.setZ(h, N[M * o + 2]), o >= 4 && T.setW(h, N[M * o + 3]), o >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
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
    const e = this.json, i = this.options, r = e.textures[t].source, s = e.images[r];
    let a = this.textureLoader;
    if (s.uri) {
      const o = i.manager.getHandler(s.uri);
      o !== null && (a = o);
    }
    return this.loadTextureImage(t, r, a);
  }
  loadTextureImage(t, e, i) {
    const n = this, r = this.json, s = r.textures[t], a = r.images[e], o = (a.uri || a.bufferView) + ":" + s.sampler;
    if (this.textureCache[o])
      return this.textureCache[o];
    const c = this.loadImageSource(e, i).then(function(l) {
      l.flipY = !1, l.name = s.name || a.name || "", l.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (l.name = a.uri);
      const p = (r.samplers || {})[s.sampler] || {};
      return l.magFilter = xe[p.magFilter] || Me, l.minFilter = xe[p.minFilter] || Le, l.wrapS = Re[p.wrapS] || Y, l.wrapT = Re[p.wrapT] || Y, n.associations.set(l, { textures: t }), l;
    }).catch(function() {
      return null;
    });
    return this.textureCache[o] = c, c;
  }
  loadImageSource(t, e) {
    const i = this, n = this.json, r = this.options;
    if (this.sourceCache[t] !== void 0)
      return this.sourceCache[t].then((u) => u.clone());
    const s = n.images[t], a = self.URL || self.webkitURL;
    let o = s.uri || "", c = !1;
    if (s.bufferView !== void 0)
      o = i.getDependency("bufferView", s.bufferView).then(function(u) {
        c = !0;
        const p = new Blob([u], { type: s.mimeType });
        return o = a.createObjectURL(p), o;
      });
    else if (s.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
    const l = Promise.resolve(o).then(function(u) {
      return new Promise(function(p, A) {
        let x = p;
        e.isImageBitmapLoader === !0 && (x = function(_) {
          const T = new ce(_);
          T.needsUpdate = !0, p(T);
        }), e.load(V.resolveURL(u, r.path), x, void 0, A);
      });
    }).then(function(u) {
      return c === !0 && a.revokeObjectURL(o), u.userData.mimeType = s.mimeType || Jt(s.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", o), u;
    });
    return this.sourceCache[t] = l, l;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(t, e, i, n) {
    const r = this;
    return this.getDependency("texture", i.index).then(function(s) {
      if (!s) return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (s = s.clone(), s.channel = i.texCoord), r.extensions[w.KHR_TEXTURE_TRANSFORM]) {
        const a = i.extensions !== void 0 ? i.extensions[w.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const o = r.associations.get(s);
          s = r.extensions[w.KHR_TEXTURE_TRANSFORM].extendTexture(s, a), r.associations.set(s, o);
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
    let i = t.material;
    const n = e.attributes.tangent === void 0, r = e.attributes.color !== void 0, s = e.attributes.normal === void 0;
    if (t.isPoints) {
      const a = "PointsMaterial:" + i.uuid;
      let o = this.cache.get(a);
      o || (o = new $e(), Z.prototype.copy.call(o, i), o.color.copy(i.color), o.map = i.map, o.sizeAttenuation = !1, this.cache.add(a, o)), i = o;
    } else if (t.isLine) {
      const a = "LineBasicMaterial:" + i.uuid;
      let o = this.cache.get(a);
      o || (o = new et(), Z.prototype.copy.call(o, i), o.color.copy(i.color), o.map = i.map, this.cache.add(a, o)), i = o;
    }
    if (n || r || s) {
      let a = "ClonedMaterial:" + i.uuid + ":";
      n && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), s && (a += "flat-shading:");
      let o = this.cache.get(a);
      o || (o = i.clone(), r && (o.vertexColors = !0), s && (o.flatShading = !0), n && (o.normalScale && (o.normalScale.y *= -1), o.clearcoatNormalScale && (o.clearcoatNormalScale.y *= -1)), this.cache.add(a, o), this.associations.set(o, this.associations.get(i))), i = o;
    }
    t.material = i;
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
    const e = this, i = this.json, n = this.extensions, r = i.materials[t];
    let s;
    const a = {}, o = r.extensions || {}, c = [];
    if (o[w.KHR_MATERIALS_UNLIT]) {
      const u = n[w.KHR_MATERIALS_UNLIT];
      s = u.getMaterialType(), c.push(u.extendParams(a, r, e));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (a.color = new G(1, 1, 1), a.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const p = u.baseColorFactor;
        a.color.setRGB(p[0], p[1], p[2], O), a.opacity = p[3];
      }
      u.baseColorTexture !== void 0 && c.push(e.assignTexture(a, "map", u.baseColorTexture, P)), a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (c.push(e.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)), c.push(e.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))), s = this._invokeOne(function(p) {
        return p.getMaterialType && p.getMaterialType(t);
      }), c.push(Promise.all(this._invokeAll(function(p) {
        return p.extendMaterialParams && p.extendMaterialParams(t, a);
      })));
    }
    r.doubleSided === !0 && (a.side = tt);
    const l = r.alphaMode || ee.OPAQUE;
    if (l === ee.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, l === ee.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && s !== K && (c.push(e.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new z(1, 1), r.normalTexture.scale !== void 0)) {
      const u = r.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (r.occlusionTexture !== void 0 && s !== K && (c.push(e.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && s !== K) {
      const u = r.emissiveFactor;
      a.emissive = new G().setRGB(u[0], u[1], u[2], O);
    }
    return r.emissiveTexture !== void 0 && s !== K && c.push(e.assignTexture(a, "emissiveMap", r.emissiveTexture, P)), Promise.all(c).then(function() {
      const u = new s(a);
      return r.name && (u.name = r.name), D(u, r), e.associations.set(u, { materials: t }), r.extensions && H(n, u, r), u;
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
    const e = this, i = this.extensions, n = this.primitiveCache;
    function r(a) {
      return i[w.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, e).then(function(o) {
        return Ee(o, a, e);
      });
    }
    const s = [];
    for (let a = 0, o = t.length; a < o; a++) {
      const c = t[a], l = Qt(c), u = n[l];
      if (u)
        s.push(u.promise);
      else {
        let p;
        c.extensions && c.extensions[w.KHR_DRACO_MESH_COMPRESSION] ? p = r(c) : p = Ee(new Ce(), c, e), n[l] = { primitive: c, promise: p }, s.push(p);
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
    const e = this, i = this.json, n = this.extensions, r = i.meshes[t], s = r.primitives, a = [];
    for (let o = 0, c = s.length; o < c; o++) {
      const l = s[o].material === void 0 ? zt(this.cache) : this.getDependency("material", s[o].material);
      a.push(l);
    }
    return a.push(e.loadGeometries(s)), Promise.all(a).then(function(o) {
      const c = o.slice(0, o.length - 1), l = o[o.length - 1], u = [];
      for (let A = 0, x = l.length; A < x; A++) {
        const _ = l[A], T = s[A];
        let R;
        const y = c[A];
        if (T.mode === I.TRIANGLES || T.mode === I.TRIANGLE_STRIP || T.mode === I.TRIANGLE_FAN || T.mode === void 0)
          R = r.isSkinnedMesh === !0 ? new st(_, y) : new Oe(_, y), R.isSkinnedMesh === !0 && R.normalizeSkinWeights(), T.mode === I.TRIANGLE_STRIP ? R.geometry = Ae(R.geometry, Se) : T.mode === I.TRIANGLE_FAN && (R.geometry = Ae(R.geometry, ne));
        else if (T.mode === I.LINES)
          R = new rt(_, y);
        else if (T.mode === I.LINE_STRIP)
          R = new it(_, y);
        else if (T.mode === I.LINE_LOOP)
          R = new ot(_, y);
        else if (T.mode === I.POINTS)
          R = new at(_, y);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + T.mode);
        Object.keys(R.geometry.morphAttributes).length > 0 && Yt(R, r), R.name = e.createUniqueName(r.name || "mesh_" + t), D(R, r), T.extensions && H(n, R, T), e.assignFinalMaterial(R), u.push(R);
      }
      for (let A = 0, x = u.length; A < x; A++)
        e.associations.set(u[A], {
          meshes: t,
          primitives: A
        });
      if (u.length === 1)
        return r.extensions && H(n, u[0], r), u[0];
      const p = new X();
      r.extensions && H(n, p, r), e.associations.set(p, { meshes: t });
      for (let A = 0, x = u.length; A < x; A++)
        p.add(u[A]);
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
    const i = this.json.cameras[t], n = i[i.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? e = new ct(ut.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : i.type === "orthographic" && (e = new lt(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), i.name && (e.name = this.createUniqueName(i.name)), D(e, i), Promise.resolve(e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(t) {
    const e = this.json.skins[t], i = [];
    for (let n = 0, r = e.joints.length; n < r; n++)
      i.push(this._loadNodeShallow(e.joints[n]));
    return e.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", e.inverseBindMatrices)) : i.push(null), Promise.all(i).then(function(n) {
      const r = n.pop(), s = n, a = [], o = [];
      for (let c = 0, l = s.length; c < l; c++) {
        const u = s[c];
        if (u) {
          a.push(u);
          const p = new q();
          r !== null && p.fromArray(r.array, c * 16), o.push(p);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[c]);
      }
      return new ft(a, o);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(t) {
    const e = this.json, i = this, n = e.animations[t], r = n.name ? n.name : "animation_" + t, s = [], a = [], o = [], c = [], l = [];
    for (let u = 0, p = n.channels.length; u < p; u++) {
      const A = n.channels[u], x = n.samplers[A.sampler], _ = A.target, T = _.node, R = n.parameters !== void 0 ? n.parameters[x.input] : x.input, y = n.parameters !== void 0 ? n.parameters[x.output] : x.output;
      _.node !== void 0 && (s.push(this.getDependency("node", T)), a.push(this.getDependency("accessor", R)), o.push(this.getDependency("accessor", y)), c.push(x), l.push(_));
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(a),
      Promise.all(o),
      Promise.all(c),
      Promise.all(l)
    ]).then(function(u) {
      const p = u[0], A = u[1], x = u[2], _ = u[3], T = u[4], R = [];
      for (let y = 0, L = p.length; y < L; y++) {
        const S = p[y], b = A[y], N = x[y], M = _[y], f = T[y];
        if (S === void 0) continue;
        S.updateMatrix && S.updateMatrix();
        const h = i._createAnimationTracks(S, b, N, M, f);
        if (h)
          for (let m = 0; m < h.length; m++)
            R.push(h[m]);
      }
      return new dt(r, void 0, R);
    });
  }
  createNodeMesh(t) {
    const e = this.json, i = this, n = e.nodes[t];
    return n.mesh === void 0 ? null : i.getDependency("mesh", n.mesh).then(function(r) {
      const s = i._getNodeRef(i.meshCache, n.mesh, r);
      return n.weights !== void 0 && s.traverse(function(a) {
        if (a.isMesh)
          for (let o = 0, c = n.weights.length; o < c; o++)
            a.morphTargetInfluences[o] = n.weights[o];
      }), s;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(t) {
    const e = this.json, i = this, n = e.nodes[t], r = i._loadNodeShallow(t), s = [], a = n.children || [];
    for (let c = 0, l = a.length; c < l; c++)
      s.push(i.getDependency("node", a[c]));
    const o = n.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", n.skin);
    return Promise.all([
      r,
      Promise.all(s),
      o
    ]).then(function(c) {
      const l = c[0], u = c[1], p = c[2];
      p !== null && l.traverse(function(A) {
        A.isSkinnedMesh && A.bind(p, Zt);
      });
      for (let A = 0, x = u.length; A < x; A++)
        l.add(u[A]);
      return l;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(t) {
    const e = this.json, i = this.extensions, n = this;
    if (this.nodeCache[t] !== void 0)
      return this.nodeCache[t];
    const r = e.nodes[t], s = r.name ? n.createUniqueName(r.name) : "", a = [], o = n._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(t);
    });
    return o && a.push(o), r.camera !== void 0 && a.push(n.getDependency("camera", r.camera).then(function(c) {
      return n._getNodeRef(n.cameraCache, r.camera, c);
    })), n._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(t);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[t] = Promise.all(a).then(function(c) {
      let l;
      if (r.isBone === !0 ? l = new ht() : c.length > 1 ? l = new X() : c.length === 1 ? l = c[0] : l = new ie(), l !== c[0])
        for (let u = 0, p = c.length; u < p; u++)
          l.add(c[u]);
      if (r.name && (l.userData.name = r.name, l.name = s), D(l, r), r.extensions && H(i, l, r), r.matrix !== void 0) {
        const u = new q();
        u.fromArray(r.matrix), l.applyMatrix4(u);
      } else
        r.translation !== void 0 && l.position.fromArray(r.translation), r.rotation !== void 0 && l.quaternion.fromArray(r.rotation), r.scale !== void 0 && l.scale.fromArray(r.scale);
      return n.associations.has(l) || n.associations.set(l, {}), n.associations.get(l).nodes = t, l;
    }), this.nodeCache[t];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(t) {
    const e = this.extensions, i = this.json.scenes[t], n = this, r = new X();
    i.name && (r.name = n.createUniqueName(i.name)), D(r, i), i.extensions && H(e, r, i);
    const s = i.nodes || [], a = [];
    for (let o = 0, c = s.length; o < c; o++)
      a.push(n.getDependency("node", s[o]));
    return Promise.all(a).then(function(o) {
      for (let l = 0, u = o.length; l < u; l++)
        r.add(o[l]);
      const c = (l) => {
        const u = /* @__PURE__ */ new Map();
        for (const [p, A] of n.associations)
          (p instanceof Z || p instanceof ce) && u.set(p, A);
        return l.traverse((p) => {
          const A = n.associations.get(p);
          A != null && u.set(p, A);
        }), u;
      };
      return n.associations = c(r), r;
    });
  }
  _createAnimationTracks(t, e, i, n, r) {
    const s = [], a = t.name ? t.name : t.uuid, o = [];
    F[r.path] === F.weights ? t.traverse(function(p) {
      p.morphTargetInfluences && o.push(p.name ? p.name : p.uuid);
    }) : o.push(a);
    let c;
    switch (F[r.path]) {
      case F.weights:
        c = le;
        break;
      case F.rotation:
        c = fe;
        break;
      case F.position:
      case F.scale:
        c = ue;
        break;
      default:
        switch (i.itemSize) {
          case 1:
            c = le;
            break;
          case 2:
          case 3:
          default:
            c = ue;
            break;
        }
        break;
    }
    const l = n.interpolation !== void 0 ? Wt[n.interpolation] : Fe, u = this._getArrayFromAccessor(i);
    for (let p = 0, A = o.length; p < A; p++) {
      const x = new c(
        o[p] + "." + F[r.path],
        e.array,
        u,
        l
      );
      n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(x), s.push(x);
    }
    return s;
  }
  _getArrayFromAccessor(t) {
    let e = t.array;
    if (t.normalized) {
      const i = re(e.constructor), n = new Float32Array(e.length);
      for (let r = 0, s = e.length; r < s; r++)
        n[r] = e[r] * i;
      e = n;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(t) {
    t.createInterpolant = function(i) {
      const n = this instanceof fe ? Xt : Pe;
      return new n(this.times, this.values, this.getValueSize() / 3, i);
    }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function en(d, t, e) {
  const i = t.attributes, n = new At();
  if (i.POSITION !== void 0) {
    const a = e.json.accessors[i.POSITION], o = a.min, c = a.max;
    if (o !== void 0 && c !== void 0) {
      if (n.set(
        new B(o[0], o[1], o[2]),
        new B(c[0], c[1], c[2])
      ), a.normalized) {
        const l = re(U[a.componentType]);
        n.min.multiplyScalar(l), n.max.multiplyScalar(l);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = t.targets;
  if (r !== void 0) {
    const a = new B(), o = new B();
    for (let c = 0, l = r.length; c < l; c++) {
      const u = r[c];
      if (u.POSITION !== void 0) {
        const p = e.json.accessors[u.POSITION], A = p.min, x = p.max;
        if (A !== void 0 && x !== void 0) {
          if (o.setX(Math.max(Math.abs(A[0]), Math.abs(x[0]))), o.setY(Math.max(Math.abs(A[1]), Math.abs(x[1]))), o.setZ(Math.max(Math.abs(A[2]), Math.abs(x[2]))), p.normalized) {
            const _ = re(U[p.componentType]);
            o.multiplyScalar(_);
          }
          a.max(o);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(a);
  }
  d.boundingBox = n;
  const s = new Tt();
  n.getCenter(s.center), s.radius = n.min.distanceTo(n.max) / 2, d.boundingSphere = s;
}
function Ee(d, t, e) {
  const i = t.attributes, n = [];
  function r(s, a) {
    return e.getDependency("accessor", s).then(function(o) {
      d.setAttribute(a, o);
    });
  }
  for (const s in i) {
    const a = se[s] || s.toLowerCase();
    a in d.attributes || n.push(r(i[s], a));
  }
  if (t.indices !== void 0 && !d.index) {
    const s = e.getDependency("accessor", t.indices).then(function(a) {
      d.setIndex(a);
    });
    n.push(s);
  }
  return de.workingColorSpace !== O && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${de.workingColorSpace}" not supported.`), D(d, t), en(d, t, e), Promise.all(n).then(function() {
    return t.targets !== void 0 ? qt(d, t.targets, e) : d;
  });
}
class tn {
  parse(t) {
    const e = {}, i = t.split(`
`);
    let n = null, r = e;
    const s = [e];
    for (const a of i)
      if (a.includes("=")) {
        const o = a.split("="), c = o[0].trim(), l = o[1].trim();
        if (l.endsWith("{")) {
          const u = {};
          s.push(u), r[c] = u, r = u;
        } else
          r[c] = l;
      } else if (a.endsWith("{")) {
        const o = r[n] || {};
        s.push(o), r[n] = o, r = o;
      } else if (a.endsWith("}")) {
        if (s.pop(), s.length === 0) continue;
        r = s[s.length - 1];
      } else if (a.endsWith("(")) {
        const o = {};
        s.push(o), n = a.split("(")[0].trim() || n, r[n] = o, r = o;
      } else a.endsWith(")") ? (s.pop(), r = s[s.length - 1]) : n = a.trim();
    return e;
  }
}
class nn extends we {
  constructor(t) {
    super(t);
  }
  load(t, e, i, n) {
    const r = this, s = new W(r.manager);
    s.setPath(r.path), s.setResponseType("arraybuffer"), s.setRequestHeader(r.requestHeader), s.setWithCredentials(r.withCredentials), s.load(t, function(a) {
      try {
        e(r.parse(a));
      } catch (o) {
        n ? n(o) : console.error(o), r.manager.itemError(t);
      }
    }, i, n);
  }
  parse(t) {
    const e = new tn();
    function i(f) {
      const h = {};
      new W().setResponseType("arraybuffer");
      for (const g in f) {
        if (g.endsWith("png")) {
          const E = new Blob([f[g]], { type: { type: "image/png" } });
          h[g] = URL.createObjectURL(E);
        }
        if (g.endsWith("usd") || g.endsWith("usda")) {
          if (n(f[g])) {
            console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
            continue;
          }
          const E = he(f[g]);
          h[g] = e.parse(E);
        }
      }
      return h;
    }
    function n(f) {
      const h = f.slice(0, 7), m = new Uint8Array([80, 88, 82, 45, 85, 83, 68, 67]);
      return h.every((g, E) => g === m[E]);
    }
    function r(f) {
      if (f.length < 1) return;
      const h = Object.keys(f)[0];
      let m = !1;
      if (h.endsWith("usda")) return f[h];
      if (h.endsWith("usdc"))
        m = !0;
      else if (h.endsWith("usd"))
        if (n(f[h]))
          m = !0;
        else
          return f[h];
      m && console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
    }
    const s = xt(new Uint8Array(t)), a = i(s), o = r(s);
    if (o === void 0)
      return console.warn("THREE.USDZLoader: No usda file found."), new X();
    const c = he(o), l = e.parse(c);
    function u(f) {
      if (f) {
        if ("prepend references" in f) {
          const m = f["prepend references"].split("@"), g = m[1].replace(/^.\//, ""), E = m[2].replace(/^<\//, "").replace(/>$/, "");
          return p(a[g], E);
        }
        return p(f);
      }
    }
    function p(f, h) {
      if (f) {
        if (h !== void 0) {
          const m = `def Mesh "${h}"`;
          if (m in f)
            return f[m];
        }
        for (const m in f) {
          const g = f[m];
          if (m.startsWith("def Mesh"))
            return "point3f[] points" in f && (g["point3f[] points"] = f["point3f[] points"]), "texCoord2f[] primvars:st" in f && (g["texCoord2f[] primvars:st"] = f["texCoord2f[] primvars:st"]), "int[] primvars:st:indices" in f && (g["int[] primvars:st:indices"] = f["int[] primvars:st:indices"]), g;
          if (typeof g == "object") {
            const E = p(g);
            if (E) return E;
          }
        }
      }
    }
    function A(f) {
      if (!f) return;
      let h = new Ce();
      if ("int[] faceVertexIndices" in f) {
        const m = JSON.parse(f["int[] faceVertexIndices"]);
        h.setIndex(m);
      }
      if ("point3f[] points" in f) {
        const m = JSON.parse(f["point3f[] points"].replace(/[()]*/g, "")), g = new v(new Float32Array(m), 3);
        h.setAttribute("position", g);
      }
      if ("normal3f[] normals" in f) {
        const m = JSON.parse(f["normal3f[] normals"].replace(/[()]*/g, "")), g = new v(new Float32Array(m), 3);
        h.setAttribute("normal", g);
      } else
        h.computeVertexNormals();
      if ("float2[] primvars:st" in f && (f["texCoord2f[] primvars:st"] = f["float2[] primvars:st"]), "texCoord2f[] primvars:st" in f) {
        const m = JSON.parse(f["texCoord2f[] primvars:st"].replace(/[()]*/g, "")), g = new v(new Float32Array(m), 2);
        if ("int[] primvars:st:indices" in f) {
          h = h.toNonIndexed();
          const E = JSON.parse(f["int[] primvars:st:indices"]);
          h.setAttribute("uv", x(g, E));
        } else
          h.setAttribute("uv", g);
      }
      return h;
    }
    function x(f, h) {
      const m = f.array, g = f.itemSize, E = new m.constructor(h.length * g);
      let oe = 0, ke = 0;
      for (let Q = 0, He = h.length; Q < He; Q++) {
        oe = h[Q] * g;
        for (let ae = 0; ae < g; ae++)
          E[ke++] = m[oe++];
      }
      return new v(E, g);
    }
    function _(f) {
      if (f) {
        if ("rel material:binding" in f) {
          const g = f["rel material:binding"].replace(/^<\//, "").replace(/>$/, "").split("/");
          return T(l, ` "${g[1]}"`);
        }
        return T(f);
      }
    }
    function T(f, h = "") {
      for (const m in f) {
        const g = f[m];
        if (m.startsWith("def Material" + h))
          return g;
        if (typeof g == "object") {
          const E = T(g, h);
          if (E) return E;
        }
      }
    }
    function R(f, h) {
      h["float inputs:rotation"] && (f.rotation = parseFloat(h["float inputs:rotation"])), h["float2 inputs:scale"] && (f.repeat = new z().fromArray(JSON.parse("[" + h["float2 inputs:scale"].replace(/[()]*/g, "") + "]"))), h["float2 inputs:translation"] && (f.offset = new z().fromArray(JSON.parse("[" + h["float2 inputs:translation"].replace(/[()]*/g, "") + "]")));
    }
    function y(f) {
      const h = new C();
      if (f !== void 0) {
        if ('def Shader "PreviewSurface"' in f) {
          const m = f['def Shader "PreviewSurface"'];
          if ("color3f inputs:diffuseColor.connect" in m) {
            const g = m["color3f inputs:diffuseColor.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.map = S(E), h.map.colorSpace = P, 'def Shader "Transform2d_diffuse"' in f && R(h.map, f['def Shader "Transform2d_diffuse"']);
          } else if ("color3f inputs:diffuseColor" in m) {
            const g = m["color3f inputs:diffuseColor"].replace(/[()]*/g, "");
            h.color.fromArray(JSON.parse("[" + g + "]"));
          }
          if ("color3f inputs:emissiveColor.connect" in m) {
            const g = m["color3f inputs:emissiveColor.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.emissiveMap = S(E), h.emissiveMap.colorSpace = P, h.emissive.set(16777215), 'def Shader "Transform2d_emissive"' in f && R(h.emissiveMap, f['def Shader "Transform2d_emissive"']);
          } else if ("color3f inputs:emissiveColor" in m) {
            const g = m["color3f inputs:emissiveColor"].replace(/[()]*/g, "");
            h.emissive.fromArray(JSON.parse("[" + g + "]"));
          }
          if ("normal3f inputs:normal.connect" in m) {
            const g = m["normal3f inputs:normal.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.normalMap = S(E), h.normalMap.colorSpace = k, 'def Shader "Transform2d_normal"' in f && R(h.normalMap, f['def Shader "Transform2d_normal"']);
          }
          if ("float inputs:roughness.connect" in m) {
            const g = m["float inputs:roughness.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.roughness = 1, h.roughnessMap = S(E), h.roughnessMap.colorSpace = k, 'def Shader "Transform2d_roughness"' in f && R(h.roughnessMap, f['def Shader "Transform2d_roughness"']);
          } else "float inputs:roughness" in m && (h.roughness = parseFloat(m["float inputs:roughness"]));
          if ("float inputs:metallic.connect" in m) {
            const g = m["float inputs:metallic.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.metalness = 1, h.metalnessMap = S(E), h.metalnessMap.colorSpace = k, 'def Shader "Transform2d_metallic"' in f && R(h.metalnessMap, f['def Shader "Transform2d_metallic"']);
          } else "float inputs:metallic" in m && (h.metalness = parseFloat(m["float inputs:metallic"]));
          if ("float inputs:clearcoat.connect" in m) {
            const g = m["float inputs:clearcoat.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.clearcoat = 1, h.clearcoatMap = S(E), h.clearcoatMap.colorSpace = k, 'def Shader "Transform2d_clearcoat"' in f && R(h.clearcoatMap, f['def Shader "Transform2d_clearcoat"']);
          } else "float inputs:clearcoat" in m && (h.clearcoat = parseFloat(m["float inputs:clearcoat"]));
          if ("float inputs:clearcoatRoughness.connect" in m) {
            const g = m["float inputs:clearcoatRoughness.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.clearcoatRoughness = 1, h.clearcoatRoughnessMap = S(E), h.clearcoatRoughnessMap.colorSpace = k, 'def Shader "Transform2d_clearcoatRoughness"' in f && R(h.clearcoatRoughnessMap, f['def Shader "Transform2d_clearcoatRoughness"']);
          } else "float inputs:clearcoatRoughness" in m && (h.clearcoatRoughness = parseFloat(m["float inputs:clearcoatRoughness"]));
          if ("float inputs:ior" in m && (h.ior = parseFloat(m["float inputs:ior"])), "float inputs:occlusion.connect" in m) {
            const g = m["float inputs:occlusion.connect"], E = L(l, /(\w+).output/.exec(g)[1]);
            h.aoMap = S(E), h.aoMap.colorSpace = k, 'def Shader "Transform2d_occlusion"' in f && R(h.aoMap, f['def Shader "Transform2d_occlusion"']);
          }
        }
        if ('def Shader "diffuseColor_texture"' in f) {
          const m = f['def Shader "diffuseColor_texture"'];
          h.map = S(m), h.map.colorSpace = P;
        }
        if ('def Shader "normal_texture"' in f) {
          const m = f['def Shader "normal_texture"'];
          h.normalMap = S(m), h.normalMap.colorSpace = k;
        }
      }
      return h;
    }
    function L(f, h) {
      for (const m in f) {
        const g = f[m];
        if (m.startsWith(`def Shader "${h}"`))
          return g;
        if (typeof g == "object") {
          const E = L(g, h);
          if (E) return E;
        }
      }
    }
    function S(f) {
      if ("asset inputs:file" in f) {
        const h = f["asset inputs:file"].replace(/@*/g, ""), g = new ye().load(a[h]), E = {
          '"clamp"': Ne,
          '"mirror"': be,
          '"repeat"': Y
        };
        return "token inputs:wrapS" in f && (g.wrapS = E[f["token inputs:wrapS"]]), "token inputs:wrapT" in f && (g.wrapT = E[f["token inputs:wrapT"]]), g;
      }
      return null;
    }
    function b(f) {
      const h = A(u(f)), m = y(_(f)), g = h ? new Oe(h, m) : new ie();
      if ("matrix4d xformOp:transform" in f) {
        const E = JSON.parse("[" + f["matrix4d xformOp:transform"].replace(/[()]*/g, "") + "]");
        g.matrix.fromArray(E), g.matrix.decompose(g.position, g.quaternion, g.scale);
      }
      return g;
    }
    function N(f, h) {
      for (const m in f)
        if (m.startsWith("def Scope"))
          N(f[m], h);
        else if (m.startsWith("def Xform")) {
          const g = b(f[m]);
          /def Xform "(\w+)"/.test(m) && (g.name = /def Xform "(\w+)"/.exec(m)[1]), h.add(g), N(f[m], g);
        }
    }
    const M = new X();
    return N(l, M), M;
  }
}
function sn(d) {
  var i;
  const t = d.split("/").pop() || "";
  return !t.includes(".") || t.endsWith(".") ? "" : ((i = t.split(".").pop()) == null ? void 0 : i.toLowerCase().split("?")[0]) || "";
}
function rn(d) {
  return d.toLowerCase() in { glb: !0, gltf: !0, usdz: !0 };
}
class fn {
  constructor() {
    J(this, "_gltfLoader");
    J(this, "_usdzLoader");
    this._gltfLoader = new Et(), this._usdzLoader = new nn();
  }
  async _loadFile(t) {
    const e = await fetch(t);
    if (!e.ok)
      throw new pe(t, `Failed to fetch file from ${t}`);
    try {
      return await e.arrayBuffer();
    } catch {
      throw new pe(t, `Failed to fetch file from ${t}`);
    }
  }
  async load(t) {
    const e = sn(t);
    if (e.length === 0)
      throw new me("No file extension found in URI", "");
    if (!rn(e))
      throw new me(
        `Unsupported file type: ${e}. Supported types: ${Rt.join(", ")}`,
        e
      );
    const i = await this._loadFile(t);
    try {
      switch (e) {
        case "glb":
        case "gltf":
          return (await this._gltfLoader.parseAsync(
            i,
            ""
          )).scene;
        case "usdz":
          return await this._usdzLoader.parse(i);
      }
    } catch (n) {
      throw n instanceof Error ? new ge(
        `Failed to parse ${e} file: ${n.message}`,
        n
      ) : new ge(`Failed to parse ${e} file`);
    }
  }
}
export {
  fn as AssetLoader
};
//# sourceMappingURL=AssetLoader.mjs.map
