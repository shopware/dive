class t extends Error {
  constructor(r, e) {
    super(r), this.requestedFileType = e, this.name = "FileTypeError";
  }
}
class a extends Error {
  constructor(r, e) {
    super(`Failed to parse array buffer from ${r}`), this.uri = r, this.cause = e, this.name = "ParseError";
  }
}
export {
  t as F,
  a as P
};
