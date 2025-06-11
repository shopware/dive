import { ParseError } from '../parse-error.js';

describe('ParseError', () => {
    it('should create a ParseError with uri', () => {
        const error = new ParseError('https://example.com/model.glb');
        expect(error.message).toBe(
            'Failed to parse array buffer from https://example.com/model.glb',
        );
        expect(error.name).toBe('ParseError');
        expect(error.uri).toBe('https://example.com/model.glb');
        expect(error.cause).toBeUndefined();
    });

    it('should create a ParseError with uri and cause', () => {
        const cause = new Error('Original error');
        const error = new ParseError('https://example.com/model.glb', cause);
        expect(error.message).toBe(
            'Failed to parse array buffer from https://example.com/model.glb',
        );
        expect(error.name).toBe('ParseError');
        expect(error.uri).toBe('https://example.com/model.glb');
        expect(error.cause).toBe(cause);
    });
});
