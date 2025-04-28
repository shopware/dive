import { ModuleImporter } from '../ModuleImporter';

describe('ModuleImporter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should dynamically import and return the module class', async () => {
        class MockModule {
            name = 'MockModule';
        }
        const mockPath = '/path/to/mockModule.js';
        window.__MODULE_PATHS__ = { MockModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({ MockModule });

        const ModuleClass = (await importer.import()) as typeof MockModule;

        expect(ModuleClass).toBe(MockModule);
        expect(new ModuleClass().name).toBe('MockModule');
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
        expect(dynamicImportSpy).toHaveBeenCalledWith(mockPath);
    });

    it('should cache the module class after the first import', async () => {
        class MockModule {}
        const mockPath = '/path/to/cachedModule.js';
        window.__MODULE_PATHS__ = { MockModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({ MockModule });

        // Act
        const ModuleClass1 = await importer.import();
        const ModuleClass2 = await importer.import();

        expect(ModuleClass1).toBe(MockModule);
        expect(ModuleClass2).toBe(MockModule);

        // Crucially, the dynamic import should only have been called once
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle dynamic import errors', async () => {
        const mockPath = '/path/to/failingModule.js';
        window.__MODULE_PATHS__ = { TestModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'TestModule'>('TestModule');
        const importError = new Error('File not found');
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockRejectedValue(importError);

        // Act & Assert
        await expect(importer.import()).rejects.toThrow(
            `Failed to dynamically import module from path ${mockPath}: ${importError.message}`,
        );
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
        expect(dynamicImportSpy).toHaveBeenCalledWith(mockPath);
    });

    it('should handle errors when the imported module has an unexpected structure', async () => {
        const mockPath = '/path/to/invalidModule.js';
        // @ts-ignore
        const importer = new ModuleImporter<'EmptyModule'>('EmptyModule');
        window.__MODULE_PATHS__ = { EmptyModule: mockPath };

        // Simulate a module import that resolves but doesn't contain the expected export
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({}); // Empty object

        // Act & Assert
        await expect(importer.import()).rejects.toThrow(
            `Failed to dynamically import module from path ${mockPath}: Module class not found in dynamically imported module: EmptyModule`,
        );
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
        expect(dynamicImportSpy).toHaveBeenCalledWith(mockPath);
    });

    it('should handle concurrent import calls correctly, importing only once', async () => {
        class ConcurrentModule {}
        const mockPath = '/path/to/concurrentModule.js';
        // @ts-ignore
        const importer = new ModuleImporter<'ConcurrentModule'>(
            'ConcurrentModule',
        );
        window.__MODULE_PATHS__ = { ConcurrentModule: mockPath };

        // Spy and mock the internal dynamic import method
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockImplementation(
                () =>
                    new Promise((resolve) =>
                        setTimeout(() => resolve({ ConcurrentModule }), 50),
                    ),
            );

        // Act: Initiate multiple imports concurrently
        const promise1 = importer.import();
        const promise2 = importer.import();
        const promise3 = importer.import();

        // Assert: Wait for all promises to resolve
        const [
            ModuleClass1,
            ModuleClass2,
            ModuleClass3,
        ] = await Promise.all([
            promise1,
            promise2,
            promise3,
        ]);

        expect(ModuleClass1).toBe(ConcurrentModule);
        expect(ModuleClass2).toBe(ConcurrentModule);
        expect(ModuleClass3).toBe(ConcurrentModule);

        // Crucially, the actual dynamic import should only have been called once due to caching
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
        expect(dynamicImportSpy).toHaveBeenCalledWith(mockPath);
    });
});
