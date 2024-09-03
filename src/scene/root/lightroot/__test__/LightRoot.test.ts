import { TransformControls } from 'three/examples/jsm/Addons';
import { COMLight } from '../../../../com';
import { DIVEMoveable } from '../../../../interface/Moveable';
import DIVELightRoot from '../LightRoot';
import { type DIVEScene } from '../../../Scene';

const mock_SetPosition = jest.fn();
const mock_SetIntensity = jest.fn();
const mock_SetEnabled = jest.fn();
const mock_SetColor = jest.fn();

jest.mock('../../../../light/AmbientLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: mock_SetPosition,
        }
        this.SetIntensity = mock_SetIntensity;
        this.SetEnabled = mock_SetEnabled;
        this.SetColor = mock_SetColor;
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../../light/PointLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: mock_SetPosition,
        }
        this.SetIntensity = mock_SetIntensity;
        this.SetEnabled = mock_SetEnabled;
        this.SetColor = mock_SetColor;
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

describe('dive/scene/root/lightroot/DIVELightRoot', () => {
    beforeEach(() => {
        consoleWarnSpy.mockClear();
    });

    it('should instantiate', () => {
        const lightRoot = new DIVELightRoot();
        expect(lightRoot).toBeDefined();
    });

    it('should not add incorrect light without id', () => {
        const lightRoot = new DIVELightRoot();
        expect(() => lightRoot.UpdateLight({ id: undefined })).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(lightRoot.children).toHaveLength(0);
    });

    it('should not add incorrect light', () => {
        const lightRoot = new DIVELightRoot();
        expect(() => lightRoot.UpdateLight(({ id: 'test_id', name: 'test', type: 'this not a real light type' }) as unknown as COMLight)).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(lightRoot.children).toHaveLength(0);
    });

    it('should update basic scene light', () => {
        const lightRoot = new DIVELightRoot();
        lightRoot.UpdateLight({ id: 'test_id', type: 'scene', name: 'test', position: undefined, enabled: true, visible: false });
        expect(lightRoot.children).toHaveLength(1);
        expect(lightRoot.children[0].userData.id).toBe('test_id');
    });

    it('should update basic ambient light', () => {
        const lightRoot = new DIVELightRoot();
        lightRoot.UpdateLight({ id: 'test_id', type: 'ambient', position: undefined });
        expect(lightRoot.children).toHaveLength(1);
        expect(lightRoot.children[0].userData.id).toBe('test_id');
    });

    it('should update basic point light', () => {
        const lightRoot = new DIVELightRoot();
        lightRoot.UpdateLight({ id: 'test_id', type: 'point', position: undefined });
        expect(lightRoot.children).toHaveLength(1);
        expect(lightRoot.children[0].userData.id).toBe('test_id');
    });

    it('should update configured light', () => {
        const lightRoot = new DIVELightRoot();
        lightRoot.UpdateLight({ id: 'test_id', type: 'point', position: { x: 1, y: 2, z: 3 }, intensity: 0.5, color: 0x123456 });
        expect(consoleWarnSpy).not.toHaveBeenCalled();
        expect(lightRoot.children).toHaveLength(1);
        expect(lightRoot.children[0].userData.id).toBe('test_id');
        expect(mock_SetIntensity).toHaveBeenCalledTimes(1);
        expect(mock_SetColor).toHaveBeenCalledTimes(1);
        expect(mock_SetPosition).toHaveBeenCalledTimes(1);
    });

    it('should get light', () => {
        const lightRoot = new DIVELightRoot();
        expect(() => lightRoot.GetLight({ id: undefined })).not.toThrow();
        expect(lightRoot.GetLight({ id: 'test_id' })).toBeUndefined();
        lightRoot.UpdateLight({ id: 'test_id', type: 'point', position: { x: 1, y: 2, z: 3 }, intensity: 0.5, color: 0x123456 });
        expect(consoleWarnSpy).toHaveBeenCalled();
        expect(lightRoot.GetLight({ id: 'test_id' })).toBeDefined();
    });

    it('should delete light', () => {
        const lightRoot = new DIVELightRoot();

        const sceneParent = {
            parent: null,
            children: [
                {
                    isTransformControls: true,
                    detach: jest.fn(),
                }
            ],
        }
        lightRoot.parent = sceneParent as unknown as DIVEScene;
        expect(() => lightRoot.DeleteLight({ id: undefined })).not.toThrow();

        expect(() => lightRoot.DeleteLight({ id: 'test_id' })).not.toThrow();

        lightRoot.UpdateLight({ id: 'test_id', type: 'point', position: { x: 1, y: 2, z: 3 }, intensity: 0.5, color: 0x123456 });
        expect(() => lightRoot.DeleteLight({ id: 'test_id' })).not.toThrow();

        lightRoot.UpdateLight({ id: 'test_id', type: 'point', position: { x: 1, y: 2, z: 3 }, intensity: 0.5, color: 0x123456 });
        (lightRoot.children[0] as unknown as DIVEMoveable).isMoveable = true;
        expect(() => lightRoot.DeleteLight({ id: 'test_id' })).not.toThrow();

        lightRoot.UpdateLight({ id: 'test_id', type: 'point', position: { x: 1, y: 2, z: 3 }, intensity: 0.5, color: 0x123456 });
        (lightRoot.children[0] as unknown as DIVEMoveable).isMoveable = true;
        expect(() => lightRoot.DeleteLight({ id: 'test_id' })).not.toThrow();
        expect(lightRoot.children).toHaveLength(0);
    });
});
