import { getFileTypeFromUri } from '../getFileTypeFromUri';

describe('getFileTypeFromUri', () => {
    it('should extract file extension from URI', () => {
        expect(getFileTypeFromUri('https://example.com/model.glb')).toBe('glb');
        expect(getFileTypeFromUri('file:///path/to/model.gltf')).toBe('gltf');
        expect(getFileTypeFromUri('model.usdz')).toBe('usdz');
    });

    it('should handle URIs with multiple dots', () => {
        expect(getFileTypeFromUri('model.test.glb')).toBe('glb');
        expect(getFileTypeFromUri('path/to/model.test.gltf')).toBe('gltf');
    });

    it('should return empty string for URIs without extension', () => {
        expect(getFileTypeFromUri('https://example.com/model')).toBe('');
        expect(getFileTypeFromUri('file:///path/to/model')).toBe('');
        expect(getFileTypeFromUri('model')).toBe('');
    });

    it('should handle URIs ending with a dot', () => {
        expect(getFileTypeFromUri('https://example.com/model.')).toBe('');
        expect(getFileTypeFromUri('model.')).toBe('');
    });

    it('should handle empty and invalid URIs', () => {
        expect(getFileTypeFromUri('')).toBe('');
        expect(getFileTypeFromUri('/')).toBe('');
        expect(getFileTypeFromUri('//')).toBe('');
    });

    it('should handle mocked pop returning undefined', () => {
        const originalPop = Array.prototype.pop;
        Array.prototype.pop = jest
            .fn()
            .mockReturnValueOnce('model.test') // First pop() call
            .mockReturnValueOnce(undefined); // Second pop() call

        expect(getFileTypeFromUri('model.test')).toBe('');

        Array.prototype.pop = originalPop;
    });

    it('should be case insensitive', () => {
        expect(getFileTypeFromUri('model.GLB')).toBe('glb');
        expect(getFileTypeFromUri('model.GlTf')).toBe('gltf');
        expect(getFileTypeFromUri('model.USDZ')).toBe('usdz');
    });
});
