import { ParseError } from '../parse-error';

describe('ParseError', () => {
    it('should create a ParseError with message', () => {
        const error = new ParseError('Test error message');
        expect(error.message).toBe('Test error message');
        expect(error.name).toBe('ParseError');
        expect(error.cause).toBeUndefined();
    });

    it('should create a ParseError with message and cause', () => {
        const cause = new Error('Original error');
        const error = new ParseError('Test error message', cause);
        expect(error.message).toBe('Test error message');
        expect(error.name).toBe('ParseError');
        expect(error.cause).toBe(cause);
    });
});
