vi.mock('@shopware-ag/dive/shader', () => ({
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

import { Chunk } from '../Chunk.ts';
import { FileContentError, NetworkError } from '@shopware-ag/dive';

// Mock fetch
global.fetch = vi.fn().mockImplementation(async (uri) => ({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(0),
}));

describe('Chunk', () => {
    const mockUri = 'https://example.com/asset.glb';

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(global.fetch).mockClear();
    });

    describe('constructor', () => {
        it('should create a chunk with uri', () => {
            const chunk = new Chunk(mockUri);

            expect(chunk).toBeInstanceOf(Chunk);
        });

        it('should initialize properties correctly', () => {
            const beforeCreate = new Date();
            const chunk = new Chunk(mockUri);
            const afterCreate = new Date();

            expect(chunk.arrayBuffer).toBeNull();
            expect(chunk.size).toBe(0);
            expect(chunk.createdAt).toBeInstanceOf(Date);
            expect(chunk.updatedAt).toBeInstanceOf(Date);
            expect(chunk.createdAt.getTime()).toBeGreaterThanOrEqual(
                beforeCreate.getTime(),
            );
            expect(chunk.createdAt.getTime()).toBeLessThanOrEqual(
                afterCreate.getTime(),
            );
            expect(chunk.promise).toBeInstanceOf(Promise);
        });

        it('should create different chunks with different uris', () => {
            const chunk1 = new Chunk('uri1');
            const chunk2 = new Chunk('uri2');

            expect(chunk1).not.toBe(chunk2);
            expect(chunk1.promise).not.toBe(chunk2.promise);
        });
    });

    describe('load', () => {
        it('should fetch asset successfully', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            const chunk = new Chunk(mockUri);
            const result = await chunk.load();

            expect(global.fetch).toHaveBeenCalledWith(mockUri);
            expect(result).toBe(mockArrayBuffer);
            expect(chunk.arrayBuffer).toBe(mockArrayBuffer);
            expect(chunk.size).toBe(1024);
        });

        it('should update updatedAt timestamp after successful fetch', async () => {
            const mockArrayBuffer = new ArrayBuffer(512);

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            const chunk = new Chunk(mockUri);
            const initialUpdatedAt = chunk.updatedAt;

            // Wait 100ms to ensure timestamp difference
            await new Promise((resolve) => setTimeout(resolve, 100));

            await chunk.load();

            expect(chunk.updatedAt.getTime()).toBeGreaterThan(
                initialUpdatedAt.getTime(),
            );
        });

        it('should resolve the promise after successful fetch', async () => {
            const mockArrayBuffer = new ArrayBuffer(100);

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            const chunk = new Chunk(mockUri);

            // Start fetch but don't await it
            const fetchPromise = chunk.load();

            // The chunk's promise should resolve to the same result
            const promiseResult = await chunk.promise;
            const fetchResult = await fetchPromise;

            expect(promiseResult).toBe(mockArrayBuffer);
            expect(fetchResult).toBe(mockArrayBuffer);
        });

        it('should throw NetworkError when response is not ok', async () => {
            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: false,
            } as Response);

            const chunk = new Chunk(mockUri);

            await expect(chunk.load()).rejects.toThrow(NetworkError);
        });

        it('should throw FileContentError when arrayBuffer fails', async () => {
            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => {
                    throw new Error('Failed to read arrayBuffer');
                },
            } as unknown as Response);

            const chunk = new Chunk(mockUri);

            await expect(chunk.load()).rejects.toThrow(FileContentError);
        });

        it('should handle different array buffer sizes', async () => {
            const testSizes = [
                0,
                1,
                1024,
                1024 * 1024,
            ];

            for (const size of testSizes) {
                vi.clearAllMocks();
                const mockArrayBuffer = new ArrayBuffer(size);

                vi.mocked(global.fetch).mockResolvedValueOnce({
                    ok: true,
                    arrayBuffer: async () => mockArrayBuffer,
                } as Response);

                const chunk = new Chunk(`${mockUri}?size=${size}`);
                await chunk.load();

                expect(chunk.size).toBe(size);
                expect(chunk.arrayBuffer).toBe(mockArrayBuffer);
            }
        });
    });

    describe('properties', () => {
        it('should have correct initial property values', () => {
            const chunk = new Chunk(mockUri);

            expect(chunk.arrayBuffer).toBeNull();
            expect(chunk.size).toBe(0);
            expect(chunk.createdAt).toBeInstanceOf(Date);
            expect(chunk.updatedAt).toBeInstanceOf(Date);
            expect(chunk.promise).toBeInstanceOf(Promise);
        });

        it('should update properties after successful fetch', async () => {
            const mockArrayBuffer = new ArrayBuffer(2048);

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            const chunk = new Chunk(mockUri);

            // Properties before fetch
            expect(chunk.arrayBuffer).toBeNull();
            expect(chunk.size).toBe(0);

            await chunk.load();

            // Properties after fetch
            expect(chunk.arrayBuffer).toBe(mockArrayBuffer);
            expect(chunk.size).toBe(2048);
        });
    });

    describe('error scenarios', () => {
        it('should preserve error context in NetworkError', async () => {
            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: false,
                status: 404,
            } as unknown as Response);

            const chunk = new Chunk(mockUri);

            await expect(async () => {
                await chunk.load();
            }).rejects.toThrow(NetworkError);

            try {
                await chunk.load();
            } catch (error) {
                expect(error).toBeInstanceOf(NetworkError);
                expect((error as NetworkError).message).toContain(mockUri);
            }
        });

        it('should preserve error context in FileContentError', async () => {
            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => {
                    throw new Error('Stream error');
                },
            } as unknown as Response);

            const chunk = new Chunk(mockUri);

            await expect(async () => {
                await chunk.load();
            }).rejects.toThrow(FileContentError);

            try {
                await chunk.load();
            } catch (error) {
                expect(error).toBeInstanceOf(FileContentError);
                expect((error as FileContentError).message).toContain(mockUri);
            }
        });
    });
});
