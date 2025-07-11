import { Box3, Object3D } from 'three';
import { EntitySchema, EntityTypeSchema, MinimalSchema, PartialSchema } from '../../index.ts';
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
    constructor();
    computeSceneBB(): Box3;
    getSceneObject<E extends EntityTypeSchema>(object: Partial<EntitySchema> & {
        id: string;
        entityType: E;
    }): DIVESceneObject<E> | undefined;
    addSceneObject(object: EntitySchema): DIVESceneObject | undefined;
    updateSceneObject(object: PartialSchema): void;
    deleteSceneObject(object: MinimalSchema<EntitySchema>): void;
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
