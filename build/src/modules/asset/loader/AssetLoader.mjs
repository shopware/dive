var Ge = Object.defineProperty;
var ve = (h, e, t) => e in h ? Ge(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var Q = (h, e, t) => ve(h, typeof e != "symbol" ? e + "" : e, t);
import { TrianglesDrawMode as Be, TriangleFanDrawMode as se, TriangleStripDrawMode as Se, Loader as ie, LoaderUtils as X, FileLoader as j, MeshPhysicalMaterial as k, Vector2 as z, Color as H, LinearSRGBColorSpace as O, SRGBColorSpace as C, SpotLight as je, PointLight as Ke, DirectionalLight as Ve, Matrix4 as q, Vector3 as v, Quaternion as Le, InstancedMesh as Xe, InstancedBufferAttribute as We, Object3D as ae, TextureLoader as be, ImageBitmapLoader as ze, BufferAttribute as D, InterleavedBuffer as qe, InterleavedBufferAttribute as Ye, LinearMipmapLinearFilter as Me, NearestMipmapLinearFilter as Je, LinearMipmapNearestFilter as Qe, NearestMipmapNearestFilter as Ze, LinearFilter as Ne, NearestFilter as $e, RepeatWrapping as Y, MirroredRepeatWrapping as Ie, ClampToEdgeWrapping as Ce, PointsMaterial as et, Material as Z, LineBasicMaterial as tt, MeshStandardMaterial as Oe, DoubleSide as nt, MeshBasicMaterial as V, PropertyBinding as st, BufferGeometry as ce, SkinnedMesh as rt, Mesh as ke, LineSegments as ot, Line as it, LineLoop as at, Points as ct, Group as W, PerspectiveCamera as lt, MathUtils as ut, OrthographicCamera as ft, Skeleton as dt, AnimationClip as ht, Bone as pt, InterpolateDiscrete as mt, InterpolateLinear as De, Texture as fe, VectorKeyframeTrack as de, NumberKeyframeTrack as he, QuaternionKeyframeTrack as pe, ColorManagement as me, FrontSide as gt, Interpolant as At, Box3 as Tt, Sphere as xt, NoColorSpace as U } from "three";
import { u as Rt, a as ge, F as Ae, P as Te } from "../../../../chunks/parse-error-DRBVHL9E.mjs";
import { g as yt, i as wt, S as _t } from "../../../../chunks/FileTypes-qgYnI0Jg.mjs";
function xe(h, e) {
  if (e === Be)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), h;
  if (e === se || e === Se) {
    let t = h.getIndex();
    if (t === null) {
      const s = [], a = h.getAttribute("position");
      if (a !== void 0) {
        for (let i = 0; i < a.count; i++)
          s.push(i);
        h.setIndex(s), t = h.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), h;
    }
    const o = t.count - 2, n = [];
    if (e === se)
      for (let s = 1; s <= o; s++)
        n.push(t.getX(0)), n.push(t.getX(s)), n.push(t.getX(s + 1));
    else
      for (let s = 0; s < o; s++)
        s % 2 === 0 ? (n.push(t.getX(s)), n.push(t.getX(s + 1)), n.push(t.getX(s + 2))) : (n.push(t.getX(s + 2)), n.push(t.getX(s + 1)), n.push(t.getX(s)));
    n.length / 3 !== o && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = h.clone();
    return r.setIndex(n), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), h;
}
class Et extends ie {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new Nt(t);
    }), this.register(function(t) {
      return new Ut(t);
    }), this.register(function(t) {
      return new Gt(t);
    }), this.register(function(t) {
      return new vt(t);
    }), this.register(function(t) {
      return new Ct(t);
    }), this.register(function(t) {
      return new Ot(t);
    }), this.register(function(t) {
      return new kt(t);
    }), this.register(function(t) {
      return new Dt(t);
    }), this.register(function(t) {
      return new Mt(t);
    }), this.register(function(t) {
      return new Ft(t);
    }), this.register(function(t) {
      return new It(t);
    }), this.register(function(t) {
      return new Ht(t);
    }), this.register(function(t) {
      return new Pt(t);
    }), this.register(function(t) {
      return new Lt(t);
    }), this.register(function(t) {
      return new Bt(t);
    }), this.register(function(t) {
      return new jt(t);
    });
  }
  load(e, t, o, n) {
    const r = this;
    let s;
    if (this.resourcePath !== "")
      s = this.resourcePath;
    else if (this.path !== "") {
      const c = X.extractUrlBase(e);
      s = X.resolveURL(c, this.path);
    } else
      s = X.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(c) {
      n ? n(c) : console.error(c), r.manager.itemError(e), r.manager.itemEnd(e);
    }, i = new j(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, function(c) {
      try {
        r.parse(c, s, function(l) {
          t(l), r.manager.itemEnd(e);
        }, a);
      } catch (l) {
        a(l);
      }
    }, o, a);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, o, n) {
    let r;
    const s = {}, a = {}, i = new TextDecoder();
    if (typeof e == "string")
      r = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (i.decode(new Uint8Array(e, 0, 4)) === Fe) {
        try {
          s[E.KHR_BINARY_GLTF] = new Kt(e);
        } catch (u) {
          n && n(u);
          return;
        }
        r = JSON.parse(s[E.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(i.decode(e));
    else
      r = e;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new nn(r, {
      path: t || this.resourcePath || "",
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
        const u = r.extensionsUsed[l], f = r.extensionsRequired || [];
        switch (u) {
          case E.KHR_MATERIALS_UNLIT:
            s[u] = new bt();
            break;
          case E.KHR_DRACO_MESH_COMPRESSION:
            s[u] = new Vt(r, this.dracoLoader);
            break;
          case E.KHR_TEXTURE_TRANSFORM:
            s[u] = new Xt();
            break;
          case E.KHR_MESH_QUANTIZATION:
            s[u] = new Wt();
            break;
          default:
            f.indexOf(u) >= 0 && a[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    c.setExtensions(s), c.setPlugins(a), c.parse(o, n);
  }
  parseAsync(e, t) {
    const o = this;
    return new Promise(function(n, r) {
      o.parse(e, t, n, r);
    });
  }
}
function St() {
  let h = {};
  return {
    get: function(e) {
      return h[e];
    },
    add: function(e, t) {
      h[e] = t;
    },
    remove: function(e) {
      delete h[e];
    },
    removeAll: function() {
      h = {};
    }
  };
}
const E = {
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
  constructor(e) {
    this.parser = e, this.name = E.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let o = 0, n = t.length; o < n; o++) {
      const r = t[o];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, o = "light:" + e;
    let n = t.cache.get(o);
    if (n) return n;
    const r = t.json, i = ((r.extensions && r.extensions[this.name] || {}).lights || [])[e];
    let c;
    const l = new H(16777215);
    i.color !== void 0 && l.setRGB(i.color[0], i.color[1], i.color[2], O);
    const u = i.range !== void 0 ? i.range : 0;
    switch (i.type) {
      case "directional":
        c = new Ve(l), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new Ke(l), c.distance = u;
        break;
      case "spot":
        c = new je(l), c.distance = u, i.spot = i.spot || {}, i.spot.innerConeAngle = i.spot.innerConeAngle !== void 0 ? i.spot.innerConeAngle : 0, i.spot.outerConeAngle = i.spot.outerConeAngle !== void 0 ? i.spot.outerConeAngle : Math.PI / 4, c.angle = i.spot.outerConeAngle, c.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + i.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, P(c, i), i.intensity !== void 0 && (c.intensity = i.intensity), c.name = t.createUniqueName(i.name || "light_" + e), n = Promise.resolve(c), t.cache.add(o, n), n;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, o = this.parser, r = o.json.nodes[e], a = (r.extensions && r.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(i) {
      return o._getNodeRef(t.cache, a, i);
    });
  }
}
class bt {
  constructor() {
    this.name = E.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return V;
  }
  extendParams(e, t, o) {
    const n = [];
    e.color = new H(1, 1, 1), e.opacity = 1;
    const r = t.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const s = r.baseColorFactor;
        e.color.setRGB(s[0], s[1], s[2], O), e.opacity = s[3];
      }
      r.baseColorTexture !== void 0 && n.push(o.assignTexture(e, "map", r.baseColorTexture, C));
    }
    return Promise.all(n);
  }
}
class Mt {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = n.extensions[this.name].emissiveStrength;
    return r !== void 0 && (t.emissiveIntensity = r), Promise.resolve();
  }
}
class Nt {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    if (s.clearcoatFactor !== void 0 && (t.clearcoat = s.clearcoatFactor), s.clearcoatTexture !== void 0 && r.push(o.assignTexture(t, "clearcoatMap", s.clearcoatTexture)), s.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = s.clearcoatRoughnessFactor), s.clearcoatRoughnessTexture !== void 0 && r.push(o.assignTexture(t, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)), s.clearcoatNormalTexture !== void 0 && (r.push(o.assignTexture(t, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== void 0)) {
      const a = s.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new z(a, a);
    }
    return Promise.all(r);
  }
}
class It {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.iridescenceFactor !== void 0 && (t.iridescence = s.iridescenceFactor), s.iridescenceTexture !== void 0 && r.push(o.assignTexture(t, "iridescenceMap", s.iridescenceTexture)), s.iridescenceIor !== void 0 && (t.iridescenceIOR = s.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), s.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = s.iridescenceThicknessMinimum), s.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = s.iridescenceThicknessMaximum), s.iridescenceThicknessTexture !== void 0 && r.push(o.assignTexture(t, "iridescenceThicknessMap", s.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class Ct {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [];
    t.sheenColor = new H(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const s = n.extensions[this.name];
    if (s.sheenColorFactor !== void 0) {
      const a = s.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], O);
    }
    return s.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = s.sheenRoughnessFactor), s.sheenColorTexture !== void 0 && r.push(o.assignTexture(t, "sheenColorMap", s.sheenColorTexture, C)), s.sheenRoughnessTexture !== void 0 && r.push(o.assignTexture(t, "sheenRoughnessMap", s.sheenRoughnessTexture)), Promise.all(r);
  }
}
class Ot {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.transmissionFactor !== void 0 && (t.transmission = s.transmissionFactor), s.transmissionTexture !== void 0 && r.push(o.assignTexture(t, "transmissionMap", s.transmissionTexture)), Promise.all(r);
  }
}
class kt {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    t.thickness = s.thicknessFactor !== void 0 ? s.thicknessFactor : 0, s.thicknessTexture !== void 0 && r.push(o.assignTexture(t, "thicknessMap", s.thicknessTexture)), t.attenuationDistance = s.attenuationDistance || 1 / 0;
    const a = s.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new H().setRGB(a[0], a[1], a[2], O), Promise.all(r);
  }
}
class Dt {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = n.extensions[this.name];
    return t.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class Ft {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    t.specularIntensity = s.specularFactor !== void 0 ? s.specularFactor : 1, s.specularTexture !== void 0 && r.push(o.assignTexture(t, "specularIntensityMap", s.specularTexture));
    const a = s.specularColorFactor || [1, 1, 1];
    return t.specularColor = new H().setRGB(a[0], a[1], a[2], O), s.specularColorTexture !== void 0 && r.push(o.assignTexture(t, "specularColorMap", s.specularColorTexture, C)), Promise.all(r);
  }
}
class Pt {
  constructor(e) {
    this.parser = e, this.name = E.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return t.bumpScale = s.bumpFactor !== void 0 ? s.bumpFactor : 1, s.bumpTexture !== void 0 && r.push(o.assignTexture(t, "bumpMap", s.bumpTexture)), Promise.all(r);
  }
}
class Ht {
  constructor(e) {
    this.parser = e, this.name = E.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : k;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.anisotropyStrength !== void 0 && (t.anisotropy = s.anisotropyStrength), s.anisotropyRotation !== void 0 && (t.anisotropyRotation = s.anisotropyRotation), s.anisotropyTexture !== void 0 && r.push(o.assignTexture(t, "anisotropyMap", s.anisotropyTexture)), Promise.all(r);
  }
}
class Ut {
  constructor(e) {
    this.parser = e, this.name = E.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, o = t.json, n = o.textures[e];
    if (!n.extensions || !n.extensions[this.name])
      return null;
    const r = n.extensions[this.name], s = t.options.ktx2Loader;
    if (!s) {
      if (o.extensionsRequired && o.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, r.source, s);
  }
}
class Gt {
  constructor(e) {
    this.parser = e, this.name = E.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, o = this.parser, n = o.json, r = n.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const s = r.extensions[t], a = n.images[s.source];
    let i = o.textureLoader;
    if (a.uri) {
      const c = o.options.manager.getHandler(a.uri);
      c !== null && (i = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return o.loadTextureImage(e, s.source, i);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return o.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class vt {
  constructor(e) {
    this.parser = e, this.name = E.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, o = this.parser, n = o.json, r = n.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const s = r.extensions[t], a = n.images[s.source];
    let i = o.textureLoader;
    if (a.uri) {
      const c = o.options.manager.getHandler(a.uri);
      c !== null && (i = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return o.loadTextureImage(e, s.source, i);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return o.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Bt {
  constructor(e) {
    this.name = E.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, o = t.bufferViews[e];
    if (o.extensions && o.extensions[this.name]) {
      const n = o.extensions[this.name], r = this.parser.getDependency("buffer", n.buffer), s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function(a) {
        const i = n.byteOffset || 0, c = n.byteLength || 0, l = n.count, u = n.byteStride, f = new Uint8Array(a, i, c);
        return s.decodeGltfBufferAsync ? s.decodeGltfBufferAsync(l, u, f, n.mode, n.filter).then(function(m) {
          return m.buffer;
        }) : s.ready.then(function() {
          const m = new ArrayBuffer(l * u);
          return s.decodeGltfBuffer(new Uint8Array(m), l, u, f, n.mode, n.filter), m;
        });
      });
    } else
      return null;
  }
}
class jt {
  constructor(e) {
    this.name = E.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, o = t.nodes[e];
    if (!o.extensions || !o.extensions[this.name] || o.mesh === void 0)
      return null;
    const n = t.meshes[o.mesh];
    for (const c of n.primitives)
      if (c.mode !== I.TRIANGLES && c.mode !== I.TRIANGLE_STRIP && c.mode !== I.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const s = o.extensions[this.name].attributes, a = [], i = {};
    for (const c in s)
      a.push(this.parser.getDependency("accessor", s[c]).then((l) => (i[c] = l, i[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((c) => {
      const l = c.pop(), u = l.isGroup ? l.children : [l], f = c[0].count, m = [];
      for (const T of u) {
        const _ = new q(), x = new v(), R = new Le(), S = new v(1, 1, 1), L = new Xe(T.geometry, T.material, f);
        for (let y = 0; y < f; y++)
          i.TRANSLATION && x.fromBufferAttribute(i.TRANSLATION, y), i.ROTATION && R.fromBufferAttribute(i.ROTATION, y), i.SCALE && S.fromBufferAttribute(i.SCALE, y), L.setMatrixAt(y, _.compose(x, R, S));
        for (const y in i)
          if (y === "_COLOR_0") {
            const M = i[y];
            L.instanceColor = new We(M.array, M.itemSize, M.normalized);
          } else y !== "TRANSLATION" && y !== "ROTATION" && y !== "SCALE" && T.geometry.setAttribute(y, i[y]);
        ae.prototype.copy.call(L, T), this.parser.assignFinalMaterial(L), m.push(L);
      }
      return l.isGroup ? (l.clear(), l.add(...m), l) : m[0];
    }));
  }
}
const Fe = "glTF", K = 12, Re = { JSON: 1313821514, BIN: 5130562 };
class Kt {
  constructor(e) {
    this.name = E.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, K), o = new TextDecoder();
    if (this.header = {
      magic: o.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Fe)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - K, r = new DataView(e, K);
    let s = 0;
    for (; s < n; ) {
      const a = r.getUint32(s, !0);
      s += 4;
      const i = r.getUint32(s, !0);
      if (s += 4, i === Re.JSON) {
        const c = new Uint8Array(e, K + s, a);
        this.content = o.decode(c);
      } else if (i === Re.BIN) {
        const c = K + s;
        this.body = e.slice(c, c + a);
      }
      s += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Vt {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = E.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const o = this.json, n = this.dracoLoader, r = e.extensions[this.name].bufferView, s = e.extensions[this.name].attributes, a = {}, i = {}, c = {};
    for (const l in s) {
      const u = re[l] || l.toLowerCase();
      a[u] = s[l];
    }
    for (const l in e.attributes) {
      const u = re[l] || l.toLowerCase();
      if (s[l] !== void 0) {
        const f = o.accessors[e.attributes[l]], m = B[f.componentType];
        c[u] = m.name, i[u] = f.normalized === !0;
      }
    }
    return t.getDependency("bufferView", r).then(function(l) {
      return new Promise(function(u, f) {
        n.decodeDracoFile(l, function(m) {
          for (const T in m.attributes) {
            const _ = m.attributes[T], x = i[T];
            x !== void 0 && (_.normalized = x);
          }
          u(m);
        }, a, c, O, f);
      });
    });
  }
}
class Xt {
  constructor() {
    this.name = E.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Wt {
  constructor() {
    this.name = E.KHR_MESH_QUANTIZATION;
  }
}
class Pe extends At {
  constructor(e, t, o, n) {
    super(e, t, o, n);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, o = this.sampleValues, n = this.valueSize, r = e * n * 3 + n;
    for (let s = 0; s !== n; s++)
      t[s] = o[r + s];
    return t;
  }
  interpolate_(e, t, o, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, i = a * 2, c = a * 3, l = n - t, u = (o - t) / l, f = u * u, m = f * u, T = e * c, _ = T - c, x = -2 * m + 3 * f, R = m - f, S = 1 - x, L = R - f + u;
    for (let y = 0; y !== a; y++) {
      const M = s[_ + y + a], N = s[_ + y + i] * l, b = s[T + y + a], d = s[T + y] * l;
      r[y] = S * M + L * N + x * b + R * d;
    }
    return r;
  }
}
const zt = new Le();
class qt extends Pe {
  interpolate_(e, t, o, n) {
    const r = super.interpolate_(e, t, o, n);
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
}, ye = {
  9728: $e,
  9729: Ne,
  9984: Ze,
  9985: Qe,
  9986: Je,
  9987: Me
}, we = {
  33071: Ce,
  33648: Ie,
  10497: Y
}, $ = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, re = {
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
  LINEAR: De,
  STEP: mt
}, ee = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Jt(h) {
  return h.DefaultMaterial === void 0 && (h.DefaultMaterial = new Oe({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: gt
  })), h.DefaultMaterial;
}
function G(h, e, t) {
  for (const o in t.extensions)
    h[o] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[o] = t.extensions[o]);
}
function P(h, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(h.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Qt(h, e, t) {
  let o = !1, n = !1, r = !1;
  for (let c = 0, l = e.length; c < l; c++) {
    const u = e[c];
    if (u.POSITION !== void 0 && (o = !0), u.NORMAL !== void 0 && (n = !0), u.COLOR_0 !== void 0 && (r = !0), o && n && r) break;
  }
  if (!o && !n && !r) return Promise.resolve(h);
  const s = [], a = [], i = [];
  for (let c = 0, l = e.length; c < l; c++) {
    const u = e[c];
    if (o) {
      const f = u.POSITION !== void 0 ? t.getDependency("accessor", u.POSITION) : h.attributes.position;
      s.push(f);
    }
    if (n) {
      const f = u.NORMAL !== void 0 ? t.getDependency("accessor", u.NORMAL) : h.attributes.normal;
      a.push(f);
    }
    if (r) {
      const f = u.COLOR_0 !== void 0 ? t.getDependency("accessor", u.COLOR_0) : h.attributes.color;
      i.push(f);
    }
  }
  return Promise.all([
    Promise.all(s),
    Promise.all(a),
    Promise.all(i)
  ]).then(function(c) {
    const l = c[0], u = c[1], f = c[2];
    return o && (h.morphAttributes.position = l), n && (h.morphAttributes.normal = u), r && (h.morphAttributes.color = f), h.morphTargetsRelative = !0, h;
  });
}
function Zt(h, e) {
  if (h.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, o = e.weights.length; t < o; t++)
      h.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (h.morphTargetInfluences.length === t.length) {
      h.morphTargetDictionary = {};
      for (let o = 0, n = t.length; o < n; o++)
        h.morphTargetDictionary[t[o]] = o;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function $t(h) {
  let e;
  const t = h.extensions && h.extensions[E.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + te(t.attributes) : e = h.indices + ":" + te(h.attributes) + ":" + h.mode, h.targets !== void 0)
    for (let o = 0, n = h.targets.length; o < n; o++)
      e += ":" + te(h.targets[o]);
  return e;
}
function te(h) {
  let e = "";
  const t = Object.keys(h).sort();
  for (let o = 0, n = t.length; o < n; o++)
    e += t[o] + ":" + h[t[o]] + ";";
  return e;
}
function oe(h) {
  switch (h) {
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
function en(h) {
  return h.search(/\.jpe?g($|\?)/i) > 0 || h.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : h.search(/\.webp($|\?)/i) > 0 || h.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const tn = new q();
class nn {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new St(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let o = !1, n = !1, r = -1;
    typeof navigator < "u" && (o = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, n = navigator.userAgent.indexOf("Firefox") > -1, r = n ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || o || n && r < 98 ? this.textureLoader = new be(this.options.manager) : this.textureLoader = new ze(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new j(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
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
      return G(r, a, n), P(a, n), Promise.all(o._invokeAll(function(i) {
        return i.afterRoot && i.afterRoot(a);
      })).then(function() {
        for (const i of a.scenes)
          i.updateMatrixWorld();
        e(a);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], o = this.json.meshes || [];
    for (let n = 0, r = t.length; n < r; n++) {
      const s = t[n].joints;
      for (let a = 0, i = s.length; a < i; a++)
        e[s[a]].isBone = !0;
    }
    for (let n = 0, r = e.length; n < r; n++) {
      const s = e[n];
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
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, t, o) {
    if (e.refs[t] <= 1) return o;
    const n = o.clone(), r = (s, a) => {
      const i = this.associations.get(s);
      i != null && this.associations.set(a, i);
      for (const [c, l] of s.children.entries())
        r(l, a.children[c]);
    };
    return r(o, n), n.name += "_instance_" + e.uses[t]++, n;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let o = 0; o < t.length; o++) {
      const n = e(t[o]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const o = [];
    for (let n = 0; n < t.length; n++) {
      const r = e(t[n]);
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
  getDependency(e, t) {
    const o = e + ":" + t;
    let n = this.cache.get(o);
    if (!n) {
      switch (e) {
        case "scene":
          n = this.loadScene(t);
          break;
        case "node":
          n = this._invokeOne(function(r) {
            return r.loadNode && r.loadNode(t);
          });
          break;
        case "mesh":
          n = this._invokeOne(function(r) {
            return r.loadMesh && r.loadMesh(t);
          });
          break;
        case "accessor":
          n = this.loadAccessor(t);
          break;
        case "bufferView":
          n = this._invokeOne(function(r) {
            return r.loadBufferView && r.loadBufferView(t);
          });
          break;
        case "buffer":
          n = this.loadBuffer(t);
          break;
        case "material":
          n = this._invokeOne(function(r) {
            return r.loadMaterial && r.loadMaterial(t);
          });
          break;
        case "texture":
          n = this._invokeOne(function(r) {
            return r.loadTexture && r.loadTexture(t);
          });
          break;
        case "skin":
          n = this.loadSkin(t);
          break;
        case "animation":
          n = this._invokeOne(function(r) {
            return r.loadAnimation && r.loadAnimation(t);
          });
          break;
        case "camera":
          n = this.loadCamera(t);
          break;
        default:
          if (n = this._invokeOne(function(r) {
            return r != this && r.getDependency && r.getDependency(e, t);
          }), !n)
            throw new Error("Unknown type: " + e);
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
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const o = this, n = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(n.map(function(r, s) {
        return o.getDependency(e, s);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], o = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[E.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function(r, s) {
      o.load(X.resolveURL(t.uri, n.path), r, void 0, function() {
        s(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(o) {
      const n = t.byteLength || 0, r = t.byteOffset || 0;
      return o.slice(r, r + n);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, o = this.json, n = this.json.accessors[e];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      const s = $[n.type], a = B[n.componentType], i = n.normalized === !0, c = new a(n.count * s);
      return Promise.resolve(new D(c, s, i));
    }
    const r = [];
    return n.bufferView !== void 0 ? r.push(this.getDependency("bufferView", n.bufferView)) : r.push(null), n.sparse !== void 0 && (r.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(r).then(function(s) {
      const a = s[0], i = $[n.type], c = B[n.componentType], l = c.BYTES_PER_ELEMENT, u = l * i, f = n.byteOffset || 0, m = n.bufferView !== void 0 ? o.bufferViews[n.bufferView].byteStride : void 0, T = n.normalized === !0;
      let _, x;
      if (m && m !== u) {
        const R = Math.floor(f / m), S = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + R + ":" + n.count;
        let L = t.cache.get(S);
        L || (_ = new c(a, R * m, n.count * m / l), L = new qe(_, m / l), t.cache.add(S, L)), x = new Ye(L, i, f % m / l, T);
      } else
        a === null ? _ = new c(n.count * i) : _ = new c(a, f, n.count * i), x = new D(_, i, T);
      if (n.sparse !== void 0) {
        const R = $.SCALAR, S = B[n.sparse.indices.componentType], L = n.sparse.indices.byteOffset || 0, y = n.sparse.values.byteOffset || 0, M = new S(s[1], L, n.sparse.count * R), N = new c(s[2], y, n.sparse.count * i);
        a !== null && (x = new D(x.array.slice(), x.itemSize, x.normalized));
        for (let b = 0, d = M.length; b < d; b++) {
          const p = M[b];
          if (x.setX(p, N[b * i]), i >= 2 && x.setY(p, N[b * i + 1]), i >= 3 && x.setZ(p, N[b * i + 2]), i >= 4 && x.setW(p, N[b * i + 3]), i >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return x;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const t = this.json, o = this.options, r = t.textures[e].source, s = t.images[r];
    let a = this.textureLoader;
    if (s.uri) {
      const i = o.manager.getHandler(s.uri);
      i !== null && (a = i);
    }
    return this.loadTextureImage(e, r, a);
  }
  loadTextureImage(e, t, o) {
    const n = this, r = this.json, s = r.textures[e], a = r.images[t], i = (a.uri || a.bufferView) + ":" + s.sampler;
    if (this.textureCache[i])
      return this.textureCache[i];
    const c = this.loadImageSource(t, o).then(function(l) {
      l.flipY = !1, l.name = s.name || a.name || "", l.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (l.name = a.uri);
      const f = (r.samplers || {})[s.sampler] || {};
      return l.magFilter = ye[f.magFilter] || Ne, l.minFilter = ye[f.minFilter] || Me, l.wrapS = we[f.wrapS] || Y, l.wrapT = we[f.wrapT] || Y, n.associations.set(l, { textures: e }), l;
    }).catch(function() {
      return null;
    });
    return this.textureCache[i] = c, c;
  }
  loadImageSource(e, t) {
    const o = this, n = this.json, r = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((u) => u.clone());
    const s = n.images[e], a = self.URL || self.webkitURL;
    let i = s.uri || "", c = !1;
    if (s.bufferView !== void 0)
      i = o.getDependency("bufferView", s.bufferView).then(function(u) {
        c = !0;
        const f = new Blob([u], { type: s.mimeType });
        return i = a.createObjectURL(f), i;
      });
    else if (s.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const l = Promise.resolve(i).then(function(u) {
      return new Promise(function(f, m) {
        let T = f;
        t.isImageBitmapLoader === !0 && (T = function(_) {
          const x = new fe(_);
          x.needsUpdate = !0, f(x);
        }), t.load(X.resolveURL(u, r.path), T, void 0, m);
      });
    }).then(function(u) {
      return c === !0 && a.revokeObjectURL(i), u.userData.mimeType = s.mimeType || en(s.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", i), u;
    });
    return this.sourceCache[e] = l, l;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, o, n) {
    const r = this;
    return this.getDependency("texture", o.index).then(function(s) {
      if (!s) return null;
      if (o.texCoord !== void 0 && o.texCoord > 0 && (s = s.clone(), s.channel = o.texCoord), r.extensions[E.KHR_TEXTURE_TRANSFORM]) {
        const a = o.extensions !== void 0 ? o.extensions[E.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const i = r.associations.get(s);
          s = r.extensions[E.KHR_TEXTURE_TRANSFORM].extendTexture(s, a), r.associations.set(s, i);
        }
      }
      return n !== void 0 && (s.colorSpace = n), e[t] = s, s;
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
  assignFinalMaterial(e) {
    const t = e.geometry;
    let o = e.material;
    const n = t.attributes.tangent === void 0, r = t.attributes.color !== void 0, s = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + o.uuid;
      let i = this.cache.get(a);
      i || (i = new et(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, i.sizeAttenuation = !1, this.cache.add(a, i)), o = i;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + o.uuid;
      let i = this.cache.get(a);
      i || (i = new tt(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, this.cache.add(a, i)), o = i;
    }
    if (n || r || s) {
      let a = "ClonedMaterial:" + o.uuid + ":";
      n && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), s && (a += "flat-shading:");
      let i = this.cache.get(a);
      i || (i = o.clone(), r && (i.vertexColors = !0), s && (i.flatShading = !0), n && (i.normalScale && (i.normalScale.y *= -1), i.clearcoatNormalScale && (i.clearcoatNormalScale.y *= -1)), this.cache.add(a, i), this.associations.set(i, this.associations.get(o))), o = i;
    }
    e.material = o;
  }
  getMaterialType() {
    return Oe;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, o = this.json, n = this.extensions, r = o.materials[e];
    let s;
    const a = {}, i = r.extensions || {}, c = [];
    if (i[E.KHR_MATERIALS_UNLIT]) {
      const u = n[E.KHR_MATERIALS_UNLIT];
      s = u.getMaterialType(), c.push(u.extendParams(a, r, t));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (a.color = new H(1, 1, 1), a.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const f = u.baseColorFactor;
        a.color.setRGB(f[0], f[1], f[2], O), a.opacity = f[3];
      }
      u.baseColorTexture !== void 0 && c.push(t.assignTexture(a, "map", u.baseColorTexture, C)), a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)), c.push(t.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))), s = this._invokeOne(function(f) {
        return f.getMaterialType && f.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(f) {
        return f.extendMaterialParams && f.extendMaterialParams(e, a);
      })));
    }
    r.doubleSided === !0 && (a.side = nt);
    const l = r.alphaMode || ee.OPAQUE;
    if (l === ee.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, l === ee.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && s !== V && (c.push(t.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new z(1, 1), r.normalTexture.scale !== void 0)) {
      const u = r.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (r.occlusionTexture !== void 0 && s !== V && (c.push(t.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && s !== V) {
      const u = r.emissiveFactor;
      a.emissive = new H().setRGB(u[0], u[1], u[2], O);
    }
    return r.emissiveTexture !== void 0 && s !== V && c.push(t.assignTexture(a, "emissiveMap", r.emissiveTexture, C)), Promise.all(c).then(function() {
      const u = new s(a);
      return r.name && (u.name = r.name), P(u, r), t.associations.set(u, { materials: e }), r.extensions && G(n, u, r), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = st.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, o = this.extensions, n = this.primitiveCache;
    function r(a) {
      return o[E.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(i) {
        return _e(i, a, t);
      });
    }
    const s = [];
    for (let a = 0, i = e.length; a < i; a++) {
      const c = e[a], l = $t(c), u = n[l];
      if (u)
        s.push(u.promise);
      else {
        let f;
        c.extensions && c.extensions[E.KHR_DRACO_MESH_COMPRESSION] ? f = r(c) : f = _e(new ce(), c, t), n[l] = { primitive: c, promise: f }, s.push(f);
      }
    }
    return Promise.all(s);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, o = this.json, n = this.extensions, r = o.meshes[e], s = r.primitives, a = [];
    for (let i = 0, c = s.length; i < c; i++) {
      const l = s[i].material === void 0 ? Jt(this.cache) : this.getDependency("material", s[i].material);
      a.push(l);
    }
    return a.push(t.loadGeometries(s)), Promise.all(a).then(function(i) {
      const c = i.slice(0, i.length - 1), l = i[i.length - 1], u = [];
      for (let m = 0, T = l.length; m < T; m++) {
        const _ = l[m], x = s[m];
        let R;
        const S = c[m];
        if (x.mode === I.TRIANGLES || x.mode === I.TRIANGLE_STRIP || x.mode === I.TRIANGLE_FAN || x.mode === void 0)
          R = r.isSkinnedMesh === !0 ? new rt(_, S) : new ke(_, S), R.isSkinnedMesh === !0 && R.normalizeSkinWeights(), x.mode === I.TRIANGLE_STRIP ? R.geometry = xe(R.geometry, Se) : x.mode === I.TRIANGLE_FAN && (R.geometry = xe(R.geometry, se));
        else if (x.mode === I.LINES)
          R = new ot(_, S);
        else if (x.mode === I.LINE_STRIP)
          R = new it(_, S);
        else if (x.mode === I.LINE_LOOP)
          R = new at(_, S);
        else if (x.mode === I.POINTS)
          R = new ct(_, S);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + x.mode);
        Object.keys(R.geometry.morphAttributes).length > 0 && Zt(R, r), R.name = t.createUniqueName(r.name || "mesh_" + e), P(R, r), x.extensions && G(n, R, x), t.assignFinalMaterial(R), u.push(R);
      }
      for (let m = 0, T = u.length; m < T; m++)
        t.associations.set(u[m], {
          meshes: e,
          primitives: m
        });
      if (u.length === 1)
        return r.extensions && G(n, u[0], r), u[0];
      const f = new W();
      r.extensions && G(n, f, r), t.associations.set(f, { meshes: e });
      for (let m = 0, T = u.length; m < T; m++)
        f.add(u[m]);
      return f;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let t;
    const o = this.json.cameras[e], n = o[o.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return o.type === "perspective" ? t = new lt(ut.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : o.type === "orthographic" && (t = new ft(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), o.name && (t.name = this.createUniqueName(o.name)), P(t, o), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], o = [];
    for (let n = 0, r = t.joints.length; n < r; n++)
      o.push(this._loadNodeShallow(t.joints[n]));
    return t.inverseBindMatrices !== void 0 ? o.push(this.getDependency("accessor", t.inverseBindMatrices)) : o.push(null), Promise.all(o).then(function(n) {
      const r = n.pop(), s = n, a = [], i = [];
      for (let c = 0, l = s.length; c < l; c++) {
        const u = s[c];
        if (u) {
          a.push(u);
          const f = new q();
          r !== null && f.fromArray(r.array, c * 16), i.push(f);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new dt(a, i);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, o = this, n = t.animations[e], r = n.name ? n.name : "animation_" + e, s = [], a = [], i = [], c = [], l = [];
    for (let u = 0, f = n.channels.length; u < f; u++) {
      const m = n.channels[u], T = n.samplers[m.sampler], _ = m.target, x = _.node, R = n.parameters !== void 0 ? n.parameters[T.input] : T.input, S = n.parameters !== void 0 ? n.parameters[T.output] : T.output;
      _.node !== void 0 && (s.push(this.getDependency("node", x)), a.push(this.getDependency("accessor", R)), i.push(this.getDependency("accessor", S)), c.push(T), l.push(_));
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(a),
      Promise.all(i),
      Promise.all(c),
      Promise.all(l)
    ]).then(function(u) {
      const f = u[0], m = u[1], T = u[2], _ = u[3], x = u[4], R = [];
      for (let S = 0, L = f.length; S < L; S++) {
        const y = f[S], M = m[S], N = T[S], b = _[S], d = x[S];
        if (y === void 0) continue;
        y.updateMatrix && y.updateMatrix();
        const p = o._createAnimationTracks(y, M, N, b, d);
        if (p)
          for (let g = 0; g < p.length; g++)
            R.push(p[g]);
      }
      return new ht(r, void 0, R);
    });
  }
  createNodeMesh(e) {
    const t = this.json, o = this, n = t.nodes[e];
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
  loadNode(e) {
    const t = this.json, o = this, n = t.nodes[e], r = o._loadNodeShallow(e), s = [], a = n.children || [];
    for (let c = 0, l = a.length; c < l; c++)
      s.push(o.getDependency("node", a[c]));
    const i = n.skin === void 0 ? Promise.resolve(null) : o.getDependency("skin", n.skin);
    return Promise.all([
      r,
      Promise.all(s),
      i
    ]).then(function(c) {
      const l = c[0], u = c[1], f = c[2];
      f !== null && l.traverse(function(m) {
        m.isSkinnedMesh && m.bind(f, tn);
      });
      for (let m = 0, T = u.length; m < T; m++)
        l.add(u[m]);
      return l;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, o = this.extensions, n = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const r = t.nodes[e], s = r.name ? n.createUniqueName(r.name) : "", a = [], i = n._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return i && a.push(i), r.camera !== void 0 && a.push(n.getDependency("camera", r.camera).then(function(c) {
      return n._getNodeRef(n.cameraCache, r.camera, c);
    })), n._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[e] = Promise.all(a).then(function(c) {
      let l;
      if (r.isBone === !0 ? l = new pt() : c.length > 1 ? l = new W() : c.length === 1 ? l = c[0] : l = new ae(), l !== c[0])
        for (let u = 0, f = c.length; u < f; u++)
          l.add(c[u]);
      if (r.name && (l.userData.name = r.name, l.name = s), P(l, r), r.extensions && G(o, l, r), r.matrix !== void 0) {
        const u = new q();
        u.fromArray(r.matrix), l.applyMatrix4(u);
      } else
        r.translation !== void 0 && l.position.fromArray(r.translation), r.rotation !== void 0 && l.quaternion.fromArray(r.rotation), r.scale !== void 0 && l.scale.fromArray(r.scale);
      return n.associations.has(l) || n.associations.set(l, {}), n.associations.get(l).nodes = e, l;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, o = this.json.scenes[e], n = this, r = new W();
    o.name && (r.name = n.createUniqueName(o.name)), P(r, o), o.extensions && G(t, r, o);
    const s = o.nodes || [], a = [];
    for (let i = 0, c = s.length; i < c; i++)
      a.push(n.getDependency("node", s[i]));
    return Promise.all(a).then(function(i) {
      for (let l = 0, u = i.length; l < u; l++)
        r.add(i[l]);
      const c = (l) => {
        const u = /* @__PURE__ */ new Map();
        for (const [f, m] of n.associations)
          (f instanceof Z || f instanceof fe) && u.set(f, m);
        return l.traverse((f) => {
          const m = n.associations.get(f);
          m != null && u.set(f, m);
        }), u;
      };
      return n.associations = c(r), r;
    });
  }
  _createAnimationTracks(e, t, o, n, r) {
    const s = [], a = e.name ? e.name : e.uuid, i = [];
    F[r.path] === F.weights ? e.traverse(function(f) {
      f.morphTargetInfluences && i.push(f.name ? f.name : f.uuid);
    }) : i.push(a);
    let c;
    switch (F[r.path]) {
      case F.weights:
        c = he;
        break;
      case F.rotation:
        c = pe;
        break;
      case F.position:
      case F.scale:
        c = de;
        break;
      default:
        switch (o.itemSize) {
          case 1:
            c = he;
            break;
          case 2:
          case 3:
          default:
            c = de;
            break;
        }
        break;
    }
    const l = n.interpolation !== void 0 ? Yt[n.interpolation] : De, u = this._getArrayFromAccessor(o);
    for (let f = 0, m = i.length; f < m; f++) {
      const T = new c(
        i[f] + "." + F[r.path],
        t.array,
        u,
        l
      );
      n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(T), s.push(T);
    }
    return s;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const o = oe(t.constructor), n = new Float32Array(t.length);
      for (let r = 0, s = t.length; r < s; r++)
        n[r] = t[r] * o;
      t = n;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(o) {
      const n = this instanceof pe ? qt : Pe;
      return new n(this.times, this.values, this.getValueSize() / 3, o);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function sn(h, e, t) {
  const o = e.attributes, n = new Tt();
  if (o.POSITION !== void 0) {
    const a = t.json.accessors[o.POSITION], i = a.min, c = a.max;
    if (i !== void 0 && c !== void 0) {
      if (n.set(
        new v(i[0], i[1], i[2]),
        new v(c[0], c[1], c[2])
      ), a.normalized) {
        const l = oe(B[a.componentType]);
        n.min.multiplyScalar(l), n.max.multiplyScalar(l);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = e.targets;
  if (r !== void 0) {
    const a = new v(), i = new v();
    for (let c = 0, l = r.length; c < l; c++) {
      const u = r[c];
      if (u.POSITION !== void 0) {
        const f = t.json.accessors[u.POSITION], m = f.min, T = f.max;
        if (m !== void 0 && T !== void 0) {
          if (i.setX(Math.max(Math.abs(m[0]), Math.abs(T[0]))), i.setY(Math.max(Math.abs(m[1]), Math.abs(T[1]))), i.setZ(Math.max(Math.abs(m[2]), Math.abs(T[2]))), f.normalized) {
            const _ = oe(B[f.componentType]);
            i.multiplyScalar(_);
          }
          a.max(i);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(a);
  }
  h.boundingBox = n;
  const s = new xt();
  n.getCenter(s.center), s.radius = n.min.distanceTo(n.max) / 2, h.boundingSphere = s;
}
function _e(h, e, t) {
  const o = e.attributes, n = [];
  function r(s, a) {
    return t.getDependency("accessor", s).then(function(i) {
      h.setAttribute(a, i);
    });
  }
  for (const s in o) {
    const a = re[s] || s.toLowerCase();
    a in h.attributes || n.push(r(o[s], a));
  }
  if (e.indices !== void 0 && !h.index) {
    const s = t.getDependency("accessor", e.indices).then(function(a) {
      h.setIndex(a);
    });
    n.push(s);
  }
  return me.workingColorSpace !== O && "COLOR_0" in o && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${me.workingColorSpace}" not supported.`), P(h, e), sn(h, e, t), Promise.all(n).then(function() {
    return e.targets !== void 0 ? Qt(h, e.targets, t) : h;
  });
}
class rn {
  parse(e) {
    const t = {}, o = e.split(`
`);
    let n = null, r = t;
    const s = [t];
    for (const a of o)
      if (a.includes("=")) {
        const i = a.split("="), c = i[0].trim(), l = i[1].trim();
        if (l.endsWith("{")) {
          const u = {};
          s.push(u), r[c] = u, r = u;
        } else
          r[c] = l;
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
    return t;
  }
}
class on extends ie {
  constructor(e) {
    super(e);
  }
  load(e, t, o, n) {
    const r = this, s = new j(r.manager);
    s.setPath(r.path), s.setResponseType("arraybuffer"), s.setRequestHeader(r.requestHeader), s.setWithCredentials(r.withCredentials), s.load(e, function(a) {
      try {
        t(r.parse(a));
      } catch (i) {
        n ? n(i) : console.error(i), r.manager.itemError(e);
      }
    }, o, n);
  }
  parse(e) {
    const t = new rn();
    function o(d) {
      const p = {};
      new j().setResponseType("arraybuffer");
      for (const A in d) {
        if (A.endsWith("png")) {
          const w = new Blob([d[A]], { type: { type: "image/png" } });
          p[A] = URL.createObjectURL(w);
        }
        if (A.endsWith("usd") || A.endsWith("usda")) {
          if (n(d[A])) {
            console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
            continue;
          }
          const w = ge(d[A]);
          p[A] = t.parse(w);
        }
      }
      return p;
    }
    function n(d) {
      const p = d.slice(0, 7), g = new Uint8Array([80, 88, 82, 45, 85, 83, 68, 67]);
      return p.every((A, w) => A === g[w]);
    }
    function r(d) {
      if (d.length < 1) return;
      const p = Object.keys(d)[0];
      let g = !1;
      if (p.endsWith("usda")) return d[p];
      if (p.endsWith("usdc"))
        g = !0;
      else if (p.endsWith("usd"))
        if (n(d[p]))
          g = !0;
        else
          return d[p];
      g && console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
    }
    const s = Rt(new Uint8Array(e)), a = o(s), i = r(s);
    if (i === void 0)
      return console.warn("THREE.USDZLoader: No usda file found."), new W();
    const c = ge(i), l = t.parse(c);
    function u(d) {
      if (d) {
        if ("prepend references" in d) {
          const g = d["prepend references"].split("@"), A = g[1].replace(/^.\//, ""), w = g[2].replace(/^<\//, "").replace(/>$/, "");
          return f(a[A], w);
        }
        return f(d);
      }
    }
    function f(d, p) {
      if (d) {
        if (p !== void 0) {
          const g = `def Mesh "${p}"`;
          if (g in d)
            return d[g];
        }
        for (const g in d) {
          const A = d[g];
          if (g.startsWith("def Mesh"))
            return "point3f[] points" in d && (A["point3f[] points"] = d["point3f[] points"]), "texCoord2f[] primvars:st" in d && (A["texCoord2f[] primvars:st"] = d["texCoord2f[] primvars:st"]), "int[] primvars:st:indices" in d && (A["int[] primvars:st:indices"] = d["int[] primvars:st:indices"]), A;
          if (typeof A == "object") {
            const w = f(A);
            if (w) return w;
          }
        }
      }
    }
    function m(d) {
      if (!d) return;
      let p = new ce();
      if ("int[] faceVertexIndices" in d) {
        const g = JSON.parse(d["int[] faceVertexIndices"]);
        p.setIndex(g);
      }
      if ("point3f[] points" in d) {
        const g = JSON.parse(d["point3f[] points"].replace(/[()]*/g, "")), A = new D(new Float32Array(g), 3);
        p.setAttribute("position", A);
      }
      if ("normal3f[] normals" in d) {
        const g = JSON.parse(d["normal3f[] normals"].replace(/[()]*/g, "")), A = new D(new Float32Array(g), 3);
        p.setAttribute("normal", A);
      } else
        p.computeVertexNormals();
      if ("float2[] primvars:st" in d && (d["texCoord2f[] primvars:st"] = d["float2[] primvars:st"]), "texCoord2f[] primvars:st" in d) {
        const g = JSON.parse(d["texCoord2f[] primvars:st"].replace(/[()]*/g, "")), A = new D(new Float32Array(g), 2);
        if ("int[] primvars:st:indices" in d) {
          p = p.toNonIndexed();
          const w = JSON.parse(d["int[] primvars:st:indices"]);
          p.setAttribute("uv", T(A, w));
        } else
          p.setAttribute("uv", A);
      }
      return p;
    }
    function T(d, p) {
      const g = d.array, A = d.itemSize, w = new g.constructor(p.length * A);
      let le = 0, He = 0;
      for (let J = 0, Ue = p.length; J < Ue; J++) {
        le = p[J] * A;
        for (let ue = 0; ue < A; ue++)
          w[He++] = g[le++];
      }
      return new D(w, A);
    }
    function _(d) {
      if (d) {
        if ("rel material:binding" in d) {
          const A = d["rel material:binding"].replace(/^<\//, "").replace(/>$/, "").split("/");
          return x(l, ` "${A[1]}"`);
        }
        return x(d);
      }
    }
    function x(d, p = "") {
      for (const g in d) {
        const A = d[g];
        if (g.startsWith("def Material" + p))
          return A;
        if (typeof A == "object") {
          const w = x(A, p);
          if (w) return w;
        }
      }
    }
    function R(d, p) {
      p["float inputs:rotation"] && (d.rotation = parseFloat(p["float inputs:rotation"])), p["float2 inputs:scale"] && (d.repeat = new z().fromArray(JSON.parse("[" + p["float2 inputs:scale"].replace(/[()]*/g, "") + "]"))), p["float2 inputs:translation"] && (d.offset = new z().fromArray(JSON.parse("[" + p["float2 inputs:translation"].replace(/[()]*/g, "") + "]")));
    }
    function S(d) {
      const p = new k();
      if (d !== void 0) {
        if ('def Shader "PreviewSurface"' in d) {
          const g = d['def Shader "PreviewSurface"'];
          if ("color3f inputs:diffuseColor.connect" in g) {
            const A = g["color3f inputs:diffuseColor.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.map = y(w), p.map.colorSpace = C, 'def Shader "Transform2d_diffuse"' in d && R(p.map, d['def Shader "Transform2d_diffuse"']);
          } else if ("color3f inputs:diffuseColor" in g) {
            const A = g["color3f inputs:diffuseColor"].replace(/[()]*/g, "");
            p.color.fromArray(JSON.parse("[" + A + "]"));
          }
          if ("color3f inputs:emissiveColor.connect" in g) {
            const A = g["color3f inputs:emissiveColor.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.emissiveMap = y(w), p.emissiveMap.colorSpace = C, p.emissive.set(16777215), 'def Shader "Transform2d_emissive"' in d && R(p.emissiveMap, d['def Shader "Transform2d_emissive"']);
          } else if ("color3f inputs:emissiveColor" in g) {
            const A = g["color3f inputs:emissiveColor"].replace(/[()]*/g, "");
            p.emissive.fromArray(JSON.parse("[" + A + "]"));
          }
          if ("normal3f inputs:normal.connect" in g) {
            const A = g["normal3f inputs:normal.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.normalMap = y(w), p.normalMap.colorSpace = U, 'def Shader "Transform2d_normal"' in d && R(p.normalMap, d['def Shader "Transform2d_normal"']);
          }
          if ("float inputs:roughness.connect" in g) {
            const A = g["float inputs:roughness.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.roughness = 1, p.roughnessMap = y(w), p.roughnessMap.colorSpace = U, 'def Shader "Transform2d_roughness"' in d && R(p.roughnessMap, d['def Shader "Transform2d_roughness"']);
          } else "float inputs:roughness" in g && (p.roughness = parseFloat(g["float inputs:roughness"]));
          if ("float inputs:metallic.connect" in g) {
            const A = g["float inputs:metallic.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.metalness = 1, p.metalnessMap = y(w), p.metalnessMap.colorSpace = U, 'def Shader "Transform2d_metallic"' in d && R(p.metalnessMap, d['def Shader "Transform2d_metallic"']);
          } else "float inputs:metallic" in g && (p.metalness = parseFloat(g["float inputs:metallic"]));
          if ("float inputs:clearcoat.connect" in g) {
            const A = g["float inputs:clearcoat.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.clearcoat = 1, p.clearcoatMap = y(w), p.clearcoatMap.colorSpace = U, 'def Shader "Transform2d_clearcoat"' in d && R(p.clearcoatMap, d['def Shader "Transform2d_clearcoat"']);
          } else "float inputs:clearcoat" in g && (p.clearcoat = parseFloat(g["float inputs:clearcoat"]));
          if ("float inputs:clearcoatRoughness.connect" in g) {
            const A = g["float inputs:clearcoatRoughness.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.clearcoatRoughness = 1, p.clearcoatRoughnessMap = y(w), p.clearcoatRoughnessMap.colorSpace = U, 'def Shader "Transform2d_clearcoatRoughness"' in d && R(p.clearcoatRoughnessMap, d['def Shader "Transform2d_clearcoatRoughness"']);
          } else "float inputs:clearcoatRoughness" in g && (p.clearcoatRoughness = parseFloat(g["float inputs:clearcoatRoughness"]));
          if ("float inputs:ior" in g && (p.ior = parseFloat(g["float inputs:ior"])), "float inputs:occlusion.connect" in g) {
            const A = g["float inputs:occlusion.connect"], w = L(l, /(\w+).output/.exec(A)[1]);
            p.aoMap = y(w), p.aoMap.colorSpace = U, 'def Shader "Transform2d_occlusion"' in d && R(p.aoMap, d['def Shader "Transform2d_occlusion"']);
          }
        }
        if ('def Shader "diffuseColor_texture"' in d) {
          const g = d['def Shader "diffuseColor_texture"'];
          p.map = y(g), p.map.colorSpace = C;
        }
        if ('def Shader "normal_texture"' in d) {
          const g = d['def Shader "normal_texture"'];
          p.normalMap = y(g), p.normalMap.colorSpace = U;
        }
      }
      return p;
    }
    function L(d, p) {
      for (const g in d) {
        const A = d[g];
        if (g.startsWith(`def Shader "${p}"`))
          return A;
        if (typeof A == "object") {
          const w = L(A, p);
          if (w) return w;
        }
      }
    }
    function y(d) {
      if ("asset inputs:file" in d) {
        const p = d["asset inputs:file"].replace(/@*/g, ""), A = new be().load(a[p]), w = {
          '"clamp"': Ce,
          '"mirror"': Ie,
          '"repeat"': Y
        };
        return "token inputs:wrapS" in d && (A.wrapS = w[d["token inputs:wrapS"]]), "token inputs:wrapT" in d && (A.wrapT = w[d["token inputs:wrapT"]]), A;
      }
      return null;
    }
    function M(d) {
      const p = m(u(d)), g = S(_(d)), A = p ? new ke(p, g) : new ae();
      if ("matrix4d xformOp:transform" in d) {
        const w = JSON.parse("[" + d["matrix4d xformOp:transform"].replace(/[()]*/g, "") + "]");
        A.matrix.fromArray(w), A.matrix.decompose(A.position, A.quaternion, A.scale);
      }
      return A;
    }
    function N(d, p) {
      for (const g in d)
        if (g.startsWith("def Scope"))
          N(d[g], p);
        else if (g.startsWith("def Xform")) {
          const A = M(d[g]);
          /def Xform "(\w+)"/.test(g) && (A.name = /def Xform "(\w+)"/.exec(g)[1]), p.add(A), N(d[g], A);
        }
    }
    const b = new W();
    return N(l, b), b;
  }
}
const ne = /* @__PURE__ */ new WeakMap();
class an extends ie {
  constructor(e) {
    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(e) {
    return this.decoderPath = e, this;
  }
  setDecoderConfig(e) {
    return this.decoderConfig = e, this;
  }
  setWorkerLimit(e) {
    return this.workerLimit = e, this;
  }
  load(e, t, o, n) {
    const r = new j(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, (s) => {
      this.parse(s, t, n);
    }, o, n);
  }
  parse(e, t, o = () => {
  }) {
    this.decodeDracoFile(e, t, null, null, C).catch(o);
  }
  decodeDracoFile(e, t, o, n, r = O, s = () => {
  }) {
    const a = {
      attributeIDs: o || this.defaultAttributeIDs,
      attributeTypes: n || this.defaultAttributeTypes,
      useUniqueIDs: !!o,
      vertexColorSpace: r
    };
    return this.decodeGeometry(e, a).then(t).catch(s);
  }
  decodeGeometry(e, t) {
    const o = JSON.stringify(t);
    if (ne.has(e)) {
      const i = ne.get(e);
      if (i.key === o)
        return i.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let n;
    const r = this.workerNextTaskID++, s = e.byteLength, a = this._getWorker(r, s).then((i) => (n = i, new Promise((c, l) => {
      n._callbacks[r] = { resolve: c, reject: l }, n.postMessage({ type: "decode", id: r, taskConfig: t, buffer: e }, [e]);
    }))).then((i) => this._createGeometry(i.geometry));
    return a.catch(() => !0).then(() => {
      n && r && this._releaseTask(n, r);
    }), ne.set(e, {
      key: o,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const t = new ce();
    e.index && t.setIndex(new D(e.index.array, 1));
    for (let o = 0; o < e.attributes.length; o++) {
      const n = e.attributes[o], r = n.name, s = n.array, a = n.itemSize, i = new D(s, a);
      r === "color" && (this._assignVertexColorSpace(i, n.vertexColorSpace), i.normalized = !(s instanceof Float32Array)), t.setAttribute(r, i);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== C) return;
    const o = new H();
    for (let n = 0, r = e.count; n < r; n++)
      o.fromBufferAttribute(e, n).convertSRGBToLinear(), e.setXYZ(n, o.r, o.g, o.b);
  }
  _loadLibrary(e, t) {
    const o = new j(this.manager);
    return o.setPath(this.decoderPath), o.setResponseType(t), o.setWithCredentials(this.withCredentials), new Promise((n, r) => {
      o.load(e, n, void 0, r);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((o) => {
      const n = o[0];
      e || (this.decoderConfig.wasmBinary = o[1]);
      const r = cn.toString(), s = [
        "/* draco decoder */",
        n,
        "",
        "/* worker */",
        r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([s]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const n = new Worker(this.workerSourceURL);
        n._callbacks = {}, n._taskCosts = {}, n._taskLoad = 0, n.postMessage({ type: "init", decoderConfig: this.decoderConfig }), n.onmessage = function(r) {
          const s = r.data;
          switch (s.type) {
            case "decode":
              n._callbacks[s.id].resolve(s);
              break;
            case "error":
              n._callbacks[s.id].reject(s);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + s.type + '"');
          }
        }, this.workerPool.push(n);
      } else
        this.workerPool.sort(function(n, r) {
          return n._taskLoad > r._taskLoad ? -1 : 1;
        });
      const o = this.workerPool[this.workerPool.length - 1];
      return o._taskCosts[e] = t, o._taskLoad += t, o;
    });
  }
  _releaseTask(e, t) {
    e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((e) => e._taskLoad));
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function cn() {
  let h, e;
  onmessage = function(s) {
    const a = s.data;
    switch (a.type) {
      case "init":
        h = a.decoderConfig, e = new Promise(function(l) {
          h.onModuleLoaded = function(u) {
            l({ draco: u });
          }, DracoDecoderModule(h);
        });
        break;
      case "decode":
        const i = a.buffer, c = a.taskConfig;
        e.then((l) => {
          const u = l.draco, f = new u.Decoder();
          try {
            const m = t(u, f, new Int8Array(i), c), T = m.attributes.map((_) => _.array.buffer);
            m.index && T.push(m.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: m }, T);
          } catch (m) {
            console.error(m), self.postMessage({ type: "error", id: a.id, error: m.message });
          } finally {
            u.destroy(f);
          }
        });
        break;
    }
  };
  function t(s, a, i, c) {
    const l = c.attributeIDs, u = c.attributeTypes;
    let f, m;
    const T = a.GetEncodedGeometryType(i);
    if (T === s.TRIANGULAR_MESH)
      f = new s.Mesh(), m = a.DecodeArrayToMesh(i, i.byteLength, f);
    else if (T === s.POINT_CLOUD)
      f = new s.PointCloud(), m = a.DecodeArrayToPointCloud(i, i.byteLength, f);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!m.ok() || f.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + m.error_msg());
    const _ = { index: null, attributes: [] };
    for (const x in l) {
      const R = self[u[x]];
      let S, L;
      if (c.useUniqueIDs)
        L = l[x], S = a.GetAttributeByUniqueId(f, L);
      else {
        if (L = a.GetAttributeId(f, s[l[x]]), L === -1) continue;
        S = a.GetAttribute(f, L);
      }
      const y = n(s, a, f, x, R, S);
      x === "color" && (y.vertexColorSpace = c.vertexColorSpace), _.attributes.push(y);
    }
    return T === s.TRIANGULAR_MESH && (_.index = o(s, a, f)), s.destroy(f), _;
  }
  function o(s, a, i) {
    const l = i.num_faces() * 3, u = l * 4, f = s._malloc(u);
    a.GetTrianglesUInt32Array(i, u, f);
    const m = new Uint32Array(s.HEAPF32.buffer, f, l).slice();
    return s._free(f), { array: m, itemSize: 1 };
  }
  function n(s, a, i, c, l, u) {
    const f = u.num_components(), T = i.num_points() * f, _ = T * l.BYTES_PER_ELEMENT, x = r(s, l), R = s._malloc(_);
    a.GetAttributeDataArrayForAllPoints(i, u, x, _, R);
    const S = new l(s.HEAPF32.buffer, R, T).slice();
    return s._free(R), {
      name: c,
      array: S,
      itemSize: f
    };
  }
  function r(s, a) {
    switch (a) {
      case Float32Array:
        return s.DT_FLOAT32;
      case Int8Array:
        return s.DT_INT8;
      case Int16Array:
        return s.DT_INT16;
      case Int32Array:
        return s.DT_INT32;
      case Uint8Array:
        return s.DT_UINT8;
      case Uint16Array:
        return s.DT_UINT16;
      case Uint32Array:
        return s.DT_UINT32;
    }
  }
}
class Ee extends Error {
  constructor(e, t, o) {
    super(t), this.url = e, this.cause = o, this.name = "NetworkError";
  }
}
class hn {
  constructor() {
    Q(this, "_gltfLoader");
    Q(this, "_usdzLoader");
    const e = new an();
    e.setDecoderPath("../draco/"), this._gltfLoader = new Et(), this._gltfLoader.setDRACOLoader(e), this._usdzLoader = new on();
  }
  async _loadFile(e) {
    const t = await fetch(e);
    if (!t.ok)
      throw new Ee(e, `Failed to fetch file from ${e}`);
    try {
      return await t.arrayBuffer();
    } catch {
      throw new Ee(e, `Failed to fetch file from ${e}`);
    }
  }
  async load(e) {
    const t = yt(e);
    if (t.length === 0)
      throw new Ae("No file extension found in URI", "");
    if (!wt(t))
      throw new Ae(
        `Unsupported file type: ${t}. Supported types: ${_t.join(", ")}`,
        t
      );
    const o = await this._loadFile(e);
    try {
      switch (t) {
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
      throw n instanceof Error ? new Te(
        `Failed to parse ${t} file: ${n.message}`,
        n
      ) : new Te(`Failed to parse ${t} file`);
    }
  }
}
export {
  hn as AssetLoader
};
