import { Color } from 'three';
import { DIVEScene } from '../Scene';
import { COMEntity } from '../../com';
import { DIVERenderer } from '../../renderer/Renderer';

const mock_UpdateSceneObject = jest.fn();
const mock_DeleteSceneObject = jest.fn();
const mock_PlaceOnFloor = jest.fn();
const mock_GetSceneObject = jest.fn();

jest.mock('../root/Root', () => {
    return jest.fn(function () {
        this.visible = true;
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.UpdateSceneObject = mock_UpdateSceneObject;
        this.DeleteSceneObject = mock_DeleteSceneObject;
        this.PlaceOnFloor = mock_PlaceOnFloor;
        this.GetSceneObject = mock_GetSceneObject;
        this.removeFromParent = jest.fn();
        this.ComputeSceneBB = jest.fn();
        return this;
    });
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
        DIVERenderer: jest.fn(function () {

        }),
    }
});

const mockRenderer = new DIVERenderer();

describe('dive/scene/DIVEScene', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const scene = new DIVEScene();
        expect(scene).toBeDefined();
    });

    it('should have Root', () => {
        const scene = new DIVEScene();
        expect(scene.Root).toBeDefined();
    });

    it('should have XRRoot', () => {
        const scene = new DIVEScene();
        expect(scene.XRRoot).toBeDefined();
    });

    it('should InitXR', () => {
        const scene = new DIVEScene();
        expect(() => scene.InitXR(mockRenderer)).not.toThrow();
    });

    it('should DisposeXR', () => {
        const scene = new DIVEScene();
        expect(() => scene.DisposeXR()).not.toThrow();
    });

    it('should set background color', () => {
        const scene = new DIVEScene();
        scene.SetBackground(0x123456);
        expect((scene.background as Color).getHex()).toBe(0x123456);
    });

    it('should ComputeSceneBB', () => {
        const scene = new DIVEScene();
        expect(() => scene.ComputeSceneBB()).not.toThrow();
    });

    it('should add object', () => {
        const scene = new DIVEScene();
        scene.AddSceneObject({} as COMEntity);
        expect(mock_UpdateSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should update object', () => {
        const scene = new DIVEScene();
        scene.UpdateSceneObject({});
        expect(mock_UpdateSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should remove object', () => {
        const scene = new DIVEScene();
        scene.DeleteSceneObject({});
        expect(mock_DeleteSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should place object on floor', () => {
        const scene = new DIVEScene();
        scene.PlaceOnFloor({});
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);
    });

    it('should get scene object', () => {
        const scene = new DIVEScene();
        scene.GetSceneObject({});
        expect(mock_GetSceneObject).toHaveBeenCalledTimes(1);
    });
});