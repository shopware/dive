import { Group } from 'three';
import { AssetCache } from '../AssetCache.ts';
import { Chunk } from '../../chunk/Chunk.ts';

// Mock Chunk class
vi.mock('../../chunk/Chunk.ts', () => ({
    Chunk: vi.fn().mockImplementation((uri) => ({
        uri,
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
        it('should create a new chunk with the given key', () => {
            const key = 'test-asset';

            const chunk = AssetCache.create(key);

            expect(MockedChunk).toHaveBeenCalledWith(key);
            expect(AssetCache.read(key)).toBe(chunk);
        });

        it('should create chunks with different keys', () => {
            const gltfChunk = AssetCache.create('gltf-asset');
            const textureChunk = AssetCache.create('texture-asset');

            expect(MockedChunk).toHaveBeenCalledWith('gltf-asset');
            expect(MockedChunk).toHaveBeenCalledWith('texture-asset');
            expect(AssetCache.read('gltf-asset')).toBe(gltfChunk);
            expect(AssetCache.read('texture-asset')).toBe(textureChunk);
        });

        it('should overwrite existing chunk with same key', () => {
            const key = 'same-key';

            const chunk1 = AssetCache.create(key);
            const chunk2 = AssetCache.create(key);

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
            const chunk = AssetCache.create(key);

            const result = AssetCache.read(key);

            expect(result).toBe(chunk);
        });

        it('should return null for non-existing key', () => {
            const result = AssetCache.read('non-existing-key');

            expect(result).toBeNull();
        });

        it('should return null after deleting a key', () => {
            const key = 'delete-read-test';
            AssetCache.create(key);

            AssetCache.delete(key);
            const result = AssetCache.read(key);

            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        it('should remove chunk from cache', () => {
            const key = 'delete-test';
            AssetCache.create(key);

            expect(AssetCache.read(key)).not.toBeNull();

            AssetCache.delete(key);

            expect(AssetCache.read(key)).toBeNull();
        });

        it('should remove multiple chunks from cache', () => {
            const key1 = 'delete-test';
            const key2 = 'delete-test-2';
            AssetCache.create(key1);
            AssetCache.create(key2);

            expect(AssetCache.read(key1)).not.toBeNull();
            expect(AssetCache.read(key2)).not.toBeNull();

            AssetCache.delete(key1, key2);

            expect(AssetCache.read(key1)).toBeNull();
            expect(AssetCache.read(key2)).toBeNull();
        });

        it('should not throw error when deleting non-existing key', () => {
            expect(() => {
                AssetCache.delete('non-existing-key');
            }).not.toThrow();
        });

        it('should only delete the specified key', () => {
            const key1 = 'keep-this';
            const key2 = 'delete-this';

            const chunk1 = AssetCache.create(key1);
            AssetCache.create(key2);

            AssetCache.delete(key2);

            expect(AssetCache.read(key1)).toBe(chunk1);
            expect(AssetCache.read(key2)).toBeNull();
        });
    });

    describe('clear', () => {
        it('should remove all chunks from cache', () => {
            AssetCache.create('key1');
            AssetCache.create('key2');
            AssetCache.create('key3');

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

    describe('print', () => {
        it('should print the cache', () => {
            AssetCache.create('key1');
            AssetCache.create('key2');
            AssetCache.create('key3');

            expect(AssetCache.get()).toStrictEqual(
                new Map([
                    [
                        'key1',
                        AssetCache.create('key1'),
                    ],
                    [
                        'key2',
                        AssetCache.create('key2'),
                    ],
                    [
                        'key3',
                        AssetCache.create('key3'),
                    ],
                ]),
            );
        });
    });

    describe('integration scenarios', () => {
        it('should handle multiple operations in sequence', () => {
            // Create
            const chunk1 = AssetCache.create('asset1');
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
            const key = 'same-key';

            // Create initial chunk
            const chunk1 = AssetCache.create(key);
            expect(AssetCache.read(key)).toBe(chunk1);

            // Overwrite with create
            const chunk2 = AssetCache.create(key);
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
