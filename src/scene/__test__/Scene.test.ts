import { DIVEScene } from '../Scene';
import { type Color } from 'three';
import { type COMEntity } from '../../com/types';

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
        })
    };
});

describe('dive/scene/DIVEScene', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const scene = new DIVEScene();
        expect(scene).toBeDefined();
        expect(scene.children).toHaveLength(3);
    });

    it('should have Floor', () => {
        const scene = new DIVEScene();
        expect(scene.Floor).toBeDefined();
    });

    it('should have Grid', () => {
        const scene = new DIVEScene();
        expect(scene.Grid).toBeDefined();
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
        expect(mock_AddSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should update object', () => {
        const scene = new DIVEScene();
        scene.UpdateSceneObject({} as COMEntity);
        expect(mock_UpdateSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should remove object', () => {
        const scene = new DIVEScene();
        scene.DeleteSceneObject({} as COMEntity);
        expect(mock_DeleteSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should place object on floor', () => {
        const scene = new DIVEScene();
        scene.PlaceOnFloor({} as COMEntity);
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);
    });

    it('should get scene object', () => {
        const scene = new DIVEScene();
        scene.GetSceneObject({} as COMEntity);
        expect(mock_GetSceneObject).toHaveBeenCalledTimes(1);
    });
});