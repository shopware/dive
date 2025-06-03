class t extends Error {
  constructor(r, e) {
    super(r), this.requestedFileType = e, this.name = "FileTypeError";
  }
}
class o extends Error {
  constructor(r, e) {
    super(r), this.cause = e, this.name = "ParseError";
  }
}
export {
  t as F,
  o as P
};
