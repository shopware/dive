import { DIVERoot } from '../Root';
import { type COMPrimitive, type COMLight, type COMModel, type COMPov, type COMEntity, type COMGeometry } from '../../../com/types';
import { type DIVEScene } from '../../Scene';
import { DIVECommunication } from '../../../com/Communication';

jest.mock('../../../com/Communication.ts', () => {
    return {
        DIVECommunication: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                }
            }),
        }
    };
});

const mock_LoadGLTF = jest.fn().mockResolvedValue({});
jest.mock('../../../loadingmanager/LoadingManager.ts', () => {
    return {
        DIVELoadingManager: jest.fn(function () {
            this.LoadGLTF = mock_LoadGLTF;
            return this;
        })
    };
});

jest.mock('../../../primitive/floor/Floor', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        this.updateMatrixWorld = jest.fn();
        return this;
    });
});

jest.mock('../../../grid/Grid', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        this.updateMatrixWorld = jest.fn();
        return this;
    });
});

jest.mock('../../../light/AmbientLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../light/PointLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../light/SceneLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../model/Model.ts', () => {
    return {
        DIVEModel: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.SetModel = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.SetMaterial = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        })
    };
});

jest.mock('../../../primitive/Primitive.ts', () => {
    return {
        DIVEPrimitive: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.SetGeometry = jest.fn();
            this.SetMaterial = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        })
    };
});

const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

let root: DIVERoot;

describe('DIVE/scene/root/DIVERoot', () => {
    beforeEach(() => {
        root = new DIVERoot();
        consoleWarnSpy.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(root).toBeDefined();
    });

    it('should ComputeSceneBB', () => {
        const bb = root.ComputeSceneBB();
        expect(bb).toBeDefined();
    });

    it('should get scene object', async () => {
        expect(() => root.GetSceneObject({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(root.GetSceneObject({ id: 'test_id' })).toBeUndefined();
        expect(() => root.AddSceneObject({
            id: 'test_id',
            name: 'test',
            entityType: 'primitive',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
            geometry: {} as COMGeometry,
            visible: true,
        })).not.toThrow();
        expect(root.GetSceneObject({ id: 'test_id' })).toBeDefined();
    });

    it('should add object', () => {
        expect(() => root.AddSceneObject({ id: undefined, name: 'pov', entityType: 'pov', visible: true } as unknown as COMPov)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();

        expect(() => root.AddSceneObject({ id: undefined, name: 'light', entityType: 'light', visible: true } as unknown as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_scene', name: 'light', entityType: 'light', visible: true, type: 'scene' } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_ambient', name: 'light', entityType: 'light', visible: true, type: 'ambient' } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_point', name: 'light', entityType: 'light', visible: true, type: 'point', position: { x: 0, y: 0, z: 0 }, intensity: 1, enabled: false, color: 0xffffff } as COMLight)).not.toThrow();

        expect(() => root.AddSceneObject({ id: undefined, name: 'model', entityType: 'model', visible: true } as unknown as COMModel)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_uri0', name: 'model', entityType: 'model', visible: true, uri: 'uri', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, material: {} } as COMModel)).not.toThrow();
        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => root.AddSceneObject({ id: 'id_uri1', name: 'model', entityType: 'model', visible: true, uri: 'uri', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, material: {} } as COMModel)).not.toThrow();

        expect(() => root.AddSceneObject({ id: undefined, name: 'primitive', entityType: 'primitive', visible: true } as unknown as COMPrimitive)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id0', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id1', name: 'primitive', entityType: 'primitive', visible: true, material: {} } as COMPrimitive)).not.toThrow();
    });

    it('should update object', () => {
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
    });

    it('should delete object', () => {
        const sceneParent = {
            parent: null,
            children: [
                {
                    isTransformControls: true,
                    detach: jest.fn(),
                }
            ],
        }
        root.parent = sceneParent as unknown as DIVEScene;

        expect(() => root.DeleteSceneObject({ id: undefined, name: 'pov', entityType: 'pov', visible: true } as unknown as COMPov)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();

        expect(() => root.DeleteSceneObject({ id: undefined, name: 'light', entityType: 'light', visible: true, type: 'scene' } as unknown as COMLight)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true, type: 'scene' } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true, type: 'scene' } as COMLight)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true, type: 'scene' } as COMLight)).not.toThrow();

        expect(() => root.DeleteSceneObject({ id: undefined, name: 'model', entityType: 'model', visible: true } as unknown as COMModel)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();

        expect(() => root.DeleteSceneObject({ id: undefined, name: 'primitive', entityType: 'primitive', visible: true } as unknown as COMPrimitive)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
    });

    it('should place object on floor', () => {
        expect(() => root.PlaceOnFloor({ id: undefined, name: 'pov', entityType: 'pov', visible: true } as unknown as COMPov)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();

        expect(() => root.PlaceOnFloor({ id: undefined, name: 'light', entityType: 'light', visible: true } as unknown as COMLight)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();

        expect(() => root.PlaceOnFloor({ id: undefined, name: 'model', entityType: 'model', visible: true } as unknown as COMModel)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();

        expect(() => root.PlaceOnFloor({ id: undefined, name: 'primitive', entityType: 'primitive', visible: true } as unknown as COMPrimitive)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
    });


    // it('should update object', () => {

    //     expect(() => root.UpdateSceneObject({ entityType: 'pov' })).not.toThrow();
    //     expect(mock_UpdateObject).toHaveBeenCalledTimes(0);

    //     root.UpdateSceneObject({ entityType: 'light' });
    //     expect(mock_UpdateObject).toHaveBeenCalledTimes(1);

    //     root.UpdateSceneObject({ entityType: 'model' });
    //     expect(mock_UpdateObject).toHaveBeenCalledTimes(2);

    //     root.UpdateSceneObject({ entityType: 'primitive' });
    //     expect(mock_UpdateObject).toHaveBeenCalledTimes(3);
    // });

    // it('should delete object', () => {

    //     root.DeleteSceneObject({ entityType: 'light' });
    //     expect(mock_DeleteObject).toHaveBeenCalledTimes(1);

    //     root.DeleteSceneObject({ entityType: 'model' });
    //     expect(mock_DeleteObject).toHaveBeenCalledTimes(2);

    //     root.DeleteSceneObject({ entityType: 'primitive' });
    //     expect(mock_DeleteObject).toHaveBeenCalledTimes(3);

    //     expect(() => root.DeleteSceneObject({ entityType: 'pov' })).not.toThrow();
    // });

    // it('should place model on floor', () => {

    //     root.PlaceOnFloor({ entityType: 'pov' });
    //     expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);

    //     root.PlaceOnFloor({ entityType: 'light' });
    //     expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);

    //     root.PlaceOnFloor({ entityType: 'model', });
    //     expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);

    //     root.PlaceOnFloor({ entityType: 'primitive' });
    //     expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(2);
    // });

    // it('should get scene object', () => {
    //     const scene = new DIVERoot();

    //     expect(scene.GetSceneObject({ entityType: 'pov' })).toBeUndefined();
    //     expect(mock_GetObject).toHaveBeenCalledTimes(0);

    //     scene.GetSceneObject({ entityType: 'light' });
    //     expect(mock_GetObject).toHaveBeenCalledTimes(1);

    //     scene.GetSceneObject({ entityType: 'model' });
    //     expect(mock_GetObject).toHaveBeenCalledTimes(2);

    //     scene.GetSceneObject({ entityType: 'primitive' });
    //     expect(mock_GetObject).toHaveBeenCalledTimes(3);
    // });
});
