import { Color, Scene, type Box3, type ColorRepresentation, type Object3D } from 'three';
import { type COMModel, type COMEntity } from '../com/types';
import { DIVERoot } from './root/Root';
import { DIVEGrid } from '../grid/Grid';
import { DIVEFloor } from '../primitive/floor/Floor';

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

    public GetSceneObject(object: Partial<COMEntity>): Object3D | undefined {
        return this.Root.GetSceneObject(object);
    }

    public AddSceneObject(object: COMEntity): void {
        this.Root.AddSceneObject(object);
    }

    public UpdateSceneObject(object: Partial<COMEntity>): void {
        this.Root.UpdateSceneObject(object);
    }

    public DeleteSceneObject(object: Partial<COMEntity>): void {
        this.Root.DeleteSceneObject(object);
    }

    public PlaceOnFloor(object: Partial<COMModel>): void {
        this.Root.PlaceOnFloor(object);
    }
}
