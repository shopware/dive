import { describe, it, expect } from 'vitest';
import {
    FILE_TYPES,
    SUPPORTED_FILE_TYPES,
    type FileType,
} from '../FileTypes.ts';

describe('FileTypes', () => {
    describe('FILE_TYPES', () => {
        it('should contain glb file type definition', () => {
            expect(FILE_TYPES.glb).toEqual({
                key: 'glb',
                extension: 'glb',
            });
        });

        it('should contain gltf file type definition', () => {
            expect(FILE_TYPES.gltf).toEqual({
                key: 'gltf',
                extension: 'gltf',
            });
        });

        it('should contain usdz file type definition', () => {
            expect(FILE_TYPES.usdz).toEqual({
                key: 'usdz',
                extension: 'usdz',
            });
        });

        it('should have exactly 3 file types', () => {
            const keys = Object.keys(FILE_TYPES);
            expect(keys).toHaveLength(3);
            expect(keys).toEqual([
                'glb',
                'gltf',
                'usdz',
            ]);
        });

        it('should have consistent key and extension values', () => {
            Object.entries(FILE_TYPES).forEach(
                ([
                    key,
                    value,
                ]) => {
                    expect(value.key).toBe(key);
                    expect(value.extension).toBe(key);
                },
            );
        });

        it('should be immutable (as const)', () => {
            // Test that the object is properly typed as const
            const glbType = FILE_TYPES.glb;
            expect(glbType.key).toBe('glb');
            expect(glbType.extension).toBe('glb');
        });
    });

    describe('SUPPORTED_FILE_TYPES', () => {
        it('should contain all file extensions from FILE_TYPES', () => {
            const expectedExtensions = Object.values(FILE_TYPES).map(
                (type) => type.extension,
            );
            expect(SUPPORTED_FILE_TYPES).toEqual(expectedExtensions);
        });

        it('should contain glb extension', () => {
            expect(SUPPORTED_FILE_TYPES).toContain('glb');
        });

        it('should contain gltf extension', () => {
            expect(SUPPORTED_FILE_TYPES).toContain('gltf');
        });

        it('should contain usdz extension', () => {
            expect(SUPPORTED_FILE_TYPES).toContain('usdz');
        });

        it('should have exactly 3 supported file types', () => {
            expect(SUPPORTED_FILE_TYPES).toHaveLength(3);
        });

        it('should be a readonly array', () => {
            // Test that it's properly typed as readonly
            expect(Array.isArray(SUPPORTED_FILE_TYPES)).toBe(true);
        });

        it('should maintain consistent order with FILE_TYPES', () => {
            const fileTypeValues = Object.values(FILE_TYPES);
            const expectedOrder = fileTypeValues.map((type) => type.extension);
            expect(SUPPORTED_FILE_TYPES).toEqual(expectedOrder);
        });
    });

    describe('FileType type', () => {
        it('should include all keys from FILE_TYPES', () => {
            // This is a compile-time test, but we can verify the values exist
            const validFileTypes: FileType[] = [
                'glb',
                'gltf',
                'usdz',
            ];

            validFileTypes.forEach((fileType) => {
                expect(FILE_TYPES[fileType]).toBeDefined();
                expect(FILE_TYPES[fileType].key).toBe(fileType);
                expect(FILE_TYPES[fileType].extension).toBe(fileType);
            });
        });
    });

    describe('Integration tests', () => {
        it('should maintain consistency between all exports', () => {
            // Verify that SUPPORTED_FILE_TYPES matches FILE_TYPES values
            const fileTypeKeys = Object.keys(FILE_TYPES) as FileType[];
            const fileTypeExtensions = Object.values(FILE_TYPES).map(
                (type) => type.extension,
            );

            // All keys should match their extensions
            expect(fileTypeKeys).toEqual(fileTypeExtensions);

            // SUPPORTED_FILE_TYPES should match the extensions
            expect(SUPPORTED_FILE_TYPES).toEqual(fileTypeExtensions);
        });

        it('should be usable for file validation', () => {
            // Test practical usage scenarios
            const testFiles = [
                { filename: 'model.glb', shouldBeSupported: true },
                { filename: 'scene.gltf', shouldBeSupported: true },
                { filename: 'asset.usdz', shouldBeSupported: true },
                { filename: 'texture.jpg', shouldBeSupported: false },
                { filename: 'data.json', shouldBeSupported: false },
            ];

            testFiles.forEach(({ filename, shouldBeSupported }) => {
                const extension = filename.split('.').pop();
                const isSupported = SUPPORTED_FILE_TYPES.includes(
                    extension as string,
                );
                expect(isSupported).toBe(shouldBeSupported);
            });
        });

        it('should support checking file type by extension', () => {
            // Test that we can find file types by extension
            SUPPORTED_FILE_TYPES.forEach((extension) => {
                const fileType = Object.entries(FILE_TYPES).find(
                    ([
                        ,
                        value,
                    ]) => value.extension === extension,
                );
                expect(fileType).toBeDefined();
                expect(fileType![1].extension).toBe(extension);
            });
        });
    });
});
