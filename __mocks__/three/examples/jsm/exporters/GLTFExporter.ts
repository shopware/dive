export const GLTFExporter = jest.fn(function () {
    this.parseAsync = () =>
        new Promise<ArrayBuffer | { [key: string]: unknown }>((resolve) => {
            resolve(new ArrayBuffer(0));
        });
    return this;
});
