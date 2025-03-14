import { C as se, M as Q, V as v, Q as te, B as L, a as G, S as ne, N as re, b as H, R as ie, c as oe, P as D, I as ae, d as Y, e as ce, f as ue, g as le, h as he, L as fe, i as pe, j as de, k as xe, l as ge, m as Te, n as me, G as Me } from "./dive-Mi8g8Khn.js";
import { d as z } from "./TextureUtils-CxpuVgwF.js";
const K = {
  POSITION: [
    "byte",
    "byte normalized",
    "unsigned byte",
    "unsigned byte normalized",
    "short",
    "short normalized",
    "unsigned short",
    "unsigned short normalized"
  ],
  NORMAL: [
    "byte normalized",
    "short normalized"
  ],
  TANGENT: [
    "byte normalized",
    "short normalized"
  ],
  TEXCOORD: [
    "byte",
    "byte normalized",
    "unsigned byte",
    "short",
    "short normalized",
    "unsigned short"
  ]
};
class V {
  constructor() {
    this.pluginCallbacks = [], this.register(function(e) {
      return new Se(e);
    }), this.register(function(e) {
      return new _e(e);
    }), this.register(function(e) {
      return new Fe(e);
    }), this.register(function(e) {
      return new Oe(e);
    }), this.register(function(e) {
      return new ve(e);
    }), this.register(function(e) {
      return new De(e);
    }), this.register(function(e) {
      return new Ce(e);
    }), this.register(function(e) {
      return new Ue(e);
    }), this.register(function(e) {
      return new Be(e);
    }), this.register(function(e) {
      return new Ge(e);
    }), this.register(function(e) {
      return new ze(e);
    }), this.register(function(e) {
      return new Pe(e);
    }), this.register(function(e) {
      return new ke(e);
    });
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  /**
   * Parse scenes and generate GLTF output
   * @param  {Scene or [THREE.Scenes]} input   Scene or Array of THREE.Scenes
   * @param  {Function} onDone  Callback on completed
   * @param  {Function} onError  Callback on errors
   * @param  {Object} options options
   */
  parse(e, s, n, t) {
    const i = new Le(), r = [];
    for (let o = 0, a = this.pluginCallbacks.length; o < a; o++)
      r.push(this.pluginCallbacks[o](i));
    i.setPlugins(r), i.write(e, s, t).catch(n);
  }
  parseAsync(e, s) {
    const n = this;
    return new Promise(function(t, i) {
      n.parse(e, t, i, s);
    });
  }
}
const T = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  ARRAY_BUFFER: 34962,
  ELEMENT_ARRAY_BUFFER: 34963,
  NEAREST: 9728,
  LINEAR: 9729,
  NEAREST_MIPMAP_NEAREST: 9984,
  LINEAR_MIPMAP_NEAREST: 9985,
  NEAREST_MIPMAP_LINEAR: 9986,
  LINEAR_MIPMAP_LINEAR: 9987,
  CLAMP_TO_EDGE: 33071,
  MIRRORED_REPEAT: 33648,
  REPEAT: 10497
}, P = "KHR_mesh_quantization", R = {};
R[ue] = T.NEAREST;
R[le] = T.NEAREST_MIPMAP_NEAREST;
R[he] = T.NEAREST_MIPMAP_LINEAR;
R[fe] = T.LINEAR;
R[pe] = T.LINEAR_MIPMAP_NEAREST;
R[de] = T.LINEAR_MIPMAP_LINEAR;
R[xe] = T.CLAMP_TO_EDGE;
R[ge] = T.REPEAT;
R[Te] = T.MIRRORED_REPEAT;
const q = {
  scale: "scale",
  position: "translation",
  quaternion: "rotation",
  morphTargetInfluences: "weights"
}, ye = new se(), W = 12, we = 1179937895, Ee = 2, X = 8, Ie = 1313821514, Ae = 5130562;
function F(c, e) {
  return c.length === e.length && c.every(function(s, n) {
    return s === e[n];
  });
}
function Re(c) {
  return new TextEncoder().encode(c).buffer;
}
function be(c) {
  return F(c.elements, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
function Ne(c, e, s) {
  const n = {
    min: new Array(c.itemSize).fill(Number.POSITIVE_INFINITY),
    max: new Array(c.itemSize).fill(Number.NEGATIVE_INFINITY)
  };
  for (let t = e; t < e + s; t++)
    for (let i = 0; i < c.itemSize; i++) {
      let r;
      c.itemSize > 4 ? r = c.array[t * c.itemSize + i] : (i === 0 ? r = c.getX(t) : i === 1 ? r = c.getY(t) : i === 2 ? r = c.getZ(t) : i === 3 && (r = c.getW(t)), c.normalized === !0 && (r = H.normalize(r, c.array))), n.min[i] = Math.min(n.min[i], r), n.max[i] = Math.max(n.max[i], r);
    }
  return n;
}
function $(c) {
  return Math.ceil(c / 4) * 4;
}
function k(c, e = 0) {
  const s = $(c.byteLength);
  if (s !== c.byteLength) {
    const n = new Uint8Array(s);
    if (n.set(new Uint8Array(c)), e !== 0)
      for (let t = c.byteLength; t < s; t++)
        n[t] = e;
    return n.buffer;
  }
  return c;
}
function J() {
  return typeof document > "u" && typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1) : document.createElement("canvas");
}
function Z(c, e) {
  if (c.toBlob !== void 0)
    return new Promise((n) => c.toBlob(n, e));
  let s;
  return e === "image/jpeg" ? s = 0.92 : e === "image/webp" && (s = 0.8), c.convertToBlob({
    type: e,
    quality: s
  });
}
class Le {
  constructor() {
    this.plugins = [], this.options = {}, this.pending = [], this.buffers = [], this.byteOffset = 0, this.buffers = [], this.nodeMap = /* @__PURE__ */ new Map(), this.skins = [], this.extensionsUsed = {}, this.extensionsRequired = {}, this.uids = /* @__PURE__ */ new Map(), this.uid = 0, this.json = {
      asset: {
        version: "2.0",
        generator: "THREE.GLTFExporter"
      }
    }, this.cache = {
      meshes: /* @__PURE__ */ new Map(),
      attributes: /* @__PURE__ */ new Map(),
      attributesNormalized: /* @__PURE__ */ new Map(),
      materials: /* @__PURE__ */ new Map(),
      textures: /* @__PURE__ */ new Map(),
      images: /* @__PURE__ */ new Map()
    };
  }
  setPlugins(e) {
    this.plugins = e;
  }
  /**
   * Parse scenes and generate GLTF output
   * @param  {Scene or [THREE.Scenes]} input   Scene or Array of THREE.Scenes
   * @param  {Function} onDone  Callback on completed
   * @param  {Object} options options
   */
  async write(e, s, n = {}) {
    this.options = Object.assign({
      // default options
      binary: !1,
      trs: !1,
      onlyVisible: !0,
      maxTextureSize: 1 / 0,
      animations: [],
      includeCustomExtensions: !1
    }, n), this.options.animations.length > 0 && (this.options.trs = !0), this.processInput(e), await Promise.all(this.pending);
    const t = this, i = t.buffers, r = t.json;
    n = t.options;
    const o = t.extensionsUsed, a = t.extensionsRequired, l = new Blob(i, { type: "application/octet-stream" }), f = Object.keys(o), u = Object.keys(a);
    if (f.length > 0 && (r.extensionsUsed = f), u.length > 0 && (r.extensionsRequired = u), r.buffers && r.buffers.length > 0 && (r.buffers[0].byteLength = l.size), n.binary === !0) {
      const m = new FileReader();
      m.readAsArrayBuffer(l), m.onloadend = function() {
        const h = k(m.result), p = new DataView(new ArrayBuffer(X));
        p.setUint32(0, h.byteLength, !0), p.setUint32(4, Ae, !0);
        const d = k(Re(JSON.stringify(r)), 32), g = new DataView(new ArrayBuffer(X));
        g.setUint32(0, d.byteLength, !0), g.setUint32(4, Ie, !0);
        const y = new ArrayBuffer(W), b = new DataView(y);
        b.setUint32(0, we, !0), b.setUint32(4, Ee, !0);
        const O = W + g.byteLength + d.byteLength + p.byteLength + h.byteLength;
        b.setUint32(8, O, !0);
        const x = new Blob([
          y,
          g,
          d,
          p,
          h
        ], { type: "application/octet-stream" }), M = new FileReader();
        M.readAsArrayBuffer(x), M.onloadend = function() {
          s(M.result);
        };
      };
    } else if (r.buffers && r.buffers.length > 0) {
      const m = new FileReader();
      m.readAsDataURL(l), m.onloadend = function() {
        const h = m.result;
        r.buffers[0].uri = h, s(r);
      };
    } else
      s(r);
  }
  /**
   * Serializes a userData.
   *
   * @param {THREE.Object3D|THREE.Material} object
   * @param {Object} objectDef
   */
  serializeUserData(e, s) {
    if (Object.keys(e.userData).length === 0) return;
    const n = this.options, t = this.extensionsUsed;
    try {
      const i = JSON.parse(JSON.stringify(e.userData));
      if (n.includeCustomExtensions && i.gltfExtensions) {
        s.extensions === void 0 && (s.extensions = {});
        for (const r in i.gltfExtensions)
          s.extensions[r] = i.gltfExtensions[r], t[r] = !0;
        delete i.gltfExtensions;
      }
      Object.keys(i).length > 0 && (s.extras = i);
    } catch (i) {
      console.warn("THREE.GLTFExporter: userData of '" + e.name + "' won't be serialized because of JSON.stringify error - " + i.message);
    }
  }
  /**
   * Returns ids for buffer attributes.
   * @param  {Object} object
   * @return {Integer}
   */
  getUID(e, s = !1) {
    if (this.uids.has(e) === !1) {
      const t = /* @__PURE__ */ new Map();
      t.set(!0, this.uid++), t.set(!1, this.uid++), this.uids.set(e, t);
    }
    return this.uids.get(e).get(s);
  }
  /**
   * Checks if normal attribute values are normalized.
   *
   * @param {BufferAttribute} normal
   * @returns {Boolean}
   */
  isNormalizedNormalAttribute(e) {
    if (this.cache.attributesNormalized.has(e)) return !1;
    const n = new v();
    for (let t = 0, i = e.count; t < i; t++)
      if (Math.abs(n.fromBufferAttribute(e, t).length() - 1) > 5e-4) return !1;
    return !0;
  }
  /**
   * Creates normalized normal buffer attribute.
   *
   * @param {BufferAttribute} normal
   * @returns {BufferAttribute}
   *
   */
  createNormalizedNormalAttribute(e) {
    const s = this.cache;
    if (s.attributesNormalized.has(e)) return s.attributesNormalized.get(e);
    const n = e.clone(), t = new v();
    for (let i = 0, r = n.count; i < r; i++)
      t.fromBufferAttribute(n, i), t.x === 0 && t.y === 0 && t.z === 0 ? t.setX(1) : t.normalize(), n.setXYZ(i, t.x, t.y, t.z);
    return s.attributesNormalized.set(e, n), n;
  }
  /**
   * Applies a texture transform, if present, to the map definition. Requires
   * the KHR_texture_transform extension.
   *
   * @param {Object} mapDef
   * @param {THREE.Texture} texture
   */
  applyTextureTransform(e, s) {
    let n = !1;
    const t = {};
    (s.offset.x !== 0 || s.offset.y !== 0) && (t.offset = s.offset.toArray(), n = !0), s.rotation !== 0 && (t.rotation = s.rotation, n = !0), (s.repeat.x !== 1 || s.repeat.y !== 1) && (t.scale = s.repeat.toArray(), n = !0), n && (e.extensions = e.extensions || {}, e.extensions.KHR_texture_transform = t, this.extensionsUsed.KHR_texture_transform = !0);
  }
  buildMetalRoughTexture(e, s) {
    if (e === s) return e;
    function n(h) {
      return h.colorSpace === ce ? function(d) {
        return d < 0.04045 ? d * 0.0773993808 : Math.pow(d * 0.9478672986 + 0.0521327014, 2.4);
      } : function(d) {
        return d;
      };
    }
    console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."), e instanceof G && (e = z(e)), s instanceof G && (s = z(s));
    const t = e ? e.image : null, i = s ? s.image : null, r = Math.max(t ? t.width : 0, i ? i.width : 0), o = Math.max(t ? t.height : 0, i ? i.height : 0), a = J();
    a.width = r, a.height = o;
    const l = a.getContext("2d");
    l.fillStyle = "#00ffff", l.fillRect(0, 0, r, o);
    const f = l.getImageData(0, 0, r, o);
    if (t) {
      l.drawImage(t, 0, 0, r, o);
      const h = n(e), p = l.getImageData(0, 0, r, o).data;
      for (let d = 2; d < p.length; d += 4)
        f.data[d] = h(p[d] / 256) * 256;
    }
    if (i) {
      l.drawImage(i, 0, 0, r, o);
      const h = n(s), p = l.getImageData(0, 0, r, o).data;
      for (let d = 1; d < p.length; d += 4)
        f.data[d] = h(p[d] / 256) * 256;
    }
    l.putImageData(f, 0, 0);
    const m = (e || s).clone();
    return m.source = new ne(a), m.colorSpace = re, m.channel = (e || s).channel, e && s && e.channel !== s.channel && console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."), m;
  }
  /**
   * Process a buffer to append to the default one.
   * @param  {ArrayBuffer} buffer
   * @return {Integer}
   */
  processBuffer(e) {
    const s = this.json, n = this.buffers;
    return s.buffers || (s.buffers = [{ byteLength: 0 }]), n.push(e), 0;
  }
  /**
   * Process and generate a BufferView
   * @param  {BufferAttribute} attribute
   * @param  {number} componentType
   * @param  {number} start
   * @param  {number} count
   * @param  {number} target (Optional) Target usage of the BufferView
   * @return {Object}
   */
  processBufferView(e, s, n, t, i) {
    const r = this.json;
    r.bufferViews || (r.bufferViews = []);
    let o;
    switch (s) {
      case T.BYTE:
      case T.UNSIGNED_BYTE:
        o = 1;
        break;
      case T.SHORT:
      case T.UNSIGNED_SHORT:
        o = 2;
        break;
      default:
        o = 4;
    }
    let a = e.itemSize * o;
    i === T.ARRAY_BUFFER && (a = Math.ceil(a / 4) * 4);
    const l = $(t * a), f = new DataView(new ArrayBuffer(l));
    let u = 0;
    for (let p = n; p < n + t; p++) {
      for (let d = 0; d < e.itemSize; d++) {
        let g;
        e.itemSize > 4 ? g = e.array[p * e.itemSize + d] : (d === 0 ? g = e.getX(p) : d === 1 ? g = e.getY(p) : d === 2 ? g = e.getZ(p) : d === 3 && (g = e.getW(p)), e.normalized === !0 && (g = H.normalize(g, e.array))), s === T.FLOAT ? f.setFloat32(u, g, !0) : s === T.INT ? f.setInt32(u, g, !0) : s === T.UNSIGNED_INT ? f.setUint32(u, g, !0) : s === T.SHORT ? f.setInt16(u, g, !0) : s === T.UNSIGNED_SHORT ? f.setUint16(u, g, !0) : s === T.BYTE ? f.setInt8(u, g) : s === T.UNSIGNED_BYTE && f.setUint8(u, g), u += o;
      }
      u % a !== 0 && (u += a - u % a);
    }
    const m = {
      buffer: this.processBuffer(f.buffer),
      byteOffset: this.byteOffset,
      byteLength: l
    };
    return i !== void 0 && (m.target = i), i === T.ARRAY_BUFFER && (m.byteStride = a), this.byteOffset += l, r.bufferViews.push(m), {
      id: r.bufferViews.length - 1,
      byteLength: 0
    };
  }
  /**
   * Process and generate a BufferView from an image Blob.
   * @param {Blob} blob
   * @return {Promise<Integer>}
   */
  processBufferViewImage(e) {
    const s = this, n = s.json;
    return n.bufferViews || (n.bufferViews = []), new Promise(function(t) {
      const i = new FileReader();
      i.readAsArrayBuffer(e), i.onloadend = function() {
        const r = k(i.result), o = {
          buffer: s.processBuffer(r),
          byteOffset: s.byteOffset,
          byteLength: r.byteLength
        };
        s.byteOffset += r.byteLength, t(n.bufferViews.push(o) - 1);
      };
    });
  }
  /**
   * Process attribute to generate an accessor
   * @param  {BufferAttribute} attribute Attribute to process
   * @param  {THREE.BufferGeometry} geometry (Optional) Geometry used for truncated draw range
   * @param  {Integer} start (Optional)
   * @param  {Integer} count (Optional)
   * @return {Integer|null} Index of the processed accessor on the "accessors" array
   */
  processAccessor(e, s, n, t) {
    const i = this.json, r = {
      1: "SCALAR",
      2: "VEC2",
      3: "VEC3",
      4: "VEC4",
      9: "MAT3",
      16: "MAT4"
    };
    let o;
    if (e.array.constructor === Float32Array)
      o = T.FLOAT;
    else if (e.array.constructor === Int32Array)
      o = T.INT;
    else if (e.array.constructor === Uint32Array)
      o = T.UNSIGNED_INT;
    else if (e.array.constructor === Int16Array)
      o = T.SHORT;
    else if (e.array.constructor === Uint16Array)
      o = T.UNSIGNED_SHORT;
    else if (e.array.constructor === Int8Array)
      o = T.BYTE;
    else if (e.array.constructor === Uint8Array)
      o = T.UNSIGNED_BYTE;
    else
      throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: " + e.array.constructor.name);
    if (n === void 0 && (n = 0), (t === void 0 || t === 1 / 0) && (t = e.count), t === 0) return null;
    const a = Ne(e, n, t);
    let l;
    s !== void 0 && (l = e === s.index ? T.ELEMENT_ARRAY_BUFFER : T.ARRAY_BUFFER);
    const f = this.processBufferView(e, o, n, t, l), u = {
      bufferView: f.id,
      byteOffset: f.byteOffset,
      componentType: o,
      count: t,
      max: a.max,
      min: a.min,
      type: r[e.itemSize]
    };
    return e.normalized === !0 && (u.normalized = !0), i.accessors || (i.accessors = []), i.accessors.push(u) - 1;
  }
  /**
   * Process image
   * @param  {Image} image to process
   * @param  {Integer} format of the image (RGBAFormat)
   * @param  {Boolean} flipY before writing out the image
   * @param  {String} mimeType export format
   * @return {Integer}     Index of the processed texture in the "images" array
   */
  processImage(e, s, n, t = "image/png") {
    if (e !== null) {
      const i = this, r = i.cache, o = i.json, a = i.options, l = i.pending;
      r.images.has(e) || r.images.set(e, {});
      const f = r.images.get(e), u = t + ":flipY/" + n.toString();
      if (f[u] !== void 0) return f[u];
      o.images || (o.images = []);
      const m = { mimeType: t }, h = J();
      h.width = Math.min(e.width, a.maxTextureSize), h.height = Math.min(e.height, a.maxTextureSize);
      const p = h.getContext("2d");
      if (n === !0 && (p.translate(0, h.height), p.scale(1, -1)), e.data !== void 0) {
        s !== ie && console.error("GLTFExporter: Only RGBAFormat is supported.", s), (e.width > a.maxTextureSize || e.height > a.maxTextureSize) && console.warn("GLTFExporter: Image size is bigger than maxTextureSize", e);
        const g = new Uint8ClampedArray(e.height * e.width * 4);
        for (let y = 0; y < g.length; y += 4)
          g[y + 0] = e.data[y + 0], g[y + 1] = e.data[y + 1], g[y + 2] = e.data[y + 2], g[y + 3] = e.data[y + 3];
        p.putImageData(new ImageData(g, e.width, e.height), 0, 0);
      } else if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
        p.drawImage(e, 0, 0, h.width, h.height);
      else
        throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");
      a.binary === !0 ? l.push(
        Z(h, t).then((g) => i.processBufferViewImage(g)).then((g) => {
          m.bufferView = g;
        })
      ) : h.toDataURL !== void 0 ? m.uri = h.toDataURL(t) : l.push(
        Z(h, t).then((g) => new FileReader().readAsDataURL(g)).then((g) => {
          m.uri = g;
        })
      );
      const d = o.images.push(m) - 1;
      return f[u] = d, d;
    } else
      throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.");
  }
  /**
   * Process sampler
   * @param  {Texture} map Texture to process
   * @return {Integer}     Index of the processed texture in the "samplers" array
   */
  processSampler(e) {
    const s = this.json;
    s.samplers || (s.samplers = []);
    const n = {
      magFilter: R[e.magFilter],
      minFilter: R[e.minFilter],
      wrapS: R[e.wrapS],
      wrapT: R[e.wrapT]
    };
    return s.samplers.push(n) - 1;
  }
  /**
   * Process texture
   * @param  {Texture} map Map to process
   * @return {Integer} Index of the processed texture in the "textures" array
   */
  processTexture(e) {
    const n = this.options, t = this.cache, i = this.json;
    if (t.textures.has(e)) return t.textures.get(e);
    i.textures || (i.textures = []), e instanceof G && (e = z(e, n.maxTextureSize));
    let r = e.userData.mimeType;
    r === "image/webp" && (r = "image/png");
    const o = {
      sampler: this.processSampler(e),
      source: this.processImage(e.image, e.format, e.flipY, r)
    };
    e.name && (o.name = e.name), this._invokeAll(function(l) {
      l.writeTexture && l.writeTexture(e, o);
    });
    const a = i.textures.push(o) - 1;
    return t.textures.set(e, a), a;
  }
  /**
   * Process material
   * @param  {THREE.Material} material Material to process
   * @return {Integer|null} Index of the processed material in the "materials" array
   */
  processMaterial(e) {
    const s = this.cache, n = this.json;
    if (s.materials.has(e)) return s.materials.get(e);
    if (e.isShaderMaterial)
      return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."), null;
    n.materials || (n.materials = []);
    const t = { pbrMetallicRoughness: {} };
    e.isMeshStandardMaterial !== !0 && e.isMeshBasicMaterial !== !0 && console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");
    const i = e.color.toArray().concat([e.opacity]);
    if (F(i, [1, 1, 1, 1]) || (t.pbrMetallicRoughness.baseColorFactor = i), e.isMeshStandardMaterial ? (t.pbrMetallicRoughness.metallicFactor = e.metalness, t.pbrMetallicRoughness.roughnessFactor = e.roughness) : (t.pbrMetallicRoughness.metallicFactor = 0.5, t.pbrMetallicRoughness.roughnessFactor = 0.5), e.metalnessMap || e.roughnessMap) {
      const o = this.buildMetalRoughTexture(e.metalnessMap, e.roughnessMap), a = {
        index: this.processTexture(o),
        channel: o.channel
      };
      this.applyTextureTransform(a, o), t.pbrMetallicRoughness.metallicRoughnessTexture = a;
    }
    if (e.map) {
      const o = {
        index: this.processTexture(e.map),
        texCoord: e.map.channel
      };
      this.applyTextureTransform(o, e.map), t.pbrMetallicRoughness.baseColorTexture = o;
    }
    if (e.emissive) {
      const o = e.emissive;
      if (Math.max(o.r, o.g, o.b) > 0 && (t.emissiveFactor = e.emissive.toArray()), e.emissiveMap) {
        const l = {
          index: this.processTexture(e.emissiveMap),
          texCoord: e.emissiveMap.channel
        };
        this.applyTextureTransform(l, e.emissiveMap), t.emissiveTexture = l;
      }
    }
    if (e.normalMap) {
      const o = {
        index: this.processTexture(e.normalMap),
        texCoord: e.normalMap.channel
      };
      e.normalScale && e.normalScale.x !== 1 && (o.scale = e.normalScale.x), this.applyTextureTransform(o, e.normalMap), t.normalTexture = o;
    }
    if (e.aoMap) {
      const o = {
        index: this.processTexture(e.aoMap),
        texCoord: e.aoMap.channel
      };
      e.aoMapIntensity !== 1 && (o.strength = e.aoMapIntensity), this.applyTextureTransform(o, e.aoMap), t.occlusionTexture = o;
    }
    e.transparent ? t.alphaMode = "BLEND" : e.alphaTest > 0 && (t.alphaMode = "MASK", t.alphaCutoff = e.alphaTest), e.side === oe && (t.doubleSided = !0), e.name !== "" && (t.name = e.name), this.serializeUserData(e, t), this._invokeAll(function(o) {
      o.writeMaterial && o.writeMaterial(e, t);
    });
    const r = n.materials.push(t) - 1;
    return s.materials.set(e, r), r;
  }
  /**
   * Process mesh
   * @param  {THREE.Mesh} mesh Mesh to process
   * @return {Integer|null} Index of the processed mesh in the "meshes" array
   */
  processMesh(e) {
    const s = this.cache, n = this.json, t = [e.geometry.uuid];
    if (Array.isArray(e.material))
      for (let x = 0, M = e.material.length; x < M; x++)
        t.push(e.material[x].uuid);
    else
      t.push(e.material.uuid);
    const i = t.join(":");
    if (s.meshes.has(i)) return s.meshes.get(i);
    const r = e.geometry;
    let o;
    e.isLineSegments ? o = T.LINES : e.isLineLoop ? o = T.LINE_LOOP : e.isLine ? o = T.LINE_STRIP : e.isPoints ? o = T.POINTS : o = e.material.wireframe ? T.LINES : T.TRIANGLES;
    const a = {}, l = {}, f = [], u = [], m = {
      uv: "TEXCOORD_0",
      uv1: "TEXCOORD_1",
      uv2: "TEXCOORD_2",
      uv3: "TEXCOORD_3",
      color: "COLOR_0",
      skinWeight: "WEIGHTS_0",
      skinIndex: "JOINTS_0"
    }, h = r.getAttribute("normal");
    h !== void 0 && !this.isNormalizedNormalAttribute(h) && (console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."), r.setAttribute("normal", this.createNormalizedNormalAttribute(h)));
    let p = null;
    for (let x in r.attributes) {
      if (x.slice(0, 5) === "morph") continue;
      const M = r.attributes[x];
      if (x = m[x] || x.toUpperCase(), /^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(x) || (x = "_" + x), s.attributes.has(this.getUID(M))) {
        l[x] = s.attributes.get(this.getUID(M));
        continue;
      }
      p = null;
      const E = M.array;
      x === "JOINTS_0" && !(E instanceof Uint16Array) && !(E instanceof Uint8Array) && (console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'), p = new L(new Uint16Array(E), M.itemSize, M.normalized));
      const A = this.processAccessor(p || M, r);
      A !== null && (x.startsWith("_") || this.detectMeshQuantization(x, M), l[x] = A, s.attributes.set(this.getUID(M), A));
    }
    if (h !== void 0 && r.setAttribute("normal", h), Object.keys(l).length === 0) return null;
    if (e.morphTargetInfluences !== void 0 && e.morphTargetInfluences.length > 0) {
      const x = [], M = [], w = {};
      if (e.morphTargetDictionary !== void 0)
        for (const E in e.morphTargetDictionary)
          w[e.morphTargetDictionary[E]] = E;
      for (let E = 0; E < e.morphTargetInfluences.length; ++E) {
        const A = {};
        let j = !1;
        for (const _ in r.morphAttributes) {
          if (_ !== "position" && _ !== "normal") {
            j || (console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."), j = !0);
            continue;
          }
          const N = r.morphAttributes[_][E], B = _.toUpperCase(), C = r.attributes[_];
          if (s.attributes.has(this.getUID(N, !0))) {
            A[B] = s.attributes.get(this.getUID(N, !0));
            continue;
          }
          const U = N.clone();
          if (!r.morphTargetsRelative)
            for (let I = 0, ee = N.count; I < ee; I++)
              for (let S = 0; S < N.itemSize; S++)
                S === 0 && U.setX(I, N.getX(I) - C.getX(I)), S === 1 && U.setY(I, N.getY(I) - C.getY(I)), S === 2 && U.setZ(I, N.getZ(I) - C.getZ(I)), S === 3 && U.setW(I, N.getW(I) - C.getW(I));
          A[B] = this.processAccessor(U, r), s.attributes.set(this.getUID(C, !0), A[B]);
        }
        u.push(A), x.push(e.morphTargetInfluences[E]), e.morphTargetDictionary !== void 0 && M.push(w[E]);
      }
      a.weights = x, M.length > 0 && (a.extras = {}, a.extras.targetNames = M);
    }
    const d = Array.isArray(e.material);
    if (d && r.groups.length === 0) return null;
    let g = !1;
    if (d && r.index === null) {
      const x = [];
      for (let M = 0, w = r.attributes.position.count; M < w; M++)
        x[M] = M;
      r.setIndex(x), g = !0;
    }
    const y = d ? e.material : [e.material], b = d ? r.groups : [{ materialIndex: 0, start: void 0, count: void 0 }];
    for (let x = 0, M = b.length; x < M; x++) {
      const w = {
        mode: o,
        attributes: l
      };
      if (this.serializeUserData(r, w), u.length > 0 && (w.targets = u), r.index !== null) {
        let A = this.getUID(r.index);
        (b[x].start !== void 0 || b[x].count !== void 0) && (A += ":" + b[x].start + ":" + b[x].count), s.attributes.has(A) ? w.indices = s.attributes.get(A) : (w.indices = this.processAccessor(r.index, r, b[x].start, b[x].count), s.attributes.set(A, w.indices)), w.indices === null && delete w.indices;
      }
      const E = this.processMaterial(y[b[x].materialIndex]);
      E !== null && (w.material = E), f.push(w);
    }
    g === !0 && r.setIndex(null), a.primitives = f, n.meshes || (n.meshes = []), this._invokeAll(function(x) {
      x.writeMesh && x.writeMesh(e, a);
    });
    const O = n.meshes.push(a) - 1;
    return s.meshes.set(i, O), O;
  }
  /**
   * If a vertex attribute with a
   * [non-standard data type](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#meshes-overview)
   * is used, it is checked whether it is a valid data type according to the
   * [KHR_mesh_quantization](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
   * extension.
   * In this case the extension is automatically added to the list of used extensions.
   *
   * @param {string} attributeName
   * @param {THREE.BufferAttribute} attribute
   */
  detectMeshQuantization(e, s) {
    if (this.extensionsUsed[P]) return;
    let n;
    switch (s.array.constructor) {
      case Int8Array:
        n = "byte";
        break;
      case Uint8Array:
        n = "unsigned byte";
        break;
      case Int16Array:
        n = "short";
        break;
      case Uint16Array:
        n = "unsigned short";
        break;
      default:
        return;
    }
    s.normalized && (n += " normalized");
    const t = e.split("_", 1)[0];
    K[t] && K[t].includes(n) && (this.extensionsUsed[P] = !0, this.extensionsRequired[P] = !0);
  }
  /**
   * Process camera
   * @param  {THREE.Camera} camera Camera to process
   * @return {Integer}      Index of the processed mesh in the "camera" array
   */
  processCamera(e) {
    const s = this.json;
    s.cameras || (s.cameras = []);
    const n = e.isOrthographicCamera, t = {
      type: n ? "orthographic" : "perspective"
    };
    return n ? t.orthographic = {
      xmag: e.right * 2,
      ymag: e.top * 2,
      zfar: e.far <= 0 ? 1e-3 : e.far,
      znear: e.near < 0 ? 0 : e.near
    } : t.perspective = {
      aspectRatio: e.aspect,
      yfov: H.degToRad(e.fov),
      zfar: e.far <= 0 ? 1e-3 : e.far,
      znear: e.near < 0 ? 0 : e.near
    }, e.name !== "" && (t.name = e.type), s.cameras.push(t) - 1;
  }
  /**
   * Creates glTF animation entry from AnimationClip object.
   *
   * Status:
   * - Only properties listed in PATH_PROPERTIES may be animated.
   *
   * @param {THREE.AnimationClip} clip
   * @param {THREE.Object3D} root
   * @return {number|null}
   */
  processAnimation(e, s) {
    const n = this.json, t = this.nodeMap;
    n.animations || (n.animations = []), e = V.Utils.mergeMorphTargetTracks(e.clone(), s);
    const i = e.tracks, r = [], o = [];
    for (let a = 0; a < i.length; ++a) {
      const l = i[a], f = D.parseTrackName(l.name);
      let u = D.findNode(s, f.nodeName);
      const m = q[f.propertyName];
      if (f.objectName === "bones" && (u.isSkinnedMesh === !0 ? u = u.skeleton.getBoneByName(f.objectIndex) : u = void 0), !u || !m)
        return console.warn('THREE.GLTFExporter: Could not export animation track "%s".', l.name), null;
      const h = 1;
      let p = l.values.length / l.times.length;
      m === q.morphTargetInfluences && (p /= u.morphTargetInfluences.length);
      let d;
      l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === !0 ? (d = "CUBICSPLINE", p /= 3) : l.getInterpolation() === ae ? d = "STEP" : d = "LINEAR", o.push({
        input: this.processAccessor(new L(l.times, h)),
        output: this.processAccessor(new L(l.values, p)),
        interpolation: d
      }), r.push({
        sampler: o.length - 1,
        target: {
          node: t.get(u),
          path: m
        }
      });
    }
    return n.animations.push({
      name: e.name || "clip_" + n.animations.length,
      samplers: o,
      channels: r
    }), n.animations.length - 1;
  }
  /**
   * @param {THREE.Object3D} object
   * @return {number|null}
   */
  processSkin(e) {
    const s = this.json, n = this.nodeMap, t = s.nodes[n.get(e)], i = e.skeleton;
    if (i === void 0) return null;
    const r = e.skeleton.bones[0];
    if (r === void 0) return null;
    const o = [], a = new Float32Array(i.bones.length * 16), l = new Q();
    for (let u = 0; u < i.bones.length; ++u)
      o.push(n.get(i.bones[u])), l.copy(i.boneInverses[u]), l.multiply(e.bindMatrix).toArray(a, u * 16);
    return s.skins === void 0 && (s.skins = []), s.skins.push({
      inverseBindMatrices: this.processAccessor(new L(a, 16)),
      joints: o,
      skeleton: n.get(r)
    }), t.skin = s.skins.length - 1;
  }
  /**
   * Process Object3D node
   * @param  {THREE.Object3D} node Object3D to processNode
   * @return {Integer} Index of the node in the nodes list
   */
  processNode(e) {
    const s = this.json, n = this.options, t = this.nodeMap;
    s.nodes || (s.nodes = []);
    const i = {};
    if (n.trs) {
      const o = e.quaternion.toArray(), a = e.position.toArray(), l = e.scale.toArray();
      F(o, [0, 0, 0, 1]) || (i.rotation = o), F(a, [0, 0, 0]) || (i.translation = a), F(l, [1, 1, 1]) || (i.scale = l);
    } else
      e.matrixAutoUpdate && e.updateMatrix(), be(e.matrix) === !1 && (i.matrix = e.matrix.elements);
    if (e.name !== "" && (i.name = String(e.name)), this.serializeUserData(e, i), e.isMesh || e.isLine || e.isPoints) {
      const o = this.processMesh(e);
      o !== null && (i.mesh = o);
    } else e.isCamera && (i.camera = this.processCamera(e));
    if (e.isSkinnedMesh && this.skins.push(e), e.children.length > 0) {
      const o = [];
      for (let a = 0, l = e.children.length; a < l; a++) {
        const f = e.children[a];
        if (f.visible || n.onlyVisible === !1) {
          const u = this.processNode(f);
          u !== null && o.push(u);
        }
      }
      o.length > 0 && (i.children = o);
    }
    this._invokeAll(function(o) {
      o.writeNode && o.writeNode(e, i);
    });
    const r = s.nodes.push(i) - 1;
    return t.set(e, r), r;
  }
  /**
   * Process Scene
   * @param  {Scene} node Scene to process
   */
  processScene(e) {
    const s = this.json, n = this.options;
    s.scenes || (s.scenes = [], s.scene = 0);
    const t = {};
    e.name !== "" && (t.name = e.name), s.scenes.push(t);
    const i = [];
    for (let r = 0, o = e.children.length; r < o; r++) {
      const a = e.children[r];
      if (a.visible || n.onlyVisible === !1) {
        const l = this.processNode(a);
        l !== null && i.push(l);
      }
    }
    i.length > 0 && (t.nodes = i), this.serializeUserData(e, t);
  }
  /**
   * Creates a Scene to hold a list of objects and parse it
   * @param  {Array} objects List of objects to process
   */
  processObjects(e) {
    const s = new Y();
    s.name = "AuxScene";
    for (let n = 0; n < e.length; n++)
      s.children.push(e[n]);
    this.processScene(s);
  }
  /**
   * @param {THREE.Object3D|Array<THREE.Object3D>} input
   */
  processInput(e) {
    const s = this.options;
    e = e instanceof Array ? e : [e], this._invokeAll(function(t) {
      t.beforeParse && t.beforeParse(e);
    });
    const n = [];
    for (let t = 0; t < e.length; t++)
      e[t] instanceof Y ? this.processScene(e[t]) : n.push(e[t]);
    n.length > 0 && this.processObjects(n);
    for (let t = 0; t < this.skins.length; ++t)
      this.processSkin(this.skins[t]);
    for (let t = 0; t < s.animations.length; ++t)
      this.processAnimation(s.animations[t], e[0]);
    this._invokeAll(function(t) {
      t.afterParse && t.afterParse(e);
    });
  }
  _invokeAll(e) {
    for (let s = 0, n = this.plugins.length; s < n; s++)
      e(this.plugins[s]);
  }
}
class Se {
  constructor(e) {
    this.writer = e, this.name = "KHR_lights_punctual";
  }
  writeNode(e, s) {
    if (!e.isLight) return;
    if (!e.isDirectionalLight && !e.isPointLight && !e.isSpotLight) {
      console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.", e);
      return;
    }
    const n = this.writer, t = n.json, i = n.extensionsUsed, r = {};
    e.name && (r.name = e.name), r.color = e.color.toArray(), r.intensity = e.intensity, e.isDirectionalLight ? r.type = "directional" : e.isPointLight ? (r.type = "point", e.distance > 0 && (r.range = e.distance)) : e.isSpotLight && (r.type = "spot", e.distance > 0 && (r.range = e.distance), r.spot = {}, r.spot.innerConeAngle = (1 - e.penumbra) * e.angle, r.spot.outerConeAngle = e.angle), e.decay !== void 0 && e.decay !== 2 && console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."), e.target && (e.target.parent !== e || e.target.position.x !== 0 || e.target.position.y !== 0 || e.target.position.z !== -1) && console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."), i[this.name] || (t.extensions = t.extensions || {}, t.extensions[this.name] = { lights: [] }, i[this.name] = !0);
    const o = t.extensions[this.name].lights;
    o.push(r), s.extensions = s.extensions || {}, s.extensions[this.name] = { light: o.length - 1 };
  }
}
class _e {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_unlit";
  }
  writeMaterial(e, s) {
    if (!e.isMeshBasicMaterial) return;
    const t = this.writer.extensionsUsed;
    s.extensions = s.extensions || {}, s.extensions[this.name] = {}, t[this.name] = !0, s.pbrMetallicRoughness.metallicFactor = 0, s.pbrMetallicRoughness.roughnessFactor = 0.9;
  }
}
class Ce {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_clearcoat";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.clearcoat === 0) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (i.clearcoatFactor = e.clearcoat, e.clearcoatMap) {
      const r = {
        index: n.processTexture(e.clearcoatMap),
        texCoord: e.clearcoatMap.channel
      };
      n.applyTextureTransform(r, e.clearcoatMap), i.clearcoatTexture = r;
    }
    if (i.clearcoatRoughnessFactor = e.clearcoatRoughness, e.clearcoatRoughnessMap) {
      const r = {
        index: n.processTexture(e.clearcoatRoughnessMap),
        texCoord: e.clearcoatRoughnessMap.channel
      };
      n.applyTextureTransform(r, e.clearcoatRoughnessMap), i.clearcoatRoughnessTexture = r;
    }
    if (e.clearcoatNormalMap) {
      const r = {
        index: n.processTexture(e.clearcoatNormalMap),
        texCoord: e.clearcoatNormalMap.channel
      };
      n.applyTextureTransform(r, e.clearcoatNormalMap), i.clearcoatNormalTexture = r;
    }
    s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class Ue {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_iridescence";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.iridescence === 0) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (i.iridescenceFactor = e.iridescence, e.iridescenceMap) {
      const r = {
        index: n.processTexture(e.iridescenceMap),
        texCoord: e.iridescenceMap.channel
      };
      n.applyTextureTransform(r, e.iridescenceMap), i.iridescenceTexture = r;
    }
    if (i.iridescenceIor = e.iridescenceIOR, i.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], i.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1], e.iridescenceThicknessMap) {
      const r = {
        index: n.processTexture(e.iridescenceThicknessMap),
        texCoord: e.iridescenceThicknessMap.channel
      };
      n.applyTextureTransform(r, e.iridescenceThicknessMap), i.iridescenceThicknessTexture = r;
    }
    s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class Fe {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_transmission";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (i.transmissionFactor = e.transmission, e.transmissionMap) {
      const r = {
        index: n.processTexture(e.transmissionMap),
        texCoord: e.transmissionMap.channel
      };
      n.applyTextureTransform(r, e.transmissionMap), i.transmissionTexture = r;
    }
    s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class Oe {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_volume";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (i.thicknessFactor = e.thickness, e.thicknessMap) {
      const r = {
        index: n.processTexture(e.thicknessMap),
        texCoord: e.thicknessMap.channel
      };
      n.applyTextureTransform(r, e.thicknessMap), i.thicknessTexture = r;
    }
    i.attenuationDistance = e.attenuationDistance, i.attenuationColor = e.attenuationColor.toArray(), s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class ve {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_ior";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.ior === 1.5) return;
    const t = this.writer.extensionsUsed, i = {};
    i.ior = e.ior, s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class De {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_specular";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.specularIntensity === 1 && e.specularColor.equals(ye) && !e.specularIntensityMap && !e.specularColorMap) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (e.specularIntensityMap) {
      const r = {
        index: n.processTexture(e.specularIntensityMap),
        texCoord: e.specularIntensityMap.channel
      };
      n.applyTextureTransform(r, e.specularIntensityMap), i.specularTexture = r;
    }
    if (e.specularColorMap) {
      const r = {
        index: n.processTexture(e.specularColorMap),
        texCoord: e.specularColorMap.channel
      };
      n.applyTextureTransform(r, e.specularColorMap), i.specularColorTexture = r;
    }
    i.specularFactor = e.specularIntensity, i.specularColorFactor = e.specularColor.toArray(), s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class Be {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_sheen";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.sheen == 0) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (e.sheenRoughnessMap) {
      const r = {
        index: n.processTexture(e.sheenRoughnessMap),
        texCoord: e.sheenRoughnessMap.channel
      };
      n.applyTextureTransform(r, e.sheenRoughnessMap), i.sheenRoughnessTexture = r;
    }
    if (e.sheenColorMap) {
      const r = {
        index: n.processTexture(e.sheenColorMap),
        texCoord: e.sheenColorMap.channel
      };
      n.applyTextureTransform(r, e.sheenColorMap), i.sheenColorTexture = r;
    }
    i.sheenRoughnessFactor = e.sheenRoughness, i.sheenColorFactor = e.sheenColor.toArray(), s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class Ge {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_anisotropy";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.anisotropy == 0) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (e.anisotropyMap) {
      const r = { index: n.processTexture(e.anisotropyMap) };
      n.applyTextureTransform(r, e.anisotropyMap), i.anisotropyTexture = r;
    }
    i.anisotropyStrength = e.anisotropy, i.anisotropyRotation = e.anisotropyRotation, s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class ze {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_emissive_strength";
  }
  writeMaterial(e, s) {
    if (!e.isMeshStandardMaterial || e.emissiveIntensity === 1) return;
    const t = this.writer.extensionsUsed, i = {};
    i.emissiveStrength = e.emissiveIntensity, s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class Pe {
  constructor(e) {
    this.writer = e, this.name = "EXT_materials_bump";
  }
  writeMaterial(e, s) {
    if (!e.isMeshStandardMaterial || e.bumpScale === 1 && !e.bumpMap) return;
    const n = this.writer, t = n.extensionsUsed, i = {};
    if (e.bumpMap) {
      const r = {
        index: n.processTexture(e.bumpMap),
        texCoord: e.bumpMap.channel
      };
      n.applyTextureTransform(r, e.bumpMap), i.bumpTexture = r;
    }
    i.bumpFactor = e.bumpScale, s.extensions = s.extensions || {}, s.extensions[this.name] = i, t[this.name] = !0;
  }
}
class ke {
  constructor(e) {
    this.writer = e, this.name = "EXT_mesh_gpu_instancing";
  }
  writeNode(e, s) {
    if (!e.isInstancedMesh) return;
    const n = this.writer, t = e, i = new Float32Array(t.count * 3), r = new Float32Array(t.count * 4), o = new Float32Array(t.count * 3), a = new Q(), l = new v(), f = new te(), u = new v();
    for (let h = 0; h < t.count; h++)
      t.getMatrixAt(h, a), a.decompose(l, f, u), l.toArray(i, h * 3), f.toArray(r, h * 4), u.toArray(o, h * 3);
    const m = {
      TRANSLATION: n.processAccessor(new L(i, 3)),
      ROTATION: n.processAccessor(new L(r, 4)),
      SCALE: n.processAccessor(new L(o, 3))
    };
    t.instanceColor && (m._COLOR_0 = n.processAccessor(t.instanceColor)), s.extensions = s.extensions || {}, s.extensions[this.name] = { attributes: m }, n.extensionsUsed[this.name] = !0, n.extensionsRequired[this.name] = !0;
  }
}
V.Utils = {
  insertKeyframe: function(c, e) {
    const n = c.getValueSize(), t = new c.TimeBufferType(c.times.length + 1), i = new c.ValueBufferType(c.values.length + n), r = c.createInterpolant(new c.ValueBufferType(n));
    let o;
    if (c.times.length === 0) {
      t[0] = e;
      for (let a = 0; a < n; a++)
        i[a] = 0;
      o = 0;
    } else if (e < c.times[0]) {
      if (Math.abs(c.times[0] - e) < 1e-3) return 0;
      t[0] = e, t.set(c.times, 1), i.set(r.evaluate(e), 0), i.set(c.values, n), o = 0;
    } else if (e > c.times[c.times.length - 1]) {
      if (Math.abs(c.times[c.times.length - 1] - e) < 1e-3)
        return c.times.length - 1;
      t[t.length - 1] = e, t.set(c.times, 0), i.set(c.values, 0), i.set(r.evaluate(e), c.values.length), o = t.length - 1;
    } else
      for (let a = 0; a < c.times.length; a++) {
        if (Math.abs(c.times[a] - e) < 1e-3) return a;
        if (c.times[a] < e && c.times[a + 1] > e) {
          t.set(c.times.slice(0, a + 1), 0), t[a + 1] = e, t.set(c.times.slice(a + 1), a + 2), i.set(c.values.slice(0, (a + 1) * n), 0), i.set(r.evaluate(e), (a + 1) * n), i.set(c.values.slice((a + 1) * n), (a + 2) * n), o = a + 1;
          break;
        }
      }
    return c.times = t, c.values = i, o;
  },
  mergeMorphTargetTracks: function(c, e) {
    const s = [], n = {}, t = c.tracks;
    for (let i = 0; i < t.length; ++i) {
      let r = t[i];
      const o = D.parseTrackName(r.name), a = D.findNode(e, o.nodeName);
      if (o.propertyName !== "morphTargetInfluences" || o.propertyIndex === void 0) {
        s.push(r);
        continue;
      }
      if (r.createInterpolant !== r.InterpolantFactoryMethodDiscrete && r.createInterpolant !== r.InterpolantFactoryMethodLinear) {
        if (r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)
          throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");
        console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."), r = r.clone(), r.setInterpolation(me);
      }
      const l = a.morphTargetInfluences.length, f = a.morphTargetDictionary[o.propertyIndex];
      if (f === void 0)
        throw new Error("THREE.GLTFExporter: Morph target name not found: " + o.propertyIndex);
      let u;
      if (n[a.uuid] === void 0) {
        u = r.clone();
        const h = new u.ValueBufferType(l * u.times.length);
        for (let p = 0; p < u.times.length; p++)
          h[p * l + f] = u.values[p];
        u.name = (o.nodeName || "") + ".morphTargetInfluences", u.values = h, n[a.uuid] = u, s.push(u);
        continue;
      }
      const m = r.createInterpolant(new r.ValueBufferType(1));
      u = n[a.uuid];
      for (let h = 0; h < u.times.length; h++)
        u.values[h * l + f] = m.evaluate(u.times[h]);
      for (let h = 0; h < r.times.length; h++) {
        const p = this.insertKeyframe(u, r.times[h]);
        u.values[p * l + f] = r.values[h];
      }
    }
    return c.tracks = s, c;
  }
};
class He {
  constructor() {
    this._importer = new Me(), this._exporter = new V();
  }
  Import(e, s) {
    return this._importer.loadAsync(e, (n) => {
      s && s(n.loaded / n.total);
    });
  }
  Export(e, s, n) {
    return s ? this._exporter.parseAsync(e, {
      binary: s,
      onlyVisible: n
    }) : this._exporter.parseAsync(e, {
      binary: s,
      onlyVisible: n
    });
  }
}
class Ye {
  constructor(e) {
    this._scene = e, this._gltfIO = new He();
  }
  Import(e, s) {
    switch (e) {
      case "glb":
        return this._gltfIO.Import(s).catch((n) => (console.error(n), null));
      default:
        return console.error("DIVEIO.Import: Unsupported file type: " + e), Promise.reject();
    }
  }
  Export(e) {
    switch (e) {
      case "glb":
        return this._gltfIO.Export(this._scene, !0, !0).then((s) => this._createBlobURL(s)).catch((s) => (console.error(s), null));
      default:
        return console.error("DIVEIO.Export: Unsupported file type: " + e), Promise.reject();
    }
  }
  _createBlobURL(e) {
    return URL.createObjectURL(new Blob([e]));
  }
}
export {
  Ye as DIVEIO
};
//# sourceMappingURL=IO-BgiJzKrU.js.map
