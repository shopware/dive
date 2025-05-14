import { Box3, Object3D } from 'three';
import { COMEntity, COMEntityType, COMMinimal, COMPartial } from '../../modules/state/types/index.ts';
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
    private _getAssetLoader;
    constructor();
    computeSceneBB(): Box3;
    getSceneObject<E extends COMEntityType>(object: Partial<COMEntity> & {
        id: string;
        entityType: E;
    }): DIVESceneObject<E> | undefined;
    addSceneObject(object: COMEntity): DIVESceneObject | undefined;
    updateSceneObject(object: COMPartial): void;
    deleteSceneObject(object: COMMinimal<COMEntity>): void;
    private _updateLight;
    private _updateModel;
    private _updatePrimitive;
    private _updateGroup;
    private _deleteLight;
    private _deleteModel;
    private _deletePrimitive;
    private _deleteGroup;
    private _setParent;
    private _detachTransformControls;
    private _findScene;
}
