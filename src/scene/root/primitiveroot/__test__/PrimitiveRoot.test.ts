import DIVECommunication from '../../../../com/Communication';
import { DIVEPrimitiveRoot } from '../PrimitiveRoot';
import type DIVEScene from '../../../Scene';
import { type DIVEMoveable } from '../../../../interface/Moveable';
import { type COMMaterial, type COMGeometry } from '../../../../com/types';

const mock_SetPosition = jest.fn();
const mock_SetRotation = jest.fn();
const mock_SetScale = jest.fn();
const mock_PlaceOnFloor = jest.fn();
const mock_SetGeometry = jest.fn();
const mock_SetMaterial = jest.fn();

jest.mock('../../../../com/types.ts', () => {
    return {
        COMPrimitive: {},
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
            this.SetGeometry = mock_SetGeometry;
            this.SetMaterial = mock_SetMaterial;
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
let primitiveRoot = new DIVEPrimitiveRoot();

describe('dive/scene/root/primitiveroot/DIVEPrimitiveRoot', () => {
    beforeEach(() => {
        consoleWarnSpy.mockClear();

        primitiveRoot = new DIVEPrimitiveRoot();
    });

    it('should instantiate', () => {
        expect(primitiveRoot).toBeDefined();
    });

    it('should not add incorrect primitive', async () => {
        expect(() => primitiveRoot.UpdatePrimitive({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(primitiveRoot.children).toHaveLength(0);
    });

    it('should add basic primitive', async () => {
        expect(() => primitiveRoot.UpdatePrimitive({
            id: 'test_id',
            geometry: {} as COMGeometry,
            visible: false,
        })).not.toThrow();
        expect(mock_SetGeometry).toHaveBeenCalledTimes(1);
        expect(primitiveRoot.children).toHaveLength(1);
        expect(primitiveRoot.children[0].userData.id).toBe('test_id');
    });

    it('should add configured primitive', async () => {
        primitiveRoot.userData.id = 'something';
        expect(() => primitiveRoot.UpdatePrimitive({
            id: 'test_id',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
            geometry: {} as COMGeometry,
            material: {} as COMMaterial,
        })).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitiveRoot.UpdatePrimitive({
            id: 'test_id',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
            geometry: {} as COMGeometry,
            material: {} as COMMaterial,
        }
        )).not.toThrow();

        expect(primitiveRoot.children).toHaveLength(1);
        expect(mock_SetPosition).toHaveBeenCalledTimes(2);
        expect(mock_SetRotation).toHaveBeenCalledTimes(2);
        expect(mock_SetScale).toHaveBeenCalledTimes(2);
        expect(mock_SetGeometry).toHaveBeenCalledTimes(2);
        expect(mock_SetMaterial).toHaveBeenCalledTimes(2);
    });

    it('should not place incorrect primitive on floor', async () => {
        expect(() => primitiveRoot.PlaceOnFloor({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);
    });

    it('should not place non-existing primitive on floor', async () => {
        primitiveRoot.PlaceOnFloor({ id: 'test_id' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(0);
    });

    it('should place primitive on floor', async () => {
        primitiveRoot.UpdatePrimitive({
            id: 'test_id',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
            geometry: {} as COMGeometry,
        });
        primitiveRoot.PlaceOnFloor({ id: 'test_id' });
        expect(mock_PlaceOnFloor).toHaveBeenCalledTimes(1);
    });

    it('should get primitive', async () => {
        expect(() => primitiveRoot.GetPrimitive({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(primitiveRoot.GetPrimitive({ id: 'test_id' })).toBeUndefined();
        expect(() => primitiveRoot.UpdatePrimitive({
            id: 'test_id',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
            geometry: {} as COMGeometry,
        })).not.toThrow();
        expect(primitiveRoot.GetPrimitive({ id: 'test_id' })).toBeDefined();
    });

    it('should delete primitive', async () => {

        const sceneParent = {
            parent: null,
            children: [
                {
                    isTransformControls: true,
                    detach: jest.fn(),
                }
            ],
        }
        primitiveRoot.parent = sceneParent as unknown as DIVEScene;

        expect(() => primitiveRoot.DeletePrimitive({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        consoleWarnSpy.mockClear();
        expect(() => primitiveRoot.DeletePrimitive({ id: 'test_id' })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(() => primitiveRoot.UpdatePrimitive({
            id: 'test_id',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
            geometry: {} as COMGeometry,
        })).not.toThrow();
        (primitiveRoot.children[0] as unknown as DIVEMoveable).isMoveable = true;
        expect(() => primitiveRoot.DeletePrimitive({ id: 'test_id' })).not.toThrow();
        expect(primitiveRoot.children).toHaveLength(0);
    });
});