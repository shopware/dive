import { Color, ColorRepresentation, Object3D, Scene } from 'three';
import { COMModel, COMEntity } from '../com/types';
import DIVERoot from './root/Root';

export default class DIVEScene extends Scene {
    private root: DIVERoot;
    public get Root(): DIVERoot {
        return this.root;
    }

    constructor() {
        super();

        this.root = new DIVERoot();
        this.add(this.root);
    }

    public SetBackground(color: ColorRepresentation): void {
        this.background = new Color(color);
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
