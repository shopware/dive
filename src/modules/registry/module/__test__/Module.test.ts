import { Module } from '../Module';

declare global {
    interface ModuleClasses {
        TestModule: any;
    }
}

describe('Module', () => {
    let module: Module<any>;
    const moduleName = 'TestModule';
    const modulePath =
        'src/modules/registry/module/__test__/__mocks__/TestModule';

    beforeEach(() => {
        module = new Module(moduleName, modulePath);
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

        it('should throw error if module import fails', async () => {
            // Mock a failing import
            const failingModule = new Module(
                'TestModule' as keyof ModuleClasses,
                'src/modules/registry/module/__test__/__mocks__/NonExistentModule',
            );

            await expect(failingModule.getInstance()).rejects.toThrow(
                'Failed to instantiate module TestModule: Module TestModule not found in ../../../../src/modules/registry/module/__test__/__mocks__/NonExistentModule',
            );
        });
    });

    describe('getImportPath', () => {
        it('should convert src/ paths to relative import paths', () => {
            const path = 'src/modules/test/TestModule';
            // @ts-ignore - accessing private method for testing
            const importPath = module.getImportPath(path);
            expect(importPath).toBe('../../../../src/modules/test/TestModule');
        });

        it('should not convert non-src/ paths', () => {
            const path = 'modules/test/TestModule';
            // @ts-ignore - accessing private method for testing
            const importPath = module.getImportPath(path);
            expect(importPath).toBe('modules/test/TestModule');
        });
    });
});
