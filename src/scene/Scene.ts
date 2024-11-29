import { Color, Scene, type Box3, type ColorRepresentation } from 'three';
import { type COMModel, type COMEntity } from '../com/types';
import { DIVERoot } from './root/Root';
import { DIVEXRRoot } from './xrroot/XRRoot';
import { type DIVERenderer } from '../renderer/Renderer';
import { type DIVESceneObject } from '../types';

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */

export class DIVEScene extends Scene {
    private _root: DIVERoot;
    public get Root(): DIVERoot {
        return this._root;
    }

    private _xrRoot: DIVEXRRoot;
    public get XRRoot(): DIVEXRRoot {
        return this._xrRoot;
    }

    constructor() {
        super();

        this.background = new Color(0xffffff);

        this._root = new DIVERoot();
        this.add(this._root);

        this._xrRoot = new DIVEXRRoot(this);
        this._xrRoot.visible = false;
        this.add(this._xrRoot);
    }

    public InitXR(renderer: DIVERenderer): void {
        this._root.visible = false;
        this._xrRoot.visible = true;
        this._xrRoot.InitLightEstimation(renderer);
    }

    public DisposeXR(): void {
        this._root.visible = true;
        this._xrRoot.visible = false;
        this._xrRoot.DisposeLightEstimation();
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
