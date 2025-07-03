import { vi } from 'vitest';

export const DRACOLoader = vi.fn(() => {
    return {
        setDecoderPath: vi.fn(),
    };
});
