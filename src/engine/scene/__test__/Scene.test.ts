import { Scene, Object3D, Color } from 'three';
import { type COMEntity } from '../../../modules/state/types';
import { COMEntityType } from '../../../modules/state/types/index';
import { DIVEScene } from '../Scene';

const mock_AddSceneObject = vi.fn();
const mock_UpdateSceneObject = vi.fn();
const mock_DeleteSceneObject = vi.fn();
const mock_PlaceOnFloor = vi.fn();
const mock_GetSceneObject = vi.fn();
const mock_ComputeSceneBB = vi.fn();

vi.mock('../../../components/root/Root', () => {
    return {
        DIVERoot: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.AddSceneObject = mock_AddSceneObject;
            this.UpdateSceneObject = mock_UpdateSceneObject;
            this.DeleteSceneObject = mock_DeleteSceneObject;
            this.PlaceOnFloor = mock_PlaceOnFloor;
            this.GetSceneObject = mock_GetSceneObject;
            this.ComputeSceneBB = mock_ComputeSceneBB;
            this.removeFromParent = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../renderer/Renderer', () => {
    return {
        DIVERenderPipeline: vi.fn(function (this: any) {}),
    };
});

vi.mock('../../../components/grid/Grid', () => {
    return {
        DIVEGrid: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            return this;
        }),
    };
});

let scene: DIVEScene;

describe('DIVEScene', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        scene = new DIVEScene();
    });

    it('should instantiate with correct properties', () => {
        expect(scene).toBeDefined();
        expect(scene.Root).toBeDefined();
        expect(scene.Grid).toBeDefined();
        expect(scene.background).toBeInstanceOf(Color);
    });

    it('should add root and grid to scene', () => {
        expect(scene.children).toContain(scene.Root);
        expect(scene.children).toContain(scene.Grid);
    });

    it('should set background color', () => {
        const color = new Color(0x000000);
        scene.SetBackground(0x000000);
        expect((scene.background as Color).getHex()).toBe(color.getHex());
    });

    it('should delegate ComputeSceneBB to root', () => {
        scene.ComputeSceneBB();
        expect(mock_ComputeSceneBB).toHaveBeenCalledTimes(1);
    });

    it('should delegate GetSceneObject to root', () => {
        const mockEntity = { id: 'test' };
        scene.GetSceneObject(mockEntity);
        expect(mock_GetSceneObject).toHaveBeenCalledWith(mockEntity);
    });

    it('should delegate AddSceneObject to root', () => {
        const mockEntity = {} as COMEntity;
        scene.AddSceneObject(mockEntity);
        expect(mock_AddSceneObject).toHaveBeenCalledWith(mockEntity);
    });

    it('should delegate UpdateSceneObject to root', () => {
        const mockEntity = { id: 'test', entityType: 'group' as const };
        scene.UpdateSceneObject(mockEntity);
        expect(mock_UpdateSceneObject).toHaveBeenCalledWith(mockEntity);
    });

    it('should delegate DeleteSceneObject to root', () => {
        const mockEntity = { id: 'test', entityType: 'group' as const };
        scene.DeleteSceneObject(mockEntity);
        expect(mock_DeleteSceneObject).toHaveBeenCalledWith(mockEntity);
    });

    it('should delegate PlaceOnFloor to root', () => {
        const mockEntity = { id: 'test', entityType: 'model' as const };
        scene.PlaceOnFloor(mockEntity);
        expect(mock_PlaceOnFloor).toHaveBeenCalledWith(mockEntity);
    });
});
