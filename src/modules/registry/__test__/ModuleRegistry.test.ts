import { ModuleRegistry } from '../ModuleRegistry';
import { Module } from '../module/Module';

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
jest.mock('../module/Module', () => {
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
        ModuleRegistry['_moduleInfo'].clear();
    });

    describe('register', () => {
        it('should register a module with name and path', () => {
            ModuleRegistry.register('TestModule', '/test/path');
            expect(Module).toHaveBeenCalledWith('TestModule', '/test/path');
        });

        it('should allow registering multiple modules', () => {
            ModuleRegistry.register('TestModule1', '/test/path1');
            ModuleRegistry.register('TestModule2', '/test/path2');

            expect(Module).toHaveBeenCalledTimes(2);
            expect(Module).toHaveBeenCalledWith('TestModule1', '/test/path1');
            expect(Module).toHaveBeenCalledWith('TestModule2', '/test/path2');
        });
    });

    describe('getInstance', () => {
        it('should return instance of registered module', async () => {
            ModuleRegistry.register('TestModule', '/test/path');
            const instance = await ModuleRegistry.getInstance('TestModule');

            expect(instance).toEqual({
                name: 'TestModule',
                path: '/test/path',
            });
        });

        it('should throw error when getting instance of non-existent module', async () => {
            await expect(
                ModuleRegistry.getInstance('NonExistentModule'),
            ).rejects.toThrow("Module 'NonExistentModule' not registered");
        });
    });

    describe('getBuildConfig', () => {
        it('should return empty object when no modules are registered', () => {
            const config = ModuleRegistry.getBuildConfig();
            expect(config).toEqual({});
        });

        it('should return all registered module paths', () => {
            ModuleRegistry.register('TestModule1', '/test/path1');
            ModuleRegistry.register('TestModule2', '/test/path2');

            const config = ModuleRegistry.getBuildConfig();
            expect(config).toEqual({
                TestModule1: '/test/path1',
                TestModule2: '/test/path2',
            });
        });
    });
});
