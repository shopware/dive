import { NetworkError } from '../network-error';

describe('NetworkError', () => {
    it('should create a NetworkError with url and message', () => {
        const error = new NetworkError(
            'https://example.com',
            'Network request failed',
        );
        expect(error.message).toBe('Network request failed');
        expect(error.name).toBe('NetworkError');
        expect(error.url).toBe('https://example.com');
        expect(error.cause).toBeUndefined();
    });

    it('should create a NetworkError with url, message and cause', () => {
        const cause = new Error('Connection timeout');
        const error = new NetworkError(
            'https://example.com',
            'Network request failed',
            cause,
        );
        expect(error.message).toBe('Network request failed');
        expect(error.name).toBe('NetworkError');
        expect(error.url).toBe('https://example.com');
        expect(error.cause).toBe(cause);
    });
});
