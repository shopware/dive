var ve = Object.defineProperty;
var Be = (d, e, t) => e in d ? ve(d, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[e] = t;
var v = (d, e, t) => Be(d, typeof e != "symbol" ? e + "" : e, t);
import { TrianglesDrawMode as je, TriangleFanDrawMode as re, TriangleStripDrawMode as be, Loader as ae, LoaderUtils as X, FileLoader as K, MeshPhysicalMaterial as O, Vector2 as q, Color as U, LinearSRGBColorSpace as D, SRGBColorSpace as N, SpotLight as Ke, PointLight as Ve, DirectionalLight as We, Matrix4 as Y, Vector3 as B, Quaternion as Le, InstancedMesh as Xe, InstancedBufferAttribute as ze, Object3D as ce, TextureLoader as Me, ImageBitmapLoader as qe, BufferAttribute as P, InterleavedBuffer as Ye, InterleavedBufferAttribute as Je, LinearMipmapLinearFilter as Ie, NearestMipmapLinearFilter as Qe, LinearMipmapNearestFilter as Ze, NearestMipmapNearestFilter as $e, LinearFilter as Ce, NearestFilter as et, RepeatWrapping as J, MirroredRepeatWrapping as Ne, ClampToEdgeWrapping as De, PointsMaterial as tt, Material as Z, LineBasicMaterial as nt, MeshStandardMaterial as Oe, DoubleSide as st, MeshBasicMaterial as W, PropertyBinding as rt, BufferGeometry as ue, SkinnedMesh as ot, Mesh as Pe, LineSegments as it, Line as at, LineLoop as ct, Points as ut, Group as z, PerspectiveCamera as lt, MathUtils as ft, OrthographicCamera as dt, Skeleton as ht, AnimationClip as pt, Bone as mt, InterpolateDiscrete as gt, InterpolateLinear as ke, Texture as de, VectorKeyframeTrack as he, NumberKeyframeTrack as pe, QuaternionKeyframeTrack as me, ColorManagement as ge, FrontSide as At, Interpolant as Tt, Box3 as yt, Sphere as Rt, NoColorSpace as H } from "three";
import { u as xt, a as Ae } from "./fflate.module-xyO_T3Zm.mjs";
import { S as _t } from "./FileTypes-CpKiTXEY.mjs";
import { N as Te, g as wt, i as Et } from "./network-error-CHvryg-4.mjs";
import { F as ye, P as Re } from "./parse-error-BFRJyIxM.mjs";
function xe(d, e) {
  if (e === je)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), d;
  if (e === re || e === be) {
    let t = d.getIndex();
    if (t === null) {
      const s = [], a = d.getAttribute("position");
      if (a !== void 0) {
        for (let i = 0; i < a.count; i++)
          s.push(i);
        d.setIndex(s), t = d.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), d;
    }
    const o = t.count - 2, n = [];
    if (e === re)
      for (let s = 1; s <= o; s++)
        n.push(t.getX(0)), n.push(t.getX(s)), n.push(t.getX(s + 1));
    else
      for (let s = 0; s < o; s++)
        s % 2 === 0 ? (n.push(t.getX(s)), n.push(t.getX(s + 1)), n.push(t.getX(s + 2))) : (n.push(t.getX(s + 2)), n.push(t.getX(s + 1)), n.push(t.getX(s)));
    n.length / 3 !== o && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = d.clone();
    return r.setIndex(n), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), d;
}
class St extends ae {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new Ct(t);
    }), this.register(function(t) {
      return new Gt(t);
    }), this.register(function(t) {
      return new vt(t);
    }), this.register(function(t) {
      return new Bt(t);
    }), this.register(function(t) {
      return new Dt(t);
    }), this.register(function(t) {
      return new Ot(t);
    }), this.register(function(t) {
      return new Pt(t);
    }), this.register(function(t) {
      return new kt(t);
    }), this.register(function(t) {
      return new It(t);
    }), this.register(function(t) {
      return new Ft(t);
    }), this.register(function(t) {
      return new Nt(t);
    }), this.register(function(t) {
      return new Ht(t);
    }), this.register(function(t) {
      return new Ut(t);
    }), this.register(function(t) {
      return new Lt(t);
    }), this.register(function(t) {
      return new jt(t);
    }), this.register(function(t) {
      return new Kt(t);
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
    }, i = new K(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, function(c) {
      try {
        r.parse(c, s, function(u) {
          t(u), r.manager.itemEnd(e);
        }, a);
      } catch (u) {
        a(u);
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
          s[b.KHR_BINARY_GLTF] = new Vt(e);
        } catch (l) {
          n && n(l);
          return;
        }
        r = JSON.parse(s[b.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(i.decode(e));
    else
      r = e;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new sn(r, {
      path: t || this.resourcePath || "",
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
        const l = r.extensionsUsed[u], f = r.extensionsRequired || [];
        switch (l) {
          case b.KHR_MATERIALS_UNLIT:
            s[l] = new Mt();
            break;
          case b.KHR_DRACO_MESH_COMPRESSION:
            s[l] = new Wt(r, this.dracoLoader);
            break;
          case b.KHR_TEXTURE_TRANSFORM:
            s[l] = new Xt();
            break;
          case b.KHR_MESH_QUANTIZATION:
            s[l] = new zt();
            break;
          default:
            f.indexOf(l) >= 0 && a[l] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + l + '".');
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
function bt() {
  let d = {};
  return {
    get: function(e) {
      return d[e];
    },
    add: function(e, t) {
      d[e] = t;
    },
    remove: function(e) {
      delete d[e];
    },
    removeAll: function() {
      d = {};
    }
  };
}
const b = {
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
    this.parser = e, this.name = b.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
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
    const u = new U(16777215);
    i.color !== void 0 && u.setRGB(i.color[0], i.color[1], i.color[2], D);
    const l = i.range !== void 0 ? i.range : 0;
    switch (i.type) {
      case "directional":
        c = new We(u), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new Ve(u), c.distance = l;
        break;
      case "spot":
        c = new Ke(u), c.distance = l, i.spot = i.spot || {}, i.spot.innerConeAngle = i.spot.innerConeAngle !== void 0 ? i.spot.innerConeAngle : 0, i.spot.outerConeAngle = i.spot.outerConeAngle !== void 0 ? i.spot.outerConeAngle : Math.PI / 4, c.angle = i.spot.outerConeAngle, c.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + i.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, F(c, i), i.intensity !== void 0 && (c.intensity = i.intensity), c.name = t.createUniqueName(i.name || "light_" + e), n = Promise.resolve(c), t.cache.add(o, n), n;
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
class Mt {
  constructor() {
    this.name = b.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return W;
  }
  extendParams(e, t, o) {
    const n = [];
    e.color = new U(1, 1, 1), e.opacity = 1;
    const r = t.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const s = r.baseColorFactor;
        e.color.setRGB(s[0], s[1], s[2], D), e.opacity = s[3];
      }
      r.baseColorTexture !== void 0 && n.push(o.assignTexture(e, "map", r.baseColorTexture, N));
    }
    return Promise.all(n);
  }
}
class It {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = n.extensions[this.name].emissiveStrength;
    return r !== void 0 && (t.emissiveIntensity = r), Promise.resolve();
  }
}
class Ct {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    if (s.clearcoatFactor !== void 0 && (t.clearcoat = s.clearcoatFactor), s.clearcoatTexture !== void 0 && r.push(o.assignTexture(t, "clearcoatMap", s.clearcoatTexture)), s.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = s.clearcoatRoughnessFactor), s.clearcoatRoughnessTexture !== void 0 && r.push(o.assignTexture(t, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)), s.clearcoatNormalTexture !== void 0 && (r.push(o.assignTexture(t, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== void 0)) {
      const a = s.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new q(a, a);
    }
    return Promise.all(r);
  }
}
class Nt {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.iridescenceFactor !== void 0 && (t.iridescence = s.iridescenceFactor), s.iridescenceTexture !== void 0 && r.push(o.assignTexture(t, "iridescenceMap", s.iridescenceTexture)), s.iridescenceIor !== void 0 && (t.iridescenceIOR = s.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), s.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = s.iridescenceThicknessMinimum), s.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = s.iridescenceThicknessMaximum), s.iridescenceThicknessTexture !== void 0 && r.push(o.assignTexture(t, "iridescenceThicknessMap", s.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class Dt {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [];
    t.sheenColor = new U(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const s = n.extensions[this.name];
    if (s.sheenColorFactor !== void 0) {
      const a = s.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], D);
    }
    return s.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = s.sheenRoughnessFactor), s.sheenColorTexture !== void 0 && r.push(o.assignTexture(t, "sheenColorMap", s.sheenColorTexture, N)), s.sheenRoughnessTexture !== void 0 && r.push(o.assignTexture(t, "sheenRoughnessMap", s.sheenRoughnessTexture)), Promise.all(r);
  }
}
class Ot {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.transmissionFactor !== void 0 && (t.transmission = s.transmissionFactor), s.transmissionTexture !== void 0 && r.push(o.assignTexture(t, "transmissionMap", s.transmissionTexture)), Promise.all(r);
  }
}
class Pt {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    t.thickness = s.thicknessFactor !== void 0 ? s.thicknessFactor : 0, s.thicknessTexture !== void 0 && r.push(o.assignTexture(t, "thicknessMap", s.thicknessTexture)), t.attenuationDistance = s.attenuationDistance || 1 / 0;
    const a = s.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new U().setRGB(a[0], a[1], a[2], D), Promise.all(r);
  }
}
class kt {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
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
    this.parser = e, this.name = b.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    t.specularIntensity = s.specularFactor !== void 0 ? s.specularFactor : 1, s.specularTexture !== void 0 && r.push(o.assignTexture(t, "specularIntensityMap", s.specularTexture));
    const a = s.specularColorFactor || [1, 1, 1];
    return t.specularColor = new U().setRGB(a[0], a[1], a[2], D), s.specularColorTexture !== void 0 && r.push(o.assignTexture(t, "specularColorMap", s.specularColorTexture, N)), Promise.all(r);
  }
}
class Ut {
  constructor(e) {
    this.parser = e, this.name = b.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
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
    this.parser = e, this.name = b.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const o = this.parser.json.materials[e];
    return !o.extensions || !o.extensions[this.name] ? null : O;
  }
  extendMaterialParams(e, t) {
    const o = this.parser, n = o.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const r = [], s = n.extensions[this.name];
    return s.anisotropyStrength !== void 0 && (t.anisotropy = s.anisotropyStrength), s.anisotropyRotation !== void 0 && (t.anisotropyRotation = s.anisotropyRotation), s.anisotropyTexture !== void 0 && r.push(o.assignTexture(t, "anisotropyMap", s.anisotropyTexture)), Promise.all(r);
  }
}
class Gt {
  constructor(e) {
    this.parser = e, this.name = b.KHR_TEXTURE_BASISU;
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
class vt {
  constructor(e) {
    this.parser = e, this.name = b.EXT_TEXTURE_WEBP, this.isSupported = null;
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
class Bt {
  constructor(e) {
    this.parser = e, this.name = b.EXT_TEXTURE_AVIF, this.isSupported = null;
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
class jt {
  constructor(e) {
    this.name = b.EXT_MESHOPT_COMPRESSION, this.parser = e;
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
        const i = n.byteOffset || 0, c = n.byteLength || 0, u = n.count, l = n.byteStride, f = new Uint8Array(a, i, c);
        return s.decodeGltfBufferAsync ? s.decodeGltfBufferAsync(u, l, f, n.mode, n.filter).then(function(m) {
          return m.buffer;
        }) : s.ready.then(function() {
          const m = new ArrayBuffer(u * l);
          return s.decodeGltfBuffer(new Uint8Array(m), u, l, f, n.mode, n.filter), m;
        });
      });
    } else
      return null;
  }
}
class Kt {
  constructor(e) {
    this.name = b.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, o = t.nodes[e];
    if (!o.extensions || !o.extensions[this.name] || o.mesh === void 0)
      return null;
    const n = t.meshes[o.mesh];
    for (const c of n.primitives)
      if (c.mode !== C.TRIANGLES && c.mode !== C.TRIANGLE_STRIP && c.mode !== C.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const s = o.extensions[this.name].attributes, a = [], i = {};
    for (const c in s)
      a.push(this.parser.getDependency("accessor", s[c]).then((u) => (i[c] = u, i[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((c) => {
      const u = c.pop(), l = u.isGroup ? u.children : [u], f = c[0].count, m = [];
      for (const T of l) {
        const x = new Y(), y = new B(), R = new Le(), E = new B(1, 1, 1), S = new Xe(T.geometry, T.material, f);
        for (let _ = 0; _ < f; _++)
          i.TRANSLATION && y.fromBufferAttribute(i.TRANSLATION, _), i.ROTATION && R.fromBufferAttribute(i.ROTATION, _), i.SCALE && E.fromBufferAttribute(i.SCALE, _), S.setMatrixAt(_, x.compose(y, R, E));
        for (const _ in i)
          if (_ === "_COLOR_0") {
            const M = i[_];
            S.instanceColor = new ze(M.array, M.itemSize, M.normalized);
          } else _ !== "TRANSLATION" && _ !== "ROTATION" && _ !== "SCALE" && T.geometry.setAttribute(_, i[_]);
        ce.prototype.copy.call(S, T), this.parser.assignFinalMaterial(S), m.push(S);
      }
      return u.isGroup ? (u.clear(), u.add(...m), u) : m[0];
    }));
  }
}
const Fe = "glTF", V = 12, _e = { JSON: 1313821514, BIN: 5130562 };
class Vt {
  constructor(e) {
    this.name = b.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, V), o = new TextDecoder();
    if (this.header = {
      magic: o.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Fe)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - V, r = new DataView(e, V);
    let s = 0;
    for (; s < n; ) {
      const a = r.getUint32(s, !0);
      s += 4;
      const i = r.getUint32(s, !0);
      if (s += 4, i === _e.JSON) {
        const c = new Uint8Array(e, V + s, a);
        this.content = o.decode(c);
      } else if (i === _e.BIN) {
        const c = V + s;
        this.body = e.slice(c, c + a);
      }
      s += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Wt {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = b.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const o = this.json, n = this.dracoLoader, r = e.extensions[this.name].bufferView, s = e.extensions[this.name].attributes, a = {}, i = {}, c = {};
    for (const u in s) {
      const l = oe[u] || u.toLowerCase();
      a[l] = s[u];
    }
    for (const u in e.attributes) {
      const l = oe[u] || u.toLowerCase();
      if (s[u] !== void 0) {
        const f = o.accessors[e.attributes[u]], m = j[f.componentType];
        c[l] = m.name, i[l] = f.normalized === !0;
      }
    }
    return t.getDependency("bufferView", r).then(function(u) {
      return new Promise(function(l, f) {
        n.decodeDracoFile(u, function(m) {
          for (const T in m.attributes) {
            const x = m.attributes[T], y = i[T];
            y !== void 0 && (x.normalized = y);
          }
          l(m);
        }, a, c, D, f);
      });
    });
  }
}
class Xt {
  constructor() {
    this.name = b.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class zt {
  constructor() {
    this.name = b.KHR_MESH_QUANTIZATION;
  }
}
class Ue extends Tt {
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
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, i = a * 2, c = a * 3, u = n - t, l = (o - t) / u, f = l * l, m = f * l, T = e * c, x = T - c, y = -2 * m + 3 * f, R = m - f, E = 1 - y, S = R - f + l;
    for (let _ = 0; _ !== a; _++) {
      const M = s[x + _ + a], I = s[x + _ + i] * u, L = s[T + _ + a], h = s[T + _] * u;
      r[_] = E * M + S * I + y * L + R * h;
    }
    return r;
  }
}
const qt = new Le();
class Yt extends Ue {
  interpolate_(e, t, o, n) {
    const r = super.interpolate_(e, t, o, n);
    return qt.fromArray(r).normalize().toArray(r), r;
  }
}
const C = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, j = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, we = {
  9728: et,
  9729: Ce,
  9984: $e,
  9985: Ze,
  9986: Qe,
  9987: Ie
}, Ee = {
  33071: De,
  33648: Ne,
  10497: J
}, $ = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, oe = {
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
}, k = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Jt = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: ke,
  STEP: gt
}, ee = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Qt(d) {
  return d.DefaultMaterial === void 0 && (d.DefaultMaterial = new Oe({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: At
  })), d.DefaultMaterial;
}
function G(d, e, t) {
  for (const o in t.extensions)
    d[o] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[o] = t.extensions[o]);
}
function F(d, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(d.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Zt(d, e, t) {
  let o = !1, n = !1, r = !1;
  for (let c = 0, u = e.length; c < u; c++) {
    const l = e[c];
    if (l.POSITION !== void 0 && (o = !0), l.NORMAL !== void 0 && (n = !0), l.COLOR_0 !== void 0 && (r = !0), o && n && r) break;
  }
  if (!o && !n && !r) return Promise.resolve(d);
  const s = [], a = [], i = [];
  for (let c = 0, u = e.length; c < u; c++) {
    const l = e[c];
    if (o) {
      const f = l.POSITION !== void 0 ? t.getDependency("accessor", l.POSITION) : d.attributes.position;
      s.push(f);
    }
    if (n) {
      const f = l.NORMAL !== void 0 ? t.getDependency("accessor", l.NORMAL) : d.attributes.normal;
      a.push(f);
    }
    if (r) {
      const f = l.COLOR_0 !== void 0 ? t.getDependency("accessor", l.COLOR_0) : d.attributes.color;
      i.push(f);
    }
  }
  return Promise.all([
    Promise.all(s),
    Promise.all(a),
    Promise.all(i)
  ]).then(function(c) {
    const u = c[0], l = c[1], f = c[2];
    return o && (d.morphAttributes.position = u), n && (d.morphAttributes.normal = l), r && (d.morphAttributes.color = f), d.morphTargetsRelative = !0, d;
  });
}
function $t(d, e) {
  if (d.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, o = e.weights.length; t < o; t++)
      d.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (d.morphTargetInfluences.length === t.length) {
      d.morphTargetDictionary = {};
      for (let o = 0, n = t.length; o < n; o++)
        d.morphTargetDictionary[t[o]] = o;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function en(d) {
  let e;
  const t = d.extensions && d.extensions[b.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + te(t.attributes) : e = d.indices + ":" + te(d.attributes) + ":" + d.mode, d.targets !== void 0)
    for (let o = 0, n = d.targets.length; o < n; o++)
      e += ":" + te(d.targets[o]);
  return e;
}
function te(d) {
  let e = "";
  const t = Object.keys(d).sort();
  for (let o = 0, n = t.length; o < n; o++)
    e += t[o] + ":" + d[t[o]] + ";";
  return e;
}
function ie(d) {
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
function tn(d) {
  return d.search(/\.jpe?g($|\?)/i) > 0 || d.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : d.search(/\.webp($|\?)/i) > 0 || d.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const nn = new Y();
class sn {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new bt(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let o = !1, n = !1, r = -1;
    typeof navigator < "u" && (o = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, n = navigator.userAgent.indexOf("Firefox") > -1, r = n ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || o || n && r < 98 ? this.textureLoader = new Me(this.options.manager) : this.textureLoader = new qe(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new K(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
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
      return G(r, a, n), F(a, n), Promise.all(o._invokeAll(function(i) {
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
      for (const [c, u] of s.children.entries())
        r(u, a.children[c]);
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
      return Promise.resolve(this.extensions[b.KHR_BINARY_GLTF].body);
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
      const s = $[n.type], a = j[n.componentType], i = n.normalized === !0, c = new a(n.count * s);
      return Promise.resolve(new P(c, s, i));
    }
    const r = [];
    return n.bufferView !== void 0 ? r.push(this.getDependency("bufferView", n.bufferView)) : r.push(null), n.sparse !== void 0 && (r.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(r).then(function(s) {
      const a = s[0], i = $[n.type], c = j[n.componentType], u = c.BYTES_PER_ELEMENT, l = u * i, f = n.byteOffset || 0, m = n.bufferView !== void 0 ? o.bufferViews[n.bufferView].byteStride : void 0, T = n.normalized === !0;
      let x, y;
      if (m && m !== l) {
        const R = Math.floor(f / m), E = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + R + ":" + n.count;
        let S = t.cache.get(E);
        S || (x = new c(a, R * m, n.count * m / u), S = new Ye(x, m / u), t.cache.add(E, S)), y = new Je(S, i, f % m / u, T);
      } else
        a === null ? x = new c(n.count * i) : x = new c(a, f, n.count * i), y = new P(x, i, T);
      if (n.sparse !== void 0) {
        const R = $.SCALAR, E = j[n.sparse.indices.componentType], S = n.sparse.indices.byteOffset || 0, _ = n.sparse.values.byteOffset || 0, M = new E(s[1], S, n.sparse.count * R), I = new c(s[2], _, n.sparse.count * i);
        a !== null && (y = new P(y.array.slice(), y.itemSize, y.normalized));
        for (let L = 0, h = M.length; L < h; L++) {
          const p = M[L];
          if (y.setX(p, I[L * i]), i >= 2 && y.setY(p, I[L * i + 1]), i >= 3 && y.setZ(p, I[L * i + 2]), i >= 4 && y.setW(p, I[L * i + 3]), i >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return y;
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
    const c = this.loadImageSource(t, o).then(function(u) {
      u.flipY = !1, u.name = s.name || a.name || "", u.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (u.name = a.uri);
      const f = (r.samplers || {})[s.sampler] || {};
      return u.magFilter = we[f.magFilter] || Ce, u.minFilter = we[f.minFilter] || Ie, u.wrapS = Ee[f.wrapS] || J, u.wrapT = Ee[f.wrapT] || J, n.associations.set(u, { textures: e }), u;
    }).catch(function() {
      return null;
    });
    return this.textureCache[i] = c, c;
  }
  loadImageSource(e, t) {
    const o = this, n = this.json, r = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((l) => l.clone());
    const s = n.images[e], a = self.URL || self.webkitURL;
    let i = s.uri || "", c = !1;
    if (s.bufferView !== void 0)
      i = o.getDependency("bufferView", s.bufferView).then(function(l) {
        c = !0;
        const f = new Blob([l], { type: s.mimeType });
        return i = a.createObjectURL(f), i;
      });
    else if (s.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const u = Promise.resolve(i).then(function(l) {
      return new Promise(function(f, m) {
        let T = f;
        t.isImageBitmapLoader === !0 && (T = function(x) {
          const y = new de(x);
          y.needsUpdate = !0, f(y);
        }), t.load(X.resolveURL(l, r.path), T, void 0, m);
      });
    }).then(function(l) {
      return c === !0 && a.revokeObjectURL(i), l.userData.mimeType = s.mimeType || tn(s.uri), l;
    }).catch(function(l) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", i), l;
    });
    return this.sourceCache[e] = u, u;
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
      if (o.texCoord !== void 0 && o.texCoord > 0 && (s = s.clone(), s.channel = o.texCoord), r.extensions[b.KHR_TEXTURE_TRANSFORM]) {
        const a = o.extensions !== void 0 ? o.extensions[b.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const i = r.associations.get(s);
          s = r.extensions[b.KHR_TEXTURE_TRANSFORM].extendTexture(s, a), r.associations.set(s, i);
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
      i || (i = new tt(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, i.sizeAttenuation = !1, this.cache.add(a, i)), o = i;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + o.uuid;
      let i = this.cache.get(a);
      i || (i = new nt(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, this.cache.add(a, i)), o = i;
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
    if (i[b.KHR_MATERIALS_UNLIT]) {
      const l = n[b.KHR_MATERIALS_UNLIT];
      s = l.getMaterialType(), c.push(l.extendParams(a, r, t));
    } else {
      const l = r.pbrMetallicRoughness || {};
      if (a.color = new U(1, 1, 1), a.opacity = 1, Array.isArray(l.baseColorFactor)) {
        const f = l.baseColorFactor;
        a.color.setRGB(f[0], f[1], f[2], D), a.opacity = f[3];
      }
      l.baseColorTexture !== void 0 && c.push(t.assignTexture(a, "map", l.baseColorTexture, N)), a.metalness = l.metallicFactor !== void 0 ? l.metallicFactor : 1, a.roughness = l.roughnessFactor !== void 0 ? l.roughnessFactor : 1, l.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(a, "metalnessMap", l.metallicRoughnessTexture)), c.push(t.assignTexture(a, "roughnessMap", l.metallicRoughnessTexture))), s = this._invokeOne(function(f) {
        return f.getMaterialType && f.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(f) {
        return f.extendMaterialParams && f.extendMaterialParams(e, a);
      })));
    }
    r.doubleSided === !0 && (a.side = st);
    const u = r.alphaMode || ee.OPAQUE;
    if (u === ee.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, u === ee.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && s !== W && (c.push(t.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new q(1, 1), r.normalTexture.scale !== void 0)) {
      const l = r.normalTexture.scale;
      a.normalScale.set(l, l);
    }
    if (r.occlusionTexture !== void 0 && s !== W && (c.push(t.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && s !== W) {
      const l = r.emissiveFactor;
      a.emissive = new U().setRGB(l[0], l[1], l[2], D);
    }
    return r.emissiveTexture !== void 0 && s !== W && c.push(t.assignTexture(a, "emissiveMap", r.emissiveTexture, N)), Promise.all(c).then(function() {
      const l = new s(a);
      return r.name && (l.name = r.name), F(l, r), t.associations.set(l, { materials: e }), r.extensions && G(n, l, r), l;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = rt.sanitizeNodeName(e || "");
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
      return o[b.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(i) {
        return Se(i, a, t);
      });
    }
    const s = [];
    for (let a = 0, i = e.length; a < i; a++) {
      const c = e[a], u = en(c), l = n[u];
      if (l)
        s.push(l.promise);
      else {
        let f;
        c.extensions && c.extensions[b.KHR_DRACO_MESH_COMPRESSION] ? f = r(c) : f = Se(new ue(), c, t), n[u] = { primitive: c, promise: f }, s.push(f);
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
      const u = s[i].material === void 0 ? Qt(this.cache) : this.getDependency("material", s[i].material);
      a.push(u);
    }
    return a.push(t.loadGeometries(s)), Promise.all(a).then(function(i) {
      const c = i.slice(0, i.length - 1), u = i[i.length - 1], l = [];
      for (let m = 0, T = u.length; m < T; m++) {
        const x = u[m], y = s[m];
        let R;
        const E = c[m];
        if (y.mode === C.TRIANGLES || y.mode === C.TRIANGLE_STRIP || y.mode === C.TRIANGLE_FAN || y.mode === void 0)
          R = r.isSkinnedMesh === !0 ? new ot(x, E) : new Pe(x, E), R.isSkinnedMesh === !0 && R.normalizeSkinWeights(), y.mode === C.TRIANGLE_STRIP ? R.geometry = xe(R.geometry, be) : y.mode === C.TRIANGLE_FAN && (R.geometry = xe(R.geometry, re));
        else if (y.mode === C.LINES)
          R = new it(x, E);
        else if (y.mode === C.LINE_STRIP)
          R = new at(x, E);
        else if (y.mode === C.LINE_LOOP)
          R = new ct(x, E);
        else if (y.mode === C.POINTS)
          R = new ut(x, E);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + y.mode);
        Object.keys(R.geometry.morphAttributes).length > 0 && $t(R, r), R.name = t.createUniqueName(r.name || "mesh_" + e), F(R, r), y.extensions && G(n, R, y), t.assignFinalMaterial(R), l.push(R);
      }
      for (let m = 0, T = l.length; m < T; m++)
        t.associations.set(l[m], {
          meshes: e,
          primitives: m
        });
      if (l.length === 1)
        return r.extensions && G(n, l[0], r), l[0];
      const f = new z();
      r.extensions && G(n, f, r), t.associations.set(f, { meshes: e });
      for (let m = 0, T = l.length; m < T; m++)
        f.add(l[m]);
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
    return o.type === "perspective" ? t = new lt(ft.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : o.type === "orthographic" && (t = new dt(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), o.name && (t.name = this.createUniqueName(o.name)), F(t, o), Promise.resolve(t);
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
      for (let c = 0, u = s.length; c < u; c++) {
        const l = s[c];
        if (l) {
          a.push(l);
          const f = new Y();
          r !== null && f.fromArray(r.array, c * 16), i.push(f);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new ht(a, i);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, o = this, n = t.animations[e], r = n.name ? n.name : "animation_" + e, s = [], a = [], i = [], c = [], u = [];
    for (let l = 0, f = n.channels.length; l < f; l++) {
      const m = n.channels[l], T = n.samplers[m.sampler], x = m.target, y = x.node, R = n.parameters !== void 0 ? n.parameters[T.input] : T.input, E = n.parameters !== void 0 ? n.parameters[T.output] : T.output;
      x.node !== void 0 && (s.push(this.getDependency("node", y)), a.push(this.getDependency("accessor", R)), i.push(this.getDependency("accessor", E)), c.push(T), u.push(x));
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(a),
      Promise.all(i),
      Promise.all(c),
      Promise.all(u)
    ]).then(function(l) {
      const f = l[0], m = l[1], T = l[2], x = l[3], y = l[4], R = [];
      for (let E = 0, S = f.length; E < S; E++) {
        const _ = f[E], M = m[E], I = T[E], L = x[E], h = y[E];
        if (_ === void 0) continue;
        _.updateMatrix && _.updateMatrix();
        const p = o._createAnimationTracks(_, M, I, L, h);
        if (p)
          for (let g = 0; g < p.length; g++)
            R.push(p[g]);
      }
      return new pt(r, void 0, R);
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
    for (let c = 0, u = a.length; c < u; c++)
      s.push(o.getDependency("node", a[c]));
    const i = n.skin === void 0 ? Promise.resolve(null) : o.getDependency("skin", n.skin);
    return Promise.all([
      r,
      Promise.all(s),
      i
    ]).then(function(c) {
      const u = c[0], l = c[1], f = c[2];
      f !== null && u.traverse(function(m) {
        m.isSkinnedMesh && m.bind(f, nn);
      });
      for (let m = 0, T = l.length; m < T; m++)
        u.add(l[m]);
      return u;
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
      let u;
      if (r.isBone === !0 ? u = new mt() : c.length > 1 ? u = new z() : c.length === 1 ? u = c[0] : u = new ce(), u !== c[0])
        for (let l = 0, f = c.length; l < f; l++)
          u.add(c[l]);
      if (r.name && (u.userData.name = r.name, u.name = s), F(u, r), r.extensions && G(o, u, r), r.matrix !== void 0) {
        const l = new Y();
        l.fromArray(r.matrix), u.applyMatrix4(l);
      } else
        r.translation !== void 0 && u.position.fromArray(r.translation), r.rotation !== void 0 && u.quaternion.fromArray(r.rotation), r.scale !== void 0 && u.scale.fromArray(r.scale);
      return n.associations.has(u) || n.associations.set(u, {}), n.associations.get(u).nodes = e, u;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, o = this.json.scenes[e], n = this, r = new z();
    o.name && (r.name = n.createUniqueName(o.name)), F(r, o), o.extensions && G(t, r, o);
    const s = o.nodes || [], a = [];
    for (let i = 0, c = s.length; i < c; i++)
      a.push(n.getDependency("node", s[i]));
    return Promise.all(a).then(function(i) {
      for (let u = 0, l = i.length; u < l; u++)
        r.add(i[u]);
      const c = (u) => {
        const l = /* @__PURE__ */ new Map();
        for (const [f, m] of n.associations)
          (f instanceof Z || f instanceof de) && l.set(f, m);
        return u.traverse((f) => {
          const m = n.associations.get(f);
          m != null && l.set(f, m);
        }), l;
      };
      return n.associations = c(r), r;
    });
  }
  _createAnimationTracks(e, t, o, n, r) {
    const s = [], a = e.name ? e.name : e.uuid, i = [];
    k[r.path] === k.weights ? e.traverse(function(f) {
      f.morphTargetInfluences && i.push(f.name ? f.name : f.uuid);
    }) : i.push(a);
    let c;
    switch (k[r.path]) {
      case k.weights:
        c = pe;
        break;
      case k.rotation:
        c = me;
        break;
      case k.position:
      case k.scale:
        c = he;
        break;
      default:
        switch (o.itemSize) {
          case 1:
            c = pe;
            break;
          case 2:
          case 3:
          default:
            c = he;
            break;
        }
        break;
    }
    const u = n.interpolation !== void 0 ? Jt[n.interpolation] : ke, l = this._getArrayFromAccessor(o);
    for (let f = 0, m = i.length; f < m; f++) {
      const T = new c(
        i[f] + "." + k[r.path],
        t.array,
        l,
        u
      );
      n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(T), s.push(T);
    }
    return s;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const o = ie(t.constructor), n = new Float32Array(t.length);
      for (let r = 0, s = t.length; r < s; r++)
        n[r] = t[r] * o;
      t = n;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(o) {
      const n = this instanceof me ? Yt : Ue;
      return new n(this.times, this.values, this.getValueSize() / 3, o);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function rn(d, e, t) {
  const o = e.attributes, n = new yt();
  if (o.POSITION !== void 0) {
    const a = t.json.accessors[o.POSITION], i = a.min, c = a.max;
    if (i !== void 0 && c !== void 0) {
      if (n.set(
        new B(i[0], i[1], i[2]),
        new B(c[0], c[1], c[2])
      ), a.normalized) {
        const u = ie(j[a.componentType]);
        n.min.multiplyScalar(u), n.max.multiplyScalar(u);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = e.targets;
  if (r !== void 0) {
    const a = new B(), i = new B();
    for (let c = 0, u = r.length; c < u; c++) {
      const l = r[c];
      if (l.POSITION !== void 0) {
        const f = t.json.accessors[l.POSITION], m = f.min, T = f.max;
        if (m !== void 0 && T !== void 0) {
          if (i.setX(Math.max(Math.abs(m[0]), Math.abs(T[0]))), i.setY(Math.max(Math.abs(m[1]), Math.abs(T[1]))), i.setZ(Math.max(Math.abs(m[2]), Math.abs(T[2]))), f.normalized) {
            const x = ie(j[f.componentType]);
            i.multiplyScalar(x);
          }
          a.max(i);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(a);
  }
  d.boundingBox = n;
  const s = new Rt();
  n.getCenter(s.center), s.radius = n.min.distanceTo(n.max) / 2, d.boundingSphere = s;
}
function Se(d, e, t) {
  const o = e.attributes, n = [];
  function r(s, a) {
    return t.getDependency("accessor", s).then(function(i) {
      d.setAttribute(a, i);
    });
  }
  for (const s in o) {
    const a = oe[s] || s.toLowerCase();
    a in d.attributes || n.push(r(o[s], a));
  }
  if (e.indices !== void 0 && !d.index) {
    const s = t.getDependency("accessor", e.indices).then(function(a) {
      d.setIndex(a);
    });
    n.push(s);
  }
  return ge.workingColorSpace !== D && "COLOR_0" in o && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ge.workingColorSpace}" not supported.`), F(d, e), rn(d, e, t), Promise.all(n).then(function() {
    return e.targets !== void 0 ? Zt(d, e.targets, t) : d;
  });
}
class on {
  parse(e) {
    const t = {}, o = e.split(`
`);
    let n = null, r = t;
    const s = [t];
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
    return t;
  }
}
class an extends ae {
  constructor(e) {
    super(e);
  }
  load(e, t, o, n) {
    const r = this, s = new K(r.manager);
    s.setPath(r.path), s.setResponseType("arraybuffer"), s.setRequestHeader(r.requestHeader), s.setWithCredentials(r.withCredentials), s.load(e, function(a) {
      try {
        t(r.parse(a));
      } catch (i) {
        n ? n(i) : console.error(i), r.manager.itemError(e);
      }
    }, o, n);
  }
  parse(e) {
    const t = new on();
    function o(h) {
      const p = {};
      new K().setResponseType("arraybuffer");
      for (const A in h) {
        if (A.endsWith("png")) {
          const w = new Blob([h[A]], { type: { type: "image/png" } });
          p[A] = URL.createObjectURL(w);
        }
        if (A.endsWith("usd") || A.endsWith("usda")) {
          if (n(h[A])) {
            console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
            continue;
          }
          const w = Ae(h[A]);
          p[A] = t.parse(w);
        }
      }
      return p;
    }
    function n(h) {
      const p = h.slice(0, 7), g = new Uint8Array([80, 88, 82, 45, 85, 83, 68, 67]);
      return p.every((A, w) => A === g[w]);
    }
    function r(h) {
      if (h.length < 1) return;
      const p = Object.keys(h)[0];
      let g = !1;
      if (p.endsWith("usda")) return h[p];
      if (p.endsWith("usdc"))
        g = !0;
      else if (p.endsWith("usd"))
        if (n(h[p]))
          g = !0;
        else
          return h[p];
      g && console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
    }
    const s = xt(new Uint8Array(e)), a = o(s), i = r(s);
    if (i === void 0)
      return console.warn("THREE.USDZLoader: No usda file found."), new z();
    const c = Ae(i), u = t.parse(c);
    function l(h) {
      if (h) {
        if ("prepend references" in h) {
          const g = h["prepend references"].split("@"), A = g[1].replace(/^.\//, ""), w = g[2].replace(/^<\//, "").replace(/>$/, "");
          return f(a[A], w);
        }
        return f(h);
      }
    }
    function f(h, p) {
      if (h) {
        if (p !== void 0) {
          const g = `def Mesh "${p}"`;
          if (g in h)
            return h[g];
        }
        for (const g in h) {
          const A = h[g];
          if (g.startsWith("def Mesh"))
            return "point3f[] points" in h && (A["point3f[] points"] = h["point3f[] points"]), "texCoord2f[] primvars:st" in h && (A["texCoord2f[] primvars:st"] = h["texCoord2f[] primvars:st"]), "int[] primvars:st:indices" in h && (A["int[] primvars:st:indices"] = h["int[] primvars:st:indices"]), A;
          if (typeof A == "object") {
            const w = f(A);
            if (w) return w;
          }
        }
      }
    }
    function m(h) {
      if (!h) return;
      let p = new ue();
      if ("int[] faceVertexIndices" in h) {
        const g = JSON.parse(h["int[] faceVertexIndices"]);
        p.setIndex(g);
      }
      if ("point3f[] points" in h) {
        const g = JSON.parse(h["point3f[] points"].replace(/[()]*/g, "")), A = new P(new Float32Array(g), 3);
        p.setAttribute("position", A);
      }
      if ("normal3f[] normals" in h) {
        const g = JSON.parse(h["normal3f[] normals"].replace(/[()]*/g, "")), A = new P(new Float32Array(g), 3);
        p.setAttribute("normal", A);
      } else
        p.computeVertexNormals();
      if ("float2[] primvars:st" in h && (h["texCoord2f[] primvars:st"] = h["float2[] primvars:st"]), "texCoord2f[] primvars:st" in h) {
        const g = JSON.parse(h["texCoord2f[] primvars:st"].replace(/[()]*/g, "")), A = new P(new Float32Array(g), 2);
        if ("int[] primvars:st:indices" in h) {
          p = p.toNonIndexed();
          const w = JSON.parse(h["int[] primvars:st:indices"]);
          p.setAttribute("uv", T(A, w));
        } else
          p.setAttribute("uv", A);
      }
      return p;
    }
    function T(h, p) {
      const g = h.array, A = h.itemSize, w = new g.constructor(p.length * A);
      let le = 0, He = 0;
      for (let Q = 0, Ge = p.length; Q < Ge; Q++) {
        le = p[Q] * A;
        for (let fe = 0; fe < A; fe++)
          w[He++] = g[le++];
      }
      return new P(w, A);
    }
    function x(h) {
      if (h) {
        if ("rel material:binding" in h) {
          const A = h["rel material:binding"].replace(/^<\//, "").replace(/>$/, "").split("/");
          return y(u, ` "${A[1]}"`);
        }
        return y(h);
      }
    }
    function y(h, p = "") {
      for (const g in h) {
        const A = h[g];
        if (g.startsWith("def Material" + p))
          return A;
        if (typeof A == "object") {
          const w = y(A, p);
          if (w) return w;
        }
      }
    }
    function R(h, p) {
      p["float inputs:rotation"] && (h.rotation = parseFloat(p["float inputs:rotation"])), p["float2 inputs:scale"] && (h.repeat = new q().fromArray(JSON.parse("[" + p["float2 inputs:scale"].replace(/[()]*/g, "") + "]"))), p["float2 inputs:translation"] && (h.offset = new q().fromArray(JSON.parse("[" + p["float2 inputs:translation"].replace(/[()]*/g, "") + "]")));
    }
    function E(h) {
      const p = new O();
      if (h !== void 0) {
        if ('def Shader "PreviewSurface"' in h) {
          const g = h['def Shader "PreviewSurface"'];
          if ("color3f inputs:diffuseColor.connect" in g) {
            const A = g["color3f inputs:diffuseColor.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.map = _(w), p.map.colorSpace = N, 'def Shader "Transform2d_diffuse"' in h && R(p.map, h['def Shader "Transform2d_diffuse"']);
          } else if ("color3f inputs:diffuseColor" in g) {
            const A = g["color3f inputs:diffuseColor"].replace(/[()]*/g, "");
            p.color.fromArray(JSON.parse("[" + A + "]"));
          }
          if ("color3f inputs:emissiveColor.connect" in g) {
            const A = g["color3f inputs:emissiveColor.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.emissiveMap = _(w), p.emissiveMap.colorSpace = N, p.emissive.set(16777215), 'def Shader "Transform2d_emissive"' in h && R(p.emissiveMap, h['def Shader "Transform2d_emissive"']);
          } else if ("color3f inputs:emissiveColor" in g) {
            const A = g["color3f inputs:emissiveColor"].replace(/[()]*/g, "");
            p.emissive.fromArray(JSON.parse("[" + A + "]"));
          }
          if ("normal3f inputs:normal.connect" in g) {
            const A = g["normal3f inputs:normal.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.normalMap = _(w), p.normalMap.colorSpace = H, 'def Shader "Transform2d_normal"' in h && R(p.normalMap, h['def Shader "Transform2d_normal"']);
          }
          if ("float inputs:roughness.connect" in g) {
            const A = g["float inputs:roughness.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.roughness = 1, p.roughnessMap = _(w), p.roughnessMap.colorSpace = H, 'def Shader "Transform2d_roughness"' in h && R(p.roughnessMap, h['def Shader "Transform2d_roughness"']);
          } else "float inputs:roughness" in g && (p.roughness = parseFloat(g["float inputs:roughness"]));
          if ("float inputs:metallic.connect" in g) {
            const A = g["float inputs:metallic.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.metalness = 1, p.metalnessMap = _(w), p.metalnessMap.colorSpace = H, 'def Shader "Transform2d_metallic"' in h && R(p.metalnessMap, h['def Shader "Transform2d_metallic"']);
          } else "float inputs:metallic" in g && (p.metalness = parseFloat(g["float inputs:metallic"]));
          if ("float inputs:clearcoat.connect" in g) {
            const A = g["float inputs:clearcoat.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.clearcoat = 1, p.clearcoatMap = _(w), p.clearcoatMap.colorSpace = H, 'def Shader "Transform2d_clearcoat"' in h && R(p.clearcoatMap, h['def Shader "Transform2d_clearcoat"']);
          } else "float inputs:clearcoat" in g && (p.clearcoat = parseFloat(g["float inputs:clearcoat"]));
          if ("float inputs:clearcoatRoughness.connect" in g) {
            const A = g["float inputs:clearcoatRoughness.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.clearcoatRoughness = 1, p.clearcoatRoughnessMap = _(w), p.clearcoatRoughnessMap.colorSpace = H, 'def Shader "Transform2d_clearcoatRoughness"' in h && R(p.clearcoatRoughnessMap, h['def Shader "Transform2d_clearcoatRoughness"']);
          } else "float inputs:clearcoatRoughness" in g && (p.clearcoatRoughness = parseFloat(g["float inputs:clearcoatRoughness"]));
          if ("float inputs:ior" in g && (p.ior = parseFloat(g["float inputs:ior"])), "float inputs:occlusion.connect" in g) {
            const A = g["float inputs:occlusion.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.aoMap = _(w), p.aoMap.colorSpace = H, 'def Shader "Transform2d_occlusion"' in h && R(p.aoMap, h['def Shader "Transform2d_occlusion"']);
          }
        }
        if ('def Shader "diffuseColor_texture"' in h) {
          const g = h['def Shader "diffuseColor_texture"'];
          p.map = _(g), p.map.colorSpace = N;
        }
        if ('def Shader "normal_texture"' in h) {
          const g = h['def Shader "normal_texture"'];
          p.normalMap = _(g), p.normalMap.colorSpace = H;
        }
      }
      return p;
    }
    function S(h, p) {
      for (const g in h) {
        const A = h[g];
        if (g.startsWith(`def Shader "${p}"`))
          return A;
        if (typeof A == "object") {
          const w = S(A, p);
          if (w) return w;
        }
      }
    }
    function _(h) {
      if ("asset inputs:file" in h) {
        const p = h["asset inputs:file"].replace(/@*/g, ""), A = new Me().load(a[p]), w = {
          '"clamp"': De,
          '"mirror"': Ne,
          '"repeat"': J
        };
        return "token inputs:wrapS" in h && (A.wrapS = w[h["token inputs:wrapS"]]), "token inputs:wrapT" in h && (A.wrapT = w[h["token inputs:wrapT"]]), A;
      }
      return null;
    }
    function M(h) {
      const p = m(l(h)), g = E(x(h)), A = p ? new Pe(p, g) : new ce();
      if ("matrix4d xformOp:transform" in h) {
        const w = JSON.parse("[" + h["matrix4d xformOp:transform"].replace(/[()]*/g, "") + "]");
        A.matrix.fromArray(w), A.matrix.decompose(A.position, A.quaternion, A.scale);
      }
      return A;
    }
    function I(h, p) {
      for (const g in h)
        if (g.startsWith("def Scope"))
          I(h[g], p);
        else if (g.startsWith("def Xform")) {
          const A = M(h[g]);
          /def Xform "(\w+)"/.test(g) && (A.name = /def Xform "(\w+)"/.exec(g)[1]), p.add(A), I(h[g], A);
        }
    }
    const L = new z();
    return I(u, L), L;
  }
}
const ne = /* @__PURE__ */ new WeakMap();
class cn extends ae {
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
    const r = new K(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, (s) => {
      this.parse(s, t, n);
    }, o, n);
  }
  parse(e, t, o = () => {
  }) {
    this.decodeDracoFile(e, t, null, null, N).catch(o);
  }
  decodeDracoFile(e, t, o, n, r = D, s = () => {
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
    const r = this.workerNextTaskID++, s = e.byteLength, a = this._getWorker(r, s).then((i) => (n = i, new Promise((c, u) => {
      n._callbacks[r] = { resolve: c, reject: u }, n.postMessage({ type: "decode", id: r, taskConfig: t, buffer: e }, [e]);
    }))).then((i) => this._createGeometry(i.geometry));
    return a.catch(() => !0).then(() => {
      n && r && this._releaseTask(n, r);
    }), ne.set(e, {
      key: o,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const t = new ue();
    e.index && t.setIndex(new P(e.index.array, 1));
    for (let o = 0; o < e.attributes.length; o++) {
      const n = e.attributes[o], r = n.name, s = n.array, a = n.itemSize, i = new P(s, a);
      r === "color" && (this._assignVertexColorSpace(i, n.vertexColorSpace), i.normalized = !(s instanceof Float32Array)), t.setAttribute(r, i);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== N) return;
    const o = new U();
    for (let n = 0, r = e.count; n < r; n++)
      o.fromBufferAttribute(e, n).convertSRGBToLinear(), e.setXYZ(n, o.r, o.g, o.b);
  }
  _loadLibrary(e, t) {
    const o = new K(this.manager);
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
      const r = un.toString(), s = [
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
function un() {
  let d, e;
  onmessage = function(s) {
    const a = s.data;
    switch (a.type) {
      case "init":
        d = a.decoderConfig, e = new Promise(function(u) {
          d.onModuleLoaded = function(l) {
            u({ draco: l });
          }, DracoDecoderModule(d);
        });
        break;
      case "decode":
        const i = a.buffer, c = a.taskConfig;
        e.then((u) => {
          const l = u.draco, f = new l.Decoder();
          try {
            const m = t(l, f, new Int8Array(i), c), T = m.attributes.map((x) => x.array.buffer);
            m.index && T.push(m.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: m }, T);
          } catch (m) {
            console.error(m), self.postMessage({ type: "error", id: a.id, error: m.message });
          } finally {
            l.destroy(f);
          }
        });
        break;
    }
  };
  function t(s, a, i, c) {
    const u = c.attributeIDs, l = c.attributeTypes;
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
    const x = { index: null, attributes: [] };
    for (const y in u) {
      const R = self[l[y]];
      let E, S;
      if (c.useUniqueIDs)
        S = u[y], E = a.GetAttributeByUniqueId(f, S);
      else {
        if (S = a.GetAttributeId(f, s[u[y]]), S === -1) continue;
        E = a.GetAttribute(f, S);
      }
      const _ = n(s, a, f, y, R, E);
      y === "color" && (_.vertexColorSpace = c.vertexColorSpace), x.attributes.push(_);
    }
    return T === s.TRIANGULAR_MESH && (x.index = o(s, a, f)), s.destroy(f), x;
  }
  function o(s, a, i) {
    const u = i.num_faces() * 3, l = u * 4, f = s._malloc(l);
    a.GetTrianglesUInt32Array(i, l, f);
    const m = new Uint32Array(s.HEAPF32.buffer, f, u).slice();
    return s._free(f), { array: m, itemSize: 1 };
  }
  function n(s, a, i, c, u, l) {
    const f = l.num_components(), T = i.num_points() * f, x = T * u.BYTES_PER_ELEMENT, y = r(s, u), R = s._malloc(x);
    a.GetAttributeDataArrayForAllPoints(i, l, y, x, R);
    const E = new u(s.HEAPF32.buffer, R, T).slice();
    return s._free(R), {
      name: c,
      array: E,
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
function ln() {
  let d, e;
  onmessage = function(s) {
    const a = s.data;
    switch (a.type) {
      case "init":
        d = a.decoderConfig, e = new Promise(function(u) {
          d.onModuleLoaded = function(l) {
            u({ draco: l });
          }, DracoDecoderModule(d);
        });
        break;
      case "decode":
        const i = a.buffer, c = a.taskConfig;
        e.then((u) => {
          const l = u.draco, f = new l.Decoder();
          try {
            const m = t(
              l,
              f,
              new Int8Array(i),
              c
            ), T = m.attributes.map(
              (x) => x.array.buffer
            );
            m.index && T.push(m.index.array.buffer), self.postMessage(
              { type: "decode", id: a.id, geometry: m },
              T
            );
          } catch (m) {
            console.error(m), self.postMessage({
              type: "error",
              id: a.id,
              error: m.message
            });
          } finally {
            l.destroy(f);
          }
        });
        break;
    }
  };
  function t(s, a, i, c) {
    const u = c.attributeIDs, l = c.attributeTypes;
    let f, m;
    const T = a.GetEncodedGeometryType(i);
    if (T === s.TRIANGULAR_MESH)
      f = new s.Mesh(), m = a.DecodeArrayToMesh(
        i,
        i.byteLength,
        f
      );
    else if (T === s.POINT_CLOUD)
      f = new s.PointCloud(), m = a.DecodeArrayToPointCloud(
        i,
        i.byteLength,
        f
      );
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!m.ok() || f.ptr === 0)
      throw new Error(
        "THREE.DRACOLoader: Decoding failed: " + m.error_msg()
      );
    const x = { index: null, attributes: [] };
    for (const y in u) {
      const R = self[l[y]];
      let E, S;
      if (c.useUniqueIDs)
        S = u[y], E = a.GetAttributeByUniqueId(
          f,
          S
        );
      else {
        if (S = a.GetAttributeId(
          f,
          s[u[y]]
        ), S === -1) continue;
        E = a.GetAttribute(f, S);
      }
      const _ = n(
        s,
        a,
        f,
        y,
        R,
        E
      );
      y === "color" && (_.vertexColorSpace = c.vertexColorSpace), x.attributes.push(_);
    }
    return T === s.TRIANGULAR_MESH && (x.index = o(s, a, f)), s.destroy(f), x;
  }
  function o(s, a, i) {
    const u = i.num_faces() * 3, l = u * 4, f = s._malloc(l);
    a.GetTrianglesUInt32Array(i, l, f);
    const m = new Uint32Array(
      s.HEAPF32.buffer,
      f,
      u
    ).slice();
    return s._free(f), { array: m, itemSize: 1 };
  }
  function n(s, a, i, c, u, l) {
    const f = l.num_components(), T = i.num_points() * f, x = T * u.BYTES_PER_ELEMENT, y = r(s, u), R = s._malloc(x);
    a.GetAttributeDataArrayForAllPoints(
      i,
      l,
      y,
      x,
      R
    );
    const E = new u(
      s.HEAPF32.buffer,
      R,
      T
    ).slice();
    return s._free(R), {
      name: c,
      array: E,
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
const se = {
  LOAD_DRACO_JS_DECODER: async () => (await import("./draco_decoder-CEzwqP9o.mjs")).default,
  LOAD_DRACO_WASM_WRAPPER: async () => (await import("./draco_wasm_wrapper-yQy2VLhb.mjs")).default,
  LOAD_DRACO_WASM_DECODER: async () => {
    const d = (await import("./draco_decoder-DtHHc5d0.mjs")).default;
    return await (await fetch(d)).arrayBuffer();
  }
};
class fn extends cn {
  constructor() {
    super(...arguments);
    v(this, "decoderPending", null);
    v(this, "decoderConfig", {
      type: "js",
      wasmBinary: null
    });
    v(this, "workerSourceURL", "");
  }
  async _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const t = typeof WebAssembly != "object" || this.decoderConfig.type === "js", o = [];
    return t ? o.push(
      se.LOAD_DRACO_JS_DECODER()
    ) : (o.push(
      se.LOAD_DRACO_WASM_WRAPPER()
    ), o.push(
      se.LOAD_DRACO_WASM_DECODER()
    )), this.decoderPending = Promise.all(o).then(
      (n) => {
        const r = n[0];
        t || (this.decoderConfig.wasmBinary = n[1]);
        const s = ln.toString(), a = [
          "/* draco decoder */",
          r,
          "",
          "/* worker */",
          s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([a]));
      }
    ), this.decoderPending;
  }
}
class Tn {
  constructor() {
    v(this, "_gltfLoader");
    v(this, "_usdzLoader");
    const e = new fn();
    e.setDecoderConfig({ type: "wasm" }), this._gltfLoader = new St(), this._gltfLoader.setDRACOLoader(e), this._usdzLoader = new an();
  }
  async _loadFile(e) {
    const t = await fetch(e);
    if (!t.ok)
      throw new Te(e, `Failed to fetch file from ${e}`);
    try {
      return await t.arrayBuffer();
    } catch {
      throw new Te(e, `Failed to fetch file from ${e}`);
    }
  }
  async load(e) {
    const t = wt(e);
    if (t.length === 0)
      throw new ye("No file extension found in URI", "");
    if (!Et(t))
      throw new ye(
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
      throw n instanceof Error ? new Re(
        `Failed to parse ${t} file: ${n.message}`,
        n
      ) : new Re(`Failed to parse ${t} file`);
    }
  }
}
export {
  Tn as A,
  fn as D,
  ln as a
};
