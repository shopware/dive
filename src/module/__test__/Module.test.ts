import { DIVEModule } from '../Module';

jest.mock('/mock/path', () => mockModule, { virtual: true });

const mockModule: Record<string, any> = {};

describe('dive/module/DIVEModule', () => {
    beforeEach(() => {
        // Reset the mock module before each test
        Object.keys(mockModule).forEach((key) => delete mockModule[key]);
    });

    it('should return the same instance on multiple calls to get()', async () => {
        mockModule.TestClass = class TestClass {};
        const diveModule = new DIVEModule('/mock/path', 'TestClass');

        const instance1 = await diveModule.get();
        const instance2 = await diveModule.get();

        expect(instance1).toBe(instance2);
    });

    it('should throw an error if the constructor is not found', async () => {
        const diveModule = new DIVEModule('/mock/path', 'NonExistentClass');

        await expect(diveModule.get()).rejects.toThrow(
            'DIVE: Module class NonExistentClass not found in /mock/path',
        );
    });

    it('should throw an error if the constructor is not a function', async () => {
        mockModule.InvalidClass = {};
        const diveModule = new DIVEModule('/mock/path', 'InvalidClass');

        await expect(diveModule.get()).rejects.toThrow(
            'DIVE: Module at /mock/path does not export a valid constructor (InvalidClass wanted)',
        );
    });

    it('should only load the module once even with concurrent calls to get()', async () => {
        mockModule.TestClass = class TestClass {};
        const diveModule = new DIVEModule('/mock/path', 'TestClass');

        const [
            instance1,
            instance2,
        ] = await Promise.all([
            diveModule.get(),
            diveModule.get(),
        ]);

        expect(instance1).toBe(instance2);
    });
});
