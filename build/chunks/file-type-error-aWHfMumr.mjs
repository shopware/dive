class t extends Error {
  constructor(e, r) {
    super(e), this.requestedFileType = r, this.name = "FileTypeError";
  }
}
export {
  t as F
};
