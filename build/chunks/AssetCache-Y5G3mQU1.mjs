var i = Object.defineProperty;
var h = (s, t, e) => t in s ? i(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var r = (s, t, e) => h(s, typeof t != "symbol" ? t + "" : t, e);
import "./FileTypes-Cu4s3c_0.mjs";
import "three";
import { N as u, F as c } from "./network-error-BONfHWQq.mjs";
import { P as _ } from "./parse-error-IryNa_oq.mjs";
class n {
  constructor(t, e) {
    r(this, "_promise");
    r(this, "_resolve");
    r(this, "_arrayBuffer", null);
    r(this, "_result", null);
    // metadata
    r(this, "_size", -1);
    r(this, "_createdAt");
    r(this, "_updatedAt");
    this._uri = t, this._parse = e, this._promise = new Promise((a) => {
      this._resolve = a;
    }), this._createdAt = /* @__PURE__ */ new Date(), this._updatedAt = /* @__PURE__ */ new Date();
  }
  get promise() {
    return this._promise;
  }
  get result() {
    return this._result;
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
  async fetch() {
    const t = await fetch(this._uri);
    if (!t.ok)
      throw new u(this._uri);
    try {
      const e = await t.arrayBuffer();
      this._arrayBuffer = e, this._size = e.byteLength;
    } catch {
      throw new c(this._uri);
    }
    try {
      const e = this._parse(this._arrayBuffer);
      this._result = await e;
    } catch {
      throw new _(this._uri);
    }
    return this._updatedAt = /* @__PURE__ */ new Date(), this._resolve(this._result), this._result;
  }
}
class o {
  constructor() {
    r(this, "_cache", /* @__PURE__ */ new Map());
  }
  create(t, e) {
    const a = new n(t, e);
    return this._cache.set(t, a), a;
  }
  write(t, e) {
    this._cache.set(t, e);
  }
  read(t) {
    return this._cache.get(t) ?? null;
  }
  delete(t) {
    this._cache.delete(t);
  }
  clear() {
    this._cache.clear();
  }
}
const m = new o();
export {
  m as A,
  n as C
};
