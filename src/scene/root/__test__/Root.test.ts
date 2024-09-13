import DIVERoot from '../Root';
import { type Vector3, type Object3D } from 'three';
import { type COMPrimitive, type COMLight, type COMModel, type COMPov } from '../../../com/types';

const mock_UpdateObject = jest.fn();
const mock_DeleteObject = jest.fn();
const mock_GetObject = jest.fn();
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
        this.UpdateLight = mock_UpdateObject;
        this.DeleteLight = mock_DeleteObject;
        this.GetLight = mock_GetObject;
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../modelroot/ModelRoot', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.UpdateModel = mock_UpdateObject;
        this.DeleteModel = mock_DeleteObject;
        this.PlaceOnFloor = mock_PlaceOnFloor;
        this.GetModel = mock_GetObject;
        this.removeFromParent = jest.fn();
        this.traverse = jest.fn((callback: (object: Object3D) => void) => {
            callback(this);
        });
        return this;
    });
});

jest.mock('../primitiveroot/PrimitiveRoot', () => {
    return {
        DIVEPrimitiveRoot: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.UpdatePrimitive = mock_UpdateObject;
            this.DeletePrimitive = mock_DeleteObject;
            this.PlaceOnFloor = mock_PlaceOnFloor;
            this.GetPrimitive = mock_GetObject;
            this.removeFromParent = jest.fn();
            this.traverse = jest.fn((callback: (object: Object3D) => void) => {
                callback(this);
            });
            return this;
        }),
    };
});

describe('DIVE/scene/root/DIVERoot', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const root = new DIVERoot();
        expect(root).toBeDefined();
        expect(root.add).toHaveBeenCalledTimes(5);
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
        expect(() => root.AddSceneObject({ entityType: 'pov' } as COMPov)).not.toThrow();
        expect(mock_UpdateObject).toHaveBeenCalledTimes(0);

        root.AddSceneObject({ entityType: 'light' } as COMLight);
        expect(mock_UpdateObject).toHaveBeenCalledTimes(1);

        root.AddSceneObject({ entityType: 'model' } as COMModel);
        expect(mock_UpdateObject).toHaveBeenCalledTimes(2);

        root.AddSceneObject({ entityType: 'primitive' } as COMPrimitive);
        expect(mock_UpdateObject).toHaveBeenCalledTimes(3);
    });

    it('should update object', () => {
        const root = new DIVERoot();

        expect(() => root.UpdateSceneObject({ entityType: 'pov' })).not.toThrow();
        expect(mock_UpdateObject).toHaveBeenCalledTimes(0);

        root.UpdateSceneObject({ entityType: 'light' });
        expect(mock_UpdateObject).toHaveBeenCalledTimes(1);

        root.UpdateSceneObject({ entityType: 'model' });
        expect(mock_UpdateObject).toHaveBeenCalledTimes(2);

        root.UpdateSceneObject({ entityType: 'primitive' });
        expect(mock_UpdateObject).toHaveBeenCalledTimes(3);
    });

    it('should delete object', () => {
        const root = new DIVERoot();

        root.DeleteSceneObject({ entityType: 'light' });
        expect(mock_DeleteObject).toHaveBeenCalledTimes(1);

        root.DeleteSceneObject({ entityType: 'model' });
        expect(mock_DeleteObject).toHaveBeenCalledTimes(2);

        root.DeleteSceneObject({ entityType: 'primitive' });
        expect(mock_DeleteObject).toHaveBeenCalledTimes(3);

        expect(() => root.DeleteSceneObject({ entityType: 'pov' })).not.toThrow();
    });

    it('should place model on floor', () => {
        const root = new DIVERoot();

        root.PlaceOnFloor({ entityType: 'pov' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);

        root.PlaceOnFloor({ entityType: 'light' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);

        root.PlaceOnFloor({ entityType: 'model' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);

        root.PlaceOnFloor({ entityType: 'primitive' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(2);
    });

    it('should get scene object', () => {
        const scene = new DIVERoot();

        expect(scene.GetSceneObject({ entityType: 'pov' })).toBeUndefined();
        expect(mock_GetObject).toHaveBeenCalledTimes(0);

        scene.GetSceneObject({ entityType: 'light' });
        expect(mock_GetObject).toHaveBeenCalledTimes(1);

        scene.GetSceneObject({ entityType: 'model' });
        expect(mock_GetObject).toHaveBeenCalledTimes(2);

        scene.GetSceneObject({ entityType: 'primitive' });
        expect(mock_GetObject).toHaveBeenCalledTimes(3);
    });
});
