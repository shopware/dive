import { Group } from 'three';
import { AssetCache } from '../AssetCache.ts';
import { Chunk } from '../../chunk/Chunk.ts';

// Mock Chunk class
vi.mock('../../chunk/Chunk.ts', () => ({
    Chunk: vi.fn().mockImplementation((key, parse) => ({
        key,
        parse,
        id: Math.random().toString(36), // Unique identifier for testing
    })),
}));

const MockedChunk = vi.mocked(Chunk);

describe('AssetCache', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AssetCache.clear();
        MockedChunk.mockClear();
    });

    describe('create', () => {
        it('should create a new chunk with the given key and parser', () => {
            const key = 'test-asset';
            const mockParser = vi.fn().mockResolvedValue({ id: 'test' });

            const chunk = AssetCache.create(key, mockParser);

            expect(MockedChunk).toHaveBeenCalledWith(key, mockParser);
            expect(AssetCache.read(key)).toBe(chunk);
        });

        it('should create chunks with different parsers', () => {
            const gltfParser = vi
                .fn()
                .mockResolvedValue({ scene: new Group() });
            const textureParser = vi
                .fn()
                .mockResolvedValue({ image: new Image() });

            const gltfChunk = AssetCache.create('gltf-asset', gltfParser);
            const textureChunk = AssetCache.create(
                'texture-asset',
                textureParser,
            );

            expect(MockedChunk).toHaveBeenCalledWith('gltf-asset', gltfParser);
            expect(MockedChunk).toHaveBeenCalledWith(
                'texture-asset',
                textureParser,
            );
            expect(AssetCache.read('gltf-asset')).toBe(gltfChunk);
            expect(AssetCache.read('texture-asset')).toBe(textureChunk);
        });

        it('should overwrite existing chunk with same key', () => {
            const key = 'same-key';
            const parser1 = vi.fn().mockResolvedValue({ id: 'first' });
            const parser2 = vi.fn().mockResolvedValue({ id: 'second' });

            const chunk1 = AssetCache.create(key, parser1);
            const chunk2 = AssetCache.create(key, parser2);

            expect(chunk1).not.toBe(chunk2);
            expect(AssetCache.read(key)).toBe(chunk2);
        });
    });

    describe('write', () => {
        it('should store a chunk with the given key', () => {
            const key = 'write-test';
            const mockChunk = { id: 'mock-chunk' };

            AssetCache.write(key, mockChunk as any);

            expect(AssetCache.read(key)).toBe(mockChunk);
        });

        it('should overwrite existing chunk', () => {
            const key = 'overwrite-test';
            const mockChunk1 = { id: 'first-chunk' };
            const mockChunk2 = { id: 'second-chunk' };

            AssetCache.write(key, mockChunk1 as any);
            AssetCache.write(key, mockChunk2 as any);

            expect(AssetCache.read(key)).toBe(mockChunk2);
        });
    });

    describe('read', () => {
        it('should return the chunk for an existing key', () => {
            const key = 'read-test';
            const mockParser = vi.fn().mockResolvedValue({ data: 'test' });
            const chunk = AssetCache.create(key, mockParser);

            const result = AssetCache.read(key);

            expect(result).toBe(chunk);
        });

        it('should return null for non-existing key', () => {
            const result = AssetCache.read('non-existing-key');

            expect(result).toBeNull();
        });

        it('should return null after deleting a key', () => {
            const key = 'delete-read-test';
            const mockParser = vi.fn().mockResolvedValue({ data: 'test' });
            AssetCache.create(key, mockParser);

            AssetCache.delete(key);
            const result = AssetCache.read(key);

            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        it('should remove chunk from cache', () => {
            const key = 'delete-test';
            const mockParser = vi.fn().mockResolvedValue({ data: 'test' });
            AssetCache.create(key, mockParser);

            expect(AssetCache.read(key)).not.toBeNull();

            AssetCache.delete(key);

            expect(AssetCache.read(key)).toBeNull();
        });

        it('should not throw error when deleting non-existing key', () => {
            expect(() => {
                AssetCache.delete('non-existing-key');
            }).not.toThrow();
        });

        it('should only delete the specified key', () => {
            const key1 = 'keep-this';
            const key2 = 'delete-this';
            const mockParser = vi.fn().mockResolvedValue({ data: 'test' });

            const chunk1 = AssetCache.create(key1, mockParser);
            AssetCache.create(key2, mockParser);

            AssetCache.delete(key2);

            expect(AssetCache.read(key1)).toBe(chunk1);
            expect(AssetCache.read(key2)).toBeNull();
        });
    });

    describe('clear', () => {
        it('should remove all chunks from cache', () => {
            const mockParser = vi.fn().mockResolvedValue({ data: 'test' });
            AssetCache.create('key1', mockParser);
            AssetCache.create('key2', mockParser);
            AssetCache.create('key3', mockParser);

            expect(AssetCache.read('key1')).not.toBeNull();
            expect(AssetCache.read('key2')).not.toBeNull();
            expect(AssetCache.read('key3')).not.toBeNull();

            AssetCache.clear();

            expect(AssetCache.read('key1')).toBeNull();
            expect(AssetCache.read('key2')).toBeNull();
            expect(AssetCache.read('key3')).toBeNull();
        });

        it('should work on empty cache', () => {
            expect(() => {
                AssetCache.clear();
            }).not.toThrow();
        });
    });

    describe('integration scenarios', () => {
        it('should handle multiple operations in sequence', () => {
            const mockParser = vi.fn().mockResolvedValue({ data: 'test' });

            // Create
            const chunk1 = AssetCache.create('asset1', mockParser);
            expect(AssetCache.read('asset1')).toBe(chunk1);

            // Write
            const mockChunk2 = { id: 'written-chunk' };
            AssetCache.write('asset2', mockChunk2 as any);
            expect(AssetCache.read('asset2')).toBe(mockChunk2);

            // Delete one
            AssetCache.delete('asset1');
            expect(AssetCache.read('asset1')).toBeNull();
            expect(AssetCache.read('asset2')).toBe(mockChunk2);

            // Clear all
            AssetCache.clear();
            expect(AssetCache.read('asset2')).toBeNull();
        });

        it('should handle cache operations with same keys', () => {
            const parser1 = vi.fn().mockResolvedValue({ type: 'first' });
            const parser2 = vi.fn().mockResolvedValue({ type: 'second' });
            const key = 'same-key';

            // Create initial chunk
            const chunk1 = AssetCache.create(key, parser1);
            expect(AssetCache.read(key)).toBe(chunk1);

            // Overwrite with create
            const chunk2 = AssetCache.create(key, parser2);
            expect(AssetCache.read(key)).toBe(chunk2);
            expect(AssetCache.read(key)).not.toBe(chunk1);

            // Overwrite with write
            const mockChunk3 = { id: 'written-chunk' };
            AssetCache.write(key, mockChunk3 as any);
            expect(AssetCache.read(key)).toBe(mockChunk3);
            expect(AssetCache.read(key)).not.toBe(chunk2);
        });
    });
});
