import { Color, Scene, type Box3, type ColorRepresentation, type Object3D } from 'three';
import { type COMModel, type COMEntity } from '../com/types';
import DIVERoot from './root/Root';

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */

export default class DIVEScene extends Scene {
    private root: DIVERoot;
    public get Root(): DIVERoot {
        return this.root;
    }

    constructor() {
        super();

        this.background = new Color(0xffffff);

        this.root = new DIVERoot();
        this.add(this.root);
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
        this.Root.UpdateSceneObject(object);
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
