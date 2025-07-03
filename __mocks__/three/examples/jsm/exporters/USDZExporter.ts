import { vi } from 'vitest';

export const USDZExporter = vi.fn(function () {
    this.parse = vi.fn().mockResolvedValue(new Uint8Array());
    return this;
});
