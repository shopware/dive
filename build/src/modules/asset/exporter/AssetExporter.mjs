var Te = Object.defineProperty;
var Me = (n, e, s) => e in n ? Te(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var Y = (n, e, s) => Me(n, typeof e != "symbol" ? e + "" : e, s);
import { PlaneGeometry as ye, ShaderMaterial as we, Uniform as Ee, SRGBColorSpace as ue, Mesh as be, PerspectiveCamera as Ae, Scene as Z, WebGLRenderer as Ie, CanvasTexture as Re, Color as _e, Matrix4 as le, Vector3 as B, Quaternion as Se, BufferAttribute as L, CompressedTexture as j, Source as Ne, NoColorSpace as fe, MathUtils as q, RGBAFormat as Le, DoubleSide as pe, PropertyBinding as H, InterpolateDiscrete as ve, NearestFilter as Ce, NearestMipmapNearestFilter as Ue, NearestMipmapLinearFilter as Fe, LinearFilter as $e, LinearMipmapNearestFilter as Oe, LinearMipmapLinearFilter as Pe, ClampToEdgeWrapping as De, RepeatWrapping as Ge, MirroredRepeatWrapping as ke, InterpolateLinear as ze } from "three";
import { s as he, z as Be, F as He, P as N } from "../../../../chunks/parse-error-DRBVHL9E.mjs";
let O, K, C, G;
function z(n, e = 1 / 0, s = null) {
  K || (K = new ye(2, 2, 1, 1)), C || (C = new we({
    uniforms: { blitTexture: new Ee(n) },
    vertexShader: `
			varying vec2 vUv;
			void main(){
				vUv = uv;
				gl_Position = vec4(position.xy * 1.0,0.,.999999);
			}`,
    fragmentShader: `
			uniform sampler2D blitTexture; 
			varying vec2 vUv;

			void main(){ 
				gl_FragColor = vec4(vUv.xy, 0, 1);
				
				#ifdef IS_SRGB
				gl_FragColor = LinearTosRGB( texture2D( blitTexture, vUv) );
				#else
				gl_FragColor = texture2D( blitTexture, vUv);
				#endif
			}`
  })), C.uniforms.blitTexture.value = n, C.defines.IS_SRGB = n.colorSpace == ue, C.needsUpdate = !0, G || (G = new be(K, C), G.frustumCulled = !1);
  const t = new Ae(), i = new Z();
  i.add(G), s === null && (s = O = new Ie({ antialias: !1 }));
  const r = Math.min(n.image.width, e), o = Math.min(n.image.height, e);
  s.setSize(r, o), s.clear(), s.render(i, t);
  const a = document.createElement("canvas"), c = a.getContext("2d");
  a.width = r, a.height = o, c.drawImage(s.domElement, 0, 0, r, o);
  const u = new Re(a);
  return u.minFilter = n.minFilter, u.magFilter = n.magFilter, u.wrapS = n.wrapS, u.wrapT = n.wrapT, u.name = n.name, O && (O.forceContextLoss(), O.dispose(), O = null), u;
}
const te = {
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
class Q {
  constructor() {
    this.pluginCallbacks = [], this.register(function(e) {
      return new Qe(e);
    }), this.register(function(e) {
      return new et(e);
    }), this.register(function(e) {
      return new nt(e);
    }), this.register(function(e) {
      return new it(e);
    }), this.register(function(e) {
      return new rt(e);
    }), this.register(function(e) {
      return new ot(e);
    }), this.register(function(e) {
      return new tt(e);
    }), this.register(function(e) {
      return new st(e);
    }), this.register(function(e) {
      return new at(e);
    }), this.register(function(e) {
      return new ct(e);
    }), this.register(function(e) {
      return new ut(e);
    }), this.register(function(e) {
      return new lt(e);
    }), this.register(function(e) {
      return new ft(e);
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
  parse(e, s, t, i) {
    const r = new Je(), o = [];
    for (let a = 0, c = this.pluginCallbacks.length; a < c; a++)
      o.push(this.pluginCallbacks[a](r));
    r.setPlugins(o), r.write(e, s, i).catch(t);
  }
  parseAsync(e, s) {
    const t = this;
    return new Promise(function(i, r) {
      t.parse(e, i, r, s);
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
}, W = "KHR_mesh_quantization", R = {};
R[Ce] = T.NEAREST;
R[Ue] = T.NEAREST_MIPMAP_NEAREST;
R[Fe] = T.NEAREST_MIPMAP_LINEAR;
R[$e] = T.LINEAR;
R[Oe] = T.LINEAR_MIPMAP_NEAREST;
R[Pe] = T.LINEAR_MIPMAP_LINEAR;
R[De] = T.CLAMP_TO_EDGE;
R[Ge] = T.REPEAT;
R[ke] = T.MIRRORED_REPEAT;
const se = {
  scale: "scale",
  position: "translation",
  quaternion: "rotation",
  morphTargetInfluences: "weights"
}, Ve = new _e(), ne = 12, Ye = 1179937895, je = 2, ie = 8, Ke = 1313821514, We = 5130562;
function P(n, e) {
  return n.length === e.length && n.every(function(s, t) {
    return s === e[t];
  });
}
function Xe(n) {
  return new TextEncoder().encode(n).buffer;
}
function Ze(n) {
  return P(n.elements, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
function qe(n, e, s) {
  const t = {
    min: new Array(n.itemSize).fill(Number.POSITIVE_INFINITY),
    max: new Array(n.itemSize).fill(Number.NEGATIVE_INFINITY)
  };
  for (let i = e; i < e + s; i++)
    for (let r = 0; r < n.itemSize; r++) {
      let o;
      n.itemSize > 4 ? o = n.array[i * n.itemSize + r] : (r === 0 ? o = n.getX(i) : r === 1 ? o = n.getY(i) : r === 2 ? o = n.getZ(i) : r === 3 && (o = n.getW(i)), n.normalized === !0 && (o = q.normalize(o, n.array))), t.min[r] = Math.min(t.min[r], o), t.max[r] = Math.max(t.max[r], o);
    }
  return t;
}
function de(n) {
  return Math.ceil(n / 4) * 4;
}
function X(n, e = 0) {
  const s = de(n.byteLength);
  if (s !== n.byteLength) {
    const t = new Uint8Array(s);
    if (t.set(new Uint8Array(n)), e !== 0)
      for (let i = n.byteLength; i < s; i++)
        t[i] = e;
    return t.buffer;
  }
  return n;
}
function re() {
  return typeof document > "u" && typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1) : document.createElement("canvas");
}
function oe(n, e) {
  if (n.toBlob !== void 0)
    return new Promise((t) => n.toBlob(t, e));
  let s;
  return e === "image/jpeg" ? s = 0.92 : e === "image/webp" && (s = 0.8), n.convertToBlob({
    type: e,
    quality: s
  });
}
class Je {
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
  async write(e, s, t = {}) {
    this.options = Object.assign({
      // default options
      binary: !1,
      trs: !1,
      onlyVisible: !0,
      maxTextureSize: 1 / 0,
      animations: [],
      includeCustomExtensions: !1
    }, t), this.options.animations.length > 0 && (this.options.trs = !0), this.processInput(e), await Promise.all(this.pending);
    const i = this, r = i.buffers, o = i.json;
    t = i.options;
    const a = i.extensionsUsed, c = i.extensionsRequired, u = new Blob(r, { type: "application/octet-stream" }), p = Object.keys(a), l = Object.keys(c);
    if (p.length > 0 && (o.extensionsUsed = p), l.length > 0 && (o.extensionsRequired = l), o.buffers && o.buffers.length > 0 && (o.buffers[0].byteLength = u.size), t.binary === !0) {
      const x = new FileReader();
      x.readAsArrayBuffer(u), x.onloadend = function() {
        const f = X(x.result), h = new DataView(new ArrayBuffer(ie));
        h.setUint32(0, f.byteLength, !0), h.setUint32(4, We, !0);
        const d = X(Xe(JSON.stringify(o)), 32), g = new DataView(new ArrayBuffer(ie));
        g.setUint32(0, d.byteLength, !0), g.setUint32(4, Ke, !0);
        const y = new ArrayBuffer(ne), _ = new DataView(y);
        _.setUint32(0, Ye, !0), _.setUint32(4, je, !0);
        const D = ne + g.byteLength + d.byteLength + h.byteLength + f.byteLength;
        _.setUint32(8, D, !0);
        const m = new Blob([
          y,
          g,
          d,
          h,
          f
        ], { type: "application/octet-stream" }), M = new FileReader();
        M.readAsArrayBuffer(m), M.onloadend = function() {
          s(M.result);
        };
      };
    } else if (o.buffers && o.buffers.length > 0) {
      const x = new FileReader();
      x.readAsDataURL(u), x.onloadend = function() {
        const f = x.result;
        o.buffers[0].uri = f, s(o);
      };
    } else
      s(o);
  }
  /**
   * Serializes a userData.
   *
   * @param {THREE.Object3D|THREE.Material} object
   * @param {Object} objectDef
   */
  serializeUserData(e, s) {
    if (Object.keys(e.userData).length === 0) return;
    const t = this.options, i = this.extensionsUsed;
    try {
      const r = JSON.parse(JSON.stringify(e.userData));
      if (t.includeCustomExtensions && r.gltfExtensions) {
        s.extensions === void 0 && (s.extensions = {});
        for (const o in r.gltfExtensions)
          s.extensions[o] = r.gltfExtensions[o], i[o] = !0;
        delete r.gltfExtensions;
      }
      Object.keys(r).length > 0 && (s.extras = r);
    } catch (r) {
      console.warn("THREE.GLTFExporter: userData of '" + e.name + "' won't be serialized because of JSON.stringify error - " + r.message);
    }
  }
  /**
   * Returns ids for buffer attributes.
   * @param  {Object} object
   * @return {Integer}
   */
  getUID(e, s = !1) {
    if (this.uids.has(e) === !1) {
      const i = /* @__PURE__ */ new Map();
      i.set(!0, this.uid++), i.set(!1, this.uid++), this.uids.set(e, i);
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
    const t = new B();
    for (let i = 0, r = e.count; i < r; i++)
      if (Math.abs(t.fromBufferAttribute(e, i).length() - 1) > 5e-4) return !1;
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
    const t = e.clone(), i = new B();
    for (let r = 0, o = t.count; r < o; r++)
      i.fromBufferAttribute(t, r), i.x === 0 && i.y === 0 && i.z === 0 ? i.setX(1) : i.normalize(), t.setXYZ(r, i.x, i.y, i.z);
    return s.attributesNormalized.set(e, t), t;
  }
  /**
   * Applies a texture transform, if present, to the map definition. Requires
   * the KHR_texture_transform extension.
   *
   * @param {Object} mapDef
   * @param {THREE.Texture} texture
   */
  applyTextureTransform(e, s) {
    let t = !1;
    const i = {};
    (s.offset.x !== 0 || s.offset.y !== 0) && (i.offset = s.offset.toArray(), t = !0), s.rotation !== 0 && (i.rotation = s.rotation, t = !0), (s.repeat.x !== 1 || s.repeat.y !== 1) && (i.scale = s.repeat.toArray(), t = !0), t && (e.extensions = e.extensions || {}, e.extensions.KHR_texture_transform = i, this.extensionsUsed.KHR_texture_transform = !0);
  }
  buildMetalRoughTexture(e, s) {
    if (e === s) return e;
    function t(f) {
      return f.colorSpace === ue ? function(d) {
        return d < 0.04045 ? d * 0.0773993808 : Math.pow(d * 0.9478672986 + 0.0521327014, 2.4);
      } : function(d) {
        return d;
      };
    }
    console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."), e instanceof j && (e = z(e)), s instanceof j && (s = z(s));
    const i = e ? e.image : null, r = s ? s.image : null, o = Math.max(i ? i.width : 0, r ? r.width : 0), a = Math.max(i ? i.height : 0, r ? r.height : 0), c = re();
    c.width = o, c.height = a;
    const u = c.getContext("2d");
    u.fillStyle = "#00ffff", u.fillRect(0, 0, o, a);
    const p = u.getImageData(0, 0, o, a);
    if (i) {
      u.drawImage(i, 0, 0, o, a);
      const f = t(e), h = u.getImageData(0, 0, o, a).data;
      for (let d = 2; d < h.length; d += 4)
        p.data[d] = f(h[d] / 256) * 256;
    }
    if (r) {
      u.drawImage(r, 0, 0, o, a);
      const f = t(s), h = u.getImageData(0, 0, o, a).data;
      for (let d = 1; d < h.length; d += 4)
        p.data[d] = f(h[d] / 256) * 256;
    }
    u.putImageData(p, 0, 0);
    const x = (e || s).clone();
    return x.source = new Ne(c), x.colorSpace = fe, x.channel = (e || s).channel, e && s && e.channel !== s.channel && console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."), x;
  }
  /**
   * Process a buffer to append to the default one.
   * @param  {ArrayBuffer} buffer
   * @return {Integer}
   */
  processBuffer(e) {
    const s = this.json, t = this.buffers;
    return s.buffers || (s.buffers = [{ byteLength: 0 }]), t.push(e), 0;
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
  processBufferView(e, s, t, i, r) {
    const o = this.json;
    o.bufferViews || (o.bufferViews = []);
    let a;
    switch (s) {
      case T.BYTE:
      case T.UNSIGNED_BYTE:
        a = 1;
        break;
      case T.SHORT:
      case T.UNSIGNED_SHORT:
        a = 2;
        break;
      default:
        a = 4;
    }
    let c = e.itemSize * a;
    r === T.ARRAY_BUFFER && (c = Math.ceil(c / 4) * 4);
    const u = de(i * c), p = new DataView(new ArrayBuffer(u));
    let l = 0;
    for (let h = t; h < t + i; h++) {
      for (let d = 0; d < e.itemSize; d++) {
        let g;
        e.itemSize > 4 ? g = e.array[h * e.itemSize + d] : (d === 0 ? g = e.getX(h) : d === 1 ? g = e.getY(h) : d === 2 ? g = e.getZ(h) : d === 3 && (g = e.getW(h)), e.normalized === !0 && (g = q.normalize(g, e.array))), s === T.FLOAT ? p.setFloat32(l, g, !0) : s === T.INT ? p.setInt32(l, g, !0) : s === T.UNSIGNED_INT ? p.setUint32(l, g, !0) : s === T.SHORT ? p.setInt16(l, g, !0) : s === T.UNSIGNED_SHORT ? p.setUint16(l, g, !0) : s === T.BYTE ? p.setInt8(l, g) : s === T.UNSIGNED_BYTE && p.setUint8(l, g), l += a;
      }
      l % c !== 0 && (l += c - l % c);
    }
    const x = {
      buffer: this.processBuffer(p.buffer),
      byteOffset: this.byteOffset,
      byteLength: u
    };
    return r !== void 0 && (x.target = r), r === T.ARRAY_BUFFER && (x.byteStride = c), this.byteOffset += u, o.bufferViews.push(x), {
      id: o.bufferViews.length - 1,
      byteLength: 0
    };
  }
  /**
   * Process and generate a BufferView from an image Blob.
   * @param {Blob} blob
   * @return {Promise<Integer>}
   */
  processBufferViewImage(e) {
    const s = this, t = s.json;
    return t.bufferViews || (t.bufferViews = []), new Promise(function(i) {
      const r = new FileReader();
      r.readAsArrayBuffer(e), r.onloadend = function() {
        const o = X(r.result), a = {
          buffer: s.processBuffer(o),
          byteOffset: s.byteOffset,
          byteLength: o.byteLength
        };
        s.byteOffset += o.byteLength, i(t.bufferViews.push(a) - 1);
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
  processAccessor(e, s, t, i) {
    const r = this.json, o = {
      1: "SCALAR",
      2: "VEC2",
      3: "VEC3",
      4: "VEC4",
      9: "MAT3",
      16: "MAT4"
    };
    let a;
    if (e.array.constructor === Float32Array)
      a = T.FLOAT;
    else if (e.array.constructor === Int32Array)
      a = T.INT;
    else if (e.array.constructor === Uint32Array)
      a = T.UNSIGNED_INT;
    else if (e.array.constructor === Int16Array)
      a = T.SHORT;
    else if (e.array.constructor === Uint16Array)
      a = T.UNSIGNED_SHORT;
    else if (e.array.constructor === Int8Array)
      a = T.BYTE;
    else if (e.array.constructor === Uint8Array)
      a = T.UNSIGNED_BYTE;
    else
      throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: " + e.array.constructor.name);
    if (t === void 0 && (t = 0), (i === void 0 || i === 1 / 0) && (i = e.count), i === 0) return null;
    const c = qe(e, t, i);
    let u;
    s !== void 0 && (u = e === s.index ? T.ELEMENT_ARRAY_BUFFER : T.ARRAY_BUFFER);
    const p = this.processBufferView(e, a, t, i, u), l = {
      bufferView: p.id,
      byteOffset: p.byteOffset,
      componentType: a,
      count: i,
      max: c.max,
      min: c.min,
      type: o[e.itemSize]
    };
    return e.normalized === !0 && (l.normalized = !0), r.accessors || (r.accessors = []), r.accessors.push(l) - 1;
  }
  /**
   * Process image
   * @param  {Image} image to process
   * @param  {Integer} format of the image (RGBAFormat)
   * @param  {Boolean} flipY before writing out the image
   * @param  {String} mimeType export format
   * @return {Integer}     Index of the processed texture in the "images" array
   */
  processImage(e, s, t, i = "image/png") {
    if (e !== null) {
      const r = this, o = r.cache, a = r.json, c = r.options, u = r.pending;
      o.images.has(e) || o.images.set(e, {});
      const p = o.images.get(e), l = i + ":flipY/" + t.toString();
      if (p[l] !== void 0) return p[l];
      a.images || (a.images = []);
      const x = { mimeType: i }, f = re();
      f.width = Math.min(e.width, c.maxTextureSize), f.height = Math.min(e.height, c.maxTextureSize);
      const h = f.getContext("2d");
      if (t === !0 && (h.translate(0, f.height), h.scale(1, -1)), e.data !== void 0) {
        s !== Le && console.error("GLTFExporter: Only RGBAFormat is supported.", s), (e.width > c.maxTextureSize || e.height > c.maxTextureSize) && console.warn("GLTFExporter: Image size is bigger than maxTextureSize", e);
        const g = new Uint8ClampedArray(e.height * e.width * 4);
        for (let y = 0; y < g.length; y += 4)
          g[y + 0] = e.data[y + 0], g[y + 1] = e.data[y + 1], g[y + 2] = e.data[y + 2], g[y + 3] = e.data[y + 3];
        h.putImageData(new ImageData(g, e.width, e.height), 0, 0);
      } else if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
        h.drawImage(e, 0, 0, f.width, f.height);
      else
        throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");
      c.binary === !0 ? u.push(
        oe(f, i).then((g) => r.processBufferViewImage(g)).then((g) => {
          x.bufferView = g;
        })
      ) : f.toDataURL !== void 0 ? x.uri = f.toDataURL(i) : u.push(
        oe(f, i).then((g) => new FileReader().readAsDataURL(g)).then((g) => {
          x.uri = g;
        })
      );
      const d = a.images.push(x) - 1;
      return p[l] = d, d;
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
    const t = {
      magFilter: R[e.magFilter],
      minFilter: R[e.minFilter],
      wrapS: R[e.wrapS],
      wrapT: R[e.wrapT]
    };
    return s.samplers.push(t) - 1;
  }
  /**
   * Process texture
   * @param  {Texture} map Map to process
   * @return {Integer} Index of the processed texture in the "textures" array
   */
  processTexture(e) {
    const t = this.options, i = this.cache, r = this.json;
    if (i.textures.has(e)) return i.textures.get(e);
    r.textures || (r.textures = []), e instanceof j && (e = z(e, t.maxTextureSize));
    let o = e.userData.mimeType;
    o === "image/webp" && (o = "image/png");
    const a = {
      sampler: this.processSampler(e),
      source: this.processImage(e.image, e.format, e.flipY, o)
    };
    e.name && (a.name = e.name), this._invokeAll(function(u) {
      u.writeTexture && u.writeTexture(e, a);
    });
    const c = r.textures.push(a) - 1;
    return i.textures.set(e, c), c;
  }
  /**
   * Process material
   * @param  {THREE.Material} material Material to process
   * @return {Integer|null} Index of the processed material in the "materials" array
   */
  processMaterial(e) {
    const s = this.cache, t = this.json;
    if (s.materials.has(e)) return s.materials.get(e);
    if (e.isShaderMaterial)
      return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."), null;
    t.materials || (t.materials = []);
    const i = { pbrMetallicRoughness: {} };
    e.isMeshStandardMaterial !== !0 && e.isMeshBasicMaterial !== !0 && console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");
    const r = e.color.toArray().concat([e.opacity]);
    if (P(r, [1, 1, 1, 1]) || (i.pbrMetallicRoughness.baseColorFactor = r), e.isMeshStandardMaterial ? (i.pbrMetallicRoughness.metallicFactor = e.metalness, i.pbrMetallicRoughness.roughnessFactor = e.roughness) : (i.pbrMetallicRoughness.metallicFactor = 0.5, i.pbrMetallicRoughness.roughnessFactor = 0.5), e.metalnessMap || e.roughnessMap) {
      const a = this.buildMetalRoughTexture(e.metalnessMap, e.roughnessMap), c = {
        index: this.processTexture(a),
        channel: a.channel
      };
      this.applyTextureTransform(c, a), i.pbrMetallicRoughness.metallicRoughnessTexture = c;
    }
    if (e.map) {
      const a = {
        index: this.processTexture(e.map),
        texCoord: e.map.channel
      };
      this.applyTextureTransform(a, e.map), i.pbrMetallicRoughness.baseColorTexture = a;
    }
    if (e.emissive) {
      const a = e.emissive;
      if (Math.max(a.r, a.g, a.b) > 0 && (i.emissiveFactor = e.emissive.toArray()), e.emissiveMap) {
        const u = {
          index: this.processTexture(e.emissiveMap),
          texCoord: e.emissiveMap.channel
        };
        this.applyTextureTransform(u, e.emissiveMap), i.emissiveTexture = u;
      }
    }
    if (e.normalMap) {
      const a = {
        index: this.processTexture(e.normalMap),
        texCoord: e.normalMap.channel
      };
      e.normalScale && e.normalScale.x !== 1 && (a.scale = e.normalScale.x), this.applyTextureTransform(a, e.normalMap), i.normalTexture = a;
    }
    if (e.aoMap) {
      const a = {
        index: this.processTexture(e.aoMap),
        texCoord: e.aoMap.channel
      };
      e.aoMapIntensity !== 1 && (a.strength = e.aoMapIntensity), this.applyTextureTransform(a, e.aoMap), i.occlusionTexture = a;
    }
    e.transparent ? i.alphaMode = "BLEND" : e.alphaTest > 0 && (i.alphaMode = "MASK", i.alphaCutoff = e.alphaTest), e.side === pe && (i.doubleSided = !0), e.name !== "" && (i.name = e.name), this.serializeUserData(e, i), this._invokeAll(function(a) {
      a.writeMaterial && a.writeMaterial(e, i);
    });
    const o = t.materials.push(i) - 1;
    return s.materials.set(e, o), o;
  }
  /**
   * Process mesh
   * @param  {THREE.Mesh} mesh Mesh to process
   * @return {Integer|null} Index of the processed mesh in the "meshes" array
   */
  processMesh(e) {
    const s = this.cache, t = this.json, i = [e.geometry.uuid];
    if (Array.isArray(e.material))
      for (let m = 0, M = e.material.length; m < M; m++)
        i.push(e.material[m].uuid);
    else
      i.push(e.material.uuid);
    const r = i.join(":");
    if (s.meshes.has(r)) return s.meshes.get(r);
    const o = e.geometry;
    let a;
    e.isLineSegments ? a = T.LINES : e.isLineLoop ? a = T.LINE_LOOP : e.isLine ? a = T.LINE_STRIP : e.isPoints ? a = T.POINTS : a = e.material.wireframe ? T.LINES : T.TRIANGLES;
    const c = {}, u = {}, p = [], l = [], x = {
      uv: "TEXCOORD_0",
      uv1: "TEXCOORD_1",
      uv2: "TEXCOORD_2",
      uv3: "TEXCOORD_3",
      color: "COLOR_0",
      skinWeight: "WEIGHTS_0",
      skinIndex: "JOINTS_0"
    }, f = o.getAttribute("normal");
    f !== void 0 && !this.isNormalizedNormalAttribute(f) && (console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."), o.setAttribute("normal", this.createNormalizedNormalAttribute(f)));
    let h = null;
    for (let m in o.attributes) {
      if (m.slice(0, 5) === "morph") continue;
      const M = o.attributes[m];
      if (m = x[m] || m.toUpperCase(), /^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(m) || (m = "_" + m), s.attributes.has(this.getUID(M))) {
        u[m] = s.attributes.get(this.getUID(M));
        continue;
      }
      h = null;
      const b = M.array;
      m === "JOINTS_0" && !(b instanceof Uint16Array) && !(b instanceof Uint8Array) && (console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'), h = new L(new Uint16Array(b), M.itemSize, M.normalized));
      const I = this.processAccessor(h || M, o);
      I !== null && (m.startsWith("_") || this.detectMeshQuantization(m, M), u[m] = I, s.attributes.set(this.getUID(M), I));
    }
    if (f !== void 0 && o.setAttribute("normal", f), Object.keys(u).length === 0) return null;
    if (e.morphTargetInfluences !== void 0 && e.morphTargetInfluences.length > 0) {
      const m = [], M = [], E = {};
      if (e.morphTargetDictionary !== void 0)
        for (const b in e.morphTargetDictionary)
          E[e.morphTargetDictionary[b]] = b;
      for (let b = 0; b < e.morphTargetInfluences.length; ++b) {
        const I = {};
        let ee = !1;
        for (const U in o.morphAttributes) {
          if (U !== "position" && U !== "normal") {
            ee || (console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."), ee = !0);
            continue;
          }
          const S = o.morphAttributes[U][b], V = U.toUpperCase(), F = o.attributes[U];
          if (s.attributes.has(this.getUID(S, !0))) {
            I[V] = s.attributes.get(this.getUID(S, !0));
            continue;
          }
          const $ = S.clone();
          if (!o.morphTargetsRelative)
            for (let A = 0, me = S.count; A < me; A++)
              for (let v = 0; v < S.itemSize; v++)
                v === 0 && $.setX(A, S.getX(A) - F.getX(A)), v === 1 && $.setY(A, S.getY(A) - F.getY(A)), v === 2 && $.setZ(A, S.getZ(A) - F.getZ(A)), v === 3 && $.setW(A, S.getW(A) - F.getW(A));
          I[V] = this.processAccessor($, o), s.attributes.set(this.getUID(F, !0), I[V]);
        }
        l.push(I), m.push(e.morphTargetInfluences[b]), e.morphTargetDictionary !== void 0 && M.push(E[b]);
      }
      c.weights = m, M.length > 0 && (c.extras = {}, c.extras.targetNames = M);
    }
    const d = Array.isArray(e.material);
    if (d && o.groups.length === 0) return null;
    let g = !1;
    if (d && o.index === null) {
      const m = [];
      for (let M = 0, E = o.attributes.position.count; M < E; M++)
        m[M] = M;
      o.setIndex(m), g = !0;
    }
    const y = d ? e.material : [e.material], _ = d ? o.groups : [{ materialIndex: 0, start: void 0, count: void 0 }];
    for (let m = 0, M = _.length; m < M; m++) {
      const E = {
        mode: a,
        attributes: u
      };
      if (this.serializeUserData(o, E), l.length > 0 && (E.targets = l), o.index !== null) {
        let I = this.getUID(o.index);
        (_[m].start !== void 0 || _[m].count !== void 0) && (I += ":" + _[m].start + ":" + _[m].count), s.attributes.has(I) ? E.indices = s.attributes.get(I) : (E.indices = this.processAccessor(o.index, o, _[m].start, _[m].count), s.attributes.set(I, E.indices)), E.indices === null && delete E.indices;
      }
      const b = this.processMaterial(y[_[m].materialIndex]);
      b !== null && (E.material = b), p.push(E);
    }
    g === !0 && o.setIndex(null), c.primitives = p, t.meshes || (t.meshes = []), this._invokeAll(function(m) {
      m.writeMesh && m.writeMesh(e, c);
    });
    const D = t.meshes.push(c) - 1;
    return s.meshes.set(r, D), D;
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
    if (this.extensionsUsed[W]) return;
    let t;
    switch (s.array.constructor) {
      case Int8Array:
        t = "byte";
        break;
      case Uint8Array:
        t = "unsigned byte";
        break;
      case Int16Array:
        t = "short";
        break;
      case Uint16Array:
        t = "unsigned short";
        break;
      default:
        return;
    }
    s.normalized && (t += " normalized");
    const i = e.split("_", 1)[0];
    te[i] && te[i].includes(t) && (this.extensionsUsed[W] = !0, this.extensionsRequired[W] = !0);
  }
  /**
   * Process camera
   * @param  {THREE.Camera} camera Camera to process
   * @return {Integer}      Index of the processed mesh in the "camera" array
   */
  processCamera(e) {
    const s = this.json;
    s.cameras || (s.cameras = []);
    const t = e.isOrthographicCamera, i = {
      type: t ? "orthographic" : "perspective"
    };
    return t ? i.orthographic = {
      xmag: e.right * 2,
      ymag: e.top * 2,
      zfar: e.far <= 0 ? 1e-3 : e.far,
      znear: e.near < 0 ? 0 : e.near
    } : i.perspective = {
      aspectRatio: e.aspect,
      yfov: q.degToRad(e.fov),
      zfar: e.far <= 0 ? 1e-3 : e.far,
      znear: e.near < 0 ? 0 : e.near
    }, e.name !== "" && (i.name = e.type), s.cameras.push(i) - 1;
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
    const t = this.json, i = this.nodeMap;
    t.animations || (t.animations = []), e = Q.Utils.mergeMorphTargetTracks(e.clone(), s);
    const r = e.tracks, o = [], a = [];
    for (let c = 0; c < r.length; ++c) {
      const u = r[c], p = H.parseTrackName(u.name);
      let l = H.findNode(s, p.nodeName);
      const x = se[p.propertyName];
      if (p.objectName === "bones" && (l.isSkinnedMesh === !0 ? l = l.skeleton.getBoneByName(p.objectIndex) : l = void 0), !l || !x)
        return console.warn('THREE.GLTFExporter: Could not export animation track "%s".', u.name), null;
      const f = 1;
      let h = u.values.length / u.times.length;
      x === se.morphTargetInfluences && (h /= l.morphTargetInfluences.length);
      let d;
      u.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === !0 ? (d = "CUBICSPLINE", h /= 3) : u.getInterpolation() === ve ? d = "STEP" : d = "LINEAR", a.push({
        input: this.processAccessor(new L(u.times, f)),
        output: this.processAccessor(new L(u.values, h)),
        interpolation: d
      }), o.push({
        sampler: a.length - 1,
        target: {
          node: i.get(l),
          path: x
        }
      });
    }
    return t.animations.push({
      name: e.name || "clip_" + t.animations.length,
      samplers: a,
      channels: o
    }), t.animations.length - 1;
  }
  /**
   * @param {THREE.Object3D} object
   * @return {number|null}
   */
  processSkin(e) {
    const s = this.json, t = this.nodeMap, i = s.nodes[t.get(e)], r = e.skeleton;
    if (r === void 0) return null;
    const o = e.skeleton.bones[0];
    if (o === void 0) return null;
    const a = [], c = new Float32Array(r.bones.length * 16), u = new le();
    for (let l = 0; l < r.bones.length; ++l)
      a.push(t.get(r.bones[l])), u.copy(r.boneInverses[l]), u.multiply(e.bindMatrix).toArray(c, l * 16);
    return s.skins === void 0 && (s.skins = []), s.skins.push({
      inverseBindMatrices: this.processAccessor(new L(c, 16)),
      joints: a,
      skeleton: t.get(o)
    }), i.skin = s.skins.length - 1;
  }
  /**
   * Process Object3D node
   * @param  {THREE.Object3D} node Object3D to processNode
   * @return {Integer} Index of the node in the nodes list
   */
  processNode(e) {
    const s = this.json, t = this.options, i = this.nodeMap;
    s.nodes || (s.nodes = []);
    const r = {};
    if (t.trs) {
      const a = e.quaternion.toArray(), c = e.position.toArray(), u = e.scale.toArray();
      P(a, [0, 0, 0, 1]) || (r.rotation = a), P(c, [0, 0, 0]) || (r.translation = c), P(u, [1, 1, 1]) || (r.scale = u);
    } else
      e.matrixAutoUpdate && e.updateMatrix(), Ze(e.matrix) === !1 && (r.matrix = e.matrix.elements);
    if (e.name !== "" && (r.name = String(e.name)), this.serializeUserData(e, r), e.isMesh || e.isLine || e.isPoints) {
      const a = this.processMesh(e);
      a !== null && (r.mesh = a);
    } else e.isCamera && (r.camera = this.processCamera(e));
    if (e.isSkinnedMesh && this.skins.push(e), e.children.length > 0) {
      const a = [];
      for (let c = 0, u = e.children.length; c < u; c++) {
        const p = e.children[c];
        if (p.visible || t.onlyVisible === !1) {
          const l = this.processNode(p);
          l !== null && a.push(l);
        }
      }
      a.length > 0 && (r.children = a);
    }
    this._invokeAll(function(a) {
      a.writeNode && a.writeNode(e, r);
    });
    const o = s.nodes.push(r) - 1;
    return i.set(e, o), o;
  }
  /**
   * Process Scene
   * @param  {Scene} node Scene to process
   */
  processScene(e) {
    const s = this.json, t = this.options;
    s.scenes || (s.scenes = [], s.scene = 0);
    const i = {};
    e.name !== "" && (i.name = e.name), s.scenes.push(i);
    const r = [];
    for (let o = 0, a = e.children.length; o < a; o++) {
      const c = e.children[o];
      if (c.visible || t.onlyVisible === !1) {
        const u = this.processNode(c);
        u !== null && r.push(u);
      }
    }
    r.length > 0 && (i.nodes = r), this.serializeUserData(e, i);
  }
  /**
   * Creates a Scene to hold a list of objects and parse it
   * @param  {Array} objects List of objects to process
   */
  processObjects(e) {
    const s = new Z();
    s.name = "AuxScene";
    for (let t = 0; t < e.length; t++)
      s.children.push(e[t]);
    this.processScene(s);
  }
  /**
   * @param {THREE.Object3D|Array<THREE.Object3D>} input
   */
  processInput(e) {
    const s = this.options;
    e = e instanceof Array ? e : [e], this._invokeAll(function(i) {
      i.beforeParse && i.beforeParse(e);
    });
    const t = [];
    for (let i = 0; i < e.length; i++)
      e[i] instanceof Z ? this.processScene(e[i]) : t.push(e[i]);
    t.length > 0 && this.processObjects(t);
    for (let i = 0; i < this.skins.length; ++i)
      this.processSkin(this.skins[i]);
    for (let i = 0; i < s.animations.length; ++i)
      this.processAnimation(s.animations[i], e[0]);
    this._invokeAll(function(i) {
      i.afterParse && i.afterParse(e);
    });
  }
  _invokeAll(e) {
    for (let s = 0, t = this.plugins.length; s < t; s++)
      e(this.plugins[s]);
  }
}
class Qe {
  constructor(e) {
    this.writer = e, this.name = "KHR_lights_punctual";
  }
  writeNode(e, s) {
    if (!e.isLight) return;
    if (!e.isDirectionalLight && !e.isPointLight && !e.isSpotLight) {
      console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.", e);
      return;
    }
    const t = this.writer, i = t.json, r = t.extensionsUsed, o = {};
    e.name && (o.name = e.name), o.color = e.color.toArray(), o.intensity = e.intensity, e.isDirectionalLight ? o.type = "directional" : e.isPointLight ? (o.type = "point", e.distance > 0 && (o.range = e.distance)) : e.isSpotLight && (o.type = "spot", e.distance > 0 && (o.range = e.distance), o.spot = {}, o.spot.innerConeAngle = (1 - e.penumbra) * e.angle, o.spot.outerConeAngle = e.angle), e.decay !== void 0 && e.decay !== 2 && console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."), e.target && (e.target.parent !== e || e.target.position.x !== 0 || e.target.position.y !== 0 || e.target.position.z !== -1) && console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."), r[this.name] || (i.extensions = i.extensions || {}, i.extensions[this.name] = { lights: [] }, r[this.name] = !0);
    const a = i.extensions[this.name].lights;
    a.push(o), s.extensions = s.extensions || {}, s.extensions[this.name] = { light: a.length - 1 };
  }
}
class et {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_unlit";
  }
  writeMaterial(e, s) {
    if (!e.isMeshBasicMaterial) return;
    const i = this.writer.extensionsUsed;
    s.extensions = s.extensions || {}, s.extensions[this.name] = {}, i[this.name] = !0, s.pbrMetallicRoughness.metallicFactor = 0, s.pbrMetallicRoughness.roughnessFactor = 0.9;
  }
}
class tt {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_clearcoat";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.clearcoat === 0) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (r.clearcoatFactor = e.clearcoat, e.clearcoatMap) {
      const o = {
        index: t.processTexture(e.clearcoatMap),
        texCoord: e.clearcoatMap.channel
      };
      t.applyTextureTransform(o, e.clearcoatMap), r.clearcoatTexture = o;
    }
    if (r.clearcoatRoughnessFactor = e.clearcoatRoughness, e.clearcoatRoughnessMap) {
      const o = {
        index: t.processTexture(e.clearcoatRoughnessMap),
        texCoord: e.clearcoatRoughnessMap.channel
      };
      t.applyTextureTransform(o, e.clearcoatRoughnessMap), r.clearcoatRoughnessTexture = o;
    }
    if (e.clearcoatNormalMap) {
      const o = {
        index: t.processTexture(e.clearcoatNormalMap),
        texCoord: e.clearcoatNormalMap.channel
      };
      t.applyTextureTransform(o, e.clearcoatNormalMap), r.clearcoatNormalTexture = o;
    }
    s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class st {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_iridescence";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.iridescence === 0) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (r.iridescenceFactor = e.iridescence, e.iridescenceMap) {
      const o = {
        index: t.processTexture(e.iridescenceMap),
        texCoord: e.iridescenceMap.channel
      };
      t.applyTextureTransform(o, e.iridescenceMap), r.iridescenceTexture = o;
    }
    if (r.iridescenceIor = e.iridescenceIOR, r.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], r.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1], e.iridescenceThicknessMap) {
      const o = {
        index: t.processTexture(e.iridescenceThicknessMap),
        texCoord: e.iridescenceThicknessMap.channel
      };
      t.applyTextureTransform(o, e.iridescenceThicknessMap), r.iridescenceThicknessTexture = o;
    }
    s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class nt {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_transmission";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (r.transmissionFactor = e.transmission, e.transmissionMap) {
      const o = {
        index: t.processTexture(e.transmissionMap),
        texCoord: e.transmissionMap.channel
      };
      t.applyTextureTransform(o, e.transmissionMap), r.transmissionTexture = o;
    }
    s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class it {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_volume";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (r.thicknessFactor = e.thickness, e.thicknessMap) {
      const o = {
        index: t.processTexture(e.thicknessMap),
        texCoord: e.thicknessMap.channel
      };
      t.applyTextureTransform(o, e.thicknessMap), r.thicknessTexture = o;
    }
    r.attenuationDistance = e.attenuationDistance, r.attenuationColor = e.attenuationColor.toArray(), s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class rt {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_ior";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.ior === 1.5) return;
    const i = this.writer.extensionsUsed, r = {};
    r.ior = e.ior, s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class ot {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_specular";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.specularIntensity === 1 && e.specularColor.equals(Ve) && !e.specularIntensityMap && !e.specularColorMap) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (e.specularIntensityMap) {
      const o = {
        index: t.processTexture(e.specularIntensityMap),
        texCoord: e.specularIntensityMap.channel
      };
      t.applyTextureTransform(o, e.specularIntensityMap), r.specularTexture = o;
    }
    if (e.specularColorMap) {
      const o = {
        index: t.processTexture(e.specularColorMap),
        texCoord: e.specularColorMap.channel
      };
      t.applyTextureTransform(o, e.specularColorMap), r.specularColorTexture = o;
    }
    r.specularFactor = e.specularIntensity, r.specularColorFactor = e.specularColor.toArray(), s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class at {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_sheen";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.sheen == 0) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (e.sheenRoughnessMap) {
      const o = {
        index: t.processTexture(e.sheenRoughnessMap),
        texCoord: e.sheenRoughnessMap.channel
      };
      t.applyTextureTransform(o, e.sheenRoughnessMap), r.sheenRoughnessTexture = o;
    }
    if (e.sheenColorMap) {
      const o = {
        index: t.processTexture(e.sheenColorMap),
        texCoord: e.sheenColorMap.channel
      };
      t.applyTextureTransform(o, e.sheenColorMap), r.sheenColorTexture = o;
    }
    r.sheenRoughnessFactor = e.sheenRoughness, r.sheenColorFactor = e.sheenColor.toArray(), s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class ct {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_anisotropy";
  }
  writeMaterial(e, s) {
    if (!e.isMeshPhysicalMaterial || e.anisotropy == 0) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (e.anisotropyMap) {
      const o = { index: t.processTexture(e.anisotropyMap) };
      t.applyTextureTransform(o, e.anisotropyMap), r.anisotropyTexture = o;
    }
    r.anisotropyStrength = e.anisotropy, r.anisotropyRotation = e.anisotropyRotation, s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class ut {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_emissive_strength";
  }
  writeMaterial(e, s) {
    if (!e.isMeshStandardMaterial || e.emissiveIntensity === 1) return;
    const i = this.writer.extensionsUsed, r = {};
    r.emissiveStrength = e.emissiveIntensity, s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class lt {
  constructor(e) {
    this.writer = e, this.name = "EXT_materials_bump";
  }
  writeMaterial(e, s) {
    if (!e.isMeshStandardMaterial || e.bumpScale === 1 && !e.bumpMap) return;
    const t = this.writer, i = t.extensionsUsed, r = {};
    if (e.bumpMap) {
      const o = {
        index: t.processTexture(e.bumpMap),
        texCoord: e.bumpMap.channel
      };
      t.applyTextureTransform(o, e.bumpMap), r.bumpTexture = o;
    }
    r.bumpFactor = e.bumpScale, s.extensions = s.extensions || {}, s.extensions[this.name] = r, i[this.name] = !0;
  }
}
class ft {
  constructor(e) {
    this.writer = e, this.name = "EXT_mesh_gpu_instancing";
  }
  writeNode(e, s) {
    if (!e.isInstancedMesh) return;
    const t = this.writer, i = e, r = new Float32Array(i.count * 3), o = new Float32Array(i.count * 4), a = new Float32Array(i.count * 3), c = new le(), u = new B(), p = new Se(), l = new B();
    for (let f = 0; f < i.count; f++)
      i.getMatrixAt(f, c), c.decompose(u, p, l), u.toArray(r, f * 3), p.toArray(o, f * 4), l.toArray(a, f * 3);
    const x = {
      TRANSLATION: t.processAccessor(new L(r, 3)),
      ROTATION: t.processAccessor(new L(o, 4)),
      SCALE: t.processAccessor(new L(a, 3))
    };
    i.instanceColor && (x._COLOR_0 = t.processAccessor(i.instanceColor)), s.extensions = s.extensions || {}, s.extensions[this.name] = { attributes: x }, t.extensionsUsed[this.name] = !0, t.extensionsRequired[this.name] = !0;
  }
}
Q.Utils = {
  insertKeyframe: function(n, e) {
    const t = n.getValueSize(), i = new n.TimeBufferType(n.times.length + 1), r = new n.ValueBufferType(n.values.length + t), o = n.createInterpolant(new n.ValueBufferType(t));
    let a;
    if (n.times.length === 0) {
      i[0] = e;
      for (let c = 0; c < t; c++)
        r[c] = 0;
      a = 0;
    } else if (e < n.times[0]) {
      if (Math.abs(n.times[0] - e) < 1e-3) return 0;
      i[0] = e, i.set(n.times, 1), r.set(o.evaluate(e), 0), r.set(n.values, t), a = 0;
    } else if (e > n.times[n.times.length - 1]) {
      if (Math.abs(n.times[n.times.length - 1] - e) < 1e-3)
        return n.times.length - 1;
      i[i.length - 1] = e, i.set(n.times, 0), r.set(n.values, 0), r.set(o.evaluate(e), n.values.length), a = i.length - 1;
    } else
      for (let c = 0; c < n.times.length; c++) {
        if (Math.abs(n.times[c] - e) < 1e-3) return c;
        if (n.times[c] < e && n.times[c + 1] > e) {
          i.set(n.times.slice(0, c + 1), 0), i[c + 1] = e, i.set(n.times.slice(c + 1), c + 2), r.set(n.values.slice(0, (c + 1) * t), 0), r.set(o.evaluate(e), (c + 1) * t), r.set(n.values.slice((c + 1) * t), (c + 2) * t), a = c + 1;
          break;
        }
      }
    return n.times = i, n.values = r, a;
  },
  mergeMorphTargetTracks: function(n, e) {
    const s = [], t = {}, i = n.tracks;
    for (let r = 0; r < i.length; ++r) {
      let o = i[r];
      const a = H.parseTrackName(o.name), c = H.findNode(e, a.nodeName);
      if (a.propertyName !== "morphTargetInfluences" || a.propertyIndex === void 0) {
        s.push(o);
        continue;
      }
      if (o.createInterpolant !== o.InterpolantFactoryMethodDiscrete && o.createInterpolant !== o.InterpolantFactoryMethodLinear) {
        if (o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)
          throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");
        console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."), o = o.clone(), o.setInterpolation(ze);
      }
      const u = c.morphTargetInfluences.length, p = c.morphTargetDictionary[a.propertyIndex];
      if (p === void 0)
        throw new Error("THREE.GLTFExporter: Morph target name not found: " + a.propertyIndex);
      let l;
      if (t[c.uuid] === void 0) {
        l = o.clone();
        const f = new l.ValueBufferType(u * l.times.length);
        for (let h = 0; h < l.times.length; h++)
          f[h * u + p] = l.values[h];
        l.name = (a.nodeName || "") + ".morphTargetInfluences", l.values = f, t[c.uuid] = l, s.push(l);
        continue;
      }
      const x = o.createInterpolant(new o.ValueBufferType(1));
      l = t[c.uuid];
      for (let f = 0; f < l.times.length; f++)
        l.values[f * u + p] = x.evaluate(l.times[f]);
      for (let f = 0; f < o.times.length; f++) {
        const h = this.insertKeyframe(l, o.times[f]);
        l.values[h * u + p] = o.values[f];
      }
    }
    return n.tracks = s, n;
  }
};
class pt {
  async parse(e, s = {}) {
    s = Object.assign({
      ar: {
        anchoring: { type: "plane" },
        planeAnchoring: { alignment: "horizontal" }
      },
      quickLookCompatible: !1,
      maxTextureSize: 1024
    }, s);
    const t = {}, i = "model.usda";
    t[i] = null;
    let r = xe();
    r += dt(s);
    const o = {}, a = {};
    e.traverseVisible((u) => {
      if (u.isMesh) {
        const p = u.geometry, l = u.material;
        if (l.isMeshStandardMaterial) {
          const x = "geometries/Geometry_" + p.id + ".usda";
          if (!(x in t)) {
            const f = Tt(p);
            t[x] = gt(f);
          }
          l.uuid in o || (o[l.uuid] = l), r += mt(u, p, l);
        } else
          console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)", u);
      } else u.isCamera && (r += _t(u));
    }), r += xt(), r += At(o, a, s.quickLookCompatible), t[i] = he(r), r = null;
    for (const u in a) {
      let p = a[u];
      p.isCompressedTexture === !0 && (p = z(p));
      const l = ht(p.image, p.flipY, s.maxTextureSize), x = await new Promise((f) => l.toBlob(f, "image/png", 1));
      t[`textures/Texture_${u}.png`] = new Uint8Array(await x.arrayBuffer());
    }
    let c = 0;
    for (const u in t) {
      const p = t[u], l = 34 + u.length;
      c += l;
      const x = c & 63;
      if (x !== 4) {
        const f = 64 - x, h = new Uint8Array(f);
        t[u] = [p, { extra: { 12345: h } }];
      }
      c = p.length;
    }
    return Be(t, { level: 0 });
  }
}
function ht(n, e, s) {
  if (typeof HTMLImageElement < "u" && n instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && n instanceof OffscreenCanvas || typeof ImageBitmap < "u" && n instanceof ImageBitmap) {
    const t = s / Math.max(n.width, n.height), i = document.createElement("canvas");
    i.width = n.width * Math.min(1, t), i.height = n.height * Math.min(1, t);
    const r = i.getContext("2d");
    return e === !0 && (r.translate(0, i.height), r.scale(1, -1)), r.drawImage(n, 0, 0, i.width, i.height), i;
  } else
    throw new Error("THREE.USDZExporter: No valid image data found. Unable to process texture.");
}
const w = 7;
function xe() {
  return `#usda 1.0
(
	customLayerData = {
		string creator = "Three.js USDZExporter"
	}
	defaultPrim = "Root"
	metersPerUnit = 1
	upAxis = "Y"
)

`;
}
function dt(n) {
  return `def Xform "Root"
{
	def Scope "Scenes" (
		kind = "sceneLibrary"
	)
	{
		def Xform "Scene" (
			customData = {
				bool preliminary_collidesWithEnvironment = 0
				string sceneName = "Scene"
			}
			sceneName = "Scene"
		)
		{
		token preliminary:anchoring:type = "${n.ar.anchoring.type}"
		token preliminary:planeAnchoring:alignment = "${n.ar.planeAnchoring.alignment}"

`;
}
function xt() {
  return `
		}
	}
}

`;
}
function gt(n) {
  let e = xe();
  return e += n, he(e);
}
function mt(n, e, s) {
  const t = "Object_" + n.id, i = ge(n.matrixWorld);
  return n.matrixWorld.determinant() < 0 && console.warn("THREE.USDZExporter: USDZ does not support negative scales", n), `def Xform "${t}" (
	prepend references = @./geometries/Geometry_${e.id}.usda@</Geometry>
	prepend apiSchemas = ["MaterialBindingAPI"]
)
{
	matrix4d xformOp:transform = ${i}
	uniform token[] xformOpOrder = ["xformOp:transform"]

	rel material:binding = </Materials/Material_${s.id}>
}

`;
}
function ge(n) {
  const e = n.elements;
  return `( ${k(e, 0)}, ${k(e, 4)}, ${k(e, 8)}, ${k(e, 12)} )`;
}
function k(n, e) {
  return `(${n[e + 0]}, ${n[e + 1]}, ${n[e + 2]}, ${n[e + 3]})`;
}
function Tt(n) {
  return `
def "Geometry"
{
${Mt(n)}
}
`;
}
function Mt(n) {
  const e = "Geometry", s = n.attributes, t = s.position.count;
  return `
	def Mesh "${e}"
	{
		int[] faceVertexCounts = [${yt(n)}]
		int[] faceVertexIndices = [${wt(n)}]
		normal3f[] normals = [${J(s.normal, t)}] (
			interpolation = "vertex"
		)
		point3f[] points = [${J(s.position, t)}]
${bt(s)}
		uniform token subdivisionScheme = "none"
	}
`;
}
function yt(n) {
  const e = n.index !== null ? n.index.count : n.attributes.position.count;
  return Array(e / 3).fill(3).join(", ");
}
function wt(n) {
  const e = n.index, s = [];
  if (e !== null)
    for (let t = 0; t < e.count; t++)
      s.push(e.getX(t));
  else {
    const t = n.attributes.position.count;
    for (let i = 0; i < t; i++)
      s.push(i);
  }
  return s.join(", ");
}
function J(n, e) {
  if (n === void 0)
    return console.warn("USDZExporter: Normals missing."), Array(e).fill("(0, 0, 0)").join(", ");
  const s = [];
  for (let t = 0; t < n.count; t++) {
    const i = n.getX(t), r = n.getY(t), o = n.getZ(t);
    s.push(`(${i.toPrecision(w)}, ${r.toPrecision(w)}, ${o.toPrecision(w)})`);
  }
  return s.join(", ");
}
function Et(n) {
  const e = [];
  for (let s = 0; s < n.count; s++) {
    const t = n.getX(s), i = n.getY(s);
    e.push(`(${t.toPrecision(w)}, ${1 - i.toPrecision(w)})`);
  }
  return e.join(", ");
}
function bt(n) {
  let e = "";
  for (let t = 0; t < 4; t++) {
    const i = t > 0 ? t : "", r = n["uv" + i];
    r !== void 0 && (e += `
		texCoord2f[] primvars:st${i} = [${Et(r)}] (
			interpolation = "vertex"
		)`);
  }
  const s = n.color;
  if (s !== void 0) {
    const t = s.count;
    e += `
	color3f[] primvars:displayColor = [${J(s, t)}] (
		interpolation = "vertex"
		)`;
  }
  return e;
}
function At(n, e, s = !1) {
  const t = [];
  for (const i in n) {
    const r = n[i];
    t.push(It(r, e, s));
  }
  return `def "Materials"
{
${t.join("")}
}

`;
}
function It(n, e, s = !1) {
  const t = "			", i = [], r = [];
  function o(a, c, u) {
    const p = a.source.id + "_" + a.flipY;
    e[p] = a;
    const l = a.channel > 0 ? "st" + a.channel : "st", x = {
      1e3: "repeat",
      // RepeatWrapping
      1001: "clamp",
      // ClampToEdgeWrapping
      1002: "mirror"
      // MirroredRepeatWrapping
    }, f = a.repeat.clone(), h = a.offset.clone(), d = a.rotation, g = Math.sin(d), y = Math.cos(d);
    return h.y = 1 - h.y - f.y, s ? (h.x = h.x / f.x, h.y = h.y / f.y, h.x += g / f.x, h.y += y - 1) : (h.x += g * f.x, h.y += (1 - y) * f.y), `
		def Shader "PrimvarReader_${c}"
		{
			uniform token info:id = "UsdPrimvarReader_float2"
			float2 inputs:fallback = (0.0, 0.0)
			token inputs:varname = "${l}"
			float2 outputs:result
		}

		def Shader "Transform2d_${c}"
		{
			uniform token info:id = "UsdTransform2d"
			token inputs:in.connect = </Materials/Material_${n.id}/PrimvarReader_${c}.outputs:result>
			float inputs:rotation = ${(d * (180 / Math.PI)).toFixed(w)}
			float2 inputs:scale = ${ce(f)}
			float2 inputs:translation = ${ce(h)}
			float2 outputs:result
		}

		def Shader "Texture_${a.id}_${c}"
		{
			uniform token info:id = "UsdUVTexture"
			asset inputs:file = @textures/Texture_${p}.png@
			float2 inputs:st.connect = </Materials/Material_${n.id}/Transform2d_${c}.outputs:result>
			${u !== void 0 ? "float4 inputs:scale = " + Rt(u) : ""}
			token inputs:sourceColorSpace = "${a.colorSpace === fe ? "raw" : "sRGB"}"
			token inputs:wrapS = "${x[a.wrapS]}"
			token inputs:wrapT = "${x[a.wrapT]}"
			float outputs:r
			float outputs:g
			float outputs:b
			float3 outputs:rgb
			${n.transparent || n.alphaTest > 0 ? "float outputs:a" : ""}
		}`;
  }
  return n.side === pe && console.warn("THREE.USDZExporter: USDZ does not support double sided materials", n), n.map !== null ? (i.push(`${t}color3f inputs:diffuseColor.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:rgb>`), n.transparent ? i.push(`${t}float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:a>`) : n.alphaTest > 0 && (i.push(`${t}float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:a>`), i.push(`${t}float inputs:opacityThreshold = ${n.alphaTest}`)), r.push(o(n.map, "diffuse", n.color))) : i.push(`${t}color3f inputs:diffuseColor = ${ae(n.color)}`), n.emissiveMap !== null ? (i.push(`${t}color3f inputs:emissiveColor.connect = </Materials/Material_${n.id}/Texture_${n.emissiveMap.id}_emissive.outputs:rgb>`), r.push(o(n.emissiveMap, "emissive"))) : n.emissive.getHex() > 0 && i.push(`${t}color3f inputs:emissiveColor = ${ae(n.emissive)}`), n.normalMap !== null && (i.push(`${t}normal3f inputs:normal.connect = </Materials/Material_${n.id}/Texture_${n.normalMap.id}_normal.outputs:rgb>`), r.push(o(n.normalMap, "normal"))), n.aoMap !== null && (i.push(`${t}float inputs:occlusion.connect = </Materials/Material_${n.id}/Texture_${n.aoMap.id}_occlusion.outputs:r>`), r.push(o(n.aoMap, "occlusion"))), n.roughnessMap !== null && n.roughness === 1 ? (i.push(`${t}float inputs:roughness.connect = </Materials/Material_${n.id}/Texture_${n.roughnessMap.id}_roughness.outputs:g>`), r.push(o(n.roughnessMap, "roughness"))) : i.push(`${t}float inputs:roughness = ${n.roughness}`), n.metalnessMap !== null && n.metalness === 1 ? (i.push(`${t}float inputs:metallic.connect = </Materials/Material_${n.id}/Texture_${n.metalnessMap.id}_metallic.outputs:b>`), r.push(o(n.metalnessMap, "metallic"))) : i.push(`${t}float inputs:metallic = ${n.metalness}`), n.alphaMap !== null ? (i.push(`${t}float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.alphaMap.id}_opacity.outputs:r>`), i.push(`${t}float inputs:opacityThreshold = 0.0001`), r.push(o(n.alphaMap, "opacity"))) : i.push(`${t}float inputs:opacity = ${n.opacity}`), n.isMeshPhysicalMaterial && (i.push(`${t}float inputs:clearcoat = ${n.clearcoat}`), i.push(`${t}float inputs:clearcoatRoughness = ${n.clearcoatRoughness}`), i.push(`${t}float inputs:ior = ${n.ior}`)), `
	def Material "Material_${n.id}"
	{
		def Shader "PreviewSurface"
		{
			uniform token info:id = "UsdPreviewSurface"
${i.join(`
`)}
			int inputs:useSpecularWorkflow = 0
			token outputs:surface
		}

		token outputs:surface.connect = </Materials/Material_${n.id}/PreviewSurface.outputs:surface>

${r.join(`
`)}

	}
`;
}
function ae(n) {
  return `(${n.r}, ${n.g}, ${n.b})`;
}
function Rt(n) {
  return `(${n.r}, ${n.g}, ${n.b}, 1.0)`;
}
function ce(n) {
  return `(${n.x}, ${n.y})`;
}
function _t(n) {
  const e = n.name ? n.name : "Camera_" + n.id, s = ge(n.matrixWorld);
  return n.matrixWorld.determinant() < 0 && console.warn("THREE.USDZExporter: USDZ does not support negative scales", n), n.isOrthographicCamera ? `def Camera "${e}"
		{
			matrix4d xformOp:transform = ${s}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${n.near.toPrecision(w)}, ${n.far.toPrecision(w)})
			float horizontalAperture = ${((Math.abs(n.left) + Math.abs(n.right)) * 10).toPrecision(w)}
			float verticalAperture = ${((Math.abs(n.top) + Math.abs(n.bottom)) * 10).toPrecision(w)}
			token projection = "orthographic"
		}
	
	` : `def Camera "${e}"
		{
			matrix4d xformOp:transform = ${s}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${n.near.toPrecision(w)}, ${n.far.toPrecision(w)})
			float focalLength = ${n.getFocalLength().toPrecision(w)}
			float focusDistance = ${n.focus.toPrecision(w)}
			float horizontalAperture = ${n.getFilmWidth().toPrecision(w)}
			token projection = "perspective"
			float verticalAperture = ${n.getFilmHeight().toPrecision(w)}
		}
	
	`;
}
class vt {
  constructor() {
    Y(this, "_gltfExporter");
    Y(this, "_usdzExporter");
    this._gltfExporter = new Q(), this._usdzExporter = new pt();
  }
  async export(e, s, t) {
    switch (s) {
      case "glb":
        return this._exportGlb(e, t);
      case "gltf":
        return this._exportGltf(e, t);
      case "usdz":
        return this._exportUsdz(e, t);
      default:
        throw new He(`Unsupported file type: ${s}`, s);
    }
  }
  async _exportGlb(e, s) {
    try {
      const t = await this._gltfExporter.parseAsync(e, {
        ...s,
        binary: !0
      });
      if (t instanceof ArrayBuffer)
        return t;
      throw new N("Failed to export GLB: expected ArrayBuffer");
    } catch (t) {
      throw t instanceof N ? t : new N("Failed to export GLB", t);
    }
  }
  async _exportGltf(e, s) {
    try {
      const t = await this._gltfExporter.parseAsync(e, {
        ...s,
        binary: !1
      }), i = JSON.stringify(t);
      return new TextEncoder().encode(i).buffer;
    } catch (t) {
      throw t instanceof N ? t : new N("Failed to export GLTF", t);
    }
  }
  async _exportUsdz(e, s) {
    try {
      return (await this._usdzExporter.parse(e, s)).buffer;
    } catch (t) {
      throw t instanceof N ? t : new N("Failed to export USDZ", t);
    }
  }
}
export {
  vt as AssetExporter
};
