var ve = Object.defineProperty;
var Be = (d, e, t) => e in d ? ve(d, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[e] = t;
var v = (d, e, t) => Be(d, typeof e != "symbol" ? e + "" : e, t);
import { TrianglesDrawMode as je, TriangleFanDrawMode as re, TriangleStripDrawMode as be, Loader as ae, LoaderUtils as X, FileLoader as K, MeshPhysicalMaterial as O, Vector2 as q, Color as U, LinearSRGBColorSpace as D, SRGBColorSpace as N, SpotLight as Ke, PointLight as Ve, DirectionalLight as We, Matrix4 as Y, Vector3 as B, Quaternion as Le, InstancedMesh as Xe, InstancedBufferAttribute as ze, Object3D as ce, TextureLoader as Me, ImageBitmapLoader as qe, BufferAttribute as P, InterleavedBuffer as Ye, InterleavedBufferAttribute as Je, LinearMipmapLinearFilter as Ie, NearestMipmapLinearFilter as Qe, LinearMipmapNearestFilter as Ze, NearestMipmapNearestFilter as $e, LinearFilter as Ce, NearestFilter as et, RepeatWrapping as J, MirroredRepeatWrapping as Ne, ClampToEdgeWrapping as De, PointsMaterial as tt, Material as Z, LineBasicMaterial as nt, MeshStandardMaterial as Oe, DoubleSide as st, MeshBasicMaterial as W, PropertyBinding as rt, BufferGeometry as ue, SkinnedMesh as ot, Mesh as Pe, LineSegments as it, Line as at, LineLoop as ct, Points as ut, Group as z, PerspectiveCamera as lt, MathUtils as ft, OrthographicCamera as dt, Skeleton as ht, AnimationClip as pt, Bone as mt, InterpolateDiscrete as gt, InterpolateLinear as ke, Texture as de, VectorKeyframeTrack as he, NumberKeyframeTrack as pe, QuaternionKeyframeTrack as me, ColorManagement as ge, FrontSide as At, Interpolant as Tt, Box3 as yt, Sphere as xt, NoColorSpace as H } from "three";
import { u as Rt, a as Ae } from "./fflate.module-xyO_T3Zm.mjs";
import { S as _t } from "./FileTypes-DliuedHo.mjs";
import { g as wt, i as Et } from "./isFileTypeSupported-BSpswPHU.mjs";
import { F as Te, P as ye } from "./parse-error-DfOPyLWM.mjs";
import { A as xe } from "./AssetCache-DSsEDIOY.mjs";
function Re(d, e) {
  if (e === je)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), d;
  if (e === re || e === be) {
    let t = d.getIndex();
    if (t === null) {
      const n = [], a = d.getAttribute("position");
      if (a !== void 0) {
        for (let i = 0; i < a.count; i++)
          n.push(i);
        d.setIndex(n), t = d.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), d;
    }
    const o = t.count - 2, s = [];
    if (e === re)
      for (let n = 1; n <= o; n++)
        s.push(t.getX(0)), s.push(t.getX(n)), s.push(t.getX(n + 1));
    else
      for (let n = 0; n < o; n++)
        n % 2 === 0 ? (s.push(t.getX(n)), s.push(t.getX(n + 1)), s.push(t.getX(n + 2))) : (s.push(t.getX(n + 2)), s.push(t.getX(n + 1)), s.push(t.getX(n)));
    s.length / 3 !== o && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = d.clone();
    return r.setIndex(s), r.clearGroups(), r;
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
  load(e, t, o, s) {
    const r = this;
    let n;
    if (this.resourcePath !== "")
      n = this.resourcePath;
    else if (this.path !== "") {
      const c = X.extractUrlBase(e);
      n = X.resolveURL(c, this.path);
    } else
      n = X.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(c) {
      s ? s(c) : console.error(c), r.manager.itemError(e), r.manager.itemEnd(e);
    }, i = new K(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, function(c) {
      try {
        r.parse(c, n, function(u) {
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
  parse(e, t, o, s) {
    let r;
    const n = {}, a = {}, i = new TextDecoder();
    if (typeof e == "string")
      r = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (i.decode(new Uint8Array(e, 0, 4)) === Fe) {
        try {
          n[b.KHR_BINARY_GLTF] = new Vt(e);
        } catch (l) {
          s && s(l);
          return;
        }
        r = JSON.parse(n[b.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(i.decode(e));
    else
      r = e;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
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
      l.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[l.name] = l, n[l.name] = !0;
    }
    if (r.extensionsUsed)
      for (let u = 0; u < r.extensionsUsed.length; ++u) {
        const l = r.extensionsUsed[u], f = r.extensionsRequired || [];
        switch (l) {
          case b.KHR_MATERIALS_UNLIT:
            n[l] = new Mt();
            break;
          case b.KHR_DRACO_MESH_COMPRESSION:
            n[l] = new Wt(r, this.dracoLoader);
            break;
          case b.KHR_TEXTURE_TRANSFORM:
            n[l] = new Xt();
            break;
          case b.KHR_MESH_QUANTIZATION:
            n[l] = new zt();
            break;
          default:
            f.indexOf(l) >= 0 && a[l] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + l + '".');
        }
      }
    c.setExtensions(n), c.setPlugins(a), c.parse(o, s);
  }
  parseAsync(e, t) {
    const o = this;
    return new Promise(function(s, r) {
      o.parse(e, t, s, r);
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
    for (let o = 0, s = t.length; o < s; o++) {
      const r = t[o];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, o = "light:" + e;
    let s = t.cache.get(o);
    if (s) return s;
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
    return c.position.set(0, 0, 0), c.decay = 2, F(c, i), i.intensity !== void 0 && (c.intensity = i.intensity), c.name = t.createUniqueName(i.name || "light_" + e), s = Promise.resolve(c), t.cache.add(o, s), s;
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
    const s = [];
    e.color = new U(1, 1, 1), e.opacity = 1;
    const r = t.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const n = r.baseColorFactor;
        e.color.setRGB(n[0], n[1], n[2], D), e.opacity = n[3];
      }
      r.baseColorTexture !== void 0 && s.push(o.assignTexture(e, "map", r.baseColorTexture, N));
    }
    return Promise.all(s);
  }
}
class It {
  constructor(e) {
    this.parser = e, this.name = b.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name].emissiveStrength;
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], n = s.extensions[this.name];
    if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && r.push(o.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && r.push(o.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (r.push(o.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
      const a = n.clearcoatNormalTexture.scale;
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], n = s.extensions[this.name];
    return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && r.push(o.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && r.push(o.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(r);
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [];
    t.sheenColor = new U(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const n = s.extensions[this.name];
    if (n.sheenColorFactor !== void 0) {
      const a = n.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], D);
    }
    return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && r.push(o.assignTexture(t, "sheenColorMap", n.sheenColorTexture, N)), n.sheenRoughnessTexture !== void 0 && r.push(o.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(r);
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], n = s.extensions[this.name];
    return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && r.push(o.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(r);
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], n = s.extensions[this.name];
    t.thickness = n.thicknessFactor !== void 0 ? n.thicknessFactor : 0, n.thicknessTexture !== void 0 && r.push(o.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || 1 / 0;
    const a = n.attenuationColor || [1, 1, 1];
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
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], n = s.extensions[this.name];
    t.specularIntensity = n.specularFactor !== void 0 ? n.specularFactor : 1, n.specularTexture !== void 0 && r.push(o.assignTexture(t, "specularIntensityMap", n.specularTexture));
    const a = n.specularColorFactor || [1, 1, 1];
    return t.specularColor = new U().setRGB(a[0], a[1], a[2], D), n.specularColorTexture !== void 0 && r.push(o.assignTexture(t, "specularColorMap", n.specularColorTexture, N)), Promise.all(r);
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], n = s.extensions[this.name];
    return t.bumpScale = n.bumpFactor !== void 0 ? n.bumpFactor : 1, n.bumpTexture !== void 0 && r.push(o.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(r);
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
    const o = this.parser, s = o.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], n = s.extensions[this.name];
    return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && r.push(o.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(r);
  }
}
class Gt {
  constructor(e) {
    this.parser = e, this.name = b.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, o = t.json, s = o.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const r = s.extensions[this.name], n = t.options.ktx2Loader;
    if (!n) {
      if (o.extensionsRequired && o.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, r.source, n);
  }
}
class vt {
  constructor(e) {
    this.parser = e, this.name = b.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, o = this.parser, s = o.json, r = s.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const n = r.extensions[t], a = s.images[n.source];
    let i = o.textureLoader;
    if (a.uri) {
      const c = o.options.manager.getHandler(a.uri);
      c !== null && (i = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return o.loadTextureImage(e, n.source, i);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
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
    const t = this.name, o = this.parser, s = o.json, r = s.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const n = r.extensions[t], a = s.images[n.source];
    let i = o.textureLoader;
    if (a.uri) {
      const c = o.options.manager.getHandler(a.uri);
      c !== null && (i = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return o.loadTextureImage(e, n.source, i);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
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
      const s = o.extensions[this.name], r = this.parser.getDependency("buffer", s.buffer), n = this.parser.options.meshoptDecoder;
      if (!n || !n.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function(a) {
        const i = s.byteOffset || 0, c = s.byteLength || 0, u = s.count, l = s.byteStride, f = new Uint8Array(a, i, c);
        return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(u, l, f, s.mode, s.filter).then(function(m) {
          return m.buffer;
        }) : n.ready.then(function() {
          const m = new ArrayBuffer(u * l);
          return n.decodeGltfBuffer(new Uint8Array(m), u, l, f, s.mode, s.filter), m;
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
    const s = t.meshes[o.mesh];
    for (const c of s.primitives)
      if (c.mode !== C.TRIANGLES && c.mode !== C.TRIANGLE_STRIP && c.mode !== C.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const n = o.extensions[this.name].attributes, a = [], i = {};
    for (const c in n)
      a.push(this.parser.getDependency("accessor", n[c]).then((u) => (i[c] = u, i[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((c) => {
      const u = c.pop(), l = u.isGroup ? u.children : [u], f = c[0].count, m = [];
      for (const T of l) {
        const R = new Y(), y = new B(), x = new Le(), E = new B(1, 1, 1), S = new Xe(T.geometry, T.material, f);
        for (let _ = 0; _ < f; _++)
          i.TRANSLATION && y.fromBufferAttribute(i.TRANSLATION, _), i.ROTATION && x.fromBufferAttribute(i.ROTATION, _), i.SCALE && E.fromBufferAttribute(i.SCALE, _), S.setMatrixAt(_, R.compose(y, x, E));
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
    const s = this.header.length - V, r = new DataView(e, V);
    let n = 0;
    for (; n < s; ) {
      const a = r.getUint32(n, !0);
      n += 4;
      const i = r.getUint32(n, !0);
      if (n += 4, i === _e.JSON) {
        const c = new Uint8Array(e, V + n, a);
        this.content = o.decode(c);
      } else if (i === _e.BIN) {
        const c = V + n;
        this.body = e.slice(c, c + a);
      }
      n += a;
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
    const o = this.json, s = this.dracoLoader, r = e.extensions[this.name].bufferView, n = e.extensions[this.name].attributes, a = {}, i = {}, c = {};
    for (const u in n) {
      const l = oe[u] || u.toLowerCase();
      a[l] = n[u];
    }
    for (const u in e.attributes) {
      const l = oe[u] || u.toLowerCase();
      if (n[u] !== void 0) {
        const f = o.accessors[e.attributes[u]], m = j[f.componentType];
        c[l] = m.name, i[l] = f.normalized === !0;
      }
    }
    return t.getDependency("bufferView", r).then(function(u) {
      return new Promise(function(l, f) {
        s.decodeDracoFile(u, function(m) {
          for (const T in m.attributes) {
            const R = m.attributes[T], y = i[T];
            y !== void 0 && (R.normalized = y);
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
  constructor(e, t, o, s) {
    super(e, t, o, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, o = this.sampleValues, s = this.valueSize, r = e * s * 3 + s;
    for (let n = 0; n !== s; n++)
      t[n] = o[r + n];
    return t;
  }
  interpolate_(e, t, o, s) {
    const r = this.resultBuffer, n = this.sampleValues, a = this.valueSize, i = a * 2, c = a * 3, u = s - t, l = (o - t) / u, f = l * l, m = f * l, T = e * c, R = T - c, y = -2 * m + 3 * f, x = m - f, E = 1 - y, S = x - f + l;
    for (let _ = 0; _ !== a; _++) {
      const M = n[R + _ + a], I = n[R + _ + i] * u, L = n[T + _ + a], h = n[T + _] * u;
      r[_] = E * M + S * I + y * L + x * h;
    }
    return r;
  }
}
const qt = new Le();
class Yt extends Ue {
  interpolate_(e, t, o, s) {
    const r = super.interpolate_(e, t, o, s);
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
  let o = !1, s = !1, r = !1;
  for (let c = 0, u = e.length; c < u; c++) {
    const l = e[c];
    if (l.POSITION !== void 0 && (o = !0), l.NORMAL !== void 0 && (s = !0), l.COLOR_0 !== void 0 && (r = !0), o && s && r) break;
  }
  if (!o && !s && !r) return Promise.resolve(d);
  const n = [], a = [], i = [];
  for (let c = 0, u = e.length; c < u; c++) {
    const l = e[c];
    if (o) {
      const f = l.POSITION !== void 0 ? t.getDependency("accessor", l.POSITION) : d.attributes.position;
      n.push(f);
    }
    if (s) {
      const f = l.NORMAL !== void 0 ? t.getDependency("accessor", l.NORMAL) : d.attributes.normal;
      a.push(f);
    }
    if (r) {
      const f = l.COLOR_0 !== void 0 ? t.getDependency("accessor", l.COLOR_0) : d.attributes.color;
      i.push(f);
    }
  }
  return Promise.all([
    Promise.all(n),
    Promise.all(a),
    Promise.all(i)
  ]).then(function(c) {
    const u = c[0], l = c[1], f = c[2];
    return o && (d.morphAttributes.position = u), s && (d.morphAttributes.normal = l), r && (d.morphAttributes.color = f), d.morphTargetsRelative = !0, d;
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
      for (let o = 0, s = t.length; o < s; o++)
        d.morphTargetDictionary[t[o]] = o;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function en(d) {
  let e;
  const t = d.extensions && d.extensions[b.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + te(t.attributes) : e = d.indices + ":" + te(d.attributes) + ":" + d.mode, d.targets !== void 0)
    for (let o = 0, s = d.targets.length; o < s; o++)
      e += ":" + te(d.targets[o]);
  return e;
}
function te(d) {
  let e = "";
  const t = Object.keys(d).sort();
  for (let o = 0, s = t.length; o < s; o++)
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
    let o = !1, s = !1, r = -1;
    typeof navigator < "u" && (o = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, s = navigator.userAgent.indexOf("Firefox") > -1, r = s ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || o || s && r < 98 ? this.textureLoader = new Me(this.options.manager) : this.textureLoader = new qe(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new K(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const o = this, s = this.json, r = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(n) {
      return n._markDefs && n._markDefs();
    }), Promise.all(this._invokeAll(function(n) {
      return n.beforeRoot && n.beforeRoot();
    })).then(function() {
      return Promise.all([
        o.getDependencies("scene"),
        o.getDependencies("animation"),
        o.getDependencies("camera")
      ]);
    }).then(function(n) {
      const a = {
        scene: n[0][s.scene || 0],
        scenes: n[0],
        animations: n[1],
        cameras: n[2],
        asset: s.asset,
        parser: o,
        userData: {}
      };
      return G(r, a, s), F(a, s), Promise.all(o._invokeAll(function(i) {
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
    for (let s = 0, r = t.length; s < r; s++) {
      const n = t[s].joints;
      for (let a = 0, i = n.length; a < i; a++)
        e[n[a]].isBone = !0;
    }
    for (let s = 0, r = e.length; s < r; s++) {
      const n = e[s];
      n.mesh !== void 0 && (this._addNodeRef(this.meshCache, n.mesh), n.skin !== void 0 && (o[n.mesh].isSkinnedMesh = !0)), n.camera !== void 0 && this._addNodeRef(this.cameraCache, n.camera);
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
    const s = o.clone(), r = (n, a) => {
      const i = this.associations.get(n);
      i != null && this.associations.set(a, i);
      for (const [c, u] of n.children.entries())
        r(u, a.children[c]);
    };
    return r(o, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let o = 0; o < t.length; o++) {
      const s = e(t[o]);
      if (s) return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const o = [];
    for (let s = 0; s < t.length; s++) {
      const r = e(t[s]);
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
    let s = this.cache.get(o);
    if (!s) {
      switch (e) {
        case "scene":
          s = this.loadScene(t);
          break;
        case "node":
          s = this._invokeOne(function(r) {
            return r.loadNode && r.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(r) {
            return r.loadMesh && r.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(r) {
            return r.loadBufferView && r.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(r) {
            return r.loadMaterial && r.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(r) {
            return r.loadTexture && r.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(r) {
            return r.loadAnimation && r.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(r) {
            return r != this && r.getDependency && r.getDependency(e, t);
          }), !s)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(o, s);
    }
    return s;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const o = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(r, n) {
        return o.getDependency(e, n);
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
    const s = this.options;
    return new Promise(function(r, n) {
      o.load(X.resolveURL(t.uri, s.path), r, void 0, function() {
        n(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
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
      const s = t.byteLength || 0, r = t.byteOffset || 0;
      return o.slice(r, r + s);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, o = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const n = $[s.type], a = j[s.componentType], i = s.normalized === !0, c = new a(s.count * n);
      return Promise.resolve(new P(c, n, i));
    }
    const r = [];
    return s.bufferView !== void 0 ? r.push(this.getDependency("bufferView", s.bufferView)) : r.push(null), s.sparse !== void 0 && (r.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(r).then(function(n) {
      const a = n[0], i = $[s.type], c = j[s.componentType], u = c.BYTES_PER_ELEMENT, l = u * i, f = s.byteOffset || 0, m = s.bufferView !== void 0 ? o.bufferViews[s.bufferView].byteStride : void 0, T = s.normalized === !0;
      let R, y;
      if (m && m !== l) {
        const x = Math.floor(f / m), E = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + x + ":" + s.count;
        let S = t.cache.get(E);
        S || (R = new c(a, x * m, s.count * m / u), S = new Ye(R, m / u), t.cache.add(E, S)), y = new Je(S, i, f % m / u, T);
      } else
        a === null ? R = new c(s.count * i) : R = new c(a, f, s.count * i), y = new P(R, i, T);
      if (s.sparse !== void 0) {
        const x = $.SCALAR, E = j[s.sparse.indices.componentType], S = s.sparse.indices.byteOffset || 0, _ = s.sparse.values.byteOffset || 0, M = new E(n[1], S, s.sparse.count * x), I = new c(n[2], _, s.sparse.count * i);
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
    const t = this.json, o = this.options, r = t.textures[e].source, n = t.images[r];
    let a = this.textureLoader;
    if (n.uri) {
      const i = o.manager.getHandler(n.uri);
      i !== null && (a = i);
    }
    return this.loadTextureImage(e, r, a);
  }
  loadTextureImage(e, t, o) {
    const s = this, r = this.json, n = r.textures[e], a = r.images[t], i = (a.uri || a.bufferView) + ":" + n.sampler;
    if (this.textureCache[i])
      return this.textureCache[i];
    const c = this.loadImageSource(t, o).then(function(u) {
      u.flipY = !1, u.name = n.name || a.name || "", u.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (u.name = a.uri);
      const f = (r.samplers || {})[n.sampler] || {};
      return u.magFilter = we[f.magFilter] || Ce, u.minFilter = we[f.minFilter] || Ie, u.wrapS = Ee[f.wrapS] || J, u.wrapT = Ee[f.wrapT] || J, s.associations.set(u, { textures: e }), u;
    }).catch(function() {
      return null;
    });
    return this.textureCache[i] = c, c;
  }
  loadImageSource(e, t) {
    const o = this, s = this.json, r = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((l) => l.clone());
    const n = s.images[e], a = self.URL || self.webkitURL;
    let i = n.uri || "", c = !1;
    if (n.bufferView !== void 0)
      i = o.getDependency("bufferView", n.bufferView).then(function(l) {
        c = !0;
        const f = new Blob([l], { type: n.mimeType });
        return i = a.createObjectURL(f), i;
      });
    else if (n.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const u = Promise.resolve(i).then(function(l) {
      return new Promise(function(f, m) {
        let T = f;
        t.isImageBitmapLoader === !0 && (T = function(R) {
          const y = new de(R);
          y.needsUpdate = !0, f(y);
        }), t.load(X.resolveURL(l, r.path), T, void 0, m);
      });
    }).then(function(l) {
      return c === !0 && a.revokeObjectURL(i), l.userData.mimeType = n.mimeType || tn(n.uri), l;
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
  assignTexture(e, t, o, s) {
    const r = this;
    return this.getDependency("texture", o.index).then(function(n) {
      if (!n) return null;
      if (o.texCoord !== void 0 && o.texCoord > 0 && (n = n.clone(), n.channel = o.texCoord), r.extensions[b.KHR_TEXTURE_TRANSFORM]) {
        const a = o.extensions !== void 0 ? o.extensions[b.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const i = r.associations.get(n);
          n = r.extensions[b.KHR_TEXTURE_TRANSFORM].extendTexture(n, a), r.associations.set(n, i);
        }
      }
      return s !== void 0 && (n.colorSpace = s), e[t] = n, n;
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
    const s = t.attributes.tangent === void 0, r = t.attributes.color !== void 0, n = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + o.uuid;
      let i = this.cache.get(a);
      i || (i = new tt(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, i.sizeAttenuation = !1, this.cache.add(a, i)), o = i;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + o.uuid;
      let i = this.cache.get(a);
      i || (i = new nt(), Z.prototype.copy.call(i, o), i.color.copy(o.color), i.map = o.map, this.cache.add(a, i)), o = i;
    }
    if (s || r || n) {
      let a = "ClonedMaterial:" + o.uuid + ":";
      s && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), n && (a += "flat-shading:");
      let i = this.cache.get(a);
      i || (i = o.clone(), r && (i.vertexColors = !0), n && (i.flatShading = !0), s && (i.normalScale && (i.normalScale.y *= -1), i.clearcoatNormalScale && (i.clearcoatNormalScale.y *= -1)), this.cache.add(a, i), this.associations.set(i, this.associations.get(o))), o = i;
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
    const t = this, o = this.json, s = this.extensions, r = o.materials[e];
    let n;
    const a = {}, i = r.extensions || {}, c = [];
    if (i[b.KHR_MATERIALS_UNLIT]) {
      const l = s[b.KHR_MATERIALS_UNLIT];
      n = l.getMaterialType(), c.push(l.extendParams(a, r, t));
    } else {
      const l = r.pbrMetallicRoughness || {};
      if (a.color = new U(1, 1, 1), a.opacity = 1, Array.isArray(l.baseColorFactor)) {
        const f = l.baseColorFactor;
        a.color.setRGB(f[0], f[1], f[2], D), a.opacity = f[3];
      }
      l.baseColorTexture !== void 0 && c.push(t.assignTexture(a, "map", l.baseColorTexture, N)), a.metalness = l.metallicFactor !== void 0 ? l.metallicFactor : 1, a.roughness = l.roughnessFactor !== void 0 ? l.roughnessFactor : 1, l.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(a, "metalnessMap", l.metallicRoughnessTexture)), c.push(t.assignTexture(a, "roughnessMap", l.metallicRoughnessTexture))), n = this._invokeOne(function(f) {
        return f.getMaterialType && f.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(f) {
        return f.extendMaterialParams && f.extendMaterialParams(e, a);
      })));
    }
    r.doubleSided === !0 && (a.side = st);
    const u = r.alphaMode || ee.OPAQUE;
    if (u === ee.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, u === ee.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && n !== W && (c.push(t.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new q(1, 1), r.normalTexture.scale !== void 0)) {
      const l = r.normalTexture.scale;
      a.normalScale.set(l, l);
    }
    if (r.occlusionTexture !== void 0 && n !== W && (c.push(t.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && n !== W) {
      const l = r.emissiveFactor;
      a.emissive = new U().setRGB(l[0], l[1], l[2], D);
    }
    return r.emissiveTexture !== void 0 && n !== W && c.push(t.assignTexture(a, "emissiveMap", r.emissiveTexture, N)), Promise.all(c).then(function() {
      const l = new n(a);
      return r.name && (l.name = r.name), F(l, r), t.associations.set(l, { materials: e }), r.extensions && G(s, l, r), l;
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
    const t = this, o = this.extensions, s = this.primitiveCache;
    function r(a) {
      return o[b.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(i) {
        return Se(i, a, t);
      });
    }
    const n = [];
    for (let a = 0, i = e.length; a < i; a++) {
      const c = e[a], u = en(c), l = s[u];
      if (l)
        n.push(l.promise);
      else {
        let f;
        c.extensions && c.extensions[b.KHR_DRACO_MESH_COMPRESSION] ? f = r(c) : f = Se(new ue(), c, t), s[u] = { primitive: c, promise: f }, n.push(f);
      }
    }
    return Promise.all(n);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, o = this.json, s = this.extensions, r = o.meshes[e], n = r.primitives, a = [];
    for (let i = 0, c = n.length; i < c; i++) {
      const u = n[i].material === void 0 ? Qt(this.cache) : this.getDependency("material", n[i].material);
      a.push(u);
    }
    return a.push(t.loadGeometries(n)), Promise.all(a).then(function(i) {
      const c = i.slice(0, i.length - 1), u = i[i.length - 1], l = [];
      for (let m = 0, T = u.length; m < T; m++) {
        const R = u[m], y = n[m];
        let x;
        const E = c[m];
        if (y.mode === C.TRIANGLES || y.mode === C.TRIANGLE_STRIP || y.mode === C.TRIANGLE_FAN || y.mode === void 0)
          x = r.isSkinnedMesh === !0 ? new ot(R, E) : new Pe(R, E), x.isSkinnedMesh === !0 && x.normalizeSkinWeights(), y.mode === C.TRIANGLE_STRIP ? x.geometry = Re(x.geometry, be) : y.mode === C.TRIANGLE_FAN && (x.geometry = Re(x.geometry, re));
        else if (y.mode === C.LINES)
          x = new it(R, E);
        else if (y.mode === C.LINE_STRIP)
          x = new at(R, E);
        else if (y.mode === C.LINE_LOOP)
          x = new ct(R, E);
        else if (y.mode === C.POINTS)
          x = new ut(R, E);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + y.mode);
        Object.keys(x.geometry.morphAttributes).length > 0 && $t(x, r), x.name = t.createUniqueName(r.name || "mesh_" + e), F(x, r), y.extensions && G(s, x, y), t.assignFinalMaterial(x), l.push(x);
      }
      for (let m = 0, T = l.length; m < T; m++)
        t.associations.set(l[m], {
          meshes: e,
          primitives: m
        });
      if (l.length === 1)
        return r.extensions && G(s, l[0], r), l[0];
      const f = new z();
      r.extensions && G(s, f, r), t.associations.set(f, { meshes: e });
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
    const o = this.json.cameras[e], s = o[o.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return o.type === "perspective" ? t = new lt(ft.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : o.type === "orthographic" && (t = new dt(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), o.name && (t.name = this.createUniqueName(o.name)), F(t, o), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], o = [];
    for (let s = 0, r = t.joints.length; s < r; s++)
      o.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? o.push(this.getDependency("accessor", t.inverseBindMatrices)) : o.push(null), Promise.all(o).then(function(s) {
      const r = s.pop(), n = s, a = [], i = [];
      for (let c = 0, u = n.length; c < u; c++) {
        const l = n[c];
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
    const t = this.json, o = this, s = t.animations[e], r = s.name ? s.name : "animation_" + e, n = [], a = [], i = [], c = [], u = [];
    for (let l = 0, f = s.channels.length; l < f; l++) {
      const m = s.channels[l], T = s.samplers[m.sampler], R = m.target, y = R.node, x = s.parameters !== void 0 ? s.parameters[T.input] : T.input, E = s.parameters !== void 0 ? s.parameters[T.output] : T.output;
      R.node !== void 0 && (n.push(this.getDependency("node", y)), a.push(this.getDependency("accessor", x)), i.push(this.getDependency("accessor", E)), c.push(T), u.push(R));
    }
    return Promise.all([
      Promise.all(n),
      Promise.all(a),
      Promise.all(i),
      Promise.all(c),
      Promise.all(u)
    ]).then(function(l) {
      const f = l[0], m = l[1], T = l[2], R = l[3], y = l[4], x = [];
      for (let E = 0, S = f.length; E < S; E++) {
        const _ = f[E], M = m[E], I = T[E], L = R[E], h = y[E];
        if (_ === void 0) continue;
        _.updateMatrix && _.updateMatrix();
        const p = o._createAnimationTracks(_, M, I, L, h);
        if (p)
          for (let g = 0; g < p.length; g++)
            x.push(p[g]);
      }
      return new pt(r, void 0, x);
    });
  }
  createNodeMesh(e) {
    const t = this.json, o = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : o.getDependency("mesh", s.mesh).then(function(r) {
      const n = o._getNodeRef(o.meshCache, s.mesh, r);
      return s.weights !== void 0 && n.traverse(function(a) {
        if (a.isMesh)
          for (let i = 0, c = s.weights.length; i < c; i++)
            a.morphTargetInfluences[i] = s.weights[i];
      }), n;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const t = this.json, o = this, s = t.nodes[e], r = o._loadNodeShallow(e), n = [], a = s.children || [];
    for (let c = 0, u = a.length; c < u; c++)
      n.push(o.getDependency("node", a[c]));
    const i = s.skin === void 0 ? Promise.resolve(null) : o.getDependency("skin", s.skin);
    return Promise.all([
      r,
      Promise.all(n),
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
    const t = this.json, o = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const r = t.nodes[e], n = r.name ? s.createUniqueName(r.name) : "", a = [], i = s._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return i && a.push(i), r.camera !== void 0 && a.push(s.getDependency("camera", r.camera).then(function(c) {
      return s._getNodeRef(s.cameraCache, r.camera, c);
    })), s._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[e] = Promise.all(a).then(function(c) {
      let u;
      if (r.isBone === !0 ? u = new mt() : c.length > 1 ? u = new z() : c.length === 1 ? u = c[0] : u = new ce(), u !== c[0])
        for (let l = 0, f = c.length; l < f; l++)
          u.add(c[l]);
      if (r.name && (u.userData.name = r.name, u.name = n), F(u, r), r.extensions && G(o, u, r), r.matrix !== void 0) {
        const l = new Y();
        l.fromArray(r.matrix), u.applyMatrix4(l);
      } else
        r.translation !== void 0 && u.position.fromArray(r.translation), r.rotation !== void 0 && u.quaternion.fromArray(r.rotation), r.scale !== void 0 && u.scale.fromArray(r.scale);
      return s.associations.has(u) || s.associations.set(u, {}), s.associations.get(u).nodes = e, u;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, o = this.json.scenes[e], s = this, r = new z();
    o.name && (r.name = s.createUniqueName(o.name)), F(r, o), o.extensions && G(t, r, o);
    const n = o.nodes || [], a = [];
    for (let i = 0, c = n.length; i < c; i++)
      a.push(s.getDependency("node", n[i]));
    return Promise.all(a).then(function(i) {
      for (let u = 0, l = i.length; u < l; u++)
        r.add(i[u]);
      const c = (u) => {
        const l = /* @__PURE__ */ new Map();
        for (const [f, m] of s.associations)
          (f instanceof Z || f instanceof de) && l.set(f, m);
        return u.traverse((f) => {
          const m = s.associations.get(f);
          m != null && l.set(f, m);
        }), l;
      };
      return s.associations = c(r), r;
    });
  }
  _createAnimationTracks(e, t, o, s, r) {
    const n = [], a = e.name ? e.name : e.uuid, i = [];
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
    const u = s.interpolation !== void 0 ? Jt[s.interpolation] : ke, l = this._getArrayFromAccessor(o);
    for (let f = 0, m = i.length; f < m; f++) {
      const T = new c(
        i[f] + "." + k[r.path],
        t.array,
        l,
        u
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(T), n.push(T);
    }
    return n;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const o = ie(t.constructor), s = new Float32Array(t.length);
      for (let r = 0, n = t.length; r < n; r++)
        s[r] = t[r] * o;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(o) {
      const s = this instanceof me ? Yt : Ue;
      return new s(this.times, this.values, this.getValueSize() / 3, o);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function rn(d, e, t) {
  const o = e.attributes, s = new yt();
  if (o.POSITION !== void 0) {
    const a = t.json.accessors[o.POSITION], i = a.min, c = a.max;
    if (i !== void 0 && c !== void 0) {
      if (s.set(
        new B(i[0], i[1], i[2]),
        new B(c[0], c[1], c[2])
      ), a.normalized) {
        const u = ie(j[a.componentType]);
        s.min.multiplyScalar(u), s.max.multiplyScalar(u);
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
            const R = ie(j[f.componentType]);
            i.multiplyScalar(R);
          }
          a.max(i);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(a);
  }
  d.boundingBox = s;
  const n = new xt();
  s.getCenter(n.center), n.radius = s.min.distanceTo(s.max) / 2, d.boundingSphere = n;
}
function Se(d, e, t) {
  const o = e.attributes, s = [];
  function r(n, a) {
    return t.getDependency("accessor", n).then(function(i) {
      d.setAttribute(a, i);
    });
  }
  for (const n in o) {
    const a = oe[n] || n.toLowerCase();
    a in d.attributes || s.push(r(o[n], a));
  }
  if (e.indices !== void 0 && !d.index) {
    const n = t.getDependency("accessor", e.indices).then(function(a) {
      d.setIndex(a);
    });
    s.push(n);
  }
  return ge.workingColorSpace !== D && "COLOR_0" in o && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ge.workingColorSpace}" not supported.`), F(d, e), rn(d, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? Zt(d, e.targets, t) : d;
  });
}
class on {
  parse(e) {
    const t = {}, o = e.split(`
`);
    let s = null, r = t;
    const n = [t];
    for (const a of o)
      if (a.includes("=")) {
        const i = a.split("="), c = i[0].trim(), u = i[1].trim();
        if (u.endsWith("{")) {
          const l = {};
          n.push(l), r[c] = l, r = l;
        } else
          r[c] = u;
      } else if (a.endsWith("{")) {
        const i = r[s] || {};
        n.push(i), r[s] = i, r = i;
      } else if (a.endsWith("}")) {
        if (n.pop(), n.length === 0) continue;
        r = n[n.length - 1];
      } else if (a.endsWith("(")) {
        const i = {};
        n.push(i), s = a.split("(")[0].trim() || s, r[s] = i, r = i;
      } else a.endsWith(")") ? (n.pop(), r = n[n.length - 1]) : s = a.trim();
    return t;
  }
}
class an extends ae {
  constructor(e) {
    super(e);
  }
  load(e, t, o, s) {
    const r = this, n = new K(r.manager);
    n.setPath(r.path), n.setResponseType("arraybuffer"), n.setRequestHeader(r.requestHeader), n.setWithCredentials(r.withCredentials), n.load(e, function(a) {
      try {
        t(r.parse(a));
      } catch (i) {
        s ? s(i) : console.error(i), r.manager.itemError(e);
      }
    }, o, s);
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
          if (s(h[A])) {
            console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
            continue;
          }
          const w = Ae(h[A]);
          p[A] = t.parse(w);
        }
      }
      return p;
    }
    function s(h) {
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
        if (s(h[p]))
          g = !0;
        else
          return h[p];
      g && console.warn("THREE.USDZLoader: Crate files (.usdc or binary .usd) are not supported.");
    }
    const n = Rt(new Uint8Array(e)), a = o(n), i = r(n);
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
    function R(h) {
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
    function x(h, p) {
      p["float inputs:rotation"] && (h.rotation = parseFloat(p["float inputs:rotation"])), p["float2 inputs:scale"] && (h.repeat = new q().fromArray(JSON.parse("[" + p["float2 inputs:scale"].replace(/[()]*/g, "") + "]"))), p["float2 inputs:translation"] && (h.offset = new q().fromArray(JSON.parse("[" + p["float2 inputs:translation"].replace(/[()]*/g, "") + "]")));
    }
    function E(h) {
      const p = new O();
      if (h !== void 0) {
        if ('def Shader "PreviewSurface"' in h) {
          const g = h['def Shader "PreviewSurface"'];
          if ("color3f inputs:diffuseColor.connect" in g) {
            const A = g["color3f inputs:diffuseColor.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.map = _(w), p.map.colorSpace = N, 'def Shader "Transform2d_diffuse"' in h && x(p.map, h['def Shader "Transform2d_diffuse"']);
          } else if ("color3f inputs:diffuseColor" in g) {
            const A = g["color3f inputs:diffuseColor"].replace(/[()]*/g, "");
            p.color.fromArray(JSON.parse("[" + A + "]"));
          }
          if ("color3f inputs:emissiveColor.connect" in g) {
            const A = g["color3f inputs:emissiveColor.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.emissiveMap = _(w), p.emissiveMap.colorSpace = N, p.emissive.set(16777215), 'def Shader "Transform2d_emissive"' in h && x(p.emissiveMap, h['def Shader "Transform2d_emissive"']);
          } else if ("color3f inputs:emissiveColor" in g) {
            const A = g["color3f inputs:emissiveColor"].replace(/[()]*/g, "");
            p.emissive.fromArray(JSON.parse("[" + A + "]"));
          }
          if ("normal3f inputs:normal.connect" in g) {
            const A = g["normal3f inputs:normal.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.normalMap = _(w), p.normalMap.colorSpace = H, 'def Shader "Transform2d_normal"' in h && x(p.normalMap, h['def Shader "Transform2d_normal"']);
          }
          if ("float inputs:roughness.connect" in g) {
            const A = g["float inputs:roughness.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.roughness = 1, p.roughnessMap = _(w), p.roughnessMap.colorSpace = H, 'def Shader "Transform2d_roughness"' in h && x(p.roughnessMap, h['def Shader "Transform2d_roughness"']);
          } else "float inputs:roughness" in g && (p.roughness = parseFloat(g["float inputs:roughness"]));
          if ("float inputs:metallic.connect" in g) {
            const A = g["float inputs:metallic.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.metalness = 1, p.metalnessMap = _(w), p.metalnessMap.colorSpace = H, 'def Shader "Transform2d_metallic"' in h && x(p.metalnessMap, h['def Shader "Transform2d_metallic"']);
          } else "float inputs:metallic" in g && (p.metalness = parseFloat(g["float inputs:metallic"]));
          if ("float inputs:clearcoat.connect" in g) {
            const A = g["float inputs:clearcoat.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.clearcoat = 1, p.clearcoatMap = _(w), p.clearcoatMap.colorSpace = H, 'def Shader "Transform2d_clearcoat"' in h && x(p.clearcoatMap, h['def Shader "Transform2d_clearcoat"']);
          } else "float inputs:clearcoat" in g && (p.clearcoat = parseFloat(g["float inputs:clearcoat"]));
          if ("float inputs:clearcoatRoughness.connect" in g) {
            const A = g["float inputs:clearcoatRoughness.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.clearcoatRoughness = 1, p.clearcoatRoughnessMap = _(w), p.clearcoatRoughnessMap.colorSpace = H, 'def Shader "Transform2d_clearcoatRoughness"' in h && x(p.clearcoatRoughnessMap, h['def Shader "Transform2d_clearcoatRoughness"']);
          } else "float inputs:clearcoatRoughness" in g && (p.clearcoatRoughness = parseFloat(g["float inputs:clearcoatRoughness"]));
          if ("float inputs:ior" in g && (p.ior = parseFloat(g["float inputs:ior"])), "float inputs:occlusion.connect" in g) {
            const A = g["float inputs:occlusion.connect"], w = S(u, /(\w+).output/.exec(A)[1]);
            p.aoMap = _(w), p.aoMap.colorSpace = H, 'def Shader "Transform2d_occlusion"' in h && x(p.aoMap, h['def Shader "Transform2d_occlusion"']);
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
      const p = m(l(h)), g = E(R(h)), A = p ? new Pe(p, g) : new ce();
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
  load(e, t, o, s) {
    const r = new K(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, (n) => {
      this.parse(n, t, s);
    }, o, s);
  }
  parse(e, t, o = () => {
  }) {
    this.decodeDracoFile(e, t, null, null, N).catch(o);
  }
  decodeDracoFile(e, t, o, s, r = D, n = () => {
  }) {
    const a = {
      attributeIDs: o || this.defaultAttributeIDs,
      attributeTypes: s || this.defaultAttributeTypes,
      useUniqueIDs: !!o,
      vertexColorSpace: r
    };
    return this.decodeGeometry(e, a).then(t).catch(n);
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
    let s;
    const r = this.workerNextTaskID++, n = e.byteLength, a = this._getWorker(r, n).then((i) => (s = i, new Promise((c, u) => {
      s._callbacks[r] = { resolve: c, reject: u }, s.postMessage({ type: "decode", id: r, taskConfig: t, buffer: e }, [e]);
    }))).then((i) => this._createGeometry(i.geometry));
    return a.catch(() => !0).then(() => {
      s && r && this._releaseTask(s, r);
    }), ne.set(e, {
      key: o,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const t = new ue();
    e.index && t.setIndex(new P(e.index.array, 1));
    for (let o = 0; o < e.attributes.length; o++) {
      const s = e.attributes[o], r = s.name, n = s.array, a = s.itemSize, i = new P(n, a);
      r === "color" && (this._assignVertexColorSpace(i, s.vertexColorSpace), i.normalized = !(n instanceof Float32Array)), t.setAttribute(r, i);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== N) return;
    const o = new U();
    for (let s = 0, r = e.count; s < r; s++)
      o.fromBufferAttribute(e, s).convertSRGBToLinear(), e.setXYZ(s, o.r, o.g, o.b);
  }
  _loadLibrary(e, t) {
    const o = new K(this.manager);
    return o.setPath(this.decoderPath), o.setResponseType(t), o.setWithCredentials(this.withCredentials), new Promise((s, r) => {
      o.load(e, s, void 0, r);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((o) => {
      const s = o[0];
      e || (this.decoderConfig.wasmBinary = o[1]);
      const r = un.toString(), n = [
        "/* draco decoder */",
        s,
        "",
        "/* worker */",
        r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([n]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const s = new Worker(this.workerSourceURL);
        s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({ type: "init", decoderConfig: this.decoderConfig }), s.onmessage = function(r) {
          const n = r.data;
          switch (n.type) {
            case "decode":
              s._callbacks[n.id].resolve(n);
              break;
            case "error":
              s._callbacks[n.id].reject(n);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + n.type + '"');
          }
        }, this.workerPool.push(s);
      } else
        this.workerPool.sort(function(s, r) {
          return s._taskLoad > r._taskLoad ? -1 : 1;
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
  onmessage = function(n) {
    const a = n.data;
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
            const m = t(l, f, new Int8Array(i), c), T = m.attributes.map((R) => R.array.buffer);
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
  function t(n, a, i, c) {
    const u = c.attributeIDs, l = c.attributeTypes;
    let f, m;
    const T = a.GetEncodedGeometryType(i);
    if (T === n.TRIANGULAR_MESH)
      f = new n.Mesh(), m = a.DecodeArrayToMesh(i, i.byteLength, f);
    else if (T === n.POINT_CLOUD)
      f = new n.PointCloud(), m = a.DecodeArrayToPointCloud(i, i.byteLength, f);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!m.ok() || f.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + m.error_msg());
    const R = { index: null, attributes: [] };
    for (const y in u) {
      const x = self[l[y]];
      let E, S;
      if (c.useUniqueIDs)
        S = u[y], E = a.GetAttributeByUniqueId(f, S);
      else {
        if (S = a.GetAttributeId(f, n[u[y]]), S === -1) continue;
        E = a.GetAttribute(f, S);
      }
      const _ = s(n, a, f, y, x, E);
      y === "color" && (_.vertexColorSpace = c.vertexColorSpace), R.attributes.push(_);
    }
    return T === n.TRIANGULAR_MESH && (R.index = o(n, a, f)), n.destroy(f), R;
  }
  function o(n, a, i) {
    const u = i.num_faces() * 3, l = u * 4, f = n._malloc(l);
    a.GetTrianglesUInt32Array(i, l, f);
    const m = new Uint32Array(n.HEAPF32.buffer, f, u).slice();
    return n._free(f), { array: m, itemSize: 1 };
  }
  function s(n, a, i, c, u, l) {
    const f = l.num_components(), T = i.num_points() * f, R = T * u.BYTES_PER_ELEMENT, y = r(n, u), x = n._malloc(R);
    a.GetAttributeDataArrayForAllPoints(i, l, y, R, x);
    const E = new u(n.HEAPF32.buffer, x, T).slice();
    return n._free(x), {
      name: c,
      array: E,
      itemSize: f
    };
  }
  function r(n, a) {
    switch (a) {
      case Float32Array:
        return n.DT_FLOAT32;
      case Int8Array:
        return n.DT_INT8;
      case Int16Array:
        return n.DT_INT16;
      case Int32Array:
        return n.DT_INT32;
      case Uint8Array:
        return n.DT_UINT8;
      case Uint16Array:
        return n.DT_UINT16;
      case Uint32Array:
        return n.DT_UINT32;
    }
  }
}
function ln() {
  let d, e;
  onmessage = function(n) {
    const a = n.data;
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
              (R) => R.array.buffer
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
  function t(n, a, i, c) {
    const u = c.attributeIDs, l = c.attributeTypes;
    let f, m;
    const T = a.GetEncodedGeometryType(i);
    if (T === n.TRIANGULAR_MESH)
      f = new n.Mesh(), m = a.DecodeArrayToMesh(
        i,
        i.byteLength,
        f
      );
    else if (T === n.POINT_CLOUD)
      f = new n.PointCloud(), m = a.DecodeArrayToPointCloud(
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
    const R = { index: null, attributes: [] };
    for (const y in u) {
      const x = self[l[y]];
      let E, S;
      if (c.useUniqueIDs)
        S = u[y], E = a.GetAttributeByUniqueId(
          f,
          S
        );
      else {
        if (S = a.GetAttributeId(
          f,
          n[u[y]]
        ), S === -1) continue;
        E = a.GetAttribute(f, S);
      }
      const _ = s(
        n,
        a,
        f,
        y,
        x,
        E
      );
      y === "color" && (_.vertexColorSpace = c.vertexColorSpace), R.attributes.push(_);
    }
    return T === n.TRIANGULAR_MESH && (R.index = o(n, a, f)), n.destroy(f), R;
  }
  function o(n, a, i) {
    const u = i.num_faces() * 3, l = u * 4, f = n._malloc(l);
    a.GetTrianglesUInt32Array(i, l, f);
    const m = new Uint32Array(
      n.HEAPF32.buffer,
      f,
      u
    ).slice();
    return n._free(f), { array: m, itemSize: 1 };
  }
  function s(n, a, i, c, u, l) {
    const f = l.num_components(), T = i.num_points() * f, R = T * u.BYTES_PER_ELEMENT, y = r(n, u), x = n._malloc(R);
    a.GetAttributeDataArrayForAllPoints(
      i,
      l,
      y,
      R,
      x
    );
    const E = new u(
      n.HEAPF32.buffer,
      x,
      T
    ).slice();
    return n._free(x), {
      name: c,
      array: E,
      itemSize: f
    };
  }
  function r(n, a) {
    switch (a) {
      case Float32Array:
        return n.DT_FLOAT32;
      case Int8Array:
        return n.DT_INT8;
      case Int16Array:
        return n.DT_INT16;
      case Int32Array:
        return n.DT_INT32;
      case Uint8Array:
        return n.DT_UINT8;
      case Uint16Array:
        return n.DT_UINT16;
      case Uint32Array:
        return n.DT_UINT32;
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
      (s) => {
        const r = s[0];
        t || (this.decoderConfig.wasmBinary = s[1]);
        const n = ln.toString(), a = [
          "/* draco decoder */",
          r,
          "",
          "/* worker */",
          n.substring(n.indexOf("{") + 1, n.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([a]));
      }
    ), this.decoderPending;
  }
}
class yn {
  constructor() {
    v(this, "_gltfLoader");
    v(this, "_usdzLoader");
    const e = new fn();
    e.setDecoderConfig({ type: "wasm" }), this._gltfLoader = new St(), this._gltfLoader.setDRACOLoader(e), this._usdzLoader = new an();
  }
  async load(e) {
    const t = wt(e);
    if (t.length === 0)
      throw new Te("No file extension found in URI", "");
    if (!Et(t))
      throw new Te(
        `Unsupported file type: ${t}. Supported types: ${_t.join(", ")}`,
        t
      );
    const o = xe.read(e);
    if (o)
      return o.arrayBuffer ? this._parse(o.arrayBuffer, t) : o.promise.then((n) => this._parse(n, t));
    const r = await xe.create(e).load();
    return this._parse(r, t);
  }
  /**
   * parse function for the chunk
   * @param arrayBuffer - the array buffer to parse, will be provided within the chunk
   * @param type - the file type of the array buffer
   * @returns the parsed object, will be stored within the    chunk
   */
  async _parse(e, t) {
    try {
      switch (t) {
        case "glb":
        case "gltf":
          return (await this._gltfLoader.parseAsync(
            e,
            ""
          )).scene;
        case "usdz":
          return await this._usdzLoader.parse(e);
      }
    } catch (o) {
      throw o instanceof Error ? new ye(
        `Failed to parse ${t} file: ${o.message}`,
        o
      ) : new ye(`Failed to parse ${t} file`);
    }
  }
}
export {
  yn as A,
  fn as D,
  ln as a
};
