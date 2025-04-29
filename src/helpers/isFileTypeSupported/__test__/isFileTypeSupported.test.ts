import { isFileTypeSupported } from '../isFileTypeSupported';

describe('isFileTypeSupported', () => {
    it('should return true for supported file types', () => {
        expect(isFileTypeSupported('glb')).toBe(true);
        expect(isFileTypeSupported('gltf')).toBe(true);
        expect(isFileTypeSupported('usdz')).toBe(true);
    });

    it('should return false for unsupported file types', () => {
        expect(isFileTypeSupported('jpg')).toBe(false);
        expect(isFileTypeSupported('png')).toBe(false);
        expect(isFileTypeSupported('pdf')).toBe(false);
        expect(isFileTypeSupported('')).toBe(false);
    });

    it('should be case insensitive', () => {
        expect(isFileTypeSupported('GLB')).toBe(true);
        expect(isFileTypeSupported('GlTf')).toBe(true);
        expect(isFileTypeSupported('USDZ')).toBe(true);
    });
});
