import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { DropItAction } from '../dropit.ts';
import { type DIVENode } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../../types/index.ts';

const testObject: EntitySchema = {
    id: 'test-object',
    entityType: 'model',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    name: 'Test Object',
    visible: true,
    uri: 'test-uri',
    loaded: true,
} as unknown as EntitySchema;

describe('DropItAction', () => {
    let deps: ReturnType<typeof makeActionDeps>;
    let mockModel: DIVENode;

    beforeEach(() => {
        vi.clearAllMocks();
        mockModel = { dropIt: vi.fn() } as unknown as DIVENode;
        deps = makeActionDeps();
    });

    it('should drop an object on the floor or another object', () => {
        deps.registry.register(testObject, mockModel);

        const action = new DropItAction({ id: 'test-object' }, deps);

        action.execute();

        expect(mockModel.dropIt).toHaveBeenCalled();
    });

    it('should throw error if object is not registered', () => {
        const action = new DropItAction({ id: 'non-existent-object' }, deps);

        expect(() => action.execute()).toThrow(
            'Object with id non-existent-object not registered',
        );
    });

    it('should throw error if object has no scene object', () => {
        // registered, but state-only — a camera is the real case
        deps.registry.register(testObject);

        const action = new DropItAction({ id: 'test-object' }, deps);

        expect(() => action.execute()).toThrow(
            'Object with id test-object is not in the scene.',
        );
    });
});
