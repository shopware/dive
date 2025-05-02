import { vi } from 'vitest';

export const GLTFExporter = vi.fn(function () {
    this.parseAsync = () =>
        new Promise<ArrayBuffer | { [key: string]: unknown }>((resolve) => {
            resolve(new ArrayBuffer(0));
        });
    return this;
});
