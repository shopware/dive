import { Module } from '../Module';

declare global {
    interface ModuleClasses {
        TestModule: any;
        NonExistentModule: never;
    }
    interface Window {
        __MODULE_BUILD_PATHS__: Record<keyof ModuleClasses, string>;
    }
}

// Mock the build-time injected paths
declare const __MODULE_BUILD_PATHS__: Record<keyof ModuleClasses, string>;
(window as any).__MODULE_BUILD_PATHS__ = {
    TestModule: './__test__/__mocks__/TestModule',
};

describe('Module', () => {
    let module: Module<any>;
    const moduleName = 'TestModule';

    beforeEach(() => {
        module = new Module(moduleName);
    });

    describe('getClass', () => {
        it('should return the same class on multiple calls', async () => {
            const class1 = await module.getClass();
            const class2 = await module.getClass();
            expect(class1).toBe(class2);
        });

        it('should return the correct class', async () => {
            const ModuleClass = await module.getClass();
            const instance = new ModuleClass();
            expect(instance).toBeDefined();
            expect(instance.name).toBe('test');
        });

        it('should throw error if module path is not found in __MODULE_BUILD_PATHS__', async () => {
            // Clear the build paths
            (window as any).__MODULE_BUILD_PATHS__ = {};
            const nonExistentModule = new Module('NonExistentModule');

            await expect(nonExistentModule.getClass()).rejects.toThrow(
                'Build path for module NonExistentModule not found in __MODULE_BUILD_PATHS__',
            );
        });

        it('should throw error if module class is not found in imported module', async () => {
            // Mock a module that exists but doesn't export the expected class
            (window as any).__MODULE_BUILD_PATHS__ = {
                TestModule: './__test__/__mocks__/EmptyModule',
            };

            await expect(module.getClass()).rejects.toThrow(
                'Module class TestModule not found in dynamically imported module',
            );
        });

        it('should throw error if module import fails', async () => {
            // Mock a failing import by modifying the build paths
            (window as any).__MODULE_BUILD_PATHS__ = {
                TestModule:
                    'src/modules/_system/__test__/__mocks__/NonExistentModule',
            };

            await expect(module.getClass()).rejects.toThrow(
                'Failed to dynamically import module TestModule from path src/modules/_system/__test__/__mocks__/NonExistentModule: Error: Cannot find module',
            );
        });
    });
});
