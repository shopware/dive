class t extends Error {
  constructor(r, e) {
    super(r), this.cause = e, this.name = "ParseError";
  }
}
class o extends Error {
  constructor(r, e) {
    super(r), this.requestedFileType = e, this.name = "FileTypeError";
  }
}
export {
  o as F,
  t as P
};
//# sourceMappingURL=file-type-error-D6aWGgyc.mjs.map
