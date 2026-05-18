import { isURIFileExtensionSupported } from '../isURIFileExtensionSupported.ts';

describe('isURIFileExtensionSupported', () => {
    it('should return true for URIs with supported file extensions', () => {
        expect(
            isURIFileExtensionSupported('https://example.com/model.glb'),
        ).toBe(true);
        expect(isURIFileExtensionSupported('file:///path/to/model.gltf')).toBe(
            true,
        );
        expect(isURIFileExtensionSupported('model.usdz')).toBe(true);
        expect(isURIFileExtensionSupported('/assets/part.step')).toBe(true);
        expect(isURIFileExtensionSupported('/assets/part.stp')).toBe(true);
        expect(isURIFileExtensionSupported('/assets/part.iges')).toBe(true);
        expect(isURIFileExtensionSupported('/assets/part.igs')).toBe(true);
    });

    it('should return true for supported file extensions regardless of case', () => {
        expect(
            isURIFileExtensionSupported('https://example.com/model.GLB'),
        ).toBe(true);
        expect(isURIFileExtensionSupported('/assets/model.GlTf')).toBe(true);
        expect(isURIFileExtensionSupported('/assets/model.STEP')).toBe(true);
    });

    it('should return true for URIs with query parameters or fragments', () => {
        expect(
            isURIFileExtensionSupported(
                'https://example.com/model.glb?version=1',
            ),
        ).toBe(true);
        expect(
            isURIFileExtensionSupported(
                'https://example.com/model.gltf#preview',
            ),
        ).toBe(true);
    });

    it('should return false for URIs with unsupported file extensions', () => {
        expect(
            isURIFileExtensionSupported('https://example.com/model.jpg'),
        ).toBe(false);
        expect(isURIFileExtensionSupported('/assets/model.png')).toBe(false);
        expect(isURIFileExtensionSupported('/assets/model.txt')).toBe(false);
    });

    it('should return false for URIs without file extensions', () => {
        expect(isURIFileExtensionSupported('https://example.com/model')).toBe(
            false,
        );
        expect(
            isURIFileExtensionSupported('/assets/model?file=model.glb'),
        ).toBe(false);
        expect(isURIFileExtensionSupported('/assets/model')).toBe(false);
        expect(isURIFileExtensionSupported('')).toBe(false);
    });
});
