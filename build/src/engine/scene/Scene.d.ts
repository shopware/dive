import { Scene, Box3, ColorRepresentation } from 'three';
import { COMModel, COMEntity } from '../../com/types';
import { DIVERoot } from './root/Root';
import { DIVEGrid } from '../../grid/Grid';
import { DIVEFloor } from '../../primitive/floor/Floor';
import { DIVESceneObject } from '../../types';
import { DIVEXRRoot } from './xrroot/XRRoot';
import { DIVERenderer } from '../renderer/Renderer';
/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */
export declare class DIVEScene extends Scene {
    private _root;
    private _floor;
    private _grid;
    get Root(): DIVERoot;
    private _xrRoot;
    get XRRoot(): DIVEXRRoot;
    get Floor(): DIVEFloor;
    get Grid(): DIVEGrid;
    constructor();
    InitXR(renderer: DIVERenderer): void;
    DisposeXR(): void;
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
