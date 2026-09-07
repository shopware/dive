import { Mesh, Object3D, PlaneGeometry, ShadowMaterial } from 'three/webgpu';
import { DIVERoot } from '../root/Root.ts';
import { DIVEXRLightRoot } from './xrlightroot/XRLightRoot.ts';
import { type DIVEScene } from '../Scene.ts';

export class DIVEXRRoot extends Object3D {
    private _xrLightRoot: DIVEXRLightRoot;
    private _xrModelRoot: DIVERoot;
    private _xrHandNode: Object3D;

    public get XRModelRoot(): DIVERoot {
        return this._xrModelRoot;
    }

    public get XRLightRoot(): DIVEXRLightRoot {
        return this._xrLightRoot;
    }

    public get XRHandNode(): Object3D {
        return this._xrHandNode;
    }

    private _xrShadowPlane: Mesh;

    constructor(scene: DIVEScene) {
        super();
        this.name = 'XRRoot';

        this._xrModelRoot = new DIVERoot();
        this._xrModelRoot.name = 'XRModelRoot';
        this.add(this._xrModelRoot);

        this._xrShadowPlane = new Mesh(
            new PlaneGeometry(100, 100),
            new ShadowMaterial({ opacity: 1, transparent: true }),
        );
        this._xrModelRoot.add(this._xrShadowPlane);

        this._xrLightRoot = new DIVEXRLightRoot(scene);
        this._xrLightRoot.name = 'XRLightRoot';
        this.add(this._xrLightRoot);

        this._xrHandNode = new Object3D();
        this._xrHandNode.name = 'XRHandNode';
        this.add(this._xrHandNode);
    }

    public initLightEstimation(): void {
        this._xrLightRoot.initLightEstimation();
    }

    public disposeLightEstimation(): void {
        this._xrLightRoot.disposeLightEstimation();
    }
}
