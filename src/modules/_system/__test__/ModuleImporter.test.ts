import { ModuleImporter } from '../ModuleImporter';

describe('ModuleImporter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should dynamically import and return the module class', async () => {
        class TestModule {
            name = 'TestModule';
        }
        const mockPath = '/path/to/mockModule.js';
        window.__MODULE_PATHS__ = { MockModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({ TestModule });

        const ModuleClass = (await importer.import()) as typeof TestModule;

        expect(ModuleClass).toBe(TestModule);
        expect(new ModuleClass().name).toBe('TestModule');
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
        expect(dynamicImportSpy).toHaveBeenCalledWith(mockPath);
    });

    it('should cache the module class after the first import', async () => {
        class TestModule {}
        const mockPath = '/path/to/cachedModule.js';
        window.__MODULE_PATHS__ = { MockModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({ TestModule });

        // Act
        const ModuleClass1 = await importer.import();
        const ModuleClass2 = await importer.import();

        expect(ModuleClass1).toBe(TestModule);
        expect(ModuleClass2).toBe(TestModule);

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

    it('should instantiate a module with constructor arguments', async () => {
        class MockModule {
            constructor(public name: string) {}
        }
        const mockPath = '/path/to/mockModule.js';
        window.__MODULE_PATHS__ = { MockModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({ MockModule });

        // @ts-ignore - We know this is safe in the test context
        const instance = await importer.instantiate('TestName');

        expect(instance).toBeInstanceOf(MockModule);
        expect(instance.name).toBe('TestName');
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
    });

    it('should cache module instances after first instantiation', async () => {
        class MockModule {
            constructor(public name: string) {}
        }
        const mockPath = '/path/to/mockModule.js';
        window.__MODULE_PATHS__ = { MockModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({ MockModule });

        // @ts-ignore - We know this is safe in the test context
        const instance1 = await importer.instantiate('TestName1');
        // @ts-ignore - We know this is safe in the test context
        const instance2 = await importer.instantiate('TestName2');

        expect(instance1).toBe(instance2); // Same instance should be returned
        expect(instance1.name).toBe('TestName1'); // Original arguments should be preserved
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error when window.__MODULE_PATHS__ is undefined', async () => {
        // @ts-ignore
        window.__MODULE_PATHS__ = undefined;
        // @ts-ignore
        const importer = new ModuleImporter<'TestModule'>('TestModule');

        await expect(importer.import()).rejects.toThrow(
            'Module path map not found, invalid build of @shopware-ag/dive!',
        );
    });

    it('should throw error when module path is not found in window.__MODULE_PATHS__', async () => {
        window.__MODULE_PATHS__ = {};
        // @ts-ignore
        const importer = new ModuleImporter<'TestModule'>('TestModule');

        await expect(importer.import()).rejects.toThrow(
            'Failed to dynamically import module from path undefined: Module TestModule not found in path map',
        );
    });

    it('should pass the correct path to dynamic import', async () => {
        class MockModule {}
        const mockPath = '/path/to/mockModule.js';
        window.__MODULE_PATHS__ = { MockModule: mockPath };
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');

        // Spy on the _dynamicImport method
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockResolvedValue({ MockModule });

        await importer.import();

        // Verify that _dynamicImport was called with the correct path
        expect(dynamicImportSpy).toHaveBeenCalledWith(mockPath);
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
    });

    it('should directly test the _dynamicImport method', async () => {
        class MockModule {}
        const mockPath = '/path/to/mockModule.js';
        // @ts-ignore
        const importer = new ModuleImporter<'MockModule'>('MockModule');

        // Create a mock module that will be imported
        const mockModule = { MockModule };

        // Mock the dynamic import by replacing the method with a spy
        const dynamicImportSpy = jest
            .spyOn(importer as any, '_dynamicImport')
            .mockImplementation(async (...args: unknown[]) => {
                return mockModule;
            });

        // Call the private method directly
        const result = await (importer as any)._dynamicImport(mockPath);

        // Verify the result
        expect(result).toEqual(mockModule);
        expect(dynamicImportSpy).toHaveBeenCalledWith(mockPath);
        expect(dynamicImportSpy).toHaveBeenCalledTimes(1);
    });
});
