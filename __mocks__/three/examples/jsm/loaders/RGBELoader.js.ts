import { vi } from 'vitest';
import { Texture } from '../../../../three.ts';

export const RGBELoader = vi.fn(function (this: any) {
    this.loadAsync = vi.fn(async (_url: string) => {
        const tex = new Texture();
        // add a dispose method as HDREnvironment calls dispose on it during cleanup
        tex.dispose = vi.fn();
        return tex as unknown as any;
    });
    return this;
});
