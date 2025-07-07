var h = Object.defineProperty;
var c = (s, e, t) => e in s ? h(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => c(s, typeof e != "symbol" ? e + "" : e, t);
import "./FileTypes-DliuedHo.mjs";
import "three";
import { N as o, F as _ } from "./network-error-BONfHWQq.mjs";
class n {
  constructor(e) {
    r(this, "_promise");
    r(this, "_resolve");
    r(this, "_arrayBuffer", null);
    // metadata
    r(this, "_size", 0);
    r(this, "_createdAt");
    r(this, "_updatedAt");
    this._uri = e, this._promise = new Promise((t) => {
      this._resolve = t;
    }), this._createdAt = /* @__PURE__ */ new Date(), this._updatedAt = /* @__PURE__ */ new Date();
  }
  get promise() {
    return this._promise;
  }
  get size() {
    return this._size;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get arrayBuffer() {
    return this._arrayBuffer;
  }
  async load() {
    const e = await fetch(this._uri);
    if (!e.ok)
      throw new o(this._uri);
    try {
      this._arrayBuffer = await e.arrayBuffer(), this._size += this._arrayBuffer.byteLength, this._updatedAt = /* @__PURE__ */ new Date();
    } catch {
      throw new _(this._uri);
    }
    return this._resolve(this._arrayBuffer), this._arrayBuffer;
  }
}
class u {
  constructor() {
    r(this, "_cache", /* @__PURE__ */ new Map());
  }
  get() {
    return this._cache;
  }
  create(e) {
    const t = new n(e);
    return this._cache.set(e, t), t;
  }
  write(e, t) {
    this._cache.set(e, t);
  }
  read(e) {
    return this._cache.get(e) ?? null;
  }
  delete(...e) {
    e.forEach((t) => {
      this._cache.delete(t);
    });
  }
  clear() {
    this._cache.clear();
  }
}
const a = Symbol.for("@shopware-ag/dive/assetcache"), i = globalThis;
i[a] || (i[a] = new u());
const w = i[a];
export {
  w as A,
  n as C
};
