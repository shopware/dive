import { Chunk } from '../Chunk.ts';
import { FileContentError, NetworkError, ParseError } from '@shopware-ag/dive';

// Mock fetch
global.fetch = vi.fn().mockImplementation(async (uri) => ({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(0),
}));

describe('Chunk', () => {
    const mockUri = 'https://example.com/asset.glb';
    const mockParser = vi.fn().mockResolvedValue({ id: 'parsed-result' });

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(global.fetch).mockClear();
        mockParser.mockClear();
    });

    describe('constructor', () => {
        it('should create a chunk with uri and parser', () => {
            const chunk = new Chunk(mockUri, mockParser);

            expect(chunk).toBeInstanceOf(Chunk);
        });

        it('should initialize properties correctly', () => {
            const beforeCreate = new Date();
            const chunk = new Chunk(mockUri, mockParser);
            const afterCreate = new Date();

            expect(chunk.result).toBeNull();
            expect(chunk.arrayBuffer).toBeNull();
            expect(chunk.size).toBe(-1);
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

        it('should create different chunks with different parsers', () => {
            const parser1 = vi.fn().mockResolvedValue({ type: 'gltf' });
            const parser2 = vi.fn().mockResolvedValue({ type: 'texture' });

            const chunk1 = new Chunk('uri1', parser1);
            const chunk2 = new Chunk('uri2', parser2);

            expect(chunk1).not.toBe(chunk2);
            expect(chunk1.promise).not.toBe(chunk2.promise);
        });
    });

    describe('fetch', () => {
        it('should fetch and parse asset successfully', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            const mockResult = { id: 'success', data: 'parsed' };

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            mockParser.mockResolvedValueOnce(mockResult);

            const chunk = new Chunk(mockUri, mockParser);
            const result = await chunk.fetch();

            expect(global.fetch).toHaveBeenCalledWith(mockUri);
            expect(mockParser).toHaveBeenCalledWith(mockArrayBuffer);
            expect(result).toBe(mockResult);
            expect(chunk.result).toBe(mockResult);
            expect(chunk.arrayBuffer).toBe(mockArrayBuffer);
            expect(chunk.size).toBe(1024);
        });

        it('should update updatedAt timestamp after successful fetch', async () => {
            const mockArrayBuffer = new ArrayBuffer(512);
            const mockResult = { id: 'test' };

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            mockParser.mockResolvedValueOnce(mockResult);

            const chunk = new Chunk(mockUri, mockParser);
            const initialUpdatedAt = chunk.updatedAt;

            // Wait a bit to ensure timestamp difference
            await new Promise((resolve) => setTimeout(resolve, 1));

            await chunk.fetch();

            expect(chunk.updatedAt.getTime()).toBeGreaterThan(
                initialUpdatedAt.getTime(),
            );
        });

        it('should resolve the promise after successful fetch', async () => {
            const mockResult = { id: 'promise-test' };

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => new ArrayBuffer(100),
            } as Response);

            mockParser.mockResolvedValueOnce(mockResult);

            const chunk = new Chunk(mockUri, mockParser);

            // Start fetch but don't await it
            const fetchPromise = chunk.fetch();

            // The chunk's promise should resolve to the same result
            const promiseResult = await chunk.promise;
            const fetchResult = await fetchPromise;

            expect(promiseResult).toBe(mockResult);
            expect(fetchResult).toBe(mockResult);
        });

        it('should throw NetworkError when response is not ok', async () => {
            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: false,
            } as Response);

            const chunk = new Chunk(mockUri, mockParser);

            await expect(chunk.fetch()).rejects.toThrow(NetworkError);
            expect(mockParser).not.toHaveBeenCalled();
        });

        it('should throw FileContentError when arrayBuffer fails', async () => {
            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => {
                    throw new Error('Failed to read arrayBuffer');
                },
            } as unknown as Response);

            const chunk = new Chunk(mockUri, mockParser);

            await expect(chunk.fetch()).rejects.toThrow(FileContentError);
            expect(mockParser).not.toHaveBeenCalled();
        });

        it('should throw ParseError when parser fails', async () => {
            const mockArrayBuffer = new ArrayBuffer(100);

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            mockParser.mockRejectedValueOnce(new Error('Parse failed'));

            const chunk = new Chunk(mockUri, mockParser);

            await expect(chunk.fetch()).rejects.toThrow(ParseError);
            expect(mockParser).toHaveBeenCalledWith(mockArrayBuffer);
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
                const mockResult = { size };

                vi.mocked(global.fetch).mockResolvedValueOnce({
                    ok: true,
                    arrayBuffer: async () => mockArrayBuffer,
                } as Response);

                mockParser.mockResolvedValueOnce(mockResult);

                const chunk = new Chunk(`${mockUri}?size=${size}`, mockParser);
                await chunk.fetch();

                expect(chunk.size).toBe(size);
                expect(chunk.arrayBuffer).toBe(mockArrayBuffer);
            }
        });
    });

    describe('properties', () => {
        it('should have correct initial property values', () => {
            const chunk = new Chunk(mockUri, mockParser);

            expect(chunk.result).toBeNull();
            expect(chunk.arrayBuffer).toBeNull();
            expect(chunk.size).toBe(-1);
            expect(chunk.createdAt).toBeInstanceOf(Date);
            expect(chunk.updatedAt).toBeInstanceOf(Date);
            expect(chunk.promise).toBeInstanceOf(Promise);
        });

        it('should update properties after successful fetch', async () => {
            const mockArrayBuffer = new ArrayBuffer(2048);
            const mockResult = { processed: true };

            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => mockArrayBuffer,
            } as Response);

            mockParser.mockResolvedValueOnce(mockResult);

            const chunk = new Chunk(mockUri, mockParser);

            // Properties before fetch
            expect(chunk.result).toBeNull();
            expect(chunk.arrayBuffer).toBeNull();
            expect(chunk.size).toBe(-1);

            await chunk.fetch();

            // Properties after fetch
            expect(chunk.result).toBe(mockResult);
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

            const chunk = new Chunk(mockUri, mockParser);

            await expect(async () => {
                await chunk.fetch();
            }).rejects.toThrow(NetworkError);

            try {
                await chunk.fetch();
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

            const chunk = new Chunk(mockUri, mockParser);

            await expect(async () => {
                await chunk.fetch();
            }).rejects.toThrow(FileContentError);

            try {
                await chunk.fetch();
            } catch (error) {
                expect(error).toBeInstanceOf(FileContentError);
                expect((error as FileContentError).message).toContain(mockUri);
            }
        });

        it('should preserve error context in ParseError', async () => {
            vi.mocked(global.fetch).mockResolvedValueOnce({
                ok: true,
                arrayBuffer: async () => new ArrayBuffer(100),
            } as unknown as Response);

            mockParser.mockRejectedValueOnce(new Error('Invalid format'));

            const chunk = new Chunk(mockUri, mockParser);

            await expect(async () => {
                await chunk.fetch();
            }).rejects.toThrow(ParseError);

            try {
                await chunk.fetch();
            } catch (error) {
                expect(error).toBeInstanceOf(ParseError);
                expect((error as ParseError).message).toContain(mockUri);
            }
        });
    });
});
