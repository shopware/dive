import { Texture } from 'three';
import { vi } from 'vitest';

export const RGBELoader = vi.fn(function (this: any) {
    this.loadAsync = vi.fn(async (_url: string) => {
        const tex = {
            dispose: vi.fn(),
            mapping: undefined,
            colorSpace: 'srgb',
        };
        return tex as unknown as Texture;
    });
    return this;
});
