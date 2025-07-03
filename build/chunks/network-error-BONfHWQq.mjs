class o extends Error {
  constructor(r) {
    super(`Failed to create array buffer from fetched file! (Uri: ${r})`), this.uri = r, this.name = "FileContentError";
  }
}
class s extends Error {
  constructor(r, t) {
    super(`Failed to fetch file from ${r}`), this.url = r, this.cause = t, this.name = "NetworkError";
  }
}
export {
  o as F,
  s as N
};
