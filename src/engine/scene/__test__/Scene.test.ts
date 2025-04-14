import { DIVEScene } from '../Scene';
import { type COMEntity } from '../../../com/types';
import { DIVERenderer } from '../../renderer/Renderer';

const mock_AddSceneObject = jest.fn();
const mock_UpdateSceneObject = jest.fn();
const mock_DeleteSceneObject = jest.fn();
const mock_PlaceOnFloor = jest.fn();
const mock_GetSceneObject = jest.fn();

jest.mock('../root/Root', () => {
    return {
        DIVERoot: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.AddSceneObject = mock_AddSceneObject;
            this.UpdateSceneObject = mock_UpdateSceneObject;
            this.DeleteSceneObject = mock_DeleteSceneObject;
            this.PlaceOnFloor = mock_PlaceOnFloor;
            this.GetSceneObject = mock_GetSceneObject;
            this.removeFromParent = jest.fn();
            this.ComputeSceneBB = jest.fn();
            return this;
        }),
    };
});

jest.mock('../xrroot/XRRoot', () => {
    return {
        DIVEXRRoot: jest.fn(function (scene: DIVEScene) {
            this.visible = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.removeFromParent = jest.fn();
            this.visible = true;
            this.InitLightEstimation = jest.fn();
            this.DisposeLightEstimation = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../renderer/Renderer.ts', () => {
    return {
        DIVERenderer: jest.fn(function () {}),
    };
});

const mockRenderer = new DIVERenderer();
let scene: DIVEScene;

describe('dive/scene/DIVEScene', () => {
    beforeEach(() => {
        scene = new DIVEScene();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(scene).toBeDefined();
    });

    it('should have Root', () => {
        expect(scene.Root).toBeDefined();
    });

    it('should have XRRoot', () => {
        expect(scene.XRRoot).toBeDefined();
    });

    it('should have Floor', () => {
        expect(scene.Floor).toBeDefined();
    });

    it('should have Grid', () => {
        expect(scene.Grid).toBeDefined();
    });

    it('should InitXR', () => {
        expect(() => scene.InitXR(mockRenderer)).not.toThrow();
    });

    it('should DisposeXR', () => {
        expect(() => scene.DisposeXR()).not.toThrow();
    });

    it('should set background color', () => {
        expect(() => scene.SetBackground(0x123456)).not.toThrow();
    });

    it('should ComputeSceneBB', () => {
        expect(() => scene.ComputeSceneBB()).not.toThrow();
    });

    it('should add object', () => {
        scene.AddSceneObject({} as COMEntity);
        expect(mock_AddSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should update object', () => {
        scene.UpdateSceneObject({} as COMEntity);
        expect(mock_UpdateSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should remove object', () => {
        scene.DeleteSceneObject({} as COMEntity);
        expect(mock_DeleteSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should place object on floor', () => {
        scene.PlaceOnFloor({} as COMEntity);
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);
    });

    it('should get scene object', () => {
        scene.GetSceneObject({} as COMEntity);
        expect(mock_GetSceneObject).toHaveBeenCalledTimes(1);
    });
});
