import DIVERoot from '../Root';
import { type Vector3, type Object3D } from 'three';
import { type COMLight, type COMModel, type COMPov } from '../../../com';

const mock_UpdateLight = jest.fn();
const mock_UpdateModel = jest.fn();
const mock_GetLight = jest.fn();
const mock_GetModel = jest.fn();
const mock_DeleteLight = jest.fn();
const mock_DeleteModel = jest.fn();
const mock_PlaceOnFloor = jest.fn();

jest.mock('three', () => {
    return {
        Box3: jest.fn(() => {
            return {
                expandByObject: jest.fn(),
                setFromObject: jest.fn(),
                applyMatrix4: jest.fn(),
                union: jest.fn(),
                isEmpty: jest.fn(),
                getCenter: jest.fn(),
                getSize: jest.fn(),
                getBoundingSphere: jest.fn(),
            };
        }),
        Object3D: jest.fn(function () {
            this.clear = jest.fn();
            this.color = {};
            this.intensity = 0;
            this.layers = {
                mask: 0,
            };
            this.shadow = {
                radius: 0,
                mapSize: { width: 0, height: 0 },
                bias: 0,
                camera: {
                    near: 0,
                    far: 0,
                    fov: 0,
                },
            }
            this.add = jest.fn();
            this.userData = {};
            this.rotation = {
                x: 0,
                y: 0,
                z: 0,
                setFromVector3: jest.fn(),
            };
            this.scale = {
                x: 1,
                y: 1,
                z: 1,
                set: jest.fn(),
            };
            this.localToWorld = (vec3: Vector3) => {
                return vec3;
            };
            this.traverse = jest.fn((callback) => {
                callback(this.children[0])
            });
            return this;
        }),
    }
});

jest.mock('../../../primitive/floor/Floor', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../grid/Grid', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../lightroot/LightRoot', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.UpdateLight = mock_UpdateLight;
        this.DeleteLight = mock_DeleteLight;
        this.GetLight = mock_GetLight;
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../modelroot/ModelRoot', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.UpdateModel = mock_UpdateModel;
        this.DeleteModel = mock_DeleteModel;
        this.PlaceOnFloor = mock_PlaceOnFloor;
        this.GetModel = mock_GetModel;
        this.removeFromParent = jest.fn();
        this.traverse = jest.fn((callback: (object: Object3D) => void) => {
            callback(this);
        });
        return this;
    });
});

describe('DIVE/scene/root/DIVERoot', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const root = new DIVERoot();
        expect(root).toBeDefined();
        expect(root.add).toHaveBeenCalledTimes(4);
    });

    it('should have Floor', () => {
        const root = new DIVERoot();
        expect(root.Floor).toBeDefined();
    });

    it('should have Grid', () => {
        const root = new DIVERoot();
        expect(root.Grid).toBeDefined();
    });

    it('should ComputeSceneBB', () => {
        const root = new DIVERoot();
        const bb = root.ComputeSceneBB();
        expect(bb).toBeDefined();
    });

    it('should add object', () => {
        const root = new DIVERoot();
        root.AddSceneObject({ entityType: 'light' } as COMLight);
        expect(mock_UpdateLight).toHaveBeenCalledTimes(1);

        root.AddSceneObject({ entityType: 'model' } as COMModel);
        expect(mock_UpdateModel).toHaveBeenCalledTimes(1);

        expect(() => root.AddSceneObject({ entityType: 'pov' } as COMPov)).not.toThrow();
    });

    it('should update object', () => {
        const root = new DIVERoot();

        root.UpdateSceneObject({ entityType: 'light' });
        expect(mock_UpdateLight).toHaveBeenCalledTimes(1);

        root.UpdateSceneObject({ entityType: 'model' });
        expect(mock_UpdateModel).toHaveBeenCalledTimes(1);

        expect(() => root.UpdateSceneObject({ entityType: 'pov' })).not.toThrow();
    });

    it('should delete object', () => {
        const root = new DIVERoot();

        root.DeleteSceneObject({ entityType: 'light' });
        expect(mock_DeleteLight).toHaveBeenCalledTimes(1);

        root.DeleteSceneObject({ entityType: 'model' });
        expect(mock_DeleteModel).toHaveBeenCalledTimes(1);

        expect(() => root.DeleteSceneObject({ entityType: 'pov' })).not.toThrow();
    });

    it('should place model on floor', () => {
        const root = new DIVERoot();
        root.PlaceOnFloor({ entityType: 'model' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);
    });

    it('should get scene object', () => {
        const scene = new DIVERoot();
        scene.GetSceneObject({ entityType: 'model' });
        expect(mock_GetModel).toHaveBeenCalledTimes(1);
        scene.GetSceneObject({ entityType: 'light' });
        expect(mock_GetLight).toHaveBeenCalledTimes(1);
        expect(scene.GetSceneObject({ entityType: 'pov' })).toBeUndefined();
    });
});
