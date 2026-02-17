import { isFileTypeSupported } from '../isFileTypeSupported.ts';

describe('isFileTypeSupported', () => {
    it('should return true for supported file types', () => {
        expect(isFileTypeSupported('glb')).toBe(true);
        expect(isFileTypeSupported('gltf')).toBe(true);
        expect(isFileTypeSupported('usdz')).toBe(true);
        expect(isFileTypeSupported('step')).toBe(true);
        expect(isFileTypeSupported('stp')).toBe(true);
        expect(isFileTypeSupported('iges')).toBe(true);
        expect(isFileTypeSupported('igs')).toBe(true);
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
        expect(isFileTypeSupported('STEP')).toBe(true);
        expect(isFileTypeSupported('STP')).toBe(true);
        expect(isFileTypeSupported('IGES')).toBe(true);
        expect(isFileTypeSupported('IGS')).toBe(true);
    });
});
