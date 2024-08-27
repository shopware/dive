import { Object3D } from "three";
import DIVERoot from "../root/Root";
import DIVEModelRoot from "../root/modelroot/ModelRoot";
import { type DIVERenderer } from "../../renderer/Renderer";
import { DIVEXRLightRoot } from "./xrlightroot/XRLightRoot";
import { type DIVEScene } from "../Scene";

export class DIVEXRRoot extends Object3D {
    private _xrLightRoot: DIVEXRLightRoot;
    private _xrModelRoot: DIVEModelRoot;

    public get XRModelRoot(): DIVEModelRoot {
        return this._xrModelRoot;
    }

    public get XRLightRoot(): DIVEXRLightRoot {
        return this._xrLightRoot;
    }

    constructor(scene: DIVEScene) {
        super();
        this.name = "XRRoot";

        this._xrLightRoot = new DIVEXRLightRoot(scene);
        this.add(this._xrLightRoot);

        this._xrModelRoot = new DIVEModelRoot();
        this._xrModelRoot.name = "XRModelRoot";
        this.add(this._xrModelRoot);
    }

    public CopyFromRoot(root: DIVERoot): void {
        this._xrModelRoot.copy(root.ModelRoot.clone());
    }

    public InitLightEstimation(renderer: DIVERenderer): void {
        this._xrLightRoot.InitLightEstimation(renderer);
    }

    public DisposeLightEstimation(): void {
        this._xrLightRoot.DisposeLightEstimation();
    }
}