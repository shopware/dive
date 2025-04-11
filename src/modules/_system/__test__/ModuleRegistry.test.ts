import { internalModuleRegistry } from '../ModuleRegistry';
import { Module } from '../Module';

// Extend ModuleClasses for our test modules
declare global {
    interface ModuleClasses {
        TestModule: any;
        TestModule1: any;
        TestModule2: any;
        NonExistentModule: never;
    }
}

// Mock the Module class
jest.mock('../Module', () => {
    return {
        Module: jest.fn().mockImplementation((name, path) => ({
            getInstance: jest.fn().mockResolvedValue({ name, path }),
        })),
    };
});

describe('ModuleRegistry', () => {
    beforeEach(() => {
        // Clear the registry before each test
        jest.clearAllMocks();
    });

    afterEach(() => {
        internalModuleRegistry['_moduleInfo'].clear();
    });

    describe('register', () => {
        it('should register a module with name and path', () => {
            internalModuleRegistry.register('TestModule', '/test/path');
            expect(Module).toHaveBeenCalledWith('TestModule', '/test/path');
        });

        it('should allow registering multiple modules', () => {
            internalModuleRegistry.register('TestModule1', '/test/path1');
            internalModuleRegistry.register('TestModule2', '/test/path2');

            expect(Module).toHaveBeenCalledTimes(2);
            expect(Module).toHaveBeenCalledWith('TestModule1', '/test/path1');
            expect(Module).toHaveBeenCalledWith('TestModule2', '/test/path2');
        });
    });

    describe('getInstance', () => {
        it('should return instance of registered module', async () => {
            internalModuleRegistry.register('TestModule', '/test/path');
            const instance =
                await internalModuleRegistry.getInstance('TestModule');

            expect(instance).toEqual({
                name: 'TestModule',
                path: '/test/path',
            });
        });

        it('should throw error when getting instance of non-existent module', async () => {
            await expect(
                internalModuleRegistry.getInstance('NonExistentModule'),
            ).rejects.toThrow("Module 'NonExistentModule' not registered");
        });
    });

    describe('getBuildConfig', () => {
        it('should return empty object when no modules are registered', () => {
            const config = internalModuleRegistry.getBuildConfig();
            expect(config).toEqual({});
        });

        it('should return all registered module paths', () => {
            internalModuleRegistry.register('TestModule1', '/test/path1');
            internalModuleRegistry.register('TestModule2', '/test/path2');

            const config = internalModuleRegistry.getBuildConfig();
            expect(config).toEqual({
                TestModule1: '/test/path1',
                TestModule2: '/test/path2',
            });
        });
    });
});
