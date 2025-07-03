import { FileContentError } from '../file-content-error.js';

describe('FileContentError', () => {
    it('should create a FileContentError with uri', () => {
        const error = new FileContentError('https://example.com/model.glb');
        expect(error.message).toBe(
            'Failed to create array buffer from fetched file! (Uri: https://example.com/model.glb)',
        );
        expect(error.name).toBe('FileContentError');
        expect(error.uri).toBe('https://example.com/model.glb');
        expect(error.cause).toBeUndefined();
    });

    it('should handle different uri formats', () => {
        const localPath = '/local/path/to/file.usdz';
        const error = new FileContentError(localPath);
        expect(error.message).toBe(
            'Failed to create array buffer from fetched file! (Uri: /local/path/to/file.usdz)',
        );
        expect(error.name).toBe('FileContentError');
        expect(error.uri).toBe(localPath);
    });

    it('should be an instance of Error', () => {
        const error = new FileContentError('test-uri');
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(FileContentError);
    });

    it('should have proper error properties for stack traces', () => {
        const error = new FileContentError('https://example.com/test.glb');
        expect(error.stack).toBeDefined();
        expect(typeof error.stack).toBe('string');
    });
});
