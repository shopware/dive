import DIVEModelRoot from '../ModelRoot';
import DIVECommunication from '../../../../com/Communication';
import { DIVEMoveable } from '../../../../interface/Moveable';
import type DIVEScene from '../../../Scene';

const mock_LoadGLTF = jest.fn().mockResolvedValue({});
const mock_SetPosition = jest.fn();
const mock_SetRotation = jest.fn();
const mock_SetScale = jest.fn();
const mock_PlaceOnFloor = jest.fn();
const mock_SetModel = jest.fn();

jest.mock('../../../../com/types.ts', () => {
    return {
        COMModel: {},
    }
});

jest.mock('../../../../loadingmanager/LoadingManager.ts', () => {
    return jest.fn(function () {
        this.LoadGLTF = mock_LoadGLTF;
        return this;
    });
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

jest.mock('../../../../model/Model.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.userData = {
            id: undefined,
        };
        this.SetModel = mock_SetModel;
        this.SetPosition = mock_SetPosition;
        this.SetRotation = mock_SetRotation;
        this.SetScale = mock_SetScale;
        this.SetVisibility = jest.fn();
        this.PlaceOnFloor = mock_PlaceOnFloor;
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.spyOn(DIVECommunication, 'get').mockReturnValue({ PerformAction: jest.fn() } as unknown as DIVECommunication);

const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

describe('dive/scene/root/modelroot/DIVEModelRoot', () => {
    beforeEach(() => {
        consoleWarnSpy.mockClear();
    });

    it('should instantiate', () => {
        const modelRoot = new DIVEModelRoot();
        expect(modelRoot).toBeDefined();
    });

    it('should not add incorrect model', async () => {
        const modelRoot = new DIVEModelRoot();
        await expect(() => modelRoot.UpdateModel({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(modelRoot.children).toHaveLength(0);
    });

    it('should add basic model', async () => {
        const modelRoot = new DIVEModelRoot();
        await expect(() => modelRoot.UpdateModel({
            id: 'test_id',
            uri: 'not a real uri',
            visible: false,
        })).not.toThrow();
        expect(mock_LoadGLTF).toHaveBeenCalledTimes(1);
        expect(mock_SetModel).toHaveBeenCalledTimes(1);
        expect(modelRoot.children).toHaveLength(1);
        expect(modelRoot.children[0].userData.id).toBe('test_id');
    });

    it('should add configured model', async () => {
        const modelRoot = new DIVEModelRoot();
        modelRoot.userData.id = 'something';
        await expect(() => modelRoot.UpdateModel({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        })).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        await expect(() => modelRoot.UpdateModel({
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
        const modelRoot = new DIVEModelRoot();
        expect(() => modelRoot.PlaceOnFloor({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);
    });

    it('should not place non-existing model on floor', async () => {
        const modelRoot = new DIVEModelRoot();
        modelRoot.PlaceOnFloor({ id: 'test_id' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);
    });

    it('should place model on floor', async () => {
        const modelRoot = new DIVEModelRoot();
        await modelRoot.UpdateModel({
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
        const modelRoot = new DIVEModelRoot();
        expect(() => modelRoot.GetModel({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(modelRoot.GetModel({ id: 'test_id' })).toBeUndefined();
        await expect(() => modelRoot.UpdateModel({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        })).not.toThrow();
        expect(modelRoot.GetModel({ id: 'test_id' })).toBeDefined();
    });

    it('should delete model', async () => {
        const modelRoot = new DIVEModelRoot();

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

        expect(() => modelRoot.DeleteModel({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        consoleWarnSpy.mockClear();
        expect(() => modelRoot.DeleteModel({ id: 'test_id' })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        await expect(() => modelRoot.UpdateModel({
            id: 'test_id',
            uri: 'not a real uri',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
        })).not.toThrow();
        (modelRoot.children[0] as unknown as DIVEMoveable).isMoveable = true;
        expect(() => modelRoot.DeleteModel({ id: 'test_id' })).not.toThrow();
        expect(modelRoot.children).toHaveLength(0);
    });
});