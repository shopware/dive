import { internalModuleRegistry } from '../ModuleRegistry';
import { ModuleImporter } from '../ModuleImporter';

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
jest.mock('../ModuleImporter', () => {
    return {
        ModuleImporter: jest.fn().mockImplementation((name) => ({
            getClass: jest.fn().mockResolvedValue(
                class {
                    name: string;
                    constructor() {
                        this.name = name;
                    }
                },
            ),
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
            expect(ModuleImporter).toHaveBeenCalledWith('TestModule');
        });

        it('should allow registering multiple modules', () => {
            internalModuleRegistry.register('TestModule1');
            internalModuleRegistry.register('TestModule2');

            expect(ModuleImporter).toHaveBeenCalledTimes(2);
            expect(ModuleImporter).toHaveBeenCalledWith('TestModule1');
            expect(ModuleImporter).toHaveBeenCalledWith('TestModule2');
        });
    });

    describe('get', () => {
        it('should return class of registered module', async () => {
            internalModuleRegistry.register('TestModule');
            const ModuleClass = await internalModuleRegistry.get('TestModule');
            const instance = new ModuleClass();

            expect(instance).toEqual({
                name: 'TestModule',
            });
        });

        it('should throw error when getting class of non-existent module', async () => {
            await expect(
                internalModuleRegistry.get('NonExistentModule'),
            ).rejects.toThrow("Module 'NonExistentModule' not registered");
        });
    });
});
