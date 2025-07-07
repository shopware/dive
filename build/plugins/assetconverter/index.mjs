var i = Object.defineProperty;
var _ = (o, t, r) => t in o ? i(o, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[t] = r;
var e = (o, t, r) => _(o, typeof t != "symbol" ? t + "" : t, r);
class n {
  constructor(t, r) {
    e(this, "_uri", "");
    this._loader = t, this._exporter = r;
  }
  convert(t) {
    return this._uri = t, {
      to: this._to.bind(this)
    };
  }
  async _to(t, r) {
    const s = await this._loader.load(this._uri);
    return this._exporter.export(s, t, r);
  }
}
export {
  n as AssetConverter
};
