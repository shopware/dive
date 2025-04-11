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

    describe('getInstance', () => {
        it('should return the same instance on multiple calls', async () => {
            const instance1 = await module.getInstance();
            const instance2 = await module.getInstance();
            expect(instance1).toBe(instance2);
        });

        it('should create a new instance if none exists', async () => {
            const instance = await module.getInstance();
            expect(instance).toBeDefined();
            expect(instance.name).toBe('test');
        });

        it('should throw error if module path is not found in __MODULE_BUILD_PATHS__', async () => {
            // Clear the build paths
            (window as any).__MODULE_BUILD_PATHS__ = {};
            const nonExistentModule = new Module('NonExistentModule');

            await expect(nonExistentModule.getInstance()).rejects.toThrow(
                'Build path for module NonExistentModule not found in __MODULE_BUILD_PATHS__',
            );
        });

        it('should throw error if module class is not found in imported module', async () => {
            // Mock a module that exists but doesn't export the expected class
            (window as any).__MODULE_BUILD_PATHS__ = {
                TestModule: './__test__/__mocks__/EmptyModule',
            };

            await expect(module.getInstance()).rejects.toThrow(
                'Module class TestModule not found in dynamically imported module',
            );
        });

        it('should throw error if module import fails', async () => {
            // Mock a failing import by modifying the build paths
            (window as any).__MODULE_BUILD_PATHS__ = {
                TestModule:
                    'src/modules/_system/__test__/__mocks__/NonExistentModule',
            };

            await expect(module.getInstance()).rejects.toThrow(
                'Failed to instantiate module TestModule: Failed to dynamically import module TestModule from path src/modules/_system/__test__/__mocks__/NonExistentModule: Error: Cannot find module',
            );
        });
    });
});
