import DIVECommunication from '../../../../com/Communication';
import { DIVEPrimitiveRoot } from '../PrimitiveRoot';
import type DIVEScene from '../../../Scene';
import { type DIVEMoveable } from '../../../../interface/Moveable';

const mock_SetPosition = jest.fn();
const mock_SetRotation = jest.fn();
const mock_SetScale = jest.fn();
const mock_PlaceOnFloor = jest.fn();
const mock_SetBufferGeometry = jest.fn();

jest.mock('../../../../com/types.ts', () => {
    return {
        COMModel: {},
    }
});

jest.mock('../../../../com/Communication.ts', () => {
    return {
        get: jest.fn(() => {
            return {
                PerformAction: jest.fn(),
            }
        }),
    }
});

jest.mock('../../../../primitive/Primitive.ts', () => {
    return {
        DIVEPrimitive: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.SetBufferGeometry = mock_SetBufferGeometry;
            this.SetPosition = mock_SetPosition;
            this.SetRotation = mock_SetRotation;
            this.SetScale = mock_SetScale;
            this.SetVisibility = jest.fn();
            this.PlaceOnFloor = mock_PlaceOnFloor;
            this.removeFromParent = jest.fn();
            return this;
        })
    };
});

jest.spyOn(DIVECommunication, 'get').mockReturnValue({ PerformAction: jest.fn() } as unknown as DIVECommunication);

const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

describe('dive/scene/root/modelroot/DIVEPrimitiveRoot', () => {
    beforeEach(() => {
        consoleWarnSpy.mockClear();
    });

    it('should instantiate', () => {
        const modelRoot = new DIVEPrimitiveRoot();
        expect(modelRoot).toBeDefined();
    });

    it('should not add incorrect model', async () => {
        const modelRoot = new DIVEPrimitiveRoot();
        await expect(() => modelRoot.UpdatePrimitive({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(modelRoot.children).toHaveLength(0);
    });

    it('should add basic primitive', async () => {
        const modelRoot = new DIVEPrimitiveRoot();
        await expect(() => modelRoot.UpdatePrimitive({
            id: 'test_id',
            uri: 'not a real uri',
            visible: false,
        })).not.toThrow();
        expect(mock_SetBufferGeometry).toHaveBeenCalledTimes(1);
        expect(modelRoot.children).toHaveLength(1);
        expect(modelRoot.children[0].userData.id).toBe('test_id');
    });

    it('should add configured model', async () => {
        const modelRoot = new DIVEPrimitiveRoot();
        modelRoot.userData.id = 'something';
        await expect(() => modelRoot.UpdatePrimitive({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        })).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        await expect(() => modelRoot.UpdatePrimitive({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        })).not.toThrow();

        expect(modelRoot.children).toHaveLength(1);
        expect(mock_SetPosition).toHaveBeenCalledTimes(2);
        expect(mock_SetRotation).toHaveBeenCalledTimes(2);
        expect(mock_SetScale).toHaveBeenCalledTimes(2);
    });

    it('should not place incorrect model on floor', async () => {
        const modelRoot = new DIVEPrimitiveRoot();
        expect(() => modelRoot.PlaceOnFloor({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);
    });

    it('should not place non-existing model on floor', async () => {
        const modelRoot = new DIVEPrimitiveRoot();
        modelRoot.PlaceOnFloor({ id: 'test_id' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);
    });

    it('should place model on floor', async () => {
        const modelRoot = new DIVEPrimitiveRoot();
        await modelRoot.UpdatePrimitive({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        });
        modelRoot.PlaceOnFloor({ id: 'test_id' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);
    });

    it('should get model', async () => {
        const modelRoot = new DIVEPrimitiveRoot();
        expect(() => modelRoot.GetPrimitive({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(modelRoot.GetPrimitive({ id: 'test_id' })).toBeUndefined();
        await expect(() => modelRoot.UpdatePrimitive({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        })).not.toThrow();
        expect(modelRoot.GetPrimitive({ id: 'test_id' })).toBeDefined();
    });

    it('should delete model', async () => {
        const modelRoot = new DIVEPrimitiveRoot();

        const sceneParent = {
            parent: null,
            children: [
                {
                    isTransformControls: true,
                    detach: jest.fn(),
                }
            ],
        }
        modelRoot.parent = sceneParent as unknown as DIVEScene;

        expect(() => modelRoot.DeletePrimitive({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        consoleWarnSpy.mockClear();
        expect(() => modelRoot.DeletePrimitive({ id: 'test_id' })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        await expect(() => modelRoot.UpdatePrimitive({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        })).not.toThrow();
        (modelRoot.children[0] as unknown as DIVEMoveable).isMoveable = true;
        expect(() => modelRoot.DeletePrimitive({ id: 'test_id' })).not.toThrow();
        expect(modelRoot.children).toHaveLength(0);
    });
});