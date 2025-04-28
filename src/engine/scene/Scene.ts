import { Color, Scene, type Box3, type ColorRepresentation } from 'three';
import {
    type COMModel,
    type COMEntity,
} from '../../modules/state/types/index.ts';
import { DIVERoot } from '../../components/root/Root';
import { DIVEGrid } from '../../components/grid/Grid';
import { type DIVESceneObject } from '../../types';

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */

export class DIVEScene extends Scene {
    public get Root(): DIVERoot {
        return this._root;
    }

    public get Grid(): DIVEGrid {
        return this._grid;
    }

    private _root: DIVERoot;
    private _grid: DIVEGrid;

    constructor() {
        super();

        this.background = new Color(0xffffff);

        this._root = new DIVERoot();
        this.add(this._root);

        this._grid = new DIVEGrid();
        this.add(this._grid);
    }

    public SetBackground(color: ColorRepresentation): void {
        this.background = new Color(color);
    }

    public ComputeSceneBB(): Box3 {
        return this.Root.ComputeSceneBB();
    }

    public GetSceneObject<T extends DIVESceneObject>(
        object: Partial<COMEntity> & { id: string },
    ): T | undefined {
        return this.Root.GetSceneObject<T>(object);
    }

    public AddSceneObject(object: COMEntity): void {
        this.Root.AddSceneObject(object);
    }

    public UpdateSceneObject(
        object: Partial<COMEntity> & { id: string; entityType: string },
    ): void {
        this.Root.UpdateSceneObject(object);
    }

    public DeleteSceneObject(
        object: Partial<COMEntity> & { id: string; entityType: string },
    ): void {
        this.Root.DeleteSceneObject(object);
    }

    public PlaceOnFloor(
        object: Partial<COMModel> & { id: string; entityType: string },
    ): void {
        this.Root.PlaceOnFloor(object);
    }
}
