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

        it('should read from response.body reader when available', async () => {
            const firstChunk = new Uint8Array([
                1,
                2,
                3,
            ]);
            const secondChunk = new Uint8Array([
                4,
                5,
            ]);
            const read = vi
                .fn()
                .mockResolvedValueOnce({
                    done: false,
                    value: firstChunk,
                })
                .mockResolvedValueOnce({
                    done: false,
                    value: secondChunk,
                })
                .mockResolvedValueOnce({
                    done: true,
                    value: undefined,
                });
            const releaseLock = vi.fn();
            const arrayBuffer = vi.fn();

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                body: {
                    getReader: () => ({
                        read,
                        releaseLock,
                    }),
                },
                arrayBuffer,
            } as unknown as Response);

            const chunk = new Chunk(mockUri);
            const result = new Uint8Array(await chunk.load());

            expect(Array.from(result)).toEqual([
                1,
                2,
                3,
                4,
                5,
            ]);
            expect(read).toHaveBeenCalledTimes(3);
            expect(releaseLock).toHaveBeenCalledTimes(1);
            expect(arrayBuffer).not.toHaveBeenCalled();
            expect(chunk.size).toBe(5);
        });

        it('should handle empty reader chunks', async () => {
            const read = vi
                .fn()
                .mockResolvedValueOnce({
                    done: false,
                    value: undefined,
                })
                .mockResolvedValueOnce({
                    done: true,
                    value: undefined,
                });
            const releaseLock = vi.fn();

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                body: {
                    getReader: () => ({
                        read,
                        releaseLock,
                    }),
                },
                arrayBuffer: async () => new ArrayBuffer(1),
            } as unknown as Response);

            const chunk = new Chunk(mockUri);
            const result = await chunk.load();

            expect(result.byteLength).toBe(0);
            expect(chunk.size).toBe(0);
            expect(releaseLock).toHaveBeenCalledTimes(1);
        });

        it('should throw FileContentError when reader.read fails', async () => {
            const releaseLock = vi.fn();

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                body: {
                    getReader: () => ({
                        read: async () => {
                            throw new Error('Reader failed');
                        },
                        releaseLock,
                    }),
                },
                arrayBuffer: async () => new ArrayBuffer(1),
            } as unknown as Response);

            const chunk = new Chunk(mockUri);

            await expect(chunk.load()).rejects.toThrow(FileContentError);
            expect(releaseLock).toHaveBeenCalledTimes(1);
        });

        it('should read response headers through the helper', () => {
            const chunk = new Chunk(mockUri);
            const get = vi.fn().mockReturnValue('1024');
            const response = {
                headers: {
                    get,
                },
            } as unknown as Pick<Response, 'headers'>;

            expect(chunk['_getHeader'](response, 'content-length')).toBe(
                '1024',
            );
            expect(get).toHaveBeenCalledWith('content-length');
        });

        it('should return null when response headers are unavailable', () => {
            const chunk = new Chunk(mockUri);

            expect(
                chunk['_getHeader'](
                    {} as unknown as Pick<Response, 'headers'>,
                    'content-length',
                ),
            ).toBeNull();
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
