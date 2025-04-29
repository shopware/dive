import { Box3, Object3D } from 'three';
import { COMEntity } from '../../modules/state/types/index.ts';
import { DIVESceneObject } from '../../types/index.ts';
import { DIVEFloor } from '../floor/Floor.ts';
/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * @module
 */
export declare class DIVERoot extends Object3D {
    readonly isDIVERoot: true;
    get floor(): DIVEFloor;
    private _floor;
    private _assetLoader;
    constructor();
    ComputeSceneBB(): Box3;
    GetSceneObject<T extends DIVESceneObject>(object: Partial<COMEntity> & {
        id: string;
    }): T | undefined;
    AddSceneObject(object: COMEntity): void;
    UpdateSceneObject(object: Partial<COMEntity> & {
        id: string;
        entityType: string;
    }): void;
    DeleteSceneObject(object: Partial<COMEntity> & {
        id: string;
        entityType: string;
    }): void;
    PlaceOnFloor(object: Partial<COMEntity> & {
        id: string;
        entityType: string;
    }): void;
    private updateLight;
    private updateModel;
    private updatePrimitive;
    private updateGroup;
    private deleteLight;
    private deleteModel;
    private deletePrimitive;
    private deleteGroup;
    private placeOnFloor;
    private setParent;
    private detachTransformControls;
    private findScene;
}
