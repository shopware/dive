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
    interface Window {
        __MODULE_BUILD_PATHS__: Record<keyof ModuleClasses, string>;
    }
}

// Mock the Module class
jest.mock('../Module', () => {
    return {
        Module: jest.fn().mockImplementation((name) => ({
            getInstance: jest.fn().mockResolvedValue({ name }),
        })),
    };
});

describe('ModuleRegistry', () => {
    beforeEach(() => {
        // Clear the registry before each test
        jest.clearAllMocks();
        internalModuleRegistry['_modules'].clear();
        (window as any).__MODULE_BUILD_PATHS__ = {};
    });

    describe('register', () => {
        it('should register a module with name', () => {
            internalModuleRegistry.register('TestModule');
            expect(Module).toHaveBeenCalledWith('TestModule');
        });

        it('should allow registering multiple modules', () => {
            internalModuleRegistry.register('TestModule1');
            internalModuleRegistry.register('TestModule2');

            expect(Module).toHaveBeenCalledTimes(2);
            expect(Module).toHaveBeenCalledWith('TestModule1');
            expect(Module).toHaveBeenCalledWith('TestModule2');
        });
    });

    describe('getInstance', () => {
        it('should return instance of registered module', async () => {
            internalModuleRegistry.register('TestModule');
            const instance =
                await internalModuleRegistry.getInstance('TestModule');

            expect(instance).toEqual({
                name: 'TestModule',
            });
        });

        it('should throw error when getting instance of non-existent module', async () => {
            await expect(
                internalModuleRegistry.getInstance('NonExistentModule'),
            ).rejects.toThrow("Module 'NonExistentModule' not registered");
        });
    });
});
