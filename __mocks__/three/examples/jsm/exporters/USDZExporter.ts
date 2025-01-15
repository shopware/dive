export const USDZExporter = jest.fn(function () {
    this.parse = jest.fn().mockResolvedValue(new Uint8Array());
    return this;
});
