import { Scene, Box3, ColorRepresentation } from 'three';
import { COMModel, COMEntity } from '../../modules/state/types/index.ts';
import { DIVERoot } from '../../components/root/Root.ts';
import { DIVEGrid } from '../../components/grid/Grid.ts';
import { DIVESceneObject } from '../../types/index.ts';
/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */
export declare class DIVEScene extends Scene {
    get Root(): DIVERoot;
    get Grid(): DIVEGrid;
    private _root;
    private _grid;
    constructor();
    SetBackground(color: ColorRepresentation): void;
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
    PlaceOnFloor(object: Partial<COMModel> & {
        id: string;
        entityType: string;
    }): void;
}
