import { Color, Scene, type Box3, type ColorRepresentation } from 'three';
import { type COMModel, type COMEntity, type COMEntityType } from '../com/types';
import { DIVERoot } from './root/Root';
import { DIVEGrid } from '../grid/Grid';
import { DIVEFloor } from '../primitive/floor/Floor';
import { type DIVESceneObject } from '../types';

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */

export class DIVEScene extends Scene {
    private root: DIVERoot;
    private floor: DIVEFloor;
    private grid: DIVEGrid;

    public get Root(): DIVERoot {
        return this.root;
    }

    public get Floor(): DIVEFloor {
        return this.floor;
    }

    public get Grid(): DIVEGrid {
        return this.grid;
    }

    constructor() {
        super();

        this.background = new Color(0xffffff);

        this.root = new DIVERoot();
        this.add(this.root);

        this.floor = new DIVEFloor();
        this.add(this.floor);

        this.grid = new DIVEGrid();
        this.add(this.grid);
    }

    public SetBackground(color: ColorRepresentation): void {
        this.background = new Color(color);
    }

    public ComputeSceneBB(): Box3 {
        return this.Root.ComputeSceneBB();
    }

    public GetSceneObject<T extends DIVESceneObject>(object: Partial<COMEntity> & { id: string }): T | undefined {
        return this.Root.GetSceneObject<T>(object);
    }

    public AddSceneObject(object: COMEntity): void {
        this.Root.AddSceneObject(object);
    }

    public UpdateSceneObject(object: Partial<COMEntity> & { id: string, entityType: COMEntityType }): void {
        this.Root.UpdateSceneObject(object);
    }

    public DeleteSceneObject(object: Partial<COMEntity> & { id: string }): void {
        this.Root.DeleteSceneObject(object);
    }

    public PlaceOnFloor(object: Partial<COMModel> & { id: string }): void {
        this.Root.PlaceOnFloor(object);
    }
}
