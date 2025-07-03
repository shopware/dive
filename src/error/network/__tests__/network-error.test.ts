import { NetworkError } from '../network-error.js';

describe('NetworkError', () => {
    it('should create a NetworkError with url', () => {
        const error = new NetworkError('https://example.com/model.glb');
        expect(error.message).toBe(
            'Failed to fetch file from https://example.com/model.glb',
        );
        expect(error.name).toBe('NetworkError');
        expect(error.url).toBe('https://example.com/model.glb');
        expect(error.cause).toBeUndefined();
    });

    it('should create a NetworkError with url and cause', () => {
        const cause = new Error('Connection timeout');
        const error = new NetworkError('https://example.com/model.glb', cause);
        expect(error.message).toBe(
            'Failed to fetch file from https://example.com/model.glb',
        );
        expect(error.name).toBe('NetworkError');
        expect(error.url).toBe('https://example.com/model.glb');
        expect(error.cause).toBe(cause);
    });
});
