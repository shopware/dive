import { isFileExtensionSupported } from '../isFileExtensionSupported.ts';

describe('isFileExtensionSupported', () => {
    it('should return true for supported file types', () => {
        expect(isFileExtensionSupported('glb')).toBe(true);
        expect(isFileExtensionSupported('gltf')).toBe(true);
        expect(isFileExtensionSupported('usdz')).toBe(true);
        expect(isFileExtensionSupported('step')).toBe(true);
        expect(isFileExtensionSupported('stp')).toBe(true);
        expect(isFileExtensionSupported('iges')).toBe(true);
        expect(isFileExtensionSupported('igs')).toBe(true);
    });

    it('should return false for unsupported file types', () => {
        expect(isFileExtensionSupported('jpg')).toBe(false);
        expect(isFileExtensionSupported('png')).toBe(false);
        expect(isFileExtensionSupported('pdf')).toBe(false);
        expect(isFileExtensionSupported('')).toBe(false);
    });

    it('should be case insensitive', () => {
        expect(isFileExtensionSupported('GLB')).toBe(true);
        expect(isFileExtensionSupported('GlTf')).toBe(true);
        expect(isFileExtensionSupported('USDZ')).toBe(true);
        expect(isFileExtensionSupported('STEP')).toBe(true);
        expect(isFileExtensionSupported('STP')).toBe(true);
        expect(isFileExtensionSupported('IGES')).toBe(true);
        expect(isFileExtensionSupported('IGS')).toBe(true);
    });
});
