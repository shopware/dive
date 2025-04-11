// Mock the dynamic import before importing the module
const mockImport = jest.fn();
// @ts-expect-error - mocking import
global.import = mockImport;

// Mock the module
jest.mock('../ModuleRegistry', () => {
    const modules = new Map();
    const moduleInfo = new Map();

    return {
        Modules: {
            _modules: modules,
            _moduleInfo: moduleInfo,
            register: (name: string, path: string) => {
                const importFn = async () => {
                    const module = await mockImport(
                        path.startsWith('src/') ? `../../${path}` : path,
                    );
                    return module[name];
                };

                modules.set(name, {
                    _promise: null,
                    _instance: null,
                    getInstance: async function () {
                        if (this._instance !== null) {
                            return this._instance;
                        }
                        if (!this._promise) {
                            this._promise = importFn();
                        }
                        const ModuleClass = await this._promise;
                        this._instance = new ModuleClass();
                        return this._instance;
                    },
                });
                moduleInfo.set(name, { path });
            },
            getInstance: async (name: string) => {
                const module = modules.get(name);
                if (!module) {
                    throw new Error(`Module '${name}' not registered`);
                }
                return module.getInstance();
            },
            getBuildConfig: () => {
                const entries: Record<string, string> = {};
                moduleInfo.forEach((info, id) => {
                    entries[id] = info.path;
                });
                return entries;
            },
        },
    };
});

import { Modules } from '../ModuleRegistry';

// Mock module for testing
declare global {
    interface ModuleClasses {
        TestModule: TestModule;
    }
}

class TestModule {
    public value = 'test';
}

describe('ModuleRegistry', () => {
    beforeEach(() => {
        // Clear any registered modules before each test
        jest.clearAllMocks();
        // @ts-expect-error accessing private property for testing
        Modules._modules.clear();
        // @ts-expect-error accessing private property for testing
        Modules._moduleInfo.clear();
        mockImport.mockClear();
    });

    describe('register', () => {
        it('should register a module successfully', () => {
            expect(() => {
                Modules.register('TestModule', 'src/path/to/module');
            }).not.toThrow();

            // @ts-expect-error accessing private property for testing
            expect(Modules._modules.has('TestModule')).toBe(true);
            // @ts-expect-error accessing private property for testing
            expect(Modules._moduleInfo.get('TestModule')).toEqual({
                path: 'src/path/to/module',
            });
        });
    });

    describe('getInstance', () => {
        it('should throw error for non-registered module', async () => {
            await expect(Modules.getInstance('TestModule')).rejects.toThrow(
                "Module 'TestModule' not registered",
            );
        });

        it('should return the same instance for multiple calls', async () => {
            mockImport.mockResolvedValue({
                TestModule,
            });

            Modules.register('TestModule', 'src/path/to/module');

            const instance1 = await Modules.getInstance('TestModule');
            const instance2 = await Modules.getInstance('TestModule');

            expect(instance1).toBeDefined();
            expect(instance1).toBe(instance2);
            expect(instance1).toBeInstanceOf(TestModule);
            expect(mockImport).toHaveBeenCalledTimes(1);
            expect(mockImport).toHaveBeenCalledWith('../../src/path/to/module');
        });

        it('should handle non-src path imports correctly', async () => {
            mockImport.mockResolvedValue({
                TestModule,
            });

            const externalPath = '@scope/module';
            Modules.register('TestModule', externalPath);

            await Modules.getInstance('TestModule');
            expect(mockImport).toHaveBeenCalledWith(externalPath);
        });
    });

    describe('getBuildConfig', () => {
        it('should return empty object when no modules registered', () => {
            expect(Modules.getBuildConfig()).toEqual({});
        });

        it('should return correct build config for registered modules', () => {
            Modules.register('TestModule', 'src/path/to/module');

            expect(Modules.getBuildConfig()).toEqual({
                TestModule: 'src/path/to/module',
            });
        });
    });
});
